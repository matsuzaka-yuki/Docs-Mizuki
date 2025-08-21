---
title: Typecho 迁移到 Mizuki
createTime: 2025/08/16 23:56:17
permalink: /transfer/typecho-to-mizuki/
---

# Typecho 迁移到 Mizuki 指南

本指南将帮助您将 Typecho 博客文章迁移到 Mizuki 主题。

## 什么是 Mizuki？

Mizuki 是一个基于 Astro 开发的现代化博客主题，具有以下特点：
- 快速的静态站点生成
- 现代化的设计风格
- 优秀的 SEO 支持
- 响应式布局
- 支持多种内容格式

## Typecho 与 Mizuki 文章格式差异

### Typecho 数据库结构
Typecho 将文章存储在数据库中，主要包含以下字段：
- `title`: 文章标题
- `text`: 文章内容（Markdown格式）
- `created`: 创建时间
- `modified`: 修改时间
- `slug`: 文章别名
- `tags`: 标签
- `category`: 分类

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

1. 备份您的 Typecho 网站和数据库
2. 确保已安装 Mizuki 主题
3. 准备文章存放目录：`src/content/posts/`
4. 准备数据库访问工具（如 phpMyAdmin、Navicat 等）

### 2. 导出 Typecho 内容

#### 方法一：使用 Typecho 后台导出
1. 登录 Typecho 后台
2. 进入「控制台」→「备份」
3. 选择导出格式（通常为 XML 或 SQL）
4. 下载导出文件

#### 方法二：直接访问数据库
使用数据库管理工具直接查询 Typecho 数据库：

```sql
-- 查询所有已发布的文章
SELECT 
    c.title,
    c.text,
    c.slug,
    c.created,
    c.modified,
    c.type,
    c.status,
    GROUP_CONCAT(DISTINCT t.name) as tags,
    cat.name as category
FROM typecho_contents c
LEFT JOIN typecho_relationships r ON c.cid = r.cid
LEFT JOIN typecho_metas t ON r.mid = t.mid AND t.type = 'tag'
LEFT JOIN typecho_metas cat ON c.cid = cat.mid AND cat.type = 'category'
WHERE c.type = 'post' AND c.status = 'publish'
GROUP BY c.cid
ORDER BY c.created DESC;
```

### 3. 转换文章格式

#### 处理文章内容
Typecho 的文章内容通常已经是 Markdown 格式，但需要进行以下处理：

1. **提取文章数据**：从数据库查询结果中提取文章信息
2. **创建文件名**：使用 slug 或标题创建文件名
3. **添加 Frontmatter**：为每篇文章添加元数据

#### Frontmatter 字段对应关系

| Typecho 字段 | Mizuki 字段 | 说明 |
|-------------|-------------|------|
| `title` | `title` | 文章标题 |
| `created` | `pubDate` | 发布日期（转换为 YYYY-MM-DD 格式） |
| `modified` | `updatedDate` | 更新日期（转换为 YYYY-MM-DD 格式） |
| `text`前几行 | `description` | 文章描述（手动提取） |
| 标签查询结果 | `tags` | 标签数组 |
| 分类查询结果 | `category` | 分类字符串 |
| - | `draft` | 设置为 false |

#### 示例转换结果
```yaml
---
title: "Typecho 使用技巧"
pubDate: 2024-01-15
updatedDate: 2024-01-16
description: "分享一些 Typecho 博客系统的使用技巧和优化方法"
tags: ["Typecho", "博客", "技巧"]
category: "技术分享"
draft: false
---

# Typecho 使用技巧

这里是文章的正文内容...
```

### 4. 静态资源迁移

#### 图片和媒体文件

1. **定位 Typecho 上传目录**：
   - 默认路径：`/usr/uploads/`
   - 或在 Typecho 后台查看上传设置

2. **下载媒体文件**：
   - 通过 FTP 下载整个上传目录
   - 或使用服务器文件管理器

3. **整理到 Mizuki**：
   - 将文件复制到 `public/images/` 目录
   - 保持原有目录结构或重新组织

4. **更新图片路径**：
   - Typecho: `![图片](/usr/uploads/2024/01/image.jpg)`
   - Mizuki: `![图片](/images/2024/01/image.jpg)`

### 5. 处理 Typecho 特有功能

#### 附件系统
Typecho 的附件需要手动处理：
- 下载所有附件文件
- 更新文章中的附件链接
- 将附件放置到适当的目录

#### 自定义字段
如果使用了 Typecho 的自定义字段，需要：
- 查询 `typecho_fields` 表获取自定义字段数据
- 将重要字段转换为 Frontmatter
- 或在文章内容中保留相关信息

#### 页面内容
Typecho 的独立页面（type='page'）需要单独处理：
- 创建对应的 Astro 页面文件
- 或转换为特殊的文章类型

### 6. 更新内部链接

更新文章中的内部链接格式：
- Typecho: `[链接](/archives/123/)`
- Mizuki: `[链接](/posts/post-slug/)`

### 7. 验证迁移结果

迁移完成后，请检查以下项目：

- [ ] 文章标题、日期、标签正确
- [ ] 图片和媒体文件正常显示
- [ ] 内部链接可以正常访问
- [ ] 文章分类和标签正确显示
- [ ] 文章内容格式正确
- [ ] 附件链接正常工作
- [ ] 自定义字段已正确迁移

## 常见问题

### Q: 如何批量导出 Typecho 文章？
A: 推荐直接查询数据库，可以编写脚本批量生成 Markdown 文件。也可以使用 Typecho 的导出插件。

### Q: Typecho 的评论如何处理？
A: Mizuki 目前只支持 Twikoo 评论系统，Typecho 的评论可以导出备份，但无法直接迁移到新系统。

### Q: 如何处理 Typecho 的主题自定义功能？
A: Typecho 主题的自定义功能需要在 Mizuki 中重新实现，或寻找类似的替代方案。

### Q: 数据库中的时间戳如何转换？
A: Typecho 使用 Unix 时间戳，需要转换为标准日期格式。可以使用 `FROM_UNIXTIME()` 函数或编程语言的日期转换功能。

### Q: 如何处理 Typecho 的分类层级？
A: Mizuki 只支持单级分类，如果 Typecho 使用了多级分类，建议选择最具体的分类，或将层级信息添加到标签中。

## 高级功能迁移

### 评论系统
Mizuki 目前只支持 Twikoo 评论系统，可以在配置文件中启用。

### SEO 优化
- 确保每篇文章都有 `description` 字段
- 保持原有的 URL 结构或设置重定向
- 验证 sitemap 和 RSS 订阅功能
- 检查 meta 标签设置

### RSS 订阅
Mizuki 会自动生成 RSS 订阅，无需额外配置。

### 搜索功能
Mizuki 内置了搜索功能，可以替代 Typecho 的搜索插件。

### 重定向设置
为了保持 SEO 价值，建议设置从旧 Typecho URL 到新 Mizuki URL 的重定向：
- Typecho: `/archives/123/`
- Mizuki: `/posts/post-slug/`

## 迁移脚本示例

以下是一个简单的 PHP 脚本示例，用于从 Typecho 数据库导出文章：

```php
<?php
// 注意：这只是一个示例，实际使用时需要根据具体情况调整

$pdo = new PDO('mysql:host=localhost;dbname=typecho', $username, $password);

$sql = "
SELECT 
    c.title,
    c.text,
    c.slug,
    c.created,
    c.modified,
    GROUP_CONCAT(DISTINCT t.name) as tags
FROM typecho_contents c
LEFT JOIN typecho_relationships r ON c.cid = r.cid
LEFT JOIN typecho_metas t ON r.mid = t.mid AND t.type = 'tag'
WHERE c.type = 'post' AND c.status = 'publish'
GROUP BY c.cid
ORDER BY c.created DESC
";

$posts = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

foreach ($posts as $post) {
    $filename = $post['slug'] ? $post['slug'] : sanitize_filename($post['title']);
    $pubDate = date('Y-m-d', $post['created']);
    $updatedDate = date('Y-m-d', $post['modified']);
    $tags = $post['tags'] ? explode(',', $post['tags']) : [];
    
    $frontmatter = "---\n";
    $frontmatter .= "title: \"" . addslashes($post['title']) . "\"\n";
    $frontmatter .= "pubDate: $pubDate\n";
    $frontmatter .= "updatedDate: $updatedDate\n";
    $frontmatter .= "description: \"\"\n"; // 需要手动填写
    $frontmatter .= "tags: [\"" . implode('\", \"', $tags) . "\"]\n";
    $frontmatter .= "category: \"\"\n"; // 需要手动填写
    $frontmatter .= "draft: false\n";
    $frontmatter .= "---\n\n";
    
    $content = $frontmatter . $post['text'];
    
    file_put_contents("posts/{$filename}.md", $content);
}

function sanitize_filename($filename) {
    return preg_replace('/[^a-zA-Z0-9-_]/', '-', $filename);
}
?>
```

## 总结

从 Typecho 迁移到 Mizuki 需要处理数据库导出、格式转换和功能替代等多个方面。由于 Typecho 使用数据库存储，迁移过程相对复杂，建议分步骤进行：

1. 先导出核心文章内容
2. 处理图片和附件
3. 转换链接和格式
4. 测试和优化

迁移过程中要注意备份原始数据，并在迁移完成后进行全面测试，确保所有功能正常工作。