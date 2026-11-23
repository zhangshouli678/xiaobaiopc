import Link from "next/link";
import { Zap } from "lucide-react";

const cols = [
  {
    title: "产品",
    links: [
      { label: "探索市场", href: "/market" },
      { label: "小白学院", href: "/academy" },
      { label: "社区广场", href: "/community" },
      { label: "竞赛中心", href: "/contest" },
    ],
  },
  {
    title: "创作者",
    links: [
      { label: "发布作品", href: "/publish" },
      { label: "创作者中心", href: "/creator" },
      { label: "接入模型指引", href: "/academy/models" },
      { label: "上传 PDF 知识库", href: "/academy/knowledge" },
    ],
  },
  {
    title: "关于",
    links: [
      { label: "关于我们", href: "/about" },
      { label: "服务协议", href: "/terms" },
      { label: "隐私政策", href: "/privacy" },
      { label: "联系我们", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-raised)] mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500 text-white">
                <Zap size={16} strokeWidth={2.5} />
              </span>
              <span className="text-sm tracking-tight">
                小白<span className="text-accent-500">OPC</span>
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
              让普通人也能用自然语言做出自己的 AI 软件，学习、创作、变现，一站完成。
            </p>
            <p className="mt-4 text-xs text-[var(--text-subtle)]">xiaobaiopc.com</p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-subtle)]">
          <span>© {new Date().getFullYear()} 小白OPC社区 · xiaobaiopc.com</span>
          <span>ICP备案号：待填写</span>
        </div>
      </div>
    </footer>
  );
}
