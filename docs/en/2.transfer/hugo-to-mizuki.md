---
title: Migrating Hugo to Mizuki
createTime: 2025/08/16 23:56:17
permalink: /en/transfer/hugo-to-mizuki/
---


# Guide to Migrating from Hugo to Mizuki

This guide will help you migrate your Hugo blog posts to the Mizuki theme.

## What is Mizuki?

Mizuki is a modern blog theme developed based on Astro, featuring:
- Fast static site generation
- Modern design style
- Excellent SEO support
- Responsive layout
- Supports multiple content formats

## Differences Between Hugo and Mizuki Article Formats

### Hugo Format Example:
```yaml
---
title: "My First Article"
date: 2024-01-15T10:30:00+08:00
lastmod: 2024-01-16T15:20:00+08:00
description: "This is the article summary"
tags:
  - Technology
  - Tutorial
categories:
  - Tech Sharing
images:
  - /images/cover.jpg
draft: false
---
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
```

## Migration Steps

### 1. Preparation

1. Back up your Hugo blog files.
2. Ensure the Mizuki theme is installed.
3. Prepare the article storage directory: `src/content/posts/`.

### 2. Article Content Migration

Copy all `.md` files from Hugo's `content/posts/` directory to Mizuki's `src/content/posts/` directory.

### 3. Manually Adjust Frontmatter

After conversion, you need to manually adjust the following:

- Change the `date` field to `pubDate`, and the format to `YYYY-MM-DD`.
- Change the `lastmod` field to `updatedDate`, and the format to `YYYY-MM-DD`.
- Keep the `description` field unchanged.
- Use the first element of the `categories` array as the `category` string.
- Ensure `tags` is an array of strings.
- Use the first element of the `images` field as the `cover` string.

### 4. Static Resource Migration

#### Images and Media Files

1. Copy Hugo's `static/images/` directory to Mizuki's `public/images/`.
2. Image paths usually remain unchanged:
   - Hugo: `![Image](/images/example.jpg)`
   - Mizuki: `![Image](/images/example.jpg)`

### 5. Update Internal Links

Update the format of internal links in articles:
- Hugo: `[Link]({{< ref "posts/my-post.md" >}})` or `[Link](/posts/my-post/)`
- Mizuki: `[Link](/posts/my-post/)`

### 6. Verify Migration Results

After migration, please check the following items:

- [ ] Article title, date, tags are correct.
- [ ] Images and media files are displayed normally.
- [ ] Internal links are accessible.
- [ ] Article categories and tags are displayed correctly.
- [ ] Article summary is displayed normally.

## Common Issues

### Q: Date format conversion issues
A: Ensure that Hugo's `YYYY-MM-DDTHH:mm:ss+ZZ:ZZ` format is converted to Mizuki's `YYYY-MM-DD` format.

### Q: Images not displayed
A: Check if the image paths are correct and ensure image files have been copied to the `public/images/` directory.

### Q: Tags and categories displayed abnormally
A: Check if `tags` in the frontmatter is an array format and `category` is a string format.

## Advanced Feature Migration

### Comment System
Mizuki currently only supports the Twikoo comment system, which can be enabled in the configuration file.

### SEO Optimization
- Ensure each article has a `description` field.
- Check if the article's URL structure meets SEO requirements.
- Verify sitemap and RSS subscription functions.

### RSS Subscription
Mizuki automatically generates RSS subscriptions, no additional configuration is required.

## Summary

By following the steps above, you can successfully migrate your Hugo blog to the Mizuki theme. The most important aspects during migration are ensuring the correct frontmatter format and the correctness of static resource paths. If you encounter any issues, carefully check the file format and path configurations.