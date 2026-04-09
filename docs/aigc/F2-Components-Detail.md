# @antv/F2 组件详细文档

本文档详细介绍 F2 所有封装好的图表组件及其使用方法。

## 目录

1. [核心容器组件](#核心容器组件)
2. [几何标记组件](#几何标记组件)
3. [辅助组件](#辅助组件)
4. [特殊图表组件](#特殊图表组件)

---

## 核心容器组件

### Canvas - 画布组件

Canvas 是 F2 的顶层组件，代表整个渲染画布。

#### Props

```typescript
interface CanvasProps {
  context: CanvasRenderingContext2D;  // 必需，canvas 上下文
  pixelRatio?: number;                // 像素比，默认为 window.devicePixelRatio
  width?: number;                     // 画布宽度
  height?: number;                    // 画布高度
  animate?: boolean;                  // 是否执行动画，默认 true
  children?: any;                     // 子组件
}
```

#### 使用示例

```jsx
import { Canvas } from '@antv/f2';

const context = document.getElementById('canvas').getContext('2d');

<Canvas 
  context={context} 
  pixelRatio={window.devicePixelRatio}
  animate={true}
>
  {/* 子组件 */}
</Canvas>
```

### Chart - 图表组件

Chart 是图表的容器，负责管理数据、坐标系、度量等。

#### Props

```typescript
interface ChartProps<TRecord> {
  data: Array<TRecord>;              // 必需，数据源
  scale?: DataRecordScale<TRecord>;  // 度量配置
  coord?: CoordType | CoordProps;    // 坐标系配置
  style?: GroupStyleProps;           // 样式配置
  theme?: Record<string, any>;       // 主题配置
  children?: any;                    // 子组件
}
```

#### 度量配置（Scale）

```jsx
<Chart
  data={data}
  scale={{
    fieldName: {
      type: 'linear' | 'cat' | 'timeCat',  // 度量类型
      min: 0,                               // 最小值
      max: 100,                             // 最大值
      tickCount: 5,                         // 刻度数量
      range: [0, 1],                        // 数据在坐标轴上的范围
      alias: '别名',                        // 字段别名
      formatter: (value) => value,          // 格式化函数
    }
  }}
>
```

#### 坐标系配置（Coord）

```jsx
// 直角坐标系
<Chart coord={{ type: 'rect', transposed: false }}>

// 极坐标系
<Chart coord={{
  type: 'polar',
  transposed: true,
  startAngle: -Math.PI / 2,    // 起始角度
  endAngle: Math.PI * 3 / 2,   // 结束角度
  radius: 0.8,                 // 半径，0-1
  innerRadius: 0,              // 内半径，0-1
}}>
```

#### 使用示例

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
];

<Canvas context={context}>
  <Chart 
    data={data}
    scale={{
      sold: { min: 0, max: 300 }
    }}
  >
    <Interval x="genre" y="sold" />
  </Chart>
</Canvas>
```

---

## 几何标记组件

几何标记组件用于将数据映射为可视化图形。

### Geometry - 几何标记基类

所有几何标记组件的通用 Props。

#### 通用 Props

```typescript
interface GeometryProps<TRecord> {
  x: string;                         // 必需，x 轴映射字段
  y: string;                         // 必需，y 轴映射字段
  color?: string | ColorConfig;      // 颜色映射
  size?: number | string | SizeConfig;  // 大小映射
  shape?: string | ShapeConfig;      // 形状映射
  adjust?: AdjustType | AdjustProps; // 数据调整（堆叠、分组等）
  style?: StyleProps;                // 样式配置
  animation?: AnimationProps;        // 动画配置
  startOnZero?: boolean;             // 是否从0开始
}
```

#### 颜色映射（Color）

```jsx
// 1. 固定颜色
<Geometry color="#1890FF" />

// 2. 字段映射（自动分配颜色）
<Geometry color="category" />

// 3. 数组形式（指定颜色范围）
<Geometry color={['category', ['red', 'blue', 'green']]} />

// 4. 对象形式（完整配置）
<Geometry color={{
  field: 'category',
  type: 'linear',  // 'linear' 或 'category'
  range: ['red', 'green'],
  callback: (value) => {
    if (value > 100) return 'red';
    return 'blue';
  }
}} />
```

#### 大小映射（Size）

```jsx
// 1. 固定大小
<Point size={5} />

// 2. 字段映射
<Point size="value" />

// 3. 数组形式
<Point size={['value', [2, 10]]} />

// 4. 对象形式
<Point size={{
  field: 'value',
  range: [2, 10]
}} />
```

#### 形状映射（Shape）

```jsx
// 1. 固定形状
<Point shape="circle" />

// 2. 字段映射
<Point shape="type" />

// 3. 数组形式
<Point shape={['type', ['circle', 'square', 'triangle']]} />
```

#### 数据调整（Adjust）

```jsx
// 堆叠
<Interval adjust="stack" />

// 分组
<Interval adjust="dodge" />

// 对称
<Interval adjust="symmetric" />

// 完整配置
<Interval adjust={{
  type: 'dodge',
  marginRatio: 0.1  // 分组间距比例
}} />
```

### Line - 折线图

用于绘制折线图、曲线图、阶梯线图。

#### Props

继承 Geometry 的所有 Props，额外支持：

```typescript
interface LineProps extends GeometryProps {
  connectNulls?: boolean;  // 是否连接空值，默认 false
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Line, Axis, Tooltip } from '@antv/f2';

const data = [
  { date: '2020-01', value: 100 },
  { date: '2020-02', value: 120 },
  { date: '2020-03', value: null },  // 空值
  { date: '2020-04', value: 140 },
];

// 基础折线图
<Chart data={data}>
  <Line x="date" y="value" />
</Chart>

// 多条折线
<Chart data={data}>
  <Line x="date" y="value" color="type" />
</Chart>

// 曲线（平滑）
<Chart data={data}>
  <Line x="date" y="value" shape="smooth" />
</Chart>

// 连接空值
<Chart data={data}>
  <Line x="date" y="value" connectNulls={true} />
</Chart>
```

### Area - 面积图

用于绘制面积图、堆叠面积图。

#### 使用示例

```jsx
import { Canvas, Chart, Area } from '@antv/f2';

// 基础面积图
<Chart data={data}>
  <Area x="date" y="value" />
</Chart>

// 堆叠面积图
<Chart data={data}>
  <Area x="date" y="value" color="type" adjust="stack" />
</Chart>

// 渐变填充
<Chart data={data}>
  <Area 
    x="date" 
    y="value"
    style={{
      fill: 'l(90) 0:#1890FF 1:#ffffff'  // 线性渐变
    }}
  />
</Chart>
```

### Interval - 柱状图/条形图/饼图

用于绘制柱状图、条形图、饼图、环形图、漏斗图等。

#### Props

继承 Geometry 的所有 Props，额外支持：

```typescript
interface IntervalProps extends GeometryProps {
  selection?: SelectionProps;  // 选中交互配置
  sizeRatio?: number;          // 大小比例，范围 [0, 1]
}

interface SelectionProps {
  type?: 'single' | 'multiple';     // 单选/多选
  triggerOn?: 'click' | 'press';    // 触发事件
  defaultSelected?: any[];          // 默认选中项
  selectedStyle?: any;              // 选中样式
  unSelectedStyle?: any;            // 非选中样式
  cancelable?: boolean;             // 是否可取消
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Interval, Axis } from '@antv/f2';

// 1. 柱状图
<Chart data={data}>
  <Interval x="genre" y="sold" color="genre" />
</Chart>

// 2. 条形图（转置坐标系）
<Chart data={data} coord={{ transposed: true }}>
  <Interval x="genre" y="sold" />
</Chart>

// 3. 分组柱状图
<Chart data={data}>
  <Interval x="genre" y="sold" color="type" adjust="dodge" />
</Chart>

// 4. 堆叠柱状图
<Chart data={data}>
  <Interval x="genre" y="sold" color="type" adjust="stack" />
</Chart>

// 5. 饼图
<Chart data={data} coord={{ type: 'polar', transposed: true }}>
  <Interval 
    x="a" 
    y="percent" 
    adjust="stack" 
    color="name"
  />
</Chart>

// 6. 环形图
<Chart data={data} coord={{ 
  type: 'polar', 
  transposed: true,
  innerRadius: 0.5  // 内半径
}}>
  <Interval x="a" y="percent" adjust="stack" color="name" />
</Chart>

// 7. 带选中交互
<Chart data={data}>
  <Interval 
    x="genre" 
    y="sold"
    selection={{
      type: 'single',
      triggerOn: 'click',
      selectedStyle: { fillOpacity: 1 },
      unSelectedStyle: { fillOpacity: 0.4 }
    }}
  />
</Chart>
```

### Point - 散点图

用于绘制散点图、气泡图。

#### 使用示例

```jsx
import { Canvas, Chart, Point } from '@antv/f2';

// 1. 基础散点图
<Chart data={data}>
  <Point x="height" y="weight" />
</Chart>

// 2. 气泡图（大小映射）
<Chart data={data}>
  <Point x="height" y="weight" size="age" />
</Chart>

// 3. 分类散点图
<Chart data={data}>
  <Point 
    x="height" 
    y="weight" 
    color="gender"
    shape="gender"
  />
</Chart>

// 4. 自定义形状
<Chart data={data}>
  <Point 
    x="height" 
    y="weight"
    shape={['type', ['circle', 'square', 'triangle']]}
  />
</Chart>
```

### Candlestick - K线图

用于绘制股票 K 线图。

#### 使用示例

```jsx
import { Canvas, Chart, Candlestick } from '@antv/f2';

const data = [
  { date: '2020-01-01', open: 100, close: 110, high: 120, low: 95 },
  { date: '2020-01-02', open: 110, close: 105, high: 115, low: 100 },
];

<Chart data={data}>
  <Candlestick
    x="date"
    y={['open', 'close', 'high', 'low']}
  />
</Chart>
```

---

## 辅助组件

### Axis - 坐标轴

用于绘制坐标轴。

#### Props

```typescript
interface AxisProps {
  field: string;              // 对应的数据字段
  visible?: boolean;          // 是否可见
  line?: LineStyleProps;      // 轴线样式
  labelOffset?: number;       // 文本距离轴线的距离
  grid?: GridStyleProps;      // 网格线样式
  label?: LabelConfig;        // 文本配置
  tickCount?: number;         // 刻度数量
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Axis, Line } from '@antv/f2';

// 1. 基础坐标轴
<Chart data={data}>
  <Axis field="date" />
  <Axis field="value" />
  <Line x="date" y="value" />
</Chart>

// 2. 自定义坐标轴
<Chart data={data}>
  <Axis 
    field="date"
    label={{
      style: { fill: '#999' },
      formatter: (text) => text.substr(5)
    }}
  />
  <Axis 
    field="value"
    grid={{
      stroke: '#ddd',
      lineWidth: 1,
      lineDash: [2, 2]
    }}
  />
  <Line x="date" y="value" />
</Chart>

// 3. 隐藏坐标轴
<Chart data={data}>
  <Axis field="date" visible={false} />
  <Line x="date" y="value" />
</Chart>
```

### Legend - 图例

用于展示图例信息。

#### Props

```typescript
interface LegendProps {
  position?: 'top' | 'right' | 'bottom' | 'left';  // 位置
  align?: 'left' | 'center' | 'right';             // 对齐方式
  itemWidth?: number | string;                     // 图例项宽度
  nameStyle?: TextStyleProps;                      // 名称文本样式
  valueStyle?: TextStyleProps;                     // 值文本样式
  marker?: MarkerConfig;                           // 图例标记配置
  clickable?: boolean;                             // 是否可点击
  selectedMode?: 'single' | 'multiple';            // 选择模式
  onChange?: (items) => void;                      // 状态改变回调
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Legend, Line } from '@antv/f2';

// 1. 基础图例
<Chart data={data}>
  <Legend />
  <Line x="date" y="value" color="type" />
</Chart>

// 2. 自定义位置
<Chart data={data}>
  <Legend position="bottom" align="center" />
  <Line x="date" y="value" color="type" />
</Chart>

// 3. 自定义样式
<Chart data={data}>
  <Legend 
    marker={{
      symbol: 'circle',
      radius: 4
    }}
    nameStyle={{
      fill: '#333',
      fontSize: 12
    }}
  />
  <Line x="date" y="value" color="type" />
</Chart>

// 4. 可点击图例（过滤数据）
<Chart data={data}>
  <Legend 
    clickable={true}
    onChange={(items) => {
      console.log('选中的图例:', items);
    }}
  />
  <Line x="date" y="value" color="type" />
</Chart>
```

### Tooltip - 提示信息

用于展示鼠标悬停时的数据信息。

#### Props

```typescript
interface TooltipProps {
  showCrosshairs?: boolean;           // 是否显示辅助线
  crosshairsStyle?: LineStyleProps;   // 辅助线样式
  showItemMarker?: boolean;           // 是否显示数据点标记
  background?: BackgroundConfig;      // 背景配置
  titleStyle?: TextStyleProps;        // 标题样式
  nameStyle?: TextStyleProps;         // 名称样式
  valueStyle?: TextStyleProps;        // 值样式
  showTitle?: boolean;                // 是否显示标题
  onChange?: (record) => void;        // 内容改变回调
  custom?: boolean;                   // 是否自定义
  render?: (records) => JSX.Element;  // 自定义渲染
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Tooltip, Line } from '@antv/f2';

// 1. 基础 Tooltip
<Chart data={data}>
  <Tooltip />
  <Line x="date" y="value" />
</Chart>

// 2. 带辅助线
<Chart data={data}>
  <Tooltip 
    showCrosshairs={true}
    showItemMarker={true}
  />
  <Line x="date" y="value" />
</Chart>

// 3. 自定义样式
<Chart data={data}>
  <Tooltip 
    background={{
      fill: 'rgba(0, 0, 0, 0.8)',
      radius: 4
    }}
    nameStyle={{ fill: '#fff' }}
    valueStyle={{ fill: '#fff' }}
  />
  <Line x="date" y="value" />
</Chart>

// 4. 自定义内容
<Chart data={data}>
  <Tooltip 
    custom={true}
    render={(records) => (
      <group>
        <text attrs={{ text: `自定义内容: ${records[0].value}` }} />
      </group>
    )}
  />
  <Line x="date" y="value" />
</Chart>
```

### Guide - 辅助标记

用于在图表上添加辅助标记，如文本、线、区域等。

#### 子组件

Guide 提供了多种辅助标记类型：

- **TextGuide**: 文本标记
- **LineGuide**: 线标记
- **PointGuide**: 点标记
- **RectGuide**: 矩形区域标记
- **ArcGuide**: 圆弧标记
- **ImageGuide**: 图片标记
- **TagGuide**: 标签标记
- **LottieGuide**: Lottie 动画标记
- **PolylineGuide**: 折线标记

#### 使用示例

```jsx
import { 
  Canvas, Chart, Guide, Line,
  TextGuide, LineGuide, RectGuide, PointGuide 
} from '@antv/f2';

<Chart data={data}>
  <Line x="date" y="value" />
  
  {/* 1. 文本标记 */}
  <Guide>
    <TextGuide 
      records={[{ date: '2020-03', value: 150 }]}
      content="最高点"
      style={{ fill: 'red' }}
      offsetX={10}
      offsetY={-10}
    />
  </Guide>
  
  {/* 2. 辅助线 */}
  <Guide>
    <LineGuide 
      records={[
        { date: '2020-01', value: 100 },
        { date: '2020-12', value: 100 }
      ]}
      style={{ stroke: 'red', lineDash: [4, 4] }}
    />
  </Guide>
  
  {/* 3. 矩形区域 */}
  <Guide>
    <RectGuide 
      records={[
        { date: '2020-03', value: 0 },
        { date: '2020-06', value: 200 }
      ]}
      style={{ fill: 'rgba(255, 0, 0, 0.1)' }}
    />
  </Guide>
  
  {/* 4. 点标记 */}
  <Guide>
    <PointGuide 
      records={[{ date: '2020-03', value: 150 }]}
      style={{ 
        fill: 'red',
        r: 5
      }}
    />
  </Guide>
</Chart>
```

### ScrollBar - 滚动条

用于数据量较大时提供滚动查看功能。

#### Props

```typescript
interface ScrollBarProps {
  mode?: 'x' | 'y';           // 滚动方向
  range?: [number, number];   // 可见范围 [0, 1]
  width?: number | string;    // 滚动条宽度
  height?: number | string;   // 滚动条高度
}
```

#### 使用示例

```jsx
import { Canvas, Chart, ScrollBar, Line } from '@antv/f2';

<Chart data={data}>
  <Line x="date" y="value" />
  <ScrollBar mode="x" range={[0, 0.5]} />
</Chart>
```

### Zoom - 缩放组件

用于提供数据缩放功能。

#### Props

```typescript
interface ZoomProps {
  mode?: 'x' | 'y' | 'xy';     // 缩放方向
  panSensitivity?: number;     // 平移敏感度
  pinchSensitivity?: number;   // 捏合敏感度
  minScale?: number;           // 最小缩放比例
  maxScale?: number;           // 最大缩放比例
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Zoom, Line } from '@antv/f2';

<Chart data={data}>
  <Line x="date" y="value" />
  <Zoom mode="x" minScale={1} maxScale={5} />
</Chart>
```

---

## 特殊图表组件

### Gauge - 仪表盘

用于绘制仪表盘图表。

#### Props

```typescript
interface GaugeProps {
  center?: [number, number];   // 中心点坐标 [0, 1]
  startAngle?: number;         // 起始角度
  endAngle?: number;           // 结束角度
  percent: number;             // 百分比值 [0, 1]
  tickCount?: number;          // 刻度数量
  tickOffset?: number;         // 刻度偏移
  tickLength?: number;         // 刻度长度
  pointer?: PointerConfig;     // 指针配置
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Gauge } from '@antv/f2';

<Canvas context={context}>
  <Gauge 
    percent={0.75}
    startAngle={-Math.PI * 7 / 6}
    endAngle={Math.PI * 1 / 6}
    pointer={{
      fill: '#1890FF'
    }}
  />
</Canvas>
```

### Treemap - 矩形树图

用于展示层级数据。

#### Props

```typescript
interface TreemapProps {
  data: TreeNode;              // 树形数据
  space?: number;              // 间距
  color?: string;              // 颜色映射字段
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Treemap } from '@antv/f2';

const data = {
  name: 'root',
  children: [
    { name: 'A', value: 100 },
    { name: 'B', value: 200 },
    { name: 'C', value: 150 },
  ]
};

<Canvas context={context}>
  <Treemap data={data} space={2} color="name" />
</Canvas>
```

### Sunburst - 旭日图

用于展示层级数据的占比关系。

#### Props

```typescript
interface SunburstProps {
  data: TreeNode;              // 树形数据
  color?: string;              // 颜色映射字段
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Sunburst } from '@antv/f2';

const data = {
  name: 'root',
  children: [
    { 
      name: 'A', 
      value: 100,
      children: [
        { name: 'A1', value: 50 },
        { name: 'A2', value: 50 },
      ]
    },
    { name: 'B', value: 200 },
  ]
};

<Canvas context={context}>
  <Sunburst data={data} color="name" />
</Canvas>
```

### PieLabel - 饼图标签

用于在饼图上添加标签。

#### Props

```typescript
interface PieLabelProps {
  label1?: (data) => string;    // 第一行标签
  label2?: (data) => string;    // 第二行标签
  sidePadding?: number | string;  // 侧边距
  label1Style?: TextStyleProps;   // 第一行样式
  label2Style?: TextStyleProps;   // 第二行样式
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Interval, PieLabel } from '@antv/f2';

<Chart data={data} coord={{ type: 'polar', transposed: true }}>
  <Interval x="a" y="percent" adjust="stack" color="name" />
  <PieLabel 
    label1={(data) => data.name}
    label2={(data) => `${(data.percent * 100).toFixed(1)}%`}
  />
</Chart>
```

### Pictorial - 象形图

用于绘制象形柱状图。

#### Props

```typescript
interface PictorialProps {
  image: string;               // 图片 URL
  repeat?: boolean;            // 是否重复
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Pictorial } from '@antv/f2';

<Chart data={data}>
  <Pictorial 
    x="genre" 
    y="sold"
    image="https://example.com/icon.png"
    repeat={true}
  />
</Chart>
```

### Magnifier - 放大镜

用于提供局部放大功能。

#### Props

```typescript
interface MagnifierProps {
  radius?: number;             // 放大镜半径
  zoom?: number;               // 放大倍数
}
```

#### 使用示例

```jsx
import { Canvas, Chart, Line, Magnifier } from '@antv/f2';

<Chart data={data}>
  <Line x="date" y="value" />
  <Magnifier radius={50} zoom={2} />
</Chart>
```

---

## 组件组合示例

### 完整的柱状图

```jsx
import { 
  Canvas, Chart, Interval, 
  Axis, Legend, Tooltip 
} from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275, type: 'A' },
  { genre: 'Strategy', sold: 115, type: 'A' },
  { genre: 'Action', sold: 120, type: 'B' },
  { genre: 'Shooter', sold: 350, type: 'B' },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart 
    data={data}
    scale={{
      sold: { min: 0, tickCount: 5 }
    }}
  >
    <Axis field="genre" />
    <Axis field="sold" />
    <Legend position="top" />
    <Tooltip showCrosshairs />
    <Interval 
      x="genre" 
      y="sold" 
      color="type"
      adjust="dodge"
    />
  </Chart>
</Canvas>
```

### 完整的折线图

```jsx
import { 
  Canvas, Chart, Line, 
  Axis, Legend, Tooltip, Guide, LineGuide
} from '@antv/f2';

const data = [
  { date: '2020-01', value: 100, type: 'A' },
  { date: '2020-02', value: 120, type: 'A' },
  { date: '2020-03', value: 150, type: 'A' },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="value" />
    <Legend position="top" />
    <Tooltip showCrosshairs showItemMarker />
    <Line x="date" y="value" color="type" shape="smooth" />
    
    {/* 添加平均线 */}
    <Guide>
      <LineGuide 
        records={[
          { date: '2020-01', value: 125 },
          { date: '2020-03', value: 125 }
        ]}
        style={{ stroke: 'red', lineDash: [4, 4] }}
      />
    </Guide>
  </Chart>
</Canvas>
```

### 完整的饼图

```jsx
import { 
  Canvas, Chart, Interval, 
  Legend, PieLabel, Tooltip
} from '@antv/f2';

const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.21, a: '1' },
  { name: '机器之血', percent: 0.17, a: '1' },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart 
    data={data} 
    coord={{ 
      type: 'polar', 
      transposed: true,
      innerRadius: 0.3  // 环形图
    }}
  >
    <Legend position="right" />
    <Tooltip />
    <Interval 
      x="a" 
      y="percent" 
      adjust="stack" 
      color="name"
    />
    <PieLabel 
      label1={(data) => data.name}
      label2={(data) => `${(data.percent * 100).toFixed(1)}%`}
    />
  </Chart>
</Canvas>
```

---

## 总结

本文档涵盖了 F2 的所有主要组件及其使用方法。在实际使用中：

1. **Canvas** 和 **Chart** 是必需的容器组件
2. **几何标记组件**（Line、Area、Interval、Point）用于数据可视化
3. **辅助组件**（Axis、Legend、Tooltip）增强图表可读性
4. **特殊组件**（Gauge、Treemap、Sunburst 等）满足特定场景需求

通过组合这些组件，可以创建各种复杂的数据可视化图表。
