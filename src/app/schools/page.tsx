'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  Handshake,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Presentation,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
} from 'lucide-react'

const WHATSAPP_NUMBER = '963985323170'
const INSTITUTIONAL_EMAIL = 'info@manasadigital.com'

const countries = [
  'السعودية', 'الإمارات', 'قطر', 'الكويت', 'البحرين', 'عُمان',
  'مصر', 'الأردن', 'المغرب', 'تونس', 'الجزائر', 'العراق',
  'لبنان', 'سوريا', 'فلسطين', 'ليبيا', 'اليمن', 'السودان',
  'موريتانيا', 'جيبوتي', 'جزر القمر', 'دولة عربية أخرى',
]

const programmeSteps = [
  {
    number: '01',
    title: 'تشخيص احتياج الفريق',
    text: 'نبدأ بهدف مؤسستكم: إعداد الاختبارات، بناء المحتوى، تطوير البحث، أو تنظيم استخدام الذكاء الاصطناعي داخل الفريق.',
    icon: Search,
  },
  {
    number: '02',
    title: 'نطاق واضح للتنفيذ',
    text: 'نقترح عدد المشاركين، نمط الوصول، وأمثلة مناسبة لموادكم؛ ثم نرسل عرضًا مكتوبًا يوضح ما يشمله البرنامج.',
    icon: ClipboardCheck,
  },
  {
    number: '03',
    title: 'تعلم منظم وتطبيق عملي',
    text: 'يصل الفريق إلى الكورس المسجل والقوالب، مع جلسة تطبيق اختيارية للمؤسسات التي تريد العمل على حالات استخدام من واقعها.',
    icon: Video,
  },
  {
    number: '04',
    title: 'مخرجات قابلة للمراجعة',
    text: 'يطبق المشاركون على مصادرهم التعليمية، ويحتفظون بمخرجات يمكن مراجعتها وتكييفها قبل استخدامها مع الطلاب.',
    icon: FileCheck2,
  },
]

const useCases = [
  {
    title: 'تحويل المصدر إلى مادة تعليمية',
    text: 'من كتاب أو درس أو ملف المؤسسة إلى شرح مناسب، ملخص، نشاط صفّي، أو سيناريو فيديو تعليمي.',
    icon: BookOpen,
  },
  {
    title: 'اختبارات وPDF ومهام تطبيقية',
    text: 'إعداد أسئلة ومشاريع ومعايير تقييم ونموذج إجابة، ثم إخراجها بصيغة منظمة قابلة للمراجعة والطباعة.',
    icon: FileText,
  },
  {
    title: 'عروض وتفاعل وبحث وتقارير',
    text: 'بناء عروض تعليمية، أنشطة، شروح صوتية، وبحث منظم انطلاقًا من مصادر محددة لا من إجابات عشوائية.',
    icon: Presentation,
  },
]

const offerLevels = [
  {
    title: 'بداية فريق',
    audience: 'للمؤسسات التي تريد اختبار ملاءمة البرنامج مع مجموعة صغيرة.',
    features: ['وصول منظم للكورس المسجل', 'قوالب ومهمة تطبيق واقعية', 'ملف بدء للمسؤول عن المجموعة'],
    tone: 'border-[#CBD5E1]',
    icon: Users,
  },
  {
    title: 'تمكين فريق',
    audience: 'لقسم أو مجموعة معلمين تريد الانتقال من الاهتمام إلى التطبيق المنظم.',
    features: ['كل مميزات بداية فريق', 'جلسة تطبيق افتراضية اختيارية', 'مراجعة مجموعة مخرجات متفق عليها'],
    tone: 'border-[#0D9488]',
    icon: Sparkles,
    featured: true,
  },
  {
    title: 'شراكة مؤسسية',
    audience: 'للسلاسل التعليمية والجامعات والمعاهد التي تحتاج نطاقًا أوسع أو أمثلة مخصصة.',
    features: ['تشخيص ونطاق تنفيذ للمؤسسة', 'توطين الأمثلة بحسب المواد والفريق', 'خطة بدء ومتابعة متفق عليها'],
    tone: 'border-[#D4A853]',
    icon: Handshake,
  },
]

const faqs = [
  {
    q: 'هل يخدم البرنامج مؤسسات خارج سوريا؟',
    a: 'نعم. صُمم المحتوى بالعربية لمؤسسات التعليم في الوطن العربي. عند طلب العرض نضبط نطاق التنفيذ والعملة وخيار الوصول بما يناسب بلد المؤسسة وطريقة العمل المتاحة.',
  },
  {
    q: 'هل البرنامج مسجل أم مباشر؟',
    a: 'أساس البرنامج كورس مسجل ومنظم يمكن للفريق متابعته بمرونة. ويمكن إضافة جلسة تطبيق مباشرة أو افتراضية عند الحاجة ضمن العرض المؤسسي.',
  },
  {
    q: 'كيف تحددون السعر؟',
    a: 'السعر لا يُعرض كرقم واحد للجميع، لأنه يتغير بحسب الدولة وعدد المشاركين ونمط التنفيذ ووجود جلسة تطبيق أو تخصيص. نرسل عرضًا مكتوبًا بعد معرفة هذه النقاط.',
  },
  {
    q: 'هل يحصل كل مشارك على شهادة؟',
    a: 'لا نضع الشهادة بوصفها القيمة الأساسية للبرنامج. القيمة هي التطبيق والمخرجات والقوالب التي يمكن للفريق استخدامها. أي طلب خاص بالشهادات أو الاعتماد يُناقش قبل الاتفاق ولا يُفترض ضمن العرض تلقائيًا.',
  },
  {
    q: 'هل ستكون المخرجات مطابقة للمنهج تلقائيًا؟',
    a: 'نعلّم الفريق كيف يبدأ من مصدره ويحدد المطلوب ويراجع الناتج. تبقى ملاءمة المنهج والدقة والقرار النهائي مسؤولية المعلم أو الجهة الأكاديمية في المؤسسة.',
  },
  {
    q: 'كيف نتعامل مع خصوصية الطلاب والبيانات؟',
    a: 'ندرب الفريق على العمل من مصادر تعليمية مناسبة وعدم إدخال بيانات شخصية أو حساسة للطلاب في الأدوات العامة. تحتاج أي سياسة داخلية تفصيلية إلى اعتماد المؤسسة نفسها.',
  },
]

export default function SchoolsLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    schoolName: '',
    contactName: '',
    jobTitle: '',
    country: '',
    institutionType: '',
    teacherCount: '',
    deliveryMode: '',
    mainGoal: '',
    preferredStart: '',
    phone: '',
    email: '',
    notes: '',
  })

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }))
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    track('institutional_quote_request', {
      country: formData.country,
      institution_type: formData.institutionType,
      teacher_count: formData.teacherCount,
      delivery_mode: formData.deliveryMode,
      main_goal: formData.mainGoal,
    })

    const message = [
      'مرحباً، أريد طلب عرض مؤسسي لبرنامج تمكين فريق التعليم بالذكاء الاصطناعي.',
      '',
      `المؤسسة: ${formData.schoolName}`,
      `المسؤول: ${formData.contactName}`,
      `الصفة: ${formData.jobTitle}`,
      `الدولة: ${formData.country}`,
      `نوع المؤسسة: ${formData.institutionType}`,
      `عدد المشاركين المتوقع: ${formData.teacherCount}`,
      `نمط التنفيذ: ${formData.deliveryMode}`,
      `الهدف الأساسي: ${formData.mainGoal}`,
      `موعد البدء المتوقع: ${formData.preferredStart}`,
      `واتساب: ${formData.phone}`,
      `البريد: ${formData.email || 'غير مذكور'}`,
      `ملاحظات: ${formData.notes || 'لا توجد'}`,
    ].join('\n')

    window.location.assign(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`)
  }

  return (
    <main dir="rtl" className="min-h-screen bg-white text-[#1B2A4A]" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>
      <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-[#1B2A4A]">
            <Building2 className="h-5 w-5 text-[#0D9488]" />
            <span className="text-sm md:text-base">حلول المؤسسات التعليمية</span>
          </div>
          <Link href="/" className="text-xs font-bold text-[#64748B] hover:text-[#0D9488] md:text-sm">
            للأفراد والمعلمين
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-[#F8FAFC]">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1B2A4A 1px, transparent 0)', backgroundSize: '38px 38px' }} />
        <div className="relative mx-auto max-w-[1120px] px-4 pb-16 pt-16 text-center md:pb-20 md:pt-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0D9488]/20 bg-[#0D9488]/10 px-5 py-2 text-sm font-bold text-[#0D9488]">
            <Building2 className="h-4 w-4" />
            للمدارس والمعاهد والجامعات في الوطن العربي
          </div>
          <h1 className="mx-auto mb-6 max-w-5xl text-3xl font-bold leading-[1.35] text-[#1B2A4A] md:text-5xl lg:text-[3.45rem]">
            برنامج تمكين عملي لفرق التعليم في الوطن العربي
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-base leading-loose text-[#64748B] md:text-lg">
            حوّلوا مصادر مؤسستكم إلى اختبارات وملفات PDF وعروض وشروح تعليمية منظمة، عبر منهجية عملية تحافظ على مراجعة المعلم واستخدام الذكاء الاصطناعي بصورة مسؤولة.
          </p>
          <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#request" onClick={() => track('institutional_cta_click', { source: 'hero' })} className="inline-flex items-center gap-2 rounded-xl bg-[#0D9488] px-8 py-4 text-base font-bold text-white hover:bg-[#0B7C72]">
              اطلب عرضًا مؤسسيًا
              <ArrowLeft className="h-4 w-4" />
            </a>
            <Link href="/results" onClick={() => track('institutional_samples_click', { source: 'hero' })} className="inline-flex items-center gap-2 rounded-xl border-2 border-[#1B2A4A]/15 bg-white px-8 py-4 text-base font-bold text-[#1B2A4A] hover:border-[#0D9488] hover:text-[#0D9488]">
              شاهد نماذج حقيقية
              <Presentation className="h-4 w-4" />
            </Link>
          </div>
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm">
            {['كورس مسجل ومنظم', 'جلسة تطبيق اختيارية', 'عرض سعر حسب المؤسسة', 'محتوى عربي عملي'].map((item) => (
              <span key={item} className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-[#1E3A5F]">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1120px] px-4">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold text-[#0D9488]">المشكلة التي نعالجها</p>
            <h2 className="text-2xl font-bold text-[#1B2A4A] md:text-4xl">ليس المطلوب أن يعرف كل معلم أسماء أدوات أكثر</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-loose text-[#64748B] md:text-base">المطلوب سير عمل واضح يبدأ من المصدر التعليمي وينتهي بمخرج قابل للمراجعة والاستخدام، بدل نتائج عشوائية أو اعتماد غير آمن على أدوات عامة.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: 'فوضى استخدام الأدوات', text: 'كل معلم يجرب بطريقة مختلفة من دون إطار مشترك أو معايير مراجعة.', icon: Lightbulb },
              { title: 'وقت كبير في التحضير والتنسيق', text: 'اختبارات وعروض وملفات تحتاج عملًا متكررًا يمكن تنظيم جزء كبير منه بطريقة أفضل.', icon: FileText },
              { title: 'حاجة إلى استخدام مسؤول', text: 'المؤسسة تحتاج تدريبًا يراعي الدقة والخصوصية والدور المحوري للمعلم.', icon: ShieldCheck },
            ].map((item) => (
              <article key={item.title} className="border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-right">
                <div className="mb-4 flex h-11 w-11 items-center justify-center bg-[#0D9488]/10 text-[#0D9488]"><item.icon className="h-5 w-5" /></div>
                <h3 className="mb-2 text-lg font-bold text-[#1B2A4A]">{item.title}</h3>
                <p className="text-sm leading-loose text-[#64748B]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-14 md:py-20">
        <div className="mx-auto max-w-[1120px] px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold text-[#0D9488]">حالات استخدام عملية</p>
            <h2 className="text-2xl font-bold text-[#1B2A4A] md:text-4xl">ما الذي يستطيع فريقكم تطبيقه؟</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {useCases.map((useCase) => (
              <article key={useCase.title} className="bg-white p-6">
                <useCase.icon className="mb-5 h-8 w-8 text-[#0D9488]" />
                <h3 className="mb-3 text-xl font-bold text-[#1B2A4A]">{useCase.title}</h3>
                <p className="text-sm leading-loose text-[#64748B]">{useCase.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/results" className="inline-flex items-center gap-2 text-sm font-bold text-[#0D9488] hover:underline">
              اطلع على نماذج المخرجات التعليمية
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1120px] px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold text-[#0D9488]">طريقة التنفيذ</p>
            <h2 className="text-2xl font-bold text-[#1B2A4A] md:text-4xl">رحلة قصيرة وواضحة من الاحتياج إلى التطبيق</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {programmeSteps.map((step) => (
              <article key={step.number} className="border-t-2 border-[#0D9488] bg-[#F8FAFC] p-5">
                <div className="mb-7 flex items-center justify-between">
                  <span className="text-3xl font-bold text-[#0D9488]/25">{step.number}</span>
                  <step.icon className="h-5 w-5 text-[#0D9488]" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#1B2A4A]">{step.title}</h3>
                <p className="text-sm leading-loose text-[#64748B]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1B2A4A] py-14 text-white md:py-20">
        <div className="mx-auto max-w-[1120px] px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold text-[#7DE4DB]">نموذج مرن بحسب المؤسسة</p>
            <h2 className="text-2xl font-bold md:text-4xl">اختروا مستوى التنفيذ المناسب، ثم نحدد النطاق والسعر</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-loose text-white/70 md:text-base">لا نعرض سعرًا عامًا لأن عدد المشاركين والدولة والتخصيص ونمط التدريب تختلف من مؤسسة إلى أخرى. نرسل عرضًا مكتوبًا واضحًا بعد معرفة احتياجكم.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {offerLevels.map((level) => (
              <article key={level.title} className={`border-t-4 ${level.tone} bg-white p-6 text-[#1B2A4A]`}>
                {level.featured && <div className="mb-4 inline-flex rounded-full bg-[#0D9488]/10 px-3 py-1 text-xs font-bold text-[#0D9488]">الأنسب لمعظم الفرق</div>}
                <level.icon className="mb-5 h-7 w-7 text-[#0D9488]" />
                <h3 className="mb-3 text-xl font-bold">{level.title}</h3>
                <p className="mb-6 text-sm leading-loose text-[#64748B]">{level.audience}</p>
                <ul className="space-y-3 border-t border-[#E2E8F0] pt-5">
                  {level.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#475569]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-[1000px] items-center gap-8 px-4 md:grid-cols-[220px_1fr]">
          <img src="/images/trainer-nawaf.jpg" alt="المدرب نواف البوسطة" className="mx-auto h-44 w-44 object-cover md:h-52 md:w-52" />
          <div className="text-center md:text-right">
            <div className="mb-4 inline-flex items-center gap-2 bg-[#0D9488]/10 px-4 py-2 text-sm font-bold text-[#0D9488]"><GraduationCap className="h-4 w-4" /> عن المدرب</div>
            <h2 className="mb-2 text-2xl font-bold text-[#1B2A4A]">نواف البوسطة</h2>
            <p className="mb-4 font-bold text-[#0D9488]">مدرب في أدوات الذكاء الاصطناعي وزيادة الإنتاجية</p>
            <p className="max-w-3xl text-sm leading-loose text-[#64748B]">يقدم نواف تدريبات عملية تربط أدوات الذكاء الاصطناعي بسير العمل اليومي للمعلم والفريق التعليمي: من المصدر إلى المخرج، مع ترك مساحة للمراجعة البشرية والسياق المحلي لكل مؤسسة.</p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0D9488] hover:underline">تعرف أكثر على الخبرات التدريبية <ArrowLeft className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-14 md:py-20">
        <div className="mx-auto max-w-[900px] px-4">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold text-[#0D9488]">قبل طلب العرض</p>
            <h2 className="text-2xl font-bold text-[#1B2A4A] md:text-4xl">أسئلة المؤسسات الشائعة</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <article key={faq.q} className="border border-[#E2E8F0] bg-white">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-right">
                  <span className="text-base font-bold text-[#1B2A4A]">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[#0D9488] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && <p className="border-t border-[#E2E8F0] px-5 pb-5 pt-4 text-sm leading-loose text-[#64748B]">{faq.a}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1000px] px-4">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold text-[#0D9488]">خطوتكم التالية</p>
            <h2 className="text-2xl font-bold text-[#1B2A4A] md:text-4xl">اطلبوا عرضًا مؤسسيًا يناسب فريقكم</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-loose text-[#64748B]">أرسلوا المعلومات الأساسية، وسنراجع نطاق التنفيذ ونرد على واتساب أو البريد. لا يوجد سعر موحد أو التزام قبل الاتفاق على النطاق.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="mx-auto max-w-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="اسم المؤسسة التعليمية" required icon={<Building2 className="h-4 w-4" />}>
                <input required value={formData.schoolName} onChange={(event) => updateField('schoolName', event.target.value)} placeholder="المدرسة أو الجامعة أو المعهد" className="form-input" />
              </FormField>
              <FormField label="اسم المسؤول" required icon={<Users className="h-4 w-4" />}>
                <input required value={formData.contactName} onChange={(event) => updateField('contactName', event.target.value)} placeholder="الاسم الكامل" className="form-input" />
              </FormField>
              <FormField label="المسمى الوظيفي" required icon={<Building2 className="h-4 w-4" />}>
                <select required value={formData.jobTitle} onChange={(event) => updateField('jobTitle', event.target.value)} className="form-input">
                  <option value="">اختر المسمى</option><option>مالك/ة المؤسسة</option><option>مدير/ة</option><option>مسؤول/ة تطوير مهني</option><option>عميد/ة أو رئيس قسم</option><option>مسؤول/ة تدريب</option><option>أخرى</option>
                </select>
              </FormField>
              <FormField label="الدولة" required icon={<MapPin className="h-4 w-4" />}>
                <select required value={formData.country} onChange={(event) => updateField('country', event.target.value)} className="form-input">
                  <option value="">اختر الدولة</option>{countries.map((country) => <option key={country}>{country}</option>)}
                </select>
              </FormField>
              <FormField label="نوع المؤسسة" required icon={<Building2 className="h-4 w-4" />}>
                <select required value={formData.institutionType} onChange={(event) => updateField('institutionType', event.target.value)} className="form-input">
                  <option value="">اختر النوع</option><option>مدرسة خاصة أو دولية</option><option>جامعة أو كلية</option><option>معهد أو مركز تدريبي</option><option>سلسلة مدارس أو مجموعة تعليمية</option><option>منظمة أو مبادرة تعليمية</option><option>أخرى</option>
                </select>
              </FormField>
              <FormField label="عدد المشاركين المتوقع" required icon={<Users className="h-4 w-4" />}>
                <select required value={formData.teacherCount} onChange={(event) => updateField('teacherCount', event.target.value)} className="form-input">
                  <option value="">اختر العدد</option><option>5–15</option><option>16–30</option><option>31–60</option><option>61–150</option><option>أكثر من 150</option>
                </select>
              </FormField>
              <FormField label="نمط التنفيذ المفضل" required icon={<Video className="h-4 w-4" />}>
                <select required value={formData.deliveryMode} onChange={(event) => updateField('deliveryMode', event.target.value)} className="form-input">
                  <option value="">اختر النمط</option><option>كورس مسجل ومنظم</option><option>كورس مسجل + جلسة تطبيق افتراضية</option><option>تدريب مباشر أو هجين</option><option>أحتاج توصية بعد التشخيص</option>
                </select>
              </FormField>
              <FormField label="الهدف الأساسي" required icon={<Lightbulb className="h-4 w-4" />}>
                <select required value={formData.mainGoal} onChange={(event) => updateField('mainGoal', event.target.value)} className="form-input">
                  <option value="">اختر الهدف</option><option>الاختبارات وملفات PDF</option><option>المحتوى والشرح والعروض</option><option>البحث والتقارير</option><option>رفع كفاءة الفريق والإنتاجية</option><option>استخدام مسؤول وسياسات مبدئية</option><option>هدف آخر</option>
                </select>
              </FormField>
              <FormField label="موعد البدء المتوقع" required icon={<ClipboardCheck className="h-4 w-4" />}>
                <select required value={formData.preferredStart} onChange={(event) => updateField('preferredStart', event.target.value)} className="form-input">
                  <option value="">اختر الموعد</option><option>خلال أسبوعين</option><option>خلال شهر</option><option>خلال 2–3 أشهر</option><option>ما زلنا ندرس الاحتياج</option>
                </select>
              </FormField>
              <FormField label="رقم واتساب مع رمز الدولة" required icon={<Phone className="h-4 w-4" />}>
                <input required type="tel" dir="ltr" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="+966 ..." className="form-input" />
              </FormField>
              <FormField label="البريد المؤسسي" icon={<Mail className="h-4 w-4" />}>
                <input type="email" dir="ltr" value={formData.email} onChange={(event) => updateField('email', event.target.value)} placeholder="name@institution.edu" className="form-input" />
              </FormField>
            </div>
            <div className="mt-4">
              <FormField label="ملاحظات أو متطلبات خاصة" icon={<MessageSquare className="h-4 w-4" />}>
                <textarea rows={4} value={formData.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="اذكر المواد أو الفئة المستهدفة أو أي متطلب تريد مناقشته" className="form-input resize-none" />
              </FormField>
            </div>
            <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 bg-[#0D9488] py-4 text-base font-bold text-white hover:bg-[#0B7C72]">
              <Send className="h-4 w-4" />
              أرسل طلب العرض عبر واتساب
            </button>
            <p className="mt-4 text-center text-xs leading-loose text-[#64748B]">أو اكتبوا مباشرة إلى <a className="font-bold text-[#0D9488] hover:underline" href={`mailto:${INSTITUTIONAL_EMAIL}`}>{INSTITUTIONAL_EMAIL}</a>. لا ترسلوا بيانات شخصية أو حساسة للطلاب عبر النموذج أو واتساب.</p>
          </form>
        </div>
      </section>

      <footer className="bg-[#1B2A4A] py-9 text-center text-white">
        <div className="mx-auto max-w-[1120px] px-4">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white">صفحة الأفراد</Link>
            <Link href="/results" className="hover:text-white">نماذج المخرجات</Link>
            <Link href="/about" className="hover:text-white">عن المدرب</Link>
            <a href={`mailto:${INSTITUTIONAL_EMAIL}`} className="hover:text-white">تواصل المؤسسات</a>
          </div>
          <p className="text-xs text-white/55">نواف البوسطة — مدرب في أدوات الذكاء الاصطناعي وزيادة الإنتاجية</p>
          <p className="mt-2 text-xs text-white/35">© 2026 Manasa Digital</p>
        </div>
      </footer>

      <style jsx>{`
        .form-input { width: 100%; border: 1px solid #E2E8F0; background: #FFFFFF; border-radius: 0.75rem; padding: 0.75rem 1rem; color: #1E293B; font-size: 0.875rem; outline: none; }
        .form-input:focus { border-color: #0D9488; box-shadow: 0 0 0 1px #0D9488; }
        .form-input::placeholder { color: #94A3B8; }
      `}</style>
    </main>
  )
}

function FormField({ label, required = false, icon, children }: { label: string; required?: boolean; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block text-right">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-[#1E293B]">{icon}{label}{required && <span className="text-[#EF4444]">*</span>}</span>
      {children}
    </label>
  )
}
