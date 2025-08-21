---
title: Gridea 迁移到 Mizuki
createTime: 2025/08/16 23:56:17
permalink: /transfer/gridea-import/
---

# Gridea 迁移到 Mizuki 指南

本指南将帮助您将现有的 Gridea 博客内容迁移到 Mizuki 主题。

## 什么是 Mizuki？

Mizuki 是一个基于 Astro 开发的现代化博客主题，具有以下特点：
- 快速的静态站点生成
- 现代化的设计风格
- 优秀的 SEO 支持
- 响应式布局
- 支持多种内容格式

## Gridea 与 Mizuki 文章格式差异

Gridea 使用 Markdown 格式存储文章，并包含 Frontmatter。这使得从 Gridea 迁移到 Mizuki 相对简单，因为两者都基于 Markdown 和 Frontmatter。

主要差异在于 Frontmatter 字段的命名和结构可能不同，以及静态资源（图片等）的路径处理。

### Gridea 文章示例：
```markdown
---
title: "我的 Gridea 文章"
date: 2023-10-26 10:00:00
tags:
  - 随笔
categories:
  - 日常
--- 

这是一篇 Gridea 博客文章的内容。

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

# 我的 Gridea 文章

这是一篇 Gridea 博客文章的内容。

## 小标题

更多内容...
```

## 迁移步骤

### 1. 准备工作

1. 确保已安装 Mizuki 主题。
2. 准备文章存放目录：`src/content/posts/`。
3. 找到您的 Gridea 博客源文件，通常在 Gridea 客户端设置的“源文件目录”中。文章通常位于 `[源文件目录]/posts/`。

### 2. 复制文章文件

将 Gridea 博客源文件目录中的 `posts` 文件夹下的所有 Markdown 文件复制到 Mizuki 的文章目录 `src/content/posts/`。

### 3. 调整 Frontmatter

这是迁移过程中最关键的一步，您需要根据 Mizuki 的 Frontmatter 规范调整 Gridea 文章的 Frontmatter。

#### 常见字段映射：
- `title`: Gridea 的 `title` 直接对应 Mizuki 的 `title`。
- `date`: Gridea 的 `date` (例如 `2023-10-26 10:00:00`) 需要转换为 Mizuki 的 `pubDate` (例如 `2023-10-26`)。如果 Gridea 没有 `updatedDate`，可以使用 `pubDate` 作为 `updatedDate` 的值。
- `tags`: Gridea 的 `tags` 列表直接对应 Mizuki 的 `tags` 列表。
- `categories`: Gridea 的 `categories` 列表通常只有一个元素，对应 Mizuki 的 `category`。
- `description`: Gridea 可能没有独立的 `description` 字段，您可以手动添加或从文章内容中提取。
- `cover`: Gridea 可能没有独立的 `cover` 字段，您可以手动添加。
- `draft`: Gridea 通常通过文章是否发布来判断，Mizuki 需要 `draft: true` 或 `false`。

#### 批量修改建议：
对于大量文章，建议编写脚本（如 Python 脚本）来自动化 Frontmatter 的转换。

**Python 脚本示例 (概念性):**

```python
import os
import re
import yaml

def migrate_gridea_frontmatter(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 提取 Frontmatter 和内容
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
    if not match:
        print(f"Skipping {file_path}: No valid Frontmatter found.")
        return

    fm_str = match.group(1)
    body = match.group(2)

    try:
        gridea_fm = yaml.safe_load(fm_str)
    except yaml.YAMLError as e:
        print(f"Error parsing YAML in {file_path}: {e}")
        return

    mizuki_fm = {}
    mizuki_fm['title'] = gridea_fm.get('title', 'Untitled')
    
    # 处理日期
    date_str = gridea_fm.get('date', '').split(' ')[0] # 只取日期部分
    mizuki_fm['pubDate'] = date_str if date_str else 'YYYY-MM-DD'
    mizuki_fm['updatedDate'] = date_str if date_str else 'YYYY-MM-DD'

    mizuki_fm['description'] = gridea_fm.get('description', '') # Gridea 可能没有，需要手动补充
    mizuki_fm['tags'] = gridea_fm.get('tags', [])
    mizuki_fm['category'] = gridea_fm.get('categories', ['未分类'])[0] if gridea_fm.get('categories') else '未分类'
    mizuki_fm['cover'] = gridea_fm.get('cover', '') # Gridea 可能没有，需要手动补充
    mizuki_fm['draft'] = gridea_fm.get('draft', False) # Gridea 可能没有，默认为 False

    new_fm_str = yaml.dump(mizuki_fm, allow_unicode=True, sort_keys=False)

    new_content = f"---\n{new_fm_str}---\n\n{body}"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Migrated Frontmatter for: {file_path}")

# 示例用法
# posts_dir = 'path/to/your/mizuki/src/content/posts'
# for filename in os.listdir(posts_dir):
#     if filename.endswith('.md'):
#         migrate_gridea_frontmatter(os.path.join(posts_dir, filename))
```

### 4. 静态资源处理

Gridea 通常将图片等静态资源存储在 `[源文件目录]/media/` 或文章同级目录下的 `assets` 文件夹中。您需要将这些资源复制到 Mizuki 的 `public/` 目录下，并更新文章中的路径。

1. **复制资源文件**：将 Gridea 的 `media` 文件夹（或包含图片的 `assets` 文件夹）下的所有图片、视频等媒体文件复制到 Mizuki 的 `public/images/` 或 `public/assets/` 目录下。

2. **更新文件路径**：在 Markdown 文件中，批量替换图片链接，使其指向 Mizuki 项目中的正确路径。
   - 示例：将 `![alt](/media/image.jpg)` 替换为 `![alt](/images/image.jpg)`。
   - 如果图片在文章同级目录的 `assets` 文件夹中，例如 `![alt](./assets/image.jpg)`，则需要将其路径调整为 Mizuki 的相对路径或绝对路径，例如 `![alt](/images/post-slug/image.jpg)` 或 `![alt](/images/image.jpg)`。

### 5. 更新内部链接

如果您的 Gridea 文章中包含指向其他文章或页面的内部链接，请确保这些链接在 Mizuki 中仍然有效。

- Mizuki 的文章链接通常是 `/posts/your-post-slug/`。
- 您可能需要编写脚本来解析和更新这些内部链接。

### 6. 验证导入结果

导入完成后，请检查以下项目：

- [ ] 文章标题、日期、标签正确显示
- [ ] 文章内容完整且格式正确
- [ ] 图片和媒体文件正常显示
- [ ] 内部链接可以正常访问
- [ ] 文章分类和标签正确显示
- [ ] 文章摘要正常显示

## 常见问题

### Q: Gridea 的主题配置如何迁移？
A: Gridea 的主题配置与 Mizuki 的配置方式不同，无法直接迁移。您需要根据 Mizuki 的文档重新配置主题。

### Q: 如何处理 Gridea 的评论？
A: Mizuki 不自带评论系统。您可以考虑集成第三方评论系统，如 Disqus、Gitalk、Waline 等，并尝试将 Gridea 的评论数据导入到这些系统中。

### Q: Gridea 的自定义页面如何迁移？
A: Gridea 的自定义页面可以作为 Mizuki 的独立页面进行迁移。将其内容转换为 Markdown，并创建对应的 `.md` 文件在 Mizuki 的 `src/content/pages/` 目录下。

## 总结

将 Gridea 迁移到 Mizuki 相对直接，主要工作集中在 Frontmatter 的字段映射和静态资源路径的调整。通过编写自动化脚本，可以大大提高效率。请务必在迁移后进行彻底的验证，确保所有内容和功能正常。