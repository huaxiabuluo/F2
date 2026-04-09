## 交互组件

### Tooltip 提示框

用于显示图表数据点的详细信息。

#### Props

**基础配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `visible` | `boolean` | - | 是否显示 tooltip |
| `padding` | `string` | `'10px'` | 顶部边距 |
| `triggerOn` | `'press' \| 'click'` | `'press'` | 触发 tooltip 显示的事件 |
| `triggerOff` | `'pressend'` | `'pressend'` | 触发 tooltip 消失的事件 |
| `alwaysShow` | `boolean` | `false` | 是否一直显示 |
| `defaultItem` | `any` | - | 默认显示的数据项 |

**十字线配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showCrosshairs` | `boolean` | `false` | 是否显示十字辅助线 |
| `crosshairsType` | `'x' \| 'y' \| 'xy'` | `'y'` | 十字线类型 |
| `crosshairsStyle` | `LineStyleProps` | - | 十字线样式配置 |
| `snap` | `boolean` | `false` | 是否在数据点位置显示辅助圆点 |

**内容样式配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showItemMarker` | `boolean` | `true` | 是否在文本前显示数据项颜色标记 |
| `itemMarkerStyle` | `any` | - | 数据项标记的样式 |
| `joinString` | `string` | `': '` | 名称和值之间的连接字符串 |
| `nameStyle` | `TextStyleProps` | - | 名称文本样式 |
| `valueStyle` | `TextStyleProps` | - | 值文本样式 |
| `background` | `RectStyleProps` | - | tooltip 背景样式 |

**X/Y 轴辅助信息：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showXTip` | `boolean` | `false` | 是否在 X 轴位置显示辅助信息 |
| `xTip` | `string \| (text, record) => string` | - | X 轴辅助信息文本 |
| `xTipTextStyle` | `TextStyleProps` | - | X 轴辅助信息文本样式 |
| `xTipBackground` | `RectStyleProps` | - | X 轴辅助信息背景样式 |
| `showYTip` | `boolean` | `false` | 是否在 Y 轴位置显示辅助信息 |
| `yTip` | `string \| (text, record) => string` | - | Y 轴辅助信息文本 |
| `yTipTextStyle` | `TextStyleProps` | - | Y 轴辅助信息文本样式 |
| `yTipBackground` | `RectStyleProps` | - | Y 轴辅助信息背景样式 |

**自定义内容：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `custom` | `boolean` | `false` | 禁用 tooltip 信息框渲染 |
| `customText` | `(record) => JSX.Element` | - | 自定义文本内容 |

**回调函数：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `onChange` | `(records) => void` | tooltip 选中数据改变时的回调 |
| `onShow` | `() => void` | tooltip 显示时的回调 |
| `onHide` | `() => void` | tooltip 隐藏时的回调 |

#### 方法

##### show(point)

在指定坐标位置显示 tooltip。

```typescript
show(point: { x: number; y: number }): void
```

##### hide()

隐藏 tooltip。

```typescript
hide(): void
```

#### 使用示例

```jsx
<Tooltip 
  showCrosshairs={true}
  crosshairsType="xy"
  snap={true}
  background={{
    fill: 'rgba(50, 107, 251, 0.75)',
    radius: '8px'
  }}
  nameStyle={{ fontSize: '26px', fill: '#fff' }}
  valueStyle={{ fontSize: '28px', fill: '#fff' }}
/>
```

---

### ScrollBar 滚动条

提供数据滚动和缩放功能，支持平移、缩放、横扫等手势操作。

#### Props

**基础配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `mode` | `'x' \| 'y' \| ['x', 'y']` | - | 滚动模式（必填） |
| `range` | `ZoomRange` | - | 初始显示范围 0~1（必填） |
| `visible` | `boolean` | `true` | 是否显示滚动条 |

**手势配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pan` | `boolean` | `true` | 是否支持平移手势 |
| `pinch` | `boolean` | `true` | 是否支持缩放手势 |
| `swipe` | `boolean` | `false` | 是否支持横扫快速滚动 |
| `swipeDuration` | `number` | `1000` | 横扫动画时长（毫秒） |
| `panSensitive` | `number` | `1` | 平移灵敏度 |
| `pinchSensitive` | `number` | `1` | 缩放灵敏度 |

**样式配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | 滚动条显示位置 |
| `style` | `ShapeProps` | - | 滚动条父容器样式 |
| `background` | `ShapeProps` | - | 背景条样式 |
| `barStyle` | `ShapeProps` | - | 滑块样式 |

**高级配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `autoFit` | `boolean` | `false` | 是否自动同步 x/y 的坐标值 |
| `minCount` | `number` | `10` | 最少展示数据量 |

**事件回调：**

| 事件 | 回调参数 | 说明 |
|------|----------|------|
| `onPanStart` | `(event) => void` | 平移开始时触发 |
| `onPan` | `(event) => void` | 平移过程中触发 |
| `onPanEnd` | `(event) => void` | 平移结束时触发 |
| `onPinchStart` | `(event) => void` | 缩放开始时触发 |
| `onPinch` | `(event) => void` | 缩放过程中触发 |
| `onPinchEnd` | `(event) => void` | 缩放结束时触发 |
| `onInit` | `({ scale }) => void` | 组件初始化时触发 |
| `onChange` | `({ range }) => void` | 范围变化时触发 |

#### 使用示例

```jsx
<ScrollBar 
  mode="x" 
  range={[0.5, 1]}
  pan={true}
  pinch={true}
  swipe={true}
  onChange={({ range }) => {
    console.log('当前范围:', range);
  }}
/>
```

---

### Magnifier 放大镜

用于在图表上提供局部放大功能。

#### Props

**基础配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `focusRange` | `[number, number]` | - | 放大镜聚焦的数据范围索引（必填） |
| `radius` | `number \| string` | `'50px'` | 放大镜半径 |
| `position` | `[number, number]` | - | 放大镜中心位置 |

**偏移配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `offsetX` | `number \| string` | `0` | 放大镜 X 轴偏移量 |
| `offsetY` | `number \| string` | `0` | 放大镜 Y 轴偏移量 |

**样式配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lineStyle` | `object` | - | 放大镜内数据线条的样式配置 |
| `frameStyle` | `object` | - | 放大镜外框（圆形）的样式配置 |

**辅助线配置：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `referenceLines` | `array` | - | 辅助线配置数组 |

**ReferenceLine 配置：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `records` | `any[]` | 辅助线数据记录数组，x 支持特殊值 'min'/'max' |
| `style` | `object` | line 组件样式 |

#### 使用示例

```jsx
<Magnifier 
  focusRange={[2, 5]}
  radius="60px"
  frameStyle={{
    stroke: '#1890ff',
    lineWidth: '3px'
  }}
  referenceLines={[
    {
      records: [
        { date: 'min', value: 100 },
        { date: 'max', value: 100 }
      ],
      style: { stroke: '#ff4d4f', lineDash: [4, 4] }
    }
  ]}
/>
```

---

