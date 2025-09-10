---
title: Typecho Migration to Mizuki
createTime: 2025/08/16 23:56:17
permalink: /en/transfer/typecho-to-mizuki/
---

# Typecho Migration to Mizuki Guide

This guide will help you migrate your Typecho blog posts to the Mizuki theme.

## What is Mizuki?

Mizuki is a modern blog theme developed based on Astro, featuring:
- Fast static site generation
- Modern design style
- Excellent SEO support
- Responsive layout
- Supports multiple content formats

## Differences Between Typecho and Mizuki Article Formats

### Typecho Database Structure
Typecho stores articles in a database, mainly containing the following fields:
- `title`: Article title
- `text`: Article content (Markdown format)
- `created`: Creation time
- `modified`: Modification time
- `slug`: Article slug
- `tags`: Tags
- `category`: Category

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

1. Back up your Typecho website and database
2. Ensure Mizuki theme is installed
3. Prepare article storage directory: `src/content/posts/`
4. Prepare database access tools (e.g., phpMyAdmin, Navicat, etc.)

### 2. Export Typecho Content

#### Method One: Export using Typecho Admin Panel
1. Log in to Typecho admin panel
2. Go to "Console" �?"Backup"
3. Select export format (usually XML or SQL)
4. Download the exported file

#### Method Two: Direct Database Access
Use a database management tool to query the Typecho database directly:

```sql
-- Query all published articles
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

### 3. Convert Article Format

#### Process Article Content
Typecho article content is usually already in Markdown format, but the following processing is required:

1. **Extract article data**: Extract article information from the database query results
2. **Create file names**: Create file names using slug or title
3. **Add Frontmatter**: Add metadata for each article

#### Frontmatter Field Mapping

| Typecho Field | Mizuki Field | Description |
|-------------|-------------|------|
| `title` | `title` | Article title |
| `created` | `pubDate` | Publication date (convert to YYYY-MM-DD format) |
| `modified` | `updatedDate` | Update date (convert to YYYY-MM-DD format) |
| First few lines of `text` | `description` | Article description (manual extraction) |
| Tag query result | `tags` | Array of tags |
| Category query result | `category` | Category string |
| - | `draft` | Set to false |

#### Example Conversion Result
```yaml
---
title: "Typecho Usage Tips"
pubDate: 2024-01-15
updatedDate: 2024-01-16
description: "Sharing some usage tips and optimization methods for the Typecho blog system"
tags: ["Typecho", "Blog", "Tips"]
category: "Technology Sharing"
draft: false
---

# Typecho Usage Tips

Here is the main content of the article...
```

### 4. Static Resource Migration

#### Images and Media Files

1. **Locate Typecho upload directory**:
   - Default path: `/usr/uploads/`
   - Or check upload settings in Typecho admin panel

2. **Download media files**:
   - Download the entire upload directory via FTP
   - Or use a server file manager

3. **Organize into Mizuki**:
   - Copy files to the `public/images/` directory
   - Maintain the original directory structure or reorganize

4. **Update image paths**:
   - Typecho: `![Image](/usr/uploads/2024/01/image.jpg)`
   - Mizuki: `![Image](/images/2024/01/image.jpg)`

### 5. Handle Typecho Specific Features

#### Attachment System
Typecho attachments need to be handled manually:
- Download all attachment files
- Update attachment links in articles
- Place attachments in the appropriate directory

#### Custom Fields
If Typecho's custom fields are used, you need to:
- Query the `typecho_fields` table to get custom field data
- Convert important fields to Frontmatter
- Or retain relevant information in the article content

#### Page Content
Typecho's independent pages (type='page') need to be handled separately:
- Create corresponding Astro page files
- Or convert to a special article type

### 6. Update Internal Links

Update the format of internal links in articles:
- Typecho: `[Link](/archives/123/)`
- Mizuki: `[Link](/posts/post-slug/)`

### 7. Verify Migration Results

After the migration is complete, please check the following items:

- [ ] Article title, date, tags are correct
- [ ] Images and media files are displayed normally
- [ ] Internal links are accessible normally
- [ ] Article categories and tags are displayed correctly
- [ ] Article content is correctly formatted
- [ ] Attachment links work normally
- [ ] Custom fields are correctly migrated

## Common Issues

### Q: How to batch export Typecho articles?
A: It is recommended to query the database directly and write a script to batch generate Markdown files. You can also use Typecho's export plugin.

### Q: How to handle Typecho comments?
A: Mizuki currently only supports the Twikoo comment system. Typecho comments can be exported for backup, but cannot be directly migrated to the new system.

### Q: How to handle Typecho theme customization features?
A: Typecho theme customization features need to be re-implemented in Mizuki, or similar alternative solutions need to be found.

### Q: How to convert timestamps in the database?
A: Typecho uses Unix timestamps, which need to be converted to standard date format. You can use the `FROM_UNIXTIME()` function or programming language's date conversion functions.

### Q: How to handle Typecho category hierarchy?
A: Mizuki only supports single-level categories. If Typecho uses multi-level categories, it is recommended to choose the most specific category, or add hierarchy information to tags.

## Advanced Function Migration

### Comment System
Mizuki currently only supports Twikoo comment system, can be enabled in the configuration file.

### SEO Optimization
- Ensure every article has `description` field
- Keep the original URL structure or set redirect
- Validate sitemap and RSS subscription function
- Check meta tag settings

### RSS Subscription
Mizuki will automatically generate RSS subscription, no extra configuration needed.

### Search Function
Mizuki has built-in search function, can be used as alternative to Typecho's search plugin.

### Redirect Setting
To maintain SEO value, it is recommended to set redirect from the old Typecho URL to the new Mizuki URL:
- Typecho: `/archives/123/`
- Mizuki: `/posts/post-slug/`

## Migration Script Example

Below is a simple PHP script example for exporting Typecho articles:

```php
<?php
// 注意：这只是一个示例，实际使用时需要根据具体情况调�?
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
    $frontmatter .= "description: \"\"\n"; // 需要手动填�?    $frontmatter .= "tags: [\"" . implode('\", \"', $tags) . "\"]\n";
    $frontmatter .= "category: \"\"\n"; // 需要手动填�?    $frontmatter .= "draft: false\n";
    $frontmatter .= "---\n\n";
    
    $content = $frontmatter . $post['text'];
    
    file_put_contents("posts/{$filename}.md", $content);
}

function sanitize_filename($filename) {
    return preg_replace('/[^a-zA-Z0-9-_]/', '-', $filename);
}
?>
```

## Summary

From Typecho to Mizuki migration requires handling database export, format conversion, and feature replacement. Since Typecho uses database storage, migration process is relatively complex, suggestion is to do the migration in steps:

1. Export the core article content
2. Handle images and attachments
3. Convert links and formats
4. Test and optimize

Migration process should be backed up the original data, and after the migration process, do a full test to ensure all functionalities work normally.