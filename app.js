(function () {
  "use strict";

  var DATA = window.SCHOLARSHIPS || [];
  var C = window.COUNTRIES || {};
  var NOW = new Date().getMonth() + 1;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("minah:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("minah:" + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  var state = { lang: store.get("lang", "ar"), q: "", level: "", country: "", funding: "", field: "", english: "", open: false, saved: false, sort: "soon" };
  var saved = new Set(store.get("saved", []));
  var docsDone = new Set(store.get("docs", []));

  /* ---------- Text ---------- */
  var T = {
    ar: {
      brand: "بوصلة المنح", title: "بوصلة المنح — منح البكالوريوس والماجستير والدكتوراه",
      nav_list: "المنح", nav_guide: "كيف أقدّم؟", nav_sources: "المصادر", nav_faq: "أسئلة شائعة",
      lang_btn: "English",
      hero_eyebrow: "دليلك العربي للدراسة في الخارج",
      hero_title: "منحتك القادمة تبدأ من هنا",
      hero_lead: "منح ممولة للبكالوريوس والماجستير والدكتوراه حول العالم، مع شرح واضح لآلية التقديم خطوة بخطوة.",
      search_ph: "ابحث باسم المنحة أو الدولة أو التخصص…", search_btn: "ابحث",
      stat_total: "منحة وبرنامج", stat_countries: "وجهة دراسية", stat_full: "بتمويل كامل أو راتب", stat_open: "مفتوحة الآن عادةً",
      all_levels: "كل الدرجات", bachelor: "بكالوريوس", master: "ماجستير", phd: "دكتوراه",
      all_countries: "كل الدول", all_funding: "كل أنواع التمويل", all_fields: "كل التخصصات",
      full: "ممولة بالكامل", partial: "تمويل جزئي", salary: "راتب بعقد عمل",
      fld_all: "كل التخصصات", fld_stem: "علوم وهندسة وتقنية", fld_life: "علوم الحياة والطب", fld_social: "علوم اجتماعية وإنسانية",
      f_open: "مفتوحة الآن", f_saved: "المحفوظة",
      all_english: "كل متطلبات اللغة", en_no: "بدون اختبار إنجليزي", en_varies: "اختبار اللغة حسب البرنامج", en_yes: "تتطلب اختبار إنجليزي",
      m_english: "اختبار اللغة الإنجليزية", feed_how: "كيف أقدّم؟",
      sort_soon: "الترتيب: الأقرب موعداً", sort_name: "الترتيب: الاسم",
      count: function (n) { return n === 0 ? "لا توجد نتائج" : n === 1 ? "منحة واحدة" : n === 2 ? "منحتان" : n <= 10 ? n + " منح" : n + " منحة"; },
      reset: "مسح الفلاتر",
      empty_t: "لم نجد منحة مطابقة", empty_b: "جرّب كلمة أخرى أو خفّف الفلاتر.",
      st_open: "مفتوحة الآن عادةً", st_rolling: "متاحة طوال السنة", st_soon: "تفتح قريباً", st_closed: "مغلقة حالياً", st_varies: "الموعد يختلف",
      save: "حفظ", unsave: "إزالة من المحفوظات", saved_toast: "حُفظت المنحة", unsaved_toast: "أُزيلت من المحفوظات",
      dates_note: "المواعيد المذكورة هي المواعيد المعتادة كل سنة وقد تتغير. راجع دائماً الموقع الرسمي للمنحة قبل التقديم.",
      m_when: "موعد التقديم المعتاد", m_funding: "التمويل", m_levels: "الدرجة", m_fields: "التخصصات",
      m_elig: "الشروط الأساسية", m_benefits: "ماذا تغطي؟", m_how: "كيف أقدّم؟",
      m_warn: "تحقق من الشروط والمواعيد الدقيقة لهذا العام على الموقع الرسمي.",
      m_official: "الموقع الرسمي", m_copy: "نسخ الرابط", copied: "تم نسخ الرابط", close: "إغلاق",
      guide_title: "آلية التقديم خطوة بخطوة", guide_sub: "خطة عملية تصلح لأغلب المنح، من اختيار الوجهة حتى المقابلة.",
      docs_title: "قائمة الوثائق", docs_sub: "علّم على ما جهّزته — تُحفظ القائمة على جهازك.",
      phd_title: "نصيحة للدكتوراه",
      phd_body: "كثير من مقاعد الدكتوراه الممولة في أوروبا هي وظائف بحثية براتب، تُنشر على EURAXESS ومواقع المراكز البحثية مثل CNRS. راسل المشرف مباشرة برسالة قصيرة ومحددة، وأرفق سيرتك وملخصاً لاهتمامك البحثي.",
      phd_cta: "تصفّح المقاعد على EURAXESS",
      src_title: "مصادر رسمية نتابعها", src_sub: "بوابات موثوقة تُنشر عليها المنح والمقاعد الممولة أولاً بأول.",
      faq_title: "أسئلة شائعة",
      foot_note: "بوصلة المنح دليل مستقل وغير تابع لأي جهة مانحة. المعلومات للإرشاد، والمرجع النهائي هو الموقع الرسمي لكل منحة.",
      updated: "آخر تحديث للبيانات: ",
      nav_latest: "أحدث الفرص", feed_title: "أحدث الفرص المنشورة",
      feed_sub: function (n, d) { return n + " فرصة من EURAXESS و CNRS · تُحدَّث يومياً · آخر تحديث " + d + " · العناوين بلغة الإعلان الأصلية"; },
      feed_ph: "ابحث في الفرص (بالإنجليزية)…", feed_all: "الكل", feed_funding: "منح وتمويل", feed_more: "عرض المزيد",
      feed_deadline: "آخر موعد: ", feed_new: "جديد", feed_phd: "مقعد دكتوراه", feed_empty: "لا توجد فرص مطابقة"
    },
    en: {
      brand: "Minah Compass", title: "Minah Compass — Bachelor's, Master's and PhD Scholarships",
      nav_list: "Scholarships", nav_guide: "How to apply", nav_sources: "Sources", nav_faq: "FAQ",
      lang_btn: "العربية",
      hero_eyebrow: "Your guide to studying abroad",
      hero_title: "Your next scholarship starts here",
      hero_lead: "Funded bachelor's, master's and PhD opportunities worldwide, with a clear step-by-step guide to applying.",
      search_ph: "Search by scholarship, country or field…", search_btn: "Search",
      stat_total: "scholarships & programmes", stat_countries: "study destinations", stat_full: "fully funded or salaried", stat_open: "typically open now",
      all_levels: "All levels", bachelor: "Bachelor's", master: "Master's", phd: "PhD",
      all_countries: "All countries", all_funding: "All funding types", all_fields: "All fields",
      full: "Fully funded", partial: "Partial funding", salary: "Salaried position",
      fld_all: "All fields", fld_stem: "Science, engineering & tech", fld_life: "Life sciences & medicine", fld_social: "Social sciences & humanities",
      f_open: "Open now", f_saved: "Saved",
      all_english: "Any language requirement", en_no: "No English test", en_varies: "English test depends on programme", en_yes: "English test required",
      m_english: "English language test", feed_how: "How to apply",
      sort_soon: "Sort: closing soonest", sort_name: "Sort: name",
      count: function (n) { return n === 0 ? "No results" : n === 1 ? "1 scholarship" : n + " scholarships"; },
      reset: "Clear filters",
      empty_t: "No matching scholarship", empty_b: "Try another keyword or loosen the filters.",
      st_open: "Typically open now", st_rolling: "Open all year", st_soon: "Opening soon", st_closed: "Currently closed", st_varies: "Deadline varies",
      save: "Save", unsave: "Remove from saved", saved_toast: "Scholarship saved", unsaved_toast: "Removed from saved",
      dates_note: "Dates shown are the usual yearly windows and can change. Always check the official scholarship website before applying.",
      m_when: "Usual application window", m_funding: "Funding", m_levels: "Level", m_fields: "Fields",
      m_elig: "Key requirements", m_benefits: "What it covers", m_how: "How to apply",
      m_warn: "Check this year's exact requirements and dates on the official website.",
      m_official: "Official website", m_copy: "Copy link", copied: "Link copied", close: "Close",
      guide_title: "How to apply, step by step", guide_sub: "A practical plan that fits most scholarships, from choosing a destination to the interview.",
      docs_title: "Document checklist", docs_sub: "Tick what you have ready — the list is saved on your device.",
      phd_title: "A tip for PhD applicants",
      phd_body: "Many funded PhD places in Europe are salaried research jobs advertised on EURAXESS and on research-centre sites such as CNRS. Email the supervisor directly with a short, specific message, your CV and a summary of your research interest.",
      phd_cta: "Browse positions on EURAXESS",
      src_title: "Official sources we follow", src_sub: "Trusted portals where scholarships and funded positions are published first.",
      faq_title: "Frequently asked questions",
      foot_note: "Minah Compass is an independent guide, not affiliated with any funder. Information is for guidance; each scholarship's official website is the final reference.",
      updated: "Data last updated: ",
      nav_latest: "Latest", feed_title: "Latest opportunities",
      feed_sub: function (n, d) { return n + " opportunities from EURAXESS and CNRS · updated daily · last update " + d + " · titles in the advert's original language"; },
      feed_ph: "Search opportunities…", feed_all: "All", feed_funding: "Scholarships & funding", feed_more: "Show more",
      feed_deadline: "Deadline: ", feed_new: "New", feed_phd: "PhD position", feed_empty: "No matching opportunities"
    }
  };

  var STEPS = [
    { ar: ["حدّد هدفك ووجهتك", "اختر التخصص والدرجة والدول المناسبة لك، ثم اكتب قائمة قصيرة من 5 إلى 8 منح تطابق مؤهلاتك."],
      en: ["Set your goal and destination", "Choose your field, degree level and suitable countries, then shortlist 5–8 scholarships that match your profile."] },
    { ar: ["ابدأ قبل الموعد بـ 9–12 شهراً", "أغلب المنح الكبرى تفتح مرة واحدة في السنة. سجّل مواعيدها وابدأ تجهيز أوراقك مبكراً."],
      en: ["Start 9–12 months ahead", "Most major scholarships open once a year. Note their windows and begin preparing early."] },
    { ar: ["جهّز الوثائق الأساسية", "الشهادات وكشوف العلامات مترجمة ومصدّقة، جواز سفر ساري، وشهادة لغة مثل IELTS أو TOEFL."],
      en: ["Prepare the core documents", "Translated and certified degrees and transcripts, a valid passport, and a language test such as IELTS or TOEFL."] },
    { ar: ["اكتب سيرة ورسالة دافع قويتين", "سيرة من صفحة إلى صفحتين، ورسالة دافع مخصّصة لكل منحة تربط خبرتك بأهداف البرنامج."],
      en: ["Write a strong CV and motivation letter", "A one-to-two-page CV, and a motivation letter tailored to each scholarship that links your experience to its goals."] },
    { ar: ["اطلب رسائل التوصية مبكراً", "اختر أساتذة أو مدراء يعرفون عملك جيداً، وأعطهم مهلة 3–4 أسابيع مع سيرتك وأهدافك."],
      en: ["Request references early", "Pick professors or managers who know your work well, and give them 3–4 weeks along with your CV and goals."] },
    { ar: ["قدّم ثم استعد للمقابلة", "قدّم قبل الموعد بأيام لا بساعات، احتفظ بنسخة من كل شيء، وتدرّب على أسئلة المقابلة الشائعة."],
      en: ["Submit, then prepare for the interview", "Submit days — not hours — before the deadline, keep copies of everything, and rehearse common interview questions."] }
  ];

  var DOCS = [
    { id: "passport", ar: "جواز سفر ساري المفعول", en: "Valid passport" },
    { id: "degrees", ar: "الشهادات وكشوف العلامات (مترجمة ومصدّقة)", en: "Degrees and transcripts (translated and certified)" },
    { id: "cv", ar: "سيرة ذاتية محدّثة", en: "Up-to-date CV" },
    { id: "letter", ar: "رسالة الدافع", en: "Motivation letter" },
    { id: "refs", ar: "رسالتا توصية على الأقل", en: "At least two reference letters" },
    { id: "lang", ar: "شهادة لغة (IELTS / TOEFL أو ما يعادلها)", en: "Language certificate (IELTS / TOEFL or equivalent)" },
    { id: "proposal", ar: "مقترح بحثي (للدكتوراه وبعض برامج الماجستير)", en: "Research proposal (PhD and some master's)" },
    { id: "work", ar: "شهادات الخبرة العملية (إن طُلبت)", en: "Work experience certificates (if required)" }
  ];

  var SOURCES = [
    { url: "https://euraxess.ec.europa.eu/jobs/search", name: "EURAXESS", ar: "وظائف بحثية ومقاعد دكتوراه ممولة في أوروبا", en: "Research jobs and funded PhD positions in Europe" },
    { url: "https://emploi.cnrs.fr/", name: "CNRS", ar: "عقود الدكتوراه والبحث في المختبرات الفرنسية", en: "PhD and research contracts in French laboratories" },
    { url: "https://www.daad.de/en/studying-in-germany/scholarships/", name: "DAAD", ar: "قاعدة بيانات المنح الألمانية", en: "The German scholarship database" },
    { url: "https://www.campusfrance.org/en", name: "Campus France", ar: "المنح والدراسة في فرنسا", en: "Scholarships and study in France" },
    { url: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en", name: "Erasmus Mundus", ar: "كتالوج برامج الماجستير المشتركة", en: "Catalogue of joint master's programmes" },
    { url: "https://marie-sklodowska-curie-actions.ec.europa.eu/", name: "MSCA", ar: "برامج ماري كوري للدكتوراه وما بعدها", en: "Marie Skłodowska-Curie doctoral and postdoctoral actions" },
    { url: "https://www.studyinjapan.go.jp/en/", name: "Study in Japan", ar: "البوابة الرسمية للدراسة في اليابان", en: "Official portal for studying in Japan" },
    { url: "https://www.mpg.de/en/imprs", name: "Max Planck (IMPRS)", ar: "مدارس الدكتوراه في معاهد ماكس بلانك", en: "Doctoral schools at Max Planck Institutes" }
  ];

  var FAQ = [
    { ar: ["هل يمكنني التقديم لأكثر من منحة في الوقت نفسه؟", "نعم، وهذا ما ننصح به. قدّم لعدة منح تناسب ملفك لتزيد فرصك، مع تخصيص رسالة الدافع لكل واحدة."],
      en: ["Can I apply to several scholarships at once?", "Yes, and we recommend it. Apply to several that fit your profile, tailoring the motivation letter for each."] },
    { ar: ["هل أحتاج شهادة لغة؟", "غالباً نعم للبرامج بالإنجليزية (IELTS أو TOEFL). بعض الجامعات تقبل إفادة بأن دراستك السابقة كانت بالإنجليزية، فتحقق من شروط كل منحة."],
      en: ["Do I need a language certificate?", "Usually yes for English-taught programmes (IELTS or TOEFL). Some universities accept proof that your previous degree was taught in English — check each scholarship."] },
    { ar: ["ما الفرق بين التمويل الكامل والجزئي والراتب؟", "التمويل الكامل يغطي الرسوم والمعيشة. الجزئي يغطي جزءاً من التكاليف فقط. أما الراتب فهو عقد عمل بحثي، وهو الشائع في الدكتوراه بأوروبا."],
      en: ["What is the difference between full, partial and salaried funding?", "Full funding covers tuition and living costs. Partial covers only part. A salaried position is a research employment contract, common for PhDs in Europe."] },
    { ar: ["هل المواعيد المذكورة دقيقة؟", "هي المواعيد المعتادة كل سنة، وقد تتغير من عام لآخر. الموقع الرسمي للمنحة هو المرجع الوحيد للموعد النهائي."],
      en: ["Are the dates shown exact?", "They are the usual yearly windows and can shift from year to year. The official scholarship site is the only reference for the deadline."] },
    { ar: ["هل التقديم على المنح مجاني؟", "التقديم على المنح الحكومية المذكورة هنا مجاني عادةً، ولا تحتاج إلى وسيط. بعض الجامعات تطلب رسوماً لطلب القبول نفسه."],
      en: ["Is applying free?", "Applying to the government scholarships listed here is normally free and needs no agent. Some universities charge a fee for the admission application itself."] }
  ];

  var ICON_SAVE = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M6 4h12v17l-6-4.5L6 21z"/></svg>';

  /* ---------- Helpers ---------- */
  function t(k) { return T[state.lang][k]; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFKD")
      .replace(/[̀-ًͯ-ٰٟـ]/g, "")
      .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي");
  }
  var LEVEL_WORDS = { bachelor: "bachelor undergraduate بكالوريوس", master: "master masters msc ماجستير", phd: "phd doctorate doctoral دكتوراه دكتوراة" };
  var FUND_WORDS = { full: "fully funded ممولة بالكامل", partial: "partial جزئي", salary: "salary job راتب وظيفة" };

  DATA.forEach(function (s) {
    var c = C[s.c];
    s._hay = norm([s.name.ar, s.name.en, s.provider.ar, s.provider.en, c.ar, c.en, s.summary.ar, s.summary.en, s.kw,
      s.levels.map(function (l) { return LEVEL_WORDS[l]; }).join(" "), FUND_WORDS[s.funding]].join(" "));
  });

  function status(s) {
    if (s.rolling) return { k: "rolling", cls: "ok" };
    if (!s.months.length) return { k: "varies", cls: "mute" };
    if (s.months.indexOf(NOW) > -1) return { k: "open", cls: "ok" };
    var n1 = NOW % 12 + 1, n2 = n1 % 12 + 1;
    if (s.months.indexOf(n1) > -1 || s.months.indexOf(n2) > -1) return { k: "soon", cls: "warn" };
    return { k: "closed", cls: "mute" };
  }
  function rank(s) {
    if (s.rolling) return 12;
    if (!s.months.length) return 40;
    var d = 0, m = NOW;
    if (s.months.indexOf(NOW) > -1) {
      while (s.months.indexOf(m % 12 + 1) > -1 && d < 11) { m = m % 12 + 1; d++; }
      return d;
    }
    do { m = m % 12 + 1; d++; } while (s.months.indexOf(m) === -1);
    return 12 + d;
  }
  function isOpen(s) { var k = status(s).k; return k === "open" || k === "rolling"; }

  function filtered() {
    var words = norm(state.q).split(/\s+/).filter(Boolean);
    var list = DATA.filter(function (s) {
      if (state.level && s.levels.indexOf(state.level) === -1) return false;
      if (state.country && s.c !== state.country) return false;
      if (state.funding && s.funding !== state.funding) return false;
      if (state.field && s.fields.indexOf(state.field) === -1 && s.fields.indexOf("all") === -1) return false;
      if (state.english && s.english !== state.english) return false;
      if (state.open && !isOpen(s)) return false;
      if (state.saved && !saved.has(s.id)) return false;
      return words.every(function (w) { return s._hay.indexOf(w) > -1; });
    });
    var L = state.lang;
    list.sort(function (a, b) {
      if (state.sort === "soon") { var d = rank(a) - rank(b); if (d) return d; }
      return a.name[L].localeCompare(b.name[L], L);
    });
    return list;
  }

  /* ---------- Rendering ---------- */
  function levelTags(s) { return s.levels.map(function (l) { return '<span class="tag">' + t(l) + "</span>"; }).join(""); }

  function cardHTML(s) {
    var L = state.lang, c = C[s.c], st = status(s), on = saved.has(s.id);
    return '<article class="card">' +
      '<div class="card-top"><span class="country"><span class="flag">' + c.flag + "</span>" + esc(c[L]) + "</span>" +
      '<button type="button" class="save' + (on ? " on" : "") + '" data-save="' + s.id + '" aria-pressed="' + on + '" aria-label="' + (on ? t("unsave") : t("save")) + '">' + ICON_SAVE + "</button></div>" +
      '<h3><button type="button" class="card-title" data-open="' + s.id + '">' + esc(s.name[L]) + "</button></h3>" +
      '<p class="provider">' + esc(s.provider[L]) + "</p>" +
      '<p class="sum">' + esc(s.summary[L]) + "</p>" +
      '<div class="tags">' + levelTags(s) + '<span class="tag ' + s.funding + '">' + t(s.funding) + '</span><span class="tag en-' + s.english + '">' + t("en_" + s.english) + "</span></div>" +
      '<div class="card-foot"><span class="status ' + st.cls + '"><i></i>' + t("st_" + st.k) + '</span><span class="when">' + esc(s.when[L]) + "</span></div>" +
      "</article>";
  }

  function renderGrid() {
    var list = filtered();
    $("#count").textContent = t("count")(list.length);
    $("#grid").innerHTML = list.length ? list.map(cardHTML).join("") :
      '<div class="empty"><strong>' + t("empty_t") + "</strong>" + t("empty_b") + "</div>";
    var dirty = state.q || state.level || state.country || state.funding || state.field || state.english || state.open || state.saved;
    $("#resetBtn").hidden = !dirty;
  }

  function options(sel, items, value) {
    sel.innerHTML = items.map(function (o) { return '<option value="' + o[0] + '">' + esc(o[1]) + "</option>"; }).join("");
    sel.value = value;
  }

  function renderControls() {
    var L = state.lang;
    var lv = [["", t("all_levels")], ["bachelor", t("bachelor")], ["master", t("master")], ["phd", t("phd")]];
    $("#levelSeg").innerHTML = lv.map(function (o) {
      return '<button type="button" data-level="' + o[0] + '" aria-pressed="' + (state.level === o[0]) + '">' + o[1] + "</button>";
    }).join("");
    $("#quick").innerHTML = lv.slice(1).map(function (o) { return '<button type="button" data-level="' + o[0] + '">' + o[1] + "</button>"; }).join("") +
      '<button type="button" data-quick="open">' + t("f_open") + "</button>" +
      '<button type="button" data-quick="full">' + t("full") + "</button>" +
      '<button type="button" data-quick="noeng">' + t("en_no") + "</button>";

    var used = {};
    DATA.forEach(function (s) { used[s.c] = 1; });
    var cs = Object.keys(used).map(function (k) { return [k, C[k].flag + " " + C[k][L]]; })
      .sort(function (a, b) { return C[a[0]][L].localeCompare(C[b[0]][L], L); });
    options($("#fCountry"), [["", t("all_countries")]].concat(cs), state.country);
    options($("#fFunding"), [["", t("all_funding")], ["full", t("full")], ["salary", t("salary")], ["partial", t("partial")]], state.funding);
    options($("#fField"), [["", t("all_fields")], ["stem", t("fld_stem")], ["life", t("fld_life")], ["social", t("fld_social")]], state.field);
    options($("#fEnglish"), [["", t("all_english")], ["no", t("en_no")], ["varies", t("en_varies")], ["yes", t("en_yes")]], state.english);
    options($("#sort"), [["soon", t("sort_soon")], ["name", t("sort_name")]], state.sort);
    $("#fOpen").checked = state.open;
    $("#fSaved").checked = state.saved;
    $("#q").value = state.q;
    $("#q").placeholder = t("search_ph");
    $("#q").setAttribute("aria-label", t("search_ph"));
  }

  function renderStatic() {
    var L = state.lang;
    document.documentElement.lang = L;
    document.documentElement.dir = L === "ar" ? "rtl" : "ltr";
    document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $("#langBtn").textContent = t("lang_btn");

    var countries = {};
    DATA.forEach(function (s) { countries[s.c] = 1; });
    var stats = [
      [DATA.length, t("stat_total")],
      [Object.keys(countries).length, t("stat_countries")],
      [DATA.filter(function (s) { return s.funding !== "partial"; }).length, t("stat_full")],
      [DATA.filter(isOpen).length, t("stat_open")]
    ];
    $("#stats").innerHTML = stats.map(function (s) { return "<div><dt>" + s[1] + "</dt><dd>" + s[0] + "</dd></div>"; }).join("");

    $("#steps").innerHTML = STEPS.map(function (s) { return "<li><h3>" + esc(s[L][0]) + "</h3><p>" + esc(s[L][1]) + "</p></li>"; }).join("");
    $("#docs").innerHTML = DOCS.map(function (d) {
      return '<li><label><input type="checkbox" data-doc="' + d.id + '"' + (docsDone.has(d.id) ? " checked" : "") + "><span>" + esc(d[L]) + "</span></label></li>";
    }).join("");
    $("#srcGrid").innerHTML = SOURCES.map(function (s) {
      return '<a class="src" href="' + s.url + '" target="_blank" rel="noopener"><strong>' + esc(s.name) + " ↗</strong><span>" + esc(s[L]) + "</span></a>";
    }).join("");
    $("#faqList").innerHTML = FAQ.map(function (f) { return "<details><summary>" + esc(f[L][0]) + "</summary><p>" + esc(f[L][1]) + "</p></details>"; }).join("");
    $("#updated").textContent = t("updated") + (window.DATA_UPDATED || "");
  }

  /* ---------- Latest feed (written daily by tools/update_feed.py) ---------- */
  var FEED = (window.LATEST && window.LATEST.items) || [];
  var FEED_DATE = (window.LATEST && window.LATEST.updated) || "";
  var feed = { q: "", src: "", shown: 12 };
  var SRC_NAME = { euraxess: "EURAXESS", cnrs: "CNRS", linkedin: "LinkedIn" };
  var feedOpen = {};
  var FEED_HOW = {
    euraxess: {
      ar: ["افتح الإعلان واقرأ قسم Requirements للتأكد من أن مؤهلاتك مطابقة.", "انزل إلى قسم Where to apply: ستجد رابط التقديم أو البريد الإلكتروني للجهة.", "جهّز سيرة ذاتية، رسالة دافع موجّهة للمشروع نفسه، كشوف العلامات، وأسماء معرّفين.", "قدّم قبل الموعد المذكور، واذكر رقم الإعلان في رسالتك."],
      en: ["Open the advert and read the Requirements section to check you qualify.", "Scroll to Where to apply: it gives the application link or the contact email.", "Prepare a CV, a motivation letter written for this project, transcripts and referees.", "Apply before the stated deadline and quote the offer reference."]
    },
    cnrs: {
      ar: ["افتح الإعلان واقرأ وصف المشروع والمؤهلات المطلوبة.", "اضغط Apply وأنشئ حساباً على بوابة التوظيف في CNRS.", "ارفع سيرتك الذاتية ورسالة دافع موجّهة للمختبر، وأي وثائق يطلبها الإعلان.", "التقديم عبر البوابة فقط، والإعلان يُغلق عند اختيار مرشح، فقدّم مبكراً."],
      en: ["Open the offer and read the project description and required profile.", "Click Apply and create an account on the CNRS careers portal.", "Upload your CV, a cover letter addressed to the lab, and any documents the offer lists.", "Applications go through the portal only, and offers close once filled, so apply early."]
    },
    linkedin: {
      ar: ["افتح المنشور الأصلي واقرأ ملف الإعلان كاملاً.", "اتبع طريقة التقديم المذكورة فيه (رابط أو بريد إلكتروني).", "تحقق من الإعلان على الموقع الرسمي للجامعة قبل إرسال وثائقك."],
      en: ["Open the original post and read the full call document.", "Follow the application route it gives (link or email).", "Confirm the call on the university's official website before sending documents."]
    }
  };
  var hasOlder = FEED.some(function (x) { return x.seen !== FEED_DATE; });
  FEED.forEach(function (x) { x._hay = norm([x.title, x.org, x.place, x.field].join(" ")); });
  function fmtDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString(state.lang === "ar" ? "ar-EG-u-nu-latn" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  function renderFeed() {
    var sec = $("#latest");
    document.querySelectorAll('a[href="#latest"]').forEach(function (a) { a.hidden = !FEED.length; });
    if (!FEED.length) { sec.hidden = true; return; }
    sec.hidden = false;
    $("#feedSub").textContent = t("feed_sub")(FEED.length, fmtDate(FEED_DATE));
    $("#feedQ").placeholder = t("feed_ph"); $("#feedQ").setAttribute("aria-label", t("feed_ph"));
    var tabs = [["", t("feed_all")], ["euraxess", "EURAXESS"], ["cnrs", "CNRS"], ["funding", t("feed_funding")]];
    if (FEED.some(function (x) { return x.source === "linkedin"; })) tabs.splice(3, 0, ["linkedin", "LinkedIn"]);
    $("#feedSeg").innerHTML = tabs.map(function (o) {
      return '<button type="button" data-feed="' + o[0] + '" aria-pressed="' + (feed.src === o[0]) + '">' + o[1] + "</button>";
    }).join("");
    var words = norm(feed.q).split(/\s+/).filter(Boolean);
    var list = FEED.filter(function (x) {
      if (feed.src === "funding" ? x.kind !== "funding" : feed.src && x.source !== feed.src) return false;
      return words.every(function (w) { return x._hay.indexOf(w) > -1; });
    });
    var soon = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
    $("#feedList").innerHTML = list.length ? list.slice(0, feed.shown).map(function (x) {
      var meta = [x.org, x.place, x.field].filter(Boolean).map(esc).join(" · ");
      var eng = x.english || (x.source === "cnrs" ? "no" : "");
      var steps = x.how ? [x.how] : FEED_HOW[x.source][state.lang];
      var how = feedOpen[x.id] ? '<ol class="feed-how">' + steps.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ol>" : "";
      return '<li class="feed-row"><div class="feed-item">' +
        '<span class="feed-main"><a href="' + esc(x.url) + '" target="_blank" rel="noopener"><strong dir="auto">' + esc(x.title) + ' ↗</strong></a><span class="feed-meta" dir="auto">' + meta + "</span></span>" +
        '<span class="feed-tags"><span class="tag src-' + x.source + '">' + SRC_NAME[x.source] + "</span>" +
        '<span class="tag">' + t(x.kind === "funding" ? "feed_funding" : "feed_phd") + "</span>" +
        (eng ? '<span class="tag en-' + eng + '">' + t("en_" + eng) + "</span>" : "") +
        (hasOlder && x.seen === FEED_DATE ? '<span class="tag full">' + t("feed_new") + "</span>" : "") +
        (x.deadline ? '<span class="tag' + (x.deadline <= soon ? " partial" : "") + '">' + t("feed_deadline") + fmtDate(x.deadline) + "</span>" : "") +
        '<button type="button" class="link-btn" data-how="' + esc(x.id) + '" aria-expanded="' + !!feedOpen[x.id] + '">' + t("feed_how") + "</button>" +
        "</span></div>" + how + "</li>";
    }).join("") : '<li class="empty">' + t("feed_empty") + "</li>";
    $("#feedMore").hidden = list.length <= feed.shown;
  }
  $("#feedQ").addEventListener("input", function (e) { feed.q = e.target.value; feed.shown = 12; renderFeed(); });
  $("#feedSeg").addEventListener("click", function (e) {
    var b = e.target.closest("[data-feed]"); if (!b) return;
    feed.src = b.dataset.feed; feed.shown = 12; renderFeed();
  });
  $("#feedList").addEventListener("click", function (e) {
    var b = e.target.closest("[data-how]"); if (!b) return;
    feedOpen[b.dataset.how] = !feedOpen[b.dataset.how]; renderFeed();
  });
  $("#feedMore").addEventListener("click", function () { feed.shown += 12; renderFeed(); });

  window.MINAH = { norm: norm, status: status, rank: rank, isOpen: isOpen, t: t, lang: function () { return state.lang; }, docs: DOCS, steps: STEPS, onLang: [] };
  function renderAll() { renderStatic(); renderControls(); renderGrid(); renderFeed(); window.MINAH.onLang.forEach(function (f) { f(); }); if ($("#modal").open && currentId) fillModal(currentId); }

  /* ---------- Modal ---------- */
  var currentId = null;
  function fillModal(id) {
    var s = DATA.filter(function (x) { return x.id === id; })[0];
    if (!s) return false;
    var L = state.lang, c = C[s.c], st = status(s), on = saved.has(s.id);
    var fields = s.fields.map(function (f) { return t("fld_" + f); }).join(L === "ar" ? "، " : ", ");
    var li = function (a) { return a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); };
    $("#modalBody").innerHTML =
      '<div class="m-head"><button type="button" class="m-close" data-close aria-label="' + t("close") + '">✕</button>' +
      '<span class="country"><span class="flag">' + c.flag + "</span>" + esc(c[L]) + "</span>" +
      '<h2 id="mTitle">' + esc(s.name[L]) + '</h2><p class="provider">' + esc(s.provider[L]) + "</p></div>" +
      '<div class="m-body"><p>' + esc(s.summary[L]) + "</p>" +
      '<div class="m-facts">' +
      '<div class="fact"><small>' + t("m_when") + "</small><b>" + esc(s.when[L]) + '</b><br><span class="status ' + st.cls + '"><i></i>' + t("st_" + st.k) + "</span></div>" +
      '<div class="fact"><small>' + t("m_funding") + "</small><b>" + t(s.funding) + "</b></div>" +
      '<div class="fact"><small>' + t("m_levels") + "</small><b>" + s.levels.map(t).join(L === "ar" ? "، " : ", ") + "</b></div>" +
      '<div class="fact"><small>' + t("m_fields") + "</small><b>" + fields + "</b></div>" +
      '<div class="fact wide"><small>' + t("m_english") + '</small><b>' + t("en_" + s.english) + "</b><br><span>" + esc(((window.ENGLISH_NOTES || {})[s.id] || {})[L] || "") + "</span></div></div>" +
      "<div><h3>" + t("m_elig") + "</h3><ul>" + li(s.elig[L]) + "</ul></div>" +
      "<div><h3>" + t("m_benefits") + "</h3><ul>" + li(s.benefits[L]) + "</ul></div>" +
      '<div class="how"><h3>' + t("m_how") + "</h3><p>" + esc(s.how[L]) + "</p></div>" +
      '<p class="warn-box">' + t("m_warn") + "</p>" +
      '<div class="m-actions"><a class="btn" href="' + s.url + '" target="_blank" rel="noopener">' + t("m_official") + " ↗</a>" +
      '<button type="button" class="btn light" data-save="' + s.id + '">' + (on ? t("unsave") : t("save")) + "</button>" +
      '<button type="button" class="btn light" data-copy>' + t("m_copy") + "</button></div></div>";
    return true;
  }
  function openModal(id, push) {
    if (!fillModal(id)) return;
    currentId = id;
    var m = $("#modal");
    if (!m.open) m.showModal();
    m.scrollTop = 0;
    if (push !== false) history.replaceState(null, "", "#s=" + id);
  }
  function closeModal() { var m = $("#modal"); if (m.open) m.close(); }

  var toastTimer;
  function toast(msg) {
    var el = $("#toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 1800);
  }

  function toggleSave(id) {
    if (saved.has(id)) { saved.delete(id); toast(t("unsaved_toast")); } else { saved.add(id); toast(t("saved_toast")); }
    store.set("saved", Array.from(saved));
    renderGrid();
    if ($("#modal").open && currentId) fillModal(currentId);
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-save],[data-open],[data-level],[data-quick],[data-close],[data-copy]");
    if (!el) return;
    if (el.dataset.save) return toggleSave(el.dataset.save);
    if (el.dataset.open) return openModal(el.dataset.open);
    if ("close" in el.dataset) return closeModal();
    if ("copy" in el.dataset) {
      var url = location.href.split("#")[0] + "#s=" + currentId;
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast(t("copied")); }, function () { toast(url); });
      else toast(url);
      return;
    }
    if ("level" in el.dataset) {
      state.level = el.dataset.level;
      if (el.parentNode.id === "quick") $("#scholarships").scrollIntoView();
    } else if (el.dataset.quick === "open") { state.open = true; $("#scholarships").scrollIntoView(); }
    else if (el.dataset.quick === "full") { state.funding = "full"; $("#scholarships").scrollIntoView(); }
    else if (el.dataset.quick === "noeng") { state.english = "no"; $("#scholarships").scrollIntoView(); }
    renderControls(); renderGrid();
  });

  $("#q").addEventListener("input", function (e) { state.q = e.target.value; renderGrid(); });
  $("#searchForm").addEventListener("submit", function (e) { e.preventDefault(); $("#scholarships").scrollIntoView(); });
  [["#fCountry", "country"], ["#fFunding", "funding"], ["#fField", "field"], ["#fEnglish", "english"], ["#sort", "sort"]].forEach(function (p) {
    $(p[0]).addEventListener("change", function (e) { state[p[1]] = e.target.value; renderGrid(); });
  });
  $("#fOpen").addEventListener("change", function (e) { state.open = e.target.checked; renderGrid(); });
  $("#fSaved").addEventListener("change", function (e) { state.saved = e.target.checked; renderGrid(); });
  $("#resetBtn").addEventListener("click", function () {
    state.q = ""; state.level = ""; state.country = ""; state.funding = ""; state.field = ""; state.english = ""; state.open = false; state.saved = false;
    renderControls(); renderGrid();
  });
  $("#langBtn").addEventListener("click", function () {
    state.lang = state.lang === "ar" ? "en" : "ar";
    store.set("lang", state.lang);
    renderAll();
  });
  $("#docs").addEventListener("change", function (e) {
    var id = e.target.dataset.doc; if (!id) return;
    if (e.target.checked) docsDone.add(id); else docsDone.delete(id);
    store.set("docs", Array.from(docsDone));
  });
  var modal = $("#modal");
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  modal.addEventListener("close", function () {
    currentId = null;
    if (location.hash.indexOf("#s=") === 0) history.replaceState(null, "", location.pathname + location.search);
  });
  function fromHash() { var m = /^#s=([\w-]+)$/.exec(location.hash); if (m) openModal(m[1], false); }
  window.addEventListener("hashchange", fromHash);

  renderAll();
  fromHash();
})();
