---
title: 技能页面
createTime: 2025/11/20 22:24:00
permalink: /special/skills/
---

### 技能页面配置教程

Mizuki 主题内置了一个专业的技能展示（Skills）页面，用于展示您掌握的技术栈、工具和专业能力。这个页面可以帮助访客了解您的技术专长和专业水平。

本教程将详细指导你如何添加、修改和管理技能数据。

---

#### **1. 核心概念：页面与数据分离**

::: file-tree

- Mizuki
  - src
    - pages
      - skills.astro
    - data
      - skills.ts
:::

在 Mizuki 主题中，技能页面的**展示逻辑**和**内容数据**是分开的：

*   **展示逻辑**: `src/pages/skills.astro`
    *   这个文件负责技能页面的HTML结构、CSS样式和JavaScript交互逻辑。
    *   它定义了技能如何分类、排序和展示。
    *   **通常情况下，你不需要修改这个文件。**

*   **内容数据**: `src/data/skills.ts`
    *   这个文件是技能内容的"数据库"。所有的技能数据都以数组的形式存储在这里。
    *   每一个技能都是一个对象，包含 `id`, `name`, `description`, `level` 等属性。
    *   **添加、修改或删除技能，都在这个文件中操作。**

---

#### **2. `src/data/skills.ts` 文件详解**

打开 `src/data/skills.ts`，你会看到类似下面的代码结构：

```typescript
export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[];
	certifications?: string[];
	color?: string;
}

export const skillsData: Skill[] = [
	{
		id: "javascript",
		name: "JavaScript",
		description: "Modern JavaScript development, including ES6+ syntax, asynchronous programming, and modular development.",
		icon: "logos:javascript",
		category: "frontend",
		level: "advanced",
		experience: { years: 3, months: 6 },
		projects: ["mizuki-blog", "portfolio-website", "data-visualization-tool"],
		color: "#F7DF1E",
	},
];
```

**数据结构说明**:

*   **`interface Skill`**: 这是一个TypeScript接口，它定义了每一个技能必须包含的字段和它们的类型。
    *   `id: string`: (必填) 技能的唯一标识符，通常是技能名称的小写形式。
    *   `name: string`: (必填) 技能的显示名称。
    *   `description: string`: (必填) 技能的详细描述，说明掌握程度和应用场景。
    *   `icon: string`: (必填) 技能的图标名称，使用Iconify图标集。
    *   `category: "frontend" | "backend" | "database" | "tools" | "other"`: (必填) 技能分类，用于组织和筛选。
    *   `level: "beginner" | "intermediate" | "advanced" | "expert"`: (必填) 技能水平等级。
    *   `experience: { years: number, months: number }`: (必填) 技能经验，包含年数和月数。
    *   `projects?: string[]`: (可选) 相关项目的ID列表。
    *   `certifications?: string[]`: (可选) 相关证书列表。
    *   `color?: string`: (可选) 技能卡片的主题颜色，使用十六进制格式。

*   **`export const skillsData: Skill[] = [...]`**: 这是实际的技能数据数组。
    *   数组中的每一个对象都遵循上面 `Skill` 接口的定义。
    *   技能在页面上的显示顺序通常是按照分类和水平排序。

---

#### **3. 添加一个新技能**

按照以下步骤添加一个新的技能：

1.  **编辑 `skills.ts` 文件**:
    *   打开 `src/data/skills.ts`。
    *   在 `skillsData` 数组中，复制一个现有的技能对象作为模板。
    *   修改模板中的属性：
        *   **`id`**: 给一个新的、唯一的字符串ID，通常使用技能名称的小写形式。
        *   **`name`**: 输入技能的显示名称。
        *   **`description`**: 详细描述技能掌握程度和应用场景。
        *   **`icon`**: 设置技能的图标名称，可以在[Iconify官网](https://icon-sets.iconify.design/)搜索。
        *   **`category`**: 设置技能分类："frontend"、"backend"、"database"、"tools"或"other"。
        *   **`level`**: 设置技能水平："beginner"、"intermediate"、"advanced"或"expert"。
        *   **`experience`**: 设置技能经验，包含年数和月数。
        *   **`projects`**: (如果有) 添加相关项目的ID列表。
        *   **`certifications`**: (如果有) 添加相关证书列表。
        *   **`color`**: (可选) 设置技能卡片的主题颜色。

2.  **示例：添加一个新的后端技能**

    假设我们要添加一个新的后端技能，内容如下：
    *   名称：Go
    *   描述：Google开发的高效编程语言，适合云原生和微服务开发
    *   分类：后端
    *   水平：初级
    *   经验：8个月
    *   相关项目：微服务演示

    修改后的 `skillsData` 数组会是这样：

    ```typescript
    export const skillsData: Skill[] = [
      {
        id: "javascript",
        name: "JavaScript",
        // ... 其他字段 ...
      },
      // ... 其他技能 ...
      // --- 这是我们新添加的技能 ---
      {
        id: "go", // 新的ID
        name: "Go", // 名称
        description: "Google开发的高效编程语言，适合云原生和微服务开发", // 描述
        icon: "logos:go", // 图标
        category: "backend", // 分类
        level: "beginner", // 水平
        experience: { years: 0, months: 8 }, // 经验
        projects: ["microservice-demo"], // 相关项目
        color: "#00ADD8", // 颜色
      },
    ];
    ```

---

#### **4. 修改或删除技能**

*   **修改技能**: 直接在 `skillsData` 数组中找到对应的技能对象，修改其属性即可。
*   **删除技能**: 找到对应的技能对象，将其从数组中完全移除。注意不要留下多余的逗号，以免造成语法错误。

---

#### **5. 技能水平说明**

技能水平分为四个等级：

*   **"beginner"**: 初级
    *   掌握基本概念和语法
    *   能完成简单任务
    *   需要参考资料或指导

*   **"intermediate"**: 中级
    *   掌握核心概念和常用功能
    *   能独立完成常规任务
    *   有一定的项目经验

*   **"advanced"**: 高级
    *   深入理解原理和最佳实践
    *   能处理复杂任务和挑战
    *   有丰富的项目经验

*   **"expert"**: 专家级
    *   全面掌握，能解决难题
    *   能指导他人
    *   有权威性和影响力

---

#### **6. 技能分类**

技能按照类型分为五类：

*   **"frontend"**: 前端技术
    *   框架、库、CSS框架、构建工具等

*   **"backend"**: 后端技术
    *   编程语言、框架、API等

*   **"database"**: 数据库技术
    *   关系型数据库、NoSQL数据库等

*   **"tools"**: 开发工具
    *   IDE、版本控制、容器技术、云服务等

*   **"other"**: 其他技能
    *   测试框架、API设计、部署技术等

---

#### **7. 最佳实践与建议**

*   **经验真实性**: 真实反映技能掌握程度和经验时长。
*   **技能描述**: 简洁明了地描述技能特点和应用场景。
*   **图标选择**: 使用官方或广泛认可的图标，增强识别度。
*   **颜色协调**: 为同一类别的技能使用协调的颜色方案。
*   **项目关联**: 关联实际项目，展示技能应用实例。
*   **定期更新**: 随着技术发展和个人成长，定期更新技能水平和经验。

---

#### **8. 页面功能与特性**

技能页面提供以下功能：

*   **技能筛选**: 按分类（全部/前端/后端/数据库/工具/其他）筛选技能
*   **水平筛选**: 按水平（全部/初级/中级/高级/专家）筛选技能
*   **技能搜索**: 通过关键词搜索技能名称和描述
*   **技能统计**: 显示技能总数、按水平和分类的分布统计
*   **经验统计**: 计算并显示总工作年限和月数
*   **技能详情**: 点击技能卡片查看详细信息和相关项目

---

#### **9. 导航栏配置**

要在导航栏中显示技能链接，请确保在 `src/config.ts` 的 `navBarConfig` 中包含了技能链接：

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Skills, // 技能页面
		// ... 其他链接
	],
};
```

或者手动添加技能链接：

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "技能展示",
			url: "/skills/",
			icon: "ri:psychology-line",
		},
		// ... 其他链接
	],
};
```

---

通过以上步骤，你就可以轻松地管理你的技能页面了。定期更新 `src/data/skills.ts`，让访客了解你的技术专长和专业水平！