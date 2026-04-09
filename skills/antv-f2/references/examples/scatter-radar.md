# F2 散点图与雷达图示例

## 9. 散点图

### 使用场景
- 分析两个连续变量之间的相关性
- 识别数据中的异常值和离群点
- 展示数据的分布和聚类模式
- 多维数据的可视化分析

### 基础散点图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Point, Axis } from '@antv/f2';

fetch('https://gw.alipayobjects.com/os/antfincdn/6HodecuhvM/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const context = document.getElementById('container').getContext('2d');

    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          data={data}
          scale={{
            height: { tickCount: 5 },
            weight: { tickCount: 5 },
          }}
        >
          <Axis field="height" />
          <Axis field="weight" />
          <Point x="height" y="weight" color="gender" style={{ fillOpacity: 0.65 }} />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `x` | X 轴字段 | `"height"` |
| `y` | Y 轴字段 | `"weight"` |
| `color` | 颜色分组字段 | `"gender"` |
| `style.fillOpacity` | 填充透明度 | `0.65` |

---

## 10. 雷达图

### 使用场景
- 多维数据的综合评估和比较
- 个人或产品的能力模型展示
- 绩效评估和竞品分析
- 多指标体系的可视化展示

### 基础雷达图

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Point, Line, Axis, Legend } from '@antv/f2';

const data = [
  { item: 'Design', user: '用户 A', score: 70 },
  { item: 'Design', user: '用户 B', score: 30 },
  { item: 'Development', user: '用户 A', score: 60 },
  { item: 'Development', user: '用户 B', score: 70 },
  { item: 'Marketing', user: '用户 A', score: 50 },
  { item: 'Marketing', user: '用户 B', score: 60 },
  { item: 'Users', user: '用户 A', score: 40 },
  { item: 'Users', user: '用户 B', score: 50 },
  { item: 'Test', user: '用户 A', score: 60 },
  { item: 'Test', user: '用户 B', score: 70 },
  { item: 'Language', user: '用户 A', score: 70 },
  { item: 'Language', user: '用户 B', score: 50 },
  { item: 'Technology', user: '用户 A', score: 70 },
  { item: 'Technology', user: '用户 B', score: 40 },
  { item: 'Support', user: '用户 A', score: 60 },
  { item: 'Support', user: '用户 B', score: 40 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord="polar"
      scale={{
        score: {
          min: 0,
          max: 120,
          nice: false,
          tickCount: 4,
        },
      }}
    >
      <Axis field="item" />
      <Axis field="score" />
      <Line x="item" y="score" color="user" />
      <Point x="item" y="score" color="user" />
      <Legend />
    </Chart>
  </Canvas>
);
```

### 关键配置项

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `coord` | 坐标系类型 | `"polar"` |
| `scale.score.min` | 最小值 | `0` |
| `scale.score.max` | 最大值 | `120` |
| `scale.score.nice` | 是否优化刻度 | `false` |

---

