/* subtle animated node network in the hero (the "command center" motif) */
document.querySelectorAll("canvas.net").forEach((c) => {
  const x = c.getContext("2d");
  let w,
    h,
    P = [],
    vis = true;
  const rs = () => {
    w = c.width = c.offsetWidth;
    h = c.height = c.offsetHeight;
    P = Array.from({ length: Math.min(60, (w / 22) | 0) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  };
  rs();
  addEventListener("resize", rs);
  new IntersectionObserver((e) => (vis = e[0].isIntersecting)).observe(c);
  const still = matchMedia("(prefers-reduced-motion:reduce)").matches;
  (function t() {
    if (vis) {
      x.clearRect(0, 0, w, h);
      P.forEach((p, i) => {
        if (!still) {
          p.x = (p.x + p.vx + w) % w;
          p.y = (p.y + p.vy + h) % h;
        }
        x.fillStyle = "#e0a93b";
        x.beginPath();
        x.arc(p.x, p.y, 2, 0, 6.3);
        x.fill();
        for (let j = i + 1; j < P.length; j++) {
          const q = P[j],
            d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 140) {
            x.strokeStyle = `rgba(224,169,59,${0.25 * (1 - d / 140)})`;
            x.beginPath();
            x.moveTo(p.x, p.y);
            x.lineTo(q.x, q.y);
            x.stroke();
          }
        }
      });
    }
    requestAnimationFrame(t);
  })();
});
