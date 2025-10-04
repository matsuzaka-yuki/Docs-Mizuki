---
title: Umami Analytics Configuration Guide
createTime: 2025/08/21 12:36:33
permalink: /en/config/umami-config/
---

> ⚠️ **Note: The original configuration method has been deprecated. For tutorials and technical details, please refer to [https://ycenzh.github.io/Astro/umami.html](https://ycenzh.github.io/Astro/umami.html)**

**Navigation Bar Configuration Guide**

Umami's configuration items are located in the `src/config.ts` file within the `profileConfig` object. They display the total website visits under the social information card and article visits within articles.

## Configuration Item Details

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
	// Umami analytics section, remember to insert Umami's <script> in src/layouts/MainGridLayout.astro
	umami: {
		enable: true, // Whether to enable Umami analytics
		shareId: "", // Fill in the string at the end of the share URL, e.g., for https://eu.umami.is/api/share/2dKQ5T0WrUn6AYtr, fill in 2dKQ5T0WrUn6AYtr
		region: "", // Umami has two regions, choose as needed, e.g., for https://eu.umami.is, fill in eu
	},
};
```

## Register Umami and Add Your Website

Go to the [Umami official website](https://umami.is/) to register an account and select the **analytics node region** ?add your website in [Websites](https://cloud.umami.is/settings/websites) ?click **Edit** next to your website and then find **ShareURL** at the top and turn on the switch to get the following content:

```
https://cloud.umami.is/share/a-string-of-alphanumeric-characters/your-website-domain
```

Now you can fill in the **specific content of the alphanumeric string** into the file mentioned above:
```
shareId: "a-string-of-alphanumeric-characters"
```



## Q&A

Why is the visit count showing 0 / showing Error?

### Showing Error

Incorrect Umami region selected
- Umami has two regions: us and eu. If you fill it incorrectly, it will show an Error.
- Umami provides a domain starting with cloud, but in the config file, do not fill in cloud; just fill in the region you selected during registration.

### Page views and visits are both 0
Umami integration failed
- Please check if the official analytics script has been added to **MainGridLayout.astro**.