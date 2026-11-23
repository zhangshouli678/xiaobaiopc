"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Heart, MessageCircle, Share2, Bot, Flame, Clock, TrendingUp, Plus, ChevronRight } from "lucide-react";

type Post = {
  id: number;
  user: string; userId: string;
  avatar: string; time: string;
  content: string;
  appName?: string; appId?: string;
  likes: number; comments: number;
  tag?: string; hot?: boolean;
};

const POSTS: Post[] = [
  { id: 1, user: "张三丰", userId: "OPC-1024", avatar: "张", time: "2 小时前", content: "花了一个晚上把自己的餐饮店客服助手做出来了，顾客问价格、营业时间、停车位置全都能自动答。今天试了一天，少回了 200 多条消息 🤯 分享给同行们。", appName: "门店智能客服助手", appId: "APP-20251123-001", likes: 128, comments: 24, tag: "实战案例", hot: true },
  { id: 2, user: "王小明", userId: "OPC-3156", avatar: "王", time: "4 小时前", content: "把我的产品手册 PDF 丢进去，用 L3 的知识库功能做了个问答机器人，客户问了 3 年的售后问题它全答上来了。免费开给大家用。", appName: "产品说明书问答机器人", appId: "APP-20251123-003", likes: 214, comments: 41, tag: "知识库", hot: true },
  { id: 3, user: "美美创作", userId: "OPC-5078", avatar: "美", time: "6 小时前", content: "之前写小红书文案一篇要磨半小时，现在输入产品关键词直接出 10 条，我挑一条改改就发了。已经卖了 2000 多份，有点意外 😂", appName: "小红书爆款文案助手", appId: "APP-20251123-005", likes: 356, comments: 67, tag: "变现分享", hot: true },
  { id: 4, user: "陈数据", userId: "OPC-4201", avatar: "陈", time: "昨天", content: "想问一下大家：接入 Claude 的 API 之后成本比 DeepSeek 贵很多，你们是怎么选模型的？我的场景是每天汇总销售数据，对速度要求不高。", likes: 42, comments: 18, tag: "求助" },
  { id: 5, user: "职场小明", userId: "OPC-1122", avatar: "职", time: "昨天", content: "做了一个会议纪要整理助手，把录音转成文字丢进去，自动提取：谁负责 + 什么时候要 + 需要做什么。老板说以后开会必须用它 😅 参赛了 11 月的效率主题挑战赛，求投票～", appName: "会议纪要整理助手", appId: "APP-20251123-011", likes: 189, comments: 32, tag: "竞赛", hot: true },
  { id: 6, user: "效率狂人", userId: "OPC-0912", avatar: "效", time: "2 天前", content: "教程补充：小白 Agent 装上之后第一件事不是马上做产品，是先把它接入的模型调试好。L2 第 3 节有讲，很多人卡在这一步。", likes: 76, comments: 11, tag: "技巧分享" },
];

const TABS = ["推荐", "最新", "热门", "关注"];
const TOPICS = ["# 实战案例", "# 知识库", "# 变现分享", "# 求助", "# 技巧分享", "# 竞赛", "# 模型接入"];

export default function CommunityPage() {
  const [tab, setTab] = useState("推荐");
  const [topic, setTopic] = useState<string | null>(null);

  let posts = [...POSTS];
  if (tab === "热门") posts = posts.sort((a, b) => b.likes - a.likes);
  if (topic) posts = posts.filter(p => p.tag === topic.replace("# ", ""));
  else if (tab === "最新") posts = posts.sort((a, b) => b.id - a.id);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">社区广场</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">看看大家用小白 Agent 做出了什么，分享你的成果和心得</p>
        </div>

        {/* Composer */}
        <div className="card mb-5 flex items-center gap-3 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-muted)] text-xs font-bold text-[var(--text-muted)]">
            我
          </div>
          <div className="flex-1 rounded-full bg-[var(--bg-muted)] px-4 py-2 text-sm text-[var(--text-subtle)]">
            分享你的作品、心得或问题……
          </div>
          <button className="btn-primary gap-1 py-1.5 text-xs">
            <Plus size={13} /> 发帖
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex items-center gap-1 border-b border-[var(--border)]">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm transition-colors ${tab === t ? "border-b-2 border-accent-500 font-semibold text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Topics */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {TOPICS.map(t => (
            <button
              key={t}
              onClick={() => setTopic(topic === t ? null : t)}
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${topic === t ? "border-accent-500 bg-accent-500 text-white" : "border-[var(--border)] text-[var(--text-muted)] hover:border-accent-500 hover:text-accent-500"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-4">
          {posts.map(p => (
            <article key={p.id} className="card p-5">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500/10 text-sm font-bold text-accent-600">
                  {p.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold">{p.user}</span>
                    <span className="text-xs text-[var(--text-subtle)]">{p.userId}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-subtle)]">
                    <Clock size={10} />
                    {p.time}
                    {p.hot && (
                      <span className="flex items-center gap-0.5 text-warning">
                        <Flame size={10} /> 热门
                      </span>
                    )}
                  </div>
                </div>
                {p.tag && (
                  <span className="badge bg-[var(--bg-muted)] text-[var(--text-muted)]">{p.tag}</span>
                )}
              </div>

              {/* Content */}
              <p className="mt-3 text-sm leading-relaxed text-[var(--text)]">{p.content}</p>

              {/* Attached app */}
              {p.appName && (
                <Link
                  href={`/market/${p.appId}`}
                  className="mt-3 flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-muted)] p-3 transition-colors hover:border-accent-500"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-50 text-accent-500">
                    <Bot size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{p.appName}</div>
                    <div className="text-xs text-[var(--text-subtle)]">点击查看详情</div>
                  </div>
                  <ChevronRight size={15} className="text-[var(--text-subtle)]" />
                </Link>
              )}

              {/* Actions */}
              <div className="mt-4 flex items-center gap-5 border-t border-[var(--border)] pt-3 text-xs text-[var(--text-muted)]">
                <button className="flex items-center gap-1.5 hover:text-danger transition-colors">
                  <Heart size={14} /> {p.likes}
                </button>
                <button className="flex items-center gap-1.5 hover:text-accent-500 transition-colors">
                  <MessageCircle size={14} /> {p.comments}
                </button>
                <button className="flex items-center gap-1.5 hover:text-accent-500 transition-colors">
                  <Share2 size={14} /> 分享
                </button>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="card flex flex-col items-center gap-2 py-16">
            <MessageCircle size={32} className="text-[var(--text-subtle)]" />
            <p className="text-sm text-[var(--text-muted)]">这个分类还没有内容</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
