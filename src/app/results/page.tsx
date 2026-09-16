import type { Metadata } from 'next'
import ResultsClient from './ResultsClient'

export const metadata: Metadata = {
  title: 'نماذج مخرجات الكورس | اختبارات وخرائط ذهنية وعروض وPDF جاهزة',
  description:
    'شاهد نتائج حقيقية: اختبار بكالوريا جاهز في 18 دقيقة، خريطة ذهنية في دقيقة، دليل دراسة في 4 دقائق، إنفوجرافيك وعروض وبودكاست تعليمي.',
  alternates: { canonical: 'https://course.manasadigital.com/results' },
  openGraph: { url: 'https://course.manasadigital.com/results' },
}

export default function Page() {
  return <ResultsClient />
}
