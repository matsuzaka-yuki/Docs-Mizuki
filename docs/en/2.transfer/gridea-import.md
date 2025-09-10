---
title: Migrating Gridea to Mizuki
createTime: 2025/08/16 23:56:17
permalink: /en/transfer/gridea-import/
---

# Gridea to Mizuki Migration Guide

This guide will help you migrate your existing Gridea blog content to the Mizuki theme.

## What is Mizuki?

Mizuki is a modern blog theme developed based on Astro, featuring:
- Fast static site generation
- Modern design style
- Excellent SEO support
- Responsive layout
- Supports various content formats

## Differences in Article Format between Gridea and Mizuki

Gridea stores articles in Markdown format and includes Frontmatter. This makes migrating from Gridea to Mizuki relatively simple, as both are based on Markdown and Frontmatter.

The main differences lie in the naming and structure of Frontmatter fields, as well as the path handling of static resources (images, etc.).

### Gridea Article Example:
```markdown
---
title: "My Gridea Article"
date: 2023-10-26 10:00:00
tags:
  - Essay
categories:
  - Daily
--- 

This is the content of a Gridea blog post.

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

# My Gridea Article

This is the content of a Gridea blog post.

## Subtitle

More content...
```

## Migration Steps

### 1. Preparation

1. Ensure the Mizuki theme is installed.
2. Prepare the article storage directory: `src/content/posts/`.
3. Locate your Gridea blog source files, usually in the "Source File Directory" set in the Gridea client. Articles are typically located in `[Source File Directory]/posts/`. 

### 2. Copy Article Files

Copy all Markdown files from the `posts` folder in your Gridea blog source file directory to Mizuki's article directory `src/content/posts/`.

### 3. Adjust Frontmatter

This is the most crucial step in the migration process. You need to adjust the Frontmatter of your Gridea articles according to Mizuki's Frontmatter specifications.

#### Common Field Mappings:
- `title`: Gridea's `title` directly corresponds to Mizuki's `title`.
- `date`: Gridea's `date` (e.g., `2023-10-26 10:00:00`) needs to be converted to Mizuki's `pubDate` (e.g., `2023-10-26`). If Gridea does not have `updatedDate`, you can use the `pubDate` value as `updatedDate`.
- `tags`: Gridea's `tags` list directly corresponds to Mizuki's `tags` list.
- `categories`: Gridea's `categories` list usually has only one element, corresponding to Mizuki's `category`.
- `description`: Gridea may not have a separate `description` field; you can manually add it or extract it from the article content.
- `cover`: Gridea may not have a separate `cover` field; you can manually add it.
- `draft`: Gridea usually determines this by whether the article is published. Mizuki requires `draft: true` or `false`.

#### Batch Modification Suggestions:
For a large number of articles, it is recommended to write a script (e.g., a Python script) to automate the Frontmatter conversion.

**Conceptual Python Script Example:**

```python
import os
import re
import yaml

def migrate_gridea_frontmatter(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract Frontmatter and content
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
    if not match:
        print(f"Skipping {file_path}: No valid Frontmatter found.")
        return

    fm_str = match.group(1)
    body = match.group(2)

    try:
        gridea_fm = yaml.safe_load(fm_str)
    except yaml.YAMLError as e:
        print(f"Error parsing YAML in {file_path}: {e}")
        return

    mizuki_fm = {}
    mizuki_fm['title'] = gridea_fm.get('title', 'Untitled')
    
    # Process date
    date_str = gridea_fm.get('date', '').split(' ')[0] # Only take the date part
    mizuki_fm['pubDate'] = date_str if date_str else 'YYYY-MM-DD'
    mizuki_fm['updatedDate'] = date_str if date_str else 'YYYY-MM-DD'

    mizuki_fm['description'] = gridea_fm.get('description', '') # Gridea may not have this, needs manual addition
    mizuki_fm['tags'] = gridea_fm.get('tags', [])
    mizuki_fm['category'] = gridea_fm.get('categories', ['Uncategorized'])[0] if gridea_fm.get('categories') else 'Uncategorized'
    mizuki_fm['cover'] = gridea_fm.get('cover', '') # Gridea may not have this, needs manual addition
    mizuki_fm['draft'] = gridea_fm.get('draft', False) # Gridea may not have this, defaults to False

    new_fm_str = yaml.dump(mizuki_fm, allow_unicode=True, sort_keys=False)

    new_content = f"---\n{new_fm_str}---\n\n{body}"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Migrated Frontmatter for: {file_path}")

# Example usage
# posts_dir = 'path/to/your/mizuki/src/content/posts'
# for filename in os.listdir(posts_dir):
#     if filename.endswith('.md'):
#         migrate_gridea_frontmatter(os.path.join(posts_dir, filename))
```

### 4. Static Resource Handling

Gridea typically stores static resources like images in `[Source File Directory]/media/` or in an `assets` folder at the same level as the article. You need to copy these resources to Mizuki's `public/` directory and update the paths in your articles.

1. **Copy Resource Files**: Copy all image, video, and other media files from Gridea's `media` folder (or `assets` folder containing images) to Mizuki's `public/images/` or `public/assets/` directory.

2. **Update File Paths**: In Markdown files, batch replace image links to point to the correct paths in your Mizuki project.
   - Example: Replace `![alt](/media/image.jpg)` with `![alt](/images/image.jpg)`.
   - If images are in an `assets` folder at the same level as the article, e.g., `![alt](./assets/image.jpg)`, you need to adjust their paths to Mizuki's relative or absolute paths, e.g., `![alt](/images/post-slug/image.jpg)` or `![alt](/images/image.jpg)`.

### 5. Update Internal Links

If your Gridea articles contain internal links to other articles or pages, ensure these links remain valid in Mizuki.

- Mizuki's article links are typically `/posts/your-post-slug/`.
- You may need to write a script to parse and update these internal links.

### 6. Verify Import Results

After importing, please check the following items:

- [ ] Article title, date, and tags are displayed correctly
- [ ] Article content is complete and formatted correctly
- [ ] Images and media files are displayed normally
- [ ] Internal links are accessible
- [ ] Article categories and tags are displayed correctly
- [ ] Article summary is displayed normally

## Frequently Asked Questions

### Q: How to migrate Gridea's theme configuration?
A: Gridea's theme configuration is different from Mizuki's and cannot be directly migrated. You need to reconfigure the theme according to Mizuki's documentation.

### Q: How to handle Gridea's comments?
A: Mizuki does not come with a built-in comment system. You can consider integrating a third-party comment system, such as Disqus, Gitalk, Waline, etc., and try to import Gridea's comment data into these systems.

### Q: How to migrate Gridea's custom pages?
A: Gridea's custom pages can be migrated as independent pages in Mizuki. Convert their content to Markdown and create corresponding `.md` files in Mizuki's `src/content/pages/` directory.

## Summary

Migrating Gridea to Mizuki is relatively straightforward, with the main work focusing on Frontmatter field mapping and static resource path adjustments. By writing automated scripts, efficiency can be greatly improved. Be sure to thoroughly verify after migration to ensure all content and functions are normal.