---
title: Banner配置
createTime: 2025/11/20 14:46:50
permalink: /Basic-Layout/layout/banner/
---

**Banner配置说明**

Banner配置位于 `src/config.ts` 文件中的 `banner` 对象，控制博客的横幅设置。这个配置会影响你在横幅布局下的显示效果。

## 配置项详解

### Banner配置

```typescript title="src/config.ts"
banner: {
		// 支持单张图片或图片数组，当数组长度 > 1 时自动启用轮播
		src: {
			desktop: [
				"/assets/desktop-banner/1.webp",
				"/assets/desktop-banner/2.webp",
				"/assets/desktop-banner/3.webp",
				"/assets/desktop-banner/4.webp",
				"/assets/desktop-banner/5.webp",
				"/assets/desktop-banner/6.webp",
			], // 桌面横幅图片
			mobile: [
				"/assets/mobile-banner/1.webp",
				"/assets/mobile-banner/2.webp",
				"/assets/mobile-banner/3.webp",
				"/assets/mobile-banner/4.webp",
				"/assets/mobile-banner/5.webp",
				"/assets/mobile-banner/6.webp",
			], // 移动横幅图片
		}, // 使用本地横幅图片

		position: "center", // 等同于 object-position，仅支持 'top', 'center', 'bottom'。默认为 'center'

		carousel: {
			enable: true, // 为 true 时：为多张图片启用轮播。为 false 时：从数组中随机显示一张图片

			interval: 1.5, // 轮播间隔时间（秒）
		},

		waves: {
			enable: true, // 是否启用水波纹效果(这个功能比较吃性能)
			performanceMode: false, // 性能模式：减少动画复杂度(性能提升40%)
			mobileDisable: false, // 移动端禁用
		},

		// PicFlow API支持(智能图片API)
		imageApi: {
			enable: false, // 启用图片API
			url: "http://domain.com/api_v2.php?format=text&count=4", // API地址，返回每行一个图片链接的文本
		},
		// 这里需要使用PicFlow API的Text返回类型,所以我们需要format=text参数
		// 项目地址:https://github.com/matsuzaka-yuki/PicFlow-API
		// 请自行搭建API

		homeText: {
			enable: true, // 在主页显示自定义文本
			title: "美しいミズキ", // 主页横幅主标题

			subtitle: [
				"特別なことはないけど、君がいると十分です",
				"今でもあなたは私の光",
				"君ってさ、知らないうちに私の毎日になってたよ",
				"君と話すと、なんか毎日がちょっと楽しくなるんだ",
				"今日はなんでもない日。でも、ちょっとだけいい日",
			],
			typewriter: {
				enable: true, // 启用副标题打字机效果

				speed: 100, // 打字速度（毫秒）
				deleteSpeed: 50, // 删除速度（毫秒）
				pauseTime: 2000, // 完全显示后的暂停时间（毫秒）
			},
		},

		credit: {
			enable: false, // 显示横幅图片来源文本

			text: "Describe", // 要显示的来源文本
			url: "", // （可选）原始艺术品或艺术家页面的 URL 链接
		},

		navbar: {
			transparentMode: "semifull", // 导航栏透明模式："semi" 半透明加圆角，"full" 完全透明，"semifull" 动态透明
		},
	},
```

我们来将 `src/config.ts` 文件中 `banner` 配置对象的注释提取出来，并进行更详细的解释和说明。

这份配置文件用于高度自定义博客的横幅（Banner）区域，特别是在 "Banner模式" 布局下。

---

### **Banner 配置项详细说明**

#### **1. 核心图片配置 (`src`)**

```typescript
src: {
    desktop: ["/assets/desktop-banner/1.webp", /* ... */], // 桌面端横幅图片数组
    mobile: ["/assets/mobile-banner/1.webp", /* ... */],   // 移动端横幅图片数组
},
```

*   **作用**: 定义博客在桌面端和移动端分别使用的横幅背景图片。
*   **详细解释**:
    *   `desktop`: 用于桌面显示器的图片路径数组。建议使用宽幅、高分辨率的图片（如 1920px 宽度以上）。
    *   `mobile`: 专门用于移动设备的图片路径数组。建议使用高度较小、更紧凑的图片（如 1080px 宽度），以避免在手机上显示时被过度裁剪。
    *   **数组形式**: 当任一设备类型（桌面/移动）的图片数组长度大于 1 时，系统会自动将其视为一个图片集，用于轮播或随机展示功能。
    *   **图片格式**: 示例中使用了 `.webp` 格式，这是一种现代的高效图片格式，能在保证画质的同时显著减小文件大小，提升加载速度。你也可以使用 `.jpg` 或 `.png`。

#### **2. 图片定位 (`position`)**

```typescript
position: "center", // 图片定位方式
```

*   **作用**: 当背景图片的尺寸与横幅容器的尺寸不匹配时，此选项决定了图片如何在容器内对齐。它直接映射到 CSS 的 `object-position` 属性。
*   **可选值**:
    *   `top`: 图片顶部与容器顶部对齐。
    *   `center`: (默认) 图片在容器内水平和垂直方向都居中。
    *   `bottom`: 图片底部与容器底部对齐。
*   **应用场景**: 如果你有一张主体在下方的图片（如一个人物站在画面底部），你可能希望设置为 `bottom` 以确保主体不会被裁剪掉。

#### **3. 轮播/随机展示设置 (`carousel`)**

```typescript
carousel: {
    enable: true,   // 是否启用轮播
    interval: 1.5,  // 轮播切换间隔（秒）
},
```

*   **作用**: 当 `src` 中某个设备类型的图片数组长度大于 1 时，此配置项控制图片的展示方式。
*   **详细解释**:
    *   `enable`:
        *   `true`: (默认) 启用自动轮播功能。图片会按照数组顺序，每隔一定时间自动切换。
        *   `false`: 不启用轮播。系统会从图片数组中**随机选择一张**进行展示。每次页面刷新或路由切换时，图片都可能会变化。
    *   `interval`: 仅在 `enable: true` 时有效。定义了轮播切换的时间间隔，单位为秒（seconds）。例如，`1.5` 表示每 1.5 秒切换一张图片。

#### **4. 视觉效果 (`waves`)**

```typescript
waves: {
    enable: true,          // 是否启用水波纹动画效果
    performanceMode: false,// 是否启用性能模式
    mobileDisable: false,  // 是否在移动端禁用此效果
},
```

*   **作用**: 为横幅添加动态的、类似水波纹或光效的动画，增强视觉吸引力。
*   **详细解释**:
    *   `enable`: 总开关，控制整个水波纹效果的启用与禁用。
    *   `performanceMode`:
        *   `false`: (默认) 完整效果模式，动画效果更丰富、更流畅，但对浏览器性能有一定消耗。
        *   `true`: 性能优先模式。通过降低动画的复杂度和帧率来减少 CPU/GPU 占用，可提升约 40% 的性能，适合在性能较弱的设备或浏览器上使用。
    *   `mobileDisable`:
        *   `false`: (默认) 在移动端也显示水波纹效果。
        *   `true`: 在移动设备上自动禁用此效果，以节省移动设备的电量和性能。

#### **5. 智能图片API集成 (`imageApi`)**

```typescript
imageApi: {
    enable: false, // 是否启用外部图片API
    url: "http://domain.com/api_v2.php?format=text&count=4", // API请求地址
},
```

*   **作用**: 允许你通过调用一个外部 API 来动态获取横幅图片，而不是使用本地固定的图片文件。这对于实现图片自动更新（如每日一图）非常有用。
*   **详细解释**:
    *   `enable`: 控制是否启用此功能。
    *   `url`: 外部图片 API 的请求地址。
    *   **特别要求**: 此配置**仅支持**一种特定的 API 返回格式，即 **`Text` 格式**。API 必须返回一个纯文本字符串，其中每行包含一个图片的 URL 链接。
    *   **示例**: 如果 API 返回以下文本：
        ```
        https://example.com/image1.jpg
        https://example.com/image2.jpg
        https://example.com/image3.jpg
        ```
        系统会解析出这三个图片 URL，并将它们作为横幅图片列表使用。
    *   **依赖项目**: 文档中提到了一个名为 **PicFlow-API** 的项目作为示例。你需要自行搭建或寻找一个符合这种文本返回格式的 API 服务。注意是构建的时候随机构建出图片,不是实现动态图片!

#### **6. 主页文本内容 (`homeText`)**

```typescript
homeText: {
    enable: true,        // 是否在主页横幅显示文本
    title: "美しいミズキ", // 主标题文本
    subtitle: [          // 副标题文本数组
        "特別なことはないけど、君がいると十分です",
        // ...更多句子
    ],
    typewriter: {        // 打字机效果配置
        enable: true,    // 是否启用打字机效果
        speed: 100,      // 打字速度（毫秒/字符）
        deleteSpeed: 50, // 删除速度（毫秒/字符）
        pauseTime: 2000, // 每句显示完成后的暂停时间（毫秒）
    },
},
```

*   **作用**: 在横幅图片上叠加显示自定义的标题和副标题文本，是表达博客主题和个性的重要部分。
*   **详细解释**:
    *   `enable`: 控制是否在主页横幅上显示这些文本。
    *   `title`: 显示的主标题。通常是博客名称、博主昵称或一句核心Slogan。
    *   `subtitle`: 一个字符串数组，包含了多句副标题或描述。
    *   `typewriter`: (打字机效果)
        *   `enable`: 如果为 `true`，副标题会以打字机的效果逐字显示，然后逐字删除，再显示下一句。如果为 `false`，则直接显示所有副标题（或根据其他逻辑选择一句静态显示）。
        *   `speed`: 定义了打字机每秒打印多少个字符（字符/秒）。值越小，打字速度越快。
        *   `deleteSpeed`: 定义了打字机删除字符的速度。
        *   `pauseTime`: 当一句副标题完全显示后，在开始删除并切换到下一句之前，会暂停的时间长度（以毫秒为单位）。

#### **7. 图片版权信息 (`credit`)**

```typescript
credit: {
    enable: false, // 是否显示图片来源信息
    text: "Describe", // 版权文本
    url: "", // 版权链接
},
```

*   **作用**: 用于在横幅的角落（通常是右下角）显示图片的版权信息、来源或艺术家署名，这是尊重知识产权的良好实践。
*   **详细解释**:
    *   `enable`: 控制是否显示版权信息。
    *   `text`: 要显示的版权文本内容，例如 "图片来源: Unsplash" 或 "Art by Artist Name"。
    *   `url`: (可选) 如果提供了一个 URL，版权文本会变成一个可点击的链接，通常指向图片的原始出处或艺术家的个人页面。

#### **8. 导航栏融合 (`navbar`)**

```typescript
navbar: {
    transparentMode: "semifull", // 导航栏透明模式
},
```

*   **作用**: 控制导航栏在 Banner 区域的显示样式，以实现导航栏与 Banner 图片的视觉融合效果。
*   **可选值**:
    *   `semi`: 导航栏背景为半透明，并带有圆角边框，与 Banner 有一定的视觉分离感。
    *   `full`: 导航栏完全透明，只有文字和图标可见，与 Banner 图片完全融为一体。
    *   `semifull`: (可能是默认值) 一种动态混合模式。可能在页面顶部时是完全透明 (`full`)，当页面开始向下滚动时，逐渐变为半透明 (`semi`) 状态，以增强导航栏的可读性。具体行为需参考主题实现。

---
