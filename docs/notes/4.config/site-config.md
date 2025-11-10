---
title: 站点配置说明
createTime: 2025/08/17 17:21:41
permalink: /config/site-config/
---

**站点配置说明**

站点配置位于 `src/config.ts` 文件中的 `siteConfig` 对象，控制博客的基本信息和全局设置。

## 配置项详解

### 基本信息

```typescript

// 定义站点语言
const SITE_LANG = "zh_CN"; // 语言代码，例如：'en', 'zh_CN', 'ja' 等。
const SITE_TIMEZONE =8;// 设置你的网站时区 from -12 to 12,如中国北京时间为UTC+8

export const siteConfig: SiteConfig = {
  title: "Mizuki",        // 网站标题
  subtitle: "One demo website",  // 网站副标题
  timeZone: SITE_TIMEZONE,// 不需要配置，会根据 SITE_TIMEZONE 自动设置
  lang: SITE_LANG,         // 不需要配置，会根据 SITE_LANG 自动设置
}
```

- `title`：网站的主标题，显示在浏览器标签页和页面头部
- `subtitle`：网站的副标题，通常显示在主页横幅下方
- `lang`：网站的默认语言，影响日期格式、翻译等功能

### 主题颜色

```typescript
  themeColor: {
    hue: 210,     // 主题色的色相值，范围 0-360
    fixed: false, // 是否隐藏访客的主题色选择器
  },
```

- `hue`：主题色的色相值，可以是 0-360 之间的任何数值
  - 红色: 0
  - 青色: 200
  - 蓝绿色: 250
  - 粉色: 345
- `fixed`：设置为 `true` 时，访客将无法更改主题色



### 横幅设置

横幅设置控制主页顶部的横幅显示：

```typescript
  banner: {
    enable: true,  // 是否启用横幅
    src: {         // 横幅图片路径
      desktop: [   // 桌面端图片数组
        "assets/desktop-banner/1.webp",
        "assets/desktop-banner/2.webp",
        // 支持多张图片，自动启用轮播
      ],
      mobile: [    // 移动端图片数组
        "assets/mobile-banner/1.webp",
        "assets/mobile-banner/2.webp",
        // 移动端专用图片
      ],
    },
    position: "center", // 图片对齐方式，支持 'top', 'center', 'bottom'
    
    carousel: {
      enable: true,    // 启用轮播功能（多图片时）
      interval: 1,     // 轮播间隔时间（秒）
    },
    
    homeText: {
      enable: true,    // 在首页显示自定义文本
      title: "Mizuki", // 首页横幅主标题
      subtitle: [      // 副标题数组，支持多个文本
        "One demo website",
        "Carousel Text1",
        "Carousel Text2",
      ],
      typewriter: {
        enable: true,     // 启用打字机效果
        speed: 100,       // 打字速度（毫秒）
        deleteSpeed: 50,  // 删除速度（毫秒）
        pauseTime: 2000,  // 完整显示后的暂停时间（毫秒）
      },
    },
    
    credit: {
      enable: false,    // 显示横幅图片来源文本
      text: "Describe", // 来源文本
      url: "",          // 可选：原作品或作者页面链接
    },
  },

navbar: {
		transparentMode: "semifull", // 导航栏透明模式："semi" 半透明加圆角，"full" 完全透明，"semifull" 动态透明
	},
```

#### 横幅配置详解

- **图片路径**：相对于 `/src` 目录，如果以 `/` 开头则相对于 `/public` 目录
- **轮播功能**：当图片数组长度大于1时自动启用轮播
- **响应式设计**：桌面端和移动端可使用不同的图片
- **打字机效果**：副标题支持动态打字机效果，可配置速度和暂停时间

### 目录设置

```typescript
  toc: {
    enable: true, // 是否启用目录功能
    depth: 3,     // 目录深度，1-6，1表示只显示h1标题
  },
```

- `enable`：设置为 `false` 可禁用文章目录功能
- `depth`：控制目录显示的标题层级深度



### 导航栏二级折叠菜单配置 (`navBarConfig`)

此配置用于控制网站导航栏中的二级折叠菜单。您可以在 `src/config.ts` 文件中找到并修改它。

#### 主要配置项：

*   **`links`**: `Array<Object>`
    *   一个数组，定义了导航栏中的各个链接。每个链接对象可以是一个预设链接 (`LinkPreset`)，也可以是一个自定义链接对象。
    *   自定义链接对象支持多级菜单，包含以下属性：
        *   **`name`**: `string`
            *   菜单项显示的名称。
        *   **`url`**: `string`
            *   菜单项点击后跳转的 URL。
        *   **`children`**: `Array<Object>` (可选)
            *   一个数组，定义了当前菜单项的子菜单。子菜单项的结构与顶级菜单项类似，可以继续嵌套。
            *   每个子菜单项也可以包含 `name`, `url`, `external` 等属性。
            *   **`external`**: `boolean` (可选)
                *   如果设置为 `true`，表示这是一个外部链接，会在新标签页中打开。

#### 如何创建二级折叠菜单：

要创建一个二级折叠菜单，您需要在 `navBarConfig.links` 数组中添加一个包含 `children` 属性的自定义链接对象。`children` 数组中的每个元素都将成为该菜单项的子菜单。

**示例：**

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "Links", // 一级菜单名称
			url: "/links/", // 一级菜单链接 (可选，如果只有子菜单，可以为空)
			children: [
				{
					name: "GitHub", // 二级菜单名称
					url: "https://github.com/matsuzaka-yuki/Mizuki", // 二级菜单链接
					external: true, // 外部链接
				},
				{
					name: "Bilibili",
					url: "https://space.bilibili.com/701864046",
					external: true,
				},
				{
					name: "Gitee",
					url: "https://gitee.com/matsuzakayuki/Mizuki",
					external: true,
				},
			],
		},
		{
			name: "My",
			url: "/content/",
			children: [
				LinkPreset.About,
				LinkPreset.Friends,
				LinkPreset.Anime,
				LinkPreset.Diary,
			],
		},
	],
};
```

在上述示例中：

*   `Links` 和 `My` 是一级菜单项。
*   `Links` 菜单下包含 `GitHub`, `Bilibili`, `Gitee` 三个二级子菜单，它们都是外部链接。
*   `My` 菜单下包含 `About`, `Friends`, `Anime`, `Diary` 四个二级子菜单，它们使用了预设链接 (`LinkPreset`)。

### 网站域名配置

你需要在 `astro.config.mjs` 文件中配置网站域名。

```typescript
export default defineConfig({
	site: "https://mizuki.mysqil.com/",
})
```

这只是指定网站的 URL。site属性被 Astro 用于多种用途，比如在网站页面和 RSS 订阅源中生成正确的 URL。


### 展示社交媒体分享图片(OG)

你需要在 `src/config.ts` 文件中配置OG的开启。

```typescript
generateOgImages: true, // 启用生成OpenGraph图片功能
```
