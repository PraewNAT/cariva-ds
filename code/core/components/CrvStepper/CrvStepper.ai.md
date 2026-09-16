> Source of truth: ../../../rules/components/crv-stepper.md
> Figma page: Stepper, node 4714:6228

# CrvStepper

Multi-step progress for wizard-like flows.

## Exports

- `CrvStepper`
- `CrvStep`
- `CrvStepperMarker`
- `CrvStepIcon`
- `CrvStepperCompact`

## Figma Mapping

- `crv-stepper-marker` → `CrvStepperMarker`
- `crv-stepper-base` → `CrvStep`
- `crv-stepper` → `CrvStepper`
- `crv-stepper-compact` → `CrvStepperCompact`

### CrvStepperMarker

ตรงกับแกนของ Figma 1:1 — `status` 7 ค่า × `content` 2 ค่า = 14 variants

| status | พื้น | content |
|---|---|---|
| `default` | `bg/solid` | `content/secondary` |
| `active` | `brand/primary/on-surface/muted` | `brand/primary/on-surface/default` |
| `done` | `brand/primary/on-surface/default` | `content/on-brand` |
| `error` / `warning` / `info` / `success` | `status/{severity}/on-surface/default` | `content/on-brand` |

ทุก status เป็นวงกลมทึบ 24px มี glyph 20px ข้างใน · `content='icon'` ต้องส่ง `icon` มาเอง
(`crv-stepper-base` เป็นตัว swap ไอคอนตาม state ให้ ไม่ใช่ marker) · prop `state` เดิม
(`'default' | 'done'`) ยังใช้ได้แต่ deprecated

## AI Implementation Rules

1. Use `CrvStepper` for desktop/tablet multi-step flows with 3–5 steps.
2. Use `CrvStepperCompact` where space is tight (small screens, dialogs, side panels) instead of horizontal `CrvStepper`.
3. Derive step states from `activeStep`; set explicit `state` only for semantic overrides.
4. Reuse `CrvButton` in the compact stepper — do not style raw MUI buttons.
5. Do not use steppers for 1–2 step flows.
