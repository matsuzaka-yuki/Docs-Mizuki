---
title: 友链页面
createTime: 2025/08/17 17:21:41
permalink: /special/friends/
---

### 友链页面配置教程

Mizuki 主题内置了一个美观的友情链接（Friends）页面，用于展示与您的博客相关的其他网站或朋友的博客链接。与传统博客文章不同，友情链接更侧重于快速访问和分类管理。

本教程将详细指导你如何添加、修改和管理友情链接数据。

---

#### **1. 核心概念：页面与数据分离**

::: file-tree

- Mizuki
  - src
    - pages
      - friends.astro
    - data
      - friends.ts
:::

在 Mizuki 主题中，友情链接页面的**展示逻辑**和**内容数据**是分开的：

*   **展示逻辑**: `src/pages/friends.astro`
    *   这个文件负责友情链接页面的HTML结构、CSS样式和JavaScript交互逻辑。
    *   它定义了友情链接如何在页面上排列、头像如何展示、标签如何分类等。
    *   **通常情况下，你不需要修改这个文件。**

*   **内容数据**: `src/data/friends.ts`
    *   这个文件是友情链接内容的"数据库"。所有的友情链接都以数组的形式存储在这里。
    *   每一个友情链接都是一个对象，包含 `id`, `title`, `imgurl`, `desc`, `siteurl` 和 `tags` 等属性。
    *   **添加、修改或删除友情链接，都在这个文件中操作。**

---

#### **2. `src/data/friends.ts` 文件详解**

打开 `src/data/friends.ts`，你会看到类似下面的代码结构：

```typescript
export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
	},
];
```

**数据结构说明**:

*   **`interface FriendItem`**: 这是一个TypeScript接口，它定义了每一个友情链接必须包含的字段和它们的类型。
    *   `id: number`: (必填) 友情链接的唯一标识符。**必须是数字，且不能重复**。通常按添加顺序递增。
    *   `title: string`: (必填) 网站或博客的名称。
    *   `imgurl: string`: (必填) 网站头像或Logo的URL地址。建议使用正方形图片，尺寸为640x640像素。
    *   `desc: string`: (必填) 网站的简短描述。
    *   `siteurl: string`: (必填) 网站的URL地址，需要包含协议（http://或https://）。
    *   `tags: string[]`: (必填) 标签数组，用于分类。至少包含一个标签。

*   **`export const friendsData: FriendItem[] = [...]`**: 这是实际的友情链接数据数组。
    *   数组中的每一个对象都遵循上面 `FriendItem` 接口的定义。
    *   友情链接在页面上的显示顺序**通常是按照数组中的顺序**，但可以使用随机排序函数使其随机展示。

---

#### **3. 添加一个新的友情链接**

按照以下步骤添加一个新的友情链接：

1.  **准备头像图片**:
    *   获取或制作一个网站头像图片，建议使用正方形图片，尺寸为640x640像素。
    *   推荐使用GitHub头像、网站Logo或其他代表性图片。
    *   确保图片URL可以正常访问。

2.  **编辑 `friends.ts` 文件**:
    *   打开 `src/data/friends.ts`。
    *   在 `friendsData` 数组中，复制一个现有的友情链接对象作为模板。
    *   修改模板中的属性：
        *   **`id`**: 给一个新的、唯一的数字（例如，在最后一个友情链接的`id`基础上加1）。
        *   **`title`**: 输入网站或博客的名称。
        *   **`imgurl`**: 设置头像图片的URL。
        *   **`desc`**: 输入网站的简短描述，建议控制在50个字符以内。
        *   **`siteurl`**: 设置网站的URL地址，确保包含协议。
        *   **`tags`**: 添加适当的标签，至少一个。标签用于分类和筛选。

3.  **示例：添加一个新的友情链接**

    假设我们要在现有友情链接后添加一个新的，内容如下：
    *   名称："Vue.js"
    *   头像：Vue.js的Logo
    *   描述："渐进式JavaScript框架"
    *   网址："https://vuejs.org"
    *   标签：["Framework", "JavaScript"]

    修改后的 `friendsData` 数组会是这样：

    ```typescript
    export const friendsData: FriendItem[] = [
      {
        id: 1,
        title: "Astro",
        imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
        desc: "The web framework for content-driven websites",
        siteurl: "https://github.com/withastro/astro",
        tags: ["Framework"],
      },
      {
        id: 2,
        title: "Mizuki Docs",
        imgurl: "http://q.qlogo.cn/headimg_dl?dst_uin=3231515355&spec=640&img_type=jpg",
        desc: "Mizuki User Manual",
        siteurl: "https://docs.mizuki.mysqil.com",
        tags: ["Docs"],
      },
      // ... 其他友情链接 ...
      // --- 这是我们新添加的友情链接 ---
      {
        id: 9, // 新的ID
        title: "Vue.js", // 名称
        imgurl: "https://avatars.githubusercontent.com/u/6128107?v=4&s=640", // 头像URL
        desc: "渐进式JavaScript框架", // 描述
        siteurl: "https://vuejs.org", // 网站URL
        tags: ["Framework", "JavaScript"], // 标签
      },
    ];
    ```

---

#### **4. 修改或删除友情链接**

*   **修改友情链接**: 直接在 `friendsData` 数组中找到对应的友情链接对象，修改其 `title`, `imgurl`, `desc`, `siteurl` 或 `tags` 属性即可。
*   **删除友情链接**: 找到对应的友情链接对象，将其从数组中完全移除。注意不要留下多余的逗号，以免造成语法错误。

---

#### **5. 高级功能：随机排序**

友情链接页面支持随机排序功能，确保所有链接都有平等的展示机会：

```typescript
// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
```

你可以在页面组件中调用 `getShuffledFriendsList()` 函数来获取随机排序后的友情链接列表。

---

#### **6. 最佳实践与建议**

*   **头像图片**: 建议使用正方形的高质量图片，尺寸为640x640像素。可以使用GitHub头像、网站Logo或其他代表性图片。
*   **描述长度**: 保持描述简洁，建议控制在50个字符以内，避免过长的文本影响页面布局。
*   **标签管理**: 使用一致的标签命名，便于分类和管理。建议使用英文标签，如"Framework"、"Docs"等。
*   **链接有效性**: 定期检查友情链接的有效性，移除失效链接。
*   **ID管理**: 保持 `id` 的连续性和唯一性，这有助于你管理友情链接，也便于未来可能的功能扩展（如按ID查询）。

---

#### **7. 页面特性与自定义**

友情链接页面具有以下特性：

*   **响应式设计**: 在不同设备上都能良好显示
    *   桌面端：2列网格布局
    *   移动端：1列布局

*   **标签显示**: 每个友情链接可以显示相关标签，帮助访客了解网站类型

*   **悬停效果**: 鼠标悬停时有过渡动画效果

*   **随机排序**: 支持随机排序，确保公平展示

如需自定义样式，可以修改对应的CSS类或使用主题提供的自定义样式选项。

---

#### **8. 导航栏配置**

要在导航栏中显示友情链接，请确保在 `src/config.ts` 的 `navBarConfig` 中包含了友情链接：

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Friends, // 友情链接
		// ... 其他链接
	],
};
```

或者手动添加友情链接：

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "友情链接",
			url: "/friends/",
			icon: "ri:links-line",
		},
		// ... 其他链接
	],
};
```

---

#### **9. 友情链接申请**

如果你想让其他站长能够申请友情链接，可以考虑创建一个友情链接申请页面。这里是一个简单的建议：

1. 创建一个联系表单，收集申请者的网站信息
2. 定期审核申请，将符合条件的网站添加到 `friendsData` 数组中
3. 在友情链接页面上方说明申请规则和联系方式

---

通过以上步骤，你就可以轻松地管理你的友情链接页面了。定期更新 `src/data/friends.ts`，让你的博客与其他优质网站建立联系吧！