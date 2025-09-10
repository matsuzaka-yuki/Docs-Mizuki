---
title: 看板娘配置(Live2D)
createTime: 2025/08/17 17:21:41
permalink: /config/pio/
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