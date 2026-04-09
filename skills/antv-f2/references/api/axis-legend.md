## 坐标轴与图例

### Axis 坐标轴

坐标轴配置，包含坐标轴线、刻度线、网格线、标签等。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `field` | `string` | - | 坐标轴的数据字段（必填） |
| `visible` | `boolean` | `true` | 是否显示该坐标轴 |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | 自动判断 | 坐标轴显示位置 |
| `type` | `ScaleType` | - | 度量类型 |
| `tickCount` | `number` | - | 坐标轴刻度点个数 |
| `formatter` | `(value) => string` | - | 格式化刻度点文本 |
| `ticks` | `Array<string \| number>` | - | 自定义刻度值 |
| `style` | `StyleProps` | - | 样式配置 |
| `labelAutoRotate` | `boolean` | `false` | 自动旋转标签以防止重叠 |
| `labelAutoHide` | `boolean` | `false` | 自动隐藏重叠标签 |
| `grid` | `'arc' \| 'line'` | - | 极坐标网格线类型 |

#### style 样式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `style.label` | `TextStyleProps \| LabelCallback` | `#808080, 20px` | 标签样式 |
| `style.line` | `LineStyleProps` | `#E8E8E8, 1px` | 坐标轴线样式 |
| `style.tickLine` | `TickLineProps` | `#E8E8E8` | 刻度线样式 |
| `style.grid` | `LineStyleProps \| GridCallback` | `#E8E8E8, 1px` | 网格线样式 |
| `style.labelOffset` | `number \| string` | `'15px'` | 标签偏移距离 |
| `style.symbol` | `MarkerStyleProps` | - | 轴箭头/圆点标记 |

#### 使用示例

```jsx
<Axis 
  field="sold"
  position="left"
  formatter={(value) => value.toFixed(2) + '%'}
  style={{
    label: {
      fontSize: '24px',
      fill: '#000'
    },
    grid: {
      stroke: '#E8E8E8',
      lineDash: [4, 4]
    }
  }}
/>
```

---

### Legend 图例

图例组件用于展示图表中不同数据系列的标识。

#### Props

**基础配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | 图例的显示位置 |
| `layoutMode` | `'uniform' \| 'adaptive'` | `'uniform'` | 布局模式 |

**尺寸配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `number \| string` | - | 图例宽度（uniform 模式下生效） |
| `height` | `number \| string` | - | 图例高度 |
| `margin` | `number \| string` | `'30px'` | legend 和图表内容的间距 |

**数据配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `LegendItem[]` | - | 自定义图例项列表 |
| `itemFormatter` | `(value, tickValue) => string` | - | 格式化图例每项的值显示 |

**样式配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `marker` | `'circle' \| 'square' \| 'line'` | `'circle'` | 图例标记类型 |
| `style` | `GroupStyleProps` | - | 图例容器样式 |
| `itemStyle` | `GroupStyleProps` | - | 图例项样式 |
| `nameStyle` | `TextStyleProps` | - | 图例名称样式 |
| `valueStyle` | `TextStyleProps` | - | 图例值样式 |
| `valuePrefix` | `string` | `': '` | 连接图例名和值的字符串 |

**交互配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `clickable` | `boolean` | `true` | 是否可点击 |
| `onClick` | `(item) => void` | - | 点击回调 |
| `clickMode` | `'filter' \| 'highlight'` | `'filter'` | 点击模式 |

#### LegendItem 接口

| 属性 | 类型 | 说明 |
|------|------|------|
| `color` | `string` | 标记颜色 |
| `name` | `string` | 名称 |
| `value` | `string \| number` | 值 |
| `marker` | `'circle' \| 'square' \| 'line'` | 图例标记 |

#### 使用示例

```jsx
<Legend 
  position="bottom"
  marker="circle"
  itemFormatter={(value) => value + '%'}
  nameStyle={{ fontSize: '24px', fill: '#000' }}
  valueStyle={{ fontSize: '20px', fill: '#666' }}
/>
```

---

