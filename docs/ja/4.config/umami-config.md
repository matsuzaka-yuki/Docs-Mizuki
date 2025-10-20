---
title: Umamiアナリティクス設定ガイド
createTime: 2025/08/21 12:36:33
permalink: /ja/config/umami-config/
---

# Umami 統計設定チュートリアル（V3バージョン）
Umami はオープンソースでプライバシー重視のウェブサイト分析ツールで、Google Analytics の代替として使用できます。本チュートリアルでは、Mizuki テーマに Umami 統計機能を設定する方法を説明します。  
注意：本チュートリアルは Mizuki 5.1.0 バージョン以降に適用されます。

## Umami とは
Umami はオープンソースのウェブサイト分析ツールで、以下の特徴を持ちます：
- オープンソースでユーザープライバシーを重視
- 軽量設計で、ウェブサイトのパフォーマンスに影響を与えない
- 詳細なアクセス統計情報を提供
- セルフホストサービスまたはクラウドサービスの利用が可能

## 設定手順

### 1. Umami アカウントの登録と作成
まず、Umami アカウントを登録する必要があります：
1. [Umami 公式サイト](https://umami.is/) にアクセスするか、セルフホストした Umami サービスを使用します（V3バージョンは現在オープンソース化されていません）。
2. アカウントを登録してログインします。
3. 新しいウェブサイトを作成し、ウェブサイトIDを取得します。

### 2. 必要な情報の取得
Umami ダッシュボードで、以下の情報を取得する必要があります：
- **APIキー**（API Key）
- **ウェブサイトID**（Website ID）
- **トラッキングスクリプトURL**（Tracking Script URL）

### 3. Mizuki の設定
`src/config.ts` ファイルを開き、`umamiConfig` 設定項目を見つけます：

```typescript
export const umamiConfig = {
  enabled: false, // Umami 統計機能を有効にするかどうか
  apiKey: "api_XXXXXXXXXX", // 自身の API キー
  baseUrl: "https://api.umami.is", // Umami Cloud API アドレス
  scripts: `
<script defer src="XXXX.XXX" data-website-id="ABCD1234"></script>
  `.trim(), // ここに挿入する Script を記述します。Layout に再度挿入する必要はありません
} as const;
```

### 4. 設定パラメータの修正
Umami アカウント情報に基づいて、以下のパラメータを修正します：

#### enabled
Umami 統計機能を有効にする場合は `true` に設定します：
```typescript
enabled: true,
```

#### apiKey
実際の API キーに置き換えます：
```typescript
apiKey: "your_actual_api_key_here",
```

#### baseUrl
Umami Cloud を使用する場合はデフォルト値を保持し、セルフホストサービスを使用する場合は自身のサービスアドレスに置き換えます：
```typescript
baseUrl: "https://api.umami.is", // Umami Cloud
// または
baseUrl: "https://your-umami-instance.com", // セルフホストサービス
```

#### scripts
ウェブサイトIDを含む実際のトラッキングスクリプトに置き換えます：
```typescript
scripts: `
<script defer src="https://analytics.umami.is/script.js" data-website-id="your_website_id_here"></script>
`.trim(),
```

### 5. 完全な設定例
以下に完全な設定例を示します：

```typescript
export const umamiConfig = {
  enabled: true,
  apiKey: "api_a1b2c3d4e5f6g7h8i9j0",
  baseUrl: "https://api.umami.is",
  scripts: `
<script defer src="https://analytics.umami.is/script.js" data-website-id="abcd1234-ef56-7890-abcd-ef1234567890"></script>
  `.trim(),
} as const;
```

### 6. 保存と再ビルド
1. `src/config.ts` ファイルを保存します。
2. ウェブサイトを再ビルドします：
   ```bash
   pnpm build
   ```
3. ウェブサイトをデプロイします。

## 設定の検証
設定が完了した後、以下の方法で設定が成功したかどうかを検証できます：
1. 自身のウェブサイトにアクセスします。
2. ブラウザのデベロッパーツールを開きます。
3. ネットワークリクエストを確認し、Umami サーバーへのリクエストが送信されているかを確認します。
4. Umami ダッシュボードでリアルタイムのアクセスデータを確認します。

## トラブルシューティング
設定後にデータが表示されない場合は、以下を確認してください：
1. **enabled が true に設定されていることを確認**
2. **APIキーが正しいかどうかを確認**
3. **ウェブサイトIDが正しいかどうかを確認**
4. **トラッキングスクリプトのURLが正しいかどうかを確認**
5. **ブラウザコンソールにエラーメッセージがないか確認**
6. **Umami サービスが正常に動作しているかどうかを確認**

## プライバシー保護
Umami はユーザープライバシーを重視し、個人を特定できる情報を収集しません。透明性を確保するため、プライバシーポリシーに Umami の使用方法に関する説明を追加できます。

