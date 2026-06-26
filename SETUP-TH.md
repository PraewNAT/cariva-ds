# Agent Peer Bridge — ติดตั้งแบบแพ็กเล็ก (ไม่ต้องทั้ง Agent hub)

ส่งแค่โฟลเดอร์หรือ zip นี้ให้อีกเครื่อง — **ไม่ต้อง clone Agent ทั้งก้อน**

หรือ Guest ติดตั้งด้วย curl จาก Host:

```bash
# Host สร้าง URL + ข้อความ copy-paste
make guest-url          # หรือจาก hub: make peer-url

curl -fsSL http://<HOST_IP>:3848/install.sh | bash
# ติดตั้งในโฟลเดอร์ที่รัน curl (กำหนด path เอง: PEER_INSTALL_DIR=~/agent-peer-bridge curl … | bash)
# Guest จะเช็คเวอร์ชัน Host ก่อน start — ไม่ตรงจะดาวน์โหลด pack ใหม่อัตโนมัติ (ปิดได้: PEER_AUTO_UPDATE=0)
```

อัปเดตมือ (Guest รัน bridge อยู่แล้ว):

```bash
make sync-from-host HOST=<HOST_IP>
```

## สิ่งที่ต้องมีบนเครื่อง

- Node.js 20+
- [Tailscale](https://tailscale.com/download) (หรือ LAN เดียวกัน)
- Cursor / Claude / Codex (อย่างน้อย 1 แบบ)

## ติดตั้ง (ทั้ง 2 เครื่อง)

```bash
# แตก zip แล้วเข้าโฟลเดอร์นี้
cd agent-peer-bridge

make install

# วิธี A — web setup (browser)
make setup-ui        # start + เปิด http://127.0.0.1:3848/setup

# วิธี B — CLI wizard (terminal)
make wizard
make start
```

เปิด browser: **http://127.0.0.1:3848/setup** — ใช้วิธี A หรือ B ก็ได้

## Pair 2 เครื่อง

### ทาง A — Tailscale / LAN (เดิม)

**Host:** web setup ขั้น 3 → สร้างรหัส 6 หลัก · `make peer-url` ส่ง curl + IP ให้ Guest

**Guest:** `curl …/install.sh | bash` → ขั้น 3 ใส่ `100.x.x.x` (หรือ LAN IP) + รหัส

### ทาง B — Cloudflare Tunnel (Guest คนละ network)

#### B1 — Quick Tunnel (ไม่ต้อง login, URL สุ่ม)

```bash
make peer-start
make tunnel-quick          # hub: make peer-tunnel-quick
make peer-url              # ส่ง curl + peer URL ให้ Guest
# หยุด: make tunnel-quick-stop
```

ได้ URL แบบ `https://xxxx.trycloudflare.com` — **เปลี่ยนทุกครั้งที่รันใหม่** · ไม่มี Cloudflare Access

#### B2 — Named tunnel (login + โดเมนของคุณ)

```bash
# Host — ครั้งแรก
brew install cloudflared   # หรือดาวน์โหลดจาก Cloudflare
make tunnel-init           # แก้ hostnames ใน .cloudflared/config.yml
cloudflared tunnel create peer-bridge
cloudflared tunnel route dns peer-bridge peer-setup.YOUR_DOMAIN
cloudflared tunnel route dns peer-bridge peer-api.YOUR_DOMAIN
# ใส่ใน .env:
#   PEER_PUBLIC_SETUP_URL=https://peer-setup.YOUR_DOMAIN
#   PEER_PUBLIC_PEER_URL=https://peer-api.YOUR_DOMAIN

make peer-start
make tunnel-start          # หรือ make peer-tunnel-start จาก hub root

make peer-url              # curl เป็น https://peer-setup…/install.sh
```

Guest ขั้น 3 ใส่ **`https://peer-api.YOUR_DOMAIN`** + รหัส 6 หลัก (ไม่ใช่ IP)

แนะนำเปิด **Cloudflare Access** บนทั้งสอง hostname (เฉพาะ B2)

---
**เครื่อง A (Host):** ใน web setup ขั้น 3 → สร้างรหัส 6 หลัก → ส่งให้ B พร้อม IP

**เครื่อง B (Guest):** curl จาก Host แล้วใน web setup ขั้น 3 → ใส่ IP + รหัส

```bash
make readiness       # หรือกด "ตรวจความพร้อม" ใน browser
make pair-test       # ทดสอบเชื่อมต่อ
```

## คำสั่งหลัก

| คำสั่ง | ทำอะไร |
|--------|--------|
| `make help` | ดูทั้งหมด |
| `make setup-ui` | start + เปิด web setup |
| `make wizard` | CLI wizard (terminal) |
| `make readiness` | เช็คความพร้อม |
| `make start` | รัน bridge |
| `make status` | ดูสถานะ |

## ส่งข้ามเครื่อง

| ส่ง | ไม่ส่ง |
|-----|--------|
| ไฟล์ zip / โฟลเดอร์ `agent-peer-bridge` (ครั้งแรก) | ทั้งโฟลเดอร์ Agent |
| รหัส 6 หลัก + IP (ตอน pair) | `.env` / API key |

## มี Agent hub อยู่แล้ว?

ใช้จาก hub root: `make peer-install` · `make peer-setup-ui` หรือ `make peer-wizard` · `make peer-start`
