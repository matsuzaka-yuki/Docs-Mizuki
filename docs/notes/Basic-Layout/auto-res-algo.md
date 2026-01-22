---
title: 页面自动缩放配置说明
createTime: 2026/01/22 10:00:00
permalink: /Basic-Layout/auto-res-algo/
copyright:
  author:
    name: Leaf-0w0
    url: https://github.com/Leaf-0w0
---

页面自动缩放配置位于 `src/config.ts` 文件中的 `pageScaling` 对象，控制页面的自动缩放行为。
```typescript title="src/config.ts"
// 页面自动缩放配置
	pageScaling: {
		enable: true, // 是否开启自动缩放
		targetWidth: 2000, // 目标宽度，低于此宽度时开始缩放
	},
```
- `enable`：是否开启自动缩放功能，设置为 `true` 则启用页面自动缩放，设置为 `false` 则禁用
- `targetWidth`：目标宽度，当页面宽度低于此值时开始缩放，默认值为 2000