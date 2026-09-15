import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://course.manasadigital.com"),
  title: {
    default: "كورس الذكاء الاصطناعي للمعلمين السوريين | حل مشكلات التحضير ومحتوى تعليمي للمعلمين",
    template: "%s | منصة مناسة الرقمية",
  },
  description: "كورس تدريبي عملي للمعلمين السوريين يوضح طريقة تحويل الدرس والمصدر إلى شرح واختبار وPDF وعرض وفيديو تعليمي وبحث منظم، مع مراجعة المخرجات قبل استخدامها مع الطلاب.",
  keywords: ["ذكاء اصطناعي", "تعليم", "سوريا", "معلمين", "كورس", "نواف البوسطة", "اختبارات", "PDF", "عروض تقديمية", "بحث وتقارير", "محتوى تعليمي"],
  authors: [{ name: "نواف البوسطة" }],
  alternates: { canonical: "/" },
  icons: {
    icon: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "كورس الذكاء الاصطناعي للمعلمين السوريين",
    description: "تعلّم طريقة عملية لتحويل المصدر إلى شرح واختبار وعرض ومحتوى تعليمي مرتب بعد مراجعة المصدر.",
    url: "/",
    siteName: "منصة مناسة الرقمية",
    locale: "ar_SY",
    type: "website",
    images: [
      {
        url: "/course-cover.png",
        width: 1344,
        height: 768,
        alt: "كورس الذكاء الاصطناعي للمعلمين السوريين",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "كورس الذكاء الاصطناعي للمعلمين السوريين",
    description: "كورس عملي لتحويل الدرس إلى مخرجات تعليمية قابلة للاستخدام.",
    images: ["/course-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${ibmPlexSansArabic.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-ibm-plex-sans-arabic), sans-serif" }}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2PNZKWC48D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2PNZKWC48D');
          `}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2144916236400224');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2144916236400224&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
