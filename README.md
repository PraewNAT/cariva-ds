# Agent Peer Bridge

Connect Cursor / Claude / Codex agents on two machines (LAN or Tailscale).

## เปิดใช้งานบนเครื่องใหม่ — วาง prompt นี้ให้ Claude Code / Cursor

คัดลอก prompt ด้านล่างไปวางใน Claude Code (หรือ AI agent อื่นที่รันคำสั่งได้) บนเครื่องใหม่ — ไม่ต้องมี git ติดตั้งไว้ก่อนก็ได้ agent จะติดตั้งให้เอง แล้วเปิดโฟลเดอร์พร้อมอ่าน `CLAUDE.md` และ skill ทั้งหมดให้พร้อมใช้งานทันที:

```
ช่วย clone repo นี้ให้ฉันที: https://github.com/PraewNAT/cariva-ds.git

1. เช็คก่อนว่าเครื่องนี้มี git ติดตั้งหรือยัง (`git --version`) ถ้ายังไม่มีให้ติดตั้งให้ก่อนตามระบบปฏิบัติการ (macOS: `brew install git`, Windows: `winget install --id Git.Git -e`, Linux: `sudo apt-get install -y git` หรือ package manager ที่เหมาะกับ distro)
2. clone repo ด้านบนลงในโฟลเดอร์ปัจจุบัน (ถ้ามีโฟลเดอร์ cariva-ds อยู่แล้วและเป็น git repo เดิม ให้ `git pull` แทนการ clone ใหม่)
3. เปิด/cd เข้าไปในโฟลเดอร์ที่ clone มา ให้เป็น working directory หลักของ session นี้
4. อ่านไฟล์ `CLAUDE.md` ในโฟลเดอร์นั้นทั้งหมด แล้วทำตามขั้นตอนที่ระบุไว้ (เช่นถามว่าเป็น Core DS owner หรือ Product Designer)
5. อ่าน `skills/*/SKILL.md` ทุกตัวที่มีในโฟลเดอร์ `skills/` เพื่อให้รู้จัก skill ที่ใช้ได้ทั้งหมดก่อนเริ่มงาน
6. สรุปให้ฉันว่า clone สำเร็จไหม อยู่ที่ path ไหน และมี skill อะไรให้ใช้บ้าง
```

## แพ็กเล็ก — ส่งให้เครื่องอื่น (ไม่ต้องทั้ง Agent)

**วิธี A — curl จาก Host (แนะนำ)**

Host รัน `make start` แล้วสร้าง URL ให้ Guest:

```bash
make guest-url   # หรือจาก hub: make peer-url
```

Guest รัน curl ที่ได้ เช่น:

```bash
curl -fsSL http://100.x.x.x:3848/install.sh | bash
# ติดตั้งในโฟลเดอร์ปัจจุบัน · PEER_INSTALL_DIR=… กำหนด path เองได้
```

**วิธี B — ส่ง zip**

```bash
make peer-pack   # ได้ dist/agent-peer-bridge.zip
```

Guest: `make install` แล้วเลือก **`make setup-ui`** (web) หรือ **`make wizard`** (CLI)

อ่านเต็ม: [SETUP-TH.md](SETUP-TH.md)

## จาก Agent hub (เครื่องที่มี repo อยู่แล้ว)

```bash
make -C ../.. peer-install
# วิธี A — web setup
make -C ../.. peer-setup-ui
# วิธี B — CLI wizard
make -C ../.. peer-wizard
make -C ../.. peer-start
make -C ../.. peer-url    # curl URL ให้ Guest
```

**Docs:** [docs/agent-peer-bridge.html](../../docs/agent-peer-bridge.html)

| Port | Purpose |
|------|---------|
| 3847 | Peer HTTP API |
| 3848 | Web setup UI (`/setup`) |

Shortcuts: `peer` · `peer-cowork "<goal>"` · `make peer-readiness`
