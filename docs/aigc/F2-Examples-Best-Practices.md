# @antv/F2 示例和最佳实践

本文档提供 F2 的常见使用场景、示例代码和最佳实践建议。

## 目录

1. [常见图表示例](#常见图表示例)
2. [高级功能示例](#高级功能示例)
3. [多端适配](#多端适配)
4. [性能优化](#性能优化)
5. [最佳实践](#最佳实践)

---

## 常见图表示例

### 1. 基础柱状图

```jsx
import { Canvas, Chart, Interval, Axis, Tooltip } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const context = document.getElementById('canvas').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart 
      data={data}
      scale={{
        sold: {
          tickCount: 5,
          min: 0
        }
      }}
    >
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
      <Tooltip />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

### 2. 分组柱状图

```jsx
import { Canvas, Chart, Interval, Axis, Legend, Tooltip } from '@antv/f2';

const data = [
  { year: '2018', type: 'A类', value: 100 },
  { year: '2018', type: 'B类', value: 120 },
  { year: '2019', type: 'A类', value: 150 },
  { year: '2019', type: 'B类', value: 140 },
  { year: '2020', type: 'A类', value: 180 },
  { year: '2020', type: 'B类', value: 160 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="year" />
    <Axis field="value" />
    <Legend position="top" />
    <Interval 
      x="year" 
      y="value" 
      color="type"
      adjust="dodge"  // 分组
    />
    <Tooltip />
  </Chart>
</Canvas>
```

### 3. 堆叠柱状图

```jsx
import { Canvas, Chart, Interval, Axis, Legend, Tooltip } from '@antv/f2';

const data = [
  { year: '2018', type: 'A类', value: 100 },
  { year: '2018', type: 'B类', value: 120 },
  { year: '2019', type: 'A类', value: 150 },
  { year: '2019', type: 'B类', value: 140 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="year" />
    <Axis field="value" />
    <Legend position="top" />
    <Interval 
      x="year" 
      y="value" 
      color="type"
      adjust="stack"  // 堆叠
    />
    <Tooltip />
  </Chart>
</Canvas>
```

### 4. 条形图（横向柱状图）

```jsx
import { Canvas, Chart, Interval, Axis, Tooltip } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart 
    data={data}
    coord={{ transposed: true }}  // 转置坐标系
  >
    <Axis field="genre" />
    <Axis field="sold" />
    <Interval x="genre" y="sold" color="genre" />
    <Tooltip />
  </Chart>
</Canvas>
```

### 5. 折线图

```jsx
import { Canvas, Chart, Line, Axis, Tooltip } from '@antv/f2';

const data = [
  { date: '2020-01', value: 100 },
  { date: '2020-02', value: 120 },
  { date: '2020-03', value: 140 },
  { date: '2020-04', value: 130 },
  { date: '2020-05', value: 160 },
  { date: '2020-06', value: 180 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="value" />
    <Line x="date" y="value" />
    <Tooltip showCrosshairs />
  </Chart>
</Canvas>
```

### 6. 多条折线图

```jsx
import { Canvas, Chart, Line, Axis, Legend, Tooltip } from '@antv/f2';

const data = [
  { date: '2020-01', value: 100, type: 'A' },
  { date: '2020-02', value: 120, type: 'A' },
  { date: '2020-03', value: 140, type: 'A' },
  { date: '2020-01', value: 90, type: 'B' },
  { date: '2020-02', value: 110, type: 'B' },
  { date: '2020-03', value: 130, type: 'B' },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="value" />
    <Legend position="top" />
    <Line x="date" y="value" color="type" />
    <Tooltip showCrosshairs showItemMarker />
  </Chart>
</Canvas>
```

### 7. 平滑曲线图

```jsx
import { Canvas, Chart, Line, Axis, Tooltip } from '@antv/f2';

const data = [
  { date: '2020-01', value: 100 },
  { date: '2020-02', value: 120 },
  { date: '2020-03', value: 140 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="value" />
    <Line 
      x="date" 
      y="value"
      shape="smooth"  // 平滑曲线
    />
    <Tooltip showCrosshairs />
  </Chart>
</Canvas>
```

### 8. 面积图

```jsx
import { Canvas, Chart, Area, Axis, Tooltip } from '@antv/f2';

const data = [
  { date: '2020-01', value: 100 },
  { date: '2020-02', value: 120 },
  { date: '2020-03', value: 140 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="value" />
    <Area 
      x="date" 
      y="value"
      style={{
        fill: 'l(90) 0:#1890FF 1:#ffffff'  // 渐变填充
      }}
    />
    <Tooltip showCrosshairs />
  </Chart>
</Canvas>
```

### 9. 堆叠面积图

```jsx
import { Canvas, Chart, Area, Axis, Legend, Tooltip } from '@antv/f2';

const data = [
  { date: '2020-01', value: 100, type: 'A' },
  { date: '2020-02', value: 120, type: 'A' },
  { date: '2020-01', value: 80, type: 'B' },
  { date: '2020-02', value: 90, type: 'B' },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="value" />
    <Legend position="top" />
    <Area 
      x="date" 
      y="value" 
      color="type"
      adjust="stack"  // 堆叠
    />
    <Tooltip showCrosshairs />
  </Chart>
</Canvas>
```

### 10. 饼图

```jsx
import { Canvas, Chart, Interval, Legend, PieLabel } from '@antv/f2';

const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.21, a: '1' },
  { name: '机器之血', percent: 0.17, a: '1' },
  { name: '心理罪', percent: 0.13, a: '1' },
  { name: '寻梦环游记', percent: 0.09, a: '1' },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart 
    data={data}
    coord={{ 
      type: 'polar',     // 极坐标
      transposed: true   // 转置
    }}
  >
    <Legend position="right" />
    <Interval 
      x="a" 
      y="percent" 
      adjust="stack" 
      color="name"
    />
    <PieLabel 
      label1={(data) => data.name}
      label2={(data) => `${(data.percent * 100).toFixed(1)}%`}
    />
  </Chart>
</Canvas>
```

### 11. 环形图

```jsx
import { Canvas, Chart, Interval, Legend, PieLabel } from '@antv/f2';

const data = [
  { name: 'A', percent: 0.4, a: '1' },
  { name: 'B', percent: 0.3, a: '1' },
  { name: 'C', percent: 0.3, a: '1' },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart 
    data={data}
    coord={{ 
      type: 'polar',
      transposed: true,
      innerRadius: 0.5  // 内半径，形成环形
    }}
  >
    <Legend position="right" />
    <Interval 
      x="a" 
      y="percent" 
      adjust="stack" 
      color="name"
    />
    <PieLabel 
      label1={(data) => data.name}
      label2={(data) => `${(data.percent * 100).toFixed(1)}%`}
    />
  </Chart>
</Canvas>
```

### 12. 散点图

```jsx
import { Canvas, Chart, Point, Axis, Tooltip } from '@antv/f2';

const data = [
  { height: 160, weight: 50, gender: 'male' },
  { height: 165, weight: 55, gender: 'male' },
  { height: 155, weight: 48, gender: 'female' },
  { height: 158, weight: 52, gender: 'female' },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="height" />
    <Axis field="weight" />
    <Point 
      x="height" 
      y="weight" 
      color="gender"
      size={4}
    />
    <Tooltip showCrosshairs />
  </Chart>
</Canvas>
```

### 13. 气泡图

```jsx
import { Canvas, Chart, Point, Axis, Tooltip } from '@antv/f2';

const data = [
  { x: 10, y: 20, z: 100 },
  { x: 20, y: 30, z: 200 },
  { x: 30, y: 25, z: 150 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="x" />
    <Axis field="y" />
    <Point 
      x="x" 
      y="y" 
      size="z"  // 大小映射
      color="z"  // 颜色映射
    />
    <Tooltip showCrosshairs />
  </Chart>
</Canvas>
```

### 14. 雷达图

```jsx
import { Canvas, Chart, Line, Area, Axis } from '@antv/f2';

const data = [
  { item: '语文', score: 80 },
  { item: '数学', score: 90 },
  { item: '英语', score: 85 },
  { item: '物理', score: 75 },
  { item: '化学', score: 88 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart 
    data={data}
    coord={{ 
      type: 'polar'  // 极坐标
    }}
    scale={{
      score: {
        min: 0,
        max: 100
      }
    }}
  >
    <Axis field="item" />
    <Axis field="score" />
    <Line x="item" y="score" />
    <Area 
      x="item" 
      y="score"
      style={{
        fillOpacity: 0.3
      }}
    />
  </Chart>
</Canvas>
```

### 15. K线图（蜡烛图）

```jsx
import { Canvas, Chart, Candlestick, Axis, Tooltip } from '@antv/f2';

const data = [
  { date: '2020-01-01', open: 100, close: 110, high: 120, low: 95 },
  { date: '2020-01-02', open: 110, close: 105, high: 115, low: 100 },
  { date: '2020-01-03', open: 105, close: 115, high: 120, low: 103 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="close" />
    <Candlestick
      x="date"
      y={['open', 'close', 'high', 'low']}
    />
    <Tooltip />
  </Chart>
</Canvas>
```

---

## 高级功能示例

### 1. 选中交互

```jsx
import { Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="genre" />
    <Axis field="sold" />
    <Interval 
      x="genre" 
      y="sold"
      selection={{
        type: 'single',  // 单选，或 'multiple' 多选
        triggerOn: 'click',  // 触发方式
        selectedStyle: {
          fillOpacity: 1
        },
        unSelectedStyle: {
          fillOpacity: 0.4
        },
        onChange: (selected) => {
          console.log('选中的数据:', selected);
        }
      }}
    />
  </Chart>
</Canvas>
```

### 2. 辅助线和辅助区域

```jsx
import { 
  Canvas, Chart, Line, Axis, Tooltip,
  Guide, LineGuide, RectGuide, TextGuide
} from '@antv/f2';

const data = [
  { date: '2020-01', value: 100 },
  { date: '2020-02', value: 120 },
  { date: '2020-03', value: 140 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="value" />
    <Line x="date" y="value" />
    <Tooltip showCrosshairs />
    
    {/* 平均线 */}
    <Guide>
      <LineGuide 
        records={[
          { date: '2020-01', value: 120 },
          { date: '2020-03', value: 120 }
        ]}
        style={{
          stroke: 'red',
          lineDash: [4, 4]
        }}
      />
      <TextGuide
        records={[{ date: '2020-03', value: 120 }]}
        content="平均值"
        style={{ fill: 'red' }}
        offsetX={10}
      />
    </Guide>
    
    {/* 目标区域 */}
    <Guide>
      <RectGuide 
        records={[
          { date: '2020-01', value: 130 },
          { date: '2020-03', value: 150 }
        ]}
        style={{
          fill: 'rgba(255, 0, 0, 0.1)'
        }}
      />
    </Guide>
  </Chart>
</Canvas>
```

### 3. 数据滚动和缩放

```jsx
import { Canvas, Chart, Line, Axis, ScrollBar, Zoom } from '@antv/f2';

// 大量数据
const data = Array.from({ length: 100 }, (_, i) => ({
  date: `Day ${i + 1}`,
  value: Math.random() * 100
}));

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="value" />
    <Line x="date" y="value" />
    
    {/* 滚动条 */}
    <ScrollBar 
      mode="x"
      range={[0, 0.3]}  // 初始显示前30%
    />
    
    {/* 缩放 */}
    <Zoom 
      mode="x"
      minScale={1}
      maxScale={5}
    />
  </Chart>
</Canvas>
```

### 4. 动态数据更新

```jsx
import { Canvas, Chart, Line, Axis } from '@antv/f2';
import { useState, useEffect } from 'react';

function DynamicChart() {
  const [data, setData] = useState([
    { date: '2020-01', value: 100 },
    { date: '2020-02', value: 120 },
  ]);
  
  const chartRef = { current: null };
  
  useEffect(() => {
    const timer = setInterval(() => {
      const newData = [...data, {
        date: `2020-${data.length + 1}`,
        value: Math.random() * 200
      }];
      setData(newData);
      
      // 更新图表数据
      if (chartRef.current) {
        chartRef.current.changeData(newData);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [data]);
  
  return (
    <Canvas context={context} pixelRatio={window.devicePixelRatio}>
      <Chart ref={chartRef} data={data}>
        <Axis field="date" />
        <Axis field="value" />
        <Line x="date" y="value" />
      </Chart>
    </Canvas>
  );
}
```

### 5. 自定义 Tooltip

```jsx
import { Canvas, Chart, Line, Axis, Tooltip } from '@antv/f2';

const data = [
  { date: '2020-01', value: 100 },
  { date: '2020-02', value: 120 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Axis field="date" />
    <Axis field="value" />
    <Line x="date" y="value" />
    <Tooltip
      custom={true}
      render={(records) => {
        if (!records || records.length === 0) return null;
        const record = records[0];
        
        return (
          <group>
            <rect
              attrs={{
                x: 0,
                y: 0,
                width: 120,
                height: 60,
                fill: 'rgba(0, 0, 0, 0.8)',
                radius: 4
              }}
            />
            <text
              attrs={{
                x: 10,
                y: 20,
                text: `日期: ${record.date}`,
                fontSize: 12,
                fill: '#fff'
              }}
            />
            <text
              attrs={{
                x: 10,
                y: 40,
                text: `数值: ${record.value}`,
                fontSize: 12,
                fill: '#fff'
              }}
            />
          </group>
        );
      }}
    />
  </Chart>
</Canvas>
```

### 6. 双轴图表

```jsx
import { Canvas, Chart, Line, Interval, Axis } from '@antv/f2';

const data = [
  { month: '1月', temperature: 7, rainfall: 20 },
  { month: '2月', temperature: 8, rainfall: 25 },
  { month: '3月', temperature: 12, rainfall: 30 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    {/* 左侧Y轴 - 温度 */}
    <Axis field="month" />
    <Axis 
      field="temperature"
      label={{
        style: { fill: '#1890FF' }
      }}
    />
    
    {/* 右侧Y轴 - 降雨量 */}
    <Axis 
      field="rainfall"
      position="right"
      label={{
        style: { fill: '#52C41A' }
      }}
    />
    
    {/* 温度折线 */}
    <Line 
      x="month" 
      y="temperature"
      color="#1890FF"
    />
    
    {/* 降雨量柱状图 */}
    <Interval 
      x="month" 
      y="rainfall"
      color="#52C41A"
    />
  </Chart>
</Canvas>
```

---

## 多端适配

### 1. H5 环境

```jsx
import { Canvas, Chart, Line } from '@antv/f2';

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

const { props } = (
  <Canvas 
    context={context} 
    pixelRatio={window.devicePixelRatio}
    width={canvas.width}
    height={canvas.height}
  >
    <Chart data={data}>
      <Line x="date" y="value" />
    </Chart>
  </Canvas>
);

const canvasInstance = new Canvas(props);
canvasInstance.render();
```

### 2. 微信小程序

```javascript
// wxml
<canvas 
  type="2d" 
  id="myCanvas" 
  style="width: 100%; height: 300px;"
/>

// js
import { Canvas, Chart, Line } from '@antv/f2';

Page({
  onReady() {
    const query = wx.createSelectorQuery();
    query
      .select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const context = canvas.getContext('2d');
        
        const { props } = (
          <Canvas 
            context={context}
            pixelRatio={wx.getSystemInfoSync().pixelRatio}
            width={res[0].width}
            height={res[0].height}
          >
            <Chart data={data}>
              <Line x="date" y="value" />
            </Chart>
          </Canvas>
        );
        
        const canvasInstance = new Canvas(props);
        canvasInstance.render();
      });
  }
});
```

### 3. React 环境

```jsx
import React, { useEffect, useRef } from 'react';
import { Canvas, Chart, Line } from '@antv/f2';

function F2Chart({ data }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const context = canvasRef.current.getContext('2d');
    
    const { props } = (
      <Canvas 
        context={context}
        pixelRatio={window.devicePixelRatio}
      >
        <Chart data={data}>
          <Line x="date" y="value" />
        </Chart>
      </Canvas>
    );
    
    chartInstanceRef.current = new Canvas(props);
    chartInstanceRef.current.render();
    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);
  
  // 数据更新
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.update({ data });
    }
  }, [data]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '300px' }}
    />
  );
}
```

### 4. Vue 环境

```vue
<template>
  <canvas ref="canvasRef" style="width: 100%; height: 300px"></canvas>
</template>

<script>
import { Canvas, Chart, Line } from '@antv/f2';

export default {
  props: ['data'],
  
  mounted() {
    this.renderChart();
  },
  
  watch: {
    data() {
      this.updateChart();
    }
  },
  
  methods: {
    renderChart() {
      const context = this.$refs.canvasRef.getContext('2d');
      
      const { props } = (
        <Canvas 
          context={context}
          pixelRatio={window.devicePixelRatio}
        >
          <Chart data={this.data}>
            <Line x="date" y="value" />
          </Chart>
        </Canvas>
      );
      
      this.chartInstance = new Canvas(props);
      this.chartInstance.render();
    },
    
    updateChart() {
      if (this.chartInstance) {
        this.chartInstance.update({ data: this.data });
      }
    }
  },
  
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
};
</script>
```

---

## 性能优化

### 1. 大数据量优化

```jsx
import { Canvas, Chart, Line, ScrollBar } from '@antv/f2';

// 对于大量数据，使用滚动条只显示部分数据
const largeData = Array.from({ length: 10000 }, (_, i) => ({
  x: i,
  y: Math.random() * 100
}));

<Canvas context={context}>
  <Chart data={largeData}>
    <Line x="x" y="y" />
    <ScrollBar mode="x" range={[0, 0.1]} />  {/* 只显示10% */}
  </Chart>
</Canvas>
```

### 2. 按需加载

```jsx
// 只导入需要的组件
import { Canvas, Chart, Line, Axis } from '@antv/f2';
// 而不是：import * as F2 from '@antv/f2';

// 这样可以减少打包体积
```

### 3. 关闭不必要的动画

```jsx
<Canvas context={context} animate={false}>
  <Chart data={data}>
    <Line 
      x="date" 
      y="value"
      animation={false}  // 关闭动画
    />
  </Chart>
</Canvas>
```

### 4. 使用防抖处理数据更新

```jsx
import { debounce } from 'lodash';

const updateChart = debounce((newData) => {
  if (chartRef.current) {
    chartRef.current.changeData(newData);
  }
}, 300);

// 使用
updateChart(newData);
```

---

## 最佳实践

### 1. 数据准备

```javascript
// ✅ 推荐：清晰的数据结构
const data = [
  { category: 'A', value: 100, type: 'type1' },
  { category: 'B', value: 120, type: 'type1' },
];

// ❌ 不推荐：不一致的数据结构
const data = [
  { cat: 'A', val: 100 },
  { category: 'B', value: 120 },
];
```

### 2. 度量配置

```jsx
// ✅ 推荐：明确配置度量
<Chart 
  data={data}
  scale={{
    value: {
      min: 0,
      max: 200,
      tickCount: 5,
      nice: true  // 优化刻度
    }
  }}
>

// ❌ 不推荐：依赖自动推断
<Chart data={data}>
```

### 3. 颜色使用

```jsx
// ✅ 推荐：使用语义化的颜色
<Line 
  x="date" 
  y="value"
  color={{
    field: 'type',
    range: ['#1890FF', '#52C41A', '#FAAD14']  // AntV 标准色
  }}
/>

// ✅ 推荐：对于分类较多的情况，使用色板
const colors = [
  '#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16',
  '#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D'
];

<Line color={{ field: 'category', range: colors }} />
```

### 4. 响应式设计

```jsx
// 获取容器宽高
const container = document.getElementById('container');
const width = container.clientWidth;
const height = container.clientHeight;

<Canvas 
  context={context}
  pixelRatio={window.devicePixelRatio}
  width={width}
  height={height}
>
  <Chart data={data}>
    {/* ... */}
  </Chart>
</Canvas>

// 监听窗口大小变化
window.addEventListener('resize', () => {
  // 重新渲染图表
  canvas.update({
    width: container.clientWidth,
    height: container.clientHeight
  });
});
```

### 5. 错误处理

```jsx
try {
  const { props } = (
    <Canvas context={context}>
      <Chart data={data}>
        <Line x="date" y="value" />
      </Chart>
    </Canvas>
  );
  
  const canvas = new Canvas(props);
  await canvas.render();
} catch (error) {
  console.error('图表渲染失败:', error);
  // 显示错误提示或降级方案
}
```

### 6. 内存管理

```jsx
// 组件卸载时销毁图表
useEffect(() => {
  const canvas = new Canvas(props);
  canvas.render();
  
  return () => {
    canvas.destroy();  // 清理资源
  };
}, []);
```

### 7. 主题定制

```jsx
// 定义全局主题
const customTheme = {
  colors: ['#1890FF', '#52C41A', '#FAAD14'],
  pixelRatio: 2,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI"',
  defaultColor: '#1890FF',
  
  // 坐标轴
  axis: {
    line: {
      stroke: '#E8E8E8',
      lineWidth: 1
    },
    label: {
      fill: '#666',
      fontSize: 12
    },
    grid: {
      stroke: '#E8E8E8',
      lineWidth: 1,
      lineDash: [2, 2]
    }
  },
  
  // 图例
  legend: {
    nameStyle: {
      fill: '#666',
      fontSize: 12
    }
  },
  
  // Tooltip
  tooltip: {
    background: {
      fill: 'rgba(0, 0, 0, 0.75)',
      radius: 4
    },
    nameStyle: {
      fill: '#fff',
      fontSize: 12
    },
    valueStyle: {
      fill: '#fff',
      fontSize: 12
    }
  }
};

// 使用主题
<Chart data={data} theme={customTheme}>
  {/* ... */}
</Chart>
```

### 8. 代码组织

```jsx
// ✅ 推荐：组件化
function BarChart({ data, xField, yField }) {
  return (
    <Canvas context={context}>
      <Chart data={data}>
        <Axis field={xField} />
        <Axis field={yField} />
        <Interval x={xField} y={yField} />
        <Tooltip />
      </Chart>
    </Canvas>
  );
}

// 使用
<BarChart data={data} xField="genre" yField="sold" />
```

---

## 常见问题解决

### 1. 图表不显示

```jsx
// 检查 canvas context 是否正确获取
const canvas = document.getElementById('myCanvas');
if (!canvas) {
  console.error('Canvas 元素未找到');
  return;
}

const context = canvas.getContext('2d');
if (!context) {
  console.error('无法获取 2d 上下文');
  return;
}

// 确保 canvas 有宽高
canvas.width = 375;
canvas.height = 300;
```

### 2. 数据更新不生效

```jsx
// ✅ 使用 changeData 方法
chartRef.current.changeData(newData);

// ❌ 直接修改 props 不会触发更新
props.data = newData;  // 不会生效
```

### 3. 小程序中显示异常

```javascript
// 确保使用 type="2d" 的 canvas
<canvas type="2d" id="myCanvas"></canvas>

// 确保正确设置 pixelRatio
const pixelRatio = wx.getSystemInfoSync().pixelRatio;
<Canvas pixelRatio={pixelRatio}>
```

---

## 总结

本文档提供了 F2 的常见使用场景和最佳实践，包括：

1. **15+ 常见图表示例**：涵盖柱状图、折线图、饼图、散点图等
2. **高级功能**：选中交互、辅助标记、数据更新、自定义 Tooltip 等
3. **多端适配**：H5、小程序、React、Vue 的使用方式
4. **性能优化**：大数据处理、按需加载、动画优化等
5. **最佳实践**：数据准备、主题定制、错误处理、内存管理等

通过这些示例和实践，可以帮助你快速上手 F2，并构建高质量的数据可视化应用。
