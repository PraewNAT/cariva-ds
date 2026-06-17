# Pattern: Stat Card (Filled)

> **Page-level pattern — ยังไม่ใช่ DS component**
> ใช้ใน: Back Office Room Overview page
> Candidate สำหรับ `crv-stat-card` ในอนาคต ถ้า use case ขยายออกไปหลาย screen

---

## Visual Recipe

| Property | Value | Token |
|---|---|---|
| Layout | HORIZONTAL (icon left) or VERTICAL (stacked) | — |
| Background | ดู Color Map ด้านล่าง | — |
| Text color | #ffffff (white) ทุก variant | `color/content/inverse` |
| Border radius | 12px | `radius/md` |
| Padding | 24px | `spacing/xl` |
| Gap (vertical) | 8px | `spacing/sm` |
| Min height | 120px | — |

### Typography

| Element | Style | Notes |
|---|---|---|
| Value (number) | `typography/display/small` (40px/700) | ตัวเลขใหญ่ |
| Label | `typography/label/large` (16px/500) | ชื่อสถานะ เช่น "ว่าง" |
| Description | `typography/body/small` (12px/400) | sub-label เช่น "Available · พร้อมรับผู้ป่วย" |

---

## Color Map

| context | bg hex | closest Tailwind | DS token reference | contrast (white) |
|---|---|---|---|---|
| total / neutral | `#0f172a` | slate/900 | `color/bg/inverse` | ~16:1 ✅ |
| available / success | `#047857` | emerald/700 | `color/status/success/on-surface/default` | ~5.0:1 ✅ |
| occupied / primary | `#2563eb` | blue/600 | `color/brand/primary/on-surface/default` | ~4.6:1 ✅ |
| cleaning / warning | `#c2410c` | orange/700 | *(no DS token — one-off)* | ~5.1:1 ✅ |

> **Accessibility note:** สี orange/700 (#c2410c) ถูกเลือกแทน amber/600 (#d97706) เพราะ amber ให้ contrast กับ white เพียง ~2.9:1 ไม่ผ่าน WCAG AA ทุก DS status card ในตารางนี้ผ่าน AA minimum 4.5:1

---

## AI Implementation Rules

1. **ห้ามใช้ DS card components** (`crv-card-*`) สำหรับ pattern นี้ — DS cards เป็น white surface สำหรับ content ไม่ใช่ filled hero stat
2. Build เป็น raw `FRAME` โดยตรง ไม่ต้องสร้าง component set (page-only pattern)
3. ผูก token ทุกจุดที่ทำได้ (`radius/md`, `spacing/xl`, text styles) — hardcode เฉพาะ bg hex ที่ยังไม่มี token
4. Text ทุกชิ้นใช้ `color/content/inverse` ไม่ hardcode #ffffff ตรง
5. ถ้า use case นี้เริ่มปรากฏใน screen อื่น → propose ให้ promote เป็น `crv-stat-card` component set

---

## Proposed Future Component (reference only)

ถ้า promote เป็น DS component:

```
crv-stat-card
  variant props:
    color = neutral | success | primary | warning
  other props:
    value: string        ← ตัวเลขหรือเปอร์เซ็นต์
    label: string        ← ชื่อสถานะ
    description: string  ← sub-label (optional)
    icon: instance_swap  ← icon ซ้ายหรือบน (optional)
```

สร้างจาก `color/status/*/on-surface/default` tokens + เพิ่ม `color/on-surface/warning` token ใหม่สำหรับ orange
