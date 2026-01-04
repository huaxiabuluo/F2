## ADDED Requirements

### Requirement: 文档类型定义完整性

每个 API 组件文档 SHALL 包含完整的 TypeScript 类型定义。

#### Scenario: 组件 Props 类型定义

- **GIVEN** 一个 API 组件文档（如 `area.zh.md`）
- **WHEN** 文档被阅读或 AI 分析
- **THEN** 文档 SHALL 包含完整的 `interface ComponentProps` 定义
- **AND** 所有属性 SHALL 有明确的类型注解
- **AND** 可选属性 SHALL 使用 `?:` 标记
- **AND** 函数类型 SHALL 包含参数和返回值类型

#### Scenario: 类型定义与源码一致性

- **GIVEN** 一个 API 组件文档
- **WHEN** 验证类型定义准确性
- **THEN** 文档中的类型定义 SHALL 与源码中的实际定义一致
- **AND** 优先使用源码实际实现而非类型定义文件（当两者不一致时）

### Requirement: Props 表格化与默认值

每个组件文档 SHALL 包含表格化的 Props 说明，包含默认值。

#### Scenario: Props 表格四列格式

- **GIVEN** 一个组件文档
- **WHEN** 展示 Props 说明
- **THEN** SHALL 使用表格格式，包含四列：属性 | 类型 | 默认值 | 说明
- **AND** 复杂属性类型 SHALL 包含详细说明或子表格
- **AND** 默认值 SHALL 准确反映组件实际行为

#### Scenario: 默认值完整性

- **GIVEN** 一个组件文档
- **WHEN** Props 表格被创建
- **THEN** 所有属性 SHALL 包含默认值列
- **AND** 无默认值的属性 SHALL 使用 `-` 标记
- **AND** 默认值 SHALL 与源码中的 `defaultProps` 或主题配置一致

### Requirement: 用法示例充分性

每个组件文档 SHALL 包含至少 3-5 个实用的用法示例。

#### Scenario: 基础用法示例

- **GIVEN** 一个组件文档
- **WHEN** 文档被阅读
- **THEN** SHALL 包含基础用法示例（最简单的使用方式）
- **AND** 示例代码 SHALL 可直接复制运行
- **AND** 示例代码 SHALL 包含必要的 import 语句

#### Scenario: 进阶用法示例

- **GIVEN** 一个组件文档
- **WHEN** 展示高级功能
- **THEN** SHALL 包含进阶用法示例（如回调函数、自定义样式等）
- **AND** 示例 SHALL 展示常见实际使用场景
- **AND** 复杂示例 SHALL 包含注释说明关键逻辑

#### Scenario: 边界与特殊情况示例

- **GIVEN** 一个组件文档
- **WHEN** 展示特殊使用场景
- **THEN** SHALL 包含边界情况处理示例（如空数据、错误处理等）
- **AND** SHALL 包含条件渲染示例
- **AND** SHALL 包含事件处理示例（如适用）

### Requirement: 文档链接规范性

文档内部链接 SHALL 使用相对于 `docs` 目录的绝对路径（以 `/` 开头）。

#### Scenario: 正确的链接格式

- **GIVEN** 一个文档需要引用其他文档
- **WHEN** 创建内部链接
- **THEN** 链接 SHALL 以 `/` 开头（如 `/tutorial/scale.zh.md`）
- **AND** SHALL 不使用相对路径（如 `../../tutorial/scale.zh.md`）
- **AND** 链接目标文件 SHALL 确实存在

#### Scenario: 链接有效性验证

- **GIVEN** 一个包含链接的文档
- **WHEN** 文档被验证
- **THEN** 所有内部链接 SHALL 指向存在的文件
- **AND** 链接 SHALL 使用正确的文件扩展名（`.md`）

### Requirement: 源码引用与验证

文档优化 SHALL 基于实际源码验证，确保准确性。

#### Scenario: 源码位置标注

- **GIVEN** 一个 API 组件文档优化
- **WHEN** 生成优化报告
- **THEN** 报告 SHALL 包含关键功能的源码位置（文件:行号格式）
- **AND** SHALL 包含类型定义、默认值、实现的文件路径
- **AND** SHALL 包含测试用例的引用（如适用）

#### Scenario: 代码事实优先原则

- **GIVEN** 文档与类型定义文件存在差异
- **WHEN** 决定以哪个为准
- **THEN** SHALL 以源码实际实现为准
- **AND** SHALL 在优化报告中记录差异
- **AND** SHALL 建议修复类型定义文件（如必要）

### Requirement: 优化报告生成

每个文档优化完成后 SHALL 生成对应的优化报告。

#### Scenario: 报告内容结构

- **GIVEN** 一个文档优化完成
- **WHEN** 生成优化报告
- **THEN** 报告 SHALL 包含以下章节：
  - 一、主要问题（问题类型和具体表现表格）
  - 二、类型定义分析（源码位置和实际定义）
  - 三、主要改进（改进内容列表）
  - 四、优化效果（对比表格）
  - 五、源码验证（关键源码位置）
  - 六、最终改进清单（改进项表格）

#### Scenario: 报告文件命名与位置

- **GIVEN** 一个组件文档优化完成
- **WHEN** 生成优化报告
- **THEN** 报告 SHALL 存放在 `reports/` 目录
- **AND** 文件名格式 SHALL 为 `[component-name]-doc-improvement.md`
- **AND** 报告 SHALL 包含组件名、文档路径、优化日期、优化目标等元信息

### Requirement: 文档示例代码规范

文档中的示例代码 SHALL 遵循简洁性和可读性原则。

#### Scenario: 代码注释极简原则

- **GIVEN** 文档中的示例代码
- **WHEN** 编写代码注释
- **THEN** 内联注释 SHALL 仅解释非显而易见的逻辑
- **AND** SHALL 解释"为什么"而非"是什么"
- **AND** 详细解释 SHALL 放在代码块外的说明区域

#### Scenario: 代码可直接复制

- **GIVEN** 文档中的示例代码
- **WHEN** 开发者复制代码
- **THEN** 示例代码 SHALL 是可直接运行的
- **AND** SHALL 包含必要的 import 语句
- **AND** 注释 SHALL 不影响代码的实际使用

### Requirement: 继承属性文档完整性

对于继承自其他组件的属性，SHALL 明确标注继承来源。

#### Scenario: 继承属性说明

- **GIVEN** 一个组件继承自基础组件（如 Geometry）
- **WHEN** 文档说明 Props
- **THEN** SHALL 明确标注哪些属性是继承的
- **AND** SHALL 说明继承来源
- **AND** 如适用，SHALL 提供到基础组件文档的链接
