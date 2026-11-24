const hdr = document.getElementById("hdr"),
  nav = hdr.querySelector(".nav"),
  bg = hdr.querySelector(".burger");
const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 30);
onScroll();
addEventListener("scroll", onScroll, { passive: true });
bg.onclick = () => {
  const o = nav.classList.toggle("open");
  bg.setAttribute("aria-expanded", o);
};
/* reveal on scroll */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 70 + "ms";
  io.observe(el);
});
/* counters */
const co = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      co.unobserve(e.target);
      const t = +e.target.dataset.count,
        s = performance.now();
      (function f(n) {
        const p = Math.min((n - s) / 1400, 1);
        e.target.textContent = Math.round(t * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(f);
      })(s);
    }),
  { threshold: 0.6 },
);
document.querySelectorAll("[data-count]").forEach((el) => co.observe(el));
/* side section dots */
const secs = [...document.querySelectorAll("section[data-label]")];
if (secs.length > 1) {
  const d = document.createElement("nav");
  d.className = "dots";
  d.setAttribute("aria-label", "Sections");
  d.innerHTML = secs
    .map((s, i) => {
      s.id = s.id || "s" + i;
      return `<a href="#${s.id}" data-l="${s.dataset.label}" aria-label="${s.dataset.label}"></a>`;
    })
    .join("");
  document.body.append(d);
  const so = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting)
          d.querySelectorAll("a").forEach((a) =>
            a.classList.toggle("active", a.hash === "#" + e.target.id),
          );
      }),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  secs.forEach((s) => so.observe(s));
}
/* tap-to-open for hover cards on touch devices */
document
  .querySelectorAll(".photo")
  .forEach((p) =>
    p.addEventListener("click", () => p.classList.toggle("open")),
  );
/* page transition */
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (
    !a ||
    a.target ||
    a.origin !== location.origin ||
    a.pathname === location.pathname ||
    e.metaKey ||
    e.ctrlKey
  )
    return;
  e.preventDefault();
  document.body.classList.add("leaving");
  setTimeout(() => (location.href = a.href), 230);
});
addEventListener("pageshow", () => document.body.classList.remove("leaving"));
