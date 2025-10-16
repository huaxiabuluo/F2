# F2 AIGC 文档

本目录包含专门为大模型 AIGC 场景设计的 @antv/F2 使用文档。

## 文档结构

### 1. [F2-AIGC-Guide.md](./F2-AIGC-Guide.md) - 概览指南

F2 的总体介绍和快速入门指南，包括：
- 依赖关系说明（F2 → F-Engine → @antv/G）
- 核心概念和架构
- 快速开始示例
- 组件体系概览
- 数据处理和配置
- 图形属性映射
- 交互能力
- 常见问题

**适用场景**：初次使用 F2，需要了解整体架构和基本用法

### 2. [F2-Components-Detail.md](./F2-Components-Detail.md) - 组件详细文档

所有封装好的图表组件的详细说明，包括：
- **核心容器组件**：Canvas、Chart、Component
- **几何标记组件**：Line、Area、Interval、Point、Candlestick
- **辅助组件**：Axis、Legend、Tooltip、Guide、ScrollBar、Zoom
- **特殊图表组件**：Gauge、Treemap、Sunburst、PieLabel、Pictorial、Magnifier

每个组件都包含：
- Props 接口定义
- 详细使用示例
- 配置选项说明

**适用场景**：需要使用特定组件，查询组件的具体配置和用法

### 3. [F2-Basic-Shapes-Detail.md](./F2-Basic-Shapes-Detail.md) - 基础图形文档

底层基础图形的详细使用说明，包括：
- **图形容器**：group
- **基础形状**：rect、circle、line、polyline、polygon、text、arc、sector、ellipse、image、path
- **图形属性**：填充、描边、阴影、渐变、变换等
- **高级用法**：自定义组件、动画、事件处理

**适用场景**：需要自定义可视化组件，或使用底层图形 API

### 4. [F2-Examples-Best-Practices.md](./F2-Examples-Best-Practices.md) - 示例和最佳实践

常见场景的完整示例和最佳实践建议，包括：
- **15+ 常见图表示例**：柱状图、折线图、饼图、散点图、K线图等
- **高级功能示例**：选中交互、辅助标记、数据更新、自定义 Tooltip 等
- **多端适配**：H5、微信小程序、React、Vue 的使用方式
- **性能优化**：大数据处理、按需加载、动画优化等
- **最佳实践**：数据准备、主题定制、错误处理、代码组织等

**适用场景**：需要参考具体示例，或寻找最佳实践方案

## 阅读建议

### 新手入门路径

1. 先阅读 [F2-AIGC-Guide.md](./F2-AIGC-Guide.md) 了解整体架构
2. 浏览 [F2-Examples-Best-Practices.md](./F2-Examples-Best-Practices.md) 找到类似场景的示例
3. 查阅 [F2-Components-Detail.md](./F2-Components-Detail.md) 了解具体组件的详细配置
4. 如需自定义，参考 [F2-Basic-Shapes-Detail.md](./F2-Basic-Shapes-Detail.md)

### 实际使用路径

1. 明确需求（图表类型、数据格式）
2. 在 [F2-Examples-Best-Practices.md](./F2-Examples-Best-Practices.md) 中找到相似示例
3. 根据 [F2-Components-Detail.md](./F2-Components-Detail.md) 调整配置
4. 参考 [F2-AIGC-Guide.md](./F2-AIGC-Guide.md) 中的最佳实践优化代码

### 问题解决路径

1. 在 [F2-AIGC-Guide.md](./F2-AIGC-Guide.md) 的"常见问题"部分查找
2. 在 [F2-Examples-Best-Practices.md](./F2-Examples-Best-Practices.md) 的"常见问题解决"部分查找
3. 检查组件配置是否正确（参考 [F2-Components-Detail.md](./F2-Components-Detail.md)）

## 快速参考

### 基础示例

```jsx
import { Canvas, Chart, Interval, Axis, Tooltip } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
];

const context = document.getElementById('canvas').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
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

### 常用图表类型速查

| 图表类型 | 组件 | 关键配置 |
|---------|------|----------|
| 柱状图 | Interval | `<Interval x="x" y="y" />` |
| 条形图 | Interval | `coord={{ transposed: true }}` |
| 折线图 | Line | `<Line x="x" y="y" />` |
| 面积图 | Area | `<Area x="x" y="y" />` |
| 散点图 | Point | `<Point x="x" y="y" />` |
| 饼图 | Interval | `coord={{ type: 'polar', transposed: true }}` |
| 环形图 | Interval | `coord={{ type: 'polar', transposed: true, innerRadius: 0.5 }}` |
| 雷达图 | Line + Area | `coord={{ type: 'polar' }}` |
| K线图 | Candlestick | `<Candlestick x="date" y={['open', 'close', 'high', 'low']} />` |

### 常用组件速查

| 组件 | 用途 | 示例 |
|------|------|------|
| Axis | 坐标轴 | `<Axis field="fieldName" />` |
| Legend | 图例 | `<Legend position="top" />` |
| Tooltip | 提示信息 | `<Tooltip showCrosshairs />` |
| Guide | 辅助标记 | `<Guide><LineGuide /></Guide>` |
| ScrollBar | 滚动条 | `<ScrollBar mode="x" />` |
| Zoom | 缩放 | `<Zoom mode="x" />` |

## 技术栈

- **@antv/F2**: 移动端可视化解决方案
- **@antv/F-Engine**: 渲染引擎，提供底层渲染、事件、动画能力
- **@antv/G**: 底层图形库，提供基础图形绘制能力

## 依赖关系

```
@antv/F2 (图表库)
    ↓
@antv/F-Engine (渲染引擎)
    ↓
@antv/G (图形库)
```

## 适用场景

- 移动端数据可视化
- H5 图表应用
- 小程序图表（微信、支付宝）
- React Native 图表
- 需要高性能渲染的数据可视化场景

## 特点

1. **轻量级**：核心体积小，按需加载
2. **高性能**：专为移动端优化
3. **多端支持**：H5、小程序、React Native、Weex
4. **丰富组件**：50+ 图表类型
5. **图形语法**：基于 Grammar of Graphics 理论
6. **易于扩展**：支持自定义组件、动画、交互

## 参考链接

- [F2 官方文档](https://f2.antv.antgroup.com/)
- [F2 GitHub](https://github.com/antvis/f2)
- [AntV 官网](https://antv.antgroup.com/)

## 文档维护

本文档基于 @antv/F2 v5.x 版本编写，旨在为大模型 AIGC 场景提供完整、准确的使用指南。

如有问题或建议，请访问 [F2 GitHub Issues](https://github.com/antvis/f2/issues)。
