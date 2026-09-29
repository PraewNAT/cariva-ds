> Source of truth: ../../../rules/components/crv-checkbox-card.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-checkbox-card.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `color` | `primary`, `error` | `primary` |
| `label` | `string` | Accept terms and conditions |
| `labelVisible` | `boolean` | `true` |
| `description` | `string` | Terms + Privacy copy |
| `descriptionVisible` | `boolean` | `true` |
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Layout (Figma 6697:362)

| Part | Spec |
|---|---|
| Card padding | spacing/lg (16px) |
| Card radius | radius/16 |
| Checkbox → content gap | spacing/md (12px) |
| Label → description gap | spacing/sm (8px) |
| Checkbox line box | 20px (label/medium line-height) |
| Hover (unchecked) | `shadows.sm` |
| Hover (checked) | `glow(brand.primary.onSurface.default)` / `glow(status.error.onSurface.default)` |

## Notes

- เลือกใช้ตัวไหน: standard = คำถามเดียวตอบใช่/ไม่ใช่ · group = 2–6 ตัวเลือกจากคำถามเดียวกัน · card = ตัวเลือกที่ต้องอ่านก่อนเลือก (แถวใน group ไม่มี description)

- ทั้งการ์ดเป็น `<label>` — คลิกที่ไหนก็ toggle
- `color=error` เปลี่ยนทั้งพื้น ขอบ label และกล่อง checkbox
- `disabled` กลบ `color` — ไม่มี disabled + error ใน Figma
- `state=hover` เปลี่ยนที่เงาไม่ใช่สี — ยังไม่ติ๊ก `shadow/sm` · ติ๊กแล้ว `glow/primary` / `glow/error` (`0 0 4px` 36% สีของตัวเอง) · `disabled` ไม่มี hover
