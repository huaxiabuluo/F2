# F2 核心概念

## 快速上手

### 特性

F2 4.0+ 采用声明式编程，使用 JSX 语法构建图表：

- **声明式**：直观简洁，避免复杂的 API 调用
- **组件化**：完善的组件能力，方便封装自定义组件

### 安装

```bash
npm install @antv/f2 --save
```

或通过 CDN 引入：

```html
<script src="https://unpkg.com/@antv/f2/dist/index.min.js"></script>
```

### 基础示例

```jsx
// 1. 创建 canvas 标签
<canvas id="myChart" width="400" height="260"></canvas>

// 2. 编写代码
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const context = document.getElementById('myChart').getContext('2d');
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

### 核心组件 API

#### Canvas 组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `context` | `CanvasRenderingContext2D` | - | 必填，Canvas 2D 上下文 |
| `pixelRatio` | `number` | `window.devicePixelRatio` | 设备像素比 |
| `width` | `number` | - | 画布宽度 |
| `height` | `number` | - | 画布高度 |
| `animate` | `boolean` | `true` | 是否开启动画 |
| `children` | `JSX.Element` | - | 子组件 |

#### Chart 组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `Data[]` | - | 必填，数据源 |
| `scale` | `ScaleConfig` | - | 度量配置 |
| `coord` | `CoordConfig` | - | 坐标系配置 |
| `children` | `JSX.Element` | - | 子组件 |

#### Interval 组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `x` | `string` | - | 必填，x 轴字段名 |
| `y` | `string` | - | 必填，y 轴字段名 |
| `color` | `string \| Function` | - | 颜色字段或颜色映射函数 |

#### Axis 组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `field` | `string` | - | 必填，字段名 |
| `position` | `string` | - | 坐标轴位置（`top`、`bottom`、`left`、`right`）|

---

## 图形语法

F2 基于《The Grammar of Graphics》理论，通过组合基本元素构建图表。

### 图形语法组成

```
数据 (Data)
  ↓
度量 (Scale)
  ↓
几何标记 (Geometry) + 图形属性 (Attribute)
  ↓
坐标系 (Coordinate)
  ↓
辅助元素 (Axis, Legend, Tooltip, Guide)
```

### 数据

数据源必须是 JSON 数组格式：

```jsx
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
```

### 几何标记

| 几何标记 | 组件 | 图表类型 |
|----------|------|----------|
| Interval | `<Interval />` | 柱状图、条形图、直方图 |
| Line | `<Line />` | 折线图、曲线图 |
| Point | `<Point />` | 散点图、点图、气泡图 |
| Area | `<Area />` | 面积图、区间图 |
| Candlestick | `<Candlestick />` | 蜡烛图（K线图）|

#### 几何标记示例

```jsx
// 柱状图
<Interval x="genre" y="sold" color="genre" />

// 折线图
<Line x="date" y="value" color="type" />

// 散点图
<Point x="weight" y="height" color="gender" size="value" />

// 面积图
<Area x="date" y="value" color="type" />
```

### 图形属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `position` | 位置，将字段映射到 x 或 y 轴 | `x="genre", y="sold"` |
| `color` | 颜色，支持字段或函数 | `color="genre"` 或 `color={datum => datum.value > 100 ? 'red' : 'blue'}` |
| `size` | 大小，控制点的大小、线的粗细等 | `size={10}` 或 `size={datum => datum.value}` |
| `shape` | 形状，控制几何标记的形状 | `shape="circle"` 或 `shape="hollowCircle"` |

#### 图形属性示例

```jsx
// 颜色映射 - 字段
<Interval x="genre" y="sold" color="genre" />

// 颜色映射 - 函数
<Point
  x="weight"
  y="height"
  color={datum => datum.weight > 70 ? 'red' : 'blue'}
/>

// 大小映射
<Point x="category" y="value" size={datum => datum.value} />

// 形状映射
<Point x="category" y="value" shape="circle" />
```

### 度量类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `linear` | 线性度量 | 连续数值型数据 |
| `cat` | 分类度量 | 分类数据 |
| `time` | 时间度量 | 时间日期数据 |
| `log` | 对数度量 | 指数级增长数据 |
| `pow` | 指数度量 | 需要强调差异的数据 |

#### 度量配置示例

```jsx
<Chart
  data={data}
  scale={{
    sold: {
      type: 'linear',
      min: 0,
      max: 500,
      tickCount: 5,
    },
    genre: {
      type: 'cat',
    },
    date: {
      type: 'time',
      mask: 'YYYY-MM-DD',
    },
  }}
>
  {/* ... */}
</Chart>
```

### 坐标系类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `rect` | 直角坐标系（默认） | 柱状图、折线图、散点图等 |
| `polar` | 极坐标系 | 饼图、玫瑰图、雷达图等 |

#### 坐标系配置示例

```jsx
// 直角坐标系（默认）
<Chart data={data}>
  <Interval x="genre" y="sold" />
</Chart>

// 极坐标系 - 饼图
<Chart data={data} coord={{ type: 'polar' }}>
  <Interval x="genre" y="sold" color="genre" coord="polar" />
</Chart>

// 极坐标系 - 玫瑰图
<Chart data={data} coord={{ type: 'polar', innerRadius: 0.3 }}>
  <Interval x="genre" y="sold" color="genre" coord="polar" />
</Chart>
```

### 辅助元素

| 组件 | 说明 |
|------|------|
| `Axis` | 坐标轴，显示数据刻度和标签 |
| `Legend` | 图例，标定不同数据类型 |
| `Tooltip` | 提示框，显示详细数据信息 |
| `Guide` | 辅助标记，添加辅助线、文本等 |

---

## 数据处理

### 基本数据格式

数据源必须是 JSON 数组：

```jsx
const data = [
  { year: 2010, sales: 40 },
  { year: 2011, sales: 30 },
  { year: 2012, sales: 50 },
];
```

### 特殊图表的数据格式

#### 饼图

需要包含一个常量字段（字符串类型）：

```jsx
const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.2, a: '1' },
  { name: '机器之血', percent: 0.18, a: '1' },
  { name: '心理罪', percent: 0.15, a: '1' },
  { name: '寻梦环游记', percent: 0.05, a: '1' },
  { name: '其他', percent: 0.02, a: '1' },
];

<Chart data={data} coord={{ type: 'polar' }}>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

#### 区间柱状图

使用数组表示区间：

```jsx
const data = [
  { x: '分类一', y: [76, 100] },
  { x: '分类二', y: [56, 108] },
  { x: '分类三', y: [38, 129] },
];

<Chart data={data}>
  <Interval x="x" y="y" />
</Chart>
```

#### 股票图（K线图）

数组格式：`[open, close, lowest, highest]`

```jsx
const data = [
  { date: '2023-01', value: [100, 110, 95, 120] },
  { date: '2023-02', value: [110, 105, 100, 115] },
  { date: '2023-03', value: [105, 120, 102, 125] },
];

<Chart data={data}>
  <Axis field="date" type="timeCat" />
  <Candlestick x="date" y="value" />
</Chart>
```

#### 散点图（气泡图）

```jsx
const data = [
  { x: 10, y: 20, size: 5, category: 'A' },
  { x: 15, y: 25, size: 10, category: 'B' },
  { x: 20, y: 18, size: 8, category: 'A' },
];

<Chart data={data}>
  <Point x="x" y="y" size="size" color="category" />
</Chart>
```

### 数据处理操作

#### 数据过滤

```jsx
const rawData = [
  { year: 2010, sales: 40, category: 'A' },
  { year: 2011, sales: 30, category: 'B' },
  { year: 2012, sales: 50, category: 'A' },
  { year: 2013, sales: 60, category: 'B' },
];

// 只保留 category 为 'A' 的数据
const data = rawData.filter(item => item.category === 'A');

<Chart data={data}>
  <Line x="year" y="sales" />
</Chart>
```

#### 数据排序

```jsx
const rawData = [
  { name: 'A', value: 30 },
  { name: 'B', value: 50 },
  { name: 'C', value: 20 },
];

// 按 value 降序排列
const data = [...rawData].sort((a, b) => b.value - a.value);

<Chart data={data}>
  <Interval x="name" y="value" />
</Chart>
```

#### 数据聚合

```jsx
const rawData = [
  { category: 'A', value: 10 },
  { category: 'A', value: 20 },
  { category: 'B', value: 30 },
  { category: 'B', value: 40 },
];

// 按 category 聚合求和
const aggregated = {};
rawData.forEach(item => {
  if (!aggregated[item.category]) {
    aggregated[item.category] = 0;
  }
  aggregated[item.category] += item.value;
});

const data = Object.entries(aggregated).map(([category, value]) => ({
  category,
  value,
}));
```

### 数据更新

F2 支持动态更新数据：

```jsx
// 初始化数据
const data1 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
];

const { props } = (
  <Canvas context={context}>
    <Chart data={data1}>
      <Interval x="genre" y="sold" />
    </Chart>
  </Canvas>
);

chart = new Canvas(props);
chart.render();

// 更新数据
const data2 = [
  { genre: 'Sports', sold: 350 },
  { genre: 'Strategy', sold: 200 },
];

const { props: newProps } = (
  <Canvas context={context}>
    <Chart data={data2}>
      <Interval x="genre" y="sold" />
    </Chart>
  </Canvas>
);

chart.update(newProps); // 自动触发动画
```

---

## 度量

度量（Scale）是数据空间到图形空间的转换桥梁。

### 度量类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `identity` | 常量类型数值 | 常量字段 |
| `linear` | 连续数字 | 连续数值型数据 |
| `cat` | 分类 | 分类数据 |
| `timeCat` | 时间类型 | 时间日期数据 |

### 度量配置

```jsx
<Chart
  data={data}
  scale={{
    a: {
      type: 'cat',      // 声明 a 字段为分类类型
    },
    b: {
      min: 0,           // 手动指定最小值
      max: 100,         // 手动指定最大值
    },
  }}
>
  <Interval x="a" y="b" />
</Chart>
```

### 通用属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `type` | `string` | 度量类型 |
| `formatter` | `Function` | 格式化刻度点文本 |
| `range` | `Array` | 输出范围，格式为 `[min, max]` |
| `alias` | `string` | 字段显示别名 |
| `tickCount` | `number` | 坐标轴刻度点个数 |
| `ticks` | `Array` | 指定刻度点的文本信息 |

### Linear 度量

用于连续数值型数据。

#### 配置属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `nice` | `boolean` | 优化数值范围，默认 `true` |
| `min` | `number` | 数值范围最小值 |
| `max` | `number` | 数值范围最大值 |
| `tickInterval` | `number` | 刻度点间距，与 tickCount 互斥 |

#### 配置示例

```jsx
// 基础配置
<Chart
  scale={{
    value: {
      type: 'linear',
      min: 0,
      max: 100,
      tickCount: 5,
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 使用 tickInterval
<Chart
  scale={{
    value: {
      type: 'linear',
      min: 0,
      max: 100,
      tickInterval: 20,  // 0, 20, 40, 60, 80, 100
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 使用 nice 优化范围
<Chart
  scale={{
    value: {
      type: 'linear',
      nice: true,  // [3, 97] → [0, 100]
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 使用 formatter 格式化
<Chart
  scale={{
    value: {
      type: 'linear',
      formatter: (val) => `${val}%`,
    },
  }}
>
  <Line x="date" y="value" />
</Chart>
```

### Cat 度量

用于分类数据。

#### 配置属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `values` | `Array` | 指定分类值顺序 |
| `isRounding` | `boolean` | 是否允许取整，默认 `false` |

#### 配置示例

```jsx
// 基础配置
<Chart
  scale={{
    genre: {
      type: 'cat',
    },
  }}
>
  <Interval x="genre" y="sold" />
</Chart>

// 指定分类顺序
<Chart
  scale={{
    level: {
      type: 'cat',
      values: ['最小', '适中', '最大'],
    },
  }}
>
  <Interval x="level" y="value" />
</Chart>
```

#### values 属性使用场景

**场景 1：指定分类顺序**

```jsx
const data = [
  { level: 'max', value: 100 },
  { level: 'min', value: 10 },
  { level: 'mid', value: 50 },
];

<Chart
  data={data}
  scale={{
    level: {
      type: 'cat',
      values: ['min', 'mid', 'max'],  // 按指定顺序显示
    },
  }}
>
  <Interval x="level" y="value" />
</Chart>
```

**场景 2：数值转分类（索引映射）**

```jsx
const data = [
  { month: 0, value: 7 },
  { month: 1, value: 12 },
  { month: 2, value: 18 },
];

<Chart
  data={data}
  scale={{
    month: {
      type: 'cat',
      values: ['一月', '二月', '三月'],  // month 值作为索引
    },
  }}
>
  <Line x="month" y="value" />
</Chart>
```

### TimeCat 度量

用于时间日期数据，默认会对数据排序。

#### 配置属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `nice` | `boolean` | 是否优化 ticks |
| `mask` | `string` | 时间格式，默认 `'YYYY-MM-DD'` |
| `sortable` | `boolean` | 是否排序，默认 `true` |
| `values` | `Array` | 指定具体的时间值顺序 |

#### 配置示例

```jsx
// 基础配置
<Chart
  scale={{
    date: {
      type: 'timeCat',
      mask: 'YYYY-MM-DD',
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 自定义时间格式
<Chart
  scale={{
    date: {
      type: 'timeCat',
      mask: 'MM/DD',  // 01/15
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 性能优化：数据已排序
<Chart
  data={sortedData}
  scale={{
    date: {
      type: 'timeCat',
      sortable: false,  // 跳过排序，提升性能
    },
  }}
>
  <Line x="date" y="value" />
</Chart>
```

### 常用配置场景

#### 设置坐标轴范围

```jsx
<Chart
  scale={{
    value: {
      min: 0,       // 设置最小值
      max: 100,     // 设置最大值
      tickCount: 5, // 5 个刻度点
    },
  }}
>
  <Line x="date" y="value" />
</Chart>
```

#### 格式化刻度标签

```jsx
<Chart
  scale={{
    value: {
      formatter: (val) => `${val}万`,
    },
    date: {
      formatter: (val) => {
        const date = new Date(val);
        return `${date.getMonth() + 1}月${date.getDate()}日`;
      },
    },
  }}
>
  <Line x="date" y="value" />
  <Axis field="value" />
  <Axis field="date" />
</Chart>
```

---

## 坐标系

坐标系是将两种位置标度结合在一起组成的 2 维定位系统。

### 坐标系类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `rect` | 直角坐标系 | 柱状图、折线图、散点图等 |
| `polar` | 极坐标系 | 饼图、玫瑰图、雷达图等 |

### 直角坐标系

默认的坐标系类型，由 x、y 两个互相垂直的坐标轴构成。

```jsx
<Chart
  coord={{
    type: 'rect',        // 声明直角坐标系（可省略，默认值）
    transposed: false,   // 是否转置坐标轴
  }}
>
  <Interval x="genre" y="sold" />
</Chart>
```

#### 转置坐标系

将 x 轴和 y 轴交换，适用于条形图：

```jsx
<Chart
  coord={{
    type: 'rect',
    transposed: true,    // 转置坐标轴
  }}
>
  <Interval x="genre" y="sold" />
</Chart>
```

### 极坐标系

由角度和半径两个维度构成，适用于周期性数据的可视化。

```jsx
<Chart
  coord={{
    type: 'polar',           // 声明极坐标系
    startAngle: -Math.PI,    // 起始弧度（可选）
    endAngle: 0,             // 结束弧度（可选）
    innerRadius: 0.3,        // 内半径，用于绘制环形图（可选）
    radius: 1,               // 外半径（可选）
    transposed: false,       // 是否转置（可选）
  }}
>
  {/* ... */}
</Chart>
```

#### CoordConfig 类型定义

```typescript
interface CoordConfig {
  type?: 'rect' | 'polar';  // 坐标系类型
  transposed?: boolean;      // 是否转置
  startAngle?: number;       // 起始弧度（仅极坐标）
  endAngle?: number;         // 结束弧度（仅极坐标）
  innerRadius?: number;      // 内半径（仅极坐标）
  radius?: number;           // 外半径（仅极坐标）
}
```

### 图表示例

#### 饼图

```jsx
const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.2, a: '1' },
  { name: '机器之血', percent: 0.18, a: '1' },
  { name: '心理罪', percent: 0.15, a: '1' },
  { name: '寻梦环游记', percent: 0.05, a: '1' },
  { name: '其他', percent: 0.02, a: '1' },
];

<Chart data={data} coord={{ type: 'polar' }}>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

#### 玫瑰图

```jsx
const data = [
  { name: '一月', value: 30 },
  { name: '二月', value: 40 },
  { name: '三月', value: 35 },
  { name: '四月', value: 50 },
  { name: '五月', value: 45 },
  { name: '六月', value: 60 },
];

<Chart data={data} coord={{ type: 'polar', transposed: true }}>
  <Interval x="name" y="value" color="name" coord="polar" />
</Chart>
```

#### 环形图

```jsx
<Chart
  data={data}
  coord={{
    type: 'polar',
    innerRadius: 0.5,  // 设置内半径为 0.5
  }}
>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

#### 半圆饼图

```jsx
<Chart
  data={data}
  coord={{
    type: 'polar',
    startAngle: -Math.PI / 2,  // -90 度
    endAngle: Math.PI / 2,     // 90 度
  }}
>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

#### 雷达图

```jsx
const data = [
  { item: '攻击力', value: 80 },
  { item: '防御力', value: 70 },
  { item: '速度', value: 90 },
  { item: '力量', value: 60 },
  { item: '耐力', value: 75 },
];

<Chart
  data={data}
  scale={{
    value: {
      min: 0,
      max: 100,
    },
  }}
  coord={{
    type: 'polar',
    radius: 0.8,
  }}
>
  <Line x="item" y="value" />
  <Point x="item" y="value" />
  <Axis field="item" />
  <Axis field="value" />
</Chart>
```

#### 条形图

```jsx
<Chart
  data={data}
  coord={{
    type: 'rect',
    transposed: true,  // 转置坐标轴
  }}
>
  <Interval x="genre" y="sold" color="genre" />
</Chart>
```

---

