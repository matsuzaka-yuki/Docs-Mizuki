---
title: Live2D設定
createTime: 2025/08/17 17:21:41
permalink: /ja/config/pio/
---

**Live2D設定説明**

Live2D設定により、ウェブサイトにかわいいバーチャルキャラクターを追加できます。

## 基本設定

Live2D機能を有効にするには、`src/config.ts`ファイルで以下のように設定します：

```typescript
export const siteConfig: SiteConfig = {
  // その他の設定...
  
  live2d: {
    enable: true,           // Live2D機能を有効にする
    model: 'shizuku',       // 使用するモデル名
    display: {
      position: 'right',    // 表示位置：'left' または 'right'
      width: 150,           // モデルの幅
      height: 300,          // モデルの高さ
    },
    mobile: {
      show: false,          // モバイルデバイスで表示するかどうか
    }
  }
}
```

## 利用可能なモデル

現在サポートされているLive2Dモデル：

- `shizuku` - しずく（デフォルト）
- `koharu` - こはる
- `haruto` - はると
- `izumi` - いずみ
- `miku` - みく

## 詳細設定

### 表示設定

```typescript
display: {
  position: 'right',      // 表示位置
  width: 150,             // 幅（ピクセル）
  height: 300,            // 高さ（ピクセル）
  hOffset: 0,             // 水平オフセット
  vOffset: -20,           // 垂直オフセット
}
```

### モバイル設定

```typescript
mobile: {
  show: false,            // モバイルで表示
  scale: 0.8,             // モバイルでのスケール
}
```

### インタラクション設定

```typescript
react: {
  opacity: 0.8,           // 透明度
  opacityHover: 1.0,      // ホバー時の透明度
}
```

## 注意事項

1. Live2Dモデルはページの読み込み速度に影響する可能性があります
2. モバイルデバイスでは、パフォーマンスを考慮してデフォルトで無効になっています
3. カスタムモデルを使用する場合は、適切なライセンスを確認してください