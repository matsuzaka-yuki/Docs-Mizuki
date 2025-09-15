---
title: プロフィール設定手順
createTime: 2025/08/17 17:21:41
permalink: /ja/config/profile-config/
---

**プロフィール設定手順**

プロフィール設定は、`src/config.ts`ファイル内の`profileConfig`オブジェクトにあり、ウェブサイトのサイドバーに表示される個人情報を制御します。

## 設定項目の詳細

```typescript
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.jpg", // アバター画像のパス
  name: "Mizuki",                     // ユーザー名
  bio: "これは説明です",       // 自己紹介
  links: [                             // ソーシャルリンク
    {
      name: "Bilibli",                // リンク名
      icon: "fa6-brands:bilibili",    // アイコン
      url: "https://space.bilibili.com/701864046", // リンクURL
    },
    // ... その他のリンク
  ],
};
```

### アバター設定

- `avatar`: アバター画像のパス。`/src`ディレクトリからの相対パスです。
  - パスが`/`で始まる場合、`/public`ディレクトリからの相対パスです。
  - 最適な表示結果を得るには、正方形の画像を使用することをお勧めします。

### 基本情報

- `name`: アバターの下に表示されるユーザー名
- `bio`: ユーザー名の下に表示される自己紹介

### ソーシャルリンク

ソーシャルリンクは自己紹介の下に表示され、さまざまなアイコンをサポートしています。

```typescript
links: [
  {
    name: "Bilibli",              // リンク名
    icon: "fa6-brands:bilibili",  // アイコン名
    url: "https://space.bilibili.com/701864046", // リンクURL
  },
  {
    name: "GitHub",
    icon: "fa6-brands:github",
    url: "https://github.com/matsuzaka-yuki",
  },
  {
    name: "Twitter",
    icon: "fa6-brands:twitter",
    url: "https://twitter.com/your-twitter",
  },
  {
    name: "Email",
    icon: "fa6-solid:envelope",
    url: "mailto:your-email@example.com",
  },
];
```

- `name`: リンクに表示されるテキスト
- `icon`: アイコン名。Iconifyのアイコンセットから選択できます。
- `url`: リンクアドレス

### プロフィールの変更

`profileConfig`オブジェクトを編集することで、プロフィール情報を追加、削除、または変更できます。

1. **アバターの変更**: `avatar`プロパティのパスを更新します。
2. **名前と自己紹介の変更**: `name`と`bio`プロパティの値を更新します。
3. **ソーシャルリンクの追加/削除/変更**: `links`配列内のオブジェクトを編集します。

## ベストプラクティス

- **魅力的なアバター**: 魅力的で認識しやすいアバター画像を使用します。
- **簡潔な自己紹介**: あなたの個性や専門知識を簡潔に表現する自己紹介を作成します。
- **関連性の高いソーシャルリンク**: あなたのオンラインプレゼンスに関連するソーシャルメディアやポートフォリオのリンクのみを含めます。

## よくある質問

- **Q: プロフィール情報が表示されません。**
  - A: `src/config.ts`ファイル内の`profileConfig`オブジェクトが正しく設定されているか確認してください。
- **Q: アバターが表示されません。**
  - A: `avatar`プロパティに指定されたパスが正しいか、画像ファイルがそのパスに存在するか確認してください。
- **Q: ソーシャルリンクのアイコンが表示されません。**
  - A: `icon`プロパティに指定されたアイコン名が正しいか、Iconifyのアイコンセットに存在するか確認してください。
