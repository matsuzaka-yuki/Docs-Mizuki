---
title: 基础位置配置
createTime: 2025/11/20 21:30:41
permalink: /Sidepanel/global/
---
## 全局侧边栏位置配置说明
全局侧边栏位置配置位于 `src/config.ts` 文件中的 `sidepanelGlobalConfig` 对象，控制博客的侧边栏显示位置。

```typescript title="src/config.ts"
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	position: "both",

	components: [
		{
			type: "profile",
			enable: true,
			order: 1,
			position: "top",
			sidebar: "left",
			class: "onload-animation",
			animationDelay: 0,
		},
		{
			type: "announcement",
			enable: true,
			order: 2,
			position: "top",
			sidebar: "left",
			class: "onload-animation",
			animationDelay: 50,
		},
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
		{
			type: "site-stats",
			enable: true,
			order: 5,
			position: "top",
			sidebar: "right",
			class: "onload-animation",
			animationDelay: 200,
		},
		{
			type: "calendar",
			enable: true,
			order: 6,
			position: "top",
			sidebar: "right",
			class: "onload-animation",
			animationDelay: 250,
		},
	],

	defaultAnimation: {
		enable: true,
		baseDelay: 0,
		increment: 50,
	},

	responsive: {
		breakpoints: {
			mobile: 768,
			tablet: 1280,
			desktop: 1280,
		},
		layout: {
			mobile: "sidebar",
			tablet: "sidebar",
			desktop: "sidebar",
		},
	},
};
```

## 侧边栏布局配置教程
`sidebarLayoutConfig` 对象用于全面控制博客侧边栏的布局结构、组件排列、动画效果和响应式行为，支持单侧或双侧侧边栏配置，是定制博客布局的核心配置项。

---

### 一、核心布局配置（顶层属性）
#### 1. 侧边栏位置模式（`position`）
- **作用**：设置侧边栏的整体布局模式，决定是否启用双侧侧边栏。
- **可选值**：
  - `"both"`：（默认）双侧模式，同时显示左侧栏和右侧栏，适合桌面端展示更多内容。
  - `"unilateral"`：单侧模式，仅显示左侧栏（移动端默认不显示右侧栏，单侧模式下也不例外）。
- **注意**：若需在右侧栏放置组件，必须将 `position` 设为 `"both"`，否则右侧栏组件不会生效。

#### 2. 组件配置列表（`components`）
- **作用**：数组形式存储所有侧边栏组件的配置，每个元素对应一个组件（如个人资料、分类、标签等），支持自定义组件的启用状态、位置、顺序等。
- **通用配置字段**（每个组件必选/可选字段）：
  | 字段              | 类型    | 作用说明                                                                 |
  |-------------------|---------|--------------------------------------------------------------------------|
  | `type`            | 字符串  | 组件类型（固定值，如 `profile` 对应个人资料、`categories` 对应分类等）。   |
  | `enable`          | 布尔值  | 控制该组件是否显示，`true` 为显示，`false` 为隐藏。                       |
  | `order`           | 数字    | 组件显示顺序，数值越小越靠前（支持整数，如 1、2、3 依次排列）。            |
  | `position`        | 字符串  | 组件在侧边栏内的定位方式，`top` 为固定在顶部，`sticky` 为粘性定位（随滚动跟随）。 |
  | `sidebar`         | 字符串  | 组件所属侧边栏，`left` 为左侧栏，`right` 为右侧栏（需配合 `position: "both"`）。 |
  | `class`           | 字符串  | 组件的 CSS 类名，用于自定义样式或绑定动画效果（如示例中的 `onload-animation`）。 |
  | `animationDelay`  | 数字    | 组件加载动画的延迟时间（单位：毫秒），用于实现组件依次加载的错落效果。    |
  | `responsive`      | 对象    | 组件的响应式配置（可选），仅部分组件支持（如分类、标签组件的折叠阈值）。   |

#### 3. 默认动画配置（`defaultAnimation`）
- **作用**：统一控制所有侧边栏组件的加载动画，若组件未单独设置 `animationDelay`，则遵循此配置。
- **子配置项**：
  - `enable`：布尔值，是否启用默认动画，`true` 为启用。
  - `baseDelay`：数字，动画基础延迟时间（单位：毫秒），所有组件的默认起始延迟。
  - `increment`：数字，递增延迟时间（单位：毫秒），每个组件的动画延迟依次增加该值（如第一个组件延迟 0ms，第二个延迟 50ms）。

#### 4. 响应式布局配置（`responsive`）
- **作用**：控制不同设备（移动端、平板、桌面端）的侧边栏显示模式，适配各种屏幕尺寸,不推荐更改断点,默认的配置的最好的。
- **子配置项**：
  - `breakpoints`：对象，定义设备尺寸断点（单位：像素），用于区分不同设备类型：
    - `mobile`：移动端断点（默认 768px，屏幕宽度＜768px 视为移动端）。
    - `tablet`：平板端断点（默认 1280px，屏幕宽度≥768px 且＜1280px 视为平板端）。
    - `desktop`：桌面端断点（默认 1280px，屏幕宽度≥1280px 视为桌面端）。
  - `layout`：对象，定义不同设备的侧边栏显示模式：
    - `hidden`：不显示侧边栏（仅桌面端支持）。
    - `drawer`：抽屉模式（侧边栏默认隐藏，点击按钮展开，移动端不支持）。
    - `sidebar`：正常显示侧边栏（默认值，适配各设备）。

---

### 二、常用组件配置示例解析
#### 1. 个人资料组件（`type: "profile"`）
```typescript title="src/config.ts"
{
  type: "profile",
  enable: true,
  order: 1,
  position: "top",
  sidebar: "left",
  class: "onload-animation",
  animationDelay: 0,
}
```
- 配置说明：左侧栏顶部显示个人资料，启用动画，无延迟（第一个加载）。

#### 2. 分类组件（`type: "categories"`）
```typescript title="src/config.ts"
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
}
```
- 配置说明：左侧栏粘性定位显示分类，动画延迟 150ms，分类数量＞5 时自动折叠（点击可展开）。

#### 3. 站点统计组件（`type: "site-stats"`）
```typescript title="src/config.ts"
{
  type: "site-stats",
  enable: true,
  order: 5,
  position: "top",
  sidebar: "right",
  class: "onload-animation",
  animationDelay: 200,
}
```
- 配置说明：右侧栏顶部显示站点统计（需 `position: "both"`），动画延迟 200ms。

---

### 三、快速配置步骤
1. **选择布局模式**：根据需求设置 `position` 为 `"both"`（双侧）或 `"unilateral"`（单侧）。
2. **配置组件显示**：在 `components` 数组中调整组件的 `enable` 状态（显示/隐藏）、`order`（顺序）、`sidebar`（所属侧边栏）。
3. **调整动画效果**：通过 `defaultAnimation` 统一设置动画，或为单个组件设置 `animationDelay` 实现错落加载。
4. **适配不同设备**：修改 `responsive.layout` 中的配置，例如移动端设置为 `drawer`（抽屉模式）节省空间。
5. **自定义组件样式**：通过 `class` 字段为组件绑定自定义 CSS 类，实现个性化样式。

---

### 四、常见配置场景示例
#### 场景 1：仅显示左侧栏，隐藏右侧栏
```typescript title="src/config.ts"
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  position: "unilateral", // 单侧模式
  components: [
    // 仅保留左侧栏组件，删除右侧栏组件（如 site-stats、calendar）
    { type: "profile", enable: true, order: 1, position: "top", sidebar: "left", ... },
    { type: "announcement", enable: true, order: 2, position: "top", sidebar: "left", ... },
    { type: "categories", enable: true, order: 3, position: "sticky", sidebar: "left", ... },
  ],
  // 其他配置不变
};
```

#### 场景 2：移动端隐藏侧边栏，桌面端显示双侧
```typescript title="src/config.ts"
responsive: {
  breakpoints: { mobile: 768, tablet: 1280, desktop: 1280 },
  layout: {
    mobile: "hidden", // 移动端隐藏侧边栏
    tablet: "sidebar", // 平板端显示侧边栏
    desktop: "sidebar", // 桌面端显示双侧侧边栏
  },
}
```

#### 场景 3：调整组件顺序，分类组件排在最前
```typescript title="src/config.ts"
components: [
  { type: "categories", enable: true, order: 1, ... }, // order 设为 1，排在第一位
  { type: "profile", enable: true, order: 2, ... }, // 个人资料排在第二位
  // 其他组件依次调整 order 值
]
```

---

### 五、注意事项
1. 右侧栏组件仅在 `position: "both"` 时生效，单侧模式下设置 `sidebar: "right"` 无效。
2. `sticky` 定位的组件需确保侧边栏有足够高度，否则可能无法正常跟随滚动。
3. 动画延迟时间建议控制在 0-500ms 之间，避免延迟过长影响用户体验。
