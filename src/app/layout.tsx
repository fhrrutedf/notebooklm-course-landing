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
  title: "الذكاء الاصطناعي العملي في التعليم | Course للمعلمين والمدربين",
  description: "Course مسجّل مدته 4 ساعات يعلّم المعلمين والمدربين وأعضاء الهيئة التدريسية إنتاج الشروحات والملخصات والأسئلة والاختبارات وأوراق PDF والعروض والأنشطة باستخدام أدوات الذكاء الاصطناعي التعليمية.",
  keywords: ["ذكاء اصطناعي", "تعليم", "سوريا", "معلمين", "كورس", "نواف البوسطه", "اختبارات", "مذكرات"],
  authors: [{ name: "نواف البوسطه" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "كورس الذكاء الاصطناعي في التعليم",
    description: "Course عملي مدته 4 ساعات للمعلمين والمدربين وأعضاء الهيئة التدريسية.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "كورس الذكاء الاصطناعي في التعليم",
    description: "Course عملي مدته 4 ساعات للمعلمين والمدربين وأعضاء الهيئة التدريسية.",
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
        style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
