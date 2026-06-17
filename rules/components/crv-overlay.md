# crv-overlay

> Semi-transparent backdrop สำหรับ block interaction ด้านล่าง — ใช้คู่กับ Modal, Drawer, Bottom Sheet รองรับ 2 breakpoint

## Figma structure

- Component type: Overlay
- Section: `Overlay` (`4722:90374`)
- Components: `crv-overlay/sm` (`4722:90600`), `crv-overlay/md+` (`4722:90601`)
- Token: `color/overlay/backdrop` (VariableID `3714:93`) — black @ 40% opacity
- Naming pattern: `breakpoint=sm|md+` (frame size only — same fill on both)

## Variants

| Property | Values |
|---|---|
| `breakpoint` | `sm`, `md+` |

## Sizes

| Breakpoint | ขนาด | ใช้กับ |
|---|---|---|
| `sm` | 390 × 844 px | Mobile frame |
| `md+` | 1440 × 900 px | Tablet / Desktop frame |

## Anatomy

- Component frame: full-screen rectangle — fill = `color/overlay/backdrop`

## Token usage

| Property | Token | Value (light) |
|---|---|---|
| Fill | `color/overlay/backdrop` | `#00000066` (black 40%) |

Code: `getOverlayBackdropSx()` in `code/crvOverlayStyles.ts` — used by theme `MuiBackdrop` and all overlay components (Modal, Drawer, Bottom Sheet).

## Do / Don't

### Do

- ใช้ `breakpoint=sm` เมื่อ design บน mobile frame (390px)
- ใช้ `breakpoint=md+` เมื่อ design บน tablet/desktop frame
- วาง overlay ไว้ layer ล่างสุดของ modal, drawer, bottom sheet เสมอ

### Don't

- อย่าปรับ opacity หรือสีเอง — ใช้ token `color/overlay/backdrop` เท่านั้น
- อย่าใช้ overlay กับ component ที่ไม่ block interaction เช่น tooltip หรือ popover

## Needs designer review

- ยังไม่มี `strong` variant (`color/overlay/backdrop/strong` = black 60%) — ควรพิจารณาเพิ่มสำหรับ stacked modal หรือ confirmation dialog
