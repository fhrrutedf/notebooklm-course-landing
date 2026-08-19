'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  FileText,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Zap,
  FileOutput,
  Users,
  CreditCard,
  Send,
  ArrowLeft,
  Globe,
  Building2,
  Clock,
  Award,
  Presentation,
  Headphones,
} from 'lucide-react'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(0)

  const currentPricing = {
    price: '3,200 ليرة سورية جديدة',
    currency: 'شام كاش / تحويل بنكي / نتفق على الأقساط عبر التواصل',
    whatsappText: 'مرحباً، أريد تفاصيل التسجيل في الكورس المتكامل لأدوات الذكاء الاصطناعي، وأريد معرفة طريقة الدفع والتسجيل.',
  }
  const WHATSAPP_NUMBER = '963985323170'
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(currentPricing.whatsappText)}`
  const COURSE_DURATION = '4 ساعات تقريباً'

  // ===== DATA =====

  const courseModules = [
    {
      title: 'المسار 1: من المصدر إلى شرح وفيديو تعليمي',
      lessons: 6,
      items: [
        'كيف تبدأ من الكتاب أو الدرس وتحدد المطلوب من الذكاء الاصطناعي',
        'كيف تكتب Prompt واضحًا لشرح مناسب لعمر الطالب ومستواه',
        'كيف تراجع الناتج وتحوّله إلى شرح أو فيديو تعليمي قابل للمشاركة',
      ],
    },
    {
      title: 'المسار 2: من الدرس إلى اختبار وPDF ومشروع',
      lessons: 7,
      items: [
        'تحويل الدرس إلى أسئلة واختبار منظم مع نموذج إجابة',
        'إخراج ورقة PDF قابلة للطباعة بتنسيق عربي واضح',
        'إنشاء مهمة أو مشروع بسيط يمكن للطلاب تطبيقه ومراجعته',
      ],
    },
    {
      title: 'المسار 3: عرض وتفاعل وبودكاست ومتابعة',
      lessons: 7,
      items: [
        'إنشاء عرض تعليمي ونشاط يساعد على تفاعل الطلاب داخل الحصة',
        'إنتاج Podcast أو شرح صوتي وفيديو من محتوى الدرس',
        'تحديث طريقة عملك عند تغير الأدوات مع الحفاظ على قوالبك ومصادرك',
      ],
    },
  ]

  const bonuses = [
    { title: 'حزمة Prompts للمعلمين', subtitle: 'Prompts', value: '1,500 ليرة سورية جديدة', desc: 'قوالب جاهزة للشرح والاختبارات والمشاريع والفيديوهات والـPodcasts، مع طريقة تعديل كل قالب حسب الصف والمادة.', icon: Zap },
    { title: 'قوالب مشاريع ومخرجات', subtitle: 'Templates', value: '1,000 ليرة سورية جديدة', desc: 'قوالب عملية لخطة المشروع، ورقة الاختبار، سيناريو الفيديو، بطاقة الخروج، ونموذج التقييم.', icon: FileText },
    { title: 'تحديثات ودعم بعد الكورس', subtitle: 'Updates & Coaching', value: 'ضمن الكورس', desc: 'تحديثات عند تطور الأدوات، ومكالمات مجانية مع الكوتش عند مواجهة مشكلة في التطبيق أو تنفيذ المخرجات.', icon: Shield },
  ]

  const faqs = [
    {
      q: 'أنا معلم أو دكتور جامعي ما بعرف شي بالتكنولوجيا، فيي أستفيد؟',
      a: 'أكيد! الكورس مصمم خصيصاً للمعلمين والدكاترة والمدربين اللي ما عندهن أي خبرة تقنية. كل اللي بتحتاجه تعرف تفتح موقع وتضغط زر. رح نمشي معك خطوة بخطوة من الصفر.',
    },
    {
      q: 'الأدوات مجانية ولا لازم ادفع اشتراك؟',
      a: 'الأداة الأولى مجانية تماماً. الأداة التانية فيها نسخة مجانية كافية لتطبيق كل اللي رح تتعلمه بالكورس. مش محتاج تدفع شي إضافي عشان تبدأ.',
    },
    {
      q: 'الإجابات اللي بتطلع دقيقة ومطابقة للمنهج؟',
      a: 'هاد أكتر شي بيميزها عن غيرها! الأداة بترجع للكتاب المدرسي اللي رفعته وبتجاوب منه بس. كل إجادة بيكون مكتوب جنبها رقم الصفحة. ما بتطلع معلومات من بره المنهج.',
    },
    {
      q: 'كيف بدفع؟',
      a: 'الدفع داخل سوريا عبر شام كاش أو تحويل بنكي أو مكتب صرافة. يوجد أقساط، ونتفق على التفاصيل عبر التواصل. بعد الاتفاق، نرسل لك تفاصيل الوصول إلى الكورس.',
    },
    {
      q: 'هل الكورس فيديوهات مسجلة أم لقاءات مباشرة؟',
      a: 'الكورس برنامج تدريبي مسجل ومنظم، وتتوفر مكالمات مجانية مع الكوتش عند مواجهة مشكلة أثناء التطبيق، بحسب آلية الدعم الموضحة عند التسجيل.',
    },
    {
      q: 'هل تشرحون من مصادر محددة أم يجيب الذكاء الاصطناعي من عنده؟',
      a: 'نتعلم كيف نرفق المصدر ونطلب من الأداة الاعتماد عليه فقط، ثم نراجع الناتج بشريًا قبل استخدامه مع الطلاب. لا نترك الأداة تضيف معلومات خارج المصدر دون تنبيه أو مراجعة.',
    },
    {
      q: 'هل أتعلم إعداد عروض تقديمية وملفات PDF جاهزة للطباعة؟',
      a: 'نعم، نتناول طريقة تحويل المادة إلى عرض تقديمي، واختبار أو ورقة عمل PDF جاهزة للطباعة، مع تنظيم عربي واضح ومراجعة قبل التوزيع.',
    },
    {
      q: 'هل يوجد دعم أو تحديثات بعد انتهاء الكورس؟',
      a: 'نعم، توجد تحديثات للكورس، ويمكن ترتيب مكالمات مجانية مع الكوتش عند ظهور مشكلة في تطبيق ما تعلمته أو عند الحاجة إلى توضيح عملي.',
    },
    {
      q: 'هل الشهادة إلزامية مع التسجيل؟',
      a: 'لا. الشهادة اختيارية ورسومها منفصلة عن الكورس. تتوفر شهادة من وزارة التنمية السورية قابلة للتصديق عبر وزارة الخارجية السورية. للاستفسار عن الإجراءات والاعتراف محليًا ودوليًا، تواصل معنا عبر الخاص.',
    },
  ]

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-white text-[#1E293B]" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }} suppressHydrationWarning>

      {/* ===== 1. TOP NAVIGATION BAR ===== */}
      <nav className="bg-white border-b border-[#E2E8F0] py-3 px-4 sticky top-0 z-50">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0D9488]" />
            <span className="font-bold text-[#1B2A4A] text-sm md:text-base">كورس الذكاء الاصطناعي للمعلمين</span>
          </div>
          <Link
            href="/schools"
            className="text-[#0D9488] text-xs md:text-sm font-bold hover:text-[#0B7C72] transition-colors flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4" />
            للمؤسسات التعليمية
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

        <div className="relative z-10 max-w-[1000px] mx-auto px-4 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 text-[#0D9488] px-5 py-2 rounded-full text-sm font-bold mb-8 border border-[#0D9488]/20">
            <Sparkles className="w-4 h-4" />
            كورس متكامل عملي — المدرب نواف البوسطة
          </div>

          {/* H1 */}
          <h1 className="text-3xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.4] mb-6 text-[#1B2A4A]">
حضّر لطلابك مادة تعليمية من مصدرك بدل أن تضيع ساعات في الكتابة والتنسيق
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[#64748B] max-w-3xl mx-auto mb-10 leading-loose">
            شاهد نماذج حقيقية لخرائط ذهنية واختبارات وملفات PDF وعروض وفيديوهات تعليمية، ثم تعلّم داخل الكورس الطريقة العملية التي تبدأ من مصدرك وتنتهي بمخرج مناسب لطلابك.
          </p>

          {/* Two CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="/results"
              className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-8 py-4 rounded-xl text-base transition-colors"
            >
              <Presentation className="w-5 h-5" />
              شاهد نماذج حقيقية
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-[#1B2A4A]/20 hover:border-[#0D9488] text-[#1B2A4A] font-bold px-8 py-4 rounded-xl text-base transition-colors"
            >
              اطلب تفاصيل التسجيل
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Price info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6">
            {/* Syria Price */}
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <span className="text-base">🇸🇾</span>
              <span>سعر الكورس: <span className="text-[#0D9488] font-bold">3,200 ليرة سورية جديدة</span></span>
            </div>
            {/* Guarantee */}
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Shield className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>يوجد أقساط — نتفق على التفاصيل عبر التواصل</span>
            </div>
            {/* Google tool */}
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Globe className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>أدوات تعليمية مجانية أو بخطط مجانية</span>
            </div>
          </div>

          <div className="mt-8 mx-auto max-w-2xl rounded-xl border border-[#0D9488]/20 bg-white p-4 text-right">
            <p className="font-bold text-[#1B2A4A]">لا تتعامل مع الذكاء الاصطناعي بعشوائية.</p>
            <p className="mt-1 text-sm leading-loose text-[#64748B]">داخل الكورس تتعلم كيف تحدد المطلوب، ترفق المصدر، تكتب Prompt واضحًا، ثم تراجع الناتج قبل استخدامه مع الطلاب.</p>
          </div>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">4 ساعات</div>
              <div className="text-[#64748B] text-xs mt-1">مدة الـCourse</div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">مخرجات تعليمية</div>
              <div className="text-[#64748B] text-xs mt-1">اختبار، خريطة ذهنية، عرض وشرح</div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">أقساط</div>
              <div className="text-[#64748B] text-xs mt-1">لمن لا يتوفر معه المبلغ كاملًا</div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">نماذج حقيقية</div>
              <div className="text-[#64748B] text-xs mt-1">شاهدها قبل التسجيل</div>
            </div>
          </div>

          {/* Purchase Steps */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {[
                { icon: MessageCircle, step: '١', text: 'تواصل واتساب' },
                { icon: CreditCard, step: '٢', text: 'نسّق الدفع' },
                { icon: Send, step: '٣', text: 'استلم التفاصيل' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0D9488]/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#0D9488]" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#0D9488] font-bold">خطوة {item.step}</div>
                      <div className="text-xs text-[#64748B]">{item.text}</div>
                    </div>
                  </div>
                  {i < 2 && <ArrowLeft className="w-4 h-4 text-[#E2E8F0] hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. AUDIENCE AND SOLUTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">لمين صُمّم هذا البرنامج التدريبي؟</h2>
            <p className="text-[#64748B] max-w-2xl mx-auto text-sm leading-loose">برنامج تدريبي متكامل للمعلم السوري، ومفيد أيضًا لكل من يعمل في التعليم والتدريب وصناعة المحتوى.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#0D9488]/5 border-2 border-[#0D9488] rounded-xl p-6">
              <div className="text-[#0D9488] font-bold text-sm mb-2">مناسب بشكل خاص لـ</div>
              <h3 className="text-xl font-bold text-[#1B2A4A] mb-3">المعلمين السوريين</h3>
              <p className="text-[#64748B] text-sm leading-loose">من معلم الصف الأول وحتى مدرس البكالوريا، في الرياضيات والعلوم واللغات وباقي المواد. نبدأ من المشكلة اليومية ونصل إلى مادة جاهزة للطلاب.</p>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
              <div className="text-[#64748B] font-bold text-sm mb-2">ويناسب أيضًا</div>
              <h3 className="text-xl font-bold text-[#1B2A4A] mb-3">طلاب التربية والمدربون والدكاترة</h3>
              <p className="text-[#64748B] text-sm leading-loose">يفيد طلاب كليات التربية، الهيئة الطلابية، المدربين، وأعضاء الهيئة التدريسية في بناء محتوى وتقييمات ومشاريع تعليمية قابلة للتطبيق.</p>
            </div>
          </div>
          <div className="mt-8 max-w-3xl mx-auto text-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6">
            <h3 className="font-bold text-[#1B2A4A] text-lg mb-2">المشكلة ليست قلة الأدوات</h3>
            <p className="text-[#64748B] text-sm leading-loose">المشكلة أن المعلم قد يكتب طلبًا عامًا، فيحصل على نتيجة طويلة أو غير مناسبة للمنهج. لذلك نعلّمه سير عمل ثابتًا: يحدد الهدف، يجهز المصدر، يكتب Prompt واضحًا، يراجع الناتج، ثم يحوله إلى مخرج قابل للاستخدام.</p>
          </div>
        </div>
      </section>

      {/* ===== 4. PROMPT WORKFLOW SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">كيف تتعامل مع الذكاء الاصطناعي؟</h2>
            <p className="text-[#64748B] max-w-2xl mx-auto text-sm leading-loose">لا نحفظ أسماء مواقع. نتعلم كيف نكتب الطلب، نراجع الناتج، ونختار الأداة المناسبة للمخرج.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'شرح درس', text: 'استخدم المصدر المرفق فقط، واشرح مفهوم [المفهوم] لطلاب الصف [الصف] بلغة واضحة، ثم أضف مثالين وثلاثة أسئلة فهم.' },
              { title: 'اختبار ومشروع', text: 'أنشئ اختبارًا من الموضوعات المحددة مع نسختين ونموذج إجابة، ثم اقترح مشروعًا قصيرًا بمعايير تقييم قابلة للملاحظة.' },
              { title: 'فيديو وPodcast', text: 'حوّل هذا الدرس إلى سيناريو فيديو مدته [المدة] وملخص صوتي قصير، مع لغة مناسبة للطلاب وتنبيه لما يحتاج مراجعة بشرية.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                <h3 className="font-bold text-[#1B2A4A] mb-3">{item.title}</h3>
                <p className="text-[#64748B] text-sm leading-loose">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 text-center text-sm text-[#64748B]">نتعلم أيضًا كيف نختبر أداة جديدة ونقارنها ببديل مجاني ونحافظ على قوالبنا عندما تتغير الخدمات.</div>
        </div>
      </section>

      {/* ===== 5. BEFORE/AFTER SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              قبل الكورس vs <span className="text-[#0D9488]">بعد</span> الكورس
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              الفرق واضح — شوف كيف بيتغير يومك كمعلم
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* BEFORE */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 relative border-t-4 border-t-[#EF4444]">
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-4">قبل — الطريقة التقليدية</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#EF4444] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">2-3 ساعات بتحضير درس واحد</p>
                    <p className="text-[#64748B] text-xs">بتقعد من العصر للمغرب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#EF4444] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">أكتب الأسئلة بإيدي — ساعة ونص عشان 20 سؤال</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#EF4444] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">نسخة وحدة من الاختبار — الطلاب بينقلوا</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#EF4444] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">تنسيق الوورد بياخد ساعات وبالنهاية مو مرتب</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-white border-2 border-[#0D9488] rounded-xl p-6 relative border-t-4 border-t-[#0D9488]">
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-4">بعد — بالذكاء الاصطناعي</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">وقت أقل لتحضير نفس الدرس</p>
                    <p className="text-[#0D9488] text-xs font-bold">بحسب المادة وطريقة العمل</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">تتعلم إنشاء أسئلة واختبارات من مصدرك</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">نسخ متعددة ونموذج إجابة بعد المراجعة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">PDF احترافي جاهز للطباعة بغلاف وتنسيق مرتب</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loss Aversion */}
          <div className="mt-8 bg-[#0D9488]/5 border border-[#0D9488]/20 rounded-xl p-5 text-center">
            <p className="text-[#1B2A4A] font-bold text-base">
              الوقت الذي توفره يعتمد على المادة وطريقة عملك
            </p>
            <p className="text-[#64748B] text-sm mt-1">
              تعلّم سير عمل عملي يساعدك على تقليل وقت إعداد المواد
            </p>
          </div>
        </div>
      </section>

      {/* ===== 6. TOOLS SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              شو رح تنتج وتستخدم مع طلابك؟
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              من المصدر إلى شرح وفيديو ومشروع واختبار وPDF وعرض وPodcast — كل مسار عملي وقابل للتطبيق
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Tool 1 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#0D9488]/30 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#0D9488]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] text-lg">من المصدر إلى شرح وفيديو تعليمي</h3>
                  <span className="text-[#0D9488] text-sm font-bold">أدوات متعددة — مجانية أو بخطة مجانية</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  'ارفع كتابك المدرسي واسألو أي سؤال عنه',
                  'بيعمللك اختبارات وأسئلة بنسختين مختلفة',
                  'كل إجابة موثقة بأرقام الصفحات من الكتاب',
                  'تحويل الدرس إلى سيناريو فيديو أو Podcast قابل للمشاركة مع الطلاب',
                  'اقتراح مشروع ونشاط وبطاقة خروج حسب المرحلة الدراسية',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tool 2 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#0D9488]/30 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <FileOutput className="w-6 h-6 text-[#0D9488]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] text-lg">من الدرس إلى اختبار وPDF ومشروع</h3>
                  <span className="text-[#0D9488] text-sm font-bold">مخرجات جاهزة للطلاب والصف</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  'يحول المحتوى لملف PDF احترافي جاهز للطباعة',
                  'بيعمل عروض تقديمية تعليمية بأسلوب الورقة والقلم',
                  'يدعم العربية مع تنسيق من اليمين لليسار',
                  'بيعمل اختبارات منسقة + إجابات نموذجية',
                  'مخرجات قابلة للطباعة أو العرض أو المشاركة مع الطلاب',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Time Savings Table */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1B2A4A]">
                  <th className="py-3.5 px-4 text-right text-white font-bold text-sm">المهمة</th>
                  <th className="py-3.5 px-4 text-center text-white/80 font-bold text-sm">الطريقة التقليدية</th>
                  <th className="py-3.5 px-4 text-center text-white font-bold text-sm">بالذكاء الاصطناعي</th>
                  <th className="py-3.5 px-4 text-center text-white font-bold text-sm">الفائدة العملية</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { task: 'تحويل الدرس إلى شرح', old: 'كتابة وتنسيق يدويان من الصفر', ai: 'خطوات تبدأ من المصدر ثم مراجعة الناتج', save: 'وقت أكبر للشرح والتفاعل مع الطلاب' },
                  { task: 'إعداد اختبار', old: 'أسئلة ونسخة واحدة من الاختبار', ai: 'مسودة أسئلة ونسخ متعددة مع نموذج إجابة', save: 'تنويع أفضل بعد مراجعة المعلم' },
                  { task: 'إخراج PDF أو عرض', old: 'تنسيق متكرر على أدوات مختلفة', ai: 'مخرج منظم قابل للطباعة أو العرض', save: 'شكل أوضح وإعادة استخدام أسهل' },
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
        </div>
      </section>

      {/* ===== 7. RESULTS CTA ===== */}
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

      {/* ===== 8. STUDENT FEEDBACK SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0D9488]/10 text-[#0D9488] px-4 py-2 text-sm font-bold mb-4">تجارب حقيقية من المتدربين</div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">آراء طلابنا بعد التدريب</h2>
            <p className="text-[#64748B] max-w-2xl mx-auto text-sm leading-loose">رسائل وصلتنا من متدربين شاركوا في جلسات الذكاء الاصطناعي. اضغط على أي صورة لقراءتها بحجم أكبر.</p>
          </div>
          <div className="mx-auto flex max-w-md flex-col gap-3 md:max-w-none md:grid md:grid-cols-5 md:gap-4">
            {[
              '/images/training/student-feedback-01.png',
              '/images/training/student-feedback-02.png',
              '/images/training/student-feedback-03.png',
              '/images/training/student-feedback-04.png',
              '/images/training/student-feedback-05.png',
            ].map((image, index) => (
              <a key={image} href={image} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
                <img src={image} alt={`رأي متدرب ${index + 1}`} className="w-full h-auto max-h-[420px] object-contain" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. COURSE CONTENT SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              محتوى البرنامج التدريبي
            </h2>
            <p className="text-[#64748B] text-sm">3 محاور عملية مرتبة من المصدر إلى المخرج الجاهز</p>
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

      {/* ===== 9. BONUSES SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              مزايا عملية مع التسجيل
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              قوالب ودعم وتحديثات تساعدك على التطبيق بعد مشاهدة الكورس
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {bonuses.map((bonus, i) => (
              <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#0D9488]/30 transition-colors text-center">
                <div className="w-12 h-12 rounded-lg bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-4">
                  <bonus.icon className="w-6 h-6 text-[#0D9488]" />
                </div>
                <span className="text-xs font-bold text-[#0D9488] tracking-wider mb-1 block">{bonus.subtitle}</span>
                <h4 className="font-bold text-[#1B2A4A] text-lg mb-2">{bonus.title}</h4>
                <p className="text-[#64748B] text-sm leading-loose mb-3">{bonus.desc}</p>
                <div className="border-t border-[#E2E8F0] pt-3">
                  <span className="text-[#0D9488] font-bold text-sm">{bonus.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. TRAINER SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
            <div className="shrink-0">
              <img
                src="/images/trainer-nawaf.jpg"
                alt="المدرب نواف البوسطة — مدرب في أدوات الذكاء الاصطناعي وزيادة الإنتاجية"
                className="w-32 h-32 rounded-2xl object-cover border-3 border-[#0D9488]/20"
              />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold text-[#1B2A4A] mb-1">نواف البوسطة</h3>
              <p className="text-[#0D9488] font-bold text-sm mb-3">
                مدرب في أدوات الذكاء الاصطناعي وزيادة الإنتاجية
              </p>
              <p className="text-[#64748B] text-sm leading-loose mb-4">
                نواف البوسطة مدرب أدوات ذكاء اصطناعي وباحث، يدرّب الأفراد والشركات والمؤسسات التعليمية على تحويل التقنيات الحديثة إلى حلول عملية في التعليم والإنتاجية والأتمتة.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#0D9488] font-bold text-sm hover:text-[#0B7C72]">
                عرض المزيد عن المدرب
                <ArrowLeft className="w-4 h-4" />
              </Link>
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

      {/* ===== 11. FAQ SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              أسئلة شائعة
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

      {/* ===== 12. FINAL CTA SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
            جاهز تبدأ رحلتك مع الذكاء الاصطناعي؟
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose mb-8">
            اطلب تفاصيل التسجيل في برنامج تدريبي متكامل مدته 4 ساعات تقريباً، مع تحديثات للكورس ومكالمات مجانية مع الكوتش عند مواجهة مشكلة في التطبيق.
          </p>

          {/* Price card */}
          <div className="max-w-md mx-auto bg-white border-2 border-[#0D9488] rounded-xl p-6 mb-6">
            <div className="text-[#64748B] text-sm mb-1">السعر</div>
            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="text-3xl font-bold text-[#1B2A4A]">{currentPricing.price}</span>
            </div>
            <div className="text-[#0D9488] text-sm font-bold mb-4">{currentPricing.currency}</div>
            <div className="bg-[#0D9488]/5 border border-[#0D9488]/20 rounded-lg p-3 mb-4 text-sm">
              <span className="text-[#0D9488] font-bold">يوجد أقساط</span> — نتفق على التفاصيل عبر التواصل
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-8 py-4 rounded-xl text-base transition-colors w-full justify-center"
            >
              سجّل الآن عبر واتساب
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Shield className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>تحديثات ودعم عند التطبيق</span>
            </div>
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Award className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>شهادة اختيارية برسوم منفصلة</span>
            </div>
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Globe className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>وصول دائم</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. FOOTER ===== */}
      <footer className="bg-[#1B2A4A] py-8">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Link href="/schools" className="text-white/70 text-sm hover:text-white transition-colors">
              حلول المؤسسات التعليمية
            </Link>
            <Link href="/results" className="text-white/70 text-sm hover:text-white transition-colors">
              نماذج المخرجات
            </Link>
          </div>
          <p className="text-white/50 text-xs">
            جميع الحقوق محفوظة {new Date().getFullYear()} — كورس الذكاء الاصطناعي للمعلمين
          </p>
        </div>
      </footer>
    </div>
  )
}
