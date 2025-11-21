---
title: 标签小部件配置
createTime: 2025/11/20 22:03:16
permalink: /Sidepanel/tag/
---

## 标签侧边栏配置说明
这里补充一下标签侧边栏组件的配置说明,其他配置项请参考基础定位配置。
```typescript title="src/config.ts"
{
		type: "tags",
		enable: true,
		order: 5,
		position: "top",
		sidebar: "left",
		class: "onload-animation",
		animationDelay: 250,
		responsive: {
			collapseThreshold: 20,
		},
	},
```
我来详细解析标签侧边栏组件（`type: "tags"`）中的 `responsive` 配置,其他配置项请参考基础定位配置。

### **标签组件 `responsive` 配置详解**

`responsive` 配置是一个对象，目前它只包含一个核心属性：`collapseThreshold`。

#### **1. 折叠阈值 (`collapseThreshold`)**

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

### **如何使用和调整**

1.  **找到配置**: 在 `src/config.ts` 文件中找到 `sidebarLayoutConfig` 对象，然后在 `components` 数组中找到 `type: "tags"` 的那个对象。
2.  **调整阈值**: 修改 `responsive.collapseThreshold` 的数值。
    *   **想让标签总是展开**：可以将值设置得非常大，例如 `collapseThreshold: 999`，这样除非你的标签数量超过 999 个，否则它永远不会折叠。
    *   **想让标签更容易折叠**：可以减小这个值，例如 `collapseThreshold: 10`，这样当标签数量超过 10 个时就会自动折叠。
    *   **想禁用折叠功能**：虽然没有直接的 `disableCollapse` 开关，但将 `collapseThreshold` 设置为一个极小的负数（如 `-1`）通常可以达到同样的效果，因为标签总数永远不会小于 `-1`，所以组件会一直保持展开状态。

**配置示例（总是展开）**:
```typescript title="src/config.ts"
{
    type: "tags",
    enable: true,
    order: 5,
    position: "top",
    sidebar: "left",
    class: "onload-animation",
    animationDelay: 250,
    responsive: {
        collapseThreshold: 999, // 标签数量超过 999 才会折叠
    },
},
```

---
