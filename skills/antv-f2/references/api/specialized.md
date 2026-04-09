## 专用图表

### PieLabel 饼图标签

用于在极坐标下为扇区显示标签，支持默认布局与蜘蛛网布局。

#### Props

**布局配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'default' \| 'spider'` | `'default'` | 标签布局类型 |
| `anchorOffset` | `string \| number` | `'10px'` | 标签线锚点偏移 |
| `inflectionOffset` | `string \| number` | `'30px'` | 标签线拐点偏移 |
| `sidePadding` | `string \| number` | `'15px'` | 文本距离画布边缘的最小距离 |

**标签配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label1` | `LabelConfig \| Function` | - | 第一行标签配置 |
| `label2` | `LabelConfig \| Function` | - | 第二行标签配置 |
| `height` | `number` | 自动计算 | 标签项高度 |
| `label1OffsetY` | `string \| number` | `'-4px'` | 第一行标签 Y 轴偏移 |
| `label2OffsetY` | `string \| number` | `'4px'` | 第二行标签 Y 轴偏移 |
| `showAnchor` | `boolean` | `true` | 是否显示锚点 |

**数据配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `any[]` | - | 指定只显示的记录数组 |

**交互配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `triggerOn` | `'click' \| 'press'` | `'click'` | 触发事件类型 |
| `onClick` | `(ev) => void` | - | 标签点击回调 |

#### LabelConfig 接口

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `text` | `string` | 标签文本内容 |
| `fill` | `string` | 文本颜色 |
| `fontSize` | `number \| string` | 字体大小 |
| `fontWeight` | `number \| string` | 字体粗细 |
| `textAlign` | `'start' \| 'center' \| 'end'` | 文本对齐方式 |
| `textBaseline` | `'top' \| 'middle' \| 'bottom'` | 文本基线对齐方式 |

#### 使用示例

```jsx
<PieLabel
  label1={(d) => ({ text: d.memo })}
  label2={(d) => ({ fill: '#000000', text: '$' + d.amount.toFixed(2) })}
  type="spider"
/>
```

---

### Gauge 仪表盘

用于显示进度或完成度的可视化组件。

#### Props

**基础配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `percent` | `number` | - | 进度值，范围 0-1（必填） |
| `startAngle` | `number` | `Math.PI` | 起始角度（弧度） |
| `endAngle` | `number` | `Math.PI * 2` | 结束角度（弧度） |
| `center` | `{ x: number, y: number }` | `{ x: 150, y: 150 }` | 仪表盘中心点坐标 |

**尺寸配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `r` | `number \| string` | `100` | 仪表盘半径 |
| `r0` | `number \| string` | `0` | 内圆半径 |

**刻度配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tickCount` | `number` | `5` | 刻度数量 |
| `tickOffset` | `number \| string` | `-20px` | 刻度偏移量 |
| `tickLength` | `number \| string` | `10px` | 刻度长度 |
| `ticks` | `Tick[]` | - | 刻度数组 |

#### 使用示例

```jsx
<Gauge
  percent={0.75}
  startAngle={Math.PI}
  endAngle={Math.PI * 2}
  r="100px"
  tickCount={10}
/>
```

---

### Timeline 时间轴

用于创建按时间顺序播放的动画序列。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `delay` | `number` | `0` | 每个组件播放的延迟时间（毫秒） |
| `start` | `number` | `0` | 从第几个子组件开始播放 |
| `loop` | `boolean` | `false` | 是否自动循环播放 |
| `autoPlay` | `boolean` | - | 是否自动播放（内部使用） |
| `children` | `any` | - | 子组件 |

#### 使用示例

```jsx
<Timeline delay={1000} loop={true}>
  {dataFrames.map((frame, index) => (
    <Chart key={index} data={frame}>
      <Interval x="genre" y="sold" />
    </Chart>
  ))}
</Timeline>
```

---

### Treemap 矩形树图

用于展示层级数据的可视化图表，通过矩形的大小和颜色来表示数据的数值和分类。

#### Props

**基础配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `Array` | - | 数据源（必须是具有层级结构的数组） |
| `value` | `string` | - | 用于确定矩形大小的数值字段名 |
| `coord` | `CoordProps` | - | 坐标系配置 |

**样式配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `ColorAttrObject` | - | 颜色映射配置 |
| `space` | `number` | `0` | 矩形之间的间距 |
| `theme` | `Record<string, any>` | - | 主题配置 |
| `label` | `boolean \| TextStyleProps` | `false` | 是否显示标签 |

**交互配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `selection` | `object` | - | 选择配置 |
| `onClick` | `(record) => void` | - | 点击事件回调函数 |

#### ColorAttrObject

| 属性 | 类型 | 说明 |
|------|------|------|
| `field` | `string` | 用于颜色映射的字段名 |
| `range` | `string[] \| number[]` | 颜色范围数组 |
| `callback` | `(value) => string \| number` | 自定义颜色映射函数 |

#### 使用示例

```jsx
<Treemap
  data={data}
  color={{ field: 'name' }}
  value="value"
  space={4}
  label={true}
  selection={{
    selectedStyle: { fillOpacity: 1 },
    unSelectedStyle: { fillOpacity: 0.4 }
  }}
/>
```

---

### Sunburst 旭日图

用于展示层级数据的径向图表，通过同心圆的形式展示数据的层级结构。

#### Props

**基础配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `Array` | - | 数据源（必须是具有层级结构的数组） |
| `value` | `string` | - | 用于确定扇形大小的数值字段名 |
| `coord` | `CoordProps` | `{ type: 'polar' }` | 坐标系配置 |

**样式配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `any[] \| ColorAttrObject` | 主题色 | 颜色映射配置 |

**高级配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sort` | `boolean \| Function` | `true` | 是否对数据进行排序 |
| `onClick` | `(event) => void` | - | 点击事件回调函数 |

#### 使用示例

```jsx
<Sunburst
  data={data.children}
  value="value"
  coord={{ type: 'polar' }}
  color={{ field: 'name', range: colors }}
  sort={false}
/>
```

---

## 数据类型定义

### DataRecord

```typescript
type DataRecord = Record<string, any>;
```

### Data

```typescript
type Data<TRecord> = TRecord[];
```

### ScaleType

```typescript
type ScaleType = 'identity' | 'linear' | 'cat' | 'timeCat' | 'log' | 'pow';
```

### CoordType

```typescript
type CoordType = 'rect' | 'polar';
```

### ZoomRange

```typescript
type ZoomRange = [number, number]; // 值为 0~1 之间的数字
```

---

## 常见图形属性

### TextStyleProps 文本属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `text` | `string` | - | 文本内容 |
| `fill` | `string` | - | 文本颜色 |
| `fontSize` | `number \| string` | - | 字体大小 |
| `fontWeight` | `number \| string` | - | 字体粗细 |
| `fontStyle` | `string` | - | 字体样式 |
| `fontFamily` | `string` | - | 字体族 |
| `textAlign` | `'start' \| 'center' \| 'end'` | - | 文本对齐方式 |
| `textBaseline` | `'top' \| 'middle' \| 'bottom'` | - | 文本基线对齐方式 |

### LineStyleProps 线条属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `stroke` | `string` | - | 描边颜色 |
| `lineWidth` | `number` | - | 线条宽度 |
| `strokeOpacity` | `number` | - | 描边透明度 |
| `lineCap` | `'butt' \| 'round' \| 'square'` | - | 线条端点样式 |
| `lineJoin` | `'bevel' \| 'round' \| 'miter'` | - | 线条连接样式 |
| `lineDash` | `number[]` | - | 虚线样式 |
| `lineDashOffset` | `number` | - | 虚线偏移量 |

### RectStyleProps 矩形属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `fill` | `string` | - | 填充颜色 |
| `fillOpacity` | `number` | - | 填充透明度 |
| `stroke` | `string` | - | 描边颜色 |
| `strokeWidth` | `number` | - | 描边宽度 |
| `radius` | `string \| number[]` | - | 圆角半径 |
| `opacity` | `number` | - | 整体透明度 |

### CircleStyleProps 圆形属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `fill` | `string` | - | 填充颜色 |
| `fillOpacity` | `number` | - | 填充透明度 |
| `stroke` | `string` | - | 描边颜色 |
| `strokeWidth` | `number` | - | 描边宽度 |
| `r` | `number` | - | 半径 |
| `opacity` | `number` | - | 整体透明度 |

---

本文档涵盖了 F2 的所有核心 API。如需更详细的示例和用法说明，请参考各组件的官方文档和示例代码。
