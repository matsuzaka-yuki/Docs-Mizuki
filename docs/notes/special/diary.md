---
title: 日记页面
createTime: 2025/08/17 17:21:41
permalink: /special/diary/
---


### 日记页面配置教程

Mizuki 主题内置了一个优雅的日记（Diary）页面，用于分享你的日常点滴、心情感悟或生活瞬间。与传统博客文章不同，日记更侧重于简短、即时的记录，通常会搭配图片。

本教程将详细指导你如何添加、修改和管理日记内容。

---

#### **1. 核心概念：页面与数据分离**

::: file-tree

- Mizuki
  - src
    - pages
      - diary.astro
    - data
      - diary.ts
:::

在 Mizuki 主题中，日记页面的**展示逻辑**和**内容数据**是分开的：

*   **展示逻辑**: `src/pages/diary.astro`
    *   这个文件负责日记页面的HTML结构、CSS样式和JavaScript交互逻辑。
    *   它定义了日记条目如何在页面上排列、图片如何展示、日期如何格式化等。
    *   **通常情况下，你不需要修改这个文件。**

*   **内容数据**: `src/data/diary.ts`
    *   这个文件是日记内容的"数据库"。所有的日记条目都以数组的形式存储在这里。
    *   每一篇日记都是一个对象，包含 `id`, `content`, `date` 和 `images` 等属性。
    *   **添加、修改或删除日记，都在这个文件中操作。**

---

#### **2. `src/data/diary.ts` 文件详解**

打开 `src/data/diary.ts`，你会看到类似下面的代码结构：

```typescript title="src/data/diary.ts"
export interface DiaryItem {
	id: number;
	content: string;
	date: string;
	images?: string[];
	location?: string;
	mood?: string;
	tags?: string[];
}

// 示例日记数据
const diaryData: DiaryItem[] = [
	{
		id: 1,
		content:
			"The falling speed of cherry blossoms is five centimeters per second!",
		date: "2025-01-15T10:30:00Z",
		images: ["/images/diary/sakura.jpg", "/images/diary/1.jpg"],
	},
];

```

**数据结构说明**:

*   **`interface DiaryItem`**: 这是一个TypeScript接口，它定义了每一篇日记必须包含的字段和它们的类型。
    *   `id: number`: (必填) 日记的唯一标识符。**必须是数字，且不能重复**。通常按时间顺序递增。
    *   `content: string`: (必填) 日记的正文内容。可以是纯文本，也可以包含换行符 (`
`)。
    *   `date: string`: (必填) 日记的发布日期和时间。**必须是ISO 8601格式**的字符串，例如 `2025-01-15T10:30:00Z`。`Z` 表示UTC时间，主题会自动将其转换为本地时间显示。
    *   `images?: string[]`: (可选) 日记附带的图片路径数组。`?` 表示这个字段是可选的。如果一篇日记没有图片，可以省略这个属性。

*   **`export const diaryData: DiaryItem[] = [...]`**: 这是实际的日记数据数组。
    *   数组中的每一个对象都遵循上面 `DiaryItem` 接口的定义。
    *   日记在页面上的显示顺序**通常是按照数组中的顺序**，从上到下排列。

---

#### **3. 添加一篇新日记**

按照以下步骤添加一篇新的日记：

1.  **准备图片（如果需要）**:
    *   将你想要展示的图片文件（如 `my-new-photo.webp`）复制到项目的 `public` 目录下。建议创建一个专门的文件夹，例如 `public/images/diary/`。
    *   **注意**: 路径是从 `public` 文件夹开始计算的。如果图片放在 `public/images/diary/` 下，那么它的路径就是 `/images/diary/my-new-photo.webp`。

2.  **编辑 `diary.ts` 文件**:
    *   打开 `src/data/diary.ts`。
    *   在 `diaryData` 数组中，复制一个现有的日记对象作为模板。
    *   修改模板中的属性：
        *   **`id`**: 给一个新的、唯一的数字（例如，在最后一篇日记的`id`基础上加1）。
        *   **`content`**: 输入你的日记内容。如果需要换行，可以使用 `
`。
        *   **`date`**: 设置日记的日期和时间。你可以在网上搜索"ISO 8601 时间生成器"来获取正确格式的字符串。
        *   **`images`**: (如果有图片) 添加图片的路径数组。如果没有图片，可以直接删除 `images` 这一行。

3.  **示例：添加一篇新日记**

    假设我们要在现有两篇日记后添加一篇新的，内容如下：
    *   内容："今天尝试了新的咖啡配方，味道很棒！"
    *   日期：2025年1月20日下午3点
    *   图片：`coffee.jpg` (已放入 `public/images/diary/` 目录)

    修改后的 `diaryData` 数组会是这样：

    ```typescript
    export const diaryData: DiaryItem[] = [
      {
        id: 1,
        content: "The falling speed of cherry blossoms is five centimeters per second!",
        date: "2025-01-15T10:30:00Z",
        images: ["/images/diary/sakura.jpg", "/images/diary/1.jpg"],
      },
      {
        id: 2,
        content: "今日は晴れで、公園でピクニックをしました。とても楽しかったです！",
        date: "2025-01-10T14:00:00Z",
      },
      // --- 这是我们新添加的日记 ---
      {
        id: 3, // 新的ID
        content: "今天尝试了新的咖啡配方，味道很棒！绵密的奶泡是关键。", // 内容，使用换行
        date: "2025-01-20T15:00:00Z", // 新的日期
        images: ["/images/diary/coffee.jpg"], // 新的图片路径
      },
    ];
    ```

---

#### **4. 修改或删除日记**

*   **修改日记**: 直接在 `diaryData` 数组中找到对应的日记对象，修改其 `content`, `date` 或 `images` 属性即可。
*   **删除日记**: 找到对应的日记对象，将其从数组中完全移除。注意不要留下多余的逗号，以免造成语法错误。

---

#### **5. 最佳实践与建议**

*   **图片优化**: 建议使用现代的图片格式如 `.webp`，并在上传前进行压缩，以保证页面加载速度。
*   **日期格式**: 严格遵守 ISO 8601 格式 (`YYYY-MM-DDTHH:mm:ssZ`)，否则日期可能无法正确显示。
*   **ID管理**: 保持 `id` 的连续性和唯一性，这有助于你管理日记，也便于未来可能的功能扩展（如按ID查询）。
*   **内容排版**: 在 `content` 中适当使用 `
` 进行换行，可以让你的日记在页面上显示得更美观、易读。

通过以上步骤，你就可以轻松地管理你的日记页面了。定期更新 `src/data/diary.ts`，让你的博客充满生活气息吧！