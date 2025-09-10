---
title: Other Pages
createTime: 2025/08/17 17:21:41
permalink: /en/special/other/
---

# Guide to Project Showcase, Skills, and Timeline Pages

This guide will help you configure and customize the content of your project showcase, skills, and timeline pages.

## 📁 File Structure Overview

```
src/
├── data/
│   ├── projects.ts    # Project data configuration
│   ├── skills.ts      # Skills data configuration
│   └── timeline.ts    # Timeline data configuration
├── pages/
│   ├── projects.astro # Project display page
│   ├── skills.astro   # Skills page
│   └── timeline.astro  # Timeline page
└── constants/
    └── icon.ts        # Icon configuration file
```

## 🎯 Project Showcase Page Configuration

### 1. Editing Project Data

Open `src/data/projects.ts` and add or modify projects in the following format:

```typescript
export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Project Name',
    description: 'Short project description',
    longDescription: 'Detailed project description, supports Markdown format',
    category: 'web', // Possible values: 'web' | 'mobile' | 'desktop' | 'other'
    tags: ['React', 'TypeScript', 'Node.js'],
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-06-01'), // Optional, can be omitted for ongoing projects
    status: 'completed', // 'completed' | 'in-progress' | 'planned'
    technologies: [
      {
        name: 'React',
        icon: 'skill-icons:react-dark', // Icon name
        url: 'https://reactjs.org/'
      }
    ],
    links: {
      github: 'https://github.com/username/project',
      demo: 'https://project-demo.com',
      website: 'https://project-website.com'
    },
    images: [
      '/images/projects/project-1-screenshot.jpg'
    ],
    featured: true // Whether it's a featured project
  }
];
```

### 2. Project Category Descriptions

- `web`: Web application projects
- `mobile`: Mobile application projects
- `desktop`: Desktop application projects
- `other`: Other types of projects

### 3. Project Status Descriptions

- `completed`: Completed
- `in-progress`: In progress
- `planned`: Planned

## 🛠?Skills Page Configuration

### 1. Editing Skill Data

Open `src/data/skills.ts` and add or modify skills in the following format:

```typescript
export const skills: Skill[] = [
  {
    name: 'Skill Name',
    category: 'frontend', // Skill category
    level: 90, // Skill level (0-100)
    icon: 'skill-icons:javascript', // Icon name
    description: 'Skill description',
    experience: '3 years', // Experience duration
    projects: ['project-1', 'project-2'], // Related project IDs
    certifications: [ // Optional: Related certifications
      {
        name: 'Certification Name',
        issuer: 'Issuing Body',
        date: '2023-01-01',
        url: 'https://certification-url.com'
      }
    ]
  }
];
```

### 2. Skill Category Descriptions

- `frontend`: Frontend development
- `backend`: Backend development
- `mobile`: Mobile development
- `database`: Database
- `devops`: DevOps deployment
- `design`: Design tools
- `other`: Other skills

### 3. Skill Level Reference

- `0-30`: Beginner
- `31-60`: Entry-level
- `61-80`: Proficient
- `81-95`: Master
- `96-100`: Expert

## Timeline Page Configuration

### 1. Editing Timeline Data

Open `src/data/timeline.ts` and add or modify timeline events in the following format:

```typescript
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    title: 'Event Title',
    description: 'Event description, supports Markdown format',
    date: new Date('2023-01-01'),
    type: 'work', // Event type
    icon: 'mdi:briefcase', // Icon name
    location: 'Location', // Optional
    organization: 'Organization/Company', // Optional
    tags: ['Tag1', 'Tag2'], // Optional
    links: [ // Optional: Related links
      {
        title: 'Link Title',
        url: 'https://example.com'
      }
    ],
    achievements: [ // Optional: List of achievements
      'Achievement description 1',
      'Achievement description 2'
    ]
  }
];
```

### 2. Event Type Descriptions

- `work`: Work experience
- `education`: Education experience
- `project`: Project experience
- `achievement`: Awards/Achievements
- `certification`: Certifications
- `other`: Other events

## 🎨 Icon Usage Guide

### 1. Icon Sources

This project supports multiple icon libraries, mainly including:

- **Skill Icons**: `skill-icons:*` - Technology stack icons
- **Material Design Icons**: `mdi:*` - General icons
- **Simple Icons**: `simple-icons:*` - Brand icons
- **Heroicons**: `heroicons:*` - Modern icons
- **Tabler Icons**: `tabler:*` - Concise icons

### 2. How to Find Icons

#### Method One: Online Icon Libraries

1. **Skill Icons**: https://skillicons.dev/
   - Icons specifically for technology stacks
   - Format: `skill-icons:technology-name`
   - Examples: `skill-icons:react-dark`, `skill-icons:typescript`

2. **Iconify**: https://icon-sets.iconify.design/
   - Contains all supported icon libraries
   - Search for icons and copy the name
   - Format: `library-name:icon-name`

#### Method Two: View Existing Configuration

Open `src/constants/icon.ts` to view configured icons:

```typescript
export const iconMap = {
  // Technology stack icons
  'javascript': 'skill-icons:javascript',
  'typescript': 'skill-icons:typescript',
  'react': 'skill-icons:react-dark',
  'vue': 'skill-icons:vuejs-dark',
  
  // General icons
  'work': 'mdi:briefcase',
  'education': 'mdi:school',
  'project': 'mdi:code-braces',
  'achievement': 'mdi:trophy',
  
  // Social media icons
  'github': 'simple-icons:github',
  'linkedin': 'simple-icons:linkedin',
  'twitter': 'simple-icons:twitter'
};
```

### 3. Common Icons

#### Technology stack icons (skill-icons:*)
```
// Frontend
skill-icons:html
skill-icons:css
skill-icons:javascript
skill-icons:typescript
skill-icons:react-dark
skill-icons:vue-dark
skill-icons:angular-dark

// Backend
skill-icons:nodejs-dark
skill-icons:python-dark
skill-icons:java-dark
skill-icons:php-dark
skill-icons:golang

// Database
skill-icons:mysql-dark
skill-icons:postgresql-dark
skill-icons:mongodb
skill-icons:redis-dark

// Tools
skill-icons:git
skill-icons:docker
skill-icons:kubernetes
skill-icons:aws-dark
```

#### General icons (mdi:*)
```
// Work related
mdi:briefcase          # Work
mdi:school             # Education
mdi:trophy             # Achievement
mdi:certificate        # Certificate

// Project related
mdi:code-braces        # Code
mdi:web                # Website
mdi:cellphone          # Mobile application
mdi:desktop-classic    # Desktop application

// Link related
mdi:github             # GitHub
mdi:link-variant       # Link
mdi:eye                # Preview
mdi:download           # Download
```

### 4. Add custom icons

If you need to add new icons, you can add them in `src/constants/icon.ts` file:

```typescript
export const iconMap = {
  // Existing icons...
  
  // Add new icon
  'Custom name': 'icon-library:icon-name'
};
```

## 🔧 Advanced Configuration

### 1. Custom Styles

If you need to customize page styles, you can change the corresponding `.astro` file's CSS part.

### 2. International Support

Page supports multiple languages, related translation files located in `src/i18n/languages/` directory.

### 3. Responsive Design

All pages support responsive design, will automatically adapt on mobile devices.

## 📝 Usage Guide

1. **Determine content type**：select the page to configure (project/skills/timeline)
2. **Edit data file**：modify the corresponding `.ts` configuration file
3. **Choose appropriate icon**：select or use existing icon mapping
4. **Save and preview**：save file and check the effect in the browser
5. **Adjust optimization**：optimize the display according to the results

## 🆘 Common Problems

**Q: Icon not displayed?**
A: Check the icon name if it's correct, make sure format is `library-name:icon-name`

**Q: How to add image?**
A: Put the image in the `public/images/` directory and reference it in the configuration

**Q: Support Markdown?**
A: Yes, description fields support Markdown format

**Q: How to adjust display order?**
A: Adjust the array to change the position of items to change the display order

---

I hope this guide will help you quickly set up these pages! If you have other questions, please refer to the source code or submit Issue.