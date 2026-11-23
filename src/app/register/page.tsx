import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, CheckCircle, ArrowRight } from "lucide-react";

const perks = [
  "专属 OPC ID（OPC-XXXXXX），全平台唯一",
  "免费学习 L0-L2 全部课程",
  "上传、发布自己的智能体作品",
  "在竞赛中心参赛赢奖金",
  "作品展示 + 微信引流 + 收款码",
];

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* Left: value prop */}
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-white">
                <Zap size={24} />
              </div>
              <h1 className="mt-5 text-2xl font-bold leading-tight">
                加入小白OPC，<br />
                做出属于你的 <span className="text-accent-500">AI 软件</span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                完全不懂代码也能做到。注册后你会获得一个专属 OPC ID，跟着课程一步步做，做完就能上架卖出。
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {perks.map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle size={15} className="mt-0.5 shrink-0 text-success" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form */}
            <div className="card p-7">
              <h2 className="text-lg font-bold">免费注册</h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">1 分钟搞定，无需邮箱</p>

              <label className="mt-5 block text-xs font-medium text-[var(--text-muted)]">手机号</label>
              <input
                type="tel"
                placeholder="请输入手机号"
                className="mt-1.5 w-full rounded-md border border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2.5 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
              />

              <label className="mt-4 block text-xs font-medium text-[var(--text-muted)]">验证码</label>
              <div className="mt-1.5 flex gap-2">
                <input
                  type="text"
                  placeholder="6 位验证码"
                  className="flex-1 rounded-md border border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2.5 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                />
                <button className="shrink-0 rounded-md border border-accent-500 px-3.5 py-2.5 text-xs font-semibold text-accent-500 hover:bg-accent-50">
                  获取验证码
                </button>
              </div>

              <label className="mt-4 block text-xs font-medium text-[var(--text-muted)]">昵称（可选）</label>
              <input
                type="text"
                placeholder="给自己取一个名字，可随时修改"
                className="mt-1.5 w-full rounded-md border border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2.5 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
              />

              <button className="btn-primary mt-5 w-full justify-center gap-2 py-2.5">
                立即注册 <ArrowRight size={14} />
              </button>

              <p className="mt-3 text-center text-2xs leading-relaxed text-[var(--text-subtle)]">
                注册即表示你同意 <Link href="/terms" className="text-accent-500 hover:underline">服务协议</Link> 和{" "}
                <Link href="/privacy" className="text-accent-500 hover:underline">隐私政策</Link>
              </p>

              <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
                已有账号？<Link href="/login" className="font-medium text-accent-500 hover:underline">去登录</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
