---
title: ナビゲーションバー設定
createTime: 2025/08/17 17:21:41
permalink: /ja/config/navbar-config/
---

**ナビゲーションバー設定ガイド**

ナビゲーションバーは、ウェブサイトの主要なナビゲーション要素です。ユーザーがサイト内を移動するための重要な機能を提供します。

## 基本設定

### 1. ナビゲーション設定ファイル

`src/config.ts`でナビゲーションメニューを設定します：

```typescript
// src/config.ts
export interface NavItem {
  name: string;
  url: string;
  external?: boolean;
  children?: NavItem[];
}

export const navConfig: NavItem[] = [
  {
    name: 'ホーム',
    url: '/'
  },
  {
    name: 'ブログ',
    url: '/blog'
  },
  {
    name: 'カテゴリ',
    url: '/categories',
    children: [
      { name: '技術', url: '/categories/tech' },
      { name: 'ライフスタイル', url: '/categories/lifestyle' },
      { name: '旅行', url: '/categories/travel' }
    ]
  },
  {
    name: 'About',
    url: '/about'
  },
  {
    name: '連絡先',
    url: '/contact'
  }
]
```

### 2. ナビゲーションコンポーネント

```astro
---
// src/components/Navbar.astro
import { navConfig } from '../config'
---

<nav class="bg-white shadow-md">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- ロゴ -->
      <a href="/" class="text-2xl font-bold text-gray-800">
        Your Site
      </a>
      
      <!-- デスクトップメニュー -->
      <div class="hidden md:flex space-x-8">
        {navConfig.map(item => (
          <div class="relative group">
            <a 
              href={item.url}
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              {item.name}
            </a>
            
            <!-- ドロップダウンメニュー -->
            {item.children && (
              <div class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div class="py-1">
                  {item.children.map(child => (
                    <a 
                      href={child.url}
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <!-- モバイルメニューボタン -->
      <button 
        id="mobile-menu-button"
        class="md:hidden text-gray-600 hover:text-gray-900"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    
    <!-- モバイルメニュー -->
    <div id="mobile-menu" class="md:hidden hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        {navConfig.map(item => (
          <div>
            <a 
              href={item.url}
              class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              {item.name}
            </a>
            {item.children && (
              <div class="pl-4">
                {item.children.map(child => (
                  <a 
                    href={child.url}
                    class="block px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    {child.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</nav>

<script>
// モバイルメニューの切り替え
document.getElementById('mobile-menu-button').addEventListener('click', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});
</script>
```

## 高度な設定

### 1. アクティブリンクのハイライト

```astro
---
const currentPath = Astro.url.pathname;

function isActive(url: string): boolean {
  if (url === '/' && currentPath === '/') return true;
  if (url !== '/' && currentPath.startsWith(url)) return true;
  return false;
}
---

<a 
  href={item.url}
  class={`px-3 py-2 rounded-md text-sm font-medium ${
    isActive(item.url) 
      ? 'text-blue-600 bg-blue-50' 
      : 'text-gray-600 hover:text-gray-900'
  }`}
>
  {item.name}
</a>
```

### 2. 検索機能の統合

```astro
<!-- 検索ボックス -->
<div class="relative">
  <input 
    type="text" 
    id="search-input"
    placeholder="検索..."
    class="w-64 px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  </div>
</div>
```

### 3. ダークモード切り替え

```astro
<!-- ダークモード切り替えボタン -->
<button 
  id="theme-toggle"
  class="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
>
  <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
  </svg>
  <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2L13.09 8.26L20 9L14 14.74L15.18 21.02L10 17.77L4.82 21.02L6 14.74L0 9L6.91 8.26L10 2Z"></path>
  </svg>
</button>

<script>
// ダークモード切り替え
const themeToggle = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

// 現在のテーマを確認
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  lightIcon.classList.remove('hidden');
  document.documentElement.classList.add('dark');
} else {
  darkIcon.classList.remove('hidden');
}

themeToggle.addEventListener('click', function() {
  // アイコンの切り替え
  darkIcon.classList.toggle('hidden');
  lightIcon.classList.toggle('hidden');
  
  // テーマの切り替え
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
  }
});
</script>
```

### 4. 言語切り替え

```astro
---
const languages = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

const currentLang = Astro.url.pathname.split('/')[1] || 'ja';
---

<div class="relative group">
  <button class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
    <span class="mr-2">
      {languages.find(lang => lang.code === currentLang)?.flag}
    </span>
    {languages.find(lang => lang.code === currentLang)?.name}
    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  
  <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
    <div class="py-1">
      {languages.map(lang => (
        <a 
          href={`/${lang.code}${Astro.url.pathname.replace(/^\/[a-z]{2}/, '')}`}
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <span class="mr-3">{lang.flag}</span>
          {lang.name}
        </a>
      ))}
    </div>
  </div>
</div>
```

## スタイリング

### 1. カスタムCSS

```css
/* src/styles/navbar.css */
.navbar {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.navbar-sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-hidden {
  transform: translateY(-100%);
}

.nav-link {
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #3b82f6;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}
```

### 2. アニメーション効果

```astro
<style>
.navbar {
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.dropdown-menu {
  transform: translateY(-10px);
  transition: all 0.2s ease;
}

.group:hover .dropdown-menu {
  transform: translateY(0);
}
</style>
```

## レスポンシブデザイン

### 1. ブレークポイント設定

```css
/* モバイル（768px未満） */
@media (max-width: 767px) {
  .navbar {
    padding: 0.5rem 1rem;
  }
  
  .nav-logo {
    font-size: 1.25rem;
  }
}

/* タブレット（768px〜1023px） */
@media (min-width: 768px) and (max-width: 1023px) {
  .nav-menu {
    gap: 1rem;
  }
}

/* デスクトップ（1024px以上） */
@media (min-width: 1024px) {
  .nav-menu {
    gap: 2rem;
  }
}
```

### 2. モバイル最適化

```astro
<!-- モバイル専用メニュー -->
<div class="md:hidden">
  <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
    {navConfig.map(item => (
      <div>
        <a 
          href={item.url}
          class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
        >
          {item.name}
        </a>
        {item.children && (
          <div class="pl-4 space-y-1">
            {item.children.map(child => (
              <a 
                href={child.url}
                class="block px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
              >
                {child.name}
              </a>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
</div>
```

## パフォーマンス最適化

### 1. 遅延読み込み

```astro
<script>
// ナビゲーションの遅延初期化
document.addEventListener('DOMContentLoaded', function() {
  // ドロップダウンメニューの初期化
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    // イベントリスナーの設定
  });
});
</script>
```

### 2. プリフェッチ

```astro
---
// 重要なページのプリフェッチ
const importantPages = ['/blog', '/about', '/contact'];
---

{importantPages.map(page => (
  <link rel="prefetch" href={page} />
))}
```

## アクセシビリティ

### 1. キーボードナビゲーション

```astro
<nav role="navigation" aria-label="メインナビゲーション">
  <ul class="flex space-x-4">
    {navConfig.map((item, index) => (
      <li>
        <a 
          href={item.url}
          tabindex={index === 0 ? 0 : -1}
          class="nav-link"
          onkeydown="handleKeyDown(event)"
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
</nav>

<script>
function handleKeyDown(event) {
  const links = document.querySelectorAll('.nav-link');
  const currentIndex = Array.from(links).indexOf(event.target);
  
  switch(event.key) {
    case 'ArrowRight':
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % links.length;
      links[nextIndex].focus();
      break;
    case 'ArrowLeft':
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + links.length) % links.length;
      links[prevIndex].focus();
      break;
  }
}
</script>
```

### 2. スクリーンリーダー対応

```astro
<button 
  id="mobile-menu-button"
  aria-expanded="false"
  aria-controls="mobile-menu"
  aria-label="メニューを開く"
>
  <span class="sr-only">メニューを開く</span>
  <!-- ハンバーガーアイコン -->
</button>
```

## 注意事項

1. **ナビゲーションの階層** - 深すぎる階層は避けてください（3階層まで）
2. **モバイル対応** - タッチデバイスでの操作性を考慮してください
3. **パフォーマンス** - 重いアニメーションは避けてください
4. **SEO** - 重要なページへのリンクを含めてください

適切に設定されたナビゲーションバーは、ユーザーエクスペリエンスを大幅に向上させます。