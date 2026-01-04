# Change: 优化 site/docs/ 中剩余文档

## Why

当前 `site/docs/` 目录中有 **56 个文档文件**，根据 git 提交历史确认，其中 **16 个已经完成优化**，剩余 **40 个文档**仍存在以下问题：

| 问题类型 | 具体表现 |
|----------|----------|
| 类型定义缺失 | 缺少 TypeScript 类型定义或类型定义不完整 |
| 默认值缺失 | Props 表格中大量属性缺少默认值 |
| 函数签名不完整 | 回调函数参数未说明类型和用途 |
| 代码示例缺失 | 缺少或只有极少用法示例 |
| 链接失效 | 文档内部链接使用相对路径而非规范路径 |

这些问题降低了文档的 **AI 友好度**和**开发者体验**。

## What Changes

- [ ] 优化剩余 40 个文档文件，使其符合 `CLAUDE.md` 中的设计原则
- [ ] 每个优化后的文档生成对应的优化报告到 `reports/` 目录
- [ ] 优化内容包括：TypeScript 类型定义、Props 表格化、默认值补充、用法示例、链接修正
- [ ] 严格遵循已优化文档（如 `tag-guide.zh.md`、`axis.zh.md`）的质量标准

## 执行要求

1. **参考测试用例**：执行每个文档的优化任务时，必须参考 `@packages/f2/test/` 中的相关测试用例（如果有）
2. **报告格式标准**：生成的报告必须参考 `@reports/tag-guide-doc-improvement.md` 的格式，包含优化前后对比评分
3. **代码规范**：jsx 代码块需要去除末尾无用分号

## Impact

- Affected specs: documentation
- Affected code: `site/docs/` 下的所有未优化文档文件
- 生成的报告文件：`reports/*.md`

## Scope

优化范围包括但不限于以下文件分类：

### API 文档 (待优化)

**Chart 组件**:
- `api/chart/pieLabel.zh.md`
- `api/chart/scroll-bar.zh.md`
- `api/chart/magnifier.zh.md`
- `api/chart/legend.zh.md`

**其他 API**:
- `api/canvas.zh.md`
- `api/component.zh.md`
- `api/f2.zh.md`
- `api/f2.en.md`
- `api/gauge.zh.md`
- `api/timeline.zh.md`
- `api/treemap.md`
- `api/sunburst.md`

### Tutorial 文档 (待优化)

**核心教程**:
- `tutorial/getting-started.zh.md`
- `tutorial/getting-started.en.md`
- `tutorial/understanding.zh.md`
- `tutorial/understanding.en.md`
- `tutorial/grammar.zh.md`
- `tutorial/grammar.en.md`
- `tutorial/data.zh.md`
- `tutorial/data.en.md`

**组件教程**:
- `tutorial/component.zh.md`
- `tutorial/coordinate.zh.md`
- `tutorial/coordinate.en.md`
- `tutorial/scale.zh.md`
- `tutorial/scale.en.md`
- `tutorial/shape.zh.md`
- `tutorial/shape-attrs.zh.md`
- `tutorial/graphic.zh.md`
- `tutorial/event.zh.md`
- `tutorial/animation.zh.md`

**框架集成**:
- `tutorial/framework/overview.zh.md`
- `tutorial/framework/react.zh.md`
- `tutorial/framework/vue.zh.md`
- `tutorial/framework/miniprogram.zh.md`
- `tutorial/framework/miniprogram.en.md`
- `tutorial/framework/nodejs.zh.md`
- `tutorial/framework/svg-renderer.zh.md`
- `tutorial/framework/jsx-transform.zh.md`

**高级主题**:
- `tutorial/advanced/custom-view.md`
- `tutorial/question/with-react-typescript.zh.md`

### 已优化文档 (根据 git 提交历史确认)

**Geometry 组件** (commit `e67c5057f`, `7d249a49c`):
- `api/chart/geometry.zh.md` ✅
- `api/chart/area.zh.md` ✅
- `api/chart/interval.zh.md` ✅
- `api/chart/line.zh.md` ✅
- `api/chart/point.zh.md` ✅
- `api/chart/candlestick.zh.md` ✅

**Guide 组件**:
- `api/chart/guide/tag-guide.zh.md` ✅ (commit `4fb2aaa37`)
- `api/chart/guide/text-guide.zh.md` ✅ (commit `b312eea93`)
- `api/chart/guide/point-guide.zh.md` ✅ (commit `2d6cc3426`)
- `api/chart/guide/line-guide.zh.md` ✅ (commit `b1768931f`)
- `api/chart/guide/rect-guide.zh.md` ✅ (commit `f35835151`)
- `api/chart/guide/image-guide.zh.md` ✅ (commit `19de32c2b`)

**其他组件**:
- `api/chart/chart.zh.md` ✅ (commit `57f887991`)
- `api/chart/axis.zh.md` ✅ (commit `a389caa59`)
- `api/chart/tooltip.zh.md` ✅ (commit `1257d3bb0`, `41999bc65`)

## Optimization Guidelines

根据 `CLAUDE.md` 中的设计原则，每个文档优化应包含：

1. **TypeScript 类型定义**: 添加完整的接口定义
2. **Props 表格**: 属性、类型、默认值、说明四列格式
3. **默认样式值**: 说明组件的默认样式
4. **用法示例**: 至少 3-5 个实用示例
5. **链接规范**: 使用 `/` 开头的绝对路径（如 `/tutorial/scale.zh.md`）
6. **源码验证**: 报告中注明关键源码位置

## Reports Format

每个优化报告必须参考 `@reports/tag-guide-doc-improvement.md` 的格式，包含以下章节：

```markdown
# [组件名] 文档优化报告

**组件**: `@antv/f2` - [ComponentName]
**文档路径**: `site/docs/...`
**优化日期**: [YYYY-MM-DD]
**优化目标**: 提升 AI 友好度，保持开源项目文档标准

---

## 一、主要问题

| 问题类型 | 具体表现 |
|----------|----------|
| ... | ... |

---

## 二、类型定义分析

### 2.x [PropsName]Props 实际定义

**源码文件**: `packages/f2/src/...`

```typescript
...
```

---

## 三、主要改进

### 3.x 新增 TypeScript 类型定义
### 3.x 新增文档章节
### 3.x Props 表格更新
### 3.x 新增用法示例

---

## 四、优化效果

| 维度 | 优化前 | 优化后 | 进步 |
|------|--------|--------|------|
| 类型完整性 | [等级] ([百分比%]) | [等级] ([百分比%]) | ⬆️ x 级 |
| 继承属性文档 | [等级] ([百分比%]) | [等级] ([百分比%]) | ⬆️ x 级 |
| 样式属性说明 | [等级] ([百分比%]) | [等级] ([百分比%]) | ⬆️ x 级 |
| 代码示例质量 | [等级] ([百分比%]) | [等级] ([百分比%]) | ⬆️ x 级 |
| **综合评级** | **[等级] ([百分比%])** | **[等级] ([百分比%])** | **⬆️ x 级** |

---

## 五、源码验证

- **类型定义**: `packages/f2/src/...`
- **测试用例**: `packages/f2/test/...`

### 关键源码位置

| 功能 | 文件:行号 |
|------|-----------|
| ... | ... |

---

## 六、最终改进清单

| 改进项 | 说明 |
|--------|------|
| ... | ... |

### 关键修正

| 问题 | 修正 |
|------|------|
| ... | ... |
```

**评分标准**：
- A (90-100%): 完整、准确、有示例
- B (75-89%): 基本完整，部分缺失
- C (60-74%): 缺少重要内容
- D (40-59%): 严重缺失
- E (0-39%): 基本没有文档
