'use client'

import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Mail, MessageCircle, Search, Wrench } from 'lucide-react'

const WHATSAPP_LINK = 'https://wa.me/963985323170'

const trainingSessions = [
  {
    title: 'أتمتة المهام الزراعية',
    audience: 'المهندسون الزراعيون — جامعة حمص',
    description: 'جلسة تطبيقية حول تحويل المهام الزراعية المتكررة إلى سير عمل أكثر تنظيمًا باستخدام أدوات الذكاء الاصطناعي والأتمتة.',
    images: ['/images/training/agri-automation-01.png', '/images/training/agri-automation-02.png'],
  },
  {
    title: 'إعداد معلم رقمي',
    audience: 'المعلمون والعاملون في التعليم',
    description: 'جلسة عملية لبناء معلم رقمي قادر على تنظيم المحتوى، إعداد الأنشطة، وتوظيف الأدوات الحديثة في التحضير والتواصل مع الطلاب.',
    images: ['/images/training/digital-teacher-01.png', '/images/training/digital-teacher-02.png'],
  },
  {
    title: 'إعداد المحتوى بالذكاء الاصطناعي',
    audience: 'صنّاع المحتوى والمهتمون بالتسويق',
    description: 'تدريب على التخطيط للمحتوى، توليد الأفكار، كتابة النصوص، وتجهيز مواد قابلة للنشر مع الحفاظ على هوية صاحب المحتوى.',
    images: ['/images/training/ai-content-01.png', '/images/training/ai-content-02.png'],
  },
  {
    title: 'Vibe Coding — البرمجة بالذكاء الاصطناعي',
    audience: 'المبرمجون وصنّاع التطبيقات',
    description: 'جلسة تطبيقية لتحويل الفكرة إلى نموذج أولي، وبناء الواجهات، وفهم الكود، واختبار الأخطاء بمساعدة الذكاء الاصطناعي.',
    images: ['/images/training/vibe-coding-01.png'],
  },
  {
    title: 'جلسة Online في الذكاء الاصطناعي',
    audience: 'متدربون عن بُعد',
    description: 'جلسة تفاعلية عبر الإنترنت تضمنت مشاركة الشاشة، شرح الوصول إلى أدوات الذكاء الاصطناعي، والإجابة عن أسئلة المشاركين خطوة بخطوة.',
    images: ['/images/training/online-ai-01.png', '/images/training/online-ai-02.png'],
  },
]

export default function AboutTrainerPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#1B2A4A]">
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="max-w-[1100px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="font-bold text-[#0D9488]">Course الذكاء الاصطناعي في التعليم</Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#1B2A4A] hover:text-[#0D9488]">
            العودة للصفحة الرئيسية
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto px-4 grid md:grid-cols-[220px_1fr] gap-8 items-center">
          <div className="mx-auto">
            <img src="/images/trainer-nawaf.jpg" alt="المدرب نواف البوسطه" className="w-64 h-64 md:w-72 md:h-72 rounded-2xl object-cover border-4 border-[#0D9488]/15" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0D9488]/10 text-[#0D9488] px-4 py-2 text-sm font-bold mb-5">عن المدرب</div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">نواف البوسطه</h1>
            <p className="text-xl text-[#0D9488] font-bold mb-5">متخصص في تطبيقات الذكاء الاصطناعي في التعليم ومدرب أدوات الذكاء الاصطناعي — سوريا</p>
            <p className="text-[#64748B] leading-loose max-w-3xl">مدرب وخبير متخصص في أدوات الذكاء الاصطناعي، يعمل على تحويل التقنيات الحديثة إلى حلول عملية قابلة للتطبيق للأفراد والشركات والمؤسسات التعليمية. يجمع بين التدريب، البحث، تصميم المحتوى، وتطوير حلول الأتمتة، مع تركيز على جعل الذكاء الاصطناعي مفهومًا وقابلًا للاستخدام.</p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 text-center"><div className="text-3xl font-bold text-[#0D9488]">1000+</div><p className="text-[#64748B] text-sm mt-2">طالب بحسب السيرة الذاتية</p></div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 text-center"><div className="text-3xl font-bold text-[#0D9488]">50+</div><p className="text-[#64748B] text-sm mt-2">شركة تم تدريب موظفيها</p></div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 text-center"><div className="text-3xl font-bold text-[#0D9488]">10+</div><p className="text-[#64748B] text-sm mt-2">مشاريع وأدوات أتمتة</p></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white border border-[#E2E8F0] rounded-xl p-7">
              <div className="flex items-center gap-3 mb-5"><BriefcaseBusiness className="w-6 h-6 text-[#0D9488]" /><h2 className="text-2xl font-bold">مجالات التدريب</h2></div>
              <ul className="space-y-3 text-[#64748B] text-sm leading-loose">
                {['تدريب الأفراد والشركات على أدوات الذكاء الاصطناعي المتقدمة', 'Prompt Engineering وصياغة الأوامر العملية', 'تصميم المحتوى والمناهج التدريبية لمستويات متعددة', 'تطبيق الذكاء الاصطناعي في التعليم والإنتاجية المؤسسية'].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-1 shrink-0" />{item}</li>)}
              </ul>
            </section>
            <section className="bg-white border border-[#E2E8F0] rounded-xl p-7">
              <div className="flex items-center gap-3 mb-5"><Wrench className="w-6 h-6 text-[#0D9488]" /><h2 className="text-2xl font-bold">الحلول والمشاريع</h2></div>
              <ul className="space-y-3 text-[#64748B] text-sm leading-loose">
                {['أتمتة محتوى وتقارير ومنصات يوتيوب', 'حلول أتمتة مخصصة للرياضة والصحة', 'تطوير أدوات باستخدام Python وAPIs وWorkflow Automation', 'تحويل نتائج البحث إلى تطبيقات وأدوات قابلة للاستخدام'].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-1 shrink-0" />{item}</li>)}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4"><Search className="w-7 h-7 text-[#0D9488]" /></div>
            <h2 className="text-2xl md:text-4xl font-bold mb-5">البحث والرؤية</h2>
            <p className="text-[#64748B] leading-loose">يركز نواف في أبحاثه على تطبيقات الذكاء الاصطناعي التوليدي، نماذج اللغة الكبيرة، الأتمتة، وتحليل تأثير AI على سوق العمل والمهارات المستقبلية. الهدف هو ربط المعرفة النظرية بحلول عملية تعالج تحديات واقعية.</p>
            <blockquote className="mt-7 border-r-4 border-[#0D9488] pr-5 text-lg font-bold text-[#1B2A4A]">«الذكاء الاصطناعي ليس مستقبلًا ننتظره، بل حاضر نصنعه.»</blockquote>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">من تجاربي التدريبية</h2>
            <p className="text-[#64748B] max-w-2xl mx-auto leading-loose">جلسات وتدريبات قدّمتها لفئات مختلفة، من التعليم وصناعة المحتوى إلى الأتمتة والبرمجة بالذكاء الاصطناعي.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {trainingSessions.map((session) => (
              <article key={session.title} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                <div className="grid grid-cols-2 gap-1 bg-[#E2E8F0] p-1">
                  {session.images.map((image) => <img key={image} src={image} alt={session.title} className={`${session.images.length === 1 ? 'col-span-2' : ''} w-full h-44 md:h-56 object-cover`} loading="lazy" />)}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{session.title}</h3>
                  <div className="text-[#0D9488] text-sm font-bold mb-3">{session.audience}</div>
                  <p className="text-[#64748B] text-sm leading-loose">{session.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="bg-[#1B2A4A] rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">للتدريب الفردي أو التعاون المؤسسي</h2>
            <p className="text-white/75 leading-loose max-w-2xl mx-auto mb-7">للمعلمين والأفراد: ابدأ عبر WhatsApp. للمؤسسات والمراكز: تواصل مع منصة Manasa Digital لتنسيق العرض المناسب.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] px-6 py-3 rounded-xl font-bold"><MessageCircle className="w-4 h-4" /> WhatsApp للأفراد</a>
              <a href="mailto:info@manasadigital.com" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 px-6 py-3 rounded-xl font-bold"><Mail className="w-4 h-4" /> تواصل المؤسسات</a>
            </div>
            <div className="mt-5 text-white/60 text-sm">للدعم: support@manasadigital.com — للمؤسسات: info@manasadigital.com</div>
          </div>
        </div>
      </section>
    </main>
  )
}
