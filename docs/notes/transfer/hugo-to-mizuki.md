---
title: Hugo 迁移到 Mizuki 指南
createTime: 2025/08/16 23:56:17
permalink: /transfer/hugo-to-mizuki/
---


本指南将帮助您将 Hugo 博客文章迁移到 Mizuki 主题。

## 什么是 Mizuki？

Mizuki 是一个基于 Astro 开发的现代化博客主题，具有以下特点：
- 快速的静态站点生成
- 现代化的设计风格
- 优秀的 SEO 支持
- 响应式布局
- 支持多种内容格式

## Hugo 与 Mizuki 文章格式差异

### Hugo 格式示例：
```yaml
---
title: "我的第一篇文章"
date: 2024-01-15T10:30:00+08:00
lastmod: 2024-01-16T15:20:00+08:00
description: "这是文章摘要"
tags:
  - 技术
  - 教程
categories:
  - 技术分享
images:
  - /images/cover.jpg
draft: false
---
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
```

## 迁移步骤

### 1. 准备工作

1. 备份您的 Hugo 博客文件
2. 确保已安装 Mizuki 主题
3. 准备文章存放目录：`src/content/posts/`

### 2. 文章内容迁移

将 Hugo 的 `content/posts/` 目录下的所有 `.md` 文件复制到 Mizuki 的 `src/content/posts/` 目录。

### 3. 手动调整 Frontmatter

转换完成后，您需要手动调整以下内容：

- 将 `date` 字段改为 `pubDate`，格式改为 `YYYY-MM-DD`
- 将 `lastmod` 字段改为 `updatedDate`，格式改为 `YYYY-MM-DD`
- 将 `description` 字段保持不变
- 将 `categories` 数组的第一个元素作为 `category` 字符串
- 确保 `tags` 为字符串数组格式
- 将 `images` 字段的第一个元素作为 `cover` 字符串

### 4. 静态资源迁移

#### 图片和媒体文件

1. 将 Hugo 的 `static/images/` 目录复制到 Mizuki 的 `public/images/`
2. 图片路径通常保持不变：
   - Hugo: `![图片](/images/example.jpg)`
   - Mizuki: `![图片](/images/example.jpg)`

### 5. 更新内部链接

更新文章中的内部链接格式：
- Hugo: `[链接]({{< ref "posts/my-post.md" >}})` 或 `[链接](/posts/my-post/)`
- Mizuki: `[链接](/posts/my-post/)`

### 6. 验证迁移结果

迁移完成后，请检查以下项目：

- [ ] 文章标题、日期、标签正确
- [ ] 图片和媒体文件正常显示
- [ ] 内部链接可以正常访问
- [ ] 文章分类和标签正确显示
- [ ] 文章摘要正常显示

## 常见问题

### Q: 日期格式转换问题
A: 确保将 Hugo 的 `YYYY-MM-DDTHH:mm:ss+ZZ:ZZ` 格式转换为 Mizuki 的 `YYYY-MM-DD` 格式。

### Q: 图片无法显示
A: 检查图片路径是否正确，确保图片文件已复制到 `public/images/` 目录。

### Q: 标签和分类显示异常
A: 检查 frontmatter 中的 `tags` 是否为数组格式，`category` 是否为字符串格式。

## 高级功能迁移

### 评论系统
Mizuki 目前只支持 Twikoo 评论系统，可以在配置文件中启用。

### SEO 优化
- 确保每篇文章都有 `description` 字段
- 检查文章的 URL 结构是否符合 SEO 要求
- 验证 sitemap 和 RSS 订阅功能

### RSS 订阅
Mizuki 会自动生成 RSS 订阅，无需额外配置。

## 总结

通过以上步骤，您可以成功将 Hugo 博客迁移到 Mizuki 主题。迁移过程中最重要的是确保 frontmatter 格式正确，以及静态资源路径的正确性。如果遇到问题，请仔细检查文件格式和路径配置。