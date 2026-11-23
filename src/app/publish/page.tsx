"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Upload, FileArchive, QrCode, MessageCircle, Tag, DollarSign, Download, ChevronRight, Info } from "lucide-react";

const STEPS = ["基本信息", "上传安装包", "定价与收款", "发布"];

export default function PublishPage() {
  const [step, setStep] = useState(0);
  const [free, setFree] = useState(false);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">发布作品</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            把你的智能体上架到市场，用户通过下载码下载安装包
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i < step ? "bg-success text-white" : i === step ? "bg-accent-500 text-white" : "bg-[var(--bg-muted)] text-[var(--text-muted)]"}`}>
                {i + 1}
              </div>
              <span className={`hidden text-xs sm:block ${i === step ? "font-semibold text-[var(--text)]" : "text-[var(--text-muted)]"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-success" : "bg-[var(--border)]"}`} />}
            </div>
          ))}
        </div>

        {/* ── Step 0: Basic info ─────────────────── */}
        {step === 0 && (
          <div className="card flex flex-col gap-5 p-6">
            <h2 className="text-lg font-bold">基本信息</h2>

            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)]">产品名称 <span className="text-danger">*</span></label>
              <input
                type="text"
                placeholder="例如：门店智能客服助手"
                className="mt-1.5 w-full rounded-md border border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2.5 text-sm outline-none focus:border-accent-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)]">分类 <span className="text-danger">*</span></label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {["客服助手", "知识库问答", "文案写作", "数据分析", "图片处理", "效率工具", "教育培训", "私人顾问"].map(c => (
                  <button key={c} type="button" className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)] hover:border-accent-500 hover:text-accent-500">
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)]">功能描述 <span className="text-danger">*</span></label>
              <textarea
                rows={4}
                placeholder="用自然语言描述你的智能体能做什么、适合谁使用。越具体越容易卖出去。"
                className="mt-1.5 w-full resize-none rounded-md border border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2.5 text-sm outline-none focus:border-accent-500"
              />
            </div>

            <button onClick={() => setStep(1)} className="btn-primary mt-2 self-end gap-2">
              下一步 <ChevronRight size={15} />
            </button>
          </div>
        )}

        {/* ── Step 1: Upload package ──────────────── */}
        {step === 1 && (
          <div className="card flex flex-col gap-5 p-6">
            <h2 className="text-lg font-bold">上传安装包</h2>
            <p className="text-sm text-[var(--text-muted)]">
              把你的智能体打包成 .exe 或 .zip 文件上传。用户购买后会获得唯一下载码来下载。
            </p>

            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-mid)] bg-[var(--bg-muted)] py-14">
              <FileArchive size={36} className="text-[var(--text-subtle)]" />
              <p className="mt-3 text-sm font-medium">点击或拖拽文件到此处</p>
              <p className="mt-1 text-xs text-[var(--text-subtle)]">支持 .exe / .zip / .dmg · 最大 500 MB</p>
              <button className="btn-secondary mt-4 gap-2 py-2 text-sm">
                <Upload size={14} /> 选择文件
              </button>
            </div>

            <div className="rounded-lg bg-[var(--bg-muted)] p-4">
              <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
                <Info size={13} /> 安全说明
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-subtle)]">
                上传后会进行 SHA256 校验和安全扫描。请勿上传恶意程序，违者封号处理。安装包会存放在阿里云 OSS，只对拥有下载码的用户开放。
              </p>
            </div>

            <div className="mt-2 flex justify-between">
              <button onClick={() => setStep(0)} className="btn-secondary">上一步</button>
              <button onClick={() => setStep(2)} className="btn-primary gap-2">下一步 <ChevronRight size={15} /></button>
            </div>
          </div>
        )}

        {/* ── Step 2: Price & payment ─────────────── */}
        {step === 2 && (
          <div className="card flex flex-col gap-5 p-6">
            <h2 className="text-lg font-bold">定价与收款</h2>

            <div className="flex gap-2">
              <button
                onClick={() => setFree(false)}
                className={`flex-1 rounded-lg border p-4 text-left transition-colors ${!free ? "border-accent-500 bg-accent-50" : "border-[var(--border)]"}`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold"><DollarSign size={15} /> 付费下载</div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">买家付款后获得下载码</p>
              </button>
              <button
                onClick={() => setFree(true)}
                className={`flex-1 rounded-lg border p-4 text-left transition-colors ${free ? "border-accent-500 bg-accent-50" : "border-[var(--border)]"}`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold"><Download size={15} /> 免费公开</div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">任何人可直接下载，获取流量</p>
              </button>
            </div>

            {!free && (
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)]">售价（元）</label>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-lg font-bold text-[var(--text-muted)]">¥</span>
                  <input
                    type="number"
                    placeholder="29"
                    className="w-32 rounded-md border border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2.5 text-lg font-bold outline-none focus:border-accent-500"
                  />
                </div>
                <p className="mt-1.5 text-xs text-[var(--text-subtle)]">平台不抽成，收益 100% 归创作者所有</p>
              </div>
            )}

            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
                <QrCode size={13} /> 收款码（微信 / 支付宝）
              </label>
              <div className="mt-1.5 flex h-36 items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-mid)] bg-[var(--bg-muted)]">
                <div className="text-center">
                  <QrCode size={28} className="mx-auto text-[var(--text-subtle)]" />
                  <p className="mt-2 text-xs text-[var(--text-subtle)]">点击上传收款二维码截图</p>
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
                <MessageCircle size={13} /> 联系微信号（可选）
              </label>
              <input
                type="text"
                placeholder="填写后产品页会展示「加微信咨询」按钮"
                className="mt-1.5 w-full rounded-md border border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2.5 text-sm outline-none focus:border-accent-500"
              />
            </div>

            <div className="mt-2 flex justify-between">
              <button onClick={() => setStep(1)} className="btn-secondary">上一步</button>
              <button onClick={() => setStep(3)} className="btn-primary gap-2">下一步 <ChevronRight size={15} /></button>
            </div>
          </div>
        )}

        {/* ── Step 3: Confirm ─────────────────────── */}
        {step === 3 && (
          <div className="card flex flex-col gap-5 p-6">
            <h2 className="text-lg font-bold">确认发布</h2>
            <p className="text-sm text-[var(--text-muted)]">
              请确认以下信息无误，发布后产品将在审核通过后上线（通常 24 小时内）。
            </p>

            <div className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)]">
              {[
                ["产品名称", "（待填写）"],
                ["分类", "（待选择）"],
                ["定价模式", free ? "免费公开" : "付费下载"],
                ["售价", free ? "¥0" : "（待填写）"],
                ["安装包", "（待上传）"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span className="text-[var(--text-muted)]">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-warning/30 bg-warning/5 p-4 text-xs leading-relaxed text-[var(--text-muted)]">
              <strong className="text-warning">发布须知：</strong>请确保安装包能正常使用；如发现无法运行或虚假宣传，平台有权下架并扣除违规所得。
            </div>

            <div className="mt-2 flex justify-between">
              <button onClick={() => setStep(2)} className="btn-secondary">上一步</button>
              <button className="btn-primary gap-2">
                <Tag size={14} /> 提交发布
              </button>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-[var(--text-subtle)]">
          发布遇到问题？<Link href="/academy/level4" className="text-accent-500 hover:underline">查看变现教程 L4</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
