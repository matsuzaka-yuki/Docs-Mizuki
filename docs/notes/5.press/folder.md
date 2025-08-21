---
title: 文件夹方案(推荐)
createTime: 2025/08/17 20:28:41
permalink: /press/folder/
---


# 在子文件夹中创建文章（推荐）

这是在Mizuka博客系统中创建文章的推荐方法。这种方法更适合复杂的文章，特别是包含大量图片或其他资源的文章。

## 创建文章

1. 在`src/content/posts`目录下创建一个新的文件夹，文件夹名应该具有描述性，例如`my-complex-post`。

2. 在新创建的文件夹中创建一个名为`index.md`的文件。

3. 在`index.md`文件中添加frontmatter（前置元数据），这是文章的配置信息，必须包含`title`和`description`字段：

```markdown
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
date: 2025-01-20
image:
  url: './cover.jpg'
  alt: '文章封面'
pubDate: 2025-01-20
---
```

## Frontmatter字段详解

frontmatter支持的字段包括：

### 必需字段
- `title`：文章标题（必需）
- `description`：文章描述（必需）

### 发布相关
- `published`：文章发布日期，格式为YYYY-MM-DD
- `pubDate`：文章发布日期（与published类似）
- `date`：文章创建日期
- `draft`：是否为草稿，true表示草稿，false表示正式发布

### 内容分类
- `tags`：文章标签数组，用于标记文章主题
- `category`：文章分类，用于组织文章
- `pinned`：是否置顶文章，true表示置顶

### 作者信息
- `author`：文章作者姓名
- `licenseName`：文章许可证名称，如"MIT"、"CC BY 4.0"等
- `sourceLink`：文章源链接，通常指向GitHub仓库或原始来源

### 图片设置
- `image`：文章封面图片
  - `url`：图片URL地址（可以是相对路径如'./cover.jpg'）
  - `alt`：图片替代文本

4. 在frontmatter下方编写文章内容，可以使用标准的Markdown语法。

## Markdown学习资源

如果您还不熟悉Markdown语法，建议先学习基础知识：

📚 **推荐学习地址**：[菜鸟教程 - Markdown教程](https://www.runoob.com/markdown/md-tutorial.html)

这个教程涵盖了：
- Markdown基本语法
- 标题、段落、换行
- 字体样式（粗体、斜体等）
- 列表、链接、图片
- 代码块、表格
- 高级功能

掌握这些基础语法后，您就可以轻松编写美观的博客文章了！

## Frontmatter最佳实践

### 日期格式
建议使用ISO 8601格式（YYYY-MM-DD）来设置日期：
```yaml
published: 2025-01-20
date: 2025-01-20
pubDate: 2025-01-20
```

### 标签和分类
- 标签应该具体且相关，避免过于宽泛
- 分类用于高级组织，通常比标签更宽泛
- 示例：
```yaml
tags: [Vue.js, JavaScript, Frontend, Tutorial]
category: Web Development
```

### 草稿管理
使用`draft`字段来管理文章状态：
- `draft: true` - 文章不会在生产环境中显示
- `draft: false` - 文章正常发布

### 许可证设置
常见的许可证名称：
- "MIT"
- "Apache-2.0"
- "CC BY 4.0"
- "CC BY-SA 4.0"
- "Unlicensed"

### 图片路径最佳实践
在子文件夹方法中，推荐使用相对路径引用图片：
```yaml
image:
  url: './cover.jpg'  # 相对于当前文件夹
  alt: '文章封面图片描述'
```

### 完整示例
```markdown
---
title: "React Hooks深度解析"
published: 2025-01-20
pinned: true
description: "全面解析React Hooks的使用方法和最佳实践，包含大量代码示例和图片说明。"
tags: [React, JavaScript, Hooks, Frontend]
category: "Web Development"
licenseName: "MIT"
author: "李四"
sourceLink: "https://github.com/lisi/react-hooks-guide"
draft: false
date: 2025-01-20
image:
  url: './react-hooks-cover.png'
  alt: 'React Hooks深度解析封面'
pubDate: 2025-01-20
---

# React Hooks深度解析

![React Hooks示例](./example-diagram.png)

在这篇文章中，我们将深入探讨React Hooks...
```

## 预览文章

保存文件后，可以在浏览器中预览文章。将文件夹名拼接到预览URL的末尾即可查看。
例如，如果本地开发服务器运行在`http://localhost:4321/`，文件夹名为`my-complex-post`，则可以通过`http://localhost:4321/posts/my-complex-post`访问文章。

如果文章尚未创建或文件夹名错误，页面将显示404错误。当你预览一个尚未创建的文章时，控制台会显示不同的输出，这有助于进行故障排查。

## 链接到文章

要在博客页面或其他页面中链接到你的文章，可以使用标准的HTML `<a>` 标签：

```html
<a href="/posts/my-complex-post/">我的复杂文章</a>
```

确保链接的href属性指向正确的文章路径。

## 管理图片和其他资源

使用这种方法，你可以将文章相关的所有资源都放在同一个文件夹中，便于管理：

```
src/content/posts/my-complex-post/
├── index.md
├── image1.png
├── image2.jpg
└── data.json
```

在文章中引用图片时，可以直接使用相对路径：

```markdown
![图片描述](./image1.png)
```

## 创建多篇文章

你可以在`src/content/posts/`目录下创建多个文件夹，每个文件夹代表一篇文章。例如：

```
src/content/posts/
├── my-first-post/
│   ├── index.md
│   └── cover.jpg
├── my-second-post/
│   ├── index.md
│   ├── image1.png
│   └── image2.png
└── my-third-post/
    ├── index.md
    └── data.json
```

每篇文章都有自己的独立文件夹，便于管理和维护。

## 链接多篇文章

要在博客页面中链接到多篇文章，可以创建一个文章列表：

```html
<ul>
  <li><a href="/posts/my-first-post/">我的第一篇文章</a></li>
  <li><a href="/posts/my-second-post/">我的第二篇文章</a></li>
  <li><a href="/posts/my-third-post/">我的第三篇文章</a></li>
</ul>
```

确保每个链接都指向正确的文章路径。

## 优势

- 所有文章资源集中管理，便于维护
- 图片引用更简单，使用相对路径即可
- 更好的组织结构，特别是对于包含大量资源的文章
- 便于文章的迁移和备份
- 每篇文章都有独立的文件夹，避免资源混淆