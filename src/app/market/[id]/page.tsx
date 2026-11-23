import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowLeft, Star, Download, Bot, Shield, Clock, Users,
  MessageCircle, QrCode, ChevronRight, CheckCircle, AlertTriangle,
} from "lucide-react";

// Static mock detail (in production this is fetched by [id])
const APP = {
  id: "APP-20251123-001",
  name: "门店智能客服助手",
  tag: "客服助手",
  price: 29,
  author: "张三丰",
  authorId: "OPC-1024",
  authorWechat: "zhangsanfeng_ai",
  rating: 4.8,
  ratingCount: 87,
  downloads: 1240,
  updated: "2025-11-18",
  desc: "自动回复顾客常见问题、支持预约管理、内置常见问题知识库。适合餐饮、美业、零售等线下门店使用。你可以上传自己的门店资料作为知识库，AI 会按照你的业务内容准确回答顾客提问。",
  features: [
    "自动识别顾客高频问题，秒级回复",
    "支持上传门店产品手册、价目表、常见问题 PDF",
    "预约登记 + 到店提醒消息生成",
    "差评安抚话术自动生成",
    "支持微信客服号接入（需自行配置）",
    "离线可用，无需持续联网",
  ],
  requirements: "Windows 10 / 11 或 macOS 12+，需要自行准备任意一家 AI 模型的 API Key（如 DeepSeek）",
  screenshots: 6,
  reviews: [
    { user: "美甲店老板", rating: 5, text: "装在自己店里电脑上就能用，顾客问价格、营业时间都能自动回答，省了不少人力。", date: "2025-11-12" },
    { user: "奶茶店主理人", rating: 5, text: "上传了自己的菜单 PDF 之后回答很准确，比原来手动回消息强太多了。", date: "2025-11-08" },
    { user: "连锁零售IT", rating: 4, text: "功能不错，就是配置 API Key 第一次搞了半小时，建议出个更详细的视频。", date: "2025-10-29" },
  ],
};

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={13} className={i <= n ? "text-warning" : "text-[var(--border-mid)]"} fill={i <= n ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

export default function AppDetailPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Link href="/market" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
          <ArrowLeft size={15} /> 返回市场
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* ── Left: content ───────────────────────── */}
          <div>
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-500">
                <Bot size={32} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold">{APP.name}</h1>
                  <span className="badge bg-accent-50 text-accent-600">{APP.tag}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Star size={13} className="text-warning" fill="currentColor" />
                    {APP.rating} <span className="text-[var(--text-subtle)]">({APP.ratingCount} 评价)</span>
                  </span>
                  <span className="flex items-center gap-1"><Download size={13} /> {APP.downloads.toLocaleString()} 次下载</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> 更新于 {APP.updated}</span>
                </div>
                <p className="mt-2 text-xs text-[var(--text-subtle)]">产品编号：{APP.id}</p>
              </div>
            </div>

            {/* Preview placeholder */}
            <div className="mt-6 flex aspect-video items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-muted)]">
              <div className="text-center">
                <Bot size={40} className="mx-auto text-[var(--text-subtle)]" />
                <p className="mt-2 text-sm text-[var(--text-muted)]">功能演示视频 / 截图轮播（{APP.screenshots} 张）</p>
                <p className="mt-1 text-xs text-[var(--text-subtle)]">上传后在此展示</p>
              </div>
            </div>

            {/* Description */}
            <section className="mt-8">
              <h2 className="mb-3 text-lg font-bold">功能说明</h2>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">{APP.desc}</p>
            </section>

            {/* Features */}
            <section className="mt-6">
              <h2 className="mb-3 text-lg font-bold">核心能力</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {APP.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle size={15} className="mt-0.5 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="mt-6">
              <h2 className="mb-3 text-lg font-bold">使用要求</h2>
              <div className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-muted)] p-4 text-sm text-[var(--text-muted)]">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-warning" />
                {APP.requirements}
              </div>
            </section>

            {/* Reviews */}
            <section className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">用户评价（{APP.ratingCount}）</h2>
                <div className="flex items-center gap-2">
                  <Stars n={4} />
                  <span className="text-sm font-bold">{APP.rating}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {APP.reviews.map((r, i) => (
                  <div key={i} className="card p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-muted)] text-xs font-bold text-[var(--text-muted)]">
                          {r.user[0]}
                        </div>
                        <span className="text-sm font-medium">{r.user}</span>
                        <Stars n={r.rating} />
                      </div>
                      <span className="text-xs text-[var(--text-subtle)]">{r.date}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{r.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right: sidebar ──────────────────────── */}
          <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
            {/* Price card */}
            <div className="card p-5">
              <div className="text-3xl font-black text-accent-500">¥{APP.price}</div>
              <p className="mt-1 text-xs text-[var(--text-muted)]">一次性买断，永久可用</p>

              <button className="btn-primary mt-4 w-full justify-center gap-2 py-3">
                <Download size={15} /> 立即购买
              </button>
              <p className="mt-3 text-center text-xs text-[var(--text-subtle)]">
                付款后由创作者确认并发下载码
              </p>

              <div className="mt-5 border-t border-[var(--border)] pt-4">
                <p className="text-xs font-medium text-[var(--text-muted)]">收款方式</p>
                <div className="mt-2 flex h-28 items-center justify-center rounded-lg border border-dashed border-[var(--border-mid)] bg-[var(--bg-muted)]">
                  <div className="text-center">
                    <QrCode size={24} className="mx-auto text-[var(--text-subtle)]" />
                    <p className="mt-1 text-xs text-[var(--text-subtle)]">创作者收款码</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <a
                  href="/contact"
                  className="btn-secondary w-full justify-center gap-2 py-2.5 text-sm"
                >
                  <MessageCircle size={14} /> 加微信咨询
                </a>
                <p className="mt-1.5 text-center text-2xs text-[var(--text-subtle)]">微信号：{APP.authorWechat}</p>
              </div>
            </div>

            {/* Author card */}
            <div className="card p-5">
              <p className="text-xs font-medium text-[var(--text-muted)]">创作者</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 text-white font-bold">
                  {APP.author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{APP.author}</p>
                  <p className="text-xs text-[var(--text-subtle)]">{APP.authorId}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-md bg-[var(--bg-muted)] py-2">
                  <div className="text-sm font-bold">{APP.downloads.toLocaleString()}</div>
                  <div className="text-2xs text-[var(--text-muted)]">总下载</div>
                </div>
                <div className="rounded-md bg-[var(--bg-muted)] py-2">
                  <div className="text-sm font-bold">{APP.rating}</div>
                  <div className="text-2xs text-[var(--text-muted)]">评分</div>
                </div>
              </div>
              <Link href="/creator" className="btn-secondary mt-3 w-full justify-center py-2 text-xs">
                查看创作者全部作品
              </Link>
            </div>

            {/* Safety */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-4">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
                <Shield size={13} className="text-success" />
                平台安全提示
              </div>
              <p className="mt-1.5 text-2xs leading-relaxed text-[var(--text-subtle)]">
                所有上架安装包均经过 SHA256 校验与扫描。交易通过双方直接完成，平台不介入资金流转，请确认收到文件后再付款。
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
