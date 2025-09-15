/**
 * Japanese Navbar Configuration
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Japanese Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: 'ホーム', link: '/ja/' },
  { text: 'ガイド', link: '/ja/guide/get-started/' }
])