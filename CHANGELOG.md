# Changelog — Cariva Design System

---

## v1.0.1 — 2026-08-28

### 🐛 แก้ bug

- แก้ `CrvDropdown` — field ขนาด `size="small"`/`size="medium"` ไม่ apply จริง เรนเดอร์เป็นค่า default ของ MUI (สูง 57px, ตัวหนังสือ 16px) ทุกที่ที่ใช้แทนที่จะเป็นขนาดตาม Figma (`small` 38px/14px, `medium` 48px/16px) — สาเหตุคือ MUI `Select` clone `input` element แล้วเอา `sx` ของ `Select` เองทับ `sx` ที่ตั้งไว้บน `<OutlinedInput>` ทั้งก้อน ย้าย style ขนาด/สี/border ทั้งหมดไปรวมไว้ที่ `sx` ของ `Select` แทน
- เช็ค `CrvPagination` (ใช้ `CrvDropdown` ภายใน) แล้ว — ไม่โดนบั๊กเดียวกัน เพราะ customize ผ่าน prop `sx` สาธารณะของ `CrvDropdown` (ลงที่ `FormControl` ไม่ใช่ `Select` โดยตรง)

---

## v1.0.0 — 2026-07-06

### 🆕 Initial Release

**Components**

| Component | หมายเหตุ |
|---|---|
| `crvButton` | Primary action button |
| `crvButtonIcon` | Icon-only button |
| `crvInput` | Text input field |
| `crvCheckbox` | Checkbox input |
| `crvSelect` | Dropdown select |
| `crvTabs` | Tab navigation (Standard) |
| `crvTabsPills` | Tab navigation แบบ pill |
| `crvTabsFolder` | Tab navigation ชั้นนอกสุด |
| `crvTagStandard` | Status/category label |
| `crvAvatar` | User avatar |
| `crvBreadcrumb` | Breadcrumb navigation |
| `crvPagination` | Pagination control |
| `crvSidebar` | Sidebar navigation |
| `crvMenuItem` | Sidebar menu item |
| `crvTableCell` | Table cell |
| `crvTableHead` | Table header cell |
| `crvCard` | Content card container |
