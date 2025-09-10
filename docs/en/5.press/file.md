---
title: Single File Solution
createTime: 2025/09/01 20:29:52
permalink: /en/press/file/
---
# Create Articles Directly in the Posts Directory

This is one of two methods for creating articles in the Mizuki blog system. This method is suitable for simple articles that do not require managing a large number of image resources.
The single-file solution may prevent RSS from correctly building image paths (referring to local images; if you use an image hosting service, this will not be an issue). If you need to use the RSS feature, please use the folder-based writing solution.

## Create an Article

1. Create a new Markdown file in the `src/content/posts` directory. The filename should be descriptive, for example, `my-first-post.md`.

2. Add frontmatter (front-matter metadata) to the file. This is the article's configuration information and must include the `title` and `description` fields:

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
  url: 'https://example.com/image.jpg'
  alt: 'Image Description'
pubDate: 2025-01-20
---
```

## Frontmatter Field Details

The supported frontmatter fields include:

### Required Fields
- `title`: Article title (required)
- `description`: Article description (required)

### Publishing Related
- `published`: Article publication date, format YYYY-MM-DD
- `pubDate`: Article publication date (similar to published)
- `date`: Article creation date
- `draft`: Whether it is a draft, true for draft, false for official release

### Content Classification
- `tags`: Array of article tags, used to mark article topics
- `category`: Article category, used to organize articles
- `pinned`: Whether to pin the article, true for pinned

### Author Information
- `author`: Article author's name
- `licenseName`: Article license name, such as "MIT", "CC BY 4.0", etc.
- `sourceLink`: Article source link, usually pointing to a GitHub repository or original source

### Image Settings
- `image`: Article cover image (single-file solution may prevent RSS from correctly building image paths; if you need to use the RSS feature, please use the folder-based writing solution)
  - `url`: Image URL address
  - `alt`: Image alternative text

3. Write the article content below the frontmatter, using standard Markdown syntax.


This tutorial covers:
- Basic Markdown syntax
- Headings, paragraphs, line breaks
- Font styles (bold, italic, etc.)
- Lists, links, images
- Code blocks, tables
- Advanced features

Once you master these basic syntaxes, you can easily write beautiful blog posts!

## Frontmatter Best Practices

### Date Format
It is recommended to use ISO 8601 format (YYYY-MM-DD) for dates:
```yaml
published: 2025-01-20
date: 2025-01-20
pubDate: 2025-01-20
```

### Tags and Categories
- Tags should be specific and relevant, avoid being too broad
- Categories are for high-level organization, usually broader than tags
- Example:
```yaml
tags: [Vue.js, JavaScript, Frontend, Tutorial]
category: Web Development
```

### Draft Management
Use the `draft` field to manage article status:
- `draft: true` - Article will not be displayed in production
- `draft: false` - Article is officially published

### License Settings
Common license names:
- "MIT"
- "Apache-2.0"
- "CC BY 4.0"
- "CC BY-SA 4.0"
- "Unlicensed"

### Full Example
```markdown
---
title: "Complete Guide to Vue.js 3 Composition API"
published: 2025-01-20
pinned: false
description: "In-depth understanding of Vue.js 3's Composition API, including setup function, reactivity system, and lifecycle hooks."
tags: [Vue.js, JavaScript, Frontend, API]
category: "Web Development"
licenseName: "CC BY 4.0"
author: "Zhang San"
sourceLink: "https://github.com/zhangsan/vue3-guide"
draft: false
date: 2025-01-20
image:
  url: 'https://example.com/vue3-cover.jpg'
  alt: 'Vue.js 3 Composition API Guide Cover'
pubDate: 2025-01-20
---

# Complete Guide to Vue.js 3 Composition API

In this article, we will delve into Vue.js 3's Composition API...
```

## Preview Article

After saving the file, you can preview the article in your browser. Append the article filename (without the .md extension) to the end of the preview URL to view it.
For example, if the local development server is running at `http://localhost:4321/`, and the article filename is `my-first-post.md`, you can access the article via `http://localhost:4321/posts/my-first-post`.

If the article has not been created or the filename is incorrect, the page will display a 404 error. When you preview an article that has not yet been created, the console will show different output, which helps with troubleshooting.

## Link to Articles

To link to your articles on blog pages or other pages, you can use the standard HTML `<a>` tag:

```html
<a href="/posts/my-first-post/">My First Article</a>
```

Ensure that the `href` attribute of the link points to the correct article path.

## Add Images

If you need to add images to your article, you can place the image files in the `public` directory and then reference them in the article using relative paths:

```markdown
![Image Description](/images/my-image.png)
```

## Create Multiple Articles

You can create multiple Markdown files in the `src/content/posts/` directory, with each file representing an article. For example:

```
src/content/posts/
├── my-first-post.md
├── my-second-post.md
└── my-third-post.md
```

Each article is an independent Markdown file, and the filename will be used as the article's URL path.

## Link Multiple Articles

To link to multiple articles on a blog page, you can create an article list:

```html
<ul>
  <li><a href="/posts/my-first-post/">My First Article</a></li>
  <li><a href="/posts/my-second-post/">My Second Article</a></li>
  <li><a href="/posts/my-third-post/">My Third Article</a></li>
</ul>
```

Ensure that each link points to the correct article path.

## Notes

- The filename will be used as the article's URL path, so it should be descriptive and free of special characters.
- The `date` field in the frontmatter is optional; if not provided, the system will use the file's creation date.
- This method is suitable for simple articles, but if the article contains a large number of images, it is recommended to use the subfolder solution.