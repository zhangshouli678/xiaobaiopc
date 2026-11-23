import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Bot, Eye, Download, DollarSign, Star, TrendingUp, Plus, ChevronRight, BadgeCheck } from "lucide-react";

const MY_APPS = [
  { id: "APP-20251123-001", name: "门店智能客服助手", price: 29, views: 3412, downloads: 1240, revenue: 35960, rating: 4.8, status: "已上架" },
  { id: "APP-20251123-007", name: "合同审查风险提示", price: 79, views: 876, downloads: 321, revenue: 25359, rating: 4.7, status: "已上架" },
  { id: "APP-20251123-010", name: "店铺评价自动回复", price: 15, views: 1532, downloads: 987, revenue: 14805, rating: 4.6, status: "审核中" },
];

const STAT_CARDS = [
  { label: "总作品数", value: "3", icon: Bot, color: "text-accent-500 bg-accent-50" },
  { label: "总下载", value: "2,548", icon: Download, color: "text-info bg-info/10" },
  { label: "总浏览", value: "5,820", icon: Eye, color: "text-warning bg-warning/10" },
  { label: "总收益", value: "¥76,124", icon: DollarSign, color: "text-success bg-success/10" },
];

export default function CreatorPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Profile header */}
        <div className="card mb-6 flex flex-wrap items-center gap-5 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500 text-2xl font-bold text-white">
            张
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold">张三丰</h1>
              <span className="badge gap-1 bg-info/10 text-info">
                <BadgeCheck size={11} /> 认证创作者
              </span>
            </div>
            <p className="mt-1 text-sm text-[var(--text-muted)]">OPC-1024 · 加入于 2025-09-12</p>
            <p className="mt-1 text-xs text-[var(--text-subtle)]">专注门店经营类 AI 工具，已服务 300+ 线下商家。</p>
          </div>
          <Link href="/publish" className="btn-primary gap-2">
            <Plus size={14} /> 发布新作品
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="card flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-lg font-bold">{s.value}</div>
                  <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* My apps */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">我的作品</h2>
            <Link href="/market" className="text-xs text-accent-500 hover:underline">去市场看看</Link>
          </div>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--text-muted)]">
                    <th className="px-4 py-3 font-medium">作品</th>
                    <th className="px-4 py-3 font-medium">价格</th>
                    <th className="px-4 py-3 text-right font-medium">浏览</th>
                    <th className="px-4 py-3 text-right font-medium">下载</th>
                    <th className="px-4 py-3 text-right font-medium">收益</th>
                    <th className="px-4 py-3 text-right font-medium">状态</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {MY_APPS.map(app => (
                    <tr key={app.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-muted)]/50">
                      <td className="px-4 py-3">
                        <div className="font-medium">{app.name}</div>
                        <div className="text-2xs text-[var(--text-subtle)]">{app.id}</div>
                      </td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">¥{app.price}</td>
                      <td className="px-4 py-3 text-right text-[var(--text-muted)]">{app.views.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-[var(--text-muted)]">{app.downloads.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-semibold text-success">¥{app.revenue.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`badge ${app.status === "已上架" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/market/${app.id}`} className="text-xs text-accent-500 hover:underline">查看</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Traffic insight */}
        <div className="card p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <TrendingUp size={15} className="text-accent-500" /> 流量来源
          </h2>
          <div className="mt-4 space-y-3">
            {[
              { label: "市场搜索", pct: 42, color: "bg-accent-500" },
              { label: "社区推荐", pct: 28, color: "bg-info" },
              { label: "竞赛曝光", pct: 18, color: "bg-warning" },
              { label: "外部直接访问", pct: 12, color: "bg-[var(--text-subtle)]" },
            ].map(t => (
              <div key={t.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">{t.label}</span>
                  <span className="font-medium">{t.pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--bg-muted)]">
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
