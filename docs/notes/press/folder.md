---
title: 文件夹方案
createTime: 2025/09/01 20:28:41
permalink: /press/folder/
---


# 在子文件夹中创建文章（推荐）

这是在Mizuki博客系统中创建文章的推荐方法。这种方法更适合复杂的文章，特别是包含大量图片或其他资源的文章。**特别适合那些希望在不依赖外部图床的情况下，优雅地管理和存储图片资源的用户。**

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
image: "./cover.png"
pubDate: 2025-01-20
permalink: "encrypted-example"
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
- `permalink`: 固定链接

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
image: './cover.jpg'
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
image: './react-hooks-cover.png'
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

---

## 💡 小贴士：图片优化建议

虽然使用文件夹方案可以自主管理图片，但仍建议对图片进行适当优化：

1. **选择合适的格式**
   - 照片类图片：使用WebP或JPEG格式
   - 图标类图片：使用PNG或SVG格式
   - 动态图片：使用WebP或GIF格式

2. **控制图片大小**
   - 照片：建议宽度不超过1200px
   - 缩略图：宽度300-400px即可
   - 大图考虑使用懒加载技术

3. **批量处理工具**
   - 推荐使用ImageOptim、Squoosh等工具批量压缩
   - 或使用命令行工具如sharp、imagemin自动化处理

4. **目录结构建议**
   ```
   - my-complex-post
     - index.md
     - images/
       - cover.jpg      # 封面图
       - screenshot-1.webp  # 截图
       - diagram.svg     # 示意图
     - assets/
       - data.json       # 数据文件
       - download.zip    # 下载文件
   ```
   对于图片较多的文章，可以创建子目录进一步组织资源。

## 管理图片和其他资源（无需图床方案）

**这是使用Mizuki最优雅的图片管理方案，完全无需依赖外部图床服务！**

使用这种方法，你可以将文章相关的所有资源都放在同一个文件夹中，实现了真正的"自托管"图片存储：

::: file-tree

- src
  - content
    - posts
      - my-complex-post
        - index.md
        - image1.png
        - image2.jpg
        - data.json

:::

### 优势对比

| 方案 | 文件夹方案 | 图床方案 |
|------|------------|----------|
| **控制权** | 完全自主控制 | 依赖第三方服务 |
| **稳定性** | 100%稳定 | 可能宕机或失效 |
| **隐私性** | 数据完全私有 | 部分服务会扫描图片 |
| **加载速度** | 与站点同源加载 | 跨域加载可能较慢 |
| **成本** | 无额外成本 | 可能有流量/存储费用 |
| **维护** | 与文章一同管理 | 需要单独维护 |

### 图片引用方式

在文章中引用图片时，可以直接使用相对路径：

```markdown
![图片描述](image1.png)
```

**重要提示：** 像这样直接填写文件的名字，这样才能让RSS正常构建图片的路径，同时确保图片与文章一同打包部署。

## 创建多篇文章

你可以在`src/content/posts/`目录下创建多个文件夹，每个文件夹代表一篇文章。例如：

::: file-tree

- src
  - content
    - posts
      - my-first-post
        - index.md
        - cover.jpg
      - my-second-post
        - index.md
        - image1.png
        - image2.png
      - my-third-post
        - index.md
        - data.json

:::

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

- **所有文章资源集中管理**，便于维护
- **完全自主的图片管理**，无需依赖外部图床服务
- **100%的控制权**，不受第三方服务限制
- **图片引用更简单**，使用相对路径即可
- **更好的组织结构**，特别是对于包含大量资源的文章
- **便于文章的迁移和备份**，资源与内容一同迁移
- **每篇文章都有独立的文件夹**，避免资源混淆
- **完全私有**，不会受到图床服务的数据扫描
- **性能更优**，图片与站点同源加载，无跨域延迟
- **长期稳定**，不受图床服务变更或关闭的影响

### 特别适合以下场景

1. **技术博客**：大量代码示例和截图
2. **教程文档**：步骤说明图片多
3. **摄影作品集**：高分辨率图片展示
4. **个人日记**：私密图片不想上传到公共图床
5. **企业网站**：需要完全控制内容资源
6. **离线环境**：无法访问外部图床服务的场景