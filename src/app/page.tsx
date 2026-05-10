'use client'

import { useState, useEffect } from 'react'
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronLeft,
  FileText,
  GraduationCap,
  Laptop,
  MessageCircle,
  Mic,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
  Gift,
  Play,
  ArrowLeft,
  X,
} from 'lucide-react'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 45, seconds: 30 })
  const [showVideo, setShowVideo] = useState(false)

  // Countdown timer
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

  const faqs = [
    {
      q: 'هل الكورس مناسب للمبتدئين؟',
      a: 'أكيد! الكورس مصمم من الصفر. لا تحتاج أي خبرة تقنية. كل اللي تحتاجه حساب جوجل واتصال إنترنت. رح نمشي معك خطوة بخطوة من أول ما تفتح الموقع لحد ما تعمل ملف PDF احترافي.',
    },
    {
      q: 'هل الأدوات المذكورة مجانية؟',
      a: 'NotebookLM مجاني تماماً من جوجل. Z.ai يحتاج اشتراك لكن الكورس بيعلمك تستخدم النسخة المجانية بشكل فعال وتستفيد منها لأقصى درجة. مش محتاج تدفع شي إضافي.',
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
        'التعريف بالمدرب نواف البوطة وليش هاد الكورس مهم',
        'شو هو الذكاء الاصطناعي + كيف يفيد المعلم',
        'مقارنة بين أدوات AI المختلفة',
      ],
    },
    {
      title: 'NotebookLM بالتفصيل',
      lessons: 5,
      time: '30 دقيقة',
      items: [
        'إنشاء حساب وفتح NotebookLM',
        'رفع المصادر (كتاب مدرسي، ملفات PDF)',
        'طرح الأسئلة والحصول على إجابات موثقة',
        'عمل ملخصات وأسئلة من المصدر فقط',
        'عمل بودكاست تعليمي بنقرة واحدة',
      ],
    },
    {
      title: 'Z.ai بالتفصيل',
      lessons: 4,
      time: '30 دقيقة',
      items: [
        'التعرف على Z.ai وإمكانياته',
        'إنشاء مذكرة PDF احترافية من النص',
        'عمل خطة درس وأوراق عمل',
        'إعداد أسئلة امتحان بتصميم جاهز للطباعة',
      ],
    },
    {
      title: 'برومبتات احترافية + نماذج جاهزة',
      lessons: 4,
      time: '30 دقيقة',
      items: [
        'قاعدة س-د-س-م لكتابة البرومبت المثالي',
        'أخطاء شائعة بيقع فيها المعلمين',
        '15 برومبت جاهز للتطبيق المباشر',
        'تقنيات متقدمة + ملخص + خاتمة',
      ],
    },
  ]

  const bonuses = [
    {
      title: '15 برومبت جاهز',
      subtitle: 'PROMPTS Jاهزة',
      value: '$15',
      desc: '15 برومبت جاهز للنسخ واللصق مباشرة. مصممة خصيصاً للمعلمين السوريين. كل برومبت مجرّب وبيدي نتائج ممتازة مع المنهج السوري. مش محتاج تفكر، انسخ ولصق وابدأ!',
      icon: Zap,
    },
    {
      title: 'دليل كتابة البرومبتات',
      subtitle: 'PROMPT WRITING GUIDE',
      value: '$10',
      desc: 'دليل شامل بيعلمك تكتب برومبتات احترافية من الصفر. من المبتدئ للمحترف. بعد هاد الدليل رح تقدر تكتب أي برومبت وتحصل على نتائج مذهلة من أي أداة AI.',
      icon: BookOpen,
    },
    {
      title: 'ورقة مرجعية سريعة',
      subtitle: 'CHEAT SHEET',
      value: '$10',
      desc: 'ورقة مرجعية سريعة بتلخص أهم الأوامر والخطوات. طباعها وحطها جنبك. بثواني بتلاقي اللي بدك ياه بدون ما ترجع تفتح الكورس. مرجعك الدائم.',
      icon: FileText,
    },
    {
      title: 'دليل المعلم الكامل',
      subtitle: 'TEACHER GUIDE',
      value: '$15',
      desc: 'دليل خطوة بخطوة من البداية للنهاية. كل مرحلة مشروحة بالتفصيل مع صور توضيحية. مناسب حتى لو ما عندك أي خبرة تقنية. اتبع الخطوات وطبق!',
      icon: GraduationCap,
    },
    {
      title: 'نصوص إعلانات + واتساب',
      subtitle: 'ADS & WHATSAPP COPY',
      value: '$10',
      desc: 'نصوص إعلانات جاهزة لفيسبوك وانستغرام + رسائل واتساب تسويقية. لو بدك تسوق الكورس أو تستخدم الأسلوب بتسويقك الخاص، هاد الملف بيوفر عليك ساعات من الكتابة.',
      icon: MessageCircle,
    },
    {
      title: 'وصول دائم + تحديثات',
      subtitle: 'LIFETIME ACCESS',
      value: '$20',
      desc: 'ادفع مرة واحتفظ بالكورس للأبد. مفيش اشتراك شهري ولا تجديد. بمجرد اشتراكك، عندك وصول دائم لكل المحتوى وأي تحديثات مستقبلية توصلك مجاناً.',
      icon: Shield,
    },
  ]

  const testimonials = [
    {
      name: 'أحمد الحسين',
      role: 'معلم رياضيات - حلب',
      text: 'كنت بقعد 3 ساعات بتحضير درس واحد، الحين بنصف ساعة بخلص كل شي. NotebookLM غيّر طريقة شغلي بالكامل. الأسئلة اللي بيعملها من الكتاب المدرسي دقيقة وموثقة.',
    },
    {
      name: 'سارة العبدالله',
      role: 'معلمة لغة عربية - دمشق',
      text: 'الكورس غير طريقة تحضيري بالكامل. صرت بعمل مذكرات PDF احترافية بـ 10 دقائق! الطلاب انبسطوا كتير بالملفات الجديدة وبالملخصات اللي بوزعها عليهم.',
    },
    {
      name: 'محمد الخطيب',
      role: 'معلم علوم - حمص',
      text: 'ميزة البودكاست رهيبة! بعمل ملف صوتي لكل فصل وبوزعه على الطلاب عبر واتساب. صارت المذاكرة أسهل كتير والطلاب بيحكولي إنهم بيسمعوه وهم بالمشي.',
    },
    {
      name: 'فاطمة النعسان',
      role: 'معلمة تربية إسلامية - حماة',
      text: 'كنت خايفة من الذكاء الاصطناعي وبحس إنه مش ياني. الكورس بيوصل المعلومة ببساطة وبدون تعقيد. الحين بستخدم NotebookLM يومياً وبحضّر دروسي بأقل من نصف الوقت.',
    },
    {
      name: 'عمر الحاج',
      role: 'معلم إنجليزي - اللاذقية',
      text: 'أفضل استثمار عملته هالسنة. بـ $30 وفرت ساعات يومياً. البرومبتات الجاهزة بتوفر عليك وقت كتير وبالنتيجة بتحصل على محتوى دقيق ومناسب لطلابك.',
    },
    {
      name: 'ريم العلي',
      role: 'معلمة علوم - دير الزور',
      text: 'Z.ai بيعمل ملفات PDF بتنسق احترافي. كنت بقعد ساعات بالتنسيق بالوورد، الحين بدقائق بكون جاهز. الأوراق العملية اللي بعطيها لطلابي صارت أحلى بكثير.',
    },
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
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f59e0b]/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8b5cf6]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#f59e0b]/15 text-[#f59e0b] px-5 py-2 rounded-full text-sm font-bold mb-6 border border-[#f59e0b]/20">
            <Sparkles className="w-4 h-4" />
            كورس عملي - ساعتين فقط - المدرب نواف البوطة
          </div>

          {/* Main Headlines */}
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
            حتى لو عندك خبرة تقنية صفر، هعلّمك تستخدم <span className="text-white font-bold">NotebookLM</span> و <span className="text-white font-bold">Z.ai</span> لتحوّل أي مصدر لملف PDF احترافي جاهز للطباعة بأقل من 15 دقيقة
          </p>

          {/* Video Section */}
          <div className="max-w-3xl mx-auto mb-8">
            <div
              className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0c29] rounded-2xl overflow-hidden border border-white/10 aspect-video cursor-pointer group"
              onClick={() => setShowVideo(true)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#f59e0b] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#f59e0b]/30">
                  <Play className="w-8 h-8 text-black mr-[-3px]" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded text-sm text-gray-300">
                شاهد الفيديو لتعرف الخطوات
              </div>
            </div>
          </div>

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

      {/* ===== TRAINER INTRO ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
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
                مدرب متخصص في استخدام أدوات الذكاء الاصطناعي في المجال التعليمي. بعد ما جربت كل أدوات AI المتاحة، لقيت إن NotebookLM و Z.ai هم الأنسب للمعلمين السوريين. مؤمن بأن كل معلم يقدر يستخدم AI بسهولة بغض النظر عن خلفيته التقنية. هاد الكورس هو اللي كنت بدك ياه لما كنت ببداية الطريق.
              </p>
            </div>
          </div>

          {/* CTA after trainer */}
          <div className="text-center mt-10">
            <a
              href="#register"
              className="inline-flex items-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg shadow-[#22c55e]/30"
            >
              اشترك الآن
              <ArrowLeft className="w-6 h-6" />
            </a>
            <p className="text-gray-500 text-sm mt-3">
              استرجع استثمارك بالكامل اذا لم تجد الفائدة المتوقعة
            </p>
          </div>
        </div>
      </section>

      {/* ===== EXPERT TESTIMONIALS ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
            رأي الخبراء بعد تجربتهم الكورس
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.slice(0, 2).map((item, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed text-lg">&ldquo;{item.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-[#f59e0b] text-lg">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROBLEM / PAIN POINTS ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-4">
            هل تعاني من هالمشاكل؟
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            معظم المعلمين بيضيعوا ساعات يومية بالتحضير والأنشطة اللي ممكن تعملها بدقائق
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: 'ساعات بالتحضير يومياً',
                desc: 'بتضيع 2-3 ساعات يومياً بتحضير الدروس والأسئلة والمذكرات. وقتك ثمين ومحدود.',
                highlight: '2-3 ساعات',
              },
              {
                icon: FileText,
                title: 'ملفات مش مرتبة',
                desc: 'المذكرات والخطط بتعملها بالوورد بس التنسيق بياخد وقت أكتر من الكتابة نفسها.',
                highlight: 'وقت مهدور',
              },
              {
                icon: Brain,
                title: 'محتوى عام مش دقيق',
                desc: 'ChatGPT بيعطيك إجابات عامة مش مبنية على المنهج السوري. محتاج شي يفهم الكتاب المدرسي.',
                highlight: 'مش للمنهج السوري',
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl p-6 border border-red-900/30 hover:border-red-500/50 transition-colors">
                <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <item.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTION: TIME SAVINGS TABLE ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
            وفّر وقتك <span className="text-[#22c55e]">يومياً</span>
          </h2>
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
                  { task: 'عمل بودكاست تعليمي', old: 'مستحيل', ai: '5 دقائق', save: '∞' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}>
                    <td className="py-3 px-6 text-right font-medium text-white">
                      {row.task}
                    </td>
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

      {/* ===== COURSE CONTENT ACCORDION ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">
            محتوى الكورس
          </h2>
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
          <p className="text-lg font-bold mb-4">
            ينتهي العرض الخاص بعد
          </p>
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
          <p className="text-gray-500 text-sm mt-3">
            استرجع استثمارك بالكامل اذا لم تجد الفائدة المتوقعة
          </p>
        </div>
      </section>

      {/* ===== BONUSES ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">
            مازلت متردد؟
          </h2>
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

          {/* Total bonus value */}
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
          <h2 className="text-2xl md:text-4xl font-black text-center mb-10">
            كل ما ستحصل عليه عند اشتراكك
          </h2>
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5">
            {/* Items */}
            {[
              { title: 'كورس NotebookLM + Z.ai في التعليم', desc: 'ساعتين من المحتوى العملي المباشر', value: '$97' },
              ...bonuses.map((b) => ({ title: b.title, desc: '', value: b.value })),
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between ${i > 0 ? 'border-t border-white/5 pt-4 mt-4' : 'pb-4'}`}>
                <div>
                  <h4 className="font-bold text-white">{item.title}</h4>
                  {item.desc && <p className="text-sm text-gray-500">{item.desc}</p>}
                </div>
                <span className="text-[#f59e0b] font-bold shrink-0 mr-4">
                  {i === 0 ? (
                    <>{item.value} <span className="text-[#22c55e] text-sm">مجاناً</span></>
                  ) : (
                    <>{item.value} <span className="text-[#22c55e] text-sm">مجاناً</span></>
                  )}
                </span>
              </div>
            ))}

            {/* Total */}
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

            {/* CTA */}
            <a
              href="#register"
              className="w-full mt-8 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black py-5 rounded-xl text-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#22c55e]/30"
            >
              اشترك الآن
              <ArrowLeft className="w-6 h-6" />
            </a>
            <p className="text-center text-gray-500 text-sm mt-3">
              استرجع استثمارك بالكامل اذا لم تجد الفائدة المتوقعة
            </p>
          </div>
        </div>
      </section>

      {/* ===== STUDENT TESTIMONIALS ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">
            شو بيقولوا المعلمين؟
          </h2>
          <p className="text-gray-400 text-center mb-12">آراء حقيقية من معلمين جربوا الكورس</p>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.slice(2).map((item, i) => (
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
          <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
            الأسئلة الشائعة
          </h2>
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
            <h2 className="text-2xl md:text-4xl font-black mb-3">
              سجّل الآن بالكورس
            </h2>
            <p className="text-gray-400 text-lg">
              ابدأ رحلتك مع الذكاء الاصطناعي بالتعليم اليوم
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5">
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-[#22c55e]">$30</div>
              <p className="text-gray-500 mt-1">دفع واحد - وصول دائم</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  رقم الواتساب
                </label>
                <input
                  type="tel"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
                  placeholder="+963 xxx xxx xxxx"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  المادة التي تدرّسها
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
                >
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
          <p className="text-gray-600 text-sm">
            كورس NotebookLM + Z.ai في التعليم | للمعلمين والمعلمات في سوريا
          </p>
          <p className="text-xs mt-2 text-gray-700">
            جميع الحقوق محفوظة 2025
          </p>
        </div>
      </footer>

      {/* ===== VIDEO MODAL ===== */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setShowVideo(false)}>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 left-0 text-white hover:text-[#f59e0b] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-white/10">
              <div className="text-center">
                <Play className="w-16 h-16 text-[#f59e0b] mx-auto mb-4" />
                <p className="text-gray-400 text-lg">فيديو تعريفي للكورس</p>
                <p className="text-gray-600 text-sm mt-2">سيتم إضافة الفيديو قريباً</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
