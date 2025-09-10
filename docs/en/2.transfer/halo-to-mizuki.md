---
title: Migrating Halo to Mizuki
createTime: 2025/08/16 23:56:17
permalink: /en/transfer/halo-to-mizuki/
---

# Halo to Mizuki Migration Guide

This guide will help you migrate your Halo blog posts to the Mizuki theme.

## What is Mizuki?

Mizuki is a modern blog theme developed based on Astro, featuring:
- Fast static site generation
- Modern design style
- Excellent SEO support
- Responsive layout
- Supports various content formats

## Differences in Article Format between Halo and Mizuki

### Halo Export Format Example:

Halo exported Markdown files usually do not have Frontmatter, but are in pure Markdown format:

```markdown
# My First Article

This is the article content...
```

Article metadata (title, date, tags, etc.) is usually contained in the exported JSON file or needs to be obtained separately from the Halo backend.

### Mizuki Format Example:
```yaml
---
title: Migrating Halo to Mizuki
published: 2025-01-20
pinned: true
description: A detailed guide for migrating Halo to Mizuki.
tags: [Migration, Halo, Mizuki]
category: Migration Guides
licenseName: "Unlicensed"
author: Your Name
sourceLink: ""
draft: false
---
```

## Migration Steps

### 1. Preparation

1. Export all articles from the Halo backend in Markdown format
2. Back up your Halo blog data
3. Ensure the Mizuki theme is installed
4. Prepare the article storage directory: `src/content/posts/`

### 2. Export Halo Articles and Data

#### Export Article Content
In the Halo backend management interface:
1. Go to "Article Management"
2. Select the "Export" function
3. Choose Markdown format for export
4. Download the exported file package

#### Obtain Article Metadata
Since Halo exported Markdown files do not contain frontmatter, you need to additionally obtain the article's metadata:

**Method One: Manual Recording from Backend**
- Record the publication date and update date of each article
- Record the tags and categories of the article
- Record the abstract and cover image of the article

**Method Two: Database Export**
- If you can access Halo's database, you can export article-related data tables
- Focus mainly on metadata information in the `posts` table

### 3. Article Content Migration

Copy the exported Markdown files to Mizuki's `src/content/posts/` directory:

```bash
cp halo-export/*.md mizuki/src/content/posts/
```

### 4. Add Frontmatter

Since Halo exported articles do not have Frontmatter, you need to manually add the required Mizuki Frontmatter for each article:

#### Method One: Manual Addition

Add Frontmatter to the beginning of each article:

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



### 5. Static Resource Migration

#### Images and Media Files

1. Copy Halo's `static file directory` to Mizuki's `public/images/` or a location of your choice
2. Update image paths in articles:
   - Mizuki: `![Image](/images/example.jpg)`





### 6. Update Internal Links

Update the format of internal links in articles:
- Mizuki: `[Link](/posts/post-slug/)`

### 7. Supplement Article Metadata

1. **Supplement Publication Date**: Change `pubDate` to the actual publication date of the article
2. **Supplement Update Date**: Change `updatedDate` to the last update date of the article
3. **Add Article Description**: Add the article summary in the `description` field
4. **Add Tags**: Add the actual tags of the article in the `tags` array
5. **Add Category**: Add the category of the article in the `category` field
6. **Set Cover Image**: If there is a cover image, set the path in the `cover` field

### 8. Verify Migration Results

After migration, please check the following items:

- [ ] Article title is displayed correctly
- [ ] Publication date and update date are correct
- [ ] Article description is displayed correctly
- [ ] Tags and categories are displayed correctly
- [ ] Images and media files are displayed normally
- [ ] Internal links are accessible
- [ ] Draft status is set correctly

## Frequently Asked Questions

### Q: Date Format Conversion Issues
A: Halo uses ISO 8601 format (e.g., `2024-01-15T10:30:00+08:00`), which needs to be converted to Mizuki's `YYYY-MM-DD` format.

### Q: Tag and Category Display Abnormalities
A: Since Halo exported articles do not have frontmatter, you need to manually add tag and category information. You can refer to the original Halo backend's category and tag settings.

### Q: Article Slug Issues
A: Mizuki automatically generates slugs based on the filename. It is recommended to rename Halo exported files to meaningful English names, such as `my-first-post.md`.

## Advanced Feature Migration

### Comment System
Mizuki currently only supports the Twikoo comment system. If you used other comment systems in Halo, you need to:
1. Export existing comment data
2. Configure the Twikoo comment system
3. Manually import important comments if needed

### Custom Pages
If you created custom pages in Halo (e.g., About page, Friends page), you need to:
1. Copy the page content to Mizuki's `src/pages/` directory
2. Adjust the page format to meet Astro's requirements
3. Update the navigation menu configuration

### SEO Optimization
- Ensure each article has a `description` field
- Check if the article's URL structure meets SEO requirements
- Verify sitemap and RSS feed functionality
- If custom meta tags were set in Halo, they need to be reconfigured in Mizuki

### RSS Feed
Mizuki automatically generates an RSS feed, no additional configuration is required. The subscription address is usually `/rss.xml`.

## Post-Migration Optimization Suggestions

### Performance Optimization
- Compress image files to improve loading speed
- Check and delete unnecessary static files
- Configure CDN to accelerate static resources

### Content Optimization
- Check if the article format is correct
- Update outdated links and information
- Optimize article tag and category structure

## Summary

Through the above steps, you can successfully migrate your Halo blog to the Mizuki theme. The most important aspects during the migration process are:
1. Correctly convert the frontmatter format
2. Properly handle static resource paths
3. Verify that all functions work normally

If you encounter issues, please carefully check the file format and path configuration. If necessary, you can debug file by file.