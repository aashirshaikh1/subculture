/* Hero backdrop: a faint haemocytometer counting grid with out-of-focus cells
   drifting across it. Tinted from the page's current accent, so it shifts
   colour as you move between a virus, a bacterium, a parasite and a method. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function readAccent() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    return v || '#b02463';
  }

  function hexToRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) return [176, 36, 99];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function mount(canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, rgb = hexToRgb(readAccent()), tick = 0, raf = null, vis = true;
    var shape = opts.shape || 'mixed';
    var cells = [];

    function seedCells() {
      cells = [];
      var n = Math.max(10, Math.round((W * H) / 36000));
      n = Math.min(n, 26);
      for (var i = 0; i < n; i++) {
        cells.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 16 + Math.random() * 46,
          vx: (Math.random() - 0.5) * 0.09,
          vy: (Math.random() - 0.5) * 0.06,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.0016,
          kind: shape === 'mixed' ? (Math.random() < 0.45 ? 'rod' : 'round') : shape,
          a: 0.05 + Math.random() * 0.09
        });
      }
    }

    function size() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return false;
      if (w === W && h === H) return true;
      W = w; H = h;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedCells();
      return true;
    }

    function grid() {
      var major = 132, minor = 26.4;
      ctx.lineWidth = 1;
      // minor rules, only inside the central band of each major square
      ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',0.055)';
      ctx.beginPath();
      for (var x = 0; x < W + major; x += minor) {
        if (Math.round(x / minor) % 5 === 0) continue;
        ctx.moveTo(x, 0); ctx.lineTo(x, H);
      }
      for (var y = 0; y < H + major; y += minor) {
        if (Math.round(y / minor) % 5 === 0) continue;
        ctx.moveTo(0, y); ctx.lineTo(W, y);
      }
      ctx.stroke();
      // major rules
      ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',0.13)';
      ctx.beginPath();
      for (var X = 0; X < W + major; X += major) { ctx.moveTo(X, 0); ctx.lineTo(X, H); }
      for (var Y = 0; Y < H + major; Y += major) { ctx.moveTo(0, Y); ctx.lineTo(W, Y); }
      ctx.stroke();
    }

    function drawCell(c) {
      var g = ctx.createRadialGradient(c.x, c.y, c.r * 0.1, c.x, c.y, c.r);
      g.addColorStop(0, 'rgba(' + rgb.join(',') + ',' + (c.a * 1.15).toFixed(3) + ')');
      g.addColorStop(0.62, 'rgba(' + rgb.join(',') + ',' + (c.a * 0.5).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(' + rgb.join(',') + ',0)');
      ctx.fillStyle = g;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      if (c.kind === 'rod') ctx.scale(1.9, 0.52);
      ctx.beginPath();
      ctx.arc(0, 0, c.r, 0, 6.2832);
      ctx.fill();
      // faint phase-contrast halo
      ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',' + (c.a * 0.55).toFixed(3) + ')';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!vis || !size()) return;
      if (tick % 45 === 0) rgb = hexToRgb(readAccent());
      tick++;

      ctx.clearRect(0, 0, W, H);
      grid();
      for (var i = 0; i < cells.length; i++) {
        var c = cells[i];
        if (!reduce) {
          c.x += c.vx; c.y += c.vy; c.rot += c.vr;
          var m = c.r * 2;
          if (c.x < -m) c.x = W + m; if (c.x > W + m) c.x = -m;
          if (c.y < -m) c.y = H + m; if (c.y > H + m) c.y = -m;
        }
        drawCell(c);
      }
      if (reduce) { cancelAnimationFrame(raf); raf = null; }
    }

    if (window.ResizeObserver) new ResizeObserver(function () { size(); }).observe(canvas);
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { threshold: 0 }).observe(canvas);
    }
    size(); frame();

    return { dispose: function () { if (raf) cancelAnimationFrame(raf); } };
  }

  window.HeroField = { mount: mount };
})();
