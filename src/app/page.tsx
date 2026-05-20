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
  X,
} from 'lucide-react'

// Feature 1: Purchase notifications data
const purchaseNotifications = [
  'أحمد من دمشق سجل قبل 3 دقائق',
  'سارة من حلب اشتركت قبل 5 دقائق',
  'د. محمد من حمص سجل قبل دقيقتين',
  'فاطمة من اللاذقية اشتركت قبل 7 دقائق',
  'عمر من دير الزور سجل قبل 4 دقائق',
  'ليلى من حماة اشتركت قبل 6 دقائق',
  'ياسر من طرطوس سجل قبل دقيقة',
  'رنا من إدلب اشتركت قبل 8 دقائق',
  'حسن من الرقة سجل قبل دقيقتين',
  'مريم من درعا اشتركت قبل 5 دقائق',
]

// Feature 4: Guarantee Badge (used in 3 locations)
function GuaranteeBadge() {
  return (
    <div className="flex items-center justify-center gap-2 text-[#22c55e] text-sm font-bold bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-lg px-4 py-2.5">
      <Shield className="w-5 h-5 shrink-0" />
      <span>ضمان 7 أيام - بدك فلوسك رجعنا، بدون أسئلة</span>
    </div>
  )
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  // Feature 1: Live Purchase Notifications (FOMO)
  const [showPurchaseToast, setShowPurchaseToast] = useState(false)
  const [currentPurchase, setCurrentPurchase] = useState(0)

  // Feature 2: Limited Seats Counter
  const [seatsLeft, setSeatsLeft] = useState(50)

  // Feature 3: Sticky Mobile CTA Bar
  const [showStickyBar, setShowStickyBar] = useState(false)

  // Feature 6: Exit Intent Popup
  const [showExitPopup, setShowExitPopup] = useState(false)

  // ===== AI Search Feature =====
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[] | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState('')

  const searchSuggestions = [
    'أحدث طرق تدريس الرياضيات للمرحلة الابتدائية',
    'كيف يستخدم الذكاء الاصطناعي في التعليم الجامعي',
    'استراتيجيات التقييم التكويني في التعليم عن بعد',
    'طرق تدريس اللغة العربية للناطقين بغيرها',
    'أبحاث حديثة عن صعوبات التعلم عند الأطفال',
  ]

  const handleSearch = async (query?: string) => {
    const q = query || searchQuery
    if (!q.trim()) return

    setSearchLoading(true)
    setSearchError('')
    setSearchResults(null)

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setSearchError(data.error || 'حدث خطأ أثناء البحث')
        return
      }

      setSearchResults(data.results || [])
    } catch {
      setSearchError('تعذر الاتصال بالخادم، حاول مرة أخرى')
    } finally {
      setSearchLoading(false)
    }
  }

  // ===== COUNTDOWN TIMER =====
  useEffect(() => {
    const STORAGE_KEY = 'course_offer_end'
    const stored = localStorage.getItem(STORAGE_KEY)
    let endTime: number

    if (stored) {
      endTime = parseInt(stored, 10)
    } else {
      endTime = Date.now() + 3 * 24 * 60 * 60 * 1000
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
    queueMicrotask(() => setMounted(true))
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  // ===== Feature 1: FOMO Purchase Toast =====
  useEffect(() => {
    if (!mounted) return

    let toastTimeout: ReturnType<typeof setTimeout>
    let nextTimeout: ReturnType<typeof setTimeout>

    const showNextToast = () => {
      setCurrentPurchase(prev => (prev + 1) % purchaseNotifications.length)
      setShowPurchaseToast(true)
      toastTimeout = setTimeout(() => {
        setShowPurchaseToast(false)
      }, 5000)
      const delay = 30000 + Math.random() * 15000
      nextTimeout = setTimeout(showNextToast, delay)
    }

    // First toast after 15 seconds
    const initialTimeout = setTimeout(showNextToast, 15000)

    return () => {
      clearTimeout(initialTimeout)
      clearTimeout(toastTimeout)
      clearTimeout(nextTimeout)
    }
  }, [mounted])

  // ===== Feature 2: Limited Seats Counter =====
  useEffect(() => {
    if (!mounted) return

    const SEATS_KEY = 'course_seats_left'
    const storedSeats = localStorage.getItem(SEATS_KEY)

    if (storedSeats) {
      queueMicrotask(() => setSeatsLeft(parseInt(storedSeats, 10)))
    } else {
      const initialSeats = Math.floor(Math.random() * 5) + 5 // 5-9
      queueMicrotask(() => setSeatsLeft(initialSeats))
      localStorage.setItem(SEATS_KEY, initialSeats.toString())
    }

    // Decrease seats every 5-8 minutes
    let seatTimeout: ReturnType<typeof setTimeout>

    const scheduleSeatDecrease = () => {
      const delay = (5 + Math.random() * 3) * 60 * 1000
      seatTimeout = setTimeout(() => {
        setSeatsLeft(prev => {
          const newVal = Math.max(prev - 1, 2)
          localStorage.setItem(SEATS_KEY, newVal.toString())
          return newVal
        })
        scheduleSeatDecrease()
      }, delay)
    }

    scheduleSeatDecrease()

    return () => clearTimeout(seatTimeout)
  }, [mounted])

  // ===== Feature 3: Sticky Mobile CTA Bar =====
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ===== Feature 6: Exit Intent Popup =====
  useEffect(() => {
    if (!mounted) return

    const EXIT_KEY = 'exit_popup_shown'
    if (localStorage.getItem(EXIT_KEY)) return

    // Desktop: mouse leaves viewport top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem(EXIT_KEY)) {
        setShowExitPopup(true)
        localStorage.setItem(EXIT_KEY, 'true')
      }
    }

    // Mobile: rapid scroll to top after scrolling down
    let hasScrolledDown = false
    const handleScrollMobile = () => {
      if (window.scrollY > 600) {
        hasScrolledDown = true
      }
      if (hasScrolledDown && window.scrollY < 50 && !localStorage.getItem(EXIT_KEY)) {
        setShowExitPopup(true)
        localStorage.setItem(EXIT_KEY, 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScrollMobile, { passive: true })

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScrollMobile)
    }
  }, [mounted])

  const pad = (n: number) => n.toString().padStart(2, '0')

  const WHATSAPP_NUMBER = '963985323170'
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً، بدي اشترك بكورس الذكاء الاصطناعي بالتعليم - $12')}`

  // WhatsApp chats - Real customer reviews with hidden names
  const whatsappChats = [
    {
      title: 'رأي مشترك - معلم رياضيات',
      contactName: 'م***** ع',
      messages: [
        { from: 'them', text: 'السلام عليكم نواف، بدي أشكرك على الكورس فعلاً غير حياتي' },
        { from: 'me', text: 'الله يبارك فيك! شو أكثر شي استفدت منه؟' },
        { from: 'them', text: 'والله كل شي حلو بس أكتر شي عمللك اختبار بنسختين بـ 5 دقائق! قبل هيك كنت بقعد ساعة ونص بكتب أسئلة بإيدي. هلأ بعمل اختبار كامل بنسختين مختلفات مع الإجابات النموذجية بأقل من 5 دقائق 😍' },
        { from: 'them', text: 'وطول ما بعمل الاختبار بكون من الكتاب المدرسي وكل إجادة مكتوب جنبها رقم الصفحة. هاد اللي بيخلي الآباء والأمهات يثقوا بالاختبار' },
      ],
    },
    {
      title: 'رأي مشتركة - معلمة عربي',
      contactName: 'س***** ح',
      messages: [
        { from: 'them', text: 'نواف بجد الكورس من أحلى الكورسات اللي أخدتها! صرت بعمل شروحات مكتوبة وملفات صوتية لطلابي' },
        { from: 'me', text: 'حلو كتير! والطلاب كيف ردة فعلهم؟' },
        { from: 'them', text: 'الطلاب صاروا يطلبوا كتير من هالملفات! بوزعهم عليهم واتساب وبيفهموا المادة وهم بالمشي. وكمان بعمل مذكرات PDF احترافية كلها من الكتاب مش من بره' },
        { from: 'them', text: 'وأكتر شي حبيته إنو ما بتحتاج خبرة تقنية، أنا معلمة عربي ما بعرّف بالتكنولوجيا كتير بس قدرت أشتغل عليهن بسهولة ✅' },
      ],
    },
    {
      title: 'رأي مشترك - دكتور جامعي',
      contactName: 'د***** خ',
      messages: [
        { from: 'them', text: 'دكتور نواف، الأداة رائعة فعلاً! قدرت أعمل محاضرة كاملة عن الانقسام الخلوي من المرجع الجامعي' },
        { from: 'me', text: 'ممتاز! أسئلة جامعية كمان عملت؟' },
        { from: 'them', text: 'أي نعم! عملت 10 أسئلة مقالية وموضوعية بمستوى الطالب الجامعي وكلها من الكتاب صفحات 120-145. والملف PDF طلع بتنسيق احترافي غلاف وأرقام صفحات ومخططات 🎓' },
      ],
    },
    {
      title: 'رأي مشتركة - مدربة معلمين',
      contactName: 'ف***** م',
      messages: [
        { from: 'them', text: 'كنت خايفة من الذكاء الاصطناعي وبحس إنه مش ياني. الكورس بيوصل المعلومة ببساطة' },
        { from: 'me', text: 'هاد هدفنا! شو صار معك هلأ؟' },
        { from: 'them', text: 'الحين بعمل مذكرات PDF وأوراق عمل لورشات التدريب أسرع بكثير. الأداة بتعمللي ملخصات من المذكرة التدريبية اللي برفعها وبنطبعها جاهزة. وفّرتلي وقت كتير صرت ركّز على التدريب نفسه مش على التحضير 💪' },
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

      {/* ===== TOP URGENCY BAR - Real Scarcity: First 30 only ===== */}
      <div className="bg-gradient-to-r from-[#c0392b] via-[#e74c3c] to-[#c0392b] py-3 text-center">
        <p className="text-white font-bold text-sm md:text-base">
          🔥 عرض التسجيل المبكر - أول 30 شخص بس بـ $12
          {mounted && (
            <span className="inline-flex items-center gap-1 mr-3 text-yellow-200 animate-pulse">
              | باقي <span className="bg-black/30 px-2 py-1 rounded font-black text-lg">{seatsLeft}</span> مقعد من 30
            </span>
          )}
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

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            تعلم تستخدم أداتين الذكاء الاصطناعي لإعداد اختبارات بنسختين، تصحيح أوراق الطلاب، وعمل مذكرات PDF احترافية - كل شي من المصدر وموثق بأرقام الصفحات. مناسب للمعلمين والدكاترة الجامعيين والمدربين.
          </p>

          {/* CTA */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg shadow-[#25D366]/30 mb-4"
          >
            اشترك الآن - $12 فقط
            <MessageCircle className="w-6 h-6" />
          </a>

          {/* Feature 4: Guarantee Badge (Hero) */}
          <div className="mt-4">
            <GuaranteeBadge />
          </div>

          {/* Social Proof under hero CTA */}
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

          {/* Purchase Steps */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {[
                { icon: MessageCircle, step: '١', text: 'تواصل واتساب' },
                { icon: CreditCard, step: '٢', text: 'حول $12 شام كاش/بنكي' },
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

      {/* ===== LOSS AVERSION: خسارتك لو ما اشتريت ===== */}
      <section className="py-16 md:py-20 bg-[#1a0a0a] border-y border-red-900/30">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            كم <span className="text-red-400">بتخسر</span> لو ما تعلمت هالأدوات؟
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            كل أسبوع بيمر وأنت بتضيع وقتك بالطريقة القديمة
          </p>

          <div className="max-w-3xl mx-auto bg-[#1a1a1a] rounded-2xl p-8 border border-red-900/30">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-red-500/15 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">5 ساعات تحضير بالأسبوع × 40 أسبوع مدرسي</p>
                  <p className="text-red-400 font-black text-xl">= 200 ساعة ضائعة بسنة وحدة</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-red-500/15 rounded-xl flex items-center justify-center shrink-0">
                  <Brain className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">200 ساعة = <span className="text-red-400 font-black">25 يوم كامل</span> من حياتك</p>
                  <p className="text-gray-400">يعني شهر كامل بتقعدو بالتحضير بدل عائلتك وراحتك</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-red-500/15 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">كل يوم بتأخر = <span className="text-red-400 font-black">يوم من عمرك رح</span></p>
                  <p className="text-gray-400">بينما زميلك اللي تعلم AI بتحضّر بـ 15 دقيقة وبيرتاح</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 bg-red-500/10 rounded-xl p-5 mt-4">
                <p className="text-center text-white font-bold text-lg">
                  الكورس بـ <span className="text-[#22c55e] font-black">$12</span> = <span className="text-[#22c55e]">أقل من 400 ليرة باليوم</span>
                </p>
                <p className="text-center text-gray-400 text-sm mt-1">أقل من سعر كاسة شاي - وبتحفّظ 200 ساعة بسنة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VISUAL BEFORE/AFTER ===== */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            <span className="text-red-400">قبل</span> الكورس vs <span className="text-[#22c55e]">بعد</span> الكورس
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            الفرق واضح - شوف كيف بيتغير يومك كمعلم
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* BEFORE */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-red-900/30 relative">
              <div className="absolute -top-3 right-6 bg-red-500 text-white text-sm font-black px-4 py-1 rounded-full">قبل ❌</div>
              <div className="space-y-4 mt-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl mt-0.5">⏰</span>
                  <div>
                    <p className="text-white font-bold">2-3 ساعات بتحضير درس واحد</p>
                    <p className="text-gray-500 text-sm">بتقعد من العصر للمغرب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl mt-0.5">📝</span>
                  <div>
                    <p className="text-white font-bold">أكتب الأسئلة بإيدي</p>
                    <p className="text-gray-500 text-sm">ساعة ونص عشان 20 سؤال</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl mt-0.5">📄</span>
                  <div>
                    <p className="text-white font-bold">نسخة وحدة من الاختبار</p>
                    <p className="text-gray-500 text-sm">الطلاب بينقلوا من بعض</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl mt-0.5">❌</span>
                  <div>
                    <p className="text-white font-bold">بدون إجابات نموذجية</p>
                    <p className="text-gray-500 text-sm">بتصحح بإيدك وتاخد وقت كتير</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl mt-0.5">💻</span>
                  <div>
                    <p className="text-white font-bold">تنسيق الوورد بياخد ساعات</p>
                    <p className="text-gray-500 text-sm">وبالنهاية بيطلع مو مرتب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl mt-0.5">🌙</span>
                  <div>
                    <p className="text-white font-bold">11 بالليل لسه بتحضّر</p>
                    <p className="text-gray-500 text-sm">والأولاد نايمين وأنت شغّال</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#22c55e]/30 relative shadow-lg shadow-[#22c55e]/5">
              <div className="absolute -top-3 right-6 bg-[#22c55e] text-white text-sm font-black px-4 py-1 rounded-full">بعد ✅</div>
              <div className="space-y-4 mt-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#22c55e] text-xl mt-0.5">⚡</span>
                  <div>
                    <p className="text-white font-bold">15 دقيقة بتحضير نفس الدرس</p>
                    <p className="text-[#22c55e] text-sm">بتخلص وأنت مستغرب!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#22c55e] text-xl mt-0.5">🤖</span>
                  <div>
                    <p className="text-white font-bold">AI بيعمللك 20 سؤال بـ 3 دقائق</p>
                    <p className="text-[#22c55e] text-sm">من الكتاب وموثق بأرقام الصفحات</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#22c55e] text-xl mt-0.5">📋</span>
                  <div>
                    <p className="text-white font-bold">نسختين مختلفات من الاختبار</p>
                    <p className="text-[#22c55e] text-sm">لا نسخ ولا غش!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#22c55e] text-xl mt-0.5">✅</span>
                  <div>
                    <p className="text-white font-bold">إجابات نموذجية + رقم الصفحة</p>
                    <p className="text-[#22c55e] text-sm">الآباء بيثقوا بالاختبار 100%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#22c55e] text-xl mt-0.5">🖨️</span>
                  <div>
                    <p className="text-white font-bold">PDF احترافي جاهز للطباعة</p>
                    <p className="text-[#22c55e] text-sm">بغلاف وأرقام وتنسيق مرتب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#22c55e] text-xl mt-0.5">🏠</span>
                  <div>
                    <p className="text-white font-bold">4 العصر خلصت كل شي</p>
                    <p className="text-[#22c55e] text-sm">وقت للأولاد ولنفسك!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg shadow-[#25D366]/30"
            >
              بدّل يومك - اشترك الآن $12
              <MessageCircle className="w-6 h-6" />
            </a>
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

          {/* Presentation Slides - Sample Output */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <h3 className="text-xl md:text-2xl font-black text-[#f59e0b]">مثال عملي: درس الخلية - علوم الصف السابع</h3>
              <div className="flex items-center gap-3">
                <a
                  href="/downloads/cell-lesson-presentation.pdf"
                  download
                  className="flex items-center gap-2 bg-[#f59e0b]/15 hover:bg-[#f59e0b]/25 text-[#f59e0b] px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-[#f59e0b]/20"
                >
                  <Download className="w-4 h-4" />
                  تحميل PDF
                </a>
                <a
                  href="/downloads/cell-lesson-presentation.pptx"
                  download
                  className="flex items-center gap-2 bg-[#8b5cf6]/15 hover:bg-[#8b5cf6]/25 text-[#8b5cf6] px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-[#8b5cf6]/20"
                >
                  <Download className="w-4 h-4" />
                  تحميل عرض تقديمي
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: '/images/slides/slide-1.png', label: 'العنوان' },
                { src: '/images/slides/slide-2.png', label: 'تركيب الخلية' },
                { src: '/images/slides/slide-3.png', label: 'مقارنة نباتية وحيوانية' },
                { src: '/images/slides/slide-4.png', label: 'ملخص الدرس' },
                { src: '/images/slides/slide-5.png', label: 'أسئلة تقييمية' },
                { src: '/images/slides/slide-6.png', label: 'خطة الدرس' },
              ].map((slide, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="rounded-xl overflow-hidden border border-white/5 group-hover:border-[#f59e0b]/30 transition-colors">
                    <img src={slide.src} alt={slide.label} className="w-full h-auto group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-2">{slide.label}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">هاد مثال حقيقي لشي ممكن تعمله بهالأدوات - كله من الكتاب المدرسي وموثق بأرقام الصفحات</p>
          </div>

          {/* Short Section: Notebook-style Presentation Example */}
          <div className="mb-10 max-w-3xl mx-auto">
            <h3 className="text-lg md:text-xl font-black text-[#f59e0b] text-center mb-3">كتير فيك تعمل عروض تقديمية بأسلوب الورقة والقلم 📝</h3>
            <div className="rounded-xl overflow-hidden border border-white/5 hover:border-[#f59e0b]/30 transition-colors">
              <img src="/images/notebook-presentation.jpg" alt="مثال عرض تقديمي بأسلوب الورقة والقلم - القوى المتوازنة وغير المتوازنة" className="w-full h-auto" />
            </div>
            <p className="text-center text-xs text-gray-500 mt-3">مثال: شرح القوى المتوازنة وغير المتوازنة - رسومات توضيحية وأسهم من الكتاب</p>
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

          {/* ===== AI RESEARCH SECTION: أعطيه مهمة بحث ===== */}
          <div className="mb-14 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#8b5cf6]/15 text-[#8b5cf6] px-4 py-2 rounded-full text-sm font-bold mb-4 border border-[#8b5cf6]/20">
                <Search className="w-4 h-4" />
                ميزة البحث الذكي
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                أعطيه مهمة بحث وهو بيعملكلّك كل شي 🎯
              </h3>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
                بدك تبحث عن أحدث الدراسات أو طرق التدريس؟ كبّس بحث والنتائج بتجيك من الإنترنت فوراً - زي ما شايف هون
              </p>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="مثال: أحدث طرق تدريس الرياضيات..."
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pr-12 pl-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6]/50 focus:ring-1 focus:ring-[#8b5cf6]/30 transition-all text-sm md:text-base"
                  />
                </div>
                <button
                  onClick={() => handleSearch()}
                  disabled={searchLoading}
                  className="bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-xl transition-all hover:scale-105 flex items-center gap-2 shrink-0"
                >
                  {searchLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="hidden md:inline">يبحث...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span className="hidden md:inline">ابحث</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Search Suggestions */}
            {!searchResults && !searchLoading && (
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {searchSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchQuery(s)
                      handleSearch(s)
                    }}
                    className="bg-white/5 hover:bg-[#8b5cf6]/15 hover:border-[#8b5cf6]/30 border border-white/10 rounded-lg px-3 py-1.5 text-xs md:text-sm text-gray-400 hover:text-[#8b5cf6] transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Search Results */}
            {searchLoading && (
              <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 text-center">
                <div className="w-10 h-10 border-3 border-[#8b5cf6]/30 border-t-[#8b5cf6] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">الذكاء الاصطناعي بيبحث لك...</p>
                <p className="text-gray-500 text-sm mt-1">بيبحث بالإنترنت عن أفضل النتائج</p>
              </div>
            )}

            {searchError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                <p className="text-red-400 text-sm">{searchError}</p>
              </div>
            )}

            {searchResults && searchResults.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[#8b5cf6] text-sm font-bold">تم العثور على {searchResults.length} نتائج</p>
                  <button
                    onClick={() => {
                      setSearchResults(null)
                      setSearchQuery('')
                    }}
                    className="text-gray-500 hover:text-white text-xs flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    مسح النتائج
                  </button>
                </div>
                {searchResults.map((result: any, i: number) => (
                  <a
                    key={i}
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[#1a1a1a] hover:bg-[#1a1a1a]/80 border border-white/5 hover:border-[#8b5cf6]/30 rounded-xl p-4 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#8b5cf6]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#8b5cf6]/20 transition-colors">
                        <Search className="w-4 h-4 text-[#8b5cf6]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-white font-bold text-sm group-hover:text-[#8b5cf6] transition-colors line-clamp-2">
                          {result.name}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                          {result.snippet}
                        </p>
                        <p className="text-[#8b5cf6]/60 text-xs mt-2 truncate">
                          {result.host_name}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* How it works - mini steps */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { step: '١', emoji: '✍️', text: 'اكتب موضوع البحث' },
                { step: '٢', emoji: '🔍', text: 'AI بيبحث بالإنترنت' },
                { step: '٣', emoji: '📋', text: 'نتائج جاهزة فوراً' },
              ].map((item, i) => (
                <div key={i} className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 text-center">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <div className="text-[#8b5cf6] text-xs font-bold mb-1">خطوة {item.step}</div>
                  <p className="text-gray-400 text-xs">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Use cases for teachers */}
            <div className="mt-6 bg-[#1a1a1a] rounded-2xl p-6 border border-[#8b5cf6]/20">
              <h4 className="text-white font-bold text-sm mb-4 text-center">أمثلة على مهام بحث للمعلم والدكتور</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { role: 'معلم', example: 'ابحث عن أحدث طرق تدريس الرياضيات للصف الخامس', benefit: 'بدل ما تقعد ساعتين عغوغل' },
                  { role: 'دكتور', example: 'ابحث عن أبحاث حديثة عن التعلم النشط بالجامعات', benefit: 'مراجع علمية جاهزة لمحاضراتك' },
                  { role: 'مدرب', example: 'ابحث عن استراتيجيات التدريب التفاعلي للمعلمين', benefit: 'محتوى ورشة تدريبية متجدّد' },
                  { role: 'معلم', example: 'ابحث عن حلول لصعوبات التعلم عند الطلاب', benefit: 'بدل ما تسأل وتنتظر جواب' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-bold px-2 py-0.5 rounded">{item.role}</span>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">"{item.example}"</p>
                    <p className="text-[#22c55e] text-xs mt-1.5">→ {item.benefit}</p>
                  </div>
                ))}
              </div>
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
                  { task: 'بحث عن أحدث الدراسات وطرق التدريس', old: '2-3 ساعات', ai: 'ثواني', save: '99%' },
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

      {/* ===== MERGED: Customer Reviews + Example Outputs ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            شو قالوا المشتركين عن الكورس؟
          </h2>
          <p className="text-gray-400 text-center mb-12">محادثات حقيقية مع مشتركين - باللهجة السورية</p>

          <div className="space-y-8">
            {whatsappChats.map((chat, ci) => (
              <div key={ci}>
                <h3 className="text-lg font-bold text-[#f59e0b] mb-4 text-center">{chat.title}</h3>
                <div className="max-w-lg mx-auto">
                  {/* WhatsApp Header */}
                  <div className="bg-[#075e54] rounded-t-2xl px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {chat.contactName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{chat.contactName}</p>
                      <p className="text-green-200 text-xs">متصل</p>
                    </div>
                  </div>
                  {/* Chat Messages */}
                  <div className="bg-[#ece5dd] p-4 space-y-2 rounded-b-2xl" dir="rtl">
                    {chat.messages.map((msg, mi) => (
                      <div key={mi} className={`flex ${msg.from === 'them' ? 'justify-start' : 'justify-end'}`}>
                        <div
                          className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                            msg.from === 'them'
                              ? 'bg-white text-gray-800 rounded-tr-none shadow-sm'
                              : 'bg-[#dcf8c6] text-gray-800 rounded-tl-none'
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

      {/* ===== PRICING SUMMARY (with mini countdown + guarantee + seats) ===== */}
      <section className="py-16 md:py-20 bg-[#111]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-10">كل ما ستحصل عليه عند اشتراكك</h2>

          {/* Feature 2: Seats counter above pricing */}
          {mounted && (
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 text-red-400 font-bold text-lg animate-pulse">
                🔥 باقي فقط {seatsLeft} مقاعد من 30
              </span>
            </div>
          )}

          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5">
            {[
              { title: 'كورس الذكاء الاصطناعي بالتعليم', desc: 'محتوى عملي مباشر', value: '$35' },
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
                <span className="text-[#f59e0b] font-bold line-through text-xl">$70</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">لكن… هتحصل عليها كلها الآن مقابل</span>
              </div>
              <div className="text-center">
                <span className="text-5xl md:text-6xl font-black text-[#22c55e]">$12</span>
                <p className="text-gray-400 mt-1">بدل <span className="text-[#f59e0b] line-through font-bold">$35</span> - عرض التسجيل المبكر لأول 30 شخص</p>
                <p className="text-gray-400 mt-1">دفع واحد - وصول دائم</p>
              </div>
            </div>

            {/* Feature 5: Mini Countdown Near Pricing */}
            {mounted && (
              <div className="text-center mt-6 mb-2">
                <span className="inline-flex items-center gap-2 text-[#f59e0b] font-bold text-base">
                  🔥 عرض التسجيل المبكر - باقي {seatsLeft} مقعد من 30
                </span>
              </div>
            )}

            {/* Feature 4: Guarantee Badge (Pricing) */}
            <div className="mt-4 flex justify-center">
              <GuaranteeBadge />
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-6 bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-5 rounded-xl text-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30"
            >
              اشترك الآن - $12 فقط
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

      {/* ===== FINAL CTA (with guarantee) ===== */}
      <section id="register" className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#25D366]/20 text-center">
            <div className="w-20 h-20 bg-[#25D366]/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-[#25D366]" />
            </div>
            <h2 className="text-2xl md:text-4xl font-black mb-3">جاهز تبدأ؟</h2>
            <p className="text-gray-400 text-lg mb-6">تواصل عبر واتساب ورح نبعثلك رابط الكورس فوراً</p>

            <div className="bg-[#0a0a0a] rounded-xl p-4 mb-6 border border-white/5">
              <div className="text-4xl font-black text-[#22c55e]">$12</div>
              <p className="text-gray-500 mt-1">بدل <span className="text-[#f59e0b] line-through font-bold">$35</span></p>
              <p className="text-gray-500 text-sm">عرض التسجيل المبكر لأول 30 شخص</p>
            </div>

            {/* Feature 2: Seats counter in final CTA */}
            {mounted && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 text-red-400 font-bold animate-pulse">
                  🔥 باقي فقط {seatsLeft} مقاعد
                </span>
              </div>
            )}

            {/* Purchase Steps Reminder */}
            <div className="bg-[#0a0a0a] rounded-xl p-4 mb-6 border border-white/5 text-sm">
              <p className="text-gray-500 mb-3 font-bold">كيف تشترك؟</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-[#22c55e]">١. تواصل واتساب</span>
                <span className="text-gray-600">←</span>
                <span className="text-[#22c55e]">٢. حول $12 شام كاش</span>
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
              اشترك الآن - $12 فقط
              <MessageCircle className="w-6 h-6" />
            </a>

            {/* Feature 4: Guarantee Badge (Final CTA) */}
            <div className="mt-4 flex justify-center">
              <GuaranteeBadge />
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-[#22c55e]" /> وصول دائم</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> رابط الكورس فوراً</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
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

      {/* ===== FLOATING WHATSAPP BUTTON (hidden on mobile when sticky bar is shown) ===== */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 left-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40 transition-all hover:scale-110 ${showStickyBar ? 'md:flex hidden' : 'flex'}`}
        aria-label="تواصل عبر واتساب"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* ===== Feature 1: FOMO Purchase Toast ===== */}
      {mounted && showPurchaseToast && (
        <div
          className="fixed bottom-20 md:bottom-6 left-6 z-50 max-w-xs animate-[slideInLeft_0.4s_ease-out]"
          style={{ animation: 'slideInLeft 0.4s ease-out' }}
        >
          <div className="bg-[#1a1a1a]/95 backdrop-blur-md border border-[#22c55e]/30 rounded-xl px-4 py-3 shadow-lg shadow-[#22c55e]/10 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#22c55e]/20 rounded-full flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-[#22c55e]" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">{purchaseNotifications[currentPurchase]}</p>
              <p className="text-[#22c55e] text-xs mt-0.5">تم التسجيل الآن ✓</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== Feature 3: Sticky Mobile CTA Bar ===== */}
      {mounted && showStickyBar && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <div>
            <span className="text-[#22c55e] font-black text-xl">$12</span>
            <span className="text-gray-500 text-sm mr-1">بدل <span className="line-through">$35</span></span>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-black px-6 py-3 rounded-xl text-base transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-[#25D366]/30"
          >
            اشترك الآن
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      )}

      {/* ===== Feature 6: Exit Intent Popup ===== */}
      {mounted && showExitPopup && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowExitPopup(false)}
          />
          {/* Popup Card */}
          <div
            className="relative bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-[#f59e0b]/30 shadow-2xl text-center"
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          >
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 left-4 text-gray-500 hover:text-white transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-2xl font-black text-white mb-3">لحظة! فيه عرض خاص</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              قبل ما تروح، بدي قلك إنو عرض $12 لأول 30 شخص بس. لما يخلصوا السعر بيرجع $35. سجّل هلأ قبل ما يخلصوا المقاعد
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30 mb-3"
              onClick={() => setShowExitPopup(false)}
            >
              سجّل الآن $12
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setShowExitPopup(false)}
              className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
            >
              لا شكراً
            </button>
          </div>
        </div>
      )}

      {/* ===== Custom Keyframe Animations ===== */}
      <style jsx global>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
