---
title: Bangumi API文档
createTime: 2025/11/21 20:15:35
permalink: /API/bangumi/
---
# Bangumi API 文档

## 概述

Mizuki 项目的番剧页面支持通过 Bangumi API 获取用户的动漫收藏数据。Bangumi 是一个专注于动漫、游戏和文化的社区，其 API 提供了丰富的动漫元数据接口。

## 配置

在 `src/config.ts` 文件中，可以配置 Bangumi 相关参数：

```typescript title="src/config.ts"
export const siteConfig: SiteConfig = {
  // ...其他配置
  bangumi: {
    userId: "your-bangumi-id", // 在此处设置你的Bangumi用户ID，可以设置为 "sai" 测试
  },
  anime: {
    mode: "local", // 番剧页面模式："bangumi" 使用Bangumi API，"local" 使用本地配置
  },
};
```

## API 基础信息

- **API 基础URL**: `https://api.bgm.tv`
- **API 版本**: v0
- **请求方法**: GET
- **返回格式**: JSON

## 使用的 API 端点

### 1. 获取用户收藏列表

**端点**: `/v0/users/{userId}/collections`

**参数**:
- `userId` - Bangumi 用户ID
- `subject_type` - 主题类型，2 表示动漫
- `type` - 收藏类型：
  - 1 - 想看
  - 2 - 看过
  - 3 - 在看
  - 4 - 搁置
  - 5 - 抛弃
- `limit` - 每页返回的数量（默认50）
- `offset` - 分页偏移量

**示例**:
```
https://api.bgm.tv/v0/users/sai/collections?subject_type=2&type=3&limit=50&offset=0
```

### 2. 获取作品相关人员信息

**端点**: `/v0/subjects/{subjectId}/persons`

**参数**:
- `subjectId` - 作品ID

**示例**:
```
https://api.bgm.tv/v0/subjects/308479/persons
```

## 数据获取流程

在 `src/pages/anime.astro` 文件中，番剧数据的获取流程如下：

1. **获取用户收藏列表**
   ```javascript title="src/pages/anime.astro"
   async function fetchBangumiCollection(userId, subjectType, type) {
     try {
       let allData = [];
       let offset = 0;
       const limit = 50; // 每页获取的数量
       let hasMore = true;

       // 循环获取所有数据
       while (hasMore) {
         const response = await fetch(
           `${BANGUMI_API_BASE}/v0/users/${userId}/collections?subject_type=${subjectType}&type=${type}&limit=${limit}&offset=${offset}`
         );
         if (!response.ok) {
           throw new Error(`Bangumi API error: ${response.status}`);
         }
         const data = await response.json();

         // 添加当前页数据到总数据中
         if (data.data && data.data.length > 0) {
           allData = [...allData, ...data.data];
         }
         if (!data.data || data.data.length < limit) {
           hasMore = false;
         } else {
           offset += limit;
         }
         // 防止请求过于频繁
         await new Promise(resolve => setTimeout(resolve, 100));
       }
       return { data: allData };
     } catch (error) {
       console.error("Error fetching Bangumi data:", error);
       return null;
     }
   }
   ```

2. **获取作品详细信息**
   ```javascript title="src/pages/anime.astro"
   // 获取单个条目相关人员信息
   async function fetchSubjectPersons(subjectId) {
     try {
       const response = await fetch(
         `${BANGUMI_API_BASE}/v0/subjects/${subjectId}/persons`
       );
       const data = await response.json();
       return Array.isArray(data) ? data : [];
     } catch (error) {
       console.error(`Error fetching subject ${subjectId} persons:`, error);
       return [];
     }
   }
   ```

3. **数据处理和格式化**
   ```javascript title="src/pages/anime.astro"
   // 获取Bangumi数据转换为页面所需格式
   async function processBangumiData(data, status) {
     if (!data || !data.data) return [];

     // 为每个条目获取详细信息
     const detailedItems = await Promise.all(
       data.data.map(async (item) => {
         // 获取相关人员信息
         const subjectPersons = await fetchSubjectPersons(item.subject_id);
         // 获取年份信息
         const year = item.subject?.date || "Unknown";
         // 获取评分
         const rating = item.rate ? Number.parseFloat(item.rate.toFixed(1)) : 0;
         // 获取进度信息
         const progress = item.ep_status || 0;
         const totalEpisodes = item.subject?.eps || progress;
         // 从相关人员中获取制作方信息
         let studio = "Unknown";
         if (Array.isArray(subjectPersons)) {
           // 定义筛选优先级顺序
           const priorities = ["动画制作", "製作", "制作"];
           for (const relation of priorities) {
             const match = subjectPersons.find(
               (person) => person.relation === relation
             );
             if (match?.name) {
               studio = match.name;
               break;
             }
           }
         }

         return {
           title: item.subject?.name_cn || item.subject?.name || "Unknown Title",
           status: status,
           rating: rating,
           cover: item.subject?.images?.medium || "/assets/anime/default.webp",
           description: (
             item.subject?.short_summary ||
             item.subject?.name_cn ||
             ""
           ).trimStart(),
           episodes: `${totalEpisodes} episodes`,
           year: year,
           genre: item.subject?.tags
             ? item.subject.tags.slice(0, 3).map((tag) => tag.name)
             : ["Unknown"],
           studio: studio,
           link: item.subject?.id
             ? `https://bgm.tv/subject/${item.subject.id}`
             : "#",
           progress: progress,
           totalEpisodes: totalEpisodes,
           startDate: item.subject?.date || "",
           endDate: item.subject?.date || "",
         };
       })
     );
     return detailedItems;
   }
   ```

## 数据格式

### 收藏列表响应格式

```json
{
  "data": [
    {
      "subject_id": 308479,
      "subject": {
        "id": 308479,
        "type": 2,
        "name": "Lycoris Recoil",
        "name_cn": "莉可丽丝",
        "short_summary": "作品简介...",
        "images": {
          "large": "https://lain.bgm.tv/pic/cover/l/...",
          "common": "https://lain.bgm.tv/pic/cover/c/...",
          "medium": "https://lain.bgm.tv/pic/cover/m/...",
          "small": "https://lain.bgm.tv/pic/cover/s/...",
          "grid": "https://lain.bgm.tv/pic/cover/g/..."
        },
        "eps": 12,
        "date": "2022-07",
        "tags": [
          { "name": "原创", "count": 1234 },
          { "name": "战斗", "count": 987 }
        ]
      },
      "type": 3,
      "rate": 9.5,
      "ep_status": 12
    }
  ],
  "total": 50,
  "limit": 50,
  "offset": 0
}
```

### 作品人员信息响应格式

```json
[
  {
    "id": 1234,
    "name": "A-1 Pictures",
    "relation": "动画制作",
    "type": 2,
    "images": {
      "large": "https://lain.bgm.tv/pic/crt/l/...",
      "medium": "https://lain.bgm.tv/pic/crt/m/...",
      "small": "https://lain.bgm.tv/pic/crt/s/..."
    }
  }
]
```

## 数据类型定义

在 `src/data/anime.ts` 中定义了番剧数据类型：

```typescript
export type AnimeItem = {
  title: string;
  status: "watching" | "completed" | "planned";
  rating: number;
  cover: string;
  description: string;
  episodes: string;
  year: string;
  genre: string[];
  studio: string;
  link: string;
  progress: number;
  totalEpisodes: number;
  startDate: string;
  endDate: string;
};
```

## 本地模式

除了使用 Bangumi API，番剧页面还支持本地模式（anime.mode: "local"），使用预定义的本地番剧列表，不发送任何 API 请求。

本地数据存储在 `src/data/anime.ts` 文件中，可以直接修改该文件来添加或更改番剧信息。

## 使用示例

### 设置 Bangumi 用户ID

在 `src/config.ts` 中设置您的 Bangumi 用户ID：

```typescript
export const siteConfig: SiteConfig = {
  // ...其他配置
  bangumi: {
    userId: "your-actual-bangumi-id", // 替换为您的实际ID
  },
  anime: {
    mode: "bangumi", // 设置为 "bangumi" 模式
  },
};
```

### 测试模式

您可以将用户ID设置为 "sai" 来测试 Bangumi API 功能：

```typescript
export const siteConfig: SiteConfig = {
  // ...其他配置
  bangumi: {
    userId: "sai", // 测试用户ID
  },
  anime: {
    mode: "bangumi",
  },
};
```

## 错误处理

代码中已实现基本的错误处理：

1. 网络请求失败时会捕获错误并返回空数组
2. API 响应状态码非 200 会抛出异常
3. 每次请求之间有 100ms 的延迟，防止请求过于频繁

## 注意事项

1. 请确保设置了正确的 Bangumi 用户ID
2. Bangumi API 有请求频率限制，请避免过于频繁的请求
3. 某些作品可能没有完整的制作人员信息，代码会使用 "Unknown" 作为默认值
4. 如果用户ID设置不正确或为默认值，页面会显示提示信息

## 故障排除

如果遇到番剧数据获取问题：

1. 检查网络连接
2. 确认 Bangumi 用户ID是否正确
3. 检查 API 请求是否被浏览器阻止（CORS问题）
4. 查看浏览器开发者工具中的网络请求和错误信息
5. 确认番剧页面是否已启用（featurePages.anime: true）

## 参考资料

- [Bangumi 官网](https://bgm.tv)