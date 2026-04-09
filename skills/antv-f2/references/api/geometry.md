## 几何标记 Geometry

所有几何标记组件都继承自 Geometry 基类，共享以下统一属性和方法。

### 统一属性

| 属性名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| `x` | `string` | 是 | - | x 轴的数据映射字段名 |
| `y` | `string` | 是 | - | y 轴的数据映射字段名 |
| `color` | `string \| object \| array` | 否 | - | 颜色映射 |
| `size` | `string \| object \| array \| number` | 否 | - | 大小映射 |
| `animation` | `object` | 否 | - | 动画配置 |
| `style` | `object` | 否 | - | 图形样式 |
| `viewClip` | `boolean` | 否 | `false` | 是否只显示图表区域内 |
| `adjust` | `string` | 否 | - | 数据调整方式 |

### 统一方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `getXScale()` | - | `Scale` | 获取 x 轴的 scale 对象 |
| `getYScale()` | - | `Scale` | 获取 y 轴的 scale 对象 |
| `getSnapRecords(point)` | `point: { x, y }` | `array` | 根据坐标点获取对应图形的数据记录 |

### color 颜色属性

支持多种配置格式：

| 格式 | 类型 | 说明 | 示例 |
|------|------|------|------|
| 固定值 | `string` | 直接指定颜色值 | `<Line color="#1890FF" />` |
| 字段映射 | `string` | 根据数据字段自动映射 | `<Line color="category" />` |
| 数组形式 | `[string, string[]]` | `[字段, 颜色数组]` | `<Line color={["cat", ["red", "blue"]]} />` |
| 对象形式 | `object` | 详细配置 | `<Line color={{ field: "cat", range: ["red", "blue"] }} />` |

**color 对象格式：**

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| `field` | `string` | 是 | - | 映射的数据字段名 |
| `range` | `string[]` | 否 | - | 颜色范围数组 |
| `callback` | `(value, record) => string` | 否 | - | 自定义颜色函数 |
| `type` | `'linear' \| 'category'` | 是 | - | 映射类型 |

### size 大小属性

支持多种配置格式：

| 格式 | 类型 | 说明 | 示例 |
|------|------|------|------|
| 固定值 | `number` | 直接指定大小 | `<Point size={4} />` |
| 字段映射 | `string` | 根据数据字段自动映射 | `<Point size="value" />` |
| 数组形式 | `[string, number[]]` | `[字段, 大小数组]` | `<Point size={["val", [2, 4, 6]]} />` |
| 对象形式 | `object` | 详细配置 | `<Point size={{ field: "val", range: [2, 10] }} />` |

**size 对象格式：**

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| `field` | `string` | 是 | - | 映射的数据字段名 |
| `range` | `number[]` | 否 | - | 大小范围数组 |
| `callback` | `(value, record) => number` | 否 | - | 自定义大小函数 |
| `type` | `'linear' \| 'category'` | 是 | - | 映射类型 |

### animation 动画属性

三个阶段（appear/update/leave）支持相同的属性结构：

| 阶段 | 属性 | 类型 | 默认值 | 描述 |
|------|------|------|--------|------|
| appear/update/leave | `easing` | `string \| function` | `'linear'` | 缓动函数 |
| | `duration` | `number` | `300` | 动画时长 (ms) |
| | `delay` | `number` | `0` | 延迟时间 (ms) |
| | `property` | `string[]` | - | 变化的属性数组 |
| | `start` | `object` | - | 起始状态 |
| | `end` | `object` | - | 结束状态 |

**缓动函数：**

| 值 | 描述 |
|-----|------|
| `'linear'` | 线性 |
| `'ease-in'` / `'in'` | 加速 |
| `'ease-out'` / `'out'` | 减速 |
| `'ease-in-out'` / `'in-out'` | 先加速后减速 |

### adjust 数据调整

| 值 | 描述 |
|-----|------|
| `stack` | 层叠，将同一个分类的数据值累加起来 |
| `dodge` | 分组散开，将同一个分类的数据进行分组均匀分布 |
| `symmetric` | 数据对称，使生成的图形居中对齐 |

---

### Line 折线

用于绘制折线图、曲线图、阶梯线图等。

#### 特有属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `sizeZoom` | `number \| (record) => number` | `1` | 线条大小缩放比例 |
| `connectNulls` | `boolean` | `false` | 是否连接空值 |
| `endView` | `function Component(props): Element` | - | 动画结束后显示的自定义视图 |

#### style 样式属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `stroke` | `string` | - | 描边颜色 |
| `lineWidth` | `number` | `1` | 线条宽度 |
| `strokeOpacity` | `number` | `1` | 描边透明度 |
| `lineCap` | `'butt' \| 'round' \| 'square'` | `'butt'` | 线条端点样式 |
| `lineJoin` | `'bevel' \| 'round' \| 'miter'` | `'miter'` | 线条连接样式 |
| `lineDash` | `number[]` | - | 虚线样式 |

#### 使用示例

```jsx
<Line 
  x="genre" 
  y="sold" 
  color="#1890FF"
  size={4}
  style={{
    stroke: '#1890FF',
    lineWidth: 3,
    lineDash: [5, 5]
  }}
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 800
    }
  }}
/>
```

---

### Interval 区间

用于绘制柱状图、直方图、南丁格尔玫瑰图、饼图、条形环图、漏斗图等。

#### 特有属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `sizeRatio` | `number` | `0.5` | 大小比例，范围 [0, 1] |
| `sizeZoom` | `number \| (record) => number` | `1` | 柱子大小缩放比例 |
| `showLabel` | `boolean` | `false` | 是否显示标签（pyramid/funnel 形态） |
| `labelCfg` | `object` | - | 标签配置 |
| `selection` | `object` | - | 选中交互配置 |

#### style 样式属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `fill` | `string` | - | 填充颜色 |
| `fillOpacity` | `number` | `1` | 填充透明度 |
| `stroke` | `string` | - | 描边颜色 |
| `strokeWidth` | `number` | - | 描边宽度 |
| `radius` | `string \| number[]` | - | 圆角半径 |

#### labelCfg 标签配置

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `label` | `string` | - | 标签内容字段名 |
| `offsetX` | `number` | `0` | 标签 X 轴偏移量 |
| `offsetY` | `number` | `0` | 标签 Y 轴偏移量 |

#### selection 选中配置

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `type` | `'single' \| 'multiple'` | `'single'` | 单选/多选模式 |
| `triggerOn` | `'click' \| 'press'` | `'click'` | 触发事件类型 |
| `defaultSelected` | `Array` | `[]` | 默认选中的数据项 |
| `selectedStyle` | `object \| function` | - | 选中项样式 |
| `unSelectedStyle` | `object \| function` | - | 未选中项样式 |
| `cancelable` | `boolean` | `true` | 是否可取消选择 |
| `onChange` | `(params) => void` | - | 选中状态变化回调 |

#### 使用示例

```jsx
<Interval 
  x="genre" 
  y="sold" 
  color="genre"
  sizeRatio={0.8}
  style={{
    fill: '#1890FF',
    radius: '4px'
  }}
  selection={{
    selectedStyle: { fillOpacity: 1 },
    unSelectedStyle: { fillOpacity: 0.4 }
  }}
/>
```

---

### Point 点

用于绘制点图、散点图、气泡图等。

#### 特有属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `shape` | `string` | `'circle'` | 点形状 |

#### shape 可选值

| 值 | 描述 |
|-----|------|
| `'circle'` | 圆形（默认） |
| `'hollowCircle'` | 空心圆形 |
| `'rect'` | 矩形 |

#### style 样式属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `fill` | `string` | - | 填充颜色 |
| `fillOpacity` | `number` | `1` | 填充透明度 |
| `stroke` | `string` | - | 描边颜色 |
| `strokeWidth` | `number` | - | 描边宽度 |

#### 使用示例

```jsx
<Point 
  x="genre" 
  y="sold" 
  size={10}
  shape="circle"
  style={{
    fill: '#1890FF',
    fillOpacity: 0.8
  }}
/>
```

---

### Area 面积

用于绘制区域图（面积图）、层叠区域图、区间区域图等。

#### style 样式属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `fill` | `string` | - | 填充颜色 |
| `fillOpacity` | `number` | `1` | 填充透明度 |
| `stroke` | `string` | - | 描边颜色 |
| `strokeWidth` | `number` | - | 描边宽度 |
| `opacity` | `number` | `1` | 整体透明度 |

#### 使用示例

```jsx
<Area 
  x="genre" 
  y="sold" 
  color="#1890FF"
  style={{
    fill: 'linear-gradient(180deg, #1890FF, #0050B3)',
    fillOpacity: 0.6
  }}
/>
```

---

### Candlestick K线图

用于 K 线图、股票图。

#### 数据结构

y 轴字段格式为：`[open, close, lowest, highest]` 分别代表：`[开盘价, 收盘价, 最低价, 最高价]`

#### 特有属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `color` | `object` | `{ range: ['#E62C3B', '#0E9976', '#999999'] }` | 涨跌颜色 |
| `sizeRatio` | `number` | `0.5` | 矩形大小比例 |

#### color 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `range` | `[string, string, string]` | `['#E62C3B', '#0E9976', '#999999']` | `[上涨颜色, 下跌颜色, 平盘颜色]` |

#### style 样式属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `fill` | `string` | - | 填充颜色（K线实体） |
| `stroke` | `string` | - | 描边颜色（K线影线） |
| `strokeWidth` | `number` | `2` | 描边宽度 |
| `radius` | `string \| number[]` | `'2px'` | 实体矩形圆角半径 |

#### 使用示例

```jsx
<Candlestick 
  x="time" 
  y="value"
  color={{ range: ['#ff4d4f', '#52c41a', '#d9d9d9'] }}
  sizeRatio={0.8}
  style={{
    radius: '2px'
  }}
/>
```

---

