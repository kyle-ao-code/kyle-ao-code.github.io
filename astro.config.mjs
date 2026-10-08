import { defineConfig } from 'astro/config';
// 部署到 GitHub Pages 时按仓库名设置 SITE 和 BASE（用户主页仓库 BASE 为 /）
export default defineConfig({
  site: process.env.SITE || 'https://example.github.io',
  base: process.env.BASE || '/',
});
