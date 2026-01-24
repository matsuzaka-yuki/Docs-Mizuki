---
title: 标签组件配置
createTime: 2025/11/20 22:03:16
permalink: /Sidepanel/tag/
---

## 标签组件配置说明
这里补充一下标签侧边栏组件的配置说明，其他配置项请参考基础定位配置。

### 组件配置

```typescript title="src/config.ts"
{
	type: "tags",
	position: "top",
	class: "onload-animation",
	animationDelay: 250,
	responsive: {
		collapseThreshold: 20,
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

我来详细解析标签侧边栏组件（`type: "tags"`）的配置和使用方法，其他配置项请参考基础定位配置。

### 标签组件功能与特点

标签组件是博客侧边栏的实用功能之一，用于展示博客文章的标签云，帮助访客快速浏览和筛选特定主题的内容。这个组件通常位于分类组件下方，是访客导航博客内容的重要工具。

#### 1. 基本配置解析

*   **`type: "tags"`**: 指定组件类型为标签组件，这是固定值。
*   **`position: "top"`**: 设置组件在侧边栏内的定位方式：
    *   `top`: 固定在顶部
    *   `sticky`: 粘性定位（随滚动跟随）
*   **`class: "onload-animation"`**: 组件的 CSS 类名，用于应用样式和动画效果。
*   **`animationDelay: 250`**: 组件加载动画的延迟时间（单位：毫秒），用于实现组件依次加载的错落效果。
*   **`responsive`**: 响应式配置对象，包含折叠阈值设置。

**布局配置**：标签组件的显示位置通过 `sidebarLayoutConfig.components` 对象配置，需要在对应侧边栏数组中添加 `"tags"`。

---

### 标签组件 responsive 配置详解

`responsive` 配置是一个对象，目前它只包含一个核心属性：`collapseThreshold`。

#### 1. 折叠阈值 (collapseThreshold)

```typescript title="src/config.ts"
responsive: {
    collapseThreshold: 20,
},
```

*   **作用**: 这个属性用于设置一个**数量阈值**。当你的博客文章标签总数超过这个阈值时，标签组件会自动从**展开状态**切换为**折叠状态**。
*   **详细解释**:
    *   **当标签总数 `<=` `collapseThreshold` 时**: 标签组件会以"展开"的形式显示，所有标签都会平铺出来，用户可以一目了然地看到所有标签并点击。
    *   **当标签总数 `>` `collapseThreshold` 时**: 标签组件会自动"折叠"，只显示一部分标签（例如，前几个），并提供一个可点击的展开/折叠按钮（通常显示为 "显示全部" / "收起"）。用户需要点击该按钮才能看到完整的标签列表。
*   **配置示例**:
    *   如果设置 `collapseThreshold: 10`，而你的博客有 15 个标签，那么标签组件默认会折叠，只显示部分标签。
    *   如果你的博客只有 8 个标签，那么标签组件会默认展开，显示所有 8 个标签。
*   **目的与优势**:
    *   **节省空间**: 当标签数量非常多时（例如几十个），如果全部展开会占据大量的侧边栏空间，可能导致页面过长。折叠功能可以有效节省空间，让界面更整洁。
    *   **提升用户体验**: 对于只有少量标签的用户，展开显示可以提供更好的可用性。对于标签众多的用户，折叠显示可以避免信息过载，让用户可以快速找到自己感兴趣的标签，或者通过展开按钮查看全部。

---

### 如何使用和调整

1.  **找到配置**: 在 `src/config.ts` 文件中找到 `sidebarLayoutConfig` 对象。

2.  **添加组件配置**: 在 `properties` 数组中添加标签组件的配置：
    ```typescript
    {
        type: "tags",
        position: "top",
        class: "onload-animation",
        animationDelay: 250,
        responsive: {
            collapseThreshold: 20,
        },
    }
    ```

3.  **配置布局位置**: 在 `components` 对象中设置组件所在的侧边栏：
    ```typescript
    components: {
        left: ["profile", "announcement", "categories", "tags"], // 将标签组件添加到左侧栏
        right: ["site-stats", "calendar"],
        drawer: ["profile", "announcement"],
    }
    ```

4.  **调整定位方式**: 修改 `position` 值设置组件在侧边栏内的定位方式：
    *   `top`: 固定在顶部
    *   `sticky`: 粘性定位（随滚动跟随）

5.  **调整动画效果**: 修改 `animationDelay` 值调整加载动画延迟，实现组件依次加载的错落效果。

6.  **调整折叠阈值**: 修改 `responsive.collapseThreshold` 的数值：
    *   **想让标签总是展开**：可以将值设置得非常大，例如 `collapseThreshold: 999`，这样除非你的标签数量超过 999 个，否则它永远不会折叠。
    *   **想让标签更容易折叠**：可以减小这个值，例如 `collapseThreshold: 10`，这样当标签数量超过 10 个时就会自动折叠。
    *   **想禁用折叠功能**：虽然没有直接的 `disableCollapse` 开关，但将 `collapseThreshold` 设置为一个极小的负数（如 `-1`）通常可以达到同样的效果，因为标签总数永远不会小于 `-1`，所以组件会一直保持展开状态。

**配置示例（总是展开）**:
```typescript title="src/config.ts"
{
    type: "tags",
    position: "top",
    class: "onload-animation",
    animationDelay: 250,
    responsive: {
        collapseThreshold: 999, // 标签数量超过 999 才会折叠
    },
},
```

---

### 配置示例

#### 示例 1：基本标签配置

```typescript title="src/config.ts"
{
    type: "tags",
    position: "top",
    class: "onload-animation",
    animationDelay: 250,
    responsive: {
        collapseThreshold: 20,
    },
},

components: {
    left: ["profile", "announcement", "categories", "tags"], // 标签组件默认放置于左侧栏
    right: ["site-stats", "calendar"],
    drawer: ["profile", "announcement"],
},
```

#### 示例 2：设置在右侧栏显示

```typescript title="src/config.ts"
{
    type: "tags",
    position: "top",
    class: "onload-animation",
    animationDelay: 300,
    responsive: {
        collapseThreshold: 15,
    },
},

components: {
    left: ["profile", "announcement", "categories"],
    right: ["site-stats", "calendar", "tags"], // 标签组件放置于右侧栏
    drawer: ["profile", "announcement"],
},
```

#### 示例 3：隐藏标签组件

```typescript title="src/config.ts"
{
    type: "tags",
    position: "top",
    class: "onload-animation",
    animationDelay: 250,
    responsive: {
        collapseThreshold: 20,
    },
},

components: {
    left: ["profile", "announcement", "categories"], // 从左侧栏移除标签组件
    right: ["site-stats", "calendar"],
    drawer: ["profile", "announcement"],
},
```

---
