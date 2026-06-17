# Date/Time Picker Components

> Date/Time picker components สำหรับให้ user เลือกวัน เวลา หรือ range ของวันที่ ประกอบด้วย 8 components

## Components ทั้งหมด

| Component | ใช้สำหรับ | Variant axes |
|---|---|---|
| `crv-native-date-time-picker` | Native OS picker (minimal, เร็ว) | `contentType=date\|dateTime\|time` |
| `crv-mobile-date-time-picker` | Full-screen mobile picker | `view=date\|time` |
| `crv-static-date-time-picker` | Inline picker ไม่มี popup | `view=date\|time`, `orientation=landscape\|portrait` |
| `crv-date-picker-panel` | Panel สำหรับเลือกวันที่ | `view=date\|dateDynamicData\|dateOutsideCurrent\|dateWeekNumber\|month\|year` |
| `crv-time-picker-panel` | Panel สำหรับเลือกเวลา | `breakpoint=desktop\|mobile` |
| `crv-date-time-picker-panel` | Panel สำหรับเลือกวัน + เวลา | `breakpoint=desktop\|mobile` |
| `crv-date-range-picker-panel` | Panel สำหรับเลือก date range | `breakpoint=desktop\|mobile` |
| `crv-date-day-cell` | Day cell ภายใน date picker | `state=disabled\|enabled\|hover\|pressed\|selected\|selectedDisabled\|today` |

---

## crv-native-date-time-picker

- **Variant:** `contentType=date|dateTime|time`
- **Size:** 240×300
- **Fill (card background):** `color/on-surface/default`
- **Radius:** `radius/4`
- **Effects:** `shadow/lg`
- **ใช้เมื่อ:** ต้องการ OS native picker ที่เบาและเร็ว โดยเฉพาะบน mobile

## crv-mobile-date-time-picker

- **Variant:** `view=date|time`
- **Size:** 393×852 (full-screen mobile)
- **Fill:** `color/on-surface/default`
- **ใช้เมื่อ:** ต้องการ full-screen picker บน mobile frame
- **Anatomy:** `Paper` (FRAME หลัก)

## crv-static-date-time-picker

- **Variant:** `view=date|time`, `orientation=landscape|portrait`
- **Size:** 480×451 (landscape date)
- **Fill:** transparent — ใช้ surface ของ container
- **ใช้เมื่อ:** ต้องการ picker แบบ inline ไม่มี popup เช่น embedded ในหน้า form

## crv-date-picker-panel

- **Variant:** `view=date|dateDynamicData|dateOutsideCurrent|dateWeekNumber|month|year`
- **Size:** 320×489 (view=date)
- **Fill (card background):** `color/on-surface/default`
- **Anatomy:** Header, Row ×n, Dates
- **ใช้เมื่อ:** ต้องการแสดง date panel เพียงอย่างเดียว

## crv-time-picker-panel

- **Variant:** `breakpoint=desktop|mobile`
- **Size:** 132×270 (desktop)
- **Fill:** transparent
- **Anatomy:** Clock, Actions
- **ใช้เมื่อ:** ต้องการแสดง time panel เพียงอย่างเดียว

## crv-date-time-picker-panel

- **Variant:** `breakpoint=desktop|mobile`
- **Size:** 452×403 (desktop)
- **Fill:** transparent
- **Anatomy:** Picker (รวม date + time), Footer
- **ใช้เมื่อ:** ต้องการให้ user เลือกทั้งวันและเวลาพร้อมกัน

## crv-date-range-picker-panel

- **Variant:** `breakpoint=desktop|mobile`
- **Size:** 320×489 (mobile)
- **Fill:** transparent
- **Anatomy:** Header, Row ×n, Dates
- **ใช้เมื่อ:** ต้องการให้ user เลือก date range (start–end)

## crv-date-day-cell

- **Variant:** `state=disabled|enabled|hover|pressed|selected|selectedDisabled|today`
- **Size:** 36×36 (per cell)
- **Radius:** `radius/4`
- **หมายเหตุ:** เป็น internal component ของ date picker panel — ไม่ใช้โดดๆ

---

## Do / Don't

### Do

- ใช้ `crv-native-date-time-picker` บน mobile เมื่อต้องการ UX ที่เร็วและ minimal
- ใช้ `crv-date-range-picker-panel` เมื่อต้องการให้ user เลือก date range (start–end)
- ใช้ `crv-static-date-time-picker` เมื่อต้องการแสดง picker แบบ inline ไม่มี popup
- ใช้ `crv-mobile-date-time-picker` สำหรับ mobile date/time picker แบบ full-screen

### Don't

- อย่าใช้ `crv-date-picker-panel` และ `crv-date-range-picker-panel` พร้อมกันในหน้าเดียว
- อย่าใช้ `crv-mobile-date-time-picker` บน desktop — ใช้ panel variant แทน
- อย่าใช้ `crv-date-day-cell` โดดๆ นอก date picker panel

## Needs designer review

- `crv-native-date-time-picker` ใช้ effect style `shadow/lg`
- `crv-date-picker-panel` `view=dateDynamicData|dateOutsideCurrent|dateWeekNumber` — ควรมี doc อธิบาย use case แต่ละ view
