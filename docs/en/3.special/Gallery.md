---
title: Gallery Page
createTime: 2025/08/28 17:21:41
permalink: /en/special/gallery/
---
# Complete User Guide for the Photo Album System  

## Table of Contents  
1. [System Overview](#system-overview)  
2. [Album Modes](#album-modes)  
3. [Basic Configuration](#basic-configuration)  
4. [Detailed Guide for Local Mode](#detailed-guide-for-local-mode)  
5. [Detailed Guide for External Link Mode](#detailed-guide-for-external-link-mode)  
6. [Hidden Features](#hidden-features)  
7. [Complete Configuration Examples](#complete-configuration-examples)  
8. [Best Practices](#best-practices)  
9. [Frequently Asked Questions](#frequently-asked-questions)  


## System Overview  

The photo album system supports two storage modes and flexible display controls:  

### Supported Modes  
- **Local Mode**: Images are stored in the server’s local file system.  
- **External Link Mode**: Images are referenced via external URLs.  

### Core Features  
- Automatic album scanning and generation  
- Support for multiple layouts (grid/masonry)  
- Album visibility control (show/hide)  
- Tag and metadata management  
- Responsive design  


## Album Modes  

### Mode Comparison  

| Feature                | Local Mode                | External Link Mode         |
|------------------------|---------------------------|----------------------------|
| Image Storage          | Local file system         | External URLs              |
| Loading Speed          | Fast                      | Dependent on external service |
| Storage Cost           | Occupies server space     | No local storage cost      |
| Stability              | High                      | Dependent on external service |
| Configuration Complexity | Simple                   | Moderate                   |
| Suitable Scenarios     | Personal websites, small projects | Large image libraries, CDN optimization |


## Basic Configuration  

Each album requires an `info.json` configuration file, which is placed in the album folder.  

### Basic File Structure  
```
public/images/albums/
├── Album Name 1/
│   ├── info.json          # Required: Album configuration
│   ├── cover.jpg          # Required for Local Mode: Cover image
│   ├── photo1.jpg         # Local Mode: Album images
│   └── photo2.png
├── Album Name 2/
│   └── info.json          # Only configuration file needed for External Link Mode
└── ...
```

### Explanation of Common Fields  

| Field         | Type      | Required | Description                                                                 |
|---------------|-----------|----------|-----------------------------------------------------------------------------|
| `mode`        | string    | No       | Mode setting: Use "external" for External Link Mode; omit for Local Mode.   |
| `hidden`      | boolean   | No       | Whether to hide the album; set to `true` to hide.                           |
| `title`       | string    | No       | Album title.                                                                |
| `description` | string    | No       | Album description.                                                          |
| `date`        | string    | No       | Creation date, format: `YYYY-MM-DD`.                                        |
| `location`    | string    | No       | Shooting location.                                                          |
| `tags`        | array     | No       | Array of tags (e.g., ["Travel", "Nature"]).                                |
| `layout`      | string    | No       | Layout type: "grid" or "masonry".                                           |
| `columns`     | number    | No       | Number of columns; default is 3.                                            |


## Detailed Guide for Local Mode  

### File Structure  
```
Album Folder/
├── info.json              # Configuration file
├── cover.jpg              # Cover image (required)
├── image1.jpg
├── image2.png
└── image3.gif
```

### Configuration Example  
```json
{
  "title": "My Travel Album",
  "description": "Beautiful memories from summer 2024",
  "date": "2024-08-15",
  "location": "Kyoto, Japan",
  "tags": ["Travel", "Kyoto", "Summer"],
  "layout": "masonry",
  "columns": 3
}
```

### Supported Image Formats  
- `.jpg` / `.jpeg`  
- `.png`  
- `.gif`  
- `.webp`  
- `.svg`  
- `.avif`  
- `.bmp`  
- `.tiff` / `.tif`  

### File Naming Rules  
- The cover image must be named `cover.jpg`.  
- Other images can have any name.  
- Chinese filenames are supported.  
- Descriptive filenames are recommended.  

### Automatic Features  
- The system automatically scans all images in the folder.  
- Automatically generates image IDs and basic information.  
- Uses the file modification time as the default shooting date.  


## Detailed Guide for External Link Mode  

### Configuration Structure  
External Link Mode requires full definition of all image information in `info.json`.  

### Basic Configuration  
```json
{
  "mode": "external",
  "title": "External Link Album Example",
  "cover": "https://example.com/cover.jpg",
  "photos": [
    {
      "src": "https://example.com/photo1.jpg",
      "alt": "Image description"
    }
  ]
}
```

### Complete Configuration Example  
```json
{
  "mode": "external",
  "title": "Landscape Photography Collection",
  "description": "Beautiful landscapes from around the world",
  "date": "2024-08-20",
  "location": "Global",
  "tags": ["Landscape", "Photography", "Nature"],
  "layout": "masonry",
  "columns": 3,
  "cover": "https://cdn.example.com/albums/landscape/cover.jpg",
  "photos": [
    {
      "id": "mountain-sunset",
      "src": "https://cdn.example.com/photos/mountain-sunset.jpg",
      "thumbnail": "https://cdn.example.com/thumbs/mountain-sunset.jpg",
      "alt": "Mountain sunset",
      "title": "Alps Sunset",
      "description": "Breathtaking sunset view from the top of the Alps",
      "tags": ["Mountains", "Sunset", "Alps"],
      "date": "2024-07-15",
      "location": "Swiss Alps",
      "width": 1920,
      "height": 1080,
      "camera": "Canon EOS R5",
      "lens": "RF 24-70mm f/2.8L IS USM",
      "settings": {
        "aperture": "f/8",
        "shutter": "1/125",
        "iso": "200",
        "focal": "35mm"
      }
    },
    {
      "id": "ocean-waves",
      "src": "https://cdn.example.com/photos/ocean-waves.jpg",
      "alt": "Ocean waves",
      "title": "Pacific Waves",
      "tags": ["Ocean", "Waves"],
      "width": 1920,
      "height": 1280
    }
  ]
}
```

### Explanation of Photo Fields  

| Field         | Type      | Required | Description                                                                 |
|---------------|-----------|----------|-----------------------------------------------------------------------------|
| `id`          | string    | No       | Unique identifier; auto-generated if omitted.                               |
| `src`         | string    | Yes      | Image URL.                                                                  |
| `thumbnail`   | string    | No       | Thumbnail image URL.                                                        |
| `alt`         | string    | No       | Alternative text (for accessibility).                                      |
| `title`       | string    | No       | Image title.                                                                |
| `description` | string    | No       | Image description.                                                          |
| `tags`        | array     | No       | Image-specific tags.                                                        |
| `date`        | string    | No       | Shooting date, format: `YYYY-MM-DD`.                                        |
| `location`    | string    | No       | Shooting location.                                                          |
| `width`/`height` | number | No    | Image dimensions (in pixels).                                               |
| `camera`      | string    | No       | Camera model used.                                                          |
| `lens`        | string    | No       | Lens information.                                                           |
| `settings`    | object    | No       | Shooting parameters (aperture, shutter speed, etc.).                        |

### Recommended External Link Services  
- **Free Services**: Imgur, Cloudinary (free tier)  
- **Paid CDNs**: Alibaba Cloud OSS, Tencent Cloud COS, AWS S3  
- **Image Hosting**: SM.MS, Lugo Image Hosting  
- **GitHub**: Can be used as image hosting (note usage limits)  


## Hidden Features  

### Basic Usage  
Add `"hidden": true` to `info.json` (for any mode) to hide the album:  

```json
{
  "hidden": true,
  "title": "Private Album",
  "description": "This album will not appear in the album list"
}
```

### Hidden Behavior  
- ✅ The album will not appear on the album list page.  
- ✅ Files remain stored on the server.  
- ✅ Direct access via URL is still possible.  
- ❌ This is **not** true access control (no password protection).  

### Usage Scenarios  
1. **Temporary Hiding**: Hide albums during maintenance.  
2. **Private Content**: Albums not intended for public display.  
3. **Test Albums**: For development and testing purposes.  
4. **Unfinished Albums**: Content still being organized.  
5. **Seasonal Display**: Show only during specific periods.  

### Visibility Control  
```json
// Hide the album
{ "hidden": true }

// Show the album (default)
{ "hidden": false }
// Or omit the "hidden" field entirely
{}
```


## Complete Configuration Examples  

### Example 1: Local Mode Album  
```json
{
  "title": "Family Gathering",
  "description": "Warm moments from the 2024 Spring Festival family gathering",
  "date": "2024-02-10",
  "location": "Beijing",
  "tags": ["Family", "Spring Festival", "Gathering"],
  "layout": "grid",
  "columns": 4
}
```

### Example 2: External Link Mode Album  
```json
{
  "mode": "external",
  "title": "Street Photography",
  "description": "Moments of city street life",
  "date": "2024-06-15",
  "location": "Shanghai",
  "tags": ["Street", "Photography", "City"],
  "layout": "masonry",
  "columns": 3,
  "cover": "https://cdn.example.com/street/cover.jpg",
  "photos": [
    {
      "src": "https://cdn.example.com/street/photo1.jpg",
      "alt": "Street pedestrians",
      "title": "Hurrying Steps",
      "tags": ["Pedestrians", "Street"]
    },
    {
      "src": "https://cdn.example.com/street/photo2.jpg",
      "alt": "Coffee shop",
      "title": "Corner Coffee Shop",
      "tags": ["Coffee", "Shop"]
    }
  ]
}
```

### Example 3: Hidden External Link Album  
```json
{
  "mode": "external",
  "hidden": true,
  "title": "Test Album",
  "description": "Test album, temporarily hidden",
  "cover": "https://picsum.photos/800/600",
  "photos": [
    {
      "src": "https://picsum.photos/800/600?random=1",
      "alt": "Test image"
    }
  ]
}
```


## Best Practices  

### 1. File Organization  
```
albums/
├── 2024-Spring-Festival-Gathering/  # Name with date + description
├── 2024-06-Shanghai-Street-Photography/
├── 2024-07-Japan-Travel/
└── Test-Album/                      # Separate folder for test content
```

### 2. Image Optimization  
- **Local Mode**: Compress images to save space and improve loading speed.  
- **External Link Mode**: Use CDNs and optimized image formats (e.g., WebP).  
- **Recommended Sizes**: Cover images (800x600 px), album images (max 2000 px).  

### 3. Tag Management  
```json
{
  "tags": ["Primary Tag", "Secondary Tag", "Location Tag"]
}
```
- Use consistent tag naming conventions.  
- Avoid excessive tags (3-5 tags per album recommended).  
- Consider establishing a tag categorization system.  

### 4. Writing Descriptions  
- Keep descriptions concise and highlight key information.  
- Include critical details like time, location, and event context.  
- Avoid overly long descriptions.  

### 5. Layout Selection  
- **Grid Layout**: Suitable for images of similar sizes.  
- **Masonry Layout**: Suitable for images with varying sizes.  
- **Column Settings**: 1-2 columns for mobile; 3-4 columns for desktop.  

### 6. Performance Optimization  
- Regularly clean up unused albums.  
- Use efficient image formats (WebP is better than JPEG for most cases).  
- Implement lazy loading and thumbnails.  


## Frequently Asked Questions  

### Q1: Why isn’t my album displaying?  
**Checklist:**  
- [ ] Is the `info.json` file formatted correctly?  
- [ ] Does Local Mode have a `cover.jpg` file?  
- [ ] Has External Link Mode set `"mode": "external"`?  
- [ ] Is `"hidden": true` accidentally set?  
- [ ] Is the file path correct?  

### Q2: Why are external images failing to load?  
**Possible Causes:**  
- Invalid or broken image URLs.  
- Cross-origin resource sharing (CORS) restrictions.  
- Network connection issues.  
- External service limitations (e.g., bandwidth caps).  

**Solutions:**  
- Verify that image URLs are accessible.  
- Use image services that support CORS.  
- Consider switching to a reliable CDN service.  

### Q3: How to manage albums in bulk?  
**Recommended Methods:**  
- Use scripts to generate `info.json` files in bulk.  
- Create album templates for consistent configuration.  
- Manage configuration files with version control (e.g., Git).  

### Q4: Why is the album loading slowly?  
**Optimization Tips:**  
- Compress image files to reduce file size.  
- Use a CDN to accelerate content delivery.  
- Enable browser caching for static assets.  
- Implement lazy loading for images.  

### Q5: How to migrate albums between modes?  
**Local Mode → External Link Mode:**  
1. Upload local images to an image host/CDN.  
2. Modify `info.json` to add external URL information.  
3. Delete local images after verifying the migration.  

**External Link Mode → Local Mode:**  
1. Download all external images to the local server.  
2. Remove `"mode": "external"` from `info.json`.  
3. Ensure a `cover.jpg` file exists in the album folder.  

### Q6: How to secure albums?  
**Notes:**  
- The `hidden` field only hides albums from the list—not true access control.  
- For sensitive content, use server-side permission controls (e.g., password protection).  
- Regularly back up album data to prevent loss.  
- Check privacy settings of external image services.  


For additional questions, please refer to the project documentation or submit an Issue.