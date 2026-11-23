import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, Users, Shield, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-white">
              <Zap size={24} />
            </div>
            <h1 className="mt-4 text-xl font-bold">登录小白OPC</h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">用手机号验证码登录，无需记忆密码</p>
          </div>

          <div className="card p-6">
            <label className="block text-xs font-medium text-[var(--text-muted)]">手机号</label>
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

            <button className="btn-primary mt-5 w-full justify-center py-2.5">
              登录 / 注册
            </button>

            <p className="mt-3 text-center text-2xs text-[var(--text-subtle)]">
              未注册的手机号将自动创建账号并生成专属 OPC ID
            </p>
          </div>

          <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Shield size={12} />
            <span>手机号仅用于账号安全，不对外展示</span>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
              <ArrowLeft size={14} /> 返回首页
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
