import type { Metadata } from 'next'
import SchoolsResultsClient from './SchoolsResultsClient'

export const metadata: Metadata = {
  title: 'نماذج مخرجات التدريب المؤسسي للمدارس والمعاهد | كورس الذكاء الاصطناعي للمعلمين',
  description:
    'استعرض نماذج حقيقية لاختبارات مدرسية، مذكرات PDF، عروض تقديمية، ووسائط تعليمية يتعلم فريق المعلمين في مؤسستكم إنتاجها من كتب المناهج.',
  alternates: { canonical: 'https://course.manasadigital.com/schools/results' },
  openGraph: {
    title: 'نماذج مخرجات التدريب المؤسسي للمدارس والمعاهد',
    description:
      'شاهد نوع المخرجات التعليمية التي يستطيع كادركم الأكاديمي إنتاجها وتوحيدها عبر الذكاء الاصطناعي.',
    url: 'https://course.manasadigital.com/schools/results',
  },
}

export default function SchoolsResultsPage() {
  return <SchoolsResultsClient />
}
