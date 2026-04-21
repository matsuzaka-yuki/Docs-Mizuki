---
title: Giscus评论系统配置
createTime: 2026/04/21 21:16:22
permalink: /Article-layout/Giscus/
copyright:
  author:
    name: LyraVoid Team
    url: https://github.com/LyraVoid
---
# Giscus 评论系统配置说明
Giscus 评论系统配置位于 `src/config.ts` 文件中的 `commentConfig` 对象，控制博客的评论系统显示设置。

```typescript title="src/config.ts"
export const commentConfig: CommentConfig = {
	enable: false, // 启用评论功能。当设置为 false 时，评论组件将不会显示在文章区域。
	system: "twikoo", // 评论系统选择: "twikoo" | "giscus"
	twikoo: {
		envId: "https://twikoo.vercel.app",
		lang: SITE_LANG,
	},
	giscus: {
		repo: "your-github-username/your-repo-name",
		repoId: "your-repo-id",
		category: "Announcements",
		categoryId: "your-category-id",
		mapping: "pathname",
		strict: "0",
		reactionsEnabled: "1",
		emitMetadata: "0",
		inputPosition: "top",
		theme: "preferred_color_scheme",
		lang: SITE_LANG,
		loading: "lazy",
	},
};
```
我们来详细解析 `src/config.ts` 文件中的 `commentConfig` 对象中的 `giscus` 配置，并为你提供一份配置教程。

Giscus 是一个基于 **GitHub Discussions** 的评论系统，免费、无广告、数据完全由你掌控。它非常适合技术博客，因为访客需要使用 GitHub 账号登录才能发表评论。

---

### **前置要求**

在配置 Giscus 之前，你需要确保以下条件已满足：

1.  **GitHub 仓库**：你需要一个公开的 GitHub 仓库用于存储评论数据。
2.  **已安装 Giscus GitHub App**：前往 [https://github.com/apps/giscus](https://github.com/apps/giscus) 安装到你的仓库。
3.  **已启用 Discussions**：在你的 GitHub 仓库的 Settings 中启用 Discussions 功能。

---

### **核心配置项详解**

#### **1. 启用评论功能 (`enable`)**

```typescript
enable: false,
```

*   **作用**: 控制整个评论系统的开关。
*   **配置**:
    *   `true`: 启用评论功能。文章页面将显示评论区。
    *   `false`: (默认) 禁用评论功能。评论区将不会在任何页面显示。

#### **2. 评论系统选择 (`system`)**

```typescript
system: "twikoo", // 评论系统选择: "twikoo" | "giscus"
```

*   **作用**: 选择要使用的评论系统。
*   **配置**:
    *   `"twikoo"`: (默认) 使用 Twikoo 评论系统。关于 Twikoo 的详细配置，请参阅 [Twikoo 配置文档](/Article-layout/Twikoo/)。
    *   `"giscus"`: 使用 Giscus 评论系统。基于 GitHub Discussions，适合技术博客。

#### **3. Giscus 具体配置 (`giscus`)**

```typescript
giscus: {
		repo: "your-github-username/your-repo-name",
		repoId: "your-repo-id",
		category: "Announcements",
		categoryId: "your-category-id",
		mapping: "pathname",
		strict: "0",
		reactionsEnabled: "1",
		emitMetadata: "0",
		inputPosition: "top",
		theme: "preferred_color_scheme",
		lang: SITE_LANG,
		loading: "lazy",
},
```

*   **作用**: 包含所有与 Giscus 服务相关的配置。

##### **仓库信息 (`repo` / `repoId`)**

```typescript
repo: "your-github-username/your-repo-name",
repoId: "your-repo-id",
```

*   **作用**: 指定用于存储评论的 GitHub 仓库。
*   **`repo`**: 仓库的完整路径，格式为 `用户名/仓库名`。
*   **`repoId`**: 仓库的唯一 ID。
*   **如何获取**: 这两个值可以在 [Giscus 官网配置页面](https://giscus.app/zh-CN) 输入你的仓库后自动生成。

##### **Discussion 分类 (`category` / `categoryId`)**

```typescript
category: "Announcements",
categoryId: "your-category-id",
```

*   **作用**: 指定 GitHub Discussions 中的分类，评论将以 Discussion 的形式存储在该分类下。
*   **`category`**: 分类的名称（如 `Announcements`、`General` 等）。
*   **`categoryId`**: 分类的唯一 ID。
*   **如何获取**: 同样在 [Giscus 官网配置页面](https://giscus.app/zh-CN) 自动生成。建议选择 `Announcements` 类型，这样只有管理员可以创建新 Discussion，普通用户只能回复。

##### **页面映射方式 (`mapping`)**

```typescript
mapping: "pathname",
```

*   **作用**: 决定如何将博客页面与 GitHub Discussion 关联。
*   **可选值**:
    *   `"pathname"`: (推荐) 使用页面的路径名作为关联标识。
    *   `"url"`: 使用页面的完整 URL。
    *   `"title"`: 使用页面的标题。
    *   `"og:title"`: 使用页面的 OpenGraph 标题。
    *   自定义字符串：使用特定的自定义标识。

##### **严格匹配 (`strict`)**

```typescript
strict: "0",
```

*   **作用**: 是否启用标题的严格匹配。
*   **配置**:
    *   `"0"`: (默认) 不启用严格匹配，标题相似即可匹配。
    *   `"1"`: 启用严格匹配，标题必须完全一致。

##### **反应功能 (`reactionsEnabled`)**

```typescript
reactionsEnabled: "1",
```

*   **作用**: 是否在评论上方显示反应（Reaction）按钮（如点赞、大笑等）。
*   **配置**:
    *   `"1"`: (默认) 启用反应功能。
    *   `"0"`: 禁用反应功能。

##### **元数据发送 (`emitMetadata`)**

```typescript
emitMetadata: "0",
```

*   **作用**: 是否在评论加载时发送页面元数据到 GitHub Discussion。
*   **配置**:
    *   `"0"`: (默认) 不发送元数据。
    *   `"1"`: 发送元数据。

##### **输入框位置 (`inputPosition`)**

```typescript
inputPosition: "top",
```

*   **作用**: 评论输入框的位置。
*   **配置**:
    *   `"top"`: (默认) 输入框在评论列表上方。
    *   `"bottom"`: 输入框在评论列表下方。

##### **主题 (`theme`)**

```typescript
theme: "preferred_color_scheme",
```

*   **作用**: 评论区的主题样式。
*   **配置**:
    *   `"preferred_color_scheme"`: (推荐) 跟随用户系统偏好自动切换明暗主题。
    *   `"light"`: 强制使用亮色主题。
    *   `"dark"`: 强制使用暗色主题。
    *   `"dark_dimmed"`: 暗色但对比度较低的主题。
    *   `"transparent_dark"`: 透明暗色主题。
    *   也支持自定义 CSS 主题 URL。

##### **语言 (`lang`)**

```typescript
lang: SITE_LANG,
```

*   **作用**: 评论区界面语言。使用 `SITE_LANG` 常量，与博客整体语言设置保持一致。

##### **加载方式 (`loading`)**

```typescript
loading: "lazy",
```

*   **作用**: 评论组件的加载策略。
*   **配置**:
    *   `"lazy"`: (推荐) 懒加载，当评论区滚动到可视区域时才加载，提升页面初始加载速度。
    *   `"eager"`: 立即加载，页面渲染时同步加载评论区。

---

### **完整配置流程**

1.  **准备 GitHub 仓库**:
    *   创建一个公开的 GitHub 仓库（或使用已有的）。
    *   进入仓库 Settings，勾选 Features 中的 **Discussions** 选项。
    *   前往 [https://github.com/apps/giscus](https://github.com/apps/giscus) 安装 Giscus App 到该仓库。

2.  **获取配置参数**:
    *   访问 [Giscus 官网配置页面](https://giscus.app/zh-CN)。
    *   在「仓库」栏中输入你的仓库路径（如 `username/blog-comments`）。
    *   选择页面 ↔️ Discussions 映射方式（推荐 `pathname`）。
    *   选择 Discussion 分类（推荐 `Announcements`）。
    *   页面底部会自动生成一段配置代码，其中包含你需要的 `repo`、`repoId`、`category`、`categoryId` 等值。

3.  **配置博客 `config.ts` 文件**:
    *   打开 `src/config.ts` 文件。
    *   找到 `commentConfig` 对象。
    *   将 `enable` 设置为 `true`。
    *   将 `system` 设置为 `"giscus"`。
    *   将从 Giscus 官网获取的参数填入 `giscus` 配置块。

    **配置好的示例**:
    ```typescript
    export const commentConfig: CommentConfig = {
    	enable: true, // 启用评论功能。
    	system: "giscus", // 使用 Giscus 评论系统
    	twikoo: {
    		envId: "https://twikoo.vercel.app",
    		lang: SITE_LANG,
    	},
    	giscus: {
    		repo: "my-username/blog-comments", // 替换成你的 GitHub 仓库路径
    		repoId: "R_kgDOxxxxxxx", // 替换成你的仓库 ID
    		category: "Announcements", // 替换成你的 Discussion 分类名
    		categoryId: "DIC_kwDOxxxxxxx", // 替换成你的分类 ID
    		mapping: "pathname",
    		strict: "0",
    		reactionsEnabled: "1",
    		emitMetadata: "0",
    		inputPosition: "top",
    		theme: "preferred_color_scheme",
    		lang: SITE_LANG,
    		loading: "lazy",
    	},
    };
    ```

4.  **启动并测试**:
    *   保存 `config.ts` 文件。
    *   启动或重启你的博客项目。
    *   访问一篇文章的页面，滚动到文章底部，你应该能看到 Giscus 评论区已经加载出来了。
    *   使用 GitHub 账号登录后，尝试发表一条评论，检查是否能成功提交和显示。

---

### **常见问题与注意事项**

*   **评论区不显示**:
    *   检查 `enable` 是否设置为 `true`。
    *   检查 `system` 是否设置为 `"giscus"`。
    *   检查 `repo` 和 `repoId` 是否填写正确。
    *   确认你的 GitHub 仓库是公开的，且已启用 Discussions 功能。
    *   确认已安装 [Giscus GitHub App](https://github.com/apps/giscus) 到你的仓库。
    *   打开浏览器开发者工具（按 F12），查看控制台（Console）是否有任何错误信息。

*   **无法提交评论**:
    *   确保你已使用 GitHub 账号登录。
    *   检查 `category` 和 `categoryId` 是否正确对应。
    *   确认选择的 Discussion 分类存在且可用。

*   **评论与页面未正确关联**:
    *   检查 `mapping` 设置是否正确。如果使用 `pathname`，确保博客的 URL 路径是稳定的。
    *   如果博客更换了域名或路径结构，之前关联的评论可能会丢失。建议在确定博客 URL 结构后再部署 Giscus。

*   **主题不匹配**:
    *   将 `theme` 设置为 `"preferred_color_scheme"` 可以让评论区跟随用户的系统偏好自动切换明暗主题。
    *   如果希望评论区与博客主题完全一致，可以使用自定义 CSS 主题 URL。

*   **隐私与安全**:
    *   Giscus 的评论数据存储在你的 GitHub 仓库的 Discussions 中，你拥有完全的数据控制权。
    *   评论者需要使用 GitHub 账号登录，这有助于减少垃圾评论，但也提高了评论门槛。

---

### **文章级评论控制**

除了全局配置外，你还可以在每篇文章的 frontmatter 中单独控制评论的显示：

#### **文章 frontmatter 中的 `comment` 字段**

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
tags: [Foo, Bar]
category: Front-end
draft: false
comment: false # 禁用当前文章的评论
---
```

*   **作用**: 控制单篇文章是否显示评论区。
*   **配置**:
    *   `true` 或未设置: (默认) 继承全局评论设置。如果全局启用，则显示评论区。
    *   `false`: 强制禁用当前文章的评论区，即使全局评论已启用。

#### **评论组件显示逻辑**

评论组件的显示逻辑：

1.  首先检查全局评论配置 `commentConfig.enable` 是否为 `true`
2.  然后检查文章 frontmatter 中的 `comment` 字段是否为 `false`
3.  只有当全局启用且文章未显式禁用时，评论区才会显示

通过以上步骤，你就可以成功地在你的博客中集成并使用 Giscus 评论系统了。同时，你还可以通过文章级别的 `comment` 字段，灵活控制每篇文章的评论显示。
