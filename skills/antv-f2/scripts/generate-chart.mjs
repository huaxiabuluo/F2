#!/usr/bin/env node

/**
 * F2 Chart Scaffold Generator
 *
 * Generates boilerplate code for common F2 chart types.
 *
 * Usage:
 *   node generate-chart.mjs --type <chart-type> [--output <file>] [--title <title>]
 *
 * Supported chart types:
 *   line, area, column, bar, pie, donut, rose, scatter, radar,
 *   candlestick, funnel, pyramid
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';

const args = process.argv.slice(2);

function parseArgs(argList) {
  const parsed = {};
  for (let i = 0; i < argList.length; i++) {
    if (argList[i].startsWith('--')) {
      const key = argList[i].slice(2);
      parsed[key] = argList[i + 1] || true;
      i++;
    }
  }
  return parsed;
}

const options = parseArgs(args);

const chartType = options.type;
const outputFile = options.output || null;
const title = options.title || 'F2 Chart';

if (!chartType) {
  console.log('Usage: node generate-chart.mjs --type <chart-type> [--output <file>] [--title <title>]');
  console.log('');
  console.log('Supported chart types:');
  console.log('  line, area, column, bar, pie, donut, rose, scatter,');
  console.log('  radar, candlestick, funnel, pyramid');
  process.exit(1);
}

const templates = {
  line: {
    data: `[
  { date: '2024-01', value: 120 },
  { date: '2024-02', value: 200 },
  { date: '2024-03', value: 150 },
  { date: '2024-04', value: 310 },
  { date: '2024-05', value: 260 },
  { date: '2024-06', value: 340 },
]`,
    scale: `{
  value: { min: 0, tickCount: 5 },
  date: { type: 'timeCat', mask: 'YYYY-MM' },
}`,
    geometry: `<Line x="date" y="value" />`,
    axes: `<Axis field="date" />\n      <Axis field="value" />`,
  },

  area: {
    data: `[
  { date: '2024-01', value: 120 },
  { date: '2024-02', value: 200 },
  { date: '2024-03', value: 150 },
  { date: '2024-04', value: 310 },
  { date: '2024-05', value: 260 },
  { date: '2024-06', value: 340 },
]`,
    scale: `{
  value: { min: 0 },
  date: { type: 'timeCat', mask: 'YYYY-MM' },
}`,
    geometry: `<Area x="date" y="value" />`,
    axes: `<Axis field="date" />\n      <Axis field="value" />`,
  },

  column: {
    data: `[
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]`,
    scale: `{
  sold: { min: 0 },
}`,
    geometry: `<Interval x="genre" y="sold" color="genre" />`,
    axes: `<Axis field="genre" />\n      <Axis field="sold" />`,
  },

  bar: {
    data: `[
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]`,
    scale: `{
  sold: { min: 0 },
}`,
    geometry: `<Interval x="genre" y="sold" color="genre" />`,
    coord: `{ transposed: true }`,
    axes: `<Axis field="genre" />\n      <Axis field="sold" />`,
  },

  pie: {
    data: `[
  { name: 'A', percent: 0.4, a: '1' },
  { name: 'B', percent: 0.25, a: '1' },
  { name: 'C', percent: 0.2, a: '1' },
  { name: 'D', percent: 0.15, a: '1' },
]`,
    scale: `{
  percent: { formatter: (val) => (val * 100).toFixed(0) + '%' },
}`,
    geometry: `<Interval x="a" y="percent" adjust="stack" color="name" />`,
    coord: `{ type: 'polar', transposed: true }`,
    axes: '',
  },

  donut: {
    data: `[
  { name: 'A', percent: 0.4, a: '1' },
  { name: 'B', percent: 0.25, a: '1' },
  { name: 'C', percent: 0.2, a: '1' },
  { name: 'D', percent: 0.15, a: '1' },
]`,
    scale: `{
  percent: { formatter: (val) => (val * 100).toFixed(0) + '%' },
}`,
    geometry: `<Interval x="a" y="percent" adjust="stack" color="name" />`,
    coord: `{ type: 'polar', transposed: true, innerRadius: 0.7 }`,
    axes: '',
  },

  rose: {
    data: `[
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]`,
    scale: `{
  sold: { min: 0 },
}`,
    geometry: `<Interval x="genre" y="sold" color="genre" />`,
    coord: `{ type: 'polar' }`,
    axes: '',
  },

  scatter: {
    data: `[
  { weight: 60, height: 170, gender: 'M' },
  { weight: 65, height: 175, gender: 'M' },
  { weight: 55, height: 160, gender: 'F' },
  { weight: 70, height: 180, gender: 'M' },
  { weight: 50, height: 155, gender: 'F' },
]`,
    scale: `{
  weight: { min: 40, max: 80 },
  height: { min: 140, max: 190 },
}`,
    geometry: `<Point x="weight" y="height" color="gender" size={5} />`,
    axes: `<Axis field="weight" />\n      <Axis field="height" />`,
  },

  radar: {
    data: `[
  { item: 'Speed', value: 80, type: 'A' },
  { item: 'Strength', value: 60, type: 'A' },
  { item: 'Agility', value: 90, type: 'A' },
  { item: 'Speed', value: 70, type: 'B' },
  { item: 'Strength', value: 85, type: 'B' },
  { item: 'Agility', value: 65, type: 'B' },
]`,
    scale: `{
  value: { min: 0, max: 100 },
}`,
    geometry: `<Line x="item" y="value" color="type" />\n      <Area x="item" y="value" color="type" adjust="stack" />`,
    coord: `{ type: 'polar' }`,
    axes: `<Axis field="item" grid="line" />\n      <Axis field="value" grid="line" />`,
  },

  candlestick: {
    data: `[
  { time: '2024-01-01', value: [20, 34, 10, 38] },
  { time: '2024-01-02', value: [40, 35, 30, 50] },
  { time: '2024-01-03', value: [31, 38, 33, 44] },
  { time: '2024-01-04', value: [38, 15, 5, 42] },
]`,
    scale: `{
  time: { type: 'timeCat', mask: 'MM-DD' },
}`,
    geometry: `<Candlestick x="time" y="value" color={{ range: ['#E62C3B', '#0E9976', '#999999'] }} />`,
    axes: `<Axis field="time" />\n      <Axis field="value" />`,
  },

  funnel: {
    data: `[
  { stage: 'Visit', value: 100 },
  { stage: 'Signup', value: 60 },
  { stage: 'Purchase', value: 30 },
  { stage: 'Repeat', value: 10 },
]`,
    scale: `{}`,
    geometry: `<Interval x="stage" y="value" adjust="symmetric" shape="funnel" color="stage" />`,
    coord: `{ transposed: true }`,
    axes: '',
  },

  pyramid: {
    data: `[
  { stage: 'Visit', value: 100 },
  { stage: 'Signup', value: 60 },
  { stage: 'Purchase', value: 30 },
]`,
    scale: `{}`,
    geometry: `<Interval x="stage" y="value" adjust="symmetric" shape="pyramid" color="stage" showLabel={true} labelCfg={{ label: 'value' }} />`,
    coord: `{ transposed: true }`,
    axes: '',
  },
};

const template = templates[chartType];
if (!template) {
  console.error(`Unsupported chart type: ${chartType}`);
  console.error('Supported types:', Object.keys(templates).join(', '));
  process.exit(1);
}

const coordLine = template.coord ? `\n      coord={${template.coord}}` : '';

const code = `/** @jsx jsx */
import { jsx, Canvas, Chart, ${getImports(chartType)} } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = ${template.data};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data} scale={${template.scale}}${coordLine}>
${template.axes ? '      ' + template.axes + '\n' : ''}      ${template.geometry}
      <Tooltip />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
`;

function getImports(type) {
  const base = new Set(['Tooltip']);
  switch (type) {
    case 'line':
      base.add('Line');
      base.add('Axis');
      break;
    case 'area':
      base.add('Area');
      base.add('Axis');
      break;
    case 'column':
    case 'bar':
      base.add('Interval');
      base.add('Axis');
      break;
    case 'pie':
    case 'donut':
    case 'rose':
    case 'funnel':
    case 'pyramid':
      base.add('Interval');
      break;
    case 'scatter':
      base.add('Point');
      base.add('Axis');
      break;
    case 'radar':
      base.add('Line');
      base.add('Area');
      base.add('Axis');
      break;
    case 'candlestick':
      base.add('Candlestick');
      base.add('Axis');
      break;
  }
  return [...base].join(', ');
}

if (outputFile) {
  const outPath = resolve(process.cwd(), outputFile);
  writeFileSync(outPath, code, 'utf8');
  console.log(`Chart scaffold generated: ${outPath}`);
} else {
  console.log(code);
}
