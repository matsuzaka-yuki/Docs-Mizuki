---
title: Live2D配置
createTime: 2025/08/17 17:21:41
permalink: /Feature/pio/
---

::: tip 提示
看板娘配置文件位于 `src/config.ts` 文件中的 `pioConfig` 对象。
:::
可以按照需要开启或关闭看板娘功能。
```typescript
// Pio 看板娘配置
export const pioConfig: import("./types/config").PioConfig = {
	enable: true, // 启用看板娘
	models: ["/pio/models/pio/model.json"], // 默认模型路径
	position: "left", // 默认位置在右侧
	width: 280, // 默认宽度
	height: 250, // 默认高度
	mode: "draggable", // 默认为可拖拽模式
	hiddenOnMobile: true, // 默认在移动设备上隐藏
	dialog: {
		welcome: "Welcome to Mizuki Website!", // 欢迎词
		touch: [
			"What are you doing?",
			"Stop touching me!",
			"HENTAI!",
			"Don't bully me like that!",
		], // 触摸提示
		home: "Click here to go back to homepage!", // 首页提示
		skin: ["Want to see my new outfit?", "The new outfit looks great~"], // 换装提示
		close: "QWQ See you next time~", // 关闭提示
		link: "https://github.com/matsuzaka-yuki/Mizuki", // 关于链接
	},
};
```
### 配置项详解
- `enable`：启用或禁用看板娘功能。
- `models`：指定看板娘模型的路径数组，可以添加多个模型。
- `position`：设置看板娘显示的位置，可选值为 `"left"` 或 `"right"`。
- `width` 和 `height`：设置看板娘的宽度和高度。
- `mode`：设置看板娘的交互模式，可选值为 `"draggable"`（可拖拽）或 `"fixed"`（固定位置）。
- `hiddenOnMobile`：在移动设备上隐藏看板娘，提升移动端用户体验。
- `dialog`：配置看板娘的对话内容，包括欢迎词、触摸提示、首页提示、换装提示、关闭提示和关于链接。
### 使用说明
1. 将看板娘模型文件放置在 `public/pio/models/`
2. 根据需要修改 `pioConfig` 对象中的配置项。
3. 保存配置文件并重新启动博客以应用更改。
4. 访问博客页面，即可看到看板娘出现在指定位置，并根据配置进行交互。
### 注意事项
- 确保模型路径正确，否则看板娘将无法显示。
- 看板娘功能可能会影响页面加载速度，建议根据实际需求启用或禁用。
- 在移动设备上启用 `hiddenOnMobile` 选项，以避免影响用户体验。
- 对话内容可以根据个人喜好进行修改，使看板娘更加个性化。
### 示例配置
```typescript
// Pio 看板娘配置
export const pioConfig: import("./types/config").PioConfig = {
	enable: true, // 启用看板娘
	models: ["/pio/models/pio/model.json"], // 默认模型路径
	position: "left", // 默认位置在右侧
	width: 280, // 默认宽度
	height: 250, // 默认高度
	mode: "draggable", // 默认为可拖拽模式
	hiddenOnMobile: true, // 默认在移动设备上隐藏
	dialog: {
		welcome: "欢迎来到 Mizuki 网站！", // 欢迎词
		touch: [
			"你在干什么？",
			"再摸我就报警了！",
			"HENTAI!",
			"不可以这样欺负我啦！",
		], // 触摸提示
		home: "点击这里回到首页！", // 首页提示
		skin: ["想看看我的新衣服吗？", "新衣服真漂亮~"], // 换装提示
		close: "QWQ 下次再见吧~", // 关闭提示
		link: "https://github.com/matsuzaka-yuki/Mizuki", // 关于链接
	},
};
```