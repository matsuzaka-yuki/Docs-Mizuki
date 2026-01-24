---
title: 分类组件配置
createTime: 2025/11/20 22:14:00
permalink: /Sidepanel/categories/
---

## 分类组件配置说明
这里补充一下分类侧边栏组件的配置说明，其他配置项请参考基础定位配置。

### 组件配置

```typescript title="src/config.ts"
{
	type: "categories",
	position: "sticky",
	class: "onload-animation",
	animationDelay: 150,
	responsive: {
		collapseThreshold: 5,
	},
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

我来详细解析分类侧边栏组件（`type: "categories"`）的配置和使用方法，其他配置项请参考基础定位配置。

### 分类组件 responsive 配置详解

`responsive` 配置是一个对象，目前它只包含一个核心属性：`collapseThreshold`。

#### 1. 折叠阈值 (collapseThreshold)

```typescript title="src/config.ts"
responsive: {
    collapseThreshold: 5,
},
```

*   **作用**: 这个属性用于设置一个**数量阈值**。当你的博客文章分类总数超过这个阈值时，分类组件会自动从**展开状态**切换为**折叠状态**。
*   **详细解释**:
    *   **当分类总数 `<=` `collapseThreshold` 时**: 分类组件会以"展开"的形式显示，所有分类都会平铺出来，用户可以一目了然地看到所有分类并点击。
    *   **当分类总数 `>` `collapseThreshold` 时**: 分类组件会自动"折叠"，只显示一部分分类（例如，前几个），并提供一个可点击的展开/折叠按钮（通常显示为 "显示全部" / "收起"）。用户需要点击该按钮才能看到完整的分类列表。
*   **配置示例**:
    *   如果设置 `collapseThreshold: 5`，而你的博客有 8 个分类，那么分类组件默认会折叠，只显示部分分类。
    *   如果你的博客只有 3 个分类，那么分类组件会默认展开，显示所有 3 个分类。
*   **目的与优势**:
    *   **节省空间**: 当分类数量非常多时（例如几十个），如果全部展开会占据大量的侧边栏空间，可能导致页面过长。折叠功能可以有效节省空间，让界面更整洁。
    *   **提升用户体验**: 对于只有少量分类的用户，展开显示可以提供更好的可用性。对于分类众多的用户，折叠显示可以避免信息过载，让用户可以快速找到自己感兴趣的分类，或者通过展开按钮查看全部。

---

### 分类组件功能与特点

分类组件是博客侧边栏的核心功能之一，用于展示博客文章的分类体系，帮助访客快速浏览感兴趣的内容。这个组件通常位于公告组件下方，是访客导航博客内容的重要工具。

#### 1. 基本配置解析

*   **`type: "categories"`**: 指定组件类型为分类组件，这是固定值。
*   **`position: "sticky"`**: 设置组件在侧边栏内的定位方式，"sticky" 表示粘性定位，随页面滚动跟随。
*   **`class: "onload-animation"`**: 组件的 CSS 类名，用于应用样式和动画效果。
*   **`animationDelay: 150`**: 组件加载动画的延迟时间（单位：毫秒），设置为 150 表示在公告组件后加载。

**布局配置**：分类组件的显示位置通过 `sidebarLayoutConfig.components` 对象配置，需要在对应侧边栏数组中添加 `"categories"`。

---

### 如何使用和调整

1.  **找到配置**: 在 `src/config.ts` 文件中找到 `sidebarLayoutConfig` 对象。

2.  **添加组件配置**: 在 `properties` 数组中添加分类组件的配置：
    ```typescript
    {
        type: "categories",
        position: "sticky",
        class: "onload-animation",
        animationDelay: 150,
        responsive: {
            collapseThreshold: 5,
        },
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

4.  **调整显示顺序**: 通过修改 `order` 值调整组件在侧边栏中的显示顺序，数值越小越靠前。

5.  **调整定位方式**: 修改 `position` 值设置组件在侧边栏内的定位方式：
    *   `top`: 固定在顶部
    *   `sticky`: 粘性定位（随滚动跟随）

6.  **调整动画效果**: 修改 `animationDelay` 值调整加载动画延迟，实现组件依次加载的错落效果。

7.  **调整折叠阈值**: 修改 `responsive.collapseThreshold` 的数值：
    *   **想让分类总是展开**：可以将值设置得非常大，例如 `collapseThreshold: 999`
    *   **想让分类更容易折叠**：可以减小这个值，例如 `collapseThreshold: 3`
    *   **想禁用折叠功能**：将 `collapseThreshold` 设置为一个极小的负数（如 `-1`）

---

### 分类管理

分类组件的内容是基于博客文章的分类自动生成的，不需要手动配置分类列表。要管理分类，需要在文章的 frontmatter 中设置分类。

#### 1. 文章中设置分类

在 Markdown 文章的 frontmatter 中添加 `categories` 字段：

```yaml title="content/posts/vuejs-guide.md"
---
title: "Vue.js 入门指南"
date: 2023-01-01
categories: ["前端技术", "Vue.js"]
tags: ["Vue", "JavaScript", "前端框架"]
---
```

#### 2. 多级分类

支持多级分类，使用数组表示层级关系：

```yaml title="content/posts/vue3-composition-api.md"
---
title: "Vue 3 Composition API 详解"
date: 2023-01-02
categories: ["前端技术", "Vue.js", "进阶教程"]
tags: ["Vue 3", "Composition API", "响应式"]
---
```

---

### 配置示例

#### 示例 1：基本分类配置

```typescript title="src/config.ts"
{
    type: "categories",
    position: "sticky",
    class: "onload-animation",
    animationDelay: 150,
    responsive: {
        collapseThreshold: 5, // 分类数量超过 5 个时自动折叠
    },
},

components: {
    left: ["profile", "announcement", "categories", "tags"],
    right: ["site-stats", "calendar"],
    drawer: ["profile", "announcement"],
},
```

#### 示例 2：禁用折叠功能

```typescript title="src/config.ts"
{
    type: "categories",
    position: "sticky",
    class: "onload-animation",
    animationDelay: 150,
    responsive: {
        collapseThreshold: -1, // 设置为负数，禁用折叠功能
    },
},

components: {
    left: ["profile", "announcement", "categories", "tags"],
    right: ["site-stats", "calendar"],
    drawer: ["profile", "announcement"],
},
```

#### 示例 3：设置在右侧栏显示

```typescript title="src/config.ts"
{
    type: "categories",
    position: "sticky",
    class: "onload-animation",
    animationDelay: 150,
    responsive: {
        collapseThreshold: 8, // 右侧栏可容纳更多分类，设置较高的阈值
    },
},

components: {
    left: ["profile", "announcement", "tags"],
    right: ["categories", "site-stats", "calendar"],
    drawer: ["profile", "announcement"],
},
```

---

### 注意事项

1.  **布局配置**: 分类组件的显示位置由 `components` 对象控制，需要在对应侧边栏数组中添加 `"categories"`。
2.  **移动端显示**: 由于空间限制，分类组件在移动端可能会显示不同的样式。
3.  **分类数量**: 建议控制分类数量，避免过多细分类别导致导航复杂。一般来说，5-10 个主要分类比较合适。
4.  **分类层级**: 避免过深的分类层级，建议不超过 3 级。
5.  **响应式适配**: 当屏幕尺寸小于 `mobile` 断点时，侧边栏会自动切换为抽屉模式。

---

### 常见问题与解决方案

1.  **问题**: 分类组件不显示
    *   **解决方案**: 
        - 检查 `properties` 数组中是否添加了分类组件配置
        - 确认 `components` 对象中对应侧边栏数组是否包含 `"categories"`

2.  **问题**: 分类数量统计不正确
    *   **解决方案**: 
        - 检查文章的 frontmatter 中 `categories` 字段是否正确设置
        - 确保没有拼写错误

3.  **问题**: 分类链接无效
    *   **解决方案**: 
        - 检查网站的路由配置，确保分类页面可以正常访问

---