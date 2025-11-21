---
title: 个人资料配置说明
createTime: 2025/11/20 20:17:52
permalink: /Basic-Layout/Profile/
---
## 个人资料配置说明
个人资料配置位于 `src/config.ts` 文件中的 `profile` 对象，控制博客侧边栏的个人资料显示设置。

```typescript title="src/config.ts"
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp", 
	name: "Matsuzaka Yuki",
	bio: "The world is big, you have to go and see",
	typewriter: {
		enable: true, 
		speed: 80, 
	},
	links: [
		{
			name: "Bilibli",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/701864046",
		},
		{
			name: "Gitee",
			icon: "mdi:git",
			url: "https://gitee.com/matsuzakayuki",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/matsuzaka-yuki",
		},
		{
			name: "Codeberg",
			icon: "simple-icons:codeberg",
			url: "https://codeberg.org",
		},
		{
			name: "Discord",
			icon: "fa6-brands:discord",
			url: "https://discord.gg/MqW6TcQtVM",
		},
	],
};
```

我们来详细解析 `src/config.ts` 文件中的 `profileConfig` 对象。

这个配置项用于自定义你博客侧边栏（或个人资料展示区域）中关于你自己的信息，是塑造个人品牌和让访客了解你的重要部分。

---

### **个人资料 (Profile) 配置项详细说明**

#### **1. 头像 (`avatar`)**

```typescript
avatar: "assets/images/avatar.webp",
```

*   **作用**: 设置你的个人头像图片。
*   **详细解释**:
    *   这是一个图片文件的路径。
    *   **路径规则**:
        *   如果路径以 `/` 开头（例如 `/assets/images/avatar.webp`），它是相对于项目根目录下的 `public` 文件夹的绝对路径。
        *   如果路径不以 `/` 开头（例如 `assets/images/avatar.webp`），它是相对于 `src` 文件夹的相对路径。
    *   **推荐做法**: 通常，将图片资源放在 `public` 文件夹下，然后使用绝对路径引用，这样可以确保在构建后能正确找到图片。
    *   **图片建议**: 使用方形图片（如 400x400 像素），以避免在显示时被拉伸或压缩变形。支持 `.webp`, `.png`, `.jpg` 等常见格式。

#### **2. 姓名 (`name`)**

```typescript
name: "Matsuzaka Yuki",
```

*   **作用**: 显示你的名字或昵称。这是访客看到的最直接的个人标识。
*   **详细解释**:
    *   这是一个字符串，可以是你的真实姓名、网名、笔名或任何你希望展示的名称。

#### **3. 个人简介 (`bio`)**

```typescript
bio: "The world is big, you have to go and see",
```

*   **作用**: 展示一句简短的个人简介、座右铭、爱好或人生信条。
*   **详细解释**:
    *   这是一个字符串，用于快速向访客传达你的个性或价值观。
    *   如果启用了下面的 `typewriter` 效果，这段文字会以打字机的方式逐字显示。

#### **4. 打字机效果 (`typewriter`)**

```typescript
typewriter: {
    enable: true,  // 是否启用打字机效果
    speed: 80,     // 打字速度（毫秒）
},
```

*   **作用**: 为你的个人简介 (`bio`) 添加动态的打字机效果，逐字显示文本，增加页面的趣味性和互动感。
*   **详细解释**:
    *   `enable`:
        *   `true`: 启用打字机效果。
        *   `false`: 禁用打字机效果，`bio` 文本会一次性直接显示。
    *   `speed`: 控制打字机的速度，单位是毫秒（ms）。数值越小，打字速度越快。例如，`80` 表示每 80 毫秒打印一个字符。

#### **5. 社交链接 (`links`)**

```typescript
links: [
    {
        name: "Bilibli",
        icon: "fa6-brands:bilibili",
        url: "https://space.bilibili.com/701864046",
    },
    // ...更多链接
],
```

*   **作用**: 添加你在各个社交平台、代码仓库或个人网站的链接，方便访客与你取得联系或了解更多关于你的信息。
*   **详细解释**:
    *   这是一个对象数组，每个对象代表一个链接。
    *   每个链接对象包含三个属性：
        *   `name`: (字符串) 链接的名称，会显示在图标旁边或作为提示文字。
        *   `icon`: (字符串) 链接对应的图标。Mizuki支持多种图标库的使用，如 Font Awesome 6 (`fa6-brands:` 前缀)、Material Design Icons (`mdi:` 前缀) 和 Simple Icons (`simple-icons:` 前缀)。你需要提供对应图标的完整名称。
        *   `url`: (字符串) 目标网址。点击图标或名称时，浏览器会跳转到这个地址。
*   **自定义**: 你可以根据自己的需求添加或删除链接对象。例如，如果你有 Twitter、知乎、邮箱等，都可以在这里添加。只需确保 `icon` 的值是模板支持的图标库中的有效名称。

---