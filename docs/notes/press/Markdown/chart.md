---
title: 图表
createTime: 2025/08/21 13:26:53
permalink: /press/Markdown/chart/
---

# Mermaid 图表指南

Mizuki 主题内置了 Mermaid 支持，让你可以在 Markdown 文档中轻松创建各种类型的图表和流程图。

## 基本语法

Mermaid 使用 ```mermaid 代码块来定义图表：

```mermaid
graph TD
    A[开始] --> B{判断条件}
    B -->|是| C[执行操作1]
    B -->|否| D[执行操作2]
    C --> E[结束]
    D --> E
```

## 支持的图表类型

### 1. 流程图 (Flowchart)

流程图是最常用的图表类型，用于表示工作流程、决策过程等。

#### 基本流程图
```mermaid
graph TD
    A[开始] --> B[数据输入]
    B --> C{数据验证}
    C -->|有效| D[处理数据]
    C -->|无效| E[错误提示]
    D --> F[输出结果]
    E --> G[记录错误]
    F --> H[结束]
    G --> H
```

#### 子流程图
```mermaid
graph TD
    A[开始] --> B{条件检查}
    B -->|是| C[处理步骤1]
    B -->|否| D[处理步骤2]
    C --> E[子流程]
    D --> E
    subgraph E [子流程详情]
        E1[子步骤1] --> E2[子步骤2]
        E2 --> E3[子步骤3]
    end
    E --> F{另一个决策}
    F -->|选项1| G[结果1]
    F -->|选项2| H[结果2]
    F -->|选项3| I[结果3]
    G --> J[结束]
    H --> J
    I --> J
```

### 2. 序列图 (Sequence Diagram)

序列图用于展示对象之间的交互顺序。

```mermaid
sequenceDiagram
    participant 用户
    participant 前端
    participant 后端
    participant 数据库

    用户->>前端: 发起请求
    前端->>后端: API调用
    后端->>数据库: 查询数据
    数据库-->>后端: 返回数据
    后端-->>前端: 响应结果
    前端-->>用户: 显示结果
```

### 3. 类图 (Class Diagram)

类图用于展示类的结构和关系。

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +eat()
        +sleep()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

### 4. 状态图 (State Diagram)

状态图用于展示对象的不同状态和状态转换。

```mermaid
stateDiagram-v2
    [*] --> 待处理
    待处理 --> 处理中: 开始处理
    处理中 --> 已完成: 处理完成
    处理中 --> 已取消: 取消处理
    已完成 --> [*]
    已取消 --> [*]
```

### 5. 饼图 (Pie Chart)

饼图用于展示数据的占比关系。

```mermaid
pie
    title 浏览器使用统计
    "Chrome" : 45
    "Firefox" : 25
    "Safari" : 15
    "Edge" : 10
    "其他" : 5
```

### 6. 甘特图 (Gantt Chart)

甘特图用于项目管理和时间规划。

```mermaid
gantt
    title 项目开发计划
    dateFormat  YYYY-MM-DD
    section 需求分析
    需求调研           :done,    des1, 2023-01-01, 2023-01-10
    需求文档编写       :done,    des2, 2023-01-11, 2023-01-20
    section 设计阶段
    系统设计           :active,  des3, 2023-01-21, 2023-01-30
    数据库设计         :         des4, 2023-01-25, 2023-02-05
    section 开发阶段
    前端开发           :         des5, 2023-02-01, 2023-02-20
    后端开发           :         des6, 2023-02-01, 2023-02-25
    section 测试部署
    系统测试           :         des7, 2023-02-21, 2023-02-28
    部署上线           :         des8, 2023-03-01, 2023-03-05
```

## 高级技巧

### 自定义样式

你可以为节点和连接线添加自定义样式：

```mermaid
graph TD
    A[开始] --> B[处理]
    B --> C{判断}
    C -->|是| D[成功]
    C -->|否| E[失败]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#9f9,stroke:#333,stroke-width:2px
    style E fill:#f99,stroke:#333,stroke-width:2px
```

### 使用注释

在复杂的图表中添加注释可以提高可读性：

```mermaid
graph LR
    A[开始] --> B[数据验证]
    B --> C{验证通过?}
    C -->|是| D[数据处理]
    C -->|否| E[错误处理]
    D --> F[结果输出]
    E --> F
    %% 这是注释，不会在图表中显示
    %% 主要流程线
    linkStyle 0 stroke:blue,stroke-width:2px;
    linkStyle 4 stroke:green,stroke-width:2px;
```

### 子图和分组

使用子图可以组织复杂的图表结构：

```mermaid
graph TB
    subgraph 输入模块
        A[数据采集] --> B[数据清洗]
    end
    
    subgraph 处理模块
        C[数据分析] --> D[数据建模]
        E[模型训练] --> F[模型验证]
    end
    
    subgraph 输出模块
        G[结果展示] --> H[报告生成]
    end
    
    B --> C
    D --> E
    F --> G
```

## 最佳实践

1. **保持简洁**：避免在单个图表中展示过多信息，可以拆分为多个相关图表
2. **使用清晰的方向**：TB（从上到下）和 LR（从左到右）是最常用的方向
3. **添加说明文字**：为重要的节点和连接添加说明
4. **保持一致性**：在整个文档中保持图表样式的一致性
5. **测试图表**：在预览中检查图表是否按预期显示

## 常见问题

### Q: 图表不显示怎么办？
A: 确保：
- 使用了正确的 ```mermaid 代码块语法
- 语法没有错误（可以通过 Mermaid 在线编辑器验证）

### Q: 如何调整图表大小？
A: 可以通过添加 CSS 来调整图表大小，或者在图表周围添加容器。

### Q: 图表中的中文显示不正常？
A: 确保网页编码设置为 UTF-8，并且 Mermaid 配置中设置了正确的字体。

## 参考资源

- [Mermaid 官方文档](https://mermaid-js.github.io/mermaid/)
- [Mermaid 在线编辑器](https://mermaid.live/)