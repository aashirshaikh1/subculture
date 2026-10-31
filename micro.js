/* Simulated micrographs rendered to canvas.
   These are drawn in code — not photographs — but they model the real optics:
   Köhler illumination falloff, depth of field, stain granularity, sensor grain,
   and the correct imaging modality for each organism (brightfield stain,
   negative-stain TEM, thin-section TEM, phase contrast, or a culture plate). */
(function () {
  'use strict';

  /* ── seeded random ──────────────────────────────────────────── */
  function RNG(seed) {
    var s = seed || 1;
    return function () { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  }

  var noiseTile = null;
  function tile() {
    if (noiseTile) return noiseTile;
    var c = document.createElement('canvas'); c.width = c.height = 128;
    var x = c.getContext('2d'), d = x.createImageData(128, 128), r = RNG(99);
    for (var i = 0; i < d.data.length; i += 4) {
      var v = 110 + r() * 90;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255;
    }
    x.putImageData(d, 0, 0); noiseTile = c; return c;
  }

  function grain(ctx, W, H, amount, mode) {
    ctx.save();
    ctx.globalAlpha = amount;
    ctx.globalCompositeOperation = mode || 'overlay';
    var p = ctx.createPattern(tile(), 'repeat');
    ctx.fillStyle = p; ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function vignette(ctx, W, H, strength, color) {
    var g = ctx.createRadialGradient(W * 0.5, H * 0.47, Math.min(W, H) * 0.18, W * 0.5, H * 0.5, Math.max(W, H) * 0.74);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, color || 'rgba(0,0,0,' + strength + ')');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }

  function illuminate(ctx, W, H, c1, c2) {           // uneven condenser illumination
    var g = ctx.createRadialGradient(W * 0.42, H * 0.38, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.78);
    g.addColorStop(0, c1); g.addColorStop(1, c2);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }

  function blurOn(ctx, px) { try { ctx.filter = 'blur(' + px + 'px)'; } catch (e) { } }
  function blurOff(ctx) { try { ctx.filter = 'none'; } catch (e) { } }

  /* irregular cell outline — nothing in a real field is a perfect circle */
  function blob(ctx, x, y, r, wob, rnd, lobes) {
    lobes = lobes || 9;
    ctx.beginPath();
    var pts = [];
    for (var i = 0; i < lobes; i++) {
      var a = i / lobes * Math.PI * 2;
      var rr = r * (1 - wob / 2 + rnd() * wob);
      pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]);
    }
    ctx.moveTo((pts[0][0] + pts[lobes - 1][0]) / 2, (pts[0][1] + pts[lobes - 1][1]) / 2);
    for (var j = 0; j < lobes; j++) {
      var cur = pts[j], nxt = pts[(j + 1) % lobes];
      ctx.quadraticCurveTo(cur[0], cur[1], (cur[0] + nxt[0]) / 2, (cur[1] + nxt[1]) / 2);
    }
    ctx.closePath();
  }

  /* ── brightfield: Ziehl–Neelsen sputum smear ────────────────── */
  function zn(ctx, W, H) {
    var r = RNG(42);
    illuminate(ctx, W, H, '#eef4fb', '#b9ccdf');

    // mucus strands in the background, out of focus
    blurOn(ctx, 7);
    ctx.strokeStyle = 'rgba(120,152,190,0.3)';
    for (var m = 0; m < 7; m++) {
      ctx.lineWidth = 12 + r() * 26; ctx.beginPath();
      var y0 = r() * H;
      ctx.moveTo(-40, y0);
      ctx.bezierCurveTo(W * 0.3, y0 + (r() - 0.5) * 220, W * 0.7, y0 + (r() - 0.5) * 220, W + 40, r() * H);
      ctx.stroke();
    }
    blurOff(ctx);

    // out-of-focus cells underneath
    blurOn(ctx, 5);
    for (var b = 0; b < 11; b++) {
      var bx = r() * W, by = r() * H, br = 22 + r() * 30;
      ctx.fillStyle = 'rgba(86,122,170,0.3)';
      blob(ctx, bx, by, br, 0.3, r); ctx.fill();
    }
    blurOff(ctx);

    // neutrophils (pus cells) — lobed nuclei, methylene blue
    function pusCell(cx, cy, scale, alpha) {
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.fillStyle = '#9fb6d4';
      blob(ctx, cx, cy, 30 * scale, 0.26, r, 11); ctx.fill();
      ctx.strokeStyle = 'rgba(70,104,150,0.5)'; ctx.lineWidth = 1.4 * scale; ctx.stroke();
      var lobes = 3 + Math.floor(r() * 2);
      for (var i = 0; i < lobes; i++) {
        var a = i / lobes * 6.28 + r();
        var g = ctx.createRadialGradient(cx + Math.cos(a) * 11 * scale, cy + Math.sin(a) * 11 * scale, 1,
          cx + Math.cos(a) * 11 * scale, cy + Math.sin(a) * 11 * scale, 12 * scale);
        g.addColorStop(0, '#2d4a7c'); g.addColorStop(1, '#4a69a0');
        ctx.fillStyle = g;
        blob(ctx, cx + Math.cos(a) * 11 * scale, cy + Math.sin(a) * 11 * scale, 10.5 * scale, 0.35, r, 8);
        ctx.fill();
      }
      ctx.restore();
    }
    for (var p = 0; p < 9; p++) pusCell(30 + r() * (W - 60), 24 + r() * (H - 48), 0.8 + r() * 0.6, 0.9);

    // acid-fast bacilli — beaded, slightly curved, often in parallel cords
    function bacillus(x, y, ang, len, alpha, blurPx) {
      if (blurPx) blurOn(ctx, blurPx);
      ctx.save();
      ctx.translate(x, y); ctx.rotate(ang); ctx.globalAlpha = alpha;
      var beads = Math.max(5, Math.round(len / 5.2));
      var curve = (r() - 0.5) * 0.5;
      for (var i = 0; i < beads; i++) {
        var t = i / (beads - 1) - 0.5;
        var bx = t * len, by = Math.sin(t * 3.14) * curve * len * 0.12;
        var rad = 2.7 * (0.72 + 0.38 * Math.sin(i * 1.9 + 0.7));   // the beaded look
        var g = ctx.createRadialGradient(bx, by - 0.6, 0.2, bx, by, rad * 1.5);
        g.addColorStop(0, '#e8486b'); g.addColorStop(0.55, '#c2185b'); g.addColorStop(1, 'rgba(150,20,60,0.75)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.ellipse(bx, by, rad * 1.22, rad, 0, 0, 6.3); ctx.fill();
      }
      ctx.restore();
      if (blurPx) blurOff(ctx);
    }
    // a cord of parallel bacilli — cord factor makes them stick side by side
    var cx0 = W * 0.26, cy0 = H * 0.42, ca = -0.38;
    for (var c = 0; c < 5; c++) {
      bacillus(cx0 + Math.cos(ca + 1.57) * c * 7.5, cy0 + Math.sin(ca + 1.57) * c * 7.5, ca, 46 + r() * 10, 0.95, 0);
    }
    var dx0 = W * 0.66, dy0 = H * 0.68, da = 0.52;
    for (var c2 = 0; c2 < 4; c2++) {
      bacillus(dx0 + Math.cos(da + 1.57) * c2 * 8, dy0 + Math.sin(da + 1.57) * c2 * 8, da, 42 + r() * 12, 0.92, 0);
    }
    // scattered singles, a few slightly out of the focal plane
    for (var s = 0; s < 16; s++) {
      bacillus(34 + r() * (W - 68), 24 + r() * (H - 48), r() * 6.28, 34 + r() * 20,
        0.6 + r() * 0.4, r() < 0.3 ? 1.6 : 0);
    }

    grain(ctx, W, H, 0.18, 'overlay');
    vignette(ctx, W, H, 0.3, 'rgba(26,46,76,0.34)');
  }

  /* ── brightfield: Giemsa thin film ──────────────────────────── */
  function giemsa(ctx, W, H) {
    var r = RNG(7);
    illuminate(ctx, W, H, '#fdf3f4', '#e8ccd4');

    function rbc(cx, cy, rad, alpha, blurPx, crenated) {
      if (blurPx) blurOn(ctx, blurPx);
      ctx.save(); ctx.globalAlpha = alpha;
      var g = ctx.createRadialGradient(cx, cy, rad * 0.18, cx, cy, rad);
      g.addColorStop(0, '#f6d8dc');          // central pallor
      g.addColorStop(0.42, '#eab6bf');
      g.addColorStop(0.82, '#d98b9c');
      g.addColorStop(1, '#c9788c');
      ctx.fillStyle = g;
      blob(ctx, cx, cy, rad, crenated ? 0.22 : 0.07, r, crenated ? 13 : 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(176,96,118,0.4)'; ctx.lineWidth = 0.9; ctx.stroke();
      ctx.restore();
      if (blurPx) blurOff(ctx);
    }

    // background layer, out of focus
    for (var i = 0; i < 16; i++) rbc(r() * W, r() * H, 17 + r() * 4, 0.6, 4.5, false);

    // in-focus monolayer
    var cells = [];
    for (var row = 0; row < 5; row++) {
      for (var col = 0; col < 13; col++) {
        var cx = 28 + col * 68 + (row % 2) * 30 + (r() - 0.5) * 16;
        var cy = 36 + row * 62 + (r() - 0.5) * 16;
        if (cx > W - 18 || cy > H - 14) continue;
        cells.push([cx, cy, 19 + r() * 3]);
      }
    }
    cells.forEach(function (c) { rbc(c[0], c[1], c[2], 1, 0, r() < 0.12); });

    // ring forms: thin blue cytoplasm, one or two red chromatin dots
    function ring(cx, cy, rad, dbl) {
      ctx.save();
      ctx.strokeStyle = '#5063b4'; ctx.lineWidth = rad * 0.34;
      ctx.beginPath(); ctx.arc(cx, cy, rad, 0.35, 5.9); ctx.stroke();
      var g = ctx.createRadialGradient(cx + rad * 0.8, cy - rad * 0.55, 0.3, cx + rad * 0.8, cy - rad * 0.55, rad * 0.52);
      g.addColorStop(0, '#c0304f'); g.addColorStop(1, '#8e1c3c');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx + rad * 0.8, cy - rad * 0.55, rad * 0.44, 0, 6.3); ctx.fill();
      if (dbl) {
        ctx.fillStyle = '#9e2342';
        ctx.beginPath(); ctx.arc(cx - rad * 0.75, cy + rad * 0.6, rad * 0.36, 0, 6.3); ctx.fill();
      }
      ctx.restore();
    }
    var hit = [4, 11, 19, 26, 33, 41];
    hit.forEach(function (idx, n) {
      var c = cells[idx % cells.length]; if (!c) return;
      if (n === 2) {                         // two rings in one cell — a falciparum clue
        ring(c[0] - 6, c[1] - 3, 6.4, false);
        ring(c[0] + 7, c[1] + 5, 5.8, false);
      } else if (n === 4) {                  // appliqué form, pushed against the rim
        ring(c[0] + c[2] * 0.62, c[1], 6.2, false);
      } else {
        ring(c[0] + 1, c[1] - 2, 6.6, n === 0);
      }
    });

    // banana-shaped gametocyte — pathognomonic for P. falciparum
    (function () {
      var gx = W * 0.78, gy = H * 0.3;
      ctx.save(); ctx.translate(gx, gy); ctx.rotate(-0.5);
      var g = ctx.createLinearGradient(-26, 0, 26, 0);
      g.addColorStop(0, '#6b79c0'); g.addColorStop(0.5, '#8490cc'); g.addColorStop(1, '#6b79c0');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(-28, 4); ctx.quadraticCurveTo(0, -20, 28, 4);
      ctx.quadraticCurveTo(0, 16, -28, 4); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(70,82,150,0.6)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#3b2a5e';
      for (var k = 0; k < 9; k++) {           // haemozoin pigment granules
        ctx.beginPath();
        ctx.arc(-14 + k * 3.4 + (r() - 0.5) * 3, 2 + (r() - 0.5) * 7, 1.5 + r(), 0, 6.3); ctx.fill();
      }
      ctx.restore();
    })();

    // a lymphocyte for scale, and platelets
    (function () {
      var lx = W * 0.15, ly = H * 0.74;
      ctx.fillStyle = '#9fc0d8'; blob(ctx, lx, ly, 24, 0.14, r); ctx.fill();
      var g = ctx.createRadialGradient(lx + 2, ly - 2, 2, lx, ly, 20);
      g.addColorStop(0, '#3b2a6e'); g.addColorStop(1, '#5a4594');
      ctx.fillStyle = g; blob(ctx, lx, ly, 18, 0.16, r); ctx.fill();
    })();
    for (var pl = 0; pl < 7; pl++) {
      ctx.fillStyle = 'rgba(128,70,130,0.78)';
      blob(ctx, r() * W, r() * H, 3 + r() * 2.4, 0.5, r, 7); ctx.fill();
    }

    grain(ctx, W, H, 0.15, 'overlay');
    vignette(ctx, W, H, 0.26, 'rgba(90,40,60,0.3)');
  }

  /* ── brightfield: Gram stain ────────────────────────────────── */
  function gram(ctx, W, H, o) {
    if (typeof o === 'string') o = { shape: o };
    var shape = o.shape, positive = !!o.positive, arrange = o.arrange || 'single';
    var r = RNG(shape === 'comma' ? 15 : shape === 'coccus' ? 31 : 23);
    illuminate(ctx, W, H, '#fbf4f6', '#ddc6d2');

    blurOn(ctx, 6);
    for (var d = 0; d < 13; d++) {
      ctx.fillStyle = 'rgba(140,96,130,0.22)';
      blob(ctx, r() * W, r() * H, 14 + r() * 26, 0.4, r); ctx.fill();
    }
    blurOff(ctx);

    var C = positive
      ? ['#8b6fd8', '#5b3fa8', '#3f2a7c']    // crystal violet retained
      : ['#e0637e', '#c2344f', '#9c2038'];   // safranin counterstain

    function rod(x, y, ang, len, wid, alpha, blurPx) {
      if (blurPx) blurOn(ctx, blurPx);
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.globalAlpha = alpha;
      var g = ctx.createLinearGradient(0, -wid, 0, wid);
      g.addColorStop(0, C[0]); g.addColorStop(0.45, C[1]); g.addColorStop(1, C[2]);
      ctx.fillStyle = g;
      ctx.beginPath();
      if (shape === 'comma') {
        ctx.moveTo(-len / 2, wid * 0.3);
        ctx.quadraticCurveTo(0, -wid * 2.6, len / 2, wid * 0.3);
        ctx.quadraticCurveTo(0, -wid * 0.5, -len / 2, wid * 0.3);
      } else {
        ctx.roundRect ? ctx.roundRect(-len / 2, -wid, len, wid * 2, wid)
          : ctx.rect(-len / 2, -wid, len, wid * 2);
      }
      ctx.closePath(); ctx.fill();
      ctx.restore();
      if (blurPx) blurOff(ctx);
    }

    function coccus(x, y, rad, alpha, blurPx) {
      if (blurPx) blurOn(ctx, blurPx);
      ctx.save(); ctx.globalAlpha = alpha;
      var g = ctx.createRadialGradient(x - rad * 0.3, y - rad * 0.32, rad * 0.12, x, y, rad);
      g.addColorStop(0, C[0]); g.addColorStop(0.6, C[1]); g.addColorStop(1, C[2]);
      ctx.fillStyle = g;
      blob(ctx, x, y, rad, 0.09, r, 11); ctx.fill();
      ctx.restore();
      if (blurPx) blurOff(ctx);
    }

    if (shape === 'coccus') {
      var rad = 5.6;
      if (arrange === 'chain') {
        // streptococci: chains that wander across the field
        for (var ch = 0; ch < 7; ch++) {
          var x = 40 + r() * (W - 110), y = 34 + r() * (H - 68);
          var ang = r() * 6.28, n = 6 + Math.floor(r() * 10);
          var bl = r() < 0.22 ? 2 : 0;
          for (var i2 = 0; i2 < n; i2++) {
            ang += (r() - 0.5) * 0.42;
            x += Math.cos(ang) * rad * 1.92;
            y += Math.sin(ang) * rad * 1.92;
            if (x < 12 || x > W - 12 || y < 12 || y > H - 12) break;
            coccus(x, y, rad * (0.92 + r() * 0.18), 0.85 + r() * 0.15, bl);
          }
        }
        for (var sgl = 0; sgl < 14; sgl++) {
          coccus(24 + r() * (W - 48), 20 + r() * (H - 40), rad, 0.5 + r() * 0.4, r() < 0.4 ? 2.4 : 0);
        }
      } else {
        // staphylococci: irregular grape-like clusters
        for (var cl = 0; cl < 8; cl++) {
          var cx = 50 + r() * (W - 100), cy = 40 + r() * (H - 80);
          var n2 = 7 + Math.floor(r() * 12);
          var bl2 = r() < 0.2 ? 2 : 0;
          for (var j = 0; j < n2; j++) {
            var a2 = r() * 6.28, d2 = r() * rad * 3.4;
            coccus(cx + Math.cos(a2) * d2, cy + Math.sin(a2) * d2,
              rad * (0.9 + r() * 0.22), 0.86 + r() * 0.14, bl2);
          }
        }
        for (var s2 = 0; s2 < 16; s2++) {
          coccus(24 + r() * (W - 48), 20 + r() * (H - 40), rad, 0.5 + r() * 0.4, r() < 0.4 ? 2.4 : 0);
        }
      }
    } else {
      for (var i = 0; i < 46; i++) {
        rod(26 + r() * (W - 52), 20 + r() * (H - 40), r() * 6.28,
          shape === 'comma' ? 20 + r() * 9 : 24 + r() * 12, 3.1 + r() * 0.9,
          0.62 + r() * 0.38, r() < 0.26 ? 2 : 0);
      }
      var hx = W * 0.62, hy = H * 0.4;
      for (var k = 0; k < 9; k++) {
        rod(hx + (r() - 0.5) * 52, hy + (r() - 0.5) * 44, r() * 6.28,
          shape === 'comma' ? 21 + r() * 7 : 25 + r() * 9, 3.3, 0.95, 0);
      }
    }

    grain(ctx, W, H, 0.16, 'overlay');
    vignette(ctx, W, H, 0.27, 'rgba(70,30,56,0.32)');
  }

  /* ── negative-stain TEM, shared by the viruses ──────────────── */
  function negStain(ctx, W, H, o) {
    var r = RNG(o.seed || 5);
    // electron-dense stain pools dark; particles exclude it and come out light
    illuminate(ctx, W, H, '#3c3f45', '#16181c');
    blurOn(ctx, 16);
    for (var p = 0; p < 16; p++) {
      ctx.fillStyle = 'rgba(8,9,11,0.5)';
      blob(ctx, r() * W, r() * H, 40 + r() * 90, 0.5, r); ctx.fill();
      ctx.fillStyle = 'rgba(96,102,112,0.2)';
      blob(ctx, r() * W, r() * H, 30 + r() * 70, 0.5, r); ctx.fill();
    }
    blurOff(ctx);

    function particle(cx, cy, rad, blurPx, alpha, pleo) {
      ctx.save(); ctx.globalAlpha = alpha;
      if (blurPx) blurOn(ctx, blurPx);

      // spikes first, so the body overlaps their base
      if (o.spike && o.spike !== 'none') {
        var n = Math.max(14, Math.round(rad * (o.spikeDensity || 0.62)));
        for (var i = 0; i < n; i++) {
          var a = i / n * 6.28 + r() * 0.07;
          var x0 = cx + Math.cos(a) * rad * 0.97, y0 = cy + Math.sin(a) * rad * 0.97;
          var len = o.spike === 'club' ? rad * 0.3 : rad * 0.17;
          var x1 = cx + Math.cos(a) * (rad + len), y1 = cy + Math.sin(a) * (rad + len);
          ctx.strokeStyle = 'rgba(206,212,220,0.82)';
          ctx.lineWidth = o.spike === 'club' ? rad * 0.062 : rad * 0.05;
          ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
          if (o.spike === 'club') {
            ctx.fillStyle = 'rgba(224,230,238,0.88)';
            ctx.beginPath(); ctx.arc(x1, y1, rad * 0.072, 0, 6.3); ctx.fill();
          }
        }
      }
      // body: light interior, dark stain rim
      var g = ctx.createRadialGradient(cx - rad * 0.3, cy - rad * 0.32, rad * 0.1, cx, cy, rad * 1.04);
      g.addColorStop(0, '#d7dce3'); g.addColorStop(0.55, '#b3bac4'); g.addColorStop(0.88, '#7d848f');
      g.addColorStop(1, '#2a2e34');
      ctx.fillStyle = g;
      if (o.form === 'bullet') {
        // rhabdovirus: one rounded end, one flat — the bullet profile
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(r() * 6.28);
        var hw = rad * 0.62, hl = rad * 1.5;
        ctx.beginPath();
        ctx.moveTo(-hl, -hw);
        ctx.lineTo(hl * 0.25, -hw);
        ctx.quadraticCurveTo(hl, -hw, hl, 0);
        ctx.quadraticCurveTo(hl, hw, hl * 0.25, hw);
        ctx.lineTo(-hl, hw);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(32,36,42,0.85)'; ctx.lineWidth = rad * 0.1; ctx.stroke();
        // internal helical striations
        ctx.strokeStyle = 'rgba(70,76,86,0.5)'; ctx.lineWidth = rad * 0.055;
        for (var st = -hl + rad * 0.22; st < hl * 0.3; st += rad * 0.2) {
          ctx.beginPath(); ctx.moveTo(st, -hw * 0.78); ctx.lineTo(st, hw * 0.78); ctx.stroke();
        }
        ctx.restore();
      } else {
        blob(ctx, cx, cy, rad, pleo ? 0.3 : 0.1, r, pleo ? 11 : 14);
        ctx.fill();
      }
      // internal density
      if (o.core) {
        ctx.fillStyle = 'rgba(52,57,64,0.6)';
        blob(ctx, cx + (r() - 0.5) * rad * 0.2, cy + (r() - 0.5) * rad * 0.2, rad * 0.5, 0.35, r, 9);
        ctx.fill();
      }
      if (blurPx) blurOff(ctx);
      ctx.restore();
    }

    // background particles, out of focus
    (o.bg || []).forEach(function () { });
    for (var b = 0; b < (o.blurCount || 6); b++) {
      particle(r() * W, r() * H, o.radius * (0.85 + r() * 0.3), 3.2, 0.55, o.pleomorphic);
    }
    // in-focus particles on a loose grid so they do not overlap awkwardly
    var cols = o.cols || 5, rows = o.rows || 3;
    for (var cI = 0; cI < cols; cI++) {
      for (var rI = 0; rI < rows; rI++) {
        if (r() < (o.skip || 0.16)) continue;
        var cx = (cI + 0.5) * (W / cols) + (r() - 0.5) * (W / cols) * 0.42;
        var cy = (rI + 0.5) * (H / rows) + (r() - 0.5) * (H / rows) * 0.42;
        particle(cx, cy, o.radius * (0.84 + r() * 0.34), 0, 1, o.pleomorphic);
      }
    }
    // hepatitis B: a shower of small spheres and filaments of surface antigen
    if (o.subviral) {
      for (var s = 0; s < 54; s++) {
        particle(r() * W, r() * H, o.radius * (0.26 + r() * 0.09), r() < 0.25 ? 2.4 : 0, 0.92, false);
      }
      for (var f = 0; f < 7; f++) {
        var fx = r() * W, fy = r() * H, fa = r() * 6.28, fl = 50 + r() * 120;
        ctx.save(); ctx.translate(fx, fy); ctx.rotate(fa);
        var fg = ctx.createLinearGradient(0, -o.radius * 0.3, 0, o.radius * 0.3);
        fg.addColorStop(0, '#2b2f35'); fg.addColorStop(0.3, '#c3cad4');
        fg.addColorStop(0.7, '#aeb6c1'); fg.addColorStop(1, '#2b2f35');
        ctx.fillStyle = fg;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-fl / 2, -o.radius * 0.3, fl, o.radius * 0.6, o.radius * 0.3);
        else ctx.rect(-fl / 2, -o.radius * 0.3, fl, o.radius * 0.6);
        ctx.fill(); ctx.restore();
      }
    }
    // filoviruses: long threads, often hooked into a shepherd's crook
    if (o.threads) {
      for (var th = 0; th < 5; th++) {
        var sx = 40 + r() * (W - 80), sy = 40 + r() * (H - 80);
        var ang2 = r() * 6.28, seg = 30 + r() * 26, w2 = o.radius * 0.42;
        var pts = [[sx, sy]];
        for (var q2 = 0; q2 < 11; q2++) {
          ang2 += (r() - 0.5) * 0.3 + (q2 > 7 ? 0.42 : 0);   // the terminal hook
          sx += Math.cos(ang2) * seg; sy += Math.sin(ang2) * seg;
          pts.push([sx, sy]);
        }
        ctx.save();
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgba(30,34,40,0.92)'; ctx.lineWidth = w2 * 2.3;
        ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
        for (var q3 = 1; q3 < pts.length; q3++) ctx.lineTo(pts[q3][0], pts[q3][1]);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(196,204,214,0.9)'; ctx.lineWidth = w2 * 1.3;
        ctx.stroke();
        ctx.restore();
      }
    }

    // influenza: filamentous forms, common in fresh clinical isolates
    if (o.filaments) {
      for (var ff = 0; ff < 3; ff++) {
        var ax = r() * W, ay = r() * H, aa = r() * 6.28, al = 110 + r() * 150;
        ctx.save(); ctx.translate(ax, ay); ctx.rotate(aa);
        var ag = ctx.createLinearGradient(0, -o.radius * 0.6, 0, o.radius * 0.6);
        ag.addColorStop(0, '#30343b'); ag.addColorStop(0.28, '#cbd2db');
        ag.addColorStop(0.72, '#aab2bd'); ag.addColorStop(1, '#30343b');
        ctx.fillStyle = ag;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-al / 2, -o.radius * 0.6, al, o.radius * 1.2, o.radius * 0.6);
        else ctx.rect(-al / 2, -o.radius * 0.6, al, o.radius * 1.2);
        ctx.fill();
        for (var sp = 0; sp < Math.round(al / 5); sp++) {   // spike fringe along the filament
          var t = -al / 2 + sp * 5;
          ctx.strokeStyle = 'rgba(200,207,216,0.7)'; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(t, -o.radius * 0.6); ctx.lineTo(t, -o.radius * 0.84); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(t, o.radius * 0.6); ctx.lineTo(t, o.radius * 0.84); ctx.stroke();
        }
        ctx.restore();
      }
    }

    grain(ctx, W, H, 0.3, 'overlay');
    vignette(ctx, W, H, 0.44, 'rgba(0,0,0,0.5)');
  }

  /* ── thin-section TEM: HIV budding from a lymphocyte ────────── */
  function temHiv(ctx, W, H) {
    var r = RNG(11);
    illuminate(ctx, W, H, '#6e737b', '#3d4147');

    // cytoplasm of the host cell occupying the lower left
    ctx.save();
    var cg = ctx.createLinearGradient(0, H, W * 0.8, 0);
    cg.addColorStop(0, '#9aa0a8'); cg.addColorStop(1, '#6a7078');
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.moveTo(-20, H + 20);
    ctx.bezierCurveTo(W * 0.1, H * 0.52, W * 0.46, H * 0.74, W * 0.72, H * 0.2);
    ctx.lineTo(W * 0.82, H + 20); ctx.closePath(); ctx.fill();

    // granular cytoplasmic texture
    for (var i = 0; i < 900; i++) {
      var gx = r() * W * 0.8, gy = H - r() * H * 0.78;
      ctx.fillStyle = 'rgba(58,62,70,' + (0.05 + r() * 0.16) + ')';
      ctx.beginPath(); ctx.arc(gx, gy, 0.8 + r() * 2.1, 0, 6.3); ctx.fill();
    }
    ctx.restore();

    // plasma membrane — the dark bilayer line
    ctx.save();
    ctx.strokeStyle = '#23262b'; ctx.lineWidth = 3.4;
    ctx.beginPath();
    ctx.moveTo(-20, H + 20);
    ctx.bezierCurveTo(W * 0.1, H * 0.52, W * 0.46, H * 0.74, W * 0.72, H * 0.2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(190,196,204,0.5)'; ctx.lineWidth = 1.1; ctx.stroke();
    ctx.restore();

    // mature free virions — the cone-shaped core is the giveaway
    function mature(cx, cy, rad, blurPx, alpha) {
      if (blurPx) blurOn(ctx, blurPx);
      ctx.save(); ctx.globalAlpha = alpha;
      var g = ctx.createRadialGradient(cx - rad * 0.3, cy - rad * 0.3, rad * 0.15, cx, cy, rad);
      g.addColorStop(0, '#b9bfc7'); g.addColorStop(0.72, '#878d96'); g.addColorStop(1, '#2b2f35');
      ctx.fillStyle = g; blob(ctx, cx, cy, rad, 0.12, r, 13); ctx.fill();
      ctx.strokeStyle = '#1e2126'; ctx.lineWidth = rad * 0.13;
      blob(ctx, cx, cy, rad * 0.97, 0.1, r, 13); ctx.stroke();
      ctx.save();                                    // conical capsid
      ctx.translate(cx, cy); ctx.rotate(r() * 6.28);
      var cg2 = ctx.createLinearGradient(0, -rad * 0.6, 0, rad * 0.6);
      cg2.addColorStop(0, '#31353c'); cg2.addColorStop(1, '#4b505a');
      ctx.fillStyle = cg2;
      ctx.beginPath();
      ctx.moveTo(-rad * 0.17, -rad * 0.56); ctx.lineTo(rad * 0.17, -rad * 0.56);
      ctx.lineTo(rad * 0.42, rad * 0.56); ctx.lineTo(-rad * 0.42, rad * 0.56);
      ctx.closePath(); ctx.fill();
      ctx.restore();
      ctx.restore();
      if (blurPx) blurOff(ctx);
    }
    // budding particles — crescents on the membrane, with no condensed core yet
    function budding(cx, cy, rad, ang) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
      var g = ctx.createRadialGradient(0, 0, rad * 0.2, 0, 0, rad);
      g.addColorStop(0, '#a9afb8'); g.addColorStop(1, '#6d737c');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, rad, Math.PI * 1.08, Math.PI * 2.92); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#23262b'; ctx.lineWidth = rad * 0.2;
      ctx.beginPath(); ctx.arc(0, 0, rad, Math.PI * 1.08, Math.PI * 2.92); ctx.stroke();
      ctx.fillStyle = 'rgba(40,44,50,0.55)';          // electrondense Gag layer under the membrane
      ctx.beginPath(); ctx.arc(0, 0, rad * 0.82, Math.PI * 1.14, Math.PI * 2.86); ctx.stroke();
      ctx.restore();
    }

    budding(W * 0.2, H * 0.66, 19, -0.5);
    budding(W * 0.36, H * 0.6, 17, -0.2);
    budding(W * 0.55, H * 0.52, 18, 0.35);
    budding(W * 0.66, H * 0.33, 16, 0.7);

    for (var m = 0; m < 5; m++) mature(W * (0.2 + r() * 0.7), H * (0.06 + r() * 0.3), 17 + r() * 4, r() < 0.3 ? 2 : 0, 1);
    mature(W * 0.86, H * 0.62, 19, 0, 1);
    mature(W * 0.9, H * 0.86, 17, 2.4, 0.8);

    grain(ctx, W, H, 0.32, 'overlay');
    vignette(ctx, W, H, 0.4, 'rgba(0,0,0,0.46)');
  }

  /* ── phase contrast: the infected culture (used by the game) ── */
  function cpe(ctx, W, H, pct) {
    var r = RNG(3 + Math.round(pct));
    illuminate(ctx, W, H, '#e9eee8', '#b9c3bb');

    blurOn(ctx, 6);
    for (var d = 0; d < 14; d++) {
      ctx.fillStyle = 'rgba(120,138,126,0.26)';
      blob(ctx, r() * W, r() * H, 14 + r() * 26, 0.45, r); ctx.fill();
    }
    blurOff(ctx);

    function cell(cx, cy, rad, infected, blurPx) {
      if (blurPx) blurOn(ctx, blurPx);
      ctx.save();
      var g = ctx.createRadialGradient(cx - rad * 0.3, cy - rad * 0.3, rad * 0.1, cx, cy, rad);
      if (infected) { g.addColorStop(0, '#f0dce8'); g.addColorStop(0.6, '#cfa6c0'); g.addColorStop(1, '#9d7290'); }
      else { g.addColorStop(0, '#f4f7f3'); g.addColorStop(0.55, '#c6d3cd'); g.addColorStop(1, '#8fa39b'); }
      ctx.fillStyle = g; blob(ctx, cx, cy, rad, 0.14, r, 12); ctx.fill();
      ctx.strokeStyle = infected ? 'rgba(90,50,78,0.6)' : 'rgba(58,78,70,0.55)';
      ctx.lineWidth = 1.5; ctx.stroke();                        // phase halo
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 2.2;
      blob(ctx, cx, cy, rad * 1.12, 0.14, r, 12); ctx.stroke();
      ctx.restore();
      if (blurPx) blurOff(ctx);
    }

    for (var b = 0; b < 12; b++) cell(r() * W, r() * H, 10 + r() * 5, r() * 100 < pct, 4);

    var n = 46;
    for (var i = 0; i < n; i++) {
      var cx = 24 + r() * (W - 48), cy = 20 + r() * (H - 40), rad = 11 + r() * 4;
      var inf = r() * 100 < pct;
      if (inf && pct > 45 && r() > 0.76) {
        // syncytium: infected cells fuse into a giant multinucleated balloon
        ctx.save();
        var g2 = ctx.createRadialGradient(cx - 10, cy - 10, 6, cx, cy, rad * 3);
        g2.addColorStop(0, '#e7cfe0'); g2.addColorStop(0.65, '#bd8fae'); g2.addColorStop(1, '#8e6181');
        ctx.fillStyle = g2; blob(ctx, cx, cy, rad * 2.9, 0.2, r, 15); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 3;
        blob(ctx, cx, cy, rad * 3.05, 0.2, r, 15); ctx.stroke();
        for (var q = 0; q < 6; q++) {
          var a = q / 6 * 6.28 + r() * 0.5;
          var ng = ctx.createRadialGradient(cx + Math.cos(a) * rad * 1.3, cy + Math.sin(a) * rad * 1.3, 1,
            cx + Math.cos(a) * rad * 1.3, cy + Math.sin(a) * rad * 1.3, rad * 0.7);
          ng.addColorStop(0, '#5d3a56'); ng.addColorStop(1, '#8a5f80');
          ctx.fillStyle = ng;
          blob(ctx, cx + Math.cos(a) * rad * 1.3, cy + Math.sin(a) * rad * 1.3, rad * 0.62, 0.22, r, 9);
          ctx.fill();
        }
        ctx.restore();
      } else {
        cell(cx, cy, rad, inf, 0);
      }
    }
    grain(ctx, W, H, 0.17, 'overlay');
    vignette(ctx, W, H, 0.3, 'rgba(30,48,38,0.34)');
  }

  /* ── culture plates ─────────────────────────────────────────── */
  function plate(ctx, W, H, kind) {
    var r = RNG(kind === 'tcbs' ? 31 : 17);
    ctx.fillStyle = '#15161a'; ctx.fillRect(0, 0, W, H);

    var cx = W / 2, cy = H / 2, rad = Math.min(W, H) * 0.46;
    // dish rim
    ctx.save();
    var rimG = ctx.createRadialGradient(cx, cy, rad * 0.9, cx, cy, rad * 1.08);
    rimG.addColorStop(0, 'rgba(210,216,224,0.1)'); rimG.addColorStop(0.75, 'rgba(190,198,210,0.35)');
    rimG.addColorStop(1, 'rgba(120,128,140,0.05)');
    ctx.fillStyle = rimG; ctx.beginPath(); ctx.arc(cx, cy, rad * 1.08, 0, 6.3); ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.3); ctx.clip();

    if (kind === 'tcbs') {
      var g = ctx.createRadialGradient(cx - rad * 0.3, cy - rad * 0.35, rad * 0.15, cx, cy, rad);
      g.addColorStop(0, '#2f9e6f'); g.addColorStop(0.7, '#1f8259'); g.addColorStop(1, '#14613f');
      ctx.fillStyle = g; ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
      // sucrose-fermenting colonies turn the surrounding agar yellow
      var cols = [];
      for (var i = 0; i < 70; i++) {
        var a = r() * 6.28, d = Math.sqrt(r()) * rad * 0.9;
        cols.push([cx + Math.cos(a) * d, cy + Math.sin(a) * d, 7 + r() * 7]);
      }
      cols.forEach(function (c) {
        var hg = ctx.createRadialGradient(c[0], c[1], c[2] * 0.6, c[0], c[1], c[2] * 3.1);
        hg.addColorStop(0, 'rgba(228,214,96,0.75)'); hg.addColorStop(1, 'rgba(228,214,96,0)');
        ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(c[0], c[1], c[2] * 3.1, 0, 6.3); ctx.fill();
      });
      cols.forEach(function (c) {
        var cg = ctx.createRadialGradient(c[0] - c[2] * 0.35, c[1] - c[2] * 0.4, c[2] * 0.1, c[0], c[1], c[2]);
        cg.addColorStop(0, '#fdf4b8'); cg.addColorStop(0.6, '#eddc72'); cg.addColorStop(1, '#c9b43f');
        ctx.fillStyle = cg;
        blob(ctx, c[0], c[1], c[2], 0.1, r, 13); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.45)';     // wet, shiny colony surface
        ctx.beginPath(); ctx.ellipse(c[0] - c[2] * 0.3, c[1] - c[2] * 0.38, c[2] * 0.3, c[2] * 0.19, -0.5, 0, 6.3);
        ctx.fill();
      });
    } else {
      // Löwenstein–Jensen slope: opaque green egg medium, rough buff colonies
      var g2 = ctx.createLinearGradient(cx - rad, cy - rad, cx + rad, cy + rad);
      g2.addColorStop(0, '#b9c88a'); g2.addColorStop(0.5, '#9fb06c'); g2.addColorStop(1, '#7d8f52');
      ctx.fillStyle = g2; ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
      for (var t = 0; t < 300; t++) {
        ctx.fillStyle = 'rgba(255,255,255,' + (0.02 + r() * 0.05) + ')';
        ctx.beginPath(); ctx.arc(cx + (r() - 0.5) * rad * 2, cy + (r() - 0.5) * rad * 2, 2 + r() * 9, 0, 6.3); ctx.fill();
      }
      for (var c2 = 0; c2 < 26; c2++) {
        var a2 = r() * 6.28, d2 = Math.sqrt(r()) * rad * 0.85;
        var x = cx + Math.cos(a2) * d2, y = cy + Math.sin(a2) * d2, rr = 7 + r() * 9;
        ctx.save();
        ctx.fillStyle = 'rgba(70,62,40,0.22)';
        blob(ctx, x + 2.5, y + 3, rr, 0.3, r, 13); ctx.fill();
        var cg2 = ctx.createRadialGradient(x - rr * 0.3, y - rr * 0.35, rr * 0.1, x, y, rr);
        cg2.addColorStop(0, '#f2e3c4'); cg2.addColorStop(0.55, '#ddc89c'); cg2.addColorStop(1, '#b9a378');
        ctx.fillStyle = cg2;
        blob(ctx, x, y, rr, 0.3, r, 15); ctx.fill();
        for (var w = 0; w < 16; w++) {               // rough, crumbly "breadcrumb" surface
          ctx.fillStyle = 'rgba(255,250,236,' + (0.12 + r() * 0.3) + ')';
          ctx.beginPath();
          ctx.arc(x + (r() - 0.5) * rr * 1.3, y + (r() - 0.5) * rr * 1.3, rr * (0.1 + r() * 0.2), 0, 6.3);
          ctx.fill();
        }
        ctx.restore();
      }
    }
    // condensation and a specular highlight off the lid
    for (var dr = 0; dr < 26; dr++) {
      ctx.fillStyle = 'rgba(255,255,255,' + (0.05 + r() * 0.12) + ')';
      ctx.beginPath(); ctx.arc(cx + (r() - 0.5) * rad * 1.9, cy + (r() - 0.5) * rad * 1.9, 1 + r() * 3.5, 0, 6.3); ctx.fill();
    }
    var sh = ctx.createLinearGradient(cx - rad, cy - rad, cx + rad * 0.2, cy + rad * 0.3);
    sh.addColorStop(0, 'rgba(255,255,255,0.2)'); sh.addColorStop(0.45, 'rgba(255,255,255,0.03)');
    sh.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sh; ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
    ctx.restore();

    ctx.strokeStyle = 'rgba(226,232,240,0.45)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.3); ctx.stroke();

    grain(ctx, W, H, 0.12, 'overlay');
    vignette(ctx, W, H, 0.5, 'rgba(0,0,0,0.6)');
  }


  /* ── KOH / lactophenol mount: budding yeast and pseudohyphae ── */
  function fungal(ctx, W, H) {
    var r = RNG(57);
    illuminate(ctx, W, H, '#eef1f4', '#c4ccd6');

    blurOn(ctx, 7);
    for (var d = 0; d < 10; d++) {
      ctx.fillStyle = 'rgba(126,142,166,0.2)';
      blob(ctx, r() * W, r() * H, 20 + r() * 44, 0.45, r); ctx.fill();
    }
    blurOff(ctx);

    // squamous epithelial cell ghosts, part-digested by the KOH
    for (var e = 0; e < 4; e++) {
      ctx.save(); ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#9fb0c4';
      blob(ctx, r() * W, r() * H, 60 + r() * 40, 0.26, r, 14); ctx.fill();
      ctx.strokeStyle = 'rgba(90,110,136,0.5)'; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.restore();
    }

    function yeast(x, y, rad, bud, blurPx, alpha) {
      if (blurPx) blurOn(ctx, blurPx);
      ctx.save(); ctx.globalAlpha = alpha === undefined ? 1 : alpha;
      var g = ctx.createRadialGradient(x - rad * 0.3, y - rad * 0.3, rad * 0.1, x, y, rad);
      g.addColorStop(0, 'rgba(255,255,255,0.88)');
      g.addColorStop(0.55, 'rgba(206,218,232,0.72)');
      g.addColorStop(1, 'rgba(120,140,166,0.66)');
      ctx.fillStyle = g;
      blob(ctx, x, y, rad, 0.08, r, 12); ctx.fill();
      ctx.strokeStyle = 'rgba(66,88,118,0.78)'; ctx.lineWidth = 2.1;   // thick refractile wall
      ctx.stroke();
      if (bud) {
        var a = r() * 6.28, br = rad * (0.42 + r() * 0.2);
        var bx = x + Math.cos(a) * (rad + br * 0.62), by = y + Math.sin(a) * (rad + br * 0.62);
        ctx.fillStyle = g;
        blob(ctx, bx, by, br, 0.1, r, 10); ctx.fill();
        ctx.strokeStyle = 'rgba(66,88,118,0.78)'; ctx.lineWidth = 1.7; ctx.stroke();
      }
      ctx.restore();
      if (blurPx) blurOff(ctx);
    }

    // pseudohyphae: elongated cells constricted at the septa
    function pseudohypha(x, y, ang, n) {
      for (var i = 0; i < n; i++) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
        var g = ctx.createLinearGradient(0, -9, 0, 9);
        g.addColorStop(0, 'rgba(255,255,255,0.85)');
        g.addColorStop(0.5, 'rgba(204,216,230,0.7)');
        g.addColorStop(1, 'rgba(118,138,164,0.64)');
        ctx.fillStyle = g;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-20, -8.4, 40, 16.8, 7.4);
        else ctx.rect(-20, -8.4, 40, 16.8);
        ctx.fill();
        ctx.strokeStyle = 'rgba(66,88,118,0.74)'; ctx.lineWidth = 2; ctx.stroke();
        ctx.restore();
        x += Math.cos(ang) * 40; y += Math.sin(ang) * 40;
        ang += (r() - 0.5) * 0.3;
      }
      return [x, y, ang];
    }

    pseudohypha(W * 0.16, H * 0.3, 0.26, 6);
    pseudohypha(W * 0.54, H * 0.72, -0.42, 5);
    pseudohypha(W * 0.68, H * 0.2, 0.82, 4);

    for (var i = 0; i < 26; i++) {
      yeast(26 + r() * (W - 52), 22 + r() * (H - 44), 8 + r() * 4,
        r() < 0.55, r() < 0.26 ? 2.2 : 0, 0.72 + r() * 0.28);
    }
    grain(ctx, W, H, 0.14, 'overlay');
    vignette(ctx, W, H, 0.3, 'rgba(30,44,66,0.32)');
  }

  /* ── Giemsa: amastigotes inside a macrophage ─────────────────── */
  function amastigote(ctx, W, H) {
    var r = RNG(83);
    illuminate(ctx, W, H, '#fdf3f5', '#e4c6d2');

    // background red cells
    for (var i = 0; i < 30; i++) {
      var cx = r() * W, cy = r() * H, rad = 15 + r() * 4;
      var bl = r() < 0.3;
      if (bl) blurOn(ctx, 4);
      var g = ctx.createRadialGradient(cx, cy, rad * 0.2, cx, cy, rad);
      g.addColorStop(0, '#f4d4da'); g.addColorStop(0.45, '#e5aeb9'); g.addColorStop(1, '#cf8496');
      ctx.fillStyle = g; blob(ctx, cx, cy, rad, 0.08, r, 12); ctx.fill();
      if (bl) blurOff(ctx);
    }

    // the parasitised macrophage
    function macrophage(cx, cy, rad, n) {
      ctx.save();
      var g = ctx.createRadialGradient(cx - rad * 0.2, cy - rad * 0.25, rad * 0.2, cx, cy, rad);
      g.addColorStop(0, '#cfd6ea'); g.addColorStop(0.7, '#b3bcd8'); g.addColorStop(1, '#949ec2');
      ctx.fillStyle = g;
      blob(ctx, cx, cy, rad, 0.15, r, 15); ctx.fill();
      ctx.strokeStyle = 'rgba(96,106,150,0.6)'; ctx.lineWidth = 1.6; ctx.stroke();

      // host nucleus, pushed to one side
      var ng = ctx.createRadialGradient(cx - rad * 0.45, cy - rad * 0.4, 3, cx - rad * 0.45, cy - rad * 0.4, rad * 0.42);
      ng.addColorStop(0, '#4b3a86'); ng.addColorStop(1, '#6a55a8');
      ctx.fillStyle = ng;
      blob(ctx, cx - rad * 0.45, cy - rad * 0.4, rad * 0.38, 0.18, r, 11); ctx.fill();

      // amastigotes: each a pale body with a red nucleus and a rod-shaped kinetoplast
      for (var k = 0; k < n; k++) {
        var a = r() * 6.28, d = Math.sqrt(r()) * rad * 0.82;
        var ax = cx + Math.cos(a) * d, ay = cy + Math.sin(a) * d;
        if (Math.hypot(ax - (cx - rad * 0.45), ay - (cy - rad * 0.4)) < rad * 0.44) continue;
        ctx.save(); ctx.translate(ax, ay); ctx.rotate(r() * 6.28);
        ctx.fillStyle = 'rgba(226,230,244,0.95)';
        ctx.beginPath(); ctx.ellipse(0, 0, 5.4, 4.3, 0, 0, 6.3); ctx.fill();
        ctx.strokeStyle = 'rgba(110,120,160,0.6)'; ctx.lineWidth = 0.9; ctx.stroke();
        ctx.fillStyle = '#a8305c';
        ctx.beginPath(); ctx.arc(-1.2, 0, 2.1, 0, 6.3); ctx.fill();
        ctx.fillStyle = '#7d2148';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(1.4, -1.9, 3.1, 1.5, 0.75); else ctx.rect(1.4, -1.9, 3.1, 1.5);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }

    macrophage(W * 0.33, H * 0.46, 56, 34);
    macrophage(W * 0.72, H * 0.6, 44, 22);
    macrophage(W * 0.6, H * 0.18, 34, 12);

    grain(ctx, W, H, 0.15, 'overlay');
    vignette(ctx, W, H, 0.28, 'rgba(90,40,60,0.3)');
  }

  /* ── registry ───────────────────────────────────────────────── */
  var SCENES = {
    zn: { w: 900, h: 540, draw: zn },
    giemsa: { w: 900, h: 460, draw: giemsa },
    'gram-vibrio': { w: 900, h: 460, draw: function (c, W, H) { gram(c, W, H, { shape: 'comma' }); } },
    'gram-rod': { w: 900, h: 460, draw: function (c, W, H) { gram(c, W, H, { shape: 'rod' }); } },
    'gram-cluster': { w: 900, h: 460, draw: function (c, W, H) { gram(c, W, H, { shape: 'coccus', arrange: 'cluster', positive: true }); } },
    'gram-chain': { w: 900, h: 460, draw: function (c, W, H) { gram(c, W, H, { shape: 'coccus', arrange: 'chain', positive: true }); } },
    'gram-curved': { w: 900, h: 460, draw: function (c, W, H) { gram(c, W, H, { shape: 'comma' }); } },
    'koh-fungal': { w: 900, h: 500, draw: fungal },
    'giemsa-amastigote': { w: 900, h: 460, draw: amastigote },
    'tem-hiv': { w: 900, h: 540, draw: temHiv },
    'tem-corona': {
      w: 900, h: 520, draw: function (c, W, H) {
        negStain(c, W, H, { radius: 56, spike: 'club', spikeDensity: 0.5, core: true, cols: 4, rows: 3, seed: 61 });
      }
    },
    'tem-flu': {
      w: 900, h: 520, draw: function (c, W, H) {
        negStain(c, W, H, { radius: 48, spike: 'fringe', spikeDensity: 0.9, core: true, pleomorphic: true, filaments: true, cols: 4, rows: 3, seed: 77 });
      }
    },
    'tem-hbv': {
      w: 900, h: 520, draw: function (c, W, H) {
        negStain(c, W, H, { radius: 52, spike: 'none', core: true, subviral: true, cols: 3, rows: 2, skip: 0.3, blurCount: 3, seed: 29 });
      }
    },
    'tem-dengue': {
      w: 900, h: 520, draw: function (c, W, H) {
        negStain(c, W, H, { radius: 44, spike: 'none', core: true, cols: 5, rows: 3, seed: 53 });
      }
    },
    'tem-rabies': {
      w: 900, h: 520, draw: function (c, W, H) {
        negStain(c, W, H, { radius: 46, spike: 'knob', spikeDensity: 0.7, form: 'bullet',
          cols: 4, rows: 3, skip: 0.22, seed: 37 });
      }
    },
    'tem-ebola': {
      w: 900, h: 520, draw: function (c, W, H) {
        negStain(c, W, H, { radius: 26, spike: 'none', threads: true, cols: 2, rows: 2,
          skip: 0.55, blurCount: 2, seed: 71 });
      }
    },
    'tem-measles': {
      w: 900, h: 520, draw: function (c, W, H) {
        negStain(c, W, H, { radius: 54, spike: 'knob', spikeDensity: 0.75, core: true,
          pleomorphic: true, cols: 3, rows: 2, seed: 19 });
      }
    },
    'tem-hcv': {
      w: 900, h: 520, draw: function (c, W, H) {
        negStain(c, W, H, { radius: 38, spike: 'knob', spikeDensity: 0.4, core: true,
          pleomorphic: true, cols: 4, rows: 3, seed: 91 });
      }
    },
    'tem-nipah': {
      w: 900, h: 520, draw: function (c, W, H) {
        negStain(c, W, H, { radius: 58, spike: 'fringe', spikeDensity: 0.8, core: true,
          pleomorphic: true, filaments: true, cols: 3, rows: 2, seed: 47 });
      }
    },
    'lj-plate': { w: 820, h: 620, draw: function (c, W, H) { plate(c, W, H, 'lj'); } },
    'tcbs-plate': { w: 820, h: 620, draw: function (c, W, H) { plate(c, W, H, 'tcbs'); } },
    cpe: { w: 900, h: 420, draw: null }
  };

  function render(canvas, kind, arg) {
    var sc = SCENES[kind]; if (!sc && kind !== 'cpe') return false;
    var W = (sc && sc.w) || 900, H = (sc && sc.h) || 420;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = '100%'; canvas.style.height = 'auto';
    canvas.style.aspectRatio = W + ' / ' + H;
    var ctx = canvas.getContext('2d');
    if (!ctx) return false;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    if (kind === 'cpe') cpe(ctx, W, H, arg || 0);
    else sc.draw(ctx, W, H);
    // scale bar, as every published micrograph carries one
    if (sc && sc.bar !== false) {
      var lbl = ({
        zn: '10 µm', giemsa: '10 µm', 'gram-vibrio': '5 µm', 'gram-rod': '5 µm',
        'tem-hiv': '200 nm', 'tem-corona': '100 nm', 'tem-flu': '100 nm',
        'tem-hbv': '100 nm', 'tem-dengue': '100 nm', 'lj-plate': '1 cm', 'tcbs-plate': '1 cm',
        'gram-cluster': '5 µm', 'gram-chain': '5 µm', 'gram-curved': '5 µm',
        'koh-fungal': '20 µm', 'giemsa-amastigote': '10 µm',
        'tem-rabies': '100 nm', 'tem-ebola': '200 nm', 'tem-measles': '100 nm',
        'tem-hcv': '50 nm', 'tem-nipah': '100 nm'
      })[kind];
      if (lbl) {
        var dark = kind.indexOf('tem') === 0 || kind.indexOf('plate') > 0;
        ctx.save();
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.92)' : 'rgba(26,26,30,0.86)';
        ctx.fillRect(W - 128, H - 30, 86, 5);
        ctx.font = '500 13px "IBM Plex Mono", ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(lbl, W - 85, H - 38);
        ctx.restore();
      }
    }
    return true;
  }

  window.Micrographs = { render: render, has: function (k) { return !!SCENES[k]; } };
})();
