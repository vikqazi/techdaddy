/* ===== ADD NEW BUILDS HERE =====
   status: "live" | "building" | "season"
   cat: used by the filter chips · wide: true = bigger card
   hue: two colors for the card art */
const BUILDS = [
  {
    title: "Flightline", icon: "🦆", hue: ["#0e7a8f", "#1d3fa8"], wide: true,
    status: "live", cat: "Hunting",
    blurb: "A waterfowl hunting map for the Northeast, formerly Granite Flyway — zones, season dates, closures and special-rule areas, all on one map.",
    points: ["Six states live: NH, MA, ME, RI, VT and NY", "State lines welded so border hunters see both sides seamlessly", "Daily eBird layer: recent waterfowl sightings at public hotspots", "Built from official state GIS + Census data — nothing made up"],
    tags: ["Map", "GIS", "Waterfowl"],
    link: "https://vikqazi.github.io/flightline/", linkText: "Open map"
  },
  {
    title: "Grouse Ledger", icon: "🍂", hue: ["#a8501d", "#5a1d8f"], wide: true,
    status: "season", cat: "Hunting",
    blurb: "10+ seasons, a crew of about 20 hunters, and hundreds of birds in the Maine woods. What we learn gets shared and turned into data — GPS tracks, flush pins and weather.",
    points: ["43% of flushes came in the last two hours of light", "Drizzle beat dry days; steady rain killed it", "Mixed hardwood/softwood edges ≈1.7× more birds"],
    tags: ["Data", "GPS", "Upland"]
  },
  {
    title: "Swamp Yacht", icon: "🚤", hue: ["#2f7a3a", "#0e5a6f"],
    status: "building", cat: "Hunting",
    blurb: "The duck boat build and the hunts that come with it — rigging, decoy spreads, and mornings on the marsh.",
    points: ["Boat build and blind setup", "Season hunt recaps", "Gear that actually holds up"],
    tags: ["Duck boat", "Instagram"],
    link: "https://www.instagram.com/swampyatch/", linkText: "@swampyatch"
  },
  {
    title: "Baby Gear Builder", icon: "👶", hue: ["#b03d8a", "#5a3dcf"],
    status: "live", cat: "Dad life",
    blurb: "A 10-step configurator for baby gear that knows which pieces actually fit together.",
    points: ["Real adapter compatibility checks", "Three picks per step: gadget, value, reviews", "Running total and saved builds"],
    tags: ["Web app", "Gear"],
    link: "https://vikqazi.github.io/baby-gear-builder/", linkText: "Build setup"
  },
  {
    title: "HotSpots", icon: "📍", hue: ["#7a2fd0", "#d02f8a"],
    status: "building", cat: "Apps",
    blurb: "A nightlife app that shows where the energy is right now — anonymous check-ins, no stalking.",
    points: ["iOS + Android (Expo)", "Privacy-first: check-ins are anonymous", "In development"],
    tags: ["Mobile", "React Native"]
  }
];

/* ===== ADD NEW LOG ENTRIES AT THE TOP ===== */
const LOG = [
  { date: "2026-10-30", title: "Flightline adds Vermont and New York", text: "Six states live. New York's zones are welded to Massachusetts and Vermont, so border hunters see one seamless map." },
  { date: "2026-10-29", title: "Granite Flyway is now Flightline", text: "New name, new address: vikqazi.github.io/flightline. Old links still work and land on the same spot on the map." },
  { date: "2026-10-28", title: "Granite Flyway gets an eBird sightings layer", text: "Recent waterfowl sightings from public eBird hotspots now show on the map, refreshed automatically every morning." },
  { date: "2026-10-28", title: "Granite Flyway adds Maine and Rhode Island", text: "Four states live. Maine's new 2026–27 zone line (Route 2) is in, even though the state's own GIS still shows the old one." },
  { date: "2026-10", title: "Grouse season data push", text: "Re-ran the habitat analysis comparing birds to other spots on the same roads — the mixed-edge signal held up." },
  { date: "2026-09-13", title: "Baby Gear Builder goes public", text: "Moved to its own site so product photos load. Free for anyone to use." }
];

const TYPED = ["mapping duck zones across New England", "crunching grouse flush data", "building a nightlife app", "speccing the perfect stroller setup"];
const TICKER = ["GIS", "GPS TRACKS", "WATERFOWL", "REACT NATIVE", "UPLAND DATA", "CENSUS TIGER", "DUCK BOATS", "EXPO", "STATISTICS", "DAD MODE"];

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const STATUS = { live: "Live", building: "Building", season: "In season" };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const grid = document.getElementById("grid");
const filters = document.getElementById("filters");

function render(cat) {
  grid.innerHTML = BUILDS.filter(b => cat === "All" || b.cat === cat).map((b, i) => `
    <article class="card rv ${b.wide ? "wide" : ""}"><div class="in">
      <div class="art">
        <div class="mesh" style="background:radial-gradient(circle at 25% 30%,${b.hue[0]},transparent 60%),radial-gradient(circle at 80% 70%,${b.hue[1]},transparent 60%),#0a0e1a"></div>
        <div class="lines"></div>
        <span class="status ${b.status}"><i></i>${STATUS[b.status]}</span>
        <span class="idx">${String(i + 1).padStart(2, "0")}</span>
        <span class="glyph">${b.icon}</span>
      </div>
      <div class="body">
        <h3>${esc(b.title)}</h3>
        <p>${esc(b.blurb)}</p>
        <ul>${b.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
        <div class="foot">
          <div class="tags">${b.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
          ${b.link ? `<a class="go" href="${b.link}" target="_blank" rel="noopener">${esc(b.linkText)} <span>↗</span></a>` : ""}
        </div>
      </div>
    </div></article>`).join("");
  [...filters.children].forEach(btn => btn.classList.toggle("on", btn.textContent === cat));
  bindCards();
  observe();
}

/* each page has only some of these sections; fill the ones present */
if (filters) ["All", ...new Set(BUILDS.map(b => b.cat))].forEach(c => {
  const btn = document.createElement("button");
  btn.textContent = c;
  btn.onclick = () => render(c);
  filters.appendChild(btn);
});

const logList = document.getElementById("logList");
if (logList) logList.innerHTML = LOG.slice(0, +logList.dataset.limit || LOG.length).map(e => `
  <div class="entry rv"><time>${esc(e.date)}</time><div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div></div>`).join("");
/* home status board: built from BUILDS, so it follows each project's status */
const board = document.getElementById("board");
if (board) {
  const row = (cls, label, items) => items.length ? `
    <div class="board-row"><span class="board-k ${cls}"><i></i>${label}</span><span class="board-v">${items.join('<b>·</b>')}</span></div>` : "";
  const named = s => BUILDS.filter(b => b.status === s).map(b => b.link
    ? `<a href="${b.link}" target="_blank" rel="noopener">${esc(b.title)}</a>` : `<a href="builds.html">${esc(b.title)}</a>`);
  board.innerHTML = row("live", "LIVE", named("live")) + row("building", "BUILDING", named("building"))
    + row("season", "IN SEASON", named("season"))
    + row("open", "OPEN FOR", ['<a href="services.html">Small-business IT jobs</a>', '<a href="services.html#officiant">Weddings</a>']);
  const t = document.getElementById("boardTime");
  if (t) t.textContent = "UPDATED " + new Date(document.lastModified).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
}

const ticker = document.getElementById("ticker");
if (ticker) ticker.innerHTML = [...TICKER, ...TICKER].map(t => `<span>${t}</span>`).join("");
document.getElementById("yr").textContent = new Date().getFullYear();

/* cursor-follow glow + tilt on cards */
function bindCards() {
  if (!matchMedia("(hover: hover)").matches) return;
  grid.querySelectorAll(".card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty("--mx", x + "px");
      card.style.setProperty("--my", y + "px");
      if (!reduce) card.style.transform = `perspective(900px) rotateX(${(y / r.height - .5) * -5}deg) rotateY(${(x / r.width - .5) * 5}deg)`;
    });
    card.addEventListener("pointerleave", () => card.style.transform = "");
  });
}

/* scroll reveal + stat counters */
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("on");
  io.unobserve(e.target);
  e.target.querySelectorAll("[data-count]").forEach(countUp);
}), { threshold: .12 });
function observe() {
  document.querySelectorAll(".rv:not(.on)").forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 80 + "ms";
    io.observe(el);
  });
}
function countUp(el) {
  const end = +el.dataset.count, suf = el.dataset.suffix || "";
  if (reduce) { el.textContent = end + suf; return; }
  const t0 = performance.now();
  (function tick(t) {
    const p = Math.min((t - t0) / 1400, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

/* terminal typing — runs even with reduced motion (it's text, not movement) */
(function type() {
  const out = document.getElementById("typed");
  if (!out) return;
  let w = 0, c = 0, del = false;
  (function step() {
    const word = TYPED[w];
    c += del ? -1 : 1;
    out.textContent = word.slice(0, c);
    let wait = del ? 28 : 55;
    if (!del && c === word.length) { del = true; wait = 1800; }
    else if (del && c === 0) { del = false; w = (w + 1) % TYPED.length; wait = 350; }
    setTimeout(step, wait);
  })();
})();

if (grid) render("All");
observe();

/* ===== TOPO CARTOGRAPHER THEME: contour-map background ===== */
(function topo() {
  const cv = document.createElement("canvas");
  cv.id = "topo";
  document.body.prepend(cv);
  const ctx = cv.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  // a few hills and a valley, in page-fraction coordinates
  const peaks = [[.18, .22, .22, 1], [.78, .35, .26, .9], [.55, .85, .2, .8], [.1, .8, .16, -.6], [.92, .9, .14, .6]];
  function field(x, y, W, H) {
    let v = 0;
    for (const [px, py, r, a] of peaks) {
      const dx = (x / W - px) * (W / H), dy = y / H - py;
      v += a * Math.exp(-(dx * dx + dy * dy) / (2 * r * r));
    }
    return v + .06 * Math.sin(x / W * 9) * Math.cos(y / H * 7);
  }
  function draw() {
    const W = cv.width = innerWidth * dpr, H = cv.height = innerHeight * dpr;
    const s = 10 * dpr, cols = Math.ceil(W / s) + 1, rows = Math.ceil(H / s) + 1;
    const g = new Float32Array(cols * rows);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) g[j * cols + i] = field(i * s, j * s, W, H);
    const step = .07;
    for (let k = -10; k <= 16; k++) {
      const lv = k * step, index = k % 5 === 0;
      ctx.strokeStyle = index ? "rgba(150,136,100,.55)" : "rgba(170,156,120,.32)";
      ctx.lineWidth = (index ? 1.4 : .8) * dpr;
      ctx.beginPath();
      for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
        const a = g[j * cols + i], b = g[j * cols + i + 1], c = g[(j + 1) * cols + i + 1], d = g[(j + 1) * cols + i];
        const x = i * s, y = j * s, pts = [];
        const t = (p, q) => (lv - p) / (q - p);
        if ((a > lv) !== (b > lv)) pts.push([x + s * t(a, b), y]);
        if ((b > lv) !== (c > lv)) pts.push([x + s, y + s * t(b, c)]);
        if ((d > lv) !== (c > lv)) pts.push([x + s * t(d, c), y + s]);
        if ((a > lv) !== (d > lv)) pts.push([x, y + s * t(a, d)]);
        if (pts.length >= 2) { ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[1][0], pts[1][1]); }
        if (pts.length === 4) { ctx.moveTo(pts[2][0], pts[2][1]); ctx.lineTo(pts[3][0], pts[3][1]); }
      }
      ctx.stroke();
    }
  }
  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(draw, 150); });
  draw();

  // cursor grid reference (decorative, not a real location)
  const ref = document.createElement("div");
  ref.id = "gridref";
  document.body.appendChild(ref);
  addEventListener("pointermove", e => {
    ref.style.left = e.clientX + "px";
    ref.style.top = e.clientY + "px";
    ref.style.opacity = 1;
    const ex = String(Math.round(e.clientX / innerWidth * 999)).padStart(3, "0");
    const ny = String(Math.round((1 - e.clientY / innerHeight) * 999)).padStart(3, "0");
    const el = Math.round(field(e.clientX * dpr, e.clientY * dpr, innerWidth * dpr, innerHeight * dpr) * 1200 + 400);
    ref.textContent = `E${ex} N${ny} · ${el} ft`;
  });
  document.addEventListener("pointerleave", () => ref.style.opacity = 0);

  // red map pin on each card image
  const pin = () => document.querySelectorAll(".art:not(:has(.pinmark))").forEach(a => a.insertAdjacentHTML("beforeend", '<span class="pinmark"></span>'));
  if (grid) new MutationObserver(pin).observe(grid, { childList: true });
  pin();
})();
