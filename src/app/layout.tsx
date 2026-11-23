import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "小白OPC社区 | AI 智能体学习 · 创作 · 交易平台",
  description: "零代码用自然语言做 AI 软件，学习、发布、变现，一站完成。",
  keywords: ["AI智能体", "小白Agent", "AI社区", "智能体市场", "OPC"],
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head />
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
