---
title: 其他配置说明
createTime: 2025/08/17 17:21:41
permalink: /config/other-config/
---

**其他配置说明**

除了站点、导航栏和个人资料配置外，Mizuka 还提供了其他几种配置选项，包括许可证、代码块和评论系统。

## 许可证配置

许可证配置位于 `src/config.ts` 文件中的 `licenseConfig` 对象，控制文章底部的许可证显示。

```typescript
export const licenseConfig: LicenseConfig = {
  enable: true,                   // 是否启用许可证显示
  name: "CC BY-NC-SA 4.0",      // 许可证名称
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", // 许可证链接
};
```

- `enable`：设置为 `false` 可隐藏文章底部的许可证信息
- `name`：显示的许可证名称
- `url`：许可证详情页面的链接

## 代码块配置

代码块配置位于 `src/config.ts` 文件中的 `expressiveCodeConfig` 对象，控制代码块的显示样式。

```typescript
export const expressiveCodeConfig: ExpressiveCodeConfig = {
  // 注意：某些样式（如背景色）已被覆盖，请参见 astro.config.mjs 文件
  // 请选择深色主题，因为此博客主题目前仅支持深色背景
  theme: "github-dark",  // 代码块主题
};
```

- `theme`：代码块的语法高亮主题
  - 建议使用深色主题，因为 Mizuka 主题目前仅支持深色背景
  - 可选主题包括：`github-dark`、`dracula`、`one-dark` 等

## 评论系统配置

评论系统配置位于 `src/config.ts` 文件中的 `commentConfig` 对象，控制文章底部的评论系统。

```typescript
export const commentConfig: CommentConfig = {
  enable: false,  // 是否启用评论功能
  twikoo: {
    envId: "https://app.twikoo.js.org", // Twikoo 环境 ID
  },
};
```

- `enable`：设置为 `true` 启用评论功能
- `twikoo.envId`：Twikoo 评论系统的环境 ID
  - 需要先在 [Twikoo](https://twikoo.js.org/) 上创建环境并获取环境 ID

### 启用评论系统

要启用评论系统，请按以下步骤操作：

1. 在 [Twikoo](https://twikoo.js.org/) 上创建环境并获取环境 ID
2. 将 `enable` 设置为 `true`
3. 将 `twikoo.envId` 更新为您的环境 ID

```typescript
export const commentConfig: CommentConfig = {
  enable: true,
  twikoo: {
    envId: "https://your-env-id.vercel.app", // 替换为您的环境 ID
  },
};
```

## 公告功能配置说明

```typescript
export const announcementConfig: AnnouncementConfig = {
	enable: true, // 启用公告功能
	title: "Announcement", // 公告标题
	content: "Welcome to my blog! This is a sample announcement.", // 公告内容
	closable: true, // 允许用户关闭公告
	link: {
		enable: true, // 显示链接按钮
		text: "Learn More", // 链接文本
		url: "/about/", // 链接地址
		external: true, // 是否显示外部链接按钮
	},
};

```

- `enable`：设置为 `false` 可隐藏公告
- `title`：公告标题
- `content`：公告内容
- `closable`：设置为 `true` 可允许用户关闭公告
- `link.enable`：设置为 `true` 可显示链接按钮
- `link.text`：链接按钮文本
- `link.url`：链接按钮 URL
- `link.external`：设置为 `true` 可显示外部链接标记按钮


## 悬浮音乐播放器配置说明
1.首先在配置文件将 `enable` 设置为 `true`
```typescript
export const musicPlayerConfig: MusicPlayerConfig = {
	enable: true, // Enable music player feature
};
```

2.在`src/components/widget/MusicPlayer.svelte`里面填写配置选择播放方案

音乐播放器模式，可选 "local"(调用本地曲库配置) 或 "meting"(调用meting api配置)，从本地配置中获取或使用默认值 "meting"

设置这样为调用Meting API播放音乐,需要你自己完善参数
```typescript
let mode = musicPlayerConfig.mode ?? "meting";
```
本地播放列表配置，当选择本地播放列表时，需要配置本地播放列表
```typescript

const localPlaylist = [
	{
		id: 1,
		title: "ひとり上手",
		artist: "Kaya",
		cover: "assets/music/cover/hitori.jpg",
		url: "assets/music/url/hitori.mp3",
		duration: 240,
	},
	{
		id: 2,
		title: "ハーピィハーピィ",
		artist: "Kaya",
		cover: "assets/music/cover/harp.jpg",
		url: "assets/music/url/harp.mp3",
		duration: 240,
	},]
```
路径的相对于`public`目录的,这点需要注意


## 侧边栏布局配置 (`sidebarLayoutConfig`)

此配置用于控制网站侧边栏的显示、排序、动画和响应式行为。您可以在 `src/config.ts` 文件中找到并修改它。

### 主要配置项：

*   **`enable`**: `boolean`
    *   是否启用侧边栏功能。设置为 `true` 启用，`false` 禁用。
    *   默认值：`true`

*   **`position`**: `"left" | "right"`
    *   侧边栏在页面中的位置。可选值：`"left"`（左侧）或 `"right"`（右侧）。
    *   默认值：`"left"`

*   **`components`**: `Array<Object>`
    *   一个数组，定义了侧边栏中包含的各个组件及其配置。每个组件对象包含以下属性：
        *   **`type`**: `string`
            *   组件类型，例如：`"profile"`（用户资料）、`"announcement"`（公告）、`"categories"`（分类）、`"tags"`（标签）。
        *   **`enable`**: `boolean`
            *   是否启用该组件。设置为 `true` 启用，`false` 禁用。
        *   **`order`**: `number`
            *   组件的显示顺序。数字越小，组件在侧边栏中显示得越靠前。
        *   **`position`**: `"top" | "sticky"`
            *   组件在侧边栏中的定位方式。可选值：
                *   `"top"`: 固定在侧边栏顶部，不随滚动条滚动。
                *   `"sticky"`: 粘性定位，在滚动时保持可见。
        *   **`class`**: `string`
            *   应用于组件的 CSS 类名，可用于自定义样式或动画。
        *   **`animationDelay`**: `number`
            *   组件动画的延迟时间（毫秒）。用于错开不同组件的动画效果。
        *   **`responsive`**: `Object` (可选)
            *   针对特定组件的响应式配置。例如，`categories` 和 `tags` 组件可以配置 `collapseThreshold`：
                *   **`collapseThreshold`**: `number`
                    *   折叠阈值。当组件内的项目数量超过此值时，组件内容将自动折叠。

### 默认动画配置 (`defaultAnimation`)：

*   **`enable`**: `boolean`
    *   是否启用侧边栏组件的默认动画效果。
    *   默认值：`true`

*   **`baseDelay`**: `number`
    *   动画的基础延迟时间（毫秒）。
    *   默认值：`0`

*   **`increment`**: `number`
    *   每个组件依次增加的动画延迟时间（毫秒）。例如，第一个组件延迟 `baseDelay`，第二个组件延迟 `baseDelay + increment`，以此类推。
    *   默认值：`50`

### 响应式布局配置 (`responsive`)：

*   **`breakpoints`**: `Object`
    *   定义不同设备的屏幕宽度断点（像素值）：
        *   **`mobile`**: 移动设备断点（例如：`768`）。
        *   **`tablet`**: 平板设备断点（例如：`1024`）。
        *   **`desktop`**: 桌面设备断点（例如：`1280`）。

*   **`layout`**: `Object`
    *   定义在不同设备断点下的侧边栏布局模式：
        *   **`mobile`**: 移动设备下的布局模式。可选值：`"hidden"`（不显示侧边栏）或 `"sidebar"`（显示侧边栏，通常为抽屉模式）。
        *   **`tablet`**: 平板设备下的布局模式。可选值：`"hidden"` 或 `"sidebar"`。
        *   **`desktop`**: 桌面设备下的布局模式。可选值：`"hidden"` 或 `"sidebar"`。

### 示例：

```typescript:/c:/Users/Administrator/Desktop/mizuki/src/config.ts
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	enable: true,
	position: "left",
	components: [
		{
			type: "profile",
			enable: true,
			order: 1,
			position: "top",
			class: "onload-animation",
			animationDelay: 0,
		},
		{
			type: "announcement",
			enable: true,
			order: 2,
			position: "top",
			class: "onload-animation",
			animationDelay: 50,
		},
		{
			type: "categories",
			enable: true,
			order: 3,
			position: "sticky",
			class: "onload-animation",
			animationDelay: 150,
			responsive: {
				collapseThreshold: 5,
			},
		},
		{
			type: "tags",
			enable: true,
			order: 4,
			position: "sticky",
			class: "onload-animation",
			animationDelay: 200,
			responsive: {
				collapseThreshold: 20,
			},
		},
	],

	defaultAnimation: {
		enable: true,
		baseDelay: 0,
		increment: 50,
	},

	responsive: {
		breakpoints: {
			mobile: 768,
			tablet: 1024,
			desktop: 1280,
		},
		layout: {
			mobile: "sidebar",
			tablet: "sidebar",
			desktop: "sidebar",
		},
	},
};
```