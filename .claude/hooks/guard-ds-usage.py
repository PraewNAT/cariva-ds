#!/usr/bin/env python3
"""
PreToolUse guard for Cariva DS.

Blocks the two mistakes that are easy to make and hard to spot in review:

  1. Raw hex colours in UI source — colours must come from the DS token
     modules, never be retyped from a mockup.
  2. Files named `Crv*` outside the DS itself — a hand-rolled `CrvButton`
     looks like the real component in every diff and import statement.

Contract: reads the PreToolUse payload on stdin, exits 0 to allow.
Exit code 2 blocks the call and shows stderr to Claude.
"""
import json
import os
import re
import sys

HEX = re.compile(r"#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b")
LINE_COMMENT = re.compile(r"//[^\n]*")
BLOCK_COMMENT = re.compile(r"/\*.*?\*/", re.DOTALL)


# Escape hatch: a colour the design needs but the DS has no token for. The
# marker has to sit on the same line, so the reason stays visible in review
# and every one of them is greppable when the token finally lands.
DS_GAP = "ds-gap"


def strip_comments(text: str) -> str:
    """Hex in a comment is documentation, not a hardcoded colour."""
    kept = [ln for ln in text.splitlines() if DS_GAP not in ln]
    return LINE_COMMENT.sub("", BLOCK_COMMENT.sub("", "\n".join(kept)))
UI_SUFFIXES = (".tsx", ".jsx", ".ts", ".js", ".css")

# Paths that are allowed to hold raw hex: the token source of truth, the
# generated theme, the vendored DS copy, and anything not shipped to users.
HEX_EXEMPT = (
    "/src/ds/",
    "/code/core/theme/",
    "/code/core/tokens",
    "/export/",
    "/node_modules/",
    "/.claude/",
    "tokens.ts",
    "tokens.json",
    "generatedPalette",
    ".stories.",
    ".test.",
    ".spec.",
    ".figma.",
)

# Only the DS itself may define `Crv*` components.
CRV_EXEMPT = ("/src/ds/", "/code/core/components/", "/export/", "/node_modules/")


def exempt(path: str, rules: tuple) -> bool:
    norm = path.replace(os.sep, "/")
    return any(r in norm for r in rules)


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0  # never break the session on a malformed payload

    tool = payload.get("tool_name", "")
    if tool not in ("Write", "Edit"):
        return 0

    tool_input = payload.get("tool_input", {}) or {}
    path = tool_input.get("file_path", "")
    if not path:
        return 0

    text = tool_input.get("content") or tool_input.get("new_string") or ""
    base = os.path.basename(path)

    if base.startswith("Crv") and not exempt(path, CRV_EXEMPT):
        sys.stderr.write(
            f"BLOCKED: {base}\n\n"
            "Only Cariva DS may define `Crv*` components. Import the real one:\n"
            "    import { CrvButton } from '@/ds/components/CrvButton';\n\n"
            "If the DS genuinely lacks this component, build it under a "
            "different name, add a comment saying it is a local stand-in, and "
            "tell the user it is a DS gap.\n"
        )
        return 2

    if path.endswith(UI_SUFFIXES) and not exempt(path, HEX_EXEMPT):
        found = HEX.findall(strip_comments(text))
        if found:
            uniq = sorted(set(found))[:5]
            sys.stderr.write(
                f"BLOCKED: hardcoded colour in {base} -> {', '.join(uniq)}\n\n"
                "Read colours from the DS tokens instead of retyping them:\n"
                "    import { colors } from '@/ds/tokens';\n"
                "    colors.content.primary   // not '#0f172a'\n\n"
                "If the design genuinely has no DS token for it, mark the "
                f"line `// {DS_GAP}: <reason>` to allow it — then tell the "
                "user it is a DS gap so the token can be added.\n"
            )
            return 2

    return 0


if __name__ == "__main__":
    sys.exit(main())
