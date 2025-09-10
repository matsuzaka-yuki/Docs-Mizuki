---
title: HTML Files into Mizuki
createTime: 2025/08/16 23:56:17
permalink: /en/transfer/html-import/
---

# Guide to Importing HTML Files into Mizuki  

This guide will help you import content from your existing HTML files into the Mizuki theme.  


## What is Mizuki?  

Mizuki is a modern blog theme built with Astro, featuring the following characteristics:  
- Fast static site generation  
- Modern design style  
- Excellent SEO support  
- Responsive layout  
- Compatibility with multiple content formats  


## Differences Between HTML Files and Mizuki Article Format  

The core of Mizuki articles are Markdown files, which require specific Frontmatter (YAML header information) to define article metadata. To directly import HTML file content, you need to convert the HTML to Markdown format and add the required Frontmatter.  


### Example of a Plain HTML File:  
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Article</title>
</head>
<body>
    <h1>My First HTML Article</h1>
    <p>This is content in plain HTML format.</p>
    <h2>Subheading</h2>
    <p>More content...</p>
</body>
</html>
```  


### Example of Mizuki Format (Converted to Markdown + Added Frontmatter):  
```yaml
---
title: Guide to Importing HTML
published: 2025-01-20
pinned: true
description: A detailed guide to importing HTML content into Mizuki.
tags: [Import, HTML, Mizuki]
category: Import Guides
licenseName: "Unlicensed"
author: Your Name
sourceLink: ""
draft: false
---


# My First HTML Article

This is content in plain HTML format.

## Subheading

More content...
```  


## Import Steps  

### 1. Preparation  

1. Ensure the Mizuki theme is installed.  
2. Prepare the article storage directory: `src/content/posts/`.  


### 2. Convert HTML to Markdown  

Since Mizuki uses Markdown as its content format, you need to convert HTML content to Markdown. This typically requires tools or libraries.  

#### Recommended Tools:  
- **Online Converters**: e.g., `html2markdown.com` or the online version of `pandoc`.  
- **Programming Libraries**:  
  - **Python**: Use `BeautifulSoup` (for parsing HTML) with `markdownify` or `html2text` (for converting to Markdown).  
  - **Node.js**: Use the `turndown` library.  


#### Conversion Example (Python + html2text):  
```python
import html2text

html_content = """
<!DOCTYPE html>
<html>
<body>
    <h1>My First HTML Article</h1>
    <p>This is content in plain HTML format.</p>
    <h2>Subheading</h2>
    <p>More content...</p>
</body>
</html>
"""

h = html2text.HTML2Text()
h.ignore_links = False
markdown_content = h.handle(html_content)

print(markdown_content)
```  


#### Conversion Example (Node.js + turndown):  
```javascript
const TurndownService = require('turndown')

const turndownService = new TurndownService()
const markdown = turndownService.turndown('<h1>My First HTML Article</h1><p>This is content in plain HTML format.</p><h2>Subheading</h2><p>More content...</p>')

console.log(markdown)
```  


Save the converted Markdown content as a `.md` file and place it in Mizuki’s article directory: `src/content/posts/`.  


### 3. Add Frontmatter  

For each converted Markdown file, you need to add Mizuki’s required Frontmatter—either manually or via a script. This is the most critical step in the import process.  

#### Required Fields:  
- `title`: Article title  
- `pubDate`: Publication date (format: `YYYY-MM-DD`)  

#### Recommended Fields:  
- `updatedDate`: Update date (format: `YYYY-MM-DD`)  
- `description`: Article summary or description  
- `tags`: List of tags (format: `["Tag1", "Tag2"]`)  
- `category`: Article category (format: `"Category Name"`)  
- `cover`: Path to the article cover image (format: `"/images/cover.jpg"`)  
- `draft`: Whether the article is a draft (format: `true` or `false`)  


#### Example Frontmatter:  
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


### 4. Handle Static Resources  

If your HTML files contain images or other media files, you need to process these resources manually:  

1. **Copy Resource Files**: Copy images, videos, and other media files to Mizuki’s `public/` directory—we recommend placing them in `public/images/` or `public/assets/`.  

2. **Update File Paths**: Ensure image links in Markdown files point to the correct paths in the Mizuki project.  
   - Example: `![Image Description](/images/your-image.jpg)`  


### 5. Update Internal Links  

If your HTML files include internal links to other articles or pages, ensure these links remain valid in Mizuki.  
- Article links in Mizuki typically follow the format: `/posts/your-post-slug/`.  


### 6. Verify Import Results  

After the import is complete, check the following items:  

- [ ] Article titles, dates, and tags display correctly  
- [ ] Article content is complete and formatted properly  
- [ ] Images and media files load normally  
- [ ] Internal links are accessible  
- [ ] Article categories and tags display correctly  
- [ ] Article excerpts display normally  


## Frequently Asked Questions  

### Q: How to batch convert HTML to Markdown?  
A: For a large number of files, we recommend writing a script to automate the conversion. The `pandoc` command-line tool is also a powerful option, supporting conversions between multiple formats.  


### Q: How to batch replace image paths?  
A: Use the find-and-replace function in a text editor or command-line tools (e.g., `sed`) to batch replace image paths in Markdown files.  


### Q: Why aren’t imported articles showing up?  
A: Check the following:  
   - Is the file placed in the `src/content/posts/` directory?  
   - Is the Frontmatter correct (especially the `title` and `pubDate` fields)?  
   - Articles with `draft: true` won’t display in production environments—ensure it’s set to `draft: false`.  


## Summary  

Importing HTML file content into Mizuki involves converting HTML to Markdown, adding valid Frontmatter to the converted Markdown files, and handling static resource paths. While more complex than importing plain Markdown, this process can be completed efficiently with the right tools and careful verification.