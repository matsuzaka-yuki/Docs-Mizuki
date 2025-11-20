---
title: 扩展
createTime: 2025/11/21 01:38:59
permalink: /press/Markdown/customize/
---

# Mizuki Markdown 语法说明
## 一、GitHub 仓库卡片（GitHub Repository Cards）
支持添加动态 GitHub 仓库卡片，页面加载时会通过 GitHub API 拉取仓库实时信息（如星标数、分支数等）。

### 使用示例
::github{repo="matsuzaka-yuki/Mizuki"}

### 语法格式
```markdown
::github{repo="用户名/仓库名"}
```
- `repo` 参数：必填，格式为「GitHub 用户名/仓库名称」（如 `matsuzaka-yuki/Mizuki`）

## 二、提示框（Admonitions）
支持 5 种预设类型的提示框，用于突出显示不同重要程度的信息，适配多种使用场景。

### 支持类型及示例
| 类型         | 语法标识   | 效果示例                                                                 |
|--------------|------------|--------------------------------------------------------------------------|
| 说明         | `note`     | :::note<br>即使快速浏览，用户也应注意的信息。<br>:::                      |
| 技巧         | `tip`      | :::tip<br>帮助用户更高效完成操作的可选信息。<br>:::                       |
| 重要         | `important`| :::important<br>用户成功完成操作必需的关键信息。<br>:::                   |
| 警告         | `warning`  | :::warning<br>存在潜在风险，需用户立即关注的重要内容。<br>:::             |
| 注意（谨慎） | `caution`  | :::caution<br>某操作可能导致的负面后果提示。<br>:::                       |

### 基础语法
```markdown
:::类型标识
提示框内容（支持换行）
:::
```

### 自定义标题
可修改提示框默认标题，语法如下：
```markdown
:::note[我的自定义标题]
这是一个带有自定义标题的说明提示框。
:::
```
效果：
:::note[我的自定义标题]
这是一个带有自定义标题的说明提示框。
:::

### GitHub 兼容语法
同时支持 GitHub 官方提示框语法（无缝适配 GitHub 文档风格）：
```markdown
> [!NOTE]
> GitHub 语法的说明提示框。
> 支持多行内容。

> [!TIP]
> GitHub 语法的技巧提示框。
```
效果：
> [!NOTE]
> GitHub 语法的说明提示框。
> 支持多行内容。

> [!TIP]
> GitHub 语法的技巧提示框。

## 三、折叠剧透（Spoiler）
支持添加折叠式剧透内容，默认隐藏，hover 或点击时显示，内容支持 Markdown 格式。

### 使用示例
```markdown
这是普通文本，剧透内容：:spoiler[被隐藏的**剧透内容**（支持粗体等 Markdown 语法）]！
```
效果：
这是普通文本，剧透内容：:spoiler[被隐藏的**剧透内容**（支持粗体等 Markdown 语法）]！

### 语法格式
```markdown
:spoiler[剧透内容（可包含 Markdown 语法）]
```