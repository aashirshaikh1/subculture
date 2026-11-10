/* Staining protocols: reagents, bench steps with timings, the chemistry behind
   each one, what you should see, and where they go wrong. */
(function () {
  'use strict';

  var CSS = `
.proto{border:1px solid var(--line);border-radius:14px;background:var(--surface);overflow:hidden}
.proto+.proto{margin-top:13px}
.proto .ph{padding:15px 17px;border-bottom:1px solid var(--line);display:flex;gap:12px;
  align-items:flex-start;flex-wrap:wrap;background:var(--surface-2)}
.proto .ph .hd{flex:1 1 220px;min-width:0}
.proto .ph h4{font-family:var(--f-display);font-size:1.16rem;letter-spacing:-.012em}
.proto .ph .aka{font-size:.79rem;color:var(--fg-3);margin-top:2px}
.proto .ph .use{font-size:.86rem;color:var(--fg-2);margin-top:7px;max-width:62ch}
.proto .ph .badge{flex:0 0 auto;font-family:var(--f-mono);font-size:.61rem;letter-spacing:.08em;
  text-transform:uppercase;padding:5px 10px;border-radius:999px;border:1px solid var(--accent);
  color:var(--accent);font-weight:500}
.proto .pb{padding:16px 17px;display:flex;flex-direction:column;gap:17px}
.psub{font-family:var(--f-mono);font-size:.62rem;letter-spacing:.11em;text-transform:uppercase;
  color:var(--fg-3);margin-bottom:9px}
.reagents{display:grid;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;
  overflow:hidden}
.reagents>div{background:var(--surface);padding:10px 13px;display:grid;
  grid-template-columns:minmax(118px,.3fr) minmax(0,1fr);gap:4px 14px}
@media (max-width:620px){.reagents>div{grid-template-columns:1fr}}
.reagents .rn{font-weight:600;font-size:.88rem;display:flex;align-items:center;gap:8px}
.reagents .sw{width:12px;height:12px;border-radius:3px;flex:0 0 auto;border:1px solid rgba(0,0,0,.18)}
.reagents .rd{font-size:.85rem;color:var(--fg-2)}
.reagents .rc{font-family:var(--f-mono);font-size:.76rem;color:var(--fg-3);margin-top:3px;display:block}
.psteps{counter-reset:ps;display:flex;flex-direction:column;gap:2px}
.psteps>li{counter-increment:ps;list-style:none;display:grid;grid-template-columns:28px minmax(0,1fr) auto;
  gap:12px;padding:10px 0;border-bottom:1px solid var(--line);align-items:start}
.psteps>li:last-child{border-bottom:0}
@media (max-width:560px){.psteps>li{grid-template-columns:28px minmax(0,1fr)}
  .psteps>li .tm{grid-column:2;justify-self:start;margin-top:4px}}
.psteps .n{width:24px;height:24px;border-radius:50%;background:var(--accent);color:#fff;
  font-family:var(--f-mono);font-size:.72rem;display:grid;place-items:center;font-weight:500}
:root[data-theme="dark"] .psteps .n,:root:not([data-theme="light"]) .psteps .n{color:#140f17}
@media (prefers-color-scheme:light){:root:not([data-theme="dark"]) .psteps .n{color:#fff}}
:root[data-theme="light"] .psteps .n{color:#fff}
.psteps .n::before{content:counter(ps)}
.psteps .tx{font-size:.9rem;color:var(--fg-2);min-width:0}
.psteps .tx b{color:var(--fg)}
.psteps .wy{display:block;font-size:.81rem;color:var(--fg-3);margin-top:4px;padding-left:10px;
  border-left:2px solid var(--line-2)}
.psteps .tm{font-family:var(--f-mono);font-size:.73rem;color:var(--fg-3);white-space:nowrap;
  border:1px solid var(--line-2);border-radius:6px;padding:3px 8px}
.presult{border-radius:10px;padding:13px 15px;font-size:.89rem;line-height:1.55;
  background:var(--accent-soft);border:1px solid color-mix(in srgb,var(--accent) 30%,transparent);
  color:var(--fg-2)}
.presult b{color:var(--fg)}
.pmech{font-size:.89rem;color:var(--fg-2);max-width:72ch}
.ppit{display:flex;flex-direction:column;gap:7px}
.ppit li{list-style:none;position:relative;padding-left:19px;font-size:.86rem;color:var(--fg-2)}
.ppit li::before{content:"";position:absolute;left:3px;top:.58em;width:6px;height:6px;border-radius:50%;
  background:var(--warn)}
.psafe{font-size:.86rem;border-radius:10px;padding:12px 14px;color:var(--fg-2);
  background:color-mix(in srgb,var(--warn) 10%,var(--surface));
  border:1px solid color-mix(in srgb,var(--warn) 34%,transparent)}
.pgrade{overflow-x:auto}
.pgrade table{min-width:380px}
`;

  function inject() {
    if (document.getElementById('stain-css')) return;
    var st = document.createElement('style'); st.id = 'stain-css'; st.textContent = CSS;
    document.head.appendChild(st);
  }

  var S = {};

  /* ── Ziehl–Neelsen ──────────────────────────────────────────── */
  S.zn = {
    name: 'Ziehl–Neelsen stain',
    badge: 'Hot acid-fast',
    aka: 'Hot method · AFB stain · for mycobacteria and other acid-fast organisms',
    use: 'The standard light-microscopy stain for <i>M. tuberculosis</i>. It exists because the mycolic acid wall will not take up the Gram stains — dye has to be driven through it with phenol and heat.',
    reagents: [
      ['Carbol fuchsin', '#c2185b', 'The primary stain. Basic fuchsin is the dye; phenol is the mordant that carries it through the waxy wall.',
        'Basic fuchsin 1 g · 95% ethanol 10 mL · melted phenol 5 mL · distilled water to 100 mL'],
      ['Acid-alcohol', '#9aa5b1', 'Decolouriser. Strips the dye out of everything that is not acid-fast.',
        '3 mL concentrated HCl in 97 mL of 95% ethanol — or 20–25% sulphuric acid'],
      ['Methylene blue', '#3b5f9e', 'Counterstain, so the background and host cells are visible.',
        '0.3% methylene blue in distilled water — 0.5% malachite green is an alternative']
    ],
    steps: [
      ['Make the smear from the thick, purulent part of the sputum. Spread it about 2 × 3 cm.', '', 'A watery, salivary specimen is the single commonest reason a true case is missed.'],
      ['Air dry, then fix on a hotplate at 65–75 °C.', '2 h', 'WHO prefers hotplate fixation. Note that fixation does <b>not</b> reliably kill M. tuberculosis — the slide stays infectious.'],
      ['Flood the slide with carbol fuchsin.', '', ''],
      ['Heat gently from below until steam rises. Do not boil. Keep it steaming, re-flooding so the slide never dries out.', '5 min', 'Heat and phenol together make the mycolic acid layer permeable. This is the step that does the work.'],
      ['Wash with gently running water.', '', ''],
      ['Decolourise with 3% acid-alcohol until no more red runs off the slide.', '2–3 min', 'Everything that is not acid-fast loses its colour here.'],
      ['Wash well.', '', ''],
      ['Counterstain with methylene blue.', '30–60 s', ''],
      ['Wash, drain and air dry. Do not blot.', '', 'Blotting drags bacilli off the slide and can carry them to the next one.'],
      ['Examine under ×100 oil immersion. Read at least 100 fields — ideally 300 — before reporting a negative.', '', 'Smear microscopy needs roughly 10,000 bacilli per mL to be positive, so a negative never excludes tuberculosis.']
    ],
    result: '<b>Acid-fast bacilli stain bright red to magenta</b> against a blue background. They are slender, 2–4 µm, straight or slightly curved, and characteristically <b>beaded</b> — the dye takes up unevenly along the cell. They often lie in parallel bundles or V and Y shapes, because cord factor makes them stick side by side.',
    mechanism: 'Phenol in the carbol fuchsin acts as a mordant and heat raises the permeability of the mycolic acid layer, so the dye gets in. Once inside, that same waxy layer is what stops acid-alcohol pulling it back out — which is the whole definition of acid-fastness. Nothing else on a sputum smear holds the dye, so the contrast is near-absolute.',
    grade: {
      title: 'WHO / IUATLD reporting scale, read at ×1000',
      head: ['What you see', 'Report as'],
      rows: [
        ['No AFB in 100 fields', 'Negative'],
        ['1–9 AFB per 100 fields', 'Scanty — report the actual number'],
        ['10–99 AFB per 100 fields', '1+'],
        ['1–10 AFB per field, in at least 50 fields', '2+'],
        ['More than 10 AFB per field, in at least 20 fields', '3+']
      ]
    },
    pitfalls: [
      'Smear too thick — it will not decolourise evenly and the background obscures bacilli.',
      'Letting the carbol fuchsin dry on the slide during heating, which leaves crystalline deposits that mimic bacilli.',
      'Over-decolourising, so that genuine bacilli are washed pale and read as negative.',
      'Carryover between slides from shared oil or from blotting, which produces false positives on the next patient\'s slide.',
      'Water baths and tap water can carry environmental mycobacteria that are also acid-fast.'
    ],
    safety: 'Prepare smears inside a biosafety cabinet. Heat fixation does not sterilise the slide, and generating aerosols from sputum is the main laboratory risk in tuberculosis work.',
    variants: [
      ['Kinyoun — the cold method', 'More basic fuchsin (4 g) and more phenol (8 mL), so no heating is needed. Flood for 5 minutes at room temperature, then decolourise and counterstain as above. Used where a flame is impractical.'],
      ['Modified ZN, 1% acid', 'A weaker decolouriser for organisms that are only partially acid-fast — <i>Nocardia</i>, and <i>Cryptosporidium</i> and <i>Cyclospora</i> in stool.']
    ]
  };

  /* ── Auramine fluorescence ──────────────────────────────────── */
  S.auramine = {
    name: 'Auramine O fluorescence',
    badge: 'Fluorescent AFB',
    aka: 'Auramine–rhodamine · the Truant method',
    use: 'The preferred smear method wherever an LED fluorescence microscope is available. It is read at ×200–400 instead of ×1000, so a whole smear is scanned in a fraction of the time, and it detects roughly ten times fewer bacilli than Ziehl–Neelsen.',
    reagents: [
      ['Auramine O', '#d8c13c', 'A fluorochrome that binds mycolic acid. Rhodamine B is added in the auramine–rhodamine version to shift the colour.',
        '0.1% auramine O in phenol–alcohol'],
      ['Acid-alcohol', '#9aa5b1', 'Decolouriser, as in Ziehl–Neelsen.', '0.5% HCl in 70% ethanol'],
      ['Potassium permanganate', '#8a4bb0', 'Quenches background autofluorescence so the field goes properly dark.', '0.5% aqueous']
    ],
    steps: [
      ['Prepare and heat-fix the smear exactly as for Ziehl–Neelsen.', '', ''],
      ['Flood with auramine O at room temperature. No heating.', '15 min', ''],
      ['Rinse with distilled water.', '', ''],
      ['Decolourise with 0.5% acid-alcohol.', '2 min', ''],
      ['Rinse.', '', ''],
      ['Counterstain with potassium permanganate. Do not exceed the time.', '2 min', 'Longer than this and the permanganate quenches the bacilli as well as the background.'],
      ['Rinse, air dry in the dark, and read at ×200–400 within 24 hours.', '', 'The fluorescence fades. Slides needing confirmation should be read the same day.']
    ],
    result: '<b>Bright yellow-green luminous bacilli against a dark background</b>, unmistakable even at low power. Because the field is scanned at lower magnification, a full smear takes about a quarter of the time of a Ziehl–Neelsen read.',
    mechanism: 'Auramine O binds to mycolic acids in the same way carbol fuchsin does, but it is a fluorochrome: it absorbs blue light and emits green. Contrast comes from emission against a dark field rather than from colour against a counterstain, which is why the eye picks it up at much lower magnification.',
    pitfalls: [
      'Fluorescence fades on standing and with exposure to light — read promptly and store slides in the dark.',
      'Over-long permanganate dims the bacilli themselves.',
      'Non-viable bacilli and some debris can fluoresce, so laboratories often confirm positives by restaining the same slide with Ziehl–Neelsen.'
    ]
  };

  /* ── Gram ───────────────────────────────────────────────────── */
  S.gram = {
    name: 'Gram stain',
    badge: 'Differential',
    aka: 'Hucker modification · the first stain performed on almost any bacterial specimen',
    use: 'Separates bacteria into two groups by cell wall architecture, in under five minutes. For <i>Vibrio cholerae</i> and <i>Salmonella</i> Typhi it confirms a Gram-negative rod and shows the shape — but it cannot identify either to species.',
    reagents: [
      ['Crystal violet', '#5b3fa8', 'The primary stain. Enters every bacterial cell.',
        'Crystal violet 2 g in 20 mL 95% ethanol, plus ammonium oxalate 0.8 g in 80 mL water'],
      ['Gram\'s iodine', '#8a6a2a', 'The mordant. Forms a large crystal violet–iodine complex inside the cell.',
        'Iodine 1 g + potassium iodide 2 g in 300 mL distilled water'],
      ['Acetone–alcohol', '#9aa5b1', 'Decolouriser. This is the step that discriminates.',
        'Acetone 50 mL + 95% ethanol 50 mL — or 95% ethanol alone, which is slower and more forgiving'],
      ['Safranin', '#c2344f', 'Counterstain, taken up by cells that lost the violet complex.',
        '0.25–0.5% safranin O in water — dilute carbol fuchsin is an alternative']
    ],
    steps: [
      ['Make a thin, even smear and let it air dry completely.', '', 'Thick smears decolourise unevenly and are the usual reason a Gram stain is unreadable.'],
      ['Fix. Heat-fix by passing through a flame three times, or fix in absolute methanol.', '1 min', 'Methanol fixation preserves morphology better and is preferred for clinical specimens, especially blood and pus.'],
      ['Flood with crystal violet.', '1 min', ''],
      ['Rinse briefly with water.', '', ''],
      ['Flood with Gram\'s iodine.', '1 min', 'The mordant step. Without it the dye washes straight out of every cell.'],
      ['Rinse.', '', ''],
      ['Decolourise with acetone–alcohol, drop by drop, until the runoff is just clear.', '2–5 s', 'Acetone acts in seconds. With 95% ethanol alone, allow 15–30 seconds. This is the step that decides the result.'],
      ['Rinse immediately with water.', '', 'The rinse is what stops decolourisation. A moment\'s delay turns Gram-positives into false Gram-negatives.'],
      ['Counterstain with safranin.', '30–60 s', ''],
      ['Rinse, blot gently or air dry, and examine under ×100 oil immersion.', '', '']
    ],
    result: '<b>Gram-positive organisms are deep purple-blue. Gram-negative organisms are pink to red.</b> For cholera, look for <b>curved, comma-shaped pink rods</b>, often aligned in parallel clumps — the "shoal of fish" appearance. For typhoid, straight pink bacilli with rounded ends, indistinguishable from <i>E. coli</i> or any other enterobacterium on morphology alone.',
    mechanism: 'Iodine locks crystal violet into a bulky complex inside the cell. A Gram-positive wall is a thick, heavily cross-linked peptidoglycan mesh: the solvent dehydrates it, the pores close, and the complex is trapped. A Gram-negative wall has only a thin peptidoglycan layer under a lipid outer membrane — the solvent dissolves that membrane outright and the complex washes out, leaving the cell colourless until safranin stains it pink.',
    pitfalls: [
      'Over-decolourisation. By far the commonest error, and it makes Gram-positives read as Gram-negative.',
      'Smear too thick, so the centre never decolourises and the edge over-decolourises.',
      'Old or dying cultures lose their Gram-positivity; always stain from a fresh culture, under 24 hours.',
      'Excessive heat during fixation distorts cells and can reverse the reaction.',
      'Crystal violet precipitate looks like Gram-positive cocci — filter the stain if the field is full of debris.'
    ],
    variants: [
      ['Hanging-drop preparation for cholera', 'Not a stain, but done alongside it. A drop of liquid stool or alkaline peptone water culture under a coverslip shows <i>V. cholerae</i>\'s rapid darting motility, often described as a shooting star. Adding O1 antiserum stops the movement dead — a bedside confirmation that takes minutes.']
    ]
  };

  /* ── Giemsa ─────────────────────────────────────────────────── */
  S.giemsa = {
    name: 'Giemsa stain',
    badge: 'Romanowsky',
    aka: 'The reference stain for malaria, and for blood parasites generally',
    use: 'Giemsa on a thick and thin film remains the gold standard for diagnosing malaria. The thick film finds the parasite and gives the density; the thin film identifies the species and the percentage of red cells infected.',
    reagents: [
      ['Giemsa stock', '#6b5bb8', 'A Romanowsky mixture of azure B and eosin Y in methanol and glycerol. Diluted fresh for use.',
        'Working strengths: 10% for 10 minutes, or 3% for 30–45 minutes, which gives better morphology'],
      ['Buffered water pH 7.2', '#8fb4c9', 'The diluent, and the most under-appreciated reagent on the bench.',
        'Phosphate buffer, pH 7.2. Tap water will not do.'],
      ['Absolute methanol', '#9aa5b1', 'Fixative — for the thin film only.', '100% methanol, water-free']
    ],
    steps: [
      ['<b>Thin film:</b> spread one small drop with a spreader slide at 45°, making a single layer with a feathered tail. Air dry.', '', 'The tail is where you read — red cells lie in one layer there without overlapping.'],
      ['<b>Thick film:</b> stir 3 drops of blood into a circle about 1–1.5 cm across. Dry flat and completely.', '30 min+', 'Dry it properly or it floats off the slide. Overnight drying is fine; heat is not.'],
      ['Fix the <b>thin</b> film in absolute methanol. Never let methanol touch the thick film.', '30 s', 'The thick film must stay unfixed so the red cells lyse and release their haemoglobin, concentrating the parasites.'],
      ['Stain both with 10% Giemsa in buffered water at pH 7.2.', '10 min', 'For a 3% dilution, stain 30–45 minutes instead — slower, and considerably better for species identification.'],
      ['Wash gently by flooding with buffered water. Do not direct a stream at the thick film.', '', ''],
      ['Stand the slide on end and air dry.', '', ''],
      ['Examine under ×100 oil immersion. Screen the thick film first, then the thin film for species.', '', 'Read at least 100 thick-film fields before reporting a negative, and repeat after 12–24 hours if malaria is still suspected.']
    ],
    result: 'Red cells stain pale pink-grey. Parasite <b>cytoplasm is blue</b> and <b>chromatin is red to deep purple</b> — the two-colour signature that makes a ring form recognisable. Malaria pigment appears golden-brown to almost black. <b>Schüffner\'s dots</b> in <i>P. vivax</i> and <i>P. ovale</i> only appear if the pH is right.',
    mechanism: 'This is the Romanowsky effect, and it depends on both dyes acting together. Azure B is cationic and binds the anionic phosphate backbone of DNA; eosin Y is anionic and binds cationic proteins such as haemoglobin. Where azure B is already bound to DNA, eosin binds to it in turn and forms a purple azure B–eosin complex — which is why chromatin is purple-red rather than simply blue. The reaction is exquisitely pH-sensitive: below pH 7 the film goes uniformly red and Schüffner\'s dots vanish; above it, everything turns blue.',
    grade: {
      title: 'Reporting parasite density from the thick film',
      head: ['Method', 'How it is counted'],
      rows: [
        ['Against white cells', 'Count parasites against 200 WBC, then multiply by the patient\'s white count (or assume 8,000/µL) to give parasites per µL.'],
        ['Percentage parasitaemia', 'On the thin film, count infected red cells per 1,000 red cells. Above 10% is a criterion for severe malaria.'],
        ['Plus system', '+ to ++++ by parasites per field — quicker, but far less useful for monitoring response to treatment.']
      ]
    },
    pitfalls: [
      'Using unbuffered or tap water. The commonest cause of a film on which nothing looks right.',
      'Methanol reaching the thick film, including fumes from a shared staining jar, which fixes the red cells and defeats the whole point.',
      'Stain deposit on the film, which can be mistaken for parasites — filter the working dilution.',
      'Reading only the thin film. Thick-film sensitivity is roughly ten times greater, and low parasitaemia is exactly when it matters.',
      'Platelets overlying red cells look remarkably like ring forms to an inexperienced eye.'
    ],
    variants: [
      ['Field\'s stain', 'A rapid two-solution method for thick films: dip in Field A (methylene blue and azure) for 5 seconds, rinse, dip in Field B (eosin) for 3 seconds, rinse. The whole thing takes under a minute, which is why it is the field method in much of Africa and Asia. It is excellent for detection but inferior to Giemsa for species identification.'],
      ['JSB stain', 'Jaswant Singh–Bhattacharji stain, developed in India and still the routine method in much of the national programme. JSB II (eosin) followed by JSB I (methylene blue), with a total staining time of about a minute.'],
      ['Leishman stain', 'Methanol-based, so it fixes and stains in one step. Convenient for thin films, but it cannot be used on thick films for that same reason.']
    ]
  };

  /* ── negative stain EM ──────────────────────────────────────── */
  S.negstain = {
    name: 'Negative staining for electron microscopy',
    badge: 'Electron microscopy',
    aka: 'The only way to see a virus particle directly',
    use: 'Viruses are far below the resolution of a light microscope — around 100 nm against a limit of roughly 200 nm — so no light stain will ever show one. Negative staining surrounds the particle with an electron-dense salt and images the shape it carves out.',
    reagents: [
      ['Phosphotungstic acid', '#4a5560', 'The usual negative stain. Electron-dense, so it blocks the beam and the background goes dark.',
        '2% PTA, adjusted to pH 6.5–7.0 with potassium hydroxide'],
      ['Uranyl acetate', '#6b5f3a', 'Alternative, giving finer surface detail and some positive staining of nucleic acid.',
        '1–2% aqueous, pH 4.2–4.5. Never mix with phosphate buffer — it precipitates instantly.'],
      ['Coated grid', '#8fa0b0', 'The support. A 3 mm copper mesh grid with a formvar film, carbon-coated and glow-discharged so the sample spreads.',
        '200–400 mesh copper, formvar/carbon']
    ],
    steps: [
      ['Clarify the specimen by low-speed centrifugation. Concentrate it if the titre is low, by ultracentrifugation or by binding to antibody.', '', 'Negative staining needs roughly 10⁶ particles per mL. This is its central weakness.'],
      ['Glow-discharge the grid so the surface is hydrophilic.', '30 s', 'Without this the droplet beads up and nothing adsorbs.'],
      ['Place 5–10 µL of sample on the grid and let the particles settle onto the film.', '1–2 min', ''],
      ['Blot the excess from the edge with filter paper.', '', ''],
      ['Wash with a drop of distilled water, blotting between drops.', '', 'Salts and buffer leave crystalline deposits that ruin the field. Essential with uranyl acetate.'],
      ['Apply a drop of stain.', '30–60 s', ''],
      ['Blot and air dry completely.', '', ''],
      ['Examine at 80–100 kV, ×20,000 to ×100,000.', '', '']
    ],
    result: 'The stain pools around and into the surface features of the particle, so the virion appears <b>light against a dark background</b>, with its outline and surface projections picked out in dark stain. Coronavirus spikes, the dense spike fringe of influenza, and the 22 nm surface-antigen spheres of hepatitis B are all recognisable on morphology alone.',
    mechanism: 'Heavy-metal salts scatter electrons strongly. Where the stain pools, electrons are deflected out of the beam and the image is dark; where the particle displaces the stain, more electrons pass through and the image is light. Nothing is bound to the virus — the image is the mould, not the cast. That is why it is called negative staining.',
    pitfalls: [
      'Low sensitivity. Below about a million particles per mL you will see nothing, which is why PCR has replaced EM for routine diagnosis.',
      'It shows family-level morphology, not species. A coronavirus looks like a coronavirus; it cannot tell you which one.',
      'Stain deposit, membrane fragments and cell debris are all readily mistaken for virions by an inexperienced eye.',
      'Uranyl acetate is both chemically toxic and a regulated radioactive material in many jurisdictions.'
    ],
    safety: 'Specimens are handled at the containment level of the agent concerned. Uranyl acetate and osmium tetroxide require specific handling, storage and disposal arrangements.',
    variants: [
      ['Immunoelectron microscopy', 'Specific antibody is added first, clumping the virions together. This both concentrates them and identifies them, and it is how several viruses were first discovered.'],
      ['Thin-section TEM', 'For seeing virus <i>inside</i> cells: fix in 2.5% glutaraldehyde, post-fix in 1% osmium tetroxide, dehydrate through graded ethanol, embed in epoxy resin, cut 60–90 nm sections, then double-contrast with uranyl acetate for 10 minutes and lead citrate for 5 minutes. This is what shows HIV budding from a lymphocyte membrane.']
    ]
  };

  /* ── immunofluorescence ─────────────────────────────────────── */
  S.ift = {
    name: 'Immunofluorescence',
    badge: 'Antibody-based',
    aka: 'DFA and IFA — direct and indirect fluorescent antibody',
    use: 'Where a stain cannot distinguish one virus from another, a labelled antibody can. Immunofluorescence on respiratory epithelial cells was the mainstay of rapid respiratory virus diagnosis before PCR, and it is still used for confirmation and for research.',
    reagents: [
      ['FITC conjugate', '#3cb878', 'Fluorescein isothiocyanate coupled to a specific antibody. Absorbs blue, emits apple-green.',
        'Direct method: FITC on the virus-specific antibody itself'],
      ['Primary antibody', '#b06a9e', 'Indirect method only — an unlabelled virus-specific antibody applied first.',
        'Followed by FITC-labelled anti-species immunoglobulin'],
      ['Evans blue', '#2f6f8e', 'Counterstain. Makes uninfected cells dull red so the green stands out.',
        '0.01% in the conjugate'],
      ['Cold acetone', '#9aa5b1', 'Fixative. Permeabilises the cell so antibody can reach internal antigen.', '100% acetone at −20 °C']
    ],
    steps: [
      ['Collect nasopharyngeal aspirate or a swab with cellular material. Wash the cells and spot them onto a multi-well slide.', '', 'The specimen must contain intact columnar epithelial cells. A swab of mucus alone is useless.'],
      ['Air dry, then fix in cold acetone.', '10 min', ''],
      ['Apply the labelled antibody (direct) or the unlabelled primary (indirect). Incubate in a humid chamber at 37 °C.', '30 min', 'Humidity matters — a dried well gives non-specific fluorescence everywhere.'],
      ['Wash in phosphate-buffered saline, then rinse in distilled water.', '10 min', ''],
      ['Indirect method only: apply the FITC-labelled anti-species conjugate and incubate again.', '30 min', 'The extra layer amplifies the signal, which is why the indirect method is the more sensitive of the two.'],
      ['Wash, air dry, and mount in buffered glycerol.', '', ''],
      ['Read on a fluorescence microscope at ×200–400 with a blue excitation filter.', '', '']
    ],
    result: '<b>Apple-green fluorescence</b> in infected cells, against the dull red of the Evans blue counterstain. The pattern localises the antigen: influenza nucleoprotein appears in the nucleus early and the cytoplasm later; respiratory syncytial virus gives bright cytoplasmic inclusions.',
    mechanism: 'The antibody supplies the specificity that no chemical dye can: it binds one viral protein and nothing else. The fluorochrome simply reports where that antibody ended up. Swapping the chromogen for an enzyme and a precipitating substrate turns the same principle into immunohistochemistry, which is how hepatitis B surface and core antigen are demonstrated in liver tissue.',
    pitfalls: [
      'An inadequate specimen with too few epithelial cells — the commonest reason for an uninterpretable result.',
      'Non-specific fluorescence from mucus, bacteria and dead cells; judgement comes with experience.',
      'Fluorescence fades under the excitation beam, so read and photograph promptly.',
      'Far less sensitive than PCR, and the performance depends heavily on who is reading the slide.'
    ]
  };

  /* ── orcein / HBV histology ─────────────────────────────────── */
  S.orcein = {
    name: 'Shikata orcein stain',
    badge: 'Histochemical',
    aka: 'Orcein · Victoria blue · aldehyde fuchsin — for HBsAg in liver tissue',
    use: 'Demonstrates hepatitis B surface antigen directly in a liver biopsy. Largely superseded by immunohistochemistry, but still used, and it is a neat example of a stain that was adapted to a virus by accident — orcein was an elastic fibre stain first.',
    reagents: [
      ['Potassium permanganate', '#8a4bb0', 'Oxidiser. The step that makes HBsAg stainable at all.', '0.25% aqueous'],
      ['Oxalic acid', '#9aa5b1', 'Bleaches off the brown permanganate deposit.', '2% aqueous'],
      ['Orcein', '#7a4a2a', 'The dye. A natural lichen product, acidified in alcohol.',
        '1% orcein in 70% ethanol with 1% concentrated HCl'],
      ['Haematoxylin', '#3b5f9e', 'Nuclear counterstain.', 'Mayer\'s or Harris\'s']
    ],
    steps: [
      ['Dewax the section in xylene and rehydrate through graded alcohols to water.', '', ''],
      ['Oxidise in 0.25% potassium permanganate.', '5 min', 'Oxidation converts the sulphur-containing groups of HBsAg into sulphonate residues, which is what the dye then binds.'],
      ['Rinse, then bleach in 2% oxalic acid until the section is colourless.', '1–2 min', ''],
      ['Wash well in running water.', '5 min', ''],
      ['Stain in acidified orcein.', '1–4 h', 'Long, and the time varies between batches of dye. Overnight at room temperature also works.'],
      ['Differentiate in 70% alcohol until the background is clean.', '', 'Controlled by eye under the microscope.'],
      ['Counterstain lightly with haematoxylin, dehydrate, clear and mount.', '', '']
    ],
    result: '<b>HBsAg appears as dark brown granular material in hepatocyte cytoplasm.</b> On a routine H&E, the same cells show the classic <b>ground-glass appearance</b> — a pale, finely granular, eosinophilic cytoplasm, caused by smooth endoplasmic reticulum swollen with surface antigen. Orcein also stains elastic fibres and copper-associated protein, so the pattern has to be interpreted, not just spotted.',
    mechanism: 'Permanganate oxidation converts cysteine-rich regions of the surface antigen into strongly acidic sulphonate groups. Orcein is a basic dye in acid alcohol, so it binds those groups. The specificity is chemical rather than immunological, which is exactly why immunohistochemistry — using an antibody against HBsAg, developed with a DAB chromogen — has largely replaced it.',
    pitfalls: [
      'Not specific to hepatitis B: elastic tissue, copper-binding protein in Wilson disease, and lipofuscin can all stain.',
      'Staining time varies by dye batch, so a positive control section is essential.',
      'Ground-glass hepatocytes on H&E are suggestive but not diagnostic — drug effect and fibrinogen storage disease look similar.'
    ],
    variants: [
      ['Immunohistochemistry', 'The modern method. Anti-HBs gives cytoplasmic and membranous staining; anti-HBc gives nuclear staining, and a nuclear pattern correlates with active viral replication.']
    ]
  };

  /* ── H&E ────────────────────────────────────────────────────── */
  S.he = {
    name: 'Haematoxylin and eosin',
    badge: 'Routine histology',
    aka: 'H&E — the first and usually the only stain on any tissue section',
    use: 'Not a stain for organisms, but the one on which tissue changes are described: the ground-glass hepatocytes of chronic hepatitis B, the granuloma of tuberculosis with its caseous centre and Langhans giant cells, and the plasma leak and haemorrhage of severe dengue.',
    reagents: [
      ['Haematoxylin', '#4a3f8a', 'Basic dye, binds acidic structures — chiefly nuclear DNA.',
        'Harris\'s or Mayer\'s, ripened with an aluminium mordant'],
      ['Acid alcohol', '#9aa5b1', 'Differentiator, removing excess nuclear stain.', '1% HCl in 70% ethanol'],
      ['Scott\'s tap water', '#6f9ed8', 'Alkaline rinse that turns haematoxylin from red to blue.',
        'Sodium bicarbonate and magnesium sulphate in water'],
      ['Eosin Y', '#d4556b', 'Acidic dye, binds basic cytoplasmic proteins.', '0.5–1% aqueous or alcoholic']
    ],
    steps: [
      ['Dewax in xylene, then rehydrate through absolute, 95% and 70% alcohol to water.', '', ''],
      ['Stain in haematoxylin.', '5–10 min', ''],
      ['Wash in running tap water.', '', ''],
      ['Differentiate briefly in 1% acid alcohol.', '2–5 s', 'Seconds, under visual control. Over-differentiation strips the nuclei pale.'],
      ['Wash, then blue in Scott\'s tap water substitute.', '1 min', 'Raising the pH shifts haematoxylin from reddish to its proper blue-purple.'],
      ['Counterstain in eosin.', '2–3 min', ''],
      ['Dehydrate through graded alcohols, clear in xylene, and mount in resin.', '', '']
    ],
    result: '<b>Nuclei blue-purple, cytoplasm and collagen varying shades of pink.</b> The granuloma of tuberculosis is unmistakable: a central pink granular zone of caseous necrosis, ringed by epithelioid macrophages and multinucleated Langhans giant cells with their horseshoe of peripheral nuclei, and an outer cuff of lymphocytes.',
    mechanism: 'Haematoxylin itself is not a dye. Oxidised to haematein and complexed with an aluminium mordant, it becomes a positively charged lake that binds the phosphate groups of nucleic acid — hence blue nuclei. Eosin is anionic and binds positively charged amino acid side chains in cytoplasmic protein, giving every gradation of pink by protein density.',
    pitfalls: [
      'Incomplete dewaxing leaves patchy, unstained areas.',
      'Over-differentiation in acid alcohol washes the nuclear detail out entirely.',
      'Failure to blue properly leaves nuclei a muddy red-brown.',
      'Too much eosin flattens the contrast between cytoplasm and collagen.'
    ]
  };


  /* ── KOH mount ──────────────────────────────────────────────── */
  S.koh = {
    name: 'Potassium hydroxide mount',
    badge: 'Direct microscopy',
    aka: 'KOH wet mount · the first test on any specimen where a fungus is suspected',
    use: 'Dissolves keratin, host cells and debris while leaving fungal walls intact, so hyphae and yeasts stand out in skin scrapings, nail clippings, hair, sputum and vaginal or oral swabs. It costs almost nothing and takes minutes.',
    reagents: [
      ['Potassium hydroxide', '#aab6c4', 'The clearing agent. Digests keratin and host protein; fungal chitin resists it.',
        '10% for skin and mucosal specimens, 20–40% for nails and hair'],
      ['Dimethyl sulphoxide', '#c8d0da', 'Optional. Speeds clearing so the slide can be read without heating.',
        '40% DMSO in the KOH solution'],
      ['Calcofluor white', '#7fc4e8', 'Optional fluorescent brightener that binds chitin and cellulose.',
        '0.1%, read under ultraviolet — far more sensitive than KOH alone']
    ],
    steps: [
      ['Collect the specimen properly: scrape the <b>active advancing edge</b> of a skin lesion, take subungual debris rather than the nail plate surface, and pluck hairs with the root.', '', 'A poor specimen is the usual reason a KOH is negative in genuine infection.'],
      ['Place the material on a slide with a drop of KOH and apply a coverslip.', '', ''],
      ['Press gently to spread and thin the material. Blot any excess from the edge.', '', ''],
      ['Leave to clear at room temperature, or warm gently without boiling to speed it up.', '5–30 min', 'Nails need longer — up to an hour, or overnight in a humid chamber. Boiling produces artefact crystals.'],
      ['Examine under reduced light, first at ×10 to scan, then ×40 to confirm.', '', 'Close the condenser iris. Fungal elements are refractile and are easily missed in a brightly lit field.']
    ],
    result: 'Fungal elements appear as <b>refractile, greenish or colourless structures</b> against a cleared background. Look for branching septate hyphae in dermatophyte infection, <b>budding yeasts with pseudohyphae</b> in candidiasis, and the short curved hyphae with clusters of round yeasts — the "spaghetti and meatballs" appearance — of <i>Malassezia</i> in pityriasis versicolor.',
    mechanism: 'Potassium hydroxide hydrolyses the peptide bonds of keratin and host proteins, dissolving epithelial cells and debris. The fungal wall is built from chitin and glucan, which are not hydrolysed under these conditions, so the organism is left standing in a cleared field.',
    pitfalls: [
      'Mosaic artefact — cholesterol crystals at the cell margins forming a net that is mistaken for hyphae. It follows cell outlines; true hyphae cross them.',
      'Cotton or clothing fibres, which are wider, flatter and do not branch or have septa.',
      'Reading with the condenser wide open, which washes out the refractile detail.',
      'A negative KOH never excludes fungal infection — always send culture as well.'
    ],
    variants: [
      ['Calcofluor white', 'Add the fluorochrome to the KOH and read under ultraviolet. Fungal walls fluoresce bright blue-white against a dark field, and sensitivity is substantially higher than KOH alone. The standard method where a fluorescence microscope is available.'],
      ['India ink', 'Not a KOH method, but the same idea of negative contrast: ink particles are excluded by the polysaccharide capsule of <i>Cryptococcus neoformans</i> in cerebrospinal fluid, leaving a clear halo around the yeast.']
    ]
  };

  /* ── Lactophenol cotton blue ────────────────────────────────── */
  S.lactophenol = {
    name: 'Lactophenol cotton blue',
    badge: 'Fungal mount',
    aka: 'LPCB · the standard mount for identifying a fungal culture',
    use: 'Used to examine growth from a culture plate rather than a clinical specimen. Three reagents in one: lactic acid preserves the structures, phenol kills the organism, and cotton blue stains the chitin wall.',
    reagents: [
      ['Phenol', '#c8c0a0', 'Kills the fungus and any bacteria, making the preparation safe to handle.', '20 g'],
      ['Lactic acid', '#d8d0b8', 'Preserves fungal structures and clears the background.', '20 mL'],
      ['Glycerol', '#e0dcc8', 'Prevents the mount drying out, so slides can be kept.', '40 mL'],
      ['Cotton blue (aniline blue)', '#3f6fc4', 'Binds chitin in the fungal wall and stains it blue.', '0.05 g in 20 mL distilled water']
    ],
    steps: [
      ['Place a drop of lactophenol cotton blue on a clean slide.', '', ''],
      ['Using a sterile needle or the tease-mount technique, take a small portion of the colony <b>from the edge</b>, where sporulation is most recent.', '', 'The centre of an old colony is usually sterile mycelium with no identifying structures.'],
      ['Tease the material apart gently in the stain with two needles.', '', 'The conidial arrangement is the identifying feature, and rough handling destroys it. This is the step that decides whether the mount is readable.'],
      ['Apply a coverslip at an angle to avoid trapping air bubbles.', '', ''],
      ['Leave to stain.', '5–10 min', ''],
      ['Examine at ×10 and ×40.', '', '']
    ],
    result: 'Fungal structures stain <b>blue against a pale background</b>. Identification rests on the shape and arrangement of the conidia and the structures that bear them — the chains of conidia on a phialide in <i>Aspergillus</i>, the brush-like penicillus of <i>Penicillium</i>, the macroconidia and microconidia of the dermatophytes, and for <i>Candida</i>, budding blastoconidia with pseudohyphae and the terminal chlamydospores of <i>C. albicans</i> on cornmeal agar.',
    mechanism: 'Cotton blue is an acid dye with affinity for chitin. Lactic acid acts as a clearing and mounting medium with a refractive index close to that of the fungal wall, and phenol sterilises the preparation so that a mould culture can be examined without risk of inhaling spores.',
    pitfalls: [
      'Tearing the specimen apart and destroying the conidial arrangement — far and away the commonest problem.',
      'Taking material from the sterile centre of the colony.',
      'Air bubbles obscuring the field.',
      'Over-staining, which obliterates internal detail.'
    ],
    safety: 'Phenol is corrosive and toxic by skin absorption — wear gloves. Open mould plates only inside a biosafety cabinet: tease mounts release spores, and several laboratory-acquired fungal infections have begun exactly this way. Use adhesive tape preparations or slide cultures for sporulating moulds instead of open teasing.',
    variants: [
      ['Slide culture', 'A block of agar inoculated and incubated under a coverslip, so the fungus grows undisturbed and the conidial arrangement is preserved exactly as it formed. The reference method for mould identification.'],
      ['Adhesive tape mount', 'Clear tape touched to the colony surface and laid on a drop of stain. Fast, and it keeps the arrangement intact better than teasing.']
    ]
  };

  window.STAINS = { lib: S, injectCss: inject };
})();
