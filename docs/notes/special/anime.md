---
title: 番剧页面
createTime: 2025/11/20 22:28:00
permalink: /special/anime/
---

### 番剧页面配置教程

Mizuki 主题内置了一个优雅的番剧（Anime）页面，支持两种数据源模式：
- **Bangumi 模式**：自动从 Bangumi API 同步观看记录
- **BiliBili 模式**：自动从 BiliBili API 同步观看记录
- **本地模式**：手动管理本地番剧数据

这个页面可以帮助访客了解您的动画喜好和观看进度。

本教程将详细指导你如何配置和使用番剧页面。

---

#### **1. 核心概念：页面与数据分离**

::: file-tree

- Mizuki
  - src
    - pages
      - anime.astro
    - data
      - anime.ts
      :::

在 Mizuki 主题中，番剧页面的**展示逻辑**和**内容数据**是分开的：

*   **展示逻辑**: `src/pages/anime.astro`
    *   这个文件负责番剧页面的HTML结构、CSS样式和JavaScript交互逻辑。
    *   它定义了番剧如何排序、筛选和展示。
    *   **通常情况下，你不需要修改这个文件。**

*   **内容数据**:
    *   **Bangumi 模式**：通过 Bangumi API 自动获取数据，无需手动维护，数据来源为 Bangumi 个人观看记录
    *   **BiliBili 模式**：通过 BiliBili API 自动获取数据，无需手动维护，数据来源为 BiliBili 个人观看记录
    *   **本地模式**：通过 `src/data/anime.ts` 文件手动管理番剧数据，需要手动添加、修改或删除番剧条目
    *   **数据源操作**：添加、修改或删除番剧时，应根据选择的模式在对应数据源中操作
        *   Bangumi 模式：在 Bangumi 网站上管理观看记录
        *   BiliBili 模式：在 BiliBili 网站上管理观看记录
        *   本地模式：直接编辑 `src/data/anime.ts` 文件

---

#### **2. Bangumi 模式配置**

Bangumi 模式的配置是通过 `src/config.ts` 文件进行的，而不是环境变量。在 `src/config.ts` 中添加以下配置：

```typescript title="src/config.ts"
// Bangumi 用户ID配置
bangumi: {
  userId: "your-bangumi-id", // 在此处设置你的Bangumi用户ID，可以设置为 "sai" 测试
},

// 番剧模式选择
anime: {
  mode: "bangumi", // 番剧页面模式："bangumi" 使用Bangumi API，"local" 使用本地配置，"bilibili" 使用Bilibili API
},
```

获取 Bangumi 用户 ID 的方法：
1. 访问 [Bangumi](https://bgm.tv/) 并登录
2. 进入个人主页
3. URL 中数字部分即为用户 ID (如 `https://bgm.tv/user/12345`  中的 12345)

---

#### **3. Bilibili 模式配置**

Bilibili 模式的配置同样通过 `src/config.ts` 文件进行。在 `src/config.ts` 中添加以下配置：

```typescript title="src/config.ts"
bilibili: {
	vmid: "your-bilibili-vmid", // 在此处设置你的Bilibili用户ID (uid)，例如 "1129280784"
	fetchOnDev: false, // 是否在开发环境下获取 Bilibili 数据（默认 false）
	coverMirror: "", // 封面图片镜像源（可选，如果需要使用镜像源，例如 "https://images.weserv.nl/?url="）
	useWebp: true, // 是否使用WebP格式（默认 true）
},

// 番剧模式选择
anime: {
  mode: "bilibili", // 番剧页面模式："bangumi" 使用Bangumi API，"local" 使用本地配置，"bilibili" 使用Bilibili API
},
```

##### **3.1 配置项详解**

*   **`vmid`**: Bilibili 用户 ID，从个人空间 URL 中获取（如 `https://space.bilibili.com/1129280784` 中的 `1129280784`）
*   **`fetchOnDev`**: 是否在开发环境下获取 Bilibili 数据，默认 `false`，建议保持默认值以避免开发时频繁请求 API
*   **`coverMirror`**: 封面图片镜像源（可选），如果需要使用镜像源加载封面图片，例如设置为 `"https://images.weserv.nl/?url="`
*   **`useWebp`**: 是否使用 WebP 格式，默认 `true`，建议保持开启以获得更好的性能

##### **3.2 SESSDATA 环境变量配置**

SESSDATA 用于获取更详细的观看进度，需要通过环境变量配置：

**本地构建和服务器部署配置**：
1. 在项目根目录创建 `.env` 文件
2. 添加以下配置：

```env title=".env"
BILI_SESSDATA=your_bilibili_sessdata
```

**SESSDATA 的获取步骤**：
1. 登录 bilibili 账号
2. 打开浏览器开发者工具（F12 或 Ctrl+Shift+I）
3. 找到"应用程序"(app)一栏
4. 在请求头中查找 cookie 字段
5. 从 cookie 中提取 sessdata 值

**环境变量说明**：
- 环境变量名：`BILI_SESSDATA`
- 对应值：从 cookie 中提取的 sessdata 值

##### **3.2.1 通过 Serverless 平台配置环境变量**

如果您使用 Serverless 平台部署项目，可以在平台控制台中配置环境变量：

**Vercel 平台**：
1. 登录 Vercel 控制台
2. 选择您的项目
3. 进入 "Settings" → "Environment Variables"
4. 添加环境变量：
   - Name: `BILI_SESSDATA`
   - Value: 您的 Bilibili SESSDATA 值
   - 选择适当的环境（Development/Production）

**Netlify 平台**：
1. 登录 Netlify 控制台
2. 选择您的项目
3. 进入 "Site settings" → "Environment variables"
4. 添加环境变量：
   - Key: `BILI_SESSDATA`
   - Value: 您的 Bilibili SESSDATA 值

**Cloudflare Pages 平台**：
1. 登录 Cloudflare 控制台
2. 选择您的 Pages 项目
3. 进入 "Settings" → "Environment variables"
4. 添加环境变量：
   - Variable name: `BILI_SESSDATA`
   - Value: 您的 Bilibili SESSDATA 值
   - 选择适当的环境（Build/Preview/Production）

**EdgeOne Pages 平台**：
1. 登录 EdgeOne 控制台
2. 选择您的 Pages 项目
3. 进入 "设置" → "环境变量"
4. 添加环境变量：
   - 变量名: `BILI_SESSDATA`
   - 值: 您的 Bilibili SESSDATA 值
   - 选择适当的环境（构建/预览/生产）

**注意**：无论使用哪种配置方式，确保不要将 SESSDATA 敏感信息提交到版本控制系统。

##### **3.3 获取 Bilibili 用户 UID**

1. 访问 [Bilibili](https://www.bilibili.com/) 并登录
2. 进入个人主页
3. URL 中数字部分即为用户 ID (如 `https://space.bilibili.com/12345`  中的 12345)
4. 或在个人设置中查看用户信息，找到 UID 字段

---

#### **4. 本地模式配置**

##### **4.1 数据结构详解**

本地番剧数据使用 `AnimeItem` 类型定义，每个条目包含以下字段：

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

**字段说明**:

*   **`title: string`**: (必填) 番剧的标题。
*   **`status: "watching" | "completed" | "planned"`**: (必填) 番剧的观看状态，用于筛选。
*   **`rating: number`**: (必填) 番剧的评分，通常0-10分。
*   **`cover: string`**: (必填) 番剧封面的图片路径，通常放在 `public/assets/anime/` 目录下。
*   **`description: string`**: (必填) 番剧的简短描述。
*   **`episodes: string`**: (必填) 番剧的总集数，如 "12 episodes"。
*   **`year: string`**: (必填) 番剧的播出年份。
*   **`genre: string[]`**: (必填) 番剧的类型标签数组，如 ["Action", "Slice of life"]。
*   **`studio: string`**: (必填) 番剧的制作公司。
*   **`link: string`**: (必填) 番剧的观看链接，通常是B站链接。
*   **`progress: number`**: (必填) 当前观看进度，即已看集数。
*   **`totalEpisodes: number`**: (必填) 总集数。
*   **`startDate: string`**: (必填) 开始观看的日期，格式为 "YYYY-MM"。
*   **`endDate: string`**: (可选) 完成观看的日期，格式为 "YYYY-MM"。对于进行中的番剧，此字段可省略。

##### **4.2 切换到本地模式**

修改 `src/data/anime.ts` 中的 `getAnimeList()` 函数：

```typescript
// 修改为返回本地数据
export const getAnimeList = () => localAnimeList;
```

同时，在 `config.ts` 中修改模式配置：

```typescript
// 番剧模式选择
anime: {
  mode: "local", // 番剧页面模式："bangumi" 使用Bangumi API，"local" 使用本地配置，"bilibili" 使用Bilibili API
},
```

---

#### **5. 操作指南**

##### **5.1 本地模式添加番剧**

按照以下步骤添加一个新的番剧：

1.  **准备番剧封面**:
    *   获取番剧的封面图片，建议使用高质量的海报图。
    *   将图片文件（如 `my-anime.webp`）复制到项目的 `public/assets/anime/` 目录下。
    *   如果目录不存在，可以创建它。

2.  **编辑 `anime.ts` 文件**:
    *   打开 `src/data/anime.ts`。
    *   在 `localAnimeList` 数组中，复制一个现有的番剧对象作为模板。
    *   修改模板中的属性，参考下面的示例。

3.  **示例：添加一个新番剧**

    假设我们要添加一个新的番剧，内容如下：
    *   标题：轻音少女
    *   状态：已完结
    *   评分：9.5
    *   描述：女孩子们的日常，甜美治愈
    *   集数：12集
    *   年份：2015
    *   类型：日常, 治愈
    *   制作公司：京都动画
    *   观看进度：12/12
    *   开始观看：2015-07
    *   完成观看：2015-09

    修改后的 `localAnimeList` 数组会是这样：

    ```typescript title="src/data/anime.ts"
    const localAnimeList: AnimeItem[] = [
      {
        title: "Lycoris Recoil",
        // ... 其他字段 ...
      },
      // ... 其他番剧 ...
      // --- 这是我们新添加的番剧 ---
      {
        title: "轻音少女", // 标题
        status: "completed", // 状态
        rating: 9.5, // 评分
        cover: "/assets/anime/k-on.webp", // 封面
        description: "女孩子们的日常，甜美治愈", // 描述
        episodes: "12 episodes", // 集数
        year: "2015", // 年份
        genre: ["日常", "治愈"], // 类型
        studio: "京都动画", // 制作公司
        link: "https://www.bilibili.com/bangumi/media/md2590", // 链接
        progress: 12, // 观看进度
        totalEpisodes: 12, // 总集数
        startDate: "2015-07", // 开始观看
        endDate: "2015-09", // 完成观看
      },
    ];
    ```

##### **5.2 修改或删除番剧**

*   **修改番剧**: 直接在 `localAnimeList` 数组中找到对应的番剧对象，修改其属性即可。
*   **删除番剧**: 找到对应的番剧对象，将其从数组中完全移除。注意不要留下多余的逗号，以免造成语法错误。

##### **5.3 更新 API 数据**

Bangumi 和 Bilibili 数据会自动从 API 获取，但你可以强制刷新：
1. 清除浏览器缓存
2. 重启开发服务器

---

#### **6. 番剧状态说明**

番剧状态分为三种：

*   **"watching"**: 追番中
    *   正在观看的番剧
    *   进度小于总集数
    *   不需要 `endDate` 字段

*   **"completed"**: 已完结
    *   已看完的番剧
    *   进度等于总集数
    *   应该有 `endDate` 字段

*   **"planned"**: 计划观看
    *   计划观看但还未开始的番剧
    *   进度通常为0
    *   可能没有 `startDate` 和 `endDate` 字段

---

#### **7. 最佳实践与建议**

*   **封面图片**: 使用高质量的海报图，建议使用2:3或3:4的宽高比。
*   **评分标准**: 保持评分标准一致，避免随意打分。
*   **进度管理**: 
    *   Bangumi 模式：自动同步，无需手动更新
    *   本地模式：定期更新观看进度，保持数据准确性
*   **日期格式**: 严格遵守 "YYYY-MM" 格式，确保日期正确显示。
*   **类型标签**: 使用统一的中英文类型标签，便于分类和搜索。
*   **链接有效性**: 使用可靠的视频平台链接，确保链接长期有效。
*   **模式选择**:
    *   **Bangumi 模式**：适合已有 Bangumi 账户和观看记录的用户
    *   **Bilibili 模式**：适合已有 Bilibili 账户和观看记录的用户
    *   **本地模式**：适合不想依赖第三方服务或需要自定义数据的用户

---

#### **8. 页面功能与特性**

番剧页面提供以下功能：

*   **状态筛选**: 按观看状态（全部/追番中/已完结/计划观看）筛选番剧
*   **评分排序**: 按评分高低排序番剧
*   **年份排序**: 按播出年份排序番剧
*   **类型筛选**: 按类型标签筛选番剧
*   **观看进度**: 显示每个番剧的观看进度条
*   **番剧详情**: 点击番剧卡片查看详细信息和观看链接
*   **统计信息**: 显示总观看数、平均评分等统计数据
*   **Bangumi 特性** (Bangumi 模式):
    *   自动同步 Bangumi 观看记录
    *   显示中文译名（如果可用）
    *   定期更新观看进度
*   **Bilibili 特性** (Bilibili 模式):
    *   自动同步 Bilibili 观看记录
    *   显示番剧评分
    *   定期更新观看进度

---

#### **9. 导航栏配置**

要在导航栏中显示番剧链接，请确保在 `src/config.ts` 的 `navBarConfig` 中包含了番剧链接：

```typescript title="src/config.ts"
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Anime, // 番剧页面
		// ... 其他链接
	],
};
```

或者手动添加番剧链接：

```typescript title="src/config.ts"
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "动漫番剧",
			url: "/anime/",
			icon: "ri:tv-line",
		},
		// ... 其他链接
	],
};
```

---

#### **10. 注意事项**

1. **Bangumi 模式注意事项**：
   *   确保 `config.ts` 中的 `bangumi.userId` 配置正确
   *   API 请求可能受网络环境影响，建议在网络稳定时使用
   *   数据更新有一定延迟，不是实时的
   *   同时确保 `anime.mode` 设置为 `"bangumi"`

2. **Bilibili 模式注意事项**：
   *   确保 `config.ts` 中的 `bilibili.vmid` 配置正确
   *   API 请求可能受网络环境影响，建议在网络稳定时使用
   *   数据更新有一定延迟，不是实时的
   *   同时确保 `anime.mode` 设置为 `"bilibili"`

3. **本地模式注意事项**：
   *   确保 `cover` 字段中的图片链接可正常访问
   *   `progress` 值不应超过 `totalEpisodes`
   *   修改数据后可能需要重启开发服务器
   *   同时确保 `anime.mode` 设置为 `"local"`

3. **通用注意事项**：
   *   番剧名称中避免使用特殊字符，以免显示异常
   *   切换模式后需要重新构建项目
   *   修改 `config.ts` 后需要重启开发服务器

---

通过以上步骤，你就可以轻松地管理你的番剧页面了。选择适合你的模式（Bangumi、Bilibili 或本地），定期更新数据，让访客了解你的动画喜好和观看进度！