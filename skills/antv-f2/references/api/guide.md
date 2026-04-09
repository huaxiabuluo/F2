## 标注组件 Guide

标注组件用于在图表上标识额外的标记注解。包含以下子组件：

### PointGuide 点标注

在指定位置绘制圆形标注点。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 标注位置的数据项 |
| `offsetX` | `number \| string` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string` | `0` | y 轴偏移量 |
| `style` | `CircleStyleProps \| Function` | - | 圆形样式 |
| `onClick` | `(ev) => void` | - | 点击事件回调 |
| `visible` | `boolean` | `true` | 是否显示标注 |
| `precise` | `boolean` | - | 是否精确定位（用于分组柱状图） |

#### 默认样式

```javascript
{
  fill: '#fff',
  r: 3,
  lineWidth: 2,
  stroke: '#1890ff',
}
```

#### 使用示例

```jsx
<PointGuide
  records={[item]}
  style={{ fill: '#f00', stroke: '#000' }}
/>
```

---

### TextGuide 文本标注

在指定位置显示文本标注。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 标注位置的数据项 |
| `content` | `string \| number` | - | 文本内容 |
| `offsetX` | `number \| string` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string` | `0` | y 轴偏移量 |
| `style` | `TextStyleProps \| Function` | - | 文本样式 |

#### records 特殊值

| 值 | 含义 | 对应位置 |
|----|------|----------|
| `'min'` | 最小值 | 0 |
| `'max'` | 最大值 | 1 |
| `'median'` | 中位值 | 0.5 |
| `'50%'` | 50% 位置 | 0.5 |

#### 使用示例

```jsx
<TextGuide
  records={[item]}
  content={item.sold}
  style={{
    fill: '#000',
    fontSize: '24px',
    textAlign: 'center',
    textBaseline: 'bottom'
  }}
/>
```

---

### ImageGuide 图片标注

在指定位置显示图片标注。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 标注位置的数据项 |
| `src` | `string` | - | 图片地址 |
| `attrs` | `ImageStyleProps` | - | 图片属性 |
| `style` | `ImageStyleProps \| Function` | - | 图片样式 |
| `offsetX` | `number \| string` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string` | `0` | y 轴偏移量 |
| `onClick` | `(ev) => void` | - | 点击事件回调 |

#### 使用示例

```jsx
<ImageGuide
  records={[item]}
  src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"
  style={{ width: 24, height: 24 }}
/>
```

---

### LineGuide 辅助线标注

在指定位置绘制辅助线。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 标注位置（需要 2 个点来定义线） |
| `offsetX` | `number \| string \| Array` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string \| Array` | `0` | y 轴偏移量 |
| `style` | `LineStyleProps \| Function` | - | 线样式 |

#### 使用示例

```jsx
<LineGuide
  records={[
    { genre: 'min', sold: '50%' },
    { genre: 'max', sold: '50%' }
  ]}
  style={{ stroke: '#999', lineWidth: 1, lineDash: [4, 4] }}
/>
```

---

### RectGuide 矩形标注

在指定位置绘制矩形区域标注。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 矩形两个顶点对应的位置（需要 2 个点） |
| `offsetX` | `number \| string` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string` | `0` | y 轴偏移量 |
| `style` | `RectStyleProps \| Function` | - | 矩形样式 |
| `onClick` | `(ev) => void` | - | 点击事件回调 |
| `visible` | `boolean` | `true` | 是否显示 |
| `precise` | `boolean` | - | 是否精确定位 |

#### 使用示例

```jsx
<RectGuide
  records={[
    { genre: 'Sports', sold: 'min' },
    { genre: 'Sports', sold: 'max' }
  ]}
  style={{ fill: 'yellow', fillOpacity: 0.5 }}
/>
```

---

### TagGuide 标签标注

在指定位置显示带箭头的标签标注。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 标注位置的数据项 |
| `content` | `string` | - | 文本内容 |
| `offsetX` | `number \| string` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string` | `0` | y 轴偏移量 |
| `direct` | `'tl' \| 'tc' \| 'tr' \| 'cl' \| 'cr' \| 'bl' \| 'bc' \| 'br'` | `'tl'` | 箭头方向 |
| `side` | `string \| number` | `'8px'` | 箭头的边长 |
| `autoAdjust` | `boolean` | `true` | 是否自动调整方向 |
| `background` | `RectStyleProps` | - | 背景容器样式 |
| `textStyle` | `TextStyleProps` | - | 文本样式 |
| `precise` | `boolean` | `false` | 是否精确定位（用于分组柱状图） |
| `visible` | `boolean` | `true` | 是否显示标注 |
| `onClick` | `(ev) => void` | - | 点击事件回调 |

#### direct 方向说明

| 值 | 含义 | 图示 |
|----|------|------|
| `tl` | top-left | ↖ |
| `tc` | top-center | ↑ |
| `tr` | top-right | ↗ |
| `cl` | center-left | ← |
| `cr` | center-right | → |
| `bl` | bottom-left | ↙ |
| `bc` | bottom-center | ↓ |
| `br` | bottom-right | ↘ |

#### 使用示例

```jsx
<TagGuide
  records={[{ genre: 'Sports', sold: 350 }]}
  content="最高销量"
  direct="tr"
  background={{ fill: '#fff', stroke: '#1677FF' }}
/>
```

---

