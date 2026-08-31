'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import { affiliateMessageSuffix, referralHref, resolveAffiliateRef } from '@/lib/affiliate'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  FileText,
  MessageCircle,
  Shield,
  Star,
  Zap,
  FileOutput,
  Users,
  CreditCard,
  Send,
  ArrowLeft,
  Globe,
  Building2,
  Clock,
  Award,
  Play,
} from 'lucide-react'

const subscribeAffiliate = () => () => {}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const affiliateRef = useSyncExternalStore(
    subscribeAffiliate,
    () => resolveAffiliateRef(window.location.search) || window.localStorage.getItem('course_affiliate_ref') || '',
    () => '',
  )

  useEffect(() => {
    const directRef = resolveAffiliateRef(window.location.search)
    if (directRef) window.localStorage.setItem('course_affiliate_ref', directRef)
  }, [])

  const currentPricing = {
    price: '30 دولارًا',
    originalPrice: '49 دولارًا',
    currency: 'الدفع داخل سوريا عبر شام كاش أو تحويل بنكي أو أقساط',
  }
  const WHATSAPP_NUMBER = '963985323170'
  const createWhatsAppLink = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${message}${affiliateMessageSuffix(affiliateRef)}`)}`
  const resultsHref = referralHref('/results', affiliateRef)
  const trackWhatsAppClick = (source: string) => track('whatsapp_click', { source, affiliate_ref: affiliateRef || 'direct' })
  const trackResultsOpen = (source: string) => track('results_open', { source, affiliate_ref: affiliateRef || 'direct' })
  const COURSE_DURATION = '5 ساعات ونصف'

  // ===== DATA =====

  const courseModules = [
    {
      title: 'المسار 1: من المصدر إلى شرح وفيديو تعليمي',
      lessons: 6,
      items: [
        'كيف تبدأ من الكتاب أو الدرس وتحدد المطلوب من الذكاء الاصطناعي',
        'كيف تكتب Prompt واضحًا لشرح مناسب لعمر الطالب ومستواه',
        'كيف تراجع الناتج وتحوّله إلى شرح أو فيديو تعليمي قابل للمشاركة',
      ],
    },
    {
      title: 'المسار 2: من الدرس إلى اختبار وPDF ومشروع',
      lessons: 7,
      items: [
        'تحويل الدرس إلى أسئلة واختبار منظم مع نموذج إجابة',
        'إخراج ورقة PDF قابلة للطباعة بتنسيق عربي واضح',
        'إنشاء مهمة أو مشروع بسيط يمكن للطلاب تطبيقه ومراجعته',
      ],
    },
    {
      title: 'المسار 3: عرض وتفاعل وبحث وتقارير وبودكاست',
      lessons: 7,
      items: [
        'إنشاء عرض تعليمي ونشاط يساعد على تفاعل الطلاب داخل الحصة',
        'إنتاج Podcast أو شرح صوتي وفيديو من محتوى الدرس',
        'البحث على الإنترنت وبناء تقرير أو رسالة أو بحث منظم مع مراجعة المصادر',
      ],
    },
  ]

  const bonuses = [
    { title: 'ساعة مجانية: كيف تكتب Prompt واضحًا', subtitle: 'Bonus Training', oldValue: 'قيمة إضافية', value: 'مجانًا مع التسجيل', desc: 'تدريب إضافي بنهاية الكورس بيعلّمك كيف تكتب Prompt واضح ومفيد.', icon: Zap },
    { title: '4 جلسات مباشرة للأسئلة والأجوبة', subtitle: 'Live Support', oldValue: '', value: 'ضمن تجربة الكورس', desc: 'جلسات مباشرة للأسئلة والأجوبة: إذا عندك سؤال، منناقشه ومنطبّق عليه سوا، مع متابعة شخصية من المدرب أثناء التطبيق.', icon: Users },
    { title: 'حزمة Prompts وأتمتة للمعلمين', subtitle: 'Prompts & Automation', oldValue: '1,500 ليرة سورية جديدة', value: 'مجانًا مع التسجيل', desc: 'قوالب جاهزة وخطوات أتمتة بتساعدك بالشرح والاختبارات والمشاريع والفيديوهات، وتختصر عليك وقت التحضير.', icon: Zap },
    { title: 'قوالب مشاريع ومخرجات', subtitle: 'Templates', oldValue: '1,000 ليرة سورية جديدة', value: 'مجانًا مع التسجيل', desc: 'قوالب عملية لخطة المشروع، ورقة الاختبار، سيناريو الفيديو، بطاقة الخروج، ونموذج التقييم.', icon: FileText },
    { title: 'تحديثات ودعم بعد الكورس', subtitle: 'Updates & Support', oldValue: '', value: 'مجانًا دائمًا', desc: 'تحديثات مستمرة ودعم عبر واتساب وقت التطبيق، مع متابعة شخصية من المدرب عند الحاجة.', icon: Shield },
  ]

  const faqs = [
    {
      q: 'أنا معلم وما بعرف شي بالتكنولوجيا، فيني استفيد؟',
      a: 'أكيد فيك! الكورس معمول للمعلمين اللي ما عندهن خبرة تقنية. كل اللي بتحتاجه تعرف تفتح موقع وتضغط زر، ومنمشي معك خطوة خطوة من الصفر.',
    },
    {
      q: 'هل سأحتاج إلى دفع اشتراكات إضافية للأدوات؟',
      a: 'لا، مو ضروري. منشرح لك الخيارات المتاحة، وبتعرف شو اللي بناسبك قبل ما تدفع أي اشتراك إضافي.',
    },
    {
      q: 'الإجابات اللي بتطلع دقيقة ومطابقة للمنهج؟',
      a: 'نتعلم كيف نرفق الكتاب المدرسي أو المصدر ونطلب من الأداة الاعتماد عليه، ثم نراجع الناتج قبل استخدامه. وعندما تدعم الأداة الإحالة للمصدر، نتحقق من الصفحات والمعلومات بدل الاعتماد على أي نتيجة دون مراجعة.',
    },
    {
      q: 'كيف فيني ادفع؟',
      a: 'الدفع داخل سوريا بيكون عبر شام كاش أو تحويل بنكي، وفي أقساط إذا ما كان المبلغ كامل معك. بعد الاتفاق، منرسل لك تفاصيل الوصول.',
    },
    {
      q: 'الكورس فيديوهات مسجلة ولا لقاءات مباشرة؟',
      a: 'الكورس مدته 5 ساعات ونصف، وهو برنامج مسجل ومنظم، وترافقه 4 جلسات مباشرة للأسئلة والأجوبة والتطبيق على الأسئلة التي يطرحها المتدرّبون، مع متابعة شخصية من المدرب أثناء التطبيق.',
    },
    {
      q: 'هل تشرحون من مصادر محددة أم يجيب الذكاء الاصطناعي من عنده؟',
      a: 'نتعلم كيف نرفق المصدر ونطلب من الأداة الاعتماد عليه فقط، ثم نراجع الناتج بشريًا قبل استخدامه مع الطلاب. لا نترك الأداة تضيف معلومات خارج المصدر دون تنبيه أو مراجعة.',
    },
    {
      q: 'هل أتعلم إعداد عروض تقديمية وملفات PDF جاهزة للطباعة؟',
      a: 'نعم، نتناول طريقة تحويل المادة إلى عرض تقديمي، واختبار أو ورقة عمل PDF جاهزة للطباعة، مع تنظيم عربي واضح ومراجعة قبل التوزيع.',
    },
    {
      q: 'في دعم أو تحديثات بعد الكورس؟',
      a: 'نعم، توجد تحديثات للكورس ودعم عبر واتساب عند التطبيق. ويمكن ترتيب مكالمة مساعدة عند الحاجة إلى توضيح عملي وبالتنسيق المسبق.',
    },
    {
      q: 'هل أستطيع إعداد تقرير أو رسالة أو بحث منظم؟',
      a: 'نعم. تتعلم طريقة البحث على الإنترنت، تحديد المصادر، إعداد مسودة تقرير أو رسالة أو بحث، ثم مراجعة المعلومات والمراجع قبل اعتماد النتيجة.',
    },
    {
      q: 'الشهادة إلزامية مع التسجيل؟',
      a: 'لا. الشهادة اختيارية ورسومها منفصلة عن الكورس. تتوفر شهادة من وزارة التنمية السورية قابلة للتصديق عبر وزارة الخارجية السورية. للاستفسار عن الإجراءات والاعتراف محليًا ودوليًا، تواصل معنا عبر الخاص.',
    },
  ]

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#FBFAF7] pb-20 text-[#152238] md:pb-0" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }} suppressHydrationWarning>
      {/* ===== 1. EDITORIAL NAVIGATION ===== */}
      <nav className="sticky top-0 z-50 border-b border-[#DCE3E1] bg-[#FBFAF7]/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F766E] text-white">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-tight text-[#152238] md:text-base">كورس الذكاء الاصطناعي للمعلمين</span>
          </div>
          <Link href="/schools" className="hidden items-center gap-2 text-sm font-bold text-[#0F766E] transition-colors hover:text-[#115E59] sm:flex">
            للمؤسسات التعليمية
            <Building2 className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* ===== 2. SALES HERO ===== */}
      <section className="overflow-hidden border-b border-[#DCE3E1] bg-[#FBFAF7]">
        <div className="mx-auto max-w-[900px] px-5 py-16 md:px-8 md:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#0F766E]">
              <span className="h-2 w-2 rounded-full bg-[#C89B3C]" />
              المشكلة اليومية
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.35] tracking-tight text-[#152238] md:text-6xl">
              كل أسبوع عم تعيد كتابة الأسئلة وتنسيق الدرس من الصفر؟
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[2] text-[#5E6B78] md:text-xl">
              يمكن يكون معك الكتاب والخبرة، بس تحضير اختبار أو شرح أو ورقة امتحان أو مادة بصرية من الصفر بياخد وقتك. بالكورس بتتعلّم مسار ثابت: بتحدد المطلوب، بترفق مصدرك، بتستخرج الأفكار والأسئلة، بتراجع النتيجة، وبعدين بتطلعها بالشكل المناسب لطلابك.
            </p>
            <p className="mt-4 max-w-2xl font-bold leading-[2] text-[#0F766E]">ما منلغي دور المعلم — منخفف عنه الشغل المتكرر حتى يركّز على الشرح والطلاب.</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href={createWhatsAppLink('مرحباً، أريد تفاصيل التسجيل في كورس الذكاء الاصطناعي للمعلمين.')} onClick={() => trackWhatsAppClick('redesigned_hero')} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0F766E] px-7 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(15,118,110,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#115E59] sm:w-auto">
                اطلب تفاصيل التسجيل
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href={resultsHref} onClick={() => trackResultsOpen('redesigned_hero')} className="inline-flex items-center gap-2 px-2 py-2 text-base font-bold text-[#152238] underline decoration-[#C89B3C] decoration-2 underline-offset-8 transition-colors hover:text-[#0F766E]">
                شاهد نماذج حقيقية أولًا
                <ArrowLeft className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#DCE3E1] pt-5 text-sm text-[#5E6B78]">
              <span className="font-bold text-[#152238]">30 دولارًا — خصم لمدة 7 أيام</span>
              <span>كورس مسجل بالكامل — 5 ساعات ونصف</span>
              <span>أقساط متاحة</span>
              <span>وصول دائم</span>
            </div>
          </div>

        </div>
      </section>

      {/* ===== 3. PROOF STRIP ===== */}
      <section className="border-b border-[#DCE3E1] bg-[#F3F7F5]">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-5 text-center text-sm font-bold text-[#3E5361] md:px-8">
          <span>بتبدأ من مصدرك، مو من صفحة فاضية</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#C89B3C] sm:block" />
          <span>مناسب حتى لو كنت مبتدئ</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#C89B3C] sm:block" />
          <span>90 معلّمًا ومعلّمة اشتروا الكورس</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#C89B3C] sm:block" />
          <span>مخرجات بتستخدمها بعد المراجعة</span>
        </div>
      </section>

      {/* ===== 5. WHAT YOU GET ===== */}
      <section className="border-y border-[#DCE3E1] bg-[#152238] text-white">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold text-[#D9B96C]">النتيجة التي تهمك</p>
            <h2 className="text-3xl font-bold leading-[1.45] md:text-5xl">بدل ما تضل تبلّش من صفحة فاضية، ابدأ من مسودة قوية.</h2>
            <p className="mt-5 text-base leading-[2] text-white/70 md:text-lg">أنت مو عم تشتري قائمة أدوات؛ عم تتعلّم كيف تحوّل مصدرك لمخرجات متعددة، وتضل أنت صاحب قرار الدقة والملاءمة قبل ما يوصل أي شي لطلابك.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { n: '01', title: 'شرح وفيديو', text: 'حوّل الدرس لشرح واضح أو سيناريو فيديو بيفهمه طلابك.' },
              { n: '02', title: 'اختبار وPDF', text: 'طلّع أسئلة ونسخ متعددة ونموذج إجابة، وبعدين أخرج ورقة مرتبة بعد المراجعة.' },
              { n: '03', title: 'عرض وبحث وتفاعل', text: 'اعمل عرض أو نشاط أو تقرير أو مادة صوتية انطلاقًا من مصدرك.' },
            ].map((item) => (
              <div key={item.n} className="border-t border-white/25 pt-5">
                <span className="text-sm font-bold text-[#D9B96C]">{item.n}</span>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-[1.9] text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. SAMPLE VIDEO ===== */}
      <section className="bg-[#F3F7F5]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <div>
              <p className="mb-4 text-sm font-bold text-[#0F766E]">شاهد قبل أن تقرر</p>
              <h2 className="text-3xl font-bold leading-[1.45] text-[#152238] md:text-5xl">عينة من درس متقدم</h2>
              <p className="mt-5 text-base leading-[2] text-[#5E6B78]">هالمقطع عينة من درس متقدم بالكورس. شوف كيف مننتقل من مصدر المعلم لأسئلة واختبار وورقة امتحان مرتبة، بينما الكورس نفسه بيمشي معك خطوة خطوة من الأساسيات.</p>
              <a href={createWhatsAppLink('مرحباً، شاهدت العينة وأريد تفاصيل التسجيل في الكورس.')} onClick={() => trackWhatsAppClick('redesigned_sample')} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 font-bold text-[#0F766E] underline decoration-[#C89B3C] decoration-2 underline-offset-8">أريد تفاصيل التسجيل <ArrowLeft className="h-4 w-4" /></a>
            </div>
            <div className="overflow-hidden border border-[#B9D2CD] bg-[#152238] shadow-[0_20px_50px_rgba(21,34,56,0.12)]">
              <div className="aspect-video">
                {isVideoOpen ? (
                  <iframe loading="lazy" className="h-full w-full" src="https://www.youtube-nocookie.com/embed/rbblFAZJbjI?autoplay=1&rel=0" title="عينة من درس متقدم في إعداد ورقة امتحان للمعلمين" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                ) : (
                  <button type="button" onClick={() => { setIsVideoOpen(true); track('video_sample_play', { source: 'redesigned_course_page' }) }} className="group relative h-full w-full overflow-hidden text-right" aria-label="تشغيل عينة الفيديو العملية داخل الصفحة">
                    <Image src="/images/advanced-lesson-poster.webp" alt="معاينة عينة من درس متقدم في الكورس" width={1280} height={720} sizes="(max-width: 768px) 100vw, 760px" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 bg-[#0B172A]/45" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
                      <span className="text-sm font-bold">عينة من درس متقدم — نحو 12 دقيقة</span>
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F766E] shadow-xl transition group-hover:scale-105"><Play className="mr-[-2px] h-7 w-7 fill-current" /></span>
                      <span className="text-base font-bold">شغّل العينة</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. BEFORE / AFTER ===== */}
      <section className="bg-[#FBFAF7]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold text-[#C89B3C]">التغيير العملي</p>
            <h2 className="text-3xl font-bold leading-[1.45] text-[#152238] md:text-5xl">من تحضير بيتكرر كل أسبوع لطريقة فيك تكررها مع أي درس.</h2>
          </div>
          <div className="mt-12 grid gap-0 border-y border-[#DCE3E1] md:grid-cols-2">
            <div className="border-b border-[#DCE3E1] py-8 md:border-b-0 md:border-l md:pl-10 md:py-10">
              <p className="text-sm font-bold text-[#A34F4F]">قبل</p>
              <h3 className="mt-3 text-2xl font-bold text-[#152238]">كل درس بيبلّش من الصفر</h3>
              <div className="mt-7 space-y-4 text-[#5E6B78]">
                <p className="flex gap-3"><Clock className="mt-1 h-5 w-5 shrink-0 text-[#A34F4F]" /> وقت طويل بالكتابة والتنسيق.</p>
                <p className="flex gap-3"><FileText className="mt-1 h-5 w-5 shrink-0 text-[#A34F4F]" /> نسخة وحدة من الاختبار ومراجعة متأخرة.</p>
                <p className="flex gap-3"><Zap className="mt-1 h-5 w-5 shrink-0 text-[#A34F4F]" /> تشتّت بين أفكار وأدوات كثيرة.</p>
              </div>
            </div>
            <div className="py-8 md:pr-10 md:py-10">
              <p className="text-sm font-bold text-[#0F766E]">بعد التعلّم</p>
              <h3 className="mt-3 text-2xl font-bold text-[#152238]">بتبدأ من المصدر وبتعرف شو الخطوة الجاية</h3>
              <div className="mt-7 space-y-4 text-[#5E6B78]">
                <p className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F766E]" /> طلب واضح ومخرج محدد لكل درس.</p>
                <p className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F766E]" /> نسخ متعددة ومخرجات مرتبة بعد المراجعة.</p>
                <p className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F766E]" /> وقت أكبر للشرح والتفاعل مع طلابك.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. COURSE PATH ===== */}
      <section className="border-y border-[#DCE3E1] bg-[#EAF4F1]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-bold text-[#0F766E]">خريطة الدورة</p>
              <h2 className="text-3xl font-bold leading-[1.45] text-[#152238] md:text-5xl">ثلاثة مسارات عملية، وكل مسار بينتهي بنتيجة بتشوفها وبتستخدمها.</h2>
            </div>
            <span className="text-sm font-bold text-[#5E6B78]">نحو 12 وحدة تدريبية · {COURSE_DURATION}</span>
          </div>
          <div className="mt-12 border-t border-[#B9D2CD]">
            {courseModules.map((mod, i) => (
              <div key={i} className="border-b border-[#B9D2CD]">
                <button onClick={() => setOpenModule(openModule === i ? null : i)} className="flex w-full items-center justify-between gap-5 py-6 text-right">
                  <div className="flex items-start gap-5">
                    <span className="pt-1 text-sm font-bold text-[#C89B3C]">0{i + 1}</span>
                    <div>
                      <span className="text-lg font-bold text-[#152238] md:text-xl">{mod.title}</span>
                      <span className="mt-2 block text-sm text-[#5E6B78]">{mod.lessons} محاضرات · مخرج عملي قابل للتطبيق</span>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[#0F766E] transition-transform ${openModule === i ? 'rotate-180' : ''}`} />
                </button>
                {openModule === i && (
                  <div className="pb-6 pr-12">
                    <ul className="space-y-3">
                      {mod.items.map((item, j) => <li key={j} className="flex items-start gap-3 text-sm leading-[1.9] text-[#5E6B78]"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0F766E]" />{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. STUDENT FEEDBACK SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0D9488]/10 text-[#0D9488] px-4 py-2 text-sm font-bold mb-4">تجارب حقيقية من المتدربين</div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">آراء طلابنا بعد التدريب</h2>
            <p className="text-[#64748B] max-w-2xl mx-auto text-sm leading-loose">رسائل وصلتنا من متدربين شاركوا في جلسات الذكاء الاصطناعي. اضغط على أي صورة لقراءتها بحجم أكبر.</p>
          </div>
          <div className="mx-auto flex max-w-md flex-col gap-3 md:max-w-none md:grid md:grid-cols-5 md:gap-4">
            {[
              '/images/training/student-feedback-01.png',
              '/images/training/student-feedback-02.png',
              '/images/training/student-feedback-03.png',
              '/images/training/student-feedback-04.png',
              '/images/training/student-feedback-05.png',
            ].map((image, index) => (
              <a key={image} href={image} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
                <img src={image} alt={`رأي متدرب ${index + 1}`} className="w-full h-auto max-h-[420px] object-contain" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. BONUSES ===== */}
      <section className="border-y border-[#DCE3E1] bg-[#F3F7F5]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold text-[#0F766E]">مع التسجيل</p>
            <h2 className="text-3xl font-bold leading-[1.45] text-[#152238] md:text-5xl">كل شي بتحتاجه حتى تطبّق الطريقة بعد الدروس.</h2>
          </div>
          <div className="mt-10 border-t border-[#B9D2CD]">
            {bonuses.map((bonus, i) => (
              <div key={i} className="grid gap-4 border-b border-[#B9D2CD] py-7 md:grid-cols-[0.35fr_1fr_1.5fr] md:items-center md:gap-8">
                <div className="flex items-center gap-3 text-sm font-bold text-[#0F766E]"><bonus.icon className="h-5 w-5" /> 0{i + 1}</div>
                <div><span className="text-xs font-bold tracking-wider text-[#71808A]">{bonus.subtitle}</span><h3 className="mt-1 text-lg font-bold text-[#152238]">{bonus.title}</h3></div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"><p className="text-sm leading-[1.9] text-[#5E6B78]">{bonus.desc}</p><span className="shrink-0 text-sm font-bold text-[#0F766E]">{bonus.value}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. TRAINER ===== */}
      <section className="bg-[#FBFAF7]">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-16 md:grid-cols-[0.65fr_1.35fr] md:items-center md:px-8 md:py-24">
          <div className="flex justify-center md:justify-start"><Image src="/images/trainer-nawaf.webp" alt="المدرب نواف البوسطة — مدرب في أدوات الذكاء الاصطناعي وزيادة الإنتاجية" width={224} height={224} sizes="224px" loading="lazy" className="h-56 w-56 rounded-full object-cover grayscale-[15%] ring-8 ring-[#EAF4F1]" /></div>
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold text-[#C89B3C]">من يقودك؟</p>
            <h2 className="text-3xl font-bold text-[#152238] md:text-5xl">نواف البوسطة</h2>
            <p className="mt-2 font-bold text-[#0F766E]">مدرب في أدوات الذكاء الاصطناعي وزيادة الإنتاجية</p>
            <p className="mt-5 text-base leading-[2] text-[#5E6B78]">مدرب أدوات ذكاء اصطناعي وباحث، يدرّب الأفراد والشركات والمؤسسات التعليمية على تحويل التقنيات الحديثة إلى حلول عملية في التعليم والإنتاجية والأتمتة.</p>
            <div className="mt-6 flex flex-wrap items-center gap-5"><Link href="/about" className="inline-flex items-center gap-2 font-bold text-[#0F766E] underline decoration-[#C89B3C] decoration-2 underline-offset-8">اعرف المزيد عن المدرب <ArrowLeft className="h-4 w-4" /></Link><a href="https://www.facebook.com/share/18UPsSwfwQ/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#5E6B78] hover:text-[#0F766E]">Facebook</a><a href="https://instagram.com/noaf.ai" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#5E6B78] hover:text-[#0F766E]">@noaf.ai</a></div>
          </div>
        </div>
      </section>

      {/* ===== 12. FAQ ===== */}
      <section className="border-y border-[#DCE3E1] bg-[#EAF4F1]">
        <div className="mx-auto max-w-[900px] px-5 py-16 md:px-8 md:py-24">
          <div className="text-center"><p className="mb-4 text-sm font-bold text-[#0F766E]">قبل التسجيل</p><h2 className="text-3xl font-bold text-[#152238] md:text-5xl">أسئلة طبيعية قبل اتخاذ القرار</h2></div>
          <div className="mt-10 border-t border-[#B9D2CD]">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#B9D2CD]"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-5 py-5 text-right"><span className="font-bold text-[#152238]">{faq.q}</span><ChevronDown className={`h-5 w-5 shrink-0 text-[#0F766E] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} /></button>{openFaq === i && <div className="pb-5 pl-10 text-sm leading-[2] text-[#5E6B78]">{faq.a}</div>}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 13. FINAL CTA ===== */}
      <section className="bg-[#152238] text-white">
        <div className="mx-auto max-w-[980px] px-5 py-16 text-center md:px-8 md:py-24">
          <p className="mb-4 text-sm font-bold text-[#D9B96C]">ابدأ من مصدرك</p>
          <h2 className="text-3xl font-bold leading-[1.45] md:text-5xl">خفّف وقت التحضير، وخلي وقتك للشرح والطلاب.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[2] text-white/70 md:text-lg">اسأل عن التسجيل وطريقة الدفع والوصول للكورس، وخد قرارك بعد ما تشوف القيمة بوضوح.</p>
          <div className="mx-auto mt-10 max-w-md border border-white/20 bg-white/5 p-7">
            <div className="text-sm text-white/60">سعر التسجيل الحالي</div>
            <div className="mt-3 flex items-baseline justify-center gap-3"><span className="text-sm text-white/45 line-through">{currentPricing.originalPrice}</span><span className="text-3xl font-bold text-[#D9B96C]">{currentPricing.price}</span></div>
            <div className="mt-2 text-sm text-white/60">{currentPricing.currency}</div>
            <a href={createWhatsAppLink('مرحباً، أريد التسجيل في كورس الذكاء الاصطناعي للمعلمين. أريد تفاصيل طريقة الدفع والوصول إلى الكورس.')} onClick={() => trackWhatsAppClick('redesigned_final_cta')} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0F766E] px-7 py-4 text-base font-bold text-white transition-all hover:bg-[#14A39A]">سجّل الآن عبر واتساب <MessageCircle className="h-5 w-5" /></a>
            <p className="mt-4 text-xs leading-[1.8] text-white/50">الشهادة اختيارية برسوم منفصلة · فيديوهات الكورس عبر مجموعة Telegram خاصة · وصول دائم</p>
          </div>
        </div>
      </section>

      {/* ===== 14. OPTIONAL CERTIFICATE ===== */}
      <section className="border-t border-[#DCE3E1] bg-[#FBFAF7]">
        <div className="mx-auto grid max-w-[980px] gap-10 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-8 md:py-24">
          <div className="order-2 flex justify-center md:order-1">
            <Image src="/images/optional-certificate.jpg" alt="نموذج من الشهادة والتصديقات" width={863} height={1080} sizes="(max-width: 768px) 100vw, 360px" loading="lazy" className="max-h-[420px] w-auto max-w-full object-contain shadow-[0_18px_45px_rgba(21,34,56,0.12)]" />
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-3 text-sm font-bold text-[#C89B3C]">خيار إضافي بعد إتمام الكورس</p>
            <h2 className="text-3xl font-bold leading-[1.4] text-[#152238] md:text-5xl">شهادة اختيارية من وزارة التنمية السورية</h2>
            <p className="mt-4 inline-flex rounded-full bg-[#EAF4F1] px-3 py-1.5 text-sm font-bold text-[#0F766E]">اختيارية — والرسوم منفصلة عن رسوم الكورس</p>
            <p className="mt-5 text-base leading-[2] text-[#5E6B78]">بعد اجتياز اختبار أو تنفيذ مشروع نهاية الكورس، يمكنك طلب شهادة من وزارة التنمية السورية. الشهادة معترف بها محليًا ودوليًا وخارجيًا، ويمكن تصديقها عبر وزارة الخارجية السورية إذا رغبت باستخدامها خارج سوريا.</p>
            <p className="mt-4 text-base leading-[2] text-[#5E6B78]">نصدر الشهادة ونرسلها إليك أينما كنت، وهي ليست شرطًا للتسجيل في الكورس.</p>
            <div className="mt-6 border-r-2 border-[#C89B3C] pr-4 text-sm font-bold leading-[2] text-[#152238]">متطلب الحصول على الشهادة: اختبار أو مشروع نهائي.</div>
          </div>
        </div>
      </section>

      {/* ===== 15. FOOTER ===== */}
      <footer className="bg-[#0E1727] py-8 text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:text-right md:px-8">
          <p className="text-xs text-white/50">جميع الحقوق محفوظة {new Date().getFullYear()} — كورس الذكاء الاصطناعي للمعلمين</p>
          <div className="flex items-center gap-5 text-sm text-white/60"><Link href="/schools" className="hover:text-white">حلول المؤسسات التعليمية</Link><Link href={resultsHref} className="hover:text-white">نماذج المخرجات</Link></div>
        </div>
      </footer>

      <a href={createWhatsAppLink('مرحباً، أريد تفاصيل التسجيل في كورس الذكاء الاصطناعي للمعلمين.')} onClick={() => trackWhatsAppClick('redesigned_mobile_sticky')} target="_blank" rel="noopener noreferrer" className="fixed inset-x-4 bottom-4 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-[#0F766E] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0F766E]/25 md:hidden">اطلب التفاصيل عبر واتساب <MessageCircle className="h-5 w-5" /></a>
    </div>
  )
}
