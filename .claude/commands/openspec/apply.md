---
name: OpenSpec: Apply
description: Implement an approved OpenSpec change and keep tasks in sync.
category: OpenSpec
tags: [openspec, apply]
---
<!-- OPENSPEC:START -->
**Guardrails**
- Favor straightforward, minimal implementations first and add complexity only when it is requested or clearly required.
- Keep changes tightly scoped to the requested outcome.
- Refer to `openspec/AGENTS.md` (located inside the `openspec/` directory—run `ls openspec` or `openspec update` if you don't see it) if you need additional OpenSpec conventions or clarifications.

**CRITICAL: IMMEDIATE SYNC REQUIREMENT**
After completing ANY individual task in tasks.md, you MUST update the checklist immediately before proceeding to the next task.
- **FORBIDDEN**: Completing multiple tasks before updating tasks.md
- **FORBIDDEN**: Relaying on memory to update tasks.md at the end
- **REQUIRED**: Each sub-task completion → immediate tasks.md update → next task

**Hook Enforcement (Stop Hook)**
This project has a Stop hook configured at `.claude/hooks/openspec-task-validator.sh`.
The hook will **BLOCK** session termination if:
1. An OpenSpec task is in progress (detected via `.claude/openspec-state.json`)
2. Not all steps are completed
3. tasks.md is not updated after completion

**State File Management**
When starting a task, create/update `.claude/openspec-state.json`:
```json
{
  "current_task": "优化 canvas.zh.md",
  "current_step": "读取 canvas.zh.md 当前文档",
  "pending_steps": [
    "查找 Canvas 源码和测试用例",
    "优化 canvas.zh.md 文档内容",
    "生成 canvas-doc-improvement.md 报告",
    "更新 tasks.md 标记 canvas.zh.md 完成",
    "Git 提交变更"
  ]
}
```

When completing the final step (Update tasks.md), clear the state file:
```bash
echo '{}' > .claude/openspec-state.json
```

**Steps**
Use `TodoWrite` to create an atomic step checklist for EACH individual task before starting it.

For each task in tasks.md (e.g., "优化 canvas.zh.md"):
```
1. [Initialize] 创建/更新 .claude/openspec-state.json
2. [Read] 读取当前文档/代码
3. [Research] 查找相关源码/测试用例
4. [Implement] 执行具体修改
5. [Verify] 验证修改正确性
6. [Update tasks.md] 立即更新 tasks.md 标记该任务完成 ← MANDATORY
7. [Cleanup] 清空 .claude/openspec-state.json ← MANDATORY
8. [Generate Report] 如有需要，生成报告
9. [Git Commit] 提交变更
```

**Completion Gate**: A task is ONLY considered complete when ALL steps above are done and:
1. TodoWrite shows all items as completed
2. tasks.md is updated with [x]
3. .claude/openspec-state.json is cleared

**Initial Setup**
1. Read `changes/<id>/proposal.md`, `design.md` (if present), and `tasks.md` to confirm scope and acceptance criteria.
2. Identify the NEXT pending task from tasks.md.
3. Create `.claude/openspec-state.json` with task info
4. Create TodoWrite checklist for that specific task

**Reference**
- Use `openspec show <id> --json --deltas-only` if you need additional context from the proposal while implementing.
<!-- OPENSPEC:END -->
