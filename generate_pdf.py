import asyncio
from playwright.async_api import async_playwright
import os

# Combined HTML for all slides as a PDF document
slides_html = """
<html dir="rtl" lang="ar">
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700;900&display=swap');
  @page { size: 1280px 720px; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Noto Sans Arabic', sans-serif; background: #1a1a2e; }
  .slide { width: 1280px; height: 720px; page-break-after: always; overflow: hidden; position: relative; }
  .slide:last-child { page-break-after: auto; }
</style>
</head>
<body>

<!-- Slide 1: Title -->
<div class="slide" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px;">
  <div style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid #f59e0b; display: flex; align-items: center; justify-content: center; font-size: 60px; margin-bottom: 30px; background: rgba(245,158,11,0.1);">&#128300;</div>
  <div style="background: #f59e0b; color: #000; padding: 8px 24px; border-radius: 20px; font-size: 16px; font-weight: 900; margin-bottom: 30px;">كورس الذكاء الاصطناعي للمعلمين</div>
  <h1 style="font-size: 52px; font-weight: 900; text-align: center; line-height: 1.4; margin-bottom: 20px;">الخلية: <span style="color: #f59e0b;">وحدة بناء الكائن الحي</span></h1>
  <div style="font-size: 22px; color: #94a3b8; text-align: center;">علوم - الصف السابع | الفصل الثالث | إعداد: أدوات الذكاء الاصطناعي</div>
  <div style="position: absolute; bottom: 30px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 14px; color: #475569;">
    <span>المدرب: نواف البوسطه</span><span>شريحة 1/5</span>
  </div>
</div>

<!-- Slide 2: Cell Diagram -->
<div class="slide" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); color: white; padding: 50px;">
  <h2 style="font-size: 36px; font-weight: 900; color: #f59e0b; margin-bottom: 30px; text-align: center;">تركيب الخلية الحيوانية</h2>
  <div style="display: flex; gap: 40px; align-items: center;">
    <div style="flex: 1; display: flex; justify-content: center;">
      <svg viewBox="0 0 350 350" style="width: 350px; height: 350px;">
        <ellipse cx="175" cy="175" rx="155" ry="145" fill="none" stroke="#22c55e" stroke-width="4" stroke-dasharray="8,4"/>
        <text x="175" y="345" text-anchor="middle" fill="#22c55e" font-size="14" font-weight="bold">الغشاء الخلوي</text>
        <circle cx="175" cy="165" r="55" fill="rgba(139,92,246,0.3)" stroke="#8b5cf6" stroke-width="3"/>
        <circle cx="175" cy="165" r="20" fill="rgba(245,158,11,0.5)" stroke="#f59e0b" stroke-width="2"/>
        <text x="175" y="170" text-anchor="middle" fill="white" font-size="12" font-weight="bold">النواة</text>
        <text x="175" y="185" text-anchor="middle" fill="#f59e0b" font-size="10">النوية</text>
        <ellipse cx="80" cy="110" rx="30" ry="15" fill="rgba(239,68,68,0.3)" stroke="#ef4444" stroke-width="2" transform="rotate(-30,80,110)"/>
        <text x="50" y="100" fill="#ef4444" font-size="11" font-weight="bold">الميتوكندريا</text>
        <path d="M 250,100 Q 270,120 250,140 Q 230,160 250,180" fill="none" stroke="#3b82f6" stroke-width="3"/>
        <text x="270" y="145" fill="#3b82f6" font-size="11" font-weight="bold">الشبكة</text>
        <text x="270" y="160" fill="#3b82f6" font-size="11" font-weight="bold">الإندوبلازمية</text>
        <circle cx="100" cy="230" r="6" fill="#f59e0b"/><circle cx="115" cy="240" r="6" fill="#f59e0b"/><circle cx="130" cy="225" r="6" fill="#f59e0b"/>
        <text x="85" y="260" fill="#f59e0b" font-size="11" font-weight="bold">الريبوسومات</text>
        <circle cx="260" cy="250" r="15" fill="rgba(34,197,94,0.3)" stroke="#22c55e" stroke-width="2"/>
        <text x="240" y="275" fill="#22c55e" font-size="11" font-weight="bold">الجسيمات الحالة</text>
        <text x="100" y="310" fill="#94a3b8" font-size="12">السيتوبلازم</text>
      </svg>
    </div>
    <div style="flex: 1;">
      <div style="background: rgba(255,255,255,0.05); border-right: 4px solid #f59e0b; padding: 15px 20px; margin-bottom: 15px; border-radius: 8px;">
        <h3 style="font-size: 18px; color: #f59e0b; margin-bottom: 5px;">الغشاء الخلوي</h3>
        <p style="font-size: 15px; color: #94a3b8; line-height: 1.6;">يطوق الخلية وينظم دخول وخروج المواد - صفحة 52</p>
      </div>
      <div style="background: rgba(255,255,255,0.05); border-right: 4px solid #f59e0b; padding: 15px 20px; margin-bottom: 15px; border-radius: 8px;">
        <h3 style="font-size: 18px; color: #f59e0b; margin-bottom: 5px;">النواة</h3>
        <p style="font-size: 15px; color: #94a3b8; line-height: 1.6;">مركز التحكم بالخلية، تحتوي على المادة الوراثية DNA - صفحة 53</p>
      </div>
      <div style="background: rgba(255,255,255,0.05); border-right: 4px solid #f59e0b; padding: 15px 20px; margin-bottom: 15px; border-radius: 8px;">
        <h3 style="font-size: 18px; color: #f59e0b; margin-bottom: 5px;">الميتوكندريا</h3>
        <p style="font-size: 15px; color: #94a3b8; line-height: 1.6;">محطة الطاقة بالخلية، تنتج الطاقة اللازمة - صفحة 55</p>
      </div>
      <div style="background: rgba(255,255,255,0.05); border-right: 4px solid #f59e0b; padding: 15px 20px; border-radius: 8px;">
        <h3 style="font-size: 18px; color: #f59e0b; margin-bottom: 5px;">الريبوسومات</h3>
        <p style="font-size: 15px; color: #94a3b8; line-height: 1.6;">مسؤولة عن صناعة البروتينات - صفحة 56</p>
      </div>
    </div>
  </div>
  <div style="position: absolute; bottom: 30px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 14px; color: #475569;">
    <span>المدرب: نواف البوسطه</span><span>شريحة 2/5</span>
  </div>
</div>

<!-- Slide 3: Comparison -->
<div class="slide" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); color: white; padding: 50px;">
  <h2 style="font-size: 36px; font-weight: 900; color: #f59e0b; margin-bottom: 30px; text-align: center;">مقارنة: الخلية النباتية vs الخلية الحيوانية</h2>
  <div style="display: flex; gap: 30px;">
    <div style="flex: 1; background: rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; border-top: 4px solid #22c55e;">
      <div style="text-align: center; font-size: 50px; margin-bottom: 15px;">&#127807;</div>
      <h3 style="font-size: 24px; margin-bottom: 20px; text-align: center; color: #22c55e;">الخلية النباتية</h3>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #22c55e;">&#10003;</span><span style="font-size: 15px; color: #cbd5e1;">جدار خلوي</span></div>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #22c55e;">&#10003;</span><span style="font-size: 15px; color: #cbd5e1;">بلاستيدات خضراء</span></div>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #22c55e;">&#10003;</span><span style="font-size: 15px; color: #cbd5e1;">فجوة عصارية كبيرة</span></div>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #ef4444;">&#10007;</span><span style="font-size: 15px; color: #cbd5e1;">سنتريولات</span></div>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #22c55e;">&#10003;</span><span style="font-size: 15px; color: #cbd5e1;">غشاء خلوي + نواة + ميتوكندريا</span></div>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 900; color: #f59e0b;">VS</div>
    <div style="flex: 1; background: rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; border-top: 4px solid #8b5cf6;">
      <div style="text-align: center; font-size: 50px; margin-bottom: 15px;">&#128300;</div>
      <h3 style="font-size: 24px; margin-bottom: 20px; text-align: center; color: #8b5cf6;">الخلية الحيوانية</h3>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #ef4444;">&#10007;</span><span style="font-size: 15px; color: #cbd5e1;">جدار خلوي</span></div>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #ef4444;">&#10007;</span><span style="font-size: 15px; color: #cbd5e1;">بلاستيدات خضراء</span></div>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #ef4444;">&#10007;</span><span style="font-size: 15px; color: #cbd5e1;">فجوة عصارية كبيرة</span></div>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #22c55e;">&#10003;</span><span style="font-size: 15px; color: #cbd5e1;">سنتريولات</span></div>
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #22c55e;">&#10003;</span><span style="font-size: 15px; color: #cbd5e1;">غشاء خلوي + نواة + ميتوكندريا</span></div>
    </div>
  </div>
  <div style="position: absolute; bottom: 30px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 14px; color: #475569;">
    <span>المرجع: كتاب العلوم - الصف السابع صفحة 54-57</span><span>شريحة 3/5</span>
  </div>
</div>

<!-- Slide 4: Summary Table -->
<div class="slide" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); color: white; padding: 50px;">
  <h2 style="font-size: 36px; font-weight: 900; color: #f59e0b; margin-bottom: 10px; text-align: center;">ملخص العضيات الخلوية ووظائفها</h2>
  <div style="text-align: center; color: #94a3b8; margin-bottom: 25px; font-size: 16px;">كل إجابة موثقة بأرقام الصفحات من الكتاب المدرسي</div>
  <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.03); border-radius: 12px; overflow: hidden;">
    <thead><tr style="background: rgba(245,158,11,0.15);">
      <th style="padding: 16px 20px; text-align: right; font-size: 18px; color: #f59e0b; border-bottom: 2px solid rgba(245,158,11,0.3);">العضية</th>
      <th style="padding: 16px 20px; text-align: right; font-size: 18px; color: #f59e0b; border-bottom: 2px solid rgba(245,158,11,0.3);">الوظيفة</th>
      <th style="padding: 16px 20px; text-align: right; font-size: 18px; color: #f59e0b; border-bottom: 2px solid rgba(245,158,11,0.3);">الصفحة</th>
    </tr></thead>
    <tbody>
      <tr><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #22c55e; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05);">الغشاء الخلوي</td><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.05);">ينظم دخول وخروج المواد من وإلى الخلية</td><td style="padding: 14px 20px; text-align: right; font-size: 14px; color: #f59e0b; border-bottom: 1px solid rgba(255,255,255,0.05);">ص 52</td></tr>
      <tr style="background: rgba(255,255,255,0.02);"><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #22c55e; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05);">النواة</td><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.05);">تحتوي على DNA وتتحكم بأنشطة الخلية</td><td style="padding: 14px 20px; text-align: right; font-size: 14px; color: #f59e0b; border-bottom: 1px solid rgba(255,255,255,0.05);">ص 53</td></tr>
      <tr><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #22c55e; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05);">الميتوكندريا</td><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.05);">تنتج الطاقة اللازمة لعمليات الخلية</td><td style="padding: 14px 20px; text-align: right; font-size: 14px; color: #f59e0b; border-bottom: 1px solid rgba(255,255,255,0.05);">ص 55</td></tr>
      <tr style="background: rgba(255,255,255,0.02);"><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #22c55e; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05);">الريبوسومات</td><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.05);">تصنع البروتينات اللازمة للخلية</td><td style="padding: 14px 20px; text-align: right; font-size: 14px; color: #f59e0b; border-bottom: 1px solid rgba(255,255,255,0.05);">ص 56</td></tr>
      <tr><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #22c55e; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05);">جهاز غولجي</td><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.05);">يعدّل ويصنف ويغلف البروتينات</td><td style="padding: 14px 20px; text-align: right; font-size: 14px; color: #f59e0b; border-bottom: 1px solid rgba(255,255,255,0.05);">ص 57</td></tr>
      <tr style="background: rgba(255,255,255,0.02);"><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #22c55e; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05);">البلاستيدات الخضراء</td><td style="padding: 14px 20px; text-align: right; font-size: 16px; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.05);">تقوم بعملية البناء الضوئي (نباتية فقط)</td><td style="padding: 14px 20px; text-align: right; font-size: 14px; color: #f59e0b; border-bottom: 1px solid rgba(255,255,255,0.05);">ص 58</td></tr>
    </tbody>
  </table>
  <div style="position: absolute; bottom: 30px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 14px; color: #475569;">
    <span>المرجع: كتاب العلوم - الصف السابع</span><span>شريحة 4/5</span>
  </div>
</div>

<!-- Slide 5: Practice Questions -->
<div class="slide" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); color: white; padding: 50px;">
  <h2 style="font-size: 36px; font-weight: 900; color: #f59e0b; margin-bottom: 10px; text-align: center;">أسئلة تطبيقية - الخلية</h2>
  <div style="text-align: center; color: #94a3b8; margin-bottom: 30px; font-size: 16px;">أسئلة مبنية على الكتاب المدرسي مع الإجابات النموذجية</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; border-right: 4px solid #f59e0b;">
      <span style="background: #f59e0b; color: #000; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px;">1</span>
      <div style="font-size: 16px; color: #e2e8f0; line-height: 1.6; margin-top: 8px;">ما الفرق بين الغشاء الخلوي والجدار الخلوي؟ وأين يوجد كل منهما؟</div>
      <div style="font-size: 12px; color: #8b5cf6; margin-top: 8px; font-weight: 700;">سؤال مقالي - ص 52</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; border-right: 4px solid #f59e0b;">
      <span style="background: #f59e0b; color: #000; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px;">2</span>
      <div style="font-size: 16px; color: #e2e8f0; line-height: 1.6; margin-top: 8px;">لماذا تعتبر الميتوكندريا محطة الطاقة في الخلية؟</div>
      <div style="font-size: 12px; color: #8b5cf6; margin-top: 8px; font-weight: 700;">سؤال مقالي - ص 55</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; border-right: 4px solid #f59e0b;">
      <span style="background: #f59e0b; color: #000; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px;">3</span>
      <div style="font-size: 16px; color: #e2e8f0; line-height: 1.6; margin-top: 8px;">أي العضيات التالية توجد في الخلية النباتية فقط؟ أ) الريبوسومات ب) البلاستيدات الخضراء ج) الميتوكندريا</div>
      <div style="font-size: 12px; color: #8b5cf6; margin-top: 8px; font-weight: 700;">اختيار من متعدد - ص 58</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; border-right: 4px solid #f59e0b;">
      <span style="background: #f59e0b; color: #000; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px;">4</span>
      <div style="font-size: 16px; color: #e2e8f0; line-height: 1.6; margin-top: 8px;">قارن بين الخلية النباتية والحيوانية من حيث: الجدار الخلوي، البلاستيدات، الفجوة العصارية</div>
      <div style="font-size: 12px; color: #8b5cf6; margin-top: 8px; font-weight: 700;">سؤال مقالي - ص 59</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; border-right: 4px solid #f59e0b;">
      <span style="background: #f59e0b; color: #000; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px;">5</span>
      <div style="font-size: 16px; color: #e2e8f0; line-height: 1.6; margin-top: 8px;">ما وظيفة الجسيمات الحالة؟ وماذا يحدث لو توقفت عن العمل؟</div>
      <div style="font-size: 12px; color: #8b5cf6; margin-top: 8px; font-weight: 700;">سؤال تفكير ناقد - ص 57</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; border-right: 4px solid #f59e0b;">
      <span style="background: #f59e0b; color: #000; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px;">6</span>
      <div style="font-size: 16px; color: #e2e8f0; line-height: 1.6; margin-top: 8px;">ارسم الخلية النباتية وبيّن عليها العضيات الرئيسية</div>
      <div style="font-size: 12px; color: #8b5cf6; margin-top: 8px; font-weight: 700;">سؤال تطبيقي - ص 60</div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 20px;"><span style="background: rgba(34,197,94,0.15); color: #22c55e; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 700;">الإجابات النموذجية متوفرة مع الكورس</span></div>
  <div style="position: absolute; bottom: 30px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 14px; color: #475569;">
    <span>المدرب: نواف البوسطه</span><span>شريحة 5/5</span>
  </div>
</div>

</body>
</html>
"""

async def generate_pdf():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 720})
        
        await page.set_content(slides_html)
        await page.wait_for_timeout(2000)  # Wait for fonts
        
        output_path = '/home/z/my-project/public/downloads/presentation-cell-lesson.pdf'
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        await page.pdf(
            path=output_path,
            width='1280px',
            height='720px',
            print_background=True,
            margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
        )
        
        print(f'PDF generated: {output_path}')
        await browser.close()

asyncio.run(generate_pdf())
