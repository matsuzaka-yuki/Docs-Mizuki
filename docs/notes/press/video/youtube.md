---
title: Youtube视频嵌入
createTime: 2025/11/21 20:49:50
permalink: /press/video/youtube/
---

# YouTube视频嵌入

在Mizuki文章中嵌入YouTube视频非常简单，只需从YouTube复制嵌入代码，然后粘贴到Markdown文件中即可。

## 基本步骤

1. 打开想要嵌入的YouTube视频
2. 点击视频下方的"分享"按钮
3. 点击"嵌入"选项
4. 复制提供的HTML代码
5. 将代码粘贴到Markdown文件中

## 嵌入示例

```yaml
---
title: 包含视频的文章
published: 2023-10-19
description: 这是一篇包含YouTube视频的文章示例
tags: [视频, YouTube]
---

# 文章标题

这是一段文章的介绍文字，下面是嵌入的YouTube视频：

<iframe width="100%" height="468" src="https://www.youtube.com/embed/5gIf0_xpFPI?si=N1WTorLKL0uwLsU_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

这是视频后面的内容...
```

## 参数说明

嵌入代码中的主要参数：

- `width="100%"`: 视频宽度设置为100%，适应文章布局
- `height="468"`: 视频高度（可根据需要调整）
- `src`: 视频嵌入链接
- `allowfullscreen`: 允许全屏播放
- `frameborder="0"`: 无边框

## 自定义视频尺寸

你可以根据需要调整视频的尺寸：

```html
<!-- 响应式宽度，固定高度 -->
<iframe width="100%" height="468" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>

<!-- 固定尺寸 -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>

<!-- 大尺寸 -->
<iframe width="100%" height="600" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```

## 高级选项

### 自动播放

要使视频自动播放，可以在URL中添加参数：

```html
<iframe width="100%" height="468" src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>
```

注意：大多数浏览器会阻止带声音的自动播放，建议同时使用`mute=1`参数。

### 禁用相关视频

```html
<iframe width="100%" height="468" src="https://www.youtube.com/embed/VIDEO_ID?rel=0" frameborder="0" allowfullscreen></iframe>
```

### 从特定时间开始播放

```html
<iframe width="100%" height="468" src="https://www.youtube.com/embed/VIDEO_ID?start=30" frameborder="0" allowfullscreen></iframe>
```

这会让视频从30秒处开始播放。

## 注意事项

1. **HTTPS兼容性**：确保使用https://协议，避免混合内容问题
2. **响应式设计**：使用百分比宽度可以适应不同屏幕尺寸
3. **移动设备**：YouTube视频会自动适应移动设备屏幕
4. **加载速度**：嵌入多个视频可能会影响页面加载速度

## 故障排除

如果视频无法正常显示，请检查：

1. 视频ID是否正确
2. URL是否完整且格式正确
3. 是否有防火墙阻止访问YouTube
4. 浏览器是否支持HTML5视频标签

---

通过以上方法，你可以在Mizuki文章中轻松嵌入YouTube视频，丰富你的内容表现。
