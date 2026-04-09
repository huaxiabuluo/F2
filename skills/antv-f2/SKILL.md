---
name: antv-f2
description: This skill should be used when creating, modifying, or debugging charts built with AntV F2, a declarative mobile-first visualization library using JSX syntax and the Grammar of Graphics. Covers all chart types (line, area, bar, column, pie, scatter, radar, candlestick, funnel, treemap, sunburst, gauge), component configuration (axis, legend, tooltip, guide, scroll-bar), animation, theming, and framework integration (React, Vue, mini-programs).
---

# AntV F2 Charting Skill

Build, customize, and debug charts using AntV F2 — a mobile-first declarative visualization library based on the Grammar of Graphics and JSX syntax.

## When to Use This Skill

- Creating any type of chart with AntV F2 (`@antv/f2`)
- Configuring chart components (Axis, Legend, Tooltip, Guide)
- Implementing animations, interactions, or custom shapes
- Integrating F2 with React, Vue, or mini-programs
- Debugging F2 chart rendering issues

## Core Architecture

```
Canvas (root container)
  └── Chart (core — data, scale, coord)
        ├── Geometry (Interval, Line, Area, Point, Candlestick)
        ├── Axis (coordinate axes)
        ├── Legend (data series legend)
        ├── Tooltip (hover/tap info)
        └── Guide (annotations)
```

### Minimal Chart

```jsx
import { jsx, Canvas, Chart, Interval, Axis, Tooltip, Legend } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
      <Tooltip />
      <Legend />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

## Quick Reference

### Canvas / Chart Props

| Component | Key Props |
|-----------|-----------|
| `<Canvas>` | `context` (required), `pixelRatio`, `width`, `height`, `animate` |
| `<Chart>` | `data` (required), `scale`, `coord`, `theme`, `style` |

### Chart Types

| Component | Chart Types | Key Props |
|-----------|-------------|-----------|
| `<Interval>` | Bar, Column, Pie, Donut, Rose, Funnel, Pyramid | `startOnZero`, `sizeRatio`, `adjust`, `selection` |
| `<Line>` | Line, Curve, Step | `connectNulls`, `endView` |
| `<Area>` | Area, Stacked Area | `connectNulls`, `startOnZero` |
| `<Point>` | Scatter, Bubble | `shape` (circle/hollowCircle/rect) |
| `<Candlestick>` | K-line, Stock chart | `color.range` ([up, down, flat]) |

All geometry components share: `x`, `y`, `color`, `size`, `adjust`, `style`, `animation`, `viewClip`.

### Chart Templates

```jsx
// Line chart           <Line x="date" y="value" color="type" />
// Area (stacked)       <Area x="date" y="value" color="type" adjust="stack" />
// Column               <Interval x="genre" y="sold" color="genre" />
// Grouped columns      <Interval x="genre" y="sold" color="type" adjust="dodge" />
// Stacked columns      <Interval x="genre" y="sold" color="type" adjust="stack" />
// Bar (horizontal)     <Chart coord={{ transposed: true }}><Interval x="x" y="y" /></Chart>
// Pie                  <Chart coord={{ type: 'polar', transposed: true }}><Interval x="a" y="percent" adjust="stack" color="name" /></Chart>
// Donut                Same as Pie + innerRadius: 0.7 in coord
// Rose                 <Chart coord={{ type: 'polar', innerRadius: 0.3 }}><Interval x="genre" y="sold" color="genre" /></Chart>
// Scatter              <Point x="weight" y="height" color="gender" size="value" />
// Radar                <Chart coord={{ type: 'polar' }}><Line x="item" y="value" color="type" /></Chart>
// Candlestick          <Candlestick x="time" y="value" /> // data: {time, value:[open,close,low,high]}
// Funnel               <Chart coord={{ transposed: true }}><Interval x="stage" y="value" adjust="symmetric" shape="funnel" color="stage" /></Chart>
```

### Scale Quick Reference

| Scale Type | Use Case | Key Props |
|------------|----------|-----------|
| `linear` | Continuous numeric | `min`, `max`, `nice`, `tickInterval`, `tickCount` |
| `cat` | Categorical | `values`, `isRounding` |
| `timeCat` | Time categories | `mask` (e.g. `'YYYY-MM-DD'`) |

Common props: `formatter`, `range`, `alias`, `tickCount`, `ticks`, `sortable`.

### Coord Quick Reference

```jsx
// Cartesian (default)  <Chart coord={{ transposed: true }}>
// Polar                <Chart coord={{ type: 'polar', transposed: true, innerRadius: 0.5, radius: 0.8 }}>
```

### Visual Attribute Mapping

```jsx
// Color: fixed | field | [field, palette] | { field, callback } | { type: "linear", field, range }
// Size:  fixed | field | [field, range]   | { field, range }    | { type: "linear", field, range }
// Adjust: "stack" | "dodge" | "symmetric"
// Shape (Point only): "circle" | "hollowCircle" | "rect"
```

## Common Patterns

```jsx
// Dynamic data update
canvas.update((<Canvas context={context}><Chart data={newData}><Line x="x" y="y" /></Chart></Canvas>).props);

// Multiple charts on one Canvas
<Canvas context={context}>
  <Chart data={data1} style={{ left: 0, width: '50%' }}><Line x="x" y="y" /></Chart>
  <Chart data={data2} style={{ left: '50%', width: '50%' }}><Interval x="x" y="y" /></Chart>
</Canvas>

// Mixed geometries
<Chart data={data}>
  <Interval x="month" y="sales" color="type" adjust="stack" />
  <Line x="month" y="growth" size={2} />
</Chart>
```

## Script Utilities

```bash
# Generate chart scaffold
node skills/F2/scripts/generate-chart.mjs --type <chart-type> [--output <file>]

# Validate data format
node skills/F2/scripts/validate-data.mjs <data-file.json>
```

Supported types: `line`, `area`, `column`, `bar`, `pie`, `donut`, `rose`, `scatter`, `radar`, `candlestick`, `funnel`, `pyramid`.

## Reference Navigation

Load reference files as needed based on the task. Each file is focused on a single topic.

### API Documentation (`references/api/`)

| File | Contents | When to Load |
|------|----------|-------------|
| `api/core.md` | Canvas, Chart, Component, top-level API (jsx, createRef, Children) | Questions about Canvas/Chart props, JSX helpers |
| `api/geometry.md` | Line, Interval, Point, Area, Candlestick — full props, color/size/style/animation details | Configuring geometry components, visual mapping |
| `api/axis-legend.md` | Axis, Legend — full props, style configuration, label formatting | Customizing axes or legend appearance |
| `api/tooltip-interaction.md` | Tooltip, ScrollBar, Magnifier — full props, crosshairs, custom content | Setting up tooltip, scroll, or zoom interactions |
| `api/guide.md` | Guide.Line, Guide.Text, Guide.Point, Guide.Rect, Guide.Image, Guide.Tag | Adding chart annotations |
| `api/specialized.md` | PieLabel, Gauge, Timeline, Treemap, Sunburst | Building specialized chart types |

### Chart Examples (`references/examples/`)

| File | Contents | When to Load |
|------|----------|-------------|
| `examples/basic-charts.md` | Line, Area, Column, Bar — complete code examples | Creating any basic chart type |
| `examples/pie-related.md` | Pie, Donut, Rose — complete code examples | Creating pie/donut/rose charts |
| `examples/scatter-radar.md` | Scatter, Radar — complete code examples | Creating scatter or radar charts |
| `examples/specialized.md` | Candlestick, Funnel, Pyramid, Treemap, Sunburst, Gauge + component examples | Creating specialized charts |

### Tutorials (`references/tutorials/`)

| File | Contents | When to Load |
|------|----------|-------------|
| `tutorials/core-concepts.md` | Getting started, Grammar of Graphics, data processing, scales, coordinates | Understanding F2 concepts, data format questions |
| `tutorials/visual-customization.md` | Graphic tags, drawing attributes, animation properties | Customizing visual appearance, animation config |
| `tutorials/advanced.md` | Events, custom components, JSX graphics, framework integration (React/Vue/mini-programs), advanced patterns | Integrating F2 with frameworks, custom components, events |

### Search Hints

To find specific information in references, use these grep patterns:

```
# Find component props
grep "Props" references/api/*.md
# Find specific chart type
grep -l "饼图\|环形图\|Pie" references/examples/*.md
# Find animation config
grep "animation\|动画" references/tutorials/visual-customization.md
# Find framework integration
grep "React\|Vue\|小程序\|mini-program" references/tutorials/advanced.md
```
