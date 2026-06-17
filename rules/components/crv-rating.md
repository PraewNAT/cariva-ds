# crv-rating

> Rating component แสดงคะแนนดาว 1–5 รองรับทั้ง interactive (ให้ผู้ใช้เลือก) และ read-only (แสดงผลอย่างเดียว)

## Figma structure

- Component type: Custom (wraps MUI Rating)
- Component set: `<Rating>` (node `4887:7022`)
- Page section: Rating (`4887:4952`)
- Sub-component: `Star` (`4887:6941`) — internal only
- Code component: `CrvRating`
- Naming pattern: `Size=Small|Medium*|Large`, `Disabled=False|True`

## Code mapping

- Use `CrvRating` for Figma `<Rating>`.
- `Size=Small` → `size="small"` (18px)
- `Size=Medium*` → `size="medium"` (24px)
- `Size=Large` → `size="large"` (30px)
- `Disabled=True` → `readOnly={true}` — all stars use `color/border/default` (same gray as inactive interactive stars)
- `Disabled=False` → interactive rating (`readOnly={false}`)
- Default showcase value in Figma: **2.5** stars (`precision={0.5}`)

---

## Variants

| Property | Values |
|---|---|
| Size | `Small`, `Medium*`, `Large` |
| Disabled | `False`, `True` |

### Star sub-component variants

| Property | Values |
|---|---|
| Size | `Small`, `Medium*`, `Large` |
| Active | `Full`, `Half`, `False` |
| Hovered | `false`, `true` |

> `Active=False, Hovered=true` ไม่มีใน Star — by design (เมื่อ hover ดาวจะแสดง active เสมอ)

---

## Sizes

| Size | Star size | Total width (5 stars) | Height |
|---|---|---|---|
| Small | 18×18px | 90px | 18px |
| Medium* | 24×24px | 120px | 24px |
| Large | 30×30px | 150px | 30px |

---

## States

- **Default (Disabled=False)**: ดาวสีอำพัน (`color/accent/amber/A03` / `#f59e0b`), inactive ดาวสี `color/border/default`
- **Hovered**: ดาวขยายความสว่าง — ใช้ `Hovered=true` ใน Star sub-component
- **Disabled (Disabled=True)**: ดาวทุกดวงใช้ `color/border/default` (`#cbd5e1`) — เทาเดียวกับดาว inactive ตอน interactive
- **Half**: แสดงครึ่งดาวด้วย mask สี `color/accent/amber/A03` ซีกซ้าย, `color/border/default` ซีกขวา

---

## Layout behavior

- Direction: Horizontal
- Gap: 0px (ดาวชิดกัน)
- Padding: 0px
- Sizing: hug content ทั้งสองแกน
- จำนวนดาว: 5 (fixed ใน component)

---

## Token usage

| Role | Token |
|---|---|
| Active star fill | `color/accent/amber/A03` (`#f59e0b`, VariableID `4016:80`) |
| Inactive star fill | `color/border/default` (`#cbd5e1`, VariableID `3714:47`) |
| Disabled star fill (ทั้ง active และ inactive) | `color/border/default` (`#cbd5e1`, VariableID `3714:47`) |

> ไม่ใช้ status token (`color/status/warning/*`) — amber ที่ใช้ใน Rating เป็น decorative ไม่ใช่ semantic warning

---

## Anatomy

- `Star #1`–`Star #5`: instance ของ `Star` sub-component แต่ละดวง
- `StarSharp`: icon ดาวเต็ม (Active=Full)
- `StarOutlineFilled`: icon ดาวเปล่า (Active=False)
- `Masked Star > Half Full`: rectangle สีอำพันซีกซ้าย (Active=Half)
- `Masked Star > Half Empty`: rectangle สี border ซีกขวา (Active=Half)

---

## Do / Don't

### Do

- ใช้กับการแสดงผลคะแนนความพึงพอใจ เช่น รีวิวแพทย์, ประเมินบริการ
- ใช้ `Disabled=True` เสมอเมื่อต้องการแสดงคะแนนแบบ read-only — ห้ามใช้ enabled สำหรับ display-only
- ใช้ `Size=Medium*` เป็น default ใน card และ list row ทั่วไป
- เพิ่ม label ข้อความเสริมข้างๆ เพื่อระบุความหมายของคะแนน (เช่น "4.5 / 5")

### Don't

- อย่าใช้ Rating เพื่อแสดงระดับความรุนแรงทางการแพทย์ (severity/priority) — ใช้ `crv-tag-status` แทน
- อย่าใช้ `Size=Large` ใน table row หรือ dense list — ใช้ `Small` หรือ `Medium*` แทน
- อย่าแสดง Rating แบบ enabled (Disabled=False) ในหน้าที่ผู้ใช้ไม่สามารถโต้ตอบได้ — จะสร้างความสับสน
- อย่าเปลี่ยนสีดาวเป็น token อื่นนอกจาก `color/accent/amber/A03` — amber เป็น universal convention ของ star rating

---

## Needs designer review

- ไม่มี variant สำหรับ precision นอกจาก Half — ถ้าต้องการ 0.1 increment ต้องประเมิน custom implementation
- ไม่มี `value` หรือ `onChange` prop document ใน Figma — ตรวจสอบกับ code contract
- จำนวนดาวยึดที่ 5 เสมอ — ถ้าต้องการจำนวนอื่น (เช่น 10) ต้องแจ้ง designer
