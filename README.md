# Agent Peer Bridge

Connect Cursor / Claude / Codex agents on two machines (LAN or Tailscale).

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
