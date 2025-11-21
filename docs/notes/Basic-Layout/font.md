---
title: 自定义字体
createTime: 2025/11/21 00:42:07
permalink: /Basic-Layout/font/
---

# 自定义字体配置

Mizuki 主题支持自定义字体配置，让您可以自定义站点的字体风格，提升用户体验和品牌识别度。

## 配置概述

自定义字体功能分为两种类型：

- **英文字体 (asciiFont)**：用于显示 ASCII 字符集，优先级最高
- **中日韩字体 (cjkFont)**：用于显示中文、日文、韩文等字符，作为回退字体

## 字体配置示例

在主题配置中添加以下字体配置：

```typescript title="src/config.ts"
// 字体配置
font: {
	// 注意：自定义字体需要在 src/styles/main.css 中引入字体文件
	// 注意：字体子集优化功能目前仅支持 TTF 格式字体,开启后需要在生产环境才能看到效果,在Dev环境下显示的是浏览器默认字体!
	asciiFont: {
		// 英文字体 - 优先级最高
		// 指定为英文字体则无论字体包含多大范围，都只会保留 ASCII 字符子集
		fontFamily: "ZenMaruGothic-Medium",
		fontWeight: "400",
		localFonts: ["ZenMaruGothic-Medium.ttf"],
		enableCompress: true, // 启用字体子集优化，减少字体文件大小
	},
	cjkFont: {
		// 中日韩字体 - 作为回退字体
		fontFamily: "萝莉体 第二版",
		fontWeight: "500",
		localFonts: ["萝莉体 第二版.ttf"],
		enableCompress: true, // 启用字体子集优化，减少字体文件大小
	},
},
```

## 配置参数详解

### asciiFont (英文字体)

| 参数 | 类型 | 说明 |
|------|------|------|
| fontFamily | string | 字体名称 |
| fontWeight | string | 字体粗细，如 "400"、"500"、"bold" 等 |
| localFonts | string[] | 本地字体文件路径列表 |
| enableCompress | boolean | 是否启用字体子集优化 |

### cjkFont (中日韩字体)

| 参数 | 类型 | 说明 |
|------|------|------|
| fontFamily | string | 字体名称 |
| fontWeight | string | 字体粗细，如 "400"、"500"、"bold" 等 |
| localFonts | string[] | 本地字体文件路径列表 |
| enableCompress | boolean | 是否启用字体子集优化 |

## 使用步骤

### 1. 准备字体文件

将您的字体文件（推荐使用 TTF 格式）放置在项目目录中，例如：

::: file-tree

- Mizuki
  - public
    - fonts
      - ZenMaruGothic-Medium.ttf
      - 萝莉体 第二版.ttf
  - src
    - styles
      - main.css
  - .vuepress
    - config.ts

:::

### 2. 引入字体文件

在 `src/styles/main.css`（或类似的样式文件）中引入字体：

```css title="src/styles/main.css"
/* 英文字体 */
@font-face {
  font-family: "ZenMaruGothic-Medium";
  src: url("/fonts/ZenMaruGothic-Medium.ttf") format("truetype");
  font-weight: 400;
  font-display: swap;
}

/* 中日韩字体 */
@font-face {
  font-family: "萝莉体 第二版";
  src: url("/fonts/萝莉体 第二版.ttf") format("truetype");
  font-weight: 500;
  font-display: swap;
}
```

### 3. 配置主题

在 `src/config.ts` 中添加字体配置：

```typescript title="src/config.ts"
export default defineThemeConfig({
  // 其他配置...
  font: {
    asciiFont: {
      fontFamily: "ZenMaruGothic-Medium",
      fontWeight: "400",
      localFonts: ["ZenMaruGothic-Medium.ttf"],
      enableCompress: true,
    },
    cjkFont: {
      fontFamily: "萝莉体 第二版",
      fontWeight: "500",
      localFonts: ["萝莉体 第二版.ttf"],
      enableCompress: true,
    },
  },
  // 其他配置...
})
```

## 字体子集优化

当 `enableCompress` 设置为 `true` 时，系统会对字体进行子集优化，仅保留必要的字符，从而减少字体文件大小，提高加载速度。

**注意事项：**

- 字体子集优化功能目前仅支持 TTF 格式字体
- 该功能需要在生产环境中才能看到效果
- 在开发环境下可能显示为浏览器默认字体

## 最佳实践

1. **字体文件大小**：选择合适大小的字体文件，避免过大的字体文件影响加载速度
2. **格式选择**：推荐使用 TTF 格式，其他格式可能需要额外配置
3. **回退方案**：提供系统默认字体作为回退方案，确保在字体加载失败时也能正常显示
4. **字体授权**：确保您使用的字体有适当的授权许可

## 常见问题

### Q: 如何同时设置多个字体？

A: 可以在 `fontFamily` 中使用字体栈，例如：

```typescript
fontFamily: "CustomFont, Helvetica, Arial, sans-serif"
```

### Q: 为什么在开发环境中字体没有生效？

A: 字体子集优化功能需要在生产环境中才能正常工作。在开发环境中，可以临时禁用 `enableCompress` 进行测试。

### Q: 如何使用 Web 字体？

A: 可以从 Google Fonts 或其他 Web 字体服务获取字体，然后按照上述步骤进行配置。

## 相关链接

- [CSS @font-face 规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)
- [字体格式转换工具](https://transfonter.org/)
- [Google Fonts](https://fonts.google.com/)