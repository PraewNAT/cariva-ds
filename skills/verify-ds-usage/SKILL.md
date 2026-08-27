---
name: verify-ds-usage
description: ตรวจโค้ดหน้า UI / Storybook ว่าใช้ Cariva DS component จริงหรือแค่ hardcode ให้หน้าตาเหมือน รายงานเป็นภาษาไทยเข้าใจง่ายสำหรับคนที่ไม่อ่านโค้ด ใช้เมื่อ user พูดว่า เช็คว่าใช้ component จริงไหม, ดึง DS มาจริงมั้ย, hardcode หรือเปล่า, verify design system usage, audit code หน้านี้
---

# Verify Design System Usage (Code)

ใช้เมื่อ user ต้องการรู้ว่า **หน้า UI ในโค้ดใช้ component ของ Cariva DS จริง** หรือแค่ **วาดเอง / hardcode ให้หน้าตาเหมือน**

เหมาะกับคนที่เช็คด้วยตาใน Storybook ได้ แต่ไม่มั่นใจว่า dev ดึง `Crv*` มาจริงหรือไม่

---

## เมื่อไหร่ควรใช้สกิลนี้ (ไม่ใช่สกิลอื่น)

| สกิล | ตรวจอะไร |
|------|----------|
| **verify-ds-usage** (สกิลนี้) | โค้ด React/Storybook — import, JSX, hardcode |
| `cariva-ds-audit` | Figma — token, component instance |
| `cariva-ds-qa` | Figma screen ก่อน handoff ให้ dev |

---

## Trigger phrases

```text
เช็คว่าใช้ component จริงไหม
ดึง DS มาจริงมั้ย
hardcode หรือเปล่า
verify design system usage
audit code หน้านี้
เช็ค Organization Overview ว่าใช้ของ DS จริงไหม
```

---

## Workflow

### 1. ระบุไฟล์เป้าหมาย

- Storybook story: `code/components/**/*.stories.tsx`
- หน้า app: path ที่ user บอก หรือไฟล์ที่ compose screen

ถ้า user บอกแค่ชื่อ story (เช่น Organization Overview) ให้ค้นหาไฟล์ที่เกี่ยวข้องก่อน

### 2. รันสคริปต์สแกน (ทำก่อนเสมอ)

จาก root ของ repo:

```bash
python3 skills/verify-ds-usage/scripts/scan-ds-usage.py <path-to-file-or-folder>
```

ตัวอย่าง:

```bash
python3 skills/verify-ds-usage/scripts/scan-ds-usage.py code/components/CrvSidebar/CrvOrganizationOverview.stories.tsx
```

อ่าน output ของสคริปต์ แล้วใช้เป็นฐานของรายงาน

### 3. อ่านโค้ดเพิ่ม (agent เท่านั้น)

สคริปต์จับ pattern หลักได้ แต่ agent ต้องเช็คเพิ่มด้วยตา:

- `Box` / `Stack` ที่มี `onClick`, `role="button"`, border+padding เหมือนปุ่ม → **ปลอมปุ่ม**
- Wrapper รอบ `Crv*` ที่ override สี/spacing จนหลุด token
- Copy component logic ในไฟล์เดียวกันแทน import จาก `code/components/`
- Icon จาก `@mui/icons-material` โดยตรง (ยอมรับได้) vs สร้าง SVG เองทั้งก้อน

### 4. (ถ้ามี) เทียบกับ Figma

ถ้า user ให้ Figma node หรือลิงก์:

- ดูว่าแต่ละ region ใน Figma ควรเป็น component ไหน
- แมปกับสิ่งที่พบในโค้ด
- บอกชัดว่า **ตรง Figma + ใช้ DS จริง** หรือ **ตรงสายตาแต่ไม่ใช่ DS**

### 5. (ถ้ามี) เปิด Storybook

ถ้า story รันได้ แนะนำ user เปิดคู่กับรายงาน:

- URL มักอยู่ที่ `http://localhost:6007/?path=/story/...`
- รายงานควรอ้าง **ชื่อส่วนบนหน้า** (Sidebar, ปุ่ม Add, ตาราง) ไม่ใช่แค่ชื่อไฟล์

---

## สิ่งที่ถือว่า "ใช้ DS จริง"

- มี `import { CrvButton } from '...'` (หรือ path ภายใน repo) **และ** ใช้ `<CrvButton ...>` ใน JSX
- ใช้ sub-component ที่ export จาก package DS เช่น `CrvSidebarMenu`, `CrvTableHead`
- Layout ใช้ `Box`/`Stack` + **semantic tokens** (`theme.semantic...`, `spacing.*`) — ยอมรับสำหรับโครงหน้า

## สิ่งที่ถือว่า "หน้าตาเหมือน แต่ไม่ใช่ DS"

- Import / ใช้ MUI โดยตรง: `Button`, `TextField`, `Select`, `Tabs`, `Table*` แทน `Crv*`
- สี hex (`#fff`, `#1976d2`) หรือ `rgb()` ใน `sx` / `style`
- ปุ่มที่เป็น `Box` + styling เอง
- Component ที่ copy-paste logic จาก DS มาใน story โดยไม่ import

## สิ่งที่ถือว่า "ยอมรับได้ / ไม่ใช่ปัญหา"

- `Box`, `Stack`, `Typography` จาก MUI สำหรับ layout เท่านั้น
- `@mui/icons-material` สำหรับ icon (DS ยังไม่มี icon set แยก)
- Pattern doc บอกให้ compose ด้วย `Box` + tokens เมื่อยังไม่มี `Crv*` (ต้องบอก user ว่าเป็น gap ของ DS)

---

## แผนที่ MUI → Cariva DS (สรุป)

| ถ้าเจอในโค้ด | ควรเป็น |
|--------------|---------|
| `Button` | `CrvButton` / `CrvButtonIcon` |
| `TextField`, `Input` | `CrvInput` |
| `Select` | `CrvSelect` |
| `Checkbox` | `CrvCheckbox` |
| `Radio` | `CrvRadio` / `CrvRadioGroup` |
| `Switch` | `CrvSwitch` |
| `Tabs` | `CrvTabsStandard` / `CrvTabsFolder` |
| `Table*` | `CrvTableHead`, `CrvTableCell`, ... |
| `Pagination` | `CrvPagination` |
| `Modal` / `Dialog` | `CrvModal` |
| `Drawer` | `CrvDrawer` / `CrvSidebar` |
| `Chip` / Tag | `CrvBadge` / `CrvTag` (ดู use case) |
| `Autocomplete` | `CrvAutocomplete` |
| `Breadcrumbs` | `CrvBreadcrumb` |
| `Card` | `CrvCard` |
| `Tooltip` | `CrvTooltip` |
| `Toast` / `Snackbar` | `CrvToast` |

รายการ `Crv*` ทั้งหมดอยู่ใน `code/components/*/index.ts`

---

## รูปแบบรายงาน (สำคัญ — อ่านง่าย ไม่ใช้ศัพท์โค้ดเยอะ)

เขียนเป็นภาษาไทย แบ่งตาม **ส่วนบนหน้าจอ** ที่ user เห็นใน Storybook

### สรุปด้านบน (3 บรรทัด)

```text
ผลรวม: ผ่านบางส่วน / ต้องแก้ / ผ่าน
ใช้ DS จริง: X ส่วน | หน้าตาเหมือนแต่ไม่ใช่ DS: Y ส่วน | ยังไม่มี component ใน DS: Z ส่วน
ไฟล์ที่ตรวจ: ...
```

### ตารางรายส่วน

| ส่วนที่เห็นบนหน้า | สถานะ | ความหมายสำหรับคนที่ไม่อ่านโค้ด |
|------------------|--------|--------------------------------|
| แถบเมนูซ้าย | ✅ ใช้ของจริง | ดึง `CrvSidebar` จาก DS — แก้ที่ component กลางแล้วหน้านี้ตาม |
| ปุ่ม "Add" | ✅ ใช้ของจริง | `CrvButton` variant ถูกต้อง |
| การ์ดสถิติ 4 ใบ | ⚠️ วาดเอง | ใช้ `Box` หุ้มตัวเลข — ยังไม่มี `CrvStatCard` ใน DS |
| ตาราง | ❌ ไม่ใช่ DS | ใช้ MUI `Table` ตรงๆ แทน `CrvTable` |

**สถานะที่ใช้:**

- ✅ **ใช้ของจริง** — import และใช้ `Crv*` จาก design system
- ⚠️ **วาดเอง (ยอมรับได้)** — ไม่มี `Crv*` ใน DS หรือ pattern doc อนุญาต `Box` + tokens
- ⚠️ **หน้าตาเหมือน DS** — ดูเหมือน component DS แต่เป็น hardcode / MUI ตรงๆ
- ❌ **ไม่ใช่ DS** — ควรเปลี่ยนเป็น `Crv*` ชัดเจน

### รายละเอียดเฉพาะจุด (ถ้ามี ❌ หรือ ⚠️ หน้าตาเหมือน)

แต่ละจุดบอก:

1. **เห็นอะไรบนหน้า** (ภาษาคนทั่วไป)
2. **ในโค้ดเป็นอะไร** (หนึ่งบรรทัด ไม่ต้องยาว)
3. **ควรเป็นอะไร** (`Crv*` หรือ gap ของ DS)
4. **ผลถ้าไม่แก้** — เช่น แก้ปุ่ม DS แล้วหน้านี้ไม่ตาม, token ไม่ sync

### ท้ายรายงาน

- คำแนะนำสั้นๆ ว่า user ควรเชื่ออะไรตอนดู Storybook
- ถ้าต้องการเช็คซ้ำ: คำสั่ง `python3 skills/verify-ds-usage/scripts/scan-ds-usage.py ...`

---

## Rules

- **อย่าแก้โค้ด** จนกว่า user จะขอให้แก้ — สกิลนี้รายงานอย่างเดียว
- อย่าใช้คำว่า "ผ่าน pixel-perfect" — สกิลนี้เช็คแค่ DS usage
- ถ้าสคริปต์กับการอ่านมือขัดกัน ให้เชื่อการอ่าง context ใน JSX มากกว่า regex
- ถ้าไม่แน่ใจ ใช้ ⚠️ และอธิบายว่าต้องดูอะไรเพิ่ม
- รายงานต้องเข้าใจได้โดยไม่ต้องเปิดไฟล์โค้ด
