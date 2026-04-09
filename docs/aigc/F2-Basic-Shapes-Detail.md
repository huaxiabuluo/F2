# @antv/F2 基础图形详细文档

本文档详细介绍 F2 底层基础图形的使用方法。这些基础图形来自 @antv/F-Engine 和 @antv/G，可以用于自定义可视化组件。

## 目录

1. [基础图形概述](#基础图形概述)
2. [图形容器](#图形容器)
3. [基础形状](#基础形状)
4. [图形属性](#图形属性)
5. [高级用法](#高级用法)

---

## 基础图形概述

F2 基于 F-Engine 和 G 图形库，提供了一套完整的基础图形绘制能力。这些基础图形可以通过 JSX 语法直接使用。

### 依赖层次

```
基础图形 (rect, circle, text, line, ...)
    ↓ 由 F-Engine 提供
F-Engine (渲染引擎)
    ↓ 基于 @antv/G
@antv/G (图形库)
```

### 使用方式

基础图形可以直接在 Canvas 中使用：

```jsx
import { Canvas } from '@antv/f2';

<Canvas context={context}>
  <group>
    <rect attrs={{ x: 10, y: 10, width: 100, height: 50, fill: 'red' }} />
    <circle attrs={{ cx: 200, cy: 35, r: 25, fill: 'blue' }} />
    <text attrs={{ x: 300, y: 35, text: 'Hello F2', fill: 'black' }} />
  </group>
</Canvas>
```

---

## 图形容器

### group - 分组容器

group 用于组织和管理多个图形元素，支持整体变换和样式设置。

#### 属性

```typescript
interface GroupProps {
  attrs?: {
    clip?: any;              // 裁剪区域
    matrix?: number[];       // 变换矩阵
    opacity?: number;        // 透明度 [0, 1]
    zIndex?: number;         // 层级
  };
  style?: any;               // 样式对象
  animation?: any;           // 动画配置
  children?: any;            // 子元素
}
```

#### 使用示例

```jsx
// 1. 基础分组
<group>
  <rect attrs={{ x: 0, y: 0, width: 100, height: 100, fill: 'red' }} />
  <circle attrs={{ cx: 50, cy: 50, r: 30, fill: 'blue' }} />
</group>

// 2. 带变换的分组（平移、缩放、旋转）
<group 
  attrs={{
    matrix: [
      Math.cos(angle), Math.sin(angle), -Math.sin(angle), 
      Math.cos(angle), translateX, translateY
    ]
  }}
>
  <rect attrs={{ x: 0, y: 0, width: 100, height: 100, fill: 'red' }} />
</group>

// 3. 带透明度的分组
<group attrs={{ opacity: 0.5 }}>
  <rect attrs={{ x: 0, y: 0, width: 100, height: 100, fill: 'red' }} />
  <rect attrs={{ x: 20, y: 20, width: 100, height: 100, fill: 'blue' }} />
</group>

// 4. 带裁剪的分组
<group 
  attrs={{
    clip: {
      type: 'circle',
      attrs: { cx: 50, cy: 50, r: 50 }
    }
  }}
>
  <rect attrs={{ x: 0, y: 0, width: 100, height: 100, fill: 'red' }} />
</group>
```

---

## 基础形状

### rect - 矩形

用于绘制矩形和圆角矩形。

#### 属性

```typescript
interface RectProps {
  attrs: {
    x: number | string;           // 左上角 x 坐标
    y: number | string;           // 左上角 y 坐标
    width: number | string;       // 宽度
    height: number | string;      // 高度
    radius?: number | number[];   // 圆角半径
    fill?: string;                // 填充颜色
    stroke?: string;              // 描边颜色
    lineWidth?: number | string;  // 描边宽度
    lineDash?: number[];          // 虚线样式
    opacity?: number;             // 透明度
    shadowColor?: string;         // 阴影颜色
    shadowBlur?: number;          // 阴影模糊度
    shadowOffsetX?: number;       // 阴影 x 偏移
    shadowOffsetY?: number;       // 阴影 y 偏移
  };
  animation?: any;                // 动画配置
}
```

#### 使用示例

```jsx
// 1. 基础矩形
<rect 
  attrs={{
    x: '10px',
    y: '10px',
    width: '100px',
    height: '50px',
    fill: 'red'
  }} 
/>

// 2. 圆角矩形
<rect 
  attrs={{
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    radius: 10,         // 统一圆角
    fill: 'blue'
  }} 
/>

// 3. 不同圆角
<rect 
  attrs={{
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    radius: [10, 5, 10, 5],  // [左上, 右上, 右下, 左下]
    fill: 'green'
  }} 
/>

// 4. 带描边的矩形
<rect 
  attrs={{
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    fill: 'white',
    stroke: 'black',
    lineWidth: 2
  }} 
/>

// 5. 虚线矩形
<rect 
  attrs={{
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    stroke: 'black',
    lineWidth: 2,
    lineDash: [5, 5]    // [实线长度, 间隔长度]
  }} 
/>

// 6. 带阴影的矩形
<rect 
  attrs={{
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    fill: 'red',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5
  }} 
/>

// 7. 渐变填充
<rect 
  attrs={{
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    fill: 'l(0) 0:#ffffff 1:#1890FF'  // 线性渐变
  }} 
/>

<rect 
  attrs={{
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    fill: 'r(0.5, 0.5, 1) 0:#ffffff 1:#1890FF'  // 径向渐变
  }} 
/>
```

### circle - 圆形

用于绘制圆形。

#### 属性

```typescript
interface CircleProps {
  attrs: {
    cx: number | string;          // 圆心 x 坐标
    cy: number | string;          // 圆心 y 坐标
    r: number | string;           // 半径
    fill?: string;                // 填充颜色
    stroke?: string;              // 描边颜色
    lineWidth?: number | string;  // 描边宽度
    opacity?: number;             // 透明度
    // ... 其他通用图形属性
  };
}
```

#### 使用示例

```jsx
// 1. 基础圆形
<circle 
  attrs={{
    cx: '50px',
    cy: '50px',
    r: '30px',
    fill: 'red'
  }} 
/>

// 2. 空心圆
<circle 
  attrs={{
    cx: 100,
    cy: 100,
    r: 40,
    stroke: 'blue',
    lineWidth: 3,
    fill: 'transparent'
  }} 
/>

// 3. 渐变圆
<circle 
  attrs={{
    cx: 100,
    cy: 100,
    r: 50,
    fill: 'r(0.5, 0.5, 1) 0:#ffffff 1:#ff0000'
  }} 
/>
```

### line - 直线

用于绘制直线。

#### 属性

```typescript
interface LineProps {
  attrs: {
    x1: number | string;          // 起点 x 坐标
    y1: number | string;          // 起点 y 坐标
    x2: number | string;          // 终点 x 坐标
    y2: number | string;          // 终点 y 坐标
    stroke?: string;              // 线条颜色
    lineWidth?: number | string;  // 线条宽度
    lineCap?: 'butt' | 'round' | 'square';  // 线条端点样式
    lineDash?: number[];          // 虚线样式
    opacity?: number;             // 透明度
  };
}
```

#### 使用示例

```jsx
// 1. 基础直线
<line 
  attrs={{
    x1: '10px',
    y1: '10px',
    x2: '100px',
    y2: '100px',
    stroke: 'black',
    lineWidth: '2px'
  }} 
/>

// 2. 虚线
<line 
  attrs={{
    x1: 10,
    y1: 50,
    x2: 200,
    y2: 50,
    stroke: 'red',
    lineWidth: 2,
    lineDash: [5, 5]
  }} 
/>

// 3. 不同端点样式
<line 
  attrs={{
    x1: 10,
    y1: 100,
    x2: 200,
    y2: 100,
    stroke: 'blue',
    lineWidth: 10,
    lineCap: 'round'
  }} 
/>
```

### polyline - 折线

用于绘制折线（多条连续的线段）。

#### 属性

```typescript
interface PolylineProps {
  attrs: {
    points: Array<[number | string, number | string]>;  // 点数组
    stroke?: string;              // 线条颜色
    lineWidth?: number | string;  // 线条宽度
    lineCap?: string;             // 线条端点样式
    lineJoin?: 'miter' | 'round' | 'bevel';  // 转折点样式
    lineDash?: number[];          // 虚线样式
    smooth?: boolean;             // 是否平滑
    fill?: string;                // 填充颜色（闭合路径）
  };
}
```

#### 使用示例

```jsx
// 1. 基础折线
<polyline 
  attrs={{
    points: [
      ['10px', '10px'],
      ['50px', '50px'],
      ['100px', '30px'],
      ['150px', '70px']
    ],
    stroke: 'red',
    lineWidth: '2px'
  }} 
/>

// 2. 平滑曲线
<polyline 
  attrs={{
    points: [
      [10, 100],
      [50, 50],
      [100, 80],
      [150, 40]
    ],
    stroke: 'blue',
    lineWidth: 2,
    smooth: true
  }} 
/>

// 3. 填充的折线（形成区域）
<polyline 
  attrs={{
    points: [
      [10, 100],
      [50, 50],
      [100, 80],
      [10, 100]  // 闭合路径
    ],
    stroke: 'green',
    lineWidth: 2,
    fill: 'rgba(0, 255, 0, 0.3)'
  }} 
/>

// 4. 不同转折点样式
<polyline 
  attrs={{
    points: [
      [10, 150],
      [50, 100],
      [100, 150]
    ],
    stroke: 'purple',
    lineWidth: 10,
    lineJoin: 'round'
  }} 
/>
```

### polygon - 多边形

用于绘制多边形。

#### 属性

```typescript
interface PolygonProps {
  attrs: {
    points: Array<[number | string, number | string]>;  // 点数组（自动闭合）
    fill?: string;                // 填充颜色
    stroke?: string;              // 描边颜色
    lineWidth?: number | string;  // 描边宽度
    opacity?: number;             // 透明度
  };
}
```

#### 使用示例

```jsx
// 1. 三角形
<polygon 
  attrs={{
    points: [
      [50, 10],
      [10, 90],
      [90, 90]
    ],
    fill: 'red'
  }} 
/>

// 2. 五角星（通过点坐标）
<polygon 
  attrs={{
    points: [
      [50, 0],
      [61, 35],
      [98, 35],
      [68, 57],
      [79, 91],
      [50, 70],
      [21, 91],
      [32, 57],
      [2, 35],
      [39, 35]
    ],
    fill: 'yellow',
    stroke: 'orange',
    lineWidth: 2
  }} 
/>

// 3. 六边形
<polygon 
  attrs={{
    points: [
      [50, 10],
      [85, 30],
      [85, 70],
      [50, 90],
      [15, 70],
      [15, 30]
    ],
    fill: 'blue',
    opacity: 0.7
  }} 
/>
```

### text - 文本

用于绘制文本。

#### 属性

```typescript
interface TextProps {
  attrs: {
    x: number | string;           // x 坐标
    y: number | string;           // y 坐标
    text: string;                 // 文本内容
    fontSize?: number | string;   // 字体大小
    fontFamily?: string;          // 字体
    fontWeight?: string | number; // 字体粗细
    fontStyle?: 'normal' | 'italic';  // 字体样式
    textAlign?: 'left' | 'center' | 'right' | 'start' | 'end';  // 对齐方式
    textBaseline?: 'top' | 'middle' | 'bottom' | 'alphabetic' | 'hanging';  // 基线
    fill?: string;                // 填充颜色
    stroke?: string;              // 描边颜色
    lineWidth?: number;           // 描边宽度
    rotate?: number;              // 旋转角度（弧度）
    opacity?: number;             // 透明度
  };
}
```

#### 使用示例

```jsx
// 1. 基础文本
<text 
  attrs={{
    x: '10px',
    y: '30px',
    text: 'Hello F2',
    fontSize: '20px',
    fill: 'black'
  }} 
/>

// 2. 自定义字体
<text 
  attrs={{
    x: 10,
    y: 50,
    text: 'Custom Font',
    fontSize: 24,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 'blue'
  }} 
/>

// 3. 文本对齐
<text 
  attrs={{
    x: 100,
    y: 100,
    text: 'Center Aligned',
    fontSize: 16,
    textAlign: 'center',
    textBaseline: 'middle',
    fill: 'red'
  }} 
/>

// 4. 旋转文本
<text 
  attrs={{
    x: 150,
    y: 150,
    text: 'Rotated Text',
    fontSize: 18,
    fill: 'green',
    rotate: Math.PI / 4  // 45度
  }} 
/>

// 5. 描边文本
<text 
  attrs={{
    x: 10,
    y: 200,
    text: 'Stroke Text',
    fontSize: 30,
    fill: 'white',
    stroke: 'black',
    lineWidth: 2
  }} 
/>

// 6. 渐变文本
<text 
  attrs={{
    x: 10,
    y: 250,
    text: 'Gradient Text',
    fontSize: 40,
    fill: 'l(0) 0:#ff0000 1:#0000ff'
  }} 
/>
```

### arc - 圆弧

用于绘制圆弧或扇形。

#### 属性

```typescript
interface ArcProps {
  attrs: {
    cx: number | string;          // 圆心 x 坐标
    cy: number | string;          // 圆心 y 坐标
    r: number | string;           // 半径
    startAngle: number;           // 起始角度（弧度）
    endAngle: number;             // 结束角度（弧度）
    anticlockwise?: boolean;      // 是否逆时针
    fill?: string;                // 填充颜色
    stroke?: string;              // 描边颜色
    lineWidth?: number | string;  // 描边宽度
  };
}
```

#### 使用示例

```jsx
// 1. 基础圆弧
<arc 
  attrs={{
    cx: '100px',
    cy: '100px',
    r: '50px',
    startAngle: 0,
    endAngle: Math.PI,
    stroke: 'blue',
    lineWidth: '2px'
  }} 
/>

// 2. 扇形
<arc 
  attrs={{
    cx: 100,
    cy: 100,
    r: 60,
    startAngle: 0,
    endAngle: Math.PI / 2,
    fill: 'red'
  }} 
/>

// 3. 环形
<arc 
  attrs={{
    cx: 100,
    cy: 100,
    r: 80,
    startAngle: 0,
    endAngle: Math.PI * 2,
    stroke: 'green',
    lineWidth: 20
  }} 
/>
```

### sector - 扇形

用于绘制扇形（饼图的一部分）。

#### 属性

```typescript
interface SectorProps {
  attrs: {
    cx: number | string;          // 圆心 x 坐标
    cy: number | string;          // 圆心 y 坐标
    r: number | string;           // 外半径
    r0?: number | string;         // 内半径（环形）
    startAngle: number;           // 起始角度（弧度）
    endAngle: number;             // 结束角度（弧度）
    fill?: string;                // 填充颜色
    stroke?: string;              // 描边颜色
    lineWidth?: number | string;  // 描边宽度
  };
}
```

#### 使用示例

```jsx
// 1. 基础扇形
<sector 
  attrs={{
    cx: 100,
    cy: 100,
    r: 80,
    startAngle: 0,
    endAngle: Math.PI / 2,
    fill: 'blue'
  }} 
/>

// 2. 环形扇形
<sector 
  attrs={{
    cx: 100,
    cy: 100,
    r: 80,
    r0: 40,
    startAngle: 0,
    endAngle: Math.PI,
    fill: 'red'
  }} 
/>
```

### ellipse - 椭圆

用于绘制椭圆。

#### 属性

```typescript
interface EllipseProps {
  attrs: {
    cx: number | string;          // 圆心 x 坐标
    cy: number | string;          // 圆心 y 坐标
    rx: number | string;          // x 轴半径
    ry: number | string;          // y 轴半径
    fill?: string;                // 填充颜色
    stroke?: string;              // 描边颜色
    lineWidth?: number | string;  // 描边宽度
  };
}
```

#### 使用示例

```jsx
// 基础椭圆
<ellipse 
  attrs={{
    cx: 100,
    cy: 100,
    rx: 80,
    ry: 50,
    fill: 'purple'
  }} 
/>
```

### image - 图片

用于绘制图片。

#### 属性

```typescript
interface ImageProps {
  attrs: {
    x: number | string;           // 左上角 x 坐标
    y: number | string;           // 左上角 y 坐标
    width: number | string;       // 宽度
    height: number | string;      // 高度
    src: string;                  // 图片 URL
    opacity?: number;             // 透明度
  };
}
```

#### 使用示例

```jsx
// 1. 基础图片
<image 
  attrs={{
    x: 10,
    y: 10,
    width: 200,
    height: 150,
    src: 'https://example.com/image.png'
  }} 
/>

// 2. 带透明度的图片
<image 
  attrs={{
    x: 10,
    y: 10,
    width: 200,
    height: 150,
    src: 'https://example.com/image.png',
    opacity: 0.5
  }} 
/>
```

### path - 路径

用于绘制复杂路径。

#### 属性

```typescript
interface PathProps {
  attrs: {
    path: string;                 // SVG path 字符串
    fill?: string;                // 填充颜色
    stroke?: string;              // 描边颜色
    lineWidth?: number | string;  // 描边宽度
  };
}
```

#### 使用示例

```jsx
// 1. 基础路径
<path 
  attrs={{
    path: 'M 10 10 L 100 10 L 100 100 Z',
    fill: 'red'
  }} 
/>

// 2. 复杂路径（心形）
<path 
  attrs={{
    path: 'M 50 20 C 50 10, 30 10, 30 25 C 30 35, 50 50, 50 60 C 50 50, 70 35, 70 25 C 70 10, 50 10, 50 20 Z',
    fill: 'pink',
    stroke: 'red',
    lineWidth: 2
  }} 
/>
```

---

## 图形属性

### 通用属性

所有基础图形都支持以下通用属性：

#### 填充和描边

```jsx
fill: string              // 填充颜色
stroke: string            // 描边颜色
lineWidth: number         // 描边宽度
lineDash: number[]        // 虚线样式 [实线长度, 间隔长度]
lineCap: string           // 线条端点样式：'butt' | 'round' | 'square'
lineJoin: string          // 线条转折样式：'miter' | 'round' | 'bevel'
opacity: number           // 透明度 [0, 1]
```

#### 阴影

```jsx
shadowColor: string       // 阴影颜色
shadowBlur: number        // 阴影模糊度
shadowOffsetX: number     // 阴影 x 偏移
shadowOffsetY: number     // 阴影 y 偏移
```

#### 渐变

F2 支持线性渐变和径向渐变：

```jsx
// 线性渐变：l(angle) stop1:color1 stop2:color2 ...
fill: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
fill: 'l(90) 0:#ffffff 1:#1890ff'  // 垂直渐变

// 径向渐变：r(x, y, radius) stop1:color1 stop2:color2 ...
fill: 'r(0.5, 0.5, 1) 0:#ffffff 1:#1890ff'
```

### 变换属性

可以通过 matrix 属性进行图形变换：

```jsx
matrix: [a, b, c, d, e, f]
// a, d: 缩放
// b, c: 倾斜
// e, f: 平移
```

常用变换：

```jsx
// 平移
matrix: [1, 0, 0, 1, translateX, translateY]

// 缩放
matrix: [scaleX, 0, 0, scaleY, 0, 0]

// 旋转
const angle = Math.PI / 4;
matrix: [Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0, 0]
```

---

## 高级用法

### 自定义组件

使用基础图形创建自定义组件：

```jsx
import { Component } from '@antv/f2';

class CustomShape extends Component {
  render() {
    const { x, y, size, color } = this.props;
    
    return (
      <group>
        <circle 
          attrs={{
            cx: x,
            cy: y,
            r: size,
            fill: color
          }} 
        />
        <text 
          attrs={{
            x: x,
            y: y,
            text: 'Custom',
            fontSize: 12,
            textAlign: 'center',
            textBaseline: 'middle',
            fill: 'white'
          }} 
        />
      </group>
    );
  }
}

// 使用
<Canvas context={context}>
  <CustomShape x={100} y={100} size={50} color="blue" />
</Canvas>
```

### 动画

基础图形支持动画：

```jsx
<rect 
  attrs={{
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    fill: 'red'
  }}
  animation={{
    appear: {
      easing: 'linear',
      duration: 1000,
      property: ['x', 'y'],
      start: { x: 0, y: 0 },
      end: { x: 10, y: 10 }
    }
  }}
/>
```

### 事件处理

基础图形可以绑定事件：

```jsx
<rect 
  attrs={{
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    fill: 'red'
  }}
  onClick={(ev) => {
    console.log('clicked', ev);
  }}
  onTouchStart={(ev) => {
    console.log('touch start', ev);
  }}
/>
```

### 组合示例

创建复杂的自定义图形：

```jsx
<Canvas context={context}>
  <group>
    {/* 背景 */}
    <rect 
      attrs={{
        x: 0,
        y: 0,
        width: 300,
        height: 200,
        fill: 'l(90) 0:#f0f0f0 1:#ffffff'
      }} 
    />
    
    {/* 卡片 */}
    <group attrs={{ matrix: [1, 0, 0, 1, 20, 20] }}>
      <rect 
        attrs={{
          x: 0,
          y: 0,
          width: 260,
          height: 160,
          radius: 8,
          fill: 'white',
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }} 
      />
      
      {/* 标题 */}
      <text 
        attrs={{
          x: 20,
          y: 30,
          text: '自定义卡片',
          fontSize: 20,
          fontWeight: 'bold',
          fill: '#333'
        }} 
      />
      
      {/* 内容 */}
      <text 
        attrs={{
          x: 20,
          y: 60,
          text: '这是使用基础图形创建的自定义内容',
          fontSize: 14,
          fill: '#666'
        }} 
      />
      
      {/* 图标 */}
      <circle 
        attrs={{
          cx: 220,
          cy: 120,
          r: 20,
          fill: 'l(0) 0:#1890FF 1:#36CBCB'
        }} 
      />
      
      <text 
        attrs={{
          x: 220,
          y: 120,
          text: '✓',
          fontSize: 24,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: 'white'
        }} 
      />
    </group>
  </group>
</Canvas>
```

---

## 坐标单位

F2 支持多种坐标单位：

```jsx
// 1. 像素单位（数字）
x: 100
y: 50

// 2. 字符串像素
x: '100px'
y: '50px'

// 3. 百分比（相对于父容器）
x: '50%'
y: '30%'
```

---

## 性能优化建议

1. **使用 group 分组管理**: 将相关的图形放在同一个 group 中
2. **避免过度绘制**: 只绘制可见区域内的图形
3. **使用裁剪**: 通过 clip 属性限制绘制区域
4. **合理使用透明度**: 透明度会影响渲染性能
5. **复用图形**: 对于相同的图形，考虑使用模板或组件复用

---

## 总结

F2 的基础图形系统提供了：

1. **丰富的图形类型**: rect、circle、line、polyline、polygon、text、arc、sector、ellipse、image、path
2. **灵活的属性配置**: 支持填充、描边、阴影、渐变等
3. **强大的组合能力**: 通过 group 可以组合出复杂图形
4. **完整的变换支持**: 支持平移、缩放、旋转等变换
5. **事件和动画**: 支持交互事件和动画效果

这些基础图形是构建高级图表组件的基础，掌握它们可以帮助你创建各种自定义可视化效果。
