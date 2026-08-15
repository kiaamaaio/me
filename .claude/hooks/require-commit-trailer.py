#!/usr/bin/env python3
import json
import re
import sys

TRAILER_PATTERN = re.compile(r"Co-Authored-By:\s*Claude\s+\S.*<noreply@anthropic\.com>")
TRAILER_EXAMPLE = "Co-Authored-By: Claude <使用中のモデル名> <noreply@anthropic.com>"


def main() -> None:
    data = json.load(sys.stdin)
    cmd = data.get("tool_input", {}).get("command", "") or ""

    if not re.search(r"(^|[;&|]|\s)git\s+(-\S+\s+)*commit\b", cmd):
        return

    if re.search(r"--no-edit\b", cmd):
        return

    if TRAILER_PATTERN.search(cmd):
        return

    reason = (
        "コミットメッセージに必須トレーラーがありません。"
        f"末尾に次の形式の行を追加してから git commit をやり直してください（モデル名は現在使用中のものに合わせる）: {TRAILER_EXAMPLE}"
    )
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }))


if __name__ == "__main__":
    main()
