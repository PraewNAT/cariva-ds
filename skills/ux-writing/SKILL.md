---
name: ux-writing
description: เช็ค grammar/copy ใน Figma หรือ text ที่ paste มา และแนะนำ tone การเขียนหลายแนวทาง ใช้เมื่อพูดว่า เช็ค copy, แนะนำ tone, rewrite copy, ช่วยเขียน error message
---

# UX Writing

ใช้เมื่อ user พูดว่า:

```
เช็ค copy นี้
แนะนำ tone ให้หน่อย
rewrite copy
ช่วยเขียน error message
เช็ค grammar
```

---

## Mode

### Mode 1 — Grammar & Copy Check
ใช้เมื่อ user ส่ง Figma link หรือ paste text มา

ตรวจ:
- Typo และ grammar
- Copy ที่ไม่ชัดเจนหรือ vague
- Placeholder ที่ใช้แทน label
- Error message ที่ไม่บอก action
- Filler words ที่ตัดออกได้

Report format:
```
🔴 [ข้อความเดิม] → [ข้อความที่ควรเป็น] — เหตุผล
🟡 [ข้อความเดิม] → [ข้อความที่แนะนำ] — เหตุผล
🟢 [ข้อสังเกต]
```

### Mode 2 — Tone Recommendation
ใช้เมื่อ user อยากรู้ว่า product ควรเขียน tone แบบไหน

ถามก่อนว่า:
1. product นี้คือ B2B หรือ B2C?
2. user หลักคือใคร? เช่น แพทย์, ผู้ป่วย, admin, general user
3. อยากได้ภาษาไทย อังกฤษ หรือสลับกัน?

แล้วเสนอ 3 แนวทาง พร้อมตัวอย่าง 3 ประโยคต่อ tone:

| Tone | ลักษณะ | เหมาะกับ |
|---|---|---|
| **Professional** | formal, ตรงไปตรงมา, ไม่มี personality | Healthcare, Finance, B2B admin |
| **Friendly** | อบอุ่น, conversational, มี empathy | Consumer app, HR tool |
| **Concise** | สั้น, direct, ไม่มี filler | Dashboard, Admin tool, Power user |

### Mode 3 — Rewrite
ใช้เมื่อ user ให้ copy เดิม + บอก tone ที่ต้องการ

- Rewrite ตาม tone ที่เลือก
- ถ้าเป็นภาษาอังกฤษ ให้แปลภาษาไทยกำกับด้วย
- ถ้าเป็นภาษาไทย ตอบแค่ภาษาไทย

---

## ตัวอย่าง copy แต่ละ tone

**Professional**
1. "Invalid username or password. Please try again." — ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่
2. "Your session has expired. Please log in to continue." — เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง
3. "Access denied. Contact your administrator for assistance." — ไม่มีสิทธิ์เข้าถึง กรุณาติดต่อผู้ดูแลระบบ
4. "Changes saved successfully." — บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว
5. "This field is required." — กรุณากรอกข้อมูลในช่องนี้

**Friendly**
1. "Oops! That password doesn't match. Want to try again?" — อุ๊ปส์! รหัสผ่านไม่ตรง ลองใหม่อีกครั้งได้เลย
2. "You've been away for a while — please log back in." — คุณไม่ได้ใช้งานสักพักแล้ว กรุณาเข้าสู่ระบบอีกครั้งนะ
3. "Looks like you don't have access to this. Reach out to your admin!" — ดูเหมือนคุณยังไม่มีสิทธิ์ตรงนี้ ลองติดต่อ admin ดูนะ
4. "All saved! You're good to go." — บันทึกแล้ว เรียบร้อยเลย
5. "Don't forget to fill this in!" — อย่าลืมกรอกช่องนี้ด้วยนะ

**Concise**
1. "Wrong credentials. Try again." — ข้อมูลไม่ถูกต้อง ลองใหม่
2. "Session expired. Log in." — เซสชันหมดอายุ เข้าสู่ระบบ
3. "No access. Contact admin." — ไม่มีสิทธิ์ ติดต่อ admin
4. "Saved." — บันทึกแล้ว
5. "Required." — จำเป็น

**ภาษาไทย — Friendly**
1. "รหัสผ่านไม่ตรงนะ ลองเช็คดูอีกทีได้เลย"
2. "ดูเหมือนคุณไม่ได้ใช้งานสักพัก กรุณาเข้าสู่ระบบอีกครั้งนะคะ"
3. "ยังไม่มีสิทธิ์เข้าถึงส่วนนี้ ติดต่อ admin ได้เลยนะ"
4. "บันทึกเรียบร้อยแล้ว ไปต่อได้เลย"
5. "อย่าลืมกรอกช่องนี้ด้วยนะ"

---

## Rules

- ไม่แก้ไข Figma ระหว่างเช็ค — report เท่านั้น
- ถ้าไม่รู้ context ของ product ให้ถามก่อน อย่าเดา tone เอง
- Copy ภาษาไทยต้องไม่ formal จนเกินไปหรือ informal จนดูไม่น่าเชื่อถือ
- Error message ต้องบอกเสมอว่า เกิดอะไรขึ้น + ทำอะไรได้ต่อ
