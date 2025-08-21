---
title: 友链页面
createTime: 2025/08/17 17:21:41
permalink: /special/friends/
---

**友情链接页面**

友情链接页面用于展示与您的博客相关的其他网站或朋友的博客链接。Mizuki 提供了一个美观且功能丰富的友情链接页面。

## 页面位置

友情链接页面位于 `src/pages/friends.astro`，这是一个 Astro 组件文件。

## 配置友情链接

### 1. 编辑友情链接数据

在 `src/pages/friends.astro` 文件中，您可以找到 `items` 数组，这里定义了所有的友情链接：

```javascript
const items = [
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?s=48&v=4",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
	},
	// 添加更多友情链接...
];
```

### 2. 友情链接字段说明

每个友情链接对象包含以下字段：

- **title**: 网站或博客的名称
- **imgurl**: 网站头像或 Logo 的 URL 地址
- **desc**: 网站的简短描述
- **siteurl**: 网站的 URL 地址
- **tags**: 标签数组，用于分类（可选）

### 3. 添加新的友情链接

要添加新的友情链接，只需在 `items` 数组中添加新的对象：

```javascript
const items = [
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?s=48&v=4",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
	},
	{
		title: "您朋友的博客",
		imgurl: "https://example.com/avatar.jpg",
		desc: "这是我朋友的个人博客，分享技术和生活",
		siteurl: "https://friend-blog.com",
		tags: ["个人博客", "技术"],
	},
];
```

## 页面特性

### 1. 随机排序

友情链接会在每次页面加载时随机排序，确保所有链接都有平等的展示机会：

```javascript
function shuffleArray(array) {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}
```

### 2. 响应式设计

友情链接页面采用响应式设计，在不同设备上都能良好显示：
- 桌面端：2列网格布局
- 移动端：1列布局

### 3. 标签显示

每个友情链接可以显示相关标签，帮助访客了解网站类型。如果没有标签，会显示"无标签"。

## 自定义样式

友情链接页面使用 Tailwind CSS 进行样式设计，您可以根据需要修改样式类：

- 卡片容器：`flex flex-nowrap items-stretch h-28 gap-4 rounded-[var(--radius-large)]`
- 头像容器：`w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden`
- 标题样式：`font-bold transition text-lg text-neutral-900 dark:text-neutral-100`

## 添加页面内容

除了友情链接列表，您还可以在页面中添加额外的 Markdown 内容。这些内容定义在 `src/content/spec/friends.md` 文件中，会显示在友情链接列表下方。

## 导航栏配置

要在导航栏中显示友情链接，请确保在 `src/config.ts` 的 `navBarConfig` 中包含了 `LinkPreset.Friends`：

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		LinkPreset.Friends, // 友情链接
		// ... 其他链接
	],
};
```

## 注意事项

1. **图片优化**: 建议使用适当大小的头像图片（推荐 48x48 或 64x64 像素）
2. **描述长度**: 保持描述简洁，避免过长的文本影响页面布局
3. **链接有效性**: 定期检查友情链接的有效性，移除失效链接
4. **标签一致性**: 使用一致的标签命名，便于分类和管理

通过以上配置，您就可以创建一个美观且功能完整的友情链接页面了！