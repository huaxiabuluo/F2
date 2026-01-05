#!/bin/bash
# OpenSpec 任务完成验证 Hook
#
# 功能：在 AI 尝试结束会话时，检查是否有未完成的 OpenSpec 任务
# 触发：Stop 事件
# 决策：block（阻止结束）/ approve（允许结束）

set -euo pipefail

# 读取 hook 输入
input=$(cat)
session_id=$(echo "$input" | jq -r '.session_id')
cwd=$(echo "$input" | jq -r '.cwd')

# 定义状态文件路径
STATE_FILE="$cwd/.claude/openspec-state.json"
TASKS_MD="$cwd/openspec/changes/optimize-docs/tasks.md"

# 初始化输出
output=$(jq -n '{"continue": true, "systemMessage": ""}')

# 检查是否有活跃的 OpenSpec 任务状态
if [ ! -f "$STATE_FILE" ]; then
  # 无活跃任务，允许结束
  echo "$output" | jq '.systemMessage = "无活跃 OpenSpec 任务，允许结束。"'
  exit 0
fi

# 读取当前状态
current_task=$(jq -r '.current_task // empty' "$STATE_FILE")
current_step=$(jq -r '.current_step // empty' "$STATE_FILE")
completed_steps=$(jq -r '.completed_steps[]?' "$STATE_FILE" 2>/dev/null | wc -l | xargs)

# 空状态表示已完成
if [ -z "$current_task" ] && [ -z "$current_step" ]; then
  rm -f "$STATE_FILE"
  echo "$output" | jq '.systemMessage = "OpenSpec 任务已完成，状态已清理。"'
  exit 0
fi

# 定义必需步骤
REQUIRED_STEPS=("读取文档" "查找源码" "优化文档" "生成报告" "更新任务清单" "提交变更")

# 检查完成情况
missing_steps=()
for step in "${REQUIRED_STEPS[@]}"; do
  if ! jq -r '.completed_steps[]?' "$STATE_FILE" 2>/dev/null | grep -q "^$step$"; then
    missing_steps+=("$step")
  fi
done

# 如果有未完成步骤，阻止结束
if [ ${#missing_steps[@]} -gt 0 ]; then
  missing_list=$(IFS=$'\n'; echo "${missing_steps[*]}")

  cat > /tmp/stop-hook-block-$session_id.json << EOF
{
  "decision": "block",
  "reason": "OpenSpec 任务未完成：当前任务 '$current_task' 还有 ${#missing_steps[@]} 个未完成步骤",
  "systemMessage": "⚠️ OpenSpec 任务进行中

**当前任务**: $current_task
**当前步骤**: $current_step
**已完成步骤**: $completed_steps / ${#REQUIRED_STEPS[@]}

**未完成步骤**:
$missing_list

请继续完成所有步骤。PostToolUse Hook 会自动跟踪进度。"
}
EOF
  cat /tmp/stop-hook-block-$session_id.json
  rm -f /tmp/stop-hook-block-$session_id.json
  exit 0
fi

# 所有步骤完成，检查 tasks.md 是否已更新
if [ -f "$TASKS_MD" ]; then
  # 提取任务关键词（如 "canvas.zh.md"）
  task_keyword=$(echo "$current_task" | grep -oE '[a-z]+\.zh\.md' || echo "")

  if [ -n "$task_keyword" ]; then
    if grep -q "\\- \\[x\\].*$task_keyword" "$TASKS_MD"; then
      # tasks.md 已更新，任务真正完成
      jq -n '{}' > "$STATE_FILE"
      echo "$output" | jq ".systemMessage = \"✅ OpenSpec 任务 '$current_task' 已完成并同步到 tasks.md。\""
      exit 0
    fi
  fi
fi

# 所有步骤完成但 tasks.md 未更新
cat > /tmp/stop-hook-remind-$session_id.json << EOF
{
  "decision": "block",
  "reason": "所有实施步骤已完成，但 tasks.md 尚未更新",
  "systemMessage": "⚠️ 最后一步：更新 tasks.md

**任务**: $current_task

所有步骤已完成：
✓ 读取文档
✓ 查找源码
✓ 优化文档
✓ 生成报告

但还需要：
1. 更新 tasks.md，将该任务标记为 [x]
2. Git commit 提交变更

完成这两步后，任务才算真正结束。"
}
EOF
cat /tmp/stop-hook-remind-$session_id.json
rm -f /tmp/stop-hook-remind-$session_id.json
exit 0
