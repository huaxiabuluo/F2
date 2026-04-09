## 顶层 API

### Children

用于处理 `props.children` 的工具对象。

#### Children.map(children, callback)

遍历子元素并返回新的数组。

**参数：**
- `children: T | T[] | null` - 要遍历的子元素
- `callback: (child: T | null) => any` - 对每个子元素执行的回调函数

**返回值：** 处理后的子元素数组

```jsx
import { Children } from '@antv/f2';

<group>
  {Children.map(children, (child) => child)}
</group>
```

#### Children.cloneElement(element, props)

复制一个元素并合并新的属性。

**参数：**
- `element: any` - 要克隆的元素
- `props: any` - 要合并的新属性对象

**返回值：** 新的元素对象

```jsx
Children.cloneElement(child, { extraProp: 'value' })
```

#### Children.toArray(element)

将子元素转换为数组形式。

**参数：**
- `element: T | T[] | null` - 要转换的子元素

**返回值：** 子元素数组

```jsx
const childrenArray = Children.toArray(children)
```

#### Children.compare(nextElement, lastElement, callback)

比较两个元素是否相等。

**参数：**
- `nextElement: T | T[] | null` - 新的元素
- `lastElement: T | T[] | null` - 旧的元素
- `callback: (next, last) => any` - 比较回调函数

**返回值：** 回调函数的执行结果

### createElement / jsx(type, props, ...children)

创建 JSX 元素。两者功能完全一致，createElement 是 jsx 的别名。

**参数：**
- `type: ElementType` - 元素类型（组件构造函数或标签名）
- `props: any` - 元素属性对象
- `children: any[]` - 子元素列表（可变参数）

**返回值：** JSX 元素对象

```jsx
import { createElement, Chart, Interval } from '@antv/f2';

const chartElement = createElement(
  Chart,
  { data: myData },
  createElement(Interval, { x: 'genre', y: 'sold' })
)
```

### createRef<T>()

创建一个引用（ref）对象。

**返回值：** 包含 `current` 属性的对象

```jsx
import { createRef } from '@antv/f2';

const chartRef = createRef();
// chartRef.current 用于访问组件实例
```

---

## 核心组件

### Canvas 画布

Canvas 是 F2 的顶层组件，负责创建画布上下文和管理图表渲染。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `context` | `CanvasRenderingContext2D` | - | 画布的上下文（必填） |
| `width` | `number` | - | 画布宽度（像素） |
| `height` | `number` | - | 画布高度（像素） |
| `pixelRatio` | `number` | `window.devicePixelRatio` | 像素比，用于高清屏适配 |
| `animate` | `boolean` | `true` | 是否执行动画 |

#### 方法

##### render()

渲染画布内容。

```javascript
await canvas.render()
```

##### resize(width, height)

调整画布尺寸。

```javascript
await canvas.resize(200, 200)
```

#### 使用示例

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';

<Canvas 
  context={context} 
  pixelRatio={window.devicePixelRatio}
  width={300}
  height={300}
>
  <Chart data={data}>
    <Interval x="genre" y="sold" />
  </Chart>
</Canvas>
```

---

### Chart 图表

Chart 组件是 F2 的核心组件，提供坐标系、度量、数据过滤等功能。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `Data<TRecord>` | - | 数据源（必填） |
| `scale` | `DataRecordScale<TRecord>` | - | 度量配置 |
| `coord` | `CoordType \| CoordProps` | - | 坐标系配置 |
| `style` | `GroupStyleProps` | - | 图表容器样式 |
| `theme` | `Record<string, any>` | - | 主题配置 |

#### scale 度量配置

**通用属性：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `ScaleType` | 自动推断 | 度量类型 |
| `formatter` | `(value) => string` | - | 格式化坐标轴刻度点文本 |
| `range` | `[number, number]` | `[0, 1]` | 输出数据范围 |
| `alias` | `string` | - | 字段显示别名 |
| `tickCount` | `number` | - | 坐标轴刻度点个数 |
| `ticks` | `string[] \| number[]` | - | 指定刻度点文本 |

**linear 度量（连续数值）：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `nice` | `boolean` | `true` | 优化数值范围 |
| `min` | `number` | 自动计算 | 最小值 |
| `max` | `number` | 自动计算 | 最大值 |

**cat 度量（分类）：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `values` | `string[]` | - | 指定分类值及其顺序 |

**timeCat 度量（时间分类）：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `mask` | `string` | `'YYYY-MM-DD'` | 日期格式化格式 |

#### coord 坐标系配置

**rect 直角坐标系：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'rect'` | `'rect'` | 坐标系类型 |
| `transposed` | `boolean` | `false` | 是否翻转坐标系 |

**polar 极坐标系：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'polar'` | - | 坐标系类型 |
| `startAngle` | `number` | - | 起始弧度 |
| `endAngle` | `number` | - | 结束弧度 |
| `innerRadius` | `number` | - | 内半径，0-1 范围 |
| `radius` | `number` | - | 半径，0-1 范围 |

#### 使用示例

```jsx
<Chart 
  data={data}
  scale={{
    sold: { min: 0, max: 100, nice: true },
    genre: { values: ['Sports', 'Strategy'] }
  }}
  coord={{ type: 'polar', innerRadius: 0.5 }}
  style={{ padding: ['40px', '40px', '40px', '40px'] }}
>
  <Interval x="genre" y="sold" />
</Chart>
```

---

### Component 组件基类

Component 是 F2 的基础组件类，所有自定义组件都应继承自它。

#### 实例属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `props` | `P` | 组件的属性对象 |
| `state` | `S` | 组件的状态对象 |
| `context` | `IContext` | 组件上下文 |
| `refs` | `object` | 子组件引用集合 |
| `container` | `Group` | 组件的容器 Group |
| `layout` | `LayoutProps` | 组件的布局信息 |
| `isMounted` | `boolean` | 组件是否已挂载 |
| `animate` | `boolean` | 是否启用动画 |

#### 生命周期方法

**挂载阶段：**

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `constructor` | `props: P, context?: IContext` | - | 构造函数 |
| `willMount` | - | `void` | 组件即将挂载时调用 |
| `render` | - | `JSX.Element \| null` | 渲染组件 |
| `didMount` | - | `void` | 组件挂载完成后调用 |

**更新阶段：**

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `willReceiveProps` | `nextProps: P, context?: IContext` | `void` | 接收新 props 时调用 |
| `shouldUpdate` | `nextProps: P` | `boolean` | 判断是否需要更新 |
| `willUpdate` | - | `void` | 组件即将更新时调用 |
| `didUpdate` | - | `void` | 组件更新完成后调用 |

**卸载阶段：**

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `willUnmount` | - | `void` | 组件即将卸载时调用 |
| `didUnmount` | - | `void` | 组件卸载完成后调用 |

#### 实例方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `setState` | `partialState: Partial<S>, callback?: () => void` | `void` | 更新组件状态 |
| `forceUpdate` | `callback?: () => void` | `void` | 强制组件更新 |
| `setAnimate` | `animate: boolean` | `void` | 设置是否启用动画 |
| `destroy` | - | `void` | 销毁组件 |

#### 使用示例

```jsx
import { Component } from '@antv/f2';

class MyComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { count: 0 };
  }

  willMount() {
    console.log('组件即将挂载');
  }

  didMount() {
    console.log('组件已挂载');
  }

  render() {
    const { state, props } = this;
    return <text style={{ text: `Count: ${state.count}` }} />;
  }
}
```

---

