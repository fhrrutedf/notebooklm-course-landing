'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
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
  Quote,
  Receipt,
  School,
  Search,
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
  Wrench,
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
  'تدريب عملي للفرق والمعلمين',
  'تطبيق على مناهج ومواد المؤسسة',
  'قوالب ونماذج قابلة للتعديل',
  'مشاريع عملية ومتابعة بعد التدريب',
  'مراجعة بشرية واعتماد تربوي للمخرجات',
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

// فوائد المؤسسة والأثر المؤسسي (8 محاور رئيسية)
const institutionalBenefits = [
  {
    title: 'تقليل وقت إعداد الدروس والاختبارات',
    desc: 'تمكين المعلم من اختصار ساعات الصياغة الروتينية واستثمارها في متابعة الطلاب والتدريس الصفي الفعّال.',
  },
  {
    title: 'توحيد طريقة إعداد المواد بين المعلمين',
    desc: 'اعتماد معايير ونماذج موحدة بين شُعب المادة الواحدة بدلاً من التباين الفردي العشوائي بين الفصول.',
  },
  {
    title: 'بناء مكتبة قوالب قابلة للاستخدام المتكرر',
    desc: 'تأسيس أصول رقمية وأوامر مخصصة (Prompts) وقوالب جاهزة تبقى رصيداً مستداماً للمؤسسة.',
  },
  {
    title: 'تحسين جودة المخرجات التعليمية',
    desc: 'إنتاج أوراق عمل واختبارات وعروض ومذكرات بمستوى أكاديمي وتنظيمي رفيع يعكس المكانة المميزة للمؤسسة.',
  },
  {
    title: 'تدريب الفريق على الاستخدام الآمن والمسؤول',
    desc: 'ترسيخ معايير الأمان والخصوصية والنزاهة الأكاديمية مع حظر مشاركة أي بيانات حساسة أو خاصة بالطلاب.',
  },
  {
    title: 'إنتاج محتوى تعليمي قابل للمراجعة والتطوير',
    desc: 'كل مخرج يمر بخطوة الفحص والتدقيق التربوي قبل طباعته أو اعتماده لضمان الموثوقية والدقة العلمية.',
  },
  {
    title: 'رفع كفاءة الأقسام الأكاديمية',
    desc: 'تنسيق متقن بين رؤساء الأقسام والمعلمين وتسريع إنجاز بنوك الأسئلة وخطط العمل المشتركة.',
  },
  {
    title: 'بناء طريقة عمل مستدامة داخل المؤسسة',
    desc: 'تحويل الذكاء الاصطناعي من تجارب فردية متفرقة إلى سير عمل منهجي مستمر يخدم المؤسسة على المدى البعيد.',
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

// أنواع التدريب المؤسسي الثلاثة
const trainingTypesList = [
  {
    id: 'recorded',
    num: '01',
    title: 'محتوى إلكتروني مسجل',
    subtitle: 'مسار رقمي منظم ومرن',
    desc: 'محتوى منظم يمكن للمشاركين مشاهدته والعودة إليه في أي وقت، مع إمكانية إضافة جلسات أسئلة وتطبيق حسب الاتفاق.',
    points: [
      'محتوى تدريبي مقسم بدقة إلى خطوات عملية.',
      'مرونة كاملة في أوقات المتابعة لكل معلم.',
      'إمكانية إضافة جلسات نقاش وتطبيق حسب رغبة المؤسسة.',
    ],
    icon: Video,
  },
  {
    id: 'live',
    num: '02',
    title: 'تدريب مباشر عن بُعد',
    subtitle: 'جلسات تفاعلية حية وتطبيق فوري',
    desc: 'جلسات مباشرة تشمل شرحاً وتطبيقاً وأسئلة وأجوبة ومهام عملية مع المدرب خطوة بخطوة.',
    points: [
      'شرح حي ومباشر مع مشاركة الشاشة والأدوات.',
      'تطبيق عملي وتفاعل وتلقي أسئلة الفريق فورياً.',
      'مهام وتطبيقات صفية مصغرة وتقييم مباشر.',
    ],
    icon: Presentation,
  },
  {
    id: 'custom',
    num: '03',
    title: 'تدريب مؤسسي مخصص',
    subtitle: 'برنامج مصمم بالكامل لمنهجكم وفروعكم',
    desc: 'برنامج يُبنى حسب مواد المؤسسة ومراحلها وأقسامها، ويشمل تطبيقات وقوالب ومشاريع ومتابعة حسب نطاق الاتفاق.',
    points: [
      'تطبيق مباشر على كتب ومناهج المؤسسة المعتمدة.',
      'إعداد مكتبة قوالب وأوامر خاصة بهوية المؤسسة.',
      'مشاريع عملية للفريق وجلسات متابعة بعد التدريب.',
    ],
    icon: School,
  },
]

// الباقات والأسعار المؤسسية الجديدة
const trainingPackages = [
  {
    id: 'foundations',
    name: 'باقة التأسيس المؤسسي',
    audience: 'مناسبة لـ 5 إلى 10 معلمين',
    badge: 'تأسيس وتطبيق أولي',
    indicativePrice: 'يبدأ من 4,900 ريال سعودي',
    priceNote: 'قد يرتفع السعر حسب مستوى التخصيص وعدد المواد والمخرجات المطلوبة.',
    teacherCountOption: '5–10 معلمين',
    trainingTypeOption: 'محتوى إلكتروني مسجل',
    points: [
      'جلسة تشخيص أولية لاحتياج المؤسسة.',
      'محتوى تدريبي إلكتروني منظم.',
      'جلسة تعريفية للفريق.',
      'تطبيق أولي على درس أو مادة من مواد المؤسسة.',
      'قوالب تعليمية قابلة للتعديل.',
      'جلسة أسئلة وتطبيق.',
      'توجيه أولي للمشاركين.',
      'ملخص بالمخرجات والتوصيات.',
    ],
  },
  {
    id: 'academic_team',
    name: 'باقة تطوير الفريق الأكاديمي',
    audience: 'مناسبة لـ 10 إلى 20 معلماً أو موظفاً',
    badge: 'الخيار الأكثر طلباً للمدارس والمعاهد',
    indicativePrice: 'يبدأ من 9,500 ريال سعودي',
    priceNote: 'يُرفع السعر أو يُخفض بحسب عدد الساعات، وعدد المواد، ومستوى التخصيص، وعدد المشاريع والمتابعة المطلوبة.',
    featured: true,
    teacherCountOption: '10–20 معلماً',
    trainingTypeOption: 'تدريب مباشر عن بُعد',
    points: [
      'تحليل احتياج المؤسسة.',
      'تدريب مباشر أو مسار إلكتروني منظم حسب الاتفاق.',
      'تطبيق على أكثر من مادة أو مرحلة دراسية.',
      'تدريب على إعداد الدروس والمحاضرات.',
      'إنشاء الأسئلة والاختبارات وبنوك الأسئلة.',
      'إعداد العروض والملخصات وملفات PDF.',
      'إنشاء الفيديوهات التعليمية والصوت والـPodcast.',
      'إنشاء القصص التعليمية.',
      'إعداد خطط العمل والمشاريع التعليمية.',
      'قوالب قابلة لإعادة الاستخدام.',
      'مشروع تطبيقي للفريق.',
      'جلستان أو أكثر للأسئلة والتطبيق.',
      'مراجعة أولية للمخرجات.',
      'متابعة بعد التدريب.',
    ],
  },
  {
    id: 'transformation',
    name: 'باقة التحول التعليمي للمؤسسة',
    audience: 'مناسبة لـ 20 إلى 50 معلماً أو أكثر',
    badge: 'حل شامل متعدد الأقسام والمراحل',
    indicativePrice: 'يبدأ من 18,000 ريال سعودي',
    priceNote: 'السعر النهائي يحدد بعد معرفة عدد الأقسام، وعدد المشاركين، وعدد المواد، ونطاق التخصيص، والمدة الزمنية المطلوبة.',
    teacherCountOption: '20–50 معلماً',
    trainingTypeOption: 'تدريب مؤسسي مخصص',
    points: [
      'دراسة احتياج المؤسسة وأقسامها.',
      'تدريب عدة مجموعات أو أقسام.',
      'تطبيق على مواد ومناهج المؤسسة.',
      'بناء منهجية موحدة لإعداد الدروس والاختبارات.',
      'إنشاء مكتبة قوالب وأوامر خاصة بالمؤسسة.',
      'إعداد نماذج عمل قابلة للتطبيق بين الأقسام.',
      'مشاريع عملية للمعلمين.',
      'مراجعة المخرجات.',
      'جلسات متابعة.',
      'تقرير مختصر عن التطبيق والمخرجات.',
      'خطة مقترحة لاستدامة استخدام الذكاء الاصطناعي داخل المؤسسة.',
    ],
  },
  {
    id: 'custom_full',
    name: 'برنامج مخصص بالكامل',
    audience: 'للمدارس والشبكات والمجمعات الكبرى',
    badge: 'نظام عمل متكامل واستشارات',
    indicativePrice: 'يحدد بعد دراسة الاحتياج',
    priceNote: 'يتم بناء خطة العمل والتكلفة بالكامل بعد جلسة استشارية لدراسة الاحتياج مع إدارة المؤسسة.',
    description: 'برنامج مخصص للمؤسسات التي ترغب في بناء نظام عمل متكامل للذكاء الاصطناعي في التعليم، مع محتوى خاص، وقوالب مؤسسية، وتطبيقات على المناهج، ومشاريع، ومتابعة، وتقارير مخرجات.',
    teacherCountOption: 'أكثر من 50 معلماً',
    trainingTypeOption: 'تدريب مؤسسي مخصص',
    points: [
      'استشارات مخصصة وتصميم حقيبة تدريبية حصرية.',
      'تدريب ممتد لجميع الأفرع والأقسام التعليمية.',
      'بناء وتطوير مسارات عمل مؤتمتة خاصة بالمؤسسة.',
      'إعداد وتخصيص مكتبة أوامر وقوالب مؤسسية.',
      'تطبيقات عملية ومشاريع مخصصة لكل قسم ومرحلة.',
      'مراجعة وتقييم دوري شامل لجميع المخرجات التربوية.',
      'جلسات متابعة وتقارير مخرجات تفصيلية للإدارة.',
      'خطة استدامة طويلة المدى ودعم فني واستشاري متواصل.',
    ],
  },
]

// العوامل الـ 12 المحددة للنطاق السعري المرن
const pricingFactorsList = [
  'عدد المعلمين والموظفين',
  'عدد الساعات التدريبية',
  'عدد الجلسات',
  'نوع التدريب: مسجل، مباشر، أو مخصص',
  'عدد المواد والمراحل الدراسية',
  'مستوى تخصيص المحتوى',
  'عدد المشاريع العملية',
  'مستوى المتابعة بعد التدريب',
  'إعداد القوالب الخاصة بالمؤسسة',
  'عدد الأقسام أو الفروع',
  'الحاجة إلى تقارير ومراجعة مخرجات',
  'التدريب لمجموعة واحدة أو عدة مجموعات',
]

// مسار التعاقد والدفع للمؤسسات
const contractingSteps = [
  { num: '1', title: 'طلب العرض الأولي', desc: 'تحديد عدد المعلمين ونوع التدريب والمواد' },
  { num: '2', title: 'دراسة الاحتياج الأكاديمي', desc: 'جلسة تشخيص سريعة لتحديد نطاق التخصيص' },
  { num: '3', title: 'عرض فني ومالي مخصص', desc: 'عرض رسمي مفصل يحدد المخرجات والتكلفة بدقة' },
  { num: '4', title: 'اعتماد العرض وإصدار الفاتورة', desc: 'فواتير ضريبية رسمية معتمدة للمؤسسات' },
  { num: '5', title: 'بدء التدريب والمتابعة', desc: 'مسار عمل تطبيقي منظم مع تقارير مخرجات' },
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

// الأسئلة الشائعة لإدارات المدارس والمعاهد (تتضمن الأسئلة المؤسسية الخمسة أولاً)
const institutionalFaqs = [
  {
    q: 'هل الأسعار ثابتة لجميع المؤسسات؟',
    a: 'لا. الأسعار إرشادية وتبدأ من قيمة محددة، بينما يحدد السعر النهائي حسب عدد المشاركين، نوع التدريب، عدد الساعات، المواد والمراحل، مستوى التخصيص، المشاريع، والمتابعة المطلوبة.',
  },
  {
    q: 'ما سبب ارتفاع سعر البرامج المؤسسية؟',
    a: 'البرنامج المؤسسي لا يقتصر على الوصول إلى محتوى عام، بل قد يتضمن تحليل احتياج المؤسسة، تطبيقاً على موادها ومناهجها، تدريب فريق كامل، قوالب خاصة، مشاريع عملية، مراجعة مخرجات، ومتابعة بعد التدريب.',
  },
  {
    q: 'هل يمكن تخفيض السعر؟',
    a: 'نعم، يمكن تعديل نطاق البرنامج والسعر حسب عدد المشاركين، ونوع التدريب، وعدد الساعات، ومستوى التخصيص، والمخرجات المطلوبة.',
  },
  {
    q: 'هل يمكن أن يرتفع السعر عن السعر الإرشادي؟',
    a: 'نعم. قد يرتفع السعر عند طلب تخصيص كامل، أو تدريب عدة أقسام، أو تطبيق على مواد متعددة، أو إعداد قوالب ومشاريع خاصة، أو إضافة جلسات متابعة وتقارير مخرجات.',
  },
  {
    q: 'هل السعر يشمل جميع موظفي المؤسسة؟',
    a: 'السعر يحدد حسب العدد ونطاق التنفيذ. ويذكر العرض الفني والمالي النهائي عدد المشاركين والخدمات والمخرجات المشمولة بوضوح.',
  },
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
    q: 'كيف يتم التعامل مع خصوصية ملفات المؤسسة وبيانات الطلاب؟',
    a: 'نلتزم بسياسات أمان صارمة؛ حيث نعلّم الفريق حظر رفع أي بيانات تعريفية شخصية للطلاب، والاعتماد حصراً على نصوص الكتب والمناهج العامة مع احترام الملكية الفكرية للمؤسسة التعليمية.',
  },
  {
    q: 'كيف نطلب عرضاً مناسباً لمؤسستنا؟',
    a: 'يمكنكم تعبئة نموذج طلب العرض أدناه أو التواصل المباشر عبر واتساب. سنراجع احتياج مؤسستكم وعدد الكادر التدريسي ونرسل لكم مقترحاً متكاملاً يحدد النطاق والخطوات بدقة.',
  },
]

const trainerTrainingSessions = [
  {
    title: 'إعداد معلم رقمي',
    audience: 'المعلمون والعاملون في التعليم',
    description: 'جلسة عملية لبناء معلم رقمي قادر على تنظيم المحتوى، إعداد الأنشطة، وتوظيف الأدوات الحديثة في التحضير والتواصل مع الطلاب.',
    images: ['/images/training/digital-teacher-01.png', '/images/training/digital-teacher-02.png'],
  },
  {
    title: 'أتمتة المهام والعمليات المتكررة',
    audience: 'الكوادر المهنية والأكاديمية — جامعة حمص',
    description: 'جلسة تطبيقية حول تحويل المهام المتكررة إلى سير عمل أكثر تنظيمًا باستخدام أدوات الذكاء الاصطناعي والأتمتة.',
    images: ['/images/training/agri-automation-01.png', '/images/training/agri-automation-02.png'],
  },
  {
    title: 'إعداد المحتوى بالذكاء الاصطناعي',
    audience: 'صنّاع المحتوى والمهتمون بالتعليم والتأهيل',
    description: 'تدريب على التخطيط للمحتوى، توليد الأفكار، كتابة النصوص، وتجهيز مواد قابلة للنشر والتدريس مع الحفاظ على هوية المؤسسة.',
    images: ['/images/training/ai-content-01.png', '/images/training/ai-content-02.png'],
  },
  {
    title: 'Vibe Coding — البرمجة بالذكاء الاصطناعي',
    audience: 'المبرمجون وصنّاع الحلول والتطبيقات',
    description: 'جلسة تطبيقية لتحويل الفكرة إلى نموذج أولي، وبناء الواجهات، وفهم الكود، واختبار الأخطاء بمساعدة الذكاء الاصطناعي.',
    images: ['/images/training/vibe-coding-01.png'],
  },
  {
    title: 'جلسات تفاعلية Online في الذكاء الاصطناعي',
    audience: 'متدربون وفرق عمل تعليمية عن بُعد',
    description: 'جلسات تفاعلية مباشرة عبر الإنترنت تضمنت مشاركة الشاشة، شرح الوصول إلى أدوات الذكاء الاصطناعي، والإجابة عن أسئلة المشاركين خطوة بخطوة.',
    images: ['/images/training/online-ai-01.png', '/images/training/online-ai-02.png'],
  },
]

export default function SchoolsClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formStartedRef = useRef(false)

  // بيانات النموذج بحقول دقيقة وشاملة للمؤسسات
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    jobTitle: '',
    countryCity: '',
    whatsappNumber: '',
    email: '',
    teacherCount: '10–20 معلماً',
    branchesCount: 'فرع واحد',
    subjectsGrades: '',
    trainingType: 'تدريب مباشر عن بُعد',
    expectedHours: '8–12 ساعة تدريبية',
    customizationLevel: 'تخصيص متوسط مع قوالب للمؤسسة',
    outputsCount: 'مشروعان تطبيقيان ومخرجات صفية',
    followUpMethod: 'جلسات متابعة مباشرة بعد التدريب',
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
      trainingType: pkg.trainingTypeOption,
      additionalNotes: `طلب استفسار عن: ${pkg.name} (${pkg.audience} — السعر الإرشادي: ${pkg.indicativePrice})`,
    }))
    trackInstitutional('institutional_offer_request', { package: pkg.name })
    const el = document.getElementById('request')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    trackInstitutional('institutional_form_submit', {
      institution: formData.institutionName,
      contact: formData.contactPerson,
      training_type: formData.trainingType,
      teacher_count: formData.teacherCount,
    })

    // إرسال البيانات آلياً لضمان وصولها إلى البريد info@manasadigital.com فوراً
    try {
      await Promise.allSettled([
        fetch('/api/institutional-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }),
        fetch('https://formsubmit.co/ajax/03913a3be76582fa45b5a9f1bc2260ff', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `طلب تدريب مؤسسي جديد: ${formData.institutionName} - ${formData.contactPerson}`,
            _template: 'table',
            'اسم المؤسسة': formData.institutionName,
            'اسم المسؤول': formData.contactPerson,
            'المسمى الوظيفي': formData.jobTitle || 'غير محدد',
            'الدولة والمدينة': formData.countryCity,
            'عدد المشاركين': formData.teacherCount,
            'عدد الأقسام أو الفروع': formData.branchesCount,
            'المواد والمراحل': formData.subjectsGrades || 'غير محدد',
            'نوع التدريب المطلوب': formData.trainingType,
            'عدد الساعات المتوقع': formData.expectedHours,
            'مستوى التخصيص': formData.customizationLevel,
            'المشاريع أو المخرجات': formData.outputsCount,
            'طريقة المتابعة': formData.followUpMethod,
            'رقم واتساب': formData.whatsappNumber,
            'البريد الإلكتروني': formData.email || 'لم يُذكر',
            'الملاحظات والاحتياج الخاص': formData.additionalNotes || 'لا توجد',
          }),
        }),
      ])
    } catch (err) {
      console.warn('Failed to send institutional request:', err)
    }

    // إظهار حالة النجاح مباشرة داخل الصفحة دون أي تحويل تلقائي إطلاقاً
    setIsSubmitting(false)
    setIsSubmitted(true)
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
      {/* شريط الإعلان والتنقل العلوي للمؤسسات */}
      <div className="bg-[#242424] px-4 py-2 text-center text-xs md:text-sm font-semibold text-white/90">
        <span>بوابة التدريب المؤسسي المخصصة لإدارات المدارس، المعاهد، والجهات التعليمية في السعودية ودول الخليج العربي</span>
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
            <a
              href="#training-types"
              className="hidden text-sm font-bold text-[#555555] hover:text-[#242424] md:inline-block transition"
            >
              أنواع التدريب
            </a>
            <a
              href="#packages"
              className="hidden text-sm font-bold text-[#555555] hover:text-[#242424] md:inline-block transition"
            >
              الباقات والأسعار
            </a>
            <a
              href="#trainer"
              className="hidden text-sm font-bold text-[#555555] hover:text-[#242424] lg:inline-block transition"
            >
              عن المدرب
            </a>
            <a
              href="#faq"
              className="hidden text-sm font-bold text-[#555555] hover:text-[#242424] lg:inline-block transition"
            >
              الأسئلة الشائعة
            </a>
            <a
              href="#request"
              onClick={() => trackInstitutional('institutional_offer_request', { source: 'header_nav' })}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs md:text-sm font-bold text-white shadow transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: red }}
            >
              <span>احصل على عرض مؤسستك</span>
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
              <span>للمدارس الخاصة، المعاهد، ومؤسسات التعليم في السعودية والخليج</span>
            </div>

            <h1 className="text-3xl font-black leading-[1.3] tracking-tight md:text-5xl lg:text-[3.25rem] text-[#242424]">
              درّب فريقك الأكاديمي على الذكاء الاصطناعي وصناعة محتوى تعليمي احترافي
            </h1>

            <p className="mt-6 text-[17px] md:text-xl leading-[2] text-[#555555] max-w-3xl mx-auto">
              برامج مؤسسية تبدأ من 4,900 ريال سعودي، وتُحدد قيمتها النهائية حسب نطاق التدريب والتخصيص. للمؤسسات التي تحتاج إلى تدريب جماعي وتطبيق عملي على موادها ومناهجها، مع بقاء المراجعة والقرار التربوي بيد المعلم.
            </p>

            <div className="mt-4 text-xs md:text-sm font-bold text-[#E3342F]">
              كل عرض يُبنى حسب عدد المعلمين، عدد الساعات، نوع التدريب، وعدد المخرجات المطلوبة.
            </div>

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
                <span>احصل على عرض فني ومالي لمؤسستك</span>
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

            <p className="mt-5 text-[14px] md:text-[16px] font-bold text-[#444444] flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>تبدأ الأسعار من، ويُحدد العرض النهائي بعد دراسة احتياج المؤسسة.</span>
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {institutionalBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="rounded-2xl border p-5 text-right transition-all hover:shadow-sm"
                style={{ borderColor: line, backgroundColor: soft }}
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#E3342F]/10 text-[#E3342F]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="text-base md:text-lg font-black text-[#242424] mb-2 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-[14px] md:text-[15px] leading-[1.8] text-[#555555]">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

          {/* مقولة قياس الأثر المؤسسي */}
          <div className="mt-8 rounded-2xl border border-red-200 bg-[#F7EDEC] p-5 text-center max-w-3xl mx-auto shadow-sm">
            <p className="text-sm md:text-base font-black text-[#B92723] leading-relaxed">
              «قيمة البرنامج تُقاس بما يبنيه الفريق من مهارات وقوالب وسير عمل قابل للاستخدام بعد انتهاء التدريب، وليس بعدد ساعات الشرح فقط.»
            </p>
          </div>
        </div>
      </section>

      {/* قسم أنواع التدريب المؤسسي الثلاثة */}
      <section id="training-types" className="border-t bg-[#FAFAF8] px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] bg-white px-3.5 py-1 rounded-full border border-red-100 mb-3 shadow-xs">
              <Presentation className="h-4 w-4" />
              <span>أنماط التنفيذ والتدريب</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              أنواع التدريب المؤسسي المتاحة
            </h2>
            <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-[#555555]">
              نقدّم ثلاثة أنماط تدريبية رئيسية تناسب احتياج المؤسسة وجداول كادرها التعليمي ومستوى المتابعة والتخصيص المطلوب:
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {trainingTypesList.map((type) => {
              const IconComp = type.icon
              return (
                <div
                  key={type.id}
                  className="rounded-3xl border bg-white p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-right flex flex-col justify-between hover:border-[#E3342F]/40 transition-all"
                  style={{ borderColor: line }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F7EDEC] text-[#E3342F]">
                        <IconComp className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {type.num}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[#242424] mb-1">
                      {type.title}
                    </h3>
                    <p className="text-xs font-bold text-[#E3342F] mb-3">
                      {type.subtitle}
                    </p>
                    <p className="text-[15px] leading-[1.8] text-[#555555] mb-5">
                      {type.desc}
                    </p>

                    <div className="border-t pt-4 space-y-2.5 text-xs md:text-sm text-[#444444]" style={{ borderColor: line }}>
                      {type.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 md:p-5 text-center max-w-2xl mx-auto text-sm md:text-[16px] font-bold text-amber-950">
            📌 يختلف السعر بحسب نوع التدريب ومستوى التخصيص والمخرجات المطلوبة.
          </div>
        </div>
      </section>

      {/* قسم طريقة العمل مع المؤسسة (4 خطوات) */}
      <section className="border-t px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line }}>
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
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] mb-3">
              <LayoutGrid className="h-4 w-4" />
              <span>باقات التدريب المؤسسي</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#242424] leading-[1.35]">
              باقات التدريب المؤسسي والاستثمار الإرشادي
            </h2>
            <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-[#555555]">
              كل عرض يُبنى حسب عدد المعلمين، عدد الساعات، نوع التدريب، وعدد المخرجات المطلوبة.
            </p>
            <p className="mt-2 text-sm md:text-base font-bold text-[#E3342F]">
              تبدأ الأسعار من، ويُحدد العرض النهائي بعد دراسة احتياج المؤسسة.
            </p>
          </div>

          {/* شبكة الباقات الأربع */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 items-stretch">
            {trainingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-3xl border p-6 md:p-7 transition-all ${
                  pkg.featured
                    ? 'bg-white border-[#E3342F] shadow-[0_12px_35px_rgba(227,52,47,0.12)] ring-2 ring-[#E3342F]/20'
                    : 'bg-[#FAFAF8] border-[#E2E2DF] shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {pkg.featured ? (
                    <div className="mb-4 inline-block rounded-full bg-[#E3342F] px-3 py-1 text-xs font-black text-white shadow-xs">
                      ★ {pkg.badge}
                    </div>
                  ) : (
                    <div className="mb-4 inline-block rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-bold border border-slate-200">
                      {pkg.badge}
                    </div>
                  )}

                  <h3 className="text-xl md:text-2xl font-black text-[#242424] leading-snug">
                    {pkg.name}
                  </h3>
                  <div className="mt-1 text-sm font-bold text-[#E3342F]">
                    {pkg.audience}
                  </div>

                  {/* السعر الإرشادي في مربع بارز */}
                  <div className="mt-4 rounded-2xl bg-white border border-[#E2E2DF] p-3.5 text-center shadow-xs">
                    <span className="block text-xs font-bold text-[#888888] mb-0.5">السعر الإرشادي:</span>
                    <span className="text-base md:text-lg font-black text-[#242424]">
                      {pkg.indicativePrice}
                    </span>
                  </div>

                  {/* ملاحظة السعر للباقة */}
                  <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200/80 p-2.5 text-xs font-medium text-[#666666] leading-relaxed">
                    ℹ️ {pkg.priceNote}
                  </div>

                  {/* وصف إضافي للباقة المخصصة إن وجد */}
                  {(pkg as any).description && (
                    <p className="mt-3 text-xs leading-relaxed text-[#555555]">
                      {(pkg as any).description}
                    </p>
                  )}

                  <div className="my-5 border-t border-slate-200" />

                  <ul className="space-y-3 text-xs md:text-sm leading-relaxed text-[#444444]">
                    {pkg.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full rounded-full py-3.5 px-4 text-xs md:text-sm font-black transition-all ${
                      pkg.featured
                        ? 'bg-[#E3342F] text-white hover:bg-[#B92723] shadow-md hover:scale-[1.01]'
                        : 'bg-white text-[#242424] border border-[#E2E2DF] hover:bg-[#F0F0EE]'
                    }`}
                  >
                    اطلب عرضاً مناسباً لمؤسستك
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* المربع البارز: النطاق السعري المرن */}
          <div className="mt-12 rounded-3xl border-2 border-[#E3342F]/30 bg-[#FAFAF8] p-6 md:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.03)] max-w-4xl mx-auto text-right">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 border-b pb-4 border-slate-200">
              <div>
                <span className="inline-block text-xs font-black uppercase text-[#E3342F] bg-[#F7EDEC] px-3 py-1 rounded-full mb-1">
                  شفافية استثمارية
                </span>
                <h3 className="text-xl md:text-2xl font-black text-[#242424]">
                  الاستثمار التدريبي يختلف حسب نطاق البرنامج
                </h3>
              </div>
              <div className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full shrink-0">
                عروض مرنة ومخصصة
              </div>
            </div>

            <p className="text-[15px] md:text-base leading-[2] text-[#444444] font-medium mb-3">
              الأسعار الظاهرة في الصفحة أسعار إرشادية أولية وليست عروضاً نهائية. قد ينخفض السعر عند اختيار محتوى مسجل محدود أو عدد مشاركين أكبر، وقد يرتفع عند طلب تدريب مباشر موسع، أو تخصيص المحتوى، أو التطبيق على عدة مواد ومراحل، أو إعداد قوالب ومشاريع خاصة بالمؤسسة.
            </p>

            <p className="text-[15px] md:text-base leading-[2] text-[#444444] font-medium mb-6">
              بعد معرفة عدد المشاركين والمواد ونوع التدريب والمخرجات المطلوبة، يتم إعداد عرض فني ومالي خاص بالمؤسسة.
            </p>

            <div className="rounded-2xl bg-white border border-[#E2E2DF] p-5 mb-5">
              <span className="block text-xs font-bold text-[#888888] mb-3">
                العوامل التي تؤثر في تحديد العرض وزيادة أو تخفيض السعر الإرشادي:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs md:text-sm font-semibold text-[#333333]">
                {pricingFactorsList.map((factor, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E3342F] shrink-0" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200">
              <p className="text-xs md:text-sm font-black text-[#B92723]">
                «تبدأ الأسعار من، ويُحدد العرض النهائي بعد دراسة احتياج المؤسسة.»
              </p>
              <a
                href="#request"
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-[#E3342F] hover:bg-[#B92723] transition shadow shrink-0"
              >
                <span>احصل على عرض فني ومالي لمؤسستك</span>
                <ArrowLeft className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* قسم طرق الدفع المعتمدة للمؤسسات داخل سوريا وخارجها */}
          <div className="mt-14 pt-10 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-wider text-[#E3342F] mb-2 inline-block">
                السداد والتعاقد المؤسسي
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-[#242424]">
                طرق دفع مريحة ومعتمدة للمؤسسات داخل سوريا وخارجها
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-[#555555]">
                نوفر خيارات سداد مرنة تتناسب مع اللوائح المالية للمدارس والمعاهد والجهات التعليمية، مع إصدار فواتير رسمية وعقود تدريب موثقة.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto mb-10">
              <article className="rounded-2xl bg-white border p-6 md:p-7 shadow-[0_8px_25px_rgba(0,0,0,0.04)]" style={{ borderColor: line }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-red-50 text-[#E3342F] border border-red-100">
                    داخل سوريا
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ✓ تفعيل فوري
                  </span>
                </div>
                <h4 className="text-xl font-black text-[#242424]">دفع فوري عبر شام كاش</h4>
                <p className="mt-3 text-sm md:text-[15px] leading-[1.9] text-[#555555]">
                  سداد مباشر وفوري عبر <strong>شام كاش</strong> للمؤسسات والمعاهد داخل سوريا، مع استلام إيصال رسمي وبدء تجهيز البرنامج التدريبي مباشرة.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span>بوابة الدفع:</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-800 border border-slate-200">شام كاش Sham Cash</span>
                </div>
              </article>

              <article className="rounded-2xl bg-white border p-6 md:p-7 shadow-[0_8px_25px_rgba(0,0,0,0.04)]" style={{ borderColor: line }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-red-50 text-[#E3342F] border border-red-100">
                    خارج سوريا (السعودية والخليج)
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ✓ بوابات آمنة + فواتير
                  </span>
                </div>
                <h4 className="text-xl font-black text-[#242424]">تحويل ودفع إلكتروني آمن</h4>
                <p className="mt-3 text-sm md:text-[15px] leading-[1.9] text-[#555555]">
                  سداد فوري وآمن بالبطاقات البنكية الدولية (فيزا / ماستركارد)، مدى Mada، PayPal، وتكرام باي Tekram Pay، بالإضافة إلى خيار التحويل البنكي الرسمي للمؤسسات مع إصدار فاتورة ضريبية وعقد تدريب رسمي.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-600">
                  <span>البوابات:</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800 border border-slate-200">مدى Mada</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800 border border-slate-200">فيزا / ماستركارد</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800 border border-slate-200">بايبال PayPal</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800 border border-slate-200">تكرام باي Tekram</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800 border border-slate-200">تحويل بنكي رسمي</span>
                </div>
              </article>
            </div>

            {/* خطوات مسار الاتفاق */}
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h4 className="text-base md:text-lg font-black text-[#242424]">
                كيف تسير خطوات الاتفاق والدفع للمؤسسات؟
              </h4>
              <p className="mt-1 text-xs md:text-sm text-[#666666]">
                مسار منظم وشفاف يضمن حصول مؤسستكم على عرض ملائم وفواتير رسمية معتمدة:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-4xl mx-auto text-center">
              {contractingSteps.map((s, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm text-right sm:text-center">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#E3342F] text-white text-xs font-black mb-2">
                    {s.num}
                  </span>
                  <h5 className="text-xs md:text-sm font-black text-[#242424] mb-1">
                    {s.title}
                  </h5>
                  <p className="text-[11px] md:text-xs text-[#666666] leading-normal">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-[#666666]">
              <span className="text-[#888888]">جميع بوابات الدفع المدعومة:</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">شام كاش Sham Cash</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">مدى Mada</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">فيزا / ماستركارد</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">بايبال PayPal</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 border border-slate-200">تكرام باي Tekram Pay</span>
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

      {/* قسم عن المدرب نواف البوسطة ومعرض الورش التدريبية (من صفحة عن المدرب) */}
      <section id="trainer" className="border-t bg-white px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px]">
          {/* رأس القسم */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] bg-[#F7EDEC] px-3.5 py-1.5 rounded-full mb-3 border border-red-100">
              <Award className="h-4 w-4" />
              <span>مدرب البرنامج وخبير التطبيقات العملية</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#242424] leading-[1.3]">
              من يقود تدريب كادركم الأكاديمي؟
            </h2>
            <p className="mt-4 text-[17px] md:text-xl leading-[1.9] text-[#555555]">
              برنامج مصمم بخبرة تطبيقية تجمع بين فهم متطلبات التعليم وأحدث أدوات الأتمتة والذكاء الاصطناعي التوليدي.
            </p>
          </div>

          {/* بطاقة البروفايل الأساسية */}
          <div className="rounded-3xl border bg-[#FAFAF8] p-7 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12" style={{ borderColor: line }}>
            <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Image
                    src="/images/trainer-nawaf.jpg"
                    alt="المدرب نواف البوسطة"
                    width={280}
                    height={280}
                    className="w-56 h-56 md:w-64 md:h-64 rounded-2xl object-cover border-4 shadow-lg"
                    style={{ borderColor: 'rgba(227, 52, 47, 0.2)' }}
                  />
                  <span className="absolute -bottom-3 inset-x-4 mx-auto rounded-full bg-[#E3342F] px-4 py-1 text-xs font-black text-white shadow text-center">
                    مدرب البرنامج
                  </span>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#E3342F]/10 text-[#E3342F] px-3.5 py-1 text-xs font-bold mb-3">
                  عن المدرب
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-[#242424] leading-tight mb-2">
                  نواف البوسطة
                </h3>
                <p className="text-base md:text-lg font-bold text-[#E3342F] mb-4">
                  مدرب في أدوات الذكاء الاصطناعي وزيادة الإنتاجية — سوريا
                </p>
                <p className="text-[16px] md:text-[17px] leading-[2] text-[#555555] mb-5">
                  مدرب وخبير متخصص في أدوات الذكاء الاصطناعي، يعمل على تحويل التقنيات الحديثة إلى حلول عملية قابلة للتطبيق للمعلمين والمؤسسات التعليمية والجهات الأكاديمية. يجمع بين التدريب، البحث، تصميم المحتوى، وتطوير حلول الأتمتة، مع تركيز على جعل الذكاء الاصطناعي مفهومًا وقابلًا للاستخدام وموجهاً لخدمة العملية التعليمية.
                </p>

                {/* اقتباس */}
                <div className="rounded-xl border-r-4 border-[#E3342F] bg-white p-4 text-[15px] md:text-base font-bold text-[#333333] shadow-sm">
                  «الذكاء الاصطناعي ليس مستقبلًا ننتظره، بل حاضر نصنعه... وأدواته وُجدت لتمنح المعلم وقتاً أثمن مع طلابه لا لتستبدل حكمته ورؤيته التربوية.»
                </div>
              </div>
            </div>

            {/* أرقام وإحصائيات المدرب */}
            <div className="mt-10 pt-10 border-t grid grid-cols-1 sm:grid-cols-3 gap-5" style={{ borderColor: line }}>
              <div className="bg-white border rounded-2xl p-5 text-center shadow-sm" style={{ borderColor: line }}>
                <div className="text-3xl md:text-4xl font-black text-[#E3342F]">640+</div>
                <p className="text-[#666666] text-sm md:text-base font-bold mt-1.5">متدرب ومعلم تلقّوا التدريب</p>
              </div>
              <div className="bg-white border rounded-2xl p-5 text-center shadow-sm" style={{ borderColor: line }}>
                <div className="text-3xl md:text-4xl font-black text-[#E3342F]">50+</div>
                <p className="text-[#666666] text-sm md:text-base font-bold mt-1.5">شركة ومؤسسة تم تدريب كوادرها</p>
              </div>
              <div className="bg-white border rounded-2xl p-5 text-center shadow-sm" style={{ borderColor: line }}>
                <div className="text-3xl md:text-4xl font-black text-[#E3342F]">10+</div>
                <p className="text-[#666666] text-sm md:text-base font-bold mt-1.5">مشاريع وأنظمة أتمتة وتطبيقات عملية</p>
              </div>
            </div>
          </div>

          {/* مجالات التدريب وحلول الأتمتة */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="rounded-2xl border bg-white p-7 shadow-sm" style={{ borderColor: line }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7EDEC] text-[#E3342F]">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#242424]">مجالات التدريب</h3>
              </div>
              <ul className="space-y-3.5 text-[#555555] text-sm md:text-[15px] leading-relaxed">
                {[
                  'تدريب الكوادر والمدارس على أدوات الذكاء الاصطناعي المتقدمة',
                  'Prompt Engineering وصياغة الأوامر العملية التربوية المتخصصة',
                  'تصميم المحتوى والمناهج والأنشطة التدريبية لمستويات متعددة',
                  'تطبيق الذكاء الاصطناعي في التعليم وزيادة الإنتاجية المؤسسية',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-[#E3342F] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-white p-7 shadow-sm" style={{ borderColor: line }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7EDEC] text-[#E3342F]">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#242424]">الحلول والمشاريع</h3>
              </div>
              <ul className="space-y-3.5 text-[#555555] text-sm md:text-[15px] leading-relaxed">
                {[
                  'أتمتة إعداد الاختبارات وأوراق العمل والتقارير وبنوك الأسئلة',
                  'حلول أتمتة مخصصة وسير عمل متكامل للمؤسسات التعليمية',
                  'تطوير أدوات باستخدام Python وAPIs وWorkflow Automation',
                  'تحويل نتائج البحث والكتب إلى تطبيقات ومواد قابلة للاستخدام',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-[#E3342F] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* معرض صور الورش والجلسات التدريبية الواقعية للمدرب */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] mb-2">
                <Presentation className="h-4 w-4" />
                <span>توثيق حي ومباشر</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-[#242424]">
                من الورش والجلسات التدريبية الواقعية
              </h3>
              <p className="mt-3 text-base md:text-lg text-[#666666] leading-relaxed">
                جلسات وتدريبات عملية قدّمها المدرب نواف البوسطة لفئات مختلفة، من التعليم وصناعة المحتوى إلى الأتمتة وتطبيقات الذكاء الاصطناعي.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trainerTrainingSessions.map((session, idx) => (
                <article
                  key={idx}
                  className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                  style={{ borderColor: line }}
                >
                  <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1">
                    {session.images.map((imgSrc, imgIdx) => (
                      <div
                        key={imgIdx}
                        className={`relative overflow-hidden bg-slate-200 ${
                          session.images.length === 1 ? 'col-span-2 h-52' : 'h-40 md:h-44'
                        }`}
                      >
                        <Image
                          src={imgSrc}
                          alt={session.title}
                          fill
                          className="object-cover hover:scale-105 transition duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-black text-[#242424] mb-1">
                        {session.title}
                      </h4>
                      <div className="text-xs font-bold text-[#E3342F] mb-3">
                        {session.audience}
                      </div>
                      <p className="text-xs md:text-sm text-[#666666] leading-relaxed">
                        {session.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* رابط إضافي لصفحة عن المدرب المنفصلة */}
            <div className="mt-10 text-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-bold text-sm md:text-base text-[#E3342F] hover:text-[#B92723] transition underline underline-offset-8"
              >
                <span>الاطلاع على السيرة الكاملة للمدرب ورؤيته البحثية في صفحة مستقلة</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الأسئلة الشائعة (10 أسئلة) */}
      <section id="faq" className="px-5 py-16 md:px-8 md:py-24">
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
        <div className="mx-auto max-w-[850px]">
          <div className="rounded-3xl border bg-[#FAFAF8] p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)]" style={{ borderColor: line }}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E3342F] bg-[#F7EDEC] px-3.5 py-1 rounded-full mb-3">
                <Send className="h-3.5 w-3.5" />
                <span>طلب عرض رسمي مخصص</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#242424]">
                احصل على عرض فني ومالي لمؤسستك
              </h2>
              <p className="mt-3 text-[15px] md:text-lg text-[#666666] max-w-xl mx-auto leading-relaxed">
                أدخل تفاصيل كادركم واحتياجكم وسيقوم فريقنا الأكاديمي بإعداد مقترح متكامل وعرض مالي وفني مخصص لمؤسستكم.
              </p>
            </div>

            {isSubmitted ? (
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 md:p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto mb-5 shadow-sm">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-emerald-950 mb-3">
                  تم إرسال طلبكم بنجاح!
                </h3>
                <p className="text-base md:text-lg text-emerald-900 font-semibold max-w-lg mx-auto leading-relaxed">
                  شكراً لتواصلكم معنا. تم استلام تفاصيل مؤسستكم بالكامل، وسيقوم فريقنا بمراجعة الاحتياج والتواصل معكم لتقديم العرض الفني والمالي في أقرب وقت.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>تم توجيه الطلب تلقائياً إلى إدارة البرنامج</span>
                </div>
                <div className="mt-8 pt-6 border-t border-emerald-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({
                        institutionName: '',
                        contactPerson: '',
                        jobTitle: '',
                        countryCity: '',
                        whatsappNumber: '',
                        email: '',
                        teacherCount: '10–20 معلماً',
                        branchesCount: 'فرع واحد',
                        subjectsGrades: '',
                        trainingType: 'تدريب مباشر عن بُعد',
                        expectedHours: '8–12 ساعة تدريبية',
                        customizationLevel: 'تخصيص متوسط مع قوالب للمؤسسة',
                        outputsCount: 'مشروعان تطبيقيان ومخرجات صفية',
                        followUpMethod: 'جلسات متابعة مباشرة بعد التدريب',
                        additionalNotes: '',
                      })
                    }}
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition underline underline-offset-4"
                  >
                    <span>إرسال طلب لمؤسسة تعليمية أخرى</span>
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
                      placeholder="مثال: مدارس الرياض الأهلية / معهد التفوق"
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      2. اسم مسؤول التواصل *
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
                      placeholder="مثال: السعودية — الرياض / الإمارات — دبي"
                      value={formData.countryCity}
                      onChange={(e) => setFormData({ ...formData, countryCity: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      4. المسمى الوظيفي
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: مدير المدارس / المشرف الأكاديمي / رئيس القسم"
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
                      5. عدد المشاركين (معلمين وموظفين) *
                    </label>
                    <select
                      value={formData.teacherCount}
                      onChange={(e) => setFormData({ ...formData, teacherCount: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    >
                      <option value="5–10 معلمين">5–10 معلمين (باقة التأسيس)</option>
                      <option value="10–20 معلماً">10–20 معلماً (تطوير الفريق الأكاديمي)</option>
                      <option value="20–50 معلماً">20–50 معلماً (التحول التعليمي)</option>
                      <option value="أكثر من 50 معلماً">أكثر من 50 معلماً (برنامج مخصص)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      6. عدد الأقسام أو الفروع
                    </label>
                    <select
                      value={formData.branchesCount}
                      onChange={(e) => setFormData({ ...formData, branchesCount: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    >
                      <option value="فرع واحد">فرع واحد</option>
                      <option value="فرعان إلى 3 فروع">فرعان إلى 3 فروع</option>
                      <option value="4 إلى 6 فروع">4 إلى 6 فروع</option>
                      <option value="شبكة تعليمية ممتدة (أكثر من 6 فروع)">شبكة تعليمية ممتدة (أكثر من 6 فروع)</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      7. نوع التدريب المطلوب *
                    </label>
                    <select
                      value={formData.trainingType}
                      onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    >
                      <option value="محتوى إلكتروني مسجل">محتوى إلكتروني مسجل</option>
                      <option value="تدريب مباشر عن بُعد">تدريب مباشر عن بُعد</option>
                      <option value="تدريب مؤسسي مخصص">تدريب مؤسسي مخصص</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      8. عدد الساعات التدريبية المتوقع
                    </label>
                    <select
                      value={formData.expectedHours}
                      onChange={(e) => setFormData({ ...formData, expectedHours: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    >
                      <option value="4–6 ساعات تدريبية">4–6 ساعات تدريبية</option>
                      <option value="8–12 ساعة تدريبية">8–12 ساعة تدريبية</option>
                      <option value="15–20 ساعة تدريبية">15–20 ساعة تدريبية</option>
                      <option value="يحدد حسب دراسة الاحتياج الأكاديمي">يحدد حسب دراسة الاحتياج الأكاديمي</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      9. مستوى التخصيص المطلوب
                    </label>
                    <select
                      value={formData.customizationLevel}
                      onChange={(e) => setFormData({ ...formData, customizationLevel: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    >
                      <option value="تطبيق قياسي على درس من المنهج">تطبيق قياسي على درس من المنهج</option>
                      <option value="تخصيص متوسط مع قوالب للمؤسسة">تخصيص متوسط مع قوالب للمؤسسة</option>
                      <option value="تخصيص كامل لكافة المواد والمناهج والفروع">تخصيص كامل لكافة المواد والمناهج والفروع</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      10. عدد المشاريع أو المخرجات المطلوبة
                    </label>
                    <select
                      value={formData.outputsCount}
                      onChange={(e) => setFormData({ ...formData, outputsCount: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    >
                      <option value="مشروع تطبيقي واحد للفريق">مشروع تطبيقي واحد للفريق</option>
                      <option value="مشروعان إلى 3 مشاريع صفية">مشروعان إلى 3 مشاريع صفية</option>
                      <option value="بنوك أسئلة ومكتبة قوالب شاملة للمؤسسة">بنوك أسئلة ومكتبة قوالب شاملة للمؤسسة</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      11. طريقة المتابعة المناسبة
                    </label>
                    <select
                      value={formData.followUpMethod}
                      onChange={(e) => setFormData({ ...formData, followUpMethod: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    >
                      <option value="جلسات متابعة مباشرة بعد التدريب">جلسات متابعة مباشرة بعد التدريب</option>
                      <option value="متابعة وإشراف عبر قناة تواصل خاصة">متابعة وإشراف عبر قناة تواصل خاصة</option>
                      <option value="مراجعة مخرجات وتقارير دورية للإدارة">مراجعة مخرجات وتقارير دورية للإدارة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      12. المواد والمراحل الدراسية
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: الرياضيات والعلوم واللغات — المرحلة المتوسطة والثانوية"
                      value={formData.subjectsGrades}
                      onChange={(e) => setFormData({ ...formData, subjectsGrades: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      13. رقم WhatsApp للتواصل *
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

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                      14. البريد الإلكتروني المؤسسي (اختياري)
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      placeholder="info@school.edu.sa"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242424] text-right focus:border-[#E3342F] focus:outline-none focus:ring-1 focus:ring-[#E3342F]"
                      style={{ borderColor: line }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-[#242424] mb-1.5">
                    15. الملاحظات والاحتياج الخاص
                  </label>
                  <textarea
                    rows={3}
                    placeholder="أي ملاحظات حول المناهج المعتمدة، المواعيد المفضلة للبدء، أو رغبة في استشارة أولية..."
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
                        <span>احصل على عرض فني ومالي لمؤسستك</span>
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
            <span>عرض مخصص لاحتياج مؤسستكم</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black leading-tight">
            احصل على عرض فني ومالي مصمم حسب احتياج مؤسستك
          </h2>

          <p className="mt-4 text-[17px] md:text-lg leading-[1.9] text-white/80 max-w-2xl mx-auto">
            كل عرض يُبنى حسب عدد المعلمين، عدد الساعات، نوع التدريب، وعدد المخرجات المطلوبة. تواصل معنا لنبدأ بدراسة احتياج مؤسستكم وتقديم المقترح الملائم.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#request"
              onClick={() => trackInstitutional('institutional_offer_request', { source: 'final_cta' })}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base md:text-lg font-black text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              style={{ backgroundColor: red }}
            >
              <span>احصل على عرض فني ومالي لمؤسستك</span>
              <ArrowLeft className="h-5 w-5" />
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً، أود الاستفسار عن برامج التدريب المؤسسي للمدارس والمعاهد والحصول على عرض فني ومالي.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track('institutional_whatsapp_click', { source: 'final_cta_whatsapp' })
                if (typeof (window as any).fbq === 'function') {
                  ;(window as any).fbq('track', 'Contact', {
                    content_name: 'AI Course for Teachers - WhatsApp Inquiry',
                    content_category: 'Course Registration',
                    cta_source: 'schools_final_cta_whatsapp',
                  })
                }
              }}
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
            <Link href="/schools/results" className="underline hover:text-[#242424]">
              نماذج مخرجات المؤسسات
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
