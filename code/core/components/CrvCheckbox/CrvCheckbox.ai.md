> Source of truth: ../../../rules/components/crv-checkbox-standard.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-checkbox-standard.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `color` | `primary`, `error` | `primary` |
| `labelPlacement` | `end`, `start` | `end` |
| `label` | `string` | Accept terms and conditions |
| `labelVisible` | `boolean` | `true` |
| `description` | `string` | Terms + Privacy copy |
| `descriptionVisible` | `boolean` | `true` |
| `checked` | `boolean` | `false` |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Layout (Figma 3815:5291)

| Part | Spec |
|---|---|
| Checkbox → content gap | spacing/md (12px) |
| Label → description gap | spacing/sm (8px) |
| Checkbox line box | 20px (label/medium line-height) — จัด control ตรงบรรทัดแรกของ label |
| Align | `flex-start` ทุก variant |

## Notes

- เลือกใช้ตัวไหน: standard = คำถามเดียวตอบใช่/ไม่ใช่ · group = 2–6 ตัวเลือกจากคำถามเดียวกัน · card = ตัวเลือกที่ต้องอ่านก่อนเลือก (แถวใน group ไม่มี description)

- `color=error` styles the label **and** the checkbox box (base `color=error`).
- `disabled` overrides `color` — Figma has no disabled + error variant.
- No `type` prop: a compact row is `descriptionVisible={false}`.
- Base control spec: `rules/components/crv-checkbox-base.md`.
