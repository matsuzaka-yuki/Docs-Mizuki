---
title: Custom Font Configuration
createTime: 2025/09/16 10:00:00
permalink: /en/config/custom-font/
---

# Mizuki Theme Font Customization Tutorial

This tutorial will guide you through adding and configuring custom fonts in the Mizuki theme.

## Prerequisites

Before you begin, make sure you have:
- Font files ready to add (supports `.ttf`, `.woff`, `.woff2`, etc.)
- Knowledge of the font name and basic information
- Basic file editing skills

## Step 1: Add Font Files

1. Copy your font files to the project's font directory:
   ```
   public/assets/font/
   ```

2. Ensure font file names are clear and descriptive, for example:
   - `MyCustomFont.ttf`
   - `SpecialFont-Bold.woff2`

## Step 2: Configure Font Definitions

### 2.1 Define Font in CSS

Open the `src/styles/main.css` file and add your font after the existing `@font-face` definitions:

```css
/* Import your custom font */
@font-face {
    font-family: 'YourFontName';
    src: url('/assets/font/YourFontFile.ttf') format('truetype');
    font-weight: normal;
    font-display: swap;
}
```

**Parameter Explanation:**
- `font-family`: The font name used for CSS reference
- `src`: Path to the font file
- `font-weight`: Font weight (normal, bold, 100-900)
- `font-display`: Font loading strategy, recommend using `swap`

### 2.2 Create Font Application Class

In the same file, add a font application class:

```css
/* Apply your custom font as global font when enabled */
.your-font-enabled {
    font-family: 'YourFontName', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

**Note:** Class names should use lowercase letters and hyphens, e.g., `custom-font-enabled`.

## Step 3: Update Configuration Files

### 3.1 Modify Main Configuration File

Open the `src/config.ts` file and add your font option in the `font` configuration section:

```typescript
// Font configuration
font: {
    zenMaruGothic: {
        enable: true, // Enable global rounded font
    },
    yourCustomFont: {
        enable: false, // Enable your custom font
    },
},
```

**Configuration Notes:**
- Key names should use camelCase
- The `enable` property controls whether the font is enabled
- Multiple fonts can be enabled simultaneously

### 3.2 Update Type Definitions

Open the `src/types/config.ts` file and add type definitions in the `font` section of the `SiteConfig` type:

```typescript
font: {
    zenMaruGothic: {
        enable: boolean; // Enable global rounded font
    };
    yourCustomFont: {
        enable: boolean; // Enable your custom font
    };
};
```

## Step 4: Apply Font to Layout

Open the `src/layouts/Layout.astro` file, find the `<body>` tag, and add your font class to the `class:list`:

```astro
<body class="min-h-screen" class:list={[
    {
        "lg:is-home": isHomePage, 
        "enable-banner": enableBanner,
        "zen-maru-gothic-enabled": siteConfig.font.zenMaruGothic.enable,
        "your-font-enabled": siteConfig.font.yourCustomFont.enable
    }
]}
    data-overlayscrollbars-initialize
>
```

## Step 5: Test and Use

1. **Enable Font**: Set your font's `enable` to `true` in `src/config.ts`

2. **Restart Development Server**:
   ```bash
   npm run dev
   ```

3. **Check Results**: Open your browser to see if the font is applied correctly

## Advanced Configuration

### Multiple Font Priority

If multiple fonts are enabled simultaneously, font classes defined later in CSS will have higher priority. You can control priority by adjusting the order of classes in CSS.

### Font Fallbacks

It's recommended to include system fonts as fallbacks in font definitions:

```css
.your-font-enabled {
    font-family: 'YourFontName', 'Helvetica Neue', Arial, sans-serif;
}
```

### Font Subsetting

For large font files, consider using font subsetting to reduce file size:

```css
@font-face {
    font-family: 'YourFontName';
    src: url('/assets/font/YourFontFile.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153;
}
```

## Troubleshooting

### Font Not Displaying
1. Check if the font file path is correct
2. Verify if the font file format is supported
3. Check network requests in browser developer tools
4. Validate CSS syntax

### Slow Font Loading
1. Use `font-display: swap` to optimize loading experience
2. Consider using WOFF2 format to reduce file size
3. Enable font preloading

### Configuration Not Taking Effect
1. Ensure all files are saved
2. Restart the development server
3. Clear browser cache
4. Check configuration file syntax

## Example: Adding Source Han Sans

Here's a complete example of adding Source Han Sans font:

1. **Add Font File**: Place `SourceHanSans.ttf` in `public/assets/font/`

2. **CSS Definition**:
```css
@font-face {
    font-family: 'SourceHanSans';
    src: url('/assets/font/SourceHanSans.ttf') format('truetype');
    font-weight: normal;
    font-display: swap;
}

.source-han-sans-enabled {
    font-family: 'SourceHanSans', system-ui, sans-serif;
}
```

3. **Configuration File**:
```typescript
font: {
    zenMaruGothic: {
        enable: true,
    },
    sourceHanSans: {
        enable: false,
    },
},
```

4. **Type Definition**:
```typescript
font: {
    zenMaruGothic: {
        enable: boolean;
    };
    sourceHanSans: {
        enable: boolean;
    };
};
```

5. **Layout Application**:
```astro
"source-han-sans-enabled": siteConfig.font.sourceHanSans.enable
```

## Summary

By following these steps, you can successfully add and use custom fonts in the Mizuki theme. Remember to maintain configuration consistency and test after each modification to ensure the results meet your expectations.

If you encounter any issues, please check your browser's developer tools for more debugging information.