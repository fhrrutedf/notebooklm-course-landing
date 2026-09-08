'use client'

import { useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { affiliateMessageSuffix, referralHref, resolveAffiliateRef } from '@/lib/affiliate'
import {
  ArrowRight,
  BookOpen,
  Download,
  ExternalLink,
  FileOutput,
  FileText,
  Headphones,
  MessageCircle,
  Presentation,
  Sparkles,
  Video,
} from 'lucide-react'

const WHATSAPP_NUMBER = '963985323170'
const subscribeAffiliate = () => () => {}

type LocalSample = {
  title: string
  subtitle: string
  preview?: string
  file: string
  fileLabel: string
  time?: string
  icon: typeof FileText
  kind: 'image' | 'file' | 'audio'
}

const localSamples: LocalSample[] = [
  {
    title: 'مخطط كيمياء — PDF',
    subtitle: 'نموذج PDF محلي وجاهز للفتح أو التنزيل',
    preview: '/samples/previews/chemistry-blueprint.webp',
    file: '/samples/chemistry-blueprint.pdf',
    fileLabel: 'شاهد ورقة الـ PDF الجاهزة',
    icon: FileText,
    kind: 'file',
  },
  {
    title: 'عرض تقديمي — كيمياء',
    subtitle: 'شرائح من محتوى الدرس، مع معاينة محلية خفيفة',
    preview: '/samples/previews/chemistry-slides.webp',
    file: 'https://docs.google.com/presentation/d/1tCPwC6a5DkkuzOyJyCdQzl-h-msNu_oo/edit?usp=sharing&ouid=108751952460291673147&rtpof=true&sd=true',
    fileLabel: 'شاهد الشرائح التفاعلية',
    icon: Presentation,
    kind: 'file',
  },
  {
    title: 'إنفوجرافيك إنكليزي',
    subtitle: 'محتوى بصري من درس اللغة الإنكليزية',
    preview: '/samples/previews/english-infographic.webp',
    file: '/samples/previews/english-infographic.webp',
    fileLabel: 'تصفّح النموذج وشاهد النتيجة',
    icon: Sparkles,
    kind: 'image',
  },
  {
    title: 'عرض The Language Code',
    subtitle: 'ملف العرض الأصلي متاح للفتح عند الطلب',
    preview: '/samples/previews/english-presentation.webp',
    file: '/samples/english-presentation.pdf',
    fileLabel: 'شاهد الشرائح التفاعلية',
    icon: FileOutput,
    kind: 'file',
  },
  {
    title: 'بودكاست تعليمي — إنكليزي',
    subtitle: 'ملف صوتي مستخرج من محتوى الدرس',
    file: '/samples/english-podcast.mp3',
    fileLabel: 'استمع إلى العينة الصوتية',
    icon: Headphones,
    kind: 'audio',
  },
]

const videoSamples = [
  { title: 'فيديو تعليمي — علوم', id: 'u-fb-Skw0kU' },
  { title: 'فيديو تعليمي — كيمياء', id: 'XQNR8vzC7BQ' },
  { title: 'فيديو تعليمي — إنكليزي', id: 'ednZg7GZt2Q' },
]


type FeaturedSample = { title: string; subtitle: string; image: string; tag: string; time: string; action: string; href?: string }
const featuredSamples: FeaturedSample[] = [
  {
    title: 'دليل دراسة اطراد المتتاليات',
    subtitle: 'تحويل درس رياضيات لدليل بصري بيساعدك تشرح الفكرة بوضوح.',
    image: '/samples/user/sequence-guide.webp',
    tag: 'دليل دراسة بصري',
    time: '4 دقائق فقط',
    action: 'تصفّح الدليل الدراسي البصري للمتتاليات',
  },
  {
    title: 'خريطة ذهنية تفصيلية',
    subtitle: 'تفريع المفاهيم الرئيسية بصفحة وحدة سهلة للمراجعة.',
    image: '/samples/user/mindmap-brain-detailed.png',
    tag: 'تنظيم المفاهيم',
    time: 'دقيقة واحدة فقط',
    action: 'شاهد تفريع المفاهيم بصفحة واحدة',
  },
  {
    title: 'اختبار تدريبي من كتاب رياضيات البكالوريا',
    subtitle: 'نموذج ورقة امتحان تدريبية مستخرجة من كتاب رياضيات البكالوريا.',
    image: '/samples/user/math-baccalaureate-exam.webp',
    tag: 'اختبار وورقة امتحان',
    time: '18 دقيقة للطباعة النهائية',
    action: 'شاهد ورقة امتحان البكالوريا الجاهزة للطباعة',
  },
  {
    title: 'إنفوجرافيك علوم',
    subtitle: 'تحويل محتوى درس العلوم إلى ملخص بصري منظم.',
    image: '/samples/previews/chemistry-infographic.webp',
    tag: 'إنفوجرافيك علوم',
    time: '5 دقائق فقط',
    action: 'تصفّح الإنفوجرافيك البصري للعلوم',
  },
  {
    title: 'عرض تقديمي — كيمياء',
    subtitle: 'عرض تعليمي من محتوى الدرس، افتحه من الرابط لمشاهدة الشرائح.',
    image: '/samples/previews/chemistry-slides.webp',
    href: 'https://docs.google.com/presentation/d/1tCPwC6a5DkkuzOyJyCdQzl-h-msNu_oo/edit?usp=sharing&ouid=108751952460291673147&rtpof=true&sd=true',
    tag: 'عرض تقديمي — كيمياء',
    time: '8 دقائق فقط',
    action: 'شاهد عينة من شرائح الكيمياء التفاعلية',
  },
]

const additionalSamples = [
  {
    title: 'تحويل خط اليد إلى ملخص منسّق بالذكاء الاصطناعي',
    subtitle: 'تحويل ملاحظات درس النعت المكتوبة بخط اليد إلى ملخص واضح ومنظم، يتضمن التعريف والأنواع والإعراب وجدول المطابقة والأمثلة التطبيقية.',
    image: '/samples/user/handwriting-to-ai-summary.png',
    tag: 'من خط اليد إلى درس جاهز',
  },
  {
    title: 'قصة مع تمرين شفهي للطلاب',
    subtitle: 'ورقة تعليمية لطلاب الصف الأول بعنوان «عائلتي»، تجمع بين قصة قصيرة وأسئلة فهم شفهية وتدريبات لغوية ونشاط ترتيب الكلمات.',
    image: '/samples/user/story-oral-exercise.png',
    tag: 'قصة وتطبيق شفهي',
  },
  {
    title: 'شرح درس على شكل خريطة تعليمية',
    subtitle: 'تحويل درس «كيفية التطرق إليها» إلى شرح بصري منظم يوزع الأفكار والخطوات والأنشطة بطريقة مريحة للطالب والمعلم.',
    image: '/samples/user/lesson-explanation.png',
    tag: 'شرح درس بصري',
  },
]

export default function ResultsPage() {
  const affiliateRef = useSyncExternalStore(
    subscribeAffiliate,
    () => resolveAffiliateRef(window.location.search) || window.localStorage.getItem('course_affiliate_ref') || '',
    () => '',
  )

  useEffect(() => {
    const directRef = resolveAffiliateRef(window.location.search)
    if (directRef) window.localStorage.setItem('course_affiliate_ref', directRef)
  }, [])

  const createWhatsAppLink = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${message}${affiliateMessageSuffix(affiliateRef)}`)}`
  const homeHref = referralHref('/', affiliateRef)

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F8F6] text-[#242424]" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>
      <nav className="sticky top-0 z-50 border-b border-[#E2E2DF] bg-[#F8F8F6]/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3">
          <Link href={homeHref} className="inline-flex items-center gap-2 text-sm font-bold text-[#666666] hover:text-[#E3342F]"><ArrowRight className="h-5 w-5" /> العودة للكورس</Link>
          <a href={createWhatsAppLink('مرحباً، شاهدت صفحة النماذج وأريد تفاصيل التسجيل في الكورس.')} onClick={() => track('whatsapp_click', { source: 'results_nav', affiliate_ref: affiliateRef || 'direct' })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#E3342F] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#B92723]">اطلب التفاصيل <MessageCircle className="h-4 w-4" /></a>
        </div>
      </nav>

      <header className="border-b border-[#E2E2DF] bg-[#F7EDEC]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <p className="mb-5 text-sm font-bold text-[#E3342F]">من المصدر إلى النتيجة خلال دقائق</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.4] tracking-tight text-[#242424] md:text-6xl">توقف عن تخيل النتائج… شاهد بعينك كيف تتحول كتب المنهج السوري إلى مادة تعليمية متكاملة</h1>
          <p className="mt-6 max-w-3xl text-base leading-[2] text-[#666666] md:text-xl">من مصدرك بتطلع شرح، اختبار، عرض تقديمي، خريطة ذهنية ومحتوى مرتب. هاي نماذج عملية بتفرجيك كيف بينتقل المعلم من الشغل المتكرر لشغل أذكى وأسرع، مع بقاء مراجعته هي الخطوة الأخيرة.</p>
        </div>
      </header>

      <section className="bg-[#F8F8F6]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-4 text-sm font-bold text-[#E3342F]">رحلة مخرج واحدة</p><h2 className="text-3xl font-bold leading-[1.45] text-[#242424] md:text-5xl">من الفهم إلى التقييم</h2></div><p className="max-w-sm text-sm leading-[1.9] text-[#666666]">اختر أي صورة لتشاهدها بحجمها الكامل. الهدف أن ترى الطريقة والنتيجة معًا.</p></div>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {featuredSamples.map((sample, i) => (
              <article key={sample.title} className={`group ${i === 3 ? 'md:col-span-2 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-8' : ''}`}>
                <a href={sample.href || sample.image} target="_blank" rel="noopener noreferrer" onClick={() => track('featured_sample_open', { sample: sample.title })} className="block overflow-hidden border border-[#E2E2DF] bg-white">
                  <img src={sample.image} alt={sample.title} className="h-64 w-full object-contain bg-[#F0F0EE] p-3 transition duration-500 group-hover:scale-[1.02] md:h-80" loading={i < 2 ? 'eager' : 'lazy'} />
                </a>
                <div className="mt-5 border-t-2 border-[#E3342F] pt-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-bold tracking-wide text-[#E3342F]">{sample.tag}</p><span className="inline-flex items-center gap-1 rounded-full bg-[#F7EDEC] px-3 py-1 text-xs font-bold text-[#B92723]"><span aria-hidden="true">⏱</span> تم إنتاجه في {sample.time}</span></div><h3 className="mt-3 text-xl font-bold text-[#242424]">{sample.title}</h3><p className="mt-2 text-sm leading-[1.9] text-[#666666]">{sample.subtitle}</p><a href={sample.href || sample.image} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#E3342F] underline decoration-[#E3342F] decoration-2 underline-offset-8">{sample.action} <ExternalLink className="h-4 w-4" /></a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E2E2DF] bg-[#F0F0EE]"><div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24"><div className="max-w-3xl"><p className="mb-4 text-sm font-bold text-[#E3342F]">نماذج إضافية من التطبيق</p><h2 className="text-3xl font-bold leading-[1.45] text-[#242424] md:text-5xl">من ملاحظة بسيطة إلى مادة تعليمية جاهزة</h2><p className="mt-5 text-base leading-[2] text-[#666666]">كل نموذج هون منفصل حتى تشوف كيف ممكن يتحول المصدر الذي عندك إلى مخرج واضح وقابل للاستخدام.</p></div><div className="mt-10 space-y-8">{additionalSamples.map((sample) => <article key={sample.title} className="overflow-hidden rounded-2xl border border-[#E2E2DF] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)]"><div className="grid items-center gap-6 p-4 md:grid-cols-[1.15fr_0.85fr] md:p-6"><div className="overflow-hidden rounded-xl bg-[#F8F8F6]"><img src={sample.image} alt={sample.title} className="max-h-[720px] w-full object-contain" loading="lazy" /></div><div className="text-right"><p className="text-xs font-bold tracking-wide text-[#E3342F]">{sample.tag}</p><h3 className="mt-3 text-2xl font-bold text-[#242424]">{sample.title}</h3><p className="mt-4 text-sm leading-[2] text-[#666666]">{sample.subtitle}</p><span className="mt-5 inline-flex rounded-full bg-[#F7EDEC] px-3 py-1.5 text-xs font-bold text-[#B92723]">مخرج تعليمي جاهز للمراجعة والتطبيق</span></div></div></article>)}</div></div></section>

      <section className="border-y border-[#E2E2DF] bg-[#242424] text-white">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20"><div className="max-w-3xl"><p className="mb-4 text-sm font-bold text-[#E3342F]">ما الذي تثبته هذه النماذج؟</p><h2 className="text-3xl font-bold leading-[1.45] md:text-5xl">ليست ملفات منفصلة؛ إنها خطوات لحل مشكلة التحضير.</h2></div><div className="mt-10 grid gap-4 md:grid-cols-4">{['تنظيم الدرس بصريًا','استخراج الأفكار والأسئلة','بناء اختبار متنوع','إخراج ورقة امتحان واضحة'].map((text, i) => <div key={text} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><span className="text-sm font-bold text-[#E3342F]">0{i + 1}</span><p className="mt-3 font-bold text-white">{text}</p></div>)}</div></div>
      </section>

      <section className="bg-[#F0F0EE]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24"><div className="max-w-2xl"><p className="mb-4 text-sm font-bold text-[#E3342F]">مخرجات أخرى</p><h2 className="text-3xl font-bold text-[#242424] md:text-5xl">شرح، PDF، عروض وصوتيات</h2><p className="mt-5 text-base leading-[2] text-[#666666]">غير الاختبار والامتحان، فيك تبني مخرجات متعددة من نفس المصدر.</p></div><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{localSamples.filter((sample) => !['مخطط كيمياء — PDF', 'عرض تقديمي — كيمياء'].includes(sample.title)).map((sample) => { const Icon = sample.icon; const time = sample.title.includes('بودكاست') ? '10 دقائق فقط' : sample.title.includes('عرض') ? '8 دقائق فقط' : '5 دقائق فقط'; const action = sample.title.includes('بودكاست') ? 'استمع لعينة البودكاست الصوتي التفاعلي' : sample.title.includes('عرض') ? 'شاهد عينة الشرائح التفاعلية' : sample.title.includes('إنفوجرافيك') ? 'تصفّح الإنفوجرافيك البصري' : 'تصفّح النموذج وشاهد النتيجة'; return (<article key={sample.title} className="overflow-hidden rounded-2xl border border-[#E2E2DF] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)]"><div className="flex h-48 items-center justify-center bg-[#F0F0EE]">{sample.preview ? <img src={sample.preview} alt={`معاينة ${sample.title}`} className="h-full w-full object-contain p-3" loading="lazy" /> : <Icon className="h-14 w-14 text-[#E3342F]" />}</div><div className="p-5"><div className="flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-[#E3342F]" /><h3 className="font-bold text-[#242424]">{sample.title}</h3></div><span className="rounded-full bg-[#F7EDEC] px-2.5 py-1 text-xs font-bold text-[#B92723]">⏱ {time}</span></div><p className="mt-3 min-h-12 text-sm leading-[1.9] text-[#666666]">{sample.subtitle}</p><a href={sample.file} onClick={() => track('sample_open', { sample: sample.title, kind: sample.kind })} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#E3342F] underline decoration-2 underline-offset-8">{action} <ExternalLink className="h-4 w-4" /></a></div></article>) })}</div></div>
      </section>

      <section className="bg-[#F8F8F6]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 text-center md:px-8 md:py-24"><p className="mb-4 text-sm font-bold text-[#E3342F]">فيديوهات من التطبيق</p><h2 className="text-3xl font-bold text-[#242424] md:text-5xl">شاهد الطريقة أثناء التنفيذ</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-[2] text-[#666666]">الفيديوهات الكاملة تفتح عند الطلب، حتى ترى كيف ينتقل العمل من المصدر إلى مادة تعليمية.</p><div className="mt-10 grid gap-6 md:grid-cols-3">{videoSamples.map((video) => <article key={video.title} className="overflow-hidden rounded-2xl border border-[#E2E2DF] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)]"><div className="aspect-video bg-[#242424]"><iframe loading="lazy" className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`} title={video.title} onLoad={() => track('video_open', { video: video.title })} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="border-t-2 border-[#E3342F] p-5 text-right"><Video className="h-7 w-7 text-[#E3342F]" /><h3 className="mt-4 font-bold text-[#242424]">{video.title}</h3><p className="mt-2 text-sm leading-[1.8] text-[#666666]">شاهد الفيديو داخل الصفحة مباشرة دون الانتقال إلى صفحة أخرى.</p></div></article>)}</div></div>
      </section>

      <section className="border-t border-[#E2E2DF] bg-[#F7EDEC] px-5 py-16 md:py-24"><div className="mx-auto max-w-[980px]"><div className="text-center"><p className="mb-4 text-sm font-bold text-[#E3342F]">الخطوة الجاية واضحة</p><h2 className="text-3xl font-bold text-[#242424] md:text-5xl">هاي النماذج هي النتيجة — والكورس بيعلّمك الطريقة.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-[2] text-[#666666]">إذا بدك تبني مخرجات مشابهة من كتبك ودروسك، احجز مقعدك وخد تفاصيل الدفع والتفعيل عبر WhatsApp.</p></div><div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[#E2E2DF] bg-white p-7 shadow-[0_18px_45px_rgba(0,0,0,0.08)]"><div className="text-center"><p className="text-sm font-bold text-[#666666]">عرض التسجيل الحالي</p><div className="mt-3"><span className="text-xl font-bold text-[#666666] line-through decoration-2">79$</span><span className="mr-3 text-5xl font-black text-[#E3342F]">35$</span></div><p className="mt-2 text-sm font-bold text-[#666666]">أو قسطان مريحان: 17.5$ + 17.5$</p></div><div className="mt-7 grid gap-4 md:grid-cols-2"><div className="rounded-xl bg-[#F7EDEC] p-5"><p className="font-bold text-[#E3342F]">داخل سوريا</p><p className="mt-2 text-sm leading-[1.9] text-[#666666]">الهرم، الفؤاد، سيريتل كاش، بنك بيمو، وغيرها بتفعيل فوري ومباشر.</p></div><div className="rounded-xl bg-[#F0F0EE] p-5"><p className="font-bold text-[#E3342F]">خارج سوريا</p><p className="mt-2 text-sm leading-[1.9] text-[#666666]">PayPal، Western Union، والبطاقات البنكية الدولية حسب المتاح.</p></div></div><p className="mt-6 text-center text-sm font-bold leading-[1.9] text-[#242424]">الاشتراك والتفعيل الفوري متاح وبأسهل الطرق. اضغط على WhatsApp ليساعدك فريق الدعم باختيار الطريقة الأنسب.</p><a href={createWhatsAppLink('مرحباً، شاهدت نماذج المخرجات وأريد حجز مقعدي وتفعيل الكورس.')} onClick={() => track('whatsapp_click', { source: 'results_final_cta', affiliate_ref: affiliateRef || 'direct' })} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#E3342F] px-8 py-4 font-bold text-white hover:bg-[#B92723]">احجز مقعدك وابدأ تفعيل الكورس عبر الواتساب <MessageCircle className="h-5 w-5" /></a><p className="mt-4 text-center text-xs text-[#666666]">ضمان استرجاع كامل خلال 7 أيام · وصول دائم إلى الكورس</p></div></div></section>
    </div>
  )
}
