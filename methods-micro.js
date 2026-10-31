/* Methods, part 1: core microbiology bench technique. */
window.METHODS = (window.METHODS || []).concat([

{
  id: 'culture', name: 'Culture and isolation', kind: 'method', cat: 'Microbiology',
  organism: 'Streak plate, media selection, pure culture',
  aka: ['culture', 'streak plate', 'agar', 'media', 'isolation', 'colony', 'pure culture', 'subculture'],
  tagline: 'Getting one organism, separated from everything it arrived with.',
  hero: 'Almost every identification, susceptibility test and molecular method downstream assumes you are working with a pure culture. The streak plate is how that purity is achieved, and the choice of medium is how you decide what is allowed to grow in the first place.',
  quick: [
    ['Purpose', 'Separate a mixed specimen into single colonies'],
    ['Principle', 'Progressive dilution across the agar surface by the loop itself'],
    ['Time', '18–24 h for most bacteria; 3–8 weeks for mycobacteria'],
    ['Incubation', '35–37 °C, aerobic, CO₂ or anaerobic as required'],
    ['Output', 'Isolated colonies, each from one original cell'],
    ['Key definition', 'A colony-forming unit is one viable cell or clump, not one cell']
  ],
  sections: [
    { id: 'principle', title: 'Principle', blocks: [
      { t: 'p', text: 'A clinical specimen is a mixture. The streak plate dilutes that mixture mechanically: each successive set of streaks carries fewer organisms from the last, until individual cells are far enough apart that each grows into a discrete colony. Because every colony descends from one cell or clump, picking a single colony gives a pure culture.' },
      { t: 'note', tone: 'info', text: 'This is why the unit is the <b>colony-forming unit</b> and not the cell. Streptococci arrive in chains and staphylococci in clusters, and each clump produces one colony. A CFU count systematically underestimates the true cell number, and that is accepted rather than corrected for.' }
    ]},
    { id: 'media', title: 'Choosing the medium', blocks: [
      { t: 'table', head: ['Type', 'What it does', 'Examples'], rows: [
        ['Basal / general purpose', 'Supports most non-fastidious organisms', 'Nutrient agar, tryptic soy agar'],
        ['Enriched', 'Added blood, serum or growth factors for fastidious organisms', 'Blood agar, chocolate agar (for <i>Haemophilus</i> and <i>Neisseria</i>)'],
        ['Selective', 'Inhibits unwanted flora so a target can be recovered', 'MacConkey (bile salts, crystal violet — Gram-negatives only), TCBS (pH 8.6 — vibrios), LJ (malachite green — mycobacteria)'],
        ['Differential', 'All grow, but target organisms look different', 'MacConkey (lactose fermenters pink), blood agar (haemolysis patterns)'],
        ['Enrichment broth', 'Liquid medium that favours a minority organism before plating', 'Alkaline peptone water for <i>V. cholerae</i>, selenite F for salmonellae'],
        ['Transport', 'Keeps organisms viable without multiplication', 'Amies, Stuart, Cary–Blair']
      ]},
      { t: 'note', tone: 'warn', text: 'Selective and differential are not the same thing and the distinction is commonly examined. MacConkey is <b>both</b>: bile salts and crystal violet select against Gram-positives, while lactose and the neutral red indicator differentiate lactose fermenters (pink) from non-fermenters (pale). <i>Salmonella</i> Typhi is a non-lactose fermenter and appears as pale colonies.' },
      { t: 'ul', title: 'Haemolysis on blood agar — read it against the light', items: [
        '<b>Beta</b>: complete clearing of the agar. <i>S. pyogenes</i>, <i>S. agalactiae</i>.',
        '<b>Alpha</b>: partial, green discolouration from haemoglobin reduction. <i>S. pneumoniae</i>, viridans streptococci.',
        '<b>Gamma</b>: no change. Enterococci, many others.'
      ]}
    ]},
    { id: 'procedure', title: 'Procedure', blocks: [
      { t: 'protocol', def: {
        name: 'Four-quadrant streak plate',
        badge: 'Aseptic technique',
        aka: 'The standard method for obtaining single colonies from a mixed specimen',
        use: 'Performed beside a flame or in a biosafety cabinet, on a pre-warmed plate dried of surface condensation.',
        reagents: [
          ['Agar plate', '#c8d8b0', 'Chosen for the specimen and the organism sought.', 'Pre-warmed to room temperature, lid down, surface dry'],
          ['Inoculating loop', '#9aa5b1', 'Nichrome wire or a sterile disposable plastic loop.', '1 µL or 10 µL calibrated loop where a count is needed'],
          ['Bunsen burner', '#e0803c', 'Flame sterilisation between quadrants, and the updraught that protects the plate.', 'Or a sterile disposable loop per quadrant']
        ],
        steps: [
          ['Label the base of the plate, never the lid. Lids get swapped.', '', ''],
          ['Flame the loop to red heat along its whole length, then let it cool for 10–20 seconds.', '20 s', 'A hot loop sprays aerosol on contact with the specimen and kills the organisms you are trying to grow.'],
          ['Take the specimen and spread it across the first quadrant, about a quarter of the plate, with close parallel strokes.', '', ''],
          ['Flame the loop and cool it. Turn the plate 90°.', '', 'Skipping this is why plates come back confluent.'],
          ['Drag 3–4 strokes out of quadrant one into quadrant two, then streak out the rest of that quadrant.', '', 'Only the first few strokes touch the previous quadrant. That is where the dilution happens.'],
          ['Flame, cool, turn 90°, and repeat into the third quadrant.', '', ''],
          ['Flame, cool, and streak the fourth quadrant without returning to the third at the end.', '', ''],
          ['Invert the plate and incubate at 35–37 °C.', '18–24 h', 'Inverted so condensation falls into the lid rather than onto the agar and spreads the colonies together.']
        ],
        result: 'Confluent growth in quadrant one, thinning through two and three, and <b>well-separated single colonies in quadrant four</b>. Each of those is a pure clone. Record colony morphology — size, shape, elevation, edge, colour, opacity, haemolysis and odour — before touching anything.',
        mechanism: 'Nothing is diluted in a tube. The dilution is purely mechanical: flaming between quadrants means only the handful of cells carried on the first few strokes seed the next area, and after three or four rounds that number falls into the range where individual cells land apart.',
        pitfalls: [
          'Loop not cooled, so the inoculum is killed or spattered.',
          'Gouging the agar, which traps growth below the surface and prevents separation.',
          'Returning to a previous quadrant at the end of a streak, which undoes the dilution.',
          'Wet plates, where surface moisture runs the colonies together.',
          'Reading a mixed culture as pure. Always check that quadrant-four colonies are uniform before subculturing.'
        ],
        safety: 'Specimens are handled at BSL-2 as a minimum. Never flame a loop carrying material from a liquid culture directly — the spatter is an aerosol. Anything suspected of being <i>M. tuberculosis</i>, <i>Brucella</i> or a dimorphic fungus goes into a cabinet, never onto an open bench.'
      }}
    ]},
    { id: 'uses', title: 'Where this matters outside the clinic', blocks: [
      { t: 'ul', items: [
        '<b>Strain banking.</b> Every recombinant construct in a biotechnology laboratory begins as a single transformant colony, picked from a plate exactly like this.',
        '<b>Purity control.</b> A master and working cell bank is checked by plating; a contaminated bank invalidates everything made from it.',
        '<b>Contamination tracing in fermentation.</b> Plating from a bioreactor is how a stuck batch is diagnosed.',
        '<b>Antibiotic discovery.</b> Isolating environmental actinomycetes on selective media is still how new scaffolds are found.',
        '<b>Food, water and pharmaceutical testing.</b> Standard plate counts, coliform testing and sterility assurance all rest on this technique.'
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['ASM — laboratory protocols collection', 'https://asm.org/Protocols'],
        ['UK SMI — Bacteriology standards for microbiology investigations', 'https://www.gov.uk/government/collections/standards-for-microbiology-investigations-smi'],
        ['CLSI — clinical and laboratory standards', 'https://clsi.org/']
      ]}
    ]}
  ]
},

{
  id: 'ast', name: 'Antimicrobial susceptibility testing', kind: 'method', cat: 'Microbiology',
  organism: 'Disc diffusion, MIC, E-test',
  aka: ['ast', 'susceptibility', 'kirby bauer', 'disc diffusion', 'mic', 'etest', 'antibiogram', 'resistance testing', 'breakpoint', 'zone of inhibition'],
  tagline: 'Turning a zone of clearing into a decision about whether a drug will work in a patient.',
  hero: 'Susceptibility testing is the laboratory step that most directly changes treatment. It is also the one most often misread, because a zone diameter means nothing without the organism, the medium, the disc content and the current breakpoint table all being correct.',
  quick: [
    ['Methods', 'Disc diffusion, broth microdilution, gradient strip, automated systems'],
    ['Reference standards', 'CLSI (United States) and EUCAST (Europe)'],
    ['Medium', 'Mueller–Hinton agar — unbuffered, low in thymidine, pH 7.2–7.4'],
    ['Depth', 'Exactly 4 mm — depth changes diffusion and therefore the zone'],
    ['Inoculum', '0.5 McFarland ≈ 1.5 × 10⁸ CFU/mL'],
    ['Incubation', '16–18 h at 35 ± 2 °C in air'],
    ['Report as', 'S — susceptible, I — susceptible increased exposure, R — resistant']
  ],
  sections: [
    { id: 'principle', title: 'Principle', blocks: [
      { t: 'p', text: 'An antibiotic diffuses out of a paper disc into the agar, forming a concentration gradient that is highest at the disc and falls with distance. The organism grows everywhere the concentration is below what inhibits it. The edge of the resulting clear zone marks the point where drug concentration equals the minimum inhibitory concentration — so zone diameter is an indirect read-out of MIC, and the relationship between them is what the breakpoint tables encode.' },
      { t: 'note', tone: 'warn', text: 'Zone size is <b>not</b> a measure of how well a drug will work. A large zone for one antibiotic and a small zone for another says nothing about which is more effective, because every drug diffuses at a different rate and every breakpoint is different. Only the S / I / R interpretation, read against the current table for that organism and drug, means anything.' }
    ]},
    { id: 'procedure', title: 'Disc diffusion — the Kirby–Bauer method', blocks: [
      { t: 'protocol', def: {
        name: 'Kirby–Bauer disc diffusion',
        badge: 'Standardised',
        aka: 'The method is only valid if every variable below is held exactly',
        use: 'Suitable for rapidly growing organisms: Enterobacterales, staphylococci, enterococci, <i>Pseudomonas</i>, and with modified media, streptococci and <i>Haemophilus</i>.',
        reagents: [
          ['Mueller–Hinton agar', '#c8d8b0', 'The reference medium. Low thymidine content, which otherwise antagonises sulphonamides and trimethoprim.', 'Poured to exactly 4 mm — about 25 mL in a 90 mm plate'],
          ['0.5 McFarland standard', '#aab6c4', 'Turbidity reference for the inoculum.', 'Equivalent to 1.5 × 10⁸ CFU/mL; verify with a photometer where available'],
          ['Antibiotic discs', '#e0d0a0', 'Fixed drug content per disc, stored desiccated at −20 °C and brought to room temperature before opening.', 'Condensation on a cold cartridge destroys the discs'],
          ['Control strains', '#9ac4d8', 'Run with every new batch of plates or discs.', '<i>E. coli</i> ATCC 25922, <i>S. aureus</i> ATCC 25923, <i>P. aeruginosa</i> ATCC 27853']
        ],
        steps: [
          ['Pick 3–5 well-isolated colonies of the same morphology from an 18–24 h pure culture and suspend them in saline.', '', 'From colonies, never from the primary plate directly, and never from a mixed growth.'],
          ['Adjust the suspension to 0.5 McFarland.', '', 'Too heavy gives falsely small zones and can turn a susceptible isolate into a reported resistant one. Too light does the reverse.'],
          ['Inoculate within 15 minutes of adjusting.', '15 min', 'The suspension keeps growing. Beyond 15 minutes the density is no longer what you set.'],
          ['Dip a sterile swab, press out excess against the tube wall, and streak the entire plate in three directions, rotating 60° each time. Run the swab round the rim last.', '', 'The aim is an even lawn. Patchy inoculation produces ragged, unmeasurable zones.'],
          ['Let the surface dry, lid closed.', '3–5 min', 'No longer than 15 minutes, or the organism begins to grow before the discs go on.'],
          ['Apply discs with sterile forceps or a dispenser, pressing each down to contact the agar. No more than 12 on a 150 mm plate, or 5 on a 90 mm plate, and at least 24 mm apart centre to centre.', '', 'Overlapping gradients from crowded discs make zones unreadable.'],
          ['Invert and incubate at 35 ± 2 °C in ambient air.', '16–18 h', 'CO₂ changes the pH of the medium and shifts zone sizes — only use it where the table specifies it.'],
          ['Measure each zone diameter to the nearest millimetre, including the disc, reading the point of complete inhibition against a dark background with reflected light.', '', 'For sulphonamides and trimethoprim, ignore faint growth up to 20% of the lawn and read the obvious margin. For <i>Proteus</i>, ignore swarming within an otherwise clear zone.'],
          ['Interpret against the current CLSI or EUCAST table for that organism and that drug.', '', 'Tables change every year. Using last year\'s breakpoints is a real and recurring source of error.']
        ],
        result: 'A circular zone of no growth around each disc. Report <b>S</b>, <b>I</b> or <b>R</b> — never the raw millimetre value alone to a clinician. Look for colonies <i>inside</i> a clear zone: that is a resistant subpopulation or a mixed culture, and it must be investigated rather than ignored.',
        mechanism: 'Diffusion from a point source creates a radial logarithmic concentration gradient. Bacterial growth across the plate is effectively simultaneous, so the zone edge forms where the advancing growth front meets the inhibitory concentration. Zone diameter therefore correlates with MIC, and regression of the two across many strains is exactly how breakpoints are derived.',
        pitfalls: [
          'Inoculum density wrong — the single largest source of error in the whole method.',
          'Agar depth not 4 mm. Thin agar gives falsely large zones, thick agar falsely small.',
          'Discs that have absorbed moisture from being opened cold.',
          'Reading before 16 hours, which can miss inducible or slow-growing resistance.',
          'Using breakpoints for the wrong organism group, or an out-of-date table.'
        ],
        safety: 'Standard BSL-2 precautions. Discard plates by autoclaving — a plate carrying a multidrug-resistant organism is a biohazard, not general waste.'
      }}
    ]},
    { id: 'mic', title: 'MIC methods and special tests', blocks: [
      { t: 'table', head: ['Method', 'How it works', 'When to use it'], rows: [
        ['Broth microdilution', 'Doubling dilutions of antibiotic in a 96-well plate, each inoculated to 5 × 10⁵ CFU/mL. The MIC is the lowest concentration with no visible growth.', 'The reference method. Needed for vancomycin, colistin and anywhere a number is required.'],
        ['Agar dilution', 'Antibiotic incorporated into a series of plates, spot-inoculated.', 'Reference method for anaerobes and <i>N. gonorrhoeae</i>.'],
        ['Gradient strip (E-test)', 'A plastic strip with a continuous exponential gradient. The MIC is read where the elliptical zone intersects the strip.', 'Single-drug MIC without a whole microdilution plate. Useful for penicillin on pneumococcus, and for sterile-site isolates.'],
        ['Automated systems', 'Miniaturised broth dilution with optical growth detection.', 'Routine high-throughput work: VITEK, Phoenix, MicroScan.'],
        ['Disc diffusion', 'As above.', 'Cheap, flexible, and still the workhorse in most of the world.']
      ]},
      { t: 'ul', title: 'Tests you will be asked about', items: [
        '<b>MBC.</b> Minimum bactericidal concentration — subculture the clear MIC wells onto antibiotic-free agar. The MBC is the lowest concentration killing 99.9%. An MBC far above the MIC indicates tolerance.',
        '<b>D-test.</b> Clindamycin disc placed 15–26 mm from erythromycin. Flattening of the clindamycin zone on the erythromycin side — a D shape — reveals inducible clindamycin resistance in staphylococci, and clindamycin must then be reported resistant.',
        '<b>Double-disc synergy / combination discs.</b> Cephalosporin alone versus with clavulanate. Zone expansion of ≥5 mm indicates an extended-spectrum beta-lactamase.',
        '<b>Modified carbapenem inactivation (mCIM).</b> Detects carbapenemase production by whether the test organism destroys meropenem in a disc.',
        '<b>Cefoxitin disc.</b> The surrogate for <i>mecA</i>-mediated methicillin resistance in <i>S. aureus</i> — more reliable than an oxacillin disc.'
      ]},
      { t: 'note', tone: 'info', text: 'EUCAST redefined <b>I</b> in 2019. It no longer means "intermediate" in the old sense but <b>"susceptible, increased exposure"</b> — the drug will work if dosing is high enough or the site concentrates it, such as urine. This matters clinically and is frequently misreported.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['EUCAST — clinical breakpoint tables and reading guide', 'https://www.eucast.org/clinical_breakpoints'],
        ['CLSI — M100 performance standards', 'https://clsi.org/standards/products/microbiology/documents/m100/'],
        ['WHO GLASS — global AMR surveillance', 'https://www.who.int/initiatives/glass'],
        ['ICMR — AMR surveillance network, India', 'https://www.icmr.gov.in/']
      ]}
    ]}
  ]
},

{
  id: 'biochem', name: 'Biochemical identification', kind: 'method', cat: 'Microbiology',
  organism: 'Catalase, oxidase, IMViC, TSI and the rest',
  aka: ['biochemical', 'imvic', 'tsi', 'catalase', 'oxidase', 'coagulase', 'urease', 'indole', 'citrate', 'identification', 'api'],
  tagline: 'Identifying an organism by what it can and cannot metabolise.',
  hero: 'Before sequencing, and still today in most laboratories, an organism is named by its enzymes. Each test asks one question about metabolism, and the pattern of answers narrows a Gram-negative bacillus from a thousand possibilities to a species.',
  quick: [
    ['Principle', 'Detect a specific enzyme or metabolic end product'],
    ['Read-out', 'Usually a pH indicator colour change or gas production'],
    ['Time', '18–24 h for most; minutes for catalase and oxidase'],
    ['Starting material', 'A pure culture, never a mixed plate'],
    ['Modern equivalents', 'API strips, VITEK cards, and MALDI-TOF mass spectrometry'],
    ['Still essential', 'Rapid tests at the bench guide everything that follows']
  ],
  sections: [
    { id: 'rapid', title: 'Rapid bench tests', blocks: [
      { t: 'table', head: ['Test', 'What it detects', 'Method', 'Positive result'], rows: [
        ['Catalase', 'Catalase enzyme, which breaks H₂O₂ into water and oxygen', 'A colony on a slide plus a drop of 3% hydrogen peroxide', 'Immediate brisk bubbling. Separates <i>Staphylococcus</i> (positive) from <i>Streptococcus</i> (negative).'],
        ['Oxidase', 'Cytochrome c oxidase', 'Smear a colony on filter paper impregnated with tetramethyl-p-phenylenediamine', 'Deep purple within 10 s. <i>Pseudomonas</i>, <i>Vibrio</i>, <i>Neisseria</i>, <i>Campylobacter</i> positive; all Enterobacterales negative.'],
        ['Coagulase', 'Free and bound coagulase', 'Slide test for clumping factor; tube test with rabbit plasma for free coagulase', 'Clot formation. Defines <i>S. aureus</i> against the coagulase-negative staphylococci.'],
        ['Urease', 'Urease, splitting urea to ammonia', 'Christensen urea agar slope', 'Bright pink. <i>Proteus</i> strongly positive in hours; also <i>H. pylori</i>, <i>Klebsiella</i>.'],
        ['Indole', 'Tryptophanase', 'Kovács reagent on a tryptone broth', 'Red ring at the surface. <i>E. coli</i> positive, <i>Klebsiella</i> negative.'],
        ['Optochin / bacitracin', 'Susceptibility as an identification tool', 'Disc on a blood agar lawn', 'Zone: optochin for <i>S. pneumoniae</i>, bacitracin for <i>S. pyogenes</i>.']
      ]},
      { t: 'note', tone: 'warn', text: 'Never take a colony for a catalase test off a blood agar plate with a loop that scoops agar — red cells contain catalase and will give a false positive. And never do an oxidase test with a nichrome loop, as the metal itself oxidises the reagent. Use a plastic loop or a wooden stick.' }
    ]},
    { id: 'imvic', title: 'IMViC and TSI', blocks: [
      { t: 'p', text: 'IMViC is the classical four-test panel that separates the coliforms, and it still appears in every microbiology syllabus. The lower-case i is there only to make the acronym pronounceable.' },
      { t: 'table', head: ['Test', 'Question asked', '<i>E. coli</i>', '<i>Klebsiella</i>/<i>Enterobacter</i>'], rows: [
        ['<b>I</b>ndole', 'Does it split tryptophan?', '+', '−'],
        ['<b>M</b>ethyl red', 'Does it do mixed-acid fermentation, dropping pH below 4.4?', '+', '−'],
        ['<b>V</b>oges–Proskauer', 'Does it make acetoin via the butanediol pathway?', '−', '+'],
        ['<b>C</b>itrate', 'Can it use citrate as its sole carbon source?', '−', '+']
      ]},
      { t: 'ul', title: 'Triple sugar iron agar — three sugars, one tube', items: [
        'Contains glucose (0.1%), lactose and sucrose (1% each), with phenol red and ferrous sulphate. Inoculate by stabbing the butt and streaking the slope.',
        '<b>Alkaline slope / acid butt (red/yellow):</b> glucose only fermented. <i>Salmonella</i>, <i>Shigella</i>.',
        '<b>Acid slope / acid butt (yellow/yellow):</b> lactose or sucrose fermented too. <i>E. coli</i>, <i>Klebsiella</i>.',
        '<b>Alkaline / alkaline (red/red):</b> no fermentation. <i>Pseudomonas</i> — a non-fermenter.',
        '<b>Black butt:</b> hydrogen sulphide production, from ferrous sulphide. <i>Salmonella</i>, <i>Proteus</i>.',
        '<b>Cracks or bubbles:</b> gas from fermentation. <i>S.</i> Typhi is characteristically H₂S positive with little or no gas.'
      ]},
      { t: 'note', tone: 'info', text: 'TSI must be read at 18–24 hours. Read too early and lactose fermenters have not caught up; read too late and the slope reverts to alkaline as peptones are used up, so a lactose fermenter can be misread as a non-fermenter. Leave the cap loose — a tight cap creates anaerobic conditions and distorts the slope reaction.' }
    ]},
    { id: 'modern', title: 'What replaced it', blocks: [
      { t: 'table', head: ['Platform', 'Principle', 'Time to result'], rows: [
        ['API strips', '20 miniaturised biochemical tests in a plastic strip, read as a 7-digit numerical profile against a database', '18–24 h'],
        ['VITEK 2 / Phoenix', 'Automated cards reading dozens of substrates optically, with identification and susceptibility together', '4–18 h'],
        ['MALDI-TOF MS', 'Laser desorption of a colony, measuring the ribosomal protein mass spectrum and matching it against a reference library', '<b>Minutes</b>'],
        ['16S rRNA sequencing', 'Amplify and sequence the conserved gene, then match to a database', '1–2 days'],
        ['Whole genome sequencing', 'Full genome, giving species, resistance genes and outbreak relatedness at once', '1–3 days']
      ]},
      { t: 'p', text: 'MALDI-TOF has genuinely displaced biochemical panels in well-resourced laboratories: it identifies most isolates in minutes from a single colony, at a consumable cost of a few cents. The biochemical tests remain on the syllabus, and on the bench in most of the world, because they are cheap, need no instrument, and because understanding them is understanding the organism\'s metabolism rather than memorising a spectrum.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['ASM protocols — biochemical tests', 'https://asm.org/Protocols'],
        ['UK SMI — identification standards', 'https://www.gov.uk/government/collections/standards-for-microbiology-investigations-smi'],
        ['Bergey\'s Manual of Systematics of Archaea and Bacteria', 'https://onlinelibrary.wiley.com/doi/book/10.1002/9781118960608']
      ]}
    ]}
  ]
},

{
  id: 'sterilisation', name: 'Sterilisation and disinfection', kind: 'method', cat: 'Microbiology',
  organism: 'Autoclaving, filtration, chemical agents, validation',
  aka: ['sterilisation', 'sterilization', 'autoclave', 'disinfection', 'antiseptic', 'validation', 'spore strip', 'filtration', 'asepsis', 'd value'],
  tagline: 'The difference between killing most organisms and guaranteeing none survive.',
  hero: 'Sterility is not a degree. It is defined probabilistically: a sterility assurance level of 10⁻⁶ means no more than one item in a million carries a viable organism. Every method below is chosen and validated against that definition.',
  quick: [
    ['Sterilisation', 'Destroys all microbial life including spores'],
    ['Disinfection', 'Removes most pathogens from inanimate surfaces; spores may survive'],
    ['Antisepsis', 'Reduces organisms on living tissue'],
    ['Sterility assurance level', '10⁻⁶ — one in a million probability of a survivor'],
    ['Autoclave standard', '121 °C, 15 psi, 15–20 min — or 134 °C for 3 min'],
    ['Most resistant form', 'Bacterial endospores; prions resist even standard autoclaving']
  ],
  sections: [
    { id: 'methods', title: 'The methods', blocks: [
      { t: 'table', head: ['Method', 'Conditions', 'Use', 'Limits'], rows: [
        ['<b>Moist heat — autoclave</b>', '121 °C, 15 psi, 15–20 min (or 134 °C, 3 min)', 'Media, glassware, instruments, waste', 'Not for heat-labile liquids, oils or powders'],
        ['<b>Dry heat — hot air oven</b>', '160 °C for 2 h, or 170 °C for 1 h', 'Glassware, oils, powders, metal instruments', 'Slow; far less efficient than moist heat'],
        ['<b>Membrane filtration</b>', '0.22 µm for sterilising; 0.45 µm for clarification', 'Heat-labile liquids: antibiotics, serum, vitamins, media supplements', 'Does not remove viruses or mycoplasma — 0.1 µm needed for mycoplasma'],
        ['<b>Ionising radiation</b>', 'Gamma from cobalt-60, 25 kGy', 'Single-use plastics, syringes, sutures, pharmaceuticals', 'Industrial scale only'],
        ['<b>Ethylene oxide gas</b>', '30–60 °C, 40–60% humidity, several hours plus aeration', 'Heat-sensitive devices, endoscopes, catheters', 'Toxic, mutagenic, flammable; long aeration required'],
        ['<b>Hydrogen peroxide vapour / plasma</b>', '50 °C, ~45 min', 'Heat-sensitive instruments; room decontamination', 'Poor penetration of long narrow lumens'],
        ['<b>Pasteurisation</b>', '63 °C for 30 min, or 72 °C for 15 s', 'Milk, food', 'Reduces pathogens — does not sterilise']
      ]},
      { t: 'note', tone: 'warn', text: 'Moist heat works at a far lower temperature than dry heat because steam denatures and coagulates proteins, whereas dry heat has to oxidise them. The critical point for an autoclave is that it is <b>saturated steam under pressure</b>, not the pressure itself, that sterilises. Trapped air is the enemy: an air pocket is at a much lower temperature than the gauge reading suggests, and items inside it are not sterilised.' }
    ]},
    { id: 'kinetics', title: 'Kinetics — D value, Z value and F₀', blocks: [
      { t: 'ul', items: [
        '<b>D value.</b> The time at a given temperature to kill 90% of a population, that is to reduce it by one log. For <i>Geobacillus stearothermophilus</i> spores at 121 °C, D ≈ 1.5–2 minutes.',
        '<b>Z value.</b> The temperature rise needed to reduce the D value tenfold. For moist heat it is about 10 °C — which is why 134 °C for 3 minutes is equivalent to 121 °C for 30 minutes.',
        '<b>F₀.</b> The equivalent time in minutes at 121 °C that a cycle delivers. A pharmaceutical cycle is specified by F₀, not by a clock reading.',
        '<b>Killing is logarithmic, never absolute.</b> Each D interval removes 90% of what remains, so sterility can only ever be expressed as a probability. Twelve log reductions from a starting bioburden of 10⁶ gives the 10⁻⁶ assurance level.'
      ]},
      { t: 'note', tone: 'info', text: 'This is why the starting bioburden matters as much as the cycle. An instrument covered in dried blood and protein cannot be reliably sterilised, because the soil both shields organisms and raises the starting count. <b>Cleaning always precedes sterilisation</b> — it is not an optional preliminary.' }
    ]},
    { id: 'validation', title: 'Validation and monitoring', blocks: [
      { t: 'table', head: ['Indicator', 'What it proves', 'Example'], rows: [
        ['Physical', 'The cycle reached its parameters', 'Chart recorder, thermocouple, pressure and time log'],
        ['Chemical — external', 'The pack was exposed to the process', 'Autoclave tape, which only shows exposure, not sterility'],
        ['Chemical — internal', 'Steam penetrated the pack', 'Class 5 and 6 integrators placed inside the load'],
        ['Biological', 'Spores were actually killed', '<i>Geobacillus stearothermophilus</i> spore strips for steam; <i>Bacillus atrophaeus</i> for dry heat and ethylene oxide'],
        ['Air removal', 'No residual air in the chamber', 'Bowie–Dick test, run daily on a pre-vacuum autoclave']
      ]},
      { t: 'note', tone: 'warn', text: 'Autoclave tape turning black proves only that the outside of the pack got hot. It is the single most over-interpreted indicator in any laboratory. A <b>biological indicator</b> — spores incubated after the run and showing no growth — is the only evidence that the process actually sterilised the load.' }
    ]},
    { id: 'disinfectants', title: 'Disinfectants, and how to choose one', blocks: [
      { t: 'table', head: ['Agent', 'Level', 'Spectrum', 'Notes'], rows: [
        ['Glutaraldehyde 2%', 'High', 'Including spores with prolonged contact', 'Endoscopes; irritant, needs ventilation'],
        ['Hypochlorite (bleach) 0.5–1%', 'High / intermediate', 'Broad, including viruses and <i>C. difficile</i> spores', 'Corrodes metal; inactivated by organic matter — clean first'],
        ['70% ethanol or isopropanol', 'Intermediate', 'Vegetative bacteria, enveloped viruses', 'Does not kill spores. 70% beats absolute alcohol, because water is needed for protein denaturation.'],
        ['Povidone-iodine', 'Intermediate', 'Broad', 'Antiseptic for skin and mucosa'],
        ['Chlorhexidine 2–4%', 'Low / intermediate', 'Gram-positives especially; persistent activity', 'Surgical scrub, line insertion'],
        ['Quaternary ammonium compounds', 'Low', 'Vegetative bacteria, limited virus activity', 'Environmental surfaces; inactivated by soap and hard water'],
        ['Hydrogen peroxide 3–6%', 'Intermediate / high', 'Broad', 'Surfaces, and vapour for room decontamination']
      ]},
      { t: 'ul', title: 'Spaulding classification — matches the device to the process', items: [
        '<b>Critical</b> — enters sterile tissue or the vascular system. Must be <b>sterilised</b>. Surgical instruments, implants, needles.',
        '<b>Semi-critical</b> — contacts mucous membranes or non-intact skin. <b>High-level disinfection</b>. Endoscopes, respiratory equipment.',
        '<b>Non-critical</b> — contacts intact skin only. <b>Low-level disinfection</b>. Blood pressure cuffs, bed rails, stethoscopes.'
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['CDC — Guideline for disinfection and sterilization in healthcare facilities', 'https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/'],
        ['WHO — Decontamination and reprocessing of medical devices', 'https://www.who.int/publications/i/item/9789241549851'],
        ['ISO 17665 — sterilisation of health care products, moist heat', 'https://www.iso.org/standard/81077.html']
      ]}
    ]}
  ]
},

{
  id: 'growth', name: 'Growth curve and viable counting', kind: 'method', cat: 'Microbiology',
  organism: 'Serial dilution, CFU, generation time, OD600',
  aka: ['growth curve', 'cfu', 'viable count', 'serial dilution', 'generation time', 'doubling time', 'od600', 'log phase', 'turbidity', 'spread plate', 'pour plate'],
  tagline: 'Counting what is alive, and predicting what the population will do next.',
  hero: 'Everything quantitative in microbiology and in fermentation rests on two things: knowing how many viable organisms are present, and knowing where on the growth curve the culture currently sits. Harvesting at the wrong phase is the commonest reason a protein yield or an experiment fails to reproduce.',
  quick: [
    ['Viable count unit', 'CFU per mL — colony-forming units'],
    ['Countable plate range', '30–300 colonies'],
    ['Turbidity proxy', 'OD₆₀₀ — optical density at 600 nm'],
    ['Linear OD range', 'Roughly 0.1–0.8; dilute above this'],
    ['Phases', 'Lag, exponential (log), stationary, death'],
    ['E. coli generation time', '≈20 min in rich medium at 37 °C'],
    ['M. tuberculosis', '15–20 hours — about 50 times slower']
  ],
  sections: [
    { id: 'phases', title: 'The four phases', blocks: [
      { t: 'organs', title: 'Plotted as log₁₀ cell number against time, every batch culture shows the same shape.', items: [
        ['Lag phase', 'No increase in number, but intense metabolic activity: the cells are synthesising the enzymes, ribosomes and transporters needed for the new medium. Its length depends on the inoculum\'s previous history — cells taken from exponential phase into identical medium show almost no lag, which is exactly why a seed train is used in fermentation.'],
        ['Exponential (log) phase', 'Balanced growth, with number doubling at a constant interval. The population is at its most physiologically uniform, most sensitive to antibiotics that target wall synthesis, and most useful experimentally. This is where you harvest for competent cells, induce protein expression, and measure generation time.'],
        ['Stationary phase', 'Growth rate equals death rate and the number plateaus — because a nutrient is exhausted, or toxic end products such as acids and ethanol have accumulated, or oxygen has run out. Cells become smaller and more stress-resistant, and <b>secondary metabolites, including most antibiotics, are produced here</b>, not during growth.'],
        ['Death phase', 'Exponential decline as cells lyse. A small viable-but-nonculturable subpopulation may persist, which matters for both food safety and for persistence in infection.']
      ]},
      { t: 'note', tone: 'info', text: 'A <b>chemostat</b> breaks this pattern deliberately. Fresh medium is fed in and culture withdrawn at the same rate, so growth rate is set by the dilution rate and the culture is held indefinitely in exponential phase. That is the principle behind continuous fermentation.' }
    ]},
    { id: 'counting', title: 'Counting methods', blocks: [
      { t: 'table', head: ['Method', 'What it counts', 'Strength', 'Limitation'], rows: [
        ['<b>Spread plate</b>', 'Viable cells', 'Colonies on the surface, easy to count and pick', 'Limited to about 0.1 mL per plate'],
        ['<b>Pour plate</b>', 'Viable cells', 'Larger volume; colonies grow within the agar', 'Heat shock from molten agar at 45 °C harms sensitive organisms'],
        ['<b>Miles–Misra (drop count)</b>', 'Viable cells', 'Several dilutions on one plate; economical', 'Small volume, so less precise at low counts'],
        ['<b>Membrane filtration</b>', 'Viable cells', 'Large volumes of water, so very low counts detectable', 'Only for low-turbidity liquids'],
        ['<b>Direct microscopic count</b>', 'Total cells, live and dead', 'Immediate, no incubation', 'Cannot distinguish viable from dead without a stain'],
        ['<b>Turbidity, OD₆₀₀</b>', 'Total biomass', 'Instant, non-destructive, ideal for monitoring a fermenter', 'Dead cells and debris scatter light too; must be calibrated against CFU'],
        ['<b>Flow cytometry</b>', 'Live/dead with fluorescent stains', 'Fast, counts individual cells', 'Expensive instrument']
      ]},
      { t: 'protocol', def: {
        name: 'Serial dilution and spread plate',
        badge: 'Quantitative',
        aka: 'The standard viable count',
        use: 'Used for clinical specimens, water and food testing, fermentation monitoring and cell banking.',
        reagents: [
          ['Diluent', '#aab6c4', 'Keeps cells viable without letting them grow or lyse.', 'Sterile saline, phosphate-buffered saline or peptone water — never distilled water'],
          ['Dilution tubes', '#c8d8b0', 'Usually 9 mL per tube for a tenfold step.', '9 mL diluent + 1 mL sample = 1 in 10'],
          ['Agar plates', '#b0c890', 'Non-selective unless a specific organism is being counted.', 'Dried, so the inoculum absorbs within 15 min'],
          ['Spreader', '#9aa5b1', 'Sterile L-shaped glass or disposable plastic.', 'If flamed in alcohol, cool before touching the agar']
        ],
        steps: [
          ['Mix the sample thoroughly by vortexing. Clumps give wildly variable counts.', '', ''],
          ['Transfer 1 mL into 9 mL of diluent. This is 10⁻¹. Mix well with a fresh tip.', '', 'A fresh tip at every step. Carryover on the outside of a tip is a systematic error that compounds down the series.'],
          ['Repeat to 10⁻², 10⁻³ and onward, covering the range you expect.', '', 'For an overnight <i>E. coli</i> culture at roughly 10⁹ CFU/mL, plate 10⁻⁶ to 10⁻⁸.'],
          ['Pipette 0.1 mL onto the surface of each plate, at least in duplicate.', '', ''],
          ['Spread evenly until the liquid is absorbed.', '', 'Over-spreading dries the surface; under-spreading gives a crowded centre.'],
          ['Invert and incubate.', '18–24 h', ''],
          ['Count plates with between 30 and 300 colonies. Below 30 is statistically unreliable; above 300 colonies merge and compete.', '', ''],
          ['Calculate.', '', 'CFU/mL = (colonies counted) ÷ (volume plated in mL × dilution factor).']
        ],
        result: 'A countable plate at one or two dilutions. <b>Worked example:</b> 148 colonies from 0.1 mL of the 10⁻⁶ dilution gives 148 ÷ (0.1 × 10⁻⁶) = <b>1.48 × 10⁹ CFU/mL</b>. Report to two significant figures — the method does not justify more.',
        mechanism: 'Each viable cell or clump that lands on the surface is fixed in place and divides until it forms a visible colony. Because each colony traces to one unit, counting colonies and multiplying back through the dilution gives the original concentration — as long as the dilution was accurate and the cells were properly dispersed.',
        pitfalls: [
          'Not mixing between dilution steps, which is the single largest source of error.',
          'Reusing a pipette tip through the series.',
          'Counting plates outside 30–300 and extrapolating anyway.',
          'Clumped or chained organisms, which undercount by their nature.',
          'Plates too wet, so colonies run together and read as fewer.'
        ]
      }},
      { t: 'note', tone: 'info', text: 'Generation time is calculated from two counts in exponential phase: <b>g = t × log2 ÷ (log N − log N₀)</b>, where t is the elapsed time. The calculators page on this site does this for you, along with CFU/mL and dilution arithmetic.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['FDA Bacteriological Analytical Manual — plate counts', 'https://www.fda.gov/food/laboratory-methods-food/bacteriological-analytical-manual-bam'],
        ['ISO 4833 — enumeration of microorganisms', 'https://www.iso.org/standard/53728.html'],
        ['ASM protocols', 'https://asm.org/Protocols']
      ]}
    ]}
  ]
},

{
  id: 'biosafety', name: 'Biosafety and aseptic technique', kind: 'method', cat: 'Microbiology',
  organism: 'Containment levels, cabinets, spills, waste',
  aka: ['biosafety', 'bsl', 'containment', 'biosafety cabinet', 'laminar flow', 'spill', 'ppe', 'aseptic', 'sterile technique', 'waste'],
  tagline: 'The practices that keep the organism in the flask and out of the worker.',
  hero: 'Containment is primarily about practice, not equipment. A biosafety cabinet protects nobody if the work inside it generates aerosols that the user then carries out on their gloves — which is why every level is defined by procedures first and hardware second.',
  quick: [
    ['BSL-1', 'Agents not known to cause disease in healthy adults'],
    ['BSL-2', 'Moderate hazard — most clinical bacteriology and virology'],
    ['BSL-3', 'Serious or lethal disease by inhalation — TB, SARS-CoV-2 culture'],
    ['BSL-4', 'Lethal with no treatment or vaccine — Ebola, Marburg'],
    ['Primary barrier', 'The biosafety cabinet and personal protective equipment'],
    ['Secondary barrier', 'Facility design — airflow, anterooms, HEPA filtration'],
    ['Main laboratory hazard', 'Aerosols, then sharps']
  ],
  sections: [
    { id: 'levels', title: 'Containment levels', blocks: [
      { t: 'table', head: ['Level', 'Typical agents', 'Practices', 'Facility'], rows: [
        ['<b>BSL-1</b>', 'Non-pathogenic <i>E. coli</i> K-12, <i>Bacillus subtilis</i>', 'Standard microbiological practice. Open bench acceptable.', 'Sink, lockable door'],
        ['<b>BSL-2</b>', '<i>S. aureus</i>, <i>Salmonella</i>, hepatitis B, HIV, influenza', 'Limited access, biohazard signage, sharps controls. <b>All aerosol-generating work in a class II cabinet.</b>', 'Autoclave available, eyewash'],
        ['<b>BSL-3</b>', '<i>M. tuberculosis</i>, SARS-CoV-2 culture, <i>Brucella</i>, <i>Coxiella</i>', 'Respiratory protection, all manipulations in a cabinet, medical surveillance.', 'Directional inward airflow, sealed surfaces, double door, HEPA-filtered exhaust'],
        ['<b>BSL-4</b>', 'Ebola, Marburg, Lassa, smallpox', 'Positive-pressure suit or class III cabinet line, chemical shower exit.', 'Isolated building or zone, dedicated air and waste systems']
      ]},
      { t: 'note', tone: 'info', text: 'Work with HIV and with hepatitis B is done at <b>BSL-2 facilities using BSL-3 practices</b> — a specific and frequently examined combination. Diagnostic tuberculosis smear and culture work is BSL-2 with BSL-3 practices; propagating or manipulating <i>M. tuberculosis</i> cultures requires a full BSL-3 facility.' }
    ]},
    { id: 'cabinets', title: 'Cabinets — and the one that protects nothing', blocks: [
      { t: 'table', head: ['Type', 'Protects the worker', 'Protects the product', 'Protects the environment', 'Use'], rows: [
        ['<b>Class I</b>', 'Yes', 'No', 'Yes', 'Air drawn in over the work, HEPA-filtered on exhaust. Equipment containment.'],
        ['<b>Class II (A2)</b>', 'Yes', 'Yes', 'Yes', 'The standard cabinet. HEPA-filtered downflow over the work plus an inward air curtain.'],
        ['<b>Class III</b>', 'Yes', 'Yes', 'Yes', 'Gas-tight glovebox. BSL-4 and the most hazardous work.'],
        ['<b>Horizontal laminar flow</b>', '<b>No</b>', 'Yes', '<b>No</b>', 'Blows filtered air <i>at the user</i>. For sterile media and electronics only — <b>never for anything infectious.</b>'],
        ['<b>Chemical fume hood</b>', 'For chemicals only', 'No', 'No', 'Exhausts unfiltered air outside. No biological containment whatsoever.']
      ]},
      { t: 'ul', title: 'Working properly in a class II cabinet', items: [
        'Run the blower for 5 minutes before and after work, and disinfect the surface with 70% alcohol.',
        'Load everything you need first. Each arm movement through the air curtain disturbs it.',
        'Work at least 10 cm behind the front grille, and never block the front or rear grilles with pipette boxes or waste bags.',
        'Move slowly and in from the sides, not straight in and out.',
        'Place a discard tray inside the cabinet. Do not withdraw a loaded pipette through the opening.',
        'Never use an open flame inside a cabinet — the thermal plume disrupts the airflow and can damage the HEPA filter.'
      ]}
    ]},
    { id: 'spills', title: 'Spill response and waste', blocks: [
      { t: 'steps', items: [
        ['Alert and withdraw', 'Warn others, leave the area, and close the door. For an aerosol-generating spill outside a cabinet, hold everyone out for 30 minutes while the aerosol settles.'],
        ['Protect yourself', 'Put on a gown, gloves and eye protection, plus respiratory protection if the agent is airborne.'],
        ['Cover and contain', 'Lay absorbent paper over the spill, working from the outside inward so the contamination is not spread.'],
        ['Disinfect', 'Flood with an appropriate disinfectant — usually freshly prepared 1% hypochlorite — and leave the contact time the product requires, typically 20–30 minutes.'],
        ['Clear up', 'Remove the absorbed material into a biohazard bag with forceps, never gloved hands, if there is any broken glass.'],
        ['Final clean', 'Wipe down with fresh disinfectant and then with 70% alcohol to remove residue.'],
        ['Report', 'Record the incident. Exposure, however minor, is reported the same day — post-exposure prophylaxis for HIV and hepatitis B is time-critical.']
      ]},
      { t: 'ul', title: 'Waste streams', items: [
        '<b>Sharps</b> — rigid puncture-proof container, filled to no more than three-quarters, never recapping a needle.',
        '<b>Infectious waste</b> — autoclave at 121 °C before disposal, or incinerate.',
        '<b>Cultures and stocks</b> — always decontaminated on site, never placed in general waste.',
        '<b>Liquid waste</b> — chemical disinfection with adequate contact time before drain disposal, where regulations permit.',
        '<b>Chemical and radioactive waste</b> — separate streams; never mix with biohazard waste.'
      ]},
      { t: 'note', tone: 'warn', text: 'Sharps injuries and aerosols account for the overwhelming majority of laboratory-acquired infections. The practices that prevent them are unglamorous and absolute: never recap a needle, never pipette by mouth, never centrifuge an unbalanced or uncapped rotor, and open every centrifuge bucket inside a cabinet after running anything infectious.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO Laboratory Biosafety Manual, 4th edition', 'https://www.who.int/publications/i/item/9789240011311'],
        ['CDC/NIH — Biosafety in Microbiological and Biomedical Laboratories (BMBL)', 'https://www.cdc.gov/labs/bmbl/'],
        ['NIH Guidelines for research involving recombinant nucleic acid molecules', 'https://osp.od.nih.gov/policies/biosafety-and-biosecurity-policy/']
      ]}
    ]}
  ]
}

]);
