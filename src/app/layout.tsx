import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://course.manasadigital.com"),
  title: {
    default: "كورس الذكاء الاصطناعي للمعلمين السوريين | اختبارات وPDF ومحتوى تعليمي",
    template: "%s | منصة مناسة الرقمية",
  },
  description: "كورس تدريبي عملي للمعلمين السوريين يوضح طريقة تحويل الدرس والمصدر إلى شرح واختبار وPDF وعرض وفيديو تعليمي، باستخدام أدوات مجانية أو بخطط مجانية.",
  keywords: ["ذكاء اصطناعي", "تعليم", "سوريا", "معلمين", "كورس", "نواف البوسطه", "اختبارات", "PDF", "عروض تقديمية", "محتوى تعليمي"],
  authors: [{ name: "نواف البوسطه" }],
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
    description: "تعلّم طريقة عملية لتحويل الدرس إلى شرح واختبار وPDF وعرض وفيديو تعليمي بعد مراجعة المصدر.",
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
        <Toaster />
      </body>
    </html>
  );
}
