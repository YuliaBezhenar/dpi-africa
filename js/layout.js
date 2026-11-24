/* Builds the shared header + footer, so they are edited in one place */
(() => {
  const b = document.body,
    root = b.dataset.root || "",
    cur = b.dataset.page;
  const links = [
    ["index", "Introduction", "index.html"],
    ["dpi", "The Regional DPI", "pages/regional-dpi.html"],
    ["ops", "Operations & Partnerships", "pages/operations-partnerships.html"],
    ["mgmt", "Management & Impact", "pages/management-impact.html"],
  ];
  const a = (l) =>
    `<a href="${root + l[2]}"${l[0] === cur ? ' aria-current="page"' : ""}>${l[1]}</a>`;
  document.getElementById("site-header").outerHTML =
    `<header class="site-header" id="hdr"><div class="wrap"><a class="brand" href="${root}index.html"><img src="${root}assets/img/logo.svg" alt="">DPI-Africa</a><button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button><nav class="nav" aria-label="Main">${links.map(a).join("")}</nav></div></header>`;
  document.getElementById("site-footer").outerHTML =
    `<footer class="site-footer"><div class="wrap"><p>DPI-Africa – Regional Digital Public Infrastructure and Command Control Center for Human–Nature Security and Resilience in Africa<br><br>DPI-Africa website was created by Bezhenar Yuliia at Fukushima University.<br><br>© 2026 DPI-Africa. All rights reserved.</p><nav>${links.map(a).join("")}</nav></div></footer>`;
  const i = links.findIndex((l) => l[0] === cur),
    n = links[i + 1] || links[0],
    nx = document.getElementById("next");
  if (nx)
    nx.innerHTML = `<p>${links[i + 1] ? "Next page" : "Back to start"}</p><a href="${root + n[2]}">${n[1]} →</a>`;
})();
