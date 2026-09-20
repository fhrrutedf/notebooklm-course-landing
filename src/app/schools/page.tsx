import type { Metadata } from 'next'
import SchoolsClient from './SchoolsClient'

export const metadata: Metadata = {
  title: 'تدريب فرق المعلمين بالذكاء الاصطناعي — حلول المدارس والمعاهد التعليمية',
  description:
    'برنامج عملي يساعد المدارس والمعاهد على تحويل الكتب والدروس إلى شروحات، اختبارات، أوراق عمل، عروض ومحتوى تعليمي منظم، مع بقاء المراجعة والقرار بيد المعلم.',
  alternates: { canonical: 'https://course.manasadigital.com/schools' },
  openGraph: {
    title: 'برامج تدريب المعلمين بالذكاء الاصطناعي للمدارس والمعاهد',
    description:
      'درّب فريقك على استخدام الذكاء الاصطناعي لصناعة محتوى تعليمي أفضل واختبارات وعروض ومذكرات مطابقة لمناهج مؤسستك.',
    url: 'https://course.manasadigital.com/schools',
  },
}

export default function SchoolsPage() {
  return <SchoolsClient />
}
