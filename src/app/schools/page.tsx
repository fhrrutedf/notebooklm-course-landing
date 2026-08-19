'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  FileText,
  Shield,
  ArrowLeft,
  Award,
  GraduationCap,
  Brain,
  ClipboardList,
  Send,
  Phone,
  Mail,
  Building2,
  User,
  Briefcase,
  MapPin,
  Users,
  MessageSquare,
  Clock,
  BarChart3,
  FileCheck,
  Presentation,
  Headphones,
  Search,
  Download,
  CalendarCheck,
  Sparkles,
} from 'lucide-react'

export default function SchoolsLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    schoolName: '',
    contactName: '',
    jobTitle: '',
    country: '',
    teacherCount: '',
    phone: '',
    email: '',
    notes: '',
  })

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = [
      'مرحباً أستاذ/ة، أريد الاستفسار عن Course الذكاء الاصطناعي العملي للمعلمين والمؤسسات.',
      `اسم المركز/المدرسة: ${formData.schoolName}`,
      `اسم المسؤول: ${formData.contactName}`,
      `الصفة: ${formData.jobTitle}`,
      `البلد/المدينة: ${formData.country}`,
      `عدد المعلمين: ${formData.teacherCount}`,
      `الهاتف: ${formData.phone}`,
      `البريد: ${formData.email}`,
      `ملاحظات: ${formData.notes}`,
    ].join('\\n')
    setFormSubmitted(true)
    window.location.href = `https://wa.me/963985323170?text=${encodeURIComponent(message)}`
  }

  // ===== DATA =====

  const courseModules = [
    {
      title: 'المسار 1: من المصدر إلى شرح وفيديو تعليمي',
      lessons: 6,
      time: '80 دقيقة',
      items: [
        'تجهيز درس من الصف الأول إلى البكالوريا وتحديد الهدف التعليمي',
        'كتابة Prompt مناسب لعمر الطالب ومستواه',
        'إنشاء ملخص وأسئلة فهم ونشاط صفّي من المصدر',
        'تحويل الفكرة إلى سيناريو فيديو يشرحه المعلم لطلابه',
        'مراجعة الدقة واللغة قبل المشاركة',
      ],
    },
    {
      title: 'المسار 2: من الدرس إلى اختبار وPDF ومشروع',
      lessons: 7,
      time: '95 دقيقة',
      items: [
        'إعداد جدول مواصفات مبسط يناسب المادة والمرحلة',
        'إنشاء نسختين من الاختبار مع نموذج إجابة',
        'إخراج PDF عربي جاهز للطباعة',
        'تصميم مشروع أو مهمة تطبيقية بمعايير تقييم واضحة',
        'مراجعة بشرية قبل استخدام المخرج مع الطلاب',
      ],
    },
    {
      title: 'المسار 3: عرض وتفاعل وبودكاست ومتابعة',
      lessons: 7,
      time: '85 دقيقة',
      items: [
        'تحويل الدرس إلى عرض تقديمي مناسب للحصة',
        'إنشاء نشاط وبطاقة خروج للطلاب',
        'إنتاج Podcast أو شرح صوتي مختصر من الدرس',
        'مشاركة الفيديو أو الصوت أو المشروع مع الطلاب',
        'مقارنة الأدوات المجانية واختيار البديل المناسب',
      ],
    },
  ]

  const faqs = [
    {
      q: 'كيف نتابع تقدّم المعلمين؟',
      a: 'في الباقات القياسية والمؤسسية، نوفر لوحة متابعة تعرض: أسماء المعلمين المسجّلين، ونسبة إتمام كل معلم للبرنامج التدريبي، ونتائج الاختبارات. كما يمكنكم طلب تقرير مفصّل في أي وقت.',
    },
    {
      q: 'هل توفّرون فواتير ضريبية؟',
      a: 'نرسل تفاصيل الدفع والتنسيق المناسب للمؤسسة عبر واتساب قبل الاتفاق. أي فاتورة أو عقد رسمي يخضع لإمكانية المؤسسة والمدرب، ولا نعد بخدمة غير متاحة.',
    },
    {
      q: 'هل يحصل كل معلم على شهادة؟',
      a: 'حاليًا لا نعتمد الشهادات كجزء أساسي من العرض. القيمة الأساسية هي المخرجات العملية والقوالب التي يبنيها المعلم ويستخدمها في مادته.',
    },
    {
      q: 'كيف يتم تسجيل المعلمين؟',
      a: 'بعد تأكيد الباقة، نرسل لكم روابط تسجيل فردية لكل معلم. يحصل كل معلم على حسابه الخاص للوصول للبرنامج التدريبي. كما يمكنكم إرسال أسماء المعلمين وبريدهم الإلكتروني وسنسجّلهم نيابة عنكم.',
    },
    {
      q: 'ماذا لو لم يكمل بعض المعلمين البرنامج التدريبي؟',
      a: 'الوصول إلى المواد المسجلة متاح وفق الاتفاق مع المؤسسة. نوضح قبل التسجيل طريقة الوصول والدعم والدفع، ويوجد أقساط، ونتفق على تفاصيلها عبر التواصل.',
    },
    {
      q: 'هل البرنامج التدريبي مناسب لجميع المواد والمراحل؟',
      a: 'نعم، نبدأ من الصف الأول وحتى البكالوريا، ونكيّف الأمثلة مع الرياضيات والعلوم واللغات وباقي المواد. لا نترك الناتج دون مراجعة المعلم، لأن ملاءمة المنهج والدقة مسؤولية مشتركة.',
    },
  ]

  const WHATSAPP_NUMBER = '963985323170'
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-white text-[#1E293B]" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }} suppressHydrationWarning>

      {/* ===== 1. TOP NAVIGATION BAR ===== */}
      <nav className="bg-white border-b border-[#E2E8F0] py-3 px-4 sticky top-0 z-50">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#0D9488]" />
            <span className="font-bold text-[#1B2A4A] text-sm md:text-base">حلول المؤسسات التعليمية</span>
          </div>
          <Link
            href="/"
            className="text-[#64748B] text-xs md:text-sm hover:text-[#0D9488] transition-colors"
          >
            للمعلمين الأفراد
          </Link>
        </div>
      </nav>

      {/* ===== 2. HERO SECTION ===== */}
      <section className="relative bg-[#F8FAFC] overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1B2A4A 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative z-10 max-w-[1000px] mx-auto px-4 pt-16 pb-14 md:pt-20 md:pb-18 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 text-[#0D9488] px-5 py-2 rounded-full text-sm font-bold mb-8 border border-[#0D9488]/20">
            <Building2 className="w-4 h-4" />
            للمؤسسات التعليمية
          </div>

          {/* H1 */}
          <h1 className="text-3xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.4] mb-6 text-[#1B2A4A]">
            حلول الذكاء الاصطناعي لتطوير الكوادر التعليمية
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[#64748B] max-w-3xl mx-auto mb-10 leading-loose">
            Course عملي مدته 4 ساعات تقريباً، يعرّف فريقكم بسير عمل لإنتاج الشروحات والفيديوهات التعليمية والاختبارات وملفات PDF والمشاريع والعروض والـPodcasts باستخدام أدوات مجانية أو بخطط مجانية.
          </p>

          {/* Two CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-8 py-4 rounded-xl text-base transition-colors"
            >
              اطلب عرض سعر
              <ArrowLeft className="w-4 h-4" />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-[#1B2A4A]/20 hover:border-[#1B2A4A]/40 text-[#1B2A4A] font-bold px-8 py-4 rounded-xl text-base transition-colors"
            >
              <Download className="w-4 h-4" />
              اطلب ملف التعريف المؤسسي عبر واتساب
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <FileText className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>تنسيق مؤسسي واضح</span>
            </div>
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Award className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>محتوى عملي قابل للتطبيق</span>
            </div>
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Shield className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>تواصل مباشر قبل الاتفاق</span>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">4 ساعات</div>
              <div className="text-[#64748B] text-sm mt-1">مدة الـCourse</div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">أقساط</div>
              <div className="text-[#64748B] text-sm mt-1">نتفق على التفاصيل</div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">3,200</div>
              <div className="text-[#64748B] text-sm mt-1">ليرة سورية جديدة للـCourse</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. IMPACT SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              أثر حقيقي على مؤسستك التعليمية
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              يساعد فريقكم على تقليل الوقت المهدور في إعداد المواد، مع اعتماد خطوات قابلة للتكرار والمراجعة.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 text-center hover:border-[#0D9488]/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-[#0D9488]" />
              </div>
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-2">سير عمل موحّد لفريقكم</h3>
              <p className="text-[#64748B] text-sm leading-loose">
                يتعلم الفريق خطوات مشتركة لتجهيز المصدر وكتابة Prompt ومراجعة الناتج، بدل الاعتماد على استخدام عشوائي للأدوات.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 text-center hover:border-[#0D9488]/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-6 h-6 text-[#0D9488]" />
              </div>
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-2">اختبارات مطابقة للمنهج وموثّقة</h3>
              <p className="text-[#64748B] text-sm leading-loose">
                يتم تدريب الفريق على إعداد اختبارات ومشاريع وفيديوهات وملفات PDF، مع مراجعة بشرية قبل استخدامها مع الطلاب.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 text-center hover:border-[#0D9488]/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-[#0D9488]" />
              </div>
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-2">مخرجات قابلة للمشاركة مع الطلاب</h3>
              <p className="text-[#64748B] text-sm leading-loose">
                يخرج كل معلم بقوالب عملية يمكنه استخدامها في مادته ومرحلته، من الصف الأول إلى البكالوريا.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. COMPARISON TABLE SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              مقارنة الأداء قبل وبعد الذكاء الاصطناعي
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              مقارنة سير العمل قبل تعلم المنهج وبعده، دون وعود زمنية ثابتة
            </p>
          </div>

          {/* Time Savings Table */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1B2A4A]">
                  <th className="py-3.5 px-4 text-right text-white font-bold text-sm">المهمة</th>
                  <th className="py-3.5 px-4 text-center text-white/80 font-bold text-sm">الطريقة التقليدية</th>
                  <th className="py-3.5 px-4 text-center text-white font-bold text-sm">بالذكاء الاصطناعي</th>
                  <th className="py-3.5 px-4 text-center text-white font-bold text-sm">التوفير</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { task: 'تلخيص فصل كامل', old: '2-3 ساعات', ai: '5 دقائق', save: '95%' },
                  { task: 'إعداد 20 سؤال اختبار', old: 'ساعة ونصف', ai: '3 دقائق', save: '97%' },
                  { task: 'إعداد عرض تقديمي تعليمي', old: '3-4 ساعات', ai: '10 دقائق', save: '95%' },
                  { task: 'تصميم مذكرة PDF', old: 'ساعتان', ai: '10 دقائق', save: '92%' },
                  { task: 'إعداد ملف صوتي تعليمي', old: 'غير متاح', ai: '5 دقائق', save: '∞' },
                  { task: 'البحث عن أحدث الدراسات', old: '2-3 ساعات', ai: 'ثوانٍ', save: '99%' },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-[#E2E8F0] last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}>
                    <td className="py-3 px-4 text-right font-medium text-[#1E293B] text-sm">{row.task}</td>
                    <td className="py-3 px-4 text-center text-[#64748B] text-sm">{row.old}</td>
                    <td className="py-3 px-4 text-center text-[#0D9488] font-medium text-sm">{row.ai}</td>
                    <td className="py-3 px-4 text-center text-[#0D9488] font-bold text-sm">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Impact calculator */}
          <div className="mt-8 bg-[#0D9488]/5 border border-[#0D9488]/20 rounded-xl p-5 text-center">
            <p className="text-[#1B2A4A] font-bold text-base">
              مؤسسة من 10 معلمين يمكنها توحيد طريقة إعداد المواد ومراجعتها
            </p>
          </div>
        </div>
      </section>

      {/* ===== 5. RESULTS CTA ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-8 md:p-10">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
                <Presentation className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-[#0D9488]" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1B2A4A] mb-3">
              اطلع على نماذج من المخرجات التعليمية
            </h3>
            <p className="text-[#64748B] text-sm mb-6 max-w-lg mx-auto leading-loose">
              إنفوجرافيك، عروض تقديمية، ملفات صوتية، وبودكاست — نماذج حقيقية من كتب الكيمياء والعلوم والإنجليزية
            </p>
            <a
              href="/results"
              className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors"
            >
              اطلع على النماذج
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== 6. COURSE CONTENT SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              محتوى البرنامج التدريبي
            </h2>
            <p className="text-[#64748B] text-sm">3 مسارات — 20 درساً عملياً مسجلاً</p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {courseModules.map((mod, i) => (
              <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-right hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0D9488] flex items-center justify-center shrink-0 text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <span className="font-bold text-[#1B2A4A] text-base">{mod.title}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[#0D9488] font-medium bg-[#0D9488]/10 px-2 py-0.5 rounded-md">
                          {mod.lessons} محاضرات
                        </span>
                        <span className="text-xs text-[#64748B]">{mod.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748B] transition-transform shrink-0 ${openModule === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openModule === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[#E2E8F0] pt-3">
                    <ul className="space-y-2">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                          <span className="text-[#64748B] text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. PRICING SECTION ===== */}
      <section id="pricing" className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              باقات مصمّمة للمؤسسات التعليمية
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto text-sm leading-loose">
              اختر الباقة المناسبة لعدد معلمي مؤسستك، وجميع الأسعار بالليرة السورية ويوجد أقساط، ونتفق على تفاصيلها عبر التواصل.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Trial Package */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 border-t-4 border-t-[#64748B]">
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-4">الباقة التجريبية</h3>
              <div className="mb-5">
                <div className="text-[#64748B] text-sm mb-1">5 معلمين</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#1B2A4A]">16,000 ليرة سورية جديدة</span>
                  <span className="text-[#64748B] text-sm">الإجمالي</span>
                </div>
                <div className="text-[#0D9488] text-sm font-bold">3,200 ليرة سورية جديدة للمعلم</div>
              </div>
              <div className="border-t border-[#E2E8F0] pt-4 mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">وصول كامل للبرنامج التدريبي</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">قوالب ومخرجات عملية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">دعم عبر واتساب</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="block w-full text-center bg-white border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white font-bold py-3 rounded-xl transition-colors"
              >
                اطلب عرض سعر
              </a>
            </div>

            {/* Standard Package - RECOMMENDED */}
            <div className="bg-white border-2 border-[#0D9488] rounded-xl p-6 md:p-8 relative md:-mt-2 md:mb-2">
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0D9488] text-white text-xs font-bold px-5 py-1.5 rounded-full">
                الأكثر طلباً
              </div>
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-4 mt-1">الباقة القياسية</h3>
              <div className="mb-5">
                <div className="text-[#64748B] text-sm mb-1">10 معلمين</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#1B2A4A]">32,000 ليرة سورية جديدة</span>
                  <span className="text-[#64748B] text-sm">الإجمالي</span>
                </div>
                <div className="text-[#0D9488] text-sm font-bold">3,200 ليرة سورية جديدة للمعلم</div>
              </div>
              <div className="border-t border-[#E2E8F0] pt-4 mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">جميع مميزات الباقة التجريبية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">لوحة متابعة تقدّم المعلمين</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">تقرير إتمام للإدارة</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="block w-full text-center bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                اطلب عرض سعر
              </a>
            </div>

            {/* Enterprise Package */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 border-t-4 border-t-[#D4A853]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-bold text-[#1B2A4A] text-lg">الباقة المؤسسية</h3>
                <span className="text-xs font-bold bg-[#D4A853]/10 text-[#D4A853] px-2 py-0.5 rounded-md">مميّزة</span>
              </div>
              <div className="mb-5">
                <div className="text-[#64748B] text-sm mb-1">20+ معلم</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#1B2A4A]">ابتداءً من 64,000 ليرة سورية جديدة</span>
                  <span className="text-[#64748B] text-sm">الإجمالي</span>
                </div>
                <div className="text-[#D4A853] text-sm font-bold">3,200 ليرة سورية جديدة للمعلم</div>
              </div>
              <div className="border-t border-[#E2E8F0] pt-4 mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A853] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">جميع مميزات الباقة القياسية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A853] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">جلسة تدريبية مباشرة مع المدرب</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A853] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">تنسيق دفع مناسب للمؤسسة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A853] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">عقد استخدام مؤسسي</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="block w-full text-center bg-[#1B2A4A] hover:bg-[#152238] text-white font-bold py-3 rounded-xl transition-colors"
              >
                تواصل معنا
              </a>
            </div>
          </div>

          {/* Under all cards */}
          <div className="mt-8 text-center">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 inline-block">
              <p className="text-[#64748B] text-sm">
                جميع الباقات تشمل:{' '}
                <span className="text-[#1E293B] font-bold">وصول دائم + تحديثات مجانية + ضمان استرداد 7 أيام</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. WHAT EACH TEACHER GETS ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-[#1B2A4A]">
            ما يحصل عليه كل معلم في مؤسستك
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-3">
              {[
                { icon: BookOpen, text: 'وصول دائم للبرنامج التدريبي (20 درساً عملياً)' },
                { icon: ClipboardList, text: '15 أمراً جاهزاً للنسخ واللصق (Prompts)' },
                { icon: FileText, text: 'ورقة مرجعية سريعة للطباعة' },
                { icon: Award, text: 'شهادة إتمام معتمدة' },
                { icon: MessageSquare, text: 'دعم مباشر عبر واتساب' },
                { icon: Sparkles, text: 'تحديثات مجانية مستمرة' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl px-5 py-3.5">
                  <item.icon className="w-5 h-5 text-[#0D9488] shrink-0" />
                  <span className="text-[#1E293B] text-base font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. WHAT THE DIRECTOR GETS ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-[#1B2A4A]">
            ما يحصل عليه مدير المؤسسة
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-3">
              {[
                { icon: BarChart3, text: 'لوحة متابعة تقدّم المعلمين', note: 'الباقة القياسية فما فوق', noteColor: '#0D9488' },
                { icon: FileCheck, text: 'تقرير إتمام تفصيلي', note: 'الباقة القياسية فما فوق', noteColor: '#0D9488' },
                { icon: FileText, text: 'تنسيق دفع مناسب للمؤسسة', note: 'جميع الباقات', noteColor: '#1E3A5F' },
                { icon: ClipboardList, text: 'عقد استخدام مؤسسي', note: 'الباقة المؤسسية', noteColor: '#D4A853' },
                { icon: GraduationCap, text: 'جلسة تدريبية مباشرة مع المدرب نواف البوسطه', note: 'الباقة المؤسسية', noteColor: '#D4A853' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl px-5 py-3.5">
                  <item.icon className="w-5 h-5 text-[#1E3A5F] shrink-0" />
                  <div className="flex-1">
                    <span className="text-[#1E293B] text-base font-medium">{item.text}</span>
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-md whitespace-nowrap"
                    style={{
                      color: item.noteColor,
                      backgroundColor: `${item.noteColor}10`,
                    }}
                  >
                    {item.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. VIDEO SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#1B2A4A]">
            تعريف بالبرنامج التدريبي
          </h2>
          <p className="text-[#64748B] text-sm mb-8">تعرّف على البرنامج التدريبي في دقائق معدودة</p>

          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-xl overflow-hidden bg-white border border-[#E2E8F0]">
              <iframe
                src="https://www.youtube.com/embed/Ze-HjqkxIJM?rel=0&modestbranding=1"
                className="w-full border-0"
                style={{ aspectRatio: '16/9' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="تعريف بالبرنامج التدريبي — المدرب نواف البوسطه"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. TRAINER SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
            <div className="shrink-0">
              <img
                src="/images/trainer-nawaf.jpg"
                alt="المدرب نواف البوسطه — متخصص في تطبيقات الذكاء الاصطناعي في التعليم ومدرب أدوات الذكاء الاصطناعي"
                className="w-24 h-24 rounded-full object-cover border-3 border-[#0D9488]/20"
              />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold text-[#1B2A4A] mb-1">نواف البوسطه</h3>
              <p className="text-[#0D9488] font-bold text-sm mb-3">
                متخصص في تطبيقات الذكاء الاصطناعي في التعليم ومدرب أدوات الذكاء الاصطناعي
              </p>
              <p className="text-[#64748B] text-sm leading-loose mb-4">
                معلم متمرس قضى سنوات في تحضير الدروس تقليدياً. بعد اكتشاف أدوات الذكاء الاصطناعي، تحوّل أسلوب عمله بالكامل — من إعداد الاختبارات بنسختين خلال 5 دقائق، إلى تصميم مذكرات PDF احترافية في دقائق. يؤمن بأن كل معلم قادر على الاستفادة من هذه الأدوات بغض النظر عن خلفيته التقنية.
              </p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/share/18UPsSwfwQ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#1B2A4A]/5 rounded-lg flex items-center justify-center hover:bg-[#1B2A4A]/10 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#1B2A4A]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href="https://instagram.com/noaf.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#1B2A4A]/5 rounded-lg flex items-center justify-center hover:bg-[#1B2A4A]/10 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#1B2A4A]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <span className="text-[#64748B] text-xs">@noaf.ai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 12. FAQ SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              أسئلة المديرين والمشرفين التربويين
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              إجابات على الأسئلة الأكثر شيوعاً
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-right hover:bg-[#F8FAFC] transition-colors"
                >
                  <span className="font-bold text-[#1E293B] text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748B] transition-transform shrink-0 mr-3 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[#E2E8F0] pt-3">
                    <p className="text-[#64748B] text-sm leading-loose">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 13. CONTACT FORM SECTION ===== */}
      <section id="contact" className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              تقدّم بطلب استشارة مجانية
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              املأ النموذج وسنتواصل معكم خلال 24 ساعة بعرض مخصّص لمؤسستكم التعليمية. للتواصل مع الشركة: <a href="mailto:info@manasadigital.com" className="text-[#0D9488] font-bold hover:underline">info@manasadigital.com</a>
            </p>
          </div>

          {formSubmitted ? (
            <div className="max-w-xl mx-auto bg-white border border-[#E2E8F0] rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-[#0D9488]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">تم إرسال طلبكم بنجاح</h3>
              <p className="text-[#64748B] text-sm leading-loose">سنتواصل معكم خلال 24 ساعة بعرض مخصّص لمؤسستكم التعليمية.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8">
              <div className="space-y-4">
                {/* School Name */}
                <div>
                  <label className="block text-[#1E293B] font-bold text-sm mb-1.5">
                    <Building2 className="w-4 h-4 inline ml-1" />
                    اسم المؤسسة التعليمية <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.schoolName}
                    onChange={(e) => handleFormChange('schoolName', e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-colors placeholder:text-[#94A3B8]"
                    placeholder="اسم المدرسة أو المؤسسة التعليمية"
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-[#1E293B] font-bold text-sm mb-1.5">
                    <User className="w-4 h-4 inline ml-1" />
                    اسم المسؤول <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => handleFormChange('contactName', e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-colors placeholder:text-[#94A3B8]"
                    placeholder="الاسم الكامل"
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-[#1E293B] font-bold text-sm mb-1.5">
                    <Briefcase className="w-4 h-4 inline ml-1" />
                    المسمّى الوظيفي <span className="text-[#EF4444]">*</span>
                  </label>
                  <select
                    required
                    value={formData.jobTitle}
                    onChange={(e) => handleFormChange('jobTitle', e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-colors appearance-none"
                  >
                    <option value="">اختر المسمّى الوظيفي</option>
                    <option value="مدير/ة">مدير/ة</option>
                    <option value="نائب المدير">نائب المدير</option>
                    <option value="مسؤول التطوير المهني">مسؤول التطوير المهني</option>
                    <option value="مالك/ة المدرسة">مالك/ة المدرسة</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-[#1E293B] font-bold text-sm mb-1.5">
                    <MapPin className="w-4 h-4 inline ml-1" />
                    الدولة <span className="text-[#EF4444]">*</span>
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => handleFormChange('country', e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-colors appearance-none"
                  >
                    <option value="">اختر البلد أو المدينة</option>
                    <option value="سوريا">سوريا</option>
                    <option value="الإمارات">الإمارات</option>
                    <option value="الكويت">الكويت</option>
                    <option value="بلد آخر">بلد آخر</option>
                  </select>
                </div>

                {/* Teacher Count */}
                <div>
                  <label className="block text-[#1E293B] font-bold text-sm mb-1.5">
                    <Users className="w-4 h-4 inline ml-1" />
                    عدد المعلمين المتوقّع <span className="text-[#EF4444]">*</span>
                  </label>
                  <select
                    required
                    value={formData.teacherCount}
                    onChange={(e) => handleFormChange('teacherCount', e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-colors appearance-none"
                  >
                    <option value="">اختر عدد المعلمين</option>
                    <option value="5-10">5-10</option>
                    <option value="11-20">11-20</option>
                    <option value="21-50">21-50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[#1E293B] font-bold text-sm mb-1.5">
                    <Phone className="w-4 h-4 inline ml-1" />
                    رقم الهاتف مع واتساب <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-colors placeholder:text-[#94A3B8]"
                    placeholder="رقم الواتساب مع رمز الدولة"
                    dir="ltr"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[#1E293B] font-bold text-sm mb-1.5">
                    <Mail className="w-4 h-4 inline ml-1" />
                    البريد الإلكتروني المؤسسي <span className="text-[#64748B] font-normal">(اختياري)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-colors placeholder:text-[#94A3B8]"
                    placeholder="email@school.com"
                    dir="ltr"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[#1E293B] font-bold text-sm mb-1.5">
                    <MessageSquare className="w-4 h-4 inline ml-1" />
                    ملاحظات أو متطلبات خاصة <span className="text-[#64748B] font-normal">(اختياري)</span>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleFormChange('notes', e.target.value)}
                    rows={3}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-colors resize-none placeholder:text-[#94A3B8]"
                    placeholder="مثلاً: مواد معينة، متطلبات خاصة، استفسارات..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-6 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                احجز استشارة مجانية
              </button>

              {/* WhatsApp alternative */}
              <div className="mt-4 text-center">
                <span className="text-[#64748B] text-sm">أو تواصل مباشرة عبر </span>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0D9488] font-bold text-sm hover:underline"
                >
                  واتساب
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ===== 14. FOOTER ===== */}
      <footer className="bg-[#1B2A4A] py-8 mt-auto">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <a href="/" className="text-white/60 text-sm hover:text-white transition-colors">الصفحة الرئيسية</a>
            <span className="text-white/20">|</span>
            <a href="#pricing" className="text-white/60 text-sm hover:text-white transition-colors">عروض المؤسسات</a>
            <span className="text-white/20">|</span>
            <a href="/results" className="text-white/60 text-sm hover:text-white transition-colors">عينات النتائج</a>
          </div>
          <p className="text-white/40 text-xs mb-2">
            نواف البوسطه | المدرب | برنامج الذكاء الاصطناعي في التعليم — للمؤسسات التعليمية
          </p>
          <p className="text-white/30 text-xs">
            جميع الحقوق محفوظة 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
