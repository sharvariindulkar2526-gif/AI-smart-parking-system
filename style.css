/* =====================================================
   SMARTPARK 3D  -  pure CSS 3D (no libraries)
===================================================== */

:root {
    --bg: #060a18;
    --ink: #eaf2ff;
    --muted: #9fb0cf;
    --line: rgba(255, 255, 255, 0.14);
    --green: #00f5a0;
    --cyan: #00d9ff;
    --pink: #ff3cac;
    --amber: #ffc53d;
    --red: #ff4d6d;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
    font-family: 'Rajdhani', 'Segoe UI', system-ui, sans-serif;
    font-size: 17px;
    font-weight: 500;
    color: var(--ink);
    background: var(--bg);
    min-height: 100vh;
    overflow-x: hidden;
}

h1, h2, h3, .logo, .header-logo { font-family: 'Orbitron', 'Rajdhani', sans-serif; letter-spacing: .5px; }

.hidden { display: none !important; }

/* =====================================================
   ANIMATED BACKGROUND
===================================================== */

#bg {
    position: fixed; inset: 0; z-index: -1; overflow: hidden;
    perspective: 420px;
    background: linear-gradient(#050816 0%, #0d1235 45%, #241049 72%, #4a1a62 100%);
}

#bg .stars {
    position: absolute; inset: 0 0 40% 0; opacity: .8;
    background-image:
        radial-gradient(1.5px 1.5px at 20px 30px, #fff, transparent),
        radial-gradient(1px 1px at 90px 80px, #cfe, transparent),
        radial-gradient(1.5px 1.5px at 150px 20px, #fff, transparent),
        radial-gradient(1px 1px at 60px 140px, #fff, transparent);
    background-size: 200px 180px;
    animation: twinkle 4s ease-in-out infinite alternate;
}
@keyframes twinkle { to { opacity: .35; } }

.orb { position: absolute; border-radius: 50%; filter: blur(70px); animation: floatOrb 14s ease-in-out infinite alternate; }
.o1 { width: 380px; height: 380px; background: var(--green); left: -120px; top: 10%; opacity: .2; }
.o2 { width: 460px; height: 460px; background: #7c5cff; right: -160px; top: 0; opacity: .3; animation-delay: -6s; }
@keyframes floatOrb { to { transform: translate(60px, 40px); } }

.sky-layer {
    position: absolute; left: 0; bottom: 33%;
    display: flex; align-items: flex-end; width: max-content;
    animation: skyScroll 90s linear infinite;
}
.sky-layer.far { bottom: 35%; opacity: .55; animation-duration: 150s; }
.sky-layer i {
    display: block; flex: none; margin-right: 5px;
    background-color: #131a48;
    background-image:
        repeating-linear-gradient(0deg, rgba(255,214,120,.38) 0 3px, transparent 3px 14px),
        repeating-linear-gradient(90deg, transparent 0 8px, rgba(5,8,25,.85) 8px 11px);
}
.sky-layer.far i { background-color: #1d2562; }
@keyframes skyScroll { to { transform: translateX(-50%); } }

.floor {
    position: absolute; left: -60%; width: 220%; bottom: -6%; height: 46%;
    transform-origin: 50% 100%;
    transform: rotateX(68deg);
    background:
        repeating-linear-gradient(90deg, rgba(0,245,160,.45) 0 2px, transparent 2px 90px),
        repeating-linear-gradient(0deg, rgba(0,217,255,.45) 0 2px, transparent 2px 90px),
        linear-gradient(#10163a, #070a1c);
    animation: floorMove 1.6s linear infinite;
    -webkit-mask-image: linear-gradient(to top, #000 25%, transparent);
            mask-image: linear-gradient(to top, #000 25%, transparent);
}
@keyframes floorMove { to { background-position: 0 0, 0 90px, 0 0; } }

.vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(2,4,14,.7)); }

/* =====================================================
   GENERIC UI
===================================================== */

.glass {
    background: linear-gradient(145deg, rgba(255,255,255,.11), rgba(255,255,255,.03));
    border: 1px solid var(--line);
    -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
    border-radius: 22px;
    box-shadow: 0 20px 60px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.16);
}

.btn {
    font: inherit; font-weight: 700; letter-spacing: .6px;
    border: 0; cursor: pointer; padding: 13px 22px; border-radius: 14px;
    color: #04120d;
    background: linear-gradient(135deg, var(--green), var(--cyan));
    box-shadow: 0 8px 24px rgba(0,245,160,.32), inset 0 -3px 0 rgba(0,0,0,.18);
    transition: transform .15s, box-shadow .15s, filter .15s;
    position: relative; overflow: hidden;
}
.btn::after {
    content: ""; position: absolute; top: 0; left: -80%; width: 50%; height: 100%;
    background: linear-gradient(100deg, transparent, rgba(255,255,255,.45), transparent);
    transform: skewX(-20deg); transition: left .5s;
}
.btn:hover { transform: translateY(-2px) scale(1.02); filter: brightness(1.08); box-shadow: 0 14px 34px rgba(0,245,160,.45), inset 0 -3px 0 rgba(0,0,0,.18); }
.btn:hover::after { left: 130%; }
.btn:active { transform: translateY(1px) scale(.98); }
.btn[disabled] { opacity: .6; pointer-events: none; }
.btn.ghost { background: rgba(255,255,255,.08); color: var(--ink); border: 1px solid var(--line); box-shadow: none; }
.btn.danger { background: linear-gradient(135deg, #ff4d6d, #ff8a5c); color: #fff; box-shadow: 0 8px 24px rgba(255,77,109,.3); }
.btn.sm { padding: 9px 16px; font-size: 15px; }
.btn.block { width: 100%; }
.btn.blue { background: linear-gradient(135deg, #3d7bff, #00d9ff); color: #fff; box-shadow: 0 8px 24px rgba(61,123,255,.4); }

.link { background: none; border: 0; color: var(--green); font: inherit; font-weight: 700; cursor: pointer; }
.link:hover { text-decoration: underline; }

.field { display: block; width: 100%; }
.field input, .field select, input.field {
    width: 100%; padding: 14px 16px; margin: 7px 0;
    font: inherit; font-size: 17px; color: var(--ink);
    background: rgba(5,8,25,.55); border: 1px solid var(--line); border-radius: 12px; outline: none;
    transition: border-color .2s, box-shadow .2s;
}
.field input::placeholder { color: #7587ab; }
.field input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(0,245,160,.18); }

.tilt { transform-style: preserve-3d; transition: transform .2s ease-out, box-shadow .2s; will-change: transform; }

.page-title { font-size: clamp(26px, 4.2vw, 42px); text-align: center; margin-bottom: 8px; text-shadow: 0 0 24px rgba(0,217,255,.5); }
.sub { text-align: center; color: var(--muted); margin-bottom: 28px; font-size: 19px; }
.back { margin-bottom: 14px; }
.center { text-align: center; }

/* toasts */
#toasts { position: fixed; top: 16px; left: 50%; transform: translateX(-50%); z-index: 99; display: grid; gap: 10px; width: min(92vw, 420px); }
.toast {
    padding: 13px 18px; border-radius: 14px; font-weight: 700; text-align: center;
    background: rgba(10,16,45,.92); border: 1px solid var(--line); box-shadow: 0 10px 30px rgba(0,0,0,.5);
    animation: toastIn .35s cubic-bezier(.2,.9,.3,1.3) both;
}
.toast.ok { border-color: var(--green); color: var(--green); }
.toast.warn { border-color: var(--amber); color: var(--amber); }
.toast.err { border-color: var(--red); color: #ff8da1; }
.toast.out { animation: toastOut .3s ease both; }
@keyframes toastIn { from { opacity: 0; transform: translateY(-20px) scale(.9); } }
@keyframes toastOut { to { opacity: 0; transform: translateY(-16px) scale(.95); } }

/* =====================================================
   3D ENGINE  (boxes, wheels, vehicles)
===================================================== */

.v { position: relative; width: 0; height: 0; transform-style: preserve-3d; }

.box {
    position: absolute; left: 0; top: 0; width: 0; height: 0;
    transform-style: preserve-3d;
    transform: translate3d(calc(var(--x, 0) * 1px), calc(var(--y, 0) * 1px), calc(var(--z, 0) * 1px)) rotateX(var(--rx, 0deg));
}
.box > i {
    --sh: transparent;
    position: absolute; left: 0; top: 0; display: block;
    backface-visibility: hidden;
    background: linear-gradient(var(--sh), var(--sh)), var(--c, #4a90ff);
}
.box > .f { --sh: rgba(0,0,0,.10); width: calc(var(--w) * 1px); height: calc(var(--h) * 1px); margin: calc(var(--h) * -.5px) 0 0 calc(var(--w) * -.5px); transform: translateZ(calc(var(--d) * .5px)); }
.box > .b { --sh: rgba(0,0,0,.32); width: calc(var(--w) * 1px); height: calc(var(--h) * 1px); margin: calc(var(--h) * -.5px) 0 0 calc(var(--w) * -.5px); transform: rotateY(180deg) translateZ(calc(var(--d) * .5px)); }
.box > .r { --sh: rgba(0,0,0,.22); width: calc(var(--d) * 1px); height: calc(var(--h) * 1px); margin: calc(var(--h) * -.5px) 0 0 calc(var(--d) * -.5px); transform: rotateY(90deg) translateZ(calc(var(--w) * .5px)); }
.box > .l { --sh: rgba(0,0,0,.40); width: calc(var(--d) * 1px); height: calc(var(--h) * 1px); margin: calc(var(--h) * -.5px) 0 0 calc(var(--d) * -.5px); transform: rotateY(-90deg) translateZ(calc(var(--w) * .5px)); }
.box > .t { --sh: rgba(255,255,255,.16); width: calc(var(--w) * 1px); height: calc(var(--d) * 1px); margin: calc(var(--d) * -.5px) 0 0 calc(var(--w) * -.5px); transform: rotateX(90deg) translateZ(calc(var(--h) * .5px)); }
.box > .u { --sh: rgba(0,0,0,.6); width: calc(var(--w) * 1px); height: calc(var(--d) * 1px); margin: calc(var(--d) * -.5px) 0 0 calc(var(--w) * -.5px); transform: rotateX(-90deg) translateZ(calc(var(--h) * .5px)); }

.chrome > i { --c: #b9c4d8; }
.dark > i   { --c: #151825; }
.glass3 > i { --c: rgba(140,220,255,.55); }
.lamp > i   { --c: #fff3a8; box-shadow: 0 0 12px 3px rgba(255,240,150,.8); }
.tail > i   { --c: #ff2d55; box-shadow: 0 0 10px 2px rgba(255,45,85,.85); }
.plate > i  { --c: #f5f5f0; }
.plate > .b { color: #111; font: 700 5.5px/9px 'Orbitron', sans-serif; text-align: center; white-space: nowrap; overflow: hidden; }
.sign > .f  { display: flex; align-items: center; justify-content: center; font: 800 9px 'Orbitron', sans-serif; color: #201400; }

.win > i {
    background:
        linear-gradient(var(--sh), var(--sh)),
        repeating-linear-gradient(90deg, transparent 0 8px, rgba(0,0,0,.4) 8px 10px),
        repeating-linear-gradient(0deg, rgba(255,226,140,.85) 0 5px, transparent 5px 12px),
        var(--c);
}
.win > .t, .win > .u { background: var(--c); }
.awn > .t, .awn > .f { background: repeating-linear-gradient(90deg, var(--c) 0 6px, #fff 6px 12px); }

/* wheels */
.wheel { position: absolute; left: 0; top: 0; width: 0; height: 0; transform-style: preserve-3d; transform: translate3d(calc(var(--x) * 1px), calc(var(--y) * 1px), calc(var(--z) * 1px)); }
.spin { position: absolute; left: 0; top: 0; width: 0; height: 0; transform-style: preserve-3d; }
.disc {
    position: absolute; left: 0; top: 0;
    width: calc(var(--s) * 1px); height: calc(var(--s) * 1px);
    margin: calc(var(--s) * -.5px) 0 0 calc(var(--s) * -.5px);
    border-radius: 50%; background: #14161d;
    transform: rotateY(90deg) translateZ(calc(var(--t) * 1px));
}
.disc.rim {
    background:
        radial-gradient(circle, #e9eef7 0 17%, transparent 18%),
        repeating-conic-gradient(#aeb8c9 0 14deg, #262b38 14deg 28deg);
    box-shadow: inset 0 0 0 calc(var(--s) * .17px) #14161d;
}
.rolling .spin { animation: spin .5s linear infinite; }
@keyframes spin { to { transform: rotateX(360deg); } }

/* neon underglow */
.under {
    position: absolute; left: 0; top: 0;
    width: calc(var(--uw) * 1px); height: calc(var(--ud) * 1px);
    margin: calc(var(--ud) * -.5px) 0 0 calc(var(--uw) * -.5px);
    border-radius: 50%;
    background: radial-gradient(ellipse, var(--c) 0%, transparent 68%);
    opacity: .65;
    transform: rotateX(90deg) translateZ(1px);
}

@keyframes turn { to { transform: rotateY(360deg); } }

/* =====================================================
   AUTH
===================================================== */

.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.auth-wrap { width: 100%; max-width: 1100px; display: grid; grid-template-columns: 1.15fr .85fr; gap: 34px; align-items: center; }

.hero .road-scene { height: 340px; border-radius: 26px; box-shadow: 0 25px 70px rgba(0,0,0,.55), 0 0 0 1px var(--line); }
.hero-copy { margin-top: 22px; }
.hero-copy h1 { font-size: clamp(26px, 3.6vw, 44px); line-height: 1.15; }
.hero-copy h1 span { background: linear-gradient(90deg, var(--green), var(--cyan), var(--pink)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.hero-copy p { color: var(--muted); margin: 12px 0 14px; font-size: 19px; }
.chips { display: flex; gap: 10px; flex-wrap: wrap; }
.chips span { padding: 6px 14px; border-radius: 99px; background: rgba(255,255,255,.08); border: 1px solid var(--line); font-weight: 700; font-size: 15px; }

.auth-box { padding: 34px 30px; text-align: center; animation: pageIn .6s cubic-bezier(.2,.8,.2,1) both; }
.logo { font-size: 30px; font-weight: 800; color: var(--green); margin-bottom: 12px; text-shadow: 0 0 20px rgba(0,245,160,.6); }
.auth-box h2 { margin-bottom: 6px; }
.auth-box p { color: var(--muted); margin: 6px 0 14px; }
.auth-box .btn { margin-top: 10px; }
.demo { font-size: 14px; opacity: .85; }

/* =====================================================
   HEADER + STEPPER
===================================================== */

header {
    position: sticky; top: 0; z-index: 20;
    display: flex; align-items: center; justify-content: space-between; gap: 14px;
    padding: 12px 4%;
    background: rgba(6,10,28,.72);
    -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--line);
}
.header-logo { font-size: 22px; font-weight: 800; color: var(--green); text-shadow: 0 0 16px rgba(0,245,160,.5); white-space: nowrap; }
.header-right { display: flex; align-items: center; gap: 12px; }
.user-pill { padding: 6px 14px; border-radius: 99px; background: rgba(255,255,255,.08); border: 1px solid var(--line); font-weight: 700; font-size: 15px; max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.steps { display: flex; align-items: center; gap: 6px; flex: 1; justify-content: center; }
.steps .st { display: flex; align-items: center; gap: 6px; color: #5f7196; font-size: 14px; font-weight: 700; }
.steps .st b { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; background: rgba(255,255,255,.07); border: 1px solid var(--line); }
.steps .st::after { content: ""; width: 18px; height: 2px; background: rgba(255,255,255,.12); }
.steps .st:last-child::after { display: none; }
.steps .st.done { color: var(--green); }
.steps .st.done b { background: var(--green); color: #04120d; border-color: transparent; }
.steps .st.done::after { background: var(--green); }
.steps .st.now { color: #fff; }
.steps .st.now b { background: var(--cyan); color: #04120d; box-shadow: 0 0 14px var(--cyan); animation: pulse 1.4s infinite; }
@keyframes pulse { 50% { transform: scale(1.18); } }

/* =====================================================
   PAGES
===================================================== */

main { max-width: 1100px; margin: 0 auto; padding: 0 18px; }
.page { display: none; padding: 30px 0 70px; min-height: calc(100vh - 66px); }
.page.active { display: block; animation: pageIn .65s cubic-bezier(.2,.8,.2,1) both; }
@keyframes pageIn { from { opacity: 0; transform: perspective(1200px) translate3d(70px, 0, -120px) rotateY(-14deg); } to { opacity: 1; transform: none; } }

/* ---------- VEHICLE ---------- */
.vehicle-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 26px; align-items: stretch; }

.showroom {
    position: relative; min-height: 400px; overflow: hidden; perspective: 1100px;
    border-radius: 24px; border: 1px solid var(--line);
    background: radial-gradient(ellipse at 50% 85%, rgba(0,245,160,.18), transparent 60%), linear-gradient(#0a1030, #10173f);
    box-shadow: 0 20px 60px rgba(0,0,0,.45);
}
.showroom .cam {
    position: absolute; left: 50%; top: 62%; width: 0; height: 0;
    transform-style: preserve-3d;
    transform: rotateX(-20deg) scale3d(var(--sc, 1.5), var(--sc, 1.5), var(--sc, 1.5));
}
.turntable { transform-style: preserve-3d; animation: turn 10s linear infinite; }
.platform {
    position: absolute; left: 0; top: 0; width: 270px; height: 270px; margin: -135px 0 0 -135px; border-radius: 50%;
    transform: rotateX(90deg) translateZ(-1px);
    background:
        radial-gradient(circle, rgba(0,245,160,.25) 0 32%, transparent 33%),
        repeating-radial-gradient(circle, rgba(0,217,255,.55) 0 2px, transparent 2px 22px),
        conic-gradient(from 0deg, rgba(0,245,160,.0), rgba(0,245,160,.55), rgba(255,60,172,.0) 55%, rgba(255,60,172,.5), rgba(0,245,160,0));
    box-shadow: 0 0 60px rgba(0,245,160,.35);
}
.showroom-tag { position: absolute; left: 16px; bottom: 14px; padding: 6px 14px; border-radius: 99px; background: rgba(0,0,0,.4); border: 1px solid var(--line); font-weight: 700; }

.form-card { padding: 28px; }
.form-card h3 { margin-bottom: 4px; }
.form-card .lbl { display: block; margin: 12px 0 4px; color: var(--muted); font-weight: 700; font-size: 15px; letter-spacing: .5px; text-transform: uppercase; }
.type-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.chip {
    font: inherit; font-weight: 700; cursor: pointer; padding: 12px 6px; border-radius: 14px; color: var(--ink);
    background: rgba(255,255,255,.06); border: 1px solid var(--line); transition: .2s;
}
.chip:hover { transform: translateY(-2px); border-color: var(--cyan); }
.chip.on { background: linear-gradient(135deg, rgba(0,245,160,.25), rgba(0,217,255,.25)); border-color: var(--green); box-shadow: 0 0 18px rgba(0,245,160,.3); }
.color-row { display: flex; gap: 10px; flex-wrap: wrap; margin: 6px 0 12px; }
.swatch { width: 34px; height: 34px; border-radius: 50%; border: 3px solid transparent; background: var(--sw); cursor: pointer; transition: .2s; box-shadow: 0 0 12px var(--sw); }
.swatch:hover { transform: scale(1.15); }
.swatch.on { border-color: #fff; transform: scale(1.18); }

/* ---------- LOCATION ---------- */
.current-location-btn { display: block; margin: 0 auto 10px; padding: 15px 28px; }
#currentLocationStatus { min-height: 26px; margin-bottom: 20px; text-align: center; font-weight: 700; color: var(--cyan); }

.location-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; max-width: 760px; margin: 0 auto; }
.loc-card { font: inherit; color: var(--ink); cursor: pointer; padding: 14px 14px 20px; text-align: center; }
.loc-card:hover { border-color: var(--green); box-shadow: 0 25px 60px rgba(0,0,0,.5), 0 0 30px rgba(0,245,160,.25); }
.loc-name { display: block; font: 700 19px 'Orbitron', sans-serif; margin-top: 4px; }
.loc-card small { color: var(--muted); font-size: 15px; }

.mini { position: relative; height: 170px; perspective: 700px; overflow: hidden; border-radius: 16px; background: radial-gradient(ellipse at 50% 90%, rgba(0,217,255,.2), transparent 65%); }
.mini-cam { position: absolute; left: 50%; top: 74%; width: 0; height: 0; transform-style: preserve-3d; transform: rotateX(-24deg) scale(1.05); }
.mini-spin { transform-style: preserve-3d; animation: turn 16s linear infinite; animation-play-state: paused; animation-delay: -2.4s; }
.loc-card:hover .mini-spin { animation-play-state: running; }

/* ---------- PARKING ---------- */
.parking-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
.parking-card { padding: 24px; text-align: left; display: flex; gap: 18px; align-items: center; flex-wrap: wrap; animation: rise .6s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--i) * .12s); }
.parking-card:hover { border-color: var(--cyan); box-shadow: 0 25px 60px rgba(0,0,0,.5), 0 0 30px rgba(0,217,255,.25); }
@keyframes rise { from { opacity: 0; transform: translateY(40px) rotateX(18deg); } }
.p-sign {
    width: 74px; height: 74px; border-radius: 18px; display: grid; place-items: center; flex: none;
    font: 800 42px 'Orbitron', sans-serif; color: #fff;
    background: linear-gradient(135deg, #2a6bff, #00d9ff);
    box-shadow: 0 10px 26px rgba(0,120,255,.5), inset 0 -6px 0 rgba(0,0,0,.2);
    transform: translateZ(30px); animation: bobSign 3s ease-in-out infinite;
}
@keyframes bobSign { 50% { transform: translateY(-5px) rotate(-3deg); } }
.p-info { flex: 1; min-width: 150px; }
.p-info h3 { font-size: 19px; margin-bottom: 4px; }
.p-info p { color: var(--muted); margin: 4px 0; }
.meter { height: 8px; border-radius: 99px; background: rgba(255,255,255,.1); overflow: hidden; margin: 10px 0 4px; }
.meter span { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--green), var(--cyan)); }
.free-badge, .paid-badge { display: inline-block; padding: 5px 12px; border-radius: 99px; font-weight: 800; font-size: 14px; margin-top: 6px; }
.free-badge { background: rgba(0,245,160,.16); color: var(--green); border: 1px solid rgba(0,245,160,.5); }
.paid-badge { background: rgba(255,197,61,.14); color: var(--amber); border: 1px solid rgba(255,197,61,.5); }
.parking-card .btn { width: 100%; }

/* ---------- SLOT LOT (3D) ---------- */
.slot-hud { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 8px; }
.pill { padding: 7px 16px; border-radius: 99px; background: rgba(255,255,255,.08); border: 1px solid var(--line); font-weight: 700; }
.pill.g { color: var(--green); } .pill.r { color: #ff8da1; } .pill.c { color: var(--cyan); }
#selectedParkingText { text-align: center; color: var(--muted); margin-bottom: 8px; }

.lot-wrap { perspective: 1100px; margin: 6px auto 0; padding-bottom: 20px; }
.lot {
    --cols: 8; --rz: 0deg;
    position: relative; margin: 0 auto;
    width: min(96vw, calc(var(--cols) * 112px + 56px));
    display: grid; grid-template-columns: repeat(var(--cols), 1fr); gap: 10px;
    padding: 28px;
    transform-style: preserve-3d;
    transform: rotateX(48deg) rotateZ(var(--rz));
    transition: transform .25s ease-out;
    background: linear-gradient(#262c3d, #1a1f30);
    border: 4px solid #3a4260; border-radius: 16px;
    box-shadow: 0 0 70px rgba(0,217,255,.25), inset 0 0 40px rgba(0,0,0,.5);
}
.lot::after { content: "ENTRANCE  ▲"; position: absolute; left: 0; right: 0; bottom: 4px; text-align: center; font: 700 13px 'Orbitron', sans-serif; letter-spacing: 6px; color: rgba(255,255,255,.35); }
.bay {
    position: relative; height: 112px; transform-style: preserve-3d; cursor: pointer;
    border: 3px solid rgba(255,255,255,.65); border-radius: 6px;
    transition: background .2s, box-shadow .2s;
}
.bay .no { position: absolute; left: 0; right: 0; bottom: 6px; text-align: center; font: 700 15px 'Orbitron', sans-serif; color: rgba(255,255,255,.75); }
.bay.free { background: rgba(0,245,160,.07); }
.bay.free:hover { background: rgba(0,245,160,.28); box-shadow: inset 0 0 26px rgba(0,245,160,.7), 0 0 20px rgba(0,245,160,.4); }
.bay.occ { background: rgba(255,77,109,.12); border-color: rgba(255,77,109,.6); cursor: not-allowed; }
.bay .tag { position: absolute; top: 4px; left: 0; right: 0; text-align: center; font: 700 10px 'Orbitron', sans-serif; color: #ff8da1; letter-spacing: 1px; }
.bay.sel { background: rgba(0,217,255,.25); border-color: var(--cyan); animation: selGlow 1.3s ease-in-out infinite; }
@keyframes selGlow { 50% { box-shadow: 0 0 34px rgba(0,217,255,.9), inset 0 0 24px rgba(0,217,255,.7); } }

.vwrap { position: absolute; left: 50%; top: 50%; width: 0; height: 0; transform-style: preserve-3d; transform: rotateX(-90deg) scale(.72); pointer-events: none; }
.vwrap.mine { animation: driveIn 1.1s cubic-bezier(.2,.7,.3,1) both; }
.vwrap.mine .spin { animation: spin .3s linear 4; }
@keyframes driveIn {
    from { transform: translate3d(0, 330px, 0) rotateX(-90deg) scale(.72); opacity: .2; }
    to   { transform: translate3d(0, 0, 0) rotateX(-90deg) scale(.72); opacity: 1; }
}

/* ---------- DURATION ---------- */
.duration-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 18px; max-width: 800px; margin: 0 auto; }
.dur-card { font: inherit; color: var(--ink); cursor: pointer; padding: 26px 10px; display: grid; gap: 4px; justify-items: center; animation: rise .55s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--i) * .08s); }
.dur-card:hover { border-color: var(--green); box-shadow: 0 25px 55px rgba(0,0,0,.5), 0 0 30px rgba(0,245,160,.3); }
.dur-ring { width: 84px; height: 84px; border-radius: 50%; display: grid; place-items: center; background: conic-gradient(var(--green) calc(var(--p) * 1%), rgba(255,255,255,.1) 0); transform: translateZ(26px); }
.dur-ring span { width: 66px; height: 66px; border-radius: 50%; display: grid; place-items: center; background: #0b1131; font: 800 26px 'Orbitron', sans-serif; }
.dur-unit { color: var(--muted); font-weight: 700; }
.dur-price { font: 800 18px 'Orbitron', sans-serif; color: var(--amber); }

/* ---------- PAYMENT ---------- */
.payment-box { max-width: 520px; margin: 0 auto 26px; padding: 26px; text-align: center; position: relative; }
.payment-box h2 { color: var(--green); margin-bottom: 8px; }
.payment-box p { color: var(--muted); margin: 4px 0; }
.payment-box h3 { margin-top: 10px; }
.coin-wrap { height: 90px; perspective: 500px; margin-bottom: 8px; }
.coin { width: 70px; height: 70px; margin: 8px auto 0; position: relative; transform-style: preserve-3d; animation: coinSpin 2.4s linear infinite; }
.coin i { position: absolute; inset: 0; border-radius: 50%; display: grid; place-items: center; font: 800 34px 'Orbitron', sans-serif; color: #7a5200; background: radial-gradient(circle at 35% 30%, #fff3b0, #ffc53d 55%, #c98a00); box-shadow: inset 0 0 0 5px rgba(160,100,0,.35), 0 0 26px rgba(255,197,61,.55); backface-visibility: visible; }
.coin i:nth-child(2) { transform: translateZ(-4px); filter: brightness(.8); }
.coin i:nth-child(1) { transform: translateZ(4px); }
.coin i:nth-child(3) { transform: translateZ(0); background: #a87000; box-shadow: none; color: transparent; width: 100%; }
@keyframes coinSpin { to { transform: rotateY(360deg); } }

#paymentOptions h3, #freeParkingBox { text-align: center; }
.payment-methods { display: flex; justify-content: center; gap: 16px; margin: 20px 0; flex-wrap: wrap; }
.pay-tile { font: inherit; color: var(--ink); cursor: pointer; padding: 20px 26px; min-width: 130px; font-weight: 700; font-size: 18px; }
.pay-tile:hover { border-color: var(--cyan); }
.pay-tile.selected { background: linear-gradient(135deg, rgba(0,245,160,.3), rgba(0,217,255,.25)); border-color: var(--green); box-shadow: 0 0 28px rgba(0,245,160,.4); }

/* ---------- CONFIRMATION ---------- */
.confirmation-box { max-width: 640px; margin: 0 auto; padding: 30px; text-align: center; position: relative; overflow: hidden; }
.success-icon { width: 70px; height: 70px; border-radius: 50%; margin: 0 auto 10px; display: grid; place-items: center; font-size: 38px; color: #04120d; background: linear-gradient(135deg, var(--green), var(--cyan)); box-shadow: 0 0 40px rgba(0,245,160,.6); animation: pop .7s cubic-bezier(.2,1.6,.4,1) both; }
@keyframes pop { from { transform: scale(0) rotate(-90deg); } }
.confirm-car { position: relative; height: 170px; perspective: 800px; margin: 8px 0; }
.confirm-car .cam { position: absolute; left: 50%; top: 66%; width: 0; height: 0; transform-style: preserve-3d; transform: rotateX(-20deg) scale3d(1.1, 1.1, 1.1); }
.confirm-car .turntable { animation-duration: 8s; }
.confirm-car .platform { width: 200px; height: 200px; margin: -100px 0 0 -100px; }
#bookingDetails { text-align: left; background: rgba(5,8,25,.5); border: 1px dashed rgba(255,255,255,.25); border-radius: 16px; padding: 18px 20px; margin: 16px 0; }
.tk-row { display: flex; justify-content: space-between; gap: 14px; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,.07); }
.tk-row:last-of-type { border-bottom: 0; }
.tk-row span { color: var(--muted); }
.tk-row b { text-align: right; }
.barcode { display: flex; gap: 2px; justify-content: center; height: 44px; margin-top: 12px; }
.barcode i { display: block; background: #e8f0ff; }
.confetti { position: fixed; top: -20px; width: 10px; height: 16px; z-index: 98; pointer-events: none; animation: fall linear forwards; }
@keyframes fall { to { transform: translate3d(var(--dx), 110vh, 0) rotateZ(720deg) rotateX(540deg); opacity: .9; } }

/* ---------- NAVIGATION ---------- */
.navigation-box { max-width: 760px; margin: 0 auto; padding: 18px; text-align: center; }
.navigation-box .road-scene { height: 380px; border-radius: 18px; }
.nav-hud { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 14px 0; }
.hud-cell { padding: 12px 8px; border-radius: 14px; background: rgba(5,8,25,.55); border: 1px solid var(--line); }
.hud-cell small { display: block; color: var(--muted); font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
.hud-cell b { font: 700 18px 'Orbitron', sans-serif; color: var(--cyan); }
#navigationText { color: var(--muted); margin-bottom: 6px; }
.nav-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 10px; }

/* =====================================================
   ROAD SCENE (login hero + navigation)
===================================================== */

.road-scene {
    position: relative; overflow: hidden;
    perspective: 520px; perspective-origin: 50% 38%;
    background: linear-gradient(#060a22 0%, #1a0f48 22%, #52206f 34%, #ff6a88 38%, #0a1028 38.3%, #070a1a 100%);
}
.rs-sky {
    position: absolute; inset: 0 0 62% 0; opacity: .85;
    background-image: radial-gradient(1.5px 1.5px at 20px 20px, #fff, transparent), radial-gradient(1px 1px at 80px 60px, #fff, transparent), radial-gradient(1px 1px at 140px 30px, #cde, transparent);
    background-size: 160px 90px;
}
.rs-dest {
    position: absolute; left: 50%; top: 38%; width: 46px; height: 46px; margin: -52px 0 0 -23px; border-radius: 12px;
    display: grid; place-items: center; font: 800 26px 'Orbitron', sans-serif; color: #fff;
    background: linear-gradient(135deg, #2a6bff, #00d9ff); box-shadow: 0 0 40px 6px rgba(0,217,255,.7);
    animation: bobSign 2.4s ease-in-out infinite;
}
.rs-world { position: absolute; left: 50%; top: 38%; width: 0; height: 0; transform-style: preserve-3d; animation: drive 2.2s linear infinite; }
@keyframes drive { from { transform: translateZ(0); } to { transform: translateZ(500px); } }
.rs-road {
    position: absolute; left: -150px; top: 0; width: 300px; height: 6000px;
    transform-origin: 50% 0;
    transform: translate3d(0, 95px, 420px) rotateX(-90deg);
    background:
        repeating-linear-gradient(0deg, #fff 0 50px, transparent 50px 100px) center / 6px 100% no-repeat,
        linear-gradient(90deg, transparent 0 6px, #ffd34d 6px 10px, #222a45 10px calc(100% - 10px), #ffd34d calc(100% - 10px) calc(100% - 6px), transparent calc(100% - 6px));
    background-color: #222a45;
}
.rs-fog { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 55% 26% at 50% 38%, rgba(255,106,136,.75), transparent 100%), linear-gradient(transparent 70%, rgba(3,5,16,.6)); }
.rs-fixed { position: absolute; left: 50%; top: 38%; width: 0; height: 0; transform-style: preserve-3d; }
.rs-car { position: absolute; left: 0; top: 0; width: 0; height: 0; transform-style: preserve-3d; transform: translate3d(60px, 95px, 70px) scale(1.1); animation: sway 6s ease-in-out infinite; }
@keyframes sway {
    0%, 100% { transform: translate3d(35px, 95px, 70px) scale(1.1); }
    50%      { transform: translate3d(85px, 95px, 70px) scale(1.1); }
}
.rs-fixed .spin { animation: spin .4s linear infinite; }
.traffic { position: absolute; left: 0; top: 0; width: 0; height: 0; transform-style: preserve-3d; animation: oncoming 5s linear infinite; }
@keyframes oncoming {
    from { transform: translate3d(-75px, 95px, -3800px) rotateY(180deg); }
    to   { transform: translate3d(-75px, 95px, 430px) rotateY(180deg); }
}
.road-scene.arrived .rs-world, .road-scene.arrived .traffic, .road-scene.arrived .rs-car { animation-play-state: paused; }
.road-scene.arrived .rs-fixed .spin { animation-play-state: paused; }

/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 1000px) {
    .steps .st span { display: none; }
    .steps .st::after { width: 10px; }
}

@media (max-width: 900px) {
    .auth-wrap { grid-template-columns: 1fr; }
    .hero .road-scene { height: 240px; }
    .hero-copy { display: none; }
    .vehicle-grid { grid-template-columns: 1fr; }
    .showroom { min-height: 320px; }
}

@media (max-width: 700px) {
    body { font-size: 16px; }
    .parking-grid, .location-grid { grid-template-columns: 1fr; }
    .duration-grid { grid-template-columns: 1fr 1fr; }
    .header-logo { font-size: 17px; }
    .user-pill { display: none; }
    .steps { display: none; }
    .bay { height: 100px; }
    .bay .no { font-size: 12px; }
    .lot { padding: 16px; gap: 6px; }
    .nav-hud { grid-template-columns: 1fr; }
    .navigation-box .road-scene { height: 300px; }
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
}
