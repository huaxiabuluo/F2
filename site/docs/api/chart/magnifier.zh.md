---
title: 放大镜 - Magnifier
type: 组件
order: 11
---

Magnifier 组件用于在图表上提供局部放大功能，帮助用户更清晰地查看数据细节。通过圆形放大镜显示聚焦区域的数据点。

## 何时使用

- 数据点过于密集，需要查看局部细节
- 需要放大特定区域进行详细分析
- 需要突出显示某段数据范围

## TypeScript 类型定义

```typescript
interface MagnifierProps {
  /** 放大镜聚焦的数据范围索引 [startIndex, endIndex] */
  focusRange: [number, number];
  /** 放大镜半径，支持 px 单位或数字 */
  radius?: number | string;
  /** 放大镜中心位置 [x, y] */
  position?: [number, number] | [string, string];
  /** 放大镜 X 轴偏移量 */
  offsetX?: number | string;
  /** 放大镜 Y 轴偏移量 */
  offsetY?: number | string;
  /** 辅助线样式 */
  lineStyle?: {
    [key: string]: any;
  };
  /** 外框样式 */
  frameStyle?: {
    [key: string]: any;
  };
  /** 辅助线配置 */
  referenceLines?: Array<{
    records: any;
    style?: {
      stroke?: string;
      lineWidth?: number;
      lineDash?: number[];
    };
  }>;
}
```

## Usage

```jsx
import { Canvas, Chart, Line, Magnifier } from '@antv/f2';

const data = [
  { date: '2024-01-01', value: 10 },
  { date: '2024-01-02', value: 15 },
  { date: '2024-01-03', value: 8 },
  { date: '2024-01-04', value: 25 },
  { date: '2024-01-05', value: 30 },
  { date: '2024-01-06', value: 28 },
  { date: '2024-01-07', value: 35 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[2, 5]}
      radius="60px"
      position={['80%', '30%']}
    />
  </Chart>
</Canvas>
```

## Props

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `focusRange` | `[number, number]` | - | 放大镜聚焦的数据范围索引 [startIndex, endIndex]，必填 |
| `radius` | `number \| string` | `'50px'` | 放大镜半径，支持像素值（如 `'50px'`）或数字 |
| `position` | `[number, number] \| [string, string]` | 右上角 | 放大镜中心位置，支持像素值或百分比 |

### 偏移配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `offsetX` | `number \| string` | `0` | 放大镜 X 轴偏移量 |
| `offsetY` | `number \| string` | `0` | 放大镜 Y 轴偏移量 |

### 样式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lineStyle` | `object` | - | 放大镜内数据线条的样式配置 |
| `frameStyle` | `object` | - | 放大镜外框的样式配置 |

### 辅助线配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `referenceLines` | `array` | - | 辅助线配置数组，每条线包含数据点和样式 |

**referenceLines 配置**：

```typescript
interface ReferenceLine {
  /** 辅助线经过的数据记录 */
  records: any;
  /** 辅助线样式 */
  style?: {
    stroke?: string;
    lineWidth?: number;
    lineDash?: number[];
  };
}
```

## 用法示例

### 基础放大镜

指定聚焦范围，显示放大镜：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier focusRange={[3, 6]} />
  </Chart>
</Canvas>
```

### 自定义大小和位置

设置放大镜的半径和显示位置：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[2, 5]}
      radius="80px"
      position={['80%', '30%']}
    />
  </Chart>
</Canvas>
```

### 使用偏移量调整位置

通过偏移量微调放大镜位置：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[2, 5]}
      radius="60px"
      offsetX="20px"
      offsetY="-10px"
    />
  </Chart>
</Canvas>
```

### 自定义样式

设置放大镜外框和数据线条的样式：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[2, 5]}
      frameStyle={{
        stroke: '#1890ff',
        lineWidth: '3px',
      }}
      lineStyle={{
        stroke: '#1890ff',
        lineWidth: '6px',
      }}
    />
  </Chart>
</Canvas>
```

### 添加辅助线

在放大镜中显示参考线（如平均值线）：

```jsx
// 计算平均值
const avgValue = data.reduce((sum, d) => sum + d.value, 0) / data.length;

<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[1, 6]}
      referenceLines={[
        {
          records: data.map(d => ({ ...d, value: avgValue })),
          style: {
            stroke: '#ff6b6b',
            lineWidth: '3px',
            lineDash: [5, 5],
          },
        },
      ]}
    />
  </Chart>
</Canvas>
```

### 多条数据对比

在放大镜中同时显示多条数据线：

```jsx
const data1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 15 }];
const data2 = [{ x: 1, y: 8 }, { x: 2, y: 18 }, { x: 3, y: 12 }];

<Canvas context={context}>
  <Chart>
    <Line data={data1} x="x" y="y" color="#1890ff" />
    <Line data={data2} x="x" y="y" color="#52c41a" />
    <Magnifier focusRange={[1, 2]} />
  </Chart>
</Canvas>
```

### 固定位置放大镜

将放大镜固定在图表的特定位置：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[0, 4]}
      radius="50px"
      position={[200, 150]}
    />
  </Chart>
</Canvas>
```

## 常见问题

### 放大镜不显示

确保设置了 `focusRange` 属性，这是必填项：

```jsx
// 错误：缺少 focusRange
<Magnifier radius="60px" />

// 正确：包含 focusRange
<Magnifier focusRange={[2, 5]} radius="60px" />
```

### 放大镜位置不在预期位置

检查 `position` 和 `offsetX/offsetY` 的值。注意 position 是放大镜**中心点**的位置：

```jsx
// 如果希望放大镜在右上角
<Magnifier
  focusRange={[2, 5]}
  position={['90%', '20%']}
/>
```

### 放大镜显示的数据不对

检查 `focusRange` 的索引是否正确。索引从 0 开始，表示数据在数组中的位置：

```jsx
// 假设数据有 10 条
// focusRange={[0, 4]} 显示前 5 条（索引 0-4）
// focusRange={[5, 9]} 显示后 5 条（索引 5-9）
<Magnifier focusRange={[0, 4]} />
```

### 辅助线不显示

确保 `referenceLines` 中的 `records` 包含正确格式的数据，并且数据字段与图表的 x/y 字段匹配：

```jsx
<Magnifier
  focusRange={[1, 5]}
  referenceLines={[
    {
      records: data.map(d => ({ ...d, value: maxValue })),
      style: { stroke: '#ff6b6b' },
    },
  ]}
/>
```

### 样式不生效

检查 `frameStyle` 和 `lineStyle` 中的属性名是否正确：

```jsx
<Magnifier
  focusRange={[2, 5]}
  frameStyle={{
    stroke: '#1890ff',      // 正确
    lineWidth: '3px',       // 正确（字符串类型）
    // strokeWidth: 3       // 错误
  }}
  lineStyle={{
    stroke: '#52c41a',
    lineWidth: '6px',
  }}
/>
```

## 注意事项

1. **focusRange 必填**：必须指定聚焦范围，否则放大镜无法显示
2. **索引从 0 开始**：focusRange 的索引是基于数据数组的索引
3. **radius 支持两种格式**：可以是数字（像素）或带单位的字符串（如 `'50px'`）
4. **position 是中心点**：position 坐标是放大镜圆形的中心位置
5. **多坐标系**：如果有多个坐标系，放大镜默认使用第一个坐标系的图形
