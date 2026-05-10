'use client'

import { useState } from 'react'
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  Laptop,
  MessageCircle,
  Mic,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
  FileText,
  ArrowLeft,
  Send,
  ChevronDown,
} from 'lucide-react'

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const faqs = [
    {
      q: 'هل الكورس مناسب للمبتدئين؟',
      a: 'نعم! الكورس مصمم من الصفر. لا تحتاج أي خبرة تقنية. كل اللي تحتاجه حساب جوجل واتصال إنترنت.',
    },
    {
      q: 'هل الأدوات المذكورة مجانية؟',
      a: 'NotebookLM مجاني تماماً من جوجل. Z.ai يحتاج اشتراك لكن الكورس يعلمك تستخدم النسخة المجانية بشكل فعال.',
    },
    {
      q: 'هل الكورس مناسب لكل المواد التعليمية؟',
      a: 'نعم! الكورس مناسب لكل المواد: رياضيات، عربي، علوم، تربية إسلامية، لغة إنجليزية، وغيرها. الأمثلة العملية تشمل مواد مختلفة.',
    },
    {
      q: 'كيف يتم الدفع؟',
      a: 'الدفع عبر تحويل بنكي أو مكتب صرافة. بعد التحويل، أرسل إثبات الدفع عبر واتساب وسيتم إرسال رابط الكورس خلال ساعات.',
    },
    {
      q: 'هل أحصل على شهادة؟',
      a: 'نعم، تحصل على شهادة إتمام إلكترونية بعد الانتهاء من الكورس وتطبيق الواجب العملي.',
    },
  ]

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-white font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-bl from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-400 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                كورس عملي - ساعتين فقط
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                المدرب: <span className="font-bold text-amber-400">نواف البوطة</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                كيف تستخدم{' '}
                <span className="text-amber-400">NotebookLM</span> +{' '}
                <span className="text-amber-400">Z.ai</span>
                <br />
                في التعليم
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                تعلم كيف توفر ساعات التحضير اليومية باستخدام أداتين من أقوى أدوات
                الذكاء الاصطناعي. من المصدر إلى ملف PDF احترافي بأقل من 15 دقيقة!
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>مدة الكورس: ساعتان</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>السعر: $30 فقط</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>للمعلمين والمعلمات</span>
                </div>
              </div>
              <a
                href="#register"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#1a1a2e] font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-amber-400/25"
              >
                سجّل الآن
                <ArrowLeft className="w-5 h-5" />
              </a>
            </div>
            <div className="hidden md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50">
                <img
                  src="/hero-banner.png"
                  alt="كورس الذكاء الاصطناعي للمعلمين"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#1a1a2e] text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-amber-400">15</div>
              <div className="text-sm text-gray-400">برومبت جاهز</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-amber-400">2</div>
              <div className="text-sm text-gray-400">أداة AI عملية</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-amber-400">5</div>
              <div className="text-sm text-gray-400">ملفات PDF مع الكورس</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-amber-400">100%</div>
              <div className="text-sm text-gray-400">تطبيق عملي</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              هل تعاني من هالمشاكل؟
            </h2>
            <p className="text-gray-600 text-lg">
              معظم المعلمين بيضيعوا ساعات بالتحضير والأنشطة اللي ممكن تعملها بدقائق
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: 'ساعات بالتحضير',
                desc: 'بتضيع 2-3 ساعات يومياً بتحضير الدروس والأسئلة والمذكرات',
              },
              {
                icon: FileText,
                title: 'ملفات غير مرتبة',
                desc: 'المذكرات والخطط بتعملها بالوورد بس التنسيق بياخد وقت كتير',
              },
              {
                icon: Brain,
                title: 'محتوى عام مش دقيق',
                desc: 'ChatGPT بيعطيك إجابات عامة مش مبنية على المنهج السوري',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              الحل: NotebookLM + Z.ai
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              أداتين مجانيتين بيحوّلوا طريقة تحضيرك بالكامل. من المصدر لملف PDF
              احترافي بأقل من 15 دقيقة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* NotebookLM */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a2e]">NotebookLM</h3>
                  <span className="text-sm text-purple-600">من جوجل - مجاني</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'ارفع كتابك المدرسي واسألو أي سؤال',
                  'يعمل ملخصات وأسئلة من المصدر فقط',
                  'كل إجابة موثقة بأرقام الصفحات',
                  'يعمل بودكاست تعليمي بنقرة واحدة',
                  'يدعم العربية والمناهج السورية',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Z.ai */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Laptop className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a2e]">Z.ai</h3>
                  <span className="text-sm text-amber-600">لإنشاء ملفات PDF</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'يحول النص لملف PDF احترافي جاهز للطباعة',
                  'منظم بشكل مرتب ومناسب للطلاب',
                  'يدعم العربية RTL',
                  'بيعمل مذكرات وخطط دروس وأوراق عمل',
                  'النتيجة جاهزة للطباعة والتوزيع',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Workflow */}
          <div className="bg-[#1a1a2e] rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold text-center mb-8 text-amber-400">
              الـ Workflow الكامل: من المصدر للمنتج النهائي
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: '1', text: 'ارفع مصادرك على NotebookLM' },
                { step: '2', text: 'اسأل الأسئلة اللي بدك ياه' },
                { step: '3', text: 'انسخ النتيجة' },
                { step: '4', text: 'الصقها بـ Z.ai مع تعليمات التصميم' },
                { step: '5', text: 'حمّل PDF واطبع!' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-[#1a1a2e] font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <p className="text-sm text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <span className="text-amber-400 font-bold text-lg">
                الوقت الإجمالي: 10-15 دقيقة فقط!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Time Savings */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              وفّر وقتك يومياً
            </h2>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-[#302b63] text-white">
                  <th className="py-4 px-6 text-right">المهمة</th>
                  <th className="py-4 px-6 text-center">الطريقة العادية</th>
                  <th className="py-4 px-6 text-center">بـ AI</th>
                  <th className="py-4 px-6 text-center">التوفير</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { task: 'تلخيص فصل كامل', old: '2-3 ساعات', ai: '5 دقائق', save: '95%' },
                  { task: 'إعداد 20 سؤال اختبار', old: 'ساعة ونص', ai: '3 دقائق', save: '97%' },
                  { task: 'كتابة خطة درس', old: 'ساعة', ai: '5 دقائق', save: '92%' },
                  { task: 'تصميم مذكرة PDF', old: 'ساعتين', ai: '10 دقائق', save: '92%' },
                  { task: 'عمل بودكاست تعليمي', old: 'مستحيل', ai: '5 دقائق', save: '∞' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                    <td className="py-3 px-6 text-right font-medium text-[#1a1a2e]">
                      {row.task}
                    </td>
                    <td className="py-3 px-6 text-center text-red-600">{row.old}</td>
                    <td className="py-3 px-6 text-center text-green-600 font-medium">{row.ai}</td>
                    <td className="py-3 px-6 text-center text-amber-600 font-bold">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              محتوى الكورس
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                time: '10 دقائق',
                title: 'المقدمة',
                desc: 'المدرب نواف البوطة + ليش هاد الكورس + شو رح تتعلم',
                icon: Target,
              },
              {
                time: '20 دقيقة',
                title: 'أساسيات الذكاء الاصطناعي',
                desc: 'شو هو AI + كيف يفيد المعلم + مقارنة الأدوات',
                icon: Brain,
              },
              {
                time: '30 دقيقة',
                title: 'NotebookLM بالتفصيل',
                desc: 'شرح عملي + رفع مصادر + أسئلة + بودكاست',
                icon: BookOpen,
              },
              {
                time: '30 دقيقة',
                title: 'Z.ai بالتفصيل',
                desc: 'إنشاء مذكرة PDF + خطة درس + أسئلة امتحان',
                icon: Laptop,
              },
              {
                time: '20 دقيقة',
                title: 'برومبتات احترافية',
                desc: 'قاعدة س-د-س-م + أخطاء شائعة + تقنيات متقدمة',
                icon: Zap,
              },
              {
                time: '10 دقائق',
                title: 'نماذج جاهزة',
                desc: '15 برومبت جاهز للتطبيق المباشر + ملخص + خاتمة',
                icon: Star,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#1a1a2e]">{item.title}</h3>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Files */}
      <section className="py-16 md:py-20 bg-[#1a1a2e] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              ملفات إضافية <span className="text-amber-400">مجاناً</span> مع الكورس
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: '15 برومبت جاهز', desc: 'نسخ ولصق مباشرة', icon: FileText },
              { title: 'دليل كتابة البرومبتات', desc: 'من البداية للاحتراف', icon: BookOpen },
              { title: 'ورقة مرجعية سريعة', desc: 'Cheat Sheet للمعلم', icon: Zap },
              { title: 'دليل المعلم الكامل', desc: 'خطوة بخطوة', icon: GraduationCap },
              { title: 'نصوص إعلانات + واتساب', desc: 'جاهزة للتسويق', icon: MessageCircle },
              { title: 'بودكاست تعليمي تجريبي', desc: 'جاهز للمشاركة', icon: Mic },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 rounded-xl p-5 backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                <item.icon className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              شو بيقولوا المعلمين؟
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'أحمد',
                role: 'معلم رياضيات - حلب',
                text: 'كنت بقعد 3 ساعات بتحضير درس واحد، الحين بساعة بخلص كل شي بالذكاء الاصطناعي.',
              },
              {
                name: 'سارة',
                role: 'معلمة لغة عربية - دمشق',
                text: 'الكورس غير طريقة تحضيري بالكامل. صرت بعمل مذكرات PDF احترافية بـ 10 دقائق!',
              },
              {
                name: 'محمد',
                role: 'معلم علوم - حمص',
                text: 'ميزة البودكاست رهيبة! بعمل ملف صوتي لكل فصل وبوزعه على الطلاب عبر واتساب.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-[#1a1a2e]">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              أسئلة شائعة
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-right hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-[#1a1a2e]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform shrink-0 mr-3 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-16 md:py-20 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              سجّل الآن بالكورس
            </h2>
            <p className="text-gray-300 text-lg">
              ابدأ رحلتك مع الذكاء الاصطناعي بالتعليم اليوم
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-amber-400">$30</span>
                <span className="text-gray-400 mr-2">مرة واحدة فقط</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    رقم الواتساب
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="+963 xxx xxx xxxx"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    المادة التي تدرّسها
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="" className="text-gray-900">اختر المادة</option>
                    <option value="رياضيات" className="text-gray-900">رياضيات</option>
                    <option value="لغة عربية" className="text-gray-900">لغة عربية</option>
                    <option value="علوم" className="text-gray-900">علوم</option>
                    <option value="تربية إسلامية" className="text-gray-900">تربية إسلامية</option>
                    <option value="لغة إنجليزية" className="text-gray-900">لغة إنجليزية</option>
                    <option value="أخرى" className="text-gray-900">أخرى</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-amber-400 hover:bg-amber-500 text-[#1a1a2e] font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                سجّل وابدأ الآن
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">
                بعد التسجيل، رح نتصل فيك عبر الواتساب لتأكيد الدفع وإرسال رابط الكورس
              </p>
            </form>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-400 mb-3">تم التسجيل بنجاح!</h3>
              <p className="text-gray-300 text-lg mb-4">
                شكراً لك! رح نتصل فيك عبر الواتساب قريباً لتأكيد الدفع وإرسال رابط الكورس.
              </p>
              <p className="text-gray-400">
                لو عندك أي سؤال، تواصل معنا عبر واتساب
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trainer Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              تعرّف على المدرب
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-amber-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                ن.ب
              </div>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-1">نواف البوطة</h3>
              <p className="text-purple-600 font-medium mb-3">مدرب في الذكاء الاصطناعي التطبيقي بالتعليم</p>
              <p className="text-gray-600 leading-relaxed">
                مدرب متخصص في استخدام أدوات الذكاء الاصطناعي في المجال التعليمي. يساعد المعلمين على توظيف التقنيات الحديثة لتوفير الوقت وتحسين جودة المحتوى التعليمي. يؤمن بأن كل معلم يستطيع استخدام AI بسهولة بغض النظر عن خلفيته التقنية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0c29] text-gray-400 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-3">
            <span className="text-amber-400 font-bold text-lg">نواف البوطة</span>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-gray-300">المدرب</span>
          </div>
          <p className="text-sm">
            كورس NotebookLM + Z.ai في التعليم | للمعلمين والمعلمات في سوريا
          </p>
          <p className="text-xs mt-2 text-gray-600">
            جميع الحقوق محفوظة 2025
          </p>
        </div>
      </footer>
    </div>
  )
}
