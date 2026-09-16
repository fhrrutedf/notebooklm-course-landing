'use client'

import { useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { trackWhatsApp } from '@/lib/analytics'
import { affiliateMessageSuffix, referralHref, resolveAffiliateRef } from '@/lib/affiliate'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileOutput,
  FileText,
  Headphones,
  MessageCircle,
  Play,
  Presentation,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Video,
  Zap,
} from 'lucide-react'

const WHATSAPP_NUMBER = '963985323170'
const subscribeAffiliate = () => () => {}

// نماذج المرحلة الأولى: فهم المصدر وبناء الشرح والخرائط الذهنية
const phase1Samples = [
  {
    title: 'دليل دراسة اطراد المتتاليات',
    subtitle: 'تحويل درس رياضيات معقد من كتاب المنهج إلى دليل دراسة بصري متكامل يساعد المعلم على الشرح بوضوح ويثبت الفكرة عند الطالب.',
    image: '/samples/user/sequence-guide.webp',
    tag: 'المرحلة 01: دليل دراسة بصري',
    time: '4 دقائق فقط',
    action: 'تصفّح الدليل الدراسي بحجمه الكامل',
    badge: 'من كتاب المنهج السوري إلى ملخص بصري',
  },
  {
    title: 'خريطة ذهنية تفصيلية للدرس',
    subtitle: 'تفكيك المفاهيم الصعبة وتفريغها في صفحة واحدة مريحة للعين، لتسهيل مراجعة الوحدة الدراسية قبل الامتحان دون تشتت.',
    image: '/samples/user/mindmap-brain-detailed.png',
    tag: 'المرحلة 01: تنظيم المفاهيم بالخرائط',
    time: 'دقيقة واحدة فقط',
    action: 'شاهد تفريع الخريطة بصفحة واحدة',
    badge: 'تلخيص وتوزيع بصري للأفكار',
  },
  {
    title: 'تحويل خط اليد إلى ملخص منسّق بالذكاء الاصطناعي',
    subtitle: 'تحويل ملاحظات درس النعت المكتوبة بخط اليد بسرعة إلى ملخص مطبوع ومنظم يشمل التعريف والأنواع والإعراب وجدول المطابقة والأمثلة التطبيقية.',
    image: '/samples/user/handwriting-to-ai-summary.png',
    tag: 'المرحلة 01: من خط اليد إلى درس رقمي',
    time: '3 دقائق',
    action: 'تصفّح الملخص المستخرج من خط اليد',
    badge: 'قراءة خط اليد وتنسيقه آلياً',
  },
  {
    title: 'شرح درس على شكل خريطة تعليمية متكاملة',
    subtitle: 'تنظيم وتوزيع الأفكار والأنشطة والخطوات في ورقة عمل بصرية واحدة تجمع بين التسلسل النظري والتطبيق الصفي.',
    image: '/samples/user/lesson-explanation.png',
    tag: 'المرحلة 01: خريطة شرح الدرس',
    time: '5 دقائق',
    action: 'شاهد خريطة الشرح التعليمية',
    badge: 'خريطة بصرية تختصر الدرس للطلاب',
  },
]

// نماذج المرحلة الثانية: أتمتة الاختبارات وصناعة أوراق الامتحانات الرسمية
const phase2Samples = [
  {
    title: 'ورقة امتحان رياضيات للبكالوريا (جاهزة للطباعة)',
    subtitle: 'نموذج ورقة امتحان وزارية كاملة مستخرجة من كتاب الرياضيات: تشمل الترويسة الرسمية، بيانات الطالب، الأسئلة المتدرجة، سلم التصحيح النموذجي، وهوامش مريحة للطباعة الفورية.',
    image: '/samples/user/math-baccalaureate-exam.webp',
    tag: 'المرحلة 02: ورقة امتحان رسمية',
    time: '18 دقيقة للطباعة النهائية',
    action: 'افتح ورقة امتحان البكالوريا الجاهزة للطباعة',
    badge: 'جاهزة للطباعة والتوزيع في الصف فوراً',
    highlight: true,
  },
  {
    title: 'قصة تفاعلية مع تمرين وتطبيق شفهي',
    subtitle: 'ورقة نشاط صفي لطلاب المرحلة الابتدائية بعنوان «عائلتي»، تجمع بين قصة شيقة، أسئلة فهم شفهية، تدريبات لغوية، ونشاط ترتيب الكلمات لتعزيز المشاركة الصفية.',
    image: '/samples/user/story-oral-exercise.png',
    tag: 'المرحلة 02: أنشطة وأسئلة صفية',
    time: '6 دقائق',
    action: 'تصفّح نشاط القصة والتمرين الشفهي',
    badge: 'نشاط صفي تفاعلي جاهز للتطبيق',
  },
]

// نماذج المرحلة الثالثة: الوسائط التعليمية المتعددة (عروض، بودكاست، إنفوجرافيك)
const phase3MediaSamples = [
  {
    title: 'بودكاست تعليمي باللغة الإنكليزية',
    subtitle: 'حوار صوتي تفاعلي بين متحدثين اثنين يناقشان محتوى الدرس بأسلوب طبيعي وممتع، يساعد الطالب على الاستماع والمراجعة أثناء التنقل.',
    tag: 'المرحلة 03: بودكاست صوتي',
    time: '10 دقائق من نص الدرس',
    audioSrc: '/samples/english-podcast.mp3',
    file: '/samples/english-podcast.mp3',
    icon: Headphones,
    badge: 'استمع للملف الصوتي مباشرة أدناه 🎧',
  },
  {
    title: 'إنفوجرافيك علوم وبصريات',
    subtitle: 'تحويل محتوى درس العلوم المعقد إلى ملخص بصري منظم بالألوان والأيقونات لترسيخ المعلومات في ذهن الطالب البصري.',
    tag: 'المرحلة 03: إنفوجرافيك بصري',
    time: '5 دقائق فقط',
    preview: '/samples/previews/chemistry-infographic.webp',
    file: '/samples/previews/chemistry-infographic.webp',
    icon: Sparkles,
    badge: 'تصميم بصري جذاب وسهل الحفظ',
  },
  {
    title: 'عرض تقديمي تفاعلي (Slides)',
    subtitle: 'شرائح جاهزة للشرح على الشاشة أو البروجكتر في الصف، مستخرجة مباشرة من أفكار الدرس دون الحاجة لتصميم كل شريحة يدوياً.',
    tag: 'المرحلة 03: شرائح تفاعلية',
    time: '8 دقائق فقط',
    preview: '/samples/previews/english-presentation.webp',
    file: '/samples/english-presentation.pdf',
    icon: Presentation,
    badge: 'جاهز للعرض في قاعة الصف',
  },
  {
    title: 'مخطط كيمياء تفصيلي — PDF',
    subtitle: 'ملف PDF ملخص للمركبات والمعادلات الكيميائية جاهز للتوزيع على الطلاب كمرجع دراسي سريع قبل الامتحانات.',
    tag: 'المرحلة 03: مذكرة PDF جاهزة',
    time: '5 دقائق',
    preview: '/samples/previews/chemistry-blueprint.webp',
    file: '/samples/chemistry-blueprint.pdf',
    icon: FileOutput,
    badge: 'مذكرة مرجعية للطباعة أو الإرسال',
  },
]

// عينات الفيديو التعليمي
const videoSamples = [
  { title: 'فيديو تعليمي — مادة العلوم', id: 'u-fb-Skw0kU', desc: 'شرح مفهوم علمي بصوت وصورة أنشئت بالذكاء الاصطناعي دون تصوير.' },
  { title: 'فيديو تعليمي — مادة الكيمياء', id: 'XQNR8vzC7BQ', desc: 'تبسيط تجربة كيميائية ومخطط تفاعلي مرئي للطلاب بدقائق.' },
  { title: 'فيديو تعليمي — اللغة الإنكليزية', id: 'ednZg7GZt2Q', desc: 'نطق سليم وشرح لقواعد ومفردات الدرس بالصوت والصورة.' },
]

export default function ResultsClient() {
  const affiliateRef = useSyncExternalStore(
    subscribeAffiliate,
    () => resolveAffiliateRef(window.location.search) || window.localStorage.getItem('course_affiliate_ref') || '',
    () => '',
  )

  useEffect(() => {
    const directRef = resolveAffiliateRef(window.location.search)
    if (directRef) window.localStorage.setItem('course_affiliate_ref', directRef)
  }, [])

  const createWhatsAppLink = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${message}${affiliateMessageSuffix(affiliateRef)}`)}`
  const homeHref = referralHref('/', affiliateRef)

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F8F6] text-[#242424]" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>
      {/* شريط التنقل العلوي */}
      <nav className="sticky top-0 z-50 border-b border-[#E2E2DF] bg-[#F8F8F6]/95 px-4 py-3.5 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3">
          <Link href={homeHref} className="inline-flex items-center gap-2 text-sm font-bold text-[#242424] hover:text-[#E3342F]">
            <ArrowRight className="h-5 w-5 text-[#E3342F]" />
            <span>العودة إلى تفاصيل الكورس</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-bold text-[#666666] md:inline">كورس الذكاء الاصطناعي للمعلمين</span>
            <a
              href={createWhatsAppLink('مرحباً، شاهدت صفحة النماذج وأريد حجز مقعدي وتفعيل الكورس فوراً.')}
              onClick={() => {
                track('whatsapp_click', { source: 'results_nav', affiliate_ref: affiliateRef || 'direct' })
                trackWhatsApp('results_nav', { affiliate_ref: affiliateRef || 'direct' })
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#E3342F] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#B92723] md:text-sm"
            >
              <span>احجز مقعدك الآن</span>
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* الترويسة الرئيسية */}
      <header className="border-b border-[#E2E2DF] bg-[#F7EDEC]">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-black text-[#B92723] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#E3342F]" />
            <span>نماذج حقيقية أُنتجت عمليًا من كتب المناهج</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-3xl font-black leading-[1.35] tracking-tight text-[#242424] md:text-5xl lg:text-6xl">
            توقف عن تخيل النتائج… شاهد بعينك كيف تتحول كتب المنهج إلى مادة تعليمية متكاملة
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-[2] text-[#4A4A4A] md:text-xl">
            من كتاب المنهج أو الورقة البيضاء، إلى شرح بصري، اختبار رسمي مطبوع، وعرض وبودكاست تفاعلي. هذه عينات حقيقية أُنتجت عمليًا عبر مراحل الكورس لتشاهد بنفسك جودة النتيجة وسرعة إنجازها.
          </p>

          {/* شريط الإثباتات والثقة */}
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold md:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-[#242424] shadow-sm">
              <Clock className="h-4 w-4 text-[#E3342F]" />
              متوسط وقت الإنتاج: 1 - 18 دقيقة
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-[#242424] shadow-sm">
              <FileText className="h-4 w-4 text-[#E3342F]" />
              أوراق امتحانات جاهزة للطباعة والتوزيع
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-[#242424] shadow-sm">
              <Headphones className="h-4 w-4 text-[#E3342F]" />
              بودكاست وعروض وفيديوهات تفاعلية
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-[#B92723] shadow-sm">
              <span>📱</span>
              لا يحتاج لابتوب — طبّق من هاتفك
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-emerald-800 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              قرار المراجعة والدقة بيدك أنت
            </span>
          </div>

          {/* شريط الفهرس والانتقال السريع */}
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-[#E2E2DF] pt-6">
            <span className="text-xs font-black text-[#666666]">تصفح بحسب المرحلة:</span>
            <a href="#phase-1" className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#242424] transition hover:bg-[#E3342F] hover:text-white shadow-sm">
              المرحلة 1: الشرح والخرائط (4)
            </a>
            <a href="#phase-2" className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#242424] transition hover:bg-[#E3342F] hover:text-white shadow-sm">
              المرحلة 2: الامتحانات الرسمية (2)
            </a>
            <a href="#phase-3" className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#242424] transition hover:bg-[#E3342F] hover:text-white shadow-sm">
              المرحلة 3: الوسائط والبودكاست (4)
            </a>
            <a href="#videos" className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#242424] transition hover:bg-[#E3342F] hover:text-white shadow-sm">
              مخرجات الفيديو (3)
            </a>
          </div>
        </div>
      </header>

      {/* القسم الأول: نماذج المرحلة الأولى */}
      <section id="phase-1" className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-3xl">
            <span className="rounded-full bg-[#F7EDEC] px-3.5 py-1 text-xs font-black text-[#B92723]">
              المرحلة 01 في الكورس
            </span>
            <h2 className="mt-3 text-2xl font-black leading-[1.4] text-[#242424] md:text-4xl">
              فهم المصدر وبناء الشرح والخرائط الذهنية
            </h2>
            <p className="mt-3 text-base leading-[2] text-[#666666]">
              شاهد كيف تتحول صفحات الكتاب أو ملخصات خط اليد إلى مذكرات دراسية منظمة وخرائط ذهنية تسهل استيعاب أصعب الدروس.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {phase1Samples.map((sample) => (
              <article key={sample.title} className="group overflow-hidden rounded-3xl border border-[#E2E2DF] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.04)] transition hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                <a
                  href={sample.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('featured_sample_open', { sample: sample.title })}
                  className="block overflow-hidden bg-[#F0F0EE]"
                >
                  <img
                    src={sample.image}
                    alt={sample.title}
                    className="h-64 w-full object-contain p-3 transition duration-500 group-hover:scale-[1.02] md:h-80"
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#E3342F]">{sample.tag}</span>
                    <span className="rounded-full bg-[#F7EDEC] px-2.5 py-1 text-xs font-bold text-[#B92723]">
                      ⏱ {sample.time}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-[#242424]">{sample.title}</h3>
                  <p className="mt-2 text-sm leading-[1.9] text-[#666666]">{sample.subtitle}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#E2E2DF] pt-4">
                    <span className="text-xs font-bold text-[#888888]">{sample.badge}</span>
                    <a
                      href={sample.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E3342F] underline decoration-2 underline-offset-4 hover:text-[#B92723]"
                    >
                      {sample.action}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* القسم الثاني: نماذج المرحلة الثانية */}
      <section id="phase-2" className="border-t border-[#E2E2DF] bg-[#F0F0EE] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-3xl">
            <span className="rounded-full bg-[#F7EDEC] px-3.5 py-1 text-xs font-black text-[#B92723]">
              المرحلة 02 في الكورس
            </span>
            <h2 className="mt-3 text-2xl font-black leading-[1.4] text-[#242424] md:text-4xl">
              بناء الأسئلة والأنشطة وصناعة أوراق الامتحانات
            </h2>
            <p className="mt-3 text-base leading-[2] text-[#666666]">
              وفّر الساعات الطويلة في كتابة وتنسيق الأسئلة؛ اطلع بورقة امتحان رسمية جاهزة للطباعة والتوزيع في الصف بسلالم تصحيح نموذجية.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {phase2Samples.map((sample) => (
              <article key={sample.title} className="group overflow-hidden rounded-3xl border border-[#E2E2DF] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.04)]">
                <a
                  href={sample.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('featured_sample_open', { sample: sample.title })}
                  className="block overflow-hidden bg-[#F8F8F6]"
                >
                  <img
                    src={sample.image}
                    alt={sample.title}
                    className="max-h-[500px] w-full object-contain p-4 transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#E3342F]">{sample.tag}</span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
                      ⏱ {sample.time}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-[#242424]">{sample.title}</h3>
                  <p className="mt-3 text-sm leading-[2] text-[#666666]">{sample.subtitle}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#E2E2DF] pt-4">
                    <span className="rounded-full bg-[#F7EDEC] px-3 py-1 text-xs font-bold text-[#B92723]">
                      {sample.badge}
                    </span>
                    <a
                      href={sample.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E3342F] underline decoration-2 underline-offset-4 hover:text-[#B92723]"
                    >
                      {sample.action}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* زر الحجز الأوسط (Mid-Page Conversion CTA) */}
      <section className="px-5 py-8">
        <div className="mx-auto max-w-[1000px] rounded-3xl border-2 border-[#E3342F]/30 bg-[#F7EDEC] p-6 text-center shadow-[0_14px_40px_rgba(227,52,47,0.08)] md:p-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1 text-xs font-black text-[#B92723] shadow-sm">
              <Zap className="h-3.5 w-3.5 text-[#E3342F]" />
              تطبيق عملي من أول يوم
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 border border-red-300 px-3 py-1 text-xs font-black text-[#B92723]">
              🔥 متبقي 6 مقاعد فقط بسعر الإطلاق
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-black leading-[1.4] text-[#242424] md:text-3xl">
            أعجبتك هذه النتائج وتريد تطبيقها على كتبك ودروسك؟
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-[2] text-[#555555] md:text-base">
            في الكورس بتتعلم الطريقة كاملة خطوة بخطوة: من فتح صفحة الكتاب، إلى استخراج الأفكار وبناء الشرح، وحتى إخراج ورقة امتحان أو عرض جاهز دون أي تشتت، مع متابعة شخصية من المدرب.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={createWhatsAppLink('مرحباً، شاهدت نماذج المخرجات وأريد حجز مقعدي في الكورس وتفعيله فوراً.')}
              onClick={() => {
                track('whatsapp_click', { source: 'results_mid_cta', affiliate_ref: affiliateRef || 'direct' })
                trackWhatsApp('results_mid_cta', { affiliate_ref: affiliateRef || 'direct' })
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#E3342F] px-8 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-[#B92723] hover:scale-[1.02]"
            >
              <span>احجز مقعدك الآن عبر واتساب</span>
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-2 text-xs text-[#666666]">
            💡 <strong className="text-[#242424]">ماذا يحدث بعد الضغط؟</strong> يفتح شات واتساب مباشرة مع المدرب للإجابة على استفساراتك، اختيار طريقة الدفع الأسهل لك، واستلام رابط الكورس فوراً.
          </p>
          <p className="mt-3 text-xs font-bold text-[#666666]">
            سعر الإطلاق 35$ فقط (أو قسطان 17.5$) · وصول دائم عبر Telegram · ضمان استرجاع كامل 7 أيام
          </p>
        </div>
      </section>

      {/* القسم الثالث: نماذج المرحلة الثالثة (الوسائط والبودكاست) */}
      <section id="phase-3" className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-3xl">
            <span className="rounded-full bg-[#F7EDEC] px-3.5 py-1 text-xs font-black text-[#B92723]">
              المرحلة 03 في الكورس
            </span>
            <h2 className="mt-3 text-2xl font-black leading-[1.4] text-[#242424] md:text-4xl">
              إخراج المحتوى بصيغ تفاعلية، صوتية، ومرئية
            </h2>
            <p className="mt-3 text-base leading-[2] text-[#666666]">
              خاطب الطالب البصري والسمعي بملفات تفاعلية مبهرة: بودكاست بصوتين، عروض شرائح جاهزة، ومذكرات PDF مركزة.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {phase3MediaSamples.map((sample) => {
              const Icon = sample.icon
              return (
                <article key={sample.title} className="overflow-hidden rounded-3xl border border-[#E2E2DF] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7EDEC] text-[#E3342F]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="text-xs font-bold text-[#E3342F]">{sample.tag}</span>
                        <h3 className="text-lg font-black text-[#242424]">{sample.title}</h3>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#F0F0EE] px-2.5 py-1 text-xs font-bold text-[#666666]">
                      ⏱ {sample.time}
                    </span>
                  </div>

                  {sample.preview && (
                    <div className="mt-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-[#F0F0EE]">
                      <img src={sample.preview} alt={sample.title} className="h-full w-full object-contain p-2" loading="lazy" />
                    </div>
                  )}

                  <p className="mt-4 text-sm leading-[1.9] text-[#666666]">{sample.subtitle}</p>

                  {/* مشغل الصوت المدمج للبودكاست */}
                  {sample.audioSrc && (
                    <div className="mt-4 rounded-2xl border border-[#E2E2DF] bg-[#F8F8F6] p-4">
                      <p className="mb-2 text-xs font-bold text-[#E3342F]">🎧 استمع لعينة البودكاست الصوتي التفاعلي مباشرة:</p>
                      <audio controls className="w-full" src={sample.audioSrc} preload="none">
                        متصفحك لا يدعم مشغل الصوت المدمج.
                      </audio>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between border-t border-[#E2E2DF] pt-4">
                    <span className="text-xs font-bold text-[#888888]">{sample.badge}</span>
                    <a
                      href={sample.file}
                      onClick={() => track('sample_open', { sample: sample.title })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E3342F] underline decoration-2 underline-offset-4 hover:text-[#B92723]"
                    >
                      <span>فتح العينة الأصلية</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* نماذج مخرجات الفيديو التعليمي */}
      <section id="videos" className="border-t border-[#E2E2DF] bg-[#F8F8F6] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center">
            <span className="rounded-full bg-[#F7EDEC] px-3.5 py-1 text-xs font-black text-[#B92723]">
              المرحلة 03: نماذج مخرجات مرئية
            </span>
            <h2 className="mt-3 text-2xl font-black text-[#242424] md:text-4xl">
              مقاطع مخرجات تعليمية: من نص الدرس إلى فيديو تفاعلي للطلاب
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-[1.9] text-[#666666] md:text-base">
              هذه المقاطع هي نماذج مخرجات حقيقية يتعلم المعلم إنتاجها في الكورس؛ حيث يتحول الدرس إلى فيديو شارح بالرسوم والصوت دون الحاجة لكاميرات أو مونتاج معقد، لتقدمه لطلابك كمخرج تعليمي جاهز.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {videoSamples.map((video) => (
              <article key={video.title} className="overflow-hidden rounded-3xl border border-[#E2E2DF] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)]">
                <div className="aspect-video bg-[#242424]">
                  <iframe
                    loading="lazy"
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    onLoad={() => track('video_open', { video: video.title })}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 text-right">
                  <div className="flex items-center gap-2 text-[#E3342F]">
                    <Video className="h-5 w-5" />
                    <span className="text-xs font-bold">مخرج فيديو تعليمي جاهز للطلاب</span>
                  </div>
                  <h3 className="mt-2 font-bold text-[#242424]">{video.title}</h3>
                  <p className="mt-1.5 text-xs leading-[1.8] text-[#666666]">{video.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* الفاصل الإقناعي الأسود */}
      <section className="border-y border-[#E2E2DF] bg-[#242424] text-white">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold text-[#E3342F]">ما الذي تثبته هذه النماذج؟</p>
            <h2 className="text-2xl font-black leading-[1.45] md:text-4xl">
              ليست ملفات متفرقة؛ إنها خطوات لحل مشكلة التحضير من جذورها.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { n: '01', t: 'تنظيم الدرس بصريًا', d: 'تحويل النص الجاف إلى خريطة ودليل دراسة.' },
              { n: '02', t: 'استخراج الأفكار والأسئلة', d: 'تحديد المفاهيم وصياغة أسئلة متدرجة الصعوبة.' },
              { n: '03', t: 'بناء اختبار متنوع', d: 'بنك أسئلة متكامل مع سلالم تصحيح نموذجية.' },
              { n: '04', t: 'إخراج ورقة امتحان واضحة', d: 'ملف جاهز للطباعة بدقائق مع الترويسة وهوامش مريحة.' },
            ].map((step) => (
              <div key={step.n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <span className="text-sm font-black text-[#E3342F]">{step.n}</span>
                <p className="mt-2 font-black text-white">{step.t}</p>
                <p className="mt-1 text-xs leading-[1.8] text-white/60">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* القسم الختامي: بطاقة الاشتراك وعرض السعر */}
      <section className="border-t border-[#E2E2DF] bg-[#F7EDEC] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-[980px]">
          <div className="text-center">
            <span className="rounded-full bg-white px-4 py-1 text-xs font-black text-[#B92723] shadow-sm">
              الخطوة التالية واضحة
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#242424] md:text-5xl">
              هذه النماذج هي النتيجة — والكورس يعلّمك الطريقة.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-[2] text-[#666666]">
              إذا بدك تبني مخرجات مشابهة من كتبك ودروسك وتوفّر تعب التحضير للعام الدراسي بالكامل، احجز مقعدك وخد تفاصيل الدفع والتفعيل الفوري عبر WhatsApp.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-[#E2E2DF] bg-white p-7 shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:p-9">
            <div className="text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-[#F7EDEC] px-3 py-1 text-xs font-bold text-[#B92723]">
                  عرض التسجيل الحالي
                </span>
                <span className="rounded-full bg-red-100 border border-red-300 px-3 py-1 text-xs font-bold text-[#B92723]">
                  🔥 متبقي 6 مقاعد فقط بسعر الإطلاق
                </span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="text-xl font-bold text-[#888888] line-through decoration-2">79$</span>
                <span className="text-5xl font-black text-[#E3342F]">35$</span>
              </div>
              <p className="mt-2 text-sm font-bold text-[#666666]">
                أو قسطان مريحان: 17.5$ + 17.5$ فقط
              </p>
            </div>

            {/* صندوق أين وكيف تستلم الكورس */}
            <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50/70 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
                  <Send className="h-5 w-5" />
                </div>
                <div className="text-right text-xs leading-[1.8] text-slate-700">
                  <p className="font-black text-sky-950 text-sm">أين وكيف تستلم الكورس؟</p>
                  <p className="mt-1">
                    • <strong>وصول فوري ودائم عبر تطبيق Telegram:</strong> تستلم فور الدفع رابط قناة ومجموعة الكورس الخاصة لتشاهد الدروس في أي وقت وتحتفظ بها للأبد.
                  </p>
                  <p className="mt-1">
                    • <strong>متابعة من الهاتف مباشرة خطوة بخطوة مع المدرب:</strong> لا تحتاج كمبيوتر، وإذا وقفت بأي خطوة أو تطبيق، المدرب معك شخصياً للإجابة والتوجيه عبر تيليجرام وواتساب.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#F7EDEC] p-5">
                <p className="font-bold text-[#E3342F]">داخل سوريا</p>
                <p className="mt-1.5 text-xs leading-[1.9] text-[#666666]">
                  سيريتل كاش، شام كاش، الهرم، الفؤاد، بنك بيمو، وغيرها بتفعيل فوري ومباشر.
                </p>
              </div>
              <div className="rounded-2xl bg-[#F0F0EE] p-5">
                <p className="font-bold text-[#E3342F]">خارج سوريا</p>
                <p className="mt-1.5 text-xs leading-[1.9] text-[#666666]">
                  PayPal، Western Union، والبطاقات البنكية الدولية حسب المتاح.
                </p>
              </div>
            </div>

            <a
              href={createWhatsAppLink('مرحباً، شاهدت نماذج المخرجات وأريد حجز مقعدي وتفعيل الكورس فوراً.')}
              onClick={() => {
                track('whatsapp_click', { source: 'results_final_cta', affiliate_ref: affiliateRef || 'direct' })
                trackWhatsApp('results_final_cta', { affiliate_ref: affiliateRef || 'direct' })
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#E3342F] px-8 py-4 text-base font-bold text-white shadow-md transition hover:bg-[#B92723] hover:scale-[1.01]"
            >
              <span>احجز مقعدك وابدأ تفعيل الكورس عبر الواتساب</span>
              <MessageCircle className="h-5 w-5" />
            </a>

            {/* ماذا يحدث بعد الضغط على زر واتساب؟ */}
            <div className="mt-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4 text-right">
              <p className="text-xs font-black text-amber-900 mb-2">
                💬 ماذا سيحدث بعد الضغط على زر واتساب؟
              </p>
              <div className="grid gap-2 text-xs text-amber-950/80">
                <p>1️⃣ <strong>تواصل مباشر مع المدرب:</strong> يفتح شات فوري تسأل فيه أي سؤال وتتأكد إذا الكورس مناسب لمادتك وهاتفك.</p>
                <p>2️⃣ <strong>اختيار طريقة الدفع المريحة لك:</strong> شام كاش، سيريتل كاش، هرم، أو غيرها بدون أي تعقيد.</p>
                <p>3️⃣ <strong>استلام رابط الوصول فوراً:</strong> يتم إضافتك لمجموعة وتطبيق Telegram فور تأكيد الإيصال وتبدأ فوراً مع ضمان استرجاع 7 أيام.</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#666666]">
              <span className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> ضمان استرجاع كامل 7 أيام
              </span>
              <span>•</span>
              <span>وصول دائم لجميع التحديثات المستقبلية</span>
            </div>
          </div>
        </div>
      </section>

      {/* زر الموبايل العائم أسفل الشاشة (Sticky Mobile CTA) */}
      <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
        <a
          href={createWhatsAppLink('مرحباً، شاهدت صفحة النماذج وأريد حجز مقعدي في الكورس.')}
          onClick={() => {
            track('whatsapp_click', { source: 'results_mobile_sticky', affiliate_ref: affiliateRef || 'direct' })
            trackWhatsApp('results_mobile_sticky', { affiliate_ref: affiliateRef || 'direct' })
          }}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E3342F] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(227,52,47,0.5)] active:scale-95"
        >
          <span>احجز مكانك في الكورس الآن</span>
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>

      {/* الفوتر */}
      <footer className="border-t border-white/10 bg-[#242424] px-5 py-8 text-center text-sm text-white">
        © {new Date().getFullYear()} — كورس الذكاء الاصطناعي للمعلمين <span className="mx-2 text-white/40">·</span>{' '}
        <Link href={homeHref} className="underline hover:text-[#E3342F]">
          الرئيسية
        </Link>
      </footer>
    </div>
  )
}
