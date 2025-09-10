---
title: Z-Blog Migration to Mizuki
createTime: 2025/08/16 23:56:17
permalink: /en/transfer/zblog-import/
---

# Z-Blog Migration to Mizuki Guide

This guide will help you migrate your existing Z-Blog content to the Mizuki theme.

## What is Mizuki?

Mizuki is a modern blog theme developed based on Astro, featuring:
- Fast static site generation
- Modern design style
- Excellent SEO support
- Responsive layout
- Supports multiple content formats

## Differences Between Z-Blog and Mizuki Article Formats

Z-Blog typically stores article content in a database, presented in HTML or rich text format. Mizuki articles are primarily Markdown files and require specific Frontmatter (YAML header information) to define article metadata.

The key to migration is to export the article content from the Z-Blog database, convert it to Markdown format, and extract the necessary metadata to generate the Frontmatter.

### Z-Blog Article Content Example (may be HTML in database):
```html
<p>This is the content of a Z-Blog article.</p>
<h2>Article Subtitle</h2>
<p>More content...</p>
```

### Mizuki Format Example (converted to Markdown with Frontmatter):
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

# My Z-Blog Article

This is the content of a Z-Blog article.

## Article Subtitle

More content...
```

## Migration Steps

### 1. Preparation

1. Ensure Mizuki theme is installed.
2. Prepare article storage directory: `src/content/posts/`.
3. Access your Z-Blog backend to understand the data structure of articles, categories, tags, attachments, etc.
4. Prepare database access tools (e.g., phpMyAdmin, Navicat, DBeaver) to export data.

### 2. Export Z-Blog Content

Z-Blog data is usually stored in SQLite or MySQL databases. You need to export article, category, tag, and other data from the database.

#### Export Article Data (Example for MySQL):

Connect to your Z-Blog database and execute SQL queries to export article data. Focus on the `zbp_post` table.

```sql
SELECT
    log_ID AS id,
    log_Title AS title,
    log_Content AS content,
    log_PostTime AS pubDate,
    log_UpdateTime AS updatedDate, -- Z-Blog may not have a direct update time field; adjust as needed
    log_Intro AS description,
    log_Tag AS tags,
    log_CateID AS category_id,
    log_Status AS status -- 0: Published, 1: Draft
FROM zbp_post
WHERE log_Type = 0; -- 0 for articles, 1 for pages
```

#### Export Category and Tag Data:

- **Categories**: `zbp_category` table
- **Tags**: `zbp_tag` table

You need to export this data in CSV, JSON, or another easily processable format.

### 3. Convert Article Format

Convert the exported HTML content to Markdown format and generate Frontmatter for each article.

#### Conversion Tools:
- **Programming Script**: It is recommended to write scripts using Python or Node.js to automate this process.
    - **HTML to Markdown**: Use `html2text` (Python) or `turndown` (Node.js) libraries.
    - **Frontmatter Generation**: Dynamically generate YAML-formatted Frontmatter based on the exported data.

**Python Migration Script Example (Conceptual):**

```python
import sqlite3 # or pymysql
import html2text
import yaml
import os
from datetime import datetime

def convert_html_to_markdown(html_content):
    h = html2text.HTML2Text()
    h.ignore_links = False
    return h.handle(html_content)

def generate_frontmatter(post_data):
    # Assume post_data contains fields exported from the database
    title = post_data.get('title', 'Untitled Article')
    pub_date = datetime.fromtimestamp(post_data.get('pubDate')).strftime('%Y-%m-%d') if post_data.get('pubDate') else datetime.now().strftime('%Y-%m-%d')
    updated_date = datetime.fromtimestamp(post_data.get('updatedDate')).strftime('%Y-%m-%d') if post_data.get('updatedDate') else pub_date
    description = post_data.get('description', '')
    tags = [tag.strip() for tag in post_data.get('tags', '').split(',') if tag.strip()] # Z-Blog tags may be comma-separated
    category = post_data.get('category_name', 'Uncategorized') # Need to get category name via category_id
    is_draft = True if post_data.get('status') == 1 else False

    fm = {
        'title': title,
        'pubDate': pub_date,
        'updatedDate': updated_date,
        'description': description,
        'tags': tags,
        'category': category,
        'draft': is_draft
    }
    return yaml.dump(fm, allow_unicode=True, sort_keys=False)

def migrate_zblog_posts(db_path, output_dir):
    conn = sqlite3.connect(db_path) # Replace with your database connection method
    cursor = conn.cursor()

    # Example: Query article data
    cursor.execute("SELECT log_ID, log_Title, log_Content, log_PostTime, log_Intro, log_Tag, log_CateID, log_Status FROM zbp_post WHERE log_Type = 0")
    posts = cursor.fetchall()

    # Assume you already have a category name mapping
    category_map = {1: 'Technology', 2: 'Life'} # Example mapping

    for post in posts:
        post_id, title, content_html, pub_time, intro, tags_str, cate_id, status = post
        
        markdown_content = convert_html_to_markdown(content_html)
        
        post_data = {
            'title': title,
            'pubDate': pub_time,
            'updatedDate': pub_time, # Z-Blog may not have a direct update time, using publish time for now
            'description': intro,
            'tags': tags_str,
            'category_name': category_map.get(cate_id, 'Uncategorized'),
            'status': status
        }
        
        frontmatter = generate_frontmatter(post_data)
        
        # Generate filename, usually using the pinyin or slug of the article title
        filename = f"{title.replace(' ', '-')}.md"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(f"---\n{frontmatter}---\n\n{markdown_content}")
        print(f"Migrated: {filename}")

    conn.close()

# Example usage
# migrate_zblog_posts('path/to/your/zblog.db', 'path/to/mizuki/src/content/posts')
```

### 4. Static Resource Handling

Images in Z-Blog articles are usually stored in the `zb_users/upload/` directory. You need to copy these images to Mizuki's `public/` directory and update the image paths in the articles.

1. **Copy Resource Files**: Copy all image, video, and other media files from Z-Blog's `zb_users/upload/` directory to Mizuki's `public/images/` or `public/assets/` directory.

2. **Update File Paths**: In the converted Markdown files, batch replace image links to point to the correct paths in the Mizuki project.
   - Example: Replace `![alt](/zb_users/upload/2024/01/image.jpg)` with `![alt](/images/2024/01/image.jpg)`.

### 5. Update Internal Links

If your Z-Blog articles contain internal links to other articles or pages, ensure these links remain valid in Mizuki.

- Mizuki's article links are typically `/posts/your-post-slug/`.
- You may need to write a script to parse and update these internal links.

### 6. Verify Import Results
After the import is completed, please check the following items:

- [ ] Article titles, dates, and tags are displayed correctly
- [ ] Article content is complete and formatted properly
- [ ] Images and media files are displayed normally
- [ ] Internal links are accessible
- [ ] Article categories and tags are displayed correctly
- [ ] Article excerpts are displayed normally


## Frequently Asked Questions

### Q: How to handle Z-Blog comments?
A: Mizuki does not come with a built-in comment system. You can consider integrating third-party comment systems such as Disqus, Gitalk, and Waline, and try importing Z-Blog comment data into these systems.

### Q: How to migrate custom fields from Z-Blog?
A: If your Z-Blog articles use custom fields, you need to determine whether to merge their content into the Markdown main text or use them as additional Frontmatter fields (if supported by Mizuki), based on the importance of these fields.

### Q: How to handle Z-Blog pages?
A: Z-Blog pages can be migrated as independent pages in Mizuki. Convert their content to Markdown and create corresponding `.md` files in the `src/content/pages/` directory of Mizuki.


## Summary
Migrating from Z-Blog to Mizuki is a complex process involving data export, format conversion, metadata extraction, and resource handling. Writing automated scripts can greatly improve efficiency. Be sure to perform a thorough verification after migration to ensure all content and functions work properly.