---
title: 版权信息配置说明
createTime: 2025/11/20 20:22:10
permalink: /Article-layout/copyright/
---

# 版权信息配置说明

版权信息配置位于 `src/config.ts` 文件中的 `license` 对象，控制博客文章底部的版权信息显示设置。

```typescript
export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};
```
### **版权信息 (`license`) 配置项详细说明**
#### **1. 启用版权信息 (`enable`)**

```typescript
enable: true,
```
- `enable`：是否在文章底部显示版权信息卡片，设置为 `true` 则在文章底部显示版权信息。
#### **2. 版权名称 (`name`)**

```typescript
name: "CC BY-NC-SA 4.0",
```
- `name`：版权的名称或类型，例如 "CC BY-NC-SA 4.0"。这个名称会显示在文章底部的版权信息卡片中。
#### **3. 版权链接 (`url`)**

```typescript
url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
```
- `url`：版权的详细链接，点击版权信息卡片会跳转到这个链接。例如，"https://creativecommons.org/licenses/by-nc-sa/4.0/" 是 CC BY-NC-SA 4.0 许可证的链接。