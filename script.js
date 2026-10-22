const state = { vehicle: "Car", rate: 20, area: "City Area", hours: 1, slot: null, loc: null };
const $ = id => document.getElementById(id);

/* ---------- views ---------- */
function show(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("on", v.id === id));
  document.body.classList.toggle("auth-mode", id === "login" || id === "signup");
  window.scrollTo(0, 0);
}

/* ---------- accounts (saved in this browser only, passwords hashed) ---------- */
async function hash(text) {
  if (!(window.crypto && crypto.subtle)) return text;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}
function getUsers() {
  try { return JSON.parse(localStorage.getItem("sp_users")) || []; } catch (e) { return []; }
}
function saveUser(u) {
  try { localStorage.setItem("sp_users", JSON.stringify([...getUsers(), u])); } catch (e) {}
}
async function validLogin(email, pass) {
  if (email === "demo@smartpark.com" && pass === "123456") return true;
  const h = await hash(pass);
  return getUsers().some(u => u.email === email && u.hash === h);
}

/* ---------- car intro ---------- */
function playIntro(done) {
  const intro = $("intro");
  const car = intro.querySelector(".car");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    intro.classList.add("fade");
    setTimeout(() => {
      intro.hidden = true;
      intro.classList.remove("play", "fade");
      done();
    }, 400);
  }

  intro.hidden = false;
  void intro.offsetWidth; // restart animation
  if (reduce) { setTimeout(finish, 500); return; }
  intro.classList.add("play");
  car.addEventListener("animationend", e => { if (e.animationName === "drive") finish(); });
  setTimeout(finish, 4000); // safety fallback
}

function enterApp() {
  $("top").hidden = true;
  playIntro(() => {
    $("top").hidden = false;
    show("s1");
  });
}

/* ---------- login / signup ---------- */
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const wait = ms => new Promise(r => setTimeout(r, ms));

function setErr(inputId, errId, msg) {
  $(errId).textContent = msg || "";
  $(inputId).classList.toggle("bad", !!msg);
  return !msg;
}
function setLoading(btnId, on) {
  const b = $(btnId);
  b.classList.toggle("loading", on);
  b.disabled = on;
}
function setMsg(id, text, info) {
  const m = $(id);
  m.textContent = text || "";
  m.classList.toggle("info", !!info);
}

// show / hide password
document.querySelectorAll("[data-eye]").forEach(btn => {
  btn.onclick = () => {
    const input = $(btn.dataset.eye);
    const hidden = input.type === "password";
    input.type = hidden ? "text" : "password";
    btn.textContent = hidden ? "Hide" : "Show";
    btn.setAttribute("aria-label", hidden ? "Hide password" : "Show password");
  };
});

// remembered email
try { const r = localStorage.getItem("sp_remember"); if (r) { $("lEmail").value = r; $("remember").checked = true; } } catch (e) {}

$("loginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const email = $("lEmail").value.trim().toLowerCase();
  const pass = $("lPass").value;
  setMsg("lMsg", "");
  const ok1 = setErr("lEmail", "lEmailErr", !email ? "Enter your email." : !emailOk(email) ? "Enter a valid email." : "");
  const ok2 = setErr("lPass", "lPassErr", pass ? "" : "Enter your password.");
  if (!ok1 || !ok2) return;

  setLoading("loginBtn", true);
  await wait(600);
  const good = await validLogin(email, pass);
  setLoading("loginBtn", false);
  if (!good) { setMsg("lMsg", "Incorrect email or password."); return; }

  try {
    if ($("remember").checked) localStorage.setItem("sp_remember", email);
    else localStorage.removeItem("sp_remember");
  } catch (err) {}
  $("lPass").value = "";
  enterApp();
});

$("signupForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name = $("sName").value.trim();
  const email = $("sEmail").value.trim().toLowerCase();
  const pass = $("sPass").value;
  setMsg("sMsg", "");
  const ok1 = setErr("sName", "sNameErr", name.length < 2 ? "Enter your full name." : "");
  const ok2 = setErr("sEmail", "sEmailErr", !emailOk(email) ? "Enter a valid email." : "");
  const ok3 = setErr("sPass", "sPassErr", pass.length < 6 ? "Use at least 6 characters." : "");
  if (!ok1 || !ok2 || !ok3) return;

  if (email === "demo@smartpark.com" || getUsers().some(u => u.email === email)) {
    setErr("sEmail", "sEmailErr", "This email already has an account.");
    return;
  }
  setLoading("signupBtn", true);
  await wait(600);
  saveUser({ name, email, hash: await hash(pass) });
  setLoading("signupBtn", false);
  $("sPass").value = "";
  enterApp();
});

// password strength meter
$("sPass").addEventListener("input", () => {
  const p = $("sPass").value;
  let score = 0;
  if (p.length >= 6) score++;
  if (p.length >= 10) score++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) score++;
  const bar = $("meterBar");
  bar.style.width = (p ? score * 25 : 0) + "%";
  bar.style.background = score <= 1 ? "var(--danger)" : score <= 2 ? "#ffb84d" : "var(--free)";
});

// clear field errors while typing
[["lEmail", "lEmailErr"], ["lPass", "lPassErr"], ["sName", "sNameErr"], ["sEmail", "sEmailErr"], ["sPass", "sPassErr"]]
  .forEach(([i, e]) => $(i).addEventListener("input", () => setErr(i, e, "")));

$("demoFill").onclick = () => { $("lEmail").value = "demo@smartpark.com"; $("lPass").value = "123456"; setMsg("lMsg", "Demo details filled. Press Login.", true); };
$("forgot").onclick = e => { e.preventDefault(); setMsg("lMsg", "Password reset isn't available in this demo.", true); };

$("toSignup").onclick = e => { e.preventDefault(); show("signup"); };
$("toLogin").onclick = e => { e.preventDefault(); show("login"); };
$("logout").onclick = () => { $("top").hidden = true; show("login"); };

/* ---------- option groups ---------- */
document.querySelectorAll(".opts").forEach(group => {
  group.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    group.querySelectorAll("button").forEach(x => x.classList.remove("sel"));
    b.classList.add("sel");
    state[group.dataset.key] = b.dataset.v;
    if (b.dataset.rate) state.rate = +b.dataset.rate;
    if (group.dataset.key === "hours") renderSummary();
  });
});

document.querySelectorAll("[data-back]").forEach(b => b.onclick = () => show(b.dataset.back));

/* ---------- current location ---------- */
function locStatus(text, cls) {
  const s = $("locStatus");
  s.textContent = text;
  s.className = "loc-status" + (cls ? " " + cls : "");
}

async function placeName(lat, lng) {
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=16&lat=${lat}&lon=${lng}`);
    const d = await r.json();
    const a = d.address || {};
    return [a.suburb || a.neighbourhood || a.road, a.city || a.town || a.village || a.state_district].filter(Boolean).join(", ") || d.display_name;
  } catch (e) { return null; }
}

$("locBtn").onclick = () => {
  if (!navigator.geolocation) { locStatus("Location isn't supported on this browser.", "bad"); return; }
  const btn = $("locBtn");
  btn.disabled = true;
  locStatus("Getting your location…");
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude, lng = pos.coords.longitude;
    const name = await placeName(lat, lng);
    state.loc = { lat, lng, label: name || `${lat.toFixed(4)}, ${lng.toFixed(4)}` };
    btn.disabled = false;
    btn.textContent = "📍 Update location";
    locStatus("Location set: " + state.loc.label, "ok");
  }, err => {
    btn.disabled = false;
    state.loc = null;
    locStatus(err.code === 1 ? "Permission denied. Allow location in your browser settings." : "Couldn't get your location. Try again.", "bad");
  }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
};

/* ---------- slots ---------- */
function renderGrid() {
  $("areaTitle").textContent = state.area + " · pick a slot";
  state.slot = null;
  $("to3").disabled = true;
  const grid = $("grid");
  grid.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    const b = document.createElement("button");
    b.className = "slot";
    b.textContent = "P" + i;
    if (Math.random() < 0.35) { b.disabled = true; b.textContent = "🚗"; }
    b.onclick = () => {
      grid.querySelectorAll(".slot").forEach(x => x.classList.remove("sel"));
      b.classList.add("sel");
      state.slot = "P" + i;
      $("to3").disabled = false;
    };
    grid.appendChild(b);
  }
}

/* ---------- summary / booking ---------- */
const total = () => state.rate * state.hours;

function renderSummary() {
  $("summary").innerHTML =
    `<div class="row"><span>${state.vehicle} · ${state.area}</span><b>${state.slot}</b></div>
     <div class="row"><span>₹${state.rate}/hour × ${state.hours}</span><span>₹${total()}</span></div>
     <div class="row total"><span>Total</span><span>₹${total()}</span></div>`;
}

$("to2").onclick = () => { renderGrid(); show("s2"); };
$("to3").onclick = () => { renderSummary(); show("s3"); };

$("book").onclick = () => {
  $("done").innerHTML =
    `<div class="row"><span>Slot</span><b>${state.slot}</b></div>
     <div class="row"><span>Area</span><b>${state.area}</b></div>
     <div class="row"><span>Vehicle</span><b>${state.vehicle}</b></div>
     ${state.loc ? `<div class="row"><span>From</span><b>${state.loc.label}</b></div>` : ""}
     <div class="row total"><span>Paid</span><span>₹${total()}</span></div>`;
  const dest = encodeURIComponent("parking " + state.area);
  $("maps").href = state.loc
    ? `https://www.google.com/maps/dir/?api=1&origin=${state.loc.lat},${state.loc.lng}&destination=${dest}`
    : `https://www.google.com/maps/search/?api=1&query=${dest}`;
  $("maps").textContent = state.loc ? "Get directions" : "Open in Google Maps";
  show("s4");
};

$("again").onclick = () => show("s1");
