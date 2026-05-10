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
  title: "كورس NotebookLM + Z.ai في التعليم | المدرب نواف البوطة",
  description: "تعلم كيف تستخدم NotebookLM و Z.ai في التعليم. كورس عملي للمعلمين والمعلمات في سوريا. مدة الكورس ساعتان - السعر $30 فقط.",
  keywords: ["NotebookLM", "Z.ai", "ذكاء اصطناعي", "تعليم", "سوريا", "معلمين", "كورس", "نواف البوطة"],
  authors: [{ name: "نواف البوطة" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "كورس NotebookLM + Z.ai في التعليم",
    description: "كورس عملي للمعلمين - المدرب نواف البوطة",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "كورس NotebookLM + Z.ai في التعليم",
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
