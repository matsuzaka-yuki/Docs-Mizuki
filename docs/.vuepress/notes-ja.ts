/**
 * Japanese Notes Configuration
 * @see https://theme-plume.vuejs.press/guide/document/ View documentation for configuration details.
 *
 * Japanese Notes configuration file, imported in `.vuepress/plume.config.ts`.
 */

import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const NoteJa = defineNoteConfig({
  dir: 'ja',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/',
  // 手动配置侧边栏结构
  sidebar: [
    {
      text: 'はじめに',
      icon: 'ri:book-open-line',
      prefix: '/ja/guide/',
      collapsed: false,
      items: [
        { text: '紹介', link: 'intro/', icon: 'ri:information-line' },
        { text: 'クイックスタート', link: 'get-started/', icon: 'ri:rocket-line' },
        { text: 'デプロイ', link: 'deployment/', icon: 'ri:server-line' },
      ],
    },
    {
      text: '設定',
      icon: 'ri:settings-2-line',
      prefix: '/ja/config/',
      collapsed: true,
      items: [
        { text: 'サイト設定', link: 'site-config/', icon: 'ri:global-line' },
        { text: 'Live2D設定', link: 'pio/', icon: 'ri:robot-line' },
        { text: 'フッター設定', link: 'footer-config/', icon: 'ri:layout-bottom-line' },
        { text: 'プロフィール設定', link: 'profile-config/', icon: 'ri:user-settings-line' },
        { text: 'ナビバー設定', link: 'navbar-config/', icon: 'ri:menu-line' },
        { text: 'カスタムフォント設定', link: 'custom-font/', icon: 'ri:font-size' },
        { text: 'その他の設定', link: 'other-config/', icon: 'ri:settings-6-line' },
        { text: 'Umami設定', link: 'umami-config/', icon: 'ri:bar-chart-line' },
      ]
    },
    {
      text: '記事の執筆',
      icon: 'akar-icons:pencil',
      prefix: '/ja/press/',
      collapsed: true,
      items: [
        { text: 'Markdown', link: 'md/', icon: 'ri:markdown-line' },
        { text: 'ファイル', link: 'file/', icon: 'ri:file-text-line' },
        { text: 'フォルダ', link: 'folder/', icon: 'ri:folder-line' },
        { text: '記事の暗号化', link: 'key/', icon: 'ri:key-line' },
        { text: 'チャート', link: 'chart/', icon: 'ri:pie-chart-line' },
      ]
    },
    {
     text: '特別機能',
     icon: 'ri:star-line',
     prefix: '/ja/special/',
     collapsed: true,
     items: [
        { text: 'について', link: 'about/', icon: 'ri:information-line' },
        { text: '日記', link: 'diary/', icon: 'ri:book-line' },
        { text: 'フレンド', link: 'friends/', icon: 'ri:links-line' },
        { text: 'アニメ', link: 'anime/', icon: 'ri:tv-line' },
        { text: 'ギャラリー', link: 'gallery/', icon: 'ri:image-line' },
        { text: 'その他', link: 'other/', icon: 'ri:more-line' },
     ] 
    },
    {
      text: '移行ガイド',
      icon: 'ri:git-branch-line',
      prefix: '/ja/transfer/',
      collapsed: true,
      items: [
        { text: 'Grideaインポート', link: 'gridea-import/', icon: 'ri:download-cloud-line' },
        { text: 'Halo移行', link: 'halo-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'Hexo移行', link: 'hexo-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'HTMLインポート', link: 'html-import/', icon: 'ri:html5-line' },
        { text: 'Hugo移行', link: 'hugo-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'Jekyll移行', link: 'jekyll-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'Markdownインポート', link: 'markdown-import/', icon: 'ri:markdown-line' },
        { text: 'Typecho移行', link: 'typecho-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'WordPress移行', link: 'wordpress-to-mizuki/', icon: 'ri:wordpress-line' },
        { text: 'Z-Blogインポート', link: 'zblog-import/', icon: 'ri:download-cloud-line' },
      ]
    },
  ],
})

export default defineNotesConfig({
  dir: 'ja',
  link: '/ja/',
  notes: [NoteJa],
})