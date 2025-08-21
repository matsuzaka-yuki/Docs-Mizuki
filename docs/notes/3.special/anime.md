---
title: 番剧页面
createTime: 2025/08/17 17:21:41
permalink: /special/anime/
---

**番剧页面修改教程**

Mizuka 主题提供了内置的番剧页面，您可以轻松地自定义显示的番剧列表。

## 番剧页面结构

番剧页面位于 `src/pages/anime.astro` 文件中。页面的核心是一个番剧数据数组：

```typescript
const animeList = [
  {
    title: "Lycoris Recoil",
    status: "completed",
    rating: 9.8,
    cover: "assets/anime/lkls.webp",
    description: "Girls' gunfight, flaws cannot hide its virtues.",
    episodes: "12 episodes",
    year: "2013-2023",
    link: "https://www.bilibili.com/bangumi/media/md28338623",
  },
  // 更多番剧...
];
```

## 修改番剧列表

要添加、删除或修改番剧信息，请直接编辑 `animeList` 数组：

1. **添加番剧**：复制现有番剧对象并修改其属性
2. **修改番剧信息**：直接修改现有番剧对象的属性值
3. **删除番剧**：从数组中移除对应的番剧对象

## 番剧属性说明

每个番剧对象包含以下属性：

- `title`：番剧标题
- `status`：观看状态（"watching" 或 "completed"）
- `rating`：评分（0-10）
- `cover`：封面图片路径（相对于 public 目录）
- `description`：番剧描述
- `episodes`：集数信息
- `year`：播放年份
- `link`：番剧链接（可指向 Bilibili 或其他平台）

## 番剧图片

要为番剧添加封面图片：

1. 将图片文件放置在 `public/assets/anime/` 目录下
2. 在番剧对象的 `cover` 属性中指定图片文件名

确保图片格式为 WebP 以获得最佳性能。