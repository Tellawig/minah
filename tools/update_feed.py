#!/usr/bin/env python3
"""Daily feed updater for the scholarship site.

Reads the public listing pages of EURAXESS and CNRS and writes ../latest.js,
which the site shows in its "latest opportunities" section.

Run:  python3 tools/update_feed.py
Uses only the Python standard library. If one source fails, its previous
items are kept and the run still succeeds for the other source.
"""
import datetime as dt
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "latest.js")
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
TODAY = dt.date.today()

EURAXESS = "https://euraxess.ec.europa.eu"
# (query, kind, pages, needs PhD keyword in the text)
EURAXESS_QUERIES = [
    ("f[0]=offer_type:funding", "funding", 2, False),
    ("f[0]=job_research_profile:447", "phd", 6, True),  # 447 = First Stage Researcher (R1)
]
PHD_WORDS = re.compile(
    r"\b(ph\.?\s?d|doctoral|doctorate|doctorand|predoctoral|pre-doctoral|doctorant|th[eè]se|thesis|"
    r"msca|marie\s+sk|early[- ]stage researcher|promotionsstelle|dottorato|doctorado)\b", re.I)
STUDENT_WORDS = re.compile(r"\b(scholarships?|studentships?|ph\.?\s?d|doctoral|doctorate|master'?s?|bachelor'?s?|students?)\b", re.I)
SENIOR_WORDS = re.compile(r"\b(professor\w*|tenure|post-?doc\w*|lecturer)\b", re.I)
CNRS = "https://emploi.cnrs.fr"
CNRS_SEARCH = CNRS + "/Offres/Recherche.aspx?lang=EN"
MAX_ITEMS = 120
MONTHS = {m: i + 1 for i, m in enumerate(
    ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"])}


def fetch(url, data=None):
    body = urllib.parse.urlencode(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers={"User-Agent": UA, "Accept-Language": "en"})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.read().decode("utf-8", "replace")


def text(fragment):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()


def parse_date(s):
    m = re.search(r"(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+(\d{4})", s or "")
    if not m or m.group(2).lower() not in MONTHS:
        return ""
    try:
        return dt.date(int(m.group(3)), MONTHS[m.group(2).lower()], int(m.group(1))).isoformat()
    except ValueError:
        return ""


def euraxess():
    items, seen = [], set()
    for query, kind, pages, need_kw in EURAXESS_QUERIES:
        for page in range(pages):
            url = "%s/jobs/search?%s&page=%d" % (EURAXESS, urllib.parse.quote(query, safe="=&"), page)
            page_html = fetch(url)
            parts = page_html.split('<article class="ecl-content-item">')
            if len(parts) < 2:
                break
            for i in range(1, len(parts)):
                art = parts[i].split("</article>")[0]
                head = parts[i - 1][-2500:]  # labels (type, country) sit just before the article
                m = re.search(r'<h3 class="ecl-content-block__title">\s*<a\s+href="(/jobs/[^"]+)"[^>]*>(.*?)</a>', art, re.S)
                if not m:
                    continue
                path, title = m.group(1), text(m.group(2))
                if path in seen:
                    continue
                desc = text((re.search(r'ecl-content-block__description">(.*?)</div>', art, re.S) or [None, ""])[1])
                if need_kw and not PHD_WORDS.search(title + " " + desc):
                    continue
                if kind == "funding" and (not STUDENT_WORDS.search(title + " " + desc) or SENIOR_WORDS.search(title)):
                    continue
                flat = text(art)
                deadline = parse_date((re.search(r"Application Deadline:\s*([^()]{5,40})", flat) or [None, ""])[1])
                if deadline and deadline < TODAY.isoformat():
                    continue
                org = text((re.search(r'primary-meta-item">(.*?)</li>', art, re.S) or [None, ""])[1])
                country = (re.findall(r'ecl-label--highlight"\s*>([^<]+)<', head) or [""])[-1].strip()
                field = (re.search(r'aria-label="Filter by ([^"]+)"', art) or [None, ""])[1]
                seen.add(path)
                items.append({
                    "id": "eur-" + path.rsplit("/", 1)[-1], "source": "euraxess", "kind": kind,
                    "title": title, "org": org, "place": html.unescape(country), "field": html.unescape(field),
                    "posted": parse_date((re.search(r"Posted on:\s*([^<]+)", art) or [None, ""])[1]),
                    "deadline": deadline, "url": EURAXESS + path,
                })
            time.sleep(1)
    return items


def cnrs():
    items, seen = [], set()
    for page in range(1, 6):
        page_html = fetch(CNRS_SEARCH, {"ChxIsResearcher": "on", "ContractType": "DOCTOR", "Page": page})
        blocks = re.findall(r'<li class="col-sm-3 mb-4">(.*?)<div class="card-footer">', page_html, re.S)
        new = 0
        for b in blocks:
            m = re.search(r'<a href="(/Offres/Doctorant/[^"]+)">(.*?)</a>', b, re.S)
            if not m or m.group(1) in seen:
                continue
            seen.add(m.group(1))
            new += 1
            meta = re.search(r'<div class="meta[^"]*">(.*?)</div>', b, re.S)
            ps = [text(p) for p in re.findall(r"<p>(.*?)</p>", meta.group(1), re.S)] if meta else []
            labels = [text(x) for x in re.findall(r'<li class="label">(.*?)</li>', b, re.S)]
            items.append({
                "id": "cnrs-" + m.group(1).split("/")[3], "source": "cnrs", "kind": "phd",
                "title": text(m.group(2)), "org": ps[0] if ps else "CNRS",
                "place": (ps[1].replace(" • ", ", ") + ", France") if len(ps) > 1 else "France",
                "field": next((l for l in labels if "month" in l.lower()), ""),
                "posted": "", "deadline": "", "url": CNRS + m.group(1) + "?lang=EN",
            })
        if not new:
            break
        time.sleep(1)
    return items


def load_previous():
    try:
        with open(OUT, encoding="utf-8") as f:
            return json.loads(f.read().split("=", 1)[1].rstrip().rstrip(";")).get("items", [])
    except Exception:
        return []


def main():
    previous = load_previous()
    first_seen = {p["id"]: p.get("seen", "") for p in previous}
    merged, errors = [], []
    for name, fn in (("euraxess", euraxess), ("cnrs", cnrs)):
        old = [p for p in previous if p["source"] == name]
        try:
            fresh = fn()
            if not fresh:
                raise RuntimeError("no items parsed (page layout may have changed)")
        except Exception as e:  # keep the old items for this source
            errors.append("%s: %s" % (name, e))
            merged += old
            continue
        ids = {x["id"] for x in fresh}
        if name == "euraxess":  # keep earlier finds until their deadline passes
            fresh += [p for p in old if p["id"] not in ids and p.get("deadline", "") >= TODAY.isoformat()]
        merged += fresh
    # Hand-added items (e.g. PhD calls shared as PDFs on LinkedIn) live in manual_items.json.
    try:
        with open(os.path.join(ROOT, "tools", "manual_items.json"), encoding="utf-8") as f:
            for m in json.load(f):
                if m.get("deadline") and m["deadline"] < TODAY.isoformat():
                    continue
                item = {"source": "linkedin", "kind": "phd", "org": "", "place": "", "field": "", "posted": "", "deadline": ""}
                item.update(m)
                merged.append(item)
    except FileNotFoundError:
        pass
    except Exception as e:
        errors.append("manual_items.json: %s" % e)
    for it in merged:
        it["seen"] = first_seen.get(it["id"]) or TODAY.isoformat()
    merged.sort(key=lambda x: (x["seen"], x.get("posted", "")), reverse=True)
    merged = merged[:MAX_ITEMS]

    payload = {"updated": TODAY.isoformat(), "items": merged}
    tmp = OUT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write("window.LATEST = " + json.dumps(payload, ensure_ascii=False, indent=1) + ";\n")
    os.replace(tmp, OUT)

    added = sum(1 for it in merged if it["id"] not in first_seen)
    by = {s: sum(1 for it in merged if it["source"] == s) for s in ("euraxess", "cnrs")}
    print("%s: %d items (%d EURAXESS, %d CNRS), %d new" % (TODAY, len(merged), by["euraxess"], by["cnrs"], added))
    for e in errors:
        print("WARNING", e, file=sys.stderr)
    return 1 if len([e for e in errors if not e.startswith("manual")]) == 2 else 0


if __name__ == "__main__":
    sys.exit(main())
