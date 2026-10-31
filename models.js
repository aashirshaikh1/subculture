/* Parametric 3D models: enveloped virions, bacilli and vibrios, and a parasitised red cell.
   Everything is generated from the `model` spec on each organism, so no external assets. */
(function () {
  'use strict';
  var T = window.THREE;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fib(n, r) {                       // evenly spread n points over a sphere
    var pts = [], off = 2 / n, inc = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < n; i++) {
      var y = i * off - 1 + off / 2, rr = Math.sqrt(Math.max(0, 1 - y * y)), phi = i * inc;
      pts.push(new T.Vector3(Math.cos(phi) * rr * r, y * r, Math.sin(phi) * rr * r));
    }
    return pts;
  }

  function mat(color, opts) {
    opts = opts || {};
    return new T.MeshStandardMaterial({
      color: new T.Color(color),
      roughness: opts.rough === undefined ? 0.45 : opts.rough,
      metalness: opts.metal === undefined ? 0.05 : opts.metal,
      transparent: !!opts.opacity && opts.opacity < 1,
      opacity: opts.opacity === undefined ? 1 : opts.opacity,
      side: opts.side || T.FrontSide,
      emissive: new T.Color(opts.emissive || '#000000'),
      emissiveIntensity: opts.emissiveIntensity || 0.25,
      depthWrite: opts.depthWrite === undefined ? true : opts.depthWrite,
      flatShading: !!opts.flat
    });
  }

  /* ── virion ─────────────────────────────────────────────────────────── */
  function buildVirion(spec) {
    var g = new T.Group(), L = {}, r = spec.radius || 1.3;

    var envMat = mat(spec.envelope, { opacity: 0.42, rough: 0.2, side: T.DoubleSide, depthWrite: false, emissive: spec.envelope, emissiveIntensity: 0.12 });
    var env;
    if (spec.body === 'bullet') {
      // rhabdovirus: a cylinder with one hemispherical and one flat end
      env = new T.Group();
      var bl = r * 2.1, bw = r * 0.78;
      var tube = new T.Mesh(new T.CylinderGeometry(bw, bw, bl, 36, 1, true), envMat);
      var cap = new T.Mesh(new T.SphereGeometry(bw, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2), envMat);
      cap.position.y = bl / 2;
      var base = new T.Mesh(new T.CircleGeometry(bw, 36), envMat);
      base.position.y = -bl / 2; base.rotation.x = Math.PI / 2;
      env.add(tube); env.add(cap); env.add(base);
      env.rotation.z = Math.PI / 2;
    } else if (spec.body === 'filament') {
      // filovirus: a long thread with the characteristic terminal hook
      var fp = [];
      for (var fi = 0; fi <= 42; fi++) {
        var t = fi / 42;
        var bend = t > 0.78 ? (t - 0.78) * 7.5 : 0;
        fp.push(new T.Vector3(
          (t - 0.42) * r * 7.4,
          Math.sin(bend) * r * 1.5 + Math.sin(t * 2.4) * r * 0.16,
          Math.cos(bend) * r * 0.1
        ));
      }
      env = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(fp), 110, r * 0.3, 18, false), envMat);
    } else {
      env = new T.Mesh(new T.SphereGeometry(r, 48, 32), envMat);
    }
    g.add(env); L.envelope = [env];

    if (spec.matrix) {
      var mx = new T.Mesh(new T.SphereGeometry(r * 0.9, 40, 26),
        mat(spec.matrix, { opacity: 0.3, side: T.DoubleSide, depthWrite: false }));
      g.add(mx); L.matrix = [mx];
    }

    function spikeSet(cfg, phase) {
      var out = [], m = mat(cfg.color, { rough: 0.35, emissive: cfg.color, emissiveIntensity: 0.1 });
      var pts, up = new T.Vector3(0, 1, 0);
      if (spec.body === 'bullet') {
        pts = [];
        var BL = r * 2.1, BW = r * 0.78;
        for (var bi = 0; bi < cfg.count; bi++) {
          var ring = Math.floor(bi / 7), slot = bi % 7;
          var yy = -BL / 2 + 0.22 * r + ring * (BL / Math.max(1, Math.ceil(cfg.count / 7)));
          var aa = (slot / 7) * Math.PI * 2 + ring * 0.5;
          pts.push(new T.Vector3(yy, Math.cos(aa) * BW, Math.sin(aa) * BW));
        }
      } else if (spec.body === 'filament') {
        pts = [];
        for (var li = 0; li < cfg.count; li++) {
          var lt = li / cfg.count;
          var lb = lt > 0.78 ? (lt - 0.78) * 7.5 : 0;
          var la = li * 1.9;
          pts.push(new T.Vector3(
            (lt - 0.42) * r * 7.4,
            Math.sin(lb) * r * 1.5 + Math.cos(la) * r * 0.32,
            Math.cos(lb) * r * 0.1 + Math.sin(la) * r * 0.32
          ));
        }
      } else {
        pts = fib(cfg.count, r);
      }
      for (var i = 0; i < pts.length; i++) {
        if (phase !== undefined && i % 4 !== phase % 4) continue;
        var p = pts[i], s = new T.Group();
        var n = (spec.body === 'bullet' || spec.body === 'filament')
          ? new T.Vector3(0, p.y, p.z).normalize()
          : p.clone().normalize();
        if (!isFinite(n.x)) n.set(0, 1, 0);
        if (cfg.type === 'y') {
          s.add(new T.Mesh(new T.CylinderGeometry(0.045, 0.055, 0.34, 8), m));
          var head = new T.Mesh(new T.SphereGeometry(0.115, 14, 10), m);
          head.position.y = 0.24; s.add(head);
          [-1, 1].forEach(function (d) {
            var lobe = new T.Mesh(new T.SphereGeometry(0.075, 12, 9), m);
            lobe.position.set(d * 0.1, 0.33, 0); s.add(lobe);
          });
        } else if (cfg.type === 'club') {
          s.add(new T.Mesh(new T.CylinderGeometry(0.035, 0.05, 0.3, 8), m));
          var h2 = new T.Mesh(new T.SphereGeometry(0.105, 14, 10), m);
          h2.position.y = 0.21; h2.scale.set(1, 0.85, 1); s.add(h2);
        } else if (cfg.type === 'knob') {
          var k = new T.Mesh(new T.SphereGeometry(0.085, 12, 9), m);
          k.position.y = 0.05; s.add(k);
        } else {                                  // flat — dengue's smooth E shell
          var f = new T.Mesh(new T.BoxGeometry(0.2, 0.045, 0.085), m);
          f.position.y = 0.02; s.add(f);
          f.rotation.y = (i % 3) * 0.6;
        }
        s.position.copy(p);
        s.quaternion.setFromUnitVectors(up, n);
        g.add(s); out.push(s);
      }
      return out;
    }
    if (spec.spikes) L.spikes = spikeSet(spec.spikes);
    if (spec.spikes2) L.spikes2 = spikeSet(spec.spikes2, 1);

    if (spec.capsid && spec.body !== 'filament') {
      var c = spec.capsid, cm = mat(c.color, { rough: 0.5, opacity: 0.95 }), cap2;
      if (c.shape === 'helix') {
        var hp = [];
        for (var hi = 0; hi < 90; hi++) {
          var ha = hi / 90 * Math.PI * 12;
          hp.push(new T.Vector3((hi / 90 - 0.5) * r * 1.85, Math.cos(ha) * r * 0.42, Math.sin(ha) * r * 0.42));
        }
        cap2 = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(hp), 150, 0.055, 7, false), cm);
      } else if (c.shape === 'cone') {
        cap2 = new T.Mesh(new T.CylinderGeometry(r * 0.17, r * 0.52, r * 1.18, 28, 1, false), cm);
        cap2.rotation.z = 0.28;
      } else if (c.shape === 'icosa') {
        cap2 = new T.Mesh(new T.IcosahedronGeometry(r * 0.56, 1), mat(c.color, { flat: true, rough: 0.5 }));
      } else if (c.shape === 'segments') {
        cap2 = new T.Group();
        for (var s8 = 0; s8 < 8; s8++) {
          var seg = new T.Mesh(new T.CapsuleGeometry(0.055, 0.38 + (s8 % 4) * 0.13, 4, 8), cm);
          seg.position.set(Math.cos(s8 / 8 * Math.PI * 2) * r * 0.33, (s8 - 3.5) * 0.1, Math.sin(s8 / 8 * Math.PI * 2) * r * 0.33);
          seg.rotation.z = 0.35; cap2.add(seg);
        }
      } else {                                     // coil — helical nucleoprotein
        var pathPts = [];
        for (var t = 0; t < 70; t++) {
          var a = t / 70 * Math.PI * 7, rr = r * 0.52 * Math.sin(t / 70 * Math.PI);
          pathPts.push(new T.Vector3(Math.cos(a) * rr, (t / 70 - 0.5) * r * 1.1, Math.sin(a) * rr));
        }
        cap2 = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pathPts), 110, 0.075, 8, false), cm);
      }
      g.add(cap2); L.capsid = [cap2];
    }

    if (spec.genome && spec.body !== 'filament' && spec.body !== 'bullet') {
      var gm = mat(spec.genome.color, { rough: 0.35, emissive: spec.genome.color, emissiveIntensity: 0.3 }), strands = [];
      if (spec.genome.circular) {
        var ring = new T.Mesh(new T.TorusGeometry(r * 0.33, 0.045, 10, 60, Math.PI * 1.75), gm);
        ring.rotation.x = 0.7; strands.push(ring); g.add(ring);
      } else {
        var n = spec.genome.strands || 1;
        for (var k = 0; k < Math.min(n, 4); k++) {
          var pp = [];
          for (var u = 0; u < 46; u++) {
            var ang = u / 46 * Math.PI * 5 + k * 1.7, rad = r * 0.3 * (0.45 + 0.55 * Math.sin(u / 46 * Math.PI));
            pp.push(new T.Vector3(Math.cos(ang) * rad + (k - 0.5) * 0.12, (u / 46 - 0.5) * r * 0.95, Math.sin(ang) * rad));
          }
          var st = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pp), 80, 0.04, 6, false), gm);
          strands.push(st); g.add(st);
        }
      }
      L.genome = strands;
    }
    return { group: g, layers: L };
  }

  /* ── bacillus / vibrio ──────────────────────────────────────────────── */
  function buildBacillus(spec) {
    var g = new T.Group(), L = {}, c = spec.colors, len = spec.length || 3, rad = spec.radius || 0.6;

    function body(radius, material) {
      if (spec.shape === 'coccus') {
        if (spec.cluster) {
          // a small grape-like cluster, as staphylococci actually divide
          var grp = new T.Group();
          var offs = [[0, 0, 0], [1.75, 0.25, 0.3], [0.85, 1.6, -0.35],
                      [-1.1, 1.0, 0.5], [0.6, -1.55, 0.4], [-1.5, -0.6, -0.4]];
          for (var ci = 0; ci < Math.min(spec.cluster, offs.length); ci++) {
            var sp = new T.Mesh(new T.SphereGeometry(radius, 30, 22), material);
            sp.position.set(offs[ci][0] * radius, offs[ci][1] * radius, offs[ci][2] * radius);
            grp.add(sp);
          }
          return grp;
        }
        if (spec.chain) {
          var ch = new T.Group();
          for (var cj = 0; cj < spec.chain; cj++) {
            var s2 = new T.Mesh(new T.SphereGeometry(radius, 30, 22), material);
            s2.position.set(0, (cj - (spec.chain - 1) / 2) * radius * 1.82,
              Math.sin(cj * 1.1) * radius * 0.2);
            ch.add(s2);
          }
          return ch;
        }
        return new T.Mesh(new T.SphereGeometry(radius, 34, 24), material);
      }
      if (spec.shape === 'yeast') {
        // mother cell with a daughter bud
        var yg = new T.Group();
        var mother = new T.Mesh(new T.SphereGeometry(radius, 32, 24), material);
        yg.add(mother);
        var bud = new T.Mesh(new T.SphereGeometry(radius * 0.58, 26, 18), material);
        bud.position.set(radius * 1.18, radius * 0.72, 0);
        yg.add(bud);
        if (spec.pseudohypha) {
          for (var pi = 0; pi < 3; pi++) {
            var ph = new T.Mesh(new T.CapsuleGeometry(radius * 0.38, radius * 1.25, 5, 18), material);
            ph.position.set(-radius * (1.5 + pi * 1.85), -radius * (0.4 + pi * 0.3), 0);
            ph.rotation.z = Math.PI / 2 + 0.16 * pi;
            yg.add(ph);
          }
        }
        return yg;
      }
      if (spec.shape === 'spiral') {
        var hp = [];
        for (var hi = 0; hi <= 44; hi++) {
          var t2 = hi / 44;
          hp.push(new T.Vector3(
            Math.cos(t2 * Math.PI * 2.4) * len * 0.21,
            (t2 - 0.5) * len,
            Math.sin(t2 * Math.PI * 2.4) * len * 0.21
          ));
        }
        return new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(hp), 70, radius, 18, false), material);
      }
      if (spec.shape === 'comma') {
        var pts = [];
        for (var i = 0; i <= 24; i++) {
          var t = i / 24, a = (t - 0.5) * 2.1;
          pts.push(new T.Vector3(Math.sin(a) * len * 0.52, -Math.cos(a) * len * 0.3 + len * 0.18, 0));
        }
        return new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 48, radius, 20, false), material);
      }
      return new T.Mesh(new T.CapsuleGeometry(radius, len - radius * 2, 8, 28), material);
    }

    if (spec.capsule || c.wax) {
      var wax = body(rad * 1.16, mat(c.wax, { opacity: 0.3, side: T.DoubleSide, depthWrite: false, rough: 0.25, emissive: c.wax, emissiveIntensity: 0.1 }));
      g.add(wax); L.wax = [wax];
    }
    var wall = body(rad, mat(c.wall, { opacity: 0.55, side: T.DoubleSide, depthWrite: false, rough: 0.4 }));
    g.add(wall); L.wall = [wall];

    var memb = body(rad * 0.88, mat(c.membrane, { opacity: 0.5, side: T.DoubleSide, depthWrite: false }));
    g.add(memb); L.membrane = [memb];

    var cyto = body(rad * 0.78, mat(c.cytoplasm, { opacity: 0.34, side: T.DoubleSide, depthWrite: false }));
    g.add(cyto); L.cytoplasm = [cyto];

    var round = spec.shape === 'coccus' || spec.shape === 'yeast';
    var ribo = [], rm = mat(c.ribo, { rough: 0.6 });
    for (var i = 0; i < 46; i++) {
      var d = new T.Mesh(new T.SphereGeometry(round ? 0.07 : 0.055, 8, 6), rm);
      if (round) {
        var u = Math.random() * Math.PI * 2, v = Math.acos(2 * Math.random() - 1);
        var rr2 = Math.pow(Math.random(), 0.5) * rad * 0.68;
        d.position.set(Math.sin(v) * Math.cos(u) * rr2, Math.cos(v) * rr2, Math.sin(v) * Math.sin(u) * rr2);
      } else {
        var ay = (Math.random() - 0.5) * (len - rad * 1.6);
        var arad = Math.random() * rad * 0.62, aang = Math.random() * Math.PI * 2;
        d.position.set(Math.cos(aang) * arad, ay, Math.sin(aang) * arad);
        if (spec.shape === 'comma') { d.position.x += Math.sin(ay / len * 2.1) * len * 0.2; }
      }
      g.add(d); ribo.push(d);
    }
    L.ribo = ribo;

    var dpts = [];
    for (var u = 0; u <= 60; u++) {
      var a2 = u / 60 * Math.PI * (round ? 6.5 : 4.5);
      var amp = round ? rad * 0.5 * Math.sin(u / 60 * Math.PI) : rad * 0.4;
      dpts.push(new T.Vector3(
        Math.cos(a2) * amp,
        round ? (u / 60 - 0.5) * rad * 1.3 : (u / 60 - 0.5) * (len - rad * 1.9),
        Math.sin(a2) * amp));
    }
    var dna = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(dpts), 110, 0.05, 7, false),
      mat(c.dna, { emissive: c.dna, emissiveIntensity: 0.35, rough: 0.3 }));
    g.add(dna); L.dna = [dna];

    if (spec.flagella) {
      var fl = [], fm = mat(c.wall, { rough: 0.5, opacity: 0.9 });
      for (var f = 0; f < spec.flagella; f++) {
        var fp = [], base = spec.flagella === 1 ? new T.Vector3(0, -len * 0.5, 0)
          : new T.Vector3(Math.cos(f / spec.flagella * 6.28) * rad * 0.8, (f % 3 - 1) * len * 0.28, Math.sin(f / spec.flagella * 6.28) * rad * 0.8);
        var dir = spec.flagella === 1 ? new T.Vector3(0, -1, 0) : base.clone().setY(0).normalize();
        for (var q = 0; q <= 30; q++) {
          var tt = q / 30;
          fp.push(new T.Vector3(
            base.x + dir.x * tt * 2.1 + Math.sin(tt * 9) * 0.17 * dir.z,
            base.y + (spec.flagella === 1 ? -tt * 2.1 : Math.sin(tt * 9) * 0.17),
            base.z + dir.z * tt * 2.1 - Math.sin(tt * 9) * 0.17 * dir.x
          ));
        }
        var fm2 = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(fp), 50, 0.035, 6, false), fm);
        g.add(fm2); fl.push(fm2);
      }
      L.flagella = fl;
    }
    return { group: g, layers: L };
  }

  /* ── parasitised red cell ───────────────────────────────────────────── */
  function buildParasite(spec) {
    var g = new T.Group(), L = {}, c = spec.colors;

    var geo = new T.SphereGeometry(1.5, 64, 44);
    var pos = geo.attributes.position;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      var radial = Math.sqrt(x * x + z * z) / 1.5;
      var dimple = 0.34 + 0.66 * Math.pow(radial, 2.1);   // biconcave profile
      pos.setY(i, y * 0.34 * dimple);
    }
    geo.computeVertexNormals();
    var rbc = new T.Mesh(geo, mat(c.rbc, { opacity: 0.74, rough: 0.35, side: T.DoubleSide, depthWrite: false, emissive: c.rbc, emissiveIntensity: 0.1 }));
    g.add(rbc); L.rbc = [rbc];

    var ringG = new T.Group();
    var ring = new T.Mesh(new T.TorusGeometry(0.4, 0.1, 12, 36), mat(c.ring, { rough: 0.35, emissive: c.ring, emissiveIntensity: 0.25 }));
    var chromatin = new T.Mesh(new T.SphereGeometry(0.17, 14, 12), mat(c.ring, { rough: 0.3, emissive: c.ring, emissiveIntensity: 0.45 }));
    chromatin.position.set(0.4, 0, 0);
    ringG.add(ring); ringG.add(chromatin);
    ringG.rotation.x = Math.PI / 2 - 0.3; ringG.position.set(-0.35, 0.08, 0.2);
    g.add(ringG); L.ring = [ringG];

    var mz = [], mm = mat(c.merozoite, { rough: 0.4, emissive: c.merozoite, emissiveIntensity: 0.2 });
    for (var k = 0; k < 9; k++) {
      var a = k / 9 * Math.PI * 2, d = 2.15 + (k % 3) * 0.26;
      var m = new T.Mesh(new T.SphereGeometry(0.15, 14, 11), mm);
      m.scale.set(1, 1.35, 1);
      m.position.set(Math.cos(a) * d, Math.sin(k * 1.7) * 0.42, Math.sin(a) * d);
      m.rotation.z = a; g.add(m); mz.push(m);
    }
    L.merozoite = mz;

    var pig = [], pm = mat(c.pigment, { rough: 0.8, metal: 0.3 });
    for (var p = 0; p < 7; p++) {
      var d2 = new T.Mesh(new T.DodecahedronGeometry(0.075), pm);
      d2.position.set((Math.random() - 0.5) * 1.1, (Math.random() - 0.5) * 0.22, (Math.random() - 0.5) * 1.1);
      d2.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      g.add(d2); pig.push(d2);
    }
    L.pigment = pig;
    return { group: g, layers: L };
  }

  /* ── mount ──────────────────────────────────────────────────────────── */
  function mount(canvas, spec) {
    if (!T) return null;
    var built = spec.kind === 'bacillus' ? buildBacillus(spec)
      : spec.kind === 'parasite' ? buildParasite(spec) : buildVirion(spec);

    var scene = new T.Scene();
    var cam = new T.PerspectiveCamera(42, 1, 0.1, 200);

    var renderer;
    try {
      renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    scene.add(new T.AmbientLight(0xffffff, 0.75));
    var key = new T.DirectionalLight(0xffffff, 1.5); key.position.set(4, 6, 7); scene.add(key);
    var rim = new T.DirectionalLight(0x9fd0ff, 0.8); rim.position.set(-6, -3, -5); scene.add(rim);
    var warm = new T.PointLight(0xffd0a0, 0.6, 30); warm.position.set(-3, 4, 3); scene.add(warm);

    var pivot = new T.Group(); pivot.add(built.group); scene.add(pivot);

    /* Centre the model on the pivot, then frame it from its bounding sphere.
       A sphere is used rather than the box so a long bacillus with flagella stays
       both centred and fully inside the frame at every angle of rotation. */
    var bounds = new T.Box3().setFromObject(built.group);
    var sphere = bounds.getBoundingSphere(new T.Sphere());
    built.group.position.sub(sphere.center);
    var fitRadius = Math.max(0.001, sphere.radius);

    var rot = { x: -0.18, y: 0.5 }, vel = { x: 0, y: 0.0028 }, dragging = false, last = null, visible = true, raf = null;

    function size() {
      var w = canvas.clientWidth || 300, h = canvas.clientHeight || 260;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      // fit to whichever axis is tighter, so a narrow phone column never crops it
      var vFov = cam.fov * Math.PI / 180;
      var hFov = 2 * Math.atan(Math.tan(vFov / 2) * cam.aspect);
      var dist = Math.max(fitRadius / Math.sin(vFov / 2), fitRadius / Math.sin(hFov / 2));
      cam.position.set(0, 0, dist * 1.06);
      cam.lookAt(0, 0, 0);
      cam.updateProjectionMatrix();
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (!dragging) { rot.y += vel.y; rot.x += vel.x; vel.x *= 0.94; vel.y = vel.y * 0.94 + (reduce ? 0 : 0.0028) * 0.06; }
      rot.x = Math.max(-1.3, Math.min(1.3, rot.x));
      pivot.rotation.x = rot.x; pivot.rotation.y = rot.y;
      renderer.render(scene, cam);
    }

    function pt(e) { var t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; }
    function down(e) { dragging = true; last = pt(e); canvas.setAttribute('data-grab', '1'); }
    function move(e) {
      if (!dragging || !last) return;
      var p = pt(e), dx = p.x - last.x, dy = p.y - last.y;
      rot.y += dx * 0.0085; rot.x += dy * 0.0085;
      vel.y = dx * 0.0022; vel.x = dy * 0.0022; last = p;
      if (e.cancelable) e.preventDefault();
    }
    function up() { dragging = false; last = null; canvas.removeAttribute('data-grab'); }

    canvas.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    canvas.addEventListener('touchstart', down, { passive: true });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', up);
    canvas.addEventListener('keydown', function (e) {
      var step = 0.22;
      if (e.key === 'ArrowLeft') { rot.y -= step; e.preventDefault(); }
      if (e.key === 'ArrowRight') { rot.y += step; e.preventDefault(); }
      if (e.key === 'ArrowUp') { rot.x -= step; e.preventDefault(); }
      if (e.key === 'ArrowDown') { rot.x += step; e.preventDefault(); }
    });

    if (window.ResizeObserver) { new ResizeObserver(size).observe(canvas); }
    else window.addEventListener('resize', size);
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.01 }).observe(canvas);
    }

    size(); frame();

    return {
      setLayer: function (name, on) {
        var arr = built.layers[name]; if (!arr) return;
        arr.forEach(function (m) { m.visible = on; });
      },
      reset: function () { rot.x = -0.18; rot.y = 0.5; vel.x = 0; vel.y = 0.0028; },
      dispose: function () { if (raf) cancelAnimationFrame(raf); renderer.dispose(); }
    };
  }

  window.Microbe3D = { mount: mount, ok: !!T };
})();
