# @codingapi/flow-pc

一个基于 React 和 TypeScript 的流程设计器组件库。

## 特性

- 🎨 基于 LogicFlow 的流程设计器
- 📦 支持 TypeScript
- 🎯 支持流程节点自定义
- 🔄 支持流程状态管理
- 🎮 支持流程操作（启动、提交、删除、保存等）
- 🎯 支持流程节点拖拽
- 🎨 支持流程节点样式自定义
- 🎯 支持流程节点状态管理
- 🎨 支持流程节点面板自定义
- 🎯 支持流程节点事件处理

## 安装

```bash
# npm
npm install @codingapi/flow-pc

# yarn
yarn add @codingapi/flow-pc

# pnpm
pnpm add @codingapi/flow-pc
```

## 使用

### 基础用法

```tsx
import React from 'react';
import { Flow } from '@codingapi/flow-pc';

const App = () => {
  return (
    <Flow
      data={{
        nodes: [],
        edges: []
      }}
      actionRef={(ref) => {
        // 获取流程数据
        const data = ref.current?.getData();
      }}
    />
  );
};

export default App;
```

### 流程操作

```tsx
import React from 'react';
import { Flow, FlowModelView } from '@codingapi/flow-pc';

const App = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Flow
        data={{
          nodes: [],
          edges: []
        }}
        actionRef={(ref) => {
          // 获取流程数据
          const data = ref.current?.getData();
        }}
      />

      <FlowModelView
        visible={visible}
        setVisible={setVisible}
        data={{
          nodes: [],
          edges: []
        }}
      />
    </>
  );
};

export default App;
```

### 自定义节点

```tsx
import React from 'react';
import { Flow } from '@codingapi/flow-pc';

const CustomNode = () => {
  return (
    <div>自定义节点</div>
  );
};

const App = () => {
  return (
    <Flow
      data={{
        nodes: [],
        edges: []
      }}
      customNodes={{
        custom: CustomNode
      }}
    />
  );
};

export default App;
```

## API

### Flow

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 流程数据 | `LogicFlow.GraphConfigData` | - |
| actionRef | 操作引用 | `React.Ref<FlowActionType>` | - |
| edgeType | 边的类型 | `'polyline' \| 'bezier' \| 'line'` | `'polyline'` |
| customNodes | 自定义节点 | `Record<string, React.ComponentType>` | - |

### FlowModelView

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否可见 | `boolean` | - |
| setVisible | 设置可见性 | `(visible: boolean) => void` | - |
| data | 流程数据 | `LogicFlow.GraphConfigData` | - |

### FlowActionType

```typescript
interface FlowActionType {
  getData: () => LogicFlow.GraphConfigData;
}
```

## 依赖

- React >= 16.8.0
- TypeScript >= 4.0.0
- @logicflow/core >= 2.0.0
- @logicflow/extension >= 2.0.0
- antd >= 4.0.0

## 开发

```bash

# 构建
yarn build

# 发布
yarn push
```

## 许可证

Apache-2.0 