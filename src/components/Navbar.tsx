"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Bell } from "lucide-react";

const navLinks = [
  { label: "探索市场", href: "/market" },
  { label: "小白学院", href: "/academy" },
  { label: "社区广场", href: "/community" },
  { label: "竞赛中心", href: "/contest" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-raised)]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold text-[var(--text)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="小白OPC" width={32} height={32} className="rounded-lg" />
          <span className="text-sm tracking-tight">
            小白<span className="text-accent-500">OPC</span>
          </span>
        </Link>

        {/* Search bar (desktop) */}
        <div className="relative hidden flex-1 max-w-sm sm:flex">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="search"
            placeholder="搜索智能体、课程……"
            className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-muted)] py-1.5 pl-8 pr-3 text-sm outline-none placeholder:text-[var(--text-subtle)] focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
          />
        </div>

        {/* Nav links (desktop) */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            aria-label="通知"
            className="hidden rounded-md p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] sm:block"
          >
            <Bell size={18} />
          </button>
          <Link
            href="/login"
            className="hidden text-sm text-[var(--text-muted)] hover:text-[var(--text)] sm:block"
          >
            登录
          </Link>
          <Link href="/register" className="btn-primary hidden py-1.5 text-xs sm:flex">
            免费注册
          </Link>
          {/* Creator publish button */}
          <Link
            href="/publish"
            className="hidden rounded-md border border-accent-500 px-3 py-1.5 text-xs font-semibold text-accent-500 hover:bg-accent-50 sm:block"
          >
            + 发布作品
          </Link>
          {/* Mobile menu toggle */}
          <button
            className="rounded-md p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="菜单"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-raised)] px-4 pb-4 md:hidden">
          <div className="relative mt-3">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="search"
              placeholder="搜索智能体、课程……"
              className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-muted)] py-2 pl-8 pr-3 text-sm outline-none focus:border-accent-500"
            />
          </div>
          <nav className="mt-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text)]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex gap-2">
            <Link href="/login" className="btn-secondary flex-1 justify-center py-2 text-sm">登录</Link>
            <Link href="/register" className="btn-primary flex-1 justify-center py-2 text-sm">免费注册</Link>
          </div>
        </div>
      )}
    </header>
  );
}
