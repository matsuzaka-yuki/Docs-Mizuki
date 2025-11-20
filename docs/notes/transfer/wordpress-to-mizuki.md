---
title: WordPress 迁移到 Mizuki
createTime: 2025/08/16 23:56:17
permalink: /transfer/wordpress-to-mizuki/
---

# WordPress 迁移到 Mizuki 指南

本指南将帮助您将 WordPress 博客文章迁移到 Mizuki 主题。

## 什么是 Mizuki？

Mizuki 是一个基于 Astro 开发的现代化博客主题，具有以下特点：
- 快速的静态站点生成
- 现代化的设计风格
- 优秀的 SEO 支持
- 响应式布局
- 支持多种内容格式

## WordPress 与 Mizuki 文章格式差异

### WordPress 导出格式
WordPress 通常通过 XML 文件导出内容，包含文章标题、内容、分类、标签、发布日期等信息。

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

1. 备份您的 WordPress 网站
2. 确保已安装 Mizuki 主题
3. 准备文章存放目录：`src/content/posts/`

### 2. 导出 WordPress 内容

#### 方法一：使用 WordPress 后台导出
1. 登录 WordPress 后台
2. 进入「工具」→「导出」
3. 选择「文章」，点击「下载导出文件」
4. 获得 XML 格式的导出文件

#### 方法二：使用插件导出为 Markdown
推荐使用以下插件将 WordPress 内容直接导出为 Markdown 格式：
- **WordPress to Static Site Generator**
- **Simply Static**
- **WP Gatsby Markdown Exporter**

### 3. 转换文章格式

#### 从 XML 转换
如果您获得的是 XML 文件，需要将其转换为 Markdown 格式。可以使用在线工具或手动转换：

1. **手动转换**：
   - 复制文章标题和内容
   - 创建新的 `.md` 文件
   - 添加 Frontmatter

2. **在线转换工具**：
   - WordPress to Markdown 转换器
   - Pandoc 命令行工具

#### 添加 Frontmatter
为每篇文章添加 Mizuki 所需的 Frontmatter：

```yaml
---
title: "文章标题"
pubDate: 2024-01-15  # WordPress 发布日期
updatedDate: 2024-01-16  # WordPress 最后修改日期
description: "文章摘要或描述"  # 可从 WordPress 摘要获取
tags: ["标签1", "标签2"]  # WordPress 标签
category: "分类名称"  # WordPress 主分类
cover: "/images/cover.jpg"  # 特色图片（如有）
draft: false
---
```

### 4. 静态资源迁移

#### 图片和媒体文件

1. **下载 WordPress 媒体文件**：
   - 通过 FTP 下载 `/wp-content/uploads/` 目录
   - 或使用 WordPress 媒体导出插件

2. **整理图片文件**：
   - 将图片复制到 Mizuki 的 `public/images/` 目录
   - 保持原有的目录结构或重新组织

3. **更新图片路径**：
   - WordPress: `https://yoursite.com/wp-content/uploads/2024/01/image.jpg`
   - Mizuki: `![图片](/images/2024/01/image.jpg)`

### 5. 更新内部链接

更新文章中的内部链接格式：
- WordPress: `https://yoursite.com/2024/01/15/post-name/`
- Mizuki: `[链接](/posts/post-name/)`

### 6. 处理 WordPress 特有功能

#### 短代码（Shortcodes）
WordPress 短代码需要手动转换为 Markdown 或 HTML：
- `[gallery]` → 手动创建图片画廊
- `[caption]` → 使用 Markdown 图片语法
- `[youtube]` → 直接嵌入 YouTube 链接

#### 自定义字段
如果使用了 WordPress 自定义字段，需要将其转换为 Frontmatter 字段。

### 7. 验证迁移结果

迁移完成后，请检查以下项目：

- [ ] 文章标题、日期、标签正确
- [ ] 图片和媒体文件正常显示
- [ ] 内部链接可以正常访问
- [ ] 文章分类和标签正确显示
- [ ] 文章摘要正常显示
- [ ] 短代码已正确转换
- [ ] 自定义字段已迁移

## 常见问题

### Q: 如何处理 WordPress 的多级分类？
A: Mizuki 只支持单一分类，建议选择最主要的分类作为 `category`，其他分类可以添加到 `tags` 中。

### Q: WordPress 的评论如何迁移？
A: Mizuki 目前只支持 Twikoo 评论系统，WordPress 的评论无法直接迁移，建议导出备份后使用新的评论系统。

### Q: 如何处理 WordPress 的自定义文章类型？
A: 自定义文章类型需要根据内容性质决定是否迁移到 Mizuki 的文章系统，或者创建自定义页面。

### Q: WordPress 插件功能如何替代？
A: 大部分 WordPress 插件功能需要寻找替代方案或手动实现，如 SEO 插件的功能可以通过 Mizuki 的内置 SEO 支持实现。

## 高级功能迁移

### 评论系统
Mizuki 目前只支持 Twikoo 评论系统，可以在配置文件中启用。

### SEO 优化
- 确保每篇文章都有 `description` 字段
- 检查文章的 URL 结构是否符合 SEO 要求
- 验证 sitemap 和 RSS 订阅功能
- 设置适当的 meta 标签

### RSS 订阅
Mizuki 会自动生成 RSS 订阅，无需额外配置。

### 重定向设置
为了保持 SEO 价值，建议设置从旧 WordPress URL 到新 Mizuki URL 的重定向。

## 总结

从 WordPress 迁移到 Mizuki 是一个相对复杂的过程，主要挑战在于格式转换和功能替代。建议分批次进行迁移，先迁移核心文章内容，再逐步处理图片、链接和高级功能。迁移过程中要注意备份原始数据，并在迁移完成后进行全面测试。