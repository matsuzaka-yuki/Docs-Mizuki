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
        { text: '介绍', link: 'intro/', icon: 'ri:information-line',},
        { text: '快速开始', link: 'get-started/', icon: 'ri:rocket-line', },
         {
      text: '部署',
      icon: 'ri:book-open-line',
      prefix: '/guide/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: 'Vercel', link: 'deploy/Vercel/', icon: 'ri:vercel-line' ,badge: { type: 'warning', text: '推荐' } },
        { text: 'Netlify', link: 'deploy/Netlify/', icon: 'ri:cloud-line' },
        { text: 'GitHub Pages', link: 'deploy/Github/', icon: 'ri:github-line' ,badge: { type: 'danger', text: '不推荐' },},
        { text: 'Cloudflare Pages', link: 'deploy/Cloudflare/', icon: 'ri:cloud-line'},
        { text: 'EdgeOne Pages', link: 'deploy/Edge/', icon: 'ri:cloud-line', badge: { type: 'warning', text: '推荐' } },
        { text: '服务器部署', link: 'deploy/server/', icon: 'ri:server-line', badge: { type: 'info', text: '入门' } },
        { text: 'Docker部署', link: 'deploy/docker/', icon: 'ri:ship-line' },
        { text: '本地构建', link: 'deploy/local/', icon: 'ri:computer-line', badge: { type: 'info', text: '入门' } },
      ],
    },
      ],
    },
    {
      text: '基础布局',
      icon: 'ri:layout-2-line',
      prefix: '/Basic-Layout/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: '基础配置', link: 'site-config/', icon: 'ri:settings-3-line' },
        {
      text: '整体布局',
      icon: 'ri:layout-2-line',
      prefix: '/Basic-Layout/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: '横幅配置', link: 'layout/banner/', icon: 'ri:layout-top-line' ,badge: { type: 'warning', text: '新' },},
        { text: '全屏布局', link: 'layout/fullscreen/', icon: 'ri:fullscreen-line' ,badge: { type: 'warning', text: '新' },},
        { text: '纯色背景配置', link: 'layout/hide/', icon: 'ri:paint-brush-line' ,badge: { type: 'warning', text: '新' },},
      ]
    },
        { text: '页脚配置', link: 'footer/', icon: 'ri:layout-bottom-line' },
        { text: '页面自动缩放配置', link: 'auto-res-algo/', icon: 'ri:fullscreen-exit-line' ,badge: { type: 'warning', text: '新' },},
        { text: '导航栏配置', link: 'navBarConfig/', icon: 'ri:menu-line' ,badge: { type: 'info', text: 'v2' },},
        { text: '自定义字体', link: 'font/', icon: 'ri:font-size-2',badge: { type: 'info', text: 'v3' }, },
      ]
    },
     {
      text: '文章布局',
      icon: 'ri:file-text-line',
      prefix: '/Article-layout/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: '目录导航配置', link: 'toc/', icon: 'ri:list-check-2' ,badge: { type: 'warning', text: '新' },},
        { text: '分享组件配置', link: 'share/', icon: 'ri:share-line' ,badge: { type: 'warning', text: '新' },},
        { text: '编辑历史', link: 'Edit-History/', icon: 'ri:history-line' },
        { text: '版权信息配置', link: 'copyright/', icon: 'ri:copyright-line' },
        { text: '代码块配置', link: 'codeblock/', icon: 'ri:code-line' ,badge: { type: 'info', text: 'v3' },},
        { text: 'Twikoo评论系统配置', link: 'Twikoo/', icon: 'ri:message-3-line' },
      ]
    },
    {
      text: '特色组件',
      icon: 'ri:magic-line',
      prefix: '/Feature/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: '音乐播放器配置', link: 'MusicPlayer/', icon: 'ri:music-2-line' },
        { text: 'Live2d', link: 'pio/', icon: 'ri:robot-line' },
        { text: '樱花飘落特效配置', link: 'sakura/', icon: 'ri:plant-line' },
        { text: 'Umami配置', link: 'umami-config/', icon: 'ri:bar-chart-2-line' ,badge: { type: 'info', text: 'v3' },},
      ]
    },
    {
      text: '侧边栏布局',
      icon: 'ri:sidebar-unfold-line',
      prefix: '/Sidepanel/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: '基础位置配置', link: 'global/', icon: 'ri:layout-grid-line' ,badge: { type: 'info', text: 'v2' },},
        { text: '个人资料组件配置', link: 'profile/', icon: 'ri:user-smile-line' },
        { text: '公告组件配置', link: 'announcement/', icon: 'ri:notification-3-line' },
        { text: '分类组件配置', link: 'categories/', icon: 'ri:folder-open-line' },
        { text: '标签组件配置', link: 'tag/', icon: 'ri:price-tag-3-line' },
        { text: '站点统计组件配置', link: 'site-stats/', icon: 'ri:bar-chart-box-line' ,badge: { type: 'warning', text: '新' },},
        { text: '日历组件配置', link: 'calendar/', icon: 'ri:calendar-event-line' ,badge: { type: 'warning', text: '新' },},
      ]
    },
        {
     text: '页面配置',
     icon: 'ri:star-line',
     prefix: '/special/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
     collapsed: true, // 是否默认折叠
     items: [
        { text: '关于页面', link: 'about/', icon: 'ri:information-line' },
        { text: '日记页面', link: 'diary/', icon: 'ri:book-line' },
        { text: '友链页面', link: 'friends/', icon: 'ri:links-line' ,badge: { type: 'info', text: 'v3' },},
        { text: '项目页面', link: 'projects/', icon: 'ri:code-s-slash-line' },
        { text: '时间线页面', link: 'timeline/', icon: 'ri:time-line' },
        { text: '技能页面', link: 'skills/', icon: 'ri:lightbulb-line' },
        { text: '设备页面', link: 'devices/', icon: 'ri:computer-line'  ,badge: { type: 'warning', text: '新' },},
        { text: '番剧页面', link: 'anime/', icon: 'ri:tv-line' ,badge: { type: 'info', text: 'v4' },},
        { text: '相册页面', link: 'gallery/', icon: 'ri:image-line' ,badge: { type: 'info', text: 'v2' },},
     ]  
    },
    {
      text: '编写文章',
      icon: 'akar-icons:pencil',
      prefix: '/press/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        {
          text: 'Markdown',
          icon: 'ri:book-2-line',
          collapsed: true, // 是否默认折叠
          items: [
            { text: '基础', link: 'Markdown/Markdown/', icon: 'ri:markdown-line' },
            { text: '增强', link: 'Markdown/customize/', icon: 'ri:markdown-line', badge: { type: 'info', text: 'v2' } },
            { text: '图表', link: 'Markdown/chart/', icon: 'ri:pie-chart-line' },
          ]
        },
        {
          text: '组织',
          icon: 'ri:folder-settings-line',
          collapsed: true, // 是否默认折叠
          items: [
            { text: '文件', link: 'file/', icon: 'ri:file-text-line' },
            { text: '文件夹', link: 'folder/', icon: 'ri:folder-line' ,badge: { type: 'danger', text: '推荐' },},
          ]
        },
        {
          text: '高级',
          icon: 'ri:settings-3-line',
          collapsed: true, // 是否默认折叠
          items: [
            { text: '文章加密(可选)', link: 'key/', icon: 'ri:key-line' },
            { text: '固定链接', link: 'permalink/', icon: 'ri:link', badge: { type: 'warning', text: '新' } },
            { text: '图片语法', link: 'image/', icon: 'ri:image-line', badge: { type: 'warning', text: '新' } },
          ]
        },
        {
          text: '资源嵌入',
          icon: 'ri:video-line',
          collapsed: true, // 是否默认折叠
          items: [
            { text: 'Bilibili 视频', link: 'video/bilibili/', icon: 'ri:bilibili-line' },
            { text: 'Youtube 视频', link: 'video/youtube/', icon: 'ri:youtube-line'},
          ]
        },
      ]
    },
    {
     text: '内容分离',
     icon: 'ri:database-2-line',
     badge: { type: 'warning', text: '新' },
     prefix: '/Other/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
     collapsed: true, // 是否默认折叠
     items: [
        { text: '内容分离', link: 'separation/', icon: 'ri:divide-line' },
        { text: '仓库结构', link: 'structure/', icon: 'ri:folder-chart-line' },
        { text: '自动构建', link: 'auto/', icon: 'ri:git-merge-line' },
        { text: '迁移指南', link: 'migration/', icon: 'ri:arrow-left-right-line' },
     ] 
    },
    
    

    
    {
      text: '迁移指南',
      icon: 'ri:git-branch-line',
      prefix: '/transfer/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: 'Gridea导入', link: 'gridea-import/', icon: 'ri:download-cloud-line' , badge: { type: 'info', text: '简单' },},
        { text: 'Halo迁移', link: 'halo-to-mizuki/', icon: 'ri:exchange-line', badge: { type: 'warning', text: '中等' },},
        { text: 'Hexo迁移', link: 'hexo-to-mizuki/', icon: 'ri:exchange-line' , badge: { type: 'info', text: '简单' },},
        { text: 'HTML导入', link: 'html-import/', icon: 'ri:html5-line', badge: { type: 'info', text: '简单' }, },
        { text: 'Hugo迁移', link: 'hugo-to-mizuki/', icon: 'ri:exchange-line' , badge: { type: 'info', text: '简单' },},
        { text: 'Jekyll迁移', link: 'jekyll-to-mizuki/', icon: 'ri:exchange-line', badge: { type: 'warning', text: '中等' }, },
        { text: 'Markdown导入', link: 'markdown-import/', icon: 'ri:markdown-line' , badge: { type: 'info', text: '简单' },},
        { text: 'Typecho迁移', link: 'typecho-to-mizuki/', icon: 'ri:exchange-line' , badge: { type: 'warning', text: '中等' },},
        { text: 'WordPress迁移', link: 'wordpress-to-mizuki/', icon: 'ri:wordpress-line', badge: { type: 'danger', text: '困难' },},
        { text: 'Z-Blog导入', link: 'zblog-import/', icon: 'ri:download-cloud-line', badge: { type: 'danger', text: '困难' }, },
      ]
    },
     {
      text: 'API 文档',
      icon: 'ri:code-s-slash-line',
      prefix: '/API/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
        { text: 'Bangumi API', link: 'bangumi/', icon: 'ri:film-line' },
        { text: 'Meting API', link: 'metings/', icon: 'ri:music-2-line' },
        { text: 'PicFlow API', link: 'picflow/', icon: 'ri:image-2-line', badge: { type: 'warning', text: '新' } },
      ]
    },
    {
      text: '常见问题',
      icon: 'ri:question-line',
      prefix: '/problem/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      collapsed: true, // 是否默认折叠
      items: [
       { text: '提问的艺术', link: 'question/', icon: 'ri:question-line' ,badge: { type: 'danger', text: '必看' },},
       { text: 'WordPress相关问题', link: 'wordpress/', icon: 'ri:wordpress-line' },
       { text: 'Typecho相关问题', link: 'type/', icon: 'ri:file-code-line' },
       { text: '错误排查问题', link: 'error/', icon: 'ri:bug-line', badge: { type: 'warning', text: '常见' },},
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

