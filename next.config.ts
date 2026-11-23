import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出：产出纯静态文件，可直接上传到阿里云 OSS / CDN 托管
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
