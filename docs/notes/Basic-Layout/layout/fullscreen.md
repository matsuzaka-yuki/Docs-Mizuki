---
title: 全屏壁纸配置
createTime: 2025/11/20 14:57:49
permalink: /Basic-Layout/layout/fullscreen/
---
**Fullscreen Wallpaper 配置说明**

全屏布局配置位于 `src/config.ts` 文件中的 `fullscreenWallpaperConfig` 对象，控制博客的整体布局设置。

```typescript title="src/config.ts"
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
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
	position: "center", // 壁纸位置，等同于 object-position
	carousel: {
		enable: true, // 启用轮播
		interval: 5, // 轮播间隔时间（秒）
	},
	zIndex: -1, // 层级，确保壁纸在背景层
	opacity: 0.8, // 壁纸透明度
	blur: 1, // 背景模糊程度
};
```

### **全屏壁纸 (Fullscreen Wallpaper) 配置项详细说明**

#### **1. 壁纸图片源 (`src`)**

```typescript
src: {
    desktop: ["/assets/desktop-banner/1.webp", /* ... */], // 桌面端壁纸图片数组
    mobile: ["/assets/mobile-banner/1.webp", /* ... */],   // 移动端壁纸图片数组
},
```

*   **作用**: 定义用于桌面和移动设备的全屏背景图片。
*   **详细解释**:
    *   该结构与 `Banner` 配置中的 `src` 完全相同。它允许你为不同屏幕尺寸提供专门优化的图片。
    *   `desktop`: 用于桌面显示器的图片路径数组。由于是全屏背景，图片的分辨率应尽可能高，以适应各种屏幕尺寸。
    *   `mobile`: 用于移动设备的图片路径数组。考虑到移动设备的屏幕尺寸和带宽，图片可以适当减小文件大小。
    *   **数组形式**: 当数组长度大于 1 时，结合 `carousel` 配置，可以实现壁纸的自动轮播效果。

#### **2. 壁纸定位 (`position`)**

```typescript
position: "center", // 壁纸位置
```

*   **作用**: 当壁纸图片的宽高比与浏览器窗口的宽高比不一致时，此选项决定了图片在窗口中的对齐方式。它直接映射到 CSS 的 `object-position` 属性。
*   **可选值**:
    *   `top`: 图片顶部与窗口顶部对齐。
    *   `center`: (默认) 图片在窗口内水平和垂直方向都居中。这是最常用的设置。
    *   `bottom`: 图片底部与窗口底部对齐。
    *   你也可以使用更复杂的字符串值，如 `"top left"`、`"50% 70%"` 等，具体取决于主题是否支持完整的 `object-position` 语法。
*   **效果**: 如果图片比窗口小，它会在指定位置显示，周围可能会有空白（由 `background-color` 填充）。如果图片比窗口大，它会在指定位置居中，并裁剪掉超出窗口的部分。

#### **3. 轮播设置 (`carousel`)**

```typescript
carousel: {
    enable: true,   // 是否启用轮播
    interval: 5,    // 轮播间隔时间（秒）
},
```

*   **作用**: 当 `src` 中的图片数组长度大于 1 时，此配置项控制是否以及如何自动切换壁纸。
*   **详细解释**:
    *   `enable`:
        *   `true`: 启用自动轮播。壁纸会按照数组顺序，每隔 `interval` 秒自动切换一次。
        *   `false`: 禁用轮播。系统会从图片数组中选择一张（通常是第一张或随机一张）作为静态背景。
    *   `interval`: 轮播切换的时间间隔，单位为秒（seconds）。例如，`5` 表示每 5 秒更换一次壁纸。

#### **4. 层级控制 (`zIndex`)**

```typescript
zIndex: -1, // 层级
```

*   **作用**: 控制全屏壁纸在页面元素堆叠顺序中的位置。这是一个关键的 CSS 属性。
*   **详细解释**:
    *   `zIndex` 的值越大，元素在垂直于屏幕的堆叠顺序中就越靠上。
    *   设置为 `-1` 意味着壁纸将被放置在所有其他页面内容（如导航栏、文章、侧边栏等）的**下方**，确保它只作为背景存在，不会遮挡任何重要内容。
    *   **注意**: 这个值通常不需要修改，除非你遇到了特殊的布局冲突问题。

#### **5. 透明度 (`opacity`)**

```typescript
opacity: 0.8, // 壁纸透明度
```

*   **作用**: 调整壁纸的透明程度。
*   **详细解释**:
    *   值的范围是 `0` 到 `1`。
    *   `1` 表示完全不透明（实心）。
    *   `0` 表示完全透明（不可见）。
    *   `0.8` (示例值) 表示 80% 不透明，即有 20% 的透明度。这使得壁纸会稍微“淡”一些，与前景内容有更好的对比度，从而提高文字的可读性。你可以根据壁纸的亮度和颜色来微调这个值。

#### **6. 背景模糊 (`blur`)**

```typescript
blur: 1, // 背景模糊程度
```

*   **作用**: 为壁纸添加高斯模糊效果，创造出一种毛玻璃（Frosted Glass）或景深效果。
*   **详细解释**:
    *   值的单位是像素（px），数值越大，模糊效果越明显。
    *   `0` 表示无模糊。
    *   `1` (示例值) 表示轻微的模糊。
    *   **效果**: 模糊背景可以有效地将前景内容（如白色的文字）与背景分离开来，即使在不降低透明度的情况下也能提升可读性。它还能营造出一种现代、柔和、高级的视觉氛围。但请注意，较高的 `blur` 值会增加浏览器的渲染负担。

---

