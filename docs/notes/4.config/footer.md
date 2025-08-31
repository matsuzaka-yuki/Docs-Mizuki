---
title: 页脚配置说明
createTime: 2025/08/17 17:21:41
permalink: /config/footer-config/
---




现在,我们来配置页脚
```typescript [config.ts]
export const footerConfig: FooterConfig = {
	enable: false, // 是否启用Footer HTML注入功能
};
```
首先把`enable`设置为`true`

编辑FooterConfig.html文件,添加你想要的HTML代码,例如:
```html
    <p>这个一个示例页脚</p>
```