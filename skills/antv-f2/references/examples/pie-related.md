# F2 饼图系列示例

## 6. 饼图

### 使用场景
- 展示各个类别在总体中的占比
- 分析数据的构成比例
- 对比不同类别的相对大小
- 展示百分比分布情况

### 基础饼图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const data = [
  { name: '长津湖', percent: 0.4, a: '1' },
  { name: '我和我的父辈', percent: 0.2, a: '1' },
  { name: '失控玩家', percent: 0.18, a: '1' },
  { name: '宝可梦', percent: 0.15, a: '1' },
  { name: '峰爆', percent: 0.05, a: '1' },
  { name: '其他', percent: 0.02, a: '1' },
];

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        transposed: true,
        type: 'polar',
      }}
    >
      <Interval
        x="a"
        y="percent"
        adjust="stack"
        color={{
          field: 'name',
          range: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
        }}
      />
      <Legend position="right" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 可选中饼图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, PieLabel } from '@antv/f2';

const data = [
  { name: '长津湖', percent: 0.4, a: '1' },
  { name: '我和我的父辈', percent: 0.2, a: '1' },
  // ... 更多数据
];

const { props } = (
  <Canvas context={context}>
    <Chart data={data} coord={{ transposed: true, type: 'polar' }}>
      <Interval
        x="a"
        y="percent"
        adjust="stack"
        color="name"
        selection={{
          selectedStyle: (record) => {
            const { yMax, yMin } = record;
            return {
              r: (yMax - yMin) * 1.1,
            };
          },
        }}
      />
      <PieLabel
        type="spider"
        label1={(data, record) => {
          return {
            text: data.name,
            fill: record.color,
          };
        }}
        label2=""
      />
    </Chart>
  </Canvas>
);
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `coord.type` | 坐标系类型 | `"polar"` |
| `coord.transposed` | 是否转置 | `true` |
| `adjust` | 调整类型 | `"stack"` |

---

## 7. 环形图

### 使用场景
- 展示数据占比的同时显示总计信息
- 节省空间的比例展示
- 突出显示重要的汇总数据
- 多层级数据的嵌套展示

### 基础环形图

```jsx
/** @jsx jsx */
import { Canvas, Chart, Interval, jsx, Legend } from '@antv/f2';

const data = [
  { name: '股票类', percent: 83.59, a: '1' },
  { name: '债券类', percent: 2.17, a: '1' },
  { name: '现金类', percent: 14.24, a: '1' },
];

const context = document.getElementById('container').getContext('2d');

const Text = (props, context) => {
  const { coord } = props;
  const { center } = coord;
  return (
    <group
      style={{
        display: 'flex',
        left: center.x,
        top: center.y - context.px2hd('30px'),
        width: '100px',
      }}
    >
      <text
        style={{
          text: '总资产',
          fill: '#000',
          textAlign: 'center',
        }}
      />
      <text
        style={{
          marginTop: '10px',
          text: '100.33亿元',
          fill: '#000',
          textAlign: 'center',
        }}
      />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} theme={{ padding: [20, 'auto'] }}>
    <Chart
      scale={{
        percent: {
          formatter: function formatter(val) {
            return val + '%';
          },
        },
      }}
      data={data}
      coord={{
        type: 'polar',
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85,
      }}
    >
      <Interval
        x="a"
        y="percent"
        adjust="stack"
        color={{
          field: 'name',
          range: ['#FE5D4D', '#3BA4FF', '#737DDE'],
        }}
      />
      <Legend position="right" />
      <Text />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `coord.innerRadius` | 内半径 | `0.7` |
| `coord.radius` | 外半径 | `0.85` |

---

## 8. 玫瑰图

### 使用场景
- 展示数值差异较大的分类数据
- 突出显示数据间的差异程度
- 周期性数据的可视化展示
- 需要同时展示分类和数值的场景

### 基础玫瑰图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const data = [
  { year: '2001', population: 41.8 },
  { year: '2002', population: 25.8 },
  { year: '2003', population: 31.7 },
  { year: '2004', population: 46 },
  { year: '2005', population: 28 },
];

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        type: 'polar',
      }}
      scale={{
        population: {
          min: 0,
        },
      }}
    >
      <Interval x="year" y="population" color="year" />
      <Legend position="right" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `coord.type` | 坐标系类型 | `"polar"` |

---

