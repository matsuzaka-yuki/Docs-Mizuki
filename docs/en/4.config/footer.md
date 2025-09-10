---
title: Footer Configuration Instructions
createTime: 2025/08/17 17:21:41
permalink: /en/config/footer-config/
---




Now, let's configure the footer
```typescript [config.ts]
export const footerConfig: FooterConfig = {
	enable: false, // Whether to enable Footer HTML injection
};
```
First, set `enable` to `true`

Edit the FooterConfig.html file and add your desired HTML code, for example:
```html
    <p>This is an example footer</p>
```