# crv-button-standard

> ปุ่มหลักสำหรับ action ที่ผู้ใช้กดเพื่อสั่งงาน — มีทั้ง contained, outlined, และ text variant พร้อม loading state แยกต่างหาก

## โครงสร้าง Figma

- Component type: Button
- Component set: `crv-button-standard`
- Loading state: `crv-button-loading` (แยก component set)
- Naming pattern: `variant={contained|outlined|text}, color={primary|error}, state={default|hover|pressed|disabled}, size={small|medium|large}`

## Variants

| Property | Values |
|---|---|
| `variant` | `contained`, `outlined`, `text` |
| `color` | `primary`, `error` |
| `state` | `default`, `hover`, `pressed`, `disabled` |
| `size` | `small`, `medium`, `large` |

**crv-button-loading** (loading state):

| Property | Values |
|---|---|
| `variant` | `contained`, `outlined`, `text` |
| `size` | `small`, `medium`, `large` |

## Sizes

| Size | Height | Padding (H) | Padding (V) | Icon size |
|---|---|---|---|---|
| `small` | 32px | `spacing/lg` (16px) | `spacing/xs` (4px) | 16px |
| `medium` | 40px | `spacing/lg` (16px) | `spacing/sm` (8px) | 24px |
| `large` | 48px | `spacing/xl` (24px) | `spacing/sm` (8px) | 24px |

## States

- `default` — สถานะปกติ
- `hover` — เมื่อ cursor อยู่บนปุ่ม
- `pressed` — ขณะกด
- `disabled` — ปุ่มไม่สามารถกดได้ ใช้ token disabled
- `loading` — ระหว่างรอผลลัพธ์จาก action (ผ่าน `crv-button-loading`)

## Properties

| Property | Type | Default | Notes |
|---|---|---|---|
| `variant` | variant | `contained` | contained / outlined / text |
| `color` | variant | `primary` | primary / error |
| `state` | variant | `default` | default / hover / pressed / disabled |
| `size` | variant | `medium` | small / medium / large |
| `startIconVisible` | boolean | **`true`** | แสดง/ซ่อน leading icon — ค่า default คือ true |
| `endIconVisible` | boolean | **`true`** | แสดง/ซ่อน trailing icon — ค่า default คือ true |
| `startIcon` | instance swap | `3646:19818` | icon ซ้าย — swap ด้วย node ID ของ icon ที่ต้องการ |
| `endIcon` | instance swap | `3646:19916` | icon ขวา — swap ด้วย node ID ของ icon ที่ต้องการ |
| `children` (label) | text | `"Label"` | ข้อความบนปุ่ม |

> ⚠️ **สำคัญ — Plugin API**: `startIconVisible` และ `endIconVisible` มี default เป็น `true` เสมอ ถ้าต้องการปุ่ม text-only ต้องตั้งทั้งคู่เป็น `false` อย่างชัดเจน ไม่เช่นนั้นจะมี icon โชว์ทั้งสองข้างโดยอัตโนมัติ

### เมื่อไหร่ควรใช้ icon

| Pattern | startIcon | endIcon | ตัวอย่าง |
|---|---|---|---|
| Action ทั่วไป / CTA หลัก | ❌ | ❌ | Save, Confirm, Submit, Cancel, Delete |
| Navigation ไปข้างหน้า | ❌ | ✅ arrow-right | Next, Continue, Send OTP |
| Navigation ย้อนกลับ | ✅ arrow-left | ❌ | Back, Back to Login |
| Action ที่มี context ชัดเจน | ✅ icon ตาม action | ❌ | Upload (upload icon), Add (plus icon), Download |

> **กฎง่ายๆ**: ถ้าไม่แน่ใจ — ไม่ใส่ icon ดีกว่า icon ช่วยได้เมื่อ reinforce action ที่อาจเข้าใจผิดได้ หรือบอกทิศทางการ navigate

### Property key names (สำหรับ setProperties ผ่าน Plugin API)

⚠️ **สำคัญ**: Node IDs ต่อไปนี้คือตัวอย่าง — **ต้องหา node IDs ที่ถูกต้องของแต่ละ component instance** เนื่องจากแต่ละ instance อาจมี node IDs ต่างกัน

**วิธีหา property key names ที่ถูกต้อง:**
1. ใช้ `instance.id` เพื่อดู instance ID
2. ใช้ `instance.children.find(n => n.name === 'icon/leading')?.id` เพื่อหา icon node IDs
3. ใช้ `instance.children.find(n => n.name === 'label')?.id` เพื่อหา label node ID
4. Format property key: `'propertyName#nodeId'`

```js
// ปุ่มไม่มี icon (text only)
instance.setProperties({
  'startIconVisible#3646:0': false,
  'endIconVisible#3646:16': false,
  'children#3760:122': 'Save',
})

// ปุ่มมี icon ซ้ายอย่างเดียว
instance.setProperties({
  'startIconVisible#3646:0': true,
  'endIconVisible#3646:16': false,
  'children#3760:122': 'Upload',
})

// ปุ่มมี icon ขวาอย่างเดียว (forward navigation)
instance.setProperties({
  'startIconVisible#3646:0': false,
  'endIconVisible#3646:16': true,
  'children#3760:122': 'Next',
})
```

### ตัวอย่างจาก Forgot Password Flow

```js
// Screen 1: Send OTP — ไปข้างหน้า (มี right arrow)
const sendButton = buttonSet.defaultVariant.createInstance();
const buttonLabel = sendButton.children.find(n => n.name === 'label');
buttonLabel.characters = 'Send OTP';
// startIconVisible = false, endIconVisible = true (default หรือ set explicitly)

// Screen 3 & 4: Reset Password, Request New Link — general action (ไม่มี icon)
const resetButton = buttonSet.defaultVariant.createInstance();
const resetLabel = resetButton.children.find(n => n.name === 'label');
resetLabel.characters = 'Reset Password';
// ⚠️ ต้อง set startIconVisible = false, endIconVisible = false อย่างชัดเจน
// เพราะ default เป็น true ทั้งคู่
```

## Anatomy

- **container** — frame หลัก auto-layout horizontal, มี border radius `Product Style / radius/interactive`
- **icon/leading** — icon ด้านซ้าย (optional, ควบคุมด้วย `startIconVisible`)
- **label** — ข้อความ button, ใช้ text style `typography/label/large` (16/24) ทุกขนาด
- **icon/trailing** — icon ด้านขวา (optional, ควบคุมด้วย `endIconVisible`)
- **spinner** — แทน icon ใน loading state (มีเฉพาะใน `crv-button-loading`)

## Layout behavior

- Direction: horizontal
- Alignment: center / center
- Gap: `spacing/sm` (8px)
- Padding: ดูตาราง Sizes ด้านบน
- Sizing: hug ทั้ง 2 แกน (width hug content, height fixed ตาม size)
- Border radius: `Product Style / radius/interactive` → rounded mode = `radius/full` (pill shape), sharp mode = `radius/12`

## Token usage

### Color — `contained/primary`
| Element | Token |
|---|---|
| Background default | `color/brand/primary/on-surface/default` |
| Background hover | `color/brand/primary/on-surface/hover` |
| Background pressed | `color/brand/primary/on-surface/pressed` |
| Background disabled | `color/on-surface/action/disabled` |
| Label + Icon | `color/content/on-brand` |
| Label + Icon disabled | `color/content/disabled` |


### Color — `contained/error`
| Element | Token |
|---|---|
| Background default | `color/status/error/on-surface/default` |
| Background hover | `color/status/error/on-surface/hover` |
| Background pressed | `color/status/error/on-surface/pressed` |
| Background disabled | `color/on-surface/action/disabled` |
| Label + Icon | `color/content/on-brand` |
| Label + Icon disabled | `color/content/disabled` |

### Color — `outlined/primary`
| Element | Token |
|---|---|
| Background | `color/on-surface/default` |
| Border default | `color/border/default` |
| Border hover | `color/border/strong` |
| Border focused/pressed | `color/border/system` |
| Border disabled | `color/border/disabled` |
| Label + Icon | `color/brand/primary/content/default` |
| Label + Icon disabled | `color/content/disabled` |

### Color — `outlined/error`
| Element | Token |
|---|---|
| Background default | transparent |
| Background hover | `color/status/error/on-surface/subtle` (red/50) |
| Background pressed | `color/status/error/on-surface/muted` (red/100) |
| Background disabled | `color/on-surface/action/disabled` (slate/100) |
| Border default | `color/border/error` (red/600) |
| Border hover | none (ลบออกเมื่อ hover) |
| Border pressed | none |
| Border disabled | none |
| Label + Icon default | `color/status/error/content/default` (red/600) |
| Label + Icon hover | `color/status/error/content/default` (red/600) |
| Label + Icon pressed | `color/status/error/content/strong` (red/700) |
| Label + Icon disabled | `color/content/disabled` |

### Color — `text/primary`
| Element | Token |
|---|---|
| Background default | transparent |
| Background hover | `color/on-surface/action/hover` |
| Background pressed | `color/on-surface/action/pressed` |
| Background disabled | transparent |
| Label + Icon | `color/brand/primary/content/default` |
| Label + Icon disabled | `color/content/disabled` |

### Color — `text/error`
| Element | Token |
|---|---|
| Background default | transparent |
| Background hover | `color/status/error/on-surface/subtle` (red/50) |
| Background pressed | `color/status/error/on-surface/muted` (red/100) |
| Background disabled | transparent |
| Label + Icon default | `color/status/error/content/default` (red/600) |
| Label + Icon hover | `color/status/error/content/default` (red/600) |
| Label + Icon pressed | `color/status/error/content/strong` (red/700) |
| Label + Icon disabled | `color/content/disabled` |

### Typography
- `typography/label/large` (16px / 24px line-height) — ทุก size (small / medium / large)

### Spacing
- Padding H: `spacing/lg` (small/medium), `spacing/xl` (large)
- Padding V: `spacing/xs` (small), `spacing/sm` (medium/large)
- Gap: `spacing/sm`

### Radius
- `Product Style / radius/interactive` — ทุก variant → rounded = `radius/full`, sharp = `radius/12`

### Border
- `border-width/1` — variant outlined เท่านั้น

## ตัวอย่างที่มีในไฟล์

- แสดงทุก combination ของ variant × color × state × size บน canvas
- มี `crv-button-loading` แสดง loading state แยก section

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ Button สำหรับ action ที่ผู้ใช้ต้องกดเพื่อสั่งงาน เช่น บันทึก ยืนยัน ส่งข้อมูล ยกเลิก หรือเปลี่ยนแปลงข้อมูล
- ใช้ข้อความบนปุ่มที่ชัดเจนและบอกผลลัพธ์ของ action เช่น "บันทึกการเปลี่ยนแปลง", "เพิ่มผู้ใช้", "ปิดใช้งานบัญชี"
- ใช้ `variant=contained, color=primary` สำหรับ action หลักของหน้า section form หรือ modal
- ใช้ `variant=outlined` หรือ `variant=text` สำหรับ action ทางเลือก หรือ action ที่สำคัญรองลงมา
- ใช้ `color=error` เฉพาะ action ที่เกี่ยวกับการลบ นำออก ปิดใช้งาน ระงับ ยกเลิก หรือ action ที่ย้อนกลับได้ยาก
- ใช้ `crv-button-loading` หลังจากผู้ใช้กดปุ่มแล้วระบบกำลังประมวลผล
- ใช้ `state=disabled` เมื่อ action ยังไม่พร้อมใช้งาน
- เขียนข้อความบนปุ่มให้สั้น ชัด และเฉพาะเจาะจง
- วางตำแหน่งปุ่มให้สอดคล้องกันใน flow หรือ product เดียวกัน

### ไม่ควรทำ

- ไม่ควรใช้ `variant=contained, color=primary` มากกว่า 1 ปุ่มใน action group เดียวกัน
- ไม่ควรใช้ Button สำหรับการนำทางอย่างเดียว — ควรใช้ `crv-link` แทน
- ไม่ควรใช้ข้อความกำกวม เช่น "OK", "Yes" หรือ "Click here"
- ไม่ควรใช้ `color=error` กับ action ที่ไม่ใช่ action อันตรายหรือย้อนกลับยาก
- ไม่ควรทำให้ `state=disabled` กดได้
- ไม่ควรใช้ `crv-button-loading` โดยที่ยังสามารถกดซ้ำได้
- ไม่ควรสร้างสี ขนาด style หรือ state ใหม่เองนอกเหนือจาก Design System
- ไม่ควรใช้ข้อความบนปุ่มยาวจนขึ้นหลายบรรทัด

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
