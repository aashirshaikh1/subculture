/* Project page — the case study a recruiter or reviewer lands on. */
(function () {
  'use strict';

  var CSS = `
.pj{display:flex;flex-direction:column;gap:40px}
.pj section{display:flex;flex-direction:column;gap:16px;scroll-margin-top:118px}
.pj h2{font-size:clamp(1.42rem,3.4vw,1.9rem);letter-spacing:-.018em;padding-bottom:11px;
  border-bottom:1.5px solid var(--line-2);position:relative}
.pj h2::after{content:"";position:absolute;left:0;bottom:-1.5px;width:56px;height:1.5px;background:var(--accent)}
.pj p{max-width:70ch;color:var(--fg-2);font-size:.95rem}
.pj p b{color:var(--fg)}
.numgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(142px,1fr));gap:1px;background:var(--line);
  border:1px solid var(--line);border-radius:12px;overflow:hidden}
.numgrid div{background:var(--surface);padding:14px 15px}
.numgrid .n{font-family:var(--f-mono);font-size:1.5rem;font-weight:500;color:var(--accent);
  font-variant-numeric:tabular-nums;line-height:1}
.numgrid .l{font-size:.79rem;color:var(--fg-2);margin-top:6px;line-height:1.35}
.stack{display:flex;flex-direction:column;gap:10px}
.stack .row{display:grid;grid-template-columns:minmax(132px,.26fr) minmax(0,1fr);gap:8px 18px;
  padding:11px 0;border-bottom:1px solid var(--line)}
.stack .row:last-child{border-bottom:0}
@media (max-width:600px){.stack .row{grid-template-columns:1fr;gap:4px}}
.stack .k{font-family:var(--f-mono);font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;
  color:var(--fg-3)}
.stack .v{font-size:.9rem;color:var(--fg-2)}
.stack .v b{color:var(--fg)}
.decis{display:flex;flex-direction:column;gap:13px}
.dec{border:1px solid var(--line);border-radius:12px;background:var(--surface);padding:15px 17px}
.dec h4{font-family:var(--f-body);font-size:.96rem;font-weight:600;margin-bottom:6px;color:var(--fg)}
.dec p{font-size:.88rem;margin:0}
.dec .tag{font-family:var(--f-mono);font-size:.6rem;letter-spacing:.11em;text-transform:uppercase;
  color:var(--accent);margin-bottom:7px;display:block}
.pjprof{border:1px solid var(--line);border-radius:14px;padding:20px;background:var(--surface);
  display:grid;grid-template-columns:minmax(0,1fr) minmax(0,260px);gap:24px;align-items:start}
@media (max-width:760px){.pjprof{grid-template-columns:1fr;gap:18px}}
.pjprof .nm{font-family:var(--f-display);font-size:1.5rem;letter-spacing:-.016em}
.pjprof .role{font-size:.88rem;color:var(--accent);font-weight:600;margin-top:3px}
.pjprof .blurb{font-size:.92rem;color:var(--fg-2);margin-top:12px;line-height:1.6;max-width:62ch}
.pjskills{display:flex;flex-direction:column;gap:12px}
.pjskills .t{font-family:var(--f-mono);font-size:.61rem;letter-spacing:.11em;text-transform:uppercase;
  color:var(--fg-3);margin-bottom:6px}
.pjskills .r{display:flex;gap:6px;flex-wrap:wrap}
.pjskills .r span{font-size:.78rem;border:1px solid var(--line-2);border-radius:7px;padding:4px 9px;
  color:var(--fg-2)}
.pjcontact{margin-top:16px;padding-top:15px;border-top:1px solid var(--line);display:flex;
  flex-direction:column;gap:9px}
.pjcontact .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.pjcontact .val{font-family:var(--f-mono);font-size:.85rem;user-select:all;border:1px solid var(--line-2);
  border-radius:8px;padding:7px 12px;color:var(--fg);word-break:break-all}
.pjcontact a{font-size:.85rem;font-weight:500;border:1px solid var(--line-2);border-radius:8px;
  padding:7px 12px;text-decoration:none;color:var(--fg-2)}
.pjcontact a:hover{border-color:var(--accent);color:var(--accent)}
.pjcontact button{font:inherit;font-size:.79rem;border:1px solid var(--line-2);border-radius:8px;
  padding:7px 11px;background:none;color:var(--fg-2);cursor:pointer}
.pjcontact button:hover{border-color:var(--accent);color:var(--accent)}
`;

  var CONTACT = { email: 'aashirshaikh2004@gmail.com', linkedin: '', github: '' };

  function el(t, c, h) { var n = document.createElement(t); if (c) n.className = c; if (h !== undefined) n.innerHTML = h; return n; }

  function counts() {
    var D = window.DISEASES || [], M = window.METHODS || [];
    var src = 0, micro = 0, models = 0, protos = 0, blocks = 0;
    D.concat(M).forEach(function (d) {
      if (d.model) models++;
      d.sections.forEach(function (s) {
        s.blocks.forEach(function (b) {
          blocks++;
          if (b.t === 'links') src += b.items.length;
          if (b.t === 'micro' || b.t === 'stain') micro++;
          if (b.t === 'protocol') protos++;
        });
      });
    });
    return { organisms: D.length, methods: M.length, sources: src, micro: micro,
      models: models, protos: protos, blocks: blocks, pages: D.length + M.length };
  }

  function render(nav) {
    if (!document.getElementById('project-css')) {
      var st = document.createElement('style'); st.id = 'project-css'; st.textContent = CSS;
      document.head.appendChild(st);
    }
    var c = counts();
    var root = el('div', 'pj');

    function sec(id, title, nodes) {
      var s = el('section'); s.id = id;
      s.appendChild(el('h2', null, title));
      nodes.forEach(function (n) { s.appendChild(n); });
      root.appendChild(s);
    }

    /* the brief */
    sec('brief', 'Why it exists', [
      el('p', null, 'Revising microbiology means assembling the same organism from four or five places — a WHO fact sheet for the epidemiology, a textbook chapter for the structure, a lecture slide for the life cycle, a national guideline for the treatment. None of them share a structure, so nothing can be read across.'),
      el('p', null, 'This site puts all of it under <b>one set of headings, used identically for every organism</b>, so you can compare a virus against a bacterium against a parasite directly. It then does the same for the laboratory methods, because a microbiology student and a biotechnology student need the same bench skills described the same way.'),
      el('p', null, '<b>Subculture</b> was built to be the resource I wanted while studying, and it is written for the person doing the work — the reagent concentrations are real, the timings are real, and the steps that go wrong in practice are called out where they happen.')
    ]);

    /* what's in it */
    var ng = el('div', 'numgrid');
    [[c.organisms, 'organism profiles, twelve sections each'],
     [c.methods, 'laboratory methods with full protocols'],
     [c.protos, 'step-by-step bench procedures'],
     [8, 'working calculators'],
     [c.models, 'interactive 3D models'],
     [c.micro, 'rendered micrographs'],
     [c.sources, 'cited sources'],
     [1, 'virus culture simulation']].forEach(function (x) {
      var d = el('div');
      d.innerHTML = '<div class="n">' + x[0] + '</div><div class="l">' + x[1] + '</div>';
      ng.appendChild(d);
    });
    sec('scope', 'What is in it', [
      el('p', null, 'Every organism is covered under the same twelve headings: classification and discovery, structure and genome, life cycle, transmission, pathogenesis, clinical features, staining and microscopy, laboratory diagnosis, treatment with the molecular target of each drug, prevention, epidemiology, and sources.'),
      ng,
      el('p', null, 'The methods span three areas — clinical microbiology, molecular biology and bioprocess — chosen so that the site is equally usable for a microbiology syllabus and a biotechnology one.')
    ]);

    /* how it is built */
    var stack = el('div', 'stack');
    [['Architecture', 'A single-page application with no framework. Content is held as <b>structured data</b> and rendered by one generic renderer that understands fifteen block types, so a new organism or method is a data file rather than a new page.'],
     ['3D models', '<b>three.js</b>. Each virion, bacillus and parasite is generated parametrically from a specification — envelope, spikes, capsid, genome, flagella — with per-layer visibility toggles, drag-to-rotate, and automatic framing from the model\'s own bounding sphere.'],
     ['Micrographs', '<b>Canvas 2D</b>, drawn procedurally. Each one models the real optics of its modality: uneven illumination, depth of field, stain granularity, sensor grain and a scale bar. They are simulations and are labelled as such on every figure.'],
     ['Simulation', 'A 14-day HIV culture model with a 3D flask, biosafety gating, nutrient depletion driving a pH colour shift, logistic infection kinetics, bench quizzes and scoring.'],
     ['Calculators', 'Including a <b>SantaLucia nearest-neighbour</b> primer melting temperature calculation with salt correction, verified against published values before release.'],
     ['Design', 'Theme-aware light and dark, responsive to phone width, a reading-progress indicator, and a hero backdrop that renders a haemocytometer counting grid tinted from each page\'s accent colour.'],
     ['Constraints', 'The page runs under a strict content security policy with no external images or data fetching. That constraint is the reason every figure is generated in code rather than loaded — and it turned out to be the more honest option anyway.']
    ].forEach(function (r) {
      var row = el('div', 'row');
      row.appendChild(el('div', 'k', r[0]));
      row.appendChild(el('div', 'v', r[1]));
      stack.appendChild(row);
    });
    sec('build', 'How it is built', [stack]);

    /* decisions */
    var dec = el('div', 'decis');
    [['Honesty about figures', 'Micrographs are simulations, not photographs',
      'Real clinical micrographs could not be used — they are either licensed, or unreachable from the build environment. Rather than quietly presenting drawings as photographs, every figure carries a caption saying it was rendered from the published description of that appearance. The teaching detail is still there: TB bacilli are beaded and lie in cords, red cells have central pallor, syncytia appear only past a threshold of infection.'],
     ['Not pretending to be live', 'The outbreak section is a dated snapshot',
      'A published page cannot fetch other websites, so an automatic live feed was never possible. Instead the outbreak cards carry the date they were checked, the figures as published, and a link to the live source — which is more useful than a tracker that silently goes stale.'],
     ['Respecting what changes', 'Every statistic says to check the current report',
      'Case numbers, resistance rates and breakpoint tables are revised annually. Each one is marked, because a confident out-of-date number in a presentation is worse than no number.'],
     ['Scope discipline', 'Study resource, not clinical guidance',
      'The site states plainly that treatment decisions belong with a clinician and the current national guideline. Being specific about what a thing is not is part of making it trustworthy.']
    ].forEach(function (d) {
      var box = el('div', 'dec');
      box.innerHTML = '<span class="tag">' + d[0] + '</span><h4>' + d[1] + '</h4><p>' + d[2] + '</p>';
      dec.appendChild(box);
    });
    sec('decisions', 'Decisions worth explaining', [
      el('p', null, 'Most of the interesting work in this project was deciding what <i>not</i> to claim.'),
      dec
    ]);

    /* about */
    var prof = el('div', 'pjprof');
    var left = el('div');
    left.innerHTML = '<div class="nm">Aashir Shaikh</div>' +
      '<div class="role">Microbiology student · laboratory technician</div>' +
      '<div class="blurb">Around eighteen months of hands-on laboratory work — phlebotomy and sample collection, routine bench technique, and the administrative side of keeping a laboratory running — alongside building software, including work with the open-source ERPNext platform and the Frappe framework.<br><br>' +
      'This project sits where those two things meet. The microbiology content, its structure and its accuracy are mine; the implementation was built with an AI assistant, which is itself the working method I want to bring to a role. Looking for a position in the biomedical industry where laboratory knowledge and practical development and AI skills are both useful.</div>';
    prof.appendChild(left);

    var right = el('div', 'pjskills');
    [['Laboratory', ['Phlebotomy and sample collection', 'Specimen handling', 'Routine bench technique', 'Laboratory administration', 'Quality and record keeping']],
     ['Software', ['ERPNext', 'Frappe Framework', 'JavaScript', 'Data modelling', 'Open-source contribution']],
     ['AI-assisted development', ['Building with LLMs', 'Prompt and workflow design', 'Technical content review']]
    ].forEach(function (g) {
      var box = el('div');
      box.appendChild(el('div', 't', g[0]));
      var r = el('div', 'r');
      g[1].forEach(function (x) { r.appendChild(el('span', null, x)); });
      box.appendChild(r);
      right.appendChild(box);
    });

    var ct = el('div', 'pjcontact');
    ct.appendChild(el('div', 't', 'Get in touch'));
    if (CONTACT.email) {
      var row = el('div', 'row');
      row.innerHTML = '<span class="val" id="pjmail">' + CONTACT.email + '</span>';
      var cp = el('button', null, 'Copy');
      cp.type = 'button';
      cp.onclick = function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(CONTACT.email).then(function () {
            cp.textContent = 'Copied'; setTimeout(function () { cp.textContent = 'Copy'; }, 1600);
          }, select);
        } else select();
        function select() {
          var n = document.getElementById('pjmail'); if (!n) return;
          var r2 = document.createRange(); r2.selectNodeContents(n);
          var s2 = window.getSelection(); s2.removeAllRanges(); s2.addRange(r2);
          cp.textContent = 'Select and copy';
          setTimeout(function () { cp.textContent = 'Copy'; }, 2200);
        }
      };
      row.appendChild(cp);
      ct.appendChild(row);
    }
    var links = '';
    if (CONTACT.linkedin) links += '<a href="' + CONTACT.linkedin + '" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>';
    if (CONTACT.github) links += '<a href="' + CONTACT.github + '" target="_blank" rel="noopener noreferrer">GitHub ↗</a>';
    if (links) ct.appendChild(el('div', 'row', links));
    right.appendChild(ct);
    prof.appendChild(right);

    sec('author', 'Who built it', [prof]);

    /* limits */
    sec('limits', 'What this is not', [
      el('div', 'note warn', 'This is a study resource built by a student, not a clinical reference and not peer reviewed. Treatment decisions belong with a clinician and the current national guideline. Case numbers and resistance data change every year and should be checked against the cited source before being presented. The micrographs and 3D models are generated in code to illustrate structure — they are not photographs and are not to scale.')
    ]);

    return root;
  }

  window.ProjectPage = { render: render };
})();
