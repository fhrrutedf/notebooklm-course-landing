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
  Upload,
  Search,
  FileOutput,
  Download,
  MessageSquare,
  Users,
  CreditCard,
  Send,
  ArrowLeft,
} from 'lucide-react'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set countdown from localStorage - each visitor gets 3 days from first visit
    const STORAGE_KEY = 'course_offer_end'
    const stored = localStorage.getItem(STORAGE_KEY)
    let endTime: number

    if (stored) {
      endTime = parseInt(stored, 10)
    } else {
      endTime = Date.now() + 3 * 24 * 60 * 60 * 1000 // 3 days from now
      localStorage.setItem(STORAGE_KEY, endTime.toString())
    }

    const updateTimer = () => {
      const diff = Math.max(0, endTime - Date.now())
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateTimer()
    setMounted(true)
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, '0')

  const WHATSAPP_NUMBER = '963985323170'
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً، بدي اشترك بكورس الذكاء الاصطناعي بالتعليم - $22')}`

  // WhatsApp chat messages - Syrian dialect (teacher perspective)
  const whatsappChats = [
    {
      title: 'محادثة: إعداد اختبار + نسختين مختلفة',
      messages: [
        { from: 'user', text: 'عندي اختبار رياضيات بكرة للصف السابع، بدي 20 سؤال متنوع بين موضوعي ومقالي على الفصلين التالت والرابع' },
        { from: 'ai', text: 'تفضل! جهزتلك 20 سؤال:\n\n10 أسئلة موضوعية (اختيار من متعدد)\n10 أسئلة مقالية\nمع الإجابات النموذجية لكل سؤال\nكل سؤال مبنية على صفحات 45-78 من الكتاب 📖' },
        { from: 'user', text: 'حلو كتير! هلأ بدي نسخة تانية من الاختبار بأسئلة مختلفة عشان ما يغشوا' },
        { from: 'ai', text: 'تم! النسخة التانية جاهزة بـ 20 سؤال مختلف تماماً نفس المستوى ونفس المواضيع بس بأرقام وأمثلة جديدة. مع الإجابات كمان ✅' },
      ],
    },
    {
      title: 'محادثة: تصحيح اختبارات الطلاب',
      messages: [
        { from: 'user', text: 'هلأ بدي أصحح إجابات طلابي على اختبار الشهر الأول. الإجابات النموذجية عندك، بس أعطيك إجابات كل طالب وتقيسلي ياها' },
        { from: 'ai', text: 'جاهز! أعطني إجابات الطالب الأول ورح أقيسها على الإجابات النموذجية وبعطيك الدرجة والتعليق على كل سؤال 📋' },
        { from: 'user', text: 'السؤال الأول أجاب: التسوية العدلية هي حل النزاع عن طريق القضاء' },
        { from: 'ai', text: 'إجابة صحيحة! ✅\nالدرجة: 5/5\nملاحظة: الإجابة مطابقة للكتاب صفحة 23. فيك كمان تعطيني إجابات باقي الأسئلة وبصححها الكل ببضع ثواني ⚡' },
      ],
    },
    {
      title: 'محادثة: شرح للطلاب + مذكرة PDF',
      messages: [
        { from: 'user', text: 'بدي أعمل شرح مبسط لطلابي عن موضوع الجملة الفعلية، وبعدها أعمل مذكرة PDF فيها القاعدة + أمثلة + تمارين' },
        { from: 'ai', text: 'تفضل الشرح:\n\nالجملة الفعلية هي اللي تبدأ بفعل\nمثال: كتبَ الطالبُ الدرسَ\nأنواع الفعل: ماضي ومضارع وأمر\n\nوهاد ملخص القاعدة مع 10 أمثلة و5 تمارين تطبيقية 📝' },
        { from: 'user', text: 'ممتاز! هلأ حوّله لملف PDF منسق جاهز للطباعة' },
        { from: 'ai', text: 'الملف جاهز! 📄\n- عنوان واضح بالأعلى\n- القاعدة مظللة\n- أمثلة مرتبة بجدول\n- تمارين بالنهاية\n- خط واضح وجاهز للطباعة مباشرة 🖨️' },
      ],
    },
    {
      title: 'محادثة: ملف صوتي للطلاب + تلخيص',
      messages: [
        { from: 'user', text: 'بدي ملف صوتي لطلابي يسمعوه كملخص للوحدة الخامسة علوم، وبعدين بدي ورقة عمل كمان' },
        { from: 'ai', text: 'جهزتلك الملف الصوتي! 🎙️\n\n- شرح الوحدة الخامسة كاملة\n- مدته 6 دقائق\n- بيفهموا المادة وهم بالمشي\n- تقدر ترسله عبر واتساب\n\nوورقة العمل جاهزة كمان: 8 أسئلة تطبيقية على الوحدة ✅' },
      ],
    },
    {
      title: 'محادثة: دكتور جامعي - تحضير محاضرة + أسئلة',
      messages: [
        { from: 'user', text: 'أنا دكتور جامعي بدرّس مادة الأحياء الخلوية، بدي تحضير لمحاضرة عن الانقسام الخلوي مع أسئلة جامعية' },
        { from: 'ai', text: 'تفضل! جهزتلك تحضير محاضرة كاملة:\n\n- ملخص نظري عن الانقسام المتساوي والمنصف\n- مقارنة بين المراحل مع الرسوم التوضيحية\n- 10 أسئلة جامعية (مقالية وموضوعية)\n- كل شي مبنية على الكتاب اللي رفعته صفحات 120-145 📖' },
        { from: 'user', text: 'ممتاز! هلأ بدي نسخة PDF احترافية مناسبة للعرض عالطلاب بالجامعة' },
        { from: 'ai', text: 'تم! الملف جاهز بتنسيق جامعي احترافي ✅\n- غلاف بالعنوان واسم المادة\n- أرقام صفحات\n- مخططات واضحة\n- أسئلة بالنهاية مع الإجابات النموذجية\n- جاهز للعرض أو التوزيع 🎓' },
      ],
    },
  ]

  const faqs = [
    {
      q: 'أنا معلم أو دكتور جامعي ما بعرف شي بالتكنولوجيا، فيي أستفيد من الكورس؟',
      a: 'أكيد! الكورس مصمم خصيصاً للمعلمين والدكاترة والمدربين اللي ما عندهن أي خبرة تقنية. كل اللي بتحتاجه تعرف تفتح موقع وتضغط زر. رح نمشي معك خطوة بخطوة من الصفر، من أول ما تفتح الأداة لحد ما تطبع ملف PDF جاهز.',
    },
    {
      q: 'الأدوات مجانية ولا لازم ادفع اشتراك؟',
      a: 'الأداة الأولى مجانية تماماً. الأداة التانية فيها نسخة مجانية كافية لتطبيق كل اللي رح تتعلمه بالكورس. مش محتاج تدفع شي إضافي عشان تبدأ. الكورس بيعلمك تستغل النسخ المجانية لأقصى درجة.',
    },
    {
      q: 'أنا بدرّس عربي أو مادة جامعية، الكورس بيناسبني؟',
      a: 'بيناسب كل المواد وكل المراحل! عربي، رياضيات، علوم، تربية إسلامية، إنجليزي، اجتماعيات... وكمان المواد الجامعية. الأداة بتفهم أي مادة وبتعمل محتوى مبنية على المصدر اللي بترفعه سواء كتاب مدرسي أو جامعي أو مذكرة تدريبية. الأمثلة العملية بالكورس بتشمل مواد مختلفة ومستويات مختلفة.',
    },
    {
      q: 'الإجابات اللي بتطلع دقيقة ومطابقة للمنهج السوري؟',
      a: 'هاد أكتر شي بيميزها عن ChatGPT! الأداة بترجع للكتاب المدرسي اللي رفعته وبتجاوب منه بس. كل إجادة بيكون مكتوب جنبها رقم الصفحة. ما بتطلع معلومات من بره المنهج. هاد اللي بيخليها آمنة وموثوقة للمعلم.',
    },
    {
      q: 'شو الفرق بين هالأدوات وChatGPT العادي؟',
      a: 'الفرق كبير! ChatGPT بيعطيك إجابات عامة من الإنترنت مش من الكتاب المدرسي. أما هالأدوات فبتشتغل على الكتاب اللي أنت بترفعه يعني كل إجابة من المصدر وموثقة. كمان الأداة التانية بتنسقلك PDF احترافي جاهز للطباعة - شي ChatGPT ما بيعملو.',
    },
    {
      q: 'أنا دكتور جامعي أو مدرب، الكورس بيعطيني شي مختلف عن المعلم المدرسي؟',
      a: 'الأدوات نفسها بس طريقة الاستخدام بتختلف. الدكتور الجامعي بيقدر يعمل محاضرات وأسئلة بمستوى جامعي من المراجع العلمية. والمدرب بيقدر يعمل أوراق عمل وملخصات لورشات التدريب. الكورس بيعلمك تقنيات مختلفة حسب احتياجك.',
    },
    {
      q: 'كيف بدفع؟',
      a: 'الدفع عبر شام كاش أو تحويل بنكي أو مكتب صرافة. بعد التحويل، أرسل إثبات الدفع عبر واتساب ورح نبعثلك رابط الكورس خلال ساعات قليلة. العملية سهلة وسريعة.',
    },
    {
      q: 'هل فيي أتابع الكورس بوقتي؟',
      a: 'أي نعم! عندك وصول دائم للكورس، فيك ترجع له أي وقت بدك. كل محاضرة قصيرة وعمليها - ما فيها حشو.',
    },
    {
      q: 'هل الأدوات بتشتغل على الموبايل ولا لازم كمبيوتر؟',
      a: 'بتشتغل على الموبايل والكمبيوتر! الأدتين مواقع إنترنت عادية بتفتح على أي متصفح. بس للتنسيق والأعمال الكبيرة أفضل تستخدم الكمبيوتر عشان الشاشة أوسع وأسهل بالشغل.',
    },
    {
      q: 'شو بيصير لو الكتاب المدرسي مش متوفر بشكل إلكتروني؟',
      a: 'ما في مشكلة! فيك تصور الكتاب بجوالك وترفعه كصور. الأداة بتعرف تقرأ الصور كمان. أو فيك ترفع أي مذكرة أو ملخص عندك. المهم يكون عندك مصدر ترفعه والأداة بتعمل الباقي.',
    },
    {
      q: 'هل الأداة بتشتغل والإنترنت ضعيف بسوريا؟',
      a: 'الأداة مش محتاجة إنترنت قوي. بس بتحتاج اتصال مستقر. بتشتغل حتى على شبكات 3G. نصيحتي إنك تحضّر وأنت عالإنترنت وبتنزّل الملفات، وبعدها بتقدر تشتغل عليها وأنت أوفلاين.',
    },
  ]

  const courseModules = [
    {
      title: 'المقدمة + أساسيات الذكاء الاصطناعي للمعلم والدكتور والمدرب',
      lessons: 3,
      time: '30 دقيقة',
      items: [
        'التعريف بالمدرب وليش هاد الكورس مهم للمعلمين والدكاترة والمدربين',
        'شو هو الذكاء الاصطناعي + كيف بيوفّر وقتك بالتحضير سواء مدرسة أو جامعة أو ورشة تدريب',
        'مقارنة بين أدوات AI المتاحة وأيها الأنسب للمعلم والدكتور السوري',
      ],
    },
    {
      title: 'أداة رفع المصادر والأسئلة الذكية',
      lessons: 5,
      time: '30 دقيقة',
      items: [
        'إنشاء حساب والبدء باستخدام الأداة',
        'رفع الكتاب المدرسي والمصادر - وبس!',
        'إعداد اختبارات وأسئلة امتحان بنسختين مختلفة',
        'عمل ملخصات وشروحات للطلاب من الكتاب فقط',
        'عمل ملف صوتي تعليمي للطلاب بنقرة واحدة',
      ],
    },
    {
      title: 'أداة التصميم والتنسيق الذكي',
      lessons: 4,
      time: '30 دقيقة',
      items: [
        'التعرف على الأداة وإمكانياتها بتنسيق ملفات المعلم',
        'إنشاء مذكرة PDF احترافية جاهزة للطباعة والتوزيع',
        'عمل خطة درس وأوراق عمل بتصميم مرتب ومنظم',
        'إعداد اختبار منسق بالكامل - أسئلة + إجابات نموذجية',
      ],
    },
    {
      title: 'برومبتات احترافية + نماذج جاهزة',
      lessons: 4,
      time: '30 دقيقة',
      items: [
        'قاعدة س-د-س-م لكتابة البرومبت المثالي للمعلم والدكتور والمدرب',
        'أخطاء شائعة بيقع فيها المعلمين والدكاترة عند استخدام AI',
        '15 برومبت جاهز للتطبيق المباشر - مدرسة وجامعة وتدريب',
        'تقنيات متقدمة + ملخص + خاتمة',
      ],
    },
  ]

  // Reduced from 6 to 3 bonuses for credibility
  const bonuses = [
    { title: '15 برومبت جاهز', subtitle: 'PROMPTS جاهزة', value: '$15', desc: '15 برومبت جاهز للنسخ واللصق مباشرة. مصممة خصيصاً للمعلمين والدكاترة والمدربين السوريين. كل برومبت مجرّب وبيدي نتائج ممتازة مع المناهج السورية.', icon: Zap },
    { title: 'ورقة مرجعية سريعة', subtitle: 'CHEAT SHEET', value: '$10', desc: 'ورقة مرجعية سريعة بتلخص أهم الأوامر والخطوات. طباعها وحطها جنبك. بثواني بتلاقي اللي بدك ياه.', icon: FileText },
    { title: 'وصول دائم + تحديثات', subtitle: 'LIFETIME ACCESS', value: '$20', desc: 'ادفع مرة واحتفظ بالكورس للأبد. مفيش اشتراك شهري ولا تجديد. بمجرد اشتراكك، عندك وصول دائم لكل المحتوى وأي تحديثات مستقبلية.', icon: Shield },
  ]

  const testimonials = [
    { name: 'أحمد', role: 'معلم رياضيات - حلب', text: 'كنت بقعد 3 ساعات بتحضير درس واحد وتصحيح الاختبارات بياخد وقت كتير. الحين بعمل اختبار بنسختين بـ 5 دقائق، وبتصلا الإجابات النموذجية جاهزة!' },
    { name: 'سارة', role: 'معلمة لغة عربية - دمشق', text: 'صرت بعمل شروحات مكتوبة وملفات صوتية لطلابي وبوزعها عليهم واتساب. الطلاب صاروا يطلبوا كتير من هالملفات!' },
    { name: 'د. خالد', role: 'دكتور جامعي - كلية العلوم - دمشق', text: 'كنت بقعد وقت طويل بتحضير المحاضرات وكتابة الأسئلة الجامعية. الأداة بتشتغل على الكتاب الجامعي مباشرة وبتعمللي أسئلة بمستوى الطالب الجامعي مع الإجابات النموذجية!' },
    { name: 'فاطمة', role: 'مدربة معلمين - حماة', text: 'كنت خايفة من الذكاء الاصطناعي وبحس إنه مش ياني. الكورس بيوصل المعلومة ببساطة. الحين بعمل مذكرات PDF وأوراق عمل لورشات التدريب أسرع بكثير.' },
  ]

  const exampleOutputs = [
    { img: '/images/math-textbook-1.png', title: 'مذكرة رياضيات - الأعداد النسبية', desc: 'شرح + أمثلة + تمارين + إجابات نموذجية جاهزة للطباعة' },
    { img: '/images/math-textbook-2.png', title: 'مذكرة رياضيات - مراجعة الأعداد الكسرية', desc: 'ملخص + جدول عمليات + خصائص + خط الأعداد' },
    { img: '/images/exam-paper.png', title: 'اختبار الشهر الأول - بكلوريا', desc: 'أسئلة نظرية وتطبيقية + إجابات نموذجية بنسختين' },
    { img: '/images/lesson-plan.png', title: 'خطة درس - اللغة العربية', desc: 'أهداف + أنشطة + تقييم + جدول زمني مرتب' },
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
            كورس عملي - المدرب نواف البوسطه
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
            بطل تعب نفسك بالتحضير
            <br />
            <span className="text-[#f59e0b]">الذكاء الاصطناعي</span> بيعملك
            <br />
            اختبارات وشروحات ومذكرات
            <br />
            <span className="text-[#f59e0b]">بـ 15 دقيقة بدل ساعتين تحضير</span>
            <br />
            <span className="text-lg md:text-xl text-gray-500">للمعلمين والدكاترة الجامعيين والمدربين</span>
          </h1>

          {/* FIXED: Removed "مجانيتين" contradiction - now focuses on VALUE */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            تعلم تستخدم أداتين الذكاء الاصطناعي لإعداد اختبارات بنسختين، تصحيح أوراق الطلاب، وعمل مذكرات PDF احترافية - كل شي من المصدر وموثق بأرقام الصفحات. مناسب للمعلمين والدكاترة الجامعيين والمدربين.
          </p>

          {/* CTA - FIXED: More action-oriented text */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg shadow-[#25D366]/30 mb-4"
          >
            اشترك الآن - $22 فقط
            <MessageCircle className="w-6 h-6" />
          </a>

          {/* NEW: Social Proof under hero CTA */}
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#22c55e]" />
              انضم لعشرات المعلمين والدكاترة
            </span>
            <span className="flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
              ))}
              <span className="mr-1">4.9/5</span>
            </span>
          </div>

          {/* NEW: Purchase Steps - Clear process */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {[
                { icon: MessageCircle, step: '١', text: 'تواصل واتساب' },
                { icon: CreditCard, step: '٢', text: 'حول $22 شام كاش/بنكي' },
                { icon: Send, step: '٣', text: 'استلم الرابط فوراً' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#f59e0b]/15 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#f59e0b]" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#f59e0b] font-bold">خطوة {item.step}</div>
                      <div className="text-xs text-gray-400">{item.text}</div>
                    </div>
                  </div>
                  {i < 2 && <ArrowLeft className="w-4 h-4 text-gray-600 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEACHER PROBLEMS ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            هلأ وأنت معلم أو دكتور جامعي أو مدرب، كم مرة صار معك هيك؟
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            كلنا بنمر بنفس المشاكل - بس الحين في حل
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Clock, problem: 'بتقعد 2-3 ساعات بتحضير محاضرة أو درس واحد' },
              { icon: FileText, problem: 'بتكتب أسئلة اختبار بإيدك وبتاخد ساعة ونص' },
              { icon: Brain, problem: 'بتصحح اختبارات 40 طالب وبئي بحياتك' },
              { icon: BookOpen, problem: 'بتحاول تلخص فصل كامل أو مادة علمية وبقعد ساعتين' },
              { icon: MessageCircle, problem: 'طلابك بيسألوا وبتضطر تعيد الشرح كذا مرة' },
              { icon: FileOutput, problem: 'بتقعد عالوورد بتنسق مذكرة أو عرض تقديمي وبتزهق' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#1a1a1a] rounded-xl p-5 border border-red-900/20">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-red-400" />
                </div>
                <p className="text-gray-300 font-medium">{item.problem}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-xl font-bold text-white">
              هالمشاكل كلها <span className="text-[#22c55e]">خلصت</span> مع الذكاء الاصطناعي
            </p>
          </div>
        </div>
      </section>

      {/* ===== MERGED: What you learn + Tools + Time savings ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            شو رح تتعلم تعمل كمعلم أو دكتور أو مدرب؟
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            من رفع المصدر (كتاب مدرسي أو جامعي أو مذكرة تدريبية) لحد إخراج اختبار وملف PDF جاهز للطباعة - كل شي عملياً
          </p>

          {/* Presentation Examples - Hand-drawn Notebook Style */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-black text-[#f59e0b] text-center mb-2">بتقدر تعمل عروض تقديمية تعليمية احترافية</h3>
            <p className="text-center text-gray-400 text-sm mb-6">بأسلوب الورقة والقلم - رسومات توضيحية وأسهم وأمثلة حية - كل شي من الكتاب</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Slide 1: Force Resultant */}
              <div className="group cursor-pointer">
                <div className="rounded-xl overflow-hidden border border-white/5 group-hover:border-[#f59e0b]/30 transition-colors relative"
                  style={{ background: 'linear-gradient(180deg, #f5f0e8 0%, #ede7d9 100%)' }}>
                  {/* Notebook lines */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 28px, #8b7355 28px, #8b7355 29px)' }} />
                  {/* Red margin line */}
                  <div className="absolute top-0 bottom-0 right-12 w-px bg-red-300/40" />
                  <div className="relative p-5 min-h-[220px]" dir="rtl">
                    <h4 className="text-blue-700 font-bold text-base mb-3 border-b-2 border-blue-700/30 pb-1">القوة الناتجة</h4>
                    {/* Same direction forces */}
                    <div className="mb-3">
                      <p className="text-gray-700 text-xs mb-1">قوتان بنفس الاتجاه:</p>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-500 text-xs">← 20N</span>
                        <span className="text-gray-500 text-xs">← 30N</span>
                      </div>
                      <div className="bg-yellow-200/70 rounded px-2 py-1 text-center">
                        <span className="text-gray-800 font-bold text-sm">القوة الناتجة = 20 + 30 = 50N</span>
                      </div>
                    </div>
                    {/* Opposite forces */}
                    <div>
                      <p className="text-gray-700 text-xs mb-1">قوتان متعاكستان:</p>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-500 text-xs">← 30N</span>
                        <span className="text-gray-500 text-xs">20N →</span>
                      </div>
                      <div className="bg-yellow-200/70 rounded px-2 py-1 text-center">
                        <span className="text-gray-800 font-bold text-sm">القوة الناتجة = 30 - 20 = 10N</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">شرح القوة الناتجة</p>
              </div>

              {/* Slide 2: Mass vs Weight */}
              <div className="group cursor-pointer">
                <div className="rounded-xl overflow-hidden border border-white/5 group-hover:border-[#f59e0b]/30 transition-colors relative"
                  style={{ background: 'linear-gradient(180deg, #f5f0e8 0%, #ede7d9 100%)' }}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 28px, #8b7355 28px, #8b7355 29px)' }} />
                  <div className="absolute top-0 bottom-0 right-12 w-px bg-red-300/40" />
                  <div className="relative p-5 min-h-[220px]" dir="rtl">
                    <h4 className="text-blue-700 font-bold text-base mb-3 border-b-2 border-blue-700/30 pb-1">الكتلة والوزن</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50/50 rounded-lg p-2 border border-blue-200/50">
                        <p className="text-blue-700 font-bold text-xs mb-1">الكتلة</p>
                        <p className="text-gray-600 text-xs">ثابتة لا تتغير</p>
                        <p className="text-gray-500 text-xs mt-1">وحدة القياس: كغ</p>
                        <p className="text-gray-500 text-xs">مثال: 73 كغ</p>
                      </div>
                      <div className="bg-red-50/50 rounded-lg p-2 border border-red-200/50">
                        <p className="text-red-600 font-bold text-xs mb-1">الوزن</p>
                        <p className="text-gray-600 text-xs">يتغير حسب الجاذبية</p>
                        <p className="text-gray-500 text-xs mt-1">الوحدة: نيوتن</p>
                        <p className="text-gray-500 text-xs">الوزن = الكتلة × التعجيل</p>
                      </div>
                    </div>
                    <div className="bg-yellow-200/70 rounded px-2 py-1.5 text-center mt-3">
                      <span className="text-gray-800 font-bold text-xs">الكتلة ثابتة بس الوزن بيختلف من كوكب للتاني!</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">مقارنة الكتلة والوزن</p>
              </div>

              {/* Slide 3: Safety Rules */}
              <div className="group cursor-pointer">
                <div className="rounded-xl overflow-hidden border border-white/5 group-hover:border-[#f59e0b]/30 transition-colors relative"
                  style={{ background: 'linear-gradient(180deg, #f5f0e8 0%, #ede7d9 100%)' }}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 28px, #8b7355 28px, #8b7355 29px)' }} />
                  <div className="absolute top-0 bottom-0 right-12 w-px bg-red-300/40" />
                  <div className="relative p-5 min-h-[220px]" dir="rtl">
                    <h4 className="text-blue-700 font-bold text-base mb-3 border-b-2 border-blue-700/30 pb-1">قواعد السلامة - الكيمياء</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 bg-green-50/50 rounded-lg p-1.5 border border-green-200/50">
                        <span className="text-green-600 text-xs">✓</span>
                        <span className="text-gray-700 text-xs">ارتدِ النظارات الواقية</span>
                      </div>
                      <div className="flex items-center gap-2 bg-green-50/50 rounded-lg p-1.5 border border-green-200/50">
                        <span className="text-green-600 text-xs">✓</span>
                        <span className="text-gray-700 text-xs">اغسل يديك بعد التجربة</span>
                      </div>
                      <div className="flex items-center gap-2 bg-red-50/50 rounded-lg p-1.5 border border-red-200/50">
                        <span className="text-red-500 text-xs">✗</span>
                        <span className="text-gray-700 text-xs">لا تتناول أو تستنشق المواد</span>
                      </div>
                      <div className="flex items-center gap-2 bg-red-50/50 rounded-lg p-1.5 border border-red-200/50">
                        <span className="text-red-500 text-xs">✗</span>
                        <span className="text-gray-700 text-xs">لا تخزن المواد بغير مكانها</span>
                      </div>
                    </div>
                    <div className="bg-yellow-200/70 rounded px-2 py-1 text-center mt-2">
                      <span className="text-gray-800 font-bold text-xs">السلامة أولاً دائماً!</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">قواعد السلامة بالمختبر</p>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">هاد مثال لشي ممكن تعمله بهالأدوات - عروض تقديمية بأسلوب الورقة والقلم، كل شي من الكتاب وموثق</p>
          </div>

          {/* Tool Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Tool 1 */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">أداة رفع المصادر والأسئلة</h3>
                  <span className="text-sm text-[#8b5cf6]">مجانية تماماً</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'ارفع كتابك المدرسي واسألو أي سؤال عنه',
                  'بيعمللك اختبارات وأسئلة بنسختين مختلفة',
                  'كل إجابة موثقة بأرقام الصفحات من الكتاب',
                  'بيعمل شرح صوتي للطلاب ترسله واتساب',
                  'يعمل شروحات وملخصات من الكتاب فقط',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#8b5cf6] mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tool 2 */}
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
                  'يحول المحتوى لملف PDF احترافي جاهز للطباعة',
                  'بيعمل عروض تقديمية تعليمية بأسلوب الورقة والقلم',
                  'يدعم العربية مع تنسيق من اليمين لليسار',
                  'بيعمل اختبارات منسقة + إجابات نموذجية',
                  'كل شي جاهز للطباعة والتوزيع على الطلاب',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#f59e0b] mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Time Savings Table */}
          <h3 className="text-xl md:text-2xl font-black text-center mb-6">كم وقت بتوفر؟</h3>
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
                  { task: 'عمل عرض تقديمي تعليمي', old: '3-4 ساعات', ai: '10 دقائق', save: '95%' },
                  { task: 'تصحيح اختبارات 40 طالب', old: '3-4 ساعات', ai: '15 دقيقة', save: '94%' },
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

      {/* ===== MERGED: WhatsApp Chats + Example Outputs ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            شوف كيف بتشتغل الأدوات كمعلم أو دكتور أو مدرب
          </h2>
          <p className="text-gray-400 text-center mb-12">محادثات حقيقية باللهجة السورية - هيك بتصير بصفك أو محاضرك</p>

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

          {/* Example Outputs - Merged here */}
          <h3 className="text-xl md:text-2xl font-black text-center mt-12 mb-6">شو بتطلع النتيجة؟</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {exampleOutputs.map((ex, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 group">
                <div className="aspect-[3/4] overflow-hidden bg-gray-900">
                  <img
                    src={ex.img}
                    alt={ex.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
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

      {/* ===== TRAINER ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
            كيف الذكاء الاصطناعي غيّر حياتي كمعلم ومدرب - <span className="text-[#f59e0b]">نواف البوسطه</span>
          </h2>
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <img
                src="/images/trainer-nawaf.jpg"
                alt="نواف البوسطه - مدرب الذكاء الاصطناعي بالتعليم"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#f59e0b]/30 shadow-lg shadow-[#f59e0b]/20"
              />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-black text-white mb-1">نواف البوسطه</h3>
              <p className="text-[#f59e0b] font-bold mb-3">مدرب في الذكاء الاصطناعي التطبيقي بالتعليم</p>
              <p className="text-gray-400 leading-relaxed mb-4">
                أنا معلم متلكم، كنت بقعد ساعات بتحضير الدروس وبكتابة الأسئلة وبالتنسيق عالوورد. لما اكتشفت هالأدوات حياتي انقلبت. صرت بعمل اختبار بنسختين بـ 5 دقائق، وبصحح اختبارات الطلاب بكسر وقت، وبعمل مذكرات PDF احترافية بدقائق. مؤمن إن كل معلم سوري يقدر يستفيد من هالأدوات بغض النظر عن خلفيته التقنية - لأنها فعلاً سهلة وبسيطة.
              </p>
              {/* Social Media Links */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/share/18UPsSwfwQ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1877F2]/15 hover:bg-[#1877F2]/25 text-[#1877F2] px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-[#1877F2]/20"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  فيسبوك
                </a>
                <a
                  href="https://instagram.com/noaf.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#E4405F]/15 hover:bg-[#E4405F]/25 text-[#E4405F] px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-[#E4405F]/20"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  noaf.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COURSE CONTENT ACCORDION ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">محتوى الكورس</h2>
          <p className="text-gray-400 text-center mb-12">4 موديولات من المحتوى العملي المباشر</p>

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

      {/* ===== BONUSES - REDUCED to 3 ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">مازلت متردد؟</h2>
          <h3 className="text-xl md:text-3xl font-black text-center mb-12">
            هدايا مجانية بقيمة <span className="text-[#f59e0b]">$45</span> تحصل عليها <span className="text-[#22c55e]">مجاناً</span>
          </h3>

          <div className="grid sm:grid-cols-3 gap-5">
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
              قيمة البونصات <span className="text-[#f59e0b] font-bold line-through">$45</span> ولكن ستحصل عليها
              <span className="text-[#22c55e] font-black text-2xl mr-2"> مجاناً عند اشتراك</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== PRICING SUMMARY ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-10">كل ما ستحصل عليه عند اشتراكك</h2>
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5">
            {[
              { title: 'كورس الذكاء الاصطناعي بالتعليم', desc: 'محتوى عملي مباشر', value: '$65' },
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
                <span className="text-[#f59e0b] font-bold line-through text-xl">$110</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">لكن… هتحصل عليها كلها الآن مقابل</span>
              </div>
              <div className="text-center">
                <span className="text-5xl md:text-6xl font-black text-[#22c55e]">$22</span>
                <p className="text-gray-400 mt-1">بدل <span className="text-[#f59e0b] line-through font-bold">$65</span> - عرض لمدة 3 أيام فقط</p>
                <p className="text-gray-400 mt-1">دفع واحد - وصول دائم</p>
              </div>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-8 bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-5 rounded-xl text-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30"
            >
              اشترك الآن - $22 فقط
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS - REDUCED to 4 ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">شو بيقولوا المعلمين؟</h2>
          <p className="text-gray-400 text-center mb-12">آراء حقيقية من معلمين جربوا الكورس</p>
          <div className="grid md:grid-cols-2 gap-5">
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

      {/* ===== FAQ - FIXED: Syrian dialect ===== */}
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

      {/* ===== FINAL CTA ===== */}
      <section id="register" className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#25D366]/20 text-center">
            <div className="w-20 h-20 bg-[#25D366]/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-[#25D366]" />
            </div>
            <h2 className="text-2xl md:text-4xl font-black mb-3">جاهز تبدأ؟</h2>
            <p className="text-gray-400 text-lg mb-6">تواصل عبر واتساب ورح نبعثلك رابط الكورس فوراً</p>

            <div className="bg-[#0a0a0a] rounded-xl p-4 mb-6 border border-white/5">
              <div className="text-4xl font-black text-[#22c55e]">$22</div>
              <p className="text-gray-500 mt-1">بدل <span className="text-[#f59e0b] line-through font-bold">$65</span></p>
              <p className="text-gray-500 text-sm">عرض لمدة 3 أيام فقط</p>
            </div>

            {/* NEW: Purchase Steps Reminder */}
            <div className="bg-[#0a0a0a] rounded-xl p-4 mb-6 border border-white/5 text-sm">
              <p className="text-gray-500 mb-3 font-bold">كيف تشترك؟</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-[#22c55e]">١. تواصل واتساب</span>
                <span className="text-gray-600">←</span>
                <span className="text-[#22c55e]">٢. حول $22 شام كاش</span>
                <span className="text-gray-600">←</span>
                <span className="text-[#22c55e]">٣. استلم الرابط</span>
              </div>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-5 rounded-xl text-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30"
            >
              اشترك الآن - $22 فقط
              <MessageCircle className="w-6 h-6" />
            </a>

            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-[#22c55e]" /> وصول دائم</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> رابط الكورس فوراً</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER - FIXED year ===== */}
      <footer className="bg-[#050505] py-8 mt-auto border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-3">
            <span className="text-[#f59e0b] font-black text-lg">نواف البوسطه</span>
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-gray-400">المدرب</span>
          </div>
          <p className="text-gray-600 text-sm">كورس الذكاء الاصطناعي بالتعليم | للمعلمين والدكاترة الجامعيين والمدربين في سوريا</p>
          <p className="text-xs mt-2 text-gray-700">جميع الحقوق محفوظة 2026</p>
        </div>
      </footer>

      {/* ===== NEW: FLOATING WHATSAPP BUTTON ===== */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40 transition-all hover:scale-110"
        aria-label="تواصل عبر واتساب"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  )
}
