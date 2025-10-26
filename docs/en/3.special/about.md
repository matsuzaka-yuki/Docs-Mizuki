---
title: Custom Page
createTime: 2025/08/17 17:21:41
permalink: /en/special/about/
---

**About Page Modification Tutorial**

The content of the About page in the Mizuki theme is stored in a Markdown file, allowing you to easily customize the page content.

## About Page Structure

The content of the About page is located in the `src/content/spec/about.md` file. This file is written in Markdown format and supports standard Markdown syntax as well as extended syntax from the Mizuki theme.

## Modifying Page Content

To modify the content of the About page, directly edit the `src/content/spec/about.md` file:

1. Open the file to view existing content
2. Modify the text content using Markdown syntax
3. You can add or delete sections
4. Save the file and restart the development server to see the changes

## Supported Markdown Extended Syntax

Mizuka theme supports various Markdown extended syntaxes:

### 1. GitHub Card

Use the `::github{repo="username/repository"}` syntax to embed a GitHub repository card:

```
::github{repo="matsuzaka-yuki/mizuki"}
```

### 2. Admonition Blocks

Use `> [!NOTE]`、`> [!TIP]`、`> [!WARNING]` and other syntaxes to create beautiful admonition blocks:

```
> [!NOTE]
> This is a note block.
```

### 3. Math Formulas

Use `$inline$` and `$$block$$` syntax to write LaTeX math formulas:

```
Inline formula: $E = mc^2$

Block formula: $$
E = mc^2
$$
```

## Page Styles

The styles for the About page are controlled by the `src/pages/about.astro` file. You typically do not need to modify this file unless you need to change the page layout or add new features.
