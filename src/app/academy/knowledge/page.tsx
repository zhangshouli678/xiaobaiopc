"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Upload, FileText, MessageCircle, Sparkles, ChevronRight, CheckCircle, Info } from "lucide-react";

export default function KnowledgePage() {
  const [uploaded, setUploaded] = useState(false);
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);

  const mockUpload = (name: string, size: string) => {
    setFiles([...files, { name, size }]);
    setUploaded(true);
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link href="/academy" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
          ← 返回小白学院
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-accent-500">
            <FileText size={16} /> 知识库定制
          </div>
          <h1 className="mt-3 text-2xl font-bold">上传 PDF，生成专属知识助手</h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            把你的产品手册、课程资料、内部文档上传到这里，平台会自动解析并生成一个可以对话的知识助手。
            你可以把它绑定到自己的智能体产品里对外提供。
          </p>
        </div>

        {/* Upload zone */}
        <div
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-mid)] bg-[var(--bg-raised)] py-14 cursor-pointer hover:border-accent-500 transition-colors"
          onClick={() => mockUpload("产品手册_v3.pdf", "2.4 MB")}
        >
          <Upload size={36} className="text-[var(--text-subtle)]" />
          <p className="mt-3 text-sm font-medium">点击或拖拽文件到此处</p>
          <p className="mt-1 text-xs text-[var(--text-subtle)]">支持 PDF / Word / TXT / Markdown / 网页链接 · 单文件最大 50 MB</p>
          <button className="btn-secondary mt-4 gap-2 py-2 text-sm">
            <Upload size={14} /> 选择文件
          </button>
        </div>

        {/* Uploaded files */}
        {files.length > 0 && (
          <div className="mt-5">
            <h2 className="mb-3 text-sm font-bold">已上传（{files.length}）</h2>
            <div className="flex flex-col gap-2">
              {files.map((f, i) => (
                <div key={i} className="card flex items-center gap-3 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-50 text-accent-500">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{f.name}</div>
                    <div className="text-2xs text-[var(--text-subtle)]">{f.size} · 已解析</div>
                  </div>
                  <CheckCircle size={16} className="text-success" />
                </div>
              ))}
            </div>

            {/* Test chat */}
            <div className="card mt-5 p-5">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <MessageCircle size={15} className="text-accent-500" /> 测试你的知识助手
              </h2>
              <div className="mt-4 space-y-3">
                <div className="ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-accent-500 px-3.5 py-2.5 text-sm text-white">
                  你们家产品的保修期是多久？
                </div>
                <div className="max-w-[85%] rounded-lg rounded-bl-sm bg-[var(--bg-muted)] px-3.5 py-2.5 text-sm text-[var(--text)]">
                  根据您上传的产品手册，我们产品的保修期为自购买之日起 12 个月，非人为损坏可免费维修。如需延长保修，可以购买延保服务，最长可延至 36 个月。
                  <div className="mt-2 text-2xs text-[var(--text-subtle)]">来源：《产品手册_v3.pdf》第 4.2 节</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="问点什么试试……"
                  className="flex-1 rounded-md border border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2 text-sm outline-none focus:border-accent-500"
                />
                <button className="btn-primary px-4 py-2 text-sm">发送</button>
              </div>
            </div>

            {/* Bind to app */}
            <div className="mt-5 rounded-lg border border-accent-500/30 bg-accent-950/20 p-5">
              <div className="flex items-start gap-3">
                <Sparkles size={18} className="mt-0.5 shrink-0 text-accent-400" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold">把这个知识库绑定到你的产品</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                    在小白 Agent 里打开你的智能体 → 设置 → 知识库 → 选择这个知识库。绑定后，你的产品就能基于这份文档回答用户问题了。
                  </p>
                  <Link href="/publish" className="btn-primary mt-3 gap-2 py-2 text-xs">
                    去发布作品 <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <Info size={15} className="text-warning" /> 提高回答准确率的小技巧
          </h2>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[var(--text-muted)]">
            <li>• 上传的文档尽量结构清晰，用小标题分段，避免一整页大段文字</li>
            <li>• 一份知识库专注一个主题（比如「产品手册」和「售后服务」分开上传）</li>
            <li>• 上传后在测试框里多问几个真实场景的问题，检查回答是否准确</li>
            <li>• 如果 AI 答不上来，通常是因为文档里没有写，补充文档比改提示词更有效</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
