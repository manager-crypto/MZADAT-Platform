import { useState, useEffect, useRef, useCallback } from "react";

const SB = "#47ccd0";
const DB = "#050a0f";
const AR = "#e53e3e";

// ═══════════════════════════════════════════════════
// PARTICLE SYSTEM — 350 dense particles
// ═══════════════════════════════════════════════════
function ParticleCanvas({ mouseRef }) {
  const ref = useRef(null);
  const anim = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let w, h;
    const resize = () => { const d = devicePixelRatio || 1; w = innerWidth; h = innerHeight; c.width = w * d; c.height = h * d; c.style.width = w + "px"; c.style.height = h + "px"; ctx.setTransform(d, 0, 0, d, 0, 0); };
    resize(); addEventListener("resize", resize);
    const N = 350, ps = [];
    class P {
      constructor(s) { this.s = s; this.r(true); }
      r(init) {
        const bx = this.s === "u" ? w * 0.28 : w * 0.72;
        this.x = bx + (Math.random() - 0.5) * w * 0.5;
        this.y = init ? Math.random() * h : this.s === "u" ? h + Math.random() * 60 : -Math.random() * 60;
        this.bvy = this.s === "u" ? -(0.2 + Math.random() * 0.9) : (0.2 + Math.random() * 0.9);
        this.vy = this.bvy; this.vx = (Math.random() - 0.5) * 0.15;
        this.sz = 0.5 + Math.random() * 2.5; this.al = 0.1 + Math.random() * 0.55;
        this.ml = 200 + Math.random() * 500; this.age = init ? Math.random() * this.ml : 0; this.lf = 1;
        this.ad = Math.random() > 0.6; this.da = Math.random() > 0.5 ? Math.PI / 4 : -Math.PI / 4;
      }
      u(mx, my) {
        this.age++; const r = this.age / this.ml;
        this.lf = r < 0.08 ? r / 0.08 : r > 0.88 ? (1 - r) / 0.12 : 1;
        if (this.ad && this.age % 50 < 2) this.vx = Math.cos(this.da) * 0.7;
        if (mx !== null && my !== null) {
          const dx = this.x - mx, dy = this.y - my, dt = Math.sqrt(dx * dx + dy * dy);
          if (dt < 150) { const f = (150 - dt) / 150, a = Math.atan2(dy, dx), sn = Math.round(a / (Math.PI / 4)) * (Math.PI / 4); this.vx += Math.cos(sn) * f * 3.2; this.vy += Math.sin(sn) * f * 2.2; }
        }
        this.x += this.vx; this.y += this.vy; this.vx *= 0.95; this.vy += (this.bvy - this.vy) * 0.025;
        if ((this.s === "u" && this.y < -30) || (this.s !== "u" && this.y > h + 30) || this.age > this.ml) this.r(false);
      }
      d(ctx) {
        const a = this.al * this.lf; if (a < 0.01) return;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2); ctx.fillStyle = `rgba(71,204,208,${a})`; ctx.fill();
        if (this.sz > 1.4) { ctx.beginPath(); ctx.arc(this.x, this.y, this.sz * 3.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(71,204,208,${a * 0.055})`; ctx.fill(); }
      }
    }
    for (let i = 0; i < N; i++) ps.push(new P(i < N / 2 ? "u" : "d"));
    function frame() {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      ps.forEach(p => { p.u(mx, my); p.d(ctx); });
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, ds = dx * dx + dy * dy;
        if (ds < 6400) { const d = Math.sqrt(ds), a = (1 - d / 80) * 0.06 * ps[i].lf * ps[j].lf; ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.strokeStyle = `rgba(71,204,208,${a})`; ctx.lineWidth = 0.4; ctx.stroke(); }
      }
      anim.current = requestAnimationFrame(frame);
    }
    frame();
    return () => { removeEventListener("resize", resize); cancelAnimationFrame(anim.current); };
  }, [mouseRef]);
  return <canvas ref={ref} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}/>;
}

// ═══════════════════════════════════════════════════
// SPLASH DISSOLVE
// ═══════════════════════════════════════════════════
function SplashCanvas({ active, go }) {
  const ref = useRef(null), anim = useRef(null);
  useEffect(() => {
    if (!go) return;
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); c.width = innerWidth; c.height = innerHeight;
    const cx = c.width * 0.28, cy = c.height * 0.5, sp = [];
    for (let i = 0; i < 90; i++) { const a = Math.random() * Math.PI * 2, r = 60 + Math.random() * 250; sp.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, vx: Math.cos(a) * (1.5 + Math.random() * 3.5), vy: Math.sin(a) * (1.5 + Math.random() * 3.5), sz: 0.6 + Math.random() * 3.2, al: 0.45 + Math.random() * 0.55, lf: 1, dc: 0.007 + Math.random() * 0.016 }); }
    function frame() { ctx.clearRect(0, 0, c.width, c.height); let alive = false; sp.forEach(s => { s.x += s.vx; s.y += s.vy; s.vy += 0.015; s.lf -= s.dc; if (s.lf > 0) { alive = true; ctx.beginPath(); ctx.arc(s.x, s.y, s.sz * s.lf, 0, Math.PI * 2); ctx.fillStyle = `rgba(71,204,208,${s.al * s.lf})`; ctx.fill(); } }); if (alive) anim.current = requestAnimationFrame(frame); }
    frame();
    return () => { if (anim.current) cancelAnimationFrame(anim.current); };
  }, [go, active]);
  return <canvas ref={ref} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 4 }}/>;
}

// ═══════════════════════════════════════════════════
// ANIMATED CATEGORY VISUALS — Canvas-rendered
// ═══════════════════════════════════════════════════
function AnimatedCategoryCanvas({ category, isActive }) {
  const ref = useRef(null);
  const anim = useRef(null);
  const fc = useRef(0);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = 640, H = 420, dpr = 2;
    c.width = W * dpr; c.height = H * dpr;
    c.style.width = W + "px"; c.style.height = H + "px";
    ctx.scale(dpr, dpr);
    fc.current = 0;

    function drawCar(t) {
      ctx.clearRect(0, 0, W, H);
      const roadY = 310;
      ctx.fillStyle = "#0a1520";
      ctx.fillRect(0, roadY, W, H - roadY);
      ctx.strokeStyle = "rgba(71,204,208,0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([20, 15]);
      ctx.beginPath(); ctx.moveTo(0, roadY + 40); ctx.lineTo(W, roadY + 40); ctx.stroke();
      ctx.setLineDash([]);

      const glowPhase = Math.sin(t * 0.02) * 0.3 + 0.5;
      const buildings = [[40,140,50,roadY-140],[100,100,60,roadY-100],[170,80,45,roadY-80],[230,120,55,roadY-120],[300,60,50,roadY-60],[360,130,65,roadY-130],[440,90,48,roadY-90],[500,150,55,roadY-150],[565,110,50,roadY-110]];
      buildings.forEach(([x, y, w, h], i) => {
        ctx.fillStyle = "rgba(10,25,40,0.9)"; ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = `rgba(71,204,208,${0.08 + glowPhase * 0.06})`; ctx.lineWidth = 0.5; ctx.strokeRect(x, y, w, h);
        for (let wy = y + 10; wy < y + h - 10; wy += 18) for (let wx = x + 6; wx < x + w - 6; wx += 12) {
          ctx.fillStyle = Math.sin((wx + wy) * 0.1 + t * 0.03 + i) > 0 ? `rgba(71,204,208,${0.15 + glowPhase * 0.15})` : "rgba(20,40,60,0.5)";
          ctx.fillRect(wx, wy, 6, 8);
        }
      });

      const carX = 120 + Math.sin(t * 0.015) * 8;
      const carY = roadY - 62;
      const bounce = Math.sin(t * 0.08) * 0.8;
      ctx.save(); ctx.translate(carX, carY + bounce);

      ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.beginPath(); ctx.ellipse(200, 72, 180, 10, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(71,204,208,${0.06 + Math.sin(t * 0.04) * 0.03})`; ctx.beginPath(); ctx.ellipse(200, 68, 160, 15, 0, 0, Math.PI * 2); ctx.fill();

      ctx.beginPath(); ctx.moveTo(20, 50); ctx.lineTo(60, 50); ctx.quadraticCurveTo(80, 10, 140, 8); ctx.lineTo(260, 8); ctx.quadraticCurveTo(340, 10, 370, 30); ctx.lineTo(390, 50); ctx.lineTo(395, 55); ctx.lineTo(5, 55); ctx.lineTo(10, 50); ctx.closePath();
      ctx.fillStyle = "#0c1a2a"; ctx.fill(); ctx.strokeStyle = "rgba(71,204,208,0.35)"; ctx.lineWidth = 1.2; ctx.stroke();

      ctx.beginPath(); ctx.moveTo(110, 8); ctx.quadraticCurveTo(130, -22, 170, -25); ctx.lineTo(270, -25); ctx.quadraticCurveTo(310, -22, 330, 8);
      ctx.strokeStyle = "rgba(71,204,208,0.25)"; ctx.lineWidth = 0.8; ctx.stroke(); ctx.fillStyle = "rgba(5,15,25,0.9)"; ctx.fill();

      ctx.fillStyle = `rgba(71,204,208,${0.06 + glowPhase * 0.04})`;
      ctx.beginPath(); ctx.moveTo(135, 5); ctx.quadraticCurveTo(145, -16, 170, -19); ctx.lineTo(230, -19); ctx.lineTo(225, 5); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(71,204,208,0.2)"; ctx.lineWidth = 0.5; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(237, 5); ctx.lineTo(240, -19); ctx.lineTo(272, -19); ctx.quadraticCurveTo(295, -16, 310, 5); ctx.closePath(); ctx.fill(); ctx.stroke();

      const hlG = 0.5 + Math.sin(t * 0.06) * 0.3;
      ctx.fillStyle = `rgba(71,204,208,${hlG})`; ctx.beginPath(); ctx.ellipse(388, 42, 8, 5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(71,204,208,${hlG * 0.15})`; ctx.beginPath(); ctx.ellipse(420, 42, 35, 12, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(220,50,50,${0.6 + Math.sin(t * 0.05) * 0.2})`; ctx.beginPath(); ctx.ellipse(15, 48, 6, 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(220,50,50,0.1)"; ctx.beginPath(); ctx.ellipse(-10, 48, 25, 10, 0, 0, Math.PI * 2); ctx.fill();

      const ws = t * 0.12;
      [75, 320].forEach(wx => {
        ctx.fillStyle = "#080808"; ctx.beginPath(); ctx.arc(wx, 58, 18, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(71,204,208,0.3)"; ctx.lineWidth = 1.5; ctx.stroke();
        for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2 + ws; ctx.beginPath(); ctx.moveTo(wx, 58); ctx.lineTo(wx + Math.cos(a) * 12, 58 + Math.sin(a) * 12); ctx.strokeStyle = "rgba(71,204,208,0.2)"; ctx.lineWidth = 1; ctx.stroke(); }
        ctx.fillStyle = "#111"; ctx.beginPath(); ctx.arc(wx, 58, 5, 0, Math.PI * 2); ctx.fill();
      });
      ctx.beginPath(); ctx.moveTo(40, 35); ctx.lineTo(370, 35); ctx.strokeStyle = "rgba(71,204,208,0.1)"; ctx.lineWidth = 0.5; ctx.stroke();
      ctx.restore();

      for (let i = 0; i < 6; i++) { const ly = roadY - 30 + i * 12, lx = 30 + Math.random() * 60, ll = 20 + Math.random() * 40; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx - ll, ly); ctx.strokeStyle = `rgba(71,204,208,${0.04 + Math.random() * 0.06})`; ctx.lineWidth = 0.5; ctx.stroke(); }
    }

    function drawRealEstate(t) {
      ctx.clearRect(0, 0, W, H);
      const groundY = 320;
      const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY); skyGrad.addColorStop(0, "#030810"); skyGrad.addColorStop(1, "#081018"); ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, W, groundY);
      for (let i = 0; i < 30; i++) { const sx = (i * 97 + t * 0.1) % W, sy = (i * 43) % (groundY - 40) + 10, sa = 0.2 + Math.sin(t * 0.03 + i) * 0.15; ctx.fillStyle = `rgba(71,204,208,${sa})`; ctx.beginPath(); ctx.arc(sx, sy, 0.8, 0, Math.PI * 2); ctx.fill(); }
      const moonG = 0.15 + Math.sin(t * 0.015) * 0.05;
      ctx.fillStyle = `rgba(71,204,208,${moonG})`; ctx.beginPath(); ctx.arc(520, 60, 50, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(200,230,240,${moonG + 0.1})`; ctx.beginPath(); ctx.arc(520, 60, 22, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#060e16"; ctx.fillRect(0, groundY, W, H - groundY);

      const poolGrad = ctx.createLinearGradient(200, groundY + 20, 200, groundY + 50); poolGrad.addColorStop(0, `rgba(71,204,208,${0.12 + Math.sin(t * 0.03) * 0.05})`); poolGrad.addColorStop(1, "rgba(71,204,208,0.02)");
      ctx.fillStyle = poolGrad; ctx.beginPath(); ctx.roundRect(200, groundY + 20, 280, 30, 4); ctx.fill();
      for (let i = 0; i < 5; i++) { const rx = 230 + i * 50 + Math.sin(t * 0.04 + i) * 10; ctx.beginPath(); ctx.moveTo(rx, groundY + 30); ctx.lineTo(rx + 20, groundY + 30); ctx.strokeStyle = `rgba(71,204,208,${0.1 + Math.sin(t * 0.05 + i) * 0.06})`; ctx.lineWidth = 0.5; ctx.stroke(); }

      const vx = 160, vy = groundY;
      const intG = 0.08 + Math.sin(t * 0.025) * 0.04;
      ctx.fillStyle = "#0a1824"; ctx.fillRect(vx, vy - 160, 320, 160); ctx.strokeStyle = "rgba(71,204,208,0.2)"; ctx.lineWidth = 1; ctx.strokeRect(vx, vy - 160, 320, 160);
      ctx.fillStyle = "#0c1c2a"; ctx.fillRect(vx + 20, vy - 240, 260, 80); ctx.strokeStyle = "rgba(71,204,208,0.18)"; ctx.strokeRect(vx + 20, vy - 240, 260, 80);
      ctx.fillStyle = "#0e2030"; ctx.fillRect(vx - 10, vy - 248, 340, 12); ctx.strokeStyle = "rgba(71,204,208,0.15)"; ctx.strokeRect(vx - 10, vy - 248, 340, 12);

      for (let i = 0; i < 4; i++) { const wx = vx + 15 + i * 78; ctx.fillStyle = `rgba(71,204,208,${intG + (i === 1 ? 0.05 : 0)})`; ctx.fillRect(wx, vy - 145, 60, 120); ctx.strokeStyle = "rgba(71,204,208,0.12)"; ctx.lineWidth = 0.5; ctx.strokeRect(wx, vy - 145, 60, 120); ctx.beginPath(); ctx.moveTo(wx + 30, vy - 145); ctx.lineTo(wx + 30, vy - 25); ctx.strokeStyle = "rgba(71,204,208,0.08)"; ctx.stroke(); }
      for (let i = 0; i < 3; i++) { const wx = vx + 40 + i * 80; ctx.fillStyle = `rgba(71,204,208,${intG * 0.8})`; ctx.fillRect(wx, vy - 228, 55, 60); ctx.strokeStyle = "rgba(71,204,208,0.1)"; ctx.lineWidth = 0.5; ctx.strokeRect(wx, vy - 228, 55, 60); }
      ctx.fillStyle = `rgba(71,204,208,${intG + 0.06})`; ctx.fillRect(vx + 135, vy - 70, 50, 70); ctx.strokeStyle = "rgba(71,204,208,0.2)"; ctx.lineWidth = 0.8; ctx.strokeRect(vx + 135, vy - 70, 50, 70);

      [100, 540].forEach(px => {
        ctx.fillStyle = "#060e16"; ctx.fillRect(px, groundY - 100, 5, 100);
        for (let i = 0; i < 5; i++) { const angle = -Math.PI / 2 + (i - 2) * 0.5 + Math.sin(t * 0.02 + i) * 0.05; ctx.beginPath(); ctx.moveTo(px + 2.5, groundY - 98); ctx.quadraticCurveTo(px + 2.5 + Math.cos(angle) * 25, groundY - 98 + Math.sin(angle) * 25, px + 2.5 + Math.cos(angle) * 50, groundY - 98 + Math.sin(angle) * 50); ctx.strokeStyle = "rgba(71,204,208,0.08)"; ctx.lineWidth = 2; ctx.stroke(); }
      });
    }

    function drawMixed(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(71,204,208,0.03)"; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Laptop
      const laptopF = Math.sin(t * 0.025) * 5;
      ctx.save(); ctx.translate(80, 120 + laptopF);
      ctx.fillStyle = "#080e18"; ctx.beginPath(); ctx.roundRect(0, 0, 200, 130, 6); ctx.fill(); ctx.strokeStyle = "rgba(71,204,208,0.3)"; ctx.lineWidth = 1.2; ctx.stroke();
      const cG = 0.2 + Math.sin(t * 0.04) * 0.1;
      for (let i = 0; i < 8; i++) { const cw = 40 + ((i * 37 + Math.floor(t * 0.1)) % 100); ctx.fillStyle = `rgba(71,204,208,${cG * (i % 3 === 0 ? 1.5 : 0.6)})`; ctx.fillRect(14, 14 + i * 13, Math.min(cw, 170), 6); }
      ctx.fillStyle = "#0a1520"; ctx.beginPath(); ctx.moveTo(-10, 132); ctx.lineTo(210, 132); ctx.lineTo(220, 155); ctx.lineTo(-20, 155); ctx.closePath(); ctx.fill(); ctx.strokeStyle = "rgba(71,204,208,0.15)"; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.strokeStyle = "rgba(71,204,208,0.1)"; ctx.beginPath(); ctx.roundRect(70, 137, 60, 14, 2); ctx.stroke();
      ctx.restore();

      // Smartphone
      const phoneF = Math.sin(t * 0.03 + 1) * 6;
      ctx.save(); ctx.translate(360, 80 + phoneF);
      ctx.fillStyle = "#080e18"; ctx.beginPath(); ctx.roundRect(0, 0, 85, 165, 12); ctx.fill(); ctx.strokeStyle = "rgba(71,204,208,0.3)"; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.fillStyle = "#050a12"; ctx.beginPath(); ctx.roundRect(5, 12, 75, 140, 6); ctx.fill();
      const aG = 0.15 + Math.sin(t * 0.035) * 0.08;
      ctx.fillStyle = `rgba(71,204,208,${aG})`; ctx.beginPath(); ctx.roundRect(12, 20, 61, 10, 2); ctx.fill();
      for (let i = 0; i < 4; i++) { ctx.fillStyle = `rgba(71,204,208,${aG * 0.5})`; ctx.beginPath(); ctx.roundRect(12, 40 + i * 28, 61, 20, 3); ctx.fill(); ctx.strokeStyle = "rgba(71,204,208,0.08)"; ctx.lineWidth = 0.5; ctx.stroke(); }
      ctx.fillStyle = "#080e18"; ctx.beginPath(); ctx.roundRect(25, 1, 35, 8, [0, 0, 6, 6]); ctx.fill();
      ctx.restore();

      // Watch
      const watchF = Math.sin(t * 0.028 + 2) * 4;
      ctx.save(); ctx.translate(510, 200 + watchF);
      ctx.fillStyle = "#0a1520"; ctx.beginPath(); ctx.roundRect(10, -40, 40, 45, 4); ctx.fill();
      ctx.fillStyle = "#080e18"; ctx.beginPath(); ctx.roundRect(0, 0, 60, 70, 14); ctx.fill(); ctx.strokeStyle = "rgba(71,204,208,0.3)"; ctx.lineWidth = 1.5; ctx.stroke();
      const wG = 0.2 + Math.sin(t * 0.04 + 0.5) * 0.1;
      ctx.fillStyle = `rgba(71,204,208,${wG * 0.3})`; ctx.beginPath(); ctx.roundRect(6, 8, 48, 54, 8); ctx.fill();
      ctx.fillStyle = `rgba(71,204,208,${wG + 0.2})`; ctx.font = "bold 18px monospace"; ctx.textAlign = "center"; ctx.fillText("10:24", 30, 42);
      ctx.font = "8px sans-serif"; ctx.fillStyle = `rgba(71,204,208,${wG})`; ctx.fillText("SAT 25", 30, 55);
      ctx.fillStyle = "rgba(71,204,208,0.2)"; ctx.fillRect(60, 25, 6, 20);
      ctx.fillStyle = "#0a1520"; ctx.beginPath(); ctx.roundRect(10, 72, 40, 45, 4); ctx.fill();
      ctx.restore();

      // Camera
      const camF = Math.sin(t * 0.022 + 3) * 5;
      ctx.save(); ctx.translate(160, 300 + camF);
      ctx.fillStyle = "#080e18"; ctx.beginPath(); ctx.arc(0, 0, 35, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = "rgba(71,204,208,0.25)"; ctx.lineWidth = 1.5; ctx.stroke();
      [28, 22, 15].forEach((r, i) => { ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.strokeStyle = `rgba(71,204,208,${0.08 + i * 0.05})`; ctx.lineWidth = 0.5; ctx.stroke(); });
      ctx.fillStyle = `rgba(71,204,208,${0.15 + Math.sin(t * 0.05) * 0.1})`; ctx.beginPath(); ctx.arc(-5, -5, 8, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      // Headphones
      const hF = Math.sin(t * 0.026 + 4) * 4;
      ctx.save(); ctx.translate(440, 330 + hF);
      ctx.beginPath(); ctx.arc(0, 0, 40, Math.PI, 0); ctx.strokeStyle = "rgba(71,204,208,0.25)"; ctx.lineWidth = 3; ctx.stroke();
      [-40, 40].forEach(ex => { ctx.fillStyle = "#080e18"; ctx.beginPath(); ctx.ellipse(ex, 5, 16, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = "rgba(71,204,208,0.2)"; ctx.lineWidth = 1; ctx.stroke(); ctx.fillStyle = `rgba(71,204,208,${0.05 + Math.sin(t * 0.04) * 0.03})`; ctx.beginPath(); ctx.ellipse(ex, 5, 10, 15, 0, 0, Math.PI * 2); ctx.fill(); });
      ctx.restore();

      ctx.strokeStyle = "rgba(71,204,208,0.04)"; ctx.lineWidth = 0.5; ctx.setLineDash([4, 8]);
      [[180, 185, 360, 160], [445, 160, 510, 200], [195, 275, 200, 300], [475, 245, 480, 330]].forEach(([x1, y1, x2, y2]) => { ctx.beginPath(); ctx.moveTo(x1, y1 + Math.sin(t * 0.02) * 3); ctx.lineTo(x2, y2 + Math.sin(t * 0.025) * 3); ctx.stroke(); });
      ctx.setLineDash([]);
    }

    const drawFn = category === "cars" ? drawCar : category === "realestate" ? drawRealEstate : drawMixed;
    function loop() { fc.current++; drawFn(fc.current); anim.current = requestAnimationFrame(loop); }
    loop();
    return () => { if (anim.current) cancelAnimationFrame(anim.current); };
  }, [category]);

  return <canvas ref={ref} style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.95})`, opacity: isActive ? 1 : 0, transition: "opacity .9s cubic-bezier(.25,.46,.45,.94), transform .9s cubic-bezier(.25,.46,.45,.94)", maxWidth: "100%", borderRadius: 14, zIndex: isActive ? 3 : 1 }}/>;
}

// ─── HELPERS ───
function getHD() { try { return new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", { day: "numeric", month: "long", year: "numeric" }).format(new Date()); } catch { return "26 رمضان 1447"; } }
function getGD() { return new Intl.DateTimeFormat("ar-EG", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date()); }
function LiveClock() { const [t, setT] = useState(""); useEffect(() => { const k = () => setT(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })); k(); const iv = setInterval(k, 1000); return () => clearInterval(iv); }, []); return <span>{t}</span>; }

// ═══════════════════════════════════════════════════
// MAIN HERO
// ═══════════════════════════════════════════════════
export default function MzadatHero() {
  const [active, setActive] = useState("cars");
  const [prev, setPrev] = useState(null);
  const [trans, setTrans] = useState(false);
  const mouseRef = useRef({ x: null, y: null });
  const onMM = useCallback(e => { mouseRef.current = { x: e.clientX, y: e.clientY }; }, []);
  const sw = cat => { if (cat === active) return; setPrev(active); setTrans(true); setActive(cat); setTimeout(() => { setTrans(false); setPrev(null); }, 950); };
  const cats = [{ id: "cars", l: "سيارات فاخرة" }, { id: "realestate", l: "عقارات" }, { id: "mixed", l: "مزادات متنوعة" }];

  return (
    <div onMouseMove={onMM} style={{ position: "relative", width: "100%", height: "100vh", minHeight: 700, background: DB, overflow: "hidden", direction: "rtl", fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes ap{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes fu{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gp{0%,100%{box-shadow:0 0 22px rgba(71,204,208,.18)}50%{box-shadow:0 0 50px rgba(71,204,208,.38)}}
        @keyframes lg{0%,100%{text-shadow:0 0 20px rgba(71,204,208,.35)}50%{text-shadow:0 0 50px rgba(71,204,208,.65),0 0 80px rgba(71,204,208,.2)}}
      `}</style>

      <ParticleCanvas mouseRef={mouseRef}/>
      <SplashCanvas active={active} go={trans}/>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `radial-gradient(ellipse 70% 50% at 25% 50%, rgba(71,204,208,.035) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 80% 35%, rgba(71,204,208,.02) 0%, transparent 55%), linear-gradient(180deg, ${DB} 0%, rgba(5,10,15,.9) 50%, ${DB} 100%)` }}/>

      {/* TOP BAR */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 48px", borderBottom: ".5px solid rgba(71,204,208,.1)", background: "rgba(0,0,0,.45)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, animation: "ap 2s ease-in-out infinite" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: AR, boxShadow: `0 0 10px ${AR}` }}/>
          <span style={{ color: AR, fontSize: 12, fontWeight: 700 }}>مزاد ينتهي قريباً</span>
          <span style={{ color: "rgba(255,255,255,.3)", fontSize: 11 }}>— فيلا الرياض حي النرجس</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 12 }}>
          <span style={{ color: "rgba(255,255,255,.3)" }}>{getHD()}</span>
          <div style={{ width: 1, height: 14, background: "rgba(71,204,208,.15)" }}/>
          <span style={{ color: "rgba(255,255,255,.3)" }}>{getGD()}</span>
          <div style={{ width: 1, height: 14, background: "rgba(71,204,208,.15)" }}/>
          <span style={{ color: SB, fontWeight: 700, fontVariantNumeric: "tabular-nums", fontFamily: "monospace" }}><LiveClock/></span>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ position: "relative", zIndex: 5, display: "grid", gridTemplateColumns: "1fr 1fr", height: "calc(100vh - 48px)", alignItems: "center", padding: "0 48px" }}>

        {/* ═══ RIGHT COLUMN — TEXT (no @MZA logo, subtitle aligned with headline) ═══ */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingInlineEnd: 40 }}>

          {/* Headline + Subtitle grouped together, right-aligned */}
          <h1 style={{ fontSize: "clamp(38px, 4.5vw, 72px)", fontWeight: 900, lineHeight: 1.18, color: "#fff", margin: 0, textAlign: "right", animation: "fu .9s ease-out", width: "100%" }}>
            زايد بسهولة<span style={{ color: SB }}>..</span>
            <br/>
            <span style={{ color: SB }}>في عالم النخبة</span>
          </h1>

          {/* Updated subtitle — aligned directly under headline */}
          <p style={{
            fontSize: "clamp(13px, 1.2vw, 16px)",
            color: "rgba(255,255,255,.48)", lineHeight: 1.9,
            margin: "18px 0 0", textAlign: "right", maxWidth: 480,
            fontWeight: 400, animation: "fu .9s ease-out .12s both",
          }}>
            وصول حصري لأفضل عروض العقارات والسيارات والمقتنيات والآليات والأجهزة بشفافية وسهولة مطلقة
          </p>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 8, marginTop: 34, animation: "fu .9s ease-out .25s both" }}>
            {cats.map(c => (
              <button key={c.id} onClick={() => sw(c.id)} style={{
                padding: "10px 26px", borderRadius: 30,
                background: active === c.id ? SB : "rgba(71,204,208,.06)",
                color: active === c.id ? "#000" : "rgba(255,255,255,.5)",
                border: active === c.id ? "none" : ".5px solid rgba(71,204,208,.15)",
                fontSize: 13, fontWeight: active === c.id ? 700 : 400,
                cursor: "pointer", fontFamily: "'Noto Kufi Arabic'",
                transition: "all .4s cubic-bezier(.25,.46,.45,.94)",
                boxShadow: active === c.id ? "0 0 38px rgba(71,204,208,.3)" : "none",
              }}>{c.l}</button>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 38, animation: "fu .9s ease-out .4s both" }}>
            <button style={{
              padding: "16px 56px", borderRadius: 8,
              background: `linear-gradient(135deg, ${SB}, #38b2b6)`,
              color: "#000", border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer",
              fontFamily: "'Noto Kufi Arabic'", transition: "all .3s ease",
              boxShadow: "0 4px 30px rgba(71,204,208,.2)", animation: "gp 3s ease-in-out infinite",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 12px 50px rgba(71,204,208,.42)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 30px rgba(71,204,208,.2)"; }}
            >استكشف المزادات &nbsp;‹</button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 48, marginTop: 52, animation: "fu .9s ease-out .55s both" }}>
            {[{ v: "+2,400", l: "مزاد نشط" }, { v: "+18,000", l: "مستخدم مسجل" }, { v: "99.9%", l: "نسبة الأمان" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: SB, direction: "ltr" }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.28)", marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ LEFT COLUMN — ANIMATED VISUALS ═══ */}
        <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", top: "15%", left: "5%", width: 50, height: 50, borderTop: "2px solid rgba(71,204,208,.3)", borderLeft: "2px solid rgba(71,204,208,.3)", zIndex: 6, borderRadius: "4px 0 0 0" }}/>
          <div style={{ position: "absolute", top: "15%", right: "5%", width: 50, height: 50, borderTop: "2px solid rgba(71,204,208,.3)", borderRight: "2px solid rgba(71,204,208,.3)", zIndex: 6, borderRadius: "0 4px 0 0" }}/>
          <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 50, height: 50, borderBottom: "2px solid rgba(71,204,208,.3)", borderLeft: "2px solid rgba(71,204,208,.3)", zIndex: 6, borderRadius: "0 0 0 4px" }}/>
          <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 50, height: 50, borderBottom: "2px solid rgba(71,204,208,.3)", borderRight: "2px solid rgba(71,204,208,.3)", zIndex: 6, borderRadius: "0 0 4px 0" }}/>

          <AnimatedCategoryCanvas category="cars" isActive={active === "cars"}/>
          <AnimatedCategoryCanvas category="realestate" isActive={active === "realestate"}/>
          <AnimatedCategoryCanvas category="mixed" isActive={active === "mixed"}/>

          {/* Category label */}
          <div style={{ position: "absolute", bottom: "18%", right: "8%", zIndex: 7, display: "flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 8, background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)", border: ".5px solid rgba(71,204,208,.2)" }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: SB, boxShadow: `0 0 8px ${SB}` }}/>
            <span style={{ color: "rgba(255,255,255,.85)", fontSize: 12, fontWeight: 600 }}>
              {active === "cars" ? "سيارات فاخرة" : active === "realestate" ? "عقارات حصرية" : "مزادات متنوعة"}
            </span>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140, background: `linear-gradient(to top, ${DB}, transparent)`, zIndex: 6, pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 7 }}>
        <div style={{ width: 22, height: 36, borderRadius: 11, border: "1px solid rgba(71,204,208,.18)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ width: 2.5, height: 7, borderRadius: 2, background: SB, animation: "fu 1.5s ease-in-out infinite" }}/>
        </div>
      </div>
    </div>
  );
}
