---
title: Migrating Hexo to Mizuki
createTime: 2025/08/16 23:56:17
permalink: /en/transfer/hexo-to-mizuki/
---

# Hexo to Mizuki Migration Guide

This guide will help you migrate your Hexo blog posts to the Mizuki theme.

## What is Mizuki?

Mizuki is a modern blog theme developed based on Astro, featuring:
- Fast static site generation
- Modern design style
- Excellent SEO support
- Responsive layout
- Supports various content formats

## Differences in Article Format between Hexo and Mizuki

### Hexo Format Example:
```yaml
title: "My First Article"
date: 2024-01-15 10:30:00
tags:
  - Hexo
  - Blog
categories:
  - Essay
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

1. Back up your Hexo blog files
2. Ensure the Mizuki theme is installed
3. Prepare the article storage directory: `src/content/posts/`

### 2. Article Content Migration

Copy all `.md` files from Hexo's `source/_posts/` directory to Mizuki's `src/content/posts/` directory.

### 3. Manually Adjust Frontmatter

After conversion, you need to manually adjust the following:

- Change the `date` field to `pubDate`, and format it as `YYYY-MM-DD`
- Change the `updated` field to `updatedDate`, and format it as `YYYY-MM-DD`
- Change the `excerpt` field to `description`
- Use the first element of the `categories` array as the `category` string
- Ensure `tags` is in string array format

### 4. Static Resource Migration

#### Images and Media Files

1. Copy Hexo's `source/images/` directory to Mizuki's `public/images/`
2. Image paths usually remain unchanged:
   - Hexo: `![Image](/images/example.jpg)`
   - Mizuki: `![Image](/images/example.jpg)`

### 5. Update Internal Links

Update the format of internal links in articles:
- Hexo: `[Link](/2023/01/01/post-name/)`
- Mizuki: `[Link](/posts/post-name/)`

### 6. Verify Migration Results

After migration, please check the following items:

- [ ] Article title, date, and tags are correct
- [ ] Images and media files are displayed normally
- [ ] Internal links are accessible
- [ ] Article categories and tags are displayed correctly
- [ ] Article summary is displayed normally

## Frequently Asked Questions

### Q: Date Format Conversion Issues
A: Ensure that Hexo's `YYYY-MM-DD HH:mm:ss` format is converted to Mizuki's `YYYY-MM-DD` format.

### Q: Images are not displayed
A: Check if the image path is correct and ensure that the image files have been copied to the `public/images/` directory.

### Q: Tag and Category Display Abnormalities
A: Check if `tags` in the frontmatter is in array format and `category` is in string format.

## Advanced Feature Migration

### Comment System
Mizuki currently only supports the Twikoo comment system, which can be enabled in the configuration file.

### SEO Optimization
- Ensure each article has a `description` field
- Check if the article's URL structure meets SEO requirements
- Verify sitemap and RSS feed functionality

### RSS Feed
Mizuki automatically generates an RSS feed, no additional configuration is required.

## Summary

By following these steps, you can successfully migrate your Hexo blog to the Mizuki theme. The most important aspects during migration are ensuring the correct frontmatter format and the correctness of static resource paths. If you encounter problems, carefully check the file format and path configuration.