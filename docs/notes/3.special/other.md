---
title: 其他页面
createTime: 2025/08/17 17:21:41
permalink: /special/other/
---

# 项目展示、技能、时间线页面使用指南

本指南将帮助您配置和自定义项目展示页面、技能页面和时间线页面的内容。

## 📁 文件结构概览

```
src/
├── data/
│   ├── projects.ts    # 项目数据配置
│   ├── skills.ts      # 技能数据配置
│   └── timeline.ts    # 时间线数据配置
├── pages/
│   ├── projects.astro # 项目展示页面
│   ├── skills.astro   # 技能页面
│   └── timeline.astro  # 时间线页面
└── constants/
    └── icon.ts        # 图标配置文件
```

## 🎯 项目展示页面配置

### 1. 编辑项目数据

打开 `src/data/projects.ts` 文件，按以下格式添加或修改项目：

```typescript
export const projects: Project[] = [
  {
    id: 'project-1',
    name: '项目名称',
    description: '项目简短描述',
    longDescription: '项目详细描述，支持 Markdown 格式',
    category: 'web', // 可选值：'web' | 'mobile' | 'desktop' | 'other'
    tags: ['React', 'TypeScript', 'Node.js'],
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-06-01'), // 可选，进行中的项目可以不设置
    status: 'completed', // 'completed' | 'in-progress' | 'planned'
    technologies: [
      {
        name: 'React',
        icon: 'skill-icons:react-dark', // 图标名称
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
    featured: true // 是否为特色项目
  }
];
```

### 2. 项目分类说明

- `web`: Web 应用项目
- `mobile`: 移动应用项目
- `desktop`: 桌面应用项目
- `other`: 其他类型项目

### 3. 项目状态说明

- `completed`: 已完成
- `in-progress`: 进行中
- `planned`: 计划中

## 🛠️ 技能页面配置

### 1. 编辑技能数据

打开 `src/data/skills.ts` 文件，按以下格式添加或修改技能：

```typescript
export const skills: Skill[] = [
  {
    name: '技能名称',
    category: 'frontend', // 技能分类
    level: 90, // 技能等级 (0-100)
    icon: 'skill-icons:javascript', // 图标名称
    description: '技能描述',
    experience: '3年', // 经验时长
    projects: ['project-1', 'project-2'], // 相关项目ID
    certifications: [ // 可选：相关认证
      {
        name: '认证名称',
        issuer: '颁发机构',
        date: '2023-01-01',
        url: 'https://certification-url.com'
      }
    ]
  }
];
```

### 2. 技能分类说明

- `frontend`: 前端开发
- `backend`: 后端开发
- `mobile`: 移动开发
- `database`: 数据库
- `devops`: 运维部署
- `design`: 设计工具
- `other`: 其他技能

### 3. 技能等级参考

- `0-30`: 初学者
- `31-60`: 入门
- `61-80`: 熟练
- `81-95`: 精通
- `96-100`: 专家

## ⏰ 时间线页面配置

### 1. 编辑时间线数据

打开 `src/data/timeline.ts` 文件，按以下格式添加或修改时间线事件：

```typescript
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    title: '事件标题',
    description: '事件描述，支持 Markdown 格式',
    date: new Date('2023-01-01'),
    type: 'work', // 事件类型
    icon: 'mdi:briefcase', // 图标名称
    location: '地点', // 可选
    organization: '组织/公司', // 可选
    tags: ['标签1', '标签2'], // 可选
    links: [ // 可选：相关链接
      {
        title: '链接标题',
        url: 'https://example.com'
      }
    ],
    achievements: [ // 可选：成就列表
      '成就描述1',
      '成就描述2'
    ]
  }
];
```

### 2. 事件类型说明

- `work`: 工作经历
- `education`: 教育经历
- `project`: 项目经历
- `achievement`: 成就奖项
- `certification`: 认证证书
- `other`: 其他事件

## 🎨 图标使用指南

### 1. 图标来源

本项目支持多种图标库，主要包括：

- **Skill Icons**: `skill-icons:*` - 技术栈图标
- **Material Design Icons**: `mdi:*` - 通用图标
- **Simple Icons**: `simple-icons:*` - 品牌图标
- **Heroicons**: `heroicons:*` - 现代图标
- **Tabler Icons**: `tabler:*` - 简洁图标

### 2. 图标查找方法

#### 方法一：在线图标库

1. **Skill Icons**: https://skillicons.dev/
   - 专门用于技术栈的图标
   - 格式：`skill-icons:技术名称`
   - 示例：`skill-icons:react-dark`, `skill-icons:typescript`

2. **Iconify**: https://icon-sets.iconify.design/
   - 包含所有支持的图标库
   - 搜索图标并复制名称
   - 格式：`库名:图标名`

#### 方法二：查看现有配置

打开 `src/constants/icon.ts` 文件，查看已配置的图标：

```typescript
export const iconMap = {
  // 技术栈图标
  'javascript': 'skill-icons:javascript',
  'typescript': 'skill-icons:typescript',
  'react': 'skill-icons:react-dark',
  'vue': 'skill-icons:vuejs-dark',
  
  // 通用图标
  'work': 'mdi:briefcase',
  'education': 'mdi:school',
  'project': 'mdi:code-braces',
  'achievement': 'mdi:trophy',
  
  // 社交媒体图标
  'github': 'simple-icons:github',
  'linkedin': 'simple-icons:linkedin',
  'twitter': 'simple-icons:twitter'
};
```

### 3. 常用图标推荐

#### 技术栈图标 (skill-icons:*)
```
// 前端
skill-icons:html
skill-icons:css
skill-icons:javascript
skill-icons:typescript
skill-icons:react-dark
skill-icons:vue-dark
skill-icons:angular-dark

// 后端
skill-icons:nodejs-dark
skill-icons:python-dark
skill-icons:java-dark
skill-icons:php-dark
skill-icons:golang

// 数据库
skill-icons:mysql-dark
skill-icons:postgresql-dark
skill-icons:mongodb
skill-icons:redis-dark

// 工具
skill-icons:git
skill-icons:docker
skill-icons:kubernetes
skill-icons:aws-dark
```

#### 通用图标 (mdi:*)
```
// 工作相关
mdi:briefcase          # 工作
mdi:school             # 教育
mdi:trophy             # 成就
mdi:certificate        # 证书

// 项目相关
mdi:code-braces        # 代码
mdi:web                # 网站
mdi:cellphone          # 移动应用
mdi:desktop-classic    # 桌面应用

// 链接相关
mdi:github             # GitHub
mdi:link-variant       # 链接
mdi:eye                # 预览
mdi:download           # 下载
```

### 4. 添加自定义图标

如果需要添加新的图标映射，可以在 `src/constants/icon.ts` 文件中添加：

```typescript
export const iconMap = {
  // 现有图标...
  
  // 添加新图标
  '自定义名称': 'icon-library:icon-name'
};
```

## 🔧 高级配置

### 1. 自定义样式

如需自定义页面样式，可以修改对应的 `.astro` 文件中的 CSS 部分。

### 2. 国际化支持

页面支持多语言，相关翻译文件位于 `src/i18n/languages/` 目录下。

### 3. 响应式设计

所有页面都支持响应式设计，在移动设备上会自动适配。

## 📝 使用步骤总结

1. **确定内容类型**：选择要配置的页面（项目/技能/时间线）
2. **编辑数据文件**：修改对应的 `.ts` 配置文件
3. **选择合适图标**：从图标库中选择或使用现有图标映射
4. **保存并预览**：保存文件后在浏览器中查看效果
5. **调整优化**：根据显示效果进行微调

## 🆘 常见问题

**Q: 图标不显示怎么办？**
A: 检查图标名称是否正确，确保格式为 `库名:图标名`

**Q: 如何添加图片？**
A: 将图片放在 `public/images/` 目录下，然后在配置中使用相对路径引用

**Q: 支持 Markdown 吗？**
A: 是的，描述字段支持 Markdown 格式

**Q: 如何调整显示顺序？**
A: 在数组中调整项目的位置即可改变显示顺序

---

希望这个指南能帮助您快速上手配置这三个页面！如有其他问题，请参考源代码或提交 Issue。