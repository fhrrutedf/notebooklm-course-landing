import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "كورس الذكاء الاصطناعي في التعليم | المدرب نواف البوطة",
  description: "تعلم كيف تستخدم أدوات الذكاء الاصطناعي في التعليم. كورس عملي للمعلمين والمعلمات في سوريا - اختبارات وشروحات ومذكرات PDF بـ 15 دقيقة. مدة الكورس ساعتان - السعر $30 فقط.",
  keywords: ["ذكاء اصطناعي", "تعليم", "سوريا", "معلمين", "كورس", "نواف البوطة", "اختبارات", "مذكرات"],
  authors: [{ name: "نواف البوطة" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "كورس الذكاء الاصطناعي في التعليم",
    description: "كورس عملي للمعلمين - المدرب نواف البوطة",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "كورس الذكاء الاصطناعي في التعليم",
    description: "كورس عملي للمعلمين - المدرب نواف البوطة",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
