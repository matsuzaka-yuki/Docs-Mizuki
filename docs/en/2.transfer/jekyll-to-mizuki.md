---
title: Jekyll Migration to Mizuki
createTime: 2025/08/16 23:56:17
permalink: /en/transfer/jekyll-to-mizuki/
---

# Jekyll Migration to Mizuki

This guide will help you migrate your existing Jekyll blog to Mizuki.

## Features of Mizuki

Mizuki is a static blog theme based on VuePress, featuring:

- **Lightweight and High Performance**: Built on VuePress, providing fast page loading speeds.
- **Beautiful Interface**: Simple, modern design, offering a good reading experience.
- **Easy to Configure**: Customize your blog with simple configuration files.
- **Markdown First**: All articles are written in Markdown format.
- **Rich Features**: Supports tags, categories, archives, comments, SEO optimization, etc.

## Differences Between Jekyll and Mizuki Article Formats

Both Jekyll and Mizuki use Markdown format for writing articles, but they have some differences in Frontmatter (article header metadata) and static resource handling.

### Frontmatter Differences

Jekyll Frontmatter example:

```yaml
---
layout: post
title: "My First Article"
date: 2023-01-01 10:00:00 +0800
categories: [Technology, Programming]
tags: [Jekyll, Markdown]
---
```

Mizuki Frontmatter example:

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

Key differences:

- The `layout` field is usually not needed in Mizuki, or you can use `layout: Post`.
- The `date` field format may need adjustment; Mizuki usually accepts `YYYY-MM-DD HH:mm:ss` format.
- `categories` and `tags` are usually in array format in Mizuki.

### Static Resource Differences

Jekyll usually places static resources like images in the `assets` or `images` directory and references them with relative paths. Mizuki also supports relative path references, but it is recommended to uniformly place static resources in the VuePress project's `public` directory, or in the same directory as the article.

## Migration Steps

Here are the detailed steps to migrate your Jekyll blog to Mizuki:

### 1. Preparation

Ensure you have Node.js and VuePress installed. If you don't have a Mizuki blog yet, please create a new Mizuki blog project according to Mizuki's official documentation first.

### 2. Article Content Migration

Jekyll articles are usually located in the `_posts` directory. You need to copy these Markdown files to the `docs` directory (or your configured article directory) of your Mizuki blog project.

For example, if your Jekyll article is in `_posts/2023-01-01-my-first-post.md`, you can copy it to Mizuki's `docs/my-first-post.md`.

### 3. Manually Adjust Frontmatter

For each copied Markdown file, you need to manually adjust its Frontmatter to meet Mizuki's requirements. This mainly includes:

- **`title`**: Ensure the title is correct.
- **`date`**: Adjust the date format to `YYYY-MM-DD HH:mm:ss`. If Jekyll's date includes timezone information, please remove it.
- **`tags` and `categories`**: Convert them to YAML array format.
- **Other fields**: Adjust according to Mizuki's Frontmatter specification.

**Example Python Script (Batch Modifying Frontmatter)**

For a large number of articles, you can write a simple Python script to batch modify Frontmatter. Here is an example for converting Jekyll's `categories` and `tags` to Mizuki's format:

```python
import os
import re
import yaml

def convert_jekyll_frontmatter_to_mizuki(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match Frontmatter
    match = re.match(r'^---
(.*?)
---
(.*)$', content, re.DOTALL)
    if not match:
        print(f"Skipping {file_path}: No valid Frontmatter found.")
        return

    frontmatter_str = match.group(1)
    body = match.group(2)

    try:
        frontmatter = yaml.safe_load(frontmatter_str)
    except yaml.YAMLError as e:
        print(f"Error parsing Frontmatter in {file_path}: {e}")
        return

    # Adjust date format
    if 'date' in frontmatter:
        # Remove timezone information and format
        date_str = str(frontmatter['date'])
        if '+' in date_str:
            date_str = date_str.split('+')[0].strip()
        frontmatter['date'] = date_str

    # Adjust categories and tags format
    if 'categories' in frontmatter and isinstance(frontmatter['categories'], str):
        frontmatter['categories'] = [c.strip() for c in frontmatter['categories'].split(',')]
    elif 'categories' in frontmatter and not isinstance(frontmatter['categories'], list):
        frontmatter['categories'] = [frontmatter['categories']]

    if 'tags' in frontmatter and isinstance(frontmatter['tags'], str):
        frontmatter['tags'] = [t.strip() for t in frontmatter['tags'].split(',')]
    elif 'tags' in frontmatter and not isinstance(frontmatter['tags'], list):
        frontmatter['tags'] = [frontmatter['tags']]

    # Remove layout field
    if 'layout' in frontmatter:
        del frontmatter['layout']

    new_frontmatter_str = yaml.dump(frontmatter, allow_unicode=True, sort_keys=False)
    new_content = f"---\n{new_frontmatter_str}---\n{body}"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully converted Frontmatter for {file_path}")

# Example usage:
# articles_dir = 'path/to/your/mizuki/docs/articles'
# for root, _, files in os.walk(articles_dir):
#     for file in files:
#         if file.endswith('.md'):
#             file_path = os.path.join(root, file)
#             convert_jekyll_frontmatter_to_mizuki(file_path)
```

Please modify the `articles_dir` variable according to your actual situation and run this script carefully.

### 4. Static Resource Migration

Copy static resources such as images and attachments referenced in your Jekyll blog to the `docs/.vuepress/public` directory (or your custom static resource directory) of your Mizuki blog project. Then, you need to update the reference paths to these static resources in your articles.

For example, if Jekyll referenced `![Image](/assets/images/my-image.png)`, and you copied `my-image.png` to `docs/.vuepress/public/images/`, then in Mizuki, you might need to change it to `![Image](/images/my-image.png)`.

### 5. Update Internal Links

Jekyll internal links usually use `{% post_url 2023-01-01-my-first-post %}` or relative paths. You need to update these links to the Markdown link format recognized by Mizuki, such as `[Article Title](/my-first-post.html)` or `[Article Title](/my-first-post)`.

### 6. Verify Migration Results

After completing the above steps, run your Mizuki blog and check the migrated articles:

```bash
npm run docs:dev
```

- Check if the articles are displayed correctly.
- Check if images and other static resources are loaded normally.
- Check if internal links are valid.
- Check if tags and categories are displayed correctly.

## Common Issues

### 1. Batch Adding Frontmatter

If you have a large number of Markdown files without Frontmatter, you can use the Python script above for batch adding and formatting.

### 2. Batch Replacing Image Paths

If your image paths need to be replaced in batches, you can use the find and replace function of a text editor (which supports regular expressions), or write a script to process them.

### 3. Article Not Displayed After Import

- Check if the Frontmatter is correct, especially the `title` and `date` fields.
- Check if the file path is correct, ensuring the file is located in the article directory configured in Mizuki.
- Check the VuePress configuration to ensure there are no errors in `config.js` or `config.ts`.

### Comment System
Jekyll may use comment systems such as Disqus and Gitalk. Mizuki also supports a variety of comment systems, and you can configure your preferred comment system according to Mizuki's documentation.

### SEO Optimization
Jekyll typically generates `sitemap.xml` and `robots.txt` via plugins. Mizuki also has corresponding plugins or configuration options to handle SEO.

### RSS Subscription
Jekyll usually provides RSS subscription through `feed.xml`. Mizuki also supports RSS subscription, and you can configure relevant plugins to generate an RSS feed.

We hope this guide helps you successfully complete the migration from Jekyll to Mizuki!