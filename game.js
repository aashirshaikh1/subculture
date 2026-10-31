/* Lab game: grow an HIV stock in PBMC culture.
   A simplified model of a real procedure — not a protocol. */
(function () {
  'use strict';
  var T = window.THREE;

  var CSS = '\
.game{display:flex;flex-direction:column;gap:16px}\
.gintro{display:grid;grid-template-columns:repeat(auto-fit,minmax(286px,1fr));gap:14px}\
.gcard{border:1px solid var(--line);border-radius:12px;padding:15px 16px;background:var(--surface)}\
.gcard h4{font-family:var(--f-body);font-size:.95rem;font-weight:600;margin-bottom:9px;display:flex;\
  align-items:center;gap:8px}\
.gcard h4::before{content:"";width:9px;height:9px;border-radius:2px;background:var(--accent)}\
.gcard ol,.gcard ul{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px;\
  font-size:.86rem;color:var(--fg-2)}\
.gcard p{font-size:.86rem;color:var(--fg-2)}\
.keyrow{display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;font-size:.8rem;color:var(--fg-2)}\
.keyrow span{display:flex;align-items:center;gap:6px}\
.keyrow i{width:11px;height:11px;border-radius:50%;display:block;border:1px solid rgba(0,0,0,.15)}\
.gboard{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:16px;align-items:start}\
@media (max-width:820px){.gboard{grid-template-columns:1fr}}\
.gstage{position:relative;aspect-ratio:1/1;border-radius:13px;overflow:hidden;border:1px solid var(--line);\
  background:radial-gradient(120% 120% at 32% 14%,var(--surface-2),var(--surface) 72%)}\
.gstage canvas{width:100%;height:100%;display:block;cursor:grab;touch-action:none}\
.gstage canvas[data-grab]{cursor:grabbing}\
.gstage .day{position:absolute;top:11px;left:11px;font-family:var(--f-mono);font-size:.72rem;\
  background:var(--surface);border:1px solid var(--line);border-radius:7px;padding:4px 9px;color:var(--fg-2)}\
.gstage .score{position:absolute;top:11px;right:11px;font-family:var(--f-mono);font-size:.72rem;\
  background:var(--accent);color:#fff;border-radius:7px;padding:4px 9px;font-weight:500}\
.growhint{font-family:var(--f-mono);font-size:.6rem;letter-spacing:.09em;text-transform:uppercase;\
  color:var(--fg-3);text-align:center;line-height:1.45}\
.float{position:absolute;font-family:var(--f-mono);font-size:.84rem;font-weight:500;pointer-events:none;\
  animation:fup 1.25s ease-out forwards}\
@keyframes fup{0%{opacity:0;transform:translateY(6px)}18%{opacity:1}100%{opacity:0;transform:translateY(-42px)}}\
.spill{position:absolute;border:0;padding:0;background:none;cursor:pointer;animation:pulse 1.1s infinite}\
.spill svg{display:block;filter:drop-shadow(0 2px 5px rgba(0,0,0,.35))}\
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.09)}}\
@media (prefers-reduced-motion:reduce){.spill{animation:none}.float{animation-duration:.01s}}\
.gauges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--line);\
  border:1px solid var(--line);border-radius:11px;overflow:hidden}\
.gauge{background:var(--surface);padding:10px 12px}\
.gauge .k{font-family:var(--f-mono);font-size:.6rem;letter-spacing:.09em;text-transform:uppercase;color:var(--fg-3)}\
.gauge .v{font-family:var(--f-mono);font-size:1.02rem;font-weight:500;margin-top:3px;color:var(--fg)}\
.gauge .bar{height:4px;border-radius:2px;background:var(--surface-3);margin-top:6px;overflow:hidden}\
.gauge .bar i{display:block;height:100%;border-radius:2px;transition:width .4s}\
.step0{border:1px solid var(--warn);background:color-mix(in srgb,var(--warn) 10%,var(--surface));\
  border-radius:11px;padding:13px 15px;display:flex;flex-direction:column;gap:9px}\
.step0 .q{font-size:.89rem;color:var(--fg);font-weight:600}\
.step0 .opts{display:flex;flex-direction:column;gap:6px}\
.step0 button{font:inherit;font-size:.85rem;text-align:left;padding:8px 11px;border-radius:8px;\
  border:1px solid var(--line-2);background:var(--bg);color:var(--fg-2);cursor:pointer}\
.step0 button:hover{border-color:var(--accent);color:var(--fg)}\
.hint{font-size:.85rem;padding:9px 12px;border-radius:9px;background:var(--accent-soft);\
  border:1px solid color-mix(in srgb,var(--accent) 28%,transparent);color:var(--fg-2)}\
.hint b{color:var(--fg)}\
.acts{display:grid;grid-template-columns:repeat(auto-fit,minmax(132px,1fr));gap:7px}\
.act{font:inherit;font-size:.84rem;font-weight:500;padding:9px 11px;border-radius:9px;\
  border:1px solid var(--line-2);background:var(--surface);color:var(--fg);cursor:pointer;text-align:left;\
  display:flex;flex-direction:column;gap:2px;transition:border-color .15s}\
.act:hover:not(:disabled){border-color:var(--accent)}\
.act:disabled{opacity:.4;cursor:not-allowed}\
.act .sub{font-size:.72rem;color:var(--fg-3);font-weight:400;line-height:1.3}\
.act.primary{background:var(--accent);border-color:var(--accent);color:#fff}\
.act.primary .sub{color:rgba(255,255,255,.78)}\
.quiz{border:1px solid var(--accent);border-radius:11px;padding:14px 15px;background:var(--surface);\
  display:flex;flex-direction:column;gap:10px}\
.quiz .qh{font-family:var(--f-mono);font-size:.62rem;letter-spacing:.11em;text-transform:uppercase;color:var(--accent)}\
.quiz .qq{font-size:.92rem;font-weight:600}\
.quiz .qo{display:flex;flex-direction:column;gap:6px}\
.quiz .qo button{font:inherit;font-size:.86rem;text-align:left;padding:9px 12px;border-radius:8px;\
  border:1px solid var(--line-2);background:var(--bg);color:var(--fg-2);cursor:pointer}\
.quiz .qo button:hover{border-color:var(--accent);color:var(--fg)}\
.quiz .exp{font-size:.86rem;color:var(--fg-2);padding:10px 12px;border-radius:8px;background:var(--surface-2)}\
.quiz .exp b{color:var(--fg)}\
.scope{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--surface)}\
.scope svg{display:block;width:100%;height:auto}\
.scope figcaption{padding:9px 13px;font-size:.81rem;color:var(--fg-2);border-top:1px solid var(--line);\
  background:var(--surface-2)}\
.logbox{font-family:var(--f-mono);font-size:.76rem;color:var(--fg-2);background:var(--surface-2);\
  border:1px solid var(--line);border-radius:10px;padding:10px 12px;max-height:132px;overflow-y:auto;\
  display:flex;flex-direction:column-reverse;gap:4px}\
.result{border:1px solid var(--accent);border-radius:12px;padding:17px;background:var(--surface);\
  display:flex;flex-direction:column;gap:9px}\
.result h4{font-family:var(--f-display);font-size:1.35rem}\
.result .stars{font-size:1.5rem;letter-spacing:.14em;color:var(--accent)}\
.result dl{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:11px;margin:0}\
.result dt{font-family:var(--f-mono);font-size:.6rem;letter-spacing:.09em;text-transform:uppercase;color:var(--fg-3)}\
.result dd{margin:0;font-family:var(--f-mono);font-size:1rem;color:var(--fg)}\
';

  var QUIZ = [
    ['What does the p24 reading actually measure?',
      ['Viral capsid protein released into the culture medium', 'The number of living T cells', 'How much glucose is left in the medium'],
      0, 'p24 is the HIV capsid protein. Infected cells shed it into the supernatant, so its concentration tracks how much virus the culture is producing. The same antigen is what 4th-generation HIV tests detect in blood.'],
    ['Why are the donor cells activated with PHA and IL-2 before infection?',
      ['Resting T cells support very little HIV replication', 'It kills contaminating bacteria', 'It makes the medium last longer'],
      0, 'HIV replicates poorly in resting CD4 cells — reverse transcription stalls and the provirus stays silent. Mitogen activation drives the cells into cycle and raises CCR5/CXCR4 expression, so the culture actually produces virus.'],
    ['The medium has turned from red towards yellow. What does that mean?',
      ['The cells have used up the nutrients and acidified it', 'The culture is contaminated with virus', 'The incubator is too cold'],
      0, 'Phenol red is a pH indicator. Cell metabolism produces lactic acid, so the medium acidifies and shifts red → orange → yellow. It is a direct visual signal that the cells need feeding.'],
    ['Why is the harvested supernatant passed through a 0.45 µm filter?',
      ['To remove cells and debris while letting virions through', 'To concentrate the virus', 'To inactivate the virus'],
      0, 'HIV virions are about 0.1 µm, so they pass freely through a 0.45 µm filter while cells (around 10 µm) and debris are held back. You get a cell-free stock.'],
    ['What containment level does work with infectious HIV require?',
      ['BSL-3 practices, in a class II biosafety cabinet', 'An open bench is fine with gloves', 'BSL-1, the same as for baker\'s yeast'],
      0, 'Work with infectious HIV cultures is done at BSL-2 facilities using BSL-3 practices, always in a certified class II biosafety cabinet, because the hazard is aerosol and sharps exposure.'],
    ['Adding fresh uninfected cells partway through the culture does what?',
      ['Gives the virus new targets, so production keeps rising', 'Cures the infected cells', 'Replaces the need to feed'],
      0, 'Once most cells are infected and dying, virus production falls. Adding fresh activated cells supplies new targets and extends the productive phase — standard practice in a bulk expansion.'],
    ['Why must a cell-free virus stock be titrated before it is used in an experiment?',
      ['p24 level does not equal infectious units', 'To check its colour', 'To remove the antibiotics'],
      0, 'Most particles in an HIV preparation are not infectious. p24 measures total capsid protein, so a separate titration (TCID50 or a reporter-cell assay) is needed to know how many infectious units you actually have.'],
    ['Why is a stock frozen in many small aliquots rather than one tube?',
      ['Repeated freeze–thaw cycles destroy infectivity', 'It takes up less freezer space', 'It makes the virus replicate faster'],
      0, 'Each freeze–thaw cycle costs a substantial fraction of infectivity. Single-use aliquots at −80 °C or in liquid nitrogen mean every experiment starts from an equivalent stock.']
  ];

  function el(t, c, h) { var n = document.createElement(t); if (c) n.className = c; if (h !== undefined) n.innerHTML = h; return n; }

  /* ── 3D culture flask ───────────────────────────────────────── */
  function flask(canvas) {
    if (!T) return null;
    var scene = new T.Scene();
    var cam = new T.PerspectiveCamera(40, 1, 0.1, 100);
    cam.position.set(0, 1.3, 9.4);
    cam.lookAt(0, 0.6, 0);

    var renderer;
    try { renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); }
    catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    scene.add(new T.AmbientLight(0xffffff, 0.8));
    var k = new T.DirectionalLight(0xffffff, 1.5); k.position.set(5, 8, 7); scene.add(k);
    var r2 = new T.DirectionalLight(0xbfe0ff, 0.7); r2.position.set(-6, 2, -4); scene.add(r2);

    var pivot = new T.Group(); scene.add(pivot);

    // T-flask body
    var W = 3.5, H = 4.2, Dp = 1.5;
    var glass = new T.MeshPhysicalMaterial({
      color: 0xdff0f6, transparent: true, opacity: 0.2, roughness: 0.08,
      metalness: 0, transmission: 0.55, thickness: 0.5, side: T.DoubleSide, depthWrite: false
    });
    var body = new T.Mesh(new T.BoxGeometry(W, H, Dp, 1, 1, 1), glass);
    pivot.add(body);
    var edges = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(W, H, Dp)),
      new T.LineBasicMaterial({ color: 0x8fb8c8, transparent: true, opacity: 0.55 }));
    pivot.add(edges);

    // canted neck + cap
    var neck = new T.Mesh(new T.CylinderGeometry(0.42, 0.52, 1.0, 20, 1, true), glass);
    neck.position.set(W / 2 - 0.5, H / 2 + 0.45, 0); neck.rotation.z = -0.42; pivot.add(neck);
    var cap = new T.Mesh(new T.CylinderGeometry(0.46, 0.46, 0.5, 20),
      new T.MeshStandardMaterial({ color: 0x3a6fa8, roughness: 0.6 }));
    cap.position.set(W / 2 - 0.1, H / 2 + 1.1, 0); cap.rotation.z = -0.42; pivot.add(cap);

    // liquid
    var liqMat = new T.MeshStandardMaterial({
      color: new T.Color('#d4455c'), transparent: true, opacity: 0.4,
      roughness: 0.15, depthWrite: false, emissive: new T.Color('#902030'), emissiveIntensity: 0.18
    });
    var liq = new T.Mesh(new T.BoxGeometry(W - 0.1, 1, Dp - 0.08), liqMat);
    pivot.add(liq);

    var pools = { healthy: [], infected: [], virus: [] };
    function pool(kind, n, geo, mats) {
      for (var i = 0; i < n; i++) {
        var m = new T.Mesh(geo, mats);
        m.visible = false;
        m.userData = {
          x: (Math.random() - 0.5) * (W - 0.7), y: Math.random(), z: (Math.random() - 0.5) * (Dp - 0.5),
          px: Math.random() * 6.28, sp: 0.3 + Math.random() * 0.7
        };
        pivot.add(m); pools[kind].push(m);
      }
    }
    var cellGeo = new T.SphereGeometry(0.11, 12, 9);
    var virGeo = new T.SphereGeometry(0.038, 7, 6);
    pool('healthy', 48, cellGeo, new T.MeshStandardMaterial({ color: 0x5aa8e0, roughness: .4, emissive: 0x1a4a70, emissiveIntensity: .3 }));
    pool('infected', 48, cellGeo, new T.MeshStandardMaterial({ color: 0xe25a92, roughness: .4, emissive: 0x7a1540, emissiveIntensity: .35 }));
    pool('virus', 70, virGeo, new T.MeshStandardMaterial({ color: 0x2b2440, roughness: .6, emissive: 0x151024, emissiveIntensity: .3 }));

    var rot = { x: 0, y: -0.28 }, vel = { x: 0, y: 0.0013 }, drag = false, last = null, vis = true, raf;
    var level = 0, tgt = { healthy: 0, infected: 0, virus: 0 };

    function setLiquid(fill, hue) {
      level = fill;
      var h = Math.max(0.02, Math.min(1, fill));
      liq.scale.y = Math.max(0.001, h * (H - 0.5));
      liq.position.y = -H / 2 + (h * (H - 0.5)) / 2 + 0.2;
      liqMat.color.set(hue);
      liq.visible = fill > 0.01;
    }
    setLiquid(0, '#d4455c');

    function setCounts(c) {
      ['healthy', 'infected', 'virus'].forEach(function (kind) {
        tgt[kind] = Math.max(0, Math.min(pools[kind].length, Math.round(c[kind] || 0)));
        pools[kind].forEach(function (m, i) { m.visible = i < tgt[kind] && level > 0.02; });
      });
    }

    var t0 = performance.now();
    function frame() {
      raf = requestAnimationFrame(frame);
      if (!vis) return;
      var tm = (performance.now() - t0) / 1000;
      if (!drag) { rot.y += vel.y; rot.x += vel.x; vel.x *= 0.93; vel.y = vel.y * 0.93 + 0.0013 * 0.07; }
      rot.x = Math.max(-0.9, Math.min(0.9, rot.x));
      pivot.rotation.x = rot.x; pivot.rotation.y = rot.y;

      var top = -H / 2 + level * (H - 0.5) + 0.2;
      ['healthy', 'infected', 'virus'].forEach(function (kind) {
        pools[kind].forEach(function (m, i) {
          if (!m.visible) return;
          var u = m.userData;
          var yy = -H / 2 + 0.35 + ((u.y + tm * 0.018 * u.sp) % 1) * Math.max(0.3, (top + H / 2 - 0.55));
          m.position.set(
            u.x + Math.sin(tm * 0.5 * u.sp + u.px) * 0.17,
            yy,
            u.z + Math.cos(tm * 0.42 * u.sp + u.px) * 0.1
          );
          if (kind !== 'virus') m.rotation.y = tm * 0.3 * u.sp;
        });
      });
      renderer.render(scene, cam);
    }

    function size() {
      var w = canvas.clientWidth || 300, h = canvas.clientHeight || 300;
      if (!w || !h) return;
      renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
    }
    function pt(e) { var t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; }
    canvas.addEventListener('mousedown', function (e) { drag = true; last = pt(e); canvas.setAttribute('data-grab', '1'); });
    window.addEventListener('mousemove', function (e) {
      if (!drag || !last) return;
      var p = pt(e); rot.y += (p.x - last.x) * 0.008; rot.x += (p.y - last.y) * 0.006;
      vel.y = (p.x - last.x) * 0.002; last = p;
    });
    window.addEventListener('mouseup', function () { drag = false; last = null; canvas.removeAttribute('data-grab'); });
    canvas.addEventListener('touchstart', function (e) { drag = true; last = pt(e); }, { passive: true });
    canvas.addEventListener('touchmove', function (e) {
      if (!drag || !last) return;
      var p = pt(e); rot.y += (p.x - last.x) * 0.008; rot.x += (p.y - last.y) * 0.006; last = p;
      if (e.cancelable) e.preventDefault();
    }, { passive: false });
    canvas.addEventListener('touchend', function () { drag = false; last = null; });

    if (window.ResizeObserver) new ResizeObserver(size).observe(canvas);
    if (window.IntersectionObserver) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { threshold: .01 }).observe(canvas);
    size(); frame();

    return { setLiquid: setLiquid, setCounts: setCounts, dispose: function () { cancelAnimationFrame(raf); renderer.dispose(); } };
  }

  /* ── drawn culture micrograph ───────────────────────────────── */
  function scopeSvg(pct) {
    var s = '<svg viewBox="0 0 640 250" role="img" aria-label="Schematic view of the culture under a microscope">';
    s += '<defs><radialGradient id="fld" cx="50%" cy="50%" r="62%">' +
      '<stop offset="0" stop-color="#f4f7f2"/><stop offset="1" stop-color="#cfd9cd"/></radialGradient></defs>';
    s += '<rect width="640" height="250" fill="url(#fld)"/>';
    var seed = 3 + Math.round(pct);
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    var n = 54;
    for (var i = 0; i < n; i++) {
      var cx = 22 + rnd() * 596, cy = 20 + rnd() * 206, r = 9 + rnd() * 4;
      var infected = rnd() * 100 < pct;
      if (infected && pct > 45 && rnd() > 0.72) {
        // syncytium — a giant multinucleated cell, the classic cytopathic effect
        s += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + (r * 2.6).toFixed(1) +
          '" fill="#b9789c" opacity="0.5" stroke="#8c4a73" stroke-width="1.6"/>';
        for (var q = 0; q < 5; q++) {
          var a = q / 5 * 6.28;
          s += '<circle cx="' + (cx + Math.cos(a) * r * 1.1).toFixed(1) + '" cy="' + (cy + Math.sin(a) * r * 1.1).toFixed(1) +
            '" r="' + (r * 0.42).toFixed(1) + '" fill="#6d3357" opacity="0.75"/>';
        }
      } else {
        s += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r.toFixed(1) +
          '" fill="' + (infected ? '#c57ba5' : '#8fb4c9') + '" opacity="' + (infected ? 0.82 : 0.62) + '"/>';
        s += '<circle cx="' + (cx + 1).toFixed(1) + '" cy="' + (cy - 1).toFixed(1) + '" r="' + (r * 0.45).toFixed(1) +
          '" fill="' + (infected ? '#7d3560' : '#4a7391') + '" opacity="0.7"/>';
      }
    }
    s += '<circle cx="320" cy="125" r="124" fill="none" stroke="#2b2b2b" stroke-width="34" opacity="0.08"/>';
    s += '<g font-family="IBM Plex Mono, monospace" font-size="11" fill="#2f3b33">' +
      '<rect x="14" y="214" width="246" height="22" rx="5" fill="#ffffff" opacity="0.85"/>' +
      '<text x="23" y="229">Phase contrast ×200 — ' + Math.round(pct) + '% cells infected</text></g>';
    s += '</svg>';
    return s;
  }

  /* ── the game ───────────────────────────────────────────────── */
  function build() {
    if (!document.getElementById('labgame-css')) {
      var st = document.createElement('style'); st.id = 'labgame-css'; st.textContent = CSS;
      document.head.appendChild(st);
    }

    var root = el('div', 'game');
    var S = null, view = null, quizPool = [];

    /* intro — always visible, explains itself before anything is clicked */
    var intro = el('div', 'gintro');
    intro.appendChild(el('div', 'gcard',
      '<h4>How to play</h4><ol>' +
      '<li>Answer the biosafety question. You cannot handle virus until you do.</li>' +
      '<li><b>Isolate cells</b> from donor blood, then <b>activate</b> them with PHA and IL-2.</li>' +
      '<li><b>Infect</b> the activated cells with the virus stock.</li>' +
      '<li><b>Incubate</b> day by day. <b>Feed</b> when the medium turns yellow, and add fresh cells when most are already infected.</li>' +
      '<li><b>Harvest</b> before day 14. Your rating comes from the p24 you reach and the points you collect on the way.</li>' +
      '</ol><div class="keyrow">' +
      '<span><i style="background:#5aa8e0"></i>healthy cell</span>' +
      '<span><i style="background:#e25a92"></i>infected cell</span>' +
      '<span><i style="background:#2b2440"></i>virus particle</span></div>'));
    intro.appendChild(el('div', 'gcard',
      '<h4>Why this is done for real</h4><p>Growing a virus stock in cell culture is routine work in a virology laboratory, and almost everything downstream depends on it:</p>' +
      '<ul><li>Testing whether a candidate drug stops replication, and at what concentration.</li>' +
      '<li>Growing virus from a patient who is failing treatment, to find which resistance mutations it carries.</li>' +
      '<li>Checking whether antibodies from a vaccine trial actually neutralise live virus.</li>' +
      '<li>Making the control material that diagnostic labs use to validate their assays.</li></ul>' +
      '<p style="margin-top:9px">Each choice here maps onto a real decision: activating cells, keeping them fed, adding fresh targets, and knowing when the culture has peaked.</p>'));
    root.appendChild(intro);

    var board = el('div', 'gboard');
    var leftCol = el('div'); leftCol.style.cssText = 'display:flex;flex-direction:column;gap:13px';
    var rightCol = el('div'); rightCol.style.cssText = 'display:flex;flex-direction:column;gap:11px';

    var stage = el('div', 'gstage');
    var canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'A 3D culture flask. Drag to rotate.');
    stage.appendChild(canvas);
    var dayBadge = el('div', 'day', 'Day 0 / 14');
    var scoreBadge = el('div', 'score', '0 pts');
    stage.appendChild(dayBadge); stage.appendChild(scoreBadge);
    leftCol.appendChild(stage);
    var flaskHint = el('div', 'growhint', 'Drag to rotate the flask');
    leftCol.appendChild(flaskHint);

    var gauges = el('div', 'gauges');
    leftCol.appendChild(gauges);
    var logbox = el('div', 'logbox');
    leftCol.appendChild(logbox);

    var step0 = el('div', 'step0');
    var hintBar = el('div', 'hint');
    var acts = el('div', 'acts');
    var quizBox = el('div');
    var scopeBox = el('div');
    var resultBox = el('div');
    rightCol.appendChild(step0);
    rightCol.appendChild(hintBar);
    rightCol.appendChild(acts);
    rightCol.appendChild(quizBox);
    rightCol.appendChild(scopeBox);
    rightCol.appendChild(resultBox);

    board.appendChild(leftCol); board.appendChild(rightCol);
    root.appendChild(board);

    root.appendChild(el('div', 'note info',
      '<b>This is a simplified model, not a protocol.</b> A real HIV expansion uses density-gradient separation of peripheral blood mononuclear cells, 2–3 days of PHA stimulation in IL-2 medium, infection at a defined multiplicity, p24 ELISA or reverse transcriptase assay every 2–3 days, and filtration and cryopreservation of the supernatant. All of it is done at BSL-2 facilities using BSL-3 practices.'));

    /* ── state ── */
    function reset() {
      S = {
        day: 0, biosafety: null, isolated: false, activated: false, infected: false, done: false,
        cells: 0, pct: 0, p24: 0, nutrient: 1, score: 0, right: 0, asked: 0,
        spill: false, log: [], quizOpen: false
      };
      quizPool = QUIZ.slice();
      quizBox.innerHTML = ''; scopeBox.innerHTML = ''; resultBox.innerHTML = '';
      draw();
    }

    function logit(txt) { S.log.push('Day ' + S.day + ' · ' + txt); if (S.log.length > 40) S.log.shift(); }

    function floatScore(n) {
      var f = el('div', 'float', (n > 0 ? '+' : '') + n);
      f.style.color = n > 0 ? 'var(--ok)' : 'var(--danger)';
      f.style.left = (28 + Math.random() * 44) + '%';
      f.style.top = (36 + Math.random() * 18) + '%';
      stage.appendChild(f);
      setTimeout(function () { f.remove(); }, 1300);
    }
    function award(n, why) { S.score += n; floatScore(n); if (why) logit(why + ' (' + (n > 0 ? '+' : '') + n + ')'); }

    function mediumColor() {
      var n = S.nutrient;
      if (n > 0.66) return '#d4455c';
      if (n > 0.42) return '#d9694a';
      if (n > 0.22) return '#dd9440';
      return '#d8c23c';
    }

    /* ── actions ── */
    function isolate() {
      S.isolated = true; S.cells = 1.2; S.nutrient = 1;
      award(10, 'Isolated peripheral blood mononuclear cells');
      draw();
    }
    function activate() {
      if (S.activated) { award(-5, 'Cells were already activated'); draw(); return; }
      S.activated = true;
      award(10, 'Activated the cells with PHA and IL-2');
      draw();
    }
    function infect() {
      S.infected = true;
      S.pct = S.activated ? 3 : 0.6;
      award(S.activated ? 15 : -10, S.activated ? 'Infected activated cells' : 'Infected resting cells — replication will be poor');
      draw();
    }
    function feed() {
      if (S.nutrient > 0.62) { award(-5, 'Fed too early — medium wasted'); }
      else { award(10, 'Fed the culture'); }
      S.nutrient = 1; draw();
    }
    function addCells() {
      if (!S.isolated) return;
      if (S.pct > 42) { award(10, 'Added fresh activated cells as targets'); }
      else { award(-5, 'Added cells the culture did not need yet'); }
      S.cells = Math.min(4.2, S.cells + 1.1);
      S.pct = S.pct * 0.68;
      S.nutrient = Math.max(0.15, S.nutrient - 0.08);
      draw();
    }
    function microscope() {
      var pct = S.pct;
      scopeBox.innerHTML = '';
      var f = el('figure', 'scope');
      var drew = false;
      if (window.Micrographs) {
        var cv = document.createElement('canvas');
        cv.setAttribute('role', 'img');
        cv.setAttribute('aria-label', 'The culture under phase contrast, about ' + Math.round(pct) + ' per cent of cells infected');
        try { drew = window.Micrographs.render(cv, 'cpe', pct); } catch (e) { drew = false; }
        if (drew) f.appendChild(cv);
      }
      if (!drew) f.innerHTML = scopeSvg(pct);
      f.appendChild(el('figcaption', null, pct < 2
        ? 'Almost no cytopathic effect yet. Cells look healthy and round. Incubate longer.'
        : pct < 45
          ? 'Scattered infected cells (pink). Early productive infection — keep the culture fed.'
          : 'Widespread infection with syncytia — the giant multinucleated cells formed when infected cells fuse with their neighbours. The culture is near its peak.'));
      scopeBox.appendChild(f);
      logit('Checked the culture under the microscope');
      draw(true);
    }
    function nextDay() {
      if (S.spill) { award(-20, 'A spill was left undisinfected overnight'); S.spill = false; }
      S.day++;
      S.nutrient = Math.max(0, S.nutrient - (0.13 + S.cells * 0.035));

      var starved = S.nutrient <= 0.06;
      if (starved) { S.cells = Math.max(0.1, S.cells - 0.45); }
      else if (S.activated && S.cells < 3.6) { S.cells = Math.min(3.6, S.cells + 0.28); }

      if (S.infected) {
        var rate = (S.activated ? 0.62 : 0.07) * (starved ? 0.15 : 1) * (S.nutrient > 0.3 ? 1 : 0.5);
        S.pct = Math.min(96, S.pct + rate * S.pct * (1 - S.pct / 100) + (S.pct < 4 ? 1.1 * rate : 0));
        S.p24 = Math.max(S.p24 * 0.9, (S.pct / 100) * S.cells * 62 * (starved ? 0.5 : 1));
      }
      if (!S.spill && Math.random() < 0.2 && S.day < 13 && !S.done) showSpill();

      if (S.day % 2 === 0 && quizPool.length && !S.quizOpen) askQuiz();
      if (S.day >= 14) finish(true);
      draw();
    }
    function harvest() { finish(false); }

    function finish(expired) {
      S.done = true;
      var p = S.p24;
      var stars = p > 110 ? 5 : p > 70 ? 4 : p > 38 ? 3 : p > 15 ? 2 : 1;
      var total = S.score + Math.round(p);
      resultBox.innerHTML = '';
      var r = el('div', 'result');
      r.innerHTML = '<div class="stars">' + '★'.repeat(stars) + '☆'.repeat(5 - stars) + '</div>' +
        '<h4>' + (expired ? 'Day 14 — the culture ran out of time' : 'Stock harvested and frozen') + '</h4>' +
        '<p style="font-size:.89rem;color:var(--fg-2)">' + (
          p > 70 ? 'A strong, high-titre stock. Filtered through 0.45 µm, aliquoted and frozen at −80 °C — enough material for a full drug-susceptibility experiment.'
            : p > 25 ? 'A usable stock, though a higher titre would give you more room in downstream assays. Feeding on time and adding fresh target cells at the right moment is what lifts the yield.'
              : 'A weak stock. The commonest reasons are infecting cells that were never activated, letting the medium run out, or harvesting before the culture peaked.'
        ) + '</p>' +
        '<dl><div><dt>Final p24</dt><dd>' + p.toFixed(1) + ' ng/mL</dd></div>' +
        '<div><dt>Cells infected</dt><dd>' + S.pct.toFixed(0) + '%</dd></div>' +
        '<div><dt>Quiz</dt><dd>' + S.right + ' / ' + S.asked + '</dd></div>' +
        '<div><dt>Lab points</dt><dd>' + S.score + '</dd></div>' +
        '<div><dt>Total</dt><dd>' + total + '</dd></div></dl>';
      var again = el('button', 'act primary', '<span>Play again</span><span class="sub">Back to an empty flask</span>');
      again.onclick = function () { reset(); root.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
      r.appendChild(again);
      resultBox.appendChild(r);
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function showSpill() {
      S.spill = true;
      var b = el('button', 'spill');
      b.setAttribute('aria-label', 'Disinfect the spill in the cabinet');
      b.title = 'Spill in the cabinet — click to disinfect';
      b.style.left = (14 + Math.random() * 62) + '%';
      b.style.top = (58 + Math.random() * 26) + '%';
      b.innerHTML = '<svg width="46" height="34" viewBox="0 0 46 34"><ellipse cx="23" cy="20" rx="20" ry="11" fill="#c0392b" opacity="0.72"/>' +
        '<ellipse cx="14" cy="13" rx="6" ry="4" fill="#c0392b" opacity="0.6"/>' +
        '<ellipse cx="34" cy="12" rx="4" ry="3" fill="#c0392b" opacity="0.5"/></svg>';
      b.onclick = function () {
        S.spill = false; b.remove(); award(10, 'Disinfected a spill in the cabinet'); draw();
      };
      stage.appendChild(b);
    }

    function askQuiz() {
      var i = Math.floor(Math.random() * quizPool.length);
      var q = quizPool.splice(i, 1)[0];
      S.quizOpen = true; S.asked++;
      quizBox.innerHTML = '';
      var box = el('div', 'quiz');
      box.appendChild(el('div', 'qh', 'Bench question · day ' + S.day));
      box.appendChild(el('div', 'qq', q[0]));
      var opts = el('div', 'qo');
      q[1].forEach(function (text, j) {
        var b = el('button', null, text);
        b.onclick = function () {
          var ok = j === q[2];
          if (ok) { S.right++; award(20, 'Answered the bench question correctly'); }
          else { award(-5, 'Missed the bench question'); }
          opts.remove();
          box.appendChild(el('div', 'exp', '<b>' + (ok ? 'Correct. ' : 'Not quite. ') + '</b>' + q[3]));
          var cont = el('button', 'act');
          cont.innerHTML = '<span>Back to the bench</span>';
          cont.onclick = function () { S.quizOpen = false; quizBox.innerHTML = ''; draw(); };
          box.appendChild(cont);
          draw(true);
        };
        opts.appendChild(b);
      });
      box.appendChild(opts);
      quizBox.appendChild(box);
    }

    /* ── hint ── */
    function hintText() {
      if (S.done) return 'The run is finished. <b>Play again</b> starts from an empty flask.';
      if (S.quizOpen) return 'Answer the bench question to carry on.';
      if (S.biosafety === null) return 'Start with the biosafety question above — you cannot infect anything until it is answered.';
      if (!S.isolated) return 'Click <b>Isolate cells</b> to separate mononuclear cells from the donor blood.';
      if (!S.activated) return 'Click <b>Activate cells</b>. Resting T cells barely support HIV replication, so this step decides your whole yield.';
      if (!S.infected) return 'Click <b>Infect</b> to add the virus stock to your activated cells.';
      if (S.spill) return 'There is a spill in the cabinet. Click it to disinfect before the next day.';
      if (S.nutrient < 0.34) return 'The medium is turning yellow. Click <b>Feed</b> before the cells starve.';
      if (S.pct > 50 && S.cells < 3) return 'Most cells are infected and dying. Click <b>Add fresh cells</b> to give the virus new targets.';
      if (S.p24 > 60 && S.pct > 60) return 'p24 is high and the culture has peaked. Consider <b>Harvest</b> before the cells crash.';
      return 'Click <b>Incubate</b> to move the culture on by one day.';
    }

    /* ── render ── */
    function draw(skipScroll) {
      dayBadge.textContent = 'Day ' + S.day + ' / 14';
      scoreBadge.textContent = S.score + ' pts';

      gauges.innerHTML = '';
      function gauge(k, v, frac, color) {
        var g = el('div', 'gauge');
        g.innerHTML = '<div class="k">' + k + '</div><div class="v">' + v + '</div>' +
          '<div class="bar"><i style="width:' + Math.max(0, Math.min(100, frac * 100)).toFixed(0) + '%;background:' + color + '"></i></div>';
        gauges.appendChild(g);
      }
      gauge('Cell density', S.cells.toFixed(1) + ' ×10⁶/mL', S.cells / 4.2, 'var(--accent)');
      gauge('Cells infected', S.pct.toFixed(0) + ' %', S.pct / 100, '#e25a92');
      gauge('p24 antigen', S.p24.toFixed(1) + ' ng/mL', S.p24 / 130, '#f0a63c');
      gauge('Medium', S.nutrient > 0.62 ? 'Fresh' : S.nutrient > 0.3 ? 'Turning' : S.nutrient > 0.06 ? 'Exhausted' : 'Starved',
        S.nutrient, mediumColor());

      logbox.innerHTML = '';
      S.log.slice(-14).forEach(function (l) { logbox.appendChild(el('div', null, l)); });
      if (!S.log.length) logbox.appendChild(el('div', null, 'Lab notebook — your actions appear here.'));

      /* biosafety step */
      if (S.biosafety === null) {
        step0.hidden = false;
        step0.innerHTML = '';
        step0.appendChild(el('div', 'q', 'Step 0 — Before you touch infectious virus, where do you set up?'));
        var opts = el('div', 'opts');
        [['An open bench, wearing gloves', false],
        ['A certified class II biosafety cabinet, in a lab coat, gloves and eye protection', true],
        ['A fume hood, like the one used for solvents', false]].forEach(function (o) {
          var b = el('button', null, o[0]);
          b.onclick = function () {
            S.biosafety = o[1];
            if (o[1]) award(10, 'Set up correctly in a class II biosafety cabinet');
            else award(-10, 'Unsafe setup chosen');
            step0.innerHTML = '<div class="q">' + (o[1]
              ? 'Correct. A class II cabinet protects you, the room and the culture. A chemical fume hood blows unfiltered air out of the building and gives no product protection at all.'
              : 'Not safe. HIV work needs a certified class II biosafety cabinet. An open bench offers no aerosol containment, and a chemical fume hood exhausts unfiltered air and protects neither you nor the culture.') + '</div>';
            setTimeout(function () { step0.hidden = true; draw(true); }, 10);
            draw(true);
          };
          opts.appendChild(b);
        });
        step0.appendChild(opts);
      }

      hintBar.innerHTML = hintText();

      /* action buttons */
      acts.innerHTML = '';
      function act(label, sub, fn, enabled, primary) {
        var b = el('button', 'act' + (primary ? ' primary' : ''));
        b.innerHTML = '<span>' + label + '</span><span class="sub">' + sub + '</span>';
        b.disabled = !enabled || S.done || S.quizOpen;
        b.title = sub;
        b.onclick = fn;
        acts.appendChild(b);
      }
      var ready = S.biosafety !== null;
      act('Isolate cells', 'Separate mononuclear cells from donor blood', isolate, !S.isolated, !S.isolated && ready);
      act('Activate cells', 'PHA + IL-2 — drives T cells into cycle', activate, S.isolated && !S.activated, S.isolated && !S.activated);
      act('Infect', 'Add the HIV stock to the culture', infect, S.isolated && !S.infected && ready, S.activated && !S.infected);
      act('Feed', 'Replace half the medium with fresh IL-2 medium', feed, S.isolated);
      act('Add fresh cells', 'New activated targets for the virus', addCells, S.infected);
      act('Look under the microscope', 'Check the cells for cytopathic effect', microscope, S.isolated);
      act('Incubate 24 h', 'Advance the culture by one day', nextDay, S.isolated && S.day < 14,
        S.infected && !S.spill && S.nutrient > 0.34);
      act('Harvest', 'Filter at 0.45 µm, aliquot and freeze', harvest, S.infected && S.day >= 3, S.p24 > 60);

      var rb = el('button', 'act');
      rb.innerHTML = '<span>Restart</span><span class="sub">Back to the start of the game</span>';
      rb.disabled = false;
      rb.onclick = function () { reset(); root.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
      acts.appendChild(rb);

      /* flask */
      if (view) {
        var fill = S.isolated ? 0.42 + Math.min(0.26, S.cells * 0.06) : 0;
        view.setLiquid(fill, mediumColor());
        var total = Math.min(44, S.cells * 12);
        var inf = total * (S.pct / 100);
        view.setCounts({ healthy: total - inf, infected: inf, virus: Math.min(68, S.p24 * 0.55) });
      }
    }

    view = flask(canvas);
    if (!view) {
      stage.innerHTML = '<div style="padding:22px;font-size:.88rem;color:var(--fg-2);text-align:center">' +
        'This device could not start 3D graphics, so the flask is not shown. The gauges and the microscope view still work, and the game plays the same way.</div>';
      flaskHint.hidden = true;
    }
    reset();
    return root;
  }

  window.LabGame = { build: build };
})();
