# F2 高级主题

## 事件属性

F2 支持在图形标签上直接监听移动端事件。

### 事件列表

| 事件名 | 类型 | 描述 |
|--------|------|------|
| `onClick` | function | 点击事件 |
| `onPanStart` | function | 手指触摸图形时触发 |
| `onPan` | function | 手指在图形上移动时触发 |
| `onPanEnd` | function | 手指从图形上离开时触发 |
| `onTouchStart` | function | 手指触摸图形时触发 |
| `onTouchMove` | function | 手指在图形上移动时触发 |
| `onTouchEnd` | function | 手指从图形上离开时触发 |
| `onTouchEndOutside` | function | 手指从图形外离开时触发 |
| `onPressStart` | function | 手指在图形上开始按压时触发 |
| `onPress` | function | 手指在图形上按压时触发 |
| `onPressEnd` | function | 手指在图形上结束按压时触发 |
| `onSwipe` | function | 手指快扫时触发 |
| `onPinchStart` | function | 手指开始缩放时触发 |
| `onPinch` | function | 手指缩放时触发 |
| `onPinchEnd` | function | 手指结束缩放时触发 |

---

## 自定义组件

F2 提供完整的组件化能力，可以创建自定义组件。

### 基础结构

```jsx
import { Component } from '@antv/f2';

class MyComponent extends Component {
  render() {
    const { props } = this;
    const { text, x, y } = props;
    return <text style={{ text, x, y }} />;
  }
}
```

### 完整生命周期

```jsx
import { Component } from '@antv/f2';

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  willMount() {
    console.log('组件即将挂载');
  }

  didMount() {
    console.log('组件已挂载');
  }

  shouldUpdate(nextProps) {
    return true;
  }

  willReceiveProps(nextProps) {
    console.log('即将接收新属性', nextProps);
  }

  willUpdate() {
    console.log('组件即将更新');
  }

  didUpdate() {
    console.log('组件已更新');
  }

  render() {
    const { props, state } = this;
    const { color } = props;
    const { count } = state;
    return (
      <rect
        style={{
          x: 10,
          y: 10,
          width: 10,
          height: 10,
          fill: color,
        }}
      />
    );
  }

  willUnmount() {
    console.log('组件即将卸载');
  }

  didUnmount() {
    console.log('组件已卸载');
  }
}
```

### 生命周期流程

```
挂载阶段:
constructor() → willMount() → render() → didMount()

更新阶段:
willReceiveProps() → shouldUpdate() → willUpdate() → render() → didUpdate()

卸载阶段:
willUnmount() → didUnmount()
```

### 状态管理

#### setState

```jsx
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick() {
    // 更新状态
    this.setState({
      count: this.state.count + 1,
    });

    // 或使用函数形式
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));

    // 可以传入回调函数
    this.setState(
      { count: this.state.count + 1 },
      () => {
        console.log('状态已更新', this.state.count);
      }
    );
  }

  render() {
    const { count } = this.state;
    return <text style={{ text: `Count: ${count}` }} />;
  }
}
```

### 使用上下文

组件可以通过 `this.context` 访问上下文信息：

```jsx
class ContextAwareComponent extends Component {
  didMount() {
    const { context } = this;
    const { px2hd, theme, layout } = context;

    // 像素单位转换
    const x = px2hd(100);

    // 访问主题
    const primaryColor = theme.primaryColor;

    // 访问布局信息
    const { width, height } = layout;
  }

  render() {
    const { context } = this;
    const { px2hd } = context;

    return (
      <text
        style={{
          x: px2hd(50),
          y: px2hd(50),
          text: 'Hello',
        }}
      />
    );
  }
}
```

### IContext 接口

| 属性 | 类型 | 说明 |
|------|------|------|
| `px2hd` | `(value: any) => any` | 像素单位转换函数 |
| `theme` | `Record<string, any>` | 主题配置对象 |
| `layout` | `{ left, top, width, height }` | 画布布局信息 |

### 实用示例

#### 数据标签组件

```jsx
class DataLabel extends Component {
  render() {
    const { props, context } = this;
    const { data, xField, yField } = props;
    const { px2hd } = context;

    return (
      <group>
        {data.map((item) => {
          const x = px2hd(item[xField]);
          const y = px2hd(item[yField]);
          return (
            <text
              style={{
                text: String(item[yField]),
                x,
                y: y - 10,
                fill: '#000',
                fontSize: '12px',
                textAlign: 'center',
              }}
            />
          );
        })}
      </group>
    );
  }
}
```

#### 自定义图例组件

```jsx
class CustomLegend extends Component {
  render() {
    const { props } = this;
    const { items, onClick } = props;
    const { x = 10, y = 10 } = props;

    return (
      <group>
        {items.map((item, index) => (
          <g
            key={item.name}
            style={{
              transform: `translate(${x}, ${y + index * 30})`,
            }}
            onClick={() => onClick(item)}
          >
            <rect
              style={{
                width: 20,
                height: 20,
                fill: item.color,
              }}
            />
            <text
              style={{
                x: 30,
                y: 15,
                text: item.name,
              }}
            />
          </g>
        ))}
      </group>
    );
  }
}
```

---

## 图形使用

在 F2 中，可以利用 JSX 和图形标签方便地构造自定义图形。

### 创建自定义图形

```jsx
import { jsx, Canvas } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const Hello = () => {
  return (
    <group>
      <rect
        style={{
          x: 10,
          y: 10,
          width: 40,
          height: 40,
          lineWidth: '2px',
          stroke: '#000',
          fill: 'red',
        }}
      />
      <circle
        style={{
          cx: 80,
          cy: 30,
          r: 20,
          lineWidth: '2px',
          stroke: '#000',
          fill: 'red',
        }}
      />
      <text
        style={{
          x: 120,
          y: 30,
          text: '文本',
          fontSize: 20,
          fill: '#000',
        }}
      />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Hello />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 使用 Class 组件

```jsx
import { jsx, Canvas, Component } from '@antv/f2';

class CustomShape extends Component {
  render() {
    const { x, y, color } = this.props;
    return (
      <group>
        <rect
          style={{
            x,
            y,
            width: 50,
            height: 50,
            fill: color,
          }}
        />
        <text
          style={{
            x: x + 15,
            y: y + 30,
            text: '自定义',
            fontSize: 14,
            fill: '#fff',
          }}
        />
      </group>
    );
  }
}

const Page = () => {
  return (
    <group>
      <CustomShape x={10} y={10} color="#1890ff" />
      <CustomShape x={80} y={10} color="#f5222d" />
    </group>
  );
};
```

### 使用函数组件

```jsx
import { jsx, Canvas } from '@antv/f2';

const CustomRect = ({ x, y, width, height, color, text }) => {
  return (
    <group>
      <rect
        style={{
          x,
          y,
          width,
          height,
          fill: color,
          stroke: '#000',
          lineWidth: 2,
        }}
      />
      <text
        style={{
          x: x + width / 2 - 20,
          y: y + height / 2,
          text,
          fontSize: 16,
          fill: '#fff',
        }}
      />
    </group>
  );
};
```

### 与图表结合

```jsx
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const Page = () => {
  return (
    <Chart data={data} scale={{ sold: { min: 0 } }}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" />
      {/* 自定义标题 */}
      <text
        style={{
          x: 150,
          y: 30,
          text: '游戏销量统计',
          fontSize: 18,
          fill: '#000',
          textAlign: 'center',
        }}
      />
    </Chart>
  );
};
```

---

## 框架集成

### React 集成

#### 安装依赖

```bash
npm install @antv/f2 --save
npm install @antv/f-react --save
```

#### 使用示例

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from '@antv/f-react';
import { Chart, Interval } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

ReactDOM.render(
  <div>
    <Canvas>
      <Chart data={data}>
        <Interval x="genre" y="sold" />
      </Chart>
    </Canvas>
  </div>,
  document.getElementById('root')
)
```

### Vue 集成

#### 安装依赖

```bash
npm install @antv/f2 --save
npm install @antv/f-vue --save
```

#### 配置 JSX 编译

**webpack (vue-cli)**

```bash
npm install @babel/plugin-transform-react-jsx --save-dev
```

```js
// vue.config.js
{
  chainWebpack: (config) => {
    config.module
      .rule('F2')
      .test(/\.jsx$/)
      .use('babel')
      .loader('babel-loader')
      .options({
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              runtime: 'automatic',
              importSource: '@antv/f2',
            },
          ],
        ],
      })
      .end();
  },
}
```

**Vite**

```bash
npm install @rollup/plugin-babel --save-dev
npm install @babel/plugin-transform-react-jsx --save-dev
```

```js
// vite.config.js
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    babel({
      plugins: [
        [
          '@babel/plugin-transform-react-jsx',
          {
            runtime: 'automatic',
            importSource: '@antv/f2',
          },
        ],
      ],
    }),
    vue(),
    vueJsx(),
  ],
});
```

#### 使用示例

```vue
<script>
import { toRaw } from 'vue';
import Canvas from '@antv/f-vue';
import { Chart, Interval, Axis } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

export default {
  name: 'App',
  data() {
    return {
      chartData: data,
    };
  },
  render() {
    const { chartData } = this;
    return (
      <div className="container">
        <Canvas pixelRatio={window.devicePixelRatio}>
          <Chart data={toRaw(chartData)}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      </div>
    );
  },
};
</script>

<style>
.container {
  width: 500px;
  height: 300px;
}
</style>
```

### 小程序集成

#### 安装依赖

```bash
# 安装 F2 依赖
npm i @antv/f2 --save

# 支付宝小程序
npm i @antv/f-my --save

# 微信小程序
npm i @antv/f-wx --save
```

#### 支付宝小程序

**使用 NativeCanvas (f-my)**

```json
// page.json
{
  "usingComponents": {
    "f2": "@antv/f-my"
  }
}
```

```jsx
// page.axml
<view class="container">
  <f2 onRender="onRenderChart" onCanvasReady="onCanvasReady"></f2>
</view>
```

```css
/* page.acss */
.container {
  width: 100%;
  height: 600rpx;
}
```

```jsx
// chart.jsx
import { Chart, Interval, Axis } from '@antv/f2';

export default (props) => {
  const { data } = props;
  return (
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  );
}
```

```jsx
// page.jsx
import Chart from './chart';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {},
  onRenderChart() {
    return <Chart data={data} />;
  },
})
```

#### 微信小程序

```json
// page.json
{
  "usingComponents": {
    "f2": "@antv/f-wx"
  }
}
```

```jsx
// page.wxml
<view class="container">
  <f2 onRender="{{onRenderChart}}" />
</view>
```

```css
/* page.wxss */
.container {
  width: 100%;
  height: 600rpx;
}
```

```jsx
// chart.jsx
import { Chart, Interval, Axis } from '@antv/f2';

export default (props) => {
  const { data } = props;
  return (
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  );
}
```

```jsx
// page.jsx
import Chart from './chart';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {
    onRenderChart() {
      return <Chart data={data} />;
    },
  },
})
```

### Node.js 集成

#### 安装依赖

```bash
npm install @antv/f2 --save
npm install canvas --save
```

#### 使用示例

```jsx
import { Canvas, Chart, Interval, Axis } from '@antv/f2';
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

(async () => {
  const { props } = (
    <Canvas context={ctx} pixelRatio={1} animate={false}>
      <Chart data={data}>
        <Axis field="genre" />
        <Axis field="sold" />
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    </Canvas>
  );

  const fcanvas = new Canvas(props);
  await fcanvas.render();

  const out = fs.createWriteStream(path.join(__dirname, 'chart.png'));
  const stream = canvas.createPNGStream();
  stream.pipe(out);

  out.on('finish', () => {
    process.exit();
  });
})();
```

### SVG 渲染器

#### 安装依赖

```bash
npm install @antv/g-mobile-svg --save
```

#### 使用步骤

```jsx
import { Canvas, Chart, Interval, jsx, Axis } from '@antv/f2';
import { Renderer } from '@antv/g-mobile-svg';

const container = document.getElementById('container');

// 实例化 SVG 渲染器
const renderer = new Renderer();

const { props } = (
  <Canvas container={container} renderer={renderer} width={300} height={200}>
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

### 配置 JSX Transform

#### Babel

**安装**

```bash
npm install --save-dev @babel/plugin-transform-react-jsx
```

**Classic 模式**

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "jsx",
        "pragmaFrag": "Fragment"
      }
    ]
  ]
}
```

**Automatic 模式**

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "runtime": "automatic",
        "importSource": "@antv/f2"
      }
    ]
  ]
}
```

#### TypeScript

**Classic 模式**

```json
{
  "compilerOptions": {
    "jsxFactory": "jsx",
    "jsxFragmentFactory": "Fragment"
  }
}
```

**Automatic 模式**

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@antv/f2"
  }
}
```

### React + TypeScript 类型报错解决

当和 React 同时使用时，遇到 `group`、`circle`、`rect` 等标签的类型提示错误。

#### Classic 编译模式

在文件顶部增加注释和模块引用：

```jsx
/** @jsx jsx */
import { jsx } from '@antv/f2';
```

#### Automatic 编译模式

在文件顶部增加注释：

```jsx
/** @jsxImportSource @antv/f2 */
```

---

## 高级用法

### 自定义 View

F2 将所有组件进行了高阶组件（HOC）封装，形成了 `withXXX` 的逻辑封装。

#### 定义自定义 View

```jsx
const CustomLegendView = (props) => {
  const { items } = props;
  return (
    <group
      style={{
        flexDirection: 'row',
      }}
    >
      {items.map((item) => {
        const { name, color } = item;
        return (
          <text
            style={{
              text: name,
              fill: color,
            }}
          />
        );
      })}
    </group>
  );
}
```

#### 使用自定义 View

```jsx
import { Canvas, Chart, withLegend } from '@antv/f2';

// 自定义 View
const CustomLegendView = (props) => {
  const { items } = props;
  return (
    <group
      style={{
        flexDirection: 'row',
      }}
    >
      {items.map((item) => {
        const { name, color } = item;
        return (
          <text
            style={{
              text: name,
              fill: color,
            }}
          />
        );
      })}
    </group>
  );
}

// 使用自定义 view 的组件
const Legend = withLegend(CustomLegendView);

<Canvas context={context}>
  <Chart data={data}>
    <Legend position="top" />
  </Chart>
</Canvas>
```

---

## 总结

F2 是一个基于图形语法的声明式可视化库，通过组合不同的组件和属性可以构建各种图表。核心要点：

1. **数据格式**：必须是 JSON 数组格式
2. **图形语法**：通过数据、度量、几何标记、图形属性、坐标系等元素组合构建图表
3. **组件化**：支持自定义组件扩展功能
4. **多端支持**：支持原生 JS、React、Vue、小程序、Node.js 等多种环境
5. **声明式**：使用 JSX 语法，代码简洁直观

## 相关文档

- [核心概念](/tutorial/understanding.zh.md)
- [API 文档](/api)
- [示例](/examples)
