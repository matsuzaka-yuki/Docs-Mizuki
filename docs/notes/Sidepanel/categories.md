---
title: 分类小部件配置
createTime: 2025/11/20 22:14:00
permalink: /Sidepanel/categories/
---

## 分类侧边栏配置说明
这里补充一下分类侧边栏组件的配置说明，其他配置项请参考基础定位配置。
```typescript
{
		type: "categories",
		enable: true,
		order: 3,
		position: "sticky",
		sidebar: "left",
		class: "onload-animation",
		animationDelay: 150,
		responsive: {
			collapseThreshold: 5,
		},
},
```

我来详细解析分类侧边栏组件（`type: "categories"`）中的配置，其他配置项请参考基础定位配置。

### **分类组件 `responsive` 配置详解**

`responsive` 配置是一个对象，目前它只包含一个核心属性：`collapseThreshold`。

#### **1. 折叠阈值 (`collapseThreshold`)**

```typescript
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

### **分类组件功能与特点**

分类组件是博客侧边栏的核心功能之一，用于展示博客文章的分类体系，帮助访客快速浏览感兴趣的内容。这个组件通常位于公告组件下方，是访客导航博客内容的重要工具。

#### **1. 基本配置解析**

*   **`type: "categories"`**: 指定组件类型为分类组件，这是固定值。
*   **`enable: true`**: 控制该组件是否显示，`true` 为显示，`false` 为隐藏。
*   **`order: 3`**: 设置组件显示顺序，数值越小越靠前。通常分类组件设置为 `3`，显示在公告组件之后。
*   **`position: "sticky"`**: 设置组件在侧边栏内的定位方式，"sticky" 表示粘性定位，随页面滚动跟随。
*   **`sidebar: "left"`**: 设置组件所属侧边栏，"left" 为左侧栏，"right" 为右侧栏（需配合 `position: "both"`）。
*   **`class: "onload-animation"`**: 组件的 CSS 类名，用于应用样式和动画效果。
*   **`animationDelay: 150`**: 组件加载动画的延迟时间（单位：毫秒），设置为 150 表示在公告组件后加载。

---

### **如何使用和调整**

1.  **找到配置**: 在 `src/config.ts` 文件中找到 `sidebarLayoutConfig` 对象，然后在 `components` 数组中找到 `type: "categories"` 的那个对象。
2.  **调整阈值**: 修改 `responsive.collapseThreshold` 的数值。
    *   **想让分类总是展开**：可以将值设置得非常大，例如 `collapseThreshold: 999`，这样除非你的分类数量超过 999 个，否则它永远不会折叠。
    *   **想让分类更容易折叠**：可以减小这个值，例如 `collapseThreshold: 3`，这样当分类数量超过 3 个时就会自动折叠。
    *   **想禁用折叠功能**：虽然没有直接的 `disableCollapse` 开关，但将 `collapseThreshold` 设置为一个极小的负数（如 `-1`）通常可以达到同样的效果，因为分类总数永远不会小于 `-1`，所以组件会一直保持展开状态。

**配置示例（总是展开）**:
```typescript
{
    type: "categories",
    enable: true,
    order: 3,
    position: "sticky",
    sidebar: "left",
    class: "onload-animation",
    animationDelay: 150,
    responsive: {
        collapseThreshold: 999, // 分类数量超过 999 才会折叠
    },
},
```

---

### **分类管理**

分类组件的内容是基于博客文章的分类自动生成的，不需要手动配置分类列表。要管理分类，需要在文章的 frontmatter 中设置分类。

#### **1. 文章中设置分类**

在 Markdown 文章的 frontmatter 中添加 `categories` 字段：

```yaml
---
title: "Vue.js 入门指南"
date: 2023-01-01
categories: ["前端技术", "Vue.js"]
tags: ["Vue", "JavaScript", "前端框架"]
---
```

#### **2. 多级分类**

支持多级分类，使用数组表示层级关系：

```yaml
---
title: "Vue 3 Composition API 详解"
date: 2023-01-02
categories: ["前端技术", "Vue.js", "进阶教程"]
tags: ["Vue 3", "Composition API", "响应式"]
---
```

---

### **配置示例**

#### 示例 1：基本分类配置

```typescript
// 位置配置
{
    type: "categories",
    enable: true,
    order: 3,
    position: "sticky",
    sidebar: "left",
    class: "onload-animation",
    animationDelay: 150,
    responsive: {
        collapseThreshold: 5, // 分类数量超过 5 个时自动折叠
    },
},
```

#### 示例 2：禁用折叠功能

```typescript
{
    type: "categories",
    enable: true,
    order: 3,
    position: "sticky",
    sidebar: "left",
    class: "onload-animation",
    animationDelay: 150,
    responsive: {
        collapseThreshold: -1, // 设置为负数，禁用折叠功能
    },
},
```

#### 示例 3：设置在右侧栏显示

```typescript
{
    type: "categories",
    enable: true,
    order: 1, // 在右侧栏中排在最前面
    position: "sticky",
    sidebar: "right", // 设置在右侧栏
    class: "onload-animation",
    animationDelay: 150,
    responsive: {
        collapseThreshold: 8, // 右侧栏可容纳更多分类，设置较高的阈值
    },
},
```

---

### **注意事项**

1.  **分类数量**: 建议控制分类数量，避免过多细分类别导致导航复杂。一般来说，5-10 个主要分类比较合适。
2.  **分类名称**: 分类名称应简洁明了，便于用户理解。
3.  **分类层级**: 避免过深的分类层级，建议不超过 3 级。
4.  **位置选择**: 分类组件通常设置在左侧栏，因为用户习惯在左侧浏览导航内容。
5.  **响应式设计**: 在移动端，分类组件可能会显示不同的样式，建议在各种设备上测试。

---

### **常见问题与解决方案**

1.  **问题**: 分类组件不显示
    *   **解决方案**: 检查 `enable` 是否设置为 `true`，确认文章中是否设置了分类。

2.  **问题**: 分类数量统计不正确
    *   **解决方案**: 检查文章的 frontmatter 中 `categories` 字段是否正确设置，确保没有拼写错误。

3.  **问题**: 分类链接无效
    *   **解决方案**: 检查网站的路由配置，确保分类页面可以正常访问。

---