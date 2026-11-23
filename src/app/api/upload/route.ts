import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const path = formData.get("path") as string;

    if (!file || !path) {
      return NextResponse.json({ error: "Missing file or path" }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "GITHUB_TOKEN not configured" }, { status: 500 });
    }

    // Read file as base64
    const ab = await file.arrayBuffer();
    const bytes = new Uint8Array(ab);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const b64 = btoa(binary);

    const owner = "zhangshouli678";
    const repo = "xiaobaiopc";
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    // Check if file exists (get sha)
    let sha: string | undefined;
    const checkResp = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "xiaobaiopc-admin",
      },
    });
    if (checkResp.ok) {
      const existing = await checkResp.json() as { sha?: string };
      sha = existing.sha;
    }

    // Upload
    const body: Record<string, string> = {
      message: `upload: ${file.name} via admin panel`,
      content: b64,
    };
    if (sha) body.sha = sha;

    const uploadResp = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "xiaobaiopc-admin",
      },
      body: JSON.stringify(body),
    });

    if (!uploadResp.ok) {
      const err = await uploadResp.text();
      return NextResponse.json({ error: err }, { status: uploadResp.status });
    }

    const data = await uploadResp.json() as { content?: { download_url?: string; html_url?: string } };
    const url = data.content?.download_url || `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;

    return NextResponse.json({ success: true, url, path });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
