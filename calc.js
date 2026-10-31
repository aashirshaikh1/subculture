/* Working calculators for routine microbiology and molecular biology arithmetic. */
(function () {
  'use strict';

  var CSS = `
.calcwrap{display:grid;grid-template-columns:repeat(auto-fit,minmax(318px,1fr));gap:14px}
.calc{border:1px solid var(--line);border-radius:14px;background:var(--surface);overflow:hidden;
  display:flex;flex-direction:column}
.calc .ch{padding:14px 16px;border-bottom:1px solid var(--line);background:var(--surface-2)}
.calc .ch h3{font-family:var(--f-display);font-size:1.08rem;letter-spacing:-.01em}
.calc .ch p{font-size:.82rem;color:var(--fg-2);margin-top:4px}
.calc .cb{padding:14px 16px;display:flex;flex-direction:column;gap:11px;flex:1}
.fld{display:grid;grid-template-columns:minmax(0,1fr) 124px;gap:10px;align-items:center}
.fld label{font-size:.85rem;color:var(--fg-2);min-width:0}
.fld label small{display:block;color:var(--fg-3);font-size:.74rem}
.fld input,.fld select{font:inherit;font-family:var(--f-mono);font-size:.86rem;padding:7px 9px;
  border-radius:8px;border:1px solid var(--line-2);background:var(--bg);color:var(--fg);width:100%;
  text-align:right}
.fld select{text-align:left}
.fld.wide{grid-template-columns:1fr}
.fld.wide input{text-align:left}
.cout{margin-top:auto;padding:13px 15px;border-radius:11px;background:var(--accent-soft);
  border:1px solid color-mix(in srgb,var(--accent) 30%,transparent)}
.cout .big{font-family:var(--f-mono);font-size:1.3rem;font-weight:500;color:var(--fg);
  font-variant-numeric:tabular-nums;word-break:break-word}
.cout .sub{font-size:.81rem;color:var(--fg-2);margin-top:5px}
.cout .warn{font-size:.81rem;color:var(--warn);margin-top:6px;font-weight:500}
.cout .rows{display:flex;flex-direction:column;gap:3px;margin-top:7px}
.cout .rows div{display:flex;justify-content:space-between;gap:12px;font-size:.84rem;color:var(--fg-2)}
.cout .rows b{font-family:var(--f-mono);color:var(--fg);font-weight:500}
.formula{font-family:var(--f-mono);font-size:.76rem;color:var(--fg-3);padding:9px 12px;
  background:var(--surface-2);border-radius:8px;line-height:1.5}
`;

  function el(t, c, h) { var n = document.createElement(t); if (c) n.className = c; if (h !== undefined) n.innerHTML = h; return n; }
  function num(v) { var n = parseFloat(v); return isFinite(n) ? n : null; }
  function sig(x, d) {
    if (x === null || !isFinite(x)) return '—';
    if (x === 0) return '0';
    var a = Math.abs(x);
    if (a >= 1e5 || a < 1e-3) {
      var e = Math.floor(Math.log10(a)), m = x / Math.pow(10, e);
      return m.toFixed(d || 2) + ' × 10' + sup(e);
    }
    return a >= 100 ? x.toFixed(0) : a >= 10 ? x.toFixed(1) : x.toFixed(d || 2);
  }
  function sup(n) {
    var map = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    return String(n).split('').map(function (c) { return map[c] || c; }).join('');
  }

  function card(title, desc, fields, formula, compute) {
    var c = el('div', 'calc');
    var h = el('div', 'ch');
    h.appendChild(el('h3', null, title));
    if (desc) h.appendChild(el('p', null, desc));
    c.appendChild(h);
    var b = el('div', 'cb');
    var inputs = {};
    fields.forEach(function (f) {
      var row = el('div', 'fld' + (f.wide ? ' wide' : ''));
      var id = 'c_' + Math.random().toString(36).slice(2, 9);
      row.appendChild(el('label', null, '<label for="' + id + '">' + f.label +
        (f.hint ? '<small>' + f.hint + '</small>' : '') + '</label>'));
      var inp;
      if (f.options) {
        inp = document.createElement('select');
        f.options.forEach(function (o) {
          var op = document.createElement('option');
          op.value = o[0]; op.textContent = o[1];
          inp.appendChild(op);
        });
      } else {
        inp = document.createElement('input');
        inp.type = f.type || 'number';
        if (f.step) inp.step = f.step;
        if (f.placeholder) inp.placeholder = f.placeholder;
      }
      inp.id = id;
      if (f.value !== undefined) inp.value = f.value;
      inputs[f.key] = inp;
      row.appendChild(inp);
      b.appendChild(row);
    });
    if (formula) b.appendChild(el('div', 'formula', formula));
    var out = el('div', 'cout');
    b.appendChild(out);
    c.appendChild(b);

    function run() {
      var vals = {};
      Object.keys(inputs).forEach(function (k) { vals[k] = inputs[k].value; });
      out.innerHTML = compute(vals);
    }
    Object.keys(inputs).forEach(function (k) {
      inputs[k].addEventListener('input', run);
      inputs[k].addEventListener('change', run);
    });
    run();
    return c;
  }

  /* ── nearest-neighbour Tm ───────────────────────────────────── */
  var NN = {
    AA: [-7.9, -22.2], TT: [-7.9, -22.2], AT: [-7.2, -20.4], TA: [-7.2, -21.3],
    CA: [-8.5, -22.7], TG: [-8.5, -22.7], GT: [-8.4, -22.4], AC: [-8.4, -22.4],
    CT: [-7.8, -21.0], AG: [-7.8, -21.0], GA: [-8.2, -22.2], TC: [-8.2, -22.2],
    CG: [-10.6, -27.2], GC: [-9.8, -24.4], GG: [-8.0, -19.9], CC: [-8.0, -19.9]
  };
  function tmNN(seq, primerUM, naMM) {
    var s = seq.toUpperCase().replace(/[^ACGT]/g, '');
    if (s.length < 2) return null;
    var dH = 0, dS = 0;
    for (var i = 0; i < s.length - 1; i++) {
      var p = NN[s.substr(i, 2)];
      if (!p) return null;
      dH += p[0]; dS += p[1];
    }
    function init(b) { return (b === 'G' || b === 'C') ? [0.1, -2.8] : [2.3, 4.1]; }
    var a = init(s[0]), z = init(s[s.length - 1]);
    dH += a[0] + z[0]; dS += a[1] + z[1];
    var na = (naMM || 50) / 1000;
    dS = dS + 0.368 * (s.length - 1) * Math.log(na);
    var ct = (primerUM || 0.25) * 1e-6;
    var R = 1.987;
    var tm = (1000 * dH) / (dS + R * Math.log(ct / 4)) - 273.15;
    return { tm: tm, len: s.length, gc: (s.match(/[GC]/g) || []).length / s.length * 100, seq: s };
  }

  /* ── page ───────────────────────────────────────────────────── */
  function render() {
    if (!document.getElementById('calc-css')) {
      var st = document.createElement('style'); st.id = 'calc-css'; st.textContent = CSS;
      document.head.appendChild(st);
    }
    var g = el('div', 'calcwrap');

    /* 1. CFU */
    g.appendChild(card('Viable count — CFU per mL',
      'From a spread or pour plate at a known dilution.',
      [
        { key: 'col', label: 'Colonies counted', hint: 'Countable range is 30–300', value: 148 },
        { key: 'vol', label: 'Volume plated', hint: 'mL', value: 0.1, step: 'any' },
        { key: 'dil', label: 'Dilution', hint: 'Enter 6 for a 10⁻⁶ dilution', value: 6 }
      ],
      'CFU/mL = colonies ÷ (volume plated × dilution factor)',
      function (v) {
        var c = num(v.col), vol = num(v.vol), d = num(v.dil);
        if (c === null || vol === null || d === null || vol <= 0) return '<div class="big">—</div>';
        var cfu = c / (vol * Math.pow(10, -d));
        var warn = '';
        if (c < 30) warn = 'Below 30 colonies — statistically unreliable. Plate a lower dilution.';
        else if (c > 300) warn = 'Above 300 colonies — they compete and merge. Plate a higher dilution.';
        return '<div class="big">' + sig(cfu, 2) + ' CFU/mL</div>' +
          '<div class="sub">' + c + ' ÷ (' + vol + ' mL × 10' + sup(-d) + ')</div>' +
          '<div class="rows"><div>Total in 1 L<b>' + sig(cfu * 1000, 2) + '</b></div>' +
          '<div>log₁₀ CFU/mL<b>' + (Math.log10(cfu)).toFixed(2) + '</b></div></div>' +
          (warn ? '<div class="warn">' + warn + '</div>' : '');
      }));

    /* 2. generation time */
    g.appendChild(card('Generation time',
      'From two viable counts taken during exponential phase.',
      [
        { key: 'n0', label: 'Starting count N₀', hint: 'CFU/mL', value: '1e6', type: 'text' },
        { key: 'n', label: 'Final count N', hint: 'CFU/mL', value: '6.4e7', type: 'text' },
        { key: 't', label: 'Time elapsed', hint: 'minutes', value: 120 }
      ],
      'n = (log N − log N₀) ÷ log 2   ·   g = t ÷ n   ·   μ = 0.693 ÷ g',
      function (v) {
        var n0 = num(v.n0), n = num(v.n), t = num(v.t);
        if (!n0 || !n || !t || n0 <= 0 || n <= 0 || t <= 0) return '<div class="big">—</div>';
        if (n <= n0) return '<div class="big">—</div><div class="warn">Final count must exceed the starting count.</div>';
        var gens = (Math.log10(n) - Math.log10(n0)) / Math.log10(2);
        var gt = t / gens;
        var mu = 0.693 / gt;
        return '<div class="big">' + gt.toFixed(1) + ' min</div>' +
          '<div class="sub">generation (doubling) time</div>' +
          '<div class="rows">' +
          '<div>Generations<b>' + gens.toFixed(2) + '</b></div>' +
          '<div>Growth rate μ<b>' + mu.toFixed(4) + ' min⁻¹</b></div>' +
          '<div>Fold increase<b>' + sig(n / n0, 1) + '×</b></div></div>';
      }));

    /* 3. dilution */
    g.appendChild(card('Dilution — C₁V₁ = C₂V₂',
      'Making a working solution from a stock.',
      [
        { key: 'c1', label: 'Stock concentration C₁', value: 100, step: 'any' },
        { key: 'c2', label: 'Final concentration C₂', value: 2.5, step: 'any' },
        { key: 'v2', label: 'Final volume V₂', hint: 'any unit — the answer matches it', value: 50, step: 'any' }
      ],
      'V₁ = (C₂ × V₂) ÷ C₁     diluent = V₂ − V₁',
      function (v) {
        var c1 = num(v.c1), c2 = num(v.c2), v2 = num(v.v2);
        if (!c1 || c2 === null || !v2 || c1 <= 0) return '<div class="big">—</div>';
        if (c2 > c1) return '<div class="big">—</div><div class="warn">Final concentration cannot exceed the stock. You would need to concentrate, not dilute.</div>';
        var v1 = (c2 * v2) / c1;
        return '<div class="big">' + sig(v1, 3) + '</div>' +
          '<div class="sub">of stock, made up to ' + v2 + '</div>' +
          '<div class="rows">' +
          '<div>Add diluent<b>' + sig(v2 - v1, 3) + '</b></div>' +
          '<div>Dilution factor<b>1 in ' + sig(c1 / c2, 3) + '</b></div></div>';
      }));

    /* 4. nucleic acid quantification */
    g.appendChild(card('Nucleic acid concentration and purity',
      'From spectrophotometer absorbance readings.',
      [
        { key: 'type', label: 'Sample type', options: [['50', 'Double-stranded DNA'], ['33', 'Single-stranded DNA'], ['40', 'RNA'], ['33', 'Oligonucleotide']] },
        { key: 'a260', label: 'A₂₆₀', value: 0.42, step: 'any' },
        { key: 'a280', label: 'A₂₈₀', value: 0.23, step: 'any' },
        { key: 'a230', label: 'A₂₃₀', value: 0.2, step: 'any' },
        { key: 'df', label: 'Dilution factor', hint: 'Enter 1 if read neat', value: 1 }
      ],
      'conc (µg/mL) = A₂₆₀ × factor × dilution',
      function (v) {
        var f = num(v.type), a260 = num(v.a260), a280 = num(v.a280), a230 = num(v.a230), df = num(v.df) || 1;
        if (a260 === null || !f) return '<div class="big">—</div>';
        var conc = a260 * f * df;
        var r28 = a280 ? a260 / a280 : null;
        var r23 = a230 ? a260 / a230 : null;
        var isRNA = f === 40;
        var want = isRNA ? 2.0 : 1.8;
        var notes = [];
        if (r28 !== null && r28 < want - 0.15) notes.push('A₂₆₀/A₂₈₀ is low — protein or phenol carryover.');
        if (r23 !== null && r23 < 1.8) notes.push('A₂₆₀/A₂₃₀ below 1.8 — guanidine, phenol or salt carryover. This inhibits downstream enzymes.');
        if (a260 > 1.0) notes.push('A₂₆₀ above 1.0 is outside the reliable linear range — dilute and re-read.');
        return '<div class="big">' + sig(conc, 1) + ' µg/mL</div>' +
          '<div class="sub">= ' + sig(conc, 1) + ' ng/µL</div>' +
          '<div class="rows">' +
          '<div>A₂₆₀/A₂₈₀<b>' + (r28 === null ? '—' : r28.toFixed(2)) + ' (want ≈ ' + want.toFixed(1) + ')</b></div>' +
          '<div>A₂₆₀/A₂₃₀<b>' + (r23 === null ? '—' : r23.toFixed(2)) + ' (want 2.0–2.2)</b></div>' +
          '<div>In 50 µL<b>' + sig(conc * 0.05, 2) + ' µg</b></div></div>' +
          (notes.length ? '<div class="warn">' + notes.join(' ') + '</div>' : '');
      }));

    /* 5. primer Tm */
    g.appendChild(card('Primer melting temperature',
      'Nearest-neighbour thermodynamics, with the Wallace rule for comparison.',
      [
        { key: 'seq', label: 'Primer sequence (5′ → 3′)', wide: true, type: 'text', value: 'GTAAAACGACGGCCAGT' },
        { key: 'conc', label: 'Primer concentration', hint: 'µM', value: 0.25, step: 'any' },
        { key: 'na', label: 'Monovalent salt', hint: 'mM Na⁺ equivalent', value: 50 }
      ],
      'SantaLucia nearest-neighbour, salt-corrected. Anneal at about Tm − 5 °C.',
      function (v) {
        var r = tmNN(v.seq || '', num(v.conc), num(v.na));
        if (!r) return '<div class="big">—</div><div class="sub">Enter at least two A, C, G or T bases.</div>';
        var s = r.seq;
        var wallace = s.length <= 20
          ? 2 * (s.match(/[AT]/g) || []).length + 4 * (s.match(/[GC]/g) || []).length : null;
        var notes = [];
        if (r.len < 18) notes.push('Shorter than 18 nt — specificity may suffer.');
        if (r.len > 30) notes.push('Longer than 30 nt rarely helps and anneals slowly.');
        if (r.gc < 40 || r.gc > 60) notes.push('GC content outside 40–60%.');
        if (!/[GC]$/.test(s)) notes.push('No G or C at the 3′ end — the GC clamp anchors extension.');
        if (/(.)\1\1\1/.test(s)) notes.push('Run of four or more identical bases can cause slippage.');
        return '<div class="big">' + r.tm.toFixed(1) + ' °C</div>' +
          '<div class="sub">nearest-neighbour Tm · anneal at ≈ ' + (r.tm - 5).toFixed(0) + ' °C</div>' +
          '<div class="rows">' +
          '<div>Length<b>' + r.len + ' nt</b></div>' +
          '<div>GC content<b>' + r.gc.toFixed(1) + '%</b></div>' +
          '<div>Wallace rule<b>' + (wallace === null ? 'n/a above 20 nt' : wallace + ' °C') + '</b></div></div>' +
          (notes.length ? '<div class="warn">' + notes.join(' ') + '</div>' : '');
      }));

    /* 6. parasitaemia */
    g.appendChild(card('Malaria parasite density',
      'Thick film against white cells, and thin film percentage.',
      [
        { key: 'par', label: 'Parasites counted', hint: 'on the thick film', value: 120 },
        { key: 'wbc', label: 'White cells counted', hint: 'usually 200 or 500', value: 200 },
        { key: 'twbc', label: 'Patient white count', hint: 'per µL — assume 8000 if unknown', value: 8000 },
        { key: 'inf', label: 'Infected red cells', hint: 'thin film, per 1000 RBC', value: 25 }
      ],
      'parasites/µL = (parasites ÷ WBC counted) × patient WBC',
      function (v) {
        var p = num(v.par), w = num(v.wbc), tw = num(v.twbc), inf = num(v.inf);
        if (p === null || !w || !tw) return '<div class="big">—</div>';
        var dens = (p / w) * tw;
        var pct = inf === null ? null : inf / 10;
        var sev = [];
        if (dens > 250000) sev.push('Above 250,000/µL — hyperparasitaemia.');
        if (pct !== null && pct >= 10) sev.push('≥10% parasitaemia is a WHO criterion for severe malaria — treat with IV artesunate.');
        else if (pct !== null && pct >= 2) sev.push('Above 2% indicates a significant parasite burden in a non-immune patient.');
        return '<div class="big">' + sig(dens, 1) + ' /µL</div>' +
          '<div class="sub">parasite density from the thick film</div>' +
          '<div class="rows">' +
          '<div>Parasitaemia<b>' + (pct === null ? '—' : pct.toFixed(2) + '%') + '</b></div>' +
          '<div>Per 1000 RBC<b>' + (inf === null ? '—' : inf) + '</b></div>' +
          '</div>' +
          (sev.length ? '<div class="warn">' + sev.join(' ') + '</div>' : '');
      }));

    /* 7. make a solution */
    g.appendChild(card('Make a solution from solid',
      'Mass of powder needed for a given molarity and volume.',
      [
        { key: 'mw', label: 'Molecular weight', hint: 'g/mol', value: 58.44, step: 'any' },
        { key: 'm', label: 'Molarity wanted', hint: 'mol/L', value: 0.15, step: 'any' },
        { key: 'vol', label: 'Volume', hint: 'mL', value: 500, step: 'any' }
      ],
      'mass (g) = molarity × volume (L) × molecular weight',
      function (v) {
        var mw = num(v.mw), m = num(v.m), vol = num(v.vol);
        if (!mw || m === null || !vol) return '<div class="big">—</div>';
        var g2 = m * (vol / 1000) * mw;
        return '<div class="big">' + sig(g2, 3) + ' g</div>' +
          '<div class="sub">dissolved and made up to ' + vol + ' mL</div>' +
          '<div class="rows">' +
          '<div>In mg<b>' + sig(g2 * 1000, 3) + ' mg</b></div>' +
          '<div>Moles needed<b>' + sig(m * vol / 1000, 3) + ' mol</b></div></div>';
      }));

    /* 8. OD to cells */
    g.appendChild(card('OD₆₀₀ to cell density',
      'Approximate conversion for a bacterial culture. Calibrate against your own plate counts.',
      [
        { key: 'od', label: 'OD₆₀₀ reading', value: 0.6, step: 'any' },
        { key: 'df', label: 'Dilution before reading', hint: 'Enter 1 if read neat', value: 1 },
        { key: 'factor', label: 'Cells per mL at OD 1.0', options: [['8e8', 'E. coli ≈ 8 × 10⁸'], ['1e9', 'Generic ≈ 1 × 10⁹'], ['3e7', 'Yeast ≈ 3 × 10⁷'], ['1e6', 'Mammalian ≈ 1 × 10⁶']] }
      ],
      'cells/mL ≈ OD₆₀₀ × dilution × strain factor',
      function (v) {
        var od = num(v.od), df = num(v.df) || 1, f = num(v.factor);
        if (od === null || !f) return '<div class="big">—</div>';
        var eff = od * df;
        var cells = eff * f;
        var warn = '';
        if (od > 0.8) warn = 'Above OD 0.8 the relationship is no longer linear — dilute the sample and multiply back.';
        else if (od < 0.05) warn = 'Below OD 0.05 the reading is mostly noise.';
        return '<div class="big">' + sig(cells, 2) + ' cells/mL</div>' +
          '<div class="sub">effective OD ' + eff.toFixed(2) + '</div>' +
          '<div class="rows">' +
          '<div>In 10 mL<b>' + sig(cells * 10, 2) + '</b></div>' +
          '<div>Phase<b>' + (eff < 0.1 ? 'lag / early log' : eff < 0.8 ? 'exponential' : 'late log / stationary') + '</b></div></div>' +
          (warn ? '<div class="warn">' + warn + '</div>' : '');
      }));

    return g;
  }

  window.Calculators = { render: render };
})();
