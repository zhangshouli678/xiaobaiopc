import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Trophy, Clock, Users, Star, ChevronRight, Zap, Award } from "lucide-react";

const ACTIVE_CONTEST = {
  id: "2025-11",
  title: "11月创始人挑战赛",
  theme: "最实用的个人效率 AI 助手",
  deadline: "2025-11-30T23:59:00+08:00",
  prizePool: 5000,
  participants: 87,
  submissions: 42,
  daysLeft: 7,
};

const PRIZES = [
  { rank: "冠军", medal: "🥇", amount: 2000, perk: "首页 Banner 展示 1 周 + 金色认证徽章", color: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30" },
  { rank: "亚军", medal: "🥈", amount: 1000, perk: "专题推文报道 + 银色认证徽章", color: "from-slate-400/20 to-slate-500/5 border-slate-400/30" },
  { rank: "季军", medal: "🥉", amount: 500,  perk: "社区置顶推荐 1 周", color: "from-orange-600/20 to-orange-700/5 border-orange-600/30" },
  { rank: "最佳新人", medal: "🌟", amount: 500, perk: "新人认证徽章 + 新人专区推荐", color: "from-accent-500/20 to-accent-600/5 border-accent-500/30" },
];

const LEADERBOARD = [
  { rank: 1, name: "会议纪要整理助手", author: "职场小明", votes: 1243, score: 96.2 },
  { rank: 2, name: "小红书爆款文案助手", author: "美美创作", votes: 987, score: 93.8 },
  { rank: 3, name: "个人待办管家 Pro", author: "效率狂人", votes: 856, score: 91.4 },
  { rank: 4, name: "每日报告自动汇总", author: "陈数据", votes: 743, score: 88.9 },
  { rank: 5, name: "朋友圈文案日历", author: "内容工作者", votes: 621, score: 86.3 },
];

const PAST_CONTESTS = [
  { month: "2025年10月", theme: "最好的客服助手", winner: "门店智能客服助手", author: "张三丰", prize: "¥2,000" },
  { month: "2025年9月",  theme: "最受欢迎的知识库问答", winner: "产品说明书问答机器人", author: "王小明", prize: "¥2,000" },
];

const RULES = [
  "参赛作品必须是在本平台新上架的产品，且上架时间在比赛期间内。",
  "同一创作者最多可提交 3 个作品参赛。",
  "作品必须能正常安装和使用，如发现无法运行将取消评奖资格。",
  "评审分为：社区点赞（40%）+ 下载量（30%）+ 评审团打分（30%）。",
  "比赛结果将于截止日期后 3 个工作日内公示，奖金在公示后 7 天内发放。",
  "如有刷票行为，一经核实将永久取消参赛资格。",
];

export default function ContestPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-accent-500">
            <Trophy size={16} /> 竞赛中心
          </div>
          <h1 className="mt-3 text-3xl font-bold">用你的作品，赢下真实奖金</h1>
          <p className="mt-2 max-w-xl text-sm text-[var(--text-muted)]">
            每月一期主题挑战赛，奖金池 ¥5,000 起。把你做出来的 AI 智能体上架参赛，就有机会拿到真金白银和首页曝光。
          </p>
        </div>

        {/* Active contest card */}
        <div className="relative mb-10 overflow-hidden rounded-xl border border-accent-500/40 bg-gradient-to-br from-accent-950/60 to-surface-900/80 p-7 sm:p-9">
          <div aria-hidden className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/2 rounded-full bg-accent-500/10 blur-3xl" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge bg-accent-500 text-white gap-1"><Zap size={10} /> 正在进行</span>
              <span className="text-xs text-accent-400">第 {ACTIVE_CONTEST.id} 期</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{ACTIVE_CONTEST.title}</h2>
            <p className="mt-2 text-surface-300">
              主题：<span className="font-semibold text-white">{ACTIVE_CONTEST.theme}</span>
            </p>

            <div className="mt-5 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Trophy size={16} className="text-accent-400" />
                <span className="text-white font-bold">¥{ACTIVE_CONTEST.prizePool.toLocaleString()}</span>
                <span className="text-surface-400">奖金池</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-accent-400" />
                <span className="text-white font-bold">还剩 {ACTIVE_CONTEST.daysLeft} 天</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-accent-400" />
                <span className="text-white font-bold">{ACTIVE_CONTEST.participants}</span>
                <span className="text-surface-400">人参赛</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award size={16} className="text-accent-400" />
                <span className="text-white font-bold">{ACTIVE_CONTEST.submissions}</span>
                <span className="text-surface-400">件作品</span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/publish" className="btn-primary gap-2">
                <Trophy size={14} /> 提交参赛作品
              </Link>
              <Link href="/market" className="btn-secondary gap-2 border-white/20 text-white hover:bg-white/10">
                查看参赛作品
              </Link>
            </div>
          </div>
        </div>

        {/* Prize breakdown */}
        <h2 className="mb-5 text-xl font-bold">奖项设置</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRIZES.map(p => (
            <div key={p.rank} className={`rounded-xl border bg-gradient-to-b p-5 ${p.color}`}>
              <div className="text-2xl">{p.medal}</div>
              <div className="mt-2 text-sm font-semibold text-[var(--text)]">{p.rank}</div>
              <div className="mt-1 text-2xl font-black text-[var(--text)]">¥{p.amount.toLocaleString()}</div>
              <div className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{p.perk}</div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">实时排行榜</h2>
            <span className="text-xs text-[var(--text-subtle)]">更新于刚刚</span>
          </div>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--text-muted)]">
                  <th className="px-5 py-3 font-medium">排名</th>
                  <th className="px-5 py-3 font-medium">作品名称</th>
                  <th className="hidden px-5 py-3 font-medium sm:table-cell">创作者</th>
                  <th className="px-5 py-3 text-right font-medium">社区投票</th>
                  <th className="px-5 py-3 text-right font-medium">综合分</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD.map(row => (
                  <tr key={row.rank} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-muted)]/50">
                    <td className="px-5 py-3">
                      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${row.rank === 1 ? "bg-yellow-500 text-white" : row.rank === 2 ? "bg-slate-400 text-white" : row.rank === 3 ? "bg-orange-600 text-white" : "bg-[var(--bg-muted)] text-[var(--text-muted)]"}`}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium">{row.name}</td>
                    <td className="hidden px-5 py-3 text-[var(--text-muted)] sm:table-cell">{row.author}</td>
                    <td className="px-5 py-3 text-right text-[var(--text-muted)]">{row.votes.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-bold text-accent-500">{row.score.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rules */}
        <div className="mb-12">
          <h2 className="mb-4 text-xl font-bold">参赛规则</h2>
          <ol className="card divide-y divide-[var(--border)] overflow-hidden">
            {RULES.map((r, i) => (
              <li key={i} className="flex gap-3 px-5 py-3.5 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-50 text-xs font-bold text-accent-600">{i + 1}</span>
                <span className="text-[var(--text-muted)]">{r}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Past contests */}
        <div>
          <h2 className="mb-4 text-xl font-bold">往期回顾</h2>
          <div className="flex flex-col gap-3">
            {PAST_CONTESTS.map(c => (
              <div key={c.month} className="card flex flex-wrap items-center gap-4 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-muted)] text-[var(--text-muted)]">
                  <Trophy size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[var(--text-subtle)]">{c.month} · {c.theme}</div>
                  <div className="mt-0.5 text-sm font-semibold">
                    🏆 {c.winner} <span className="font-normal text-[var(--text-muted)]">by {c.author}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-accent-500">{c.prize}</span>
                <ChevronRight size={16} className="text-[var(--text-subtle)]" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
