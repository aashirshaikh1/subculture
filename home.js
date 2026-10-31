/* Home page: hero with a cycling 3D model, outbreak watch, category browser,
   cross-pathogen comparison, and the author profile. */
(function () {
  'use strict';

  /* Contact details shown in the author section. Blank entries are simply not rendered. */
  var CONTACT = {
    email: 'aashirshaikh2004@gmail.com',
    linkedin: '',
    github: ''
  };

  var CSS = `
.home{display:flex;flex-direction:column}
.hsec{border-bottom:1px solid var(--line)}
.hsec .wrap{padding-block:clamp(34px,5.5vw,66px)}
.hsec.alt{background:var(--surface)}
.hhead{display:flex;flex-direction:column;gap:9px;margin-bottom:26px;max-width:62ch}
.hhead h2{font-size:clamp(1.5rem,3.7vw,2.15rem);letter-spacing:-.02em}
.hhead p{color:var(--fg-2);font-size:.97rem}
.hhead .eyebrow{margin-bottom:3px}

/* hero */
.hhero{position:relative;overflow:hidden}
.hhero .herobg{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;display:block}
.hhero::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;
  background:radial-gradient(138% 128% at 50% -12%,transparent 40%,var(--bg) 97%)}
.hhero .wrap{position:relative;z-index:2}
.hstats{display:flex;gap:clamp(20px,4vw,38px);flex-wrap:wrap;margin-top:26px;padding-top:21px;
  border-top:1px solid var(--line)}
.hstat .n{font-family:var(--f-mono);font-size:clamp(1.3rem,3vw,1.6rem);font-weight:500;color:var(--accent);
  font-variant-numeric:tabular-nums;line-height:1;transition:color .4s}
.hstat .l{font-size:.78rem;color:var(--fg-2);margin-top:6px;line-height:1.35}
.ob{transition:border-color .15s,transform .12s}
.ob:hover{border-color:color-mix(in srgb,var(--accent) 40%,var(--line));transform:translateY(-2px)}

.hhero{background:radial-gradient(118% 150% at 84% -26%,var(--accent-soft) 0%,transparent 60%),var(--bg)}
.hhero .wrap{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,380px);gap:34px;align-items:center;
  padding-block:clamp(32px,6vw,72px)}
@media (max-width:880px){.hhero .wrap{grid-template-columns:1fr;gap:26px}}
.hhero h1{font-size:clamp(2.3rem,6.6vw,3.9rem);letter-spacing:-.024em;margin-top:13px}
.hhero .sub{font-size:clamp(1.02rem,2.2vw,1.18rem);color:var(--fg-2);margin-top:16px;max-width:52ch;
  font-family:var(--f-display);line-height:1.5}
.hhero .sub2{margin-top:14px;color:var(--fg-2);font-size:.94rem;max-width:56ch}
.cta{display:flex;gap:11px;margin-top:26px;flex-wrap:wrap}
.btn{font:inherit;font-size:.92rem;font-weight:600;padding:11px 19px;border-radius:10px;cursor:pointer;
  border:1.5px solid var(--accent);display:inline-flex;align-items:center;gap:9px;transition:transform .12s,filter .15s}
.btn:hover{transform:translateY(-1px)}
.btn.p{background:var(--accent);color:#fff}
.btn.p:hover{filter:brightness(1.08)}
.btn.s{background:transparent;color:var(--accent)}
.btn.s:hover{background:var(--accent-soft)}
.btn svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2.2}
:root[data-theme="dark"] .btn.p,:root:not([data-theme="light"]) .btn.p{color:#140f17}
@media (prefers-color-scheme:light){:root:not([data-theme="dark"]) .btn.p{color:#fff}}
:root[data-theme="light"] .btn.p{color:#fff}

.hmodel{display:flex;flex-direction:column;gap:9px;min-width:0}
.hmodel .box{aspect-ratio:1;border-radius:17px;border:1px solid var(--line);background:var(--surface);
  overflow:hidden;box-shadow:var(--shadow);position:relative}
.hmodel canvas{width:100%;height:100%;display:block;cursor:grab;touch-action:none}
.hmodel canvas[data-grab]{cursor:grabbing}
.hmodel .cap{display:flex;align-items:center;justify-content:space-between;gap:12px}
.hmodel .nm{font-size:.88rem;font-weight:600}
.hmodel .nm i{display:block;font-size:.76rem;color:var(--fg-3);font-weight:400;font-style:italic}
.hmodel .dots{display:flex;gap:5px}
.hmodel .dots button{width:7px;height:7px;border-radius:50%;border:0;padding:0;cursor:pointer;
  background:var(--line-2);transition:background .2s,transform .2s}
.hmodel .dots button[aria-current="true"]{background:var(--accent);transform:scale(1.35)}
.hmodel .open{position:absolute;inset:auto 0 0 0;padding:9px;text-align:center;font-family:var(--f-mono);
  font-size:.64rem;letter-spacing:.09em;text-transform:uppercase;background:none;border:0;color:var(--fg-3);
  cursor:pointer;width:100%}
.hmodel .open:hover{color:var(--accent)}

/* study library tiles */
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(272px,1fr));gap:13px}
.tile{border:1px solid var(--line);border-radius:14px;background:var(--surface);padding:18px;
  text-align:left;font:inherit;cursor:pointer;display:flex;flex-direction:column;gap:10px;
  transition:border-color .15s,transform .12s}
.hsec.alt .tile{background:var(--surface-2)}
.tile:hover{border-color:var(--accent);transform:translateY(-2px)}
.tile .ic{width:34px;height:34px;border-radius:9px;background:var(--accent-soft);display:grid;
  place-items:center;border:1px solid color-mix(in srgb,var(--accent) 28%,transparent)}
.tile .ic svg{width:18px;height:18px;stroke:var(--accent);fill:none;stroke-width:1.8;
  stroke-linecap:round;stroke-linejoin:round}
.tile .th{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap}
.tile .tn{font-family:var(--f-display);font-size:1.15rem;font-weight:600;color:var(--fg)}
.tile .tc{font-family:var(--f-mono);font-size:.7rem;color:var(--fg-3);letter-spacing:.05em}
.tile .td{font-size:.86rem;color:var(--fg-2);line-height:1.5}
.tile .ta{margin-top:auto;font-size:.83rem;font-weight:600;color:var(--accent)}

/* outbreak watch */
.obmeta{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:20px;font-size:.82rem;
  color:var(--fg-3);font-family:var(--f-mono)}
.obmeta .pill{border:1px solid var(--line-2);border-radius:999px;padding:3px 11px}
.oblist{display:flex;flex-direction:column;gap:13px}
.ob{border:1px solid var(--line);border-radius:14px;background:var(--bg);overflow:hidden}
.hsec.alt .ob{background:var(--surface-2)}
.ob .top{display:flex;gap:13px;align-items:flex-start;padding:15px 17px;flex-wrap:wrap}
.ob .stripe{width:4px;align-self:stretch;border-radius:3px;flex:0 0 auto;min-height:40px}
.ob .hd{flex:1 1 230px;min-width:0}
.ob h3{font-size:1.12rem;letter-spacing:-.012em}
.ob .org{font-size:.81rem;color:var(--fg-3);font-style:italic;margin-top:2px}
.ob .where{font-size:.84rem;color:var(--fg-2);margin-top:5px;font-family:var(--f-mono)}
.ob .tag{flex:0 0 auto;font-family:var(--f-mono);font-size:.63rem;letter-spacing:.07em;text-transform:uppercase;
  padding:5px 10px;border-radius:999px;font-weight:500;border:1px solid}
.tag.critical{color:var(--danger);border-color:color-mix(in srgb,var(--danger) 45%,transparent);
  background:color-mix(in srgb,var(--danger) 11%,transparent)}
.tag.watch{color:var(--warn);border-color:color-mix(in srgb,var(--warn) 45%,transparent);
  background:color-mix(in srgb,var(--warn) 11%,transparent)}
.tag.stable{color:var(--ok);border-color:color-mix(in srgb,var(--ok) 42%,transparent);
  background:color-mix(in srgb,var(--ok) 11%,transparent)}
.ob .figs{display:grid;grid-template-columns:repeat(auto-fit,minmax(152px,1fr));gap:1px;background:var(--line);
  border-block:1px solid var(--line)}
.ob .figs div{background:var(--bg);padding:9px 14px;min-width:0}
.hsec.alt .ob .figs div{background:var(--surface-2)}
.ob .figs dt{font-family:var(--f-mono);font-size:.6rem;letter-spacing:.08em;text-transform:uppercase;color:var(--fg-3)}
.ob .figs dd{margin:0;font-size:.87rem;font-weight:500;margin-top:3px;font-variant-numeric:tabular-nums}
.ob .body{padding:14px 17px;display:flex;flex-direction:column;gap:10px}
.ob .body p{font-size:.9rem;color:var(--fg-2);max-width:74ch}
.ob .body .n{font-size:.85rem;color:var(--fg-3);padding-left:11px;border-left:2px solid var(--line-2)}
.ob .links{display:flex;gap:9px;flex-wrap:wrap;margin-top:2px}
.ob .links a,.ob .links button{font:inherit;font-size:.82rem;font-weight:500;padding:6px 12px;border-radius:8px;
  border:1px solid var(--line-2);background:none;color:var(--fg-2);cursor:pointer;text-decoration:none}
.ob .links a:hover,.ob .links button:hover{border-color:var(--accent);color:var(--accent)}
.feeds{margin-top:22px;padding-top:17px;border-top:1px solid var(--line)}
.feeds .t{font-family:var(--f-mono);font-size:.64rem;letter-spacing:.1em;text-transform:uppercase;
  color:var(--fg-3);margin-bottom:9px}
.feeds .row{display:flex;gap:8px;flex-wrap:wrap}
.feeds a{font-size:.82rem;color:var(--fg-2);text-decoration:none;border:1px solid var(--line);
  border-radius:8px;padding:5px 11px}
.feeds a:hover{border-color:var(--accent);color:var(--accent)}

/* about */
.about{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:30px;align-items:start}
@media (max-width:860px){.about{grid-template-columns:1fr;gap:26px}}
.about h3{font-size:1.22rem;margin-bottom:11px}
.about p{font-size:.93rem;color:var(--fg-2);margin-bottom:11px;max-width:60ch}
.about ul{margin:0;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:7px}
.about li{position:relative;padding-left:18px;font-size:.9rem;color:var(--fg-2)}
.about li::before{content:"";position:absolute;left:2px;top:.6em;width:6px;height:6px;border-radius:50%;
  background:var(--accent);opacity:.55}
.prof{border:1px solid var(--line);border-radius:14px;padding:19px;background:var(--bg)}
.hsec.alt .prof{background:var(--surface-2)}
.prof .nm{font-family:var(--f-display);font-size:1.45rem;letter-spacing:-.016em}
.prof .role{font-size:.88rem;color:var(--accent);font-weight:600;margin-top:3px}
.prof .blurb{font-size:.91rem;color:var(--fg-2);margin-top:11px;line-height:1.55}
.skillset{margin-top:15px;display:flex;flex-direction:column;gap:11px}
.skillset .grp .t{font-family:var(--f-mono);font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;
  color:var(--fg-3);margin-bottom:6px}
.skillset .chipsrow{display:flex;gap:6px;flex-wrap:wrap}
.skillset .chipsrow span{font-size:.79rem;border:1px solid var(--line-2);border-radius:7px;padding:4px 9px;
  color:var(--fg-2)}
.contact{margin-top:16px;padding-top:15px;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:8px}
.contact .t{font-family:var(--f-mono);font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--fg-3)}
.contact .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.contact .val{font-family:var(--f-mono);font-size:.84rem;user-select:all;border:1px solid var(--line-2);
  border-radius:8px;padding:6px 11px;color:var(--fg);word-break:break-all}
.contact a{font-size:.84rem;font-weight:500;border:1px solid var(--line-2);border-radius:8px;padding:6px 11px;
  text-decoration:none;color:var(--fg-2)}
.contact a:hover{border-color:var(--accent);color:var(--accent)}
.contact .copy{font:inherit;font-size:.78rem;border:1px solid var(--line-2);border-radius:8px;padding:6px 10px;
  background:none;color:var(--fg-2);cursor:pointer}
.contact .copy:hover{border-color:var(--accent);color:var(--accent)}
`;

  function el(t, c, h) { var n = document.createElement(t); if (c) n.className = c; if (h !== undefined) n.innerHTML = h; return n; }

  var HERO_CYCLE = ['hiv', 'rabies', 'tb', 'malaria', 'candida', 'ebola'];

  function render(open, onFind, nav) {
    if (!document.getElementById('home-css')) {
      var st = document.createElement('style'); st.id = 'home-css'; st.textContent = CSS;
      document.head.appendChild(st);
    }
    var D = window.DISEASES || [], byId = {};
    D.forEach(function (d) { byId[d.id] = d; });

    var root = el('div', 'home');
    var viewers = [];

    function section(id, cls) {
      var s = el('section', 'hsec' + (cls ? ' ' + cls : ''));
      s.id = id; s.style.scrollMarginTop = '118px';
      var w = el('div', 'wrap'); s.appendChild(w); root.appendChild(s);
      return w;
    }
    function head(w, eyebrow, title, sub) {
      var h = el('div', 'hhead');
      h.appendChild(el('div', 'eyebrow', eyebrow));
      h.appendChild(el('h2', null, title));
      if (sub) h.appendChild(el('p', null, sub));
      w.appendChild(h);
    }

    /* ── hero ── */
    var hero = el('section', 'hsec hhero'), hw = el('div', 'wrap');
    hero.appendChild(hw); root.appendChild(hero);
    if (window.HeroField) {
      var hbg = document.createElement('canvas');
      hbg.className = 'herobg';
      hbg.setAttribute('aria-hidden', 'true');
      hero.insertBefore(hbg, hero.firstChild);
      var hbf = window.HeroField.mount(hbg, { shape: 'mixed' });
      if (hbf) viewers.push(hbf);
    }

    var left = el('div');
    left.appendChild(el('div', 'eyebrow', 'Microbiology and biotechnology'));
    left.appendChild(el('h1', null, 'From the organism to the bioreactor.'));
    left.appendChild(el('div', 'sub',
      'Nine pathogens and fifteen laboratory methods, each taken apart the same way — the biology, the bench procedure, and the reasoning behind every step.'));
    left.appendChild(el('p', 'sub2',
      'Built for microbiology and biotechnology students, and for anyone who wants structure, diagnosis, drug targets, protocols and the arithmetic in one place. Rotatable 3D models, rendered micrographs, working calculators, and a cited source on every figure.'));
    var cta = el('div', 'cta');
    var b1 = el('button', 'btn p',
      '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>Search the library');
    b1.onclick = function () { if (onFind) onFind(); };
    var b2 = el('button', 'btn s',
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.6"/></svg>About this project');
    b2.onclick = function () {
      if (nav && nav.project) nav.project();
      else document.getElementById('home-about').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    cta.appendChild(b1); cta.appendChild(b2);
    left.appendChild(cta);
    var note = el('div', null, 'Search by organism, disease, technique or term \u2014 TB, dengue, PCR, CRISPR, Widal, acid-fast, kLa.');
    note.style.cssText = 'margin-top:13px;font-family:var(--f-mono);font-size:.72rem;color:var(--fg-3);letter-spacing:.01em';
    left.appendChild(note);

    var srcCount = 0;
    (window.DISEASES || []).concat(window.METHODS || []).forEach(function (d) {
      d.sections.forEach(function (sec) {
        sec.blocks.forEach(function (b) { if (b.t === 'links') srcCount += b.items.length; });
      });
    });
    var stats = el('div', 'hstats');
    [[(window.DISEASES || []).length, 'organism profiles'],
     [(window.METHODS || []).length, 'laboratory methods'],
     [8, 'working calculators'],
     [srcCount, 'cited sources']].forEach(function (st) {
      var d2 = el('div', 'hstat');
      d2.innerHTML = '<div class="n">' + st[0] + '</div><div class="l">' + st[1] + '</div>';
      stats.appendChild(d2);
    });
    left.appendChild(stats);

    var by = el('div', 'hbyline');
    by.innerHTML = '<span>Designed, written and built by Aashir Shaikh.</span>';
    var pb = el('button', null, 'Read the project write-up');
    pb.type = 'button';
    pb.onclick = function () { if (nav && nav.project) nav.project(); };
    by.appendChild(pb);
    left.appendChild(by);

    hw.appendChild(left);

    /* cycling 3D model */
    var hm = el('div', 'hmodel');
    var box = el('div', 'box');
    var canvas = document.createElement('canvas');
    canvas.tabIndex = 0; canvas.setAttribute('role', 'img');
    box.appendChild(canvas);
    var openBtn = el('button', 'open', 'Open this profile →');
    box.appendChild(openBtn);
    hm.appendChild(box);

    var cap = el('div', 'cap');
    var nm = el('div', 'nm', '');
    var dots = el('div', 'dots');
    cap.appendChild(nm); cap.appendChild(dots);
    hm.appendChild(cap);
    hm.appendChild(el('div', 'rothint', 'Drag to rotate'));
    hw.appendChild(hm);

    var idx = 0, timer = null, viewer = null;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function mountHero(i) {
      idx = i;
      var d = byId[HERO_CYCLE[i]]; if (!d) return;
      if (viewer) { try { viewer.dispose(); } catch (e) { } viewer = null; }
      var fresh = document.createElement('canvas');
      fresh.tabIndex = 0; fresh.setAttribute('role', 'img');
      fresh.setAttribute('aria-label', 'Rotating 3D model of ' + d.organism);
      box.replaceChild(fresh, box.firstChild);
      canvas = fresh;
      if (window.Microbe3D && window.Microbe3D.ok) { viewer = window.Microbe3D.mount(canvas, d.model); }
      if (viewer) viewers.push(viewer);
      document.documentElement.setAttribute('data-kind', d.kind);
      nm.innerHTML = d.name + '<i>' + d.organism + '</i>';
      openBtn.onclick = function () { open(d.id); };
      dots.querySelectorAll('button').forEach(function (b, j) {
        b.setAttribute('aria-current', j === i ? 'true' : 'false');
      });
    }
    HERO_CYCLE.forEach(function (id, j) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Show ' + (byId[id] ? byId[id].name : id));
      b.onclick = function () { stop(); mountHero(j); };
      dots.appendChild(b);
    });
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    mountHero(0);
    if (!reduce) timer = setInterval(function () { mountHero((idx + 1) % HERO_CYCLE.length); }, 8000);
    box.addEventListener('mousedown', stop);
    box.addEventListener('touchstart', stop, { passive: true });

    /* ── study library ── */
    var counts = (nav && nav.counts) || { organisms: 9, methods: 15 };
    var lw = section('home-library');
    head(lw, 'The library', 'Three ways in',
      'Organism profiles for the clinical side, laboratory methods for the bench, and the calculations that sit between them.');
    var tiles = el('div', 'tiles');
    [
      ['Organisms', counts.organisms + ' profiles',
       'Classification, structure with a 3D model, life cycle, pathogenesis, clinical features, lab diagnosis, drug targets, prevention and epidemiology — the same twelve headings for every one.',
       'Search the organisms', function () { if (onFind) onFind(); },
       '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>'],
      ['Lab methods', counts.methods + ' protocols',
       'Staining, culture, susceptibility testing, sterilisation, PCR, cloning, ELISA, sequencing, CRISPR, protein expression and fermentation — reagents, timed steps and the reasoning behind each one.',
       'Browse the methods', function () { if (nav && nav.methods) nav.methods(); },
       '<svg viewBox="0 0 24 24"><path d="M9 3v7L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3"/><path d="M8 3h8"/></svg>'],
      ['Calculators', '8 tools',
       'CFU per mL, generation time, dilutions, nucleic acid concentration and purity, primer melting temperature, parasite density, solution preparation and OD conversion.',
       'Open the calculators', function () { if (nav && nav.calc) nav.calc(); },
       '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 12h3M8 16h3M15 12v5"/></svg>']
    ].forEach(function (t) {
      var b = el('button', 'tile');
      b.innerHTML = '<span class="ic">' + t[5] + '</span>' +
        '<span class="th"><span class="tn">' + t[0] + '</span><span class="tc">' + t[1] + '</span></span>' +
        '<span class="td">' + t[2] + '</span>' +
        '<span class="ta">' + t[3] + ' \u2192</span>';
      b.onclick = t[4];
      tiles.appendChild(b);
    });
    lw.appendChild(tiles);

    /* ── outbreak watch ── */
    var O = window.OUTBREAKS;
    if (O) {
      var ow = section('home-watch', 'alt');
      head(ow, 'Outbreak watch',
        'What is circulating now',
        'The organisms on this site are the steady burden. These are the events moving this month — what they are, what the numbers say, and why each one is being watched.');

      var meta = el('div', 'obmeta');
      meta.innerHTML = '<span class="pill">Checked ' + O.reviewed + '</span>' +
        '<span>Figures are a snapshot copied from the source on each card, not a live feed.</span>';
      ow.appendChild(meta);

      var list = el('div', 'oblist');
      O.items.forEach(function (it) {
        var c = el('div', 'ob');
        var top = el('div', 'top');
        var stripe = el('div', 'stripe');
        stripe.style.background = it.level === 'critical' ? 'var(--danger)' : it.level === 'watch' ? 'var(--warn)' : 'var(--ok)';
        top.appendChild(stripe);
        var hd = el('div', 'hd');
        hd.appendChild(el('h3', null, it.name));
        hd.appendChild(el('div', 'org', it.organism));
        hd.appendChild(el('div', 'where', it.where));
        top.appendChild(hd);
        top.appendChild(el('div', 'tag ' + it.level, it.status));
        c.appendChild(top);

        var figs = el('dl', 'figs');
        it.figures.forEach(function (f) {
          var d2 = el('div');
          d2.appendChild(el('dt', null, f[0]));
          d2.appendChild(el('dd', null, f[1]));
          figs.appendChild(d2);
        });
        c.appendChild(figs);

        var body = el('div', 'body');
        body.appendChild(el('p', null, it.why));
        if (it.note) body.appendChild(el('div', 'n', it.note));
        var links = el('div', 'links');
        var a = el('a', null, 'Source: ' + it.source[0] + ' ↗');
        a.href = it.source[1]; a.target = '_blank'; a.rel = 'noopener noreferrer';
        links.appendChild(a);
        if (it.profile && byId[it.profile]) {
          var pb = el('button', null, 'Read the ' + byId[it.profile].name + ' profile →');
          pb.onclick = function () { open(it.profile); };
          links.appendChild(pb);
        }
        body.appendChild(links);
        c.appendChild(body);
        list.appendChild(c);
      });
      ow.appendChild(list);

      var feeds = el('div', 'feeds');
      feeds.appendChild(el('div', 't', 'Check these for anything newer'));
      var row = el('div', 'row');
      O.feeds.forEach(function (f) {
        var a2 = el('a', null, f[0]);
        a2.href = f[1]; a2.target = '_blank'; a2.rel = 'noopener noreferrer';
        row.appendChild(a2);
      });
      feeds.appendChild(row);
      ow.appendChild(feeds);
    }

    /* ── about ── */
    var aw = section('home-about');
    head(aw, 'About', 'What this is, and who built it');

    var about = el('div', 'about');
    var l2 = el('div');
    l2.innerHTML =
      '<h3>About this site</h3>' +
      '<p>Most microbiology revision means stitching together a WHO fact sheet, a textbook chapter, a lecture slide and a half-remembered diagram. This site puts all of it in one structure, and uses the same twelve headings for every organism so you can read across them.</p>' +
      '<p>Every profile covers classification and discovery, structure and genome, life cycle, transmission, pathogenesis, clinical features, laboratory diagnosis, treatment with the molecular target of each drug, prevention, epidemiology, history and sources.</p>' +
      '<ul>' +
      '<li><b>3D models</b> are generated in code from each organism\'s described structure, with layers you can switch off to look inside.</li>' +
      '<li><b>Micrographs</b> are rendered simulations in the correct imaging modality — Ziehl–Neelsen, Giemsa, Gram, negative-stain and thin-section electron microscopy — each labelled as a simulation, never passed off as a photograph.</li>' +
      '<li><b>The culture game</b> on the HIV profile models a real virology workflow: biosafety, activation, infection, feeding and harvest.</li>' +
      '<li><b>Every figure is cited.</b> Case numbers change yearly, so each one carries a note to check the current WHO report before you present it.</li>' +
      '</ul>' +
      '<p style="margin-top:12px;font-size:.87rem;color:var(--fg-3)">This is a study resource. Clinical decisions belong with a clinician and the current national guideline.</p>';
    var more = el('button', 'btn s');
    more.style.marginTop = '14px';
    more.innerHTML = 'Read the full project write-up \u2192';
    more.onclick = function () { if (nav && nav.project) nav.project(); };
    l2.appendChild(more);
    about.appendChild(l2);

    var prof = el('div', 'prof');
    var contactRows = '';
    if (CONTACT.email) {
      contactRows += '<div class="row"><span class="val" id="cmail">' + CONTACT.email + '</span>' +
        '<button class="copy" id="cmailcopy" type="button">Copy</button></div>';
    }
    var linkRow = '';
    if (CONTACT.linkedin) linkRow += '<a href="' + CONTACT.linkedin + '" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>';
    if (CONTACT.github) linkRow += '<a href="' + CONTACT.github + '" target="_blank" rel="noopener noreferrer">GitHub ↗</a>';
    if (linkRow) contactRows += '<div class="row">' + linkRow + '</div>';

    prof.innerHTML =
      '<div class="nm">Aashir Shaikh</div>' +
      '<div class="role">Microbiology student · laboratory technician</div>' +
      '<div class="blurb">Around eighteen months of hands-on laboratory work — phlebotomy and sample collection, routine bench technique, and the administrative side of keeping a lab running — alongside building software. Looking for a role in the biomedical industry where laboratory knowledge and practical AI and development skills are both useful.</div>' +
      '<div class="skillset">' +
      '<div class="grp"><div class="t">Laboratory</div><div class="chipsrow">' +
      '<span>Phlebotomy and sample collection</span><span>Specimen handling</span><span>Routine bench technique</span>' +
      '<span>Laboratory administration</span><span>Quality and record keeping</span></div></div>' +
      '<div class="grp"><div class="t">Software and systems</div><div class="chipsrow">' +
      '<span>ERPNext</span><span>Frappe Framework</span><span>Open-source contribution</span>' +
      '<span>JavaScript</span><span>Data modelling</span></div></div>' +
      '<div class="grp"><div class="t">AI-assisted development</div><div class="chipsrow">' +
      '<span>Building with LLMs</span><span>Prompt and workflow design</span><span>Technical content review</span></div></div>' +
      '</div>' +
      (contactRows ? '<div class="contact"><div class="t">Get in touch</div>' + contactRows + '</div>' : '');
    about.appendChild(prof);
    aw.appendChild(about);

    var closing = el('div', null,
      'This site is itself part of the answer to what Aashir does: the microbiology is his, the structure and the writing were worked out with an AI assistant, and the 3D models, rendered micrographs and the culture simulation are all generated in code rather than copied from anywhere.');
    closing.style.cssText = 'margin-top:24px;font-size:.89rem;color:var(--fg-2);max-width:74ch';
    aw.appendChild(closing);

    setTimeout(function () {
      var cb = document.getElementById('cmailcopy');
      if (!cb) return;
      cb.onclick = function () {
        var txt = CONTACT.email;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).then(function () {
            cb.textContent = 'Copied'; setTimeout(function () { cb.textContent = 'Copy'; }, 1600);
          }, function () { selectEmail(); });
        } else selectEmail();
      };
      function selectEmail() {
        var n = document.getElementById('cmail');
        if (!n) return;
        var r = document.createRange(); r.selectNodeContents(n);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        cb.textContent = 'Select and copy';
        setTimeout(function () { cb.textContent = 'Copy'; }, 2200);
      }
    }, 0);

    return { node: root, dispose: function () { stop(); viewers.forEach(function (v) { try { v.dispose(); } catch (e) { } }); } };
  }

  window.HomePage = { render: render };
})();
