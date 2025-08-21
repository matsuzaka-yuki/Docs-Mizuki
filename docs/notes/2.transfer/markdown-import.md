---
title:  Markdown 文件导入 Mizuki
createTime: 2025/08/16 23:56:17
permalink: /transfer/markdown-import/
---

# Markdown 文件导入 Mizuki 指南

本指南将帮助您将现有的 Markdown 文件导入到 Mizuki 主题。

## 什么是 Mizuki？

Mizuki 是一个基于 Astro 开发的现代化博客主题，具有以下特点：
- 快速的静态站点生成
- 现代化的设计风格
- 优秀的 SEO 支持
- 响应式布局
- 支持多种内容格式

## Markdown 文件与 Mizuki 文章格式差异

Mizuki 文章的核心是 Markdown 文件，但需要包含特定的 Frontmatter（YAML 头部信息）来定义文章的元数据。

### 纯 Markdown 文件示例：
```markdown
# 我的第一篇文章

这是一篇纯 Markdown 格式的文章内容。

## 小标题

更多内容...
```

### Mizuki 格式示例：
```yaml
---
title: Markdown Tutorial
published: 2025-01-20
pinned: true
description: A simple example of a Markdown blog post.
tags: [Markdown, Blogging]
category: Examples
licenseName: "Unlicensed"
author: emn178
sourceLink: "https://github.com/emn178/markdown"
draft: false
---

```yaml
title: "我的第一篇文章"
pubDate: 2024-01-15
updatedDate: 2024-01-16
description: "这是文章描述"
tags: ["技术", "教程"]
category: "技术分享"
cover: "/images/cover.jpg"
draft: false
```
# 我的第一篇文章

这是一篇纯 Markdown 格式的文章内容。

## 小标题

更多内容...
```

## 导入步骤

### 1. 准备工作

1. 确保已安装 Mizuki 主题
2. 准备文章存放目录：`src/content/posts/`

### 2. 复制 Markdown 文件

将您的 Markdown 文件复制到 Mizuki 的文章目录 `src/content/posts/`。

### 3. 添加 Frontmatter

对于每个 Markdown 文件，您需要手动或通过脚本添加 Mizuki 所需的 Frontmatter。这是导入过程中最关键的一步。

#### 必需字段：
- `title`: 文章标题
- `pubDate`: 发布日期 (格式: `YYYY-MM-DD`)

#### 推荐字段：
- `updatedDate`: 更新日期 (格式: `YYYY-MM-DD`)
- `description`: 文章描述或摘要
- `tags`: 标签列表 (格式: `["标签1", "标签2"]`)
- `category`: 分类 (格式: `"分类名称"`)
- `cover`: 文章封面图片路径 (格式: `"/images/cover.jpg"`)
- `draft`: 是否为草稿 (格式: `true` 或 `false`)

#### 示例 Frontmatter：
```yaml
---
title: "您的文章标题"
pubDate: 2024-01-01
updatedDate: 2024-01-01
description: "您的文章描述或摘要"
tags: ["标签A", "标签B"]
category: "分类C"
cover: "/images/your-cover-image.jpg"
draft: false
---
```

### 4. 静态资源处理

如果您的 Markdown 文件中包含图片或其他媒体文件，您需要手动处理这些资源。

1. **复制资源文件**：将图片、视频等媒体文件复制到 Mizuki 的 `public/` 目录下，通常建议放在 `public/images/` 或 `public/assets/`。

2. **更新文件路径**：确保 Markdown 文件中的图片链接指向 Mizuki 项目中的正确路径。
   - 示例：`![图片描述](/images/your-image.jpg)`

### 5. 更新内部链接

如果您的 Markdown 文件中包含指向其他文章或页面的内部链接，请确保这些链接在 Mizuki 中仍然有效。

- Mizuki 的文章链接通常是 `/posts/your-post-slug/`。

### 6. 验证导入结果

导入完成后，请检查以下项目：

- [ ] 文章标题、日期、标签正确显示
- [ ] 文章内容完整且格式正确
- [ ] 图片和媒体文件正常显示
- [ ] 内部链接可以正常访问
- [ ] 文章分类和标签正确显示
- [ ] 文章摘要正常显示

## 常见问题

### Q: 如何批量添加 Frontmatter？
A: 对于大量文件，可以编写简单的脚本（如 Python 脚本）来读取 Markdown 文件内容，然后在其顶部插入 Frontmatter。脚本需要根据文件名或内容自动生成 `title` 和 `pubDate`，其他字段可能需要手动补充。

### Q: 图片路径如何批量替换？
A: 可以使用文本编辑器的查找替换功能，或命令行工具（如 `sed`）来批量替换 Markdown 文件中的图片路径。

### Q: 导入后文章没有显示？
A: 检查以下几点：
   - 文件是否放在 `src/content/posts/` 目录下。
   - Frontmatter 是否正确，特别是 `title` 和 `pubDate` 字段。
   - `draft: true` 的文章不会在生产环境中显示，请确保设置为 `draft: false`。

## 总结

将纯 Markdown 文件导入 Mizuki 相对简单，主要工作集中在为每个文件添加正确的 Frontmatter 和处理静态资源路径。通过细致的检查和必要的批量处理工具，您可以高效地完成导入工作。