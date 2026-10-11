// Dropdown "Categories" di navbar: 6 tag terbanyak dari data/data.js (3 kolom x 2 baris) + tautan ke categories.html.
// Dipakai bersama oleh index.html, detail.html, categories.html, dan animlist.html.
(function () {
  var css = [
    ".dd-wrap{position:relative;display:inline-flex}",
    ".links a.dd-btn{display:inline-flex;align-items:center;gap:6px}",
    ".dd-btn svg{width:10px;height:10px;stroke:currentColor;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;transition:transform .2s ease}",
    ".dd-btn[aria-expanded=true] svg{transform:rotate(180deg)}",
    ".dd-btn[aria-expanded=true]{background:var(--paper)}",
    ".dd{position:absolute;top:calc(100% + 10px);left:0;z-index:20;width:min(440px,calc(100vw - 32px));background:var(--white);border:1px solid var(--line);border-radius:18px;padding:14px;box-shadow:0 18px 40px rgba(80,60,30,.18)}",
    ".dd[hidden]{display:none}",
    ".dd-title{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin:2px 4px 10px}",
    ".dd-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(2,auto);gap:8px}",
    ".dd a.dd-item{display:flex;flex-direction:column;gap:2px;padding:10px 12px;border-radius:12px;background:var(--paper);border:1px solid var(--line);min-width:0;font-weight:600}",
    ".dd a.dd-item b{font-size:13px;font-weight:700;overflow-wrap:anywhere}",
    ".dd a.dd-item small{font-size:11px;color:var(--muted);font-weight:500}",
    ".dd a.dd-item:hover{background:var(--cream);border-color:var(--sand)}",
    ".dd a.dd-all{display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding:11px 16px;border-radius:12px;background:var(--ink);color:var(--paper);font-weight:700;font-size:13px}",
    ".dd a.dd-all:hover{background:var(--caramel)}",
    "@media (max-width:860px){.links{overflow:visible!important;flex-wrap:wrap}.dd-wrap{position:static}.nav .wrap{position:relative}.dd{left:16px;right:16px;width:auto;top:100%}}",
    "@media (prefers-reduced-motion:reduce){.dd-btn svg{transition:none}}"
  ].join("\n");
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var wrap = document.querySelector(".dd-wrap");
  if (!wrap) return;
  var btn = wrap.querySelector(".dd-btn");
  var menu = wrap.querySelector(".dd");
  var grid = wrap.querySelector(".dd-grid");
  var LIST = window.ANIME_LIST || [];

  // hitung tag terbanyak, urutan sama banyak diurutkan abjad
  var counts = {};
  LIST.forEach(function (a) { a.tags.forEach(function (t) { counts[t] = (counts[t] || 0) + 1; }); });
  var top = Object.keys(counts).sort(function (x, y) { return counts[y] - counts[x] || x.localeCompare(y); }).slice(0, 6);
  grid.innerHTML = top.map(function (t) {
    return '<a class="dd-item" href="categories.html#tag-' + t + '"><b>#' + t + "</b><small>" + counts[t] + " anime</small></a>";
  }).join("");

  function open(v) {
    menu.hidden = !v;
    btn.setAttribute("aria-expanded", v ? "true" : "false");
  }

  var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
  var timer;
  if (canHover) {
    wrap.addEventListener("mouseenter", function () { clearTimeout(timer); open(true); });
    wrap.addEventListener("mouseleave", function () { timer = setTimeout(function () { open(false); }, 180); });
  }
  // di layar sentuh, ketukan pertama membuka dropdown; di desktop klik langsung ke categories.html
  btn.addEventListener("click", function (e) {
    if (!canHover) { e.preventDefault(); open(menu.hidden); }
  });
  wrap.addEventListener("focusin", function () { open(true); });
  wrap.addEventListener("focusout", function (e) { if (!wrap.contains(e.relatedTarget)) open(false); });
  document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) open(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") open(false); });
})();
