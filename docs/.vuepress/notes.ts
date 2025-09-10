/**
 * @see https://theme-plume.vuejs.press/guide/document/ 查看文档了解配置详情。
 *
 * Notes 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 *
 * 请注意，你应该先在这里配置好 Notes，然后再启动 vuepress，主题会在启动 vuepress 时，
 * 读取这里配置的 Notes，然后在与 Note 相关的 Markdown 文件中，自动生成 permalink。
 *
 * 如果你发现 侧边栏没有显示，那么请检查你的配置是否正确，以及 Markdown 文件中的 permalink
 * 是否是以对应的 note 配置的 link 的前缀开头。 是否展示侧边栏是根据 页面链接 的前缀 与 `note.link`
 * 的前缀是否匹配来决定。
 */

/**
 * 在受支持的 IDE 中会智能提示配置项。
 *
 * - `defineNoteConfig` 是用于定义单个 note 配置的帮助函数
 * - `defineNotesConfig` 是用于定义 notes 集合的帮助函数
 *
 * 通过 `defineNoteConfig` 定义的 note 配置，应该填入 `defineNotesConfig` 的 notes 数组中
 */
import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const Note = defineNoteConfig({
  dir: 'notes',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/',
  // 手动配置侧边栏结构
  sidebar: [
    {
      text: '从这里开始',
      icon: 'ri:book-open-line',
      prefix: '/guide/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: false, // 是否默认折叠
      items: [
        { text: '介绍', link: 'intro/', icon: 'ri:information-line' },
        { text: '快速开始', link: 'get-started/', icon: 'ri:rocket-line' },
        { text: '部署', link: 'deployment/', icon: 'ri:server-line' },
      ],
    },
    {
      text: '配置说明',
      icon: 'ri:settings-2-line',
      prefix: '/config/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: '站点配置', link: 'site-config/', icon: 'ri:global-line' },
        { text: '看板娘配置', link: 'pio/', icon: 'ri:robot-line' },
        { text: '页脚配置', link: 'footer-config/', icon: 'ri:layout-bottom-line' },
        { text: '个人资料配置', link: 'profile-config/', icon: 'ri:user-settings-line' },
        { text: '导航栏配置', link: 'navbar-config/', icon: 'ri:menu-line' },
        { text: '其他配置', link: 'other-config/', icon: 'ri:settings-6-line' },
        { text: 'Umami配置', link: 'umami-config/', icon: 'ri:bar-chart-line' },
      ]
    },
        {
      text: '编写文章',
      icon: 'akar-icons:pencil',
      prefix: '/press/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: 'Markdown', link: 'md/', icon: 'ri:markdown-line' },
        { text: '文件', link: 'file/', icon: 'ri:file-text-line' },
        { text: '文件夹', link: 'folder/', icon: 'ri:folder-line' },
        { text: '文章加密(可选)', link: 'key/', icon: 'ri:key-line' },
        { text: '图表', link: 'chart/', icon: 'ri:pie-chart-line' },
      ]
    },
    {
     text: '特色功能',
     icon: 'ri:star-line',
     prefix: '/special/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
     collapsed: true, // 是否默认折叠
     items: [
        { text: '关于', link: 'about/', icon: 'ri:information-line' },
        { text: '日记', link: 'diary/', icon: 'ri:book-line' },
        { text: '友链', link: 'friends/', icon: 'ri:links-line' },
        { text: '动漫', link: 'anime/', icon: 'ri:tv-line' },
        { text: '画廊', link: 'gallery/', icon: 'ri:image-line' },
        { text: '其他', link: 'other/', icon: 'ri:more-line' },
     ] 
    },
    
    {
      text: '迁移指南',
      icon: 'ri:git-branch-line',
      prefix: '/transfer/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: 'Gridea导入', link: 'gridea-import/', icon: 'ri:download-cloud-line' },
        { text: 'Halo迁移', link: 'halo-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'Hexo迁移', link: 'hexo-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'HTML导入', link: 'html-import/', icon: 'ri:html5-line' },
        { text: 'Hugo迁移', link: 'hugo-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'Jekyll迁移', link: 'jekyll-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'Markdown导入', link: 'markdown-import/', icon: 'ri:markdown-line' },
        { text: 'Typecho迁移', link: 'typecho-to-mizuki/', icon: 'ri:exchange-line' },
        { text: 'WordPress迁移', link: 'wordpress-to-mizuki/', icon: 'ri:wordpress-line' },
        { text: 'Z-Blog导入', link: 'zblog-import/', icon: 'ri:download-cloud-line' },
      ]
    },
  ],
  // 根据文件结构自动生成侧边栏
  //sidebar: 'auto',
})

/**
 * 导出所有的 note
 * 每一个 note 都应该填入到 `notes.notes` 数组中
 * （Note 为参考示例，如果不需要它，请删除）
 */
export default defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [Note],
})

