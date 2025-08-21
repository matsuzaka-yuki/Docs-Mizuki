---
title: 日记页面
createTime: 2025/08/17 17:21:41
permalink: /special/diary/
---

**日记页面修改教程**

Mizuka 主题提供了内置的日记页面，用于分享生活瞬间，类似于社交媒体的短文功能。

## 日记页面结构

日记页面位于 `src/pages/diary.astro` 文件中。页面的核心是一个日记数据数组：

```typescript
const moments = [
  {
    id: 1,
    content: "Share some nice/beautiful/gorgeous wallpapers。",
    date: "2025-01-15T10:30:00Z",
    images: ["assets/images/1.webp", "assets/images/banner.webp"],
  },
  // 更多日记...
];
```

## 添加新日记

要添加新的日记条目，请向 `moments` 数组添加新的对象：

1. 复制现有日记对象作为模板
2. 修改 `id` 为唯一值（递增数字）
3. 更新 `content` 为您的日记内容
4. 设置 `date` 为 ISO 8601 格式的日期时间
5. 如有图片，在 `images` 数组中添加图片路径

## 日记属性说明

每个日记对象包含以下属性：

- `id`：唯一标识符（数字）
- `content`：日记内容（文本）
- `date`：发布日期（ISO 8601 格式）
- `images`：图片路径数组（可选，相对于 public 目录）

## 日记图片

要为日记添加图片：

1. 将图片文件放置在 `public/assets/images/` 目录下
2. 在日记对象的 `images` 数组中添加图片文件名

建议使用 WebP 格式的图片以获得最佳性能。