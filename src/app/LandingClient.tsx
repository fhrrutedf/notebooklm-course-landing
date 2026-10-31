'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Lock,
  MessageCircle,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react'
import { RegistrationModal } from '@/components/RegistrationModal'
import { affiliateMessageSuffix, resolveAffiliateRef } from '@/lib/affiliate'

const WHATSAPP_PHONE = '963992596461'
const COURSE_PRICE = '22$'
const ORIGINAL_PRICE = '39$'

// 11 مادة مع روابط Google Drive وصور المعاينة
const subjectCards = [
  {
    name: 'رياضيات',
    driveUrl: 'https://drive.google.com/drive/folders/1tgdM54omePUYnnI8X8iHyBLHICfWbWKl',
    image: '/samples/user/math-baccalaureate-exam.webp',
    tag: 'ورقة امتحان بكالوريا ودليل دراسة',
  },
  {
    name: 'فيزياء',
    driveUrl: 'https://drive.google.com/drive/folders/1RqFCNkZs6Dp3GPIi69dW-X4UZsbKnjSz',
    image: '/samples/previews/chemistry-blueprint.webp',
    tag: 'مخطط تجارب وأسئلة تفكير نقدي',
  },
  {
    name: 'كيمياء',
    driveUrl: 'https://drive.google.com/drive/folders/1fS0XY3EZSmRQXIlDrd29vmyKuNkfL-g2',
    image: '/samples/previews/chemistry-infographic.webp',
    tag: 'إنفوجرافيك وتلخيص مفاهيم وتفاعلات',
  },
  {
    name: 'علوم',
    driveUrl: 'https://drive.google.com/drive/folders/1bjoEZunlbPleI0hgym6-BVLoTxopXI7F',
    image: '/samples/user/mindmap-brain-detailed.png',
    tag: 'خرائط ذهنية مفصلة لأجهزة الجسم',
  },
  {
    name: 'عربي',
    driveUrl: 'https://drive.google.com/drive/folders/1Cjcpur7e6Fa6ygi93DMDFEuiAUAxNSMk',
    image: '/samples/user/handwriting-to-ai-summary.png',
    tag: 'من خط اليد إلى قواعد وتدريبات رقمية',
  },
  {
    name: 'إنكليزي',
    driveUrl: 'https://drive.google.com/drive/folders/1o3wsfIPGiEyv2h-zn8oJ01SIgtv1frBm',
    image: '/samples/previews/english-presentation.webp',
    tag: 'عروض تقديمية وبطاقات محادثة',
  },
  {
    name: 'فرنسي',
    driveUrl: 'https://drive.google.com/drive/folders/17BoRMuGiZz3Eot-UBQLBK4oTlOTOdXle',
    image: '/samples/user/story-oral-exercise.png',
    tag: 'أنشطة قصة وتطبيق شفهي تفاعلي',
  },
  {
    name: 'تاريخ',
    driveUrl: 'https://drive.google.com/drive/folders/1Qc8MRelcmZ2er8ovbKnbA50an4Ejk4vw',
    image: '/example-lesson-plan.png',
    tag: 'جداول أحداث وخطط دروس موثقة',
  },
  {
    name: 'جغرافيا',
    driveUrl: 'https://drive.google.com/drive/folders/1OsOZD7uIdJ1IfW-mkIlbISbyLBGYv4Iw',
    image: '/samples/user/lesson-explanation.png',
    tag: 'خريطة شرح ومفاهيم بيئية وجغرافية',
  },
  {
    name: 'فلسفة',
    driveUrl: 'https://drive.google.com/drive/folders/1dWAo-BtIVxM2RaZ4sHCpNyskBpUC4C-R',
    image: '/samples/user/mindmap-brain.png',
    tag: 'خريطة تفكير نقدي ونقاشات فلسفية',
  },
  {
    name: 'إسلامية',
    driveUrl: 'https://drive.google.com/drive/folders/11Y178TMSwKE_tVmzxgkfJ8ZMb4E69bgf',
    image: '/example-pdf.png',
    tag: 'مذكرة أحكام وأسئلة استنتاجية مرتبة',
  },
]

// نتائج الكورس الـ 16 دون أي مدد أو أوقات أو عدد محاضرات
const courseOutcomes = [
  'مساعد ذكي من كتبك يجاوبك منها فقط.',
  'مذكرة PDF جاهزة من فصل كامل.',
  'ورقة امتحان كاملة جاهزة للطباعة.',
  'أسرار الاختبارات من الإنشاء للتصدير.',
  'بنك أسئلة وبطاقات مراجعة وخطة أسبوعية ومكتبة أوامر.',
  'مكتبة ذكية فيها فيديوهات يوتيوب.',
  'فيديو تعليمي متحرك من النص.',
  'مخطط بصري لمنهجك (خرائط ذهنية).',
  'تقرير بحثي منظم بمصادره.',
  'إنفوجرافيك تعليمي بالطريقة الصحيحة.',
  'أسرار الدردشة الخفية للمحترفين.',
  'فيديو مراجعة وافتتاحية وختامية من دروسك.',
  'منصة تعليمية وسيستم متابعة لطلابك. 🆕',
  'ألعاب فيديو وألعاب تفاعلية تعليمية. 🆕',
  'نوطة باسمك لمادة كاملة. 🆕',
  'حضور كمعلم على السوشيال ميديا وتصاميم لدوراتك. 🆕',
]

// 5 أسئلة شائعة مختصرة فقط وبدون ذكر أدوات
const faqs = [
  {
    q: 'ما هو نظام الكورس: مسجّل أم مباشر؟',
    a: 'الكورس يجمع بين الاثنين: محتوى أساسي مسجّل (5 ساعات ونصف مقسمة على 20 محاضرة عملية) تتابعه في أي وقت ومن هاتفك دون قيود، بالإضافة إلى 4 جلسات تفاعلية مباشرة للأسئلة والأجوبة والتطبيق العملي مع المدرب.',
  },
  {
    q: 'هل أحتاج جهاز لابتوب أو كمبيوتر للبدء والتطبيق؟',
    a: 'لا، لا يُشترط وجود لابتوب! الكورس مصمم بحيث يمكنك مشاهدة الدروس وتطبيق جميع الخطوات وبناء الشروحات والامتحانات والمحتوى التعليمي مباشرة من هاتفك المحمول أو جهازك اللوحي بسهولة.',
  },
  {
    q: 'هل الأدوات المستخدمة مجانية أم تتطلب اشتراكات؟',
    a: 'المسار التدريبي يعتمد على أدوات ذكاء اصطناعي توفر خططاً مجانية، ولا توجد أي رسوم أو تكاليف خفية ضمن رسوم الكورس.',
  },
  {
    q: 'كيف أطلب استرجاع المبلغ إذا لم يناسبني الكورس؟',
    a: 'نقدم ضمان استرجاع كامل لمدة 7 أيام. يمكنك طلب الاسترجاع بكل بساطة وبدون أي تعقيد عبر رسالة واحدة إلى رقم WhatsApp الخاص بنا وسيتم إعادة المبلغ لك.',
  },
  {
    q: 'كيف يتم الدفع والوصول للكورس؟',
    a: 'من داخل سوريا الدفع فوري وبسيط عبر شام كاش، ومن خارج سوريا الدفع متاح بالبطاقات البنكية الدولية (فيزا / ماستركارد)، مدى، وبايبال. وفور إتمام الدفع، يتم تفعيل حسابك مباشرة واستلام رابط الوصول الدائم عبر Telegram.',
  },
]

export default function LandingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)

  const getWhatsAppLink = (message: string) => {
    let suffix = ''
    if (typeof window !== 'undefined') {
      const ref = resolveAffiliateRef(window.location.search) || window.localStorage.getItem('course_affiliate_ref') || ''
      suffix = affiliateMessageSuffix(ref)
    }
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`${message}${suffix}`)}`
  }

  const primaryWhatsAppUrl = getWhatsAppLink('مرحباً، أريد الاشتراك في كورس الذكاء الاصطناعي للمعلمين (22$).')

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#FBFBFA] text-[#141414] antialiased selection:bg-[#E31E24] selection:text-white"
      style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), system-ui, sans-serif' }}
    >
      {/* رأس الصفحة الثابت */}
      <header className="sticky top-0 z-40 border-b border-[#E7E7E4] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E31E24] text-white shadow-sm">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="text-sm font-black text-[#141414] sm:text-base">
              الذكاء الاصطناعي للمعلمين
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#20ba59]"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
              <span>تواصل واتساب</span>
            </a>
            <button
              type="button"
              onClick={() => setIsRegistrationModalOpen(true)}
              className="inline-flex items-center gap-1 rounded-full bg-[#E31E24] px-4 py-1.5 text-xs font-black text-white shadow-sm transition hover:bg-[#B92723]"
            >
              <Lock className="h-3 w-3" />
              <span>سجّل الآن ({COURSE_PRICE})</span>
            </button>
          </div>
        </div>
      </header>

      {/* 1. العنوان (Hero Section) */}
      <section className="px-4 pt-10 pb-12 sm:px-6 md:pt-16 md:pb-16 text-center">
        <div className="mx-auto max-w-4xl">
          {/* شارات الموثوقية الثلاث */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-[#444] mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800">
              <Smartphone className="h-3.5 w-3.5 text-emerald-600" />
              لا يُشترط لابتوب
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-800">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              أدوات متاحة مجاناً
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-purple-800">
              <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
              وصول دائم
            </span>
          </div>

          {/* العنوان المطلوب نصاً */}
          <h1 className="text-3xl font-black leading-[1.3] text-[#141414] sm:text-4xl md:text-5xl lg:text-5xl">
            من كتابك إلى درسٍ جاهز. بذكاء، وبوقتك
          </h1>

          {/* السطر المطلوب نصاً مع الوعد المزدوج */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.9] text-[#444] sm:text-lg">
            تعلّم كيف تحوّل المنهج إلى شرح مبسّط وأسئلة ومخرجات تعليمية من هاتفك، مع بقاء المراجعة والقرار التربوي بيدك.
          </p>

          <p className="mt-3 text-xs sm:text-sm font-black text-[#E31E24]">
            ⚡ يختصر وقت التحضير الأسبوعي، وبنفس الوقت يجعلك معلماً محترفاً ومتميزاً أمام طلابك.
          </p>

          {/* السعر المحدد */}
          <div className="mt-6 flex items-baseline justify-center gap-2.5">
            <span className="text-sm font-bold text-[#777]">سعر الكورس:</span>
            <span className="text-4xl sm:text-5xl font-black text-[#E31E24]">{COURSE_PRICE}</span>
            <span className="text-lg font-bold text-[#888] line-through decoration-2">{ORIGINAL_PRICE}</span>
          </div>

          {/* الأزرار: زر واتساب أولاً وزر التسجيل ثانياً */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-base font-black text-white shadow-lg transition hover:bg-[#20ba59] active:scale-98"
            >
              <MessageCircle className="h-5 w-5 fill-current" />
              <span>تواصل وسجّل عبر WhatsApp (أولاً)</span>
            </a>

            <button
              type="button"
              onClick={() => setIsRegistrationModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#141414] bg-[#141414] px-7 py-3.5 text-base font-black text-white shadow-md transition hover:bg-black active:scale-98"
            >
              <Lock className="h-4 w-4 text-[#E31E24]" />
              <span>التسجيل المباشر عبر البوابة ({COURSE_PRICE})</span>
            </button>
          </div>

          <p className="mt-3 text-[11px] text-[#777]">
            🔒 وصول دائم وفوري عبر Telegram · ضمان استرجاع كامل لمدة 7 أيام
          </p>
        </div>
      </section>

      {/* 2. شريط أرقام */}
      <section className="border-y border-[#E7E7E4] bg-white py-6 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            <div className="p-2">
              <span className="block text-2xl sm:text-3xl font-black text-[#E31E24]">20</span>
              <span className="mt-1 block text-xs sm:text-sm font-bold text-[#444]">محاضرة مسجلة</span>
            </div>
            <div className="p-2 border-r border-[#E7E7E4]">
              <span className="block text-2xl sm:text-3xl font-black text-[#E31E24]">5.5</span>
              <span className="mt-1 block text-xs sm:text-sm font-bold text-[#444]">ساعات عملية</span>
            </div>
            <div className="p-2 border-r border-[#E7E7E4]">
              <span className="block text-2xl sm:text-3xl font-black text-[#E31E24]">4</span>
              <span className="mt-1 block text-xs sm:text-sm font-bold text-[#444]">جلسات مباشرة</span>
            </div>
            <div className="p-2 border-r border-[#E7E7E4]">
              <span className="block text-2xl sm:text-3xl font-black text-[#E31E24]">40</span>
              <span className="mt-1 block text-xs sm:text-sm font-bold text-[#444]">أمراً تعليمياً</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. فيديو تطبيقي مجاني */}
      <section className="px-4 py-12 sm:px-6 md:py-16 bg-[#FBFBFA]">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F2] px-3.5 py-1 text-xs font-bold text-[#B92723]">
            <Play className="h-3.5 w-3.5 fill-current" />
            فيديو تطبيقي مجاني
          </span>
          <h2 className="mt-3 text-2xl font-black text-[#141414] sm:text-3xl md:text-4xl">
            شاهد كيف تُصنع ورقة امتحان جاهزة من كتاب المنهج
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#666]">
            تطبيق عملي خطوة بخطوة يوضح تحويل المنهج ونماذج الأسئلة إلى ورقة امتحان رسمية جاهزة للطباعة.
          </p>

          <div className="mt-6 aspect-video overflow-hidden rounded-2xl bg-black shadow-xl border border-[#E7E7E4]">
            <iframe
              className="h-full w-full"
              src="https://www.youtube-nocookie.com/embed/nuXcfg0Bhbw?rel=0"
              title="شاهد كيف تُصنع ورقة امتحان جاهزة من كتاب المنهج"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 4. نماذج حسب المادة (شبكة 11 بطاقة) */}
      <section className="border-t border-[#E7E7E4] bg-white px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F2] px-3.5 py-1 text-xs font-bold text-[#E31E24]">
              أدلة عملية حسب التخصص
            </span>
            <h2 className="mt-2 text-2xl font-black text-[#141414] sm:text-3xl md:text-4xl">
              نماذج حسب المادة
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#666]">
              اطّلع على نماذج حقيقية مطبقة من كتب المناهج في 11 مادة دراسية:
            </p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjectCards.map((subject) => (
              <article
                key={subject.name}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#E7E7E4] bg-[#FBFBFA] shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={subject.image}
                    alt={`نماذج مادة ${subject.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <span className="absolute top-2.5 right-2.5 rounded-full bg-[#141414]/90 px-3 py-1 text-xs font-black text-white backdrop-blur-sm">
                    {subject.name}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="text-base font-black text-[#141414]">{subject.name}</h3>
                    <p className="mt-1 text-xs text-[#666] leading-relaxed">{subject.tag}</p>
                  </div>

                  <a
                    href={subject.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E7E7E4] bg-white px-3.5 py-2.5 text-xs font-bold text-[#141414] transition hover:border-[#E31E24] hover:bg-[#FFF0F2] hover:text-[#B92723]"
                  >
                    <span>شاهد نماذج المادة</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#E31E24]" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. نتائج الكورس (شو بتطلع معك من الكورس؟) */}
      <section className="border-t border-[#E7E7E4] bg-[#FBFBFA] px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-black text-[#E31E24] border border-[#E7E7E4]">
              المخرجات العملية
            </span>
            <h2 className="mt-2 text-2xl font-black text-[#141414] sm:text-3xl md:text-4xl">
              شو بتطلع معك من الكورس؟
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#666]">
              قائمة المخرجات والمهارات العملية التي تنجزها وتخرج بها من الكورس:
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-[#E7E7E4] bg-white p-5 sm:p-7 shadow-sm">
            <ol className="divide-y divide-[#F0F0EE]">
              {courseOutcomes.map((outcome, index) => (
                <li key={outcome} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFF0F2] text-xs font-black text-[#E31E24]">
                    {index + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-[#222] leading-relaxed pt-0.5">
                    {outcome}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 6. شهادتان فقط من المتدربين + سطرين عن المدرب */}
      <section className="border-t border-[#E7E7E4] bg-white px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F2] px-3.5 py-1 text-xs font-bold text-[#E31E24]">
              تجارب حقيقية
            </span>
            <h2 className="mt-2 text-2xl font-black text-[#141414] sm:text-3xl md:text-4xl">
              تجارب المتدربين
            </h2>
          </div>

          {/* شهادتان فقط - أقوى اقتباسين */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <article className="rounded-2xl border border-[#E7E7E4] bg-[#FBFBFA] p-5 shadow-sm">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5 inline-block mb-3">
                ✓ تجربة موثقة
              </span>
              <p className="text-xs sm:text-sm font-bold leading-[1.9] text-[#141414]">
                «السلايدات وتحضير الاختبارات كانت تأخذ مني ساعات طويلة كل أسبوع.. هلق صار عندي اختبار وعرض كامل بقدر راجعه وعدل عليه بدقائق بدل ما ابدأ كل شيء من الصفر.»
              </p>
            </article>

            <article className="rounded-2xl border border-[#E7E7E4] bg-[#FBFBFA] p-5 shadow-sm">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5 inline-block mb-3">
                ✓ تجربة موثقة
              </span>
              <p className="text-xs sm:text-sm font-bold leading-[1.9] text-[#141414]">
                «قسم الإنفوجرافيك والخرائط الذهنية غيّر طريقتي بالشرح تماماً.. قدرت أعمل ملخص بصري ومخطط مفاهيم معقدة للطلاب يفهموها بلمحة واحدة.»
              </p>
            </article>
          </div>

          {/* سطرين عن المدرب نواف البوسطة */}
          <div className="mt-10 rounded-3xl border border-[#E7E7E4] bg-[#FBFBFA] p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-right">
              <Image
                src="/images/trainer-nawaf.webp"
                alt="نواف البوسطة"
                width={96}
                height={96}
                className="h-20 w-20 rounded-full object-cover ring-4 ring-white shadow-md shrink-0"
              />
              <div>
                <h3 className="text-lg font-black text-[#141414]">نواف البوسطة</h3>
                <p className="text-xs font-bold text-[#E31E24]">مدرب في توظيف الذكاء الاصطناعي وزيادة الإنتاجية</p>
                <p className="mt-2 text-xs sm:text-sm leading-[1.8] text-[#555]">
                  يساعد المعلمين والمدربين على اختصار ساعات التحضير وبناء مخرجات تعليمية متكاملة لطلابهم، مع بقاء المراجعة والقرار التربوي بيدك كمعلم.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ملخص العرض + الأسئلة الشائعة الـ 5 */}
      <section className="border-t border-[#E7E7E4] bg-[#141414] text-white px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* بطاقة ملخص العرض */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300">
              ملخص العرض الكامل
            </span>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl md:text-4xl text-white">
              كل ما يشمله تسجيلك في الكورس
            </h2>
          </div>

          <div className="mt-7 rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8">
            <ul className="space-y-3 text-xs sm:text-sm text-white/90">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>الكورس كاملاً (20 محاضرة مسجلة · 5.5 ساعات عملية).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>ملفات PDF وقوالب العمل الجاهزة للتطبيق المباشر.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>40 أمراً تعليمياً مخصصاً لصياغة الدروس والأسئلة.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>4 جلسات تفاعلية مباشرة للأسئلة والتطبيق العملي (العدد محدود لضمان التفاعل).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>وصول دائم ومتابعة وتحديثات مستقبلية عبر Telegram.</span>
              </li>
            </ul>

            {/* السعر والرسوم */}
            <div className="my-6 border-y border-white/10 py-5 text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-xs text-white/50 line-through">{ORIGINAL_PRICE}</span>
                <span className="text-4xl font-black text-[#E31E24]">{COURSE_PRICE}</span>
              </div>
              <div className="mt-2 text-xs text-white/70">
                رسوم بوابة الدفع: بالبطاقات البنكية ~23.50$ إجمالي | عبر شام كاش ~22.45$ إجمالي
              </div>
            </div>

            {/* الضمان وملاحظة الشهادة */}
            <div className="space-y-2 text-xs leading-relaxed text-white/80">
              <p className="flex items-center gap-1.5 font-bold text-emerald-400">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>ضمان استرجاع كامل المبلغ لمدة 7 أيام إذا لم يناسبك الكورس.</span>
              </p>
              <p className="rounded-xl bg-white/5 p-3 text-[11px] text-white/70 border border-white/10">
                ℹ️ <strong>ملاحظة واضحة:</strong> الشهادة اختيارية برسوم منفصلة (~20$)، وتصدر بعد اختبار أو مشروع عملي باعتماد وزارة التنمية.
              </p>
            </div>

            {/* الأزرار: زر الواتساب أولاً وزر التسجيل ثانياً */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={primaryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-[#20ba59]"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>سجّل وتواصل عبر WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setIsRegistrationModalOpen(true)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#E31E24] px-6 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-[#B92723]"
              >
                <Lock className="h-4 w-4" />
                <span>التسجيل عبر البوابة ({COURSE_PRICE})</span>
              </button>
            </div>
          </div>

          {/* 5 أسئلة شائعة مختصرة فقط */}
          <div className="mt-12">
            <h3 className="text-center text-xl font-black text-white mb-6">
              الأسئلة الشائعة
            </h3>

            <div className="space-y-2.5">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between gap-3 p-4 text-right text-xs sm:text-sm font-black text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#E31E24] transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-white/10 p-4 pt-2 text-xs text-white/75 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer خفيف */}
      <footer className="border-t border-white/10 bg-[#0d0d0d] py-6 px-4 text-center text-xs text-white/50">
        <p>© كورس الذكاء الاصطناعي للمعلمين · المدرب نواف البوسطة</p>
      </footer>

      {/* شريط الموبايل السفلي الثابت */}
      <div className="fixed inset-x-3 bottom-3 z-50 flex items-center gap-2 sm:hidden">
        <a
          href={primaryWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-3.5 text-xs font-black text-white shadow-xl active:scale-95"
        >
          <MessageCircle className="h-4 w-4 fill-current" />
          <span>واتساب ({COURSE_PRICE})</span>
        </a>
        <button
          type="button"
          onClick={() => setIsRegistrationModalOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#E31E24] px-4 py-3.5 text-xs font-black text-white shadow-xl active:scale-95"
        >
          <Lock className="h-3.5 w-3.5" />
          <span>تسجيل بالبوابة</span>
        </button>
      </div>

      {/* نافذة التسجيل عبر البوابة */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        amount={22}
        currencySymbol="$"
        displayPrice={COURSE_PRICE}
        source="clean_landing_page"
        whatsappLink={getWhatsAppLink('مرحباً، أريد المساعدة في التسجيل والدفع لكورس الذكاء الاصطناعي للمعلمين.')}
      />
    </main>
  )
}
