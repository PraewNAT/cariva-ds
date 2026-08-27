#!/usr/bin/env python3
"""
Scan React/TSX files for Cariva DS usage vs hardcoded / raw MUI.

Usage:
  python3 skills/verify-ds-usage/scripts/scan-ds-usage.py <file-or-directory>
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

# MUI primitives that should usually be Crv* in product UI
MUI_FORBIDDEN = {
    "Button": "CrvButton / CrvButtonIcon",
    "IconButton": "CrvButtonIcon",
    "TextField": "CrvInput",
    "Input": "CrvInput",
    "Select": "CrvSelect",
    "Checkbox": "CrvCheckbox",
    "Radio": "CrvRadio",
    "Switch": "CrvSwitch",
    "Tabs": "CrvTabsStandard / CrvTabsFolder",
    "Tab": "CrvTabs*",
    "Table": "CrvTable*",
    "TableBody": "CrvTable*",
    "TableCell": "CrvTableCell",
    "TableHead": "CrvTableHead",
    "TableRow": "CrvTable*",
    "Pagination": "CrvPagination",
    "Dialog": "CrvModal",
    "Modal": "CrvModal",
    "Drawer": "CrvDrawer / CrvSidebar",
    "Chip": "CrvBadge / tag pattern",
    "Autocomplete": "CrvAutocomplete",
    "Breadcrumbs": "CrvBreadcrumb",
    "Card": "CrvCard",
    "Tooltip": "CrvTooltip",
    "Snackbar": "CrvToast",
    "Alert": "CrvToast / alert pattern",
    "Fab": "CrvFab",
    "Rating": "CrvRating",
    "Accordion": "CrvAccordion",
    "Menu": "CrvDropdown / CrvMenuItem",
    "MenuItem": "CrvMenuItem",
}

# Allowed MUI for layout
MUI_ALLOWED = {
    "Box",
    "Stack",
    "Grid",
    "Grid2",
    "Container",
    "Typography",
    "Divider",
    "Paper",
    "Collapse",
    "Fade",
    "Grow",
    "Slide",
    "Zoom",
    "ClickAwayListener",
    "Popper",
    "Portal",
    "Skeleton",
    "CssBaseline",
    "ThemeProvider",
    "useTheme",
    "styled",
}

IMPORT_RE = re.compile(
    r"""import\s+(?:type\s+)?(?:\{([^}]+)\}|(\w+))\s+from\s+['"]([^'"]+)['"]""",
)
JSX_TAG_RE = re.compile(r"<([A-Z][A-Za-z0-9]*)")
HEX_COLOR_RE = re.compile(r"#(?:[0-9a-fA-F]{3}){1,2}\b")
RGB_COLOR_RE = re.compile(r"\brgba?\s*\(")
FAKE_BUTTON_RE = re.compile(
    r"<Box[^>]*\bonClick\b",
    re.DOTALL,
)
ROLE_BUTTON_RE = re.compile(r"""role\s*=\s*['"]button['"]""")


def collect_tsx_files(target: Path) -> list[Path]:
    if target.is_file():
        return [target] if target.suffix in {".tsx", ".ts", ".jsx", ".js"} else []
    return sorted(
        p
        for p in target.rglob("*")
        if p.suffix in {".tsx", ".ts", ".jsx", ".js"}
        and "node_modules" not in p.parts
        and ".test." not in p.name
    )


def parse_imports(content: str) -> list[tuple[str, str, int]]:
    """Return (symbol, module, line_number)."""
    results: list[tuple[str, str, int]] = []
    for i, line in enumerate(content.splitlines(), start=1):
        m = IMPORT_RE.search(line)
        if not m:
            continue
        module = m.group(3)
        if m.group(1):
            symbols = [s.strip().split(" as ")[0].strip() for s in m.group(1).split(",")]
            for sym in symbols:
                if sym:
                    results.append((sym, module, i))
        elif m.group(2):
            results.append((m.group(2), module, i))
    return results


def scan_file(path: Path) -> dict:
    content = path.read_text(encoding="utf-8")
    lines = content.splitlines()

    imports = parse_imports(content)
    crv_imports = sorted({sym for sym, mod, _ in imports if sym.startswith("Crv")})
    mui_imports = sorted(
        {
            sym
            for sym, mod, _ in imports
            if "@mui/material" in mod or mod == "@mui/material"
        }
    )

    jsx_tags = JSX_TAG_RE.findall(content)
    tag_counts: dict[str, int] = {}
    for tag in jsx_tags:
        tag_counts[tag] = tag_counts.get(tag, 0) + 1

    crv_jsx = sorted(t for t in tag_counts if t.startswith("Crv"))
    forbidden_jsx = sorted(
        t for t in tag_counts if t in MUI_FORBIDDEN and t not in MUI_ALLOWED
    )
    allowed_mui_jsx = sorted(t for t in tag_counts if t in MUI_ALLOWED)

    hex_lines = [i + 1 for i, line in enumerate(lines) if HEX_COLOR_RE.search(line)]
    rgb_lines = [i + 1 for i, line in enumerate(lines) if RGB_COLOR_RE.search(line)]

    fake_button = bool(FAKE_BUTTON_RE.search(content) or ROLE_BUTTON_RE.search(content))

    forbidden_imports = [sym for sym in mui_imports if sym in MUI_FORBIDDEN]

    return {
        "path": path,
        "crv_imports": crv_imports,
        "crv_jsx": crv_jsx,
        "forbidden_imports": forbidden_imports,
        "forbidden_jsx": forbidden_jsx,
        "allowed_mui_jsx": allowed_mui_jsx,
        "mui_imports_other": [
            sym for sym in mui_imports if sym not in MUI_FORBIDDEN and sym not in MUI_ALLOWED
        ],
        "hex_lines": hex_lines,
        "rgb_lines": rgb_lines,
        "fake_button": fake_button,
        "tag_counts": tag_counts,
    }


def status_icon(ok: bool, warn: bool = False) -> str:
    if ok:
        return "✅"
    if warn:
        return "⚠️"
    return "❌"


def print_file_report(result: dict) -> None:
    rel = result["path"]
    print(f"\n## {rel}")
    print()

    has_crv = bool(result["crv_imports"] or result["crv_jsx"])
    has_forbidden = bool(result["forbidden_imports"] or result["forbidden_jsx"])
    has_hardcode = bool(result["hex_lines"] or result["rgb_lines"] or result["fake_button"])

    if has_crv and not has_forbidden and not has_hardcode:
        print("สรุป: ✅ ดูเหมือนใช้ DS เป็นหลัก (ไม่พบ MUI component ต้องห้ามหรือ hardcode ชัดเจน)")
    elif has_forbidden:
        print("สรุป: ❌ พบ MUI component ที่ควรเป็น Crv*")
    elif has_hardcode:
        print("สรุป: ⚠️ ใช้ Crv* บางส่วน แต่มี hardcode / ปุ่มปลอม")
    elif has_crv:
        print("สรุป: ⚠️ มี Crv* แต่ควรให้ agent อ่าน context เพิ่ม")
    else:
        print("สรุป: ⚠️ ไม่พบ Crv* — อาจเป็น layout-only หรือไม่ได้ใช้ DS")

    if result["crv_imports"]:
        print(f"\n✅ Import จาก DS ({len(result['crv_imports'])}): {', '.join(result['crv_imports'])}")
    else:
        print("\n⚠️ ไม่พบ import ชื่อ Crv*")

    if result["crv_jsx"]:
        usage = ", ".join(f"{t}×{result['tag_counts'][t]}" for t in result["crv_jsx"])
        print(f"✅ ใช้ใน JSX: {usage}")

    if result["forbidden_imports"]:
        print("\n❌ Import MUI ที่ควรหลีกเลี่ยง:")
        for sym in result["forbidden_imports"]:
            print(f"   - {sym} → ควรเป็น {MUI_FORBIDDEN[sym]}")

    if result["forbidden_jsx"]:
        print("\n❌ ใช้ใน JSX (ไม่ใช่ DS):")
        for sym in result["forbidden_jsx"]:
            print(f"   - <{sym}> ×{result['tag_counts'][sym]} → {MUI_FORBIDDEN[sym]}")

    if result["allowed_mui_jsx"]:
        usage = ", ".join(f"{t}×{result['tag_counts'][t]}" for t in result["allowed_mui_jsx"])
        print(f"\nℹ️  MUI สำหรับ layout (ปกติ): {usage}")

    if result["mui_imports_other"]:
        print(f"\nℹ️  MUI อื่นๆ ที่ import: {', '.join(result['mui_imports_other'])}")

    if result["hex_lines"]:
        print(f"\n⚠️  สี hex hardcode ที่บรรทัด: {', '.join(map(str, result['hex_lines'][:12]))}"
              + (" ..." if len(result["hex_lines"]) > 12 else ""))

    if result["rgb_lines"]:
        print(f"⚠️  สี rgb/rgba ที่บรรทัด: {', '.join(map(str, result['rgb_lines'][:12]))}"
              + (" ..." if len(result["rgb_lines"]) > 12 else ""))

    if result["fake_button"]:
        print("\n⚠️  อาจมีปุ่มปลอม (Box + onClick หรือ role=\"button\") — ตรวจด้วยตาว่าเป็นปุ่มหรือไม่")


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: python3 scan-ds-usage.py <file-or-directory>", file=sys.stderr)
        return 1

    target = Path(sys.argv[1]).resolve()
    if not target.exists():
        print(f"Not found: {target}", file=sys.stderr)
        return 1

    files = collect_tsx_files(target)
    if not files:
        print("No .tsx/.ts files found.", file=sys.stderr)
        return 1

    print("# Cariva DS Usage Scan")
    print(f"เป้าหมาย: {target}")
    print(f"ไฟล์: {len(files)}")

    totals = {"crv": 0, "forbidden": 0, "hardcode": 0}
    for f in files:
        r = scan_file(f)
        print_file_report(r)
        if r["crv_imports"] or r["crv_jsx"]:
            totals["crv"] += 1
        if r["forbidden_imports"] or r["forbidden_jsx"]:
            totals["forbidden"] += 1
        if r["hex_lines"] or r["rgb_lines"] or r["fake_button"]:
            totals["hardcode"] += 1

    print("\n---")
    print("หมายเหตุ: สคริปต์นี้ช่วยจับ pattern — agent ควรสรุปรายงานภาษาไทยตาม SKILL.md")
    print(f"ไฟล์ที่มี Crv*: {totals['crv']}/{len(files)} | มี MUI ต้องห้าม: {totals['forbidden']} | มี hardcode: {totals['hardcode']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
