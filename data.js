/* بيانات المنح — كل منحة لها نص عربي وإنجليزي.
   months = الأشهر التي يكون فيها التقديم مفتوحاً عادةً (1–12). rolling = متاح طوال السنة.
   المواعيد "معتادة" وليست رسمية: الرابط الرسمي هو المرجع دائماً. */
window.DATA_UPDATED = "2026-11-13";

window.COUNTRIES = {
  de: { ar: "ألمانيا", en: "Germany", flag: "🇩🇪" },
  uk: { ar: "بريطانيا", en: "United Kingdom", flag: "🇬🇧" },
  us: { ar: "الولايات المتحدة", en: "United States", flag: "🇺🇸" },
  eu: { ar: "أوروبا (عدة دول)", en: "Europe (multiple)", flag: "🇪🇺" },
  fr: { ar: "فرنسا", en: "France", flag: "🇫🇷" },
  jp: { ar: "اليابان", en: "Japan", flag: "🇯🇵" },
  cn: { ar: "الصين", en: "China", flag: "🇨🇳" },
  tr: { ar: "تركيا", en: "Türkiye", flag: "🇹🇷" },
  hu: { ar: "هنغاريا (المجر)", en: "Hungary", flag: "🇭🇺" },
  ch: { ar: "سويسرا", en: "Switzerland", flag: "🇨🇭" },
  sa: { ar: "السعودية", en: "Saudi Arabia", flag: "🇸🇦" },
  kr: { ar: "كوريا الجنوبية", en: "South Korea", flag: "🇰🇷" },
  it: { ar: "إيطاليا", en: "Italy", flag: "🇮🇹" },
  nl: { ar: "هولندا", en: "Netherlands", flag: "🇳🇱" },
  ca: { ar: "كندا", en: "Canada", flag: "🇨🇦" },
  qa: { ar: "قطر", en: "Qatar", flag: "🇶🇦" },
  se: { ar: "السويد", en: "Sweden", flag: "🇸🇪" },
  ae: { ar: "الإمارات", en: "United Arab Emirates", flag: "🇦🇪" },
  ww: { ar: "عدة دول", en: "Multiple countries", flag: "🌍" }
};

window.SCHOLARSHIPS = [
  {
    id: "chevening", english: "varies", c: "uk", levels: ["master"], funding: "full", fields: ["all"], months: [8, 9, 10],
    name: { ar: "منحة تشيفننغ", en: "Chevening Scholarships" },
    provider: { ar: "الحكومة البريطانية", en: "UK Government (FCDO)" },
    when: { ar: "تفتح عادةً في أغسطس وتُغلق في الخريف", en: "Usually opens in August, closes in autumn" },
    summary: { ar: "ماجستير لمدة سنة في أي جامعة بريطانية، للقادة الشباب أصحاب الخبرة العملية.", en: "A one-year master's at any UK university for emerging leaders with work experience." },
    elig: { ar: ["شهادة بكالوريوس وخبرة عملية لا تقل عن سنتين", "الالتزام بالعودة إلى بلدك لمدة سنتين بعد الدراسة"], en: ["Bachelor's degree and at least two years of work experience", "Commitment to return home for two years after the award"] },
    benefits: { ar: ["الرسوم الدراسية كاملة", "راتب شهري للمعيشة", "تذاكر السفر والتأشيرة"], en: ["Full tuition fees", "Monthly living stipend", "Flights and visa costs"] },
    how: { ar: "قدّم عبر موقع تشيفننغ واختر ثلاثة برامج ماجستير، ثم قدّم على الجامعات نفسها بشكل منفصل للحصول على قبول.", en: "Apply on the Chevening portal with three course choices, and apply separately to the universities for an offer." },
    url: "https://www.chevening.org/scholarships/", kw: "england uk britain انجلترا المملكة المتحدة"
  },
  {
    id: "fulbright", english: "yes", c: "us", levels: ["master", "phd"], funding: "full", fields: ["all"], months: [],
    name: { ar: "برنامج فولبرايت للطلبة الأجانب", en: "Fulbright Foreign Student Program" },
    provider: { ar: "وزارة الخارجية الأمريكية", en: "U.S. Department of State" },
    when: { ar: "الموعد يختلف حسب بلدك", en: "Deadline varies by country" },
    summary: { ar: "أشهر منحة أمريكية للدراسات العليا والبحث، تُدار في كل بلد عبر لجنة فولبرايت أو السفارة الأمريكية.", en: "The flagship U.S. award for graduate study and research, run in each country by the Fulbright Commission or U.S. Embassy." },
    elig: { ar: ["شهادة بكالوريوس ومستوى جيد في الإنجليزية", "أن تكون مواطناً ومقيماً في بلد مشارك"], en: ["Bachelor's degree and good English", "Citizen and resident of a participating country"] },
    benefits: { ar: ["الرسوم الدراسية", "راتب معيشة وتأمين صحي", "تذاكر السفر"], en: ["Tuition", "Living stipend and health insurance", "Airfare"] },
    how: { ar: "اختر بلدك من موقع البرنامج لتصل إلى الجهة المسؤولة ومواعيدها وشروطها الخاصة.", en: "Select your country on the programme site to find the local office, its deadlines and requirements." },
    url: "https://foreign.fulbrightonline.org/", kw: "america usa امريكا أمريكا"
  },
  {
    id: "erasmus-mundus", english: "varies", c: "eu", levels: ["master"], funding: "full", fields: ["all"], months: [10, 11, 12, 1],
    name: { ar: "ماجستير إيراسموس موندوس المشترك", en: "Erasmus Mundus Joint Masters" },
    provider: { ar: "الاتحاد الأوروبي", en: "European Union" },
    when: { ar: "أغلب البرامج تستقبل الطلبات بين أكتوبر ويناير", en: "Most programmes accept applications October–January" },
    summary: { ar: "برامج ماجستير تدرس فيها في دولتين أوروبيتين أو أكثر وتحصل على شهادة مشتركة أو مزدوجة.", en: "Master's programmes taught across two or more European countries, leading to a joint or multiple degree." },
    elig: { ar: ["شهادة بكالوريوس (أو في السنة الأخيرة)", "لكل برنامج شروطه وموعده الخاص"], en: ["Bachelor's degree (or final-year student)", "Each programme sets its own requirements and deadline"] },
    benefits: { ar: ["إعفاء من الرسوم الدراسية", "راتب شهري للمعيشة والسفر", "تأمين صحي"], en: ["Tuition covered", "Monthly allowance for living and travel", "Insurance"] },
    how: { ar: "تصفّح كتالوج البرامج، اختر ما يناسب تخصصك، وقدّم مباشرة على موقع كل برنامج.", en: "Browse the catalogue, pick programmes in your field, and apply directly on each programme's website." },
    url: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en", kw: "emjm emjmd erasmus+ ايراسموس"
  },
  {
    id: "msca-dn", english: "varies", c: "eu", levels: ["phd"], funding: "salary", fields: ["all"], months: [], rolling: true,
    name: { ar: "شبكات الدكتوراه ماري كوري (MSCA)", en: "MSCA Doctoral Networks" },
    provider: { ar: "المفوضية الأوروبية — تُنشر على EURAXESS", en: "European Commission — advertised on EURAXESS" },
    when: { ar: "مقاعد جديدة تُنشر طوال السنة", en: "New positions are posted all year" },
    summary: { ar: "وظائف دكتوراه براتب ممتاز ضمن مشاريع بحثية أوروبية، مع تدريب في أكثر من دولة.", en: "Well-paid doctoral positions inside European research projects, with training across several countries." },
    elig: { ar: ["ألا تكون حاصلاً على الدكتوراه", "قاعدة التنقل: ألا تكون أقمت في بلد الجامعة المستضيفة أكثر من 12 شهراً خلال آخر 3 سنوات"], en: ["You must not already hold a doctorate", "Mobility rule: no more than 12 months in the host country during the last 3 years"] },
    benefits: { ar: ["راتب شهري بعقد عمل", "بدل تنقل وبدل عائلة", "تمويل للتدريب والمؤتمرات"], en: ["Monthly salary under an employment contract", "Mobility and family allowances", "Training and conference budget"] },
    how: { ar: "ابحث في EURAXESS عن \"MSCA Doctoral Network\" مع تخصصك، وقدّم على كل مقعد حسب تعليمات الإعلان.", en: "Search EURAXESS for \"MSCA Doctoral Network\" plus your field, and apply to each position as its advert describes." },
    url: "https://euraxess.ec.europa.eu/jobs/search", kw: "marie curie euraxess ماري كوري يوراكسس"
  },
  {
    id: "cnrs", english: "no", c: "fr", levels: ["phd"], funding: "salary", fields: ["stem", "life", "social"], months: [], rolling: true,
    name: { ar: "عقود الدكتوراه في CNRS", en: "CNRS PhD Contracts" },
    provider: { ar: "المركز الوطني الفرنسي للبحث العلمي", en: "French National Centre for Scientific Research" },
    when: { ar: "إعلانات جديدة طوال السنة", en: "New offers all year" },
    summary: { ar: "عقود دكتوراه لثلاث سنوات براتب شهري داخل مختبرات CNRS في فرنسا، في كل المجالات العلمية.", en: "Three-year salaried PhD contracts in CNRS laboratories across France, in every scientific field." },
    elig: { ar: ["شهادة ماجستير أو ما يعادلها", "مطابقة ملفك لموضوع البحث المعلن"], en: ["Master's degree or equivalent", "A profile matching the advertised research topic"] },
    benefits: { ar: ["راتب شهري بعقد عمل", "ضمان اجتماعي وتأمين صحي", "العمل داخل مختبر بحثي متقدم"], en: ["Monthly salary under an employment contract", "Social security and health cover", "Work in a leading research lab"] },
    how: { ar: "ادخل بوابة التوظيف، اختر \"Doctorant\"، وقدّم سيرتك ورسالة الدافع على الإعلان مباشرة.", en: "Open the careers portal, filter by \"PhD student\", and submit your CV and cover letter on the offer." },
    url: "https://emploi.cnrs.fr/", kw: "france فرنسا مختبر"
  },
  {
    id: "eiffel", english: "varies", c: "fr", levels: ["master", "phd"], funding: "partial", fields: ["stem", "social"], months: [10, 11, 12, 1],
    name: { ar: "منحة إيفل للتميّز", en: "Eiffel Excellence Scholarship" },
    provider: { ar: "وزارة أوروبا والشؤون الخارجية الفرنسية", en: "French Ministry for Europe and Foreign Affairs" },
    when: { ar: "الترشيح عبر الجامعات الفرنسية، والموعد النهائي عادةً في يناير", en: "Nomination by French institutions; deadline usually in January" },
    summary: { ar: "منحة للماجستير أو لفترة بحثية ضمن الدكتوراه في فرنسا، يرشّحك لها المعهد الفرنسي الذي قبلك.", en: "Funds a master's or a doctoral research stay in France; the French institution that admits you nominates you." },
    elig: { ar: ["الماجستير: حتى 25 سنة — الدكتوراه: حتى 30 سنة", "لا يمكن التقديم مباشرة: الترشيح عبر الجامعة الفرنسية فقط"], en: ["Master's: up to 25 years old — PhD: up to 30", "No direct applications: the French institution must nominate you"] },
    benefits: { ar: ["راتب شهري", "تذاكر السفر والتأمين الصحي", "لا تشمل الرسوم الدراسية"], en: ["Monthly allowance", "Travel and health insurance", "Tuition fees are not covered"] },
    how: { ar: "تواصل مبكراً (سبتمبر–أكتوبر) مع الجامعة الفرنسية التي تريدها واطلب ترشيحك لمنحة إيفل.", en: "Contact your target French institution early (Sept–Oct) and ask to be nominated for Eiffel." },
    url: "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence", kw: "france campus france فرنسا ايفل"
  },
  {
    id: "daad-epos", english: "yes", c: "de", levels: ["master", "phd"], funding: "full", fields: ["all"], months: [8, 9, 10],
    name: { ar: "منح DAAD للدراسات العليا التنموية (EPOS)", en: "DAAD Development-Related Postgraduate Courses (EPOS)" },
    provider: { ar: "الهيئة الألمانية للتبادل الأكاديمي", en: "German Academic Exchange Service" },
    when: { ar: "أغلب البرامج بين أغسطس وأكتوبر (يختلف حسب البرنامج)", en: "Mostly August–October (varies by course)" },
    summary: { ar: "ماجستير ودكتوراه في برامج محددة بألمانيا لأصحاب الخبرة المهنية من الدول النامية.", en: "Selected master's and PhD courses in Germany for professionals from developing countries." },
    elig: { ar: ["خبرة مهنية لا تقل عن سنتين بعد البكالوريوس", "أن يكون تخرجك خلال آخر 6 سنوات عادةً"], en: ["At least two years of professional experience", "Degree usually obtained within the last six years"] },
    benefits: { ar: ["راتب شهري", "تأمين صحي وبدل سفر", "دورة لغة ألمانية قبل الدراسة"], en: ["Monthly stipend", "Health insurance and travel allowance", "German language course before studies"] },
    how: { ar: "اختر برنامجاً من قائمة EPOS وأرسل طلبك للجامعة نفسها باستخدام نموذج DAAD.", en: "Choose a course from the EPOS list and send your application to the university using the DAAD form." },
    url: "https://www.daad.de/en/studying-in-germany/scholarships/daad-scholarships/", kw: "germany المانيا داد"
  },
  {
    id: "daad-helmut-schmidt", english: "yes", c: "de", levels: ["master"], funding: "full", fields: ["social"], months: [6, 7],
    name: { ar: "برنامج هلموت شميت (السياسات العامة والحكم الرشيد)", en: "DAAD Helmut-Schmidt-Programme (Public Policy & Good Governance)" },
    provider: { ar: "الهيئة الألمانية للتبادل الأكاديمي", en: "German Academic Exchange Service" },
    when: { ar: "يونيو – يوليو من كل سنة", en: "June – July each year" },
    summary: { ar: "ماجستير في السياسات العامة والإدارة والتنمية في جامعات ألمانية مختارة.", en: "Master's degrees in public policy, administration and development at selected German universities." },
    elig: { ar: ["بكالوريوس في العلوم الاجتماعية أو السياسية أو القانون أو الاقتصاد أو الإدارة", "خريجون من الدول النامية"], en: ["Bachelor's in social or political science, law, economics or administration", "Graduates from developing countries"] },
    benefits: { ar: ["راتب شهري ودراسة دون رسوم", "تأمين صحي وبدل سفر", "دورة لغة ألمانية"], en: ["Monthly stipend and tuition-free study", "Health insurance and travel allowance", "German language course"] },
    how: { ar: "قدّم مباشرة للجامعات المشاركة (حتى برنامجين) خلال فترة التقديم.", en: "Apply directly to the participating universities (up to two courses) during the window." },
    url: "https://www.daad.de/en/studying-in-germany/scholarships/daad-scholarships/", kw: "germany المانيا ppgg"
  },
  {
    id: "daad-phd", english: "varies", c: "de", levels: ["phd"], funding: "full", fields: ["all"], months: [],
    name: { ar: "منح DAAD البحثية للدكتوراه في ألمانيا", en: "DAAD Research Grants – Doctoral Programmes in Germany" },
    provider: { ar: "الهيئة الألمانية للتبادل الأكاديمي", en: "German Academic Exchange Service" },
    when: { ar: "الموعد يختلف حسب بلدك", en: "Deadline varies by country" },
    summary: { ar: "تمويل دكتوراه كاملة في جامعة أو مركز بحثي ألماني، في كل التخصصات.", en: "Funding for a full doctorate at a German university or research institute, in any field." },
    elig: { ar: ["ماجستير بتقدير جيد، تخرّج حديث (خلال 6 سنوات عادةً)", "موافقة مشرف ألماني أو قبول في برنامج دكتوراه"], en: ["Good master's degree, obtained recently (usually within six years)", "A German supervisor's acceptance or admission to a doctoral programme"] },
    benefits: { ar: ["راتب شهري", "تأمين صحي وبدل سفر", "بدل للأسرة في بعض الحالات"], en: ["Monthly stipend", "Health insurance and travel allowance", "Family allowances in some cases"] },
    how: { ar: "ابحث في قاعدة منح DAAD باسم بلدك، ثم جهّز المقترح البحثي وخطاب المشرف وقدّم عبر بوابة DAAD.", en: "Search the DAAD database for your country, then prepare a proposal and supervisor letter and apply on the DAAD portal." },
    url: "https://www.daad.de/en/studying-in-germany/scholarships/daad-scholarships/", kw: "germany المانيا داد"
  },
  {
    id: "mext", english: "no", c: "jp", levels: ["bachelor", "master", "phd"], funding: "full", fields: ["all"], months: [4, 5, 6],
    name: { ar: "منحة الحكومة اليابانية (MEXT)", en: "Japanese Government (MEXT) Scholarship" },
    provider: { ar: "وزارة التعليم اليابانية", en: "Japan's Ministry of Education (MEXT)" },
    when: { ar: "التقديم عبر السفارة عادةً بين أبريل ويونيو", en: "Embassy track usually April–June" },
    summary: { ar: "منحة كاملة للدراسة في الجامعات اليابانية لكل الدرجات، مع سنة تحضيرية للغة اليابانية عند الحاجة.", en: "Full scholarship to study at Japanese universities at every level, with a preparatory Japanese year if needed." },
    elig: { ar: ["البكالوريوس: خريجو الثانوية حديثاً — الدراسات العليا: تحت 35 سنة عادةً", "اجتياز اختبارات ومقابلة في السفارة اليابانية"], en: ["Undergraduate: recent school leavers — graduate: usually under 35", "Pass the written tests and interview at the Japanese Embassy"] },
    benefits: { ar: ["الرسوم الدراسية كاملة", "راتب شهري", "تذاكر السفر"], en: ["Full tuition", "Monthly stipend", "Airfare"] },
    how: { ar: "تابع إعلان السفارة اليابانية في بلدك، وقدّم الأوراق لها مباشرة.", en: "Watch for the announcement from the Japanese Embassy in your country and submit your documents there." },
    url: "https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/", kw: "japan اليابان مونبوشو monbukagakusho"
  },
  {
    id: "csc", english: "varies", c: "cn", levels: ["bachelor", "master", "phd"], funding: "full", fields: ["all"], months: [12, 1, 2, 3, 4],
    name: { ar: "منحة الحكومة الصينية (CSC)", en: "Chinese Government Scholarship (CSC)" },
    provider: { ar: "مجلس المنح الصيني", en: "China Scholarship Council" },
    when: { ar: "عادةً من ديسمبر إلى أبريل", en: "Usually December to April" },
    summary: { ar: "منحة كاملة للدراسة في مئات الجامعات الصينية، ببرامج بالإنجليزية أو الصينية.", en: "Full scholarship at hundreds of Chinese universities, with programmes in English or Chinese." },
    elig: { ar: ["غير صيني الجنسية وبصحة جيدة", "حدود عمرية: 25 للبكالوريوس، 35 للماجستير، 40 للدكتوراه"], en: ["Non-Chinese citizen in good health", "Age limits: 25 bachelor's, 35 master's, 40 PhD"] },
    benefits: { ar: ["الرسوم الدراسية والسكن", "راتب شهري", "تأمين صحي"], en: ["Tuition and accommodation", "Monthly stipend", "Medical insurance"] },
    how: { ar: "قدّم عبر بوابة CSC إما عن طريق السفارة الصينية (النوع A) أو عن طريق الجامعة مباشرة (النوع B).", en: "Apply on the CSC portal, either through the Chinese Embassy (Type A) or directly through a university (Type B)." },
    url: "https://studyinchina.csc.edu.cn/", kw: "china الصين"
  },
  {
    id: "turkiye", english: "varies", c: "tr", levels: ["bachelor", "master", "phd"], funding: "full", fields: ["all"], months: [1, 2],
    name: { ar: "المنح التركية (Türkiye Bursları)", en: "Türkiye Scholarships" },
    provider: { ar: "الحكومة التركية", en: "Government of Türkiye" },
    when: { ar: "عادةً من 10 يناير إلى 20 فبراير", en: "Usually 10 January – 20 February" },
    summary: { ar: "منحة كاملة لكل الدرجات تشمل سنة لتعلّم اللغة التركية، بطلب واحد إلكتروني.", en: "Full scholarship at every level including a Turkish language year, through a single online application." },
    elig: { ar: ["تحت 21 سنة للبكالوريوس، 30 للماجستير، 35 للدكتوراه", "حد أدنى للمعدل (70% للبكالوريوس و75% للدراسات العليا عادةً)"], en: ["Under 21 for bachelor's, 30 for master's, 35 for PhD", "Minimum grades (usually 70% bachelor's, 75% graduate)"] },
    benefits: { ar: ["الرسوم الدراسية والسكن", "راتب شهري وتأمين صحي", "تذكرة سفر ذهاب وعودة"], en: ["Tuition and accommodation", "Monthly stipend and health insurance", "Return flight ticket"] },
    how: { ar: "أنشئ حساباً على بوابة المنح التركية وارفع أوراقك؛ لا حاجة لقبول مسبق من جامعة.", en: "Create an account on the Türkiye Scholarships portal and upload your documents; no prior admission needed." },
    url: "https://www.turkiyeburslari.gov.tr/", kw: "turkey تركيا"
  },
  {
    id: "stipendium-hungaricum", english: "varies", c: "hu", levels: ["bachelor", "master", "phd"], funding: "full", fields: ["all"], months: [11, 12, 1],
    name: { ar: "منحة ستيبنديوم هنغاريكوم", en: "Stipendium Hungaricum" },
    provider: { ar: "الحكومة الهنغارية", en: "Government of Hungary" },
    when: { ar: "عادةً من نوفمبر إلى منتصف يناير", en: "Usually November to mid-January" },
    summary: { ar: "منحة حكومية للدراسة في الجامعات الهنغارية لكل الدرجات، متاحة لمعظم الدول العربية.", en: "Government scholarship for study at Hungarian universities at every level, open to most Arab countries." },
    elig: { ar: ["أن يكون بلدك شريكاً في البرنامج", "ترشيح من الجهة الشريكة في بلدك (غالباً وزارة التعليم العالي)"], en: ["Your country must be a sending partner", "Nomination by the partner body at home (often the higher-education ministry)"] },
    benefits: { ar: ["إعفاء من الرسوم الدراسية", "راتب شهري وبدل سكن", "تأمين صحي"], en: ["Tuition-free study", "Monthly stipend and housing contribution", "Medical insurance"] },
    how: { ar: "قدّم عبر نظام DreamApply، وقدّم كذلك للجهة الشريكة في بلدك للحصول على الترشيح.", en: "Apply through the DreamApply system, and also to the sending partner in your country for nomination." },
    url: "https://stipendiumhungaricum.hu/", kw: "hungary المجر هنغاريا"
  },
  {
    id: "gates-cambridge", english: "yes", c: "uk", levels: ["master", "phd"], funding: "full", fields: ["all"], months: [9, 10, 11, 12],
    name: { ar: "منحة غيتس كامبريدج", en: "Gates Cambridge Scholarship" },
    provider: { ar: "جامعة كامبريدج", en: "University of Cambridge" },
    when: { ar: "يفتح في سبتمبر، والموعد النهائي في ديسمبر أو مطلع يناير حسب البرنامج", en: "Opens in September; deadline in December or early January by course" },
    summary: { ar: "منحة كاملة للدراسات العليا في كامبريدج للمتفوقين أصحاب أثر اجتماعي.", en: "Full-cost award for postgraduate study at Cambridge for outstanding applicants committed to improving others' lives." },
    elig: { ar: ["من خارج بريطانيا", "التقديم لبرنامج دكتوراه أو ماجستير بدوام كامل في كامبريدج"], en: ["Citizen of any country outside the UK", "Applying for a full-time PhD or master's at Cambridge"] },
    benefits: { ar: ["الرسوم الدراسية كاملة", "راتب معيشة سنوي", "تذاكر السفر والتأشيرة"], en: ["Full university fees", "Annual maintenance allowance", "Airfare and visa costs"] },
    how: { ar: "قدّم على القبول في كامبريدج واختر التقديم لمنحة غيتس داخل الطلب نفسه.", en: "Apply for admission to Cambridge and tick the Gates Cambridge funding section in the same form." },
    url: "https://www.gatescambridge.org/", kw: "cambridge كامبردج england"
  },
  {
    id: "rhodes", english: "yes", c: "uk", levels: ["master", "phd"], funding: "full", fields: ["all"], months: [6, 7, 8, 9],
    name: { ar: "منحة رودس", en: "Rhodes Scholarship" },
    provider: { ar: "جامعة أكسفورد — مؤسسة رودس", en: "University of Oxford — Rhodes Trust" },
    when: { ar: "يفتح عادةً في يونيو ويُغلق في أواخر الصيف (حسب المنطقة)", en: "Usually opens in June and closes in late summer (by region)" },
    summary: { ar: "أعرق منحة دراسات عليا في أكسفورد، ولها مقاعد مخصصة لسوريا والأردن ولبنان وفلسطين ودول عربية أخرى.", en: "The oldest graduate award at Oxford, with dedicated places for Syria, Jordan, Lebanon, Palestine and other Arab countries." },
    elig: { ar: ["تفوق أكاديمي وحدود عمرية (غالباً تحت 25–27 سنة)", "الانتماء لإحدى المناطق المؤهلة"], en: ["Academic excellence and an age limit (usually under 25–27)", "Belonging to an eligible constituency"] },
    benefits: { ar: ["رسوم أكسفورد كاملة", "راتب معيشة سنوي", "تذاكر السفر"], en: ["Full Oxford fees", "Annual living stipend", "Airfare"] },
    how: { ar: "اختر منطقتك في موقع رودس وقدّم الطلب مع رسائل التوصية قبل موعد منطقتك.", en: "Pick your constituency on the Rhodes site and submit the application with references before its deadline." },
    url: "https://www.rhodeshouse.ox.ac.uk/scholarships/", kw: "oxford اكسفورد england"
  },
  {
    id: "clarendon", english: "yes", c: "uk", levels: ["master", "phd"], funding: "full", fields: ["all"], months: [9, 10, 11, 12, 1],
    name: { ar: "منحة كلارندون", en: "Clarendon Scholarships" },
    provider: { ar: "جامعة أكسفورد", en: "University of Oxford" },
    when: { ar: "مع موعد القبول في أكسفورد (ديسمبر أو يناير)", en: "With the Oxford admission deadline (December or January)" },
    summary: { ar: "منح كاملة للدراسات العليا في أكسفورد بناءً على التميز الأكاديمي، دون طلب منفصل.", en: "Fully funded graduate awards at Oxford based on academic merit, with no separate application." },
    elig: { ar: ["التقديم لبرنامج دراسات عليا في أكسفورد قبل موعد التمويل", "كل الجنسيات والتخصصات"], en: ["Apply to an Oxford graduate course by the funding deadline", "All nationalities and subjects"] },
    benefits: { ar: ["الرسوم الدراسية كاملة", "راتب معيشة سنوي"], en: ["Full course fees", "Annual living grant"] },
    how: { ar: "قدّم على القبول قبل موعد ديسمبر/يناير وسيُنظر في ملفك للمنحة تلقائياً.", en: "Apply for admission by the December/January deadline and you are considered automatically." },
    url: "https://www.ox.ac.uk/clarendon", kw: "oxford اكسفورد england"
  },
  {
    id: "said-foundation", english: "yes", c: "uk", levels: ["master"], funding: "full", fields: ["all"], months: [],
    name: { ar: "منح مؤسسة سعيد", en: "Saïd Foundation Scholarships" },
    provider: { ar: "مؤسسة سعيد", en: "Saïd Foundation" },
    when: { ar: "يُعلن الموعد سنوياً على موقع المؤسسة", en: "Announced each year on the foundation's site" },
    summary: { ar: "منح ماجستير في بريطانيا مخصصة لأبناء سوريا والأردن ولبنان وفلسطين.", en: "Master's scholarships in the UK reserved for people from Syria, Jordan, Lebanon and Palestine." },
    elig: { ar: ["من سوريا أو الأردن أو لبنان أو فلسطين", "خبرة عملية ورغبة واضحة في خدمة بلدك بعد التخرج"], en: ["From Syria, Jordan, Lebanon or Palestine", "Work experience and a clear plan to contribute at home"] },
    benefits: { ar: ["الرسوم الدراسية", "مصاريف المعيشة", "تذاكر السفر"], en: ["Tuition fees", "Living costs", "Travel"] },
    how: { ar: "قدّم عبر موقع المؤسسة، وقدّم بالتوازي على الجامعات البريطانية.", en: "Apply on the foundation's website and, in parallel, to UK universities." },
    url: "https://www.saidfoundation.org/", kw: "jordan syria lebanon palestine الاردن سوريا لبنان فلسطين"
  },
  {
    id: "swiss-excellence", english: "varies", c: "ch", levels: ["phd"], funding: "full", fields: ["all"], months: [8, 9, 10, 11, 12],
    name: { ar: "منح التميّز الحكومية السويسرية", en: "Swiss Government Excellence Scholarships" },
    provider: { ar: "الحكومة السويسرية (FCS)", en: "Swiss Confederation (FCS)" },
    when: { ar: "عادةً بين أغسطس وديسمبر (حسب بلدك)", en: "Usually August–December (by country)" },
    summary: { ar: "منح للدكتوراه والبحث وما بعد الدكتوراه في الجامعات السويسرية.", en: "Awards for PhD, research stays and postdocs at Swiss universities." },
    elig: { ar: ["شهادة ماجستير", "رسالة دعم من أستاذ مشرف في جامعة سويسرية"], en: ["Master's degree", "A support letter from a host professor at a Swiss university"] },
    benefits: { ar: ["راتب شهري", "إعفاء من الرسوم وتأمين صحي", "بدل سكن وسفر"], en: ["Monthly stipend", "Tuition waiver and health insurance", "Housing and travel allowance"] },
    how: { ar: "حمّل ملف بلدك من الموقع الرسمي وقدّم الطلب عبر السفارة السويسرية.", en: "Download your country's package from the official site and apply through the Swiss Embassy." },
    url: "https://www.sbfi.admin.ch/scholarships_eng", kw: "switzerland سويسرا"
  },
  {
    id: "eth-esop", english: "yes", c: "ch", levels: ["master"], funding: "full", fields: ["stem"], months: [11, 12],
    name: { ar: "منحة التميّز من ETH زيورخ (ESOP)", en: "ETH Zurich Excellence Scholarship (ESOP)" },
    provider: { ar: "المعهد الفدرالي السويسري للتقنية", en: "ETH Zurich" },
    when: { ar: "نوفمبر – منتصف ديسمبر مع طلب الماجستير", en: "November – mid-December with the master's application" },
    summary: { ar: "منحة للمتفوقين في ماجستير العلوم والهندسة في واحدة من أفضل جامعات العالم.", en: "For top students entering a science or engineering master's at one of the world's leading universities." },
    elig: { ar: ["نتائج ممتازة في البكالوريوس (ضمن الأوائل)", "مقترح مشروع ماجستير"], en: ["Excellent bachelor's results (top of class)", "A master's thesis pre-proposal"] },
    benefits: { ar: ["منحة لتغطية المعيشة والدراسة", "إعفاء من الرسوم الدراسية"], en: ["Grant for living and study costs", "Tuition fee waiver"] },
    how: { ar: "قدّم طلب المنحة داخل طلب القبول للماجستير في ETH خلال فترة التقديم.", en: "Submit the scholarship request inside your ETH master's application during the window." },
    url: "https://ethz.ch/en/studies/financial/scholarships/excellencescholarship.html", kw: "switzerland سويسرا zurich"
  },
  {
    id: "kaust", english: "yes", c: "sa", levels: ["master", "phd"], funding: "full", fields: ["stem", "life"], months: [], rolling: true,
    name: { ar: "زمالة جامعة الملك عبدالله (KAUST)", en: "KAUST Fellowship" },
    provider: { ar: "جامعة الملك عبدالله للعلوم والتقنية", en: "King Abdullah University of Science and Technology" },
    when: { ar: "القبول مفتوح أغلب السنة", en: "Admissions open most of the year" },
    summary: { ar: "كل طالب مقبول في الماجستير أو الدكتوراه يحصل على زمالة كاملة في العلوم والهندسة.", en: "Every admitted master's or PhD student receives a full fellowship in science and engineering." },
    elig: { ar: ["بكالوريوس أو ماجستير في تخصص علمي أو هندسي", "شهادة لغة إنجليزية (TOEFL / IELTS)"], en: ["Bachelor's or master's in a science or engineering field", "English test (TOEFL / IELTS)"] },
    benefits: { ar: ["الرسوم الدراسية كاملة", "راتب شهري وسكن", "تأمين صحي وتذاكر سفر"], en: ["Full tuition", "Monthly stipend and housing", "Medical cover and relocation"] },
    how: { ar: "قدّم إلكترونياً عبر بوابة القبول في KAUST مع كشف العلامات ورسائل التوصية وبيان الغرض.", en: "Apply online through KAUST admissions with transcripts, recommendation letters and a statement of purpose." },
    url: "https://admissions.kaust.edu.sa/", kw: "saudi السعودية كاوست"
  },
  {
    id: "gks", english: "no", c: "kr", levels: ["bachelor", "master", "phd"], funding: "full", fields: ["all"], months: [2, 3, 9, 10],
    name: { ar: "منحة كوريا العالمية (GKS)", en: "Global Korea Scholarship (GKS)" },
    provider: { ar: "الحكومة الكورية", en: "Government of Korea (NIIED)" },
    when: { ar: "الدراسات العليا: فبراير–مارس • البكالوريوس: سبتمبر–أكتوبر", en: "Graduate: Feb–Mar • Undergraduate: Sep–Oct" },
    summary: { ar: "منحة كاملة في الجامعات الكورية تشمل سنة لتعلّم اللغة الكورية.", en: "Full scholarship at Korean universities, including a year of Korean language training." },
    elig: { ar: ["تحت 25 سنة للبكالوريوس وتحت 40 للدراسات العليا", "معدل لا يقل عن 80% تقريباً"], en: ["Under 25 for undergraduate, under 40 for graduate", "Grades of roughly 80% or above"] },
    benefits: { ar: ["الرسوم الدراسية كاملة", "راتب شهري وتأمين صحي", "تذاكر السفر"], en: ["Full tuition", "Monthly stipend and insurance", "Airfare"] },
    how: { ar: "قدّم عبر السفارة الكورية في بلدك أو عبر جامعة كورية مشاركة.", en: "Apply through the Korean Embassy in your country or through a participating university." },
    url: "https://www.studyinkorea.go.kr/", kw: "korea كوريا niied"
  },
  {
    id: "maeci", english: "yes", c: "it", levels: ["master", "phd"], funding: "full", fields: ["all"], months: [4, 5, 6],
    name: { ar: "منح الحكومة الإيطالية (MAECI)", en: "Italian Government Scholarships (MAECI)" },
    provider: { ar: "وزارة الخارجية الإيطالية", en: "Italian Ministry of Foreign Affairs" },
    when: { ar: "عادةً في الربيع (أبريل–يونيو)", en: "Usually in spring (April–June)" },
    summary: { ar: "منح للماجستير والدكتوراه والبحث ودورات اللغة في المؤسسات الإيطالية.", en: "Grants for master's, PhD, research and language courses at Italian institutions." },
    elig: { ar: ["أن يكون بلدك ضمن قائمة الدول المؤهلة لذلك العام", "حدود عمرية حسب الدرجة"], en: ["Your country must be on that year's eligible list", "Age limits by level of study"] },
    benefits: { ar: ["راتب شهري", "إعفاء من الرسوم الدراسية غالباً", "تأمين صحي"], en: ["Monthly allowance", "Tuition usually waived", "Health insurance"] },
    how: { ar: "قدّم عبر بوابة Study in Italy بعد صدور الإعلان السنوي.", en: "Apply on the Study in Italy portal once the annual call is published." },
    url: "https://studyinitaly.esteri.it/", kw: "italy ايطاليا"
  },
  {
    id: "holland", english: "yes", c: "nl", levels: ["bachelor", "master"], funding: "partial", fields: ["all"], months: [11, 12, 1, 2, 3, 4],
    name: { ar: "منحة هولندا (NL Scholarship)", en: "NL Scholarship (Holland Scholarship)" },
    provider: { ar: "وزارة التعليم الهولندية والجامعات", en: "Dutch Ministry of Education and universities" },
    when: { ar: "الموعد النهائي 1 فبراير أو 1 مايو حسب الجامعة", en: "Deadline 1 February or 1 May depending on the university" },
    summary: { ar: "منحة جزئية لمرة واحدة لطلبة البكالوريوس والماجستير من خارج أوروبا.", en: "A one-off partial grant for non-EEA bachelor's and master's students." },
    elig: { ar: ["من خارج المنطقة الاقتصادية الأوروبية", "لم تدرس في هولندا من قبل"], en: ["Citizen of a non-EEA country", "No previous degree studies in the Netherlands"] },
    benefits: { ar: ["مبلغ 5,000 يورو في السنة الأولى"], en: ["€5,000 in the first year of study"] },
    how: { ar: "قدّم عبر الجامعة الهولندية التي تريد الدراسة فيها.", en: "Apply through the Dutch university where you plan to study." },
    url: "https://www.studyinnl.org/finances/nl-scholarship", kw: "netherlands holland هولندا"
  },
  {
    id: "pearson", english: "yes", c: "ca", levels: ["bachelor"], funding: "full", fields: ["all"], months: [9, 10, 11, 12, 1],
    name: { ar: "منحة لستر بيرسون الدولية", en: "Lester B. Pearson International Scholarship" },
    provider: { ar: "جامعة تورنتو", en: "University of Toronto" },
    when: { ar: "ترشيح المدرسة في الخريف، والطلب حتى يناير", en: "School nomination in autumn; application by January" },
    summary: { ar: "منحة بكالوريوس كاملة لأربع سنوات في جامعة تورنتو للمتفوقين والقادة في مدارسهم.", en: "A full four-year undergraduate scholarship at the University of Toronto for top students and school leaders." },
    elig: { ar: ["طالب دولي في السنة الأخيرة من الثانوية أو تخرّج حديثاً", "ترشيح من مدرستك"], en: ["International student in the final year of school or a recent graduate", "Nomination by your school"] },
    benefits: { ar: ["الرسوم الدراسية والكتب", "السكن كاملاً لأربع سنوات"], en: ["Tuition and books", "Full residence support for four years"] },
    how: { ar: "اطلب من مدرستك ترشيحك، قدّم على القبول في الجامعة، ثم أكمل طلب المنحة.", en: "Ask your school to nominate you, apply for admission, then complete the scholarship application." },
    url: "https://future.utoronto.ca/pearson/", kw: "canada كندا toronto تورنتو"
  },
  {
    id: "knight-hennessy", english: "yes", c: "us", levels: ["master", "phd"], funding: "full", fields: ["all"], months: [6, 7, 8, 9, 10],
    name: { ar: "منحة نايت-هينيسي", en: "Knight-Hennessy Scholars" },
    provider: { ar: "جامعة ستانفورد", en: "Stanford University" },
    when: { ar: "الموعد النهائي عادةً مطلع أكتوبر", en: "Deadline usually in early October" },
    summary: { ar: "تمويل كامل حتى ثلاث سنوات لأي برنامج دراسات عليا في ستانفورد.", en: "Up to three years of full funding for any graduate programme at Stanford." },
    elig: { ar: ["التقديم لبرنامج دراسات عليا بدوام كامل في ستانفورد", "شهادة بكالوريوس حديثة نسبياً"], en: ["Applying to a full-time Stanford graduate programme", "A reasonably recent bachelor's degree"] },
    benefits: { ar: ["الرسوم الدراسية", "راتب للمعيشة", "بدل سفر سنوي"], en: ["Tuition", "Living stipend", "Annual travel stipend"] },
    how: { ar: "قدّم طلب المنحة، وقدّم بشكل منفصل على برنامجك في ستانفورد.", en: "Submit the scholar application, and separately apply to your Stanford programme." },
    url: "https://knight-hennessy.stanford.edu/", kw: "usa stanford امريكا ستانفورد"
  },
  {
    id: "nyuad", english: "varies", c: "ae", levels: ["bachelor"], funding: "full", fields: ["all"], months: [9, 10, 11, 12, 1],
    name: { ar: "الدعم المالي في جامعة نيويورك أبوظبي", en: "NYU Abu Dhabi Financial Support" },
    provider: { ar: "جامعة نيويورك أبوظبي", en: "NYU Abu Dhabi" },
    when: { ar: "القرار المبكر في نوفمبر، والعادي في يناير", en: "Early decision in November; regular in January" },
    summary: { ar: "دعم مالي سخي حسب الحاجة لطلبة البكالوريوس من كل الجنسيات، قد يغطي كامل التكاليف.", en: "Generous need-based aid for undergraduates of every nationality, which can cover the full cost." },
    elig: { ar: ["تفوق أكاديمي ونشاطات خارج الصف", "تقديم نماذج الوضع المالي للأسرة"], en: ["Strong academics and activities", "Family financial information forms"] },
    benefits: { ar: ["الرسوم الدراسية", "السكن والوجبات", "تذاكر سفر وتأمين صحي"], en: ["Tuition", "Housing and meals", "Flights and health insurance"] },
    how: { ar: "قدّم عبر Common Application واختر حرم أبوظبي، ثم أكمل طلب الدعم المالي.", en: "Apply via the Common Application choosing the Abu Dhabi campus, then complete the financial-support form." },
    url: "https://nyuad.nyu.edu/en/admissions/undergraduate/financial-support.html", kw: "uae الامارات ابوظبي"
  },
  {
    id: "doha-institute", english: "yes", c: "qa", levels: ["master"], funding: "full", fields: ["social"], months: [],
    name: { ar: "منح معهد الدوحة للدراسات العليا", en: "Doha Institute for Graduate Studies Scholarships" },
    provider: { ar: "معهد الدوحة للدراسات العليا", en: "Doha Institute for Graduate Studies" },
    when: { ar: "يُعلن الموعد سنوياً على موقع المعهد", en: "Announced each year on the institute's site" },
    summary: { ar: "منح للماجستير في العلوم الاجتماعية والإنسانية والإدارة العامة، والدراسة بالعربية والإنجليزية.", en: "Master's scholarships in social sciences, humanities and public administration, taught in Arabic and English." },
    elig: { ar: ["شهادة بكالوريوس بتقدير جيد", "إتقان العربية والإنجليزية"], en: ["A good bachelor's degree", "Proficiency in Arabic and English"] },
    benefits: { ar: ["الرسوم الدراسية", "سكن وراتب شهري (حسب نوع المنحة)"], en: ["Tuition", "Housing and monthly stipend (by award type)"] },
    how: { ar: "قدّم طلب القبول عبر موقع المعهد واختر التقدّم للمنحة داخل الطلب.", en: "Apply for admission on the institute's site and request the scholarship in the same form." },
    url: "https://www.dohainstitute.edu.qa/", kw: "qatar قطر الدوحة"
  },
  {
    id: "isdb", english: "varies", c: "ww", levels: ["bachelor", "master", "phd"], funding: "full", fields: ["stem", "life"], months: [2, 3, 4],
    name: { ar: "منح البنك الإسلامي للتنمية", en: "Islamic Development Bank (IsDB) Scholarships" },
    provider: { ar: "البنك الإسلامي للتنمية", en: "Islamic Development Bank" },
    when: { ar: "عادةً في الربع الأول من السنة", en: "Usually in the first quarter of the year" },
    summary: { ar: "منح لكل الدرجات في تخصصات مرتبطة بالتنمية، لمواطني الدول الأعضاء والجاليات المسلمة.", en: "Awards at every level in development-related fields, for citizens of member countries and Muslim communities." },
    elig: { ar: ["مواطن في دولة عضو بالبنك", "تفوق أكاديمي وحدود عمرية حسب الدرجة"], en: ["Citizen of an IsDB member country", "Academic merit and age limits by level"] },
    benefits: { ar: ["الرسوم الدراسية", "راتب شهري", "تذاكر السفر وتأمين صحي"], en: ["Tuition", "Monthly stipend", "Airfare and medical cover"] },
    how: { ar: "قدّم إلكترونياً عبر بوابة منح البنك خلال فترة التقديم السنوية.", en: "Apply online through the IsDB scholarship portal during the annual call." },
    url: "https://www.isdb.org/scholarships", kw: "idb البنك الاسلامي"
  },
  {
    id: "si-sweden", english: "yes", c: "se", levels: ["master"], funding: "full", fields: ["all"], months: [2],
    name: { ar: "منحة المعهد السويدي للمهنيين العالميين", en: "Swedish Institute Scholarships for Global Professionals" },
    provider: { ar: "المعهد السويدي", en: "Swedish Institute (SI)" },
    when: { ar: "طلب القبول حتى منتصف يناير، وطلب المنحة في فبراير", en: "Admission by mid-January; scholarship application in February" },
    summary: { ar: "ماجستير ممول بالكامل في السويد لأصحاب الخبرة العملية والقيادية.", en: "A fully funded master's in Sweden for people with work and leadership experience." },
    elig: { ar: ["أن يكون بلدك ضمن القائمة المؤهلة", "خبرة عملية (نحو 3,000 ساعة) وخبرة قيادية"], en: ["Your country must be on the eligible list", "Work experience (about 3,000 hours) and leadership experience"] },
    benefits: { ar: ["الرسوم الدراسية كاملة", "راتب شهري وتأمين", "منحة سفر"], en: ["Full tuition", "Monthly stipend and insurance", "Travel grant"] },
    how: { ar: "قدّم أولاً على الماجستير عبر universityadmissions.se ثم قدّم طلب المنحة على موقع المعهد.", en: "First apply for the master's at universityadmissions.se, then submit the scholarship application on the SI site." },
    url: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/", kw: "sweden السويد"
  },
  {
    id: "embl-phd", english: "no", c: "eu", levels: ["phd"], funding: "salary", fields: ["life"], months: [],
    name: { ar: "برنامج الدكتوراه الدولي في EMBL", en: "EMBL International PhD Programme" },
    provider: { ar: "المختبر الأوروبي للبيولوجيا الجزيئية", en: "European Molecular Biology Laboratory" },
    when: { ar: "جولتا قبول في السنة", en: "Two recruitment rounds a year" },
    summary: { ar: "دكتوراه ممولة في علوم الحياة والمعلوماتية الحيوية في مواقع EMBL الستة بأوروبا.", en: "Funded PhDs in life sciences and bioinformatics across EMBL's six European sites." },
    elig: { ar: ["ماجستير أو بكالوريوس قوي في علوم الحياة أو الفيزياء أو الكيمياء أو الحاسوب", "خبرة بحثية في المختبر أو التحليل"], en: ["Master's or strong bachelor's in life sciences, physics, chemistry or computing", "Research experience at the bench or in analysis"] },
    benefits: { ar: ["زمالة شهرية", "تأمين صحي ومزايا اجتماعية", "بيئة بحثية دولية"], en: ["Monthly fellowship", "Health cover and social benefits", "International research environment"] },
    how: { ar: "قدّم طلباً واحداً عبر موقع البرنامج واختر مجموعات البحث التي تهمك.", en: "Submit a single application on the programme site and choose the research groups that interest you." },
    url: "https://www.embl.org/about/info/embl-international-phd-programme/", kw: "biology genetics genomics بيولوجيا جينات وراثة"
  },
  {
    id: "imprs", english: "varies", c: "de", levels: ["phd"], funding: "salary", fields: ["stem", "life", "social"], months: [],
    name: { ar: "مدارس ماكس بلانك البحثية الدولية (IMPRS)", en: "International Max Planck Research Schools (IMPRS)" },
    provider: { ar: "جمعية ماكس بلانك", en: "Max Planck Society" },
    when: { ar: "لكل مدرسة موعدها (كثير منها في الخريف والشتاء)", en: "Each school has its own deadline (many in autumn–winter)" },
    summary: { ar: "برامج دكتوراه منظمة بالإنجليزية في معاهد ماكس بلانك، بعقد أو منحة.", en: "Structured, English-taught PhD programmes at Max Planck Institutes, with a contract or stipend." },
    elig: { ar: ["ماجستير (وبعض المدارس تقبل بكالوريوس متميز)", "مطابقة اهتمامك البحثي لمجال المدرسة"], en: ["Master's degree (some schools accept an excellent bachelor's)", "Research interests matching the school's theme"] },
    benefits: { ar: ["راتب أو منحة شهرية", "دون رسوم دراسية", "تدريب ودورات متخصصة"], en: ["Monthly salary or stipend", "No tuition fees", "Specialised training and courses"] },
    how: { ar: "اختر المدرسة المناسبة من قائمة IMPRS وقدّم عبر موقعها مباشرة.", en: "Find a matching school in the IMPRS list and apply directly on its website." },
    url: "https://www.mpg.de/en/imprs", kw: "germany المانيا max planck"
  },
  {
    id: "mastercard", english: "varies", c: "ww", levels: ["bachelor", "master"], funding: "full", fields: ["all"], months: [],
    name: { ar: "برنامج منح مؤسسة ماستركارد", en: "Mastercard Foundation Scholars Program" },
    provider: { ar: "مؤسسة ماستركارد وجامعات شريكة", en: "Mastercard Foundation and partner universities" },
    when: { ar: "يختلف حسب الجامعة الشريكة", en: "Varies by partner university" },
    summary: { ar: "منح كاملة للشباب الأفارقة (ومنهم أبناء الدول العربية الأفريقية) في جامعات شريكة حول العالم.", en: "Full scholarships for young Africans (including Arab African countries) at partner universities worldwide." },
    elig: { ar: ["مواطن في دولة أفريقية", "تفوق أكاديمي مع حاجة مالية والتزام بخدمة المجتمع"], en: ["Citizen of an African country", "Academic talent, financial need and commitment to community"] },
    benefits: { ar: ["الرسوم الدراسية والسكن", "راتب معيشة وسفر", "إرشاد وتدريب قيادي"], en: ["Tuition and accommodation", "Living stipend and travel", "Mentoring and leadership training"] },
    how: { ar: "اختر جامعة شريكة من موقع البرنامج وقدّم عبرها مباشرة.", en: "Choose a partner university on the programme site and apply through it." },
    url: "https://mastercardfdn.org/en/what-we-do/our-programs/mastercard-foundation-scholars-program/", kw: "africa افريقيا مصر السودان المغرب تونس الجزائر egypt sudan morocco"
  }
];

/* ملاحظة اختبار اللغة لكل منحة: yes = مطلوب، varies = حسب البرنامج، no = غير مطلوب */
window.ENGLISH_NOTES = {
 "chevening": {
  "ar": "تشيفننغ نفسها لا تطلب شهادة لغة، لكن الجامعة البريطانية قد تطلبها للقبول.",
  "en": "Chevening itself asks for no test, but your UK university may require one for admission."
 },
 "fulbright": {
  "ar": "اختبار TOEFL مطلوب في أغلب الدول.",
  "en": "TOEFL is required in most countries."
 },
 "erasmus-mundus": {
  "ar": "أغلب البرامج تطلب IELTS أو TOEFL، وبعضها يقبل إفادة بأن دراستك السابقة كانت بالإنجليزية.",
  "en": "Most programmes ask for IELTS or TOEFL; some accept proof that your previous degree was taught in English."
 },
 "msca-dn": {
  "ar": "غالباً لا تُطلب شهادة رسمية ويُقيَّم مستواك في المقابلة، لكن بعض الجامعات تطلبها عند التسجيل.",
  "en": "Usually no formal certificate is asked and your level is judged at interview, but some universities require one at enrolment."
 },
 "cnrs": {
  "ar": "لا تُطلب شهادة لغة؛ يُقيَّم مستواك من الملف والمقابلة.",
  "en": "No language certificate is required; your level is judged from the application and interview."
 },
 "eiffel": {
  "ar": "المنحة لا تشترط اختباراً؛ شرط اللغة تحدده الجامعة الفرنسية والبرنامج.",
  "en": "The scholarship sets no test; the French institution and programme decide the language requirement."
 },
 "daad-epos": {
  "ar": "شهادة IELTS أو TOEFL للبرامج بالإنجليزية (وشهادة ألمانية للبرامج بالألمانية).",
  "en": "IELTS or TOEFL for English-taught courses (a German certificate for German-taught ones)."
 },
 "daad-helmut-schmidt": {
  "ar": "شهادة لغة إنجليزية أو ألمانية حسب لغة البرنامج.",
  "en": "An English or German certificate, depending on the course language."
 },
 "daad-phd": {
  "ar": "يُطلب إثبات لمستوى اللغة، ويُقبل أكثر من نوع من الشهادات حسب بلدك ولغة البحث.",
  "en": "Proof of language level is required; several kinds of evidence are accepted depending on country and working language."
 },
 "mext": {
  "ar": "لا تُشترط شهادة؛ السفارة تُجري اختباراتها الخاصة ومنها الإنجليزية، والشهادات تدعم ملفك.",
  "en": "No certificate is required; the embassy runs its own exams, including English. Certificates strengthen your file."
 },
 "csc": {
  "ar": "حسب الجامعة: كثير منها يقبل إفادة لغة الدراسة بدل IELTS.",
  "en": "Depends on the university: many accept a medium-of-instruction letter instead of IELTS."
 },
 "turkiye": {
  "ar": "ليست شرطاً عاماً؛ بعض الجامعات والبرامج بالإنجليزية تطلبها.",
  "en": "Not a general requirement; some universities and English-taught programmes ask for it."
 },
 "stipendium-hungaricum": {
  "ar": "يُطلب إثبات لغة، وكثير من الجامعات تقبل بدائل أو تُجري مقابلة.",
  "en": "Proof of language is required; many universities accept alternatives or hold an interview."
 },
 "gates-cambridge": {
  "ar": "شرط جامعة كامبريدج لغير الناطقين بالإنجليزية.",
  "en": "A University of Cambridge requirement for non-native speakers."
 },
 "rhodes": {
  "ar": "حسب شروط جامعة أكسفورد لغير الناطقين بالإنجليزية.",
  "en": "Per University of Oxford requirements for non-native speakers."
 },
 "clarendon": {
  "ar": "حسب شروط جامعة أكسفورد لغير الناطقين بالإنجليزية.",
  "en": "Per University of Oxford requirements for non-native speakers."
 },
 "said-foundation": {
  "ar": "شهادة IELTS مطلوبة غالباً ضمن الطلب.",
  "en": "An IELTS certificate is normally required with the application."
 },
 "swiss-excellence": {
  "ar": "المنحة لا تشترط اختباراً محدداً؛ يعتمد على الجامعة والمشرف.",
  "en": "The scholarship sets no specific test; it depends on the university and supervisor."
 },
 "eth-esop": {
  "ar": "شهادة إنجليزية بمستوى C1 ضمن شروط القبول في الماجستير.",
  "en": "A C1-level English certificate is part of master's admission."
 },
 "kaust": {
  "ar": "TOEFL أو IELTS، مع إعفاء لمن درس بالإنجليزية في دول محددة.",
  "en": "TOEFL or IELTS, waived for degrees taught in English in certain countries."
 },
 "gks": {
  "ar": "ليست إلزامية؛ شهادات الإنجليزية أو الكورية تمنحك أفضلية.",
  "en": "Not mandatory; English or Korean certificates give you an advantage."
 },
 "maeci": {
  "ar": "شهادة لغة إنجليزية أو إيطالية حسب لغة البرنامج.",
  "en": "An English or Italian certificate, depending on the course language."
 },
 "holland": {
  "ar": "ضمن شروط القبول في الجامعة الهولندية.",
  "en": "Part of admission at the Dutch university."
 },
 "pearson": {
  "ar": "مطلوبة إلا إذا كانت دراستك الثانوية بالإنجليزية.",
  "en": "Required unless your schooling was in English."
 },
 "knight-hennessy": {
  "ar": "TOEFL لغير الناطقين بالإنجليزية حسب شروط ستانفورد.",
  "en": "TOEFL for non-native speakers, per Stanford's rules."
 },
 "nyuad": {
  "ar": "يعتمد على لغة دراستك السابقة؛ راجع شروط القبول.",
  "en": "Depends on the language of your previous schooling; check the admission rules."
 },
 "doha-institute": {
  "ar": "شهادة إنجليزية (IELTS أو TOEFL) ضمن شروط القبول.",
  "en": "An English certificate (IELTS or TOEFL) is part of admission."
 },
 "isdb": {
  "ar": "يعتمد على الجامعة التي ستدرس فيها.",
  "en": "Depends on the university where you will study."
 },
 "si-sweden": {
  "ar": "ضمن شروط القبول في الجامعات السويدية.",
  "en": "Part of admission to Swedish universities."
 },
 "embl-phd": {
  "ar": "لا تُطلب شهادة رسمية؛ يكفي إتقان الإنجليزية ويُقيَّم في المقابلات.",
  "en": "No formal certificate is required; fluent English is expected and assessed at interview."
 },
 "imprs": {
  "ar": "لكل مدرسة شروطها؛ بعضها يطلب شهادة وبعضها يكتفي بالمقابلة.",
  "en": "Each school sets its own rule; some ask for a certificate, others rely on the interview."
 },
 "mastercard": {
  "ar": "يعتمد على الجامعة الشريكة.",
  "en": "Depends on the partner university."
 }
};
