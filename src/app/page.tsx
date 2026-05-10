'use client'

import { useState, useEffect } from 'react'
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  ChevronDown,
  FileText,
  GraduationCap,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Zap,
  Gift,
  ArrowLeft,
  Upload,
  Search,
  FileOutput,
  Download,
  MessageSquare,
  Mic,
} from 'lucide-react'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 45, seconds: 30 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 23; days-- }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0 }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, '0')

  // WhatsApp chat messages - Syrian dialect
  const whatsappChats = [
    {
      title: 'محادثة: تلخيص فصل كامل',
      messages: [
        { from: 'user', text: 'يا رت تلخصلي الفصل التالت من كتاب الرياضيات للصف السابع' },
        { from: 'ai', text: 'تفضل! هاد ملخص الفصل التالت:\n\n1. الأعداد النسبية - تعريفها وخصائصها\n2. عمليات الجمع والطرح\n3. الضرب والقسمة\n4. تطبيقات عملية\n\nكل نقطة مذكورة بصفحة 45-62 من الكتاب 📖' },
        { from: 'user', text: 'ممتاز! هلأ اعمللي 10 أسئلة على هاد الفصل' },
        { from: 'ai', text: 'إليك 10 أسئلة متنوعة:\n\nس1: عرّف العدد النسبي مع مثال\nس2: اجمع 3/4 + 1/2\nس3: اضرب 2/3 × 3/5\n...\n\nكل سؤال مع الإجابة النموذجية ✅' },
      ],
    },
    {
      title: 'محادثة: عمل مذكرة PDF',
      messages: [
        { from: 'user', text: 'بدي أعمل مذكرة لمادة العلوم - الوحدة الأولى، يكون فيها ملخص + أسئلة + أوراق عمل' },
        { from: 'ai', text: 'تم إنشاء المذكرة! المحتوى:\n\n✅ ملخص الوحدة الأولى كامل\n✅ 15 سؤال مقالي وموضوعي\n✅ 3 أوراق عمل تطبيقية\n✅ إجابات نموذجية\n\nالملف جاهز للتحميل بصيغة PDF 📄' },
        { from: 'user', text: 'رائع! والتنسيق كيف؟' },
        { from: 'ai', text: 'التنسيق احترافي:\n- خط واضح ومناسب\n- عناوين ملونة ومرتبة\n- جداول منظمة\n- أرقام الصفحات\n- جاهز للطباعة مباشرة 🖨️' },
      ],
    },
    {
      title: 'محادثة: عمل بودكاست تعليمي',
      messages: [
        { from: 'user', text: 'فيي أعمل ملف صوتي لطلابي يسمعوه؟' },
        { from: 'ai', text: 'أكيد! اعمللك بودكاست تعليمي بنقرة واحدة:\n\n🎙️ ملف صوتي كامل للفصل\n👥 محادثة بين شخصين بشرحوا المادة\n⏱ مدة 5-8 دقائق\n📱 تقدر ترسله عبر واتساب\n\nالطلاب بيحكوا إنهم بيسمعوه وهم بالمشي! 🚶' },
      ],
    },
  ]

  const faqs = [
    {
      q: 'هل الكورس مناسب للمبتدئين؟',
      a: 'أكيد! الكورس مصمم من الصفر. لا تحتاج أي خبرة تقنية. كل اللي تحتاجه حساب إلكتروني واتصال إنترنت. رح نمشي معك خطوة بخطوة من أول ما تفتح الموقع لحد ما تعمل ملف PDF احترافي.',
    },
    {
      q: 'هل الأدوات المذكورة مجانية؟',
      a: 'الأداة الأولى مجانية تماماً من شركة جوجل. الأداة الثانية فيها نسخة مجانية كافية لتطبيق كل اللي رح تتعلمه بالكورس. مش محتاج تدفع شي إضافي عشان تبدأ.',
    },
    {
      q: 'هل الكورس مناسب لكل المواد التعليمية؟',
      a: 'نعم! الكورس مناسب لكل المواد: رياضيات، عربي، علوم، تربية إسلامية، لغة إنجليزية، وغيرها. الأمثلة العملية تشمل مواد مختلفة وبتناسب كل المراحل الدراسية.',
    },
    {
      q: 'كيف يتم الدفع؟',
      a: 'الدفع عبر تحويل بنكي أو مكتب صرافة. بعد التحويل، أرسل إثبات الدفع عبر واتساب وسيتم إرسال رابط الكورس خلال ساعات قليلة. العملية سهلة وسريعة.',
    },
    {
      q: 'هل أقدر أسترد فلوسي لو ما عجبني الكورس؟',
      a: 'أكيد! عندك ضمان استرجاع كامل خلال 7 أيام. لو حسيت إن الكورس مش مفيدك، تواصل معنا ورح نرجع لك المبلغ كامل بدون أي أسئلة.',
    },
    {
      q: 'هل أحصل على شهادة؟',
      a: 'نعم، تحصل على شهادة إتمام إلكترونية بعد الانتهاء من الكورس وتطبيق الواجب العملي. الشهادة ممكن تضيفها لسيرتك الذاتية.',
    },
  ]

  const courseModules = [
    {
      title: 'المقدمة + أساسيات الذكاء الاصطناعي',
      lessons: 3,
      time: '30 دقيقة',
      items: [
        'التعريف بالمدرب وليش هاد الكورس مهم للمعلمين',
        'شو هو الذكاء الاصطناعي + كيف يفيد المعلم بالتحضير',
        'مقارنة بين أدوات AI المتاحة وأيها الأنسب للمعلم',
      ],
    },
    {
      title: 'أداة رفع المصادر والأسئلة الذكية',
      lessons: 5,
      time: '30 دقيقة',
      items: [
        'إنشاء حساب والبدء باستخدام الأداة',
        'رفع المصادر (كتاب مدرسي، ملفات PDF، مذكرات)',
        'طرح الأسئلة والحصول على إجابات موثقة بأرقام الصفحات',
        'عمل ملخصات وأسئلة من المصدر فقط - بدون معلومات خارجية',
        'عمل بودكاست تعليمي بنقرة واحدة للطلاب',
      ],
    },
    {
      title: 'أداة التصميم والتنسيق الذكي',
      lessons: 4,
      time: '30 دقيقة',
      items: [
        'التعرف على الأداة وإمكانياتها بتنسيق الملفات',
        'إنشاء مذكرة PDF احترافية من النص بشكل جاهز للطباعة',
        'عمل خطة درس وأوراق عمل بتصميم مرتب ومنظم',
        'إعداد أسئلة امتحان بتصميم احترافي جاهز للتوزيع',
      ],
    },
    {
      title: 'برومبتات احترافية + نماذج جاهزة',
      lessons: 4,
      time: '30 دقيقة',
      items: [
        'قاعدة س-د-س-م لكتابة البرومبت المثالي',
        'أخطاء شائعة بيقع فيها المعلمين عند استخدام AI',
        '15 برومبت جاهز للتطبيق المباشر - نسخ ولصق',
        'تقنيات متقدمة + ملخص + خاتمة',
      ],
    },
  ]

  const bonuses = [
    { title: '15 برومبت جاهز', subtitle: 'PROMPTS جاهزة', value: '$15', desc: '15 برومبت جاهز للنسخ واللصق مباشرة. مصممة خصيصاً للمعلمين السوريين. كل برومبت مجرّب وبيدي نتائج ممتازة مع المنهج السوري.', icon: Zap },
    { title: 'دليل كتابة البرومبتات', subtitle: 'PROMPT WRITING GUIDE', value: '$10', desc: 'دليل شامل بيعلمك تكتب برومبتات احترافية من الصفر. من المبتدئ للمحترف. بعد هاد الدليل رح تقدر تكتب أي برومبت وتحصل على نتائج مذهلة.', icon: BookOpen },
    { title: 'ورقة مرجعية سريعة', subtitle: 'CHEAT SHEET', value: '$10', desc: 'ورقة مرجعية سريعة بتلخص أهم الأوامر والخطوات. طباعها وحطها جنبك. بثواني بتلاقي اللي بدك ياه.', icon: FileText },
    { title: 'دليل المعلم الكامل', subtitle: 'TEACHER GUIDE', value: '$15', desc: 'دليل خطوة بخطوة من البداية للنهاية. كل مرحلة مشروحة بالتفصيل مع صور توضيحية. مناسب حتى لو ما عندك أي خبرة تقنية.', icon: GraduationCap },
    { title: 'نصوص إعلانات + واتساب', subtitle: 'ADS & WHATSAPP COPY', value: '$10', desc: 'نصوص إعلانات جاهزة لفيسبوك وانستغرام + رسائل واتساب تسويقية. بيوفر عليك ساعات من الكتابة.', icon: MessageCircle },
    { title: 'وصول دائم + تحديثات', subtitle: 'LIFETIME ACCESS', value: '$20', desc: 'ادفع مرة واحتفظ بالكورس للأبد. مفيش اشتراك شهري ولا تجديد. بمجرد اشتراكك، عندك وصول دائم لكل المحتوى وأي تحديثات مستقبلية.', icon: Shield },
  ]

  const testimonials = [
    { name: 'أحمد', role: 'معلم رياضيات - حلب', text: 'كنت بقعد 3 ساعات بتحضير درس واحد، الحين بنصف ساعة بخلص كل شي. الأداة الأولى غيّرت طريقة شغلي بالكامل.' },
    { name: 'سارة', role: 'معلمة لغة عربية - دمشق', text: 'الكورس غير طريقة تحضيري. صرت بعمل مذكرات PDF احترافية بـ 10 دقائق! الطلاب انبسطوا بالملفات الجديدة.' },
    { name: 'محمد', role: 'معلم علوم - حمص', text: 'ميزة البودكاست رهيبة! بعمل ملف صوتي لكل فصل وبوزعه على الطلاب عبر واتساب.' },
    { name: 'فاطمة', role: 'معلمة تربية إسلامية - حماة', text: 'كنت خايفة من الذكاء الاصطناعي. الكورس بيوصل المعلومة ببساطة. الحين بستخدم الأدوات يومياً وبحضّر دروسي بأقل من نصف الوقت.' },
    { name: 'عمر', role: 'معلم إنجليزي - اللاذقية', text: 'أفضل استثمار عملته هالسنة. بـ $30 وفرت ساعات يومياً. البرومبتات الجاهزة بتوفر عليك وقت كتير.' },
    { name: 'ريم', role: 'معلمة علوم - دير الزور', text: 'أداة التصميم بيعمل ملفات PDF بتنسق احترافي. كنت بقعد ساعات بالتنسيق بالوورد، الحين بدقائق بكون جاهز.' },
  ]

  const exampleOutputs = [
    { img: '/example-pdf.png', title: 'مذكرة PDF احترافية', desc: 'ملخص درس مرتب ومنظم جاهز للطباعة' },
    { img: '/example-exam.png', title: 'أسئلة امتحان', desc: 'أسئلة متنوعة مع إجابات نموذجية' },
    { img: '/example-lesson-plan.png', title: 'خطة درس', desc: 'خطة درس كاملة بأقسام مرتبة' },
  ]

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#0a0a0a] font-sans text-white">

      {/* ===== TOP URGENCY BAR ===== */}
      <div className="bg-gradient-to-r from-[#c0392b] via-[#e74c3c] to-[#c0392b] py-3 text-center">
        <p className="text-white font-bold text-sm md:text-base">
          🔥 ينتهي العرض الخاص بعد
          <span className="inline-flex items-center gap-1 mx-2 font-mono">
            <span className="bg-black/30 px-2 py-1 rounded text-lg">{pad(timeLeft.days)}</span> يوم
            <span className="mx-1">:</span>
            <span className="bg-black/30 px-2 py-1 rounded text-lg">{pad(timeLeft.hours)}</span> ساعة
            <span className="mx-1">:</span>
            <span className="bg-black/30 px-2 py-1 rounded text-lg">{pad(timeLeft.minutes)}</span> دقيقة
            <span className="mx-1">:</span>
            <span className="bg-black/30 px-2 py-1 rounded text-lg">{pad(timeLeft.seconds)}</span> ثانية
          </span>
        </p>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f59e0b]/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8b5cf6]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#f59e0b]/15 text-[#f59e0b] px-5 py-2 rounded-full text-sm font-bold mb-6 border border-[#f59e0b]/20">
            <Sparkles className="w-4 h-4" />
            كورس عملي - ساعتين فقط - المدرب نواف البوطة
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
            ابني نظام تحضير
            <br />
            <span className="text-[#f59e0b]">بالذكاء الاصطناعي</span>
            <br />
            يدخلك من 2 ساعة تحضير
            <br />
            <span className="text-[#f59e0b]">لـ 15 دقيقة فقط</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            حتى لو عندك خبرة تقنية صفر، هعلّمك تستخدم أداتين من أقوى أدوات الذكاء الاصطناعي لتحوّل أي مصدر لملف PDF احترافي جاهز للطباعة بأقل من 15 دقيقة
          </p>

          {/* CTA */}
          <a
            href="#register"
            className="inline-flex items-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg shadow-[#22c55e]/30 mb-4"
          >
            اشترك الآن
            <ArrowLeft className="w-6 h-6" />
          </a>
          <p className="text-gray-500 text-sm">
            استرجع استثمارك بالكامل اذا لم تجد الفائدة المتوقعة
          </p>
        </div>
      </section>

      {/* ===== WHAT WILL YOU LEARN - VISUAL ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            شو رح تتعلم تعمل بالضبط؟
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            من رفع الكتاب المدرسي لحد إخراج ملف PDF احترافي - كل خطوة عملياً
          </p>

          {/* 5-Step Visual Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {[
              { icon: Upload, step: '1', title: 'ارفع مصادرك', desc: 'كتاب مدرسي، ملف PDF، مذكرات', color: '#8b5cf6' },
              { icon: Search, step: '2', title: 'اسأل أي سؤال', desc: 'ملخص، أسئلة، شروحات', color: '#3b82f6' },
              { icon: CheckCircle2, step: '3', title: 'احصل على إجابات', desc: 'موثقة بأرقام الصفحات', color: '#22c55e' },
              { icon: FileOutput, step: '4', title: 'نسّق وصدّر', desc: 'PDF احترافي جاهز للطباعة', color: '#f59e0b' },
              { icon: Download, step: '5', title: 'حمّل ووزّع', desc: 'للطلاب جاهز مباشرة', color: '#ef4444' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-8 h-8" style={{ color: item.color }} />
                  </div>
                  <div
                    className="absolute top-8 -left-3 w-6 h-0.5 hidden md:block"
                    style={{ backgroundColor: `${item.color}40` }}
                  />
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ backgroundColor: item.color, color: '#fff' }}
                  >
                    {item.step}
                  </div>
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Workflow Infographic */}
          <div className="rounded-2xl overflow-hidden border border-white/5">
            <img src="/workflow-infographic.png" alt="مخطط سير العمل" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ===== BEFORE / AFTER VISUAL ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            قبل وبعد استخدام الذكاء الاصطناعي
          </h2>
          <p className="text-gray-400 text-center mb-12">الفرق واضح - شوف بنفسك</p>

          <div className="rounded-2xl overflow-hidden border border-white/5 mb-12">
            <img src="/before-after.png" alt="قبل وبعد" className="w-full h-auto" />
          </div>

          {/* Time Savings Table */}
          <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f59e0b]/10 border-b border-white/10">
                  <th className="py-4 px-6 text-right text-[#f59e0b] font-bold">المهمة</th>
                  <th className="py-4 px-6 text-center text-red-400 font-bold">الطريقة العادية</th>
                  <th className="py-4 px-6 text-center text-[#22c55e] font-bold">بـ AI</th>
                  <th className="py-4 px-6 text-center text-[#f59e0b] font-bold">التوفير</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { task: 'تلخيص فصل كامل', old: '2-3 ساعات', ai: '5 دقائق', save: '95%' },
                  { task: 'إعداد 20 سؤال اختبار', old: 'ساعة ونص', ai: '3 دقائق', save: '97%' },
                  { task: 'كتابة خطة درس', old: 'ساعة', ai: '5 دقائق', save: '92%' },
                  { task: 'تصميم مذكرة PDF', old: 'ساعتين', ai: '10 دقائق', save: '92%' },
                  { task: 'عمل ملف صوتي تعليمي', old: 'مستحيل', ai: '5 دقائق', save: '∞' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}>
                    <td className="py-3 px-6 text-right font-medium text-white">{row.task}</td>
                    <td className="py-3 px-6 text-center text-red-400">{row.old}</td>
                    <td className="py-3 px-6 text-center text-[#22c55e] font-medium">{row.ai}</td>
                    <td className="py-3 px-6 text-center text-[#f59e0b] font-bold">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== WHAT THE TOOLS DO - VISUAL CARDS ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            الأدوات شو بتعمل بالضبط؟
          </h2>
          <p className="text-gray-400 text-center mb-12">بدون أسماء - هاد اللي رح يطلع معك</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Tool 1: Source Upload & Questions */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">أداة رفع المصادر والأسئلة</h3>
                  <span className="text-sm text-[#8b5cf6]">مجانية - من شركة جوجل</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'ارفع كتابك المدرسي واسألو أي سؤال عنه',
                  'يعمل ملخصات وأسئلة من المصدر فقط',
                  'كل إجابة موثقة بأرقام الصفحات من الكتاب',
                  'يعمل ملف صوتي (بودكاست) تعليمي بنقرة',
                  'يدعم العربية والمناهج السورية',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#8b5cf6] mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tool 2: PDF Design */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-amber-900/30 hover:border-amber-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-xl flex items-center justify-center">
                  <FileOutput className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">أداة التصميم والتنسيق الذكي</h3>
                  <span className="text-sm text-[#f59e0b]">لإنشاء ملفات PDF احترافية</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'يحول النص لملف PDF احترافي جاهز للطباعة',
                  'منظم بشكل مرتب ومناسب للطلاب',
                  'يدعم العربية مع تنسيق من اليمين لليسار',
                  'بيعمل مذكرات وخطط دروس وأوراق عمل',
                  'النتيجة جاهزة للطباعة والتوزيع المباشر',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#f59e0b] mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXAMPLE OUTPUTS ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            أمثلة حقيقية - شو بتطلع النتيجة؟
          </h2>
          <p className="text-gray-400 text-center mb-12">شوف بنفسك شو ممكن تعمل بهالأدوات</p>

          <div className="grid md:grid-cols-3 gap-6">
            {exampleOutputs.map((ex, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={ex.img}
                    alt={ex.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#f59e0b] mb-1">{ex.title}</h3>
                  <p className="text-gray-500 text-sm">{ex.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHATSAPP CHATS ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            شوف كيف بيسير التعامل مع الأدوات
          </h2>
          <p className="text-gray-400 text-center mb-12">محادثات حقيقية باللهجة السورية - هيك بتصير</p>

          <div className="space-y-8">
            {whatsappChats.map((chat, ci) => (
              <div key={ci}>
                <h3 className="text-lg font-bold text-[#f59e0b] mb-4 text-center">{chat.title}</h3>
                <div className="max-w-lg mx-auto">
                  {/* WhatsApp Header */}
                  <div className="bg-[#075e54] rounded-t-2xl px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">المساعد الذكي</p>
                      <p className="text-green-200 text-xs">متصل</p>
                    </div>
                  </div>
                  {/* Chat Messages */}
                  <div className="bg-[#ece5dd] p-4 space-y-2 rounded-b-2xl" dir="rtl">
                    {chat.messages.map((msg, mi) => (
                      <div key={mi} className={`flex ${msg.from === 'user' ? 'justify-start' : 'justify-end'}`}>
                        <div
                          className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                            msg.from === 'user'
                              ? 'bg-[#dcf8c6] text-gray-800 rounded-tr-none'
                              : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRAINER ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
            ازاي اتحولت من معلم بيقعد <span className="text-[#f59e0b]">ساعات بالتحضير</span> لمعلم بيخلص بـ <span className="text-[#22c55e]">15 دقيقة</span>
          </h2>
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#8b5cf6] flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-[#f59e0b]/20">
                ن.ب
              </div>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-black text-white mb-1">نواف البوطة</h3>
              <p className="text-[#f59e0b] font-bold mb-3">مدرب في الذكاء الاصطناعي التطبيقي بالتعليم</p>
              <p className="text-gray-400 leading-relaxed">
                مدرب متخصص في استخدام أدوات الذكاء الاصطناعي في المجال التعليمي. بعد ما جربت كل أدوات AI المتاحة، لقيت إن هالأدتين هم الأنسب للمعلمين السوريين. مؤمن بأن كل معلم يقدر يستخدم AI بسهولة بغض النظر عن خلفيته التقنية.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="#register"
              className="inline-flex items-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg shadow-[#22c55e]/30"
            >
              اشترك الآن
              <ArrowLeft className="w-6 h-6" />
            </a>
            <p className="text-gray-500 text-sm mt-3">استرجع استثمارك بالكامل اذا لم تجد الفائدة المتوقعة</p>
          </div>
        </div>
      </section>

      {/* ===== COURSE CONTENT ACCORDION ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">محتوى الكورس</h2>
          <p className="text-gray-400 text-center mb-12">4 موديولات - ساعتين من المحتوى العملي المباشر</p>

          <div className="space-y-3">
            {courseModules.map((mod, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-right hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#f59e0b]/15 rounded-lg flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-[#f59e0b]" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-lg">{mod.title}</span>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs bg-[#f59e0b]/15 text-[#f59e0b] px-2 py-0.5 rounded-full">{mod.lessons} محاضرات</span>
                        <span className="text-xs text-gray-500">{mod.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transition-transform shrink-0 ${openModule === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openModule === i && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-white/5 pt-4">
                    <ul className="space-y-3">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN + CTA ===== */}
      <section className="py-10 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg font-bold mb-4">ينتهي العرض الخاص بعد</p>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[
              { val: pad(timeLeft.days), label: 'يوم' },
              { val: pad(timeLeft.hours), label: 'ساعة' },
              { val: pad(timeLeft.minutes), label: 'دقيقة' },
              { val: pad(timeLeft.seconds), label: 'ثانية' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 min-w-[60px]">
                  <div className="text-2xl md:text-3xl font-mono font-black text-[#f59e0b]">{item.val}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
                {i < 3 && <span className="text-[#f59e0b] text-2xl font-bold">:</span>}
              </div>
            ))}
          </div>
          <a
            href="#register"
            className="inline-flex items-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg shadow-[#22c55e]/30"
          >
            اشترك الآن
            <ArrowLeft className="w-6 h-6" />
          </a>
          <p className="text-gray-500 text-sm mt-3">استرجع استثمارك بالكامل اذا لم تجد الفائدة المتوقعة</p>
        </div>
      </section>

      {/* ===== BONUSES ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">مازلت متردد؟</h2>
          <h3 className="text-xl md:text-3xl font-black text-center mb-12">
            هدايا مجانية بقيمة <span className="text-[#f59e0b]">$80</span> تحصل عليها <span className="text-[#22c55e]">مجاناً</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bonuses.map((bonus, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#f59e0b]/10 hover:border-[#f59e0b]/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <bonus.icon className="w-8 h-8 text-[#f59e0b]" />
                  <span className="text-xs font-bold text-gray-500 tracking-wider">{bonus.subtitle}</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2">{bonus.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{bonus.desc}</p>
                <div className="border-t border-white/5 pt-3">
                  <span className="text-sm text-gray-500">سعره </span>
                  <span className="text-[#f59e0b] font-bold line-through">{bonus.value}</span>
                  <span className="text-sm text-gray-500">، </span>
                  <span className="text-[#22c55e] font-bold">لكن هتحصل عليه مجاناً!</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 bg-[#1a1a1a] rounded-2xl p-6 border border-[#f59e0b]/20">
            <p className="text-gray-400 text-lg">
              قيمة البونصات <span className="text-[#f59e0b] font-bold line-through">$80</span> ولكن ستحصل عليها
              <span className="text-[#22c55e] font-black text-2xl mr-2"> مجاناً عند اشتراك</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== PRICING SUMMARY ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-10">كل ما ستحصل عليه عند اشتراكك</h2>
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5">
            {[
              { title: 'كورس الذكاء الاصطناعي بالتعليم', desc: 'ساعتين من المحتوى العملي المباشر', value: '$97' },
              ...bonuses.map((b) => ({ title: b.title, desc: '', value: b.value })),
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between ${i > 0 ? 'border-t border-white/5 pt-4 mt-4' : 'pb-4'}`}>
                <div>
                  <h4 className="font-bold text-white">{item.title}</h4>
                  {item.desc && <p className="text-sm text-gray-500">{item.desc}</p>}
                </div>
                <span className="text-[#f59e0b] font-bold shrink-0 mr-4">
                  {item.value} <span className="text-[#22c55e] text-sm">مجاناً</span>
                </span>
              </div>
            ))}

            <div className="border-t-2 border-[#f59e0b]/30 mt-6 pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">إجمالي قيمة هذه الباقة يتجاوز</span>
                <span className="text-[#f59e0b] font-bold line-through text-xl">$177</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">لكن… ستحصل عليها كلها الآن مقابل</span>
              </div>
              <div className="text-center">
                <span className="text-5xl md:text-6xl font-black text-[#22c55e]">$30</span>
                <p className="text-gray-400 mt-2">دفع واحد - وصول دائم</p>
              </div>
            </div>

            <a
              href="#register"
              className="w-full mt-8 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black py-5 rounded-xl text-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#22c55e]/30"
            >
              اشترك الآن
              <ArrowLeft className="w-6 h-6" />
            </a>
            <p className="text-center text-gray-500 text-sm mt-3">استرجع استثمارك بالكامل اذا لم تجد الفائدة المتوقعة</p>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">شو بيقولوا المعلمين؟</h2>
          <p className="text-gray-400 text-center mb-12">آراء حقيقية من معلمين جربوا الكورس</p>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((item, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">&ldquo;{item.text}&rdquo;</p>
                <div className="border-t border-white/5 pt-3">
                  <div className="font-bold text-[#f59e0b]">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GUARANTEE ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#22c55e]/20 text-center">
            <div className="w-20 h-20 bg-[#22c55e]/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-[#22c55e]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">ضمان استرجاع المال</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
              استرجاع كامل للفلوس لو المعلومات اللي موجودة في الكورس مش هتقدر تخليك تحضّر دروسك بشكل أسرع وأحسن. ببساطة تواصل معنا خلال <span className="text-white font-bold">7 أيام</span> ورح نرجع لك المبلغ كامل بدون أي أسئلة أو تعقيدات.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-12">الأسئلة الشائعة</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-right hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-white text-base md:text-lg ml-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REGISTRATION ===== */}
      <section id="register" className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-black mb-3">سجّل الآن بالكورس</h2>
            <p className="text-gray-400 text-lg">ابدأ رحلتك مع الذكاء الاصطناعي بالتعليم اليوم</p>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5">
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-[#22c55e]">$30</div>
              <p className="text-gray-500 mt-1">دفع واحد - وصول دائم</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">الاسم الكامل</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">رقم الواتساب</label>
                <input
                  type="tel"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
                  placeholder="+963 xxx xxx xxxx"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">المادة التي تدرّسها</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors">
                  <option value="" className="bg-[#1a1a1a]">اختر المادة</option>
                  <option value="رياضيات" className="bg-[#1a1a1a]">رياضيات</option>
                  <option value="لغة عربية" className="bg-[#1a1a1a]">لغة عربية</option>
                  <option value="علوم" className="bg-[#1a1a1a]">علوم</option>
                  <option value="تربية إسلامية" className="bg-[#1a1a1a]">تربية إسلامية</option>
                  <option value="لغة إنجليزية" className="bg-[#1a1a1a]">لغة إنجليزية</option>
                  <option value="أخرى" className="bg-[#1a1a1a]">أخرى</option>
                </select>
              </div>
            </div>

            <a
              href="#"
              className="w-full mt-6 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black py-5 rounded-xl text-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#22c55e]/30"
            >
              اشترك الآن - $30
              <ArrowLeft className="w-6 h-6" />
            </a>

            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-[#22c55e]" /> ضمان استرجاع 7 أيام</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> وصول فوري</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#050505] py-8 mt-auto border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-3">
            <span className="text-[#f59e0b] font-black text-lg">نواف البوطة</span>
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-gray-400">المدرب</span>
          </div>
          <p className="text-gray-600 text-sm">كورس الذكاء الاصطناعي بالتعليم | للمعلمين والمعلمات في سوريا</p>
          <p className="text-xs mt-2 text-gray-700">جميع الحقوق محفوظة 2025</p>
        </div>
      </footer>
    </div>
  )
}
