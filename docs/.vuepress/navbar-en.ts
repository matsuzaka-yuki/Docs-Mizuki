/**
 * English Navbar Configuration
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * English Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  { text: 'Guide', link: '/en/guide/get-started/' }
])