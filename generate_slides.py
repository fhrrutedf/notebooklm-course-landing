import asyncio
from playwright.async_api import async_playwright
import os

# Slide HTML templates - Science lesson: The Cell
slides = [
    # Slide 1: Title
    """
    <html dir="rtl" lang="ar">
    <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&family=Amiri:wght@400;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        width: 1280px; height: 720px; 
        font-family: 'Noto Sans Arabic', 'Amiri', sans-serif;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        color: white; display: flex; flex-direction: column; justify-content: center; align-items: center;
        padding: 60px;
      }
      .badge { background: #f59e0b; color: #000; padding: 8px 24px; border-radius: 20px; font-size: 16px; font-weight: 900; margin-bottom: 30px; }
      h1 { font-size: 52px; font-weight: 900; text-align: center; line-height: 1.4; margin-bottom: 20px; }
      h1 span { color: #f59e0b; }
      .subtitle { font-size: 22px; color: #94a3b8; text-align: center; margin-bottom: 40px; }
      .footer { position: absolute; bottom: 30px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 14px; color: #475569; }
      .cell-icon { width: 120px; height: 120px; border-radius: 50%; border: 4px solid #f59e0b; display: flex; align-items: center; justify-content: center; font-size: 60px; margin-bottom: 30px; background: rgba(245,158,11,0.1); }
    </style>
    </head>
    <body>
      <div class="cell-icon">🔬</div>
      <div class="badge">كورس الذكاء الاصطناعي للمعلمين</div>
      <h1>الخلية: <span>وحدة بناء الكائن الحي</span></h1>
      <div class="subtitle">علوم - الصف السابع | الفصل الثالث | إعداد: أدوات الذكاء الاصطناعي</div>
      <div class="footer">
        <span>المدرب: نواف البوسطه</span>
        <span>شريحة 1/5</span>
      </div>
    </body>
    </html>
    """,
    
    # Slide 2: Cell Diagram
    """
    <html dir="rtl" lang="ar">
    <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700;900&family=Amiri:wght@400;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        width: 1280px; height: 720px; 
        font-family: 'Noto Sans Arabic', 'Amiri', sans-serif;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        color: white; padding: 50px;
      }
      h2 { font-size: 36px; font-weight: 900; color: #f59e0b; margin-bottom: 30px; text-align: center; }
      .content { display: flex; gap: 40px; align-items: center; }
      .diagram { flex: 1; display: flex; justify-content: center; }
      .info { flex: 1; }
      .info-item { background: rgba(255,255,255,0.05); border-right: 4px solid #f59e0b; padding: 15px 20px; margin-bottom: 15px; border-radius: 8px; }
      .info-item h3 { font-size: 18px; color: #f59e0b; margin-bottom: 5px; }
      .info-item p { font-size: 15px; color: #94a3b8; line-height: 1.6; }
      .cell-svg { width: 350px; height: 350px; }
      .footer { position: absolute; bottom: 30px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 14px; color: #475569; }
    </style>
    </head>
    <body>
      <h2>تركيب الخلية الحيوانية</h2>
      <div class="content">
        <div class="diagram">
          <svg class="cell-svg" viewBox="0 0 350 350">
            <!-- Cell membrane -->
            <ellipse cx="175" cy="175" rx="155" ry="145" fill="none" stroke="#22c55e" stroke-width="4" stroke-dasharray="8,4"/>
            <text x="175" y="345" text-anchor="middle" fill="#22c55e" font-size="14" font-weight="bold">الغشاء الخلوي</text>
            <!-- Nucleus -->
            <circle cx="175" cy="165" r="55" fill="rgba(139,92,246,0.3)" stroke="#8b5cf6" stroke-width="3"/>
            <circle cx="175" cy="165" r="20" fill="rgba(245,158,11,0.5)" stroke="#f59e0b" stroke-width="2"/>
            <text x="175" y="170" text-anchor="middle" fill="white" font-size="12" font-weight="bold">النواة</text>
            <text x="175" y="185" text-anchor="middle" fill="#f59e0b" font-size="10">النوية</text>
            <!-- Mitochondria -->
            <ellipse cx="80" cy="110" rx="30" ry="15" fill="rgba(239,68,68,0.3)" stroke="#ef4444" stroke-width="2" transform="rotate(-30,80,110)"/>
            <text x="50" y="100" fill="#ef4444" font-size="11" font-weight="bold">الميتوكندريا</text>
            <!-- ER -->
            <path d="M 250,100 Q 270,120 250,140 Q 230,160 250,180" fill="none" stroke="#3b82f6" stroke-width="3"/>
            <text x="270" y="145" fill="#3b82f6" font-size="11" font-weight="bold">الشبكة</text>
            <text x="270" y="160" fill="#3b82f6" font-size="11" font-weight="bold">الإندوبلازمية</text>
            <!-- Ribosomes -->
            <circle cx="100" cy="230" r="6" fill="#f59e0b"/>
            <circle cx="115" cy="240" r="6" fill="#f59e0b"/>
            <circle cx="130" cy="225" r="6" fill="#f59e0b"/>
            <text x="85" y="260" fill="#f59e0b" font-size="11" font-weight="bold">الريبوسومات</text>
            <!-- Lysosomes -->
            <circle cx="260" cy="250" r="15" fill="rgba(34,197,94,0.3)" stroke="#22c55e" stroke-width="2"/>
            <text x="240" y="275" fill="#22c55e" font-size="11" font-weight="bold">الجسيمات الحالة</text>
            <!-- Cytoplasm label -->
            <text x="100" cy="170" y="300" fill="#94a3b8" font-size="12">السيتوبلازم</text>
          </svg>
        </div>
        <div class="info">
          <div class="info-item">
            <h3>الغشاء الخلوي</h3>
            <p>يطوق الخلية وينظم دخول وخروج المواد - صفحة 52</p>
          </div>
          <div class="info-item">
            <h3>النواة</h3>
            <p>مركز التحكم بالخلية، تحتوي على المادة الوراثية DNA - صفحة 53</p>
          </div>
          <div class="info-item">
            <h3>الميتوكندريا</h3>
            <p>محطة الطاقة بالخلية، تنتج الطاقة اللازمة - صفحة 55</p>
          </div>
          <div class="info-item">
            <h3>الريبوسومات</h3>
            <p>مسؤولة عن صناعة البروتينات - صفحة 56</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <span>المدرب: نواف البوسطه</span>
        <span>شريحة 2/5</span>
      </div>
    </body>
    </html>
    """,
    
    # Slide 3: Plant vs Animal Cell Comparison
    """
    <html dir="rtl" lang="ar">
    <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700;900&family=Amiri:wght@400;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        width: 1280px; height: 720px; 
        font-family: 'Noto Sans Arabic', 'Amiri', sans-serif;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        color: white; padding: 50px;
      }
      h2 { font-size: 36px; font-weight: 900; color: #f59e0b; margin-bottom: 30px; text-align: center; }
      .comparison { display: flex; gap: 30px; }
      .card { flex: 1; background: rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; border: 1px solid rgba(255,255,255,0.1); }
      .card.plant { border-top: 4px solid #22c55e; }
      .card.animal { border-top: 4px solid #8b5cf6; }
      .card h3 { font-size: 24px; margin-bottom: 20px; text-align: center; }
      .card.plant h3 { color: #22c55e; }
      .card.animal h3 { color: #8b5cf6; }
      .card .icon { text-align: center; font-size: 50px; margin-bottom: 15px; }
      .feature { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      .feature:last-child { border-bottom: none; }
      .check { color: #22c55e; font-size: 18px; }
      .cross { color: #ef4444; font-size: 18px; }
      .feature span { font-size: 15px; color: #cbd5e1; }
      .vs { display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 900; color: #f59e0b; }
      .footer { position: absolute; bottom: 30px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 14px; color: #475569; }
    </style>
    </head>
    <body>
      <h2>مقارنة: الخلية النباتية vs الخلية الحيوانية</h2>
      <div class="comparison">
        <div class="card plant">
          <div class="icon">🌿</div>
          <h3>الخلية النباتية</h3>
          <div class="feature"><span class="check">✓</span><span>جدار خلوي</span></div>
          <div class="feature"><span class="check">✓</span><span>بلاستيدات خضراء</span></div>
          <div class="feature"><span class="check">✓</span><span>فجوة عصارية كبيرة</span></div>
          <div class="feature"><span class="cross">✗</span><span>سنتريولات</span></div>
          <div class="feature"><span class="check">✓</span><span>غشاء خلوي</span></div>
          <div class="feature"><span class="check">✓</span><span>نواة</span></div>
          <div class="feature"><span class="check">✓</span><span>ميتوكندريا</span></div>
          <div class="feature"><span class="check">✓</span><span>ريبوسومات</span></div>
        </div>
        <div class="vs">VS</div>
        <div class="card animal">
          <div class="icon">🔬</div>
          <h3>الخلية الحيوانية</h3>
          <div class="feature"><span class="cross">✗</span><span>جدار خلوي</span></div>
          <div class="feature"><span class="cross">✗</span><span>بلاستيدات خضراء</span></div>
          <div class="feature"><span class="cross">✗</span><span>فجوة عصارية كبيرة</span></div>
          <div class="feature"><span class="check">✓</span><span>سنتريولات</span></div>
          <div class="feature"><span class="check">✓</span><span>غشاء خلوي</span></div>
          <div class="feature"><span class="check">✓</span><span>نواة</span></div>
          <div class="feature"><span class="check">✓</span><span>ميتوكندريا</span></div>
          <div class="feature"><span class="check">✓</span><span>ريبوسومات</span></div>
        </div>
      </div>
      <div class="footer">
        <span>المرجع: كتاب العلوم - الصف السابع صفحة 54-57</span>
        <span>شريحة 3/5</span>
      </div>
    </body>
    </html>
    """,
    
    # Slide 4: Summary Table
    """
    <html dir="rtl" lang="ar">
    <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700;900&family=Amiri:wght@400;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        width: 1280px; height: 720px; 
        font-family: 'Noto Sans Arabic', 'Amiri', sans-serif;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        color: white; padding: 50px;
      }
      h2 { font-size: 36px; font-weight: 900; color: #f59e0b; margin-bottom: 30px; text-align: center; }
      .subtitle { text-align: center; color: #94a3b8; margin-bottom: 25px; font-size: 16px; }
      table { width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.03); border-radius: 12px; overflow: hidden; }
      th { background: rgba(245,158,11,0.15); padding: 16px 20px; text-align: right; font-size: 18px; color: #f59e0b; border-bottom: 2px solid rgba(245,158,11,0.3); }
      td { padding: 14px 20px; text-align: right; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
      tr:nth-child(even) { background: rgba(255,255,255,0.02); }
      .organelle { color: #22c55e; font-weight: 700; }
      .function { color: #cbd5e1; }
      .page { color: #f59e0b; font-size: 14px; }
      .footer { position: absolute; bottom: 30px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 14px; color: #475569; }
    </style>
    </head>
    <body>
      <h2>ملخص العضيات الخلوية ووظائفها</h2>
      <div class="subtitle">كل إجابة موثقة بأرقام الصفحات من الكتاب المدرسي</div>
      <table>
        <thead>
          <tr>
            <th>العضية</th>
            <th>الوظيفة</th>
            <th>الصفحة</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="organelle">الغشاء الخلوي</td><td class="function">ينظم دخول وخروج المواد من وإلى الخلية</td><td class="page">ص 52</td></tr>
          <tr><td class="organelle">النواة</td><td class="function">تحتوي على DNA وتتحكم بأنشطة الخلية</td><td class="page">ص 53</td></tr>
          <tr><td class="organelle">الميتوكندريا</td><td class="function">تنتج الطاقة اللازمة لعمليات الخلية</td><td class="page">ص 55</td></tr>
          <tr><td class="organelle">الشبكة الإندوبلازمية</td><td class="function">تنقل المواد داخل الخلية وتصنع الدهون</td><td class="page">ص 56</td></tr>
          <tr><td class="organelle">الريبوسومات</td><td class="function">تصنع البروتينات اللازمة للخلية</td><td class="page">ص 56</td></tr>
          <tr><td class="organelle">جهاز غولجي</td><td class="function">يعدّل ويصنف ويغلف البروتينات</td><td class="page">ص 57</td></tr>
          <tr><td class="organelle">الجسيمات الحالة</td><td class="function">تهضم المواد الغذائية والعضيات القديمة</td><td class="page">ص 57</td></tr>
          <tr><td class="organelle">البلاستيدات الخضراء</td><td class="function">تقوم بعملية البناء الضوئي (نباتية فقط)</td><td class="page">ص 58</td></tr>
        </tbody>
      </table>
      <div class="footer">
        <span>المرجع: كتاب العلوم - الصف السابع</span>
        <span>شريحة 4/5</span>
      </div>
    </body>
    </html>
    """,
    
    # Slide 5: Practice Questions
    """
    <html dir="rtl" lang="ar">
    <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700;900&family=Amiri:wght@400;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        width: 1280px; height: 720px; 
        font-family: 'Noto Sans Arabic', 'Amiri', sans-serif;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        color: white; padding: 50px;
      }
      h2 { font-size: 36px; font-weight: 900; color: #f59e0b; margin-bottom: 10px; text-align: center; }
      .subtitle { text-align: center; color: #94a3b8; margin-bottom: 30px; font-size: 16px; }
      .questions { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      .q-card { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; border-right: 4px solid #f59e0b; }
      .q-num { background: #f59e0b; color: #000; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px; margin-left: 10px; }
      .q-text { font-size: 16px; color: #e2e8f0; line-height: 1.6; margin-top: 8px; }
      .q-type { font-size: 12px; color: #8b5cf6; margin-top: 8px; font-weight: 700; }
      .footer { position: absolute; bottom: 30px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 14px; color: #475569; }
      .badge-bottom { text-align: center; margin-top: 20px; }
      .badge-bottom span { background: rgba(34,197,94,0.15); color: #22c55e; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 700; }
    </style>
    </head>
    <body>
      <h2>أسئلة تطبيقية - الخلية</h2>
      <div class="subtitle">أسئلة مبنية على الكتاب المدرسي مع الإجابات النموذجية</div>
      <div class="questions">
        <div class="q-card">
          <span class="q-num">1</span>
          <div class="q-text">ما الفرق بين الغشاء الخلوي والجدار الخلوي؟ وأين يوجد كل منهما؟</div>
          <div class="q-type">سؤال مقالي - ص 52</div>
        </div>
        <div class="q-card">
          <span class="q-num">2</span>
          <div class="q-text">لماذا تعتبر الميتوكندريا محطة الطاقة في الخلية؟</div>
          <div class="q-type">سؤال مقالي - ص 55</div>
        </div>
        <div class="q-card">
          <span class="q-num">3</span>
          <div class="q-text">أي العضيات التالية توجد في الخلية النباتية فقط؟<br>أ) الريبوسومات  ب) البلاستيدات الخضراء  ج) الميتوكندريا</div>
          <div class="q-type">اختيار من متعدد - ص 58</div>
        </div>
        <div class="q-card">
          <span class="q-num">4</span>
          <div class="q-text">ارسم الخلية النباتية وبيّن عليها العضيات الرئيسية</div>
          <div class="q-type">سؤال تطبيقي - ص 60</div>
        </div>
        <div class="q-card">
          <span class="q-num">5</span>
          <div class="q-text">قارن بين الخلية النباتية والحيوانية من حيث: الجدار الخلوي، البلاستيدات، الفجوة العصارية</div>
          <div class="q-type">سؤال مقالي - ص 59</div>
        </div>
        <div class="q-card">
          <span class="q-num">6</span>
          <div class="q-text">ما وظيفة الجسيمات الحالة؟ وماذا يحدث لو توقفت عن العمل؟</div>
          <div class="q-type">سؤال تفكير ناقد - ص 57</div>
        </div>
      </div>
      <div class="badge-bottom"><span>✓ الإجابات النموذجية متوفرة مع الكورس</span></div>
      <div class="footer">
        <span>المدرب: نواف البوسطه</span>
        <span>شريحة 5/5</span>
      </div>
    </body>
    </html>
    """
]

async def generate_slides():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 720})
        
        output_dir = '/home/z/my-project/public/images/slides'
        os.makedirs(output_dir, exist_ok=True)
        
        for i, html in enumerate(slides):
            await page.set_content(html)
            await page.wait_for_timeout(1000)  # Wait for fonts to load
            screenshot_path = f'{output_dir}/slide-{i+1}.png'
            await page.screenshot(path=screenshot_path, full_page=False)
            print(f'Generated: {screenshot_path}')
        
        await browser.close()
        print('All slides generated successfully!')

asyncio.run(generate_slides())
