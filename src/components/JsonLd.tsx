export function CourseJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'كورس الذكاء الاصطناعي للمعلمين',
    description:
      'كورس عملي يحوّل كتب المنهج والدروس إلى شرح واختبار وPDF وعرض وخريطة ذهنية ومحتوى صوتي.',
    inLanguage: 'ar',
    url: 'https://course.manasadigital.com/',
    image: 'https://course.manasadigital.com/course-cover.png',
    provider: { '@type': 'Organization', name: 'Manasa Digital' },
    offers: {
      '@type': 'Offer',
      price: '22',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://course.manasadigital.com/',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT5H30M',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
