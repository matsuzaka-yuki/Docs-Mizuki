---
title: フッター設定手順
createTime: 2025/08/17 17:21:41
permalink: /ja/config/footer-config/
---




それでは、フッターを設定しましょう。
```typescript [config.ts]
export const footerConfig: FooterConfig = {
	enable: false, // フッターHTMLの挿入を有効にするかどうか
};
```
まず、`enable`を`true`に設定します。

`FooterConfig.html`ファイルを編集し、希望するHTMLコードを追加します。例えば：
```html
    <p>これはフッターの例です</p>
```
