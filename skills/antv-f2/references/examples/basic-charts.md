# F2 基础图表示例

## 1. 基础图表

### 使用场景
- 快速上手 F2 图表库
- 了解 F2 的基本组件和配置
- 作为开发更复杂图表的起点

### 基础示例代码

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Tooltip, Axis, Legend } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

// F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Legend />
      <Axis field="genre" />
      <Axis field="sold" />
      <Tooltip showTooltipMarker={true} />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

### 关键 API 调用模式

1. **创建 Canvas 容器**：`<Canvas context={context} pixelRatio={window.devicePixelRatio}>`
2. **创建图表**：`<Chart data={data}>`
3. **添加坐标轴**：`<Axis field="fieldName" />`
4. **添加图例**：`<Legend />`
5. **添加提示框**：`<Tooltip />`
6. **添加图形**：`<Interval x="xField" y="yField" />`

---

## 2. 折线图

### 使用场景
- 展示时间序列数据的变化趋势
- 对比多个数据系列的走势
- 分析数据的周期性和波动性
- 预测和趋势分析

### 基础折线图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Line, Axis, Tooltip } from '@antv/f2';

const data = [
  { date: '2017-06-05', value: 116 },
  { date: '2017-06-06', value: 129 },
  { date: '2017-06-07', value: 135 },
  { date: '2017-06-08', value: 86 },
  { date: '2017-06-09', value: 73 },
  // ... 更多数据
];

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="date" tickCount={3} style={{ label: { align: 'between' } }} />
      <Axis field="value" tickCount={5} />
      <Line x="date" y="value" />
      <Tooltip />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 对比折线图（多系列）

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Line, Axis, Legend } from '@antv/f2';

const data = [
  { date: '2017-06-05', value: 116, type: 'A' },
  { date: '2017-06-05', value: 129, type: 'B' },
  // ... 更多数据
];

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis field="date" tickCount={3} />
      <Axis field="value" tickCount={5} />
      <Line x="date" y="value" lineWidth="4px" color="type" />
      <Legend position="top" />
    </Chart>
  </Canvas>
);
```

### 动态折线图

```jsx
/** @jsx jsx */
import { jsx, Component, Canvas, Chart, Line, Axis } from '@antv/f2';

const data = [{ time: new Date().getTime(), value: 12 }];

function getRecord() {
  return {
    time: new Date().getTime(),
    value: Math.random() * 2 + 10,
  };
}

class DynamicLine extends Component {
  constructor(props) {
    super(props);
    this.state = { data };
  }

  didMount() {
    setInterval(() => {
      const { data } = this.state;
      const newData = [].concat(data);
      newData.push(getRecord());
      this.setState({ data: newData });
    }, 1000);
  }

  render() {
    const { data } = this.state;
    return (
      <Chart data={data} scale={{ value: { min: 0 } }}>
        <Axis field="value" />
        <Axis field="time" type="timeCat" tickCount={5} mask="mm:ss" />
        <Line x="time" y="value" />
      </Chart>
    );
  }
}
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `x` | X 轴字段 | `"date"` |
| `y` | Y 轴字段 | `"value"` |
| `color` | 颜色字段 | `"type"` |
| `lineWidth` | 线宽 | `"4px"` |
| `connectNulls` | 是否连接空值 | `false` |

---

## 3. 面积图

### 使用场景
- 展示数据随时间的变化趋势和累积量
- 强调数据的总体规模和量级
- 对比不同时期的数据差异
- 展示连续数据的分布情况

### 基础面积图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Area, Line, Axis, Tooltip } from '@antv/f2';

const data = [
  { time: 'Jan.', tem: 1000 },
  { time: 'Feb.', tem: 2200 },
  { time: 'Mar.', tem: 2000 },
  { time: 'Apr.', tem: 2600 },
  { time: 'May.', tem: 2000 },
  { time: 'Jun.', tem: 2600 },
  { time: 'Jul.', tem: 2800 },
  { time: 'Aug.', tem: 2000 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        tem: { min: 0, tickCount: 5 },
        time: { range: [0, 1] },
      }}
    >
      <Axis field="time" />
      <Axis field="tem" />
      <Area x="time" y="tem" />
      <Line x="time" y="tem" />
      <Tooltip />
    </Chart>
  </Canvas>
);
```

### 层叠面积图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Area, Line, Axis, Legend } from '@antv/f2';

const data = [
  { value: 63.4, city: 'New York', date: '2011-10-01' },
  { value: 62.7, city: 'Alaska', date: '2011-10-01' },
  { value: 72.2, city: 'Austin', date: '2011-10-01' },
  // ... 更多数据
];

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      scale={{
        date: { range: [0, 1], type: 'timeCat', mask: 'MM-DD', tickCount: 5 },
        value: { max: 300, tickCount: 4 },
      }}
    >
      <Axis field="value" />
      <Axis field="date" style={{ label: { align: 'between' } }} />
      <Area x="date" y="value" color="city" adjust="stack" />
      <Line x="date" y="value" color="city" adjust="stack" />
      <Legend style={{ justifyContent: 'space-around' }} />
    </Chart>
  </Canvas>
);
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `x` | X 轴字段 | `"time"` |
| `y` | Y 轴字段 | `"tem"` |
| `color` | 颜色分组字段 | `"city"` |
| `adjust` | 调整类型 | `"stack"` |

---

## 4. 柱状图

### 使用场景
- 展示分类数据的数值比较
- 排名和排序数据的可视化
- 时间序列数据的离散展示
- 统计分析和报表展示

### 基础柱状图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Tooltip, Axis } from '@antv/f2';

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        sales: { tickCount: 5 },
      }}
    >
      <Axis field="year" />
      <Axis field="sales" />
      <Interval x="year" y="sales" />
      <Tooltip />
    </Chart>
  </Canvas>
);
```

### 分组柱状图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
  // ... 更多数据
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="月份" />
      <Axis field="月均降雨量" />
      <Interval
        x="月份"
        y="月均降雨量"
        color="name"
        adjust={{
          type: 'dodge',
          marginRatio: 0.05,
        }}
      />
    </Chart>
  </Canvas>
);
```

### 堆叠柱状图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="State" />
      <Axis field="人口数量" />
      <Interval x="State" y="人口数量" color="年龄段" adjust="stack" />
    </Chart>
  </Canvas>
);
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `x` | X 轴字段 | `"year"` |
| `y` | Y 轴字段 | `"sales"` |
| `color` | 颜色分组字段 | `"name"` |
| `adjust` | 调整类型 | `"stack"` / `dodge` |
| `adjust.marginRatio` | 分组间距比例 | `0.05` |

---

## 5. 条形图

### 使用场景
- 展示分类数据之间的数值比较
- 显示时间序列数据的变化趋势
- 对比不同类别的数据大小
- 展示数据的排名和分布

### 基础条形图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        transposed: true,
      }}
      scale={{
        sales: { tickCount: 5 },
      }}
    >
      <Axis field="year" />
      <Axis field="sales" />
      <Interval x="year" y="sales" />
    </Chart>
  </Canvas>
);
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `coord.transposed` | 是否转置（水平/垂直） | `true` |

---

