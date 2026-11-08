// A small gold-and-white confetti burst on a canvas. No library: about 60 lines.
// Call it from a user action (for example sending the enquiry form).

const COLORS = ["#c9a24a", "#ebd27f", "#8a6a1f", "#ffffff", "#f3e9c8"];

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  color: string;
  round: boolean;
};

export function burstConfetti(origin?: { x: number; y: number }) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const dpr = window.devicePixelRatio || 1;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:70";
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();
  ctx.scale(dpr, dpr);

  const ox = origin?.x ?? window.innerWidth / 2;
  const oy = origin?.y ?? window.innerHeight / 2;
  const pieces: Piece[] = Array.from({ length: 110 }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9; // mostly upward fan
    const speed = 7 + Math.random() * 9;
    return {
      x: ox,
      y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 6 + Math.random() * 6,
      h: 4 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.35,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      round: Math.random() < 0.3,
    };
  });

  const start = performance.now();
  const DURATION = 2600;

  let last = start;
  function frame(now: number) {
    const t = now - start;
    // Step by elapsed time (1 = one 60Hz frame) so 120Hz and 144Hz screens play at the same speed.
    const dt = Math.min(Math.max((now - last) / (1000 / 60), 0), 3);
    last = now;
    const drag = Math.pow(0.985, dt);
    ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const fade = t > DURATION - 700 ? Math.max(0, (DURATION - t) / 700) : 1;
    for (const p of pieces) {
      p.vx *= drag; // air drag
      p.vy = p.vy * drag + 0.28 * dt; // gravity
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      ctx!.save();
      ctx!.globalAlpha = fade;
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rot);
      ctx!.fillStyle = p.color;
      ctx!.strokeStyle = "#c9a24a"; // so the white pieces stay visible on a white page
      ctx!.lineWidth = 0.8;
      if (p.round) {
        ctx!.beginPath();
        ctx!.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();
      } else {
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx!.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx!.restore();
    }
    if (t < DURATION) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}
