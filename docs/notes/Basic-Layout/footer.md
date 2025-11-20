---
title: 页脚配置说明
createTime: 2025/11/20 20:30:34
permalink: /Basic-Layout/footer/
---
# 页脚配置说明
页脚配置位于 `src/config.ts` 文件中的 `footerConfig` 对象，控制博客底部页脚的显示设置。
```typescript
export const footerConfig: FooterConfig = {
	enable: false, 
	customHtml: "", 

};
```
### **页脚 (`footerConfig`) 配置项详细说明**
#### **1. 启用页脚功能 (`enable`)**
```typescript
enable: false, 
```
- `enable`：是否启用页脚功能，默认值为 `false`。
  - 为 `true` 时：启用页脚功能，博客底部会显示自定义的页脚内容。
  - 为 `false` 时：禁用页脚功能，博客底部不会显示任何页脚内容。
#### **2. 自定义页脚内容 (`customHtml`)**
```typescript
customHtml: "", 
```
- `customHtml`：自定义页脚内容，默认值为空字符串。
  - 若留空：页脚内容将从 `FooterConfig.html` 文件中读取。
  - 若填写 HTML 内容：页脚将显示自定义的 HTML 内容。
     - 例如：`<p>备案号：<a href="https://beian.miit.gov.cn/">粤ICP备2023000000号</a></p>`
#### **3. FooterConfig.html 文件**
- `FooterConfig.html` 文件用于存放自定义的页脚内容。
  - 该文件默认位于 `src/FooterConfig.html`。
  - 若 `customHtml` 留空，页脚内容将从该文件中读取。
  - 若 `customHtml` 填写 HTML 内容，页脚将显示自定义的 HTML 内容。
- 注意：`FooterConfig.html` 文件可能会在未来的某个版本弃用，建议优先使用 `customHtml` 配置项进行自定义。