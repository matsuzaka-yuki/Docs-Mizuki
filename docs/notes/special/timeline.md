---
title: 时间线页面
createTime: 2025/11/20 22:22:00
permalink: /special/timeline/
---

### 时间线页面配置教程

Mizuki 主题内置了一个专业的时间线（Timeline）页面，用于按时间顺序展示您的人生重要事件、工作经历、教育背景和项目成就等。这个页面可以帮助访客了解您的成长历程和专业发展。

本教程将详细指导你如何添加、修改和管理时间线数据。

---

#### **1. 核心概念：页面与数据分离**
::: file-tree

- Mizuki
  - src
    - pages
      - timeline.astro
    - data
      - timeline.ts
:::

在 Mizuki 主题中，时间线页面的**展示逻辑**和**内容数据**是分开的：

*   **展示逻辑**: `src/pages/timeline.astro`
    *   这个文件负责时间线页面的HTML结构、CSS样式和JavaScript交互逻辑。
    *   它定义了时间线如何按时间排序、分组和展示。
    *   **通常情况下，你不需要修改这个文件。**

*   **内容数据**: `src/data/timeline.ts`
    *   这个文件是时间线内容的"数据库"。所有的时间线事件都以数组的形式存储在这里。
    *   每一个事件都是一个对象，包含 `id`, `title`, `description`, `type` 等属性。
    *   **添加、修改或删除时间线事件，都在这个文件中操作。**

---

#### **2. `src/data/timeline.ts` 文件详解**

打开 `src/data/timeline.ts`，你会看到类似下面的代码结构：

```typescript title="timeline.ts"
export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	type: "education" | "work" | "project" | "achievement";
	startDate: string;
	endDate?: string;
	location?: string;
	organization?: string;
	position?: string;
	skills?: string[];
	achievements?: string[];
	links?: {
		name: string;
		url: string;
		type: "website" | "certificate" | "project" | "other";
	}[];
	icon?: string;
	color?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
	{
		id: "current-study",
		title: "Studying Computer Science and Technology",
		description: "Currently studying Computer Science and Technology, focusing on web development and software engineering.",
		type: "education",
		startDate: "2022-09-01",
		location: "Beijing",
		organization: "Beijing Institute of Technology",
		skills: ["Java", "Python", "JavaScript", "HTML/CSS", "MySQL"],
		achievements: [
			"Current GPA: 3.6/4.0",
			"Completed data structures and algorithms course project",
		],
		icon: "material-symbols:school",
		color: "#059669",
		featured: true,
	},
];
```

**数据结构说明**:

*   **`interface TimelineItem`**: 这是一个TypeScript接口，它定义了每一个时间线事件必须包含的字段和它们的类型。
    *   `id: string`: (必填) 事件的唯一标识符，通常是字符串格式的名称。
    *   `title: string`: (必填) 事件的标题。
    *   `description: string`: (必填) 事件的详细描述。
    *   `type: "education" | "work" | "project" | "achievement"`: (必填) 事件类型，用于分类和筛选。
    *   `startDate: string`: (必填) 事件开始日期，格式为 "YYYY-MM-DD"。
    *   `endDate?: string`: (可选) 事件结束日期，格式为 "YYYY-MM-DD"。对于进行中的事件，此字段可省略。
    *   `location?: string`: (可选) 事件发生的地点。
    *   `organization?: string`: (可选) 相关的组织或机构名称。
    *   `position?: string`: (可选) 职位或角色名称。
    *   `skills?: string[]`: (可选) 事件相关的技能列表。
    *   `achievements?: string[]`: (可选) 事件中的成就或成果列表。
    *   `links?: {...}[]`: (可选) 相关链接数组，每个链接包含名称、URL和类型。
    *   `icon?: string`: (可选) 事件的图标名称，使用Iconify图标集。
    *   `color?: string`: (可选) 事件的主题颜色，使用十六进制格式。
    *   `featured?: boolean`: (可选) 是否为特色事件，特色事件会优先展示。

*   **`export const timelineData: TimelineItem[] = [...]`**: 这是实际的时间线数据数组。
    *   数组中的每一个对象都遵循上面 `TimelineItem` 接口的定义。
    *   时间线在页面上的显示顺序通常按照日期排序。

---

#### **3. 添加一个新时间线事件**

按照以下步骤添加一个新的时间线事件：

1.  **编辑 `timeline.ts` 文件**:
    *   打开 `src/data/timeline.ts`。
    *   在 `timelineData` 数组中，复制一个现有的时间线事件对象作为模板。
    *   修改模板中的属性：
        *   **`id`**: 给一个新的、唯一的字符串ID，通常使用事件名称的小写和连字符形式。
        *   **`title`**: 输入事件的标题。
        *   **`description`**: 详细描述事件的内容和意义。
        *   **`type`**: 设置事件类型："education"、"work"、"project"或"achievement"。
        *   **`startDate`**: 设置事件开始日期。
        *   **`endDate`**: (如果事件已结束) 设置事件结束日期。
        *   **`location`**: (如果有) 设置事件发生的地点。
        *   **`organization`**: (如果有) 设置相关的组织或机构名称。
        *   **`position`**: (如果有) 设置职位或角色名称。
        *   **`skills`**: (如果有) 添加事件相关的技能列表。
        *   **`achievements`**: (如果有) 添加事件中的成就或成果列表。
        *   **`links`**: (如果有) 添加相关链接。
        *   **`icon`**: (可选) 设置事件的图标。
        *   **`color`**: (可选) 设置事件的主题颜色。
        *   **`featured`**: (可选) 设置是否为特色事件。

2.  **示例：添加一个工作经历事件**

    假设我们要添加一个新的工作经历，内容如下：
    *   标题："前端开发实习生"
    *   描述："在一家互联网公司暑期实习，参与Web应用的前端开发"
    *   类型：工作经历
    *   开始日期：2024-07-01
    *   结束日期：2024-08-31
    *   地点：北京
    *   公司：TechStart互联网公司
    *   职位：前端开发实习生
    *   技能：React, JavaScript, CSS3, Git, Figma
    *   成就：完成用户界面组件开发、学习团队协作和代码规范、获得优秀实习表现证书

    修改后的 `timelineData` 数组会是这样：

    ```typescript title="timeline.ts"
    export const timelineData: TimelineItem[] = [
      {
        id: "current-study",
        title: "Studying Computer Science and Technology",
        // ... 其他字段 ...
      },
      // ... 其他事件 ...
      // --- 这是我们新添加的事件 ---
      {
        id: "summer-internship-2024", // 新的ID
        title: "前端开发实习生", // 标题
        description: "在一家互联网公司暑期实习，参与Web应用的前端开发", // 描述
        type: "work", // 事件类型
        startDate: "2024-07-01", // 开始日期
        endDate: "2024-08-31", // 结束日期
        location: "北京", // 地点
        organization: "TechStart互联网公司", // 公司
        position: "前端开发实习生", // 职位
        skills: ["React", "JavaScript", "CSS3", "Git", "Figma"], // 技能
        achievements: [
          "完成用户界面组件开发",
          "学习团队协作和代码规范",
          "获得优秀实习表现证书",
        ], // 成就
        icon: "material-symbols:work", // 图标
        color: "#DC2626", // 颜色
        featured: true, // 特色事件
      },
    ];
    ```

---

#### **4. 修改或删除时间线事件**

*   **修改时间线事件**: 直接在 `timelineData` 数组中找到对应的时间线事件对象，修改其属性即可。
*   **删除时间线事件**: 找到对应的时间线事件对象，将其从数组中完全移除。注意不要留下多余的逗号，以免造成语法错误。

---

#### **5. 时间线事件类型**

时间线事件按照类型分为四类：

*   **"education"**: 教育经历
    *   学校教育、在线课程、培训等
    *   常用字段：`organization`, `location`, `achievements`

*   **"work"**: 工作经历
    *   全职工作、实习、兼职等
    *   常用字段：`organization`, `location`, `position`

*   **"project"**: 项目经历
    *   个人项目、团队项目、开源贡献等
    *   常用字段：`skills`, `achievements`, `links`

*   **"achievement"**: 成就与荣誉
    *   证书、奖项、比赛成果等
    *   常用字段：`organization`, `location`, `links`

---

#### **6. 最佳实践与建议**

*   **日期格式**: 严格遵守 "YYYY-MM-DD" 格式，确保日期正确显示。
*   **ID管理**: 使用有意义的ID，通常使用事件名称的小写和连字符形式。
*   **描述内容**: 保持描述简洁但信息丰富，突出事件的重要性和影响。
*   **图标和颜色**: 为不同类型的事件使用不同的图标和颜色，增强视觉区分度。
*   **链接管理**: 对于项目经历，添加源代码和演示链接；对于证书，添加证书链接。
*   **特色事件**: 标记最重要的事件为特色事件，它们会在时间线顶部优先展示。

---

#### **7. 页面功能与特性**

时间线页面提供以下功能：

*   **事件筛选**: 按类型（全部/教育经历/工作经历/项目经历/成就与荣誉）筛选事件
*   **时间排序**: 按日期倒序或正序排列事件
*   **事件详情**: 点击事件卡片查看详细信息和相关链接
*   **技能统计**: 展示所有事件中提及的技能及其频率
*   **经历统计**: 显示教育经历、工作经历等类型的数量统计
*   **时间线视图**: 以时间线形式展示事件，直观显示时间跨度

---

#### **8. 导航栏配置**

要在导航栏中显示时间线链接，请确保在 `src/config.ts` 的 `navBarConfig` 中包含了时间线链接：

```typescript title="src/config.ts"
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Timeline, // 时间线页面
		// ... 其他链接
	],
};
```

或者手动添加时间线链接：

```typescript title="src/config.ts"
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "人生时间线",
			url: "/timeline/",
			icon: "ri:timeline-line",
		},
		// ... 其他链接
	],
};
```

---

通过以上步骤，你就可以轻松地管理你的时间线页面了。定期更新 `src/data/timeline.ts`，让访客了解你的成长历程和专业发展！