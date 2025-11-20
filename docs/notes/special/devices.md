---
title: 设备页面
createTime: 2025/11/20 22:26:00
permalink: /special/devices/
---

### 设备页面配置教程

Mizuki 主题内置了一个简洁的设备展示（Devices）页面，用于展示您使用或拥有的数码设备。这个页面可以帮助访客了解您的设备偏好和技术环境。

本教程将详细指导你如何添加、修改和管理设备数据。

---

#### **1. 核心概念：页面与数据分离**

::: file-tree

- Mizuki
  - src
    - pages
      - devices.astro
    - data
      - devices.ts
:::

在 Mizuki 主题中，设备页面的**展示逻辑**和**内容数据**是分开的：

*   **展示逻辑**: `src/pages/devices.astro`
    *   这个文件负责设备页面的HTML结构、CSS样式和JavaScript交互逻辑。
    *   它定义了设备如何分类和展示。
    *   **通常情况下，你不需要修改这个文件。**

*   **内容数据**: `src/data/devices.ts`
    *   这个文件是设备内容的"数据库"。所有的设备数据都以对象的形式存储在这里。
    *   每一个设备都是一个对象，包含 `name`, `image`, `specs`, `description`, `link` 等属性。
    *   **添加、修改或删除设备，都在这个文件中操作。**

---

#### **2. `src/data/devices.ts` 文件详解**

打开 `src/data/devices.ts`，你会看到类似下面的代码结构：

```typescript
export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	OnePlus: [
		{
			name: "OnePlus 13T",
			image: "/images/device/oneplus13t.png",
			specs: "Gray / 16G + 1TB",
			description: "Flagship performance, Hasselblad imaging, 80W SuperVOOC.",
			link: "https://www.oneplus.com/cn/13t",
		},
	],
	Router: [
		{
			name: "GL-MT3000",
			image: "/images/device/mt3000.png",
			specs: "1000Mbps / 2.5G",
			description: "Portable WiFi 6 router suitable for business trips and home use.",
			link: "https://www.gl-inet.cn/products/gl-mt3000/",
		},
	],
};
```

**数据结构说明**:

*   **`interface Device`**: 这是一个TypeScript接口，它定义了每一个设备必须包含的字段和它们的类型。
    *   `name: string`: (必填) 设备的名称。
    *   `image: string`: (必填) 设备图片的路径，通常放在 `public/images/device/` 目录下。
    *   `specs: string`: (必填) 设备的主要规格参数。
    *   `description: string`: (必填) 设备的简短描述。
    *   `link: string`: (必填) 设备的官方链接或购买链接。

*   **`DeviceCategory`**: 这是一个类型定义，它定义了设备分类的结构。
    *   键名是分类名称，如 "OnePlus"、"Router" 等。
    *   值是该分类下的设备数组。
    *   可以有 "自定义" 分类，用于放置不属于其他分类的设备。

*   **`export const devicesData: DeviceCategory`**: 这是实际的设备数据对象。
    *   每个属性名是一个分类，属性值是该分类下的设备数组。
    *   分类在页面上的显示顺序通常是按照对象属性的顺序。

---

#### **3. 添加一个新设备**

按照以下步骤添加一个新的设备：

1.  **准备设备图片**:
    *   获取或制作设备展示图片，建议使用设备官方图片或高质量实物图。
    *   将图片文件（如 `my-device.png`）复制到项目的 `public/images/device/` 目录下。
    *   如果目录不存在，可以创建它。

2.  **编辑 `devices.ts` 文件**:
    *   打开 `src/data/devices.ts`。
    *   在 `devicesData` 对象中，决定要添加到哪个分类。
    *   复制一个现有的设备对象作为模板。
    *   修改模板中的属性：
        *   **`name`**: 输入设备的名称。
        *   **`image`**: 设置设备图片的路径，如 `/images/device/my-device.png`。
        *   **`specs`**: 设置设备的主要规格参数，简洁明了。
        *   **`description`**: 设置设备的简短描述，突出特点。
        *   **`link`**: 设置设备的官方链接或购买链接。

3.  **示例：添加一个新分类和设备**

    假设我们要添加一个新的笔记本电脑分类，并添加一个设备，内容如下：
    *   分类：笔记本电脑
    *   名称：ThinkPad X1 Carbon
    *   规格：Intel i7 / 32GB RAM / 1TB SSD
    *   描述：轻薄便携，性能稳定，适合商务和开发使用

    修改后的 `devicesData` 对象会是这样：

    ```typescript
    export const devicesData: DeviceCategory = {
      OnePlus: [
        // ... OnePlus 设备 ...
      ],
      Router: [
        // ... 路由器设备 ...
      ],
      // --- 这是我们新添加的分类和设备 ---
      笔记本电脑: [
        {
          name: "ThinkPad X1 Carbon", // 名称
          image: "/images/device/thinkpad-x1.png", // 图片路径
          specs: "Intel i7 / 32GB RAM / 1TB SSD", // 规格
          description: "轻薄便携，性能稳定，适合商务和开发使用", // 描述
          link: "https://www.lenovo.com.cn/thinkpad-x1-carbon", // 链接
        },
      ],
    };
    ```

---

#### **4. 修改或删除设备**

*   **修改设备**: 直接在 `devicesData` 对象中找到对应的设备对象，修改其属性即可。
*   **删除设备**: 找到对应的设备对象，将其从数组中完全移除。注意不要留下多余的逗号，以免造成语法错误。
*   **删除分类**: 如果一个分类下的所有设备都被删除，可以删除整个分类属性。

---

#### **5. 设备分类说明**

设备按照品牌或类型进行分类，常见的分类包括：

*   **品牌分类**: 如 "OnePlus"、"Apple"、"Lenovo" 等
*   **类型分类**: 如 "Router"、"Notebook"、"Phone"、"Tablet" 等
*   **自定义分类**: 使用 "自定义" 分类，用于放置不属于其他分类的设备

---

#### **6. 最佳实践与建议**

*   **设备图片**: 使用高质量、统一风格的设备图片，增强页面美观度。
*   **规格简明**: 突出设备的关键规格，避免过于冗长的参数列表。
*   **描述准确**: 客观描述设备特点，避免过度宣传性语言。
*   **链接有效**: 使用官方或可靠的链接，确保链接长期有效。
*   **分类合理**: 按照品牌或类型合理分类，便于用户查找。
*   **定期更新**: 随着设备更新换代，定期更新设备列表。

---

#### **7. 页面功能与特性**

设备页面提供以下功能：

*   **分类浏览**: 按设备分类浏览设备列表
*   **设备详情**: 点击设备卡片查看详细规格和描述
*   **设备链接**: 提供官方链接，便于了解更多信息
*   **响应式设计**: 在不同设备上都能良好显示
*   **图片展示**: 展示设备的高清图片

---

#### **8. 导航栏配置**

要在导航栏中显示设备链接，请确保在 `src/config.ts` 的 `navBarConfig` 中包含了设备链接：

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Devices, // 设备页面
		// ... 其他链接
	],
};
```

或者手动添加设备链接：

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "我的设备",
			url: "/devices/",
			icon: "ri:devices-line",
		},
		// ... 其他链接
	],
};
```

---

通过以上步骤，你就可以轻松地管理你的设备页面了。定期更新 `src/data/devices.ts`，让访客了解你的设备偏好和技术环境！