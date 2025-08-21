---
title: Umami访问量统计配置说明
createTime: 2025/08/21 12:36:33
permalink: /config/umami-config/
---
**导航栏配置说明**

Umami的配置项在 `src/config.ts` 文件中的 `profileConfig` 对象，会在社交信息卡片下显示网站总访问量和文章中显示本文访问量。

## 配置项详解

```typescript
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.jpg", // Relative to /src directory. If starts with '/', relative to /public directory
	name: "Mizuki",
	bio: "This is a description",
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
	],
	// Umami统计部份，记得在src/layouts/MainGridLayout.astro插入Umami的<script>
	umami: {
		enable: true, // 是否显示umami统计
		shareId: "", //填入共享URL最后面那一串  比如：https://eu.umami.is/api/share/2dKQ5T0WrUn6AYtr 你就填入2dKQ5T0WrUn6AYtr
		region: "", //Umami有两个区域，按需选择即可  比如：https://eu.umami.is 你就填入eu
	},
};
```

## 注册Umami并添加你的网站

前往[Umami官网](https://umami.is/)注册账号并选择 **统计节点的区域** →在[Websites](https://cloud.umami.is/settings/websites)添加你的网站→点击你的网站后面的 **Edit** 然后在上面找到 **ShareURL** 并打开开关会得到以下内容

```
https://cloud.umami.is/share/一串字母数字组合/你的网站域名
```

现在你可以把 **一串字母数字组合的具体内容** 填入上述文件的文件中的
```
shareId: "一串字母数字组合"
```



## 添加统计脚本

回到[Websites](https://cloud.umami.is/settings/websites)点击你的网站后面的 **Edit** 然后在上面找到 **Tracking code** 在下面会显示和MainGridLayout.astro（第357行）差不多的内容，替换即可

src/layouts/MainGridLayout.astro（第357行）
```astro
<script defer src="https://cloud.umami.is/script.js" data-website-id="YOUR_UMAMI_WEBSITE_ID" slot="head"></script>
</Layout>
```

