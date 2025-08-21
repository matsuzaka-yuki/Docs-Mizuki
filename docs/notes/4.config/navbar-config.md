---
title: 导航栏配置说明
createTime: 2025/08/17 17:21:41
permalink: /config/navbar-config/
---

**导航栏配置说明**

导航栏配置位于 `src/config.ts` 文件中的 `navBarConfig` 对象，控制网站顶部导航栏的显示内容和链接。

## 配置项详解

```typescript
export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,      // 首页链接
    LinkPreset.Archive,   // 归档页面链接
    LinkPreset.About,     // 关于页面链接
    LinkPreset.Friends,   // 朋友页面链接
    LinkPreset.Anime,     // 番剧页面链接
    LinkPreset.Diary,     // 日记页面链接
    {
      name: "GitHub",    // 自定义链接名称
      url: "https://github.com/matsuzaka-yuki",
      external: true,     // 是否为外部链接
    },
  ],
};
```

### 预设链接

Mizuka 提供了多个预设链接，可以直接使用：

- `LinkPreset.Home`：首页链接
- `LinkPreset.Archive`：归档页面链接
- `LinkPreset.About`：关于页面链接
- `LinkPreset.Friends`：朋友页面链接
- `LinkPreset.Anime`：番剧页面链接
- `LinkPreset.Diary`：日记页面链接

### 自定义链接

您可以添加自定义链接到导航栏：

- `name`：链接显示的文本
- `url`：链接地址
- `external`：是否为外部链接，设置为 `true` 时将在新标签页打开

### 修改导航栏

要修改导航栏链接，请编辑 `navBarConfig.links` 数组：

1. **添加链接**：向数组中添加新的预设链接或自定义链接对象
2. **删除链接**：从数组中移除不需要的链接
3. **重新排序**：调整数组中链接的顺序

例如，要添加一个新的 Twitter 链接：

```typescript
{
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    // ... 其他链接
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      external: true,
    },
  ],
}
```