---
title: B站视频嵌入
createTime: 2025/11/21 20:49:42
permalink: /press/video/bilibili/
---

# B站视频嵌入

在Mizuki文章中嵌入B站视频非常简单，只需从B站复制嵌入代码，然后粘贴到Markdown文件中即可。

## 基本步骤

1. 打开想要嵌入的B站视频页面
2. 点击视频下方的"分享"按钮
3. 选择"嵌入代码"选项
4. 复制提供的HTML代码
5. 将代码粘贴到Markdown文件中

## 嵌入示例

```yaml
---
title: 包含B站视频的文章
published: 2023-10-19
description: 这是一篇包含B站视频的文章示例
tags: [视频, B站]
---

# 文章标题

这是一段文章的介绍文字，下面是嵌入的B站视频：

<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" &autoplay=0> </iframe>

这是视频后面的内容...
```

## 参数说明

嵌入代码中的主要参数：

- `width="100%"`: 视频宽度设置为100%，适应文章布局
- `height="468"`: 视频高度（可根据需要调整）
- `src`: 视频嵌入链接
- `bvid=BV1fK4y1s7Qf`: B站视频BV号
- `p=1`: 视频分P（如果是多P视频）
- `autoplay=0`: 是否自动播放（0为不自动，1为自动）
- `allowfullscreen`: 允许全屏播放
- `scrolling="no"`: 禁用滚动条
- `frameborder="no"`: 无边框

## 自定义视频尺寸

你可以根据需要调整视频的尺寸：

```html
<!-- 响应式宽度，固定高度 -->
<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

<!-- 固定尺寸 -->
<iframe width="560" height="315" src="//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

<!-- 大尺寸 -->
<iframe width="100%" height="600" src="//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
```

## 高级选项

### 自动播放

要使视频自动播放，可以修改参数：

```html
<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&autoplay=1" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
```

注意：大多数浏览器会阻止带声音的自动播放。

### 指定分P播放

对于多P视频，可以指定播放第几集：

```html
<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&p=2" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
```

这会让视频直接播放第2集。

### 设置开始时间

```html
<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&t=30" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
```

这会让视频从30秒处开始播放。

### 高画质模式

```html
<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&high_quality=1" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
```

这会让视频默认以高画质播放（需要用户登录B站）。

## 注意事项

1. **HTTPS兼容性**：使用协议相对URL（`//player.bilibili.com`）可以同时兼容HTTP和HTTPS
2. **响应式设计**：使用百分比宽度可以适应不同屏幕尺寸
3. **移动设备**：B站视频会自动适应移动设备屏幕
4. **加载速度**：嵌入多个视频可能会影响页面加载速度
5. **地区限制**：某些视频可能有地区限制，无法在所有地区播放

## 故障排除

如果视频无法正常显示，请检查：

1. BV号是否正确
2. URL是否完整且格式正确
3. 是否有防火墙阻止访问B站
4. 浏览器是否支持HTML5视频标签
5. 视频是否已被删除或设为私密

## 其他视频平台

除了B站，你也可以使用类似方法嵌入其他平台的视频：

- **YouTube**: 使用`https://www.youtube.com/embed/VIDEO_ID`
- **腾讯视频**: 使用`https://v.qq.com/txp/iframe/player.html?vid=VIDEO_ID`
- **优酷**: 使用`https://player.youku.com/embed/VIDEO_ID`

只需获取各平台的嵌入代码，然后按照相同的方式插入到Markdown文件中即可。

---

通过以上方法，你可以在Mizuki文章中轻松嵌入B站视频，丰富你的内容表现。
