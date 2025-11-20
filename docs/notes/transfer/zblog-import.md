---
title: Z-Blog 迁移到 Mizuki
createTime: 2025/08/16 23:56:17
permalink: /transfer/zblog-import/
---

# Z-Blog 迁移到 Mizuki 指南

本指南将帮助您将现有的 Z-Blog 博客内容迁移到 Mizuki 主题。

## 什么是 Mizuki？

Mizuki 是一个基于 Astro 开发的现代化博客主题，具有以下特点：
- 快速的静态站点生成
- 现代化的设计风格
- 优秀的 SEO 支持
- 响应式布局
- 支持多种内容格式

## Z-Blog 与 Mizuki 文章格式差异

Z-Blog 通常将文章内容存储在数据库中，并以 HTML 或富文本形式呈现。Mizuki 文章的核心是 Markdown 文件，并需要包含特定的 Frontmatter（YAML 头部信息）来定义文章的元数据。

迁移的关键在于将 Z-Blog 数据库中的文章内容导出，并转换为 Markdown 格式，同时提取必要的元数据生成 Frontmatter。

### Z-Blog 文章内容示例（数据库中可能为 HTML）：
```html
<p>这是一篇 Z-Blog 文章的内容。</p>
<h2>文章副标题</h2>
<p>更多内容...</p>
```

### Mizuki 格式示例（转换为 Markdown 并添加 Frontmatter）：
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

# 我的 Z-Blog 文章

这是一篇 Z-Blog 文章的内容。

## 文章副标题

更多内容...
```

## 迁移步骤

### 1. 准备工作

1. 确保已安装 Mizuki 主题。
2. 准备文章存放目录：`src/content/posts/`。
3. 访问您的 Z-Blog 后台，了解文章、分类、标签、附件等数据结构。
4. 准备数据库访问工具（如 phpMyAdmin, Navicat, DBeaver 等），以便导出数据。

### 2. 导出 Z-Blog 内容

Z-Blog 的数据通常存储在 SQLite 或 MySQL 数据库中。您需要从数据库中导出文章、分类、标签等数据。

#### 导出文章数据（以 MySQL 为例）：

连接到您的 Z-Blog 数据库，执行 SQL 查询来导出文章数据。主要关注 `zbp_post` 表。

```sql
SELECT
    log_ID AS id,
    log_Title AS title,
    log_Content AS content,
    log_PostTime AS pubDate,
    log_UpdateTime AS updatedDate, -- Z-Blog 可能没有直接的更新时间字段，需要根据实际情况调整
    log_Intro AS description,
    log_Tag AS tags,
    log_CateID AS category_id,
    log_Status AS status -- 0: 发布, 1: 草稿
FROM zbp_post
WHERE log_Type = 0; -- 0 表示文章，1 表示页面
```

#### 导出分类和标签数据：

- **分类**: `zbp_category` 表
- **标签**: `zbp_tag` 表

您需要将这些数据导出为 CSV、JSON 或其他易于处理的格式。

### 3. 转换文章格式

将导出的 HTML 内容转换为 Markdown 格式，并为每篇文章生成 Frontmatter。

#### 转换工具：
- **编程脚本**: 推荐使用 Python 或 Node.js 编写脚本来自动化此过程。
    - **HTML 到 Markdown**: 使用 `html2text` (Python) 或 `turndown` (Node.js) 库。
    - **Frontmatter 生成**: 根据导出的数据，动态生成 YAML 格式的 Frontmatter。

**Python 迁移脚本示例 (概念性):**

```python
import sqlite3 # 或 pymysql
import html2text
import yaml
import os
from datetime import datetime

def convert_html_to_markdown(html_content):
    h = html2text.HTML2Text()
    h.ignore_links = False
    return h.handle(html_content)

def generate_frontmatter(post_data):
    # 假设 post_data 包含从数据库导出的字段
    title = post_data.get('title', '无标题文章')
    pub_date = datetime.fromtimestamp(post_data.get('pubDate')).strftime('%Y-%m-%d') if post_data.get('pubDate') else datetime.now().strftime('%Y-%m-%d')
    updated_date = datetime.fromtimestamp(post_data.get('updatedDate')).strftime('%Y-%m-%d') if post_data.get('updatedDate') else pub_date
    description = post_data.get('description', '')
    tags = [tag.strip() for tag in post_data.get('tags', '').split(',') if tag.strip()] # Z-Blog 标签可能以逗号分隔
    category = post_data.get('category_name', '未分类') # 需要通过 category_id 关联获取分类名称
    is_draft = True if post_data.get('status') == 1 else False

    fm = {
        'title': title,
        'pubDate': pub_date,
        'updatedDate': updated_date,
        'description': description,
        'tags': tags,
        'category': category,
        'draft': is_draft
    }
    return yaml.dump(fm, allow_unicode=True, sort_keys=False)

def migrate_zblog_posts(db_path, output_dir):
    conn = sqlite3.connect(db_path) # 替换为您的数据库连接方式
    cursor = conn.cursor()

    # 示例：查询文章数据
    cursor.execute("SELECT log_ID, log_Title, log_Content, log_PostTime, log_Intro, log_Tag, log_CateID, log_Status FROM zbp_post WHERE log_Type = 0")
    posts = cursor.fetchall()

    # 假设您已经有了分类名称的映射
    category_map = {1: '技术', 2: '生活'} # 示例映射

    for post in posts:
        post_id, title, content_html, pub_time, intro, tags_str, cate_id, status = post
        
        markdown_content = convert_html_to_markdown(content_html)
        
        post_data = {
            'title': title,
            'pubDate': pub_time,
            'updatedDate': pub_time, # Z-Blog 可能没有直接的更新时间，这里暂时用发布时间
            'description': intro,
            'tags': tags_str,
            'category_name': category_map.get(cate_id, '未分类'),
            'status': status
        }
        
        frontmatter = generate_frontmatter(post_data)
        
        # 生成文件名，通常使用文章标题的拼音或 slug
        filename = f"{title.replace(' ', '-')}.md"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(f"---\n{frontmatter}---\n\n{markdown_content}")
        print(f"Migrated: {filename}")

    conn.close()

# 示例用法
# migrate_zblog_posts('path/to/your/zblog.db', 'path/to/mizuki/src/content/posts')
```

### 4. 静态资源处理

Z-Blog 文章中的图片通常存储在 `zb_users/upload/` 目录下。您需要将这些图片复制到 Mizuki 的 `public/` 目录下，并更新文章中的图片路径。

1. **复制资源文件**：将 Z-Blog 的 `zb_users/upload/` 目录下的所有图片、视频等媒体文件复制到 Mizuki 的 `public/images/` 或 `public/assets/` 目录下。

2. **更新文件路径**：在转换后的 Markdown 文件中，批量替换图片链接，使其指向 Mizuki 项目中的正确路径。
   - 示例：将 `![alt](/zb_users/upload/2024/01/image.jpg)` 替换为 `![alt](/images/2024/01/image.jpg)`。

### 5. 更新内部链接

如果您的 Z-Blog 文章中包含指向其他文章或页面的内部链接，请确保这些链接在 Mizuki 中仍然有效。

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

### Q: 如何处理 Z-Blog 的评论？
A: Mizuki 不自带评论系统。您可以考虑集成第三方评论系统，如 Disqus、Gitalk、Waline 等，并尝试将 Z-Blog 的评论数据导入到这些系统中。

### Q: Z-Blog 的自定义字段如何迁移？
A: 如果您的 Z-Blog 文章使用了自定义字段，您需要根据这些字段的重要性，决定是否将其内容合并到 Markdown 正文，或作为 Frontmatter 的额外字段（如果 Mizuki 支持）。

### Q: 如何处理 Z-Blog 的页面？
A: Z-Blog 的页面（Page）可以作为 Mizuki 的独立页面进行迁移。将其内容转换为 Markdown，并创建对应的 `.md` 文件在 Mizuki 的 `src/content/pages/` 目录下。

## 总结

将 Z-Blog 迁移到 Mizuki 是一个涉及数据导出、格式转换、元数据提取和资源处理的复杂过程。通过编写自动化脚本，可以大大提高效率。请务必在迁移后进行彻底的验证，确保所有内容和功能正常。