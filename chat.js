/* مساعد البوصلة: يجيب من بيانات الموقع نفسها (بدون خادم وبدون ذكاء اصطناعي خارجي). */
(function () {
  "use strict";
  var M = window.MINAH;
  if (!M) return;
  var DATA = window.SCHOLARSHIPS || [], C = window.COUNTRIES || {}, NOTES = window.ENGLISH_NOTES || {};
  var FEED = (window.LATEST && window.LATEST.items) || [];
  var norm = function (s) { return M.norm(s).replace(/[^\p{L}\p{N}]+/gu, " ").trim(); };
  // Latin terms must match whole words; Arabic terms may carry prefixes (بـ، لـ، الـ).
  // A trailing "$" on an Arabic term means the word must end there (الان$ must not match الانجليزيه).
  function has(q, term) {
    var exact = term.slice(-1) === "$";
    term = norm(term);
    if (/[a-z]/.test(term)) return (" " + q + " ").indexOf(" " + term + " ") > -1;
    return new RegExp("(?:^| )(?:وال|بال|فال|لل|ال|و|ب|ل|ف|ك)?" + term + (exact ? "(?= |$)" : "")).test(q);
  }
  function any(q, list) { return list.some(function (x) { return has(q, x); }); }

  var ALIASES = {
    "chevening": ["chevening", "تشيفننغ", "تشيفنينج", "شيفننج", "تشيفننج"],
    "fulbright": ["fulbright", "فولبرايت", "فلبرايت"],
    "erasmus-mundus": ["erasmus", "ايراسموس", "اراسموس"],
    "msca-dn": ["msca", "marie curie", "ماري كوري", "euraxess", "يوراكسس"],
    "cnrs": ["cnrs"],
    "eiffel": ["eiffel", "ايفل"],
    "daad-epos": ["epos", "daad", "داد"],
    "daad-helmut-schmidt": ["helmut", "هلموت", "daad", "داد"],
    "daad-phd": ["daad", "داد"],
    "mext": ["mext", "ميكست", "monbukagakusho"],
    "csc": ["csc"],
    "turkiye": ["turkiye burslari", "turkiye scholarships", "turkey scholarship", "المنح التركيه", "المنحه التركيه"],
    "stipendium-hungaricum": ["stipendium", "hungaricum", "ستيبنديوم", "هنغاريكوم"],
    "gates-cambridge": ["gates", "غيتس", "جيتس", "cambridge", "كامبريدج", "كامبردج"],
    "rhodes": ["rhodes", "رودس"],
    "clarendon": ["clarendon", "كلارندون"],
    "said-foundation": ["said foundation", "مؤسسه سعيد"],
    "swiss-excellence": ["swiss government", "swiss excellence"],
    "eth-esop": ["eth", "esop", "زيورخ"],
    "kaust": ["kaust", "كاوست", "الملك عبدالله"],
    "gks": ["gks", "global korea"],
    "maeci": ["maeci"],
    "holland": ["nl scholarship", "holland scholarship", "منحه هولندا"],
    "pearson": ["pearson", "بيرسون", "toronto", "تورنتو"],
    "knight-hennessy": ["knight", "hennessy", "نايت", "stanford", "ستانفورد"],
    "nyuad": ["nyuad", "nyu", "نيويورك ابوظبي"],
    "doha-institute": ["doha institute", "معهد الدوحه"],
    "isdb": ["isdb", "البنك الاسلامي"],
    "si-sweden": ["swedish institute", "المعهد السويدي"],
    "embl-phd": ["embl"],
    "imprs": ["imprs", "max planck", "ماكس بلانك"],
    "mastercard": ["mastercard", "ماستركارد"]
  };
  var PLACES = {
    de: ["المانيا", "germany", "german"], uk: ["بريطانيا", "انجلترا", "المملكه المتحده", "uk", "britain", "england"],
    us: ["امريكا", "الولايات المتحده", "usa", "america", "united states"], fr: ["فرنسا", "france"], jp: ["اليابان", "japan"],
    cn: ["الصين", "china"], tr: ["تركيا", "turkey", "turkiye"], hu: ["هنغاريا", "المجر", "hungary"], ch: ["سويسرا", "switzerland"],
    sa: ["السعوديه", "saudi"], kr: ["كوريا", "korea"], it: ["ايطاليا", "italy"], nl: ["هولندا", "netherlands", "holland"],
    ca: ["كندا", "canada"], qa: ["قطر", "qatar"], se: ["السويد", "sweden"], ae: ["الامارات", "uae", "emirates"], eu: ["اوروبا", "europe"]
  };
  var LEVELS = {
    bachelor: ["بكالوريوس", "بكالوريس", "bachelor", "bachelors", "undergraduate"],
    master: ["ماجستير", "master", "masters", "msc"],
    phd: ["دكتوراه", "phd", "doctorate", "doctoral"]
  };
  var FIELDS = {
    life: ["طب$", "طبي$", "طبيه$", "صيدله", "احياء", "بيولوجي", "جين", "وراث", "صحه", "تمريض", "medicine", "medical", "biology", "genetics", "genomics", "pharmacy", "health"],
    stem: ["هندسه", "حاسوب", "برمجه", "فيزياء", "كيمياء", "رياضيات", "ذكاء اصطناعي", "engineering", "computer", "physics", "chemistry", "math", "ai", "data science"],
    social: ["قانون", "اقتصاد", "سياس", "اداره", "اعلام", "تربيه", "law", "economics", "policy", "business", "management", "humanities", "education"]
  };
  var W = {
    neg: ["بدون", "بلا", "من غير", "لا تحتاج", "لا تتطلب", "لا يحتاج", "لا تشترط", "ما بدها", "ما بتحتاج", "مش لازم", "without", "no", "not", "dont", "don t"],
    lang: ["ايلتس", "ielts", "توفل", "toefl", "لغه", "language", "english", "انجليزي"],
    full: ["ممول", "ممولة", "كامل", "مجاني", "fully funded", "full", "funded", "free"],
    open: ["مفتوح", "الان$", "حاليا$", "open", "now", "currently"],
    how: ["كيف اقدم", "كيف التقديم", "كيفيه التقديم", "طريقه التقديم", "اليه التقديم", "خطوات التقديم", "how to apply", "how do i apply", "application process", "apply"],
    docs: ["وثائق", "اوراق", "مستندات", "الورق", "documents", "papers", "paperwork"],
    greet: ["مرحبا", "اهلا", "هلا$", "السلام عليكم", "hi", "hello", "hey"],
    thanks: ["شكرا", "يسلمو", "thanks", "thank you"]
  };
  var STOP = "منحه منح عن في من على الى ما هي هل اريد ابحث بدي عايز هناك يوجد فيه شو ايش لي عندي برنامج برامج the a an of for in on about want find scholarship scholarships looking i me is are there any program programs programme".split(" ");

  var TXT = {
    ar: {
      fab: "اسأل البوصلة", title: "مساعد البوصلة", sub: "يجيب من بيانات الموقع — ليس ذكاءً اصطناعياً", ph: "اكتب سؤالك…", send: "إرسال", close: "إغلاق",
      hello: "أهلاً! اسألني عن منحة بالاسم، أو صف ما تبحث عنه: الدرجة، الدولة، التمويل، أو «بدون اختبار لغة».",
      chips: ["دكتوراه بدون اختبار لغة", "ماجستير ممول في ألمانيا", "كيف أقدّم على تشيفننغ؟", "المنح المفتوحة الآن", "ما الوثائق المطلوبة؟"],
      found: function (n, d) { return "وجدت " + (n === 1 ? "منحة واحدة" : n === 2 ? "منحتين" : n + (n > 10 ? " منحة" : " منح")) + (d ? " (" + d + ")" : "") + ":"; },
      more: function (n) { return "و" + n + " أخرى — استخدم الفلاتر أعلى الصفحة لرؤيتها كلها."; },
      none: "لم أجد منحة بهذه المواصفات. جرّب تخفيف الشروط، مثلاً بدون تحديد الدولة.",
      varies: function (n) { return "وهناك " + (n === 1 ? "واحدة" : n) + " أخرى يعتمد فيها شرط اللغة على البرنامج أو الجامعة:"; },
      when: "الموعد المعتاد", lang: "اختبار اللغة", how: "طريقة التقديم", funding: "التمويل",
      docs: "الوثائق التي تُطلب في أغلب المنح:", guide: "خطوات التقديم العامة:", guideMore: "لطريقة التقديم على منحة محددة، اكتب اسمها (مثلاً: كيف أقدّم على DAAD؟).",
      langSum: function (a, b, c) { return "صنّفنا المنح حسب اختبار اللغة الإنجليزية: " + a + " لا تتطلب اختباراً، " + b + " حسب البرنامج أو الجامعة، و" + c + " تتطلبه. اكتب «بدون اختبار لغة» لعرض الأولى."; },
      feed: "ومن الفرص المنشورة حديثاً:", phdFeed: function (n) { return "وللدكتوراه أيضاً " + n + " فرصة حديثة في قسم «أحدث الفرص»."; },
      fallback: "لم أفهم سؤالك تماماً. جرّب مثلاً: «منح دكتوراه في فرنسا»، «بكالوريوس بدون اختبار لغة»، أو «كيف أقدّم على إيراسموس؟».",
      thanks: "بالتوفيق في تقديمك!", verify: "تحقق دائماً من الموقع الرسمي قبل التقديم."
    },
    en: {
      fab: "Ask the Compass", title: "Compass assistant", sub: "Answers from this site's data — not an AI", ph: "Type your question…", send: "Send", close: "Close",
      hello: "Hi! Ask about a scholarship by name, or describe what you need: level, country, funding, or \"no English test\".",
      chips: ["PhD with no English test", "Funded master's in Germany", "How do I apply to Chevening?", "Scholarships open now", "Which documents do I need?"],
      found: function (n, d) { return "I found " + n + " scholarship" + (n === 1 ? "" : "s") + (d ? " (" + d + ")" : "") + ":"; },
      more: function (n) { return "…and " + n + " more — use the filters at the top to see them all."; },
      none: "No scholarship matches all of that. Try loosening it, for example without a country.",
      varies: function (n) { return "Another " + n + " depend on the programme or university:"; },
      when: "Usual window", lang: "English test", how: "How to apply", funding: "Funding",
      docs: "Documents most scholarships ask for:", guide: "The general application steps:", guideMore: "For a specific scholarship, type its name (e.g. How do I apply to DAAD?).",
      langSum: function (a, b, c) { return "We classify scholarships by English test: " + a + " need no test, " + b + " depend on the programme or university, and " + c + " require one. Type \"no English test\" to list the first group."; },
      feed: "From the latest published opportunities:", phdFeed: function (n) { return "For PhDs there are also " + n + " recent openings in the Latest section."; },
      fallback: "I didn't quite get that. Try: \"PhD scholarships in France\", \"bachelor's with no English test\", or \"How do I apply to Erasmus?\".",
      thanks: "Good luck with your application!", verify: "Always check the official website before applying."
    }
  };

  /* ---------- Understanding the question ---------- */
  function parse(q) {
    var f = {};
    Object.keys(LEVELS).forEach(function (k) { if (any(q, LEVELS[k])) f.level = k; });
    Object.keys(PLACES).forEach(function (k) { if (any(q, PLACES[k])) f.country = k; });
    Object.keys(FIELDS).forEach(function (k) { if (any(q, FIELDS[k])) f.field = k; });
    var lang = any(q, W.lang);
    if (lang && any(q, W.neg)) f.english = "no"; else if (lang) f.langAsk = true;
    if (any(q, W.full)) f.funding = "full";
    if (any(q, W.open)) f.open = true;
    f.how = any(q, W.how); f.docs = any(q, W.docs); f.greet = any(q, W.greet); f.thanks = any(q, W.thanks);
    return f;
  }
  function match(f, english) {
    return DATA.filter(function (s) {
      if (f.level && s.levels.indexOf(f.level) === -1) return false;
      if (f.country && s.c !== f.country) return false;
      if (f.field && s.fields.indexOf(f.field) === -1 && s.fields.indexOf("all") === -1) return false;
      if (f.funding && s.funding === "partial") return false;
      if (f.open && !M.isOpen(s)) return false;
      if (english && s.english !== english) return false;
      return true;
    }).sort(function (a, b) { return M.rank(a) - M.rank(b); });
  }

  /* ---------- Building answers ---------- */
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function p(text) { return el("p", "", text); }
  function cards(list) {
    var L = M.lang(), box = el("div", "chat-cards");
    list.forEach(function (s) {
      var b = el("button", "chat-card"); b.type = "button"; b.dataset.open = s.id;
      b.appendChild(el("strong", "", C[s.c].flag + " " + s.name[L]));
      b.appendChild(el("span", "", s.when[L] + " · " + M.t("en_" + s.english)));
      box.appendChild(b);
    });
    return box;
  }
  function feedCards(list) {
    var box = el("div", "chat-cards");
    list.forEach(function (x) {
      var a = el("a", "chat-card"); a.href = x.url; a.target = "_blank"; a.rel = "noopener";
      var st = el("strong", "", x.title + " ↗"); st.dir = "auto"; a.appendChild(st);
      a.appendChild(el("span", "", [x.org, x.place].filter(Boolean).join(" · ")));
      box.appendChild(a);
    });
    return box;
  }
  function line(label, value) { var e = el("p"); e.appendChild(el("b", "", label + ": ")); e.appendChild(document.createTextNode(value)); return e; }
  function detail(s) {
    var L = M.lang(), X = TXT[L], note = (NOTES[s.id] || {})[L];
    return [el("p", "", ""), (function () { var h = el("p"); h.appendChild(el("b", "", C[s.c].flag + " " + s.name[L])); return h; })(),
      p(s.summary[L]), line(X.when, s.when[L]), line(X.funding, M.t(s.funding)),
      line(X.lang, M.t("en_" + s.english) + (note ? " — " + note : "")), line(X.how, s.how[L]), cards([s])].slice(1);
  }
  function describe(f, english) {
    var L = M.lang(), d = [];
    if (f.level) d.push(M.t(f.level));
    if (f.country) d.push(C[f.country][L]);
    if (f.field) d.push(M.t("fld_" + f.field));
    if (f.funding) d.push(M.t("full"));
    if (f.open) d.push(M.t("f_open"));
    if (english) d.push(M.t("en_" + english));
    return d.join(" · ");
  }
  function list(arr) { var u = el("ul"); arr.forEach(function (x) { u.appendChild(el("li", "", x)); }); return u; }

  function reply(raw) {
    var q = norm(raw), L = M.lang(), X = TXT[L], out = [];
    if (!q) return [p(X.fallback)];
    var f = parse(q);
    var words = q.split(" ").filter(function (w) { return w.length > 2 && STOP.indexOf(w) === -1; });
    var feedHits = words.length ? FEED.filter(function (x) { return words.every(function (w) { return x._hay.indexOf(w) > -1; }); }) : [];

    var named = DATA.filter(function (s) { return any(q, ALIASES[s.id] || []); });
    if (named.length > 1 && f.level) { var nl = named.filter(function (s) { return s.levels.indexOf(f.level) > -1; }); if (nl.length) named = nl; }
    if (named.length) {
      named.slice(0, 3).forEach(function (s) { out = out.concat(detail(s)); });
      out.push(p(X.verify));
      return out;
    }
    if (f.docs) return [p(X.docs), list(M.docs.map(function (d) { return d[L]; }))];

    if (f.level || f.country || f.field || f.funding || f.open || f.english) {
      var res = match(f, f.english);
      if (res.length) { out.push(p(X.found(res.length, describe(f, f.english))), cards(res.slice(0, 6))); if (res.length > 6) out.push(p(X.more(res.length - 6))); }
      else out.push(p(X.none));
      if (f.english === "no") { var v = match(f, "varies"); if (v.length) out.push(p(X.varies(v.length)), cards(v.slice(0, 4))); }
      if (feedHits.length) out.push(p(X.feed), feedCards(feedHits.slice(0, 4)));
      else if (f.level === "phd" && FEED.length && !f.country) out.push(p(X.phdFeed(FEED.filter(function (x) { return x.kind === "phd"; }).length)));
      return out;
    }
    if (f.how) return [p(X.guide), list(M.steps.map(function (s) { return s[L][0] + ": " + s[L][1]; })), p(X.guideMore)];
    if (f.langAsk) {
      var n = function (k) { return DATA.filter(function (s) { return s.english === k; }).length; };
      return [p(X.langSum(n("no"), n("varies"), n("yes")))];
    }

    if (words.length) {
      var scored = DATA.map(function (s) { return [words.filter(function (w) { return s._hay.indexOf(w) > -1; }).length, s]; })
        .filter(function (x) { return x[0] === words.length; }).map(function (x) { return x[1]; });
      var feed = feedHits;
      if (scored.length) out.push(p(X.found(scored.length, "")), cards(scored.slice(0, 5)));
      if (feed.length) out.push(p(X.feed), feedCards(feed.slice(0, 4)));
      if (out.length) return out;
    }
    if (f.thanks) return [p(X.thanks)];
    if (f.greet) return [p(X.hello)];
    return [p(X.fallback)];
  }

  /* ---------- Interface ---------- */
  var fab = el("button"); fab.id = "chatFab"; fab.type = "button";
  var panel = el("section"); panel.id = "chatPanel"; panel.hidden = true; panel.setAttribute("role", "dialog");
  var head = el("div", "chat-head"), titles = el("div"), hTitle = el("strong"), hSub = el("small"), closeBtn = el("button", "", "✕");
  closeBtn.type = "button"; titles.appendChild(hTitle); titles.appendChild(hSub); head.appendChild(titles); head.appendChild(closeBtn);
  var log = el("div", "chat-log"); log.setAttribute("aria-live", "polite");
  var chips = el("div", "chat-chips");
  var form = el("form", "chat-form"), input = el("input"), send = el("button");
  input.type = "text"; input.autocomplete = "off"; send.type = "submit"; form.appendChild(input); form.appendChild(send);
  [head, log, chips, form].forEach(function (n) { panel.appendChild(n); });
  document.body.appendChild(fab); document.body.appendChild(panel);

  function say(who, nodes) {
    var m = el("div", "msg " + who);
    nodes.forEach(function (n) { m.appendChild(n); });
    log.appendChild(m);
    if (who === "bot") log.scrollTop = m.offsetTop - 12; else log.scrollTop = log.scrollHeight;
  }
  function ask(text) {
    text = String(text || "").trim(); if (!text) return;
    say("user", [document.createTextNode(text)]);
    say("bot", reply(text));
  }
  function labels() {
    var X = TXT[M.lang()];
    fab.textContent = "💬 " + X.fab; hTitle.textContent = X.title; hSub.textContent = X.sub;
    input.placeholder = X.ph; input.setAttribute("aria-label", X.ph); send.textContent = X.send;
    closeBtn.setAttribute("aria-label", X.close); panel.setAttribute("aria-label", X.title);
    chips.textContent = "";
    X.chips.forEach(function (c) { var b = el("button", "", c); b.type = "button"; chips.appendChild(b); });
  }
  function toggle(open) {
    panel.hidden = !open; fab.hidden = open;
    if (open) { if (!log.children.length) say("bot", [p(TXT[M.lang()].hello)]); input.focus(); } else fab.focus();
  }
  fab.addEventListener("click", function () { toggle(true); });
  closeBtn.addEventListener("click", function () { toggle(false); });
  panel.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  chips.addEventListener("click", function (e) { if (e.target.tagName === "BUTTON") ask(e.target.textContent); });
  form.addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); input.value = ""; });
  M.onLang.push(labels);
  M.ask = function (text) { return reply(text).map(function (n) { return n.textContent; }).join(" | "); };
  labels();
})();
