---
title: HTML 文件导入 Mizuki
createTime: 2025/08/16 23:56:17
permalink: /transfer/html-import/
---

# HTML 文件导入 Mizuki 指南

本指南将帮助您将现有的 HTML 文件内容导入到 Mizuki 主题。

## 什么是 Mizuki？

Mizuki 是一个基于 Astro 开发的现代化博客主题，具有以下特点：
- 快速的静态站点生成
- 现代化的设计风格
- 优秀的 SEO 支持
- 响应式布局
- 支持多种内容格式

## HTML 文件与 Mizuki 文章格式差异

Mizuki 文章的核心是 Markdown 文件，并需要包含特定的 Frontmatter（YAML 头部信息）来定义文章的元数据。直接导入 HTML 文件内容需要将其转换为 Markdown 格式，并添加 Frontmatter。

### 纯 HTML 文件示例：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一篇 HTML 文章</title>
</head>
<body>
    <h1>我的第一篇 HTML 文章</h1>
    <p>这是一篇纯 HTML 格式的文章内容。</p>
    <h2>小标题</h2>
    <p>更多内容...</p>
</body>
</html>
```

### Mizuki 格式示例（转换为 Markdown 并添加 Frontmatter）：
```yaml
---
title: HTML 导入指南
published: 2025-01-20
pinned: true
description: 将 HTML 内容导入 Mizuki 的详细指南。
tags: [Import, HTML, Mizuki]
category: Import Guides
licenseName: "Unlicensed"
author: Your Name
sourceLink: ""
draft: false
---


# 我的第一篇 HTML 文章

这是一篇纯 HTML 格式的文章内容。

## 小标题

更多内容...
```

## 导入步骤

### 1. 准备工作

1. 确保已安装 Mizuki 主题。
2. 准备文章存放目录：`src/content/posts/`。

### 2. HTML 到 Markdown 的转换

由于 Mizuki 使用 Markdown 作为内容格式，您需要将 HTML 内容转换为 Markdown。这通常需要借助工具或库来完成。

#### 推荐工具：
- **在线转换工具**：例如 `html2markdown.com` 或 `pandoc` 的在线版本。
- **编程库**：
    - **Python**: `BeautifulSoup` (用于解析 HTML) 结合 `markdownify` 或 `html2text` (用于转换为 Markdown)。
    - **Node.js**: `turndown` 库。

**转换示例 (Python + html2text):**

```python
import html2text

html_content = """
<!DOCTYPE html>
<html>
<body>
    <h1>我的第一篇 HTML 文章</h1>
    <p>这是一篇纯 HTML 格式的文章内容。</p>
    <h2>小标题</h2>
    <p>更多内容...</p>
</body>
</html>
"""

h = html2text.HTML2Text()
h.ignore_links = False
markdown_content = h.handle(html_content)

print(markdown_content)
```

**转换示例 (Node.js + turndown):**

```javascript
const TurndownService = require('turndown')

const turndownService = new TurndownService()
const markdown = turndownService.turndown('<h1>我的第一篇 HTML 文章</h1><p>这是一篇纯 HTML 格式的文章内容。</p><h2>小标题</h2><p>更多内容...</p>')

console.log(markdown)
```

将转换后的 Markdown 内容保存为 `.md` 文件，并放置到 Mizuki 的文章目录 `src/content/posts/`。

### 3. 添加 Frontmatter

对于每个转换后的 Markdown 文件，您需要手动或通过脚本添加 Mizuki 所需的 Frontmatter。这是导入过程中最关键的一步。

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

### 4. 静态资源处理

如果您的 HTML 文件中包含图片或其他媒体文件，您需要手动处理这些资源。

1. **复制资源文件**：将图片、视频等媒体文件复制到 Mizuki 的 `public/` 目录下，通常建议放在 `public/images/` 或 `public/assets/`。

2. **更新文件路径**：确保 Markdown 文件中的图片链接指向 Mizuki 项目中的正确路径。
   - 示例：`![图片描述](/images/your-image.jpg)`

### 5. 更新内部链接

如果您的 HTML 文件中包含指向其他文章或页面的内部链接，请确保这些链接在 Mizuki 中仍然有效。

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

### Q: 如何批量转换 HTML 到 Markdown？
A: 对于大量文件，建议编写脚本来自动化转换过程。使用 `pandoc` 命令行工具也是一个非常强大的选择，它支持多种格式之间的转换。

### Q: 图片路径如何批量替换？
A: 可以使用文本编辑器的查找替换功能，或命令行工具（如 `sed`）来批量替换 Markdown 文件中的图片路径。

### Q: 导入后文章没有显示？
A: 检查以下几点：
   - 文件是否放在 `src/content/posts/` 目录下。
   - Frontmatter 是否正确，特别是 `title` 和 `pubDate` 字段。
   - `draft: true` 的文章不会在生产环境中显示，请确保设置为 `draft: false`。

## 总结

将 HTML 文件内容导入 Mizuki 涉及 HTML 到 Markdown 的转换，以及为转换后的 Markdown 文件添加正确的 Frontmatter 和处理静态资源路径。虽然比纯 Markdown 导入复杂，但通过合适的工具和细致的检查，可以高效完成。