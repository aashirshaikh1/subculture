/* Renders an organism profile from its data, plus search, ticker and section rail. */
(function () {
  'use strict';
  var D = window.DISEASES || [];
  var M = window.METHODS || [];
  var ALL = D.concat(M);
  var byId = {}; ALL.forEach(function (d) { byId[d.id] = d; });
  var main = document.getElementById('main');
  var current = null, viewers = [], homeInst = null, searchAPI = null;

  var KIND_LABEL = { virus: 'virus', bacterium: 'bacterium', parasite: 'parasite', fungus: 'fungus', method: 'method' };
  var GENE_COLORS = ['#8e2f63', '#3f4fa8', '#1f7a5e', '#a2582a', '#6a3fa0', '#2f6f8e', '#9c2f3f', '#4a7a2a', '#7a4a1f'];
  var LAYER_SWATCH = {
    envelope: 'envelope', spikes: 'spikes', spikes2: 'spikes2', matrix: 'matrix',
    capsid: 'capsid', genome: 'genome'
  };

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  /* ── ticker ─────────────────────────────────────────────────── */
  function tickerFacts() {
    return [
      'M. tuberculosis divides once every 15–20 hours — which is why treatment lasts 6 months',
      'HIV reverse transcriptase makes about one error per genome copied',
      'SARS-CoV-2 has the largest RNA genome known, at 29.9 kb',
      'Influenza carries its genome in 8 separate segments, so two strains can swap whole genes',
      'Hepatitis B is 50–100 times more infectious than HIV per exposure',
      'A second dengue infection is more dangerous than the first',
      'Plasmodium changes body plan at every stage of its life cycle',
      'Cholera toxin jams one cellular switch permanently on',
      'S. Typhi infects humans and no other species',
      'Oral rehydration works because cholera toxin never touches the glucose–sodium co-transporter',
      'Roughly a quarter of the world carries latent tuberculosis',
      'The hepatitis B vaccine was the first vaccine shown to prevent a human cancer'
    ];
  }
  function buildTicker() {
    var t = document.getElementById('ticker'), f = tickerFacts();
    var html = f.concat(f).map(function (s) { return '<i>' + s + '</i>'; }).join('');
    t.innerHTML = html;
  }

  /* ── chips ──────────────────────────────────────────────────── */
  function buildChips(mode) {
    var c = document.getElementById('chips');
    c.innerHTML = '';
    var hb = el('button', 'chip');
    hb.style.setProperty('--c', 'var(--fg-2)');
    hb.innerHTML = '<span class="dot"></span>Home';
    hb.dataset.id = 'home';
    hb.onclick = function () { showHome(true); };
    c.appendChild(hb);

    (mode === 'method' ? M : D).forEach(function (d) {
      var b = el('button', 'chip');
      b.style.setProperty('--c', 'var(--' + (d.kind === 'method' ? 'method' : d.kind) + ')');
      b.innerHTML = '<span class="dot"></span>' + d.name;
      b.onclick = function () { show(d.id, true); };
      b.dataset.id = d.id;
      c.appendChild(b);
    });

    var x = el('button', 'chip');
    x.style.setProperty('--c', 'var(--fg-2)');
    x.innerHTML = '<span class="dot"></span>' + (mode === 'method' ? 'Organisms' : 'Lab methods');
    x.dataset.id = mode === 'method' ? 'organisms' : 'methods';
    x.onclick = function () { mode === 'method' ? showHome(true) : showMethods(true); };
    c.appendChild(x);

    var cc = el('button', 'chip');
    cc.style.setProperty('--c', 'var(--fg-2)');
    cc.innerHTML = '<span class="dot"></span>Calculators';
    cc.dataset.id = 'calc';
    cc.onclick = function () { showCalc(true); };
    c.appendChild(cc);
  }
  function syncChips() {
    document.querySelectorAll('.chip').forEach(function (b) {
      b.setAttribute('aria-current', b.dataset.id === current ? 'true' : 'false');
    });
  }

  /* ── block renderers ────────────────────────────────────────── */
  var R = {};

  R.p = function (b) { return el('p', null, b.text); };

  R.ul = function (b) {
    var w = el('div', 'ul');
    if (b.title) w.appendChild(el('div', 't', b.title));
    var ul = el('ul');
    b.items.forEach(function (i) { ul.appendChild(el('li', null, i)); });
    w.appendChild(ul); return w;
  };

  R.table = function (b) {
    var w = el('div', 'tblwrap'), t = el('table');
    var th = el('thead'), tr = el('tr');
    b.head.forEach(function (h) { tr.appendChild(el('th', null, h)); });
    th.appendChild(tr); t.appendChild(th);
    var tb = el('tbody');
    b.rows.forEach(function (r) {
      var row = el('tr');
      r.forEach(function (cell) { row.appendChild(el('td', null, cell)); });
      tb.appendChild(row);
    });
    t.appendChild(tb); w.appendChild(t); return w;
  };

  R.kv = function (b) {
    var w = el('dl', 'kv');
    b.items.forEach(function (pair) {
      var row = el('div');
      row.appendChild(el('dt', null, pair[0]));
      row.appendChild(el('dd', null, pair[1]));
      w.appendChild(row);
    });
    return w;
  };

  R.steps = function (b) {
    var w = el('div', 'steps');
    b.items.forEach(function (s) {
      var d = el('div');
      d.appendChild(el('span', 'num'));
      var box = el('div');
      box.appendChild(el('h4', null, s[0]));
      box.appendChild(el('p', null, s[1]));
      d.appendChild(box); w.appendChild(d);
    });
    return w;
  };

  R.timeline = function (b) {
    var w = el('div', 'tl');
    b.items.forEach(function (i) {
      var d = el('div');
      d.appendChild(el('div', 'y mono', i[0]));
      d.appendChild(el('div', 'd', i[1]));
      w.appendChild(d);
    });
    return w;
  };

  var NOTE_LABEL = { info: 'Worth knowing', warn: 'Watch out', ok: 'Key point' };
  R.note = function (b) {
    var tone = b.tone || 'info';
    var n = el('div', 'note ' + tone, b.text);
    n.setAttribute('data-label', b.label || NOTE_LABEL[tone] || 'Note');
    return n;
  };

  R.links = function (b) {
    var w = el('div', 'links');
    b.items.forEach(function (i) {
      var a = el('a', null, i[0] + '<span class="u">' + i[1] + '</span>');
      a.href = i[1]; a.target = '_blank'; a.rel = 'noopener noreferrer';
      w.appendChild(a);
    });
    return w;
  };

  R.genome = function (b) {
    var w = el('div', 'genome');
    if (b.label) w.appendChild(el('div', 'cap', b.label));
    var bar = el('div', 'gbar');
    var note = el('div', 'gnote', '<b>' + b.genes[0][0] + '</b> — ' + b.genes[0][2]);
    b.genes.forEach(function (g, i) {
      var btn = el('button', null, g[0]);
      btn.style.setProperty('--w', String(Math.round(g[1] * 1000)));
      btn.style.background = GENE_COLORS[i % GENE_COLORS.length];
      btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      btn.title = g[0] + ' — ' + g[2];
      btn.onclick = function () {
        bar.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        note.innerHTML = '<b>' + g[0] + '</b> — ' + g[2];
      };
      bar.appendChild(btn);
    });
    w.appendChild(bar); w.appendChild(note); return w;
  };

  R.organs = function (b) {
    var w = el('div', 'organs');
    if (b.title) w.appendChild(el('div', 't', b.title));
    b.items.forEach(function (it, i) {
      var box = el('div', 'it');
      var btn = el('button', null, '<span>' + it[0] + '</span><span class="ic"></span>');
      var bd = el('div', 'bd', it[1]);
      bd.hidden = i !== 0;
      btn.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
      btn.onclick = function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        bd.hidden = open;
      };
      box.appendChild(btn); box.appendChild(bd); w.appendChild(box);
    });
    return w;
  };

  R.model = function (b, d) {
    var w = el('div', 'model');
    var stage = el('div', 'stage');
    var canvas = document.createElement('canvas');
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', '3D model of ' + d.organism + '. Drag or use the arrow keys to rotate.');
    stage.appendChild(canvas);
    var stageWrap = el('div', 'stagewrap');
    stageWrap.appendChild(stage);
    var mHint = el('div', 'rothint', 'Drag to rotate · arrow keys also work');
    stageWrap.appendChild(mHint);
    w.appendChild(stageWrap);

    var side = el('div', 'layers');
    side.appendChild(el('div', 't', 'Layers — switch one off to look inside'));
    w.appendChild(side);

    var spec = d.model;
    var viewer = window.Microbe3D && window.Microbe3D.ok ? window.Microbe3D.mount(canvas, spec) : null;
    if (!viewer) {
      stage.innerHTML = '<div class="nogl">This device could not start 3D graphics. The labelled descriptions beside this panel still cover the same structures.</div>';
      mHint.hidden = true;
    } else { viewers.push(viewer); }

    (spec.layers || []).forEach(function (L) {
      var btn = el('button', 'layer');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'true');
      var color = layerColor(spec, L[0]);
      btn.innerHTML = '<span class="sw" style="background:' + color + '"></span>' +
        '<span><span class="nm">' + L[1] + '</span><span class="ds">' + L[2] + '</span></span>';
      btn.onclick = function () {
        var on = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', on ? 'false' : 'true');
        if (viewer) viewer.setLayer(L[0], !on);
      };
      side.appendChild(btn);
    });
    return w;
  };

  function layerColor(spec, name) {
    if (spec.kind === 'virion') {
      if (name === 'envelope') return spec.envelope;
      if (name === 'spikes') return spec.spikes ? spec.spikes.color : spec.envelope;
      if (name === 'spikes2') return spec.spikes2 ? spec.spikes2.color : spec.envelope;
      if (name === 'matrix') return spec.matrix || spec.envelope;
      if (name === 'capsid') return spec.capsid ? spec.capsid.color : spec.envelope;
      if (name === 'genome') return spec.genome ? spec.genome.color : spec.envelope;
    }
    if (spec.kind === 'bacillus') {
      if (name === 'flagella') return spec.colors.wall;
      return spec.colors[name] || spec.colors.wall;
    }
    if (spec.kind === 'parasite') return spec.colors[name] || spec.colors.rbc;
    return '#888888';
  }

  /* ── drawn figures ──────────────────────────────────────────── */
  R.protocol = function (b) {
    var P = b.def || (window.STAINS && window.STAINS.lib[b.name]);
    if (!P) return null;
    if (window.STAINS && window.STAINS.injectCss) window.STAINS.injectCss();

    var w = el('div', 'proto');
    var h = el('div', 'ph');
    var hd = el('div', 'hd');
    hd.appendChild(el('h4', null, P.name));
    if (P.aka) hd.appendChild(el('div', 'aka', P.aka));
    if (P.use) hd.appendChild(el('div', 'use', P.use));
    h.appendChild(hd);
    if (P.badge) h.appendChild(el('div', 'badge', P.badge));
    w.appendChild(h);

    var body = el('div', 'pb');
    function part(label, node) {
      var d = el('div');
      if (label) d.appendChild(el('div', 'psub', label));
      d.appendChild(node);
      body.appendChild(d);
    }

    if (P.reagents && P.reagents.length) {
      var rg = el('div', 'reagents');
      P.reagents.forEach(function (r) {
        var row = el('div');
        row.appendChild(el('div', 'rn',
          '<span class="sw" style="background:' + r[1] + '"></span>' + r[0]));
        row.appendChild(el('div', 'rd', r[2] + (r[3] ? '<span class="rc">' + r[3] + '</span>' : '')));
        rg.appendChild(row);
      });
      part('Reagents', rg);
    }

    if (P.steps && P.steps.length) {
      var ol = el('ol', 'psteps');
      P.steps.forEach(function (st) {
        var li = el('li');
        li.appendChild(el('span', 'n'));
        li.appendChild(el('div', 'tx', st[0] + (st[2] ? '<span class="wy">' + st[2] + '</span>' : '')));
        li.appendChild(el('span', 'tm', st[1] || '—'));
        ol.appendChild(li);
      });
      part('Method', ol);
    }

    if (P.result) part('What you should see', el('div', 'presult', P.result));
    if (P.mechanism) part('Why it works', el('div', 'pmech', P.mechanism));

    if (P.grade) {
      var gw = el('div', 'pgrade tblwrap'), gt = el('table');
      var th = el('thead'), tr = el('tr');
      P.grade.head.forEach(function (x) { tr.appendChild(el('th', null, x)); });
      th.appendChild(tr); gt.appendChild(th);
      var tb = el('tbody');
      P.grade.rows.forEach(function (r) {
        var t2 = el('tr');
        r.forEach(function (c) { t2.appendChild(el('td', null, c)); });
        tb.appendChild(t2);
      });
      gt.appendChild(tb); gw.appendChild(gt);
      part(P.grade.title, gw);
    }

    if (P.pitfalls && P.pitfalls.length) {
      var ul = el('ul', 'ppit');
      P.pitfalls.forEach(function (x) { ul.appendChild(el('li', null, x)); });
      part('Where it goes wrong', ul);
    }

    if (P.variants && P.variants.length) {
      var vb = el('div'); vb.style.cssText = 'display:flex;flex-direction:column;gap:9px';
      P.variants.forEach(function (v) {
        var d = el('div');
        d.style.cssText = 'font-size:.88rem;color:var(--fg-2);padding-left:12px;border-left:2px solid var(--line-2)';
        d.innerHTML = '<b style="color:var(--fg)">' + v[0] + '.</b> ' + v[1];
        vb.appendChild(d);
      });
      part('Variants and related methods', vb);
    }

    if (P.safety) part(null, el('div', 'psafe', '<b>Safety.</b> ' + P.safety));

    w.appendChild(body);
    return w;
  };

  var MICRO_CAPTIONS = {
    'zn': 'Ziehl–Neelsen stain of sputum, ×1000 under oil. Acid-fast bacilli hold carbol fuchsin through acid-alcohol decolourisation and stand out magenta against the methylene blue counterstain. Note the beading along each bacillus, and the parallel cords — cord factor makes them stick side by side.',
    'lj-plate': 'Löwenstein–Jensen slope after six weeks. <i>M. tuberculosis</i> grows as rough, raised, buff colonies with a dry crumbly surface, often described as breadcrumb-like, on opaque green egg medium. Nothing appears for at least three weeks.',
    'giemsa': 'Giemsa-stained thin blood film, ×1000 under oil. <i>P. falciparum</i> ring forms show a fine blue cytoplasmic ring with a red chromatin dot. Two rings in one cell, rings pushed against the cell margin (appliqué forms) and the banana-shaped gametocyte are each specific to falciparum.',
    'gram-vibrio': 'Gram stain, ×1000. <i>Vibrio cholerae</i> is a Gram-negative curved rod, so it loses the crystal violet and takes the safranin counterstain, appearing pink. The comma shape and the aligned clumps — the classic "shoal of fish" — are the clue.',
    'gram-rod': 'Gram stain, ×1000. <i>Salmonella</i> Typhi is a Gram-negative bacillus: pink, straight-sided, with rounded ends. Gram stain alone cannot separate it from other enterobacteria — that needs culture and serotyping.',
    'tem-hiv': 'Thin-section transmission electron micrograph. Immature particles bud as crescents from the lymphocyte plasma membrane, while free mature virions show the cone-shaped capsid that forms only after protease cleaves the Gag polyprotein.',
    'tem-corona': 'Negative-stain transmission electron micrograph. Each particle carries the fringe of club-shaped spike trimers that names the family — <i>corona</i>, a crown.',
    'tem-flu': 'Negative-stain transmission electron micrograph. Influenza is pleomorphic: round particles alongside long filamentous forms, all carrying a dense fringe of haemagglutinin and neuraminidase spikes.',
    'tem-hbv': 'Negative-stain transmission electron micrograph of serum. The large 42 nm Dane particles are complete virions. They are vastly outnumbered by 22 nm spheres and filaments made of surface antigen alone — empty decoys that soak up neutralising antibody.',
    'tem-dengue': 'Negative-stain transmission electron micrograph. Dengue virions are small, round and strikingly uniform, with a smooth surface: the 180 E proteins lie flat in a herringbone shell instead of projecting as spikes.',
    'tcbs-plate': 'TCBS agar after 24 hours. <i>V. cholerae</i> ferments sucrose and drops the local pH, turning the bromothymol blue indicator from green to yellow — large, flat, shiny yellow colonies on a green plate.'
  };

  R.micro = function (b) {
    var f = el('figure', 'fig');
    var cap = b.caption || MICRO_CAPTIONS[b.kind] || '';
    var drew = false;
    if (window.Micrographs) {
      var cv = document.createElement('canvas');
      cv.setAttribute('role', 'img');
      cv.setAttribute('aria-label', cap.replace(/<[^>]+>/g, ''));
      try { drew = window.Micrographs.render(cv, b.kind); } catch (e) { drew = false; }
      if (drew) f.appendChild(cv);
    }
    if (!drew) {
      if (b.kind === 'zn') f.innerHTML = znSvg();
      else if (b.kind === 'giemsa') f.innerHTML = giemsaSvg();
      else f.innerHTML = '<div style="padding:20px;font-size:.88rem;color:var(--fg-2)">' +
        'This device could not draw the micrograph. The description below covers what it shows.</div>';
    }
    f.appendChild(el('figcaption', null, cap +
      ' <span style="opacity:.7">Rendered in code from the published description of this appearance — a simulation, not a photograph.</span>'));
    return f;
  };
  R.stain = R.micro;

  function znSvg() {
    var s = '<svg viewBox="0 0 640 260" role="img" aria-label="Schematic Ziehl-Neelsen stain showing red acid-fast bacilli on a blue background">';
    s += '<defs><radialGradient id="znbg" cx="50%" cy="45%" r="70%">' +
      '<stop offset="0" stop-color="#cfe0f5"/><stop offset="1" stop-color="#8fb0da"/></radialGradient></defs>';
    s += '<rect width="640" height="260" fill="url(#znbg)"/>';
    // pus cells / debris in methylene blue
    var seed = 7;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var i = 0; i < 16; i++) {
      var cx = 24 + rnd() * 600, cy = 22 + rnd() * 216, r = 10 + rnd() * 13;
      s += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r.toFixed(1) +
        '" fill="#4a6fa8" opacity="0.3"/>';
      s += '<circle cx="' + (cx + 3).toFixed(1) + '" cy="' + (cy - 2).toFixed(1) + '" r="' + (r * 0.5).toFixed(1) +
        '" fill="#2d4b80" opacity="0.42"/>';
    }
    // acid-fast bacilli, some in parallel cords
    var bac = [[90, 70, -22], [104, 82, -22], [118, 94, -22], [250, 60, 14], [300, 150, -48],
    [312, 160, -48], [420, 90, 30], [470, 185, -8], [486, 190, -8], [180, 200, 62],
    [540, 60, -36], [552, 72, -36], [360, 215, 5], [230, 130, -70], [600, 140, 48], [60, 160, 18]];
    bac.forEach(function (b2) {
      s += '<g transform="translate(' + b2[0] + ',' + b2[1] + ') rotate(' + b2[2] + ')">' +
        '<rect x="-17" y="-2.6" width="34" height="5.2" rx="2.6" fill="#c0282f"/>' +
        '<rect x="-17" y="-2.6" width="34" height="2.2" rx="1.1" fill="#e4555a" opacity="0.6"/>' +
        '</g>';
    });
    s += '<g font-family="IBM Plex Mono, monospace" font-size="12" fill="#1f3254">' +
      '<rect x="14" y="222" width="212" height="24" rx="5" fill="#ffffff" opacity="0.82"/>' +
      '<text x="24" y="238">Acid-fast bacilli — ×1000 oil</text></g>';
    s += '</svg>';
    return s;
  }

  function giemsaSvg() {
    var s = '<svg viewBox="0 0 640 260" role="img" aria-label="Schematic Giemsa-stained blood film showing ring-form malaria parasites inside red cells">';
    s += '<rect width="640" height="260" fill="#f6e3e8"/>';
    var seed = 21;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    var cells = [];
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 10; col++) {
        var cx = 40 + col * 62 + (row % 2) * 24 + rnd() * 10;
        var cy = 42 + row * 60 + rnd() * 12;
        if (cx > 616) continue;
        cells.push([cx, cy]);
      }
    }
    cells.forEach(function (c, i) {
      s += '<circle cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="24" fill="#e39aa8"/>';
      s += '<circle cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="13" fill="#f0bfc8"/>';
      // parasitised cells
      if (i === 3 || i === 9 || i === 14 || i === 22 || i === 27) {
        var ax = c[0] + (i === 14 ? 13 : 2), ay = c[1] - 5;
        s += '<circle cx="' + ax.toFixed(1) + '" cy="' + ay.toFixed(1) + '" r="7.4" fill="none" stroke="#4c63b6" stroke-width="3"/>';
        s += '<circle cx="' + (ax + 6).toFixed(1) + '" cy="' + (ay - 4).toFixed(1) + '" r="3.4" fill="#9c2f52"/>';
        if (i === 9) {
          s += '<circle cx="' + (ax - 11).toFixed(1) + '" cy="' + (ay + 11).toFixed(1) + '" r="6.4" fill="none" stroke="#4c63b6" stroke-width="2.7"/>';
          s += '<circle cx="' + (ax - 6).toFixed(1) + '" cy="' + (ay + 8).toFixed(1) + '" r="3" fill="#9c2f52"/>';
        }
      }
    });
    s += '<g font-family="IBM Plex Mono, monospace" font-size="12" fill="#5a2436">' +
      '<rect x="14" y="222" width="238" height="24" rx="5" fill="#ffffff" opacity="0.85"/>' +
      '<text x="24" y="238">Ring forms, thin film — ×1000 oil</text></g>';
    s += '</svg>';
    return s;
  }

  R.chart = function () {
    var w = el('div', 'chartbox');
    w.innerHTML = hivCourseSvg();
    var lg = el('div', 'legend');
    lg.innerHTML = '<span><i style="background:#2f6f8e"></i>CD4 count (cells/mm³)</span>' +
      '<span><i style="background:#b02463"></i>HIV RNA (copies/mL, log scale)</span>' +
      '<span><i style="background:#a8600f"></i>AIDS threshold, 200 cells/mm³</span>';
    w.appendChild(lg);
    return w;
  };

  function hivCourseSvg() {
    var W = 640, H = 290, L = 52, Rr = 46, Tp = 18, B = 46;
    var x0 = L, x1 = W - Rr, y0 = Tp, y1 = H - B;
    function X(t) { return x0 + t * (x1 - x0); }               // t: 0..1 across 10 years
    function Ycd4(v) { return y1 - (v / 1200) * (y1 - y0); }   // 0..1200 cells
    function Yvl(log) { return y1 - ((log - 1) / 6) * (y1 - y0); } // 10^1..10^7

    var cd4 = [[0, 1000], [0.012, 560], [0.03, 700], [0.06, 760], [0.15, 700], [0.3, 620],
    [0.45, 540], [0.6, 450], [0.72, 360], [0.84, 250], [0.92, 170], [1, 90]];
    var vl = [[0, 1.2], [0.012, 6.6], [0.028, 5.6], [0.055, 4.2], [0.12, 3.9], [0.3, 4.1],
    [0.5, 4.4], [0.7, 4.9], [0.85, 5.4], [1, 6.0]];

    function path(pts, fy) {
      return pts.map(function (p, i) { return (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + fy(p[1]).toFixed(1); }).join(' ');
    }

    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Chart of CD4 count falling and HIV viral load rising over ten years of untreated infection">';
    s += '<style>.ax{stroke:var(--line-2);stroke-width:1}.gl{stroke:var(--line);stroke-width:1}' +
      '.lbl{font-family:IBM Plex Mono,monospace;font-size:10px;fill:var(--fg-3)}' +
      '.ttl{font-family:IBM Plex Sans,sans-serif;font-size:11px;fill:var(--fg-2)}</style>';
    // gridlines + left axis (CD4)
    [0, 300, 600, 900, 1200].forEach(function (v) {
      var y = Ycd4(v);
      s += '<line class="gl" x1="' + x0 + '" y1="' + y.toFixed(1) + '" x2="' + x1 + '" y2="' + y.toFixed(1) + '"/>';
      s += '<text class="lbl" x="' + (x0 - 7) + '" y="' + (y + 3.5).toFixed(1) + '" text-anchor="end">' + v + '</text>';
    });
    // right axis (viral load, log)
    [2, 3, 4, 5, 6].forEach(function (lg2) {
      var y = Yvl(lg2);
      s += '<text class="lbl" x="' + (x1 + 7) + '" y="' + (y + 3.5).toFixed(1) + '">10' +
        '<tspan baseline-shift="super" font-size="7">' + lg2 + '</tspan></text>';
    });
    // AIDS threshold
    var yT = Ycd4(200);
    s += '<line x1="' + x0 + '" y1="' + yT.toFixed(1) + '" x2="' + x1 + '" y2="' + yT.toFixed(1) +
      '" stroke="#a8600f" stroke-width="1.4" stroke-dasharray="5 4"/>';
    s += '<text class="lbl" x="' + (x0 + 6) + '" y="' + (yT - 6).toFixed(1) + '" fill="#a8600f">AIDS threshold — 200</text>';
    // curves
    s += '<path d="' + path(vl, Yvl) + '" fill="none" stroke="#b02463" stroke-width="2.4" stroke-linejoin="round"/>';
    s += '<path d="' + path(cd4, Ycd4) + '" fill="none" stroke="#2f6f8e" stroke-width="2.4" stroke-linejoin="round"/>';
    // x axis
    s += '<line class="ax" x1="' + x0 + '" y1="' + y1 + '" x2="' + x1 + '" y2="' + y1 + '"/>';
    [[0, '0'], [0.05, '3 mo'], [0.2, '2 y'], [0.5, '5 y'], [0.8, '8 y'], [1, '10 y']].forEach(function (t) {
      s += '<text class="lbl" x="' + X(t[0]).toFixed(1) + '" y="' + (y1 + 16) + '" text-anchor="middle">' + t[1] + '</text>';
    });
    s += '<text class="ttl" x="' + x0 + '" y="' + (H - 10) + '">Years after infection, no treatment</text>';
    // phase marks
    s += '<text class="lbl" x="' + X(0.02).toFixed(1) + '" y="' + (y0 + 10) + '" text-anchor="middle" fill="#b02463">acute</text>';
    s += '</svg>';
    return s;
  }

  R.game = function (b, d) {
    if (window.LabGame && d.id === 'hiv') return window.LabGame.build();
    return el('div', 'note info', 'The culture game is only available on the HIV profile.');
  };

  function heroBackdrop(hero, kind) {
    if (!window.HeroField) return;
    var c = document.createElement('canvas');
    c.className = 'herobg';
    c.setAttribute('aria-hidden', 'true');
    hero.insertBefore(c, hero.firstChild);
    var f = window.HeroField.mount(c, {
      shape: kind === 'bacterium' ? 'rod' : (kind === 'virus' || kind === 'fungus' ? 'round' : 'mixed')
    });
    if (f) viewers.push(f);
  }

  function chipsVisible(on) {
    var c = document.querySelector('.chips');
    if (c) c.hidden = !on;
  }

  /* ── teardown shared by both views ──────────────────────────── */
  function teardown() {
    viewers.forEach(function (v) { try { v.dispose(); } catch (e) { } });
    viewers = [];
    if (homeInst) { try { homeInst.dispose(); } catch (e) { } homeInst = null; }
    if (spyObs) { spyObs.disconnect(); spyObs = null; }
  }

  /* ── render the home page ───────────────────────────────────── */
  function showHome(push) {
    teardown();
    current = 'home';
    document.getElementById('brandKind').textContent = 'reference';
    syncChips();
    main.innerHTML = '';
    chipsVisible(false);
    if (!window.HomePage) { show('hiv', push); return; }
    homeInst = window.HomePage.render(
      function (id) { show(id, true); },
      function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (searchAPI) searchAPI.open();
      },
      { methods: function () { showMethods(true); }, calc: function () { showCalc(true); },
        project: function () { showProject(true); },
        counts: { organisms: D.length, methods: M.length } });
    main.appendChild(homeInst.node);
    if (push) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /* ── simple page shell ──────────────────────────────────────── */
  function pageShell(kindAttr, eyebrow, title, lede) {
    teardown();
    document.documentElement.setAttribute('data-kind', kindAttr);
    main.innerHTML = '';
    var hero = el('div', 'hero'), hw = el('div', 'wrap');
    var left = el('div');
    left.appendChild(el('div', 'eyebrow', eyebrow));
    left.appendChild(el('h1', null, title));
    if (lede) left.appendChild(el('p', 'lede', lede));
    hw.appendChild(left); hero.appendChild(hw); main.appendChild(hero);
    heroBackdrop(hero, kindAttr);
    var body = el('div', 'wrap');
    body.style.cssText = 'padding-block:34px;display:flex;flex-direction:column;gap:30px';
    main.appendChild(body);
    return body;
  }

  /* ── methods index ──────────────────────────────────────────── */
  var CAT_BLURB = {
    'Microbiology': 'Bench technique: growing an organism, identifying it, finding out what will kill it, and not infecting yourself along the way.',
    'Molecular biology': 'Working with nucleic acid and protein — amplifying, cutting, joining, separating, measuring and reading sequence.',
    'Bioprocess': 'Making a product at scale, and purifying it to a standard someone can use.'
  };

  function showMethods(push) {
    current = 'methods';
    document.getElementById('brandKind').textContent = 'methods';
    chipsVisible(true);
    buildChips('method');
    syncChips();
    var body = pageShell('method', 'Laboratory methods',
      'How the work is actually done',
      'Fifteen methods covering clinical microbiology, molecular biology and bioprocess, each with reagents, numbered steps with timings, the reasoning behind every step, and where it goes wrong in practice.');

    var cats = [];
    M.forEach(function (m) { if (cats.indexOf(m.cat) < 0) cats.push(m.cat); });
    cats.forEach(function (cat) {
      var members = M.filter(function (m) { return m.cat === cat; });
      var g = el('div', 'mgroup');
      var h = el('div', 'mgh');
      h.innerHTML = '<h3>' + cat + '</h3><span class="ct">' + members.length + ' methods</span>';
      g.appendChild(h);
      if (CAT_BLURB[cat]) g.appendChild(el('div', 'mgd', CAT_BLURB[cat]));
      var cards = el('div', 'mcards');
      members.forEach(function (m) {
        var b = el('button', 'mcard');
        b.innerHTML = '<h4>' + m.name + '</h4><div class="sb">' + m.organism + '</div><p>' + m.tagline + '</p>';
        b.onclick = function () { show(m.id, true); };
        cards.appendChild(b);
      });
      g.appendChild(cards);
      body.appendChild(g);
    });

    if (push) {
      try { history.replaceState(null, '', '#methods'); } catch (e) { }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /* ── project write-up ───────────────────────────────────────── */
  function showProject(push) {
    current = 'project';
    document.getElementById('brandKind').textContent = 'project';
    chipsVisible(false);
    var body = pageShell('method', 'Project write-up',
      'Subculture',
      'A microbiology and biotechnology study resource: ' + D.length + ' organism profiles, ' +
      M.length + ' laboratory methods and 8 calculators, with every figure generated in code and every statistic cited.');
    if (window.ProjectPage) body.appendChild(window.ProjectPage.render());
    if (push) {
      try { history.replaceState(null, '', '#project'); } catch (e) { }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /* ── calculators ────────────────────────────────────────────── */
  function showCalc(push) {
    current = 'calc';
    document.getElementById('brandKind').textContent = 'calculators';
    chipsVisible(true);
    buildChips('method');
    syncChips();
    var body = pageShell('method', 'Calculators',
      'The arithmetic you do at the bench',
      'Each one shows its formula and flags the values that should make you stop — a plate outside the countable range, an absorbance past the linear range, a parasitaemia that meets the severe malaria criteria.');
    if (window.Calculators) body.appendChild(window.Calculators.render());
    else body.appendChild(el('div', 'note warn', 'The calculators did not load.'));
    if (push) {
      try { history.replaceState(null, '', '#calc'); } catch (e) { }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /* ── render a profile ───────────────────────────────────────── */
  function show(id, push) {
    var d = byId[id]; if (!d) return;
    teardown();
    current = id;
    document.documentElement.setAttribute('data-kind', d.kind);
    document.getElementById('brandKind').textContent = d.kind === 'method' ? 'methods' : KIND_LABEL[d.kind];
    chipsVisible(true);
    buildChips(d.kind === 'method' ? 'method' : 'organism');
    syncChips();

    main.innerHTML = '';

    /* hero */
    var hero = el('div', 'hero'), hw = el('div', 'wrap');
    var left = el('div');
    left.appendChild(el('div', 'eyebrow', d.kind === 'method'
      ? d.cat + ' · laboratory method'
      : KIND_LABEL[d.kind] + ' · organism profile'));
    left.appendChild(el('h1', null, d.name));
    left.appendChild(el('div', 'tag', '<em>' + d.organism + '</em> — ' + d.tagline));
    left.appendChild(el('p', 'lede', d.hero));
    hw.appendChild(left);

    var hm = el('div', 'heromodel');
    var hc = document.createElement('canvas');
    hc.tabIndex = 0; hc.setAttribute('role', 'img');
    hc.setAttribute('aria-label', 'Rotating 3D model of ' + d.organism);
    hm.appendChild(hc);
    var hmWrap = el('div', 'heromodelwrap');
    hmWrap.appendChild(hm);
    hmWrap.appendChild(el('div', 'rothint', 'Drag to rotate'));
    hw.appendChild(hmWrap);
    hero.appendChild(hw); main.appendChild(hero);
    heroBackdrop(hero, d.kind);

    var hv = (d.model && window.Microbe3D && window.Microbe3D.ok) ? window.Microbe3D.mount(hc, d.model) : null;
    if (hv) viewers.push(hv); else hmWrap.style.display = 'none';

    /* quick facts */
    var quick = el('div', 'quick'), qw = el('div', 'wrap');
    d.quick.forEach(function (q) {
      var dl = el('dl');
      dl.appendChild(el('dt', null, q[0]));
      dl.appendChild(el('dd', null, q[1]));
      qw.appendChild(dl);
    });
    quick.appendChild(qw); main.appendChild(quick);

    /* sheet: rail + sections */
    var sheet = el('div', 'wrap'); sheet.classList.add('sheet');
    var rail = el('aside', 'rail');
    rail.appendChild(el('h4', null, 'On this page'));
    var nav = el('nav');
    var art = el('article');

    d.sections.forEach(function (sec, i) {
      var a = el('a', null, sec.title);
      a.href = '#' + sec.id; a.dataset.sec = sec.id;
      a.onclick = function (e) {
        e.preventDefault();
        var t = document.getElementById(sec.id);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      nav.appendChild(a);

      var S = el('section'); S.id = sec.id;
      S.appendChild(el('h2', null, '<span class="n">' + String(i + 1).padStart(2, '0') + '</span>' + sec.title));
      sec.blocks.forEach(function (b) {
        var fn = R[b.t];
        if (fn) { var node = fn(b, d); if (node) S.appendChild(node); }
      });
      art.appendChild(S);
    });

    rail.appendChild(nav);
    sheet.appendChild(rail); sheet.appendChild(art);
    main.appendChild(sheet);

    spy(nav);
    if (push) {
      try { history.replaceState(null, '', '#' + id); } catch (e) { }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /* ── scroll spy ─────────────────────────────────────────────── */
  var spyObs = null;
  function spy(nav) {
    if (spyObs) spyObs.disconnect();
    if (!window.IntersectionObserver) return;
    var links = {};
    nav.querySelectorAll('a').forEach(function (a) { links[a.dataset.sec] = a; });
    var seen = {};
    spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      var best = null, bv = 0;
      Object.keys(seen).forEach(function (k) { if (seen[k] > bv) { bv = seen[k]; best = k; } });
      Object.keys(links).forEach(function (k) {
        links[k].setAttribute('aria-current', k === best ? 'true' : 'false');
      });
    }, { rootMargin: '-110px 0px -55% 0px', threshold: [0, .15, .5, 1] });
    document.querySelectorAll('article section').forEach(function (s) { spyObs.observe(s); });
  }

  /* ── search ─────────────────────────────────────────────────── */
  var TERMS = [];
  function buildIndex() {
    ALL.forEach(function (d) {
      TERMS.push({ id: d.id, label: d.name, sub: d.organism, kind: d.kind === 'method' ? d.cat : d.kind,
        keys: [d.name, d.organism].concat(d.aka || []).join(' ').toLowerCase() });
      d.sections.forEach(function (s) {
        TERMS.push({
          id: d.id, sec: s.id, label: s.title, sub: d.name,
          kind: d.kind === 'method' ? d.cat : d.kind,
          keys: (s.title + ' ' + d.name + ' ' + (d.aka || []).join(' ')).toLowerCase()
        });
      });
    });
  }

  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    var out = [];
    TERMS.forEach(function (t) {
      var i = t.keys.indexOf(q);
      if (i < 0) return;
      out.push({ t: t, score: (t.sec ? 20 : 0) + i + (t.keys.indexOf(q) === 0 ? 0 : 3) });
    });
    out.sort(function (a, b) { return a.score - b.score; });
    return out.slice(0, 8).map(function (o) { return o.t; });
  }

  function wireSearch() {
    var input = document.getElementById('q'), box = document.getElementById('results'), idx = -1, items = [];

    function go(t) {
      box.hidden = true; input.blur();
      if (t.id !== current) show(t.id, true);
      if (t.sec) {
        setTimeout(function () {
          var n = document.getElementById(t.sec);
          if (n) n.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 90);
      }
    }

    function allOrganisms() {
      return ALL.map(function (d) {
        return { id: d.id, label: d.name, sub: d.organism,
          kind: d.kind === 'method' ? d.cat : d.kind };
      });
    }

    function draw() {
      var q = input.value.trim();
      items = q ? search(q) : allOrganisms();
      box.innerHTML = ''; idx = -1;
      if (!items.length) {
        box.innerHTML = '<div class="empty">Nothing here for “' + input.value.replace(/[<>&]/g, '') +
          '”. Try an organism (TB, dengue, cholera), a method (PCR, Gram stain, CRISPR, fermentation), ' +
          'or a term from one of them (Widal, acid-fast, kLa, inclusion bodies).</div>';
        box.hidden = false; return;
      }
      if (!q) box.appendChild(el('div', 'rhead', D.length + ' organisms and ' + M.length + ' lab methods'));
      items.forEach(function (t, i) {
        var b = el('button');
        b.innerHTML = '<span class="rn">' + t.label + '</span><span class="rk">' + (t.sec ? t.sub : t.kind) + '</span>';
        b.onclick = function () { go(t); };
        b.dataset.i = i;
        box.appendChild(b);
      });
      box.hidden = false;
    }

    input.addEventListener('input', draw);
    input.addEventListener('focus', draw);
    searchAPI = { open: function () { input.focus(); draw(); } };
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { box.hidden = true; input.blur(); return; }
      if (!items.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        idx = (idx + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length;
        box.querySelectorAll('button').forEach(function (b, i) { b.setAttribute('aria-selected', i === idx ? 'true' : 'false'); });
      } else if (e.key === 'Enter') {
        e.preventDefault(); go(items[idx < 0 ? 0 : idx]);
      }
    });
    document.addEventListener('click', function (e) {
      if (!box.contains(e.target) && e.target !== input) box.hidden = true;
    });
  }

  /* ── boot ───────────────────────────────────────────────────── */
  buildTicker();
  buildChips();
  buildIndex();
  wireSearch();

  var progbar = document.getElementById('progbar');
  if (progbar) {
    var ticking = false;
    function updateProgress() {
      var h = document.documentElement;
      var max = (h.scrollHeight - h.clientHeight);
      var pct = max > 40 ? Math.min(100, Math.max(0, (h.scrollTop / max) * 100)) : 0;
      progbar.style.width = pct.toFixed(2) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
    }, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  var brandBtn = document.getElementById('brandBtn');
  if (brandBtn) brandBtn.onclick = function () { showHome(true); };

  function route(h, push) {
    if (h === 'project') showProject(push);
    else if (h === 'methods') showMethods(push);
    else if (h === 'calc') showCalc(push);
    else if (byId[h]) show(h, push);
    else showHome(push);
  }

  var start = (location.hash || '').replace('#', '');
  route(start, false);

  window.addEventListener('hashchange', function () {
    var h = (location.hash || '').replace('#', '');
    if (h !== current) route(h, false);
  });
})();
