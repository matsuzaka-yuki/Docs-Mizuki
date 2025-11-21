---
title: 纯色背景配置
createTime: 2025/11/20 19:38:55
permalink: /Basic-Layout/layout/hide/
---

**无图布局配置说明**
无图布局配置位于 `src/config.ts` 文件中的 `wallpaperMode` 对象，控制博客的整体布局设置。

```typescript title="src/config.ts"
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
把`defaultMode`设置成`none`可以默认使用和`Fuwari`主题一样的无背景风格,不需要特别配置!
