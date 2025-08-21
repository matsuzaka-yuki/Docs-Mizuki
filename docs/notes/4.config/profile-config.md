---
title: 个人资料配置说明
createTime: 2025/08/17 17:21:41
permalink: /config/profile-config/
---

**个人资料配置说明**

个人资料配置位于 `src/config.ts` 文件中的 `profileConfig` 对象，控制网站侧边栏中的个人信息显示。

## 配置项详解

```typescript
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.jpg", // 头像图片路径
  name: "Mizuki",                     // 用户名
  bio: "This is a description",       // 个人简介
  links: [                             // 社交链接
    {
      name: "Bilibli",                // 链接名称
      icon: "fa6-brands:bilibili",    // 图标
      url: "https://space.bilibili.com/701864046", // 链接地址
    },
    // ... 更多链接
  ],
};
```

### 头像设置

- `avatar`：头像图片路径，相对于 `/src` 目录
  - 如果路径以 `/` 开头，则相对于 `/public` 目录
  - 建议使用正方形图片以获得最佳显示效果

### 基本信息

- `name`：显示在头像下方的用户名
- `bio`：个人简介，显示在用户名下方

### 社交链接

社交链接显示在个人简介下方，支持多种图标：

```typescript
links: [
  {
    name: "Bilibli",              // 链接名称
    icon: "fa6-brands:bilibili",  // 图标名称
    url: "https://space.bilibili.com/701864046", // 链接地址
  },
  {
    name: "Gitee",                // 链接名称
    icon: "mdi:git",              // 图标名称
    url: "https://gitee.com/matsuzakayuki", // 链接地址
  },
  {
    name: "GitHub",               // 链接名称
    icon: "fa6-brands:github",    // 图标名称
    url: "https://github.com/matsuzaka-yuki", // 链接地址
  },
]
```

### 图标选择

Mizuka 使用 Iconify 图标库，支持多种图标集：

- `fa6-brands`：Font Awesome 6 品牌图标
- `mdi`：Material Design Icons
- `fa6-solid`：Font Awesome 6 实心图标
- `fa6-regular`：Font Awesome 6 空心图标

### 修改个人资料

要修改个人资料，请编辑 `profileConfig` 对象：

1. **更换头像**：替换 `avatar` 属性的图片路径
2. **修改用户名**：更改 `name` 属性
3. **更新简介**：修改 `bio` 属性
4. **管理社交链接**：编辑 `links` 数组
   - 添加新链接：向数组中添加新的链接对象
   - 删除链接：从数组中移除不需要的链接对象
   - 修改链接：更改现有链接对象的属性