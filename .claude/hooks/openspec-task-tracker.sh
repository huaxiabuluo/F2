#!/bin/bash
# OpenSpec 自动任务跟踪 Hook v2
#
# 功能：通过监听工具调用自动跟踪任务进度（通用模板版）
# 触发：PostToolUse 事件
# 更新：自动维护 .claude/openspec-state.json

set -euo pipefail

# 读取 hook 输入
input=$(cat)
cwd=$(echo "$input" | jq -r '.cwd')
tool_name=$(echo "$input" | jq -r '.tool_name // empty')
tool_input=$(echo "$input" | jq -r '.tool_input // {}')

# 配置文件路径
CONFIG_FILE="$cwd/.claude/hooks/openspec-task-config.json"
STATE_FILE="$cwd/.claude/openspec-state.json"
TASKS_MD="$cwd/openspec/changes/optimize-docs/tasks.md"

# 如果配置文件不存在，退出
if [ ! -f "$CONFIG_FILE" ]; then
  exit 0
fi

# 初始化状态文件（如果不存在）
if [ ! -f "$STATE_FILE" ]; then
  echo '{"current_task": "", "current_step": "", "pending_steps": [], "completed_steps": []}' > "$STATE_FILE"
  exit 0
fi

# 提取文件路径
file_path=$(echo "$tool_input" | jq -r '.file_path // empty' 2>/dev/null || true)

# 提取命令
command=$(echo "$tool_input" | jq -r '.command // empty' 2>/dev/null || true)

# 读取当前状态
current_task=$(jq -r '.current_task // empty' "$STATE_FILE")
completed_steps=$(jq -r '.completed_steps[]' "$STATE_FILE" 2>/dev/null || echo "")

# ====== 函数：从文件路径推断任务名称 ======
infer_task_from_path() {
  local path="$1"

  # 提取文档文件名
  if [[ "$path" =~ site/docs/(.+\.(zh|en)\.md) ]]; then
    local doc_file="${BASH_REMATCH[1]}"
    echo "优化 $doc_file"
    return 0
  fi

  return 1
}

# ====== 函数：检测任务组件关键词 ======
detect_component_from_path() {
  local path="$1"
  local component=""

  # 从配置读取关键词映射
  local keywords=$(jq -r '.component_keywords // {}' "$CONFIG_FILE")

  # 遍历所有组件
  for key in $(echo "$keywords" | jq -r 'keys[]'); do
    local patterns=$(echo "$keywords" | jq -r ".$key[]")
    while IFS= read -r pattern; do
      if [[ "$path" =~ $pattern ]]; then
        component="$key"
        break 2
      fi
    done <<< "$patterns"
  done

  echo "$component"
}

# ====== 如果当前没有活跃任务，自动检测 ======
if [ -z "$current_task" ] && [ -n "$file_path" ]; then
  # 检查是否是文档操作
  if [[ "$file_path" == *site/docs* ]]; then
    current_task=$(infer_task_from_path "$file_path")

    if [ -n "$current_task" ]; then
      # 初始化状态
      jq --arg task "$current_task" \
        '.current_task = $task | .current_step = "" | .completed_steps = []' \
        "$STATE_FILE" > "$STATE_FILE.tmp"
      mv "$STATE_FILE.tmp" "$STATE_FILE"
    fi
  fi
fi

# ====== 根据工具调用推断步骤 ======
new_step=""

case "$tool_name" in
  "Read")
    # 读取文档
    if [[ "$file_path" == *"site/docs"* ]] && [[ "$file_path" == *".zh.md" ]] || [[ "$file_path" == *".en.md" ]]; then
      new_step="读取文档"
    fi
    # 查找源码
    if [[ "$file_path" == *"packages/f2/src"* ]] || [[ "$file_path" == *"packages/f2/test"* ]]; then
      new_step="查找源码"
    fi
    ;;
  "Edit"|"Write")
    # 生成报告
    if [[ "$file_path" == *"reports/"*"-doc-improvement.md" ]]; then
      new_step="生成报告"
    fi
    # 更新任务清单
    if [[ "$file_path" == *"tasks.md" ]]; then
      # 检查是否标记了任务完成（通过内容检测）
      if [ -f "$file_path" ] && [ -n "$current_task" ]; then
        # 提取文档文件名进行匹配
        doc_name=$(echo "$current_task" | sed 's/优化 //; s/ /\.zh\.md/')
        if grep -q "\\- \[x\\].*$doc_name" "$file_path" 2>/dev/null || \
           grep -q "\\- \[x\\].*$(echo "$doc_name" | sed 's/\.zh\.md//')" "$file_path" 2>/dev/null; then
          new_step="更新任务清单"
          # 任务完成，清空状态
          jq '{}' > "$STATE_FILE"
          exit 0
        fi
      fi
    fi
    # 优化文档（排除 Read 操作）
    if [[ "$file_path" == *"site/docs"* ]] && ([[ "$file_path" == *".zh.md" ]] || [[ "$file_path" == *".en.md" ]]); then
      # 检查已完成步骤，避免重复记录
      if ! echo "$completed_steps" | grep -q "^优化文档$"; then
        new_step="优化文档"
      fi
    fi
    ;;
  "Bash")
    if [[ "$command" == *"git commit"* ]]; then
      new_step="提交变更"
    fi
    ;;
  "Glob"|"Grep")
    if [[ "$file_path" == *"packages/f2"* ]]; then
      new_step="查找源码"
    fi
    ;;
esac

# ====== 如果检测到新步骤且未完成过，更新状态 ======
if [ -n "$new_step" ] && [ -n "$current_task" ]; then
  # 检查是否已完成此步骤
  if ! echo "$completed_steps" | grep -q "^$new_step$"; then
    # 更新状态：标记步骤完成
    jq --arg step "$new_step" \
      '.completed_steps += [$step] | .current_step = $step' \
      "$STATE_FILE" > "$STATE_FILE.tmp"
    mv "$STATE_FILE.tmp" "$STATE_FILE"
  fi
fi

exit 0
