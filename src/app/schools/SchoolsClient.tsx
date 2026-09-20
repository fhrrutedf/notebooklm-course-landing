'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  CreditCard,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  LayoutGrid,
  Lock,
  Mail,
  MessageCircle,
  PenTool,
  Presentation,
  Receipt,
  School,
  Send,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Users,
  Video,
  Workflow,
  Zap,
} from 'lucide-react'

const WHATSAPP_NUMBER = '963985323170'

// الألوان المتناسقة مع الهوية البصرية لصفحة الأفراد
const red = '#E3342F'
const redDark = '#B92723'
const paper = '#FAFAF8'
const cardBg = '#FFFFFF'
const ink = '#242424'
const muted = '#555555'
const line = '#E2E2DF'
const soft = '#F8F8F6'

interface TrackProps {
  [key: string]: any
}

function trackInstitutional(eventName: string, props?: TrackProps) {
  try {
    track(eventName, props)
    if (typeof window !== 'undefined') {
      if (typeof (window as any).gtag === 'function') {
        ;(window as any).gtag('event', eventName, props)
      }
      if (typeof (window as any).fbq === 'function') {
        ;(window as any).fbq('trackCustom', eventName, props)
      }
    }
  } catch (e) {
    console.warn('Analytics tracking error:', e)
  }
}

// عناصر شريط الثقة
const trustItems = [
  'تدريب عملي للمعلمين',
  'تطبيق على مواد المؤسسة',
  'قوالب قابلة للتعديل',
  'متابعة وأسئلة وأجوبة',
  'مراجعة بشرية قبل اعتماد المخرجات',
]

// نقاط المشكلة
const problemPoints = [
  {
    title: 'اختلاف طرق التحضير بين المعلمين',
    desc: 'كل معلم يعمل بطريقة وأسلوب منفصل، مما يسبب تفاوتاً كبيراً في جودة المواد التعليمية الموجهة للطلاب.',
    icon: Users,
  },
  {
    title: 'وقت طويل في إعداد الاختبارات وأوراق العمل',
    desc: 'استنزاف ساعات أسبوعية طويلة في كتابة بنوك الأسئلة وتنسيق أوراق العمل بدلاً من التركيز على التدريس والتفاعل الصفي.',
    icon: Clock,
  },
  {
    title: 'تكرار تصميم العروض والملخصات',
    desc: 'إعادة بناء الشرائح والمذكرات من الصفر كل عام أو فصل دراسي، دون وجود مكتبة قوالب موحدة للمؤسسة.',
    icon: Presentation,
  },
  {
    title: 'صعوبة تدريب المعلمين على الذكاء الاصطناعي بأمان',
    desc: 'التخوف من الاعتماد العشوائي على أدوات الذكاء الاصطناعي أو إدخال بيانات غير مناسبة دون ضوابط تدقيق واضحة.',
    icon: ShieldCheck,
  },
  {
    title: 'مخرجات غير موحدة أو تحتاج مراجعة متأخرة',
    desc: 'وصول أوراق امتحانية وملخصات للإدارات والمنسقين الأكاديميين بجودات متباينة تستهلك وقتاً مضاعفاً في التدقيق.',
    icon: FileText,
  },
]

// مسار الحل الموحد (8 مراحل)
const unifiedPath = [
  { step: '01', title: 'المصدر', subtitle: 'كتاب المنهج أو ملف الدرس المعتمد' },
  { step: '02', title: 'تحديد هدف التعلم', subtitle: 'صياغة المخرجات التعليمية المستهدفة' },
  { step: '03', title: 'استخراج الأفكار', subtitle: 'تفكيك المفاهيم الصعبة والمحاور' },
  { step: '04', title: 'بناء الشرح', subtitle: 'أسلوب تبسيطي يناسب عمر ومهارات الطالب' },
  { step: '05', title: 'إعداد الأسئلة', subtitle: 'نماذج متدرجة ومحايدة مع سلم التصحيح' },
  { step: '06', title: 'إخراج المحتوى', subtitle: 'تنسيق أوراق العمل، العروض، والـ PDF' },
  { step: '07', title: 'مراجعة المعلم', subtitle: 'التدقيق العلمي والتربوي والاعتماد النهائي' },
  { step: '08', title: 'استخدامه مع الطلاب', subtitle: 'تطبيق موحد ومثمر داخل القاعة الصفية' },
]

// مهارات ما يتعلمه الفريق (10 مهارات)
const learningSkills = [
  { id: '1', title: 'تحليل الكتب والملفات والدروس', desc: 'استخراج الهيكل التعليمي والمفاهيم الجوهرية من أي منهج مدرسي بدقة.' },
  { id: '2', title: 'تبسيط المفاهيم حسب المرحلة والمادة', desc: 'تكييف الصياغة والأمثلة لتناسب طلاب الابتدائي، الإعدادي، أو الثانوي.' },
  { id: '3', title: 'إنشاء أسئلة وأنشطة واختبارات', desc: 'صياغة أسئلة موضوعية ومقالية تقيس الفهم والتحليل وليس فقط الحفظ.' },
  { id: '4', title: 'إعداد أوراق امتحان قابلة للتعديل والطباعة', desc: 'تجهيز أوراق اختبار مدرسية منسقة وجاهزة للتوزيع مع مفاتيح الإجابة.' },
  { id: '5', title: 'إنشاء عروض تقديمية وملخصات PDF', desc: 'تحويل محاور الدرس إلى شرائح تفاعلية للشاشة وملخصات بصرية للمراجعة.' },
  { id: '6', title: 'إعداد خرائط ذهنية وإنفوجرافيك', desc: 'تنظيم العلاقات بين القوانين والمفاهيم في صفحة واحدة مريحة للذاكرة البصرية.' },
  { id: '7', title: 'تحويل الدرس لسيناريو وفيديو وبودكاست', desc: 'كتابة نصوص تعليمية صوتية ومرئية تدعم التعلم الذاتي ومكتبة المدرسة.' },
  { id: '8', title: 'مراجعة وتدقيق المخرجات قبل استخدامها', desc: 'اكتساب مهارة الناقد والمراجع الصارم للنتائج وتصحيح أي معلومة قبل اعتمادها.' },
  { id: '9', title: 'استخدام الذكاء الاصطناعي بمسؤولية وأمان', desc: 'الالتزام بمعايير الأمان، والنزاهة الأكاديمية، وعدم مشاركة بيانات حساسة.' },
  { id: '10', title: 'بناء قوالب عمل موحدة للمؤسسة', desc: 'إنشاء نماذج برومبت وملفات عمل قابلة للاستخدام المتكرر بين أقسام المدرسة.' },
]

// فوائد المؤسسة (7 فوائد)
const institutionalBenefits = [
  {
    title: 'تقليل الوقت المصروف على التحضير المتكرر',
    desc: 'تمكين المعلم من اختصار ساعات الصياغة الروتينية واستثمارها في متابعة الطلاب والتدريس الفعال.',
  },
  {
    title: 'تحسين تنظيم وجودة المواد التعليمية',
    desc: 'مخرجات مطبوعة ورقمية عالية التنسيق تعكس المكانة الأكاديمية الرفيعة لمؤسستكم أمام أولياء الأمور.',
  },
  {
    title: 'توحيد منهجية إعداد الدروس والاختبارات',
    desc: 'اعتماد معايير مشتركة بين شُعب المادة الواحدة بدلاً من التباين الفردي الكبير بين الفصول.',
  },
  {
    title: 'مساعدة المعلمين الجدد على البدء بسرعة',
    desc: 'توفير مسار عمل وقوالب جاهزة تدمج الكادر التدريسي الجديد في ثقافة المؤسسة التعليمية بسلاسة.',
  },
  {
    title: 'إنتاج محتوى يناسب مواد المؤسسة ومراحلها',
    desc: 'التطبيق يتم على مناهج وكتب وخطط المؤسسة الفعلية وليس على أمثلة عامة بعيدة عن واقعكم.',
  },
  {
    title: 'رفع قدرة الفريق على إعداد مواد قابلة للمراجعة',
    desc: 'كل مخرج يمر بخطوة التحقق والتعديل، مما يمنع تمرير أخطاء غير مقصودة في الواجبات والامتحانات.',
  },
  {
    title: 'تخفيف الاعتماد على العمل العشوائي المنفصل',
    desc: 'بناء جسور تعاون أكاديمي بين معلمي القسم الواحد لتبادل الأفكار والأنشطة والقوالب الفعالة.',
  },
]

// خطوات طريقة العمل مع المؤسسة (4 خطوات)
const workStages = [
  {
    step: '01',
    title: 'نتعرف على احتياج مؤسستك',
    desc: 'نحدد عدد المعلمين والمواد والمراحل والنتائج المطلوبة بدقة عبر جلسة تشخيص سريعة.',
  },
  {
    step: '02',
    title: 'نختار تجربة تطبيقية',
    desc: 'نطبق على درس أو مادة حقيقية من منهج مؤسستكم لنرى الأثر العملي المباشر قبل التوسع.',
  },
  {
    step: '03',
    title: 'ندرّب الفريق',
    desc: 'يتعلم المعلمون المسار خطوة بخطوة مع تطبيق عملي وتوجيه مباشر يجيب على تساؤلاتهم.',
  },
  {
    step: '04',
    title: 'نراجع ونطوّر',
    desc: 'نراجع المخرجات المنتجة ونقترح قوالب وخطوات مناسبة لاستدامة الأثر داخل أقسام المؤسسة.',
  },
]

// الباقات المقترحة بأسعار إرشادية وتخصيص كامل
const trainingPackages = [
  {
    id: 'small_team',
    name: 'باقة تجربة الفريق',
    audience: 'مناسبة لـ 5 معلمين',
    badge: 'تجربة مركزة وسريعة لاختبار الملاءمة',
    indicativePrice: 'يبدأ من 995 ريالاً سعودياً',
    teacherCountOption: '1–5',
    trainingTypeOption: 'محتوى مسجل + جلسة تطبيق',
    points: [
      'الوصول إلى الكورس الكامل.',
      'ملفات PDF والقوالب.',
      'جلسة تعريفية للفريق.',
      'جلسة أسئلة وأجوبة.',
      'تطبيق أولي على درس حقيقي.',
    ],
  },
  {
    id: 'department',
    name: 'باقة القسم التعليمي',
    audience: 'مناسبة لـ 10 معلمين',
    badge: 'الخيار الأنسب لمعظم المعاهد والمدارس',
    indicativePrice: 'يبدأ من 1,790 ريالاً سعودياً',
    featured: true,
    teacherCountOption: '6–10',
    trainingTypeOption: 'تدريب مباشر + قوالب وتطبيقات',
    points: [
      'كل محتوى الكورس.',
      'تدريب جماعي للفريق.',
      'تطبيق على أكثر من مادة.',
      'قوالب قابلة للتعديل.',
      'جلستان للأسئلة والتطبيق.',
      'متابعة أولية بعد التدريب.',
    ],
  },
  {
    id: 'full_institution',
    name: 'باقة المؤسسة المتكاملة',
    audience: 'مناسبة لـ 20 معلماً أو أكثر',
    badge: 'حل شامل متعدد المراحل والأقسام',
    indicativePrice: 'يُحدَّد حسب عدد المعلمين ونطاق التدريب',
    teacherCountOption: '21–50',
    trainingTypeOption: 'تدريب مخصص لكامل المؤسسة',
    points: [
      'تدريب عدة مجموعات أو أقسام.',
      'تطبيق على مواد المؤسسة.',
      'تنظيم طريقة عمل موحدة.',
      'قوالب خاصة بالمؤسسة.',
      'جلسات متابعة.',
      'تقرير مختصر عن التطبيق والمخرجات.',
    ],
  },
]

// مسار التعاقد والدفع للمؤسسات
const contractingSteps = [
  { num: '1', title: 'اختيار الباقة المبدئية', desc: 'تحديد نقطة البداية المناسبة لحجم الفريق' },
  { num: '2', title: 'تحديد عدد المعلمين', desc: 'ملء بيانات المؤسسة والمراحل الدراسية' },
  { num: '3', title: 'معرفة المواد وطريقة التدريب', desc: 'مسجل، مباشر، أو مخصص حسب منهجكم' },
  { num: '4', title: 'إرسال عرض نهائي مخصص', desc: 'عرض رسمي مفصل مع التكلفة النهائية والفاتورة' },
  { num: '5', title: 'إرسال رابط دفع خاص', desc: 'رابط دفع رسمي (مدى، بطاقات، تكرام باي، تحويل بنكي)' },
]

// النماذج الأربعة للمخرجات
const samplesData = [
  {
    title: 'ورقة امتحان من كتاب منهج',
    source: 'كتاب الرياضيات أو الفيزياء المعتمد في المؤسسة',
    result: 'ورقة اختبار منسقة ومطبوعة تحتوي أسئلة متدرجة الصعوبة (فهم، تطبيق، تحليل) مع سلم تصحيح دقيق.',
    institutionalUse: 'بناء بنوك أسئلة شهرية وفصلية موحدة بين شُعب الصف الواحد، قابلة للطباعة والتعديل بمرونة.',
    tag: 'اختبارات وبنوك أسئلة',
  },
  {
    title: 'ملخص وشرح بصري للدرس',
    source: 'وحدة دراسية في مادة العلوم أو الأحياء',
    result: 'مذكرة دراسية منظمة بصفحة واحدة تجمع المفاهيم والرسومات التوضيحية وجداول المقارنة السريعة.',
    institutionalUse: 'توزيعها كبطاقات مراجعة مركزة للطلاب قبل الامتحانات أو كملف إثرائي لمنصة المدرسة الإلكترونية.',
    tag: 'مذكرات وبطاقات مراجعة',
  },
  {
    title: 'عرض تقديمي تعليمي متكامل (Slides)',
    source: 'محاور درس في مادة الاجتماعيات أو اللغة العربية',
    result: 'شرائح تفاعلية مركزة جاهزة للعرض على البروجكتر والشاشات الذكية بنقاط واضحة وتصميم مريح للعين.',
    institutionalUse: 'توحيد المادة المعروضة داخل الصفوف وضمان تقديم المعلمين لنفس جودة الشرح البصري.',
    tag: 'عروض تقديمية صفية',
  },
  {
    title: 'سيناريو وفيديو أو بودكاست تعليمي',
    source: 'تجارب علمية أو مفاهيم لغوية تحتاج توضيحاً صوتياً',
    result: 'سيناريو شرح تعليمي تفاعلي مع تسجيل صوتي عالي النقاء لشرح المفاهيم المعقدة خطوة بخطوة.',
    institutionalUse: 'تغذية منصة التعلم الذاتي الخاصة بالمؤسسة وتوفير شروحات صوتية داعمة للطلاب في منازلهم.',
    tag: 'محتوى صوتي ومرئي',
  },
]

// الأسئلة الشائعة (10 أسئلة)
const institutionalFaqs = [
  {
    q: 'هل البرنامج مناسب للمعلمين غير المتخصصين بالتقنية؟',
    a: 'نعم تماماً. صُمم البرنامج ليكون عملياً ومبسطاً للغاية، ولا يتطلب أي خلفية برمجية أو تقنية معقدة. الشرح يركز على الخطوات المنطقية الواضحة التي يمكن لأي معلم تطبيقها بسهولة ومن أول جلسة.',
  },
  {
    q: 'هل يمكن تطبيقه على مناهج المؤسسة نفسها؟',
    a: 'بالتأكيد، وهذا هو جوهر البرنامج المؤسسي. لا نعتمد على أمثلة نظرية عامة، بل نطلب منكم تزويدنا بصفحات أو دروس حقيقية من كتبكم ومناهجكم ليتم التطبيق عليها واختبار المخرجات الواقعية.',
  },
  {
    q: 'هل يناسب جميع المواد والمراحل الدراسية؟',
    a: 'نعم، المنهجية مرنة وتغطي المواد العلمية (كالرياضيات والعلوم والفيزياء) والأدبية (كالّلغات والتاريخ والتربية)، وتخدم المراحل من التعليم الأساسي وحتى المرحلة الثانوية، مع مراعاة خصائص كل فئة عمرية.',
  },
  {
    q: 'هل التدريب مباشر أم مسجل؟',
    a: 'نوفر مزيجاً مرناً: محتوى تدريبي أساسي ومسجل بجودة عالية يتيح للمعلم المتابعة في الوقت المناسب له، مع إمكانية تنظيم جلسات تفاعلية مباشرة (عن بُعد) للتطبيق العملي والنقاش والإجابة على استفسارات الفريق.',
  },
  {
    q: 'كم عدد المعلمين في كل مجموعة تدريبية؟',
    a: 'نوصي بمجموعات تتراوح بين 5 إلى 15 معلماً في الورش التطبيقية المباشرة لضمان المتابعة الفردية الدقيقة وجودة مراجعة التطبيقات، مع إمكانية تدريب فرق متعددة متوازية للمدارس الكبيرة.',
  },
  {
    q: 'هل يحتاج المعلمون إلى أجهزة لابتوب خاصة؟',
    a: 'الأفضل توفر حاسوب محمول لتسهيل نسخ وتنسيق المستندات والملفات المدرسية، لكن كافة الأدوات والمسارات تعمل بكفاءة أيضاً من الأجهزة اللوحية (Tablets) والهواتف الذكية.',
  },
  {
    q: 'هل يحصل المعلمون على قوالب وملفات تطبيقية؟',
    a: 'نعم، يتسلم الفريق مكتبة متكاملة من قوالب الأوامر التعليمية (Prompts)، وملفات تنسيق الاختبارات، ونماذج العروض التقديمية والملخصات لتعديلها واستخدامها في مهامهم اليومية مباشرة.',
  },
  {
    q: 'كيف تتم متابعة الفريق بعد التدريب؟',
    a: 'نوفر فترة متابعة للإجابة على الأسئلة الطارئة وتقديم التغذية الراجعة على المخرجات التي ينتجها المعلمون، والتأكد من تحول التدريب إلى ممارسة يومية مستدامة داخل المؤسسة.',
  },
  {
    q: 'كيف يتم التعامل مع خصوصية ملفات المؤسسة وبيانات الطلاب؟',
    a: 'نلتزم بسياسات أمان صارمة؛ حيث نعلّم الفريق حظر رفع أي بيانات تعريفية شخصية للطلاب، والاعتماد حصراً على نصوص الكتب والمناهج العامة مع احترام الملكية الفكرية للمؤسسة التعليمية.',
  },
  {
    q: 'كيف نطلب عرضًا مناسبًا لمؤسستنا؟',
    a: 'يمكنكم تعبئة نموذج طلب العرض أدناه أو التواصل المباشر عبر واتساب. سنراجع احتياج مؤسستكم وعدد الكادر التدريسي ونرسل لكم مقترحاً متكاملاً يحدد النطاق والخطوات بدقة.',
  },
]

export default function SchoolsClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formStartedRef = useRef(false)

  // بيانات النموذج بحقول دقيقة مطابقة للتوجيهات
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    jobTitle: '',
    countryCity: '',
    whatsappNumber: '',
    email: '',
    teacherCount: '6–10',
    subjectsGrades: '',
    trainingType: 'تدريب مباشر',
    additionalNotes: '',
  })

  useEffect(() => {
    trackInstitutional('institutional_page_view')
  }, [])

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true
      trackInstitutional('institutional_form_start')
    }
  }

  const handlePackageSelect = (pkg: typeof trainingPackages[0]) => {
    setFormData((prev) => ({
      ...prev,
      teacherCount: pkg.teacherCountOption,
      trainingType: pkg.name.includes('مؤسسة')
        ? 'تدريب مخصص'
        : pkg.name.includes('قسم')
        ? 'تدريب مباشر'
        : 'محتوى مسجل',
      additionalNotes: `طلب استفسار عن: ${pkg.name} (${pkg.audience} — السعر الإرشادي: ${pkg.indicativePrice})`,
    }))
    trackInstitutional('institutional_offer_request', { package: pkg.name })
    const el = document.getElementById('request')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    trackInstitutional('institutional_form_submit', {
      institution: formData.institutionName,
      contact: formData.contactPerson,
      training_type: formData.trainingType,
      teacher_count: formData.teacherCount,
    })

    // تجهيز رسالة WhatsApp
    const messageLines = [
      'السلام عليكم ورحمة الله،',
      'أرغب بطلب عرض مؤسسي لبرنامج تدريب فريق المعلمين بالذكاء الاصطناعي:',
      '',
      `🏫 اسم المؤسسة: ${formData.institutionName}`,
      `👤 اسم المسؤول: ${formData.contactPerson}`,
      formData.jobTitle ? `💼 المسمى الوظيفي: ${formData.jobTitle}` : '',
      `📍 الدولة والمدينة: ${formData.countryCity}`,
      `👥 عدد المعلمين: ${formData.teacherCount}`,
      formData.subjectsGrades ? `📚 المواد أو المراحل: ${formData.subjectsGrades}` : '',
      `🎯 نوع التدريب: ${formData.trainingType}`,
      `📱 رقم واتساب: ${formData.whatsappNumber}`,
      formData.email ? `✉️ البريد الإلكتروني: ${formData.email}` : '',
      formData.additionalNotes ? `📝 ملاحظات: ${formData.additionalNotes}` : '',
    ].filter(Boolean)

    // 1. إرسال البيانات آلياً إلى الخادم لتحويلها إلى البريد الإلكتروني info@manasadigital.com
    fetch('/api/institutional-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).catch((err) => {
      console.warn('Failed to send institutional request to API:', err)
    })

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageLines.join('\n'))}`

    // إظهار حالة النجاح
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // توجيه تلقائي لواتساب كخيار مكمل
      window.open(whatsappUrl, '_blank')
    }, 600)
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen text-[#242424]"
      style={{
        backgroundColor: paper,
        fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif',
      }}
    >
      {/* شريط الإعلان والتنقل العلوي للعودة إلى صفحة الأفراد */}
      <div className="bg-[#242424] px-4 py-2 text-center text-xs md:text-sm font-semibold text-white/90">
        <span>صفحة مخصصة لإدارات المدارس، المعاهد، والمؤسسات التعليمية</span>
        <span className="mx-2 text-white/40">•</span>
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-bold text-amber-300 hover:text-white transition underline underline-offset-2"
        >
          <span>للتسجيل الفردي للمعلمين والمدربين اضغط هنا</span>
          <ArrowLeft className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* شريط التنقل الرئيسي */}
      <header
        className="sticky top-0 z-40 border-b bg-white/95 px-5 py-4 backdrop-blur-md"
        style={{ borderColor: line }}
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm"
              style={{ backgroundColor: red }}
            >
              <School className="h-5 w-5" />
            </span>
            <div>
              <div className="text-base md:text-lg font-black tracking-tight text-[#242424]">
                كورس الذكاء الاصطناعي للمعلمين
              </div>
              <div className="text-xs font-bold text-[#E3342F]">
                حلول وبرامج التدريب المؤسسي
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-sm font-bold text-[#555555] hover:text-[#242424] sm:inline-block transition"
            >
              صفحة الأفراد
            </Link>
            <a
              href="#packages"
              className="hidden text-sm font-bold text-[#555555] hover:text-[#242424] md:inline-block transition"
            >
              الباقات الإرشادية
            </a>
            <a
              href="#request"
              onClick={() => trackInstitutional('institutional_offer_request', { source: 'header_nav' })}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs md:text-sm font-bold text-white shadow transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: red }}
            >
              <span>اطلب عرضاً لمؤسستك</span>
              <ArrowLeft className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* القسم الأول: Hero */}
      <section className="relative overflow-hidden px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F7EDEC] px-4 py-1.5 text-xs md:text-sm font-black text-[#B92723] mb-6 border border-red-100">
              <Building2 className="h-4 w-4 text-[#E3342F]" />
              <span>للمدارس الخاصة، المعاهد، مراكز التدريب، والأكاديميات التعليمية</span>
            </div>

            <h1 className="text-3xl font-black leading-[1.3] tracking-tight md:text-5xl lg:text-[3.25rem] text-[#242424]">
              درّب فريقك على استخدام الذكاء الاصطناعي لصناعة محتوى تعليمي أفضل
            </h1>

            <p className="mt-6 text-[17px] md:text-xl leading-[2] text-[#555555] max-w-3xl mx-auto">
              برنامج عملي يساعد المدارس والمعاهد على تحويل الكتب والدروس إلى شروحات، اختبارات، أوراق عمل، عروض ومحتوى تعليمي منظم، مع بقاء المراجعة والقرار بيد المعلم.
            </p>

            {/* الأزرار الرئيسية ورسالة الطمأنة */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#request"
                onClick={() => trackInstitutional('institutional_offer_request', { source: 'hero_primary_btn' })}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base md:text-lg font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  backgroundColor: red,
                  backgroundImage: 'linear-gradient(135deg, #E3342F 0%, #B92723 100%)',
                }}
              >
                <span>اطلب عرضًا مؤسسيًا</span>
                <ArrowLeft className="h-5 w-5" />
              </a>

              <a
                href="#samples"
                onClick={() => trackInstitutional('institutional_sample_click', { source: 'hero_secondary_btn' })}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-7 py-4 text-base font-bold text-[#242424] bg-white border border-[#E2E2DF] hover:bg-[#F0F0EE] transition-all shadow-sm"
              >
                <Presentation className="h-5 w-5 text-[#555555]" />
                <span>شاهد نماذج تطبيقية</span>
              </a>
            </div>

            <p className="mt-5 text-[15px] md:text-[17px] font-semibold text-[#666666] flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>نبدأ بتطبيق عملي على مادة أو درس من منهج مؤسستك.</span>
            </p>
          </div>
        </div>
      </section>

      {/* شريط الثقة (Trust Bar) */}
      <section className="border-y bg-white py-6" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 md:gap-x-10 text-sm md:text-[16px] font-bold text-[#333333]">
            {trustItems.map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم المشكلة */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] mb-3">
              <Target className="h-4 w-4" />
              <span>واقع العمل الأكاديمي في المدارس</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              التحدي ليس في خبرة المعلمين، بل في الوقت الذي يضيع في الأعمال المتكررة
            </h2>
            <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-[#555555]">
              تمتلك المؤسسات التعليمية كفاءات تدريسية متميزة، لكن الروتين الأسبوعي المستمر في إعداد الاختبارات وتنسيق المواد يثقل كاهل المعلمين ويحد من تفرغهم لتطوير أساليب التدريس ورعاية الطلاب.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {problemPoints.map((item, idx) => {
              const IconComp = item.icon
              return (
                <div
                  key={idx}
                  className="rounded-2xl border bg-white p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:border-[#CBD5E1]"
                  style={{ borderColor: line }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl mb-4 text-[#E3342F] bg-[#F7EDEC]">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#242424] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[16px] md:text-[17px] leading-[1.8] text-[#555555]">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* قسم الحل: المسار الموحد للفريق */}
      <section className="border-t bg-white px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
              <Workflow className="h-4 w-4" />
              <span>منهجية العمل المعتمدة</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              من استخدام عشوائي للأدوات إلى نظام عمل واضح للفريق
            </h2>
            <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-[#555555]">
              بدلاً من إضاعة المعلمين في تجارب فردية غير منسقة مع الذكاء الاصطناعي، يكتسب الفريق مساراً أكاديمياً موحداً يضمن الجودة والدقة والاتساق في كل مخرج:
            </p>
          </div>

          {/* المسار الموحد: بطاقات متجاورة ومخطط متجاوب دون أسهم مربكة */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4 md:gap-4">
            {unifiedPath.map((stage, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border p-4 md:p-5 text-right transition-all hover:shadow-sm"
                style={{ borderColor: line, backgroundColor: soft }}
              >
                <span className="inline-block font-black text-xs md:text-sm text-[#E3342F] mb-1">
                  المرحلة {stage.step}
                </span>
                <h3 className="text-base md:text-lg font-black text-[#242424] mb-1 leading-snug">
                  {stage.title}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-[#666666]">
                  {stage.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 md:p-5 text-center max-w-2xl mx-auto text-sm md:text-[16px] font-bold text-amber-950">
            💡 النتيجة: كل درس يمر بدورة عمل متكاملة تبدأ من كتاب المنهج وتنتهي بمادة تعليمية جاهزة راجعها المعلم ودققها بنفسه.
          </div>
        </div>
      </section>

      {/* قسم ما الذي يتعلمه فريق المعلمين؟ */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] mb-3">
              <GraduationCap className="h-4 w-4" />
              <span>المحاور والمهارات العملية</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              ما الذي يتعلمه فريق المعلمين في هذا البرنامج؟
            </h2>
            <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-[#555555]">
              10 مهارات تطبيقية رئيسية تُمكّن المعلم من إنجاز مهامه التعليمية بكفاءة عالية وبقاء القرار واللمسة التربوية بيده:
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {learningSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-start gap-4 rounded-2xl border bg-white p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all hover:border-[#CBD5E1]"
                style={{ borderColor: line }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white"
                  style={{ backgroundColor: red }}
                >
                  {skill.id}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-black text-[#242424] mb-1.5">
                    {skill.title}
                  </h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.8] text-[#555555]">
                    {skill.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الفائدة للمؤسسة */}
      <section className="border-t bg-white px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] mb-3">
              <Building2 className="h-4 w-4" />
              <span>الأثر المؤسسي والاستثماري</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              ما الذي تستفيده مؤسستك؟
            </h2>
            <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-[#555555]">
              الاستثمار في تمكين الفريق ينعكس مباشرة على جودة العملية التعليمية ورضا أولياء الأمور وكفاءة الإدارة الأكاديمية:
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {institutionalBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="rounded-2xl border p-6 text-right transition-all hover:shadow-sm"
                style={{ borderColor: line, backgroundColor: soft }}
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#E3342F]/10 text-[#E3342F]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="text-base md:text-lg font-black text-[#242424] mb-2 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-[15px] md:text-[16px] leading-[1.8] text-[#555555]">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم طريقة العمل مع المؤسسة (4 خطوات) */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] mb-3">
              <Layers className="h-4 w-4" />
              <span>مراحل التنفيذ والشراكة</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              طريقة العمل مع مؤسستكم خطوة بخطوة
            </h2>
            <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-[#555555]">
              نعمل معكم وفق مسار واضح ومدروس يبدأ بفهم واقع المؤسسة ولا ينتهي إلا بعد التأكد من رسوخ المهارة لدى الفريق:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workStages.map((stage) => (
              <div
                key={stage.step}
                className="relative rounded-2xl border bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-right"
                style={{ borderColor: line }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7EDEC] text-[#E3342F] font-black text-lg mb-4">
                  {stage.step}
                </span>
                <h3 className="text-lg font-black text-[#242424] mb-2">
                  {stage.title}
                </h3>
                <p className="text-[15px] md:text-[16px] leading-[1.8] text-[#555555]">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الباقات المقترحة بأسعار إرشادية واضحة */}
      <section id="packages" className="border-t bg-white px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] mb-3">
              <LayoutGrid className="h-4 w-4" />
              <span>باقات أولية واضحة</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              اختر نقطة البداية المناسبة لفريقك
            </h2>
            <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-[#555555]">
              يمكنك البدء بتجربة صغيرة مع عدد محدود من المعلمين، ثم توسيع التدريب لاحقًا حسب احتياج مؤسستك.
            </p>
            <p className="mt-2 text-sm md:text-base font-semibold text-[#777777]">
              الأسعار التالية إرشادية، ويُحدَّد السعر النهائي حسب عدد المعلمين، نوع التدريب، المواد، والمراحل الدراسية.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 items-stretch">
            {trainingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-7 transition-all ${
                  pkg.featured
                    ? 'bg-white border-[#E3342F] shadow-[0_12px_35px_rgba(227,52,47,0.12)] ring-2 ring-[#E3342F]/15'
                    : 'bg-[#FAFAF8] border-[#E2E2DF] shadow-sm'
                }`}
              >
                <div>
                  {pkg.featured && (
                    <div className="mb-4 inline-block rounded-full bg-[#E3342F] px-3.5 py-1 text-xs font-black text-white">
                      ★ {pkg.badge}
                    </div>
                  )}
                  {!pkg.featured && (
                    <div className="mb-4 inline-block rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-bold border border-slate-200">
                      {pkg.badge}
                    </div>
                  )}

                  <h3 className="text-xl md:text-2xl font-black text-[#242424]">
                    {pkg.name}
                  </h3>
                  <div className="mt-1 text-sm font-bold text-[#E3342F]">
                    {pkg.audience}
                  </div>

                  {/* السعر الإرشادي */}
                  <div className="mt-4 rounded-xl bg-white border border-[#E2E2DF] p-3 text-center">
                    <span className="block text-xs font-bold text-[#888888] mb-0.5">السعر الإرشادي:</span>
                    <span className="text-base md:text-lg font-black text-[#242424]">
                      {pkg.indicativePrice}
                    </span>
                  </div>

                  <div className="my-5 border-t border-slate-200" />

                  <ul className="space-y-3 text-[15px] leading-relaxed text-[#444444]">
                    {pkg.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-1" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full rounded-full py-3.5 px-5 text-sm md:text-base font-black transition-all ${
                      pkg.featured
                        ? 'bg-[#E3342F] text-white hover:bg-[#B92723] shadow-md hover:scale-[1.01]'
                        : 'bg-white text-[#242424] border border-[#E2E2DF] hover:bg-[#F0F0EE]'
                    }`}
                  >
                    اطلب عرضًا مناسبًا لمؤسستك
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* الملاحظات الإرشادية تحت الباقات */}
          <div className="mt-10 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] p-5 text-right space-y-2 max-w-3xl mx-auto">
            <p className="text-sm md:text-[15px] font-bold text-[#333333] leading-relaxed">
              📌 <strong>ملاحظة هامة:</strong> الأسعار المذكورة إرشادية، ويُحدَّد العرض النهائي حسب عدد المعلمين، الدولة، المواد والمراحل الدراسية، ونوع التدريب المطلوب: مسجل، مباشر، أو مخصص للمؤسسة.
            </p>
            <p className="text-sm md:text-[15px] font-black text-emerald-800 flex items-center gap-1.5">
              <span>💡</span>
              <span>كلما زاد عدد المعلمين، انخفضت تكلفة المقعد الواحد.</span>
            </p>
          </div>

          {/* مخطط مسار التعاقد والدفع المخصص */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="text-lg md:text-xl font-black text-[#242424]">
                كيف تسير خطوات الاتفاق والدفع للمؤسسات؟
              </h3>
              <p className="mt-1 text-sm text-[#666666]">
                مسار منظم وشفاف يضمن حصول مؤسستكم على عرض ملائم وفواتير رسمية معتمدة:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-4xl mx-auto text-center">
              {contractingSteps.map((s, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm text-right sm:text-center">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#E3342F] text-white text-xs font-black mb-2">
                    {s.num}
                  </span>
                  <h4 className="text-xs md:text-sm font-black text-[#242424] mb-1">
                    {s.title}
                  </h4>
                  <p className="text-[11px] md:text-xs text-[#666666] leading-normal">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-[#666666]">
              <span className="text-[#888888]">طرق الدفع المعتمدة للمؤسسات:</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">مدى Mada</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">فيزا / ماستركارد</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">تكرام باي Tekram</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">شام كاش</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">تحويل بنكي رسمي + فاتورة</span>
            </div>
          </div>
        </div>
      </section>

      {/* قسم النماذج (شاهد نوع المخرجات) */}
      <section id="samples" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] mb-3">
              <Presentation className="h-4 w-4" />
              <span>مخرجات تعليمية واقعية</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              شاهد نوع المخرجات التي يمكن لفريقك تعلم إنتاجها
            </h2>
            <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-[#555555]">
              نماذج تطبيقية حقيقية تم إنتاجها بالبدء من كتب المناهج المدرسية ومراجعتها واعتمادها تربوياً قبل الاستخدام:
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {samplesData.map((sample, idx) => (
              <div
                key={idx}
                className="rounded-2xl border bg-white p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-right flex flex-col justify-between"
                style={{ borderColor: line }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {sample.tag}
                    </span>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      ✓ نموذج تطبيقي بعد المراجعة
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-black text-[#242424] mb-3">
                    {sample.title}
                  </h3>

                  <div className="space-y-2 text-sm md:text-[15px] leading-relaxed text-[#555555] bg-[#F8F8F6] p-4 rounded-xl border border-[#E2E2DF]">
                    <p>
                      <strong className="text-[#242424]">المصدر: </strong>
                      {sample.source}
                    </p>
                    <p>
                      <strong className="text-[#242424]">الناتج: </strong>
                      {sample.result}
                    </p>
                    <p>
                      <strong className="text-[#E3342F]">كيف يُستخدم في المؤسسة: </strong>
                      {sample.institutionalUse}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/schools/results"
              onClick={() => trackInstitutional('institutional_sample_click', { source: 'view_all_samples_btn' })}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#242424] px-8 py-3.5 text-sm md:text-base font-bold text-[#242424] hover:bg-[#242424] hover:text-white transition-all shadow-sm"
            >
              <span>شاهد جميع النماذج والمخرجات التطبيقية للمؤسسات</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* قسم الأمان والمسؤولية */}
      <section className="border-t bg-white px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
              <ShieldCheck className="h-4 w-4" />
              <span>النزاهة الأكاديمية والخصوصية</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              الذكاء الاصطناعي مساعد، وليس بديلًا عن المعلم
            </h2>
            <p className="mt-4 text-[17px] md:text-xl leading-[2] text-[#444444] font-medium">
              يتعلم الفريق كيف يستخدم الأدوات كمساعد في التحليل والمسودة والإخراج، بينما يبقى اختيار المحتوى، تدقيق المعلومات، مراعاة مستوى الطلاب، والاعتماد النهائي بيد المعلم والمؤسسة.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {[
              { title: 'حماية بيانات الطلاب', desc: 'عدم إدخال أي أسماء أو درجات أو بيانات شخصية للطلاب في الأدوات العامة.' },
              { title: 'المراجعة قبل الاستخدام', desc: 'فحص كل مخرج بدقة قبل طباعته أو توزيعه للتأكد من الملاءمة التربوية.' },
              { title: 'عدم الاعتماد الآلي المطلق', desc: 'التعامل مع مخرجات الذكاء الاصطناعي كمسودات أولية تحتاج للمراجعة والتدقيق.' },
              { title: 'احترام خصوصية المؤسسة', desc: 'الحفاظ على سرية الخطط والملفات الداخلية للمؤسسة والعمل بأمان.' },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-2xl border p-5 text-right bg-[#FAFAF8]"
                style={{ borderColor: line }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-black text-sm mb-3">
                  ✓
                </div>
                <h3 className="text-base font-black text-[#242424] mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs md:text-sm leading-[1.7] text-[#555555]">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الأسئلة الشائعة (10 أسئلة) */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] mb-3">
              <HelpCircle className="h-4 w-4" />
              <span>إجابات واضحة ومباشرة</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              الأسئلة الشائعة لإدارات المدارس والمعاهد
            </h2>
          </div>

          <div className="space-y-3">
            {institutionalFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border bg-white transition-all"
                  style={{ borderColor: line }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-right font-bold text-[#242424] hover:bg-slate-50 transition"
                  >
                    <span className="text-base md:text-lg font-black leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#888888] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#E3342F]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t px-5 pb-5 pt-3 text-[16px] md:text-[17px] leading-[1.9] text-[#555555]" style={{ borderColor: line }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* نموذج طلب العرض المؤسسي */}
      <section id="request" className="border-t bg-white px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[800px]">
          <div className="rounded-3xl border bg-[#FAFAF8] p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)]" style={{ borderColor: line }}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] bg-[#F7EDEC] px-3.5 py-1 rounded-full mb-3">
                <Send className="h-3.5 w-3.5" />
                <span>طلب عرض رسمي مخصص</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#242424]">
                خلينا نعرف احتياج مؤسستك
              </h2>
              <p className="mt-3 text-[16px] md:text-lg text-[#666666]">
                أدخل تفاصيل مؤسستكم وسنتواصل معكم لمناقشة الخيار الأنسب وتقديم خطة تدريب وعرض سعر مخصص.
              </p>
            </div>

            {isSubmitted ? (
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-emerald-950 mb-2">
                  وصلنا طلبك بنجاح!
                </h3>
                <p className="text-base md:text-lg text-emerald-900 font-semibold max-w-lg mx-auto leading-relaxed">
                  وصلنا طلبك. رح نراجع عدد المعلمين واحتياج المؤسسة ونبعتلك العرض الأنسب وطريقة الدفع المناسبة.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-4 py-1.5 text-xs font-bold text-emerald-900 border border-emerald-300">
                  <Mail className="h-3.5 w-3.5 text-emerald-700" />
                  <span>تم توجيه نسخة من الطلب آلياً إلى بريد الإدارة:</span>
                  <span dir="ltr" className="font-mono font-black text-[#E3342F]">info@manasadigital.com</span>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow hover:opacity-95"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>متابعة الطلب عبر WhatsApp مباشرة</span>
                  </a>
                  <a
                    href={`mailto:info@manasadigital.com?subject=${encodeURIComponent(`طلب تدريب مؤسسي: ${formData.institutionName}`)}&body=${encodeURIComponent(`المؤسسة: ${formData.institutionName}\nالمسؤول: ${formData.contactPerson}\nواتساب: ${formData.whatsappNumber}\nالدولة والمدينة: ${formData.countryCity}\nعدد المعلمين: ${formData.teacherCount}\nنوع التدريب: ${formData.trainingType}\nالملاحظات: ${formData.additionalNotes}`)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-800 border border-slate-300 shadow-sm hover:bg-slate-50"
                  >
                    <Mail className="h-4 w-4 text-[#E3342F]" />
                    <span>إرسال بريد إلكتروني مباشر</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-slate-600 underline"
                  >
                    تعديل البيانات أو إرسال طلب جديد
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} onFocus={handleFormStart} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      1. اسم المؤسسة التعليمية *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: مدارس النور الأهلية"
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      2. اسم المسؤول *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: أ. عبد الرحمن السعدي"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      3. الدولة والمدينة *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: السعودية — الرياض"
                      value={formData.countryCity}
                      onChange={(e) => setFormData({ ...formData, countryCity: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      المسمى الوظيفي (اختياري)
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: مدير المعهد / مشرف التدريب"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      4. عدد المعلمين المستهدفين تقريبًا *
                    </label>
                    <select
                      value={formData.teacherCount}
                      onChange={(e) => setFormData({ ...formData, teacherCount: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    >
                      <option value="1–5">1–5 معلمين</option>
                      <option value="6–10">6–10 معلمين</option>
                      <option value="11–20">11–20 معلماً</option>
                      <option value="21–50">21–50 معلماً</option>
                      <option value="أكثر من 50">أكثر من 50 معلماً</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      6. نوع التدريب المطلوب *
                    </label>
                    <select
                      value={formData.trainingType}
                      onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    >
                      <option value="محتوى مسجل">محتوى مسجل</option>
                      <option value="تدريب مباشر">تدريب مباشر</option>
                      <option value="تدريب مخصص">تدريب مخصص</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      5. المواد أو المراحل الدراسية
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: الرياضيات والعلوم — المرحلة المتوسطة"
                      value={formData.subjectsGrades}
                      onChange={(e) => setFormData({ ...formData, subjectsGrades: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      7. رقم WhatsApp للتواصل *
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder="+966 5x xxx xxxx"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] text-right focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                    البريد الإلكتروني المؤسسي (اختياري)
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    placeholder="info@school.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] text-right focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                    style={{ borderColor: line }}
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                    8. الملاحظات أو التفاصيل الإضافية
                  </label>
                  <textarea
                    rows={3}
                    placeholder="أي ملاحظات حول المنهج، توقيت البدء المناسب، أو استفسارات حول طريقة الدفع المعتمدة..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                    style={{ borderColor: line }}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full py-4 text-base md:text-lg font-black text-white shadow-lg transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-75"
                    style={{
                      backgroundColor: red,
                      backgroundImage: 'linear-gradient(135deg, #E3342F 0%, #B92723 100%)',
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>جاري إرسال الطلب...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-5 w-5" />
                        <span>احصل على عرض مؤسستك</span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* الدعوة النهائية للإجراء (Final CTA) */}
      <section className="px-5 py-16 md:px-8 md:py-20 text-center" style={{ backgroundColor: '#242424' }}>
        <div className="mx-auto max-w-[850px] text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs md:text-sm font-bold text-amber-300 mb-6">
            <Sparkles className="h-4 w-4" />
            <span>خطوة عملية تبدأ من منهجكم</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black leading-tight">
            ابدأ بخطوة تطبيقية صغيرة قبل اعتماد البرنامج
          </h2>

          <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-white/80 max-w-2xl mx-auto">
            أرسل لنا معلومات مؤسستك، وسنقترح لك طريقة مناسبة لبدء التدريب حسب عدد المعلمين والمواد والمراحل.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#request"
              onClick={() => trackInstitutional('institutional_offer_request', { source: 'final_cta' })}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base md:text-lg font-black text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              style={{ backgroundColor: red }}
            >
              <span>احصل على عرض مؤسستك</span>
              <ArrowLeft className="h-5 w-5" />
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً، أود الاستفسار عن برامج التدريب المؤسسي للمدارس والمعاهد.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackInstitutional('institutional_whatsapp_click', { source: 'final_cta_whatsapp' })}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 px-7 py-4 text-base font-bold text-white transition-all shadow"
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              <span>تواصل مع فريقنا عبر WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white px-5 py-8 text-center text-xs md:text-sm text-[#777777]" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} — كورس الذكاء الاصطناعي للمعلمين · برامج التدريب المؤسسي
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="underline hover:text-[#242424]">
              صفحة التسجيل الفردي للمعلمين
            </Link>
            <span>•</span>
            <Link href="/schools/results" className="underline hover:text-[#242424]">
              نماذج مخرجات المؤسسات
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
