# F2 专业图表示例

## 11. 蜡烛图

### 使用场景
- 股票价格走势分析
- 期货和外汇市场数据展示
- 金融技术分析和趋势预测
- 任何需要同时展示四个相关数值的场景

### 基础蜡烛图

```jsx
/** @jsx jsx */
import { Axis, Candlestick, Canvas, Chart, jsx, Tooltip } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  {
    time: '2017-10-24',
    // 格式为：[open, close, lowest, highest]
    value: [20, 34, 10, 38],
  },
  {
    time: '2017-10-25',
    value: [40, 35, 30, 50],
  },
  {
    time: '2017-10-26',
    value: [31, 38, 33, 44],
  },
  {
    time: '2017-10-27',
    value: [38, 15, 5, 42],
  },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="time" type="timeCat" />
      <Axis field="value" formatter={(v) => Number(v).toFixed(0)} />
      <Candlestick x="time" y="value" />
      <Tooltip showCrosshairs={true} yPositionType="coord" crosshairsType="xy" showXTip showYTip />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `x` | X 轴字段 | `"time"` |
| `y` | Y 轴字段（数组格式） | `"value"` |
| `Axis.type` | 轴类型 | `"timeCat"` |

---

## 12. 漏斗图

### 使用场景
- 用户转化流程分析
- 销售漏斗和营销效果评估
- 业务流程各环节效率分析
- 产品功能使用路径分析

### 基础漏斗图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const data = [
  { action: '浏览网站', pv: 50000, percent: 1 },
  { action: '放入购物车', pv: 35000, percent: 0.7 },
  { action: '生成订单', pv: 25000, percent: 0.5 },
  { action: '支付订单', pv: 15000, percent: 0.3 },
  { action: '完成交易', pv: 8000, percent: 0.16 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        transposed: true,
      }}
      scale={{
        percent: { min: 0 },
        action: { range: [0, 1] },
      }}
    >
      <Interval
        x="action"
        y="percent"
        adjust="symmetric"
        shape="funnel"
        color={{
          field: 'action',
          range: ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'],
        }}
        showLabel
        labelCfg={{
          offsetX: 10,
          label: (data, color) => {
            return {
              text: data.action,
              fill: color,
            };
          },
          guide: (data) => {
            return {
              text: (data.percent * 100).toFixed(0) + '%',
              fill: '#fff',
            };
          },
        }}
      />
      <Legend />
    </Chart>
  </Canvas>
);
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `adjust` | 调整类型 | `"symmetric"` |
| `shape` | 图形形状 | `"funnel"` |
| `showLabel` | 是否显示标签 | `true` |

---

## 13. 金字塔图

### 使用场景
- 组织架构和层级关系展示
- 人口年龄结构分析
- 产品或服务的层级分类
- 数据的等级分布展示

### 基础金字塔图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const data = [
  { action: '浏览网站', pv: 50000, percent: 1 },
  { action: '放入购物车', pv: 35000, percent: 0.7 },
  { action: '生成订单', pv: 25000, percent: 0.5 },
  { action: '支付订单', pv: 15000, percent: 0.3 },
  { action: '完成交易', pv: 8000, percent: 0.16 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        transposed: true,
      }}
      scale={{
        percent: { min: 0 },
        action: { range: [0, 1] },
      }}
    >
      <Interval
        x="action"
        y="percent"
        adjust="symmetric"
        shape="pyramid"
        color={{
          field: 'action',
          range: ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'],
        }}
        showLabel
        labelCfg={{
          offsetX: 10,
          label: (data, color) => {
            return {
              text: data.action,
              fill: color,
            };
          },
          guide: (data) => {
            return {
              text: (data.percent * 100).toFixed(0) + '%',
              fill: '#fff',
            };
          },
        }}
      />
      <Legend />
    </Chart>
  </Canvas>
);
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `shape` | 图形形状 | `"pyramid"` |

---

## 14. 旭日图

### 使用场景
- 文件系统目录结构展示
- 组织架构的可视化
- 分类数据的层级展示
- 预算分配和资源分布分析

### 基础旭日图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Sunburst } from '@antv/f2';

fetch('https://gw.alipayobjects.com/os/antfincdn/9ZSLra9rgm/basic.json')
  .then((res) => res.json())
  .then((data) => {
    const context = document.getElementById('container').getContext('2d');

    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Sunburst
          data={data.children}
          coord={{
            type: 'polar',
          }}
          color={{
            field: 'name',
          }}
          value="value"
          space={4}
        />
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `data` | 层级数据 | `data.children` |
| `value` | 值字段 | `"value"` |
| `space` | 间隔 | `4` |

---

## 15. 矩形树图

### 使用场景
- 股票市场热力图展示
- 磁盘空间使用情况分析
- 预算分配和资源占用可视化
- 产品销售额的层级分析

### 基础矩形树图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Treemap } from '@antv/f2';

const data = [
  { name: '贵州茅台', value: 0.16, rate: 0.1 },
  { name: '贵州茅台1', value: 0.1, rate: -0.1 },
  { name: '五粮液', value: 0.13, rate: -0.1 },
  { name: '五粮液', value: 0.12, rate: -0.01 },
  { name: '招商银行', value: 0.15, rate: 0 },
  { name: '招商银行', value: 0.08, rate: 0 },
  { name: '中国平安', value: 0.07, rate: 0.1 },
  { name: '中国平安', value: 0.06, rate: 0.1 },
  { name: '同花顺', value: 0.1, rate: 0 },
  { name: '同花顺', value: 0.03, rate: 0 },
];

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Treemap
      data={data}
      color={{
        field: 'name',
      }}
      value="value"
      space={4}
    />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `data` | 数据数组 | `data` |
| `color.field` | 颜色字段 | `"name"` |
| `value` | 值字段 | `"value"` |
| `space` | 间隔 | `4` |

---

## 16. 仪表盘

### 使用场景
- 关键性能指标（KPI）监控
- 进度和完成度展示
- 实时数据状态监控
- 单一数值的直观展示

### 基础仪表盘

```jsx
/** @jsx jsx */
import { jsx, Canvas, Gauge } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Gauge
      center={{ x: 150, y: 150 }}
      startAngle={Math.PI}
      endAngle={Math.PI * 2}
      percent={0.5}
      r="200px"
      tickCount={6}
      tickOffset="-40px"
      tickLength="20px"
    />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `center` | 圆心位置 | `{ x: 150, y: 150 }` |
| `startAngle` | 起始角度 | `Math.PI` |
| `endAngle` | 结束角度 | `Math.PI * 2` |
| `percent` | 百分比 | `0.5` |
| `r` | 半径 | `"200px"` |

---

## 17. 组件示例

### 坐标轴 Axis

#### 自动旋转标签

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  { category: 'Category1', value: 10 },
  { category: 'Category2', value: 15 },
  // ... 更多数据
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="category" labelAutoRotate={true} />
      <Axis field="value" />
      <Interval x="category" y="value" color="#2FC25B" />
    </Chart>
  </Canvas>
);
```

#### API 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `field` | string | - | 绑定的数据字段名 |
| `labelAutoRotate` | boolean | false | 是否启用标签自动旋转 |
| `labelAutoHide` | boolean | false | 是否启用标签自动隐藏 |
| `safetyDistance` | number | 0 | 标签之间的安全距离 |
| `style` | object | - | 自定义样式配置 |

---

### 标注 Guide

#### 文本标注

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, TextGuide } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Interval x="genre" y="sold" />
      {data.map((item) => {
        const { sold } = item;
        return (
          <TextGuide
            records={[item]}
            onClick={(ev) => {
              console.log('ev: ', ev.points);
            }}
            content={`${sold}`}
            style={{
              fill: '#000',
              fontSize: '24px',
            }}
            offsetY={-20}
            offsetX={-15}
          />
        );
      })}
    </Chart>
  </Canvas>
);
```

#### 标注类型

- `TextGuide` - 文本标注
- `PointGuide` - 点标注
- `LineGuide` - 线标注
- `RectGuide` - 矩形标注
- `ImageGuide` - 图像标注
- `TagGuide` - 标记标注

---

### 放大镜 Magnifier

```jsx
/** @jsx jsx */
import { jsx, Component, Canvas, Chart, Line, Axis, Legend, Magnifier } from '@antv/f2';

class DynamicLine extends Component {
  render() {
    const { data } = this.state;
    return (
      <Chart data={data}>
        <Axis field="value" />
        <Axis field="date" tickCount={2} style={{ label: { align: 'between' } }} />
        <Line x="date" y="value" color="#D6BB91" />
        <Magnifier focusRange={[data.length - 9, data.length - 1]} />
        <Legend />
      </Chart>
    );
  }
}
```

#### 参数说明

| 参数 | 说明 | 类型 |
|------|------|------|
| `focusRange` | 聚焦的数据范围索引 | `[number, number]` |
| `radius` | 放大镜半径 | number \| string |
| `position` | 放大镜中心位置 | `[number, number]` |
| `offsetX` | X 方向偏移量 | number \| string |
| `offsetY` | Y 方向偏移量 | number \| string |
| `frameStyle` | 外框样式 | object |
| `lineStyle` | 内折线样式 | object |

---

## F2 核心调用模式总结

### 1. 基本结构

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      {/* 图表内容 */}
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 2. 常用组件

| 组件 | 用途 |
|------|------|
| `Axis` | 坐标轴 |
| `Legend` | 图例 |
| `Tooltip` | 提示框 |
| `Interval` | 柱状图/条形图 |
| `Line` | 折线图 |
| `Area` | 面积图 |
| `Point` | 散点图 |
| `Candlestick` | 蜡烛图 |
| `PieLabel` | 饼图标签 |

### 3. 坐标系配置

| 配置 | 说明 |
|------|------|
| `coord="polar"` | 极坐标 |
| `coord={{ transposed: true }}` | 转置坐标 |
| `coord={{ type: 'polar', innerRadius: 0.7 }}` | 环形图坐标 |

### 4. 数据调整

| 类型 | 说明 |
|------|------|
| `adjust="stack"` | 堆叠 |
| `adjust="dodge"` | 分组 |
| `adjust="symmetric"` | 对称（漏斗图） |

### 5. 图形形状

| 形状 | 适用场景 |
|------|----------|
| `shape="funnel"` | 漏斗图 |
| `shape="pyramid"` | 金字塔图 |
