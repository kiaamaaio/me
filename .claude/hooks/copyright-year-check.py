#!/usr/bin/env python3
"""サイトのコンテンツを変更したとき、フッターの著作権表示が当年を含むか確認する。

著作権表示の年は「最後に実質的な更新をした年」を表すため、カレンダーではなく
コンテンツの変更に連動して更新する。更新の無い年は据え置きで正しい。
"""
import datetime
import json
import os
import re
import sys

WATCHED_DIRS = ("src", "public")
NOTICE_FILE = os.path.join("src", "pages", "index.astro")
NOTICE_PATTERN = re.compile(r"©[^<\n]*")
YEAR_PATTERN = re.compile(r"\b(19|20)\d{2}\b")


def changed_path(data: dict) -> str:
    tool_input = data.get("tool_input") or {}
    tool_response = data.get("tool_response") or {}
    return tool_response.get("filePath") or tool_input.get("file_path") or ""


def is_watched(project_dir: str, path: str) -> bool:
    if not path:
        return False
    try:
        rel = os.path.relpath(os.path.realpath(path), os.path.realpath(project_dir))
    except ValueError:
        return False
    if rel.startswith(".."):
        return False
    return rel.split(os.sep)[0] in WATCHED_DIRS


def main() -> None:
    data = json.load(sys.stdin)
    project_dir = os.environ.get("CLAUDE_PROJECT_DIR", "")
    if not project_dir or not is_watched(project_dir, changed_path(data)):
        return

    notice_path = os.path.join(project_dir, NOTICE_FILE)
    try:
        with open(notice_path, encoding="utf-8") as f:
            source = f.read()
    except OSError:
        return

    notice = NOTICE_PATTERN.search(source)
    if not notice:
        return

    years = [int(m.group()) for m in YEAR_PATTERN.finditer(notice.group())]
    if not years:
        return

    current = datetime.date.today().year
    if min(years) <= current <= max(years):
        return

    reason = (
        f"{NOTICE_FILE} の著作権表示が「{notice.group().strip()}」のままで、"
        f"今年（{current}年）を含んでいません。"
        f"今回の変更がサイトの実質的な内容の更新であれば、"
        f"末尾の年を {current} に更新してください（例: © {min(years)}–{current} ...）。"
        "ビルド設定やツール類だけの変更であれば更新は不要です。"
        "どちらか判断がつかない場合はユーザーに確認してください。"
    )
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PostToolUse",
            "additionalContext": reason,
        }
    }))


if __name__ == "__main__":
    main()
