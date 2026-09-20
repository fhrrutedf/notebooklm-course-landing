'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileOutput,
  FileText,
  Headphones,
  LayoutGrid,
  MessageCircle,
  Play,
  Presentation,
  School,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react'

const WHATSAPP_NUMBER = '963985323170'

// الألوان المتناسقة
const red = '#E3342F'
const redDark = '#B92723'
const paper = '#FAFAF8'
const ink = '#242424'
const line = '#E2E2DF'
const soft = '#F8F8F6'

// نماذج المرحلة الأولى: فهم المصدر وبناء الشرح والخرائط الذهنية
const phase1Samples = [
  {
    title: 'دليل دراسة اطراد المتتاليات',
    subtitle: 'تحويل درس رياضيات معقد من كتاب المنهج إلى دليل دراسة بصري متكامل يساعد المعلم على الشرح بوضوح ويثبت الفكرة عند الطالب.',
    image: '/samples/user/sequence-guide.webp',
    tag: 'المرحلة 01: دليل دراسة بصري',
    time: '4 دقائق فقط',
    action: 'تصفّح الدليل الدراسي بحجمه الكامل',
    badge: 'من كتاب المنهج إلى ملخص بصري',
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
    title: 'ورقة امتحان رياضيات للمرحلة الثانوية (جاهزة للطباعة)',
    subtitle: 'نموذج ورقة امتحان رسمية كاملة مستخرجة من كتاب الرياضيات: تشمل الترويسة المدرسية، بيانات الطالب، الأسئلة المتدرجة، سلم التصحيح النموذجي، وهوامش مريحة للطباعة الفورية.',
    image: '/samples/user/math-baccalaureate-exam.webp',
    tag: 'المرحلة 02: ورقة امتحان رسمية',
    time: '18 دقيقة للطباعة النهائية',
    action: 'افتح ورقة الامتحان الجاهزة للطباعة',
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

// نماذج المرحلة الثالثة: الوسائط التعليمية المتعددة
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

export default function SchoolsResultsClient() {
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [modalTitle, setModalTitle] = useState<string>('')

  const openImageModal = (imageSrc: string, title: string) => {
    setModalImage(imageSrc)
    setModalTitle(title)
  }

  const createWhatsAppLink = (msg: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

  return (
    <main
      dir="rtl"
      className="min-h-screen text-[#242424]"
      style={{
        backgroundColor: paper,
        fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif',
      }}
    >
      {/* شريط الإعلان والتنقل العلوي للمؤسسات */}
      <div className="bg-[#242424] px-4 py-2 text-center text-xs md:text-sm font-semibold text-white/90">
        <span>نماذج مخرجات التدريب المؤسسي للمدارس والمعاهد التعليمية</span>
        <span className="mx-2 text-white/40">•</span>
        <Link
          href="/schools"
          className="inline-flex items-center gap-1 font-bold text-amber-300 hover:text-white transition underline underline-offset-2"
        >
          <span>العودة لصفحة تفاصيل برامج المؤسسات</span>
          <ArrowLeft className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* شريط التنقل */}
      <header className="sticky top-0 z-40 border-b bg-white/95 px-5 py-4 backdrop-blur-md" style={{ borderColor: line }}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm" style={{ backgroundColor: red }}>
              <School className="h-5 w-5" />
            </span>
            <div>
              <div className="text-base md:text-lg font-black tracking-tight text-[#242424]">
                كورس الذكاء الاصطناعي للمعلمين
              </div>
              <div className="text-xs font-bold text-[#E3342F]">
                معرض المخرجات والنماذج المؤسسية
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/schools"
              className="hidden text-sm font-bold text-[#555555] hover:text-[#242424] sm:inline-block transition"
            >
              صفحة المؤسسات
            </Link>
            <Link
              href="/schools#request"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs md:text-sm font-bold text-white shadow transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: red }}
            >
              <span>اطلب عرضاً لمؤسستك</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-5 py-12 md:px-8 md:py-16 text-center border-b bg-white" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F7EDEC] px-4 py-1.5 text-xs md:text-sm font-black text-[#B92723] mb-4 border border-red-100">
            <Sparkles className="h-4 w-4 text-[#E3342F]" />
            <span>نماذج تطبيقية حقيقية أُنتجت بالبدء من كتب المناهج المدرسية</span>
          </div>

          <h1 className="text-3xl font-black leading-[1.3] text-[#242424] md:text-5xl">
            ما الذي يستطيع فريق المعلمين في مؤسستك إنتاجه؟
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[17px] md:text-lg leading-[1.9] text-[#555555]">
            تصفّح عينات واقعية من أوراق الامتحانات، المذكرات، العروض التقديمية، والوسائط التعليمية التي يتعلم كادركم إعدادها بدقة ومراجعتها قبل اعتمادها.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-bold text-[#666666]">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ مطابقة لمناهجكم
            </span>
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ مراجعة وتدقيق المعلم
            </span>
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ جاهزة للطباعة والاستخدام الفوري
            </span>
          </div>
        </div>
      </section>

      {/* المرحلة 01: فهم المصدر والشرح */}
      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-8">
            <span className="text-xs font-black text-[#E3342F] uppercase tracking-wider">
              المرحلة 01
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#242424] mt-1">
              تحليل كتب المناهج وبناء الشروح والخرائط الذهنية
            </h2>
            <p className="text-sm md:text-base text-[#666666] mt-1">
              كيف يحوّل المعلم درساً معقداً أو ملاحظات خط اليد إلى مذكرات بصرية وخرائط مفاهيم متكاملة.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {phase1Samples.map((sample, idx) => (
              <div
                key={idx}
                className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                style={{ borderColor: line }}
              >
                <div
                  className="relative h-64 w-full cursor-pointer bg-slate-100 overflow-hidden group"
                  onClick={() => openImageModal(sample.image, sample.title)}
                >
                  <Image
                    src={sample.image}
                    alt={sample.title}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                    <ExternalLink className="h-4 w-4" />
                    <span>انقر لتكبير النموذج بحجم كامل</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                      {sample.tag}
                    </span>
                    <span className="text-xs font-semibold text-[#E3342F] flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {sample.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#242424] mb-1.5">
                    {sample.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#555555] leading-relaxed mb-4">
                    {sample.subtitle}
                  </p>

                  <button
                    type="button"
                    onClick={() => openImageModal(sample.image, sample.title)}
                    className="w-full rounded-xl py-2.5 px-4 text-xs font-bold text-[#242424] bg-slate-100 hover:bg-slate-200 transition text-center"
                  >
                    {sample.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* المرحلة 02: أوراق الامتحانات وبنوك الأسئلة */}
      <section className="border-t bg-white px-5 py-14 md:px-8 md:py-18" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-8">
            <span className="text-xs font-black text-[#E3342F] uppercase tracking-wider">
              المرحلة 02
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#242424] mt-1">
              أتمتة الاختبارات وصناعة أوراق الامتحانات الرسمية
            </h2>
            <p className="text-sm md:text-base text-[#666666] mt-1">
              صياغة أوراق امتحانية وزارية ومدرسية مع مفاتيح الإجابة وسلالم التصحيح النموذجية.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {phase2Samples.map((sample, idx) => (
              <div
                key={idx}
                className="rounded-2xl border bg-[#FAFAF8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                style={{ borderColor: line }}
              >
                <div
                  className="relative h-72 w-full cursor-pointer bg-slate-100 overflow-hidden group"
                  onClick={() => openImageModal(sample.image, sample.title)}
                >
                  <Image
                    src={sample.image}
                    alt={sample.title}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                    <ExternalLink className="h-4 w-4" />
                    <span>انقر لتكبير ورقة الامتحان</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {sample.badge}
                    </span>
                    <span className="text-xs font-semibold text-[#E3342F] flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {sample.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#242424] mb-2">
                    {sample.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#555555] leading-relaxed mb-4">
                    {sample.subtitle}
                  </p>

                  <button
                    type="button"
                    onClick={() => openImageModal(sample.image, sample.title)}
                    className="w-full rounded-xl py-2.5 px-4 text-xs font-bold text-white bg-[#242424] hover:bg-[#333333] transition text-center"
                  >
                    {sample.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* المرحلة 03: عروض تقديمية، إنفوجرافيك، بودكاست وفيديو */}
      <section className="border-t px-5 py-14 md:px-8 md:py-18" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-8">
            <span className="text-xs font-black text-[#E3342F] uppercase tracking-wider">
              المرحلة 03
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#242424] mt-1">
              الوسائط التعليمية المتعددة (عروض، بودكاست، وفيديو)
            </h2>
            <p className="text-sm md:text-base text-[#666666] mt-1">
              تجهيز محتوى تفاعلي يدعم الشرح الصفي والمنصات التعليمية للتعلم الذاتي.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {phase3MediaSamples.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col justify-between"
                style={{ borderColor: line }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                      {item.tag}
                    </span>
                    <span className="text-xs font-bold text-[#E3342F]">{item.badge}</span>
                  </div>

                  <h3 className="text-lg font-black text-[#242424] mb-2">{item.title}</h3>
                  <p className="text-xs md:text-sm text-[#555555] leading-relaxed mb-4">
                    {item.subtitle}
                  </p>

                  {item.audioSrc && (
                    <div className="rounded-xl bg-[#F8F8F6] p-3 border border-[#E2E2DF] mb-3">
                      <audio controls className="w-full">
                        <source src={item.audioSrc} type="audio/mp3" />
                        متصفحك لا يدعم مشغل الصوت.
                      </audio>
                    </div>
                  )}

                  {item.preview && (
                    <div
                      className="relative h-44 w-full cursor-pointer bg-slate-100 rounded-xl overflow-hidden mb-3 border border-slate-200"
                      onClick={() => openImageModal(item.preview!, item.title)}
                    >
                      <Image src={item.preview} alt={item.title} fill className="object-cover" />
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-[#242424] hover:bg-slate-200 transition"
                  >
                    <FileOutput className="h-4 w-4 text-[#555555]" />
                    <span>تحميل أو استعراض الملف كاملاً</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* نماذج الفيديو التعليمي */}
          <div className="mt-12">
            <h3 className="text-xl font-black text-[#242424] mb-4 text-right">
              عينات الفيديو التعليمي بالذكاء الاصطناعي
            </h3>
            <div className="grid gap-5 sm:grid-cols-3">
              {videoSamples.map((v, i) => (
                <div key={i} className="rounded-2xl border bg-white overflow-hidden shadow-sm" style={{ borderColor: line }}>
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                      title={v.title}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-[#242424] mb-1">{v.title}</h4>
                    <p className="text-xs text-[#666666] leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* قسم الدعوة المؤسسية الختامية (مخصص للمؤسسات بدون أسعار الأفراد) */}
      <section className="border-t bg-white px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[980px]">
          <div className="text-center">
            <span className="rounded-full bg-[#F7EDEC] px-4 py-1.5 text-xs md:text-sm font-black text-[#B92723] border border-red-100">
              برنامج التدريب المؤسسي المخصص
            </span>
            <h2 className="mt-4 text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              هذه النماذج هي المخرجات — وبرنامج التدريب يُمكّن كادركم من إنتاجها
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] md:text-lg leading-[1.9] text-[#555555]">
              يمكن لفريق المعلمين في مدرستكم أو معهدكم إنتاج مخرجات مطابقة لمنهجكم بنفس هذا المستوى من التنظيم والدقة، مع بقاء المراجعة والقرار التربوي بيد المعلم.
            </p>
          </div>

          {/* بطاقة الباقات المؤسسية الإرشادية */}
          <div className="mx-auto mt-10 rounded-3xl border border-[#E2E2DF] bg-[#FAFAF8] p-6 md:p-9 shadow-[0_12px_35px_rgba(0,0,0,0.04)]">
            <div className="text-center mb-6">
              <h3 className="text-xl font-black text-[#242424]">
                اختر نقطة البداية المناسبة لمؤسستك
              </h3>
              <p className="mt-1 text-xs md:text-sm text-[#666666]">
                أسعار إرشادية مرنة ويُحدَّد العرض النهائي حسب عدد المعلمين والمواد ونوع التدريب:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <div className="rounded-2xl bg-white border border-[#E2E2DF] p-4 text-center">
                <span className="block text-xs font-bold text-[#888888] mb-1">تجربة فريق صغيرة</span>
                <span className="block text-sm font-bold text-[#E3342F] mb-2">5 معلمين</span>
                <span className="block text-base font-black text-[#242424]">تبدأ من 995 ر.س</span>
              </div>

              <div className="rounded-2xl bg-white border-2 border-[#E3342F] p-4 text-center shadow-sm relative">
                <span className="absolute -top-2.5 right-1/2 translate-x-1/2 bg-[#E3342F] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  الأنسب للمعاهد والمدارس
                </span>
                <span className="block text-xs font-bold text-[#888888] mb-1">تدريب قسم أو معهد</span>
                <span className="block text-sm font-bold text-[#E3342F] mb-2">10 معلمين</span>
                <span className="block text-base font-black text-[#242424]">تبدأ من 1,790 ر.س</span>
              </div>

              <div className="rounded-2xl bg-white border border-[#E2E2DF] p-4 text-center">
                <span className="block text-xs font-bold text-[#888888] mb-1">برنامج مؤسسي متكامل</span>
                <span className="block text-sm font-bold text-[#E3342F] mb-2">20 معلمًا أو أكثر</span>
                <span className="block text-sm font-black text-[#242424]">يُحدّد حسب النطاق</span>
              </div>
            </div>

            <p className="text-center text-xs text-[#777777] mb-6">
              💡 كلما زاد عدد المعلمين، انخفضت تكلفة المقعد الواحد. ويتضمن العرض فواتير رسمية ودعم الدفع عبر مدى، فيزا/ماستركارد، تكرام باي، والتحويل البنكي.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/schools#request"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-black text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                style={{
                  backgroundColor: red,
                  backgroundImage: 'linear-gradient(135deg, #E3342F 0%, #B92723 100%)',
                }}
              >
                <span>اطلب عرضًا مخصصًا لمؤسستك</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>

              <a
                href={createWhatsAppLink('مرحباً، شاهدت صفحة نماذج مخرجات المؤسسات وأرغب بمناقشة تدريب كادر مدرستنا.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#E2E2DF] bg-white px-7 py-4 text-sm font-bold text-[#242424] hover:bg-[#F0F0EE] shadow-sm transition"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>تواصل عبر WhatsApp لمناقشة الاحتياج</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* الشريط العائم للموبايل الخاص بالمؤسسات */}
      <div className="fixed inset-x-3 bottom-3 z-50 flex items-center gap-2 md:hidden">
        <Link
          href="/schools#request"
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-3 text-xs font-bold text-white shadow-xl active:scale-95"
          style={{ backgroundColor: red }}
        >
          <span>اطلب عرضاً لمؤسستك</span>
          <ArrowLeft className="h-3.5 w-3.5" />
        </Link>
        <a
          href={createWhatsAppLink('مرحباً، أود الاستفسار عن تدريب فريق المعلمين بالذكاء الاصطناعي لمؤسستنا.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-3.5 py-3 text-xs font-bold text-slate-800 border border-slate-200 shadow-xl active:scale-95"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" />
          <span>واتساب</span>
        </a>
      </div>

      {/* نافذة تكبير الصور (Modal) */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-2xl bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-2 mb-2">
              <h4 className="text-sm font-black text-[#242424] truncate">{modalTitle}</h4>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="rounded-full p-1 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative h-[75vh] w-full overflow-auto">
              <Image src={modalImage} alt={modalTitle} fill className="object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* الفوتر */}
      <footer className="border-t border-white/10 bg-[#242424] px-5 py-8 text-center text-sm text-white">
        © {new Date().getFullYear()} — كورس الذكاء الاصطناعي للمعلمين · برامج التدريب المؤسسي <span className="mx-2 text-white/40">·</span>{' '}
        <Link href="/schools" className="underline hover:text-[#E3342F]">
          صفحة المؤسسات الرئيسية
        </Link>
        <span className="mx-2 text-white/40">·</span>
        <Link href="/" className="underline hover:text-[#E3342F]">
          صفحة التسجيل الفردي
        </Link>
      </footer>
    </main>
  )
}
