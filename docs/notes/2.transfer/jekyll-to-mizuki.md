---
title: Jekyll 迁移到 Mizuki
createTime: 2025/08/16 23:56:17
permalink: /transfer/jekyll-to-mizuki/
---

# Jekyll 迁移到 Mizuki

本指南将帮助您将现有的 Jekyll 博客迁移到 Mizuki。

## Mizuki 的特点

Mizuki 是一个基于 VuePress 的静态博客主题，它具有以下特点：

- **轻量级和高性能**：基于 VuePress 构建，提供快速的页面加载速度。
- **美观的界面**：简洁、现代的设计，提供良好的阅读体验。
- **易于配置**：通过简单的配置文件即可定制博客。
- **Markdown 优先**：所有文章均使用 Markdown 格式编写。
- **丰富的特性**：支持标签、分类、归档、评论、SEO 优化等。

## Jekyll 与 Mizuki 文章格式差异

Jekyll 和 Mizuki 都使用 Markdown 格式编写文章，但它们在 Frontmatter（文章头部元数据）和静态资源处理方面存在一些差异。

### Frontmatter 差异

Jekyll 的 Frontmatter 示例：

```yaml
---
layout: post
title: "我的第一篇文章"
date: 2023-01-01 10:00:00 +0800
categories: [技术, 编程]
tags: [Jekyll, Markdown]
---
```

Mizuki 的 Frontmatter 示例：

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

主要差异：

- `layout` 字段在 Mizuki 中通常不需要，或者可以使用 `layout: Post`。
- `date` 字段的格式可能需要调整，Mizuki 通常接受 `YYYY-MM-DD HH:mm:ss` 格式。
- `categories` 和 `tags` 在 Mizuki 中通常是数组形式。

### 静态资源差异

Jekyll 通常将图片等静态资源放在 `assets` 或 `images` 目录下，并通过相对路径引用。Mizuki 同样支持相对路径引用，但建议将静态资源统一放置在 VuePress 项目的 `public` 目录下，或者文章同级目录下。

## 迁移步骤

以下是将 Jekyll 博客迁移到 Mizuki 的详细步骤：

### 1. 准备工作

确保您已经安装了 Node.js 和 VuePress。如果您还没有 Mizuki 博客，请先按照 Mizuki 的官方文档创建一个新的 Mizuki 博客项目。

### 2. 文章内容迁移

Jekyll 的文章通常位于 `_posts` 目录下。您需要将这些 Markdown 文件复制到 Mizuki 博客项目的 `docs` 目录（或您配置的文章目录）下。

例如，如果您的 Jekyll 文章在 `_posts/2023-01-01-my-first-post.md`，您可以将其复制到 Mizuki 的 `docs/my-first-post.md`。

### 3. 手动调整 Frontmatter

对于每个复制过来的 Markdown 文件，您需要手动调整其 Frontmatter，使其符合 Mizuki 的要求。主要包括：

- **`title`**：确保标题正确。
- **`date`**：将日期格式调整为 `YYYY-MM-DD HH:mm:ss`。如果 Jekyll 的日期包含时区信息，请移除。
- **`tags` 和 `categories`**：将它们转换为 YAML 数组格式。
- **其他字段**：根据 Mizuki 的 Frontmatter 规范进行调整。

**示例 Python 脚本（批量修改 Frontmatter）**

对于大量文章，您可以编写一个简单的 Python 脚本来批量修改 Frontmatter。以下是一个示例，用于将 Jekyll 的 `categories` 和 `tags` 转换为 Mizuki 的格式：

```python
import os
import re
import yaml

def convert_jekyll_frontmatter_to_mizuki(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 匹配 Frontmatter
    match = re.match(r'^---
(.*?)
---
(.*)$', content, re.DOTALL)
    if not match:
        print(f"Skipping {file_path}: No valid Frontmatter found.")
        return

    frontmatter_str = match.group(1)
    body = match.group(2)

    try:
        frontmatter = yaml.safe_load(frontmatter_str)
    except yaml.YAMLError as e:
        print(f"Error parsing Frontmatter in {file_path}: {e}")
        return

    # 调整日期格式
    if 'date' in frontmatter:
        # 移除时区信息，并格式化
        date_str = str(frontmatter['date'])
        if '+' in date_str:
            date_str = date_str.split('+')[0].strip()
        frontmatter['date'] = date_str

    # 调整 categories 和 tags 格式
    if 'categories' in frontmatter and isinstance(frontmatter['categories'], str):
        frontmatter['categories'] = [c.strip() for c in frontmatter['categories'].split(',')]
    elif 'categories' in frontmatter and not isinstance(frontmatter['categories'], list):
        frontmatter['categories'] = [frontmatter['categories']]

    if 'tags' in frontmatter and isinstance(frontmatter['tags'], str):
        frontmatter['tags'] = [t.strip() for t in frontmatter['tags'].split(',')]
    elif 'tags' in frontmatter and not isinstance(frontmatter['tags'], list):
        frontmatter['tags'] = [frontmatter['tags']]

    # 移除 layout 字段
    if 'layout' in frontmatter:
        del frontmatter['layout']

    new_frontmatter_str = yaml.dump(frontmatter, allow_unicode=True, sort_keys=False)
    new_content = f"---\n{new_frontmatter_str}---\n{body}"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully converted Frontmatter for {file_path}")

# 示例用法：
# articles_dir = 'path/to/your/mizuki/docs/articles'
# for root, _, files in os.walk(articles_dir):
#     for file in files:
#         if file.endswith('.md'):
#             file_path = os.path.join(root, file)
#             convert_jekyll_frontmatter_to_mizuki(file_path)
```

请根据您的实际情况修改 `articles_dir` 变量，并谨慎运行此脚本。

### 4. 静态资源迁移

将 Jekyll 博客中引用的图片、附件等静态资源复制到 Mizuki 博客项目的 `docs/.vuepress/public` 目录（或您自定义的静态资源目录）下。然后，您需要更新文章中对这些静态资源的引用路径。

例如，如果 Jekyll 中引用的是 `![图片](/assets/images/my-image.png)`，并且您将 `my-image.png` 复制到了 `docs/.vuepress/public/images/`，那么在 Mizuki 中可能需要修改为 `![图片](/images/my-image.png)`。

### 5. 更新内部链接

Jekyll 内部链接通常使用 `{% post_url 2023-01-01-my-first-post %}` 或相对路径。您需要将这些链接更新为 Mizuki 识别的 Markdown 链接格式，例如 `[文章标题](/my-first-post.html)` 或 `[文章标题](/my-first-post)`。

### 6. 验证迁移结果

完成上述步骤后，运行您的 Mizuki 博客，并检查迁移后的文章：

```bash
npm run docs:dev
```

- 检查文章是否正确显示。
- 检查图片和其他静态资源是否加载正常。
- 检查内部链接是否有效。
- 检查标签和分类是否正确显示。

## 常见问题

### 1. 批量添加 Frontmatter

如果您有大量没有 Frontmatter 的 Markdown 文件，可以使用上述 Python 脚本进行批量添加和格式化。

### 2. 图片路径批量替换

如果您的图片路径需要批量替换，可以使用文本编辑器的查找替换功能（支持正则表达式），或者编写脚本进行处理。

### 3. 导入后文章不显示

- 检查 Frontmatter 是否正确，特别是 `title` 和 `date` 字段。
- 检查文件路径是否正确，确保文件位于 Mizuki 配置的文章目录下。
- 检查 VuePress 的配置，确保 `config.js` 或 `config.ts` 中没有错误。

## 高级功能迁移

### 评论系统

Jekyll 可能使用 Disqus、Gitalk 等评论系统。Mizuki 也支持多种评论系统，您可以根据 Mizuki 的文档配置您偏好的评论系统。

### SEO 优化

Jekyll 通常通过插件生成 `sitemap.xml` 和 `robots.txt`。Mizuki 也有相应的插件或配置选项来处理 SEO。

### RSS 订阅

Jekyll 通常通过 `feed.xml` 提供 RSS 订阅。Mizuki 同样支持 RSS 订阅，您可以配置相关插件来生成 RSS 源。

希望本指南能帮助您顺利完成 Jekyll 到 Mizuki 的迁移！