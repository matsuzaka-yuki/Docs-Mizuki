---
title: Markdown File Import to Mizuki
createTime: 2025/08/16 23:56:17
permalink: /en/transfer/markdown-import/
---

# Markdown File Import to Mizuki Guide

This guide will help you import your existing Markdown files into the Mizuki theme.

## What is Mizuki?

Mizuki is a modern blog theme developed based on Astro, featuring:
- Fast static site generation
- Modern design style
- Excellent SEO support
- Responsive layout
- Supports multiple content formats

## Differences Between Markdown Files and Mizuki Article Format

The core of Mizuki articles is Markdown files, but they need to include specific Frontmatter (YAML header information) to define the article's metadata.

### Pure Markdown File Example:
```markdown
# My First Article

This is the content of a pure Markdown formatted article.

## Subtitle

More content...
```

### Mizuki Format Example:
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

```yaml
title: "My First Article"
pubDate: 2024-01-15
updatedDate: 2024-01-16
description: "This is the article description"
tags: ["Technology", "Tutorial"]
category: "Technology Sharing"
cover: "/images/cover.jpg"
draft: false
```
# My First Article

This is the content of a pure Markdown formatted article.

## Subtitle

More content...
```

## Import Steps

### 1. Preparation

1. Ensure Mizuki theme is installed
2. Prepare article storage directory: `src/content/posts/`

### 2. Copy Markdown Files

Copy your Markdown files to Mizuki's article directory `src/content/posts/`.

### 3. Add Frontmatter

For each Markdown file, you need to manually or programmatically add the Frontmatter required by Mizuki. This is the most crucial step in the import process.

#### Required Fields:
- `title`: Article title
- `pubDate`: Publication date (Format: `YYYY-MM-DD`)

#### Recommended Fields:
- `updatedDate`: Update date (Format: `YYYY-MM-DD`)
- `description`: Article description or summary
- `tags`: List of tags (Format: `["tag1", "tag2"]`)
- `category`: Category (Format: `"Category Name"`)
- `cover`: Article cover image path (Format: `"/images/cover.jpg"`)
- `draft`: Whether it is a draft (Format: `true` or `false`)

#### Example Frontmatter:
```yaml
---
title: "Your Article Title"
pubDate: 2024-01-01
updatedDate: 2024-01-01
description: "Your article description or summary"
tags: ["TagA", "TagB"]
category: "CategoryC"
cover: "/images/your-cover-image.jpg"
draft: false
---
```

### 4. Static Resource Handling

If your Markdown files contain images or other media files, you need to handle these resources manually.

1. **Copy resource files**: Copy media files such as images and videos to Mizuki's `public/` directory, usually recommended to be placed in `public/images/` or `public/assets/`.

2. **Update file paths**: Ensure that image links in Markdown files point to the correct paths in the Mizuki project.
   - Example: `![Image Description](/images/your-image.jpg)`

### 5. Update Internal Links

If your Markdown files contain internal links to other articles or pages, ensure these links are still valid in Mizuki.

- Mizuki's article links are usually `/posts/your-post-slug/`.

### 6. Verify Import Results

After the import is complete, please check the following items:

- [ ] Article title, date, tags are displayed correctly
- [ ] Article content is complete and correctly formatted
- [ ] Images and media files are displayed normally
- [ ] Internal links are accessible normally
- [ ] Article categories and tags are displayed correctly
- [ ] Article summary is displayed normally

## Common Issues

### Q: How to batch add Frontmatter?
A: For a large number of files, you can write a simple script (e.g., a Python script) to read the Markdown file content and then insert Frontmatter at the top. The script needs to automatically generate `title` and `pubDate` based on the file name or content, and other fields may need to be manually supplemented.

### Q: How to batch replace image paths?
A: You can use the find and replace function of a text editor, or command-line tools (such as `sed`) to batch replace image paths in Markdown files.

### Q: Article not displayed after import?
A: Check the following points:
   - Whether the file is placed in the `src/content/posts/` directory.
   - Whether the Frontmatter is correct, especially the `title` and `pubDate` fields.
   - Articles with `draft: true` will not be displayed in the production environment, please ensure it is set to `draft: false`.

## Summary

Importing pure Markdown files into Mizuki is relatively simple, with the main work focusing on adding correct Frontmatter to each file and handling static resource paths. Through careful checking and necessary batch processing tools, you can efficiently complete the import work.