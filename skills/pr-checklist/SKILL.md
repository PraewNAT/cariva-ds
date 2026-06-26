---
name: cariva-ds-pr-checklist
description: ตรวจ PR ที่มี component ใหม่หรือแก้โค้ด DS ว่าครบถ้วนก่อน merge ไหม — เช็ค token, stories, ai.md sync, test, code connect
---

# PR Checklist

ใช้เมื่อ user พูดว่า:

```
เช็ค PR นี้ก่อน merge
PR ready ไหม
review component นี้
ตรวจ checklist
```

---

## Steps

### 1. หา component ที่เปลี่ยนใน PR

```bash
git diff --name-only main...HEAD | grep "code/components/"
```

สกัด component name จาก path: `code/components/CrvLink/` → `CrvLink`

---

### 2. ตรวจแต่ละ component

สำหรับทุก component ที่เปลี่ยน ตรวจ 6 จุดนี้:

#### ✅ Token check
- grep หา hardcode hex หรือ px ใน `.tsx`:
  ```bash
  grep -n "#[0-9a-fA-F]\{3,6\}\|: '[0-9]\+px'" code/components/{Name}/{Name}.tsx
  ```
- ถ้าเจอ → flag "hardcoded value"
- เช็ค `colors.*` ทุกตัวว่ามีใน `tokens.json`

#### ✅ Stories check
- เปิด `{Name}.stories.tsx` — นับ exported stories
- เปิด `rules/components/{name}.md` — นับ variant combinations
- ถ้า stories < variants → flag "missing stories: X"

#### ✅ AI doc sync
- เปิด `{Name}.ai.md` และ `rules/components/{name}.md`
- เช็คว่า token table, variant list, Do/Don't ตรงกัน
- ถ้าไม่ตรง → flag "ai.md out of sync"

#### ✅ Test check
- เปิด `{Name}.test.tsx` — เช็คว่ามี test ครบ 4 หมวด: render, props, event, state
- ถ้าขาดหมวดไหน → flag "missing test: X"

#### ✅ 7-file check
- เช็คว่า folder มีครบ:
  `{Name}.tsx`, `{Name}.types.ts`, `{Name}.stories.tsx`, `{Name}.test.tsx`, `{Name}.ai.md`, `{Name}.figma.tsx`, `index.ts`
- ถ้าขาด → flag "missing file: X"

#### ✅ Code Connect
- เช็คว่า `{Name}.figma.tsx` มี node URL จริง (ไม่ใช่ `// TODO`)
  ```bash
  grep "TODO" code/components/{Name}/{Name}.figma.tsx
  ```
- ถ้ายัง TODO → flag "code connect: node URL missing"

---

## Report Format

```
PR Checklist — {branch name}
Components changed: CrvLink, CrvButton

── CrvLink ──────────────────────────
✅ No hardcoded values
✅ Stories: 8/8 variants covered
❌ ai.md out of sync — token table เก่า
✅ Tests: 4/4 categories
✅ 7/7 files present
⚠️  Code Connect: node URL missing

── CrvButton ─────────────────────────
✅ All checks passed

──────────────────────────────────────
Result: ❌ NOT READY — 2 issues to fix
```

---

## Rules

- Report only — ไม่แก้ไฟล์ถ้า user ไม่ขอ
- ถ้า user บอก "แก้เลย" → แก้เฉพาะรายการที่ flag ไว้ แล้วรัน checklist ซ้ำ
- ถ้าไม่มี `git diff` (เช่นยังไม่ได้ commit) → ให้ user บอก component name ตรงๆ แทน
