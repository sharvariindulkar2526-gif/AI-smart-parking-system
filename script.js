/* =====================================================
   SMARTPARK 3D - JAVASCRIPT
   Pure CSS-3D models are generated here (no libraries).
===================================================== */


/* ================= HELPERS ================= */

const $ = (id) => document.getElementById(id);

function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
}

function toast(message, kind) {
    const box = $("toasts");
    const el = document.createElement("div");
    el.className = "toast " + (kind || "");
    el.textContent = message;
    box.appendChild(el);
    setTimeout(() => {
        el.classList.add("out");
        setTimeout(() => el.remove(), 320);
    }, 3000);
}

function store(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
}

function load(key, storage) {
    try { return JSON.parse((storage || localStorage).getItem(key)); } catch (e) { return null; }
}


/* ================= VARIABLES ================= */

let currentUser = null;

const COLORS = ["#00f5a0", "#00d9ff", "#ff3cac", "#ffc53d", "#ff6b35", "#7c5cff", "#e8ecf5", "#ff3b4e"];

let vehicle = { number: "", model: "", type: "Car", color: "#00d9ff" };

let selectedLocation = "";
let selectedParking = null;
let selectedSlot = null;
let selectedDuration = 0;
let selectedPayment = "";
let currentLatitude = null;
let currentLongitude = null;
let pageHistory = [];
let currentPageId = "vehiclePage";
let navTimer = null;
let bookingId = "";


/* =====================================================
   3D ENGINE - boxes, wheels, vehicles
===================================================== */

/* one 3D box (6 faces). x/y/z = centre, y is DOWN (ground = 0, up = negative) */
function bx(w, h, d, x, y, z, cls, extra, face, txt) {

    const f = { f: "", b: "", l: "", r: "", t: "", u: "" };

    if (face) { f[face] = txt || ""; }

    return `<div class="box ${cls || ""}" style="--w:${w};--h:${h};--d:${d};--x:${x};--y:${y};--z:${z};${extra || ""}">` +
        `<i class="f">${f.f}</i><i class="b">${f.b}</i><i class="l"></i><i class="r"></i><i class="t"></i><i class="u"></i></div>`;
}

/* a wheel = stack of discs that spins around the X axis */
function wheel(x, y, z, size, half) {

    let discs = "";

    for (let t = -half; t <= half; t += 2) {
        const rim = Math.abs(t) === half;
        discs += `<b class="disc ${rim ? "rim" : ""}" style="--s:${size};--t:${t}"></b>`;
    }

    return `<div class="wheel" style="--x:${x};--y:${y};--z:${z}"><div class="spin">${discs}</div></div>`;
}

/* full vehicle model. Front faces -Z, so you see the rear from behind. */
function vehicleHTML(type, color, plate) {

    const pl = esc(String(plate || "").slice(0, 11));
    let h = "";

    if (type === "Bike") {

        h += `<div class="under" style="--uw:46;--ud:140"></div>`;
        h += wheel(0, -16, -40, 32, 2) + wheel(0, -16, 40, 32, 2);

        /* fork, engine, tank, seat, tail */
        h += bx(3, 26, 3, -5, -27, -35, "chrome", "--rx:-24deg");
        h += bx(3, 26, 3, 5, -27, -35, "chrome", "--rx:-24deg");
        h += bx(12, 12, 24, 0, -19, 2, "dark");
        h += bx(15, 9, 26, 0, -33, -10);
        h += bx(12, 4, 26, 0, -30, 13, "dark");
        h += bx(10, 6, 16, 0, -32, 30);
        h += bx(30, 3, 3, 0, -39, -30, "dark");
        h += bx(9, 9, 5, 0, -39, -37, "lamp");
        h += bx(8, 4, 2, 0, -33, 38.5, "tail");
        h += bx(5, 5, 30, 9, -11, 20, "chrome");
        h += bx(16, 8, 1, 0, -24, 57, "plate", "", "b", pl);

        /* rider */
        h += bx(14, 24, 10, 0, -47, 10, "dark", "--rx:-8deg");
        h += bx(4, 4, 36, -9, -45, -12, "dark") + bx(4, 4, 36, 9, -45, -12, "dark");
        h += bx(5, 5, 20, -9, -31, 6, "dark") + bx(5, 5, 20, 9, -31, 6, "dark");
        h += bx(12, 12, 12, 0, -66, 6);

    } else if (type === "SUV") {

        h += `<div class="under" style="--uw:88;--ud:176"></div>`;
        h += bx(66, 22, 142, 0, -17, 0);
        h += bx(60, 20, 104, 0, -38, 14, "glass3");
        h += bx(62, 2, 106, 0, -49, 14);
        h += bx(3, 3, 90, -26, -51.5, 14, "dark") + bx(3, 3, 90, 26, -51.5, 14, "dark");
        h += bx(64, 8, 5, 0, -9, -71.5, "dark") + bx(64, 8, 5, 0, -9, 71.5, "dark");
        h += bx(16, 8, 2, -22, -20, -71.5, "lamp") + bx(16, 8, 2, 22, -20, -71.5, "lamp");
        h += bx(14, 8, 2, -24, -20, 71.5, "tail") + bx(14, 8, 2, 24, -20, 71.5, "tail");
        h += bx(30, 9, 1, 0, -9, 74.5, "plate", "", "b", pl);
        h += bx(6, 3, 6, -34, -30, -26, "dark") + bx(6, 3, 6, 34, -30, -26, "dark");
        h += wheel(-37, -15, -46, 30, 5) + wheel(37, -15, -46, 30, 5);
        h += wheel(-37, -15, 48, 30, 5) + wheel(37, -15, 48, 30, 5);

    } else {

        h += `<div class="under" style="--uw:80;--ud:164"></div>`;
        h += bx(60, 16, 130, 0, -14, 0);
        h += bx(50, 14, 64, 0, -29, 10, "glass3");
        h += bx(52, 2, 62, 0, -37, 10);
        h += bx(58, 6, 4, 0, -9, -65, "dark") + bx(58, 6, 4, 0, -9, 65, "dark");
        h += bx(54, 2, 10, 0, -30, 62);
        h += bx(3, 6, 3, -18, -27, 60, "dark") + bx(3, 6, 3, 18, -27, 60, "dark");
        h += bx(14, 6, 2, -20, -15, -65.5, "lamp") + bx(14, 6, 2, 20, -15, -65.5, "lamp");
        h += bx(16, 5, 2, -20, -15, 65.5, "tail") + bx(16, 5, 2, 20, -15, 65.5, "tail");
        h += bx(30, 9, 1, 0, -10, 67.5, "plate", "", "b", pl);
        h += bx(6, 3, 6, -33, -26, -12, "dark") + bx(6, 3, 6, 33, -26, -12, "dark");
        h += wheel(-32, -13, -40, 26, 4) + wheel(32, -13, -40, 26, 4);
        h += wheel(-32, -13, 42, 26, 4) + wheel(32, -13, 42, 26, 4);
    }

    return `<div class="v" style="--c:${color || "#00d9ff"}">${h}</div>`;
}

const SCALE_BY_TYPE = { Car: 1.5, SUV: 1.4, Bike: 1.9 };
const ICON_BY_TYPE = { Car: "🚗", SUV: "🚙", Bike: "🏍️" };


/* =====================================================
   MINI 3D CITIES (location cards)
===================================================== */

function bld(w, h, d, x, z, color, cls) {
    return bx(w, h, d, x, -h / 2, z, (cls || "") + " win", "--c:" + color);
}

function cityHTML(kind) {

    let h = bx(150, 4, 110, 0, 2, 0, "dark");

    if (kind === "City") {

        h += bld(22, 90, 22, -45, -20, "#3a4f9e");
        h += bld(26, 120, 26, -15, -25, "#4a3a9e");
        h += bld(24, 70, 24, 20, -15, "#2f7fa8");
        h += bld(20, 100, 20, 50, -22, "#8a3f9e");
        h += bld(28, 50, 28, -30, 25, "#2a8f7a");
        h += bld(24, 60, 24, 10, 28, "#a8532f");
        h += bld(18, 40, 18, 45, 25, "#4a6fbf");
        h += bx(2, 24, 2, -15, -132, -25, "chrome");
        h += bx(5, 5, 5, -15, -146, -25, "tail");

    } else if (kind === "College") {

        h += bld(100, 36, 46, 0, 0, "#8d5fd3");
        h += bx(104, 5, 50, 0, -38.5, 0, "dark");
        for (let x = -40; x <= 40; x += 16) { h += bx(5, 30, 5, x, -15, 27, "chrome"); }
        h += bx(70, 4, 10, 0, -2, 33, "chrome");
        h += bld(22, 70, 22, 0, -5, "#b07af0");
        h += bx(26, 6, 26, 0, -73, -5, "dark");
        h += bx(2, 20, 2, 0, -86, -5, "chrome");
        h += bx(12, 7, 1, 6, -92, -5, "tail");

    } else if (kind === "Market") {

        const awn = ["#ff3cac", "#ffc53d", "#00d9ff", "#00f5a0", "#ff6b35", "#7c5cff"];
        let k = 0;

        [-40, 0, 40].forEach((x) => {
            [-24, 22].forEach((z) => {
                h += bx(30, 12, 20, x, -6, z, "", "--c:#8b5a2b");
                h += bx(34, 3, 26, x, -34, z, "awn", "--c:" + awn[k++ % awn.length] + ";--rx:-10deg");
                h += bx(2, 30, 2, x - 15, -15, z + 11, "chrome") + bx(2, 30, 2, x + 15, -15, z + 11, "chrome");
            });
        });

    } else {

        h += bx(110, 44, 60, 0, -22, 0, "", "--c:#2c3e75");
        h += bx(100, 30, 2, 0, -17, 31, "glass3");
        h += bx(60, 12, 4, 0, -50, 28, "lamp sign", "", "f", "MALL");
        h += bx(18, 22, 2, 0, -11, 31.5, "dark");
        h += bx(16, 8, 14, -34, -48, -8, "chrome") + bx(16, 8, 14, 34, -48, -8, "chrome");
        h += bx(120, 2, 22, 0, -1, 44, "", "--c:#3a4260");
    }

    return `<div class="mini-cam"><div class="mini-spin">${h}</div></div>`;
}


/* =====================================================
   ROAD SCENE (login hero + navigation)
===================================================== */

function createRoadScene(el, type, color, plate, withTraffic) {

    let w = "";

    for (let i = 0; i < 16; i++) {

        const z = 420 - i * 250;
        const p = i % 2;
        const bw = p ? 110 : 80;
        const bh = p ? 250 : 170;
        const cl = p ? "#2a3b8f" : "#4b2f8f";
        const cr = p ? "#4b2f8f" : "#1f6f9f";

        w += bx(bw, bh, 90, -(220 + bw / 2), 95 - bh / 2, z, "win", "--c:" + cl);
        w += bx(bw, bh, 90, 220 + bw / 2, 95 - bh / 2, z - 125, "win", "--c:" + cr);

        w += bx(4, 85, 4, -165, 95 - 42.5, z, "chrome");
        w += bx(4, 85, 4, 165, 95 - 42.5, z - 125, "chrome");
        w += bx(18, 4, 5, -157, 95 - 87, z, "lamp");
        w += bx(18, 4, 5, 157, 95 - 87, z - 125, "lamp");
    }

    let traffic = "";

    if (withTraffic !== false) {
        const cols = ["#ff3cac", "#ffc53d", "#7c5cff"];
        const types = ["Car", "SUV", "Bike"];

        traffic = cols.map((c, i) =>
            `<div class="traffic" style="animation-delay:${-i * 1.9}s;animation-duration:${5 + i * 0.7}s">${vehicleHTML(types[i], c, "")}</div>`
        ).join("");
    }

    el.classList.remove("arrived");

    el.innerHTML =
        `<div class="rs-sky"></div>` +
        `<div class="rs-dest">P</div>` +
        `<div class="rs-world">${w}<div class="rs-road"></div></div>` +
        `<div class="rs-fog"></div>` +
        `<div class="rs-fixed">${traffic}<div class="rs-car">${vehicleHTML(type, color, plate)}</div></div>`;
}


/* =====================================================
   BACKGROUND SKYLINE
===================================================== */

function buildSkyline(containerId, count, minH, maxH) {

    const parts = [];

    for (let i = 0; i < count; i++) {
        const w = 40 + Math.round(Math.random() * 70);
        const h = minH + Math.round(Math.random() * (maxH - minH));
        parts.push(`<i style="width:${w}px;height:${h}px"></i>`);
    }

    /* duplicated so the scroll loops seamlessly */
    $(containerId).innerHTML = parts.join("") + parts.join("");
}


/* =====================================================
   MOUSE EFFECTS (tilt cards, tilting parking lot)
===================================================== */

document.addEventListener("pointermove", function (e) {

    if (e.pointerType === "touch") { return; }

    const el = e.target.closest ? e.target.closest(".tilt") : null;

    if (el) {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;

        el.style.transform =
            `perspective(900px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 11).toFixed(2)}deg) translateZ(6px)`;
    }

    const wrap = $("lotWrap");

    if (wrap && currentPageId === "slotPage") {
        const rx = (e.clientX / window.innerWidth - 0.5) * 10;
        $("slotList").style.setProperty("--rz", rx.toFixed(2) + "deg");
    }
});

document.addEventListener("pointerout", function (e) {

    const el = e.target.closest ? e.target.closest(".tilt") : null;

    if (el && !el.contains(e.relatedTarget)) {
        el.style.transform = "";
    }
});


/* =====================================================
   LOGIN / SIGNUP
===================================================== */

function showSignup() {
    $("loginPage").classList.add("hidden");
    $("signupPage").classList.remove("hidden");
}

function showLogin() {
    $("signupPage").classList.add("hidden");
    $("loginPage").classList.remove("hidden");
}


/* ================= SIGNUP ================= */

$("signupForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const name = $("signupName").value.trim();
    const email = $("signupEmail").value.trim();
    const password = $("signupPassword").value;

    if (password.length < 6) {
        toast("Password must contain at least 6 characters.", "warn");
        return;
    }

    const existingUser = load("smartparkUser");

    if (existingUser && existingUser.email === email) {
        toast("Account already exists. Please login.", "warn");
        return;
    }

    store("smartparkUser", { name: name, email: email, password: password });

    toast("Account created successfully!", "ok");

    $("loginEmail").value = email;

    showLogin();
});


/* ================= LOGIN ================= */

$("loginForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const email = $("loginEmail").value.trim();
    const password = $("loginPassword").value;

    /* DEMO ACCOUNT */
    if (email === "demo@smartpark.com" && password === "123456") {
        currentUser = { name: "Demo User", email: email };
        openApp();
        return;
    }

    /* SAVED ACCOUNT */
    const savedUser = load("smartparkUser");

    if (savedUser && savedUser.email === email && savedUser.password === password) {
        currentUser = { name: savedUser.name, email: savedUser.email };
        openApp();
    } else {
        toast("Invalid email or password.", "err");
    }
});


/* =====================================================
   OPEN APP / LOGOUT
===================================================== */

function openApp() {

    try { sessionStorage.setItem("smartparkSession", JSON.stringify(currentUser)); } catch (e) { /* ignore */ }

    $("authPage").classList.add("hidden");
    $("appPage").classList.remove("hidden");
    $("userName").textContent = "👤 " + currentUser.name;

    const saved = load("smartparkVehicle");

    if (saved) {
        vehicle = Object.assign(vehicle, saved);
        $("carNumber").value = vehicle.number || "";
        $("carModel").value = vehicle.model || "";
    }

    renderColors();
    setType(vehicle.type || "Car");

    pageHistory = [];
    showPage("vehiclePage", false);
}

function logout() {

    currentUser = null;

    try { sessionStorage.removeItem("smartparkSession"); } catch (e) { /* ignore */ }
    try { localStorage.removeItem("smartparkSession"); } catch (e) { /* ignore */ }

    stopNavSim();

    $("appPage").classList.add("hidden");
    $("authPage").classList.remove("hidden");

    pageHistory = [];
    showPage("vehiclePage", false);
    showLogin();
}


/* =====================================================
   PAGE NAVIGATION + STEPPER
===================================================== */

const STEPS = ["Vehicle", "Location", "Parking", "Slot", "Time", "Pay", "Go"];

const PAGE_STEP = {
    vehiclePage: 0, locationPage: 1, parkingPage: 2, slotPage: 3,
    durationPage: 4, paymentPage: 5, confirmationPage: 6, navigationPage: 6
};

function renderSteps(index) {

    $("steps").innerHTML = STEPS.map(function (name, i) {
        const cls = i < index ? "done" : (i === index ? "now" : "");
        return `<div class="st ${cls}"><b>${i < index ? "✓" : i + 1}</b><span>${name}</span></div>`;
    }).join("");
}

function showPage(pageId, push) {

    if (push !== false && currentPageId && currentPageId !== pageId) {
        pageHistory.push(currentPageId);
    }

    currentPageId = pageId;

    if (pageId !== "navigationPage") { stopNavSim(); }

    document.querySelectorAll(".page").forEach(function (page) {
        page.classList.remove("active");
    });

    $(pageId).classList.add("active");

    renderSteps(PAGE_STEP[pageId]);

    window.scrollTo(0, 0);
}

function goBack() {

    const prev = pageHistory.pop();

    if (prev) { showPage(prev, false); }
}


/* =====================================================
   VEHICLE
===================================================== */

function renderColors() {

    $("colorRow").innerHTML = COLORS.map(function (c) {
        return `<button type="button" class="swatch ${c === vehicle.color ? "on" : ""}" style="--sw:${c}" onclick="pickColor('${c}')" aria-label="Paint ${c}"></button>`;
    }).join("");
}

function pickColor(color) {
    vehicle.color = color;
    renderColors();
    renderShowroom();
}

function setType(type) {

    vehicle.type = type;
    $("vehicleType").value = type;

    document.querySelectorAll(".chip").forEach(function (chip) {
        chip.classList.toggle("on", chip.dataset.type === type);
    });

    renderShowroom();
}

function renderShowroom() {

    const type = vehicle.type || "Car";

    $("showroomStage").innerHTML = vehicleHTML(type, vehicle.color, $("carNumber").value.toUpperCase());
    $("showCam").style.setProperty("--sc", SCALE_BY_TYPE[type] || 1.5);
    $("showroomTag").textContent = (ICON_BY_TYPE[type] || "🚗") + " " + type;
}

$("carNumber").addEventListener("input", function () {
    this.value = this.value.toUpperCase();
    renderShowroom();
});

function saveVehicle() {

    const number = $("carNumber").value.trim().toUpperCase();
    const model = $("carModel").value.trim();
    const type = $("vehicleType").value;

    if (!number || !model || !type) {
        toast("Please enter all vehicle details.", "warn");
        return;
    }

    vehicle.number = number;
    vehicle.model = model;
    vehicle.type = type;

    store("smartparkVehicle", vehicle);

    showPage("locationPage");
}


/* =====================================================
   CURRENT LOCATION
===================================================== */

function useCurrentLocation() {

    const status = $("currentLocationStatus");

    if (!navigator.geolocation) {
        status.innerText = "❌ Geolocation is not supported by this browser.";
        return;
    }

    status.innerText = "📍 Detecting your current location...";

    navigator.geolocation.getCurrentPosition(

        function (position) {

            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;

            status.innerHTML =
                `✅ Current location detected.<br>
                Latitude: ${currentLatitude.toFixed(5)}
                <br>
                Longitude: ${currentLongitude.toFixed(5)}`;

            /* Prototype behaviour: opens the City list. A real app would query
               a live parking API using these coordinates. */
            selectLocation("City");
        },

        function (error) {

            if (error.code === error.PERMISSION_DENIED) {
                status.innerText = "❌ Location permission was denied. Please allow location access.";
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                status.innerText = "❌ Current location is unavailable.";
            } else {
                status.innerText = "❌ Unable to detect your location.";
            }
        },

        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}


/* =====================================================
   LOCATION
===================================================== */

function selectLocation(location) {

    selectedLocation = location;

    $("selectedLocationText").innerText = "Selected Location: " + location;

    displayParkingLocations();

    showPage("parkingPage");
}


/* =====================================================
   PARKING DATA
===================================================== */

const parkingLocations = {

    City: [
        { name: "City Open Ground", address: "Main Road", type: "Free", fee: 0, slots: 20 },
        { name: "City Municipal Parking", address: "City Center", type: "Paid", fee: 20, slots: 30 }
    ],

    College: [
        { name: "College Ground", address: "College Road", type: "Free", fee: 0, slots: 15 },
        { name: "College Paid Parking", address: "Near College Gate", type: "Paid", fee: 10, slots: 20 }
    ],

    Market: [
        { name: "Market Open Area", address: "Market Road", type: "Free", fee: 0, slots: 12 },
        { name: "Market Parking Zone", address: "Main Market", type: "Paid", fee: 15, slots: 25 }
    ],

    Mall: [
        { name: "Mall Parking", address: "Central Mall", type: "Paid", fee: 30, slots: 40 },
        { name: "Mall Open Ground", address: "Outside Mall", type: "Free", fee: 0, slots: 10 }
    ]
};

/* every 7th slot is shown as occupied (demo data) */
function occupiedCount(slots) { return Math.floor(slots / 7); }


/* =====================================================
   DISPLAY PARKING
===================================================== */

function displayParkingLocations() {

    const locations = parkingLocations[selectedLocation];

    $("parkingList").innerHTML = locations.map(function (parking, index) {

        const free = parking.slots - occupiedCount(parking.slots);
        const pct = Math.round((free / parking.slots) * 100);

        const badge = parking.type === "Free"
            ? `<span class="free-badge">FREE</span>`
            : `<span class="paid-badge">PAID - ₹${parking.fee}/hour</span>`;

        return `
            <div class="parking-card glass tilt" style="--i:${index}">
                <div class="p-sign">P</div>
                <div class="p-info">
                    <h3>${esc(parking.name)}</h3>
                    <p>📍 ${esc(parking.address)}</p>
                    <div class="meter"><span style="width:${pct}%"></span></div>
                    <p>${free} of ${parking.slots} slots free</p>
                    ${badge}
                </div>
                <button class="btn" onclick="selectParking(${index})">Select Parking →</button>
            </div>`;
    }).join("");
}


/* =====================================================
   SELECT PARKING
===================================================== */

function selectParking(index) {

    selectedParking = parkingLocations[selectedLocation][index];
    selectedSlot = null;

    $("selectedParkingText").innerHTML =
        `Parking: <strong>${esc(selectedParking.name)}</strong> &nbsp;·&nbsp; Type: <strong>${selectedParking.type}</strong>`;

    displaySlots();
    showPage("slotPage");
}


/* =====================================================
   PARKING SLOTS (3D lot with parked cars)
===================================================== */

const OCC_TYPES = ["Car", "SUV", "Bike"];
const OCC_COLORS = ["#ff3b4e", "#ffc53d", "#7c5cff", "#e8ecf5", "#ff6b35", "#3d7bff", "#ff3cac"];

function displaySlots() {

    const n = selectedParking.slots;
    const mobile = window.innerWidth < 700;
    const cols = mobile ? (n <= 15 ? 3 : 4) : (n <= 15 ? 5 : 8);

    const list = $("slotList");

    list.style.setProperty("--cols", cols);
    list.style.setProperty("--rz", "0deg");

    let html = "";

    for (let i = 1; i <= n; i++) {

        const occupied = i % 7 === 0;

        let car = "";

        if (occupied) {
            const plate = "MH12 " + String.fromCharCode(65 + (i % 26)) + String.fromCharCode(65 + ((i * 3) % 26)) + " " + (1000 + ((i * 137) % 9000));
            car = `<div class="vwrap">${vehicleHTML(OCC_TYPES[i % 3], OCC_COLORS[i % OCC_COLORS.length], plate)}</div>`;
        }

        html += `<div class="bay ${occupied ? "occ" : "free"}" data-slot="${i}">` +
            `<span class="no">P-${i}</span>${occupied ? '<span class="tag">TAKEN</span>' : ""}${car}</div>`;
    }

    list.innerHTML = html;

    updateSlotHud();
}

function updateSlotHud() {

    const n = selectedParking.slots;
    const occ = occupiedCount(n);

    $("slotHud").innerHTML =
        `<span class="pill g">🟢 Free: ${n - occ}</span>` +
        `<span class="pill r">🔴 Taken: ${occ}</span>` +
        `<span class="pill c">🎯 ${selectedSlot ? "Selected: P-" + selectedSlot : "Tap a green slot"}</span>`;
}

$("slotList").addEventListener("click", function (e) {

    const bay = e.target.closest(".bay");

    if (!bay) { return; }

    if (bay.classList.contains("occ")) {
        toast("That slot is already taken.", "warn");
        return;
    }

    selectSlot(Number(bay.dataset.slot), bay);
});


/* =====================================================
   SELECT SLOT
===================================================== */

function selectSlot(slotNumber, element) {

    document.querySelectorAll("#slotList .bay.sel").forEach(function (b) { b.classList.remove("sel"); });
    document.querySelectorAll("#slotList .vwrap.mine").forEach(function (v) { v.remove(); });

    element.classList.add("sel");

    element.insertAdjacentHTML(
        "beforeend",
        `<div class="vwrap mine">${vehicleHTML(vehicle.type, vehicle.color, vehicle.number)}</div>`
    );

    selectedSlot = slotNumber;

    updateSlotHud();
}


/* =====================================================
   DURATION
===================================================== */

function goToDuration() {

    if (!selectedSlot) {
        toast("Please select an available parking slot.", "warn");
        return;
    }

    renderDurations();

    showPage("durationPage");
}

function renderDurations() {

    const options = [3, 5, 7, 12, 24];

    $("durationGrid").innerHTML = options.map(function (hours, i) {

        const price = selectedParking.type === "Free" ? "FREE" : "₹" + (selectedParking.fee * hours);

        return `
            <button class="dur-card glass tilt" style="--i:${i}" onclick="selectDuration(${hours})">
                <div class="dur-ring" style="--p:${Math.round((hours / 24) * 100)}"><span>${hours}</span></div>
                <span class="dur-unit">Hours</span>
                <span class="dur-price">${price}</span>
            </button>`;
    }).join("");
}

function selectDuration(hours) {

    selectedDuration = hours;

    showPaymentPage();
}


/* =====================================================
   FEE CALCULATION
===================================================== */

function calculateParkingFee() {

    if (!selectedParking) { return 0; }

    if (selectedParking.type === "Free") { return 0; }

    return selectedParking.fee * selectedDuration;
}


/* =====================================================
   PAYMENT PAGE
===================================================== */

function showPaymentPage() {

    const amount = calculateParkingFee();

    selectedPayment = "";

    document.querySelectorAll(".pay-tile").forEach(function (b) { b.classList.remove("selected"); });

    const coin = `<div class="coin-wrap"><div class="coin"><i>₹</i><i>₹</i><i></i></div></div>`;

    if (amount === 0) {

        $("paymentAmount").innerHTML = `
            ${coin}
            <h2>FREE PARKING</h2>
            <p>Parking at this location is free.</p>
            <h3>Amount: ₹0</h3>`;

        $("paymentOptions").classList.add("hidden");
        $("freeParkingBox").classList.remove("hidden");

    } else {

        $("paymentAmount").innerHTML = `
            ${coin}
            <h2>Parking Fee</h2>
            <p>${esc(selectedParking.name)}</p>
            <p>Rate: ₹${selectedParking.fee}/hour</p>
            <p>Duration: ${selectedDuration} hours</p>
            <h2>Total: ₹${amount}</h2>`;

        $("paymentOptions").classList.remove("hidden");
        $("freeParkingBox").classList.add("hidden");
    }

    showPage("paymentPage");
}


/* =====================================================
   PAYMENT METHOD
===================================================== */

function selectPayment(method) {

    selectedPayment = method;

    document.querySelectorAll(".pay-tile").forEach(function (button) {
        button.classList.toggle("selected", button.dataset.method === method);
    });
}


/* =====================================================
   PAID PAYMENT
===================================================== */

function confirmPayment() {

    if (!selectedPayment) {
        toast("Please select a payment method.", "warn");
        return;
    }

    const btn = $("payBtn");
    const amount = calculateParkingFee();

    btn.disabled = true;
    btn.textContent = "Processing...";

    setTimeout(function () {

        btn.disabled = false;
        btn.textContent = "Confirm Payment";

        toast("Payment of ₹" + amount + " successful!", "ok");

        showConfirmation(amount);

    }, 1200);
}


/* =====================================================
   FREE PAYMENT
===================================================== */

function confirmFreeParking() {
    showConfirmation(0);
}


/* =====================================================
   BOOKING CONFIRMATION
===================================================== */

function showConfirmation(amount) {

    const paymentText = amount === 0 ? "No Payment Required" : `${esc(selectedPayment)} - ₹${amount}`;

    bookingId = "SP-" + Math.random().toString(36).slice(2, 8).toUpperCase();

    const bars = Array.from({ length: 36 }, function (_, i) {
        return `<i style="width:${1 + ((bookingId.charCodeAt(i % bookingId.length) + i) % 4)}px"></i>`;
    }).join("");

    $("confirmStage").innerHTML = vehicleHTML(vehicle.type, vehicle.color, vehicle.number);
    $("confirmCam").style.setProperty("--sc", ((SCALE_BY_TYPE[vehicle.type] || 1.5) * 0.72).toFixed(2));

    $("bookingDetails").innerHTML = `
        <div class="tk-row"><span>Booking ID</span><b>${bookingId}</b></div>
        <div class="tk-row"><span>Vehicle</span><b>${esc(vehicle.number)} - ${esc(vehicle.model)}</b></div>
        <div class="tk-row"><span>Vehicle Type</span><b>${esc(vehicle.type)}</b></div>
        <div class="tk-row"><span>Parking</span><b>${esc(selectedParking.name)}</b></div>
        <div class="tk-row"><span>Parking Type</span><b>${esc(selectedParking.type)}</b></div>
        <div class="tk-row"><span>Slot</span><b>P-${selectedSlot}</b></div>
        <div class="tk-row"><span>Duration</span><b>${selectedDuration} hours</b></div>
        <div class="tk-row"><span>Payment</span><b>${paymentText}</b></div>
        <div class="tk-row"><span>Status</span><b style="color:var(--green)">Confirmed</b></div>
        <div class="barcode">${bars}</div>`;

    showPage("confirmationPage");

    /* booking is done - back button should not return to payment */
    pageHistory = [];

    confetti();
}

function confetti() {

    const colors = ["#00f5a0", "#00d9ff", "#ff3cac", "#ffc53d", "#7c5cff"];

    for (let i = 0; i < 70; i++) {

        const c = document.createElement("div");

        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = colors[i % colors.length];
        c.style.setProperty("--dx", (Math.random() * 200 - 100) + "px");
        c.style.animationDuration = (2.2 + Math.random() * 2) + "s";
        c.style.animationDelay = (Math.random() * 0.6) + "s";

        document.body.appendChild(c);

        setTimeout(function () { c.remove(); }, 5200);
    }
}


/* =====================================================
   NAVIGATION (3D drive simulation)
===================================================== */

function goToNavigation() {

    $("navigationText").innerHTML =
        `Navigate to <strong>${esc(selectedParking.name)}</strong> at ${esc(selectedParking.address)}.<br>` +
        `Your parking slot is <strong>P-${selectedSlot}</strong>. <small>(Drive view is a simulation.)</small>`;

    createRoadScene($("navScene"), vehicle.type, vehicle.color, vehicle.number, true);

    showPage("navigationPage");

    startNavSim();
}

function startNavSim() {

    stopNavSim();

    let dist = 1.2;

    $("navDist").textContent = dist.toFixed(2) + " km";
    $("navStatus").textContent = "Driving...";
    $("navSpeed").textContent = "40 km/h";

    navTimer = setInterval(function () {

        dist = Math.max(0, dist - 0.025);

        $("navSpeed").textContent = Math.round(28 + Math.random() * 22) + " km/h";
        $("navDist").textContent = dist.toFixed(2) + " km";

        if (dist <= 0) {

            $("navSpeed").textContent = "0 km/h";
            $("navStatus").textContent = "Arrived at P-" + selectedSlot;
            $("navScene").classList.add("arrived");

            stopNavSim();

            toast("🎉 You have arrived!", "ok");
        }

    }, 600);
}

function stopNavSim() {

    if (navTimer) {
        clearInterval(navTimer);
        navTimer = null;
    }
}


/* =====================================================
   GOOGLE MAPS
===================================================== */

function openMaps() {

    const place = encodeURIComponent(selectedParking.name + ", " + selectedParking.address);

    let mapsURL;

    if (currentLatitude !== null && currentLongitude !== null) {
        mapsURL = `https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${place}`;
    } else {
        mapsURL = `https://www.google.com/maps/search/?api=1&query=${place}`;
    }

    window.open(mapsURL, "_blank", "noopener");
}


/* =====================================================
   NEW SEARCH
===================================================== */

function newSearch() {

    selectedParking = null;
    selectedSlot = null;
    selectedDuration = 0;
    selectedPayment = "";

    pageHistory = ["vehiclePage"];

    showPage("locationPage", false);
}


/* =====================================================
   INIT
===================================================== */

(function init() {

    buildSkyline("skyFar", 26, 90, 230);
    buildSkyline("skyNear", 22, 60, 170);

    document.querySelectorAll(".mini[data-kind]").forEach(function (m) {
        m.innerHTML = cityHTML(m.dataset.kind);
    });

    /* login screen hero: a random vehicle drives down the road */
    const types = ["Car", "SUV", "Bike"];

    createRoadScene(
        $("heroScene"),
        types[Math.floor(Math.random() * types.length)],
        COLORS[Math.floor(Math.random() * COLORS.length)],
        "SMART 01",
        true
    );

    renderSteps(0);

    /* restore session after refresh */
    const session = load("smartparkSession", sessionStorage);

    if (session && session.email) {
        currentUser = session;
        openApp();
    }

})();
