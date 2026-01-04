# 文档优化任务清单

## 已优化文档 (16个)

根据 git 提交历史确认，以下文档已完成优化：

**Geometry 组件** (commit `e67c5057f`, `7d249a49c`):
- [x] `api/chart/geometry.zh.md`
- [x] `api/chart/area.zh.md`
- [x] `api/chart/interval.zh.md`
- [x] `api/chart/line.zh.md`
- [x] `api/chart/point.zh.md`
- [x] `api/chart/candlestick.zh.md`

**Guide 组件**:
- [x] `api/chart/guide/tag-guide.zh.md` (commit `4fb2aaa37`)
- [x] `api/chart/guide/text-guide.zh.md` (commit `b312eea93`)
- [x] `api/chart/guide/point-guide.zh.md` (commit `2d6cc3426`)
- [x] `api/chart/guide/line-guide.zh.md` (commit `b1768931f`)
- [x] `api/chart/guide/rect-guide.zh.md` (commit `f35835151`)
- [x] `api/chart/guide/image-guide.zh.md` (commit `19de32c2b`)

**其他组件**:
- [x] `api/chart/chart.zh.md` (commit `57f887991`)
- [x] `api/chart/axis.zh.md` (commit `a389caa59`)
- [x] `api/chart/tooltip.zh.md` (commit `1257d3bb0`, `41999bc65`)
- [x] `tutorial/event.zh.md` (commit `1e0abe117`)

---

## 待优化文档 (40个)

### 1. 优先级 P0 - 核心 API 组件 (4个)

- [ ] 1.1 优化 `api/chart/pieLabel.zh.md` - PieLabel 饼图标签组件
- [ ] 1.2 优化 `api/chart/legend.zh.md` - Legend 图例组件
- [ ] 1.3 优化 `api/canvas.zh.md` - Canvas 画布组件
- [ ] 1.4 优化 `api/component.zh.md` - Component 组件文档

### 2. 优先级 P0 - 入口 API (2个)

- [ ] 2.1 优化 `api/f2.zh.md` - F2 入口 API (中文)
- [ ] 2.2 优化 `api/f2.en.md` - F2 入口 API (英文)

### 3. 优先级 P1 - 辅助组件 API (8个)

- [ ] 3.1 优化 `api/chart/scroll-bar.zh.md` - ScrollBar 滚动条组件
- [ ] 3.2 优化 `api/chart/magnifier.zh.md` - Magnifier 放大镜组件
- [ ] 3.3 优化 `api/gauge.zh.md` - Gauge 仪表盘组件
- [ ] 3.4 优化 `api/timeline.zh.md` - Timeline 时间轴组件
- [ ] 3.5 优化 `api/treemap.md` - Treemap 矩形树图组件
- [ ] 3.6 优化 `api/sunburst.md` - Sunburst 旭日图组件
- [ ] 3.7 优化 `api/chart/guide/guide.zh.md` - Guide 概览（索引页）

### 4. 优先级 P1 - 核心教程文档 (8个)

- [ ] 4.1 优化 `tutorial/getting-started.zh.md` - 快速开始 (中文)
- [ ] 4.2 优化 `tutorial/getting-started.en.md` - 快速开始 (英文)
- [ ] 4.3 优化 `tutorial/understanding.zh.md` - 核心概念 (中文)
- [ ] 4.4 优化 `tutorial/understanding.en.md` - 核心概念 (英文)
- [ ] 4.5 优化 `tutorial/grammar.zh.md` - 图表语法 (中文)
- [ ] 4.6 优化 `tutorial/grammar.en.md` - 图表语法 (英文)
- [ ] 4.7 优化 `tutorial/data.zh.md` - 数据处理 (中文)
- [ ] 4.8 优化 `tutorial/data.en.md` - 数据处理 (英文)

### 5. 优先级 P1 - 组件与图形教程 (10个)

- [ ] 5.1 优化 `tutorial/component.zh.md` - 组件 (中文)
- [ ] 5.2 优化 `tutorial/coordinate.zh.md` - 坐标系 (中文)
- [ ] 5.3 优化 `tutorial/coordinate.en.md` - 坐标系 (英文)
- [ ] 5.4 优化 `tutorial/scale.zh.md` - 度量 (中文)
- [ ] 5.5 优化 `tutorial/scale.en.md` - 度量 (英文)
- [ ] 5.6 优化 `tutorial/shape.zh.md` - 图形 (中文)
- [ ] 5.7 优化 `tutorial/shape-attrs.zh.md` - 图形属性 (中文)
- [ ] 5.8 优化 `tutorial/graphic.zh.md` - 图形语法 (中文)
- [ ] 5.9 优化 `tutorial/animation.zh.md` - 动画 (中文)
- [ ] 5.10 优化 `api/chart/guide/guide.zh.md` - Guide 概览

### 6. 优先级 P2 - 框架集成教程 (8个)

- [ ] 6.1 优化 `tutorial/framework/overview.zh.md` - 框架概览
- [ ] 6.2 优化 `tutorial/framework/react.zh.md` - React 集成
- [ ] 6.3 优化 `tutorial/framework/vue.zh.md` - Vue 集成
- [ ] 6.4 优化 `tutorial/framework/miniprogram.zh.md` - 小程序集成 (中文)
- [ ] 6.5 优化 `tutorial/framework/miniprogram.en.md` - 小程序集成 (英文)
- [ ] 6.6 优化 `tutorial/framework/nodejs.zh.md` - Node.js 集成
- [ ] 6.7 优化 `tutorial/framework/svg-renderer.zh.md` - SVG 渲染器
- [ ] 6.8 优化 `tutorial/framework/jsx-transform.zh.md` - JSX 转换

### 7. 优先级 P2 - 高级主题 (2个)

- [ ] 7.1 优化 `tutorial/advanced/custom-view.md` - 自定义视图
- [ ] 7.2 优化 `tutorial/question/with-react-typescript.zh.md` - React TypeScript 集成

## 8. 验证与报告生成

每个文档优化完成后，生成对应的优化报告：

- [ ] 8.1 验证所有文档链接有效
- [ ] 8.2 验证所有类型定义与源码一致
- [ ] 8.3 生成 `reports/pieLabel-doc-improvement.md`
- [ ] 8.4 生成 `reports/legend-doc-improvement.md`
- [ ] 8.5 生成 `reports/canvas-doc-improvement.md`
- [ ] 8.6 生成 `reports/component-doc-improvement.md`
- [ ] 8.7 生成剩余 36 个文档的优化报告

## 任务执行说明

### 前置要求

1. **按优先级顺序执行**: P0 → P1 → P2
2. **参考测试用例**: 每个文档优化前，先查看 `packages/f2/test/` 中对应的测试用例
3. **阅读已优化文档**: 参考 `tag-guide.zh.md`、`axis.zh.md` 等已优化文档的格式

### 每个文档优化包含

- 添加 TypeScript 类型定义
- 补充 Props 表格和默认值
- 添加 3-5 个用法示例
- 修正文档链接（使用 `/` 开头的绝对路径）
- 验证与源码一致性
- **jsx 代码块去除末尾分号**

### 单个文档完成流程

每个文档优化完成后，按以下顺序执行：

1. **优化文档** - 修改 `site/docs/...` 文件
2. **生成报告** - 在 `reports/` 目录生成优化报告
3. **Git 提交** - 及时提交变更（使用中文 commit message）

#### Git 提交规范

```bash
# 提交格式（跳过 git hooks）
git add site/docs/[文件路径] reports/[报告文件]
git commit --no-verify -m "docs([scope]): [中文描述]"
```

**提交示例**：
```bash
git add site/docs/api/chart/pieLabel.zh.md reports/pieLabel-doc-improvement.md
git commit --no-verify -m "docs(pieLabel): 优化 PieLabel 组件文档

- 添加 TypeScript 类型定义
- 补充 Props 表格和默认值
- 扩展用法示例至 8 个
- 添加布局说明和常见问题"
```

### 测试用例参考

优化文档前，在 `packages/f2/test/` 中查找相关测试用例：

```bash
# 示例：查找 PieLabel 测试
find packages/f2/test -name "*ielabel*" -o -name "*PieLabel*"

# 示例：查找 Legend 测试
find packages/f2/test/components/legend
```

### 优化报告生成

每个优化完成后生成报告，必须包含：

1. **优化前后对比评分**（参考 `@reports/tag-guide-doc-improvement.md`）
2. **类型定义分析**（注明源码位置）
3. **主要改进清单**
4. **关键修正说明**
5. **测试用例验证**

报告放在 `reports/` 目录，命名格式: `[component-name]-doc-improvement.md`

### 代码规范

- jsx 代码块去除末尾无用分号
- 代码注释极简，详细说明放在代码块外
- 示例代码可直接复制使用
