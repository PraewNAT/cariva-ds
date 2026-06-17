# crv-bottom-sheet

> Bottom sheet — drawer ที่เลื่อนขึ้นจากด้านล่างของจอ (mobile-first) มี header (title + actions), search field, content slot และปุ่ม action ด้านล่าง

## Figma structure

- Component type: Custom (wraps MUI Drawer `anchor="bottom"`)
- Section: Bottom Sheet (`4497:57350`)
- Header component set: `crv-bottom-sheet-header` (`4485:31705`) — `type=Default|Search`
- Content component set: `crv-bottom-sheet-content` (`4485:31742`) — `type=single choice`, `state=default|selected`
- Code component: `CrvBottomSheet`

## Code mapping

- `crv-bottom-sheet-header type=Default` → `variant="default"` (มีแค่แถว title)
- `crv-bottom-sheet-header type=Search` → `variant="search"` (title + ช่อง search ด้านล่าง)
- `showTopColor=true|false` → `showHeaderGradient` (แสง gradient cyan/teal ตกแต่งด้านบน)
- icon button มุมขวาของ header → `headerActions` (ใช้ `CrvButtonIcon`)
- `contentSlot` → `children` (ส่วน scroll ได้)
- ปุ่มล่างใน `state=selected` → `actions` (ใช้ `CrvButton size="large"` full width)
- `showKeyboard` (G-Board) → **ไม่ implement** — keyboard เป็น native OS UI
- `showScrollBar` → ใช้ native browser scroll บน content slot

---

## Anatomy

3 ส่วนเป็น sibling (ไม่ซ้อนกัน):

1. **Header** — surface ขาว, padding `[24,24,16,24]`, gap 12, มุมบนโค้ง 24px
   - decorative gradient (left = cyan, right = teal) เมื่อ `showHeaderGradient`
   - แถว title (ซ้าย) + `headerActions` (ขวา) แบบ space-between
   - ช่อง search (เฉพาะ `variant="search"`)
2. **Content slot** — padding 24, gap 16, scroll แนวตั้ง
3. **Footer (actions)** — surface ขาว, มี border-top บางสี `color/border/default`, padding `[8,16,16,16]`

---

## Variants

| Property | Values |
|---|---|
| variant (header type) | `default`, `search` |
| showHeaderGradient | `true*`, `false` |

---

## Layout behavior

- Anchor: bottom เสมอ (drawer เลื่อนขึ้น)
- มุมบนโค้ง 24px, มุมล่างตรง
- `maxHeight: 90vh` — เกินกว่านั้น content slot scroll
- Backdrop: `color/overlay/backdrop` (`#00000066`) via `getOverlayBackdropSx()` — Figma `crv-overlay` (4722:90374)

---

## Token usage

| Role | Token |
|---|---|
| Sheet surface | `color/on-surface/default` (`#ffffff`) |
| Top corner radius | `radius/24` (24px) |
| Header / content padding | `spacing/xl` (24px); header bottom `spacing/lg` (16px) |
| Header gap | `spacing/md` (12px) |
| Content gap | `spacing/lg` (16px) |
| Title | heading/small, `color/content/primary`, semibold |
| Footer divider | `color/border/default` |
| Header glow ซ้าย / ขวา | `color/accent/cyan/A02` (`#67e8f9`) / `color/accent/teal/A02` (`#5eead4`) |
| Backdrop | `color/overlay/backdrop` via `getOverlayBackdropSx()` — see `crv-overlay` (4722:90374) |

> Header glow เป็น decorative — ใช้ accent token ได้ (ไม่ใช่ semantic)

---

## Do / Don't

### Do

- ใช้บน mobile สำหรับเลือกตัวเลือกจาก list, filter, หรือ action sheet
- ใส่ primary action ใน `actions` แบบ full-width
- ใช้ `variant="search"` เมื่อ content เป็น list ที่ค้นหาได้

### Don't

- อย่าใช้แทน dialog กลางจอบน desktop — ใช้ `CrvModal`
- อย่าซ้อน footer ไว้ใน content slot — ต้องเป็น sibling
- อย่า implement keyboard บนจอ — เป็น native OS UI (`showKeyboard`)

---

## Needs designer review

- ไม่มี drag handle/grabber bar ใน Figma — ถ้าต้องการเพิ่มเพื่อ swipe-to-dismiss ต้องแจ้ง designer
- `state=selected` ใน Figma คือตอนมีปุ่ม action ล่าง — code map เป็นการมี/ไม่มี `actions` prop
