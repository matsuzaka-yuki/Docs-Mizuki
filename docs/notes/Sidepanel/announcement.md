---
title: 公告组件配置
createTime: 2025/11/20 22:12:00
permalink: /Sidepanel/announcement/
---

## 公告组件配置说明
这里补充一下公告侧边栏组件的配置说明，其他配置项请参考基础定位配置。

### 组件配置

```typescript title="src/config.ts"
{
	type: "announcement",
	position: "top",
	class: "onload-animation",
	animationDelay: 50,
},
```

### 布局配置

```typescript title="src/config.ts"
components: {
	left: ["profile", "announcement", "categories", "tags"],
	right: ["site-stats", "calendar"],
	drawer: ["profile", "announcement"],
},
```

我来详细解析公告侧边栏组件（`type: "announcement"`）的配置和使用方法，其他配置项请参考基础定位配置。

### 公告组件功能与特点

公告组件是博客侧边栏的重要功能之一，用于向访客展示重要通知、网站更新、活动信息等。这个组件通常位于个人资料下方，是博主与访客沟通的重要渠道。

#### 1. 基本配置解析

*   **`type: "announcement"`**: 指定组件类型为公告组件，这是固定值。
*   **`position: "top"`**: 设置组件在侧边栏内的定位方式，"top" 表示固定在顶部。
*   **`class: "onload-animation"`**: 组件的 CSS 类名，用于应用样式和动画效果。
*   **`animationDelay: 50`**: 组件加载动画的延迟时间（单位：毫秒），设置为 50 表示在个人资料组件后加载。

**布局配置**：公告组件的显示位置通过 `sidebarLayoutConfig.components` 对象配置，需要在对应侧边栏数组中添加 `"announcement"`。

---

### 公告内容配置

公告组件的内容不是在 `sidebarLayoutConfig` 中配置的，而是在 `announcementConfig` 对象中配置。下面是公告内容的详细配置示例：

```typescript title="src/config.ts"
export const announcementConfig: AnnouncementConfig = {
	title: "Announcement", // 公告标题
	content: "Welcome to my blog! This is a sample announcement.", // 公告内容
	closable: true, // 允许用户关闭公告
	link: {
		enable: true, // 启用链接
		text: "Learn More", // 链接文本
		url: "/about/", // 链接 URL
		external: false, // 内部链接
	},
};
```

#### 1. 标题配置 (title)

*   **作用**: 设置公告的标题，显示在公告顶部。
*   **配置说明**:
    *   可以使用简洁有力的标题，如 "Announcement"、"通知"、"最新公告" 等。
    *   长度适中，避免过长导致显示问题。
    *   可以根据网站风格使用不同语言的标题。

#### 2. 内容配置 (content)

*   **作用**: 设置公告的主要内容，显示在标题下方。
*   **配置说明**:
    *   可以是重要通知、网站更新、活动信息等。
    *   长度适中，避免过长影响页面美观。
    *   支持纯文本，不支持 HTML 格式。

#### 3. 可关闭配置 (closable)

*   **作用**: 控制是否允许用户关闭公告。
*   **配置说明**:
    *   `true`: 显示关闭按钮，用户可以手动关闭公告。
    *   `false`: 不显示关闭按钮，公告将一直显示。
    *   对于重要通知，建议设置为 `false`，确保访客看到。

#### 4. 链接配置 (link)

*   **作用**: 为公告添加可点击的链接，引导访客获取更多信息。
*   **子配置项**:
    *   `enable`: 布尔值，控制是否启用链接，`true` 为启用。
    *   `text`: 字符串，设置链接显示的文本，如 "Learn More"、"查看详情"。
    *   `url`: 字符串，设置链接的 URL 地址。
    *   `external`: 布尔值，设置链接是否为外部链接，`true` 为外部链接（在新标签页打开），`false` 为内部链接（在同一标签页打开）。

---

### 如何使用和调整

1.  **找到配置**: 
    *   在 `src/config.ts` 文件中找到 `sidebarLayoutConfig` 对象。
    *   公告的内容配置在 `src/config.ts` 文件中的 `announcementConfig` 对象中。

2.  **添加组件配置**: 在 `properties` 数组中添加公告组件的配置：
    ```typescript
    {
        type: "announcement",
        position: "top",
        class: "onload-animation",
        animationDelay: 50,
    }
    ```

3.  **配置布局位置**: 在 `components` 对象中设置组件所在的侧边栏：
    ```typescript
    components: {
        left: ["profile", "announcement", "categories", "tags"],
        right: ["site-stats", "calendar"],
        drawer: ["profile", "announcement"],
    }
    ```

4.  **调整定位方式**: 修改 `position` 值设置组件在侧边栏内的定位方式：
    *   `top`: 固定在顶部
    *   `sticky`: 粘性定位（随滚动跟随）

5.  **调整动画效果**: 修改 `animationDelay` 值调整加载动画延迟，实现组件依次加载的错落效果。

6.  **调整公告内容**: 在 `announcementConfig` 对象中修改标题、内容、链接等内容：
    ```typescript
    export const announcementConfig: AnnouncementConfig = {
        title: "网站公告",
        content: "欢迎访问我的博客！这里会分享技术文章和生活感悟。",
        closable: true,
        link: {
            enable: true,
            text: "关于我",
            url: "/about/",
            external: false,
        },
    };
    ```

---

### 配置示例

#### 示例 1：基本公告配置

```typescript title="src/config.ts"
// 位置配置
{
    type: "announcement",
    position: "top",
    class: "onload-animation",
    animationDelay: 50,
},

components: {
    left: ["profile", "announcement", "categories", "tags"],
    right: ["site-stats", "calendar"],
    drawer: ["profile", "announcement"],
},

// 内容配置
export const announcementConfig: AnnouncementConfig = {
    title: "网站公告",
    content: "欢迎访问我的博客！这里会分享技术文章和生活感悟。",
    closable: true,
    link: {
        enable: true,
        text: "关于我",
        url: "/about/",
        external: false,
    },
};
```

#### 示例 2：活动公告配置

```typescript title="src/config.ts"
// 内容配置
export const announcementConfig: AnnouncementConfig = {
    title: "限时活动",
    content: "本站正在进行技术分享活动，欢迎投稿参与！",
    closable: false, // 重要公告，不允许关闭
    link: {
        enable: true,
        text: "参与活动",
        url: "https://example.com/activity",
        external: true, // 外部链接，在新标签页打开
    },
};
```

#### 示例 3：更新通知配置

```typescript title="src/config.ts"
// 内容配置
export const announcementConfig: AnnouncementConfig = {
    title: "网站更新",
    content: "博客已更新至 v2.0 版本，新增了标签分类功能和夜间模式。",
    closable: true,
    link: {
        enable: true,
        text: "查看更新日志",
        url: "/changelog/",
        external: false,
    },
};
```

---

### 注意事项

1.  **布局配置**: 公告组件的显示位置由 `components` 对象控制，需要在对应侧边栏数组中添加 `"announcement"`。
2.  **移动端显示**: 由于空间限制，公告组件在移动端可能会显示不同的样式。
3.  **内容更新**: 定期更新公告内容，确保信息时效性，避免过期公告仍然显示。
4.  **链接有效性**: 确保公告中的链接是有效的，指向正确的地址。
5.  **用户体验**: 对于重要通知，建议设置 `closable: false`，确保访客看到；对于一般信息，可以设置为可关闭，避免长期占用页面空间。
6.  **内容长度**: 公告内容应简洁明了，避免过长影响页面美观。
7.  **响应式适配**: 当屏幕尺寸小于 `mobile` 断点时，侧边栏会自动切换为抽屉模式。

---

### 常见使用场景

1.  **欢迎信息**: 向新访客展示网站介绍和欢迎词。
2.  **活动通知**: 宣布即将进行的活动或正在进行的活动。
3.  **网站更新**: 通知访客网站功能更新或内容更新。
4.  **重要公告**: 发布临时性重要通知，如服务器维护、内容迁移等。
5.  **友情链接推广**: 推广合作伙伴或友情链接网站。

---