# @antv/F2 AIGC 使用指南

## 概述

@antv/F2 是 AntV 团队推出的移动端可视化解决方案，基于图形语法理论，提供了一套完整的数据可视化能力。

### 依赖关系

```
@antv/F2 (可视化图表库)
    ↓ 依赖
@antv/F-Engine (渲染引擎)
    ↓ 依赖
@antv/G (底层图形库)
```

- **@antv/F2**: 提供完整的图表组件和数据可视化能力
- **@antv/F-Engine**: 提供底层渲染、事件、动画能力
- **@antv/G**: 提供基础图形绘制能力

## 核心概念

### 1. 基本架构

F2 采用 JSX 语法进行图表声明，基本结构如下：

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
];

// 获取 canvas context
const context = document.getElementById('mountNode').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
      <Tooltip />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

### 2. 三层结构

F2 由三层组成：

1. **Canvas 层**: 画布容器，负责整体渲染
2. **Chart 层**: 图表容器，管理数据、坐标系、度量
3. **Component 层**: 具体的可视化组件（几何标记、坐标轴、图例等）

## 快速开始

### 安装

```bash
npm install @antv/f2
```

### 基础示例

#### 柱状图

```jsx
import { Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="genre" />
    <Axis field="sold" />
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>
```

#### 折线图

```jsx
import { Canvas, Chart, Line, Axis, Tooltip } from '@antv/f2';

const data = [
  { date: '2017-06-05', value: 116 },
  { date: '2017-06-06', value: 129 },
  { date: '2017-06-07', value: 135 },
  { date: '2017-06-08', value: 86 },
  { date: '2017-06-09', value: 73 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="value" />
    <Line x="date" y="value" />
    <Tooltip />
  </Chart>
</Canvas>
```

#### 饼图

```jsx
import { Canvas, Chart, Interval, Legend, PieLabel } from '@antv/f2';

const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.21, a: '1' },
  { name: '机器之血', percent: 0.17, a: '1' },
  { name: '心理罪', percent: 0.13, a: '1' },
  { name: '寻梦环游记', percent: 0.09, a: '1' },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data} coord={{ type: 'polar', transposed: true }}>
    <Interval
      x="a"
      y="percent"
      adjust="stack"
      color="name"
    />
    <Legend position="right" />
    <PieLabel label1={(data) => data.name} />
  </Chart>
</Canvas>
```

## 组件体系

F2 提供了丰富的组件体系，分为以下几类：

### 1. 核心组件

- **Canvas**: 画布容器
- **Chart**: 图表容器
- **Component**: 自定义组件基类

### 2. 几何标记组件（Geometry）

用于绘制数据的可视化形式：

- **Line**: 折线图
- **Area**: 面积图
- **Interval**: 柱状图、条形图、饼图等
- **Point**: 散点图
- **Candlestick**: K线图

### 3. 辅助组件

- **Axis**: 坐标轴
- **Legend**: 图例
- **Tooltip**: 提示信息
- **Guide**: 辅助标记（文本、点、线、矩形、图片等）
- **ScrollBar**: 滚动条
- **Zoom**: 缩放组件

### 4. 特殊图表组件

- **Gauge**: 仪表盘
- **Treemap**: 矩形树图
- **Sunburst**: 旭日图
- **PieLabel**: 饼图标签
- **Pictorial**: 象形图
- **Magnifier**: 放大镜

## 数据处理

### 数据格式

F2 要求数据格式为 JSON 数组：

```javascript
const data = [
  { field1: value1, field2: value2 },
  { field1: value3, field2: value4 },
  // ...
];
```

### 度量配置（Scale）

度量用于配置数据字段的映射方式：

```jsx
<Chart
  data={data}
  scale={{
    sold: {
      min: 0,
      max: 100,
      tickCount: 5,
    },
    genre: {
      range: [0.1, 0.9],
    }
  }}
>
  {/* ... */}
</Chart>
```

### 坐标系配置（Coord）

F2 支持直角坐标系和极坐标系：

```jsx
// 直角坐标系（默认）
<Chart data={data} coord={{ type: 'rect' }}>

// 极坐标系（用于饼图、雷达图等）
<Chart data={data} coord={{ type: 'polar', transposed: true }}>

// 转置坐标系（用于条形图）
<Chart data={data} coord={{ transposed: true }}>
```

## 图形属性映射

### Color（颜色）

```jsx
// 固定颜色
<Line color="#1890FF" />

// 字段映射
<Line color="category" />

// 数组映射
<Line color={['category', ['red', 'blue', 'green']]} />

// 对象配置
<Line color={{
  field: 'category',
  range: ['red', 'blue', 'green']
}} />
```

### Size（大小）

```jsx
// 固定大小
<Point size={4} />

// 字段映射
<Point size="value" />

// 数组映射
<Point size={['value', [2, 4, 8]]} />
```

### Shape（形状）

```jsx
// 固定形状
<Point shape="circle" />

// 字段映射
<Point shape="type" />
```

## 交互能力

### 选中交互

```jsx
<Interval
  x="genre"
  y="sold"
  selection={{
    type: 'single', // 或 'multiple'
    triggerOn: 'click', // 或 'press'
    defaultSelected: [],
    selectedStyle: { fillOpacity: 1 },
    unSelectedStyle: { fillOpacity: 0.4 },
    cancelable: true,
  }}
/>
```

### Tooltip

```jsx
<Tooltip
  showCrosshairs
  showItemMarker
  onChange={(record) => {
    console.log(record);
  }}
/>
```

### 缩放和滚动

```jsx
// 滚动条
<ScrollBar mode="x" />

// 缩放
<Zoom mode="x" />
```

## 动画配置

```jsx
<Line
  animation={{
    appear: {
      duration: 1000,
      easing: 'linear',
    },
    update: {
      duration: 500,
    },
  }}
/>
```

## 主题配置

```jsx
<Chart
  data={data}
  theme={{
    colors: ['#1890FF', '#2FC25B', '#FACC14'],
    pixelRatio: 2,
  }}
>
  {/* ... */}
</Chart>
```

## 详细文档索引

为了更好地理解和使用 F2，建议按以下顺序阅读详细文档：

1. [**F2 组件详细文档**](./F2-Components-Detail.md) - 所有封装好的图表组件详细说明
2. [**F2 基础图形详细文档**](./F2-Basic-Shapes-Detail.md) - 底层基础图形使用说明
3. [**F2 示例和最佳实践**](./F2-Examples-Best-Practices.md) - 常见场景和最佳实践

## 常见问题

### 1. 如何获取 Canvas Context？

```javascript
// H5 环境
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// 小程序环境
const query = wx.createSelectorQuery();
query.select('#myCanvas')
  .fields({ node: true, size: true })
  .exec((res) => {
    const canvas = res[0].node;
    const context = canvas.getContext('2d');
  });
```

### 2. 如何更新数据？

```javascript
// 使用 changeData 方法
const chartRef = { current: null };
<Chart ref={chartRef} data={data}>
  {/* ... */}
</Chart>

// 更新数据
chartRef.current.changeData(newData);
```

### 3. 如何自定义样式？

```jsx
<Interval
  x="genre"
  y="sold"
  style={{
    fill: 'l(0) 0:#1890FF 1:#36CBCB', // 渐变色
    lineWidth: 1,
    stroke: '#fff',
  }}
/>
```

## 参考资源

- [F2 官方文档](https://f2.antv.antgroup.com/)
- [F2 GitHub 仓库](https://github.com/antvis/f2)
- [F-Engine 文档](https://github.com/antvis/FEngine)
- [AntV 官网](https://antv.antgroup.com/)

## 适用场景

F2 特别适合以下场景：

1. **移动端数据可视化**: 专为移动端优化，体积小，性能高
2. **多端适配**: 支持 H5、微信小程序、支付宝小程序、React Native、Weex
3. **快速开发**: 提供丰富的图表类型和组件，开箱即用
4. **自定义扩展**: 支持自定义 Shape、动画、交互等
5. **数据探索**: 支持丰富的交互能力，便于数据探索和分析
