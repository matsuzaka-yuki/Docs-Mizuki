---
title: その他のページ
createTime: 2025/08/17 17:21:41
permalink: /ja/special/other/
---

# プロジェクトショーケース、スキル、タイムラインページのガイド

このガイドでは、プロジェクトショーケース、スキル、タイムラインページの内容を設定およびカスタマイズする方法を説明します。

## 📁 ファイル構造の概要

```
src/
├── data/
│   ├── projects.ts    # プロジェクトデータ設定
│   ├── skills.ts      # スキルデータ設定
│   └── timeline.ts    # タイムラインデータ設定
├── pages/
│   ├── projects.astro # プロジェクト表示ページ
│   ├── skills.astro   # スキルページ
│   └── timeline.astro  # タイムラインページ
└── constants/
    └── icon.ts        # アイコン設定ファイル
```

## 🎯 プロジェクトショーケースページの設定

### 1. プロジェクトデータの編集

`src/data/projects.ts`を開き、以下の形式でプロジェクトを追加または変更します。

```typescript
export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'プロジェクト名',
    description: '短いプロジェクトの説明',
    longDescription: '詳細なプロジェクトの説明、Markdown形式をサポート',
    category: 'web', // 可能な値: 'web' | 'mobile' | 'desktop' | 'other'
    tags: ['React', 'TypeScript', 'Node.js'],
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-06-01'), // オプション、進行中のプロジェクトでは省略可能
    status: 'completed', // 'completed' | 'in-progress' | 'planned'
    technologies: [
      {
        name: 'React',
        icon: 'skill-icons:react-dark', // アイコン名
        url: 'https://reactjs.org/'
      }
    ],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/your-username/project-1',
        icon: 'mdi:github'
      },
      {
        name: 'デモ',
        url: 'https://demo.project-1.com',
        icon: 'mdi:web'
      }
    ],
    images: [
      '/assets/projects/project-1-1.webp',
      '/assets/projects/project-1-2.webp'
    ]
  },
  // 他のプロジェクトを追加...
];
```

### 2. プロジェクトフィールドの説明

各プロジェクトオブジェクトには、以下のフィールドが含まれています。

- `id`: 一意の識別子
- `name`: プロジェクト名
- `description`: 短い説明
- `longDescription`: 詳細な説明（Markdownをサポート）
- `category`: カテゴリ（`web`、`mobile`、`desktop`、`other`）
- `tags`: 関連タグの配列
- `startDate`: 開始日
- `endDate`: 終了日（オプション）
- `status`: ステータス（`completed`、`in-progress`、`planned`）
- `technologies`: 使用技術の配列（名前、アイコン、URL）
- `links`: 関連リンクの配列（名前、URL、アイコン）
- `images`: プロジェクト画像のパスの配列

## 💡 スキルページの設定

### 1. スキルデータの編集

`src/data/skills.ts`を開き、以下の形式でスキルを追加または変更します。

```typescript
export const skills: Skill[] = [
  {
    name: 'JavaScript',
    icon: 'skill-icons:javascript',
    category: 'frontend', // 可能な値: 'frontend' | 'backend' | 'devops' | 'database' | 'tools' | 'other'
    level: 90, // 熟練度 (0-100)
    description: 'ウェブ開発の基礎となるプログラミング言語。',
  },
  // 他のスキルを追加...
];
```

### 2. スキルフィールドの説明

各スキルオブジェクトには、以下のフィールドが含まれています。

- `name`: スキル名
- `icon`: アイコン名
- `category`: カテゴリ（`frontend`、`backend`など）
- `level`: 熟練度（0-100）
- `description`: 説明

## ⏳ タイムラインページの設定

### 1. タイムラインデータの編集

`src/data/timeline.ts`を開き、以下の形式でタイムラインイベントを追加または変更します。

```typescript
export const timeline: TimelineEvent[] = [
  {
    date: new Date('2023-01-01'),
    title: 'プロジェクトXを開始',
    description: '新しいウェブアプリケーションの開発を開始しました。',
    icon: 'mdi:code-braces',
    category: 'work', // 可能な値: 'work' | 'education' | 'personal' | 'event'
  },
  // 他のタイムラインイベントを追加...
];
```

### 2. タイムラインフィールドの説明

各タイムラインイベントオブジェクトには、以下のフィールドが含まれています。

- `date`: 日付
- `title`: タイトル
- `description`: 説明
- `icon`: アイコン名
- `category`: カテゴリ（`work`、`education`など）

## ⚙️ アイコンの設定

`src/constants/icon.ts`ファイルで、プロジェクト、スキル、タイムラインページで使用されるアイコンを定義できます。Mizukiは[Iconify](https://icon-sets.iconify.design/)をサポートしており、数千ものアイコンから選択できます。

```typescript
// src/constants/icon.ts
export const ICON_MAP = {
  'skill-icons:react-dark': 'react-icon-path',
  'mdi:github': 'github-icon-path',
  // 他のアイコンを追加...
};
```

## カスタム表示

`src/pages/projects.astro`、`src/pages/skills.astro`、`src/pages/timeline.astro`ファイルを編集することで、これらのページの表示方法をカスタマイズできます。例えば、新しいセクションを追加したり、既存のセクションのスタイルを変更したりできます。

## ベストプラクティス

- **詳細な説明**: プロジェクト、スキル、タイムラインイベントには、詳細で魅力的な説明を提供します。
- **関連性の高いアイコン**: 各項目に適切なアイコンを選択して、視覚的な魅力を高めます。
- **定期的な更新**: これらのページを定期的に更新して、最新の成果やスキルを反映させます。

## よくある質問

- **Q: プロジェクトが表示されません。**
  - A: `src/data/projects.ts`ファイルが正しく設定されているか確認してください。また、`src/pages/projects.astro`ファイルが存在し、正しく設定されていることを確認してください。
- **Q: スキルが表示されません。**
  - A: `src/data/skills.ts`ファイルが正しく設定されているか確認してください。また、`src/pages/skills.astro`ファイルが存在し、正しく設定されていることを確認してください。
- **Q: タイムラインイベントが表示されません。**
  - A: `src/data/timeline.ts`ファイルが正しく設定されているか確認してください。また、`src/pages/timeline.astro`ファイルが存在し、正しく設定されていることを確認してください。
- **Q: アイコンが表示されません。**
  - A: `icon`プロパティに指定されたアイコン名が正しいか、`src/constants/icon.ts`ファイルに定義されているか確認してください。
