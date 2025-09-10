---
title: WordPress Migration to Mizuki
createTime: 2025/08/16 23:56:17
permalink: /en/transfer/wordpress-to-mizuki/
---

# WordPress Migration to Mizuki Guide

This guide will help you migrate your WordPress blog posts to the Mizuki theme.

## What is Mizuki?

Mizuki is a modern blog theme developed based on Astro, featuring:
- Fast static site generation
- Modern design style
- Excellent SEO support
- Responsive layout
- Supports multiple content formats

## Differences Between WordPress and Mizuki Article Formats

### WordPress Export Format
WordPress usually exports content via XML files, including article title, content, categories, tags, publication date, and other information.

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

1. Back up your WordPress website
2. Ensure Mizuki theme is installed
3. Prepare article storage directory: `src/content/posts/`

### 2. Export WordPress Content

#### Method One: Export using WordPress Admin Panel
1. Log in to WordPress admin panel
2. Go to "Tools" "Export"
3. Select "Posts", click "Download Export File"
4. Obtain the XML formatted export file

#### Method Two: Export as Markdown using a Plugin
It is recommended to use the following plugins to export WordPress content directly as Markdown format:
- **WordPress to Static Site Generator**
- **Simply Static**
- **WP Gatsby Markdown Exporter**

### 3. Convert Article Format

#### Convert from XML
If you obtained an XML file, you need to convert it to Markdown format. You can use online tools or convert manually:

1. **Manual Conversion**:
   - Copy article title and content
   - Create a new `.md` file
   - Add Frontmatter

2. **Online Conversion Tools**:
   - WordPress to Markdown converter
   - Pandoc command-line tool

#### Add Frontmatter
Add the required Frontmatter for Mizuki to each article:

```yaml
---
title: "Your Article Title"
pubDate: 2024-01-15  # WordPress publication date
updatedDate: 2024-01-16  # WordPress last modified date
description: "Article summary or description"  # Can be obtained from WordPress excerpt
tags: ["Tag1", "Tag2"]  # WordPress tags
category: "Category Name"  # WordPress main category
cover: "/images/cover.jpg"  # Featured image (if any)
draft: false
---
```

### 4. Static Resource Migration

#### Images and Media Files

1. **Download WordPress media files**:
   - Download the `/wp-content/uploads/` directory via FTP
   - Or use a WordPress media export plugin

2. **Organize image files**:
   - Copy images to Mizuki's `public/images/` directory
   - Maintain the original directory structure or reorganize

3. **Update image paths**:
   - WordPress: `https://yoursite.com/wp-content/uploads/2024/01/image.jpg`
   - Mizuki: `![Image](/images/2024/01/image.jpg)`

### 5. Update Internal Links

Update the format of internal links in articles:
- WordPress: `https://yoursite.com/2024/01/15/post-name/`
- Mizuki: `[Link](/posts/post-name/)`

### 6. Handle WordPress Specific Features

#### Shortcodes
WordPress shortcodes need to be manually converted to Markdown or HTML:
- `[gallery]` �?Manually create image gallery
- `[caption]` �?Use Markdown image syntax
- `[youtube]` �?Directly embed YouTube link

#### Custom Fields
If WordPress custom fields are used, they need to be converted to Frontmatter fields.

### 7. Verify Migration Results

After the migration is complete, please check the following items:

- [ ] Article title, date, tags are correct
- [ ] Images and media files are displayed normally
- [ ] Internal links are accessible normally
- [ ] Article categories and tags are displayed correctly
- [ ] Article summary is displayed normally
- [ ] Shortcodes are correctly converted
- [ ] Custom fields are migrated

## Common Issues

### Q: How to handle WordPress multi-level categories?
A: Mizuki only supports single categories. It is recommended to choose the main category as `category`, and other categories can be added to `tags`.

### Q: How to migrate WordPress comments?
A: Mizuki currently only supports the Twikoo comment system. WordPress comments cannot be directly migrated. It is recommended to export them for backup and use a new comment system.

### Q: How to handle WordPress custom post types?
A: Custom post types need to be decided whether to migrate to Mizuki's article system or create custom pages based on their content.

### Q: How to replace WordPress plugin functionalities?
A: Most WordPress plugin functionalities need to find alternative solutions or be manually implemented, such as SEO plugin functionalities can be achieved through Mizuki's built-in SEO support.

## Advanced Feature Migration

### Comment System
Mizuki currently only supports the Twikoo comment system, which can be enabled in the configuration file.

### SEO Optimization
- Ensure every article has a `description` field
- Check if the article's URL structure meets SEO requirements
- Validate sitemap and RSS subscription functionality
- Set appropriate meta tags

### RSS Subscription
Mizuki automatically generates RSS subscriptions, no extra configuration is needed.

### Redirect Settings
To maintain SEO value, it is recommended to set up redirects from old WordPress URLs to new Mizuki URLs.

## Summary

Migrating from WordPress to Mizuki is a relatively complex process, with the main challenges being format conversion and feature replacement. It is recommended to migrate in batches, starting with core article content, then gradually handling images, links, and advanced features. During the migration process, be sure to back up original data and perform comprehensive testing after migration to ensure all functionalities work correctly.