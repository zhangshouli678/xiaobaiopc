import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, Download, Cpu, FileText, Store, ChevronRight, CheckCircle, Lock, Play } from "lucide-react";

const LEVELS = [
  {
    level: "L0", title: "认识小白 Agent", free: true,
    duration: "约 20 分钟", lessons: 4,
    desc: "了解什么是 AI 智能体、它能做什么、如何安装小白 Agent，以及第一次用自然语言和它对话。",
    icon: Download,
    topics: ["什么是 AI 智能体", "小白 Agent 安装指引", "第一次对话：让它认识你", "常见问题 FAQ"],
    href: "/academy/level0",
  },
  {
    level: "L1", title: "从想法到软件", free: true,
    duration: "约 60 分钟", lessons: 6,
    desc: "核心课程：如何用自然语言描述需求，让 AI 自动生成你想要的软件，并一步步调试到满意。",
    icon: BookOpen,
    topics: ["用一句话说清你想要什么", "需求拆解：把大目标拆成小任务", "迭代修改：不满意就接着说", "实战案例：做一个「私人待办管家」", "常见踩坑与修复", "你的第一个完整作品"],
    href: "/academy/level1",
  },
  {
    level: "L2", title: "接入 AI 模型", free: true,
    duration: "约 30 分钟", lessons: 5,
    desc: "教会你配置 API Key，接入 DeepSeek / Qwen / GPT / Claude / Gemini 等主流模型，让你的智能体真正能思考。",
    icon: Cpu,
    topics: ["什么是 API Key", "DeepSeek 配置教程（推荐）", "GPT / Claude / Gemini 接入", "本地模型 Ollama 方案", "模型选型建议"],
    href: "/academy/level2",
  },
  {
    level: "L3", title: "定制知识库", free: false,
    duration: "约 45 分钟", lessons: 5,
    desc: "学会上传 PDF、Word、网址等材料，构建能回答专业问题的知识库助手，给自己的业务打造专属 AI 顾问。",
    icon: FileText,
    topics: ["上传 PDF → 生成问答助手", "知识库切片与召回原理（简易版）", "上传你的业务文档", "实战：门店产品知识助手", "如何避免胡说八道"],
    href: "/academy/level3",
  },
  {
    level: "L4", title: "发布 & 变现", free: false,
    duration: "约 40 分钟", lessons: 5,
    desc: "从打包安装包到上架市场、设置定价、生成下载码，让你的作品真正卖出去、赚到钱。",
    icon: Store,
    topics: ["打包你的智能体成安装包", "上架市场：写出能卖的产品页", "定价策略：什么时候免费、什么时候收费", "下载码玩法与客服话术", "推广渠道 & 竞赛拿奖"],
    href: "/academy/level4",
  },
];

const PROGRESS = { completed: 0, total: LEVELS.length };

export default function AcademyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-accent-500">
            <BookOpen size={16} />
            小白学院
          </div>
          <h1 className="mt-3 text-3xl font-bold">从零开始，做出你的第一个 AI 应用</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
            零代码、纯对话方式教学。跟着这 5 个等级走完，你就能独立完成一个可以卖钱的 AI 智能体。
            前三等级完全免费。
          </p>
        </div>

        {/* Overall progress */}
        <div className="card mb-10 flex items-center gap-5 p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-accent-500/20 text-accent-500">
            <span className="text-sm font-black">{PROGRESS.completed}/{PROGRESS.total}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">学习进度</p>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {PROGRESS.completed === 0 ? "还没开始——从 L0 出发吧，20 分钟就能完成。" : `已完成 ${PROGRESS.completed}/${PROGRESS.total} 个等级`}
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--bg-muted)]">
              <div
                className="h-full rounded-full bg-accent-500 transition-all"
                style={{ width: `${(PROGRESS.completed / PROGRESS.total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Level list */}
        <div className="flex flex-col gap-5">
          {LEVELS.map((lv, idx) => {
            const Icon = lv.icon;
            const done = idx < PROGRESS.completed;
            const next = idx === PROGRESS.completed;
            return (
              <div
                key={lv.level}
                className={`card flex flex-col gap-5 p-6 sm:flex-row ${next ? "ring-1 ring-accent-500/40" : ""}`}
              >
                {/* Left: icon + badge */}
                <div className="flex shrink-0 flex-col items-center gap-2 sm:w-20">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${next ? "bg-accent-500 text-white" : done ? "bg-success/10 text-success" : "bg-[var(--bg-muted)] text-[var(--text-muted)]"}`}>
                    {done ? <CheckCircle size={22} /> : <Icon size={22} />}
                  </div>
                  <span className="text-xs font-bold text-[var(--text-subtle)]">{lv.level}</span>
                </div>

                {/* Right: content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold">{lv.title}</h2>
                    {lv.free ? (
                      <span className="badge bg-success/10 text-success">免费</span>
                    ) : (
                      <span className="badge bg-[var(--bg-muted)] text-[var(--text-muted)]">
                        <Lock size={10} /> 需注册学习 L0-L2
                      </span>
                    )}
                    {next && <span className="badge bg-accent-500 text-white">从这里开始</span>}
                    {done && <span className="badge bg-success/10 text-success">已完成</span>}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{lv.desc}</p>

                  {/* Meta */}
                  <div className="mt-2 flex items-center gap-4 text-xs text-[var(--text-subtle)]">
                    <span>{lv.lessons} 节课</span>
                    <span>{lv.duration}</span>
                  </div>

                  {/* Topics */}
                  <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                    {lv.topics.map(t => (
                      <li key={t} className="flex items-start gap-1.5 text-xs text-[var(--text-muted)]">
                        <ChevronRight size={12} className="mt-0.5 shrink-0 text-accent-400" />
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5">
                    <Link
                      href={lv.href}
                      className={next ? "btn-primary gap-2 py-2 text-sm" : "btn-secondary gap-2 py-2 text-sm"}
                    >
                      {done ? <><CheckCircle size={14} /> 重新学习</> : <><Play size={14} /> {next ? "开始学习" : "查看课程"}</>}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PDF upload callout */}
        <div className="mt-10 rounded-xl border border-accent-500/30 bg-accent-950/20 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <FileText size={28} className="shrink-0 text-accent-400" />
            <div className="flex-1">
              <h3 className="font-semibold">想要自己的专属学习材料？</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                上传 PDF / Word / 网址，平台会帮你生成一个可以对话的知识助手，相当于定制一份只属于你的课程。
              </p>
            </div>
            <Link href="/academy/knowledge" className="btn-primary shrink-0 gap-2 py-2 text-sm">
              <FileText size={14} /> 上传 PDF
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
