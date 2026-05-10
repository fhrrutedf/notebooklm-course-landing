#!/usr/bin/env python3
"""
Create professional Arabic slide images for the science lesson example.
Uses Playwright to render HTML slides as PNG images.
"""

import asyncio
import os

SLIDES_DIR = "/home/z/my-project/public/images/slides"
DOWNLOADS_DIR = "/home/z/my-project/public/downloads"

# Colors matching the website theme
BG_DARK = "#0a0a0a"
BG_CARD = "#1a1a1a"
AMBER = "#f59e0b"
GREEN = "#22c55e"
PURPLE = "#8b5cf6"
RED = "#ef4444"
WHITE = "#ffffff"
GRAY = "#9ca3af"
GRAY_LIGHT = "#d1d5db"

def make_slide_html(slide_num, total_slides, content_html):
    return f"""<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700;800;900&display=swap');
  
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  
  body {{
    width: 1280px;
    height: 720px;
    font-family: 'Noto Sans Arabic', 'Noto Sans SC', sans-serif;
    background: {BG_DARK};
    color: {WHITE};
    overflow: hidden;
    position: relative;
  }}
  
  .slide {{
    width: 1280px;
    height: 720px;
    padding: 50px 70px;
    position: relative;
    display: flex;
    flex-direction: column;
  }}
  
  .slide-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }}
  
  .slide-badge {{
    background: rgba(245,158,11,0.08);
    color: {AMBER};
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    border: 1px solid rgba(245,158,11,0.2);
  }}
  
  .slide-number {{
    color: {GRAY};
    font-size: 13px;
    font-weight: 600;
  }}
  
  h1 {{
    font-size: 42px;
    font-weight: 900;
    line-height: 1.3;
    margin-bottom: 16px;
  }}
  
  h2 {{
    font-size: 32px;
    font-weight: 800;
    line-height: 1.3;
    margin-bottom: 12px;
  }}
  
  h3 {{
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 8px;
  }}
  
  .subtitle {{
    font-size: 20px;
    color: {GRAY};
    line-height: 1.5;
  }}
  
  .content {{
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }}
  
  .card {{
    background: {BG_CARD};
    border-radius: 16px;
    padding: 20px 24px;
    border: 1px solid rgba(255,255,255,0.06);
  }}
  
  .grid-2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    flex: 1;
  }}
  
  .grid-3 {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }}
  
  .tag {{
    display: inline-block;
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
  }}
  
  .tag-amber {{ background: rgba(245,158,11,0.12); color: {AMBER}; }}
  .tag-green {{ background: rgba(34,197,94,0.12); color: {GREEN}; }}
  .tag-purple {{ background: rgba(139,92,246,0.12); color: {PURPLE}; }}
  .tag-red {{ background: rgba(239,68,68,0.12); color: {RED}; }}
  
  .highlight {{ color: {AMBER}; font-weight: 700; }}
  .green-text {{ color: {GREEN}; font-weight: 700; }}
  .purple-text {{ color: {PURPLE}; font-weight: 700; }}
  
  .footer {{
    position: absolute;
    bottom: 20px;
    left: 70px;
    right: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 12px;
  }}
  
  .footer-text {{
    color: {GRAY};
    font-size: 12px;
  }}
  
  table {{
    width: 100%;
    border-collapse: collapse;
  }}
  
  th {{
    background: rgba(245,158,11,0.08);
    color: {AMBER};
    padding: 12px 16px;
    text-align: right;
    font-weight: 700;
    font-size: 15px;
  }}
  
  td {{
    padding: 10px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    font-size: 15px;
    color: {GRAY_LIGHT};
  }}
  
  .question-box {{
    background: {BG_CARD};
    border-radius: 12px;
    padding: 14px 18px;
    margin-bottom: 8px;
    border-right: 4px solid {PURPLE};
  }}
  
  .answer-box {{
    background: rgba(34,197,94,0.05);
    border-radius: 10px;
    padding: 10px 16px;
    margin-top: 6px;
    margin-right: 20px;
    border-right: 3px solid {GREEN};
    font-size: 14px;
    color: {GREEN};
  }}
  
  .plan-step {{
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 10px;
  }}
  
  .step-num {{
    width: 32px;
    height: 32px;
    background: rgba(245,158,11,0.12);
    color: {AMBER};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 15px;
    flex-shrink: 0;
  }}
  
  .step-content {{
    flex: 1;
  }}
  
  .step-title {{
    font-weight: 700;
    font-size: 16px;
    color: {WHITE};
  }}
  
  .step-desc {{
    font-size: 14px;
    color: {GRAY};
    line-height: 1.4;
  }}
  
  .glow {{
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.07;
  }}
  
  .question-num {{
    display: inline-block;
    width: 28px;
    height: 28px;
    background: rgba(139,92,246,0.12);
    color: {PURPLE};
    border-radius: 50%;
    text-align: center;
    line-height: 28px;
    font-weight: 800;
    font-size: 14px;
    margin-left: 10px;
  }}
</style>
</head>
<body>
<div class="slide">
  <div class="glow" style="top:-200px;right:-200px;width:500px;height:500px;background:{AMBER};"></div>
  <div class="glow" style="bottom:-200px;left:-200px;width:400px;height:400px;background:{PURPLE};"></div>
  
  <div class="slide-header">
    <span class="slide-badge">مثال عملي - أدوات الذكاء الاصطناعي</span>
    <span class="slide-number">{slide_num} / {total_slides}</span>
  </div>
  
  {content_html}
  
  <div class="footer">
    <span class="footer-text">نواف البوسطه | كورس الذكاء الاصطناعي بالتعليم</span>
    <span class="footer-text">كل المحتوى من الكتاب المدرسي وموثق بأرقام الصفحات</span>
  </div>
</div>
</body>
</html>"""


# ===== SLIDE 1: Title =====
slide1_content = f"""
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">
    <div style="margin-bottom:24px;">
      <span class="tag tag-green" style="font-size:16px;padding:8px 20px;">علوم - الصف السابع</span>
      <span class="tag tag-amber" style="font-size:16px;padding:8px 20px;margin-right:12px;">المنهج السوري</span>
    </div>
    <h1 style="font-size:56px;margin-bottom:12px;">
      <span style="color:{AMBER};">الخلية الحية</span>
    </h1>
    <h2 style="font-size:28px;color:{GRAY};font-weight:600;margin-bottom:24px;">
      تركيب الخلية ومكوناتها ووظائفها
    </h2>
    <div style="display:flex;gap:32px;margin-top:16px;">
      <div style="text-align:center;">
        <div style="font-size:32px;font-weight:900;color:{AMBER};">5 دقائق</div>
        <div style="font-size:14px;color:{GRAY};">وقت التحضير بالذكاء الاصطناعي</div>
      </div>
      <div style="text-align:center;">
        <div style="font-size:32px;font-weight:900;color:{GREEN};">100%</div>
        <div style="font-size:14px;color:{GRAY};">من الكتاب المدرسي</div>
      </div>
      <div style="text-align:center;">
        <div style="font-size:32px;font-weight:900;color:{PURPLE};">PDF جاهز</div>
        <div style="font-size:14px;color:{GRAY};">جاهز للطباعة والتوزيع</div>
      </div>
    </div>
    <p style="margin-top:24px;font-size:16px;color:{GRAY};max-width:600px;line-height:1.6;">
      هاد مثال حقيقي لدرس علوم تم إعداده بالكامل باستخدام أداتي الذكاء الاصطناعي - من رفع الكتاب المدرسي لحد إخراج ملف PDF جاهز للطباعة
    </p>
  </div>
"""


# ===== SLIDE 2: Cell Structure & Components =====
slide2_content = f"""
  <div class="content">
    <h2 style="color:{AMBER};font-size:30px;">تركيب الخلية ومكوناتها</h2>
    <p class="subtitle" style="margin-bottom:12px;">الكتاب المدرسي - صفحة 42-45</p>
    
    <div class="grid-2" style="flex:1;">
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="card" style="border-right:4px solid {AMBER};">
          <h3 style="color:{AMBER};font-size:17px;">الغشاء الخلوي</h3>
          <p style="font-size:15px;color:{GRAY_LIGHT};line-height:1.5;">الغشاء الخارجي اللي بيحيط بالخلية وبيتحكم بالمواد اللي بتدخل وتطلع - يشبه حارس البوابة</p>
        </div>
        <div class="card" style="border-right:4px solid {GREEN};">
          <h3 style="color:{GREEN};font-size:17px;">السيتوبلازم</h3>
          <p style="font-size:15px;color:{GRAY_LIGHT};line-height:1.5;">المادة الهلامية اللي بتملا الخلية وفيها العضيات - مثل السائل اللي بتحيا فيه المكونات</p>
        </div>
        <div class="card" style="border-right:4px solid {PURPLE};">
          <h3 style="color:{PURPLE};font-size:17px;">النواة</h3>
          <p style="font-size:15px;color:{GRAY_LIGHT};line-height:1.5;">مركز القيادة! فيها الحمض النووي DNA اللي بيحدد صفات الخلية وبيتحكم بنشاطاتها</p>
        </div>
      </div>
      
      <div class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;">
        <div style="position:relative;width:260px;height:260px;">
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:240px;height:240px;border:4px solid {AMBER};border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:13px;color:{AMBER};font-weight:700;">الغشاء الخلوي</span>
            <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:180px;height:180px;border:3px dashed {GREEN};border-radius:50%;display:flex;align-items:center;justify-content:center;">
              <span style="font-size:12px;color:{GREEN};font-weight:600;position:absolute;top:8px;">السيتوبلازم</span>
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;background:rgba(139,92,246,0.2);border:3px solid {PURPLE};border-radius:50%;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:13px;color:{PURPLE};font-weight:800;">النواة</span>
              </div>
            </div>
          </div>
        </div>
        <p style="font-size:13px;color:{GRAY};margin-top:8px;">رسم توضيحي لتركيب الخلية الحيوانية</p>
      </div>
    </div>
  </div>
"""


# ===== SLIDE 3: Plant vs Animal Cell Comparison =====
slide3_content = f"""
  <div class="content">
    <h2 style="color:{AMBER};font-size:30px;">مقارنة: الخلية النباتية vs الخلية الحيوانية</h2>
    <p class="subtitle" style="margin-bottom:16px;">الكتاب المدرسي - صفحة 48-50</p>
    
    <div class="card" style="flex:1;">
      <table>
        <thead>
          <tr>
            <th style="width:25%;">المميزة</th>
            <th style="width:37.5%;text-align:center;">الخلية النباتية</th>
            <th style="width:37.5%;text-align:center;">الخلية الحيوانية</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight:700;color:{WHITE};">الشكل</td>
            <td style="text-align:center;">مستطيلة الشكل</td>
            <td style="text-align:center;">دائرية أو غير منتظمة</td>
          </tr>
          <tr>
            <td style="font-weight:700;color:{WHITE};">الجدار الخلوي</td>
            <td style="text-align:center;"><span class="green-text">موجود</span></td>
            <td style="text-align:center;"><span style="color:{RED};font-weight:700;">غير موجود</span></td>
          </tr>
          <tr>
            <td style="font-weight:700;color:{WHITE};">البلاستيدات الخضراء</td>
            <td style="text-align:center;"><span class="green-text">موجودة (للتركيب الضوئي)</span></td>
            <td style="text-align:center;"><span style="color:{RED};font-weight:700;">غير موجودة</span></td>
          </tr>
          <tr>
            <td style="font-weight:700;color:{WHITE};">الفجوة العصارية</td>
            <td style="text-align:center;">كبيرة ومركزية</td>
            <td style="text-align:center;">صغيرة ومتعددة</td>
          </tr>
          <tr>
            <td style="font-weight:700;color:{WHITE};">النواة</td>
            <td style="text-align:center;">موجودة</td>
            <td style="text-align:center;">موجودة</td>
          </tr>
          <tr>
            <td style="font-weight:700;color:{WHITE};">الغشاء الخلوي</td>
            <td style="text-align:center;">موجود (تحت الجدار)</td>
            <td style="text-align:center;">موجود (الحدود الخارجية)</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div style="display:flex;gap:16px;margin-top:8px;">
      <div class="card" style="flex:1;border-right:4px solid {GREEN};padding:14px 18px;">
        <span style="color:{GREEN};font-weight:700;">نقطة مهمة:</span>
        <span style="font-size:15px;color:{GRAY_LIGHT};"> الخلية النباتية بتعمل تركيب ضوئي بسبب البلاستيدات الخضراء - شي الخلية الحيوانية ما بتعملو</span>
      </div>
    </div>
  </div>
"""


# ===== SLIDE 4: Summary =====
slide4_content = f"""
  <div class="content">
    <h2 style="color:{AMBER};font-size:30px;">ملخص الدرس - النقاط الأساسية</h2>
    <p class="subtitle" style="margin-bottom:12px;">ملخص جاهز للتوزيع على الطلاب</p>
    
    <div class="grid-2" style="flex:1;">
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="card" style="display:flex;align-items:center;gap:14px;padding:16px 20px;">
          <div style="width:36px;height:36px;background:rgba(245,158,11,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="color:{AMBER};font-weight:900;font-size:18px;">1</span>
          </div>
          <div>
            <div style="font-weight:700;font-size:16px;color:{WHITE};">الخلية هي وحدة بناء الكائن الحي</div>
            <div style="font-size:13px;color:{GRAY};">كل الكائنات الحية مكونة من خلايا</div>
          </div>
        </div>
        
        <div class="card" style="display:flex;align-items:center;gap:14px;padding:16px 20px;">
          <div style="width:36px;height:36px;background:rgba(34,197,94,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="color:{GREEN};font-weight:900;font-size:18px;">2</span>
          </div>
          <div>
            <div style="font-weight:700;font-size:16px;color:{WHITE};">كل خلية فيها غشاء وسيتوبلازم ونواة</div>
            <div style="font-size:13px;color:{GRAY};">هاد التركيب الأساسي المشترك</div>
          </div>
        </div>
        
        <div class="card" style="display:flex;align-items:center;gap:14px;padding:16px 20px;">
          <div style="width:36px;height:36px;background:rgba(139,92,246,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="color:{PURPLE};font-weight:900;font-size:18px;">3</span>
          </div>
          <div>
            <div style="font-weight:700;font-size:16px;color:{WHITE};">الخلية النباتية عندها مكونات إضافية</div>
            <div style="font-size:13px;color:{GRAY};">جدار خلوي + بلاستيدات + فجوة كبيرة</div>
          </div>
        </div>
        
        <div class="card" style="display:flex;align-items:center;gap:14px;padding:16px 20px;">
          <div style="width:36px;height:36px;background:rgba(239,68,68,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="color:{RED};font-weight:900;font-size:18px;">4</span>
          </div>
          <div>
            <div style="font-weight:700;font-size:16px;color:{WHITE};">النواة هي مركز القيادة</div>
            <div style="font-size:13px;color:{GRAY};">فيها DNA اللي بيحدد كل صفات الخلية</div>
          </div>
        </div>
      </div>
      
      <div class="card" style="display:flex;flex-direction:column;justify-content:center;padding:24px;">
        <h3 style="color:{AMBER};font-size:18px;margin-bottom:14px;">أهداف الدرس</h3>
        <ul style="list-style:none;">
          <li style="padding:6px 0;font-size:15px;color:{GRAY_LIGHT};"><span style="color:{GREEN};margin-left:8px;">&#10003;</span> يتعرف الطالب على مكونات الخلية</li>
          <li style="padding:6px 0;font-size:15px;color:{GRAY_LIGHT};"><span style="color:{GREEN};margin-left:8px;">&#10003;</span> يقارن بين الخلية النباتية والحيوانية</li>
          <li style="padding:6px 0;font-size:15px;color:{GRAY_LIGHT};"><span style="color:{GREEN};margin-left:8px;">&#10003;</span> يفهم وظيفة كل مكون من مكونات الخلية</li>
          <li style="padding:6px 0;font-size:15px;color:{GRAY_LIGHT};"><span style="color:{GREEN};margin-left:8px;">&#10003;</span> يربط بين تركيب الخلية ووظيفتها</li>
        </ul>
        
        <h3 style="color:{PURPLE};font-size:18px;margin-top:18px;margin-bottom:10px;">للدكاترة والمدربين</h3>
        <ul style="list-style:none;">
          <li style="padding:6px 0;font-size:15px;color:{GRAY_LIGHT};"><span style="color:{PURPLE};margin-left:8px;">&#10003;</span> قابل للتطوير لمستوى جامعي</li>
          <li style="padding:6px 0;font-size:15px;color:{GRAY_LIGHT};"><span style="color:{PURPLE};margin-left:8px;">&#10003;</span> مناسب لورشات تدريب المعلمين</li>
        </ul>
      </div>
    </div>
  </div>
"""


# ===== SLIDE 5: Quiz Questions =====
slide5_content = f"""
  <div class="content">
    <h2 style="color:{AMBER};font-size:30px;">أسئلة تقييمية - اختبار سريع</h2>
    <p class="subtitle" style="margin-bottom:12px;">5 أسئلة متنوعة مع الإجابات النموذجية - جاهزة للطباعة</p>
    
    <div class="grid-2" style="flex:1;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div class="question-box">
          <span class="question-num">1</span>
          <span style="font-weight:700;font-size:15px;color:{WHITE};">ما هي المكونات الأساسية المشتركة بين الخلية النباتية والحيوانية؟</span>
          <div class="answer-box">الغشاء الخلوي، السيتوبلازم، النواة (صفحة 42)</div>
        </div>
        
        <div class="question-box">
          <span class="question-num">2</span>
          <span style="font-weight:700;font-size:15px;color:{WHITE};">ما وظيفة النواة في الخلية؟</span>
          <div class="answer-box">تحتوي على الحمض النووي DNA وتتحكم بنشاطات الخلية وصفاتها (صفحة 44)</div>
        </div>
        
        <div class="question-box">
          <span class="question-num">3</span>
          <span style="font-weight:700;font-size:15px;color:{WHITE};">لماذا الخلية النباتية تعمل تركيب ضوئي والحيوانية لا؟</span>
          <div class="answer-box">لأنها تحتوي على البلاستيدات الخضراء التي تحتوي اليخضور (صفحة 49)</div>
        </div>
      </div>
      
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div class="question-box">
          <span class="question-num">4</span>
          <span style="font-weight:700;font-size:15px;color:{WHITE};">ما الفرق بين الفجوة العصارية في الخلية النباتية والحيوانية؟</span>
          <div class="answer-box">النباتية: كبيرة ومركزية واحدة. الحيوانية: صغيرة ومتعددة (صفحة 50)</div>
        </div>
        
        <div class="question-box">
          <span class="question-num">5</span>
          <span style="font-weight:700;font-size:15px;color:{WHITE};">قارن بين الجدار الخلوي والغشاء الخلوي من حيث الموقع والوظيفة؟</span>
          <div class="answer-box">الجدار: خارجي في النبات فقط، دعم وحماية. الغشاء: تحت الجدار/خارجي في الحيوان، ينظم دخول وخروج المواد (صفحة 43)</div>
        </div>
        
        <div class="card" style="margin-top:auto;border-right:4px solid {AMBER};padding:14px 18px;">
          <span style="color:{AMBER};font-weight:700;">ملاحظة للمعلم:</span>
          <span style="font-size:14px;color:{GRAY_LIGHT};"> هالأسئلة تم إعدادها من الكتاب المدرسي فقط - كل إجابة مكتوب جنبها رقم الصفحة. فيك تطلب نسخة تانية بأسئلة مختلفة بنقرة واحدة!</span>
        </div>
      </div>
    </div>
  </div>
"""


# ===== SLIDE 6: Lesson Plan =====
slide6_content = f"""
  <div class="content">
    <h2 style="color:{AMBER};font-size:30px;">خطة الدرس - تحضير كامل جاهز</h2>
    <p class="subtitle" style="margin-bottom:12px;">خطة درس منسقة ومكتملة - جاهزة للتقديم</p>
    
    <div class="grid-2" style="flex:1;">
      <div style="display:flex;flex-direction:column;gap:6px;">
        <div class="plan-step">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title">التمهيد (5 دقائق)</div>
            <div class="step-desc">سؤال تحفيزي: "شو أصغر شي حي بالعالم؟" - ربط بالتجربة اليومية</div>
          </div>
        </div>
        
        <div class="plan-step">
          <div class="step-num">2</div>
          <div class="step-content">
            <div class="step-title">الشرح (15 دقيقة)</div>
            <div class="step-desc">عرض مكونات الخلية (غشاء-سيتوبلازم-نواة) مع الرسم التوضيحي</div>
          </div>
        </div>
        
        <div class="plan-step">
          <div class="step-num">3</div>
          <div class="step-content">
            <div class="step-title">المقارنة (10 دقائق)</div>
            <div class="step-desc">جدول مقارنة بين الخلية النباتية والحيوانية - عمل الطلاب</div>
          </div>
        </div>
        
        <div class="plan-step">
          <div class="step-num">4</div>
          <div class="step-content">
            <div class="step-title">التقييم (10 دقائق)</div>
            <div class="step-desc">5 أسئلة تقييمية متنوعة مع التصحيح الفوري</div>
          </div>
        </div>
        
        <div class="plan-step">
          <div class="step-num">5</div>
          <div class="step-content">
            <div class="step-title">الواجب المنزلي</div>
            <div class="step-desc">رسم خلية نباتية مع تسمية المكونات + سؤال بحثي</div>
          </div>
        </div>
      </div>
      
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="card" style="padding:18px;">
          <h3 style="color:{AMBER};font-size:16px;margin-bottom:10px;">بيانات الدرس</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div><span style="color:{GRAY};font-size:13px;">المادة:</span> <span style="font-weight:700;font-size:14px;">علوم</span></div>
            <div><span style="color:{GRAY};font-size:13px;">الصف:</span> <span style="font-weight:700;font-size:14px;">السابع</span></div>
            <div><span style="color:{GRAY};font-size:13px;">المدة:</span> <span style="font-weight:700;font-size:14px;">45 دقيقة</span></div>
            <div><span style="color:{GRAY};font-size:13px;">المرجع:</span> <span style="font-weight:700;font-size:14px;">ص 42-50</span></div>
          </div>
        </div>
        
        <div class="card" style="padding:18px;">
          <h3 style="color:{GREEN};font-size:16px;margin-bottom:10px;">الأهداف</h3>
          <ul style="list-style:none;">
            <li style="padding:4px 0;font-size:14px;color:{GRAY_LIGHT};"><span style="color:{GREEN};margin-left:6px;">&#10003;</span> أن يتعرف الطالب على مكونات الخلية</li>
            <li style="padding:4px 0;font-size:14px;color:{GRAY_LIGHT};"><span style="color:{GREEN};margin-left:6px;">&#10003;</span> أن يقارن بين نوعي الخلايا</li>
            <li style="padding:4px 0;font-size:14px;color:{GRAY_LIGHT};"><span style="color:{GREEN};margin-left:6px;">&#10003;</span> أن يربط بين التركيب والوظيفة</li>
          </ul>
        </div>
        
        <div class="card" style="padding:18px;border:1px solid rgba(34,197,94,0.3);background:rgba(34,197,94,0.05);">
          <h3 style="color:{GREEN};font-size:16px;margin-bottom:8px;">كل هذا تم إعداده بـ 5 دقائق!</h3>
          <p style="font-size:14px;color:{GRAY_LIGHT};line-height:1.5;">بدل ساعتين تحضير، فيك تعمل خطة درس كاملة + أسئلة + ملخص + ملف PDF جاهز للطباعة. هاد اللي رح تتعلمه بالكورس.</p>
        </div>
      </div>
    </div>
  </div>
"""


TOTAL_SLIDES = 6
slides_data = [
    ("slide-1", slide1_content),
    ("slide-2", slide2_content),
    ("slide-3", slide3_content),
    ("slide-4", slide4_content),
    ("slide-5", slide5_content),
    ("slide-6", slide6_content),
]


async def create_slides():
    from playwright.async_api import async_playwright
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        for i, (name, content) in enumerate(slides_data):
            html = make_slide_html(i + 1, TOTAL_SLIDES, content)
            
            page = await browser.new_page(viewport={"width": 1280, "height": 720})
            await page.set_content(html, wait_until="networkidle")
            
            # Wait for fonts to load
            await page.wait_for_timeout(3000)
            
            output_path = os.path.join(SLIDES_DIR, f"{name}.png")
            await page.screenshot(path=output_path, full_page=False)
            print(f"Created: {output_path}")
            
            await page.close()
        
        await browser.close()
        print("All slides created successfully!")


if __name__ == "__main__":
    asyncio.run(create_slides())
