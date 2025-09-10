/**
 * English Notes Configuration
 * @see https://theme-plume.vuejs.press/guide/document/ View documentation for configuration details.
 *
 * English Notes configuration file, imported in `.vuepress/plume.config.ts`.
 */

import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const NoteEn = defineNoteConfig({
  dir: 'en',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/',
  // 手动配置侧边栏结构
  sidebar: [
    {
      text: 'Getting Started',
      icon: 'ri:book-open-line',
      prefix: '/en/guide/',
      collapsed: false,
      items: [
        { text: 'Introduction', link: 'intro/', icon: 'ri:information-line' },
        { text: 'Quick Start', link: 'get-started/', icon: 'ri:rocket-line' },
        { text: 'Deployment', link: 'deployment/', icon: 'ri:server-line' },
      ],
    },
    {
      text: 'Configuration',
      icon: 'ri:settings-2-line',
      prefix: '/en/config/',
      collapsed: true,
      items: [
        { text: 'Site Config', link: 'site-config/', icon: 'ri:global-line' },
        { text: 'Live2D Config', link: 'pio/', icon: 'ri:robot-line' },
        { text: 'Footer Config', link: 'footer-config/', icon: 'ri:layout-bottom-line' },
        { text: 'Profile Config', link: 'profile-config/', icon: 'ri:user-settings-line' },
        { text: 'Navbar Config', link: 'navbar-config/', icon: 'ri:menu-line' },
        { text: 'Other Config', link: 'other-config/', icon: 'ri:settings-6-line' },
        { text: 'Umami Config', link: 'umami-config/', icon: 'ri:bar-chart-line' },
      ]
    },
    {
      text: 'Writing Articles',
      icon: 'akar-icons:pencil',
      prefix: '/en/press/',
      collapsed: true,
      items: [
        { text: 'Markdown', link: 'md/', icon: 'ri:markdown-line' },
        { text: 'Files', link: 'file/', icon: 'ri:file-text-line' },
        { text: 'Folders', link: 'folder/', icon: 'ri:folder-line' },
        { text: 'Article Encryption', link: 'key/', icon: 'ri:key-line' },
        { text: 'Charts', link: 'chart/', icon: 'ri:pie-chart-line' },
      ]
    },
    {
     text: 'Special Features',
     icon: 'ri:star-line',
     prefix: '/en/special/',
     collapsed: true,
     items: [
        { text: 'About', link: 'about/', icon: 'ri:information-line' },
        { text: 'Diary', link: 'diary/', icon: 'ri:book-line' },
        { text: 'Friends', link: 'friends/', icon: 'ri:links-line' },
        { text: 'Anime', link: 'anime/', icon: 'ri:tv-line' },
        { text: 'Gallery', link: 'gallery/', icon: 'ri:image-line' },
        { text: 'Others', link: 'other/', icon: 'ri:more-line' },
     ] 
    },
    {
      text: 'Migration Guide',
      icon: 'ri:git-branch-line',
      prefix: '/en/transfer/',
      collapsed: true,
      items: [
        { text: 'Gridea Import', link: 'gridea-import/', icon: 'ri:download-cloud-line' },
        { text: 'Halo Migration', link: 'halo-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'Hexo Migration', link: 'hexo-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'HTML Import', link: 'html-import/', icon: 'ri:html5-line' },
        { text: 'Hugo Migration', link: 'hugo-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'Jekyll Migration', link: 'jekyll-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'Markdown Import', link: 'markdown-import/', icon: 'ri:markdown-line' },
        { text: 'Typecho Migration', link: 'typecho-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'WordPress Migration', link: 'wordpress-to-mizuki/', icon: 'ri:wordpress-line' },
        { text: 'Z-Blog Import', link: 'zblog-import/', icon: 'ri:download-cloud-line' },
      ]
    },
  ],
})

export default defineNotesConfig({
  dir: 'en',
  link: '/en/',
  notes: [NoteEn],
})