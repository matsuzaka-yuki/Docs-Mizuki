---
title: 基础位置配置
createTime: 2025/11/20 21:30:41
permalink: /Sidepanel/global/
---
## 全局侧边栏位置配置说明
全局侧边栏位置配置位于 `src/config.ts` 文件中的 `SidebarLayoutConfig` 对象，控制博客的侧边栏显示位置。

```typescript title="src/config.ts"
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	properties: [
		{
			type: "profile",
			position: "top",
			class: "onload-animation",
			animationDelay: 0,
		},
		{
			type: "announcement",
			position: "top",
			class: "onload-animation",
			animationDelay: 50,
		},
		{
			type: "categories",
			position: "sticky",
			class: "onload-animation",
			animationDelay: 150,
			responsive: {
				collapseThreshold: 5,
			},
		},
		{
			type: "tags",
			position: "top",
			class: "onload-animation",
			animationDelay: 250,
			responsive: {
				collapseThreshold: 20,
			},
		},
		{
			type: "site-stats",
			position: "top",
			class: "onload-animation",
			animationDelay: 200,
		},
		{
			type: "calendar",
			position: "top",
			class: "onload-animation",
			animationDelay: 250,
		},
	],

	components: {
		left: ["profile", "announcement", "categories", "tags"],
		right: ["site-stats", "calendar"],
		drawer: ["profile", "announcement"],
	},

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
	},
};
```

## 侧边栏布局配置教程
`sidebarLayoutConfig` 对象用于全面控制博客侧边栏的布局结构、组件排列、动画效果和响应式行为，支持单侧或双侧侧边栏配置，是定制博客布局的核心配置项。

---

### 一、核心布局配置（顶层属性）

#### 1. 组件属性配置（`properties`）
- **作用**：数组形式存储所有侧边栏组件的详细配置，每个元素对应一个组件（如个人资料、分类、标签等），支持自定义组件的类型、位置、样式和动画等属性。
- **通用配置字段**（每个组件必选/可选字段）：
  | 字段             | 类型   | 必选 | 作用说明                                                     |
  | ---------------- | ------ | ---- | ------------------------------------------------------------ |
  | `type`           | 字符串 | 是   | 组件类型（固定值，如 `profile` 对应个人资料、`categories` 对应分类等）。 |
  | `position`       | 字符串 | 是   | 组件在侧边栏内的定位方式，`top` 为固定在顶部，`sticky` 为粘性定位（随滚动跟随）。 |
  | `class`          | 字符串 | 否   | 组件的 CSS 类名，用于自定义样式或绑定动画效果（如示例中的 `onload-animation`）。 |
  | `animationDelay` | 数字   | 否   | 组件加载动画的延迟时间（单位：毫秒），用于实现组件依次加载的错落效果。若未设置，将遵循 `defaultAnimation` 配置。 |
  | `responsive`     | 对象   | 否   | 组件的响应式配置，仅部分组件支持（如分类、标签组件的折叠阈值）。 |

#### 2. 组件位置配置（`components`）
- **作用**：配置组件在不同位置的显示，包含左侧栏、右侧栏和抽屉模式的组件列表。
- **子配置项**：
  | 字段     | 类型   | 作用说明                                                     |
  | -------- | ------ | ------------------------------------------------------------ |
  | `left`   | 数组   | 左侧栏显示的组件列表，按顺序排列，元素为组件的 `type` 值。    |
  | `right`  | 数组   | 右侧栏显示的组件列表，按顺序排列，元素为组件的 `type` 值。    |
  | `drawer` | 数组   | 抽屉模式下显示的组件列表，适用于移动端等空间有限的场景，元素为组件的 `type` 值。 |

#### 3. 默认动画配置（`defaultAnimation`）
- **作用**：统一控制所有侧边栏组件的加载动画，若组件未单独设置 `animationDelay`，则遵循此配置。
- **子配置项**：
  - `enable`：布尔值，是否启用默认动画，`true` 为启用。
  - `baseDelay`：数字，动画基础延迟时间（单位：毫秒），所有组件的默认起始延迟。
  - `increment`：数字，递增延迟时间（单位：毫秒），每个组件的动画延迟依次增加该值（如第一个组件延迟 0ms，第二个延迟 50ms）。

#### 3. 组件位置配置（`components`）
- **作用**：配置组件在不同位置的显示，包含左侧栏、右侧栏和抽屉模式的组件列表。
- **子配置项**：
  - `left`：数组，左侧栏显示的组件列表，按顺序排列。
  - `right`：数组，右侧栏显示的组件列表，按顺序排列。
  - `drawer`：数组，抽屉模式下显示的组件列表，适用于移动端等空间有限的场景。

#### 4. 响应式布局配置（`responsive`）
- **作用**：控制不同设备（移动端、平板、桌面端）的侧边栏显示模式，适配各种屏幕尺寸,不推荐更改断点,默认的配置的最好的。
- **子配置项**：
  - `breakpoints`：对象，定义设备尺寸断点（单位：像素），用于区分不同设备类型：
    - `mobile`：移动端断点（默认 768px，屏幕宽度＜768px 视为移动端）。
    - `tablet`：平板端断点（默认 1280px，屏幕宽度≥768px 且＜1280px 视为平板端）。
    - `desktop`：桌面端断点（默认 1280px，屏幕宽度≥1280px 视为桌面端）。

---

### 二、常用组件配置示例解析
#### 1. 个人资料组件（`type: "profile"`）
```typescript title="src/config.ts"
{
  type: "profile",
  position: "top",
  class: "onload-animation",
  animationDelay: 0,
}
```
- 配置说明：显示个人资料，启用动画，无延迟（第一个加载）。

#### 2. 分类组件（`type: "categories"`）
```typescript title="src/config.ts"
{
  type: "categories",
  position: "sticky",
  class: "onload-animation",
  animationDelay: 150,
  responsive: {
    collapseThreshold: 5, // 分类数量超过 5 个时自动折叠
  },
}
```
- 配置说明：粘性定位显示分类，动画延迟 150ms，分类数量＞5 时自动折叠（点击可展开）。

#### 3. 站点统计组件（`type: "site-stats"`）
```typescript title="src/config.ts"
{
  type: "site-stats",
  position: "top",
  class: "onload-animation",
  animationDelay: 200,
}
```
- 配置说明：顶部显示站点统计（默认放置于右侧栏），动画延迟 200ms。

---

### 三、快速配置步骤
1. **配置组件属性**：在 `properties` 数组中添加需要的组件配置，设置每个组件的 `type`、`position`、`class` 和 `animationDelay` 等属性。
2. **配置组件布局**：在 `components` 对象中分别配置 `left`、`right` 和 `drawer` 数组，按顺序列出需要显示的组件类型。
3. **调整动画效果**：通过 `defaultAnimation` 统一设置动画，或为单个组件设置 `animationDelay` 实现错落加载。
4. **适配不同设备**：修改 `responsive.breakpoints` 中的配置，调整不同屏幕尺寸的断点值。
5. **自定义组件样式**：通过 `class` 字段为组件绑定自定义 CSS 类，实现个性化样式。

---

### 四、常见配置场景示例
#### 场景 1：仅显示左侧栏，隐藏右侧栏
```typescript title="src/config.ts"
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [
    // 仅保留需要的组件配置
    { type: "profile", position: "top", class: "onload-animation", animationDelay: 0 },
    { type: "announcement", position: "top", class: "onload-animation", animationDelay: 50 },
    { type: "categories", position: "sticky", class: "onload-animation", animationDelay: 150 },
  ],
  components: {
    left: ["profile", "announcement", "categories"], // 仅配置左侧栏组件
    right: [], // 右侧栏为空
    drawer: ["profile", "announcement"],
  },
  // 其他配置不变
};
```

#### 场景 2：调整组件显示顺序
```typescript title="src/config.ts"
components: {
  left: ["categories", "profile", "announcement"], // 调整顺序，分类组件排在最前
  right: ["site-stats", "calendar"],
  drawer: ["profile", "announcement"],
}
```

---

### 五、注意事项
1. 右侧栏组件需要在 `components.right` 数组中配置，否则不会显示。
2. `sticky` 定位的组件需确保侧边栏有足够高度，否则可能无法正常跟随滚动。
3. 动画延迟时间建议控制在 0-500ms 之间，避免延迟过长影响用户体验。
4. 组件的显示顺序由 `components` 对象中数组的顺序决定，调整数组顺序即可改变组件显示顺序。
5. 抽屉模式（drawer）适用于移动端等空间有限的场景，建议只放置核心组件。
