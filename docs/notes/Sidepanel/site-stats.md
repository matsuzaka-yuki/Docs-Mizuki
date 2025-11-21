---
title: 站点统计小部件配置
createTime: 2025/11/20 22:16:00
permalink: /Sidepanel/site-stats/
---

## 站点统计侧边栏配置说明
这里补充一下站点统计侧边栏组件的配置说明，其他配置项请参考基础定位配置。
```typescript title="src/config.ts"
{
		type: "site-stats",
		enable: true,
		order: 5,
		position: "top",
		sidebar: "right",
		class: "onload-animation",
		animationDelay: 200,
},
```

我来详细解析站点统计侧边栏组件（`type: "site-stats"`）的配置和使用方法，其他配置项请参考基础定位配置。

### **站点统计组件功能与特点**

站点统计组件是博客侧边栏的实用功能之一，用于展示博客的运行状态和统计信息，如文章数量、分类数量、标签数量、运行天数等。这些数据可以帮助访客了解博客的规模和活跃度。

#### **1. 基本配置解析**

*   **`type: "site-stats"`**: 指定组件类型为站点统计组件，这是固定值。
*   **`enable: true`**: 控制该组件是否显示，`true` 为显示，`false` 为隐藏。
*   **`order: 5`**: 设置组件显示顺序，数值越小越靠前。通常站点统计组件设置为 `5`，显示在右侧栏顶部。
*   **`position: "top"`**: 设置组件在侧边栏内的定位方式，"top" 表示固定在顶部。
*   **`sidebar: "right"`**: 设置组件所属侧边栏，"right" 为右侧栏（需配合 `position: "both"`）。
*   **`class: "onload-animation"`**: 组件的 CSS 类名，用于应用样式和动画效果。
*   **`animationDelay: 200`**: 组件加载动画的延迟时间（单位：毫秒）。

---

### **站点统计内容配置**

站点统计组件的内容不是在 `sidebarLayoutConfig` 中配置的，而是基于博客的实际数据自动生成的。不过，有些基础信息需要在 `siteConfig` 中配置。

#### **1. 站点开始运行日期配置**

```typescript title="src/config.ts"
export const siteConfig: SiteConfig = {
    // ...其他配置...
    siteStartDate: "2023-01-01", // 站点开始运行日期，用于站点统计组件计算运行天数
    // ...其他配置...
};
```

*   **作用**: 设置博客开始运行的日期，站点统计组件会根据这个日期计算博客运行天数。
*   **配置说明**:
    *   日期格式为 "YYYY-MM-DD"。
    *   建议设置为博客正式发布日期或第一篇文章的发布日期。

#### **2. 自动生成的统计数据**

站点统计组件会自动生成以下统计数据：

*   **文章数量**: 博客中已发布的文章总数。
*   **分类数量**: 博客中使用的分类总数。
*   **标签数量**: 博客中使用的标签总数。
*   **运行天数**: 从 `siteStartDate` 到当前日期的总天数。
*   **最后更新**: 最近一篇文章的更新时间。

---

### **如何使用和调整**

1.  **找到配置**: 在 `src/config.ts` 文件中找到 `sidebarLayoutConfig` 对象，然后在 `components` 数组中找到 `type: "site-stats"` 的那个对象。

2.  **调整位置和顺序**: 
    *   修改 `order` 值调整显示顺序。
    *   修改 `sidebar` 值设置所在侧边栏。
    *   修改 `position` 值设置定位方式。

3.  **设置站点开始日期**: 
    *   在 `siteConfig` 对象中找到 `siteStartDate` 字段。
    *   修改为你的博客实际开始运行的日期。

4.  **调整动画效果**: 
    *   修改 `animationDelay` 值调整加载动画延迟。

---

### **配置示例**

#### 示例 1：基本站点统计配置

```typescript title="src/config.ts"
// 位置配置
{
    type: "site-stats",
    enable: true,
    order: 5,
    position: "top",
    sidebar: "right",
    class: "onload-animation",
    animationDelay: 200,
},

// 站点配置
export const siteConfig: SiteConfig = {
    // ...其他配置...
    siteStartDate: "2023-01-01", // 设置博客开始运行日期
    // ...其他配置...
};
```

#### 示例 2：设置在左侧栏显示

```typescript title="src/config.ts"
{
    type: "site-stats",
    enable: true,
    order: 6, // 调整顺序，显示在分类和标签之后
    position: "sticky", // 使用粘性定位
    sidebar: "left", // 设置在左侧栏
    class: "onload-animation",
    animationDelay: 300, // 调整动画延迟
},
```

#### 示例 3：禁用站点统计组件

```typescript title="src/config.ts"
{
    type: "site-stats",
    enable: false, // 禁用站点统计组件
    order: 5,
    position: "top",
    sidebar: "right",
    class: "onload-animation",
    animationDelay: 200,
},
```

---

### **统计数据更新**

站点统计组件的数据是实时生成的，不需要手动更新。当博客内容发生变化时（如发布新文章、添加新分类等），统计数据会自动更新。

---

### **注意事项**

1.  **右侧栏配置**: 站点统计组件通常设置在右侧栏，需要确保 `sidebarLayoutConfig.position` 设置为 `"both"`，否则右侧栏不会显示。
2.  **日期格式**: 确保日期格式正确，否则可能导致计算错误。
3.  **数据准确性**: 统计数据基于博客的实际内容，确保所有文章都正确设置了分类和标签。
4.  **性能考虑**: 站点统计组件需要统计大量数据，在内容很多的博客上可能影响性能，可以考虑禁用或定期更新。

---

### **常见问题与解决方案**

1.  **问题**: 站点统计组件不显示
    *   **解决方案**: 检查 `enable` 是否设置为 `true`，确认 `sidebarLayoutConfig.position` 是否设置为 `"both"`（如果组件在右侧栏）。

2.  **问题**: 运行天数计算不正确
    *   **解决方案**: 检查 `siteStartDate` 格式是否正确，确保日期是有效的。

3.  **问题**: 文章数量统计不准确
    *   **解决方案**: 检查是否有未发布的草稿被计入统计，确保只有已发布的文章被统计。

---

### **扩展功能**

如果需要更复杂的统计功能，可以考虑以下扩展：

1.  **访问量统计**: 集成第三方统计服务（如 Google Analytics、Umami 等）。
2.  **评论统计**: 显示评论数量、最新评论等。
3.  **阅读量统计**: 显示每篇文章的阅读次数。
4.  **分类/标签排行**: 显示最热门的分类或标签。

---