'use client'

import Link from 'next/link'
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
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً، شاهدت نماذج المخرجات وأريد تفاصيل الكورس المتكامل لأدوات الذكاء الاصطناعي.')}`

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
    title: 'إنفوجرافيك كيمياء',
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
    file: '/samples/chemistry-slides.pdf',
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

export default function ResultsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white text-[#1E293B]" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>
      <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#0D9488]">
            <ArrowRight className="h-5 w-5" />
            العودة للكورس
          </Link>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0B7C72]">
            اطلب التفاصيل
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </nav>

      <section className="bg-[#F8FAFC] px-4 py-14 text-center md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0D9488]/20 bg-[#0D9488]/10 px-5 py-2 text-sm font-bold text-[#0D9488]">
            <Sparkles className="h-4 w-4" />
            نماذج محلية من مخرجات الكورس
          </div>
          <h1 className="mb-5 text-3xl font-bold leading-[1.4] text-[#1B2A4A] md:text-5xl">شاهد مخرجات عملية قبل التسجيل</h1>
          <p className="mx-auto max-w-2xl text-base leading-loose text-[#64748B] md:text-lg">
            هذه عينات من الشروحات والملخصات والـPDF والعروض والصوتيات. نستخدم المصدر الذي يرفعه المعلم، ثم نراجع الناتج قبل مشاركته مع الطلاب.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#1B2A4A] md:text-4xl">نماذج جاهزة للفتح</h2>
            <p className="text-sm leading-loose text-[#64748B]">تظهر المعاينة بسرعة من الموقع، والملف الكامل يفتح فقط عندما تطلبه.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {localSamples.map((sample) => {
              const Icon = sample.icon
              return (
                <article key={sample.title} className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
                  {sample.preview ? (
                    <img src={sample.preview} alt={`معاينة ${sample.title}`} className="h-52 w-full bg-[#F8FAFC] object-contain p-2" loading="lazy" />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-[#F8FAFC]">
                      <Icon className="h-14 w-14 text-[#0D9488]" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0D9488]/10"><Icon className="h-4 w-4 text-[#0D9488]" /></div>
                      <h3 className="font-bold text-[#1B2A4A]">{sample.title}</h3>
                    </div>
                    <p className="mb-4 min-h-12 text-sm leading-loose text-[#64748B]">{sample.subtitle}</p>
                    {sample.kind === 'audio' && (
                      <audio controls preload="none" className="mb-4 w-full">
                        <source src={sample.file} type="audio/mpeg" />
                        متصفحك لا يدعم تشغيل الملف الصوتي.
                      </audio>
                    )}
                    <a href={sample.file} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0D9488] px-4 py-2.5 text-sm font-bold text-[#0D9488] hover:bg-[#0D9488] hover:text-white">
                      {sample.kind === 'image' ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                      {sample.fileLabel}
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#1B2A4A] md:text-4xl">فيديوهات تعليمية</h2>
            <p className="text-sm leading-loose text-[#64748B]">الفيديوهات الكاملة تبقى مستضافة خارجيًا حتى لا تثقل الموقع، وتفتح عند الطلب فقط.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {videoSamples.map((video) => (
              <a key={video.title} href={video.href} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center hover:border-[#0D9488]">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0D9488]/10"><Video className="h-6 w-6 text-[#0D9488]" /></div>
                <h3 className="mb-3 font-bold text-[#1B2A4A]">{video.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0D9488]">فتح الفيديو <ExternalLink className="h-4 w-4" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center md:py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#0D9488]/20 bg-[#0D9488]/5 p-8">
          <h2 className="mb-3 text-2xl font-bold text-[#1B2A4A] md:text-3xl">هذه مجرد عينات — داخل الكورس تتعلم الطريقة</h2>
          <p className="mb-6 leading-loose text-[#64748B]">لا نبيع ملفات جاهزة فقط؛ نتعلم كيف تبدأ من المصدر، تكتب Prompt واضحًا، تراجع النتيجة، ثم تخرجها بالشكل المناسب لطلابك.</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#0D9488] px-8 py-4 font-bold text-white hover:bg-[#0B7C72]">
            اطلب تفاصيل التسجيل
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  )
}
