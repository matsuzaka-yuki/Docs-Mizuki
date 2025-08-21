---
title: 自定义页面
createTime: 2025/08/17 17:21:41
permalink: /special/about/
---

**关于页面修改教程**

Mizuka 主题的关于页面内容存储在 Markdown 文件中，您可以轻松地自定义页面内容。

## 关于页面结构

关于页面的内容位于 `src/content/spec/about.md` 文件中。该文件使用 Markdown 格式编写，支持标准 Markdown 语法以及 Mizuka 主题扩展的语法。

## 修改页面内容

要修改关于页面的内容，请直接编辑 `src/content/spec/about.md` 文件：

1. 打开文件查看现有内容
2. 使用 Markdown 语法修改文本内容
3. 可以添加或删除章节
4. 保存文件后重新启动开发服务器即可看到更改

## 支持的 Markdown 扩展语法

Mizuka 主题支持多种 Markdown 扩展语法：

### 1. GitHub 卡片

使用 `::github{repo="用户名/仓库名"}` 语法嵌入 GitHub 仓库卡片：

```
::github{repo="matsuzaka-yuki/mizuki"}
```

### 2. 注意框

使用 `> [!NOTE]`、`> [!TIP]`、`> [!WARNING]` 等语法创建美观的注意框：

```
> [!NOTE]
> 这是一个注意框。
```

### 3. 数学公式

使用 `$inline$` 和 `$$block$$` 语法编写 LaTeX 数学公式：

```
行内公式：$E = mc^2$

块级公式：$$
E = mc^2
$$
```

## 页面样式

关于页面的样式由 `src/pages/about.astro` 文件控制。除非您需要修改页面布局或添加新功能，否则通常不需要修改此文件。