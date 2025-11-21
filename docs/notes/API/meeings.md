---
title: Metings API文档
createTime: 2025/11/21 20:15:35
permalink: /API/metings/
---
# Meting API 文档

## 概述

Mizuki 项目中的音乐播放器组件支持通过 Meting API 获取音乐数据。Meting API 是一个音乐元数据接口，可以获取来自不同音乐平台（如网易云音乐、QQ音乐等）的歌曲信息。

## 配置

在 `src/config.ts` 文件中，可以配置 Meting API 相关参数：

```typescript title="src/config.ts"
export const musicPlayerConfig: MusicPlayerConfig = {
  enable: true, // 启用音乐播放器功能
  mode: "meting", // 音乐播放器模式，可选 "local" 或 "meting"
  meting_api: "https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r", // Meting API 地址
  id: "14164869977", // 歌单ID
  server: "netease", // 音乐源服务器
  type: "playlist", // 播单类型
};
```

## API 参数

### 服务器地址 (server)

支持的音乐源服务器：

- `netease` - 网易云音乐
- `tencent` - QQ音乐
- `kugou` - 酷狗音乐
- `xiami` - 虾米音乐
- `baidu` - 百度音乐

### 获取类型 (type)

支持的数据获取类型：

- `playlist` - 歌单
- `song` - 单曲
- `album` - 专辑
- `artist` - 艺术家

### ID

对应获取类型的唯一标识符：
- 对于歌单：歌单ID
- 对于单曲：歌曲ID
- 对于专辑：专辑ID
- 对于艺术家：艺术家ID

## API 端点格式

Meting API 的端点格式为：
```
{api_base_url}?server={server}&type={type}&id={id}&auth={auth}&r={r}
```

其中：
- `api_base_url` - API 基础URL
- `server` - 音乐源服务器
- `type` - 获取类型
- `id` - 资源ID
- `auth` - 认证参数（通常为空）
- `r` - 随机数（用于防止缓存，通常是时间戳）

## 默认配置

项目中使用的默认 Meting API 地址是：
```
https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r
```

这是一个公益管理的 Meting API 服务器，位于海外，请注意部分音乐平台可能不支持，且访问速度可能较慢。

## 自建 Meting API

如果需要，您也可以自行搭建 Meting API 服务器。自建 API 通常支持更多平台，访问速度也可能更快,这类源码很多,每个基本支持不同平台,你可以自行寻找。


## 响应数据格式

API 返回的数据为 JSON 格式，包含歌曲信息列表。每首歌曲包含以下字段：

```json
{
  "id": 12345678,
  "name": "歌曲名称",
  "artist": "艺术家名称",
  "author": "艺术家别名（可选）",
  "url": "歌曲音频文件URL",
  "pic": "歌曲封面图片URL",
  "duration": 240 // 歌曲时长（秒）
}
```

## 本地模式

除了使用 Meting API，音乐播放器还支持本地模式（mode: "local"），使用预定义的本地播放列表，不发送任何 API 请求。

## 示例

### 获取网易云音乐歌单

```javascript
const apiUrl = "https://www.bilibili.uno/api?server=netease&type=playlist&id=14164869977&auth=&r=1234567890";
fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    // 处理返回的歌曲列表
    console.log(data);
  });
```

### 在音乐播放器中使用

在 `src/components/widget/MusicPlayer.svelte` 中，`fetchMetingPlaylist` 函数负责获取 Meting API 数据：

```javascript
async function fetchMetingPlaylist() {
  if (!meting_api || !meting_id) return;
  isLoading = true;
  const apiUrl = meting_api
    .replace(":server", meting_server)
    .replace(":type", meting_type)
    .replace(":id", meting_id)
    .replace(":auth", "")
    .replace(":r", Date.now().toString());
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("meting api error");
    const list = await res.json();
    playlist = list.map((song) => {
      // 数据转换处理...
    });
    if (playlist.length > 0) {
      loadSong(playlist[0]);
    }
    isLoading = false;
  } catch (e) {
    showErrorMessage("Meting 歌单获取失败");
    isLoading = false;
  }
}
```

## 注意事项

1. 由于音乐版权限制，部分歌曲可能无法播放或只提供预览片段
2. API 响应时间可能受网络状况和服务器负载影响
3. 建议在生产环境中添加适当的错误处理和加载状态指示
4. 如果 API 请求频繁，可能会被限制访问

## 故障排除

如果遇到音乐播放问题：

1. 检查网络连接
2. 确认 Meting API 地址是否正确且可访问
3. 检查歌单ID是否有效
4. 尝试更换不同的音乐源服务器
5. 查看浏览器开发者工具中的网络请求和错误信息