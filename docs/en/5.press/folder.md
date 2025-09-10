---
title: Folder Solution (Recommended)
createTime: 2025/09/01 20:28:41
permalink: /en/press/folder/
---


# Create Articles in Subfolders (Recommended)

This is the recommended method for creating articles in the Mizuki blog system. This method is more suitable for complex articles, especially those containing a large number of images or other resources.

## Create an Article

1. Create a new folder in the `src/content/posts` directory. The folder name should be descriptive, for example, `my-complex-post`.

2. Create a file named `index.md` in the newly created folder.

3. Add frontmatter (front-matter metadata) to the `index.md` file. This is the article's configuration information and must include the `title` and `description` fields:

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
  alt: 'Article Cover'
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
- `image`: Article cover image
  - `url`: Image URL address (can be a relative path like './cover.jpg')
  - `alt`: Image alternative text

4. Write the article content below the frontmatter, using standard Markdown syntax.


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

### Image Path Best Practices
In the subfolder method, it is recommended to use relative paths for images:
```yaml
image:
  url: './cover.jpg'  # Relative to the current folder
  alt: 'Article cover image description'
```

### Full Example
```markdown
---
title: "In-depth Analysis of React Hooks"
published: 2025-01-20
pinned: true
description: "A comprehensive analysis of React Hooks usage and best practices, including numerous code examples and image illustrations."
tags: [React, JavaScript, Hooks, Frontend]
category: "Web Development"
licenseName: "MIT"
author: "Li Si"
sourceLink: "https://github.com/lisi/react-hooks-guide"
draft: false
date: 2025-01-20
image:
  url: './react-hooks-cover.png'
  alt: 'React Hooks In-depth Analysis Cover'
pubDate: 2025-01-20
---

# In-depth Analysis of React Hooks

![React Hooks Example](./example-diagram.png)

In this article, we will delve into React Hooks...
```

## Preview Article

After saving the file, you can preview the article in your browser. Append the folder name to the end of the preview URL to view it.
For example, if the local development server is running at `http://localhost:4321/`, and the folder name is `my-complex-post`, you can access the article via `http://localhost:4321/posts/my-complex-post`.

If the article has not been created or the folder name is incorrect, the page will display a 404 error. When you preview an article that has not yet been created, the console will show different output, which helps with troubleshooting.

## Link to Articles

To link to your articles on blog pages or other pages, you can use the standard HTML `<a>` tag:

```html
<a href="/posts/my-complex-post/">My Complex Article</a>
```

Ensure that the `href` attribute of the link points to the correct article path.

## Manage Images and Other Resources

Using this method, you can place all article-related resources in the same folder for easy management:

```
src/content/posts/my-complex-post/
├── index.md
├── image1.png
├── image2.jpg
└── data.json
```

When referencing images in the article, you can directly use relative paths:

```markdown
![Image Description](image1.png)
```
Note that filling in the file name directly like this allows RSS to correctly build the image path.

## Create Multiple Articles

You can create multiple folders in the `src/content/posts/` directory, with each folder representing an article. For example:

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