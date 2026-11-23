import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Download, BookOpen, Trophy, Store,
  Zap, Users, Star, ArrowRight, Play,
  Upload, Bot, Sparkles, ChevronRight,
} from "lucide-react";

/* ── Static data ────────────────────────────────────────── */
const steps = [
  { icon: Download,  step: "01", title: "下载小白 Agent",    desc: "免费安装，5 分钟完成配置，无需任何代码基础。" },
  { icon: Sparkles,  step: "02", title: "用自然语言描述需求", desc: "告诉 AI 你想做什么软件，像聊天一样说话即可。" },
  { icon: Bot,       step: "03", title: "AI 自动生成",        desc: "智能体自动完成逻辑搭建，实时预览效果。" },
  { icon: Store,     step: "04", title: "发布 & 变现",        desc: "一键上架到市场，设好价格，坐等用户购买。" },
];

const categories = [
  { label: "客服助手", count: 128 },
  { label: "知识库问答", count: 94 },
  { label: "文案写作", count: 217 },
  { label: "数据分析", count: 76 },
  { label: "图片处理", count: 53 },
  { label: "效率工具", count: 189 },
  { label: "教育培训", count: 61 },
  { label: "私人顾问", count: 42 },
];

const featured = [
  { id: "APP-001", name: "门店智能客服助手", author: "张三丰", price: 29, downloads: 1240, rating: 4.8, tag: "客服助手" },
  { id: "APP-002", name: "律师函自动生成器", author: "李法宝", price: 49, downloads: 876,  rating: 4.9, tag: "文案写作" },
  { id: "APP-003", name: "产品说明书问答机器人", author: "王小明", price: 0,  downloads: 3312, rating: 4.7, tag: "知识库问答" },
  { id: "APP-004", name: "每日报告自动汇总", author: "陈数据", price: 39, downloads: 654,  rating: 4.6, tag: "数据分析" },
  { id: "APP-005", name: "小红书爆款文案助手", author: "美美创作", price: 19, downloads: 2187, rating: 4.8, tag: "文案写作" },
  { id: "APP-006", name: "内部培训知识助手", author: "HR达人", price: 59, downloads: 432,  rating: 4.9, tag: "教育培训" },
];

const stats = [
  { label: "注册用户", value: "12,400+" },
  { label: "上架智能体", value: "3,800+" },
  { label: "累计下载", value: "98,000+" },
  { label: "创作者收入总计", value: "¥420万+" },
];

const contestPrizes = [
  { rank: "🥇 冠军", prize: "¥2,000", perk: "首页 Banner 展示 1 周" },
  { rank: "🥈 亚军", prize: "¥1,000", perk: "专题推文报道" },
  { rank: "🥉 季军", prize: "¥500",   perk: "社区置顶推荐" },
  { rank: "🌟 最佳新人", prize: "¥500", perk: "新人认证徽章" },
];

/* ── Sub-components ────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-xs text-warning">
      <Star size={11} fill="currentColor" />
      <span className="text-[var(--text-muted)]">{rating.toFixed(1)}</span>
    </span>
  );
}

function AppCard({ app }: { app: typeof featured[0] }) {
  return (
    <article className="card flex flex-col gap-3 p-4 hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-500">
          <Bot size={20} />
        </div>
        <span className="badge bg-accent-50 text-accent-600 text-2xs">{app.tag}</span>
      </div>
      <div>
        <h3 className="text-sm font-semibold leading-snug text-[var(--text)]">{app.name}</h3>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">by {app.author}</p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <StarRating rating={app.rating} />
        <span className="text-xs text-[var(--text-muted)]">{app.downloads.toLocaleString()} 下载</span>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
        <span className="text-sm font-bold text-accent-500">
          {app.price === 0 ? "免费" : `¥${app.price}`}
        </span>
        <Link
          href={`/market/${app.id}`}
          className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-accent-500 transition-colors"
        >
          查看详情 <ChevronRight size={12} />
        </Link>
      </div>
    </article>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-accent-950/40 to-[var(--bg)] px-4 py-20 text-center sm:py-28">
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-xs text-accent-400">
              <Zap size={11} />
              全新 · 小白OPC社区正式上线
            </span>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight text-[var(--text)] sm:text-5xl">
              不懂代码，也能做出
              <br />
              <span className="text-accent-400">自己的 AI 软件</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-[var(--text-muted)]">
              用自然语言对话，小白 Agent 帮你把想法变成可以卖钱的 AI 应用。
              学习、创作、发布、变现，全部在这里完成。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/academy" className="btn-primary gap-2 px-6 py-3 text-sm">
                <BookOpen size={15} />
                免费开始学习
              </Link>
              <Link href="/market" className="btn-secondary gap-2 px-6 py-3 text-sm">
                <Store size={15} />
                浏览应用市场
              </Link>
            </div>
            <p className="mt-5 text-xs text-[var(--text-subtle)]">
              已有 12,400+ 名小白用户，0 代码做出了自己的 AI 应用 →
            </p>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────── */}
        <section className="border-y border-[var(--border)] bg-[var(--bg-raised)]">
          <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y divide-[var(--border)] sm:grid-cols-4 sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-6 py-6 text-center">
                <span className="text-2xl font-bold text-accent-400">{s.value}</span>
                <span className="text-xs text-[var(--text-muted)]">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">四步从零到变现</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">完全不懂技术也能走完全程，平均耗时不超过一天</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="card flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/10 text-accent-500">
                    <Icon size={20} />
                  </div>
                  <span className="text-3xl font-black text-[var(--border-mid)]">{step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text)]">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/academy" className="btn-primary gap-2">
              <Play size={14} />
              立即开始第一课
            </Link>
          </div>
        </section>

        {/* ── Download CTA ─────────────────────────────── */}
        <section className="bg-accent-950/30 border-y border-accent-500/20 px-4 py-14">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent-500 text-white shadow-elevated">
              <Zap size={28} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">先下载小白 Agent 安装包</h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Windows / macOS 均可，完全免费。配置好之后就能跟着学院的课程一步步做出自己的 AI 应用。
              </p>
            </div>
            <Link href="/download" className="btn-primary shrink-0 gap-2 px-6 py-3">
              <Download size={15} />
              免费下载安装包
            </Link>
          </div>
        </section>

        {/* ── Marketplace preview ──────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">热门智能体</h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">由社区创作者独立开发，已验证可正常使用</p>
            </div>
            <Link href="/market" className="hidden items-center gap-1 text-sm text-accent-500 hover:underline sm:flex">
              查看全部 <ArrowRight size={14} />
            </Link>
          </div>

          {/* Category chips */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.label}
                href={`/market?cat=${encodeURIComponent(c.label)}`}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-3 py-1 text-xs text-[var(--text-muted)] hover:border-accent-500 hover:text-accent-500 transition-colors"
              >
                {c.label}
                <span className="ml-1 text-[var(--text-subtle)]">{c.count}</span>
              </Link>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((app) => <AppCard key={app.id} app={app} />)}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/market" className="btn-secondary gap-2">
              查看全部智能体 <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ── Contest Banner ───────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="relative overflow-hidden rounded-xl border border-accent-500/30 bg-gradient-to-br from-accent-950/60 to-surface-900/80 p-8 sm:p-10">
            <div aria-hidden className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent-500/10 blur-3xl" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center">
              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-500/20 px-3 py-1 text-xs text-accent-400">
                  <Trophy size={12} />
                  11月创始人挑战赛 · 进行中
                </div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">奖金池 ¥5,000</h2>
                <p className="mt-2 text-sm text-surface-300">
                  主题：「最实用的个人效率 AI 助手」<br />
                  截止日期：2025年11月30日 23:59
                </p>
                <div className="mt-6">
                  <Link href="/contest" className="btn-primary gap-2">
                    <Trophy size={14} />
                    立即参赛
                  </Link>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:w-80 lg:shrink-0">
                {contestPrizes.map((p) => (
                  <div key={p.rank} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-white">{p.rank}</div>
                    <div className="mt-0.5 text-lg font-bold text-accent-400">{p.prize}</div>
                    <div className="mt-0.5 text-xs text-surface-400">{p.perk}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Creator CTA ──────────────────────────────── */}
        <section className="border-t border-[var(--border)] bg-[var(--bg-raised)] px-4 py-16 text-center">
          <Upload size={32} className="mx-auto mb-4 text-accent-500" />
          <h2 className="text-2xl font-bold">准备好卖出你的第一个 AI 应用了吗？</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--text-muted)]">
            注册账号，获得专属 OPC ID，上传安装包，设置价格，一切都在这里完成。平台不抽成，收益 100% 归你。
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/register" className="btn-primary gap-2 px-7 py-3">
              <Users size={15} />
              免费注册，开始创作
            </Link>
            <Link href="/academy/level4" className="btn-secondary gap-2 px-7 py-3">
              先看变现教程
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
