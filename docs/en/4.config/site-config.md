---
title: Site Configuration Guide
createTime: 2025/08/17 17:21:41
permalink: /en/config/site-config/
---


**Site Configuration Instructions**

Site configuration is located in the `siteConfig` object within the `src/config.ts` file, which controls the basic information and global settings of the blog.

## Detailed Explanation of Configuration Items

### Basic Information


```typescripts

// Define site language
const SITE_LANG = "zh_CN"; // Language code, e.g.: 'en', 'zh_CN', 'ja', etc.


export const siteConfig: SiteConfig = {
  title: "Mizuki",        // Website title
  subtitle: "One demo website",  // Website subtitle
  lang: SITE_LANG,         // No configuration required; it will be set automatically based on SITE_LANG
}
```

- `title`: The main title of the website, displayed on the browser tab and page header
- `subtitle`: The subtitle of the website, usually displayed below the homepage banner
- `lang`: The default language of the website, which affects date formatting, translation, and other functions

### Theme Color

```typescript
  themeColor: {
    hue: 210,     // Hue value of the theme color, range 0-360
    fixed: false, // Whether to hide the theme color selector for visitors
  },
```

- `hue`: The hue value of the theme color, which can be any value between 0 and 360
  - Red: 0
  - Cyan: 200
  - Teal: 250
  - Pink: 345
- `fixed`: When set to `true`, visitors will not be able to change the theme color

### Translation Settings

```typescript
  translate: {
    enable: true,              // Whether to enable the translation function
    service: "client.edge",   // Translation service; currently only "client.edge" is supported
    defaultLanguage: getTranslateLanguageFromConfig(SITE_LANG), // Default translation language
    showSelectTag: false,      // Whether to display the language selection dropdown menu
    autoDiscriminate: true,    // Whether to automatically detect the user's language
    ignoreClasses: ["ignore", "banner-title", "banner-subtitle"], // CSS class names to be ignored during translation
    ignoreTags: ["script", "style", "code", "pre"], // HTML tags to be ignored during translation
  },
```

### Banner Settings

Banner settings control the display of the top banner on the homepage:

```typescript
  banner: {
    enable: true,  // Whether to enable the banner
    src: {         // Banner image path
      desktop: [   // Array of images for desktop devices
        "assets/desktop-banner/1.webp",
        "assets/desktop-banner/2.webp",
        // Multiple images are supported, and carousel will be enabled automatically
      ],
      mobile: [    // Array of images for mobile devices
        "assets/mobile-banner/1.webp",
        "assets/mobile-banner/2.webp",
        // Dedicated images for mobile devices
      ],
    },
    position: "center", // Image alignment, supporting 'top', 'center', 'bottom'
    
    carousel: {
      enable: true,    // Enable carousel function (when there are multiple images)
      interval: 1,     // Carousel interval time (in seconds)
    },
    
    homeText: {
      enable: true,    // Display custom text on the homepage
      title: "Mizuki", // Main title of the homepage banner
      subtitle: [      // Array of subtitles, supporting multiple texts
        "One demo website",
        "Carousel Text1",
        "Carousel Text2",
      ],
      typewriter: {
        enable: true,     // Enable typewriter effect
        speed: 100,       // Typing speed (in milliseconds)
        deleteSpeed: 50,  // Deletion speed (in milliseconds)
        pauseTime: 2000,  // Pause time after full display (in milliseconds)
      },
    },
    
    credit: {
      enable: false,    // Display banner image source text
      text: "Describe", // Source text
      url: "",          // Optional: Link to the original work or author's page
    },
  },

navbar: {
		transparentMode: "semifull", // Navbar transparency mode: "semi" (translucent with rounded corners), "full" (fully transparent), "semifull" (dynamic transparency)
	},
```

#### Detailed Explanation of Banner Configuration

- **Image Path**: Relative to the `/src` directory; if starting with `/`, it is relative to the `/public` directory
- **Carousel Function**: Automatically enabled when the length of the image array is greater than 1
- **Responsive Design**: Different images can be used for desktop and mobile devices
- **Typewriter Effect**: Subtitles support dynamic typewriter effect, with configurable speed and pause time

### Table of Contents (TOC) Settings

```typescript
  toc: {
    enable: true, // Whether to enable the table of contents function
    depth: 3,     // TOC depth, 1-6; 1 means only H1 headings are displayed
  },
```

- `enable`: Set to `false` to disable the article table of contents function
- `depth`: Controls the level depth of headings displayed in the table of contents


### Secondary Collapsible Menu Configuration for Navbar (`navBarConfig`)

This configuration is used to control the secondary collapsible menus in the website's navbar. You can find and modify it in the `src/config.ts` file.

#### Main Configuration Items:

*   **`links`**: `Array<Object>`
    *   An array that defines each link in the navbar. Each link object can be a preset link (`LinkPreset`) or a custom link object.
    *   Custom link objects support multi-level menus and include the following properties:
        *   **`name`**: `string`
            *   The displayed name of the menu item.
        *   **`url`**: `string`
            *   The URL to which the menu item jumps when clicked.
        *   **`children`**: `Array<Object>` (optional)
            *   An array that defines the submenus of the current menu item. The structure of submenu items is similar to that of top-level menu items and can be nested further.
            *   Each submenu item can also include properties such as `name`, `url`, and `external`.
            *   **`external`**: `boolean` (optional)
                *   If set to `true`, it indicates an external link, which will open in a new tab.

#### How to Create a Secondary Collapsible Menu:

To create a secondary collapsible menu, you need to add a custom link object containing the `children` property to the `navBarConfig.links` array. Each element in the `children` array will become a submenu of the current menu item.

**Example:**

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "Links", // Name of the first-level menu
			url: "/links/", // Link of the first-level menu (optional; can be empty if there are only submenus)
			children: [
				{
					name: "GitHub", // Name of the second-level menu
					url: "https://github.com/matsuzaka-yuki/Mizuki", // Link of the second-level menu
					external: true, // External link
				},
				{
					name: "Bilibili",
					url: "https://space.bilibili.com/701864046",
					external: true,
				},
				{
					name: "Gitee",
					url: "https://gitee.com/matsuzakayuki/Mizuki",
					external: true,
				},
			],
		},
		{
			name: "My",
			url: "/content/",
			children: [
				LinkPreset.About,
				LinkPreset.Friends,
				LinkPreset.Anime,
				LinkPreset.Diary,
			],
		},
	],
};
```

In the above example:

*   `Links` and `My` are first-level menu items.
*   The `Links` menu contains three second-level submenus: `GitHub`, `Bilibili`, and `Gitee`, all of which are external links.
*   The `My` menu contains four second-level submenus: `About`, `Friends`, `Anime`, and `Diary`, which use preset links (`LinkPreset`).

### Website domain configuration

To configure the website domain, you need to set it in the `astro.config.mjs` file:

```typescript
export default defineConfig({
	site: "https://mizuki.mysqil.com/",
})
```

This simply specifies the website's URL. The `site` property is used by Astro for various purposes, such as generating correct URLs in website pages and RSS feeds.


### Display Social Media Sharing Images (OpenGraph)

You need to configure the activation of OpenGraph (OG) in the `src/config.ts` file.

```typescript
generateOgImages: true, // Enable the function of generating OpenGraph images
```
