---
title: 分享组件配置说明
createTime: 2026/01/14 10:00:00
permalink: /Article-layout/share/
copyright:
  author:
    name: Leaf-0w0
    url: https://github.com/Leaf-0w0
---

分享组件配置位于 `src/config.ts` 文件中的 `share` 对象，控制博客文章内的分享组件显示设置。
```typescript title="src/config.ts"
export const shareConfig: ShareConfig = {
	enable: true, // 启用分享功能
};
```
- `enable`：是否启用分享功能，设置为 `true` 则在文章区域显示分享组件，设置为 `false` 则隐藏分享组件且不加载相关库
