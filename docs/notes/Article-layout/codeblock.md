---
title: 代码块配置说明
createTime: 2025/11/20 20:25:15
permalink: /Article-layout/codeblock/
---
# 代码块配置说明

代码块配置位于 `src/config.ts` 文件中的 `expressiveCodeConfig` 对象，控制博客文章内代码块的显示设置。

```typescript
export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（如背景颜色）已被覆盖，请参阅 astro.config.mjs 文件。
	// 请选择深色主题，因为此博客主题目前仅支持深色背景
	theme: "github-dark",
	// 是否在主题切换时隐藏代码块以避免卡顿问题
	hideDuringThemeTransition: true,
};
```
### **代码块 (`expressiveCodeConfig`) 配置项详细说明**
#### **1. 主题 (`theme`)**

```typescript
theme: "github-dark",
```
- `theme`：代码块的显示主题，默认值为 "github-dark"。
  - 一般来说不要修改这个配置项!除非你自己有修改主题的能力!
#### **2. 主题切换时隐藏代码块 (`hideDuringThemeTransition`)**
```typescript
hideDuringThemeTransition: true,
```
- `hideDuringThemeTransition`：是否在主题切换时隐藏代码块，默认值为 `true`。
  - 为 `true` 时：在主题切换时，代码块会被隐藏，避免在切换过程中出现卡顿问题。
  - 为 `false` 时：在主题切换时，代码块会立即显示，可能会导致切换过程中出现闪烁或卡顿。
#
