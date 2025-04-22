<!--
@antv/f2 v5.7.5 API 文档

本文档是 @antv/f2 图表库的官方 API 参考手册。在使用本文档进行开发时，请注意以下关键点：

1. 组件使用
  - 所有图表组件均采用 JSX 语法描述
  - 遵循声明式的组件编写方式
  - F2 提供了如下组件，请参考其对应的文档：
    * Line - 折线图
    * Area - 面积图
    * Interval - 柱状图
    * Point - 散点图
    * Axis - 坐标轴
    * Legend - 图例
    * TextGuide - 文本标注
    * PointGuide - 点标注
    * LineGuide - 线标注
    * ArcGuide - 弧标注
    * RectGuide - 矩形标注
    * ImageGuide - 图片标注
    * TagGuide - 标签标注
    * LottieGuide - Lottie 动画标注
    * PolylineGuide - 折线标注
    * Tooltip - 交互提示
    * Treemap - 矩形树图
    * Sunburst - 旭日图
    * ScrollBar - 滚动条
    * Candlestick - K线图/蜡烛图
  
   
2. 运行环境
  - Canvas context 获取方式因运行环境而异
  - 默认适配 Web 环境
  - 其他环境(小程序等)请参考相应章节
   
3. 代码组织
  - 建议按业务逻辑合理拆分图表组件
  - 复用通用的图表配置和样式
  - 保持图表代码结构清晰
-->

# api/canvas

---
title: 画布 - Canvas
order: 2
redirect_from:
  - /zh/docs/api
---

F2 提供的顶层组件，可以理解成画布对象

## Usage

```jsx
import { Canvas, Component } from '@antv/f2';

<Canvas context={context}>
  <Component />
  ...
</Canvas>;
```

## Props

### context: CanvasRenderingContext2D

画布的上下文，需要为 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 对象，F2 使用的是标准的 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 对象接口，只要符合这个接口定义的对象都可以

### pixelRatio: number

_可选_

默认为 `window.devicePixelRatio`

### width: number

_可选_

画布宽度

### height: number

_可选_

### animate: boolean

是否执行动画，默认为 `true`

# api/chart/area

---
title: 面积 - Area
order: 5
---

用于绘制区域图（面积图）、层叠区域图、区间区域图等, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Canvas, Chart, Area } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Area x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

几何标记统一 Props 详见：[几何标记](geometry#props)

### connectNulls

是否连接空值， 默认为 `false`，不连接

## 方法

几何标记统一方法 详见：[几何标记](geometry#方法)

# api/chart/axis

---
title: 坐标轴 - Axis
order: 6
---

坐标轴配置。F2 的坐标轴的组成如下：![](https://gw.alipayobjects.com/zos/rmsportal/YhhBplZmzxzwvUBeEvPE.png#width=500)

| **术语**     | **英文** |
| ------------ | -------- |
| 坐标轴文本   | label    |
| 坐标轴线     | line     |
| 坐标轴刻度线 | tickLine |
| 坐标轴网格线 | grid     |

## Usage

```jsx
import { Canvas, Chart, Line, Axis } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Axis field="genre" />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

部分属性可参考 scale 图表度量，度量详细介绍可见：[度量](../../tutorial/scale.zh.md)

### visible: boolean

是否显示，默认为 `true`

### field: string

坐标轴的数据字段

### type: string

指定不同的度量类型，支持的 type 为 `identity`、`linear`、`cat`、`timeCat`。

### position: string

坐标轴显示的位置：`'top' | 'right' | 'bottom' | 'left'`

### tickCount: Number

坐标轴上刻度点的个数，不同的度量类型对应不同的默认值

### range: string

输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1

### formatter: Function

回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、提示信息 tooltip 上的显示。

### min: string

定义数值范围的最小值。

### max: string

定义数值范围的最大值。

### nice: boolean

默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]。

### grid: string

网格线类型：可选值为：`'arc' | 'line'`

### style

坐标轴的样式配置

#### style.label: TextAttr | Function

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性) 文本样式文本样式

#### style.tickLine

```js
{
  tickLine: {
    // 刻度线长度
    length: 10,
  }
}
```

#### style.line

> 类型为绘图属性：[线条属性](/tutorial/shape-attrs#线条属性) 线条样式

轴线样式

#### style.grid

> 类型为绘图属性：[线条属性](/tutorial/shape-attrs#线条属性) 线条样式

网格线样式

# api/chart/candlestick

---
title: K 线图 - Candlestick
order: 5
---

用于 K 线图, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Axis, Candlestick, Canvas, Chart, jsx } from '@antv/f2';

const data = [
  {
    time: '2017-10-24',
    // 格式为：[open, close, lowest, highest]
    value: [20, 34, 10, 38],
  },
  {
    time: '2017-10-25',
    value: [40, 35, 30, 50],
  },
  {
    time: '2017-10-26',
    value: [31, 38, 33, 44],
  },
  {
    time: '2017-10-27',
    value: [38, 15, 5, 42],
  },
];

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis field="time" />
      <Axis field="value" />
      <Candlestick x="time" y="value" />
    </Chart>
  </Canvas>
);
```

## 数据结构说明

y 轴字段格式为：`[open, close, lowest, highest]` 分别代表：`[开盘价, 收盘价, 最低价, 最高价]`

## Props

几何标记统一 Props 详见：[几何标记](geometry#props)

### color

设置「涨」、「跌」、「平盘」颜色，格式为：`[上涨颜色, 下跌颜色, 平盘颜色]`, 默认值为： `['#E62C3B', '#0E9976', '#999999']`

```jsx
<Candlestick x="time" y="value" color={{ range: ['#E62C3B', '#0E9976', '#999999'] }} />
```

### sizeRatio

矩形的大小比例，范围 `[0, 1]`, 默认为 `0.5`, 表示矩形的宽度和空白处各占 `50%`

```jsx
<Candlestick x="time" y="value" sizeRatio={0.8} />
```

## 方法

# api/chart/chart

---
title: 图表 - Chart
order: 0
---

图表组件

## Usage

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>;
```

## Props

### data: Array

可视化数据

### scale

图表的度量设置

```jsx
<Chart
  data={data}
  scale={{
    // 声明 sold 字段配置
    sold: {
      min: 0,
      max: 100,
    },
    genre: {

    }
  }}
>
  ...
</Chart>
```
图表的度量，度量详细介绍可见：[度量](../../tutorial/scale.zh.md)


### coord

图表的坐标系，坐标系详细介绍可见：[坐标系](../../tutorial/coordinate.zh.md)

```jsx
<Chart
  data={data}
  coord={{
    type: 'rect' | 'polar',
    transposed: boolean,
    // 下面几个是 polar 独有
    startAngle: number,
    endAngle: number,
    radius: number, // 半径
    innnerRadius: number, // 内半径
  }}
>
  ...
</Chart>
```

# api/chart/geometry

---
title: 几何标记 - Geometry
order: 1
---

F2 基本组成部分如下图所示：

![](https://gw.alipayobjects.com/zos/rmsportal/tpfdzWDYmxzHkquTihJe.png)

下列几何标记都继承了下面的属性和方法

- [Line](line)：线
- [Interval](interval)：柱状图、直方图、饼图、环形图、漏斗图等
- [Point](point)：点
- [Area](area)：面积

## Props

### x: string

x 轴的数据映射字段名

### y: string

y 轴的数据映射字段名

### color

color 的数据映射字段，可使用如下几种方式

#### 固定值

```jsx
<Geometry color="#1890FF" ... />
```

#### 字段名映射

```jsx
<Geometry color={ field } ... />
```

F2 会根据数据类型自动选择适应的映射方式

#### Array 形式

```jsx
<Geometry color={ [field, ['red', 'green', 'blue']] } ... />
```

F2 会根据数据以此映射 `['red', 'green', 'blue']` 这 3 种颜色

#### Object 形式

```jsx
<Geometry color={{
  field,
  range: ['red', 'green', 'blue'],
  // 也可通过回调的方式设置
  callback: (value) => { return 'gray' }
}} ... />
```

#### 指定映射类型

F2 支持 **线性** 和 **分类** 2 种形式进行数据映射

```jsx
<Geometry color={{
  type: 'linear', // 分类为：category
  field,
  // 在映射时，颜色会从 red 渐变到 green
  range: ['red', 'green'],
}} ... />

<Geometry color={{
  type: 'category'
  field,
  // 不会渐变，只会映射这 3 种颜色
  range: ['red', 'green', 'blue'],
}} ... />
```

### size

size 的数据映射字段， 使用方式同 [color](#color)

```jsx
// 固定值
<Geometry size={ 4 } ... />

// 字段名映射
<Geometry size={ field } ... />

// array 形式
<Geometry size={ [field, [2, 4, 6]] } ... />

// object 形式
<Geometry size={{
  field,
  range: [2, 4, 6],
  // 也可通过回调的方式设置
  callback: (value) => { return 'gray' }
}} ... />

// 指定类型
<Geometry size={{
  type: 'linear', // 分类为：category
  field,
  // 在映射时，大小会从 2 逐渐变化到 10
  range: [2, 10],
}} ... />
```
### viewClip
只显示图表区域内（两轴之间）的，默认 false

### adjust: string

设置数据调整方式, F2 支持如下几种数据调整方式

```jsx
<Geometry adjust={ adjustType } ... />
```

#### stack

层叠，将同一个分类的数据值累加起来。以层叠的柱状图为例，x 轴方向的同一个分类下面的数据，按照顺序，将 y 轴对应的值累加，最终将数据调整的不再重叠。

#### dodge

分组散开，将同一个分类的数据进行分组在一个范围内均匀分布，例如分组柱状图。

#### symmetric

数据对称，使得生成的图形居中对齐，例如河流图、漏斗图。

### startOnZero: boolean

y 轴是否需要从 0 开始，默认为 `false`

### animation

动画配置， F2 支持对动画进行 `appear`, `update`, `leave` 这 3 个阶段的动画配置

```jsx
<Geometry
  animation={{
    appear: {
      easing: 'linear',
      duration: 300,
      delay: 0,
      property: ['fillOpacity'],
      start: {
        fillOpacity: 0,
      },
      end: {
        fillOpacity: 1,
      },
    },
    update: {
      easing: 'linear',
      duration: 450,
      delay: 0,
      property: ['x', 'y'],
    },
    leave: {
      easing: 'linear',
      duration: 450,
      delay: 0,
      property: ['fillOpacity'],
      start: {
        fillOpacity: 1,
      },
      end: {
        fillOpacity: 0,
      },
    },
  }}
/>
```

更多缓动函数可见：[easing 函数](https://github.com/antvis/F2/blob/master/packages/f2/src/canvas/animation/easing.ts)， 也可直接传入缓动 `function`

## 方法

### getXScale()

获取 x 轴的 scale

### getYScale()

获取 y 轴的 scale

### getSnapRecords(point)

根据 canvas 坐标点获取对应图形的数据, point 为 `{ x: number, y: number }` 这种结构

# api/chart/guide

---
title: 标注 - Guide
order: 9
---

提示和标注， 主要用于在图表上标识额外的标记注解。目前内置 PointGuide 点标注、TextGuide 文本标注、TagGuide 标注、ImageGuide 图片标注和 LineGuide 线标注，也可以自定义标注。

## Usage

```jsx
import { Canvas, Chart, Interval, TextGuide } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Axis field="genre" />
    <Interval x="genre" y="sold" />
    {data.map((item) => {
      const { sold } = item;
      return (
        <TextGuide
          records={[item]}
          content={`${sold}`}
          style={{
            fill: '#000',
            fontSize: '24px',
          }}
          offsetY={-20}
          offsetX={-15}
        />
      );
    })}
  </Chart>
</Canvas>;
```

## Props

### records: Array

#### 数据项

可传入具体数据项，表示在改数据位置标注内容

```jsx
<Guide records={[{ genre: 'Sports', sold: 5 }]}>
```

#### 比例值

可传入比例值，可选值: `'min' | 'median' | 'max' | '0%' | '50%' | '100'`

```jsx
// 表示在 genre 的最小值，sold 的最大值位置标注内容
<Guide records={[{ genre: 'min', sold: 'max' }]}>
```

### style

标注样式

## PointGuide

标注点

### offsetX: number

x 轴偏移量

### offsetY: number

y 轴偏移量

## TextGuide

文本标注

### content: string

文本内容

### offsetX: number

x 轴偏移量

### offsetY: number

y 轴偏移量

## TagGuide

标签标注

### content: string

文本内容

### offsetX: number

x 轴偏移量

### offsetY: number

y 轴偏移量

### direct: string

可选值为:

```
  'tl' | 'tc' | 'tr'
  'cl' |      | 'cr'
  'bl' | 'bc' | 'br'
```

### background: Attrs

> 类型为绘图属性：[图形属性](/tutorial/shape-attrs#通用属性)

### triggerRef: any

tagGuide 实例

### textStyle: TextAttr

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性) 文本样式文本样式

## ImageGuide

图片标注

### src: string

图片地址

### attrs

图片属性 更多详见：[绘图属性 - ShapeAttrs](/tutorial/shape-attrs)

### offsetX: number

x 轴偏移量

### offsetY: number

y 轴偏移量

## LineGuide

辅助线标注

### offsetX: number

x 轴偏移量

### offsetY: number

y 轴偏移量

## demo 示例

- [文本标注](/site/examples/component/guide/demo/text.jsx)
- [点标注](/site/examples/component/guide/demo/point.jsx)
- [图片标注](/site/examples/component/guide/demo/image.jsx)
- [辅助线](/site/examples/component/guide/demo/line.jsx)
- [自定义标注内容](/site/examples/component/guide/demo/custom.jsx)

# api/chart/interval

---
title: 区间 - Interval
order: 3
---

用于绘制柱状图、直方图、南丁格尔玫瑰图、饼图、条形环图（玉缺图）、漏斗图等, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>;
```

## Props

几何标记统一 Props 详见：[几何标记](geometry#props)

### selection

选中交互配置

#### type: string

设置单选/多选， 默认为 `single`（单选），可选值： `'single' | 'multiple'`

#### triggerOn: string

触发的事件，默认为 `click`，可选 `'click' | 'press'`

> 设置 press 时，需要把 cancelable 设置成 false, 否则会有明显的闪动

#### defaultSelected: Array

默认的选中项，可设置多个

```jsx
<Interval selection={{ defaultSelected: [{ genre: 'Sports', sold: 5 }] }} />
```

#### selectedStyle

选中的样式，可设置图形属性或者函数

```jsx
<Interval selection={{ selectedStyle: { fillOpacity: 1 } }} />
```

或者

```jsx
<Interval
  selection={{
    selectedStyle: (record) => {
      return { fillOpacity: 1 };
    },
  }}
/>
```

#### unSelectedStyle

非选中的样式，可设置图形属性或者函数， 同 selectedStyle

```jsx
<Interval selection={{ unSelectedStyle: { fillOpacity: 0.4 } }} />
```

或者

```jsx
<Interval
  selection={{
    unSelectedStyle: (record) => {
      return { fillOpacity: 0.4 };
    },
  }}
/>
```

#### cancelable: boolean

是否可取消，单选下表现为选择和反选，默认为 `true`

```jsx
<Interval selection={{ cancelable: false }} />
```

#### demo 示例

- [柱状图选中](/site/examples/column/column/demo/selection.jsx)
- [饼图选中](/site/examples/pie/pie/demo/selection.jsx)

### sizeRatio

大小比例，范围 `[0, 1]`, 比如柱状图默认为 `0.5`, 表示柱子和空白处各占 `50%`

## 方法

几何标记统一方法 详见：[几何标记](geometry#方法)

# api/chart/legend

---
title: 图例 - Legend
order: 7
---

F2 图例的生成是由图形语法中的图形属性决定的，我们会根据图形属性映射以及数据的类型自动生成不同类型的图例：color, size 这两个图形属性如果判断接收的参数是数据源的字段时，会自动生成不同的图例：

1. color，会赋予不同的图例项不同的颜色来区分图形，如果该字段是分类类型，则会生成离散图例

## Usage

```jsx
import { Canvas, Chart, Line, Legend } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Legend position="top">
    <Axis field="genre" />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

### position: string

可选值为：`'top' | 'right' | 'bottom' | 'left'`, 默认为 `'top'`

### width: number

图例显示的宽度

### height: number

图例显示的高度

### itemFormatter: function

格式化图例每项的文本显示

### marker: string

图例标记, 可选值为： `'circle' | 'square' | 'line'`, 默认为 `'circle'`

### style

定义 Legend 的布局方式

| **属性名** | **类型** | **描述** |
| --- | --- | --- |
| `flexDirection` | String | 支持的属性：'column', 'row' |
| `justifyContent` | String | 支持的属性：'flex-start', 'center', 'flex-end', 'space-between', 'space-around' |
| `alignItems` | String | 支持的属性： 'flex-start', 'center', 'flex-end', 'stretch' |
| `alignSelf` | String | 支持的属性： 'flex-start', 'center', 'flex-end', 'stretch' |
| `flexWrap` | String | 支持的属性：'wrap', 'nowrap' |

```jsx
<Legend
  style={{
    justifyContent: 'flex-start',
    flexDirection: 'column',
  }}
/>
```

### itemStyle

定义每个图例项的布局方式，支持的属性同上文的 style

```jsx
<Legend
  itemStyle={{
    justifyContent: 'center',
  }}
/>
```

### nameStyle

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性)

图例名称样式

```jsx
<Legend
  nameStyle={{
    fontSize: '20px',
    fill: '#000',
  }}
/>
```

### valueStyle

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性)

图例值样式

```jsx
<Legend
  valueStyle={{
    fontSize: '20px',
    fill: '#000',
  }}
/>
```

### clickable

是否支持点击，默认为 true

### onClick

item 点击的回调

```jsx
<Legend
  onClick={(item) => {
    console.log(item); // => { field: 'genre', color: '#1890FF', name: 'Sports'}
  }}
/>
```

## 方法

### getOriginItems()

获取图表中原始分类数据

### getMaxItemBox(legendShape)

获取 legendShape 包围盒

# api/chart/line

---
title: 线 - Line
order: 2
---

图表里面的折线类型, 用于绘制折线图、曲线图、阶梯线图等, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Canvas, Chart, Line } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

几何标记统一 Props 详见：[几何标记](geometry#props)

### connectNulls

是否连接空值， 默认为 `false`，不连接

## 方法

几何标记统一方法 详见：[几何标记](geometry#方法)

# api/chart/point

---
title: 点 - Point
order: 4
---

用于绘制点图、折线图中的点等, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Canvas, Chart, Point } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Point x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

几何标记统一 Props 详见：[几何标记](geometry#props)

## 方法

几何标记统一方法 详见：[几何标记](geometry#方法)

# api/chart/scroll-bar

---
title: 滚动条 - ScrollBar
order: 10
---

数据滚动和缩放

## Usage

```jsx
import { Canvas, Chart, Line, ScrollBar } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Axis field="genre" />
    <Line x="genre" y="sold" />
    <ScrollBar />
  </Chart>
</Canvas>;
```

## Props

### mode: string

滚动模式，默认为： `'x'`, 可选值： `'x' | 'y' | '['x', 'y']'`

### range: [0, 1]

初始化区间， 默认为： `[0, 1]`，数值为 `0 ~ 1` 之间

### pan: boolean

是否支持平移，默认为： `true`

### pinch: boolean

是否支持缩放，默认为： `true`

### autoFit: boolean

自动同步 x/y 的坐标值，默认为：`false`

### visible: boolean

是否显示滚动条

### position: string

默认为 `'bottom'`, 可选值为：`'top' | 'right' | 'bottom' | 'left'`

### style: ShapeProps

滚动条和图表内容间距，比如

```css
marign: ['10px', '20px']
marignTop: '10px'
```

### backgroud: ShapeProps

滚动条背景样式

> 类型为绘图属性：[线条属性](/tutorial/shape-attrs#线条属性) 线条样式

### barStyle: ShapeProps

滑块样式

> 类型为绘图属性：[线条属性](/tutorial/shape-attrs#线条属性) 线条样式

## demo 示例

- [折线图平移](/site/examples/line/line/demo/pan.jsx)
- [柱状图平移](/site/examples/column/column/demo/pan.jsx)
- [散点图缩放平移](/site/examples/point/scatter//demo/roam.jsx)

# api/chart/tooltip

---
title: 提示 - tooltip
order: 8
---

## Usage

```jsx
import { Canvas, Chart, Line, Tooltip } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Tooltip>
    <Axis field="genre" />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## 组成

![](https://mdn.alipayobjects.com/huamei_khb4xj/afts/img/A*CdXbTJnr2v4AAAAAAAAAAAAADq2NAQ/original)

## Props

### padding: number ｜ string

边距

### triggerOn: 'click' | 'press'

触发 tooltip 显示事件，默认为 press

### triggerOff: 'pressend'

触发 tooltip 消失事件，默认为 pressend

### alwaysShow: boolean

是否一直显示

### showCrosshairs: boolean

是否显示十字线

### crosshairsType: 'x' | 'y' | 'xy'

十字线类型

### crosshairsStyle: LineAttrs

> 类型为绘图属性：[线条属性](/tutorial/shape-attrs#线条属性)

十字线样式

### nameStyle: TextAttrs

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性)

主体名称样式

### valueStyle: TextAttrs

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性)

主体值样式

### background: RectAttrs

> 类型为绘图属性：[通用属性](/tutorial/shape-attrs#通用属性)

主体背景样式

### xTip： string ｜ function

xTip 中显示的 text 定义

### xTipTextStyle：TextAttrs

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性)

xTip 中字体样式

### xTipBackground：RectAttrs

> 类型为绘图属性：[通用属性](/tutorial/shape-attrs#通用属性)

xTip 中背景样式

### showItemMarker: boolean

是否显示

### onChange：function

tooltip 选中数据发生改变时的回调函数

## 方法

可通过获取 ref 调用

### show(point: {x: number, y: number})

在 x，y 处显示 tooltip 组件

### hide()

隐藏 tooltip 组件

# api/component

---
title: 组件 - Component
order: 1
redirect_from:
  - /zh/docs/api
---

提供了组件定义

## Usage

```jsx
import { Component } from '@antv/f2';
// TODO
```

## 生命周期

### constructor(props)

构造函数，传入组件参数

### willMount()

在组件将要挂载阶段执行

### render()

在组件渲染阶段执行

### didMount()

在组件完成挂载后执行

### shouldUpdate(nextProps)

在组件触发更新前触发，`return false` 时，不会触发组件更新

### willReceiveProps(nextProps)

在更新组件前，接收 props 时触发

### willUpdate()

组件更新前执行

### didUpdate()

完成更新后执行

### didUnmount()

完成销毁后执行

### setState(state, callback)

组件状态修改

### forceUpdate(callback)

触发强制更新

### setAnimate(boolean)

组件渲染时是否需要执行动画

## 组件属性

### props

构造函数传入的属性

### state

组件状态

# api/f2

---
title: 顶层 API - F2
order: 0
redirect_from:
  - /zh/docs/api
---

## 顶层 API

- [Children](#children)：children 的处理方法
- [Component](component)：组件
- [Canvas](canvas)：画布组件
- [Timeline](timeline)：组件事件轴
- [Chart](chart/chart)：图表组件

### Children

提供了用于处理 this.props.children 的方法

#### Children.map(children, callback)

类似 Array.map 遍历并返回新的对象

```jsx
import { Children } from '@antv/f2';
Children.map(this.props.children, (child) => {
  // TODO
  return child;
});
```

#### Children.cloneElement(child, props)

复制一个新元素

```jsx
import { Children } from '@antv/f2';
Children.map(this.props.children, (child) => {
  return Children.cloneElement(child, { ... });
});
```

#### Children.toArray(children)

转换成数组

```jsx
import { Children } from '@antv/f2';
const childrenArray = Children.toArray(children);
```

### createElement / jsx(type, props, ...children)

提供生成 jsx 元素的方法，`createElement(type, props, ...children)` 和 `jsx(type, props, ...children)` 是完全一致的

```jsx
import { createElement, Chart } from '@antv/f2';
// 创建 chart 元素
const element = createElement(Chart, { data }, [...]);
```

### createRef()

提供了创建 ref 的方法

```jsx
import { createRef } from '@antv/f2';
// 创建 chart 元素
const ref = createRef(); // 生成 { current: null } 这样的结构
```

# api/timeline

---
title: 时间轴 - Timeline
order: 3
redirect_from:
  - /zh/docs/api
---

提供组件事件播放的控制

## Usage

```jsx
import { Timeline, Canvas, Component } from '@antv/f2';

<Canvas context={context}>
  <Timeline delay={0}>
    <Component />
    <Component />
    ...
  </Timeline>
</Canvas>;
```

## Props

### delay: number

组件播放的间隔时间

# tutorial/advanced/custom-view

---
title: 自定义 View
order: 1
---

在 F2 中， 为了让显示更加灵活和自定义，我们把所有的组件都进行了高阶组件（HOC）的封装，形成了 `withXXX` 的逻辑封装，下面以 `Legend` 为例，来演示下如何实现自定义 view

## Legend 的使用

```jsx
import { Canvas, Chart, Legend } from '@antv/f2';

<Canvas context={context}>
  <Chart data={data}>
    ...
    <Legend position="top" />
    ...
  </Chart>
</Canvas>;
```

上面这个使用大家应该都不陌生，但是除了 `Legend` 之外，还是有 `withLegend` 和 `LegendView` 这 2 个对象，而 `Legend = withLegend(LegendView)`, 所以我们只要定义自己的 `LegendView` 就能达到自定义 View 的效果

## 定义 view

```jsx
const CustomLegendView = (props) => {
  const { items } = props;
  return (
    <group
      style={{
        flexDirection: 'row',
      }}
    >
      {items.map((item) => {
        const { name, color } = item;
        return (
          <text
            style={{
              text: name,
              fill: color,
            }}
          />
        );
      })}
    </group>
  );
};
```

## 使用自定义 view

```jsx
import { Canvas, Chart, withLegend } from '@antv/f2';

// 自定义 View
const CustomLegendView = (props) => {
  const { items } = props;
  return (
    <group
      style={{
        flexDirection: 'row',
      }}
    >
      {items.map((item) => {
        const { name, color } = item;
        return (
          <text
            style={{
              text: name,
              fill: color,
            }}
          />
        );
      })}
    </group>
  );
};

// 使用自定义 view 的组件
const Legend = withLegend(CustomLegendView);

<Canvas context={context}>
  <Chart data={data}>
    ...
    <Legend position="top" />
    ...
  </Chart>
</Canvas>;
```

在 CustomLegendView 中，用户可以拿到计算逻辑后的结果 props，也可以使用 Legend 组件的 public function

## 完整示例

- [自定义 Legend](/site/examples/component/legend/demo/custom.jsx)

# tutorial/animation

---
title: 动画属性 - Animation
order: 8
---

F2 动画定义与 [Web Animations API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API) 靠齐，除了组件层面，每个图形标签也都可以添加自定义动画。目前只支持基于 Keyframe 的动画，可定义动画执行阶段，以及变化效果 KeyframeEffect。

动画执行阶段分为 appear，update 以及 leave：

- appear：初始化时的入场动画 , render 阶段.
- update：数据更新时的更新动画 , props 发生改变.
- leave：销毁前的离场动画 , destroy 阶段.

每个阶段都可以配置相应的 animation

### 属性

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| `easing` | string | 缓动函数，动画持续效果 |
| `duration` | number | 动画持续时间 |
| `delay` | number | 开始动画前的延迟 |
| `fill` | 可能值为 'none','forwards','backwards','both' | 定义图形在动画执行前后的表现 |
| `iterations` | number | 循环次数，默认值为 1，Infinity 为无限循环 |
| `iterationStart` | number | 从何处执行动画，默认为 0 |
| `property` | [] | 声明需要变换的属性 |
| `start` | Keyframe | 开始帧状态 |
| `end` | Keyframe | 结束帧状态 |
| `clip` | Clip | 裁剪区域动画，可参见[clip](/tutorial/shape-attrs##裁剪) |

#### easing

缓动函数，默认为 `linear`，并且内置提供以下缓动函数，可参考[效果](https://easings.net/)

| constant   | accelerate         | decelerate     | accelerate-decelerate | decelerate-accelerate |
| :--------- | :----------------- | :------------- | :-------------------- | :-------------------- |
| linear     | ease-in / in       | ease-out / out | ease-in-out / in-out  | ease-out-in / out-in  |
| ease       | in-sine            | out-sine       | in-out-sine           | out-in-sine           |
| steps      | in-quad            | out-quad       | in-out-quad           | out-in-quad           |
| step-start | in-cubic           | out-cubic      | in-out-cubic          | out-in-cubic          |
| step-end   | in-quart           | out-quart      | in-out-quart          | out-in-quart          |
|            | in-quint           | out-quint      | in-out-quint          | out-in-quint          |
|            | in-expo            | out-expo       | in-out-expo           | out-in-expo           |
|            | in-circ            | out-circ       | in-out-circ           | out-in-circ           |
|            | in-back            | out-back       | in-out-back           | out-in-back           |
|            | in-bounce          | out-bounce     | in-out-bounce         | out-in-bounce         |
|            | in-elastic         | out-elastic    | in-out-elastic        | out-in-elastic        |
|            | spring / spring-in | spring-out     | spring-in-out         | spring-out-in         |

#### Keyframe

目前支持变换的属性有：

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| transform | `string` | 和 [CSS Transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 保持一致 |
| opacity | `number` | 透明度 |
| strokeOpacity | `number` | 描边透明度 |
| fill | `string` | 填充色 |
| stroke | `string` | 描边色 |
| lineWidth | `number` | 线宽 |
| r | `number` | Circle 的半径 |
| rx/ry | `number` | Ellipse 的半径 |
| width | `number` | Rect/Image 的宽度 |
| height | `number` | Rect/Image 的高度 |
| x1/y1/x2/y2 | `number` | Line 的端点坐标 |
| offsetDistance | `number` | 路径偏移，和[CSS Offset](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance)保持一致 |
| lineDash | `number` | 实线和间隔的长度 |
| lineDashOffset | `[number, number]` | 设置虚线的偏移量，和[Canvas lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)保持一致，可以实现蚂蚁线的效果 |
| path | `string` | Path 的定义，可做形变动画 |

### 使用方法

```js
<text
  style={{
    text: `测试`,
  }}
  animation={{
    appear: {
      easing: 'linear',
      duration: 450,
      property: ['x', 'y'],
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 100,
        y: 100,
      },
    },
    update: {
      {
        easing: 'quadraticOut',
        duration: 450,
        clip: {
          type: 'rect',
          property: ['width'],
          style: {
            x: 100,
            y: 100,
            height: 20,
          },
          start: {
            width: 0,
          },
          end: {
            width: 50,
          },
        },
      }
    },
    leave: {},
  }}
/>
```

### 其他动画

#### 路径动画

让图形沿着某个路径移动，在 css 中可通过[MotionPath](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Motion_Path)实现，F2 可通过图形标签上设置 offset 属性实现，目前支持 <line/> 和 <polyline>。

```js
<circle
  style={{
    fill: '#808080',
    r: 10,
    offset: {
      type: 'polyline',
      style: {
        points: [
          [0, 3],
          [50, 10],
          [130, 80],
          [250, 40],
        ],
      },
    },
  }}
  animation={{
    appear: {
      easing: 'quadraticOut',
      duration: 1000,
      property: ['offsetDistance'],
      start: {
        offsetDistance: 0,
      },
      end: {
        offsetDistance: 1,
      },
    },
  }}
/>
```

F2 在组件 Line 中内置了该功能，提供 endView 接口，可设置沿着线段移动的元素，具体可见 [demo](/site/examples/creative/case//demo/line-race.jsx)

# tutorial/component

---
title: 组件介绍 - Component
order: 9
---

组件结构基本保持和 React 一致，如果你了解 React ，相信你一看就会

## 组件定义

```jsx
import { Component } from '@antv/f2';

class Hello extends Component {
  constructor(props) {
    super(props);
  }
  willMount() {}
  didMount() {}
  shouldUpdate() {
    return true;
  }
  willReceiveProps(props) {}
  willUpdate() {}
  didUpdate() {}
  render() {
    const { color } = this.props;
    return <rect attrs={{ x: 10, y: 10, width: 10, height: 10, fill: color }} />;
  }
  didUnmount() {}
}
```

## 组件使用

```jsx
import { Canvas } from '@antv/f2';
import Hello from './hello';

<Canvas>
  <Hello color="red" />
</Canvas>;
```

# tutorial/coordinate

---
title: 坐标系 - Coordinate
order: 5
---

坐标系是将两种位置标度结合在一起组成的 2 维定位系统，描述了数据是如何映射到图形所在的平面。

F2 提供了直角坐标系和极坐标两种类型，目前所有的坐标系均是 2 维的。

## 如何设置坐标系

F2 默认提供的坐标系类型为笛卡尔坐标系，当需要切换坐标系时，可以通过调用下面的语法声明需要使用的坐标系：

```jsx
<Canvas>
  <Chart
    coord={{
      type: coordType,
    }}
  ></Chart>
</Canvas>
```

| **坐标系类型** | **说明**                                                       |
| -------------- | -------------------------------------------------------------- |
| `rect`         | 直角坐标系，目前仅支持二维，由 x, y 两个互相垂直的坐标轴构成。 |
| `polar`        | 极坐标系，由角度和半径 2 个维度构成。                          |

## 坐标系类型及配置

坐标系可以分为笛卡尔坐标系和非笛卡尔坐标系，非笛卡尔坐标系即极坐标，由角度和半径这两个维度来确定位置。

利用极坐标可生成饼图、玫瑰图和雷达图等，较适用于周期性数据的可视化场景，比如时间和方向数据。

坐标系类型的变换会改变几何标记的形状，比如在极坐标系中，矩形将变为圆环的一部分。

例如下图展示的柱状图、层叠柱状图，在不同坐标系下就能变换出各种类型：

|  | 直角坐标系 | 极坐标（未转置） | 极坐标（转置） |
| --- | --- | --- | --- |
| 层叠柱状图 | ![](https://gw.alipayobjects.com/zos/skylark/e3c2af2e-8c42-4743-9eb2-00be4beecb50/2018/png/4b932828-aad3-4934-99be-0580dd6b88ba.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/a0e92822-3020-4f2c-b63b-19e9e7204a86/2018/png/cdb767a2-105d-499d-af09-383323b35222.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/5de8fa15-6ea1-4a13-93c0-e4646ca6601c/2018/png/a43c60de-692f-433a-bab2-93fc6e9bba3b.png#width=) |
| 柱状图 | ![](https://gw.alipayobjects.com/zos/skylark/e392736b-86a1-4452-9265-f7a5e8dc1805/2018/png/47caf538-6703-4db5-ae68-6605837f2803.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/383cdf9f-a631-4fc4-9f6a-593a22822242/2018/png/dd798932-1555-4988-bc68-353835d051b3.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/1a056c5c-13da-46d4-9315-2d589588d889/2018/png/4171f504-2f52-4ed6-ba8f-b7b286650692.png#width=) |

### 直角坐标系

```jsx
<Canvas>
  <Chart
    coord={{
      // 声明直角坐标系
      type: 'rect',
      // 坐标系进行转置
      transposed: true,
    }}
  ></Chart>
</Canvas>
```

### 极坐标

```jsx
<Canvas>
  <Chart
    coord={{
      // 声明极坐标
      type: 'polar',
      // 坐标系进行转置
      startAngle: { Number }, // 起始弧度
      endAngle: { Number }, // 结束弧度
      innerRadius: { Number }, // 用于空心部分的半径设置
      radius: { Number }, // 实心圆的半径大小设置
      transposed: true, // 极坐标转置
    }}
  ></Chart>
</Canvas>
```

这里需要说明的是，F2 极坐标默认的起始角度和结束角度如下图所示：

![](https://zos.alipayobjects.com/skylark/85950a42-9579-44cb-b656-8dd28c9a014a/attach/2378/d648679184c6977c/image.png#width=)

# tutorial/data

---
title: 数据 - Data
order: 3
---

数据是绘制一张图表最基本的部分。F2 基本的数据格式如下：

```javascript
const data = [
  { year: 2010, sales: 40 },
  { year: 2011, sales: 30 },
  { year: 2012, sales: 50 },
  { year: 2013, sales: 60 },
  { year: 2014, sales: 70 },
  { year: 2015, sales: 80 },
  { year: 2016, sales: 80 },
  { year: 2017, sales: 90 },
  { year: 2018, sales: 120 },
];
```

## 特殊图表的数据说明

### 饼图

绘制饼图时，数据集中的每一条记录中**必须包含一个常量字段（并且必须是字符串类型）**，如下所示：

```javascript
const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.2, a: '1' },
  { name: '机器之血', percent: 0.18, a: '1' },
  { name: '心理罪', percent: 0.15, a: '1' },
  { name: '寻梦环游记', percent: 0.05, a: '1' },
  { name: '其他', percent: 0.02, a: '1' },
];
```

详见饼图[示例](/examples#pie-pie)。

### 区间柱状图

当 x 轴或者 y 轴的数据为数组时，我们默认会将映射为一段区间，进而绘制为区间柱状图。如下数据格式：

```javascript
const data = [
  { x: '分类一', y: [76, 100] },
  { x: '分类二', y: [56, 108] },
  { x: '分类三', y: [38, 129] },
  { x: '分类四', y: [58, 155] },
  { x: '分类五', y: [45, 120] },
  { x: '分类六', y: [23, 99] },
  { x: '分类七', y: [18, 56] },
  { x: '分类八', y: [18, 34] },
];
```

详见区间柱状图[示例](/examples#column-column)。

# tutorial/event

---
title: 事件属性 - Event
order: 9
---

5.x 版本中，F2 的事件系统也得以升级，基于 PointerEvent 标准监听封装了移动端事件。得益于底层引擎的事件系统以及拾取系统，F2 支持在图形标签上直接监听常见的移动端事件。

### 事件属性

| 事件名              | 类型    | 描述                       |
| ------------------- | ------- | -------------------------- |
| `onClick`           | funtion | 点击事件                   |
| `onPanStart`        | funtion | 手指触摸图形时触发 0       |
| `onPan`             | funtion | 手指在图形上移动时触发     |
| `onPanEnd`          | funtion | 手指从图形上离开时触发     |
| `onTouchStart`      | funtion | 手指触摸图形时触发         |
| `onTouchMove`       | funtion | 手指在图形上移动时触发     |
| `onTouchEnd`        | funtion | 手指从图形上离开时触发     |
| `onTouchEndOutside` | funtion | 手指从图形外离开时触发     |
| `onPressStart`      | funtion | 手指在图形上开始按压时触发 |
| `onPress`           | funtion | 手指在图形上按压时触发     |
| `onPressEnd`        | funtion | 手指在图形上结束按压时触发 |
| `onSwipe`           | funtion | 手指快扫时触发             |
| `onPinchStart`      | funtion | 手指开始缩放时触发         |
| `onPinch`           | funtion | 手指缩放时触发             |
| `onPinchEnd`        | funtion | 手指结束缩放时触发         |

# tutorial/framework/jsx-transform

---
title: 配置 jsx transform
order: 15
---

F2 使用 JSX 语法来构建图表，所以需要在运行前对 JSX 语法进行编译， JSX 更多细节可参考 React 的官方文档 [JSX 简介](https://zh-hans.reactjs.org/docs/introducing-jsx.html)

Babel 和 TypeScript 都可以编译 JSX 语法，并且在编译时 JSX 语法时，会有 2 种编译模式，在实际项目中可根据自己实际情况选择和使用

JSX 2 种编译的差别可见：

- https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#runtime
- https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

## Babel

在 Babel 中是使用 [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) 这个插件来编译 JSX 的

### 安装

```bash
npm install --save-dev @babel/plugin-transform-react-jsx
```

### 配置 babel.config

#### classic

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "jsx",
        "pragmaFrag": "Fragment"
      }
    ]
  ]
}
```

#### automatic

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "runtime": "automatic",
        "importSource": "@antv/f2"
      }
    ]
  ]
}
```

## TypeScript

在 TypeScript 中也分别支持这 2 种编译模式

### 配置 tsconfig.json

#### classic

```json
{
  "compilerOptions": {
    "jsxFactory": "jsx",
    "jsxFragmentFactory": "Fragment"
  }
}
```

#### automatic

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@antv/f2"
  }
}
```

# tutorial/framework/miniprogram

---
title: 如何在小程序中使用
order: 13
---

## 前置配置

### 1. 安装 F2 依赖

```bash
# 安装 F2 依赖
npm i @antv/f2 --save

# 安装小程序组件
npm i @antv/f-my --save

# 微信小程序
npm i @antv/f-wx --save

```

### 2. 配置 jsx transform

> 如果项目已有 jsx 编译，可忽略此步骤

详见：[配置 jsx transform](./jsx-transform)

### 3. 添加 jsx 编译

package.json

```json
{
  "scripts": {
    "beforeCompile": "babel pages --out-dir pages --only **/*.jsx"
  }
}
```

## 支付宝小程序

mini.project.json

```json
{
  "scripts": {
    "beforeCompile": "npm run beforeCompile"
  }
}
```

### 页面使用

page.json

```json
{
  "usingComponents": {
    "f2": "@antv/f-my"
  }
}
```

page.axml

```jsx
<view class="container">
  <f2 onRender="onRenderChart"></f2>
</view>
```

page.acss

```css
.container {
  width: 100%;
  height: 600rpx;
}
```

chart.jsx

```jsx
import { Chart, Interval, Axis } from '@antv/f2';

export default (props) => {
  const { data } = props;
  return (
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  );
};
```

page.jsx

```jsx
import Chart from './chart';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {},
  onRenderChart() {
    return <Chart data={data} />;
  },
});
```

如果不想在入口文件写 jsx 语法，可以使用下面方式

page.js

```jsx
// 通过 createElement 方式创建
import { createElement } from '@antv/f2';
import Chart from './chart';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {},
  onRenderChart() {
    return createElement(Chart, {
      data: data,
    });
  },
});
```

### demo

- 参考示例：https://github.com/antvis/FEngine/tree/master/packages/f-my/examples

## 微信小程序

### 页面使用

page.json

```json
{
  "usingComponents": {
    "f2": "@antv/f-wx"
  }
}
```

page.wxml

```jsx
<view class="container">
  <f2 onRender="{{onRenderChart}}" />
</view>
```

page.wxss

```css
.container {
  width: 100%;
  height: 600rpx;
}
```

chart.jsx

```jsx
import { Chart, Interval, Axis } from '@antv/f2';

export default (props) => {
  const { data } = props;
  return (
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  );
};
```

page.jsx

```jsx
import Chart from './chart';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {
    onRenderChart() {
      return <Chart data={data} />;
    },
  },
});
```

如果不想在入口文件写 jsx 语法，可以使用下面方式

page.js

```jsx
import { createElement } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {
    onRenderChart() {
      return createElement(Chart, {
        data: data,
      });
    },
  },
});
```

### demo

- 参考示例：https://github.com/antvis/FEngine/tree/master/packages/f-wx/examples

# tutorial/framework/nodejs

---
title: 如何在 Node.js 中使用
order: 14
---

## 配置 jsx transform

详见：[配置 jsx transform](./jsx-transform)

## Usage

```jsx
import { Canvas, Chart, Interval, Axis } from '@antv/f2';
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

(async () => {
  const { props } = (
    <Canvas context={ctx} pixelRatio={1} animate={false}>
      <Chart data={data}>
        <Axis field="genre" />
        <Axis field="sold" />
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    </Canvas>
  );

  const fcanvas = new Canvas(props);
  await fcanvas.render();

  const out = fs.createWriteStream(path.join(__dirname, 'chart.png'));
  const stream = canvas.createPNGStream();
  stream.pipe(out);

  out.on('finish', () => {
    process.exit();
  });
})();
```

# tutorial/framework/overview

---
title: 多端适配
order: 10
---

在 5.0 中，F 系列基于移动端特点和共性进行了移动端底层架构（Fengine）的统一，对接于最新的 G 5.0 之上。我们利用 Fengine 提供的多端适配，可以快速适配各种框架/端。

## 说明

![](https://mdn.alipayobjects.com/huamei_khb4xj/afts/img/A*eihISab7e24AAAAAAAAAAAAADq2NAQ/original)

其中：

- @antv/f-engine ---- 无框架
- @antv/f-react ---- react 框架
- @antv/f-vue ---- vue 框架
- @antv/f-my ---- 支付宝小程序端
- @antv/f-wx ---- 微信小程序端

## 使用方式

F2 默认引入 @antv/f-engine 中的 canvas。使用者根据框架/端，引入不同端的 canvas 以及 F2， 即可快速搭建可视化图表。具体使用方式可查看对应文档。

## 封装思路

F2 是基于 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 的标准接口绘制的，所以只要能提供标准 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 接口的实现对象，F2 就能进行图表绘制

因为在小程序中给的 `context` 对象不是标准的 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) , 所以封装的核心思路是将 `context` 和 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 对齐，所以 F2 针对支付宝和微信这 2 个常见的场景做了一层 `context` 的对齐，详情可见: https://github.com/antvis/f2-context, 其他小程序也可以按同样的思路封装

# tutorial/framework/react

---
title: 如何在 React 中使用
order: 11
---

因为 F2 也是使用声明式构建图表 UI，也内置了一套统一的组件，可以很容易地与 React 生态结合， 使用时可以完全按 React 组件库的方式来使用

## 说明

```bash
npm install @antv/f2 --save
npm install @antv/f-react --save
```

2. **完整示例**

```jsx
import React from 'react';
import ReactDOM from 'react';
import Canvas from '@antv/f-react';
import { Chart, Interval } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

ReactDOM.render(
  <div>
    <Canvas>
      <Chart data={data}>
        <Interval x="genre" y="sold" />
      </Chart>
    </Canvas>
  </div>,
  document.getElementById('root')
);
```

**完整示例可参考**

- codesandbox: https://codesandbox.io/s/f-react-forked-lcrxqf
- https://github.com/antvis/FEngine/tree/master/packages/f-react/examples

# tutorial/framework/svg-renderer

---
title: 使用 svg 渲染
order: 16
---

借助 G 的 [渲染器](https://g.antv.antgroup.com/api/renderer/svg), F2 也可以使用 svg 渲染

### 安装依赖

```bash
npm i @antv/g-mobile-svg --save
```

### 定义渲染容器

```html
<div id="container"></div>
```

### 使用 svg renderer

```jsx
import { Canvas, Chart, Interval, jsx, Axis } from '@antv/f2';
import { Renderer } from '@antv/g-mobile-svg';

const container = document.getElementById('container');

// 实例化 svg 渲染器
const renderer = new Renderer();

...

const { props } = (
  // 生命渲染容器和渲染器
  <Canvas container={container} renderer={renderer} width={300} height={200}>
    {...}
  </Canvas>
);
const canvas = new Canvas(props);
canvas.render();
```

演示示例：https://codesandbox.io/s/prod-fire-nk4d8x

# tutorial/framework/vue

---
title: 如何在 Vue 中使用
order: 12
---

为了方便 Vue 项目的使用，Fengine 也封装了一个 vue 的组件

## Usage

### 1. 安装依赖

```bash
npm install @antv/f2 --save
npm install @antv/f-vue --save
```

### 2. 配置 F2 的 JSX 编译

```bash
npm install @babel/plugin-transform-react-jsx --save-dev
```

打开 `vue.config.js` 添加如下代码

```js
{
  chainWebpack: (config) => {
    config.module
      .rule('F2')
      .test(/\.jsx$/)
      .use('babel')
      .loader('babel-loader')
      .options({
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              runtime: 'automatic',
              importSource: '@antv/f2',
            },
          ],
        ],
      })
      .end();
  },
}
```

### 3. Vite 中配置

```bash
npm install @rollup/plugin-babel --save-dev
npm install @babel/plugin-transform-react-jsx --save-dev
```

打开 `vite.config.js` 添加如下配置

```js
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    babel({
      plugins: [
        [
          '@babel/plugin-transform-react-jsx',
          {
            runtime: 'automatic',
            importSource: '@antv/f2',
          },
        ],
      ],
    }),
    vue(),
    vueJsx(),
  ],
});
```

### 4. 使用示例

```vue
<script>
import { toRaw } from 'vue';
import Canvas from '@antv/f-vue';
import { Chart, Interval, Axis } from '@antv/f2';

const data1 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
const data2 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 50 },
  { genre: 'Other', sold: 50 },
];
export default {
  name: 'App',
  data() {
    return {
      year: '2021',
      chartData: data1,
    };
  },
  mounted() {
    setTimeout(() => {
      this.year = '2022';
      this.chartData = data2;
    }, 1000);
  },
  render() {
    const { year, chartData } = this;
    return (
      <div className="container">
        <Canvas pixelRatio={window.devicePixelRatio}>
          <Chart data={toRaw(chartData)}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      </div>
    );
  },
};
</script>

<style>
.container {
  width: 500px;
  height: 300px;
}
</style>
```

**完整示例可参考**

- codesandbox: https://codesandbox.io/s/f-vue-wlwtkb?file=/src/App.vue
- https://github.com/antvis/FEngine/tree/master/packages/f-vue/examples

# tutorial/getting-started

---
title: 快速上手
order: 0
---

## 声明式

F2 4.0 开始，我们将以声明式编写图表，声明式可以让你的代码更直观和简介，避免了复杂的 API 调用，而且我们也采用了 JSX 语法，不仅方便使用，还可以很方便地和 React、Vue 这些框架结合

## 组件化

为了构建复杂的可视化图表，组件是一种不可或缺的能力，在 F2 里，我们也参考 React 的设计模式，内置了一套完善的组件能力，能简单方便地分装自己的组件

## 快速开始

> 下面示例是以非 React 为演示的，如果项目已经是 React， 可以参考 [如何在 React 中使用](./framework/react)

### 配置 jsx transform

可见详细介绍：[配置 jsx transform](./framework/jsx-transform)

## 安装

### 通过 npm 安装

[![](https://img.shields.io/npm/v/@antv/f2.svg)](https://npmjs.com/package/@antv/f2) [![](https://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.com/package/@antv/f2)

```bash
npm install @antv/f2 --save
```

## 一分钟上手

### 1. 创建 canvas 标签

在页面上创建一个 `<canvas>`

```html
<canvas id="myChart" width="400" height="260"></canvas>
```

### 2. 编写代码

```jsx
// F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// 获取 canvas context
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

完成上述两步之后，保存文件并用浏览器打开，一张柱状图就绘制成功了：<br />![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/54ad3af8-c30d-43ca-b0e8-e21c4ea3d438.png)

## 更多示例

更多的示例直接查看 [Demo](/examples)。

# tutorial/grammar

---
title: 图形语法
order: 2
---

## 简介

F2 同 G2 一样，基于《The Grammar of Graphics》(Leland Wilkinson 著)一书所提的图形理论。该理论是一套用来描述所有统计图形深层特性的语法规则，该语法回答了『什么是统计图形』这一问题，以自底向上的方式组织最基本的元素形成更高级的元素。

所以对于 F2 来说，**没有具体的图表类型的概念，所有的图表都是通过组合不同的图形语法元素形成的**

## 数据

- 最基础的部分是你想要可视化的[数据](./data)以及一系列将数据中的变量对应到[绘图属性](./shape-attrs)的映射；

## 几何标记

- [几何标记](https://www.yuque.com/antv/f2/geometry)，可以理解为你在图表中实际看到的图形元素，如点、线、多边形等，每个几何标记对象含有多个图形属性，F2 图形语法的核心就是建立数据中的一系列变量到图形属性的映射；

## 度量

- [度量](./scale)，作为数据空间到图形属性空间的转换桥梁，每一个图形属性都对应着一个或者多个度量；

## 坐标系

- [坐标系](./coordinate)，描述了数据是如何映射到图形所在的平面的，一个几何标记在不同坐标系下会有不同的表现。目前 F2 提供了笛卡尔坐标系、极坐标系两种坐标系；

## 辅助元素

- 辅助元素是为了增强图表的可读性和可理解性，F2 中的辅助元素包含坐标轴 Axis、图例 Legend、提示信息 Tooltip、静态辅助标记 Guide。

所以，在 F2 中，我们通常这么描述一张图表：一张图表就是从数据到几何标记对象的图形属性的一个映射，此外图形中还可能包含数据的统计变换，最后绘制在某个特定的坐标系中。

更多内容请阅读以下篇章：

- [图表组成](./understanding)

- [数据](./data)

- [度量](./scale)

- [几何标记](../api/chart/geometry)

- [绘图属性](./shape-attrs)

- [坐标系](./coordinate)

# tutorial/graphic

---
title: 图形使用 - JSX
order: 9
---

在 F2 里，可以利用 JSX 和[图形标签 Shape](./shape.zh.md)更方便构造自定义图形。

```jsx
/** @jsx jsx */
import { jsx, Canvas } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const Hello = () => {
  return (
    <group>
      <rect
        style={{
          x: 10,
          y: 10,
          width: 40,
          height: 40,
          lineWidth: '2px',
          stroke: '#000',
          fill: 'red',
        }}
      />
      <circle style={{ x: 80, y: 30, r: 20, lineWidth: '2px', stroke: '#000', fill: 'red' }} />
      <text
        style={{
          x: 120,
          y: 30,
          text: '文本',
          fontSize: 20,
          fill: '#000',
        }}
      />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Hello />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

以上就可以利用标签绘制各种自定义元素。假如想让 Hello 走组件 Component 渲染，拥有生命周期，可以监测数据变化，可以参考下一章节[组件介绍-Component](./component.zh.md)

假如想保留 F2 组件的计算逻辑，只是自定义视觉 View 部分，可以参考[进阶-自定义 View](./advanced/custom-view.md)

# tutorial/question/with-react-typescript

---
title: 和 React 同时使用时，TS 类型报错
order: 1
---

当和 React 同时使用时，碰到 `group`, `circle`, `rect` 等这些标签的类型提示错误时，如下图所以 ![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/d5dd37c7-b7b8-415c-8675-f41de22715f1.png)

## 问题原因

因为 React svg 的标签类型里也有 `circle`， `rect` 等这些标签，这些和 F2 定义的冲突了，需要我们再单独引入 F2 标签定义的命名空间

## 解决方式

1. 先确定当前项目的 jsx 编译模式，打开 `tsconfig.json`
2. 找到 `compilerOptions` 下的 `jsx` 配置项，如果没有则默认为 `react`，`react` 为 [classic](/tutorial/jsx-transform#classic-1) 编译模式，`react-jsx` 为 [automatic](/tutorial/jsx-transform#automatic-1) 编译模式

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/bb848e34-451f-4819-909d-e31d09a122f8.png)

### 1. classic 编译模式

在文件顶部增加如下注释代码和模块引用

```jsx
/** @jsx jsx */
import { jsx } from '@antv/f2';
...
```

### 2. automatic 编译模式

在文件顶部增加如下注释代码

```jsx
/** @jsxImportSource @antv/f2 */
...
```

3. 完成后即可解决类型错误问题

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/57feeb7b-d1c3-4b40-ac52-dd1abb0d83c7.png)

## 注意事项

因为代码编译是以文件为单位的，在一个文件里只能使用一种标签类型，如果是在同一文件中的，需要再新建一个新的文件

# tutorial/scale

---
title: 度量 - Scale
order: 4
---

度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作。针对不同的数据类型对应不同类型的度量。

根据数据的类型，F2 支持以下几种度量类型：

- **identity**，常量类型的数值，也就是说数据的某个字段是不变的常量；

- **linear**，连续的数字 [1, 2, 3, 4, 5]；

- **cat**，分类, ['男','女']；

- **timeCat**，时间类型；

在 F2 的使用中，我们可以通过列定义来直接定义度量

```jsx
const data = [
  { a: 'a', b: 20 },
  { a: 'b', b: 12 },
  { a: 'c', b: 8 },
];
<Canvas>
  <Chart
    scale={{
      a: {
        type: 'cat', // 声明 a 字段的类型
      },
      b: {
        min: 0, // 手动指定最小值
        max: 100, // 手动指定最大值
      },
    }}
  ></Chart>
</Canvas>;
```

## 通用属性

下面列出的是通用的属性：

| **属性名** | **类型** | **说明** |
| --- | --- | --- |
| `type` | String | 指定不同的度量类型，支持的 type 为 `identity`、`linear`、`cat`、`timeCat`。 |
| `formatter` | Function | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、提示信息 tooltip 上的显示。 |
| `range` | Array | 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| `alias` | String | 该数据字段的显示别名，一般用于将字段的英文名称转换成中文名。 |
| `tickCount` | Number | 坐标轴上刻度点的个数，不同的度量类型对应不同的默认值。 |
| `ticks` | Array | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |

## Scale 对应的属性

### linear

| **属性名** | **类型** | **说明** |
| --- | --- | --- |
| `alias` | String | 别名。 |
| `nice` | Boolean | 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]。 |
| `min` | Number | 定义数值范围的最小值。 |
| `max` | Number | 定义数值范围的最大值。 |
| `range` | Array | 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| `formatter` | Function | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| `ticks` | Array | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
| `tickCount` | Number | 定义坐标轴刻度线的条数，默认为 5。 |
| `tickInterval` | Number | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。** |

### cat

| **属性名** | **类型** | **说明** |
| --- | --- | --- |
| `alias` | String | 别名。 |
| `range` | Array | 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| `formatter` | Function | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| `ticks` | Array | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
| `tickCount` | Number | 定义坐标轴刻度线的条数，默认为 5。 |
| `values` | Array | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系。 |
| `isRounding` | Boolean | 默认值为 `false`, 在计算 ticks 的时候是否允许取整以满足刻度之间的均匀分布，取整后可能会和用户设置的 tickCount 不符合。 |

`values` 属性常用于 2 个场景：

1. 需要制定分类的顺序时，例如：c 字段有'最大','最小'和'适中'3 种类型，我们想指定这些数值在坐标轴或者图例上的显示顺序时：

```javascript
const scale = {
  c: {
    type: 'cat',
    values: ['最小', '适中', '最大'],
  },
};
```

2. 数据字段中的数据是数值类型，但是需要转换成分类类型，**这个时候需要注意原始数据必须是索引值**。

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/e847832c-3000-4745-b7d5-d3552feee17b.png)

```javascript
const data = [
  { month: 0, tem: 7, city: 'Tokyo' },
  { month: 1, tem: 6.9, city: 'Tokyo' },
  { month: 2, tem: 9.5, city: 'Tokyo' },
  { month: 3, tem: 14.5, city: 'Tokyo' },
  { month: 4, tem: 18.2, city: 'Tokyo' },
  { month: 5, tem: 21.5, city: 'Tokyo' },
  { month: 6, tem: 25.2, city: 'Tokyo' },
];
const scale = {
  month: {
    type: 'cat',
    values: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'], // 这时候 month 的原始值是索引值
  },
};
```

### timeCat

时间分类类型，**默认会对数据做排序**。

| **属性名** | **类型** | **说明** |
| --- | --- | --- |
| `nice` | Boolean | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据。 |
| `mask` | String | 数据的格式化格式 默认：'YYYY-MM-DD'。 |
| `tickCount` | Number | 坐标点的个数，默认是 5。但不一定是准确值。 |
| `values` | Array | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系。 |
| `alias` | String | 别名。 |
| `range` | Array | 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| `formatter` | Function | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| `ticks` | Array | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
| `isRounding` | Boolean | 默认值为 `false`, 在计算 ticks 的时候是否允许取整以满足刻度之间的均匀分布，取整后可能会和用户设置的 tickCount 不符合。 |

**注意：`mask` 和 `formatter` 这两个属性不可共用，如果同时设置了，会根据 `formatter` 进行格式化，`mask` 属性将不生效。**

**性能小提示：**

当图表的数据源已经过排序，可以通过在列定义中设置 `sortable: false` 来提升性能，默认情况下，会对 timeCat 类型的度量进行数据排序操作。

```javascript
const scale = {
  [fieldName]: {
    type: 'timeCat',
    sortable: false,
  },
};
```

# tutorial/shape-attrs

---
title: 绘图属性 - Style
order: 7
---

F2 底层使用了 [G](https://g.antv.antgroup.com/api/basic/concept) 绘图引擎。本篇列出了常见的绘图属性，更多关于绘图以及绘图属性的使用请至 [G](https://g.antv.antgroup.com/) 中查看。

在 F2 中组件样式的定义全部直接使用 Style 统一的结构，例如 axis 的 label 样式、legend marker 样式、和其他自定义 shape 样式等等。

## 属性列表

### 位置属性

对于不同的图形，位置的几何意义也不同，例如：

- [Circle](/tutorial/shape#circle) [Arc](/tutorial/shape#arc) [Sector](/tutorial/shape#sector)为圆心位置，使用 [cx/cy](/tutorial/shape#circle)
- [Group](/tutorial/shape#group) [Rect](/tutorial/shape#rect)，[Image](/tutorial/shape#image) 为左上角顶点位置，使用 [x/y](/tutorial/shape#rect)
- [Text](/tutorial/shape#text) 为文本锚点位置
- [Line](/tutorial/shape#line)，[Polyline](/tutorial/shape#polyline)，[Polygon](/tutorial/shape#polygon)，[Path](/tutorial/shape#path) 为包围盒左上角顶点位置

| 属性名   | 描述                |
| -------- | ------------------- |
| `anchor` | 锚点，默认为 [0, 0] |

### 通用属性

| 属性名 | 描述 |
| ------ | ---- |

| `zIndex` | 控制图行显示层级。默认 0 |

| `clip` | 创建元素的可显示区域，区域内的部分显示，区域外的隐藏。参见(./shape-attrs#裁剪) |

| `visibility` | 控制图形的可见性。参见 [MDN]（https://developer.mozilla.org/en-US/docs/Web/CSS/visibility） |

| `opacity` | 设置图形和图片透明度的属性，默认值是 1。 数值的范围从 0.0 （完全透明）到 1.0 （完全不透明）。 |

| `fill` | 填充色、[渐变](./shape-attrs#渐变色)或[纹理](./shape-attrs#纹理)，默认值为空。 |

| `fillOpacity` | 用于设置图形填充颜色的透明度，默认值是 1。 |

| `stroke` | 描边色、[渐变](./shape-attrs#渐变色)或[纹理](./shape-attrs#纹理)，默认值为空； |

| `strokeOpacity` | 用于设置边颜色的透明度，默认值是 1。 |

| `shadowType` | 描述阴影类型，目前支持 'outer' 外阴影和 'inner' 内阴影 |

| `shadowColor` | 描述阴影颜色的属性，支持 String，暂不支持渐变或纹理，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowColor)。 |

| `shadowBlur` | 描述模糊效果程度的属性； 它既不对应像素值也不受当前转换矩阵的影响。 默认值是 0，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowBlur)。 |

| `shadowOffsetX` | 描述阴影水平偏移距离的属性，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX)。 |

| `shadowOffsetY` | 描述阴影垂直偏移距离的属性，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY)。 |

| `filter` | 滤镜，目前支持单个或多个滤镜叠加,支持 blur、brightness、drop-shadow、contrast、grayscale、saturate、sepia、hue-rotate、invert 几种滤镜效果。参见 [MDN]（https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/filter） |

| `cursor` | 鼠标样式。参见 [MDN]（https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor） |

### 线条属性

| 属性名 | 描述 |
| ------ | ---- |

| `lineCap` | Canvas 2D API 指定如何绘制每一条线段末端的属性。有 3 个可能的值，分别是：`butt`, `round` and `square`。默认值是 butt，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap). |

| `lineJoin` | Canvas 2D API 用来设置 2 个长度不为 0 的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为 0 的变形部分，其指定的末端和控制点在同一位置，会被忽略），参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin). | | `lineWidth` | Canvas 2D API 设置线段厚度的属性（即线段的宽度）。当获取属性值时，它可以返回当前的值（默认值是 1.0 ）。 当给属性赋值时， 0、 负数、 Infinity 和 NaN 都会被忽略；除此之外，都会被赋予一个新值，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineWidth). | | `miterLimit` | Canvas 2D API 设置斜接面限制比例的属性。 当获取属性值时， 会返回当前的值（默认值是 10.0 ）。当给属性赋值时， 0、负数、 Infinity 和 NaN 都会被忽略；除此之外都会被赋予一个新值。，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit). | | `lineDash` | 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。这个属性取决于浏览器是否支持 `setLineDash()` 函数，详情参考 [setLineDash](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash)。 |

### 文本属性

| 属性名 | 描述 |
| --- | --- |
| `textAlign` | 设置文本内容的当前对齐方式, 支持的属性：'start', 'center', 'end', 'left', 'right' |
| `textBaseline` | 设置在绘制文本时使用的当前文本基线, 支持的属性：'top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom' |
| `fontStyle` | 规定字体样式。可能的值：'normal', 'italic', 'oblique' |
| `fontSize` | 规定字号，以像素计 |
| `fontFamily` | 规定字体系列 |
| `fontWeight` | 规定字体的粗细。可能的值：'normal', 'bold', 'bolder', 'lighter', '100', '200, '300', '400','500', '600', '700', '800', '900' |
| `fontVariant` | 规定字体变体。可能的值：'normal', 'small-caps' |
| `lineHeight` | 规定行高，以像素计 |

## 渐变色

为了方便用户使用，F2 中提供与 css 中用法一致的渐变色使用方法，参见[MDN]（https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient），定义方式如下：

在 css 中，渐变通过函数创建，在下面例子中展示了目前支持的渐变效果，包括线性和径向渐变、多个渐变叠加等：

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*sXoJTKPWg70AAAAAAAAAAAAAARQnAQ" width="400" alt="gradient">

### 线性渐变

线性渐变指创建一个表示两种或多种颜色延某一方向线性变化。渐变方向在 CSS 中默认为从下到上，而我们为了和 Canvas / SVG 保持一致，使用从左到右，且可以多个渐变叠加。示例：

```javascript
// example
fill: 'linear-gradient(0deg, blue, green 40%, red)';
```

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*aU84RIJaH6AAAAAAAAAAAAAAARQnAQ" width="300" alt="linear gradient">

### 径向渐变

径向渐变指从图形中心发出的两种或者多种颜色之间的逐步过渡变化。

```javascript
// example
fill: 'radial-gradient(circle at center, red, blue, green 100%)';
```

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*Z4QLTr3lC80AAAAAAAAAAAAAARQnAQ" width="300" alt="radial gradient">

## 纹理

使用相同的图案填充图形，目前支持的 Pattern 可以是图片 URL，`HTMLImageElement`，`HTMLCanvasElement`，`HTMLVideoElement` 和 `Rect` 等，还可以指定重复方向：

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*cRmFTItZOtYAAAAAAAAAAAAAARQnAQ" width="400" alt="pattern">

支持参数如下：

```ts
interface Pattern {
  image: string | CanvasImageSource | Rect;
  repetition?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
  transform?: string;
}
```

使用方法：

```js
// example
// 使用纹理填充，在水平和垂直方向重复图片
fill: {
    image:'https://gw.alipayobjects.com/zos/rmsportal/ibtwzHXSxomqbZCPMLqS.png',
    repetition: 'repeat',
    transform: 'rotate(30deg)',
}
```

## 裁剪

参考 [CSS clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)。该属性值可以定义可视区域，可以是任意图形，例如 Circle、Rect 等等。同一个裁剪区域可以被多个图形共享使用，并且裁剪区域也会影响图形的拾取区域。

使用方法：

```js
<rect
  style={{
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    clip: {
      type: 'circle',
      style: {
        cx: 100,
        cy: 100,
        r: 50,
      },
    },
  }}
/>
```

## 历史用法

历史用法见 https://f2-v4.antv.visiondocs/tutorial/shape-attrs#渐变色

# tutorial/shape

---
title: 图形标签 - Shape
order: 6
---

F2 底层使用了 [G](https://g.antv.antgroup.com/api/basic/concept) 绘图引擎。本篇列出了常见的图形标签

## 如何使用

详见：[图形使用](/tutorial/graphic)

## 图形标签

- [group](#group) 分组
  - [rect](#rect) 矩形
  - [circle](#circle) 圆
  - [sector](#sector) 扇形
  - [polygon](#polygon) 多边形
  - [line](#line) 线
  - [arc](#arc) 圆弧
  - [polyline](#polyline) 多点线段
  - [text](#text) 文本
  - [image](#image) 图片

## 图形属性

### Props

| **属性名**  | **类型**  | **描述**                       |
| ----------- | --------- | ------------------------------ |
| `className` | String    | 对象标记，由用户指定           |
| `visible`   | Boolean   | 显示还是隐藏。                 |
| `zIndex`    | Number    | z-index 值，用于调整绘制顺序。 |
| `style`     | Style     | 图形样式                       |
| `animation` | Animation | 图形动画                       |
| `onPan` 等  | Event     | 图形事件                       |

### Style [绘图属性](/tutorial/shape-attrs)

更多详情可见：[绘图属性](/tutorial/shape-attrs)

### Animation [图形动画属性](/tutorial/animation)

更多详情可见：[图形动画属性](/tutorial/animation)

### Event [图形事件属性](/tutorial/event)

更多详情可见：[图形事件属性](/tutorial/event)

### 演示

- [图形标签](/site/examples/component/shape/demo/shape.jsx)

## group

包含一组图形

### 示例

```jsx
<group className="group">
  <rect ... />
  <rect ... />
</group>
```

## rect

矩形

### Style

| **属性名** | **类型**           | **描述**      |
| ---------- | ------------------ | ------------- |
| `x`        | Number             | 左上角 x 坐标 |
| `y`        | Number             | 左上角 y 坐标 |
| `width`    | Number             | 宽度          |
| `height`   | Number             | 高度          |
| `radius`   | Number \| Number[] | 圆角          |

### 示例

```jsx
<rect
  style={{ x: 100, y: 100, width: 50, height: 50, lineWidth: '2px', stroke: '#000', fill: 'red' }}
/>
```

## circle

圆形

### Style

| **属性名** | **类型** | **描述**     |
| ---------- | -------- | ------------ |
| `cx`       | Number   | 圆心 cx 坐标 |
| `cy`       | Number   | 圆心 cy 坐标 |
| `r`        | Number   | 圆的半径     |

### 示例

```jsx
<circle style={{ cx: 100, cy: 100, r: 50, lineWidth: '2px', stroke: '#000', fill: 'red' }} />
```

## sector

扇形

### Style

| **属性名**      | **类型**         | **描述**               |
| --------------- | ---------------- | ---------------------- |
| `cx`            | Number           | 圆心 cx 坐标           |
| `cy`            | Number           | 圆心 cy 坐标           |
| `r`             | Number           | 外半径                 |
| `r0`            | Number           | 内半径， 默认为 0      |
| `startAngle`    | Number \| String | 起始角度/弧度， 默认 0 |
| `endAngle`      | Number \| String | 结束角度/弧度，默认 0  |
| `anticlockwise` | Boolean          | 逆时针方向，默认 false |

### 示例

```jsx
<sector
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    startAngle: '0 rad',
    endAngle: '3.14 rad',
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>
```

## polygon

多边形

### Style

| **属性名** | **类型**           | **描述**   |
| ---------- | ------------------ | ---------- |
| `points`   | [Number, Number][] | 多边形的点 |

### 示例

```jsx
<polygon
  style={{
    points: [
      [10, 10],
      [50, 50],
      [30, 70],
    ],
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>
```

## line

绘制直线

### Style

| **属性名** | **类型** | **描述**      |
| ---------- | -------- | ------------- |
| `x1`       | Number   | 起始点 x 坐标 |
| `y1`       | Number   | 起始点 y 坐标 |
| `x2`       | Number   | 结束点 x 坐标 |
| `y2`       | Number   | 结束点 y 坐标 |

### 示例

```jsx
<line style={{ x1: 10, y1: 10, x2: 100, y2: 100, lineWidth: '2px', stroke: '#000' }} />
```

## arc

绘制圆弧

### Style

| **属性名**      | **类型**      | **描述**               |
| --------------- | ------------- | ---------------------- |
| `cx`            | Number        | 圆心 cx 坐标           |
| `cy`            | Number        | 圆心 cy 坐标           |
| `r`             | Number        | 半径                   |
| `startAngle`    | Number/String | 起始角度/弧度， 默认 0 |
| `endAngle`      | Number/String | 结束角度/弧度，默认 0  |
| `anticlockwise` | Boolean       | 逆时针方向，默认 false |

### 示例

```jsx
<arc
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    startAngle: 0,
    endAngle: 360,
    lineWidth: '2px',
    stroke: '#000',
  }}
/>
```

## polyline

多点线段

### Style

| **属性名** | **类型**           | **描述**                 |
| ---------- | ------------------ | ------------------------ |
| `Points`   | [Number, Number][] | 线段的点                 |
| `smooth`   | Boolean            | 是否需要平滑，默认 false |

### 示例

```jsx
<polyline
  style={{
    points: [
      [10, 10],
      [50, 50],
      [80, 70],
    ],
    lineWidth: '2px',
    stroke: '#000',
    smooth: true,
  }}
/>
```

## text

文本

### Style

| **属性名** | **类型** | **描述** |
| --- | --- | --- |
| `x` | Number | 文本位置 |
| `y` | Number | 文本位置 |
| `text` | String | 文本内容 |
| `textAlign` | String | 设置文本内容的当前对齐方式, 支持的属性：'start', 'center', 'end', 'left', 'right' |
| `textBaseline` | String | 设置在绘制文本时使用的当前文本基线, 支持的属性：'top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom' |
| `fontStyle` | String | 规定字体样式。可能的值：'normal', 'italic', 'oblique' |
| `fontSize` | Number | 规定字号，以像素计 |
| `fontFamily` | String | 规定字体系列 |
| `fontWeight` | String | 规定字体的粗细。可能的值：'normal', 'bold', 'bolder', 'lighter', '100', '200, '300', '400','500', '600', '700', '800', '900' |
| `fontVariant` | String | 规定字体变体。可能的值：'normal', 'small-caps' |
| `lineHeight` | Number | 规定行高，以像素计 |

### 示例

```jsx
<text
  style={{
    text: '文本',
    fontSize: 20,
    fill: '#000',
  }}
/>
```

## image

图片

### Style

| **属性名**   | **类型** | **描述**                                   |
| ------------ | -------- | ------------------------------------------ |
| `x`          | Number   | 左上角 x 坐标                              |
| `y`          | Number   | 左上角 y 坐标                              |
| `width`      | Number   | 宽度                                       |
| `height`     | Number   | 高度                                       |
| `src`        | string   | 图片 url                                   |
| `cacheImage` | boolean  | 是否需要缓存(如果图片有闪动，可以添加缓存) |

### 示例

```jsx
<image
  style={{
    src: 'https://f2.antv.vision/favicon-32x32.png?v=9772447a8d07a8fe19894b5176c6cb0d',
    x: 10,
    y: 10,
    width: 32,
    height: 32,
  }}
/>
```

# tutorial/understanding

---
title: 图表组成
order: 1
---

为了更好得使用 F2 进行数据可视化，我们需要了解 F2 图表的组成以及相关术语。

## 图表部件

一般情况下，F2 的图表包含坐标轴（Axis）、几何标记（Geometry）、提示信息（Tooltip）、图例（Legend）等，另外还可以包括辅助标记（Guide）、数据标签（dataLabels）等。

F2 基本组成部分如下图所示：

![](https://gw.alipayobjects.com/zos/rmsportal/tpfdzWDYmxzHkquTihJe.png#width=600) ![](https://gw.alipayobjects.com/zos/rmsportal/lUqXwLjgRWhugemcNsqc.png#width=600)

## 术语
| **术语** | **英文** | **描述** |
| --- | --- | --- |
| 坐标轴 | Axis | 每个图表通常包含两个坐标轴，在直角坐标系（笛卡尔坐标系）下，分别为 x 轴和 y 轴，在极坐标轴下，则分别由角度和半径 2 个维度构成。每个坐标轴由坐标轴线（line）、刻度线（tickLine）、刻度文本（label）以及网格线（grid）组成。 |
| 图例 | Legend | 图例作为图表的辅助元素，用于标定不同的数据类型以及数据的范围，用于辅助阅读图表以及帮助用户在图表中进行数据的筛选过滤。 |
| 几何标记 | Geometry | 即我们所说的点、线、面这些几何图形，在图形语法 中几何标记的类型决定了生成图表的类型。也就是数据被可视化后的实际表现，不同的几何标记都包含对应的图形属性。 |
| 图形属性 | Attribute | 图形属性对应视觉编码中的视觉通道，是图形语法元素非常重要和灵活的一部分，不同的几何标记拥有自己的图形属性，F2 提供了位置（position）、颜色（color）、大小（size）、形状（shape）这四种图形属性。 |
| 坐标系 | Coordinate | 坐标系是将两种位置标度结合在一起组成的 2 维定位系统，描述了数据是如何映射到图形所在的平面。 |
| 提示信息 | Tooltip | 当鼠标悬停在某个点上时，会以提示框的形式显示当前点对应的数据的信息，比如该点的值，数据单位等，帮助用户从图表中获取具体的数据信息。 |
| 辅助标记 | Guide | 当需要在图表上绘制一些辅助线、辅助框或者文本时，比如增加预警线、最高值线或者标示明显的范围区域时，辅助标记 Guide 是非常有用的工具。 |
