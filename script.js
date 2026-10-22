const state = { vehicle: "Car", rate: 20, area: "City Area", hours: 1, slot: null };
const $ = id => document.getElementById(id);

/* ---------- views ---------- */
function show(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("on", v.id === id));
  window.scrollTo(0, 0);
}

/* ---------- accounts (saved in this browser only) ---------- */
function getUsers() {
  try { return JSON.parse(localStorage.getItem("sp_users")) || []; } catch (e) { return []; }
}
function saveUser(u) {
  try { localStorage.setItem("sp_users", JSON.stringify([...getUsers(), u])); } catch (e) {}
}
function validLogin(email, pass) {
  if (email === "demo@smartpark.com" && pass === "123456") return true;
  return getUsers().some(u => u.email === email && u.pass === pass);
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
$("loginBtn").onclick = () => {
  const email = $("lEmail").value.trim().toLowerCase();
  const pass = $("lPass").value;
  if (!validLogin(email, pass)) { $("lErr").textContent = "Wrong email or password."; return; }
  $("lErr").textContent = "";
  enterApp();
};

$("signupBtn").onclick = () => {
  const name = $("sName").value.trim();
  const email = $("sEmail").value.trim().toLowerCase();
  const pass = $("sPass").value;
  if (!name || !email.includes("@") || pass.length < 4) {
    $("sErr").textContent = "Enter your name, a valid email and a password of 4+ characters.";
    return;
  }
  if (getUsers().some(u => u.email === email)) { $("sErr").textContent = "That email already has an account."; return; }
  saveUser({ name, email, pass });
  $("sErr").textContent = "";
  enterApp();
};

$("toSignup").onclick = e => { e.preventDefault(); show("signup"); };
$("toLogin").onclick = e => { e.preventDefault(); show("login"); };
$("logout").onclick = () => { $("top").hidden = true; $("lPass").value = ""; show("login"); };

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
     <div class="row total"><span>Paid</span><span>₹${total()}</span></div>`;
  $("maps").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("parking " + state.area);
  show("s4");
};

$("again").onclick = () => show("s1");
