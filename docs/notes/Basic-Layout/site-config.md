---
title: 基础配置
createTime: 2025/08/17 17:21:41
permalink: /Basic-Layout/site-config/
---

**站点配置说明**

站点配置位于 `src/config.ts` 文件中的 `siteConfig` 对象，控制博客的基本信息和全局设置。

## 配置项详解

### 基本信息

```typescript title="src/config.ts"
const SITE_LANG = "en"; // 语言代码，例如：'en', 'zh_CN', 'ja' 等。
const SITE_TIMEZONE = 8; //设置你的网站时区 from -12 to 12 default in UTC+8
export const siteConfig: SiteConfig = {
	title: "Mizuki",
	subtitle: "One demo website",
	siteURL: "https://mizuki.mysqil.com/", // 请替换为你的站点URL，以斜杠结尾
	siteStartDate: "2025-01-01", // 站点开始运行日期，用于站点统计组件计算运行天数

	timeZone: SITE_TIMEZONE,

	lang: SITE_LANG,

	themeColor: {
		hue: 230, // 主题色的默认色相，范围从 0 到 360。例如：红色：0，青色：200，蓝绿色：250，粉色：345
		fixed: false, // 对访问者隐藏主题色选择器
	},
```
- `siteStartDate`：站点开始运行日期，格式为 `YYYY-MM-DD`，用于站点统计组件计算运行天数
- `siteURL`：你的网站 URL，必须以斜杠结尾，例如 `https://example.com/`
- `title`：网站的主标题，显示在浏览器标签页和页面头部
- `subtitle`：网站的副标题，通常显示在主页横幅下方
- `lang`：网站的默认语言，影响日期格式、翻译等功能
- `timeZone`：网站的时区设置，影响日期显示和时间计算
- `themeColor`：网站的主题色配置
  - `hue`：主题色的色相值，可以是 0-360 之间的任何数值
    - 红色: 0
    - 青色: 200
    - 蓝绿色: 250
    - 粉色: 345
  - `fixed`：设置为 `true` 时，访客将无法更改主题色

### 特色页面开关配置
```typescript
// 特色页面开关配置(关闭不在使用的页面有助于提升SEO,关闭后直接在顶部导航删除对应的页面就行)
	featurePages: {
		anime: true, // 番剧页面开关
		diary: true, // 日记页面开关
		friends: true, // 友链页面开关
		projects: true, // 项目页面开关
		skills: true, // 技能页面开关
		timeline: true, // 时间线页面开关
		albums: true, // 相册页面开关
		devices: true, // 设备页面开关
	},
```
- `featurePages`：控制特色页面的启用状态(关闭后系统会返回404状态码)
  - `anime`：番剧页面
  - `diary`：日记页面
  - `friends`：友链页面
  - `projects`：项目页面
  - `skills`：技能页面
  - `timeline`：时间线页面
  - `albums`：相册页面
  - `devices`：设备页面

### 顶栏标题配置
```typescript
	// 顶栏标题配置
	navbarTitle: {
		// 显示模式："text-icon" 显示图标+文本，"logo" 仅显示Logo
		mode: "logo",
		// 顶栏标题文本
		text: "MizukiUI",
		// 顶栏标题图标路径，默认使用 public/assets/home/home.png
		icon: "assets/home/home.png",
		// 网站Logo图片路径
		logo: "assets/home/default-logo.png",
	},
```
- `navbarTitle`：控制顶栏标题的显示
  - `mode`：显示模式，`"text-icon"` 显示图标+文本，`"logo"` 仅显示Logo
  - `text`：顶栏标题文本
  - `icon`：顶栏标题图标路径，默认使用 `public/assets/home/home.png`
    - 图标建议尺寸：32x32 像素，格式为 PNG 或 WebP
  - `logo`：网站Logo图片路径

## 首页布局配置

### 文章区域布局配置
```typescript
	homeLayout: {
		// 默认布局模式："list" 列表模式（单列布局），"grid" 网格模式（双列布局）
		defaultMode: "list",
		// 是否允许用户切换布局
		allowSwitch: true,
	},
  // 标签样式配置
	tagStyle: {
		// 是否使用新样式（悬停高亮样式）还是旧样式（外框常亮样式）
		useNewStyle: false,
	},
```
- `homeLayout`：控制首页布局的显示
  - `defaultMode`：默认布局模式，`"list"` 列表模式（单列布局）或 `"grid"` 网格模式（双列布局）
  - `allowSwitch`：是否允许用户切换布局
- `tagStyle`：标签样式配置
  - `useNewStyle`：是否使用新样式（悬停高亮样式）还是旧样式（外框常亮样式）


### 整体布局配置
```typescript
// 整体布局配置
	wallpaperMode: {
		// 默认壁纸模式：banner=顶部横幅，fullscreen=全屏壁纸，none=无壁纸
		defaultMode: "banner",
		// 整体布局方案切换按钮显示设置（默认："desktop"）
		// "off" = 不显示
		// "mobile" = 仅在移动端显示
		// "desktop" = 仅在桌面端显示
		// "both" = 在所有设备上显示
		showModeSwitchOnMobile: "desktop",
	},
```
- `wallpaperMode`：整体布局配置
  - `defaultMode`：默认壁纸模式，`"banner"` 顶部横幅，`"fullscreen"` 全屏壁纸，`"none"` 无壁纸
  - `showModeSwitchOnMobile`：整体布局方案切换按钮显示设置，`"off"` 不显示，`"mobile"` 仅在移动端显示，`"desktop"` 仅在桌面端显示，`"both"` 在所有设备上显示