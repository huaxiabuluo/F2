# F2 视觉定制

## 图形标签

F2 提供丰富的图形标签用于绘制自定义图形。

### 图形标签列表

- `group` - 分组
- `rect` - 矩形
- `circle` - 圆
- `sector` - 扇形
- `polygon` - 多边形
- `line` - 线
- `arc` - 圆弧
- `polyline` - 多点线段
- `text` - 文本
- `image` - 图片

### 通用属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `className` | `string` | 对象标记 |
| `visible` | `boolean` | 显示或隐藏图形 |
| `zIndex` | `number` | z-index 值 |
| `style` | `Style` | 图形样式 |
| `animation` | `Animation` | 图形动画 |
| 事件属性 | `Event` | 图形事件 |

### rect（矩形）

#### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `x` | `number` | 左上角 x 坐标 | `0` |
| `y` | `number` | 左上角 y 坐标 | `0` |
| `width` | `number` | 宽度 | `0` |
| `height` | `number` | 高度 | `0` |
| `radius` | `number \| number[]` | 圆角半径 | `0` |

#### 基础示例

```jsx
// 基础矩形
<rect
  style={{
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>

// 圆角矩形
<rect
  style={{
    x: 100,
    y: 100,
    width: 100,
    height: 50,
    radius: [10, 20, 30, 40], // [top-left, top-right, bottom-right, bottom-left]
    fill: 'green',
  }}
/>
```

### circle（圆形）

#### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `cx` | `number` | 圆心 x 坐标 | `0` |
| `cy` | `number` | 圆心 y 坐标 | `0` |
| `r` | `number` | 圆的半径 | `0` |

#### 基础示例

```jsx
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>
```

### sector（扇形）

#### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `cx` | `number` | 圆心 x 坐标 | `0` |
| `cy` | `number` | 圆心 y 坐标 | `0` |
| `r` | `number` | 外半径 | `0` |
| `r0` | `number` | 内半径 | `0` |
| `startAngle` | `number \| string` | 起始角度/弧度 | `0` |
| `endAngle` | `number \| string` | 结束角度/弧度 | `0` |
| `anticlockwise` | `boolean` | 是否逆时针方向 | `false` |

#### 基础示例

```jsx
// 使用弧度
<sector
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    startAngle: 0,
    endAngle: Math.PI / 2,
    fill: 'red',
  }}
/>

// 使用角度
<sector
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    startAngle: '0 deg',
    endAngle: '90 deg',
    fill: 'blue',
  }}
/>

// 环形扇形
<sector
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    r0: 30,
    startAngle: 0,
    endAngle: Math.PI,
    fill: 'green',
  }}
/>
```

### polygon（多边形）

#### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `points` | `[number, number][]` | 多边形的顶点坐标数组 | `[]` |

#### 基础示例

```jsx
// 三角形
<polygon
  style={{
    points: [
      [50, 10],
      [90, 90],
      [10, 90],
    ],
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>
```

### line（直线）

#### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `x1` | `number` | 起始点 x 坐标 | `0` |
| `y1` | `number` | 起始点 y 坐标 | `0` |
| `x2` | `number` | 结束点 x 坐标 | `0` |
| `y2` | `number` | 结束点 y 坐标 | `0` |

#### 基础示例

```jsx
// 直线
<line
  style={{
    x1: 10,
    y1: 10,
    x2: 100,
    y2: 100,
    lineWidth: '2px',
    stroke: '#000',
  }}
/>

// 虚线
<line
  style={{
    x1: 10,
    y1: 10,
    x2: 100,
    y2: 100,
    lineWidth: '2px',
    stroke: '#000',
    lineDash: [5, 5],
  }}
/>
```

### polyline（多点线段）

#### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `points` | `[number, number][]` | 线段的点坐标数组 | `[]` |
| `smooth` | `boolean` | 是否平滑曲线 | `false` |

#### 基础示例

```jsx
// 折线
<polyline
  style={{
    points: [
      [10, 10],
      [50, 50],
      [80, 70],
    ],
    lineWidth: '2px',
    stroke: '#000',
  }}
/>

// 平滑曲线
<polyline
  style={{
    points: [
      [10, 10],
      [50, 50],
      [80, 70],
      [100, 30],
    ],
    lineWidth: '2px',
    stroke: '#000',
    smooth: true,
  }}
/>
```

### text（文本）

#### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `x` | `number` | 文本 x 坐标 | `0` |
| `y` | `number` | 文本 y 坐标 | `0` |
| `text` | `string` | 文本内容 | `''` |
| `textAlign` | `string` | 文本水平对齐方式 | `'start'` |
| `textBaseline` | `string` | 文本垂直基线 | `'alphabetic'` |
| `fontStyle` | `string` | 字体样式 | `'normal'` |
| `fontSize` | `number` | 字号（像素） | `12` |
| `fontFamily` | `string` | 字体系列 | `'sans-serif'` |
| `fontWeight` | `string` | 字体粗细 | `'normal'` |

#### textAlign 可选值

- `'start'` - 默认，文本从指定位置开始
- `'center'` - 文本居中对齐
- `'end'` - 文本从指定位置结束
- `'left'` - 文本左对齐
- `'right'` - 文本右对齐

#### textBaseline 可选值

- `'top'` - 文本顶部对齐
- `'hanging'` - 悬挂基线
- `'middle'` - 文本垂直居中
- `'alphabetic'` - 默认，字母基线
- `'ideographic'` - 表意基线
- `'bottom'` - 文本底部对齐

#### 基础示例

```jsx
// 简单文本
<text
  style={{
    x: 100,
    y: 100,
    text: 'Hello F2',
    fontSize: 20,
    fill: '#000',
  }}
/>

// 居中文本
<text
  style={{
    x: 150,
    y: 100,
    text: '居中文本',
    fontSize: 16,
    textAlign: 'center',
    textBaseline: 'middle',
    fill: '#000',
  }}
/>
```

### image（图片）

#### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `x` | `number` | 左上角 x 坐标 | `0` |
| `y` | `number` | 左上角 y 坐标 | `0` |
| `width` | `number` | 宽度 | `0` |
| `height` | `number` | 高度 | `0` |
| `src` | `string` | 图片 URL | `''` |
| `cacheImage` | `boolean` | 是否缓存图片 | `false` |

#### 基础示例

```jsx
<image
  style={{
    src: 'https://f2.antv.vision/favicon-32x32.png',
    x: 10,
    y: 10,
    width: 32,
    height: 32,
  }}
/>
```

---

## 绘图属性

F2 组件样式的定义全部使用 Style 统一的结构。

### 位置属性

| 图形 | 位置说明 | 使用的属性 |
|------|----------|------------|
| Circle | 圆心位置 | `cx/cy` |
| Arc | 圆心位置 | `cx/cy` |
| Sector | 圆心位置 | `cx/cy` |
| Rect | 左上角顶点位置 | `x/y` |
| Text | 文本锚点位置 | `x/y` |

### 通用属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `zIndex` | `number` | `0` | 控制图形显示层级 |
| `clip` | `Clip` | - | 裁剪区域 |
| `visibility` | `string` | - | 控制图形的可见性 |
| `opacity` | `number` | `1` | 设置图形和图片透明度 |
| `fill` | `string \| Gradient \| Pattern` | - | 填充色、渐变或纹理 |
| `fillOpacity` | `number` | `1` | 设置图形填充颜色的透明度 |
| `stroke` | `string \| Gradient \| Pattern` | - | 描边色、渐变或纹理 |
| `strokeOpacity` | `number` | `1` | 设置边颜色的透明度 |
| `shadowType` | `string` | - | 阴影类型 |
| `shadowColor` | `string` | - | 阴影颜色 |
| `shadowBlur` | `number` | `0` | 阴影模糊程度 |
| `shadowOffsetX` | `number` | `0` | 阴影水平偏移距离 |
| `shadowOffsetY` | `number` | `0` | 阴影垂直偏移距离 |
| `filter` | `string` | - | 滤镜 |
| `cursor` | `string` | - | 鼠标样式 |

### 线条属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `lineCap` | `string` | `'butt'` | 线段末端样式 |
| `lineJoin` | `string` | `'miter'` | 线段连接处样式 |
| `lineWidth` | `number` | `1` | 线段宽度 |
| `miterLimit` | `number` | `10` | 斜接面限制比例 |
| `lineDash` | `number[]` | `[]` | 虚线样式 |

### 文本属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `textAlign` | `string` | `'start'` | 文本水平对齐方式 |
| `textBaseline` | `string` | `'alphabetic'` | 文本垂直基线 |
| `fontStyle` | `string` | `'normal'` | 字体样式 |
| `fontSize` | `number` | `12` | 字号（像素） |
| `fontFamily` | `string` | `'sans-serif'` | 字体系列 |
| `fontWeight` | `string` | `'normal'` | 字体粗细 |
| `fontVariant` | `string` | `'normal'` | 字体变体 |
| `lineHeight` | `number` | - | 行高（像素）|

### 渐变色

#### 线性渐变

```jsx
<rect
  style={{
    x: 10,
    y: 10,
    width: 200,
    height: 100,
    fill: 'linear-gradient(90deg, blue, green 40%, red)',
  }}
/>
```

#### 径向渐变

```jsx
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 80,
    fill: 'radial-gradient(circle at center, red, blue, green 100%)',
  }}
/>
```

### 纹理

#### Pattern 类型定义

```typescript
interface Pattern {
  image: string | CanvasImageSource | Rect
  repetition?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'
  transform?: string
}
```

#### 使用示例

```jsx
<rect
  style={{
    x: 10,
    y: 10,
    width: 200,
    height: 200,
    fill: {
      image: 'https://gw.alipayobjects.com/zos/rmsportal/ibtwzHXSxomqbZCPMLqS.png',
      repetition: 'repeat',
      transform: 'rotate(30deg)',
    },
  }}
/>
```

### 裁剪

#### 使用示例

```jsx
// 圆形裁剪
<rect
  style={{
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: 'blue',
    clip: {
      type: 'circle',
      style: {
        cx: 150,
        cy: 150,
        r: 50,
      },
    },
  }}
/>

// 矩形裁剪
<rect
  style={{
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: 'red',
    clip: {
      type: 'rect',
      style: {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
      },
    },
  }}
/>
```

---

## 动画属性

F2 动画定义与 Web Animations API 靠齐。

### 动画执行阶段

| 阶段 | 说明 | 触发时机 |
|------|------|----------|
| `appear` | 初始化时的入场动画 | render 阶段 |
| `update` | 数据更新时的更新动画 | props 发生改变 |
| `leave` | 销毁前的离场动画 | destroy 阶段 |

### 基础属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `easing` | `string` | `'linear'` | 缓动函数 |
| `duration` | `number` | - | 动画持续时间（毫秒）|
| `delay` | `number` | `0` | 开始动画前的延迟（毫秒）|
| `fill` | `string` | `'none'` | 定义图形在动画执行前后的表现 |
| `iterations` | `number` | `1` | 循环次数 |
| `property` | `string[]` | - | 声明需要变换的属性 |
| `start` | `Keyframe` | - | 开始帧状态 |
| `end` | `Keyframe` | - | 结束帧状态 |

### 缓动函数

恒速：`linear`、`ease`

加速：`ease-in`、`in`、`in-sine`、`in-quad`、`in-cubic`、`in-quart`、`in-quint`、`in-expo`、`in-circ`、`in-back`、`in-bounce`、`in-elastic`、`spring`、`spring-in`

减速：`ease-out`、`out`、`out-sine`、`out-quad`、`out-cubic`、`out-quart`、`out-quint`、`out-expo`、`out-circ`、`out-back`、`out-bounce`、`out-elastic`、`spring-out`

加速-减速：`ease-in-out`、`in-out`、`in-out-sine`、`in-out-quad`、`in-out-cubic`、`in-out-quart`、`in-out-quint`、`in-out-expo`、`in-out-circ`、`in-out-back`、`in-out-bounce`、`in-out-elastic`、`spring-in-out`

减速-加速：`ease-out-in`、`out-in`、`out-in-sine`、`out-in-quad`、`out-in-cubic`、`out-in-quart`、`out-in-quint`、`out-in-expo`、`out-in-circ`、`out-in-back`、`out-in-bounce`、`out-in-elastic`、`spring-out-in`

### Keyframe 支持的属性

`transform`、`opacity`、`strokeOpacity`、`fill`、`stroke`、`lineWidth`、`r`、`rx`、`ry`、`width`、`height`、`x`、`y`、`x1`、`y1`、`x2`、`y2`、`offsetDistance`、`lineDash`、`lineDashOffset`、`path`

### 基础用法

#### 入场动画

```jsx
<text
  style={{
    text: '测试',
    x: 100,
    y: 100,
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
  }}
/>
```

#### 更新动画

```jsx
<rect
  style={{
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    fill: 'blue',
  }}
  animation={{
    appear: {
      easing: 'linear',
      duration: 450,
      property: ['width', 'height'],
      start: {
        width: 0,
        height: 0,
      },
      end: {
        width: 50,
        height: 50,
      },
    },
    update: {
      easing: 'ease-in-out',
      duration: 300,
      property: ['fill'],
      start: {
        fill: 'blue',
      },
      end: {
        fill: 'red',
      },
    },
  }}
/>
```

#### 离场动画

```jsx
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    fill: 'green',
  }}
  animation={{
    leave: {
      easing: 'ease-out',
      duration: 500,
      property: ['opacity', 'r'],
      start: {
        opacity: 1,
        r: 50,
      },
      end: {
        opacity: 0,
        r: 0,
      },
    },
  }}
/>
```

#### 循环动画

```jsx
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 30,
    fill: 'blue',
  }}
  animation={{
    appear: {
      easing: 'ease-in-out',
      duration: 1000,
      iterations: Infinity, // 无限循环
      property: ['r'],
      start: {
        r: 20,
      },
      end: {
        r: 40,
      },
    },
  }}
/>
```

---

