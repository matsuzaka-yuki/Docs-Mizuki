---
title: 自定义字体配置
createTime: 2025/09/16 10:00:00
permalink: /config/custom-font/
---



本教程将指导您如何在 Mizuki 主题中添加和配置自定义字体。

## 准备工作

在开始之前，请确保您已经：
- 准备好要添加的字体文件（支持 `.ttf`、`.woff`、`.woff2` 等格式）
- 了解字体的名称和基本信息
- 具备基本的文件编辑能力

## 步骤一：添加字体文件

1. 将您的字体文件复制到项目的字体目录：
   ```
   public/assets/font/
   ```

2. 确保字体文件名称清晰易懂，例如：
   - `MyCustomFont.ttf`
   - `SpecialFont-Bold.woff2`

## 步骤二：配置字体定义

### 2.1 在 CSS 中定义字体

打开 `src/styles/main.css` 文件，在现有的 `@font-face` 定义后添加您的字体：

```css
/* 导入您的自定义字体 */
@font-face {
    font-family: 'YourFontName';
    src: url('/assets/font/YourFontFile.ttf') format('truetype');
    font-weight: normal;
    font-display: swap;
}
```

**参数说明：**
- `font-family`: 字体的名称，用于在 CSS 中引用
- `src`: 字体文件的路径
- `font-weight`: 字体粗细（normal、bold、100-900）
- `font-display`: 字体加载策略，建议使用 `swap`

### 2.2 创建字体应用类

在同一文件中，添加字体应用类：

```css
/* 当启用您的自定义字体时应用为全局字体 */
.your-font-enabled {
    font-family: 'YourFontName', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

**注意：** 类名建议使用小写字母和连字符，例如 `custom-font-enabled`。

## 步骤三：更新配置文件

### 3.1 修改主配置文件

打开 `src/config.ts` 文件，在 `font` 配置部分添加您的字体选项：

```typescript
// 字体配置
font: {
    zenMaruGothic: {
        enable: true, // 启用全局圆体
    },
    yourCustomFont: {
        enable: false, // 启用您的自定义字体
    },
},
```

**配置说明：**
- 键名应该使用驼峰命名法
- `enable` 属性控制字体是否启用
- 可以同时启用多个字体

### 3.2 更新类型定义

打开 `src/types/config.ts` 文件，在 `SiteConfig` 类型的 `font` 部分添加类型定义：

```typescript
font: {
    zenMaruGothic: {
        enable: boolean; // 启用全局圆体
    };
    yourCustomFont: {
        enable: boolean; // 启用您的自定义字体
    };
};
```

## 步骤四：应用字体到布局

打开 `src/layouts/Layout.astro` 文件，找到 `<body>` 标签，在 `class:list` 中添加您的字体类：

```astro
<body class="min-h-screen" class:list={[
    {
        "lg:is-home": isHomePage, 
        "enable-banner": enableBanner,
        "zen-maru-gothic-enabled": siteConfig.font.zenMaruGothic.enable,
        "your-font-enabled": siteConfig.font.yourCustomFont.enable
    }
]}
    data-overlayscrollbars-initialize
>
```

## 步骤五：测试和使用

1. **启用字体**：在 `src/config.ts` 中将您的字体的 `enable` 设置为 `true`

2. **重启开发服务器**：
   ```bash
   npm run dev
   ```

3. **检查效果**：打开浏览器查看字体是否正确应用

## 高级配置

### 多字体优先级

如果同时启用多个字体，CSS 中后定义的字体类会有更高的优先级。您可以通过调整 CSS 中类的顺序来控制优先级。

### 字体回退

建议在字体定义中包含系统字体作为回退：

```css
.your-font-enabled {
    font-family: 'YourFontName', 'Helvetica Neue', Arial, sans-serif;
}
```

### 字体子集

对于大型字体文件，考虑使用字体子集来减少文件大小：

```css
@font-face {
    font-family: 'YourFontName';
    src: url('/assets/font/YourFontFile.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153;
}
```

## 故障排除

### 字体未显示
1. 检查字体文件路径是否正确
2. 确认字体文件格式是否支持
3. 检查浏览器开发者工具中的网络请求
4. 验证 CSS 语法是否正确

### 字体加载缓慢
1. 使用 `font-display: swap` 优化加载体验
2. 考虑使用 WOFF2 格式减少文件大小
3. 启用字体预加载

### 配置不生效
1. 确认所有文件都已保存
2. 重启开发服务器
3. 清除浏览器缓存
4. 检查配置文件语法

## 示例：添加思源黑体

以下是添加思源黑体的完整示例：

1. **添加字体文件**：将 `SourceHanSans.ttf` 放入 `public/assets/font/`

2. **CSS 定义**：
```css
@font-face {
    font-family: 'SourceHanSans';
    src: url('/assets/font/SourceHanSans.ttf') format('truetype');
    font-weight: normal;
    font-display: swap;
}

.source-han-sans-enabled {
    font-family: 'SourceHanSans', system-ui, sans-serif;
}
```

3. **配置文件**：
```typescript
font: {
    zenMaruGothic: {
        enable: true,
    },
    sourceHanSans: {
        enable: false,
    },
},
```

4. **类型定义**：
```typescript
font: {
    zenMaruGothic: {
        enable: boolean;
    };
    sourceHanSans: {
        enable: boolean;
    };
};
```

5. **布局应用**：
```astro
"source-han-sans-enabled": siteConfig.font.sourceHanSans.enable
```

## 总结

通过以上步骤，您可以成功地在 Mizuki 主题中添加和使用自定义字体。记住要保持配置的一致性，并在每次修改后进行测试以确保效果符合预期。

如果您遇到任何问题，请检查浏览器的开发者工具以获取更多调试信息。