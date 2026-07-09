---
name: document
description: Generate full documentation for a Cariva Design System component. Creates a .md file under rules/components/ and a doc frame in Figma. Use when the user asks to document a component.
---

# Component Documentation

Use when the user says:

```text
สร้าง doc component [name]
document [component name]
เขียน doc ให้ [component name]
```

---

## Pre-flight Checklist (MANDATORY — do not skip, do not reorder)

Before writing any documentation, verify ALL of the following. If any item is missing, **stop and ask the user**. Do not proceed until everything is confirmed.

### 1. Component name
- Must be the exact Figma component set name (e.g. `crv-button`, `crv-input-horizontal`)
- If not provided: ask "กรุณาระบุชื่อ component ใน Figma ที่ต้องการ doc เช่น `crv-button`"

### 2. Do / Don't rules
- User must provide **at least one Do** and **one Don't**
- If not provided: ask the following and **stop**:
  ```
  กรุณาระบุ Do/Don't สำหรับ component นี้ก่อนครับ เช่น
  Do: ใช้สำหรับ primary action หลักของหน้า
  Don't: อย่าวาง primary button มากกว่า 1 ปุ่มในหน้าเดียวกัน
  ```
- Do not invent Do/Don't rules from general UI best practices. Use only what the user provides or what is explicitly visible in Figma notes/annotations.

---

## Steps

1. **Read Figma component**
   - Use `figma_get_component_for_development_deep` with the component node ID, or `figma_execute` to inspect via plugin
   - Extract: variant axes + values, component properties, layer structure, auto-layout settings, bound variables (color, spacing, radius, border), text styles
   - Take a screenshot with `figma_capture_screenshot` to visually confirm

2. **Generate documentation** following the Output Format below

3. **Save to file**
   - Path: `rules/components/{component-name}.md`
   - If the file already exists, **stop and switch to the `component-doc-update` skill** instead

4. **Create Figma doc frame โดยใช้ Documentation Card Template**

   **Page:** เพิ่มใน page ปัจจุบันของ component นั้น (เช่น page "Button ✅") ไม่ใช่ Style - MUI

   **Template Components** (ค้นหาด้วย `figma_search_components` ทุก session เพราะ node ID เปลี่ยนตาม session):
   - `Documentation Card` — container หลัก
   - `Blocks` component set — มี variant `Block Type` ให้เลือก:

   | Block Type | ใช้สำหรับ |
   |---|---|
   | `Header, Columns=1` | Title + Description บนสุด |
   | `Vertical Stack, Columns=1` | Component name + Availability + Notes + content area เต็มความกว้าง |
   | `Horizontal Stack, Columns=1` | Info ซ้าย + content area ขวา |
   | `Horizontal Stack, Columns=2` | 2 column แสดง variant คู่กัน |
   | `Guidance, Columns=2` | Do (เขียว) + Don't (แดง) คู่กัน |
   | `Guidance, Columns=1` | Do + Don't ซ้อนกัน (แนะนำถ้ามีข้อความยาว) |
   | `Callout, Columns=1` | หมายเหตุ / ข้อสังเกต |

   **วิธีสร้าง:**
   1. ใช้ `figma_search_components` หา "Documentation Card" และ "Blocks"
   2. Instantiate `Documentation Card` แล้ววางใน page
   3. Detach component หลัก แล้ว swap/add Blocks ตามเนื้อหา
   4. ลำดับ block ที่แนะนำ: Header → Vertical/Horizontal Stack (ต่อ variant/usage) → Token Usage → Guidance (Do/Don't) → Callout (ถ้ามีหมายเหตุ)

   **ข้อความ:**
   - **Language: ไทยปนอังกฤษ** — อธิบายเป็นไทย, ชื่อ token/property/variant/code เป็นอังกฤษ
   - **Style: ไม่ต้องใช้ DS token** — ใช้ Inter หรือ font default ของ Figma ได้เลย

   Take screenshot to verify หลังสร้างเสร็จ

5. **Update AGENTS.md source map** if this is a new component category not yet listed

---

## Output Format

```markdown
# [Component name]

> Brief one-line description (observable from Figma only — do not invent).

## Figma structure

- Component type: [Button / Input / Dropdown / Modal / etc. — write "Needs designer review" if unsure]
- Component set: [exact Figma component set name]
- Naming pattern: [e.g. size=sm|md|lg, state=default|hover|disabled]

## Variants

| Property | Values |
|---|---|
| [property name] | [value1, value2, ...] |

## Sizes

| Size | Description |
|---|---|
| [size name] | [observable difference — height, padding, font size] |

## States

- [state name]: [observable difference]

## Properties

| Property | Type | Values / Notes |
|---|---|---|
| [name] | boolean / variant / text / instance swap | [values or description] |

## Anatomy

- [layer name]: [role / observable description]

## Layout behavior

- Direction: [horizontal / vertical]
- Padding: [token or value]
- Gap: [token or value]
- Sizing: [hug / fill / fixed — for each axis]
- Alignment: [center / start / end]

## Token usage

- Color: [list exact token names]
- Typography: [list exact text style names]
- Spacing: [list exact spacing token names]
- Radius: [exact radius token]
- Border: [exact border token]
- Shadow / Effect: [exact effect style or token]

## Existing examples

- [Summarize any usage examples visible in the Figma file — do not turn into rules]

## Do / Don't

### Do

- [From user input or explicitly documented in Figma]

### Don't

- [From user input or explicitly documented in Figma]

## Needs designer review

- [List anything incomplete, unnamed, inconsistent, or unclear]
```

---

## Rules

- Do not invent variants, states, or properties not visible in Figma.
- Do not rename any Figma property or layer names.
- Do not write "when to use" or product logic unless it exists in the file or the user provides it.
- Do not assume visual style implies a rule.
- If anything is unclear, write "Needs designer review" — do not guess.
- Keep all token names exact — do not paraphrase or shorten.
- One file per component: `rules/components/{component-name}.md`

## Token ไม่มาจาก Figma

ถ้า section Token usage ว่างหรือได้ค่า hardcode ทั้งหมด ให้แจ้ง user ทันทีว่า:

> "ไม่พบ token binding จาก node นี้ — อาจเป็นเพราะ node เป็น section/page หรือ component ยังไม่ได้ bind token
> กรุณาส่ง node-id ของ component เดี่ยวๆ แทน เช่น node-id ของ component set โดยตรง"

- ไม่เดาค่า token จาก visual
- ไม่เขียน section Token usage ถ้าไม่มีข้อมูลจริง — ให้ข้ามและ flag ว่า "Needs designer review: token binding ไม่พบ"
