# Cariva DS — Code Rules

This project uses the **Cariva Core Design System** built on MUI v9 + Next.js (App Router) + TypeScript.

Read this file before writing any UI code.

**Implementing from Figma?** Read `rules/figma-to-code-workflow.md` first — inspect the node, mirror structure, Storybook all variants, visual-verify, then sync rules. **Figma wins** when docs disagree.

---

## Stack

- **UI Library**: MUI v9
- **Theme**: `carivaTheme` from `@/theme` — always wrap app with `<ThemeProvider theme={carivaTheme}>`
- **Tokens**: `@/ds/tokens` — colors, spacing, radius, typography values
- **Component types**: `@/ds/types` — TypeScript interfaces for all DS components
- **Font**: IBM Plex Sans Thai — never use Inter or other fonts

---

## Import Rules

```ts
// ✅ correct
import type { CrvButtonProps } from '@/ds/types';
import { colors, spacing } from '@/ds/tokens';
import { carivaTheme } from '@/theme';

// ❌ wrong — never import from sub-files directly
import type { CrvButtonProps } from '@/ds/types/button';
```

---

## Token Rules

**Never hardcode color hex values or px numbers.** Always use tokens.

```ts
// ✅ correct
sx={{ backgroundColor: colors.onSurface.default, padding: spacing.lg }}

// ❌ wrong
sx={{ backgroundColor: '#ffffff', padding: 16 }}
```

Use **semantic tokens** only — never use `colors.accent.*` for status or `colors.brand.*` for decoration.

---

## Component Rules

### Button — `CrvButton`

```ts
import type { CrvButtonProps } from '@/ds/types';
```

- **1 contained primary button per action group** — never place 2 filled blue buttons side by side
- `variant="contained" color="primary"` = primary action (Save, Confirm, Submit)
- `variant="outlined"` or `variant="text"` = secondary action
- `color="error"` = destructive only (Delete, Disable, Remove) — not for warnings
- Button text must be specific: "บันทึกการเปลี่ยนแปลง" not "OK" or "Yes"
- Use `loading={true}` while waiting for async result — never keep button pressable during loading

```tsx
// ✅ primary action
<CrvButton variant="contained" color="primary">บันทึก</CrvButton>

// ✅ destructive
<CrvButton variant="outlined" color="error">ลบบัญชี</CrvButton>

// ❌ wrong — 2 primary buttons
<CrvButton variant="contained" color="primary">ยืนยัน</CrvButton>
<CrvButton variant="contained" color="primary">บันทึก</CrvButton>
```

### Icon Button — `CrvButtonIcon`

- Always provide `aria-label` — required, no exceptions
- `variant="ghost"` = transparent (not "text" — Figma uses ghost)
- Add tooltip when icon meaning is unclear

```tsx
// ✅ correct
<CrvButtonIcon variant="ghost" aria-label="ปิด"><CloseIcon /></CrvButtonIcon>

// ❌ missing aria-label
<CrvButtonIcon variant="ghost"><CloseIcon /></CrvButtonIcon>
```

### Link — `CrvLink`

- Use for navigation and low-emphasis actions only
- Never use as primary form action (submit, save) — use `CrvButton` instead
- Text must describe destination: "ดูรายละเอียด" not "คลิกที่นี่"
- No `color="error"` — use `CrvButton variant="text" color="error"` instead

---

### Form Components

**Critical rule: label ≠ placeholder**

| Prop | Purpose | Example |
|---|---|---|
| `label` | Field name — always visible | "ชื่อ-นามสกุล" |
| `placeholder` | Hint/example inside field | "กรอกชื่อ-นามสกุลตามบัตร" |
| `value` | Current entered value | "สมชาย ใจดี" |

```tsx
// ✅ correct
<CrvInput label="อีเมล" placeholder="name@example.com" />

// ❌ wrong — placeholder used as label
<CrvInput placeholder="อีเมล" />
```

**Always pair `error={true}` with `errorMessage`:**

```tsx
// ✅ correct
<CrvInput error={true} errorMessage="รูปแบบอีเมลไม่ถูกต้อง" />

// ❌ wrong — error with no message
<CrvInput error={true} />
```

**Choose input type by option count:**

| # Options | Component |
|---|---|
| 1–2 | `CrvSwitch` หรือ `CrvCheckbox` |
| 3–7 | `CrvDropdown` |
| 7+ | `CrvAutocomplete` |
| Open text | `CrvInput` หรือ `CrvTextArea` |

**Switch vs Checkbox:**
- `CrvSwitch` — action มีผลทันที ไม่ต้อง save (เช่น เปิด/ปิด notification)
- `CrvCheckbox` — ต้องกด save เพื่อยืนยัน

---

### Tag vs Badge

| Component | เมื่อไหร่ใช้ |
|---|---|
| `CrvTagStandard` | Standalone label แสดง status/category |
| `CrvTagColor` | Standalone label แบบ decorative grouping |
| `CrvBadge` | Overlay indicator บน icon หรือ avatar เท่านั้น |

```tsx
// ✅ status label — standalone
<CrvTagStandard color="success" label="อนุมัติแล้ว" />

// ✅ overlay on icon
<CrvBadge variant="standard" badgeContent={3}><NotificationsIcon /></CrvBadge>

// ❌ wrong — badge used standalone
<CrvBadge variant="standard" badgeContent={3} />
```

---

### Toast

- `severity` must match meaning — never use `error` for warning
- `variant="primary"` = filled, emphatic — use sparingly
- `variant="secondary"` = tinted, subtle — default choice

```tsx
// ✅ correct
<CrvToast severity="success" variant="secondary">
  บันทึกข้อมูลสำเร็จ
</CrvToast>

// ❌ wrong severity
<CrvToast severity="error">กรุณาตรวจสอบข้อมูล</CrvToast> // นี่คือ warning ไม่ใช่ error
```

---

### Progress

| Variant | เมื่อไหร่ใช้ |
|---|---|
| `determinate` | รู้ % ที่แน่นอน เช่น upload |
| `indeterminate` | ไม่รู้ระยะเวลา เช่น loading data |
| `buffer` | linear เท่านั้น เช่น video streaming |

- Never use `color="error"` แสดง progress ปกติ

---

### Modal

- `type="alignCenter"` เมื่อมี icon นำ (success/warning/error dialog)
- `type="default"` เมื่อ content เป็น form หรือข้อความยาว
- ใส่ action ใน `actions` prop เสมอ — ห้าม hardcode ปุ่มใน `children`
- ห้ามมี contained primary button มากกว่า 1 ใน modal
- Footer พื้นหลัง `colors.onSurface.subtle` — ไม่มี border-top; layout 3 ส่วนเป็น sibling (header / content / footer)
- `breakpoint="sm"`: CTA เรียงแนวตั้ง Confirm → Close; `md+`: แนวนอนชิดขวา Close → Confirm

---

### Tabs

| Component | เมื่อไหร่ใช้ |
|---|---|
| `CrvTabsStandard` | Tab หลักทั่วไป — underline style |
| `CrvTabsPills` | Tab แบบ pill/button |
| `CrvTabsFolder` | Tab ชั้นนอกสุดเมื่อมี tab ซ้อนกัน |

- `CrvTabsFolder` ต้องอยู่ชั้นนอกสุดเสมอ — ห้ามซ้อน 2 ชั้น
- ห้ามใช้ building blocks (`crv-tab-item-*`) โดยตรง

---

## Typography Rules

Use MUI typography variants that map to Cariva DS scale:

| MUI variant | Cariva style | ใช้สำหรับ |
|---|---|---|
| `h4` | heading/large | Section heading, modal title |
| `h5` | heading/medium | Card title, panel heading |
| `h6` | heading/small | Small section heading |
| `body1` | body/large | High-readability long text |
| `body2` | body/medium | Default UI text (forms, tables) |
| `button` | label/medium | Button text (auto-applied) |
| `caption` | caption | Timestamp, metadata |

```tsx
// ✅ correct
<Typography variant="h5">ข้อมูลผู้ป่วย</Typography>
<Typography variant="body2">กรุณากรอกข้อมูลให้ครบถ้วน</Typography>

// ❌ wrong — local font-size override
<Typography sx={{ fontSize: 20 }}>ข้อมูลผู้ป่วย</Typography>
```

---

## Copy & Tone Rules

Cariva is designed for healthcare professionals — write as a peer, not a beginner.

| ✅ Do | ❌ Don't |
|---|---|
| "บันทึกการเปลี่ยนแปลง" | "OK" / "Yes" |
| "พบ 3 รายการที่ต้องตรวจสอบ" | "บางรายการต้องการความสนใจ" |
| "ไม่สามารถบันทึกได้ ตรวจสอบการเชื่อมต่อแล้วลองใหม่" | "Oops! เกิดข้อผิดพลาด" |
| "ลบบัญชีผู้ใช้?" | "คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้อย่างถาวร?" |

- Error message ต้องบอก: เกิดอะไรขึ้น + ทำอะไรได้ต่อ
- ห้ามใช้ emoji ใน UI copy
- Placeholder เป็น hint เท่านั้น — ไม่ใช่แทน label

---

## Accessibility Rules

- Normal text: contrast ratio ≥ 4.5:1 (WCAG AA)
- Large text / icon: contrast ratio ≥ 3:1
- Touch target ≥ 44×44px บน mobile
- ห้ามใช้สีอย่างเดียวสื่อความหมาย — ต้องมี label หรือ icon ประกอบ
- Error state ต้องมี message เสมอ — ไม่ใช่แค่เปลี่ยนสี border

---

## What NOT to Do

- ❌ hardcode color hex หรือ px ใน sx หรือ style
- ❌ ใช้ `colors.accent.*` สำหรับ status
- ❌ ใช้ placeholder แทน label
- ❌ วาง primary button มากกว่า 1 ใน action group
- ❌ ใช้ `color="error"` กับ action ที่ไม่ใช่ destructive
- ❌ ใช้ `CrvBadge` เป็น standalone (ต้อง overlay เสมอ)
- ❌ ใช้ `CrvTagColor` แทน `CrvTagStandard` สำหรับ error/success/warning
- ❌ ใช้ font size ใน sx แทน MUI typography variant
- ❌ ใช้ font family อื่นนอกจาก IBM Plex Sans Thai
- ❌ ใช้ building blocks `crv-tab-item-*` โดยตรง
- เทส123
