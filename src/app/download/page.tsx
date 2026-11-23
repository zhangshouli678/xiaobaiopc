import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Download, Monitor, Apple, Shield, CheckCircle, Zap, HardDrive } from "lucide-react";

export default function DownloadPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500 text-white shadow-elevated">
            <Zap size={30} strokeWidth={2} />
          </div>
          <h1 className="mt-5 text-3xl font-bold">下载小白 Agent</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            完全免费 · 无需注册即可安装 · 装好之后再回学院一步步学
          </p>
        </div>

        {/* Download cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a href="#" className="card flex items-center gap-4 p-5 hover:shadow-elevated transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--bg-muted)] text-[var(--text-muted)]">
              <Monitor size={22} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Windows 安装包</div>
              <div className="mt-0.5 text-xs text-[var(--text-muted)]">Windows 10 / 11 · .exe · 约 85 MB</div>
            </div>
            <Download size={18} className="text-accent-500" />
          </a>
          <a href="#" className="card flex items-center gap-4 p-5 hover:shadow-elevated transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--bg-muted)] text-[var(--text-muted)]">
              <Apple size={22} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">macOS 安装包</div>
              <div className="mt-0.5 text-xs text-[var(--text-muted)]">macOS 12+ · .dmg · 约 92 MB</div>
            </div>
            <Download size={18} className="text-accent-500" />
          </a>
        </div>

        <div className="mt-4 card p-4">
          <div className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
            <Shield size={14} className="mt-0.5 shrink-0 text-success" />
            <div>
              <p>当前版本 v2.4.1 · 更新于 2025-11-20</p>
              <p className="mt-1">SHA256 校验值将在文件上传后更新于此。安装包未捆绑任何恶意程序。</p>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">装好之后做什么？</h2>
          <ol className="flex flex-col gap-3">
            {[
              "打开小白 Agent，选择你要接入的 AI 模型（推荐 DeepSeek，免费额度够用）",
              "按提示填入 API Key（学院 L2 有手把手教程）",
              "找到「新建智能体」入口，用一句话告诉它你想做什么",
              "跟着学院课程学会迭代和发布，把你的作品上架到市场",
            ].map((s, i) => (
              <li key={i} className="card flex gap-4 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-[var(--text-muted)]">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/academy" className="btn-primary gap-2">
              <CheckCircle size={14} /> 前往小白学院
            </Link>
            <Link href="/market" className="btn-secondary gap-2">
              看看别人做了什么
            </Link>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-10 card p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold">
            <HardDrive size={15} /> 系统要求
          </h2>
          <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
            <li>• 操作系统：Windows 10 / 11（64位）或 macOS 12 及以上</li>
            <li>• 内存：至少 4 GB（建议 8 GB）</li>
            <li>• 磁盘空间：至少 500 MB 可用空间</li>
            <li>• 网络：需要访问互联网以调用 AI 模型 API</li>
            <li>• AI 模型：DeepSeek（推荐，免费额度可用）/ OpenAI / Claude / Gemini / 本地 Ollama</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
