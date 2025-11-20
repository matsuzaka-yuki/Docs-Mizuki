---
title: 导航栏配置说明
createTime: 2025/11/20 20:35:53
permalink: /Basic-Layout/navBarConfig/
---
## 顶栏导航配置说明

顶栏导航配置位于 `src/config.ts` 文件中的 `navBarConfig` 对象，控制博客顶部导航栏的显示设置,手机端表现为抽屉菜单。

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "Links",
			url: "/links/",
			icon: "material-symbols:link",
			children: [
				{
					name: "GitHub",
					url: "https://github.com/matsuzaka-yuki/Mizuki",
					external: true,
					icon: "fa6-brands:github",
				},
				{
					name: "Bilibili",
					url: "https://space.bilibili.com/701864046",
					external: true,
					icon: "fa6-brands:bilibili",
				},
				{
					name: "Gitee",
					url: "https://gitee.com/matsuzakayuki/Mizuki",
					external: true,
					icon: "mdi:git",
				},
			],
		},
		{
			name: "My",
			url: "/content/",
			icon: "material-symbols:person",
			children: [
				{
					name: "Anime",
					url: "/anime/",
					icon: "material-symbols:movie",
				},
				{
					name: "Diary",
					url: "/diary/",
					icon: "material-symbols:book",
				},
				{
					name: "Gallery",
					url: "/albums/",
					icon: "material-symbols:photo-library",
				},
				{
					name: "Devices",
					url: "devices/",
					icon: "material-symbols:devices",
					external: false,
				},
			],
		},
		{
			name: "About",
			url: "/content/",
			icon: "material-symbols:info",
			children: [
				{
					name: "About",
					url: "/about/",
					icon: "material-symbols:person",
				},
				{
					name: "Friends",
					url: "/friends/",
					icon: "material-symbols:group",
				},
			],
		},
		{
			name: "Others",
			url: "#",
			icon: "material-symbols:more-horiz",
			children: [
				{
					name: "Projects",
					url: "/projects/",
					icon: "material-symbols:work",
				},
				{
					name: "Skills",
					url: "/skills/",
					icon: "material-symbols:psychology",
				},
				{
					name: "Timeline",
					url: "/timeline/",
					icon: "material-symbols:timeline",
				},
			],
		},
	],
};
```

我们来详细解析 `src/config.ts` 文件中的 `navBarConfig` 对象。

这个配置项用于完全自定义博客顶部导航栏的结构、链接和外观，是网站导航体验的核心。

---

### **顶栏导航 (NavBar) 配置项详细说明**

`navBarConfig` 的核心是 `links` 数组，数组中的每个元素代表导航栏中的一个菜单项。菜单项有两种类型：**普通链接**和**下拉菜单**。

#### **1. 菜单项基础结构**

一个菜单项可以是一个简单的链接，也可以是一个包含子菜单的下拉菜单。

**a. 普通链接 (Leaf Item)**

```typescript
{
    name: "About",
    url: "/about/",
    icon: "material-symbols:person",
    // external?: boolean
}
```

*   **`name`**: (字符串，必填) 菜单项显示的文本名称,注意默认的字符串会调用 `i18n` 进行翻译,修改成其他文本会显示你实际自定义的内容。
*   **`url`**: (字符串，必填) 点击菜单项后跳转的目标地址。
    *   以 `/` 开头的路径（如 `/about/`）是**内部链接**，指向你博客中的某个页面。
    *   不以 `/` 开头或包含 `http` 的路径（如 `https://github.com/`）是**外部链接**。
*   **`icon`**: (字符串，可选) 菜单项文本前显示的图标。图标名称格式为 `库名:图标名`，如 `material-symbols:person` 或 `fa6-brands:github`。
*   **`external`**: (布尔值，可选，默认 `false`)
    *   `true`: 强制将链接视为外部链接，点击时会在新标签页中打开。
    *   `false`: 视为内部链接，在当前标签页打开。

**b. 下拉菜单 (Parent Item)**

```typescript
{
    name: "My",
    url: "/content/", // 可选，点击菜单标题时的跳转地址
    icon: "material-symbols:person",
    children: [
        // ... 普通链接对象
    ]
}
```

*   **`name`**, **`url`**, **`icon`**: 含义同上。`url` 在这里是可选的，如果提供，点击下拉菜单的标题本身会跳转到该地址。
*   **`children`**: (数组，必填) 包含多个**普通链接对象**的数组。这些子链接会在用户将鼠标悬停或点击父菜单时显示为下拉列表。

#### **2. 预定义链接 (`LinkPreset`)**

为了方便，模板提供了一些预定义的常用链接，可以直接使用：

```typescript
LinkPreset.Home,
LinkPreset.Archive,
```

*   **`LinkPreset.Home`**: 快速添加指向网站首页 (`/`) 的链接，通常带有“首页”文字和房子图标。
*   **`LinkPreset.Archive`**: 快速添加指向文章归档页 (`/archive/`) 的链接，通常带有“归档”文字和归档图标。

你可以将这些预定义链接与自定义链接混合使用。

#### **3. 配置示例详解**

让我们以配置中的一个下拉菜单为例进行分解：

```typescript
{
    name: "Links",
    url: "/links/",
    icon: "material-symbols:link",
    children: [
        {
            name: "GitHub",
            url: "https://github.com/matsuzaka-yuki/Mizuki",
            external: true,
            icon: "fa6-brands:github",
        },
        // ... 其他子链接
    ],
},
```

*   这个配置会在导航栏中创建一个名为 "Links"、带有链接图标的菜单项。
*   点击 "Links" 文字会跳转到 `/links/` 页面。
*   当鼠标悬停在 "Links" 上时，会显示一个下拉菜单。
*   下拉菜单包含一个指向 GitHub 仓库的链接，显示为 "GitHub"，带有 GitHub 图标，并且因为 `external: true`，点击后会在新标签页打开。

#### **4. 实操建议**

*   **规划结构**: 在配置前，先规划好你的网站信息架构。哪些内容应该放在主导航？哪些应该归类到下拉菜单中？
*   **保持简洁**: 导航栏不宜过长，尽量将次要链接放入下拉菜单，以保持界面清爽。
*   **使用有意义的名称**: 菜单项的 `name` 应清晰明了，让用户能快速理解其指向的内容。
*   **图标辅助**: 为菜单项添加恰当的图标可以增强视觉引导，提升用户体验。
*   **测试链接**: 添加或修改链接后，务必在浏览器中测试，确保所有 `url` 都是正确的，并且 `external` 属性设置符合预期。

