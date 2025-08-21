---
title: 图库页面
createTime: 2025/08/17 17:21:41
permalink: /special/gallery/
---

**图库页面修改教程**

Mizuka 主题提供了内置的图库页面，用于展示个人收藏的图片，类似于社交媒体的相册功能。

## 日记页面结构

图库页面位于 `src/pages/gallery.astro` 文件中。页面的核心是一个图库数据数组：

```typescript
const galleryData = {
	data: [
		{
			id: 1,
			title: "Anime",
			description:
				"Anime is a genre of Japanese animation that features vibrant colors, complex characters, and imaginative worlds.",
			coverImage: "/images/gallery/anime/pc/2.jpg",
			createdAt: "2025-08-20",
			tags: ["Anime", "Character", "Scene"],
			images: [
				"/images/gallery/anime/pe/1.webp",
				"/images/gallery/anime/pe/2.jpg",
				"/images/gallery/anime/pe/3.jpg",
				"/images/gallery/anime/pe/4.jpg",
				"/images/gallery/anime/pc/1.jpg",
				"/images/gallery/anime/pc/2.jpg",
				"/images/gallery/anime/pc/3.jpg",
				"/images/gallery/anime/pc/4.jpg",
			],
		},
		// 更多日记...
	],
};
```

## 添加新日记

要添加新的图库条目，请向 `galleryDataData` 数组添加新的对象：

1. 复制现有日记对象作为模板
2. 修改 `id` 为唯一值（递增数字）
3. 更新 `title` 为您的图库标题
4. 更新 `description` 为您的图库描述
5. 设置 `createdAt` 为 ISO 8601 格式的日期时间
6. 如有图片，在 `images` 数组中添加图片路径
7. 更新 `tags` 数组为您的图库标签

## 图库属性说明

每个图库对象包含以下属性：

- `id`：唯一标识符（数字）
- `title`：图库标题（文本）
- `description`：图库描述（文本）
- `createdAt`：发布日期（ISO 8601 格式）
- `images`：图片路径数组（可选，相对于 public 目录）
- `tags`：标签数组（可选）

## 图库图片

要为图库添加图片：

1. 将图片文件放置在 `public/assets/images/` 目录下
2. 在图库对象的 `images` 数组中添加图片文件名
3. 建议使用 WebP 格式的图片以获得最佳性能。
