---
title: 固定连接
createTime: 2025/11/21 00:21:14
permalink: /press/permalink/
---

这是在Mizuki7.2以上加入的新特性,支持你为文章配置固定链接,优化SEO!

## 使用方法

在文章的 Front Matter 中添加以下配置：

```markdown
---
permalink: "encrypted-example"
---
```

他会相对于`posts`构建路径生成一个固定链接, 例如: `https://mizuki.site/posts/encrypted-example`