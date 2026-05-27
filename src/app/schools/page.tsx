'use client'

import { useState } from 'react'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  FileText,
  Shield,
  Sparkles,
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
    setFormSubmitted(true)
  }

  // ===== DATA =====

  const courseModules = [
    {
      title: 'الوحدة 1: الأساسيات والتحضير الذكي',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'ما هو الذكاء الاصطناعي بالتعليم ولماذا يحتاجه كل معلم؟',
        'رفع المصادر وتنظيم الدفتر الذكي',
        'المحادثة الذكية مع محتواك - أسئلة تفتح بوابات',
        'تغيير اللغة للعربية والإعدادات المخصصة',
      ],
    },
    {
      title: 'الوحدة 2: البودكاست التعليمي',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'إنشاء بودكاست تعليمي من أي محتوى',
        'تخصيص البودكاست المتقدم - تحكّم كامل بالمحتوى',
        'مشاركة البودكاست مع الطلاب - قنوات التوزيع',
        'ربط البودكاست بالمنهج - استراتيجيات متقدمة',
      ],
    },
    {
      title: 'الوحدة 3: العروض والوسائط المتقدمة',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'إنشاء عرض تقديمي احترافي من محتواك',
        'الخرائط الذهنية والإنفوجرافيك',
        'ملخص الفيديو والنظرة العامة',
        'دمج أدوات العرض والتصميم المتقدمة',
      ],
    },
    {
      title: 'الوحدة 4: التقييم والدراسة',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'توليد أسئلة وامتحانات بضغطة زر',
        'البطاقات التعليمية للمراجعة السريعة',
        'أدلة الدراسة المخصصة',
        'تقييم الفهم والتعلّم التكيفي',
      ],
    },
    {
      title: 'الوحدة 5: الاستراتيجيات المتقدمة',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'التعليم الشامل - دمج طلاب الاحتياجات الخاصة',
        'دمج مع منصات التعليم الإلكتروني',
        'خطة الدرس الذكية - تحضير كامل بالذكاء الاصطناعي',
        'بناء نظامك التعليمي الذكي المتكامل',
      ],
    },
  ]

  const faqs = [
    {
      q: 'كيف نتابع تقدم المعلمين؟',
      a: 'في الباقات القياسية والمؤسسية، توفر لك لوحة متابعة بسيطة تعرض: أسماء المعلمين المسجلين، نسبة إتمام كل معلم للكورس، ونتائج الاختبارات. يمكنك أيضاً طلب تقرير مفصل في أي وقت.',
    },
    {
      q: 'هل توفرون فواتير ضريبية؟',
      a: 'نعم، نوفر فواتير ضريبية رسمية لجميع الباقات. يمكن إصدار الفاتورة باسم المدرسة مع الرقم الضريبي. للباقات المؤسسية، نوفر أيضاً عقد استخدام مؤسسي.',
    },
    {
      q: 'هل يحصل كل معلم على شهادة؟',
      a: 'نعم، كل معلم يكمل الكورس بنجاح يحصل على شهادة إتمام رقمية يمكن طباعتها وإضافتها لملف التطوير المهني. الشهادة تتضمن اسم المعلم واسم المدرسة وتاريخ الإتمام.',
    },
    {
      q: 'كيف يتم تسجيل المعلمين؟',
      a: 'بعد تأكيد الباقة، نرسل لك روابط تسجيل فردية لكل معلم. كل معلم يحصل على حسابه الخاص للوصول للكورس. يمكنك أيضاً إرسال أسماء المعلمين وبريدهم الإلكتروني وسنسجلهم نيابة عنكم.',
    },
    {
      q: 'ماذا لو لم يكمل بعض المعلمين الكورس؟',
      a: 'الوصول دائم مدى الحياة، فالمعلم يمكنه البدء والإنهاء بالوقت الذي يناسبه. ضمان 7 أيام ينطبق على المدرسة ككل — إذا لم تكونوا راضين خلال الأسبوع الأول نعيد المبلغ كاملاً.',
    },
    {
      q: 'هل الكورس مناسب لجميع المواد والمراحل؟',
      a: 'نعم، الكورس يعتمد على رفع الكتاب المدرسي مباشرة، فهو يعمل مع أي مادة (علوم، رياضيات، لغة عربية، انكليزي...) وأي مرحلة دراسية. الأداة مجربة على مناهج حقيقية ومتوافقة مع العربية بالكامل.',
    },
  ]

  const WHATSAPP_NUMBER = '963985323170'
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#000] text-white" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }} suppressHydrationWarning>

      {/* ===== ANIMATION KEYFRAMES ===== */}
      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* ===== 1. STICKY TOP BAR ===== */}
      <div
        className="text-white py-2.5 px-4 sticky top-0 z-50 flex items-center justify-between"
        style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
      >
        <p className="text-sm font-bold flex-1 text-center">
          باقات خاصة للمدارس والمؤسسات التعليمية — خصم يصل لـ 39% على المجموعات
        </p>
        <a
          href="/"
          className="text-white/90 text-xs underline underline-offset-2 whitespace-nowrap mr-4 hover:text-white transition-colors"
        >
          معلم فردي؟ سجّل من هنا
        </a>
      </div>

      {/* ===== 2. HERO SECTION ===== */}
      <section className="relative bg-[#000] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#614BEB]/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A735D7]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-4 pt-12 pb-10 md:pt-16 md:pb-14 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#614BEB] to-[#A735D7] text-white px-5 py-2 rounded-full text-sm font-bold mb-6">
            <span className="text-lg">🏫</span>
            للمؤسسات التعليمية
          </div>

          {/* H1 */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-5">
            طوّر كادرك التعليمي بأدوات الذكاء الاصطناعي — كل معلم يوفّر{' '}
            <span
              className="font-black"
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              200 ساعة سنوياً
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed">
            كورس عملي معتمد بنتائج ملموسة: اختبارات بنسختين بـ 3 دقائق، مذكرات PDF احترافية بـ 10 دقائق، وشروحات صوتية فورية — كل شي مجرب على مناهج حقيقية وموثق بأرقام الصفحات
          </p>

          {/* Two CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="#pricing"
              className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black px-10 py-5 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-[#FF0000]/30"
            >
              اطلب باقة لمدرستك
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-105"
            >
              حمّل ملف التعريف
            </a>
          </div>

          {/* Trust elements */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-[#FFD814] text-sm font-bold bg-[#FFD814]/10 border border-[#FFD814]/20 rounded-[12px] px-4 py-2.5">
              <Shield className="w-5 h-5 shrink-0" />
              <span>ضمان 7 أيام — استرداد كامل بدون أسئلة</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <FileText className="w-5 h-5 text-[#614BEB] shrink-0" />
              <span>فواتير ضريبية رسمية متوفرة</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <GraduationCap className="w-5 h-5 text-[#A735D7] shrink-0" />
              <span>شهادات إتمام لكل معلم</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. IMPACT SECTION ===== */}
      <section className="py-12 md:py-16 bg-[#F5F3F3]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3 text-[#111]">
            مش بس توفير وقت —{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              تأثير حقيقي
            </span>{' '}
            على مدرستك
          </h2>
          <p className="text-[#565A7C] text-center mb-10 max-w-xl mx-auto text-sm">
            كل معلم يوفر 200 ساعة سنوياً — تخيل الأثر على مدرستك بالكامل
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="font-bold text-[#111] text-lg mb-2">معلم أقل إرهاق = أداء أعلى</h3>
              <p className="text-[#565A7C] text-sm leading-relaxed">
                كل معلم يوفر 200 ساعة سنوياً من التحضير اليدوي. وقت أقل في التحضير يعني طاقة أكبر في الصف وجودة أعلى في التعليم.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-bold text-[#111] text-lg mb-2">اختبارات دقيقة ومنسقة</h3>
              <p className="text-[#565A7C] text-sm leading-relaxed">
                اختبارات بنسختين مختلفات بـ 3 دقائق، مع إجابات نموذجية موثقة بأرقام الصفحات. محتوى عالي الجودة يرضي أولياء الأمور ويقلل الشكاوى.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-bold text-[#111] text-lg mb-2">شهادات إتمام لملفات التطوير</h3>
              <p className="text-[#565A7C] text-sm leading-relaxed">
                كل معلم يحصل على شهادة إتمام معتمدة تُضاف لملف التطوير المهني. يعزز مكانة المدرسة في تطوير كادرها التعليمي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. BEFORE/AFTER TABLE SECTION ===== */}
      <section className="py-12 md:py-16 bg-[#011839]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3 text-white">
            شوف الفرق اللي بيشهدو{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              معلميك
            </span>
          </h2>
          <p className="text-white/70 text-center mb-10 max-w-xl mx-auto text-sm">
            أرقام حقيقية من معلمين يستخدمون هذه الأدوات يومياً
          </p>

          {/* Time Savings Table */}
          <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}>
                  <th className="py-3 px-4 text-right text-white font-bold text-sm">المهمة</th>
                  <th className="py-3 px-4 text-center text-white/90 font-bold text-sm">الطريقة العادية</th>
                  <th className="py-3 px-4 text-center text-white font-bold text-sm">بـ AI</th>
                  <th className="py-3 px-4 text-center text-white font-bold text-sm">التوفير</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { task: 'تلخيص فصل كامل', old: '2-3 ساعات', ai: '5 دقائق', save: '95%' },
                  { task: 'إعداد 20 سؤال اختبار', old: 'ساعة ونص', ai: '3 دقائق', save: '97%' },
                  { task: 'عمل عرض تقديمي تعليمي', old: '3-4 ساعات', ai: '10 دقائق', save: '95%' },
                  { task: 'تصميم مذكرة PDF', old: 'ساعتين', ai: '10 دقائق', save: '92%' },
                  { task: 'عمل ملف صوتي تعليمي', old: 'مستحيل', ai: '5 دقائق', save: '∞' },
                  { task: 'بحث عن أحدث الدراسات', old: '2-3 ساعات', ai: 'ثواني', save: '99%' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-[#F7F7F7]'}>
                    <td className="py-2.5 px-4 text-right font-medium text-[#111] text-sm">{row.task}</td>
                    <td className="py-2.5 px-4 text-center text-[#FF0000] text-sm">{row.old}</td>
                    <td className="py-2.5 px-4 text-center text-[#614BEB] font-medium text-sm">{row.ai}</td>
                    <td className="py-2.5 px-4 text-center text-[#FFD814] font-bold text-sm">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Impact stat */}
          <div className="mt-8 bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-[20px] p-4 text-center">
            <p className="text-white font-bold text-base">
              في مجموعة 10 معلمين = توفير{' '}
              <span className="text-[#FFD814] font-black text-xl">2,000 ساعة سنوياً</span>{' '}
              لمدرستك
            </p>
          </div>
        </div>
      </section>

      {/* ===== 5. RESULTS GALLERY CTA ===== */}
      <section className="py-12 md:py-16 bg-[#F5F3F3]">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <div className="bg-white rounded-[20px] p-8 md:p-10 shadow-[0_6px_16px_rgba(0,0,0,0.12)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#614BEB]/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#A735D7]/5 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                {['✨', '🧠', '📄', '📊', '🎬', '🎙️'].map((icon, i) => (
                  <span key={i} className="text-2xl md:text-3xl">{icon}</span>
                ))}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[#111] mb-3">
                شوف عينات حقيقية من نتائج الشغل
              </h3>
              <p className="text-[#565A7C] text-sm mb-6 max-w-md mx-auto">
                إنفوجرافيك، عروض تقديمية، فيديوهات، وبودكاست — ملفات حقيقية من كتب كيمياء وعلوم وانكليزي
              </p>
              <a
                href="/results"
                className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-[#FF0000]/30"
              >
                شوف العينات الحقيقية
                <ArrowLeft className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. COURSE CONTENT SECTION ===== */}
      <section className="py-12 md:py-16 bg-[#000]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-2 text-white">محتوى الكورس التعليمي</h2>
          <p className="text-white/70 text-center mb-10 text-sm">5 وحدات - 20 درس عملي مباشر</p>

          <div className="space-y-3">
            {courseModules.map((mod, i) => (
              <div key={i} className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-right hover:bg-[#F7F7F7] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
                    >
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-[#111] text-base">{mod.title}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="text-xs text-white px-2 py-0.5 rounded-full font-bold"
                          style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
                        >
                          {mod.lessons} محاضرات
                        </span>
                        <span className="text-xs text-[#565A7C]">{mod.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#565A7C] transition-transform shrink-0 ${openModule === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openModule === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[#F5F3F3] pt-3">
                    <ul className="space-y-2">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#614BEB] mt-0.5 shrink-0" />
                          <span className="text-[#565A7C] text-sm">{item}</span>
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
      <section id="pricing" className="py-12 md:py-16 bg-[#F7F7F7]">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3 text-[#111]">
            باقات مصممة{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              لمدارسك
            </span>
          </h2>
          <p className="text-[#565A7C] text-center mb-10 max-w-2xl mx-auto text-sm">
            اختار الباقة اللي تناسب عدد معلميك — كلما زاد العدد، زاد الخصم
          </p>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Trial Package */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] border-t-4 border-[#A735D7]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🟣</span>
                <h3 className="font-black text-[#111] text-lg">الباقة التجريبية</h3>
              </div>
              <div className="mb-4">
                <div className="text-[#565A7C] text-sm mb-1">5 معلمين</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#111]">$375</span>
                  <span className="text-[#565A7C] text-sm">الإجمالي</span>
                </div>
                <div className="text-[#614BEB] text-sm font-bold">$75 للمعلم</div>
                <div className="text-[#FF0000] text-xs font-bold mt-1">خصم 16%</div>
              </div>
              <div className="border-t border-[#F5F3F3] pt-4 mb-6">
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A735D7] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">وصول كامل للكورس</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A735D7] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">شهادات إتمام</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A735D7] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">دعم واتساب</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="block w-full text-center bg-[#A735D7] hover:bg-[#9630C0] text-white font-bold py-3.5 rounded-xl transition-all hover:scale-105"
              >
                ابدأ بالباقة التجريبية
              </a>
            </div>

            {/* Standard Package - MOST POPULAR */}
            <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-[0_8px_24px_rgba(97,75,235,0.25)] border-2 border-[#614BEB] relative md:-mt-2 md:mb-2">
              {/* Badge */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-sm font-black px-6 py-1.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
              >
                الأكثر طلباً
              </div>
              <div className="flex items-center gap-2 mb-4 mt-2">
                <span className="text-xl">🔵</span>
                <h3 className="font-black text-[#111] text-lg">الباقة القياسية</h3>
              </div>
              <div className="mb-4">
                <div className="text-[#565A7C] text-sm mb-1">10 معلمين</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#111]">$650</span>
                  <span className="text-[#565A7C] text-sm">الإجمالي</span>
                </div>
                <div className="text-[#614BEB] text-sm font-bold">$65 للمعلم</div>
                <div className="text-[#FF0000] text-xs font-bold mt-1">خصم 28%</div>
              </div>
              <div className="border-t border-[#F5F3F3] pt-4 mb-6">
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#614BEB] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">كل مميزات التجريبية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#614BEB] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">لوحة متابعة تقدم المعلمين</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#614BEB] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">تقرير إتمام للمدير</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="block w-full text-center bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#FF0000]/30 text-lg"
              >
                اطلب الباقة القياسية
              </a>
            </div>

            {/* Enterprise Package */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] border-t-4 border-[#FFD814]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🟡</span>
                <h3 className="font-black text-[#111] text-lg">الباقة المؤسسية</h3>
              </div>
              <div className="mb-4">
                <div className="text-[#565A7C] text-sm mb-1">20+ معلم</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#111]">$1,100+</span>
                  <span className="text-[#565A7C] text-sm">الإجمالي</span>
                </div>
                <div className="text-[#FFD814] text-sm font-bold">$55 للمعلم</div>
                <div className="text-[#FF0000] text-xs font-bold mt-1">خصم 39%</div>
              </div>
              <div className="border-t border-[#F5F3F3] pt-4 mb-6">
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD814] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">كل مميزات القياسية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD814] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">جلسة تدريبية مباشرة مع المدرب</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD814] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">فاتورة ضريبية رسمية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD814] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">عقد استخدام مؤسسي</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="block w-full text-center bg-[#FFD814] hover:bg-[#E8C412] text-[#111] font-black py-3.5 rounded-xl transition-all hover:scale-105"
              >
                تواصل لحصول باقة مخصصة
              </a>
            </div>
          </div>

          {/* Under all cards */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-[20px] p-4 shadow-[0_6px_16px_rgba(0,0,0,0.12)] inline-block">
              <p className="text-[#565A7C] text-sm">
                جميع الباقات تشمل:{' '}
                <span className="text-[#111] font-bold">وصول دائم + تحديثات مجانية + ضمان 7 أيام + الهدايا المجانية ($45 قيمة)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. "ما يحصل عليه كل معلم" SECTION ===== */}
      <section className="py-12 md:py-16 bg-[#000]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-8 text-white">
            كل معلم في مدرستك يحصل على:
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {[
                'وصول دائم للكورس (20 درس عملي)',
                '15 برومبت جاهز للنسخ واللصق',
                'ورقة مرجعية سريعة للطباعة',
                'شهادة إتمام معتمدة',
                'دعم واتساب مباشر',
                'تحديثات مجانية مستمرة',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-[16px] px-5 py-3.5 border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-[#614BEB] shrink-0" />
                  <span className="text-white text-base font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. "المدرسة تحصل على" SECTION ===== */}
      <section className="py-12 md:py-16 bg-[#011839]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-8 text-white">
            وكمدير، أنت تحصل على:
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {[
                { icon: '📊', text: 'لوحة متابعة تقدم المعلمين', note: 'الباقة القياسية وما فوق' },
                { icon: '📄', text: 'تقرير إتمام تفصيلي', note: 'الباقة القياسية وما فوق' },
                { icon: '🧾', text: 'فاتورة ضريبية رسمية', note: 'جميع الباقات' },
                { icon: '📜', text: 'عقد استخدام مؤسسي', note: 'الباقة المؤسسية' },
                { icon: '🎓', text: 'جلسة تدريبية مباشرة مع المدرب نواف البوطة', note: 'الباقة المؤسسية' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-[16px] px-5 py-3.5 border border-white/10">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div className="flex-1">
                    <span className="text-white text-base font-medium">{item.text}</span>
                  </div>
                  <span className="text-white/50 text-xs font-bold bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">{item.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. VIDEO SECTION ===== */}
      <section className="py-12 md:py-16 bg-[#F5F3F3]">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-3 text-[#111]">
            شوف تعريف الكورس —{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              فيديو قصير
            </span>
          </h2>
          <p className="text-[#565A7C] text-sm mb-8">تعرف على الكورس في دقائق معدودة</p>

          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-[20px] overflow-hidden bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <iframe
                src="https://www.youtube.com/embed/Ze-HjqkxIJM?rel=0&modestbranding=1"
                className="w-full border-0"
                style={{ aspectRatio: '9/16', maxHeight: '600px' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="تعريف الكورس - المدرب نواف البوطة"
              />
              <div className="absolute bottom-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. TRAINER SECTION ===== */}
      <section className="py-12 md:py-16 bg-[#011839]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="bg-white rounded-[20px] p-6 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
            <div className="shrink-0">
              <img
                src="/images/trainer-nawaf.jpg"
                alt="نواف البوطة - مدرب الذكاء الاصطناعي بالتعليم"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#614BEB]/30 shadow-lg shadow-[#614BEB]/20"
              />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-xl font-black text-[#111] mb-1">نواف البوطة</h3>
              <p
                className="font-bold text-sm mb-3"
                style={{
                  background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                مدرب في الذكاء الاصطناعي التطبيقي بالتعليم
              </p>
              <p className="text-[#565A7C] text-sm leading-relaxed mb-4">
                أنا معلم متلكم، كنت بقعد ساعات بتحضير الدروس. لما اكتشفت هالأدوات حياتي انقلبت. صرت بعمل اختبار بنسختين بـ 5 دقائق وبعمل مذكرات PDF احترافية بدقائق. مؤمن إن كل معلم يقدر يستفيد من هالأدوات بغض النظر عن خلفيته التقنية.
              </p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/share/18UPsSwfwQ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#614BEB]/10 rounded-lg flex items-center justify-center hover:bg-[#614BEB]/20 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#614BEB]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href="https://instagram.com/noaf.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#A735D7]/10 rounded-lg flex items-center justify-center hover:bg-[#A735D7]/20 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#A735D7]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <span className="text-[#565A7C] text-xs">@noaf.ai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 12. FAQ SECTION ===== */}
      <section className="py-12 md:py-16 bg-[#F7F7F7]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3 text-[#111]">
            أسئلة{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              مدراء المدارس
            </span>
          </h2>
          <p className="text-[#565A7C] text-center mb-10 max-w-xl mx-auto text-sm">
            إجابات على الأسئلة الأكثر شيوعاً
          </p>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-right hover:bg-[#F7F7F7] transition-colors"
                >
                  <span className="font-bold text-[#111] text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#565A7C] transition-transform shrink-0 mr-3 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[#F5F3F3] pt-3">
                    <p className="text-[#565A7C] text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 13. CONTACT FORM SECTION ===== */}
      <section id="contact" className="py-12 md:py-16 bg-[#000] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#614BEB]/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#A735D7]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3 text-white">
            جاهز تطوّر كادرك التعليمي؟
          </h2>
          <p className="text-white/70 text-center mb-10 max-w-xl mx-auto text-sm">
            املأ النموذج ورح نتوصلك خلال 24 ساعة بعرض مخصص لمدرستك
          </p>

          {formSubmitted ? (
            <div className="max-w-xl mx-auto bg-white rounded-[20px] p-8 shadow-[0_6px_16px_rgba(0,0,0,0.12)] text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-black text-[#111] mb-2">تم إرسال طلبك بنجاح!</h3>
              <p className="text-[#565A7C] text-sm">سنتواصل معك خلال 24 ساعة بعرض مخصص لمدرستك.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto bg-white rounded-[20px] p-6 md:p-8 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <div className="space-y-4">
                {/* School Name */}
                <div>
                  <label className="block text-[#111] font-bold text-sm mb-1.5">
                    <Building2 className="w-4 h-4 inline ml-1" />
                    اسم المدرسة <span className="text-[#FF0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.schoolName}
                    onChange={(e) => handleFormChange('schoolName', e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl px-4 py-3 text-[#111] text-sm focus:outline-none focus:border-[#614BEB] focus:ring-1 focus:ring-[#614BEB] transition-colors"
                    placeholder="اسم المدرسة أو المؤسسة التعليمية"
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-[#111] font-bold text-sm mb-1.5">
                    <User className="w-4 h-4 inline ml-1" />
                    اسم المسؤول <span className="text-[#FF0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => handleFormChange('contactName', e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl px-4 py-3 text-[#111] text-sm focus:outline-none focus:border-[#614BEB] focus:ring-1 focus:ring-[#614BEB] transition-colors"
                    placeholder="اسمك الكامل"
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-[#111] font-bold text-sm mb-1.5">
                    <Briefcase className="w-4 h-4 inline ml-1" />
                    المسمى الوظيفي <span className="text-[#FF0000]">*</span>
                  </label>
                  <select
                    required
                    value={formData.jobTitle}
                    onChange={(e) => handleFormChange('jobTitle', e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl px-4 py-3 text-[#111] text-sm focus:outline-none focus:border-[#614BEB] focus:ring-1 focus:ring-[#614BEB] transition-colors appearance-none"
                  >
                    <option value="">اختر المسمى الوظيفي</option>
                    <option value="مدير/ة">مدير/ة</option>
                    <option value="نائب المدير">نائب المدير</option>
                    <option value="مسؤول التطوير المهني">مسؤول التطوير المهني</option>
                    <option value="مالك/ة المدرسة">مالك/ة المدرسة</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-[#111] font-bold text-sm mb-1.5">
                    <MapPin className="w-4 h-4 inline ml-1" />
                    الدولة <span className="text-[#FF0000]">*</span>
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => handleFormChange('country', e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl px-4 py-3 text-[#111] text-sm focus:outline-none focus:border-[#614BEB] focus:ring-1 focus:ring-[#614BEB] transition-colors appearance-none"
                  >
                    <option value="">اختر الدولة</option>
                    <option value="الإمارات">الإمارات</option>
                    <option value="الكويت">الكويت</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                {/* Teacher Count */}
                <div>
                  <label className="block text-[#111] font-bold text-sm mb-1.5">
                    <Users className="w-4 h-4 inline ml-1" />
                    عدد المعلمين المتوقع <span className="text-[#FF0000]">*</span>
                  </label>
                  <select
                    required
                    value={formData.teacherCount}
                    onChange={(e) => handleFormChange('teacherCount', e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl px-4 py-3 text-[#111] text-sm focus:outline-none focus:border-[#614BEB] focus:ring-1 focus:ring-[#614BEB] transition-colors appearance-none"
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
                  <label className="block text-[#111] font-bold text-sm mb-1.5">
                    <Phone className="w-4 h-4 inline ml-1" />
                    رقم الهاتف مع واتساب <span className="text-[#FF0000]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl px-4 py-3 text-[#111] text-sm focus:outline-none focus:border-[#614BEB] focus:ring-1 focus:ring-[#614BEB] transition-colors"
                    placeholder="رقم الواتساب مع رمز الدولة"
                    dir="ltr"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[#111] font-bold text-sm mb-1.5">
                    <Mail className="w-4 h-4 inline ml-1" />
                    البريد الإلكتروني المؤسسي <span className="text-[#565A7C] font-normal">(اختياري)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl px-4 py-3 text-[#111] text-sm focus:outline-none focus:border-[#614BEB] focus:ring-1 focus:ring-[#614BEB] transition-colors"
                    placeholder="email@school.com"
                    dir="ltr"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[#111] font-bold text-sm mb-1.5">
                    <MessageSquare className="w-4 h-4 inline ml-1" />
                    أي ملاحظات أو متطلبات خاصة <span className="text-[#565A7C] font-normal">(اختياري)</span>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleFormChange('notes', e.target.value)}
                    rows={3}
                    className="w-full bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl px-4 py-3 text-[#111] text-sm focus:outline-none focus:border-[#614BEB] focus:ring-1 focus:ring-[#614BEB] transition-colors resize-none"
                    placeholder="مثلاً: مواد معينة، متطلبات خاصة، استفسارات..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-6 bg-[#22C55E] hover:bg-[#1EAF4D] text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-[#22C55E]/30 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                أرسل طلبك الآن
              </button>

              {/* WhatsApp alternative */}
              <div className="mt-4 text-center">
                <span className="text-[#565A7C] text-sm">أو تواصل مباشرة عبر </span>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#22C55E] font-bold text-sm hover:underline"
                >
                  واتساب
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ===== 14. FOOTER ===== */}
      <footer className="bg-[#000] border-t border-white/10 py-8">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <p className="text-white/50 text-sm mb-2">
            نواف البوطة | المدرب | كورس الذكاء الاصطناعي بالتعليم — للمدارس والمؤسسات
          </p>
          <p className="text-white/30 text-xs mb-4">
            جميع الحقوق محفوظة 2026
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="text-white/50 text-xs hover:text-white transition-colors">سياسة الخصوصية</a>
            <span className="text-white/20">|</span>
            <a href="#" className="text-white/50 text-xs hover:text-white transition-colors">شروط الاستخدام</a>
            <span className="text-white/20">|</span>
            <a href="/" className="text-white/50 text-xs hover:text-white transition-colors">الصفحة الرئيسية</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
