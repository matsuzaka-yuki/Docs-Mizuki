---
title: 项目页面
createTime: 2025/11/20 22:20:00
permalink: /special/projects/
---

### 项目页面配置教程

Mizuki 主题内置了一个专业的项目展示（Projects）页面，用于展示您参与或开发的项目作品。这个页面可以帮助访客了解您的技术能力和项目经验。

本教程将详细指导你如何添加、修改和管理项目数据。

---

#### **1. 核心概念：页面与数据分离**

::: file-tree

- Mizuki
  - src
    - pages
      - projects.astro
    - data
      - projects.ts
:::

在 Mizuki 主题中，项目页面的**展示逻辑**和**内容数据**是分开的：

*   **展示逻辑**: `src/pages/projects.astro`
    *   这个文件负责项目页面的HTML结构、CSS样式和JavaScript交互逻辑。
    *   它定义了项目如何在页面上排列、筛选、排序和展示。
    *   **通常情况下，你不需要修改这个文件。**

*   **内容数据**: `src/data/projects.ts`
    *   这个文件是项目内容的"数据库"。所有的项目数据都以数组的形式存储在这里。
    *   每一个项目都是一个对象，包含 `id`, `title`, `description`, `image`, `category` 等属性。
    *   **添加、修改或删除项目，都在这个文件中操作。**

---

#### **2. `src/data/projects.ts` 文件详解**

打开 `src/data/projects.ts`，你会看到类似下面的代码结构：

```typescript title="src/data/projects.ts"
export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string;
}

export const projectsData: Project[] = [
	{
		id: "mizuki-blog",
		title: "Mizuki Blog Theme",
		description: "Modern blog theme developed based on Astro framework, supporting multilingual, dark mode, and responsive design features.",
		image: "",
		category: "web",
		techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
		status: "completed",
		liveDemo: "https://blog.example.com",
		sourceCode: "https://github.com/example/mizuki",
		visitUrl: "https://blog.example.com",
		startDate: "2024-01-01",
		endDate: "2024-06-01",
		featured: true,
		tags: ["Blog", "Theme", "Open Source"],
	},
];
```

**数据结构说明**:

*   **`interface Project`**: 这是一个TypeScript接口，它定义了每一个项目必须包含的字段和它们的类型。
    *   `id: string`: (必填) 项目的唯一标识符，通常是字符串格式的名称。用于内部引用和过滤。
    *   `title: string`: (必填) 项目的名称。
    *   `description: string`: (必填) 项目的详细描述，可以多行文本。
    *   `image: string`: (必填) 项目展示图片的路径，通常放在 `public/images/projects/` 目录下。
    *   `category: "web" | "mobile" | "desktop" | "other"`: (必填) 项目的类型分类，用于筛选。
    *   `techStack: string[]`: (必填) 项目使用的技术栈数组，如 ["React", "Node.js"]。
    *   `status: "completed" | "in-progress" | "planned"`: (必填) 项目的当前状态，用于筛选。
    *   `liveDemo?: string`: (可选) 项目在线演示的URL地址。
    *   `sourceCode?: string`: (可选) 项目源代码仓库的URL地址，通常是GitHub链接。
    *   `startDate: string`: (必填) 项目开始日期，格式为 "YYYY-MM-DD"。
    *   `endDate?: string`: (可选) 项目结束日期，格式为 "YYYY-MM-DD"。对于进行中的项目，此字段可省略。
    *   `featured?: boolean`: (可选) 是否为特色项目，特色项目会优先展示。
    *   `tags?: string[]`: (可选) 项目标签数组，用于更细致的分类。
    *   `visitUrl?: string`: (可选) 项目访问链接，可以是演示链接或项目主页。

*   **`export const projectsData: Project[] = [...]`**: 这是实际的项目数据数组。
    *   数组中的每一个对象都遵循上面 `Project` 接口的定义。
    *   项目在页面上的显示顺序通常是按照数组中的顺序，但可以按状态、分类等排序。

---

#### **3. 添加一个新项目**

按照以下步骤添加一个新的项目：

1.  **准备项目图片**:
    *   制作或获取项目展示图片，建议使用16:9或4:3的宽高比。
    *   将图片文件（如 `my-project.webp`）复制到项目的 `public/images/projects/` 目录下。
    *   如果目录不存在，可以创建它。

2.  **编辑 `projects.ts` 文件**:
    *   打开 `src/data/projects.ts`。
    *   在 `projectsData` 数组中，复制一个现有的项目对象作为模板。
    *   修改模板中的属性：
        *   **`id`**: 给一个新的、唯一的字符串ID，通常使用项目名称的小写和连字符形式。
        *   **`title`**: 输入项目的名称。
        *   **`description`**: 详细描述项目的功能、特点和技术实现。
        *   **`image`**: 设置项目展示图片的路径，如 `/images/projects/my-project.webp`。
        *   **`category`**: 设置项目类型："web"、"mobile"、"desktop"或"other"。
        *   **`techStack`**: 添加项目使用的技术栈数组。
        *   **`status`**: 设置项目状态："completed"、"in-progress"或"planned"。
        *   **`liveDemo`**: (如果有) 设置在线演示的URL。
        *   **`sourceCode`**: (如果有) 设置源代码仓库的URL。
        *   **`visitUrl`**: (如果有) 设置项目访问链接。
        *   **`startDate`**: 设置项目开始日期。
        *   **`endDate`**: (如果项目已完成) 设置项目结束日期。
        *   **`featured`**: (可选) 设置是否为特色项目。
        *   **`tags`**: (可选) 添加项目标签。

3.  **示例：添加一个新项目**

    假设我们要添加一个新的移动应用项目，内容如下：
    *   名称："任务管理应用"
    *   描述："一个支持团队协作和项目管理的跨平台任务管理应用"
    *   类别：移动应用
    *   技术栈：React Native, TypeScript, Redux, Firebase
    *   状态：进行中
    *   开始日期：2024-03-01

    修改后的 `projectsData` 数组会是这样：

    ```typescript title="src/data/projects.ts"
    export const projectsData: Project[] = [
      {
        id: "mizuki-blog",
        title: "Mizuki Blog Theme",
        description: "Modern blog theme developed based on Astro framework...",
        // ... 其他字段 ...
      },
      // ... 其他项目 ...
      // --- 这是我们新添加的项目 ---
      {
        id: "task-manager-app", // 新的ID
        title: "任务管理应用", // 名称
        description: "一个支持团队协作和项目管理的跨平台任务管理应用", // 描述
        image: "/images/projects/task-manager.webp", // 图片路径
        category: "mobile", // 项目类型
        techStack: ["React Native", "TypeScript", "Redux", "Firebase"], // 技术栈
        status: "in-progress", // 项目状态
        startDate: "2024-03-01", // 开始日期
        tags: ["移动应用", "生产力", "团队协作"], // 标签
      },
    ];
    ```

---

#### **4. 修改或删除项目**

*   **修改项目**: 直接在 `projectsData` 数组中找到对应的项目对象，修改其属性即可。
*   **删除项目**: 找到对应的项目对象，将其从数组中完全移除。注意不要留下多余的逗号，以免造成语法错误。

---

#### **5. 项目状态管理**

项目状态用于筛选和区分不同完成度的项目：

*   **"completed"**: 已完成的项目
    *   应该有 `endDate` 字段
    *   通常有 `liveDemo` 和 `sourceCode` 链接

*   **"in-progress"**: 进行中的项目
    *   不需要 `endDate` 字段
    *   可以有 `liveDemo` 和 `sourceCode` 链接

*   **"planned"**: 计划中的项目
    *   不需要 `endDate` 字段
    *   可能没有 `liveDemo` 和 `sourceCode` 链接
    *   通常只有 `startDate` 或连开始日期都没有

---

#### **6. 项目分类**

项目按照类型分为四类：

*   **"web"**: Web项目
    *   网站、Web应用、管理后台等

*   **"mobile"**: 移动应用
    *   iOS应用、Android应用、跨平台应用等

*   **"desktop"**: 桌面应用
    *   Windows应用、macOS应用、Linux应用等

*   **"other"**: 其他类型
    *   硬件项目、嵌入式系统、算法研究等

---

#### **7. 最佳实践与建议**

*   **项目图片**: 使用高质量的项目截图或设计图，建议使用16:9或4:3的宽高比。
*   **技术栈**: 真实反映项目使用的技术，不要添加未使用的技术。
*   **描述长度**: 保持描述简洁但信息丰富，突出项目亮点和技术难点。
*   **日期格式**: 严格遵守 "YYYY-MM-DD" 格式，确保日期正确显示。
*   **ID管理**: 使用有意义的ID，通常使用项目名称的小写和连字符形式。
*   **特色项目**: 标记最重要的项目为特色项目，它们会在页面顶部优先展示。

---

#### **8. 页面功能与特性**

项目页面提供以下功能：

*   **项目筛选**: 按状态（全部/已完成/进行中/计划中）和类型（全部/Web/移动应用/桌面应用/其他）筛选项目
*   **项目搜索**: 通过关键词搜索项目名称和描述
*   **技术栈展示**: 展示每个项目使用的技术栈，并支持点击技术名称查看相关项目
*   **项目统计**: 显示项目总数、按状态和类型的分布统计
*   **项目详情**: 点击项目卡片查看详细信息和相关链接

---

#### **9. 导航栏配置**

要在导航栏中显示项目链接，请确保在 `src/config.ts` 的 `navBarConfig` 中包含了项目链接：

```typescript title="src/config.ts"
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Projects, // 项目页面
		// ... 其他链接
	],
};
```

或者手动添加项目链接：

```typescript title="src/config.ts"
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "项目展示",
			url: "/projects/",
			icon: "ri:work-line",
		},
		// ... 其他链接
	],
};
```

---

通过以上步骤，你就可以轻松地管理你的项目页面了。定期更新 `src/data/projects.ts`，让访客了解你的最新项目和技术成长！