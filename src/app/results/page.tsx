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
  icon: typeof FileText
  kind: 'image' | 'file' | 'audio'
}

const localSamples: LocalSample[] = [
  {
    title: 'إنفوجرافيك علوم',
    subtitle: 'تحويل محتوى الدرس إلى ملخص بصري منظم',
    preview: '/samples/previews/chemistry-infographic.webp',
    file: '/samples/previews/chemistry-infographic.webp',
    fileLabel: 'فتح النموذج الكامل',
    icon: Sparkles,
    kind: 'image',
  },
  {
    title: 'خريطة ذهنية',
    subtitle: 'تنظيم الأفكار الأساسية من المصدر في صفحة واحدة',
    preview: '/samples/previews/chemistry-mindmap.webp',
    file: '/samples/previews/chemistry-mindmap.webp',
    fileLabel: 'فتح النموذج الكامل',
    icon: BookOpen,
    kind: 'image',
  },
  {
    title: 'مخطط كيمياء — PDF',
    subtitle: 'نموذج PDF محلي وجاهز للفتح أو التنزيل',
    preview: '/samples/previews/chemistry-blueprint.webp',
    file: '/samples/chemistry-blueprint.pdf',
    fileLabel: 'فتح أو تنزيل PDF',
    icon: FileText,
    kind: 'file',
  },
  {
    title: 'عرض تقديمي — كيمياء',
    subtitle: 'شرائح من محتوى الدرس، مع معاينة محلية خفيفة',
    preview: '/samples/previews/chemistry-slides.webp',
    file: 'https://docs.google.com/presentation/d/1tCPwC6a5DkkuzOyJyCdQzl-h-msNu_oo/edit?usp=sharing&ouid=108751952460291673147&rtpof=true&sd=true',
    fileLabel: 'فتح العرض',
    icon: Presentation,
    kind: 'file',
  },
  {
    title: 'إنفوجرافيك إنكليزي',
    subtitle: 'محتوى بصري من درس اللغة الإنكليزية',
    preview: '/samples/previews/english-infographic.webp',
    file: '/samples/previews/english-infographic.webp',
    fileLabel: 'فتح النموذج الكامل',
    icon: Sparkles,
    kind: 'image',
  },
  {
    title: 'عرض The Language Code',
    subtitle: 'ملف العرض الأصلي متاح للفتح عند الطلب',
    preview: '/samples/previews/english-presentation.webp',
    file: '/samples/english-presentation.pdf',
    fileLabel: 'فتح العرض',
    icon: FileOutput,
    kind: 'file',
  },
  {
    title: 'بودكاست تعليمي — إنكليزي',
    subtitle: 'ملف صوتي مستخرج من محتوى الدرس',
    file: '/samples/english-podcast.mp3',
    fileLabel: 'تنزيل الملف الصوتي',
    icon: Headphones,
    kind: 'audio',
  },
]

const videoSamples = [
  { title: 'فيديو تعليمي — علوم', href: 'https://drive.google.com/file/d/1gVPnr4gh-Oh7Nm2Js5KddZTXxVhofZJs/view' },
  { title: 'فيديو تعليمي — كيمياء', href: 'https://drive.google.com/file/d/1xIGeh3bGBgZvUdsKJCKwE21sYWe9-1Qo/view' },
  { title: 'فيديو تعليمي — إنكليزي', href: 'https://drive.google.com/file/d/12ZmG8cG2xTvXmHQYgebK3iSGYdZibJru/view' },
]


type FeaturedSample = { title: string; subtitle: string; image: string; tag: string; href?: string }
const featuredSamples: FeaturedSample[] = [
  {
    title: 'دليل دراسة اطراد المتتاليات',
    subtitle: 'تحويل درس رياضيات لدليل بصري بيساعدك تشرح الفكرة بوضوح.',
    image: '/samples/user/sequence-guide.webp',
    tag: 'دليل دراسة بصري',
  },
  {
    title: 'خريطة ذهنية لبنية الدرس',
    subtitle: 'ترتيب أفكار الدرس من الصورة الكبيرة للتفاصيل.',
    image: '/samples/user/mindmap-brain.png',
    tag: 'خريطة ذهنية',
  },
  {
    title: 'خريطة ذهنية تفصيلية',
    subtitle: 'تفريع المفاهيم الرئيسية بصفحة وحدة سهلة للمراجعة.',
    image: '/samples/user/mindmap-brain-detailed.png',
    tag: 'تنظيم المفاهيم',
  },
  {
    title: 'اختبار تدريبي من كتاب رياضيات البكالوريا',
    subtitle: 'نموذج ورقة امتحان تدريبية مستخرجة من كتاب رياضيات البكالوريا.',
    image: '/samples/user/math-baccalaureate-exam.webp',
    tag: 'اختبار وورقة امتحان',
  },
  {
    title: 'إنفوجرافيك علوم',
    subtitle: 'تحويل محتوى درس العلوم إلى ملخص بصري منظم.',
    image: '/samples/previews/chemistry-infographic.webp',
    tag: 'إنفوجرافيك علوم',
  },
  {
    title: 'عرض تقديمي — كيمياء',
    subtitle: 'عرض تعليمي من محتوى الدرس، افتحه من الرابط لمشاهدة الشرائح.',
    image: '/samples/previews/chemistry-slides.webp',
    href: 'https://docs.google.com/presentation/d/1tCPwC6a5DkkuzOyJyCdQzl-h-msNu_oo/edit?usp=sharing&ouid=108751952460291673147&rtpof=true&sd=true',
    tag: 'عرض تقديمي — كيمياء',
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
    <div dir="rtl" className="min-h-screen bg-[#FBFAF7] text-[#152238]" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>
      <nav className="sticky top-0 z-50 border-b border-[#DCE3E1] bg-[#FBFAF7]/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3">
          <Link href={homeHref} className="inline-flex items-center gap-2 text-sm font-bold text-[#5E6B78] hover:text-[#0F766E]"><ArrowRight className="h-5 w-5" /> العودة للكورس</Link>
          <a href={createWhatsAppLink('مرحباً، شاهدت صفحة النماذج وأريد تفاصيل التسجيل في الكورس.')} onClick={() => track('whatsapp_click', { source: 'results_nav', affiliate_ref: affiliateRef || 'direct' })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0F766E] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#115E59]">اطلب التفاصيل <MessageCircle className="h-4 w-4" /></a>
        </div>
      </nav>

      <header className="border-b border-[#DCE3E1] bg-[#EAF4F1]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <p className="mb-5 text-sm font-bold text-[#0F766E]">نماذج حقيقية من مخرجات الكورس</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.4] tracking-tight text-[#152238] md:text-6xl">شوف كيف بيتحوّل مصدرك إلى محتوى تعليمي بيحل مشكلة التحضير</h1>
          <p className="mt-6 max-w-3xl text-base leading-[2] text-[#5E6B78] md:text-xl">من مصدرك بتطلع شرح، اختبار، عرض تقديمي، خريطة ذهنية ومحتوى مرتب. هاي نماذج عملية بتفرجيك كيف بينتقل المعلم من الشغل المتكرر لشغل أذكى وأسرع، مع بقاء مراجعته هي الخطوة الأخيرة.</p>
        </div>
      </header>

      <section className="bg-[#FBFAF7]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-4 text-sm font-bold text-[#C89B3C]">رحلة مخرج واحدة</p><h2 className="text-3xl font-bold leading-[1.45] text-[#152238] md:text-5xl">من الفهم إلى التقييم</h2></div><p className="max-w-sm text-sm leading-[1.9] text-[#5E6B78]">اختر أي صورة لتشاهدها بحجمها الكامل. الهدف أن ترى الطريقة والنتيجة معًا.</p></div>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {featuredSamples.map((sample, i) => (
              <article key={sample.title} className={`group ${i === 3 ? 'md:col-span-2 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-8' : ''}`}>
                <a href={sample.href || sample.image} target="_blank" rel="noopener noreferrer" onClick={() => track('featured_sample_open', { sample: sample.title })} className="block overflow-hidden border border-[#C9D8D5] bg-white">
                  <img src={sample.image} alt={sample.title} className="h-64 w-full object-contain bg-[#F3F7F5] p-3 transition duration-500 group-hover:scale-[1.02] md:h-80" loading={i < 2 ? 'eager' : 'lazy'} />
                </a>
                <div className="mt-5 border-t-2 border-[#0F766E] pt-4"><p className="text-xs font-bold tracking-wide text-[#0F766E]">{sample.tag}</p><h3 className="mt-2 text-xl font-bold text-[#152238]">{sample.title}</h3><p className="mt-2 text-sm leading-[1.9] text-[#5E6B78]">{sample.subtitle}</p><a href={sample.href || sample.image} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0F766E] underline decoration-[#C89B3C] decoration-2 underline-offset-8">فتح النموذج <ExternalLink className="h-4 w-4" /></a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#DCE3E1] bg-[#152238] text-white">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20"><div className="max-w-3xl"><p className="mb-4 text-sm font-bold text-[#D9B96C]">ما الذي تثبته هذه النماذج؟</p><h2 className="text-3xl font-bold leading-[1.45] md:text-5xl">ليست ملفات منفصلة؛ إنها خطوات لحل مشكلة التحضير.</h2></div><div className="mt-10 grid gap-8 md:grid-cols-4">{['تنظيم الدرس بصريًا','استخراج الأفكار والأسئلة','بناء اختبار متنوع','إخراج ورقة امتحان واضحة'].map((text, i) => <div key={text} className="border-t border-white/25 pt-4"><span className="text-sm font-bold text-[#D9B96C]">0{i + 1}</span><p className="mt-3 font-bold text-white">{text}</p></div>)}</div></div>
      </section>

      <section className="bg-[#F3F7F5]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24"><div className="max-w-2xl"><p className="mb-4 text-sm font-bold text-[#0F766E]">مخرجات أخرى</p><h2 className="text-3xl font-bold text-[#152238] md:text-5xl">شرح، PDF، عروض وصوتيات</h2><p className="mt-5 text-base leading-[2] text-[#5E6B78]">غير الاختبار والامتحان، فيك تبني مخرجات متعددة من نفس المصدر.</p></div><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{localSamples.filter((sample) => !['مخطط كيمياء — PDF', 'عرض تقديمي — كيمياء'].includes(sample.title)).map((sample) => { const Icon = sample.icon; return (<article key={sample.title} className="overflow-hidden border border-[#C9D8D5] bg-[#FBFAF7]"><div className="flex h-48 items-center justify-center bg-white">{sample.preview ? <img src={sample.preview} alt={`معاينة ${sample.title}`} className="h-full w-full object-contain p-3" loading="lazy" /> : <Icon className="h-14 w-14 text-[#0F766E]" />}</div><div className="p-5"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-[#0F766E]" /><h3 className="font-bold text-[#152238]">{sample.title}</h3></div><p className="mt-3 min-h-12 text-sm leading-[1.9] text-[#5E6B78]">{sample.subtitle}</p><a href={sample.file} onClick={() => track('sample_open', { sample: sample.title, kind: sample.kind })} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0F766E]">فتح النموذج <ExternalLink className="h-4 w-4" /></a></div></article>) })}</div></div>
      </section>

      <section className="bg-[#FBFAF7]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 text-center md:px-8 md:py-24"><p className="mb-4 text-sm font-bold text-[#C89B3C]">فيديوهات من التطبيق</p><h2 className="text-3xl font-bold text-[#152238] md:text-5xl">شاهد الطريقة أثناء التنفيذ</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-[2] text-[#5E6B78]">الفيديوهات الكاملة تفتح عند الطلب، حتى ترى كيف ينتقل العمل من المصدر إلى مادة تعليمية.</p><div className="mt-10 grid gap-6 md:grid-cols-3">{videoSamples.map((video) => <a key={video.title} href={video.href} onClick={() => track('video_open', { video: video.title })} target="_blank" rel="noopener noreferrer" className="border-t-2 border-[#0F766E] bg-[#F3F7F5] p-6 text-right transition hover:bg-[#EAF4F1]"><Video className="h-7 w-7 text-[#0F766E]" /><h3 className="mt-5 font-bold text-[#152238]">{video.title}</h3><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#0F766E]">فتح الفيديو <ExternalLink className="h-4 w-4" /></span></a>)}</div></div>
      </section>

      <section className="border-t border-[#DCE3E1] bg-[#EAF4F1] px-5 py-16 text-center md:py-20"><div className="mx-auto max-w-2xl"><h2 className="text-3xl font-bold text-[#152238] md:text-5xl">هاي النماذج هي النتيجة — والكورس بيعلّمك الطريقة.</h2><p className="mt-5 text-base leading-[2] text-[#5E6B78]">إذا بدك تبني مخرجات مشابهة من كتبك ودروسك، اسأل عن تفاصيل التسجيل وطريقة الدفع عبر واتساب.</p><a href={createWhatsAppLink('مرحباً، شاهدت نماذج المخرجات وأريد تفاصيل التسجيل في الكورس.')} onClick={() => track('whatsapp_click', { source: 'results_final_cta', affiliate_ref: affiliateRef || 'direct' })} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#0F766E] px-8 py-4 font-bold text-white hover:bg-[#115E59]">اطلب تفاصيل التسجيل <MessageCircle className="h-5 w-5" /></a></div></section>
    </div>
  )
}
