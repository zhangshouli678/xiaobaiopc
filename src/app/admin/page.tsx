"use client";
import { useState } from "react";
import { Upload, Image as ImageIcon, Package, FileText, LogOut, CheckCircle, AlertCircle, Loader } from "lucide-react";

const ADMIN_PASSWORD = "xiaobaiopc2026";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadResult {
  name: string;
  url: string;
  size: string;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);

  // Logo
  const [logoStatus, setLogoStatus] = useState<UploadStatus>("idle");
  const [logoResult, setLogoResult] = useState<UploadResult | null>(null);

  // Package
  const [pkgPlatform, setPkgPlatform] = useState<"windows" | "mac">("windows");
  const [pkgStatus, setPkgStatus] = useState<UploadStatus>("idle");
  const [pkgResult, setPkgResult] = useState<UploadResult | null>(null);

  // PDF
  const [pdfStatus, setPdfStatus] = useState<UploadStatus>("idle");
  const [pdfResult, setPdfResult] = useState<UploadResult | null>(null);

  /* ── Auth ─────────────────────────────────────────── */
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
        <div className="card w-full max-w-sm p-7">
          <h1 className="text-xl font-bold text-center">管理后台</h1>
          <p className="mt-1 text-center text-xs text-[var(--text-muted)]">小白OPC · 仅限管理员</p>
          <div className="mt-6">
            <label className="text-xs font-medium text-[var(--text-muted)]">管理员密码</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setPwErr(false); }}
              onKeyDown={e => { if (e.key === "Enter") { if (pw === ADMIN_PASSWORD) { setAuthed(true); } else { setPwErr(true); } } }}
              placeholder="请输入密码"
              className={`mt-1.5 w-full rounded-md border px-3 py-2.5 text-sm outline-none focus:ring-1 ${pwErr ? "border-danger focus:ring-danger" : "border-[var(--border)] bg-[var(--bg-muted)] focus:border-accent-500 focus:ring-accent-500"}`}
            />
            {pwErr && <p className="mt-1 text-xs text-danger">密码错误</p>}
          </div>
          <button
            className="btn-primary mt-4 w-full justify-center py-2.5"
            onClick={() => { if (pw === ADMIN_PASSWORD) { setAuthed(true); } else { setPwErr(true); } }}
          >
            登录
          </button>
        </div>
      </div>
    );
  }

  /* ── Upload helpers ────────────────────────────────── */
  const fmtSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const uploadToGithub = async (
    file: File,
    path: string,
    setStatus: (s: UploadStatus) => void,
    setResult: (r: UploadResult) => void
  ) => {
    setStatus("uploading");
    try {
      const ab = await file.arrayBuffer();
      const bytes = new Uint8Array(ab);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      const b64 = btoa(binary);

      // Get current sha if file exists
      let sha: string | undefined;
      try {
        const r = await fetch(`https://api.github.com/repos/zhangshouli678/xiaobaiopc/contents/${path}`, {
          headers: { "Accept": "application/vnd.github.v3+json" }
        });
        if (r.ok) { const d = await r.json(); sha = d.sha; }
      } catch { /* new file */ }

      const body: Record<string, string> = {
        message: `upload: ${file.name} via admin panel`,
        content: b64,
      };
      if (sha) body.sha = sha;

      const resp = await fetch(`https://api.github.com/repos/zhangshouli678/xiaobaiopc/contents/${path}`, {
        method: "PUT",
        headers: {
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        // GitHub requires auth for PUT, use public CDN fallback
        // Show direct download URL using jsDelivr CDN
        const cdnUrl = `https://cdn.jsdelivr.net/gh/zhangshouli678/xiaobaiopc@main/${path}`;
        setResult({ name: file.name, url: cdnUrl, size: fmtSize(file.size) });
        setStatus("error");
        return;
      }

      const data = await resp.json();
      const rawUrl = data.content?.download_url || `https://raw.githubusercontent.com/zhangshouli678/xiaobaiopc/main/${path}`;
      setResult({ name: file.name, url: rawUrl, size: fmtSize(file.size) });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadToGithub(file, `public/logo-upload.${file.name.split(".").pop()}`, setLogoStatus, setLogoResult);
  };

  const handlePkgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop();
    const path = pkgPlatform === "windows" ? `public/downloads/xiaobai-agent-windows.${ext}` : `public/downloads/xiaobai-agent-mac.${ext}`;
    await uploadToGithub(file, path, setPkgStatus, setPkgResult);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const safeName = file.name.replace(/\s+/g, "-");
    await uploadToGithub(file, `public/knowledge/${safeName}`, setPdfStatus, setPdfResult);
  };

  /* ── Upload card ───────────────────────────────────── */
  function UploadCard({
    icon: Icon, title, desc, accept, status, result, onChange, children
  }: {
    icon: React.ElementType; title: string; desc: string; accept: string;
    status: UploadStatus; result: UploadResult | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
  }) {
    return (
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-500">
            <Icon size={20} />
          </div>
          <div>
            <h2 className="font-bold">{title}</h2>
            <p className="text-xs text-[var(--text-muted)]">{desc}</p>
          </div>
        </div>
        {children}
        <label className={`mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-colors p-8
          ${status === "uploading" ? "border-accent-400 bg-accent-50/30" : "border-[var(--border-mid)] hover:border-accent-500 hover:bg-[var(--bg-muted)]"}`}>
          <input type="file" accept={accept} className="hidden" onChange={onChange} disabled={status === "uploading"} />
          {status === "uploading" ? (
            <>
              <Loader size={28} className="text-accent-500 animate-spin" />
              <p className="mt-2 text-sm text-accent-500">上传中...</p>
            </>
          ) : (
            <>
              <Upload size={28} className="text-[var(--text-subtle)]" />
              <p className="mt-2 text-sm font-medium">点击选择文件</p>
              <p className="mt-1 text-xs text-[var(--text-subtle)]">{accept}</p>
            </>
          )}
        </label>
        {result && (
          <div className={`mt-3 rounded-lg p-3 text-xs ${status === "success" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
            <div className="flex items-center gap-1.5 font-medium">
              {status === "success" ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
              {status === "success" ? "上传成功" : "需要 GitHub 认证（文件太大或权限不足）"}
            </div>
            <p className="mt-1 break-all">{result.name} · {result.size}</p>
            {status === "success" && (
              <a href={result.url} target="_blank" rel="noopener" className="mt-1 block underline break-all">{result.url}</a>
            )}
          </div>
        )}
      </div>
    );
  }

  /* ── Main admin UI ─────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-raised)]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="小白OPC" width={28} height={28} className="rounded" />
            <span className="text-sm font-bold">小白OPC <span className="text-accent-500">管理后台</span></span>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            <LogOut size={14} /> 退出登录
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">内容管理</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">上传头像、安装包、知识库 PDF，更改立即生效</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Logo */}
          <UploadCard
            icon={ImageIcon}
            title="网站 Logo / 头像"
            desc="上传后替换导航栏和页脚的品牌图标"
            accept=".png,.jpg,.jpeg,.svg,.webp"
            status={logoStatus}
            result={logoResult}
            onChange={handleLogoUpload}
          >
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-muted)]">
              <div className="text-xs text-[var(--text-muted)]">当前 logo：</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="current logo" width={32} height={32} className="rounded" />
            </div>
          </UploadCard>

          {/* Package */}
          <UploadCard
            icon={Package}
            title="小白 Agent 安装包"
            desc="上传 Windows (.exe) 或 macOS (.dmg) 安装包"
            accept=".exe,.dmg,.zip,.pkg"
            status={pkgStatus}
            result={pkgResult}
            onChange={handlePkgUpload}
          >
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setPkgPlatform("windows")}
                className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors ${pkgPlatform === "windows" ? "bg-accent-500 text-white" : "border border-[var(--border)] text-[var(--text-muted)]"}`}
              >
                🖥 Windows
              </button>
              <button
                onClick={() => setPkgPlatform("mac")}
                className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors ${pkgPlatform === "mac" ? "bg-accent-500 text-white" : "border border-[var(--border)] text-[var(--text-muted)]"}`}
              >
                🍎 macOS
              </button>
            </div>
          </UploadCard>

          {/* PDF */}
          <UploadCard
            icon={FileText}
            title="PDF 知识库"
            desc="上传产品手册、课程资料等，生成可对话的知识助手"
            accept=".pdf,.docx,.txt,.md"
            status={pdfStatus}
            result={pdfResult}
            onChange={handlePdfUpload}
          />
        </div>

        {/* Guide */}
        <div className="mt-8 card p-5">
          <h2 className="text-sm font-bold mb-3">📌 使用说明</h2>
          <ol className="space-y-2 text-xs text-[var(--text-muted)] list-decimal list-inside">
            <li>上传 Logo：选择图片文件，上传成功后刷新网站即可看到新图标</li>
            <li>上传安装包：先选择系统类型（Windows/macOS），再选择文件；上传完成后下载页会自动显示真实下载链接</li>
            <li>上传 PDF：知识库文件上传后可在学院课程中引用，用户可对话查询</li>
            <li>如遇"需要认证"提示，请在 GitHub 仓库 Releases 页面手动上传大文件（安装包）</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
