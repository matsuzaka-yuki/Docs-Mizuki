---
title: 图表
createTime: 2025/08/21 13:26:53
permalink: /press/chart/
---
```
    ```mermaid
    graph TD
        A[Start] --> B{Condition Check}
        B -->|Yes| C[Process Step 1]
        B -->|No| D[Process Step 2]
        C --> E[Subprocess]
        D --> E
        subgraph E [Subprocess Details]
            E1[Substep 1] --> E2[Substep 2]
            E2 --> E3[Substep 3]
        end
        E --> F{Another Decision}
        F -->|Option 1| G[Result 1]
        F -->|Option 2| H[Result 2]
        F -->|Option 3| I[Result 3]
        G --> J[End]
        H --> J
        I --> J
    ```
```