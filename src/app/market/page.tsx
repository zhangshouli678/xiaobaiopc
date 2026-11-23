"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, SlidersHorizontal, Star, Download, Bot, ChevronRight, ShoppingCart } from "lucide-react";

/* ── Types & data ──────────────────────────────────────── */
type App = {
  id: string; name: string; author: string; authorId: string;
  price: number; downloads: number; rating: number; ratingCount: number;
  tag: string; desc: string; featured?: boolean;
};

const CATS = ["全部", "客服助手", "知识库问答", "文案写作", "数据分析", "图片处理", "效率工具", "教育培训", "私人顾问"];
const SORTS = ["最新上架", "下载最多", "评分最高", "价格从低到高", "价格从高到低"];

const MOCK_APPS: App[] = [
  { id: "APP-20251123-001", name: "门店智能客服助手", author: "张三丰", authorId: "OPC-1024", price: 29, downloads: 1240, rating: 4.8, ratingCount: 87, tag: "客服助手", desc: "自动回复顾客问题、预约管理、常见问题知识库，适合餐饮、美业、零售门店。", featured: true },
  { id: "APP-20251123-002", name: "律师函自动生成器", author: "李法宝", authorId: "OPC-2087", price: 49, downloads: 876, rating: 4.9, ratingCount: 53, tag: "文案写作", desc: "根据输入的事实自动生成标准格式律师函，支持多种案由模板。" },
  { id: "APP-20251123-003", name: "产品说明书问答机器人", author: "王小明", authorId: "OPC-3156", price: 0, downloads: 3312, rating: 4.7, ratingCount: 214, tag: "知识库问答", desc: "上传产品手册 PDF，客户随时提问自动回答，减少人工客服 80%。", featured: true },
  { id: "APP-20251123-004", name: "每日报告自动汇总", author: "陈数据", authorId: "OPC-4201", price: 39, downloads: 654, rating: 4.6, ratingCount: 41, tag: "数据分析", desc: "接入数据表格，每天自动汇总关键指标，生成可读性强的日报。" },
  { id: "APP-20251123-005", name: "小红书爆款文案助手", author: "美美创作", authorId: "OPC-5078", price: 19, downloads: 2187, rating: 4.8, ratingCount: 162, tag: "文案写作", desc: "输入产品关键词，一键生成小红书风格的种草文案，附标签推荐。", featured: true },
  { id: "APP-20251123-006", name: "内部培训知识助手", author: "HR达人", authorId: "OPC-6112", price: 59, downloads: 432, rating: 4.9, ratingCount: 28, tag: "教育培训", desc: "把公司内部培训材料变成可对话的 AI 助手，新员工随时问随时答。" },
  { id: "APP-20251123-007", name: "合同审查风险提示", author: "法务小助手", authorId: "OPC-7033", price: 79, downloads: 321, rating: 4.7, ratingCount: 19, tag: "效率工具", desc: "上传合同 PDF，自动标注风险条款，生成修改建议报告。" },
  { id: "APP-20251123-008", name: "电商商品详情页生成器", author: "运营阿杰", authorId: "OPC-8045", price: 25, downloads: 1567, rating: 4.5, ratingCount: 98, tag: "文案写作", desc: "输入商品参数，一键生成淘宝/拼多多风格的商品详情页文案。" },
  { id: "APP-20251123-009", name: "个人健康管家", author: "健康小刘", authorId: "OPC-9052", price: 0, downloads: 2894, rating: 4.4, ratingCount: 347, tag: "私人顾问", desc: "记录日常饮食运动，AI 根据你的数据给出健康改善建议。" },
  { id: "APP-20251123-010", name: "店铺评价自动回复", author: "外卖老李", authorId: "OPC-1011", price: 15, downloads: 987, rating: 4.6, ratingCount: 63, tag: "效率工具", desc: "自动生成外卖/网上店铺的评价回复，好评、差评都有合适话术。" },
  { id: "APP-20251123-011", name: "会议纪要整理助手", author: "职场小明", authorId: "OPC-1122", price: 29, downloads: 1341, rating: 4.7, ratingCount: 112, tag: "效率工具", desc: "粘贴会议录音转写文本，自动提取决议事项、负责人、截止时间。" },
  { id: "APP-20251123-012", name: "朋友圈文案日历", author: "内容工作者", authorId: "OPC-1233", price: 0, downloads: 1987, rating: 4.5, ratingCount: 189, tag: "文案写作", desc: "输入你的行业和人群画像，生成一整月朋友圈文案排期。" },
];

const PRICE_FILTERS = [
  { label: "全部价格", min: -1, max: -1 },
  { label: "免费", min: 0, max: 0 },
  { label: "¥1-30", min: 1, max: 30 },
  { label: "¥31-60", min: 31, max: 60 },
  { label: "¥60+", min: 61, max: 999 },
];

/* ── App card ──────────────────────────────────────────── */
function AppCard({ app }: { app: App }) {
  return (
    <article className="card flex flex-col gap-3 p-4 hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-500">
          <Bot size={20} />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="badge bg-accent-50 text-accent-600 text-2xs">{app.tag}</span>
          {app.featured && (
            <span className="badge bg-warning/10 text-warning text-2xs">⭐ 热门</span>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold leading-snug text-[var(--text)]">{app.name}</h3>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
          by {app.author} · <span className="text-[var(--text-subtle)]">{app.authorId}</span>
        </p>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">{app.desc}</p>
      </div>
      <div className="mt-auto flex items-center gap-3 text-xs text-[var(--text-muted)]">
        <span className="flex items-center gap-0.5 text-warning">
          <Star size={11} fill="currentColor" />
          <span className="text-[var(--text-muted)]">{app.rating.toFixed(1)}</span>
          <span className="text-[var(--text-subtle)]">({app.ratingCount})</span>
        </span>
        <span className="flex items-center gap-0.5">
          <Download size={11} />
          {app.downloads.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
        <span className={`text-sm font-bold ${app.price === 0 ? "text-success" : "text-accent-500"}`}>
          {app.price === 0 ? "免费" : `¥${app.price}`}
        </span>
        <Link
          href={`/market/${app.id}`}
          className="flex items-center gap-1 rounded-md bg-accent-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-400 transition-colors"
        >
          {app.price === 0 ? <><Download size={11} /> 下载</> : <><ShoppingCart size={11} /> 购买</>}
        </Link>
      </div>
    </article>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function MarketPage() {
  const [cat, setCat] = useState("全部");
  const [sort, setSort] = useState("最新上架");
  const [priceFilter, setPriceFilter] = useState(-1);
  const [q, setQ] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const pf = PRICE_FILTERS.find(p => p.label === priceFilter.toString()) ?? PRICE_FILTERS[0];

  let filtered = MOCK_APPS.filter(app => {
    if (cat !== "全部" && app.tag !== cat) return false;
    if (q && !app.name.includes(q) && !app.desc.includes(q) && !app.author.includes(q)) return false;
    if (priceFilter !== -1) {
      if (priceFilter === 0 && app.price !== 0) return false;
      if (priceFilter === 1 && (app.price < 1 || app.price > 30)) return false;
      if (priceFilter === 2 && (app.price < 31 || app.price > 60)) return false;
      if (priceFilter === 3 && app.price < 61) return false;
    }
    return true;
  });

  if (sort === "下载最多") filtered = [...filtered].sort((a, b) => b.downloads - a.downloads);
  else if (sort === "评分最高") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === "价格从低到高") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "价格从高到低") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">应用市场</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {MOCK_APPS.length}+ 个由社区创作者开发的 AI 智能体，即买即用
          </p>
        </div>

        {/* Search + sort */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="search"
              placeholder="搜索智能体名称、功能或作者……"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-raised)] py-2 pl-9 pr-3 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-[var(--bg-raised)] px-3 py-2 text-sm outline-none focus:border-accent-500"
          >
            {SORTS.map(s => <option key={s}>{s}</option>)}
          </select>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors ${showFilter ? "border-accent-500 text-accent-500" : "border-[var(--border)] text-[var(--text-muted)]"}`}
          >
            <SlidersHorizontal size={14} /> 筛选
          </button>
        </div>

        {/* Price filter panel */}
        {showFilter && (
          <div className="mb-5 flex flex-wrap items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-3">
            <span className="text-xs font-medium text-[var(--text-muted)]">价格：</span>
            {[["全部价格", -1], ["免费", 0], ["¥1-30", 1], ["¥31-60", 2], ["¥60+", 3]].map(([label, v]) => (
              <button
                key={v}
                onClick={() => setPriceFilter(v as number)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${priceFilter === v ? "bg-accent-500 text-white" : "border border-[var(--border)] text-[var(--text-muted)] hover:border-accent-500"}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Category tabs */}
        <div className="mb-6 flex gap-1.5 overflow-x-auto pb-1">
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${cat === c ? "bg-accent-500 text-white" : "border border-[var(--border)] text-[var(--text-muted)] hover:border-accent-500 hover:text-accent-500"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="mb-4 text-xs text-[var(--text-subtle)]">
          找到 {filtered.length} 个结果
          {cat !== "全部" && ` · ${cat}`}
          {q && ` · 搜索"${q}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(app => <AppCard key={app.id} app={app} />)}
          </div>
        ) : (
          <div className="card flex flex-col items-center gap-3 py-16">
            <Bot size={36} className="text-[var(--text-subtle)]" />
            <p className="text-sm text-[var(--text-muted)]">没有找到匹配的智能体</p>
            <button
              onClick={() => { setQ(""); setCat("全部"); setPriceFilter(-1); }}
              className="text-xs text-accent-500 hover:underline"
            >
              清除所有筛选
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
