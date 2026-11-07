/* Profile data, part 4: S. aureus, S. pyogenes, H. pylori, Candida, Leishmania. */
window.DISEASES = (window.DISEASES || []).concat([

/* ───────────────────────────── Staphylococcus aureus ───────────────────────────── */
{
  id: 'saureus', name: 'Staphylococcus aureus', organism: 'Staphylococcus aureus', kind: 'bacterium',
  aka: ['staph', 'staphylococcus', 'mrsa', 'golden staph', 'coagulase', 'abscess', 'tss', 'catalase', 'cocci'],
  tagline: 'A harmless passenger on a third of us, and the commonest cause of serious bacterial infection when it gets inside.',
  hero: 'Thirty per cent of healthy people carry S. aureus in their nose and never know it. The same organism causes boils, surgical site infection, endocarditis, osteomyelitis and the most lethal bacteraemias in hospital medicine — the difference is only whether the skin barrier holds.',
  quick: [
    ['Pathogen', '<i>Staphylococcus aureus</i>'],
    ['Gram', 'Positive cocci, 0.5–1.5 µm, in grape-like clusters'],
    ['Catalase', 'Positive — separates it from streptococci'],
    ['Coagulase', '<b>Positive</b> — separates it from all other staphylococci'],
    ['Growth', 'Facultative anaerobe; tolerates 7.5–10% NaCl'],
    ['Colonies', 'Golden-yellow, beta-haemolytic on blood agar'],
    ['Carriage', '≈30% nasal carriage in healthy adults'],
    ['Bacteraemia mortality', '15–30% even with treatment']
  ],
  model: {
    kind: 'bacillus', length: 1.2, radius: 0.72, shape: 'coccus', cluster: 6,
    colors: { wax: '#f0c86a', wall: '#8b5fd0', membrane: '#67c7e8', cytoplasm: '#b8a8e8', dna: '#d05b8a', ribo: '#ffd98a' },
    layers: [
      ['wax', 'Capsule and biofilm', 'Polysaccharide capsule plus, on devices, a biofilm matrix that antibiotics and phagocytes cannot penetrate.'],
      ['wall', 'Thick peptidoglycan', 'Many cross-linked layers with teichoic acids — this is what traps crystal violet and makes the organism Gram-positive. Target of the beta-lactams.'],
      ['membrane', 'Plasma membrane', 'Where the penicillin-binding proteins sit, including PBP2a in MRSA.'],
      ['cytoplasm', 'Cytoplasm', 'Where the toxins are made before export.'],
      ['ribo', 'Ribosomes', 'Target of linezolid, clindamycin and the macrolides.'],
      ['dna', 'Chromosome', 'About 2.8 Mb, plus plasmids and the SCC<i>mec</i> cassette that carries methicillin resistance.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and identification', blocks: [
      { t: 'kv', items: [
        ['Family → Genus', '<i>Staphylococcaceae</i> → <i>Staphylococcus</i>'],
        ['Species', '<i>S. aureus</i> — the only routinely coagulase-positive human species'],
        ['Coagulase-negative staphylococci', '<i>S. epidermidis</i> (device infection), <i>S. saprophyticus</i> (UTI in young women), <i>S. lugdunensis</i> (behaves like <i>aureus</i>)'],
        ['Name', 'Greek <i>staphyle</i>, a bunch of grapes, and Latin <i>aureus</i>, golden'],
        ['Key clue', 'Clusters, not chains. Division occurs in several planes, so the cells pile up rather than lining up.']
      ]},
      { t: 'table', head: ['Test', 'Result', 'What it rules out'], rows: [
        ['Gram stain', 'Gram-positive cocci in clusters', 'Streptococci lie in chains or pairs'],
        ['Catalase', 'Positive — brisk bubbling with H₂O₂', 'All streptococci and enterococci are catalase-negative'],
        ['Coagulase (slide)', 'Clumping within 10 s — bound coagulase', 'Coagulase-negative staphylococci'],
        ['Coagulase (tube)', 'Clot in rabbit plasma at 4 h — free coagulase', 'Confirms a negative slide test'],
        ['DNase', 'Positive', 'Supports identification'],
        ['Mannitol salt agar', 'Grows in 7.5% salt, ferments mannitol — yellow', 'Most other skin flora'],
        ['Cefoxitin disc', 'Resistant = MRSA', 'Surrogate for <i>mecA</i>; more reliable than oxacillin']
      ]}
    ]},
    { id: 'structure', title: 'Structure and virulence factors', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'gram-cluster' },
      { t: 'table', head: ['Factor', 'Type', 'What it does'], rows: [
        ['<b>Protein A</b>', 'Surface', 'Binds the Fc portion of IgG the wrong way round, so antibody cannot opsonise. Also used in the laboratory to purify antibodies.'],
        ['<b>Coagulase</b>', 'Enzyme', 'Converts fibrinogen to fibrin, walling the organism in a clot where phagocytes cannot reach it — the basis of abscess formation.'],
        ['<b>Catalase</b>', 'Enzyme', 'Breaks down hydrogen peroxide, surviving the neutrophil oxidative burst.'],
        ['<b>Panton–Valentine leucocidin</b>', 'Toxin', 'Lyses neutrophils. Associated with community-acquired MRSA, recurrent boils and necrotising pneumonia.'],
        ['<b>TSST-1</b>', 'Superantigen', 'Cross-links MHC II to the T cell receptor outside the antigen groove, activating up to 20% of all T cells at once. Causes toxic shock syndrome.'],
        ['<b>Exfoliative toxins A and B</b>', 'Toxin', 'Cleave desmoglein-1, splitting the epidermis — scalded skin syndrome in children, bullous impetigo.'],
        ['<b>Enterotoxins A–E</b>', 'Superantigen', 'Heat-stable. Cause food poisoning with vomiting 1–6 hours after a pre-formed toxin is eaten — reheating the food does not help.'],
        ['<b>Alpha-haemolysin</b>', 'Pore-forming toxin', 'Lyses red cells and platelets; the beta-haemolysis seen on blood agar.'],
        ['<b>Biofilm</b>', 'Structure', 'On catheters, prosthetic joints and heart valves. Why infected hardware usually has to be removed.']
      ]}
    ]},
    { id: 'clinical', title: 'Clinical syndromes', blocks: [
      { t: 'organs', items: [
        ['Skin and soft tissue', 'Folliculitis, furuncles and carbuncles, impetigo, cellulitis, surgical site infection. The commonest presentations by far, and usually treated by drainage rather than antibiotics.'],
        ['Bacteraemia and endocarditis', '<i>S. aureus</i> bacteraemia is never a contaminant. It seeds everywhere, and up to a quarter of patients have endocarditis — classically acute, on a previously normal valve, with rapid destruction. Echocardiography is mandatory.'],
        ['Bone and joint', 'Osteomyelitis — the commonest cause in all age groups — and septic arthritis, which destroys cartilage within days and is a surgical emergency.'],
        ['Pneumonia', 'Post-influenza secondary pneumonia, ventilator-associated pneumonia, and necrotising pneumonia in PVL-positive strains, which has a very high mortality in young people.'],
        ['Device infection', 'Intravascular catheters, prosthetic joints, pacemakers, CSF shunts. Biofilm means source control — removing the device — usually decides the outcome.'],
        ['Toxic shock syndrome', 'Abrupt fever, hypotension, diffuse macular erythroderma, multi-organ involvement, then desquamation of palms and soles 1–2 weeks later. Blood cultures are usually <b>negative</b>, because it is a toxin illness rather than a bacteraemia.'],
        ['Scalded skin syndrome', 'In infants and young children: widespread superficial blistering with a positive Nikolsky sign. The split is intraepidermal, so it heals without scarring.'],
        ['Food poisoning', 'Vomiting predominating, 1–6 hours after eating, resolving within a day. Caused by pre-formed heat-stable enterotoxin, typically in food handled and then left at room temperature.']
      ]}
    ]},
    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'The Gram stain does most of the work here. Gram-positive cocci in clusters from pus, blood culture or an aspirate immediately narrows the field, and the catalase and coagulase tests complete the identification within minutes at the bench.' },
      { t: 'protocol', name: 'gram' },
      { t: 'note', tone: 'warn', text: 'Watch the arrangement, not just the shape. Clusters suggest staphylococci; chains suggest streptococci or enterococci; pairs with a lancet shape suggest pneumococcus. But a Gram film from a liquid culture can distort the arrangement, so always confirm with catalase and coagulase rather than morphology alone.' }
    ]},
    { id: 'treatment', title: 'Treatment and resistance', blocks: [
      { t: 'table', head: ['Scenario', 'First line', 'Note'], rows: [
        ['Methicillin-susceptible (MSSA)', 'Flucloxacillin, cloxacillin, or cefazolin', 'An antistaphylococcal beta-lactam is <b>superior to vancomycin</b> for MSSA — never leave a susceptible isolate on vancomycin.'],
        ['MRSA, serious infection', 'Vancomycin or daptomycin', 'Daptomycin is inactivated by surfactant, so it must not be used for pneumonia.'],
        ['MRSA, skin and soft tissue', 'Co-trimoxazole, doxycycline, or clindamycin', 'Drainage matters more than the antibiotic for an abscess.'],
        ['Alternatives', 'Linezolid, ceftaroline, teicoplanin', 'Linezolid penetrates lung well; watch for cytopenias beyond two weeks.'],
        ['Bacteraemia', 'Intravenous therapy for at least 14 days, longer with deep focus', 'Repeat blood cultures until sterile, echocardiography, and remove any infected device.'],
        ['Decolonisation', 'Nasal mupirocin plus chlorhexidine washes', 'For recurrent infection and before some surgery.']
      ]},
      { t: 'ul', title: 'The resistance story, in order', items: [
        '<b>Penicillin, 1940s.</b> Resistance appeared within a few years through plasmid-encoded penicillinase. Over 90% of isolates are now resistant.',
        '<b>Methicillin, 1960.</b> Designed to resist penicillinase. MRSA was reported in 1961 — within a year.',
        '<b>MRSA mechanism.</b> The <i>mecA</i> gene, carried on the SCC<i>mec</i> mobile element, encodes PBP2a, an altered penicillin-binding protein with very low affinity for all beta-lactams. One gene confers resistance to the entire class.',
        '<b>Community-acquired MRSA.</b> A separate emergence in healthy people, often PVL-positive, with a different and generally narrower resistance pattern than hospital strains.',
        '<b>VISA and VRSA.</b> Reduced vancomycin susceptibility through cell-wall thickening, and rare full resistance through <i>vanA</i> acquired from enterococci.',
        '<b>Inducible clindamycin resistance</b> is detected by the D-test, described on the susceptibility testing page.'
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['CDC — Staphylococcus aureus and MRSA', 'https://www.cdc.gov/mrsa/'],
        ['WHO — bacterial priority pathogens list', 'https://www.who.int/publications/i/item/9789240093461'],
        ['IDSA — MRSA treatment guidelines', 'https://www.idsociety.org/practice-guideline/mrsa/'],
        ['EUCAST clinical breakpoints', 'https://www.eucast.org/clinical_breakpoints']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Streptococcus pyogenes ───────────────────────────── */
{
  id: 'spyogenes', name: 'Streptococcus pyogenes', organism: 'Streptococcus pyogenes (Group A Strep)', kind: 'bacterium',
  aka: ['strep', 'streptococcus', 'group a strep', 'gas', 'pyogenes', 'rheumatic fever', 'scarlet fever', 'sore throat', 'aso', 'necrotising fasciitis'],
  tagline: 'A sore throat that can end in rheumatic heart disease years later.',
  hero: 'Group A Streptococcus causes the most ordinary infection in medicine and some of the most dramatic. Its real importance in South Asia is the immune sequel: untreated pharyngitis in a child can produce rheumatic heart disease in a teenager, and that remains a leading cause of cardiac death in young people.',
  quick: [
    ['Pathogen', '<i>Streptococcus pyogenes</i> — Lancefield group A'],
    ['Gram', 'Positive cocci in chains'],
    ['Catalase', 'Negative — separates it from staphylococci'],
    ['Haemolysis', 'Beta — complete clearing on blood agar'],
    ['Bacitracin', 'Susceptible — the classic presumptive test'],
    ['PYR test', 'Positive'],
    ['Penicillin resistance', '<b>None ever recorded</b>'],
    ['Global deaths', 'Over 500,000 a year, mostly from rheumatic heart disease']
  ],
  model: {
    kind: 'bacillus', length: 1.1, radius: 0.62, shape: 'coccus', chain: 6,
    colors: { wax: '#f2b0c8', wall: '#9b4fd0', membrane: '#67c7e8', cytoplasm: '#c8a8e8', dna: '#e05b8a', ribo: '#ffd98a' },
    layers: [
      ['wax', 'Hyaluronic acid capsule', 'Chemically identical to human connective tissue hyaluronan, so the immune system barely sees it.'],
      ['wall', 'Peptidoglycan with group A carbohydrate and M protein', 'The group A carbohydrate defines the Lancefield group; M protein defines the <i>emm</i> type and is the main virulence factor.'],
      ['membrane', 'Plasma membrane', 'Penicillin-binding proteins here have never developed resistance.'],
      ['cytoplasm', 'Cytoplasm', 'Site of streptolysin and superantigen synthesis.'],
      ['ribo', 'Ribosomes', 'Target of macrolides and clindamycin — and clindamycin also switches off toxin production.'],
      ['dna', 'Chromosome', 'About 1.85 Mb, with prophages carrying several of the exotoxin genes.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and identification', blocks: [
      { t: 'p', text: 'Streptococci are classified two ways at once, and both are used daily. Haemolysis on blood agar sorts them into alpha, beta and gamma; the Lancefield system sorts the beta-haemolytic ones by their cell wall carbohydrate, A through V.' },
      { t: 'table', head: ['Organism', 'Haemolysis', 'Group', 'Distinguishing test'], rows: [
        ['<i>S. pyogenes</i>', 'Beta', 'A', 'Bacitracin susceptible, PYR positive'],
        ['<i>S. agalactiae</i>', 'Beta', 'B', 'Bacitracin resistant, CAMP test positive, hippurate positive'],
        ['<i>Enterococcus</i>', 'Gamma or alpha', 'D', 'Grows in 6.5% NaCl and bile'],
        ['<i>S. pneumoniae</i>', 'Alpha', '—', 'Optochin susceptible, bile soluble, lancet-shaped diplococci'],
        ['Viridans group', 'Alpha', '—', 'Optochin resistant, bile insoluble']
      ]},
      { t: 'note', tone: 'info', text: 'The <i>emm</i> type, determined by sequencing the M protein gene, has replaced older serotyping. Over 250 types exist, immunity is type-specific, and certain types are associated with rheumatic fever and others with invasive disease — which is also the central problem for vaccine development.' }
    ]},
    { id: 'structure', title: 'Virulence factors', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'gram-chain' },
      { t: 'table', head: ['Factor', 'What it does'], rows: [
        ['<b>M protein</b>', 'The dominant virulence factor. Resists phagocytosis by binding host complement regulators. Antibody to it is protective but type-specific, which is why people get group A strep repeatedly. Molecular mimicry between M protein and cardiac myosin is the leading explanation for rheumatic carditis.'],
        ['<b>Hyaluronic acid capsule</b>', 'Indistinguishable from host hyaluronan, so it is poorly immunogenic and anti-phagocytic.'],
        ['<b>Streptolysin O</b>', 'Oxygen-labile pore-forming toxin. Strongly antigenic — anti-streptolysin O (ASO) titres are the basis of retrospective diagnosis.'],
        ['<b>Streptolysin S</b>', 'Oxygen-stable, non-antigenic. Responsible for the beta-haemolysis seen on an aerobic plate.'],
        ['<b>Pyrogenic exotoxins (SpeA, SpeB, SpeC)</b>', 'Superantigens. Cause the rash of scarlet fever and drive streptococcal toxic shock syndrome.'],
        ['<b>Streptokinase</b>', 'Activates plasminogen, dissolving fibrin so the organism spreads through tissue planes. Once used therapeutically for myocardial infarction.'],
        ['<b>Hyaluronidase and DNases</b>', '"Spreading factors" that break down connective tissue matrix and the DNA webs released by neutrophils.'],
        ['<b>C5a peptidase</b>', 'Destroys the chemotactic signal that would recruit neutrophils.']
      ]}
    ]},
    { id: 'clinical', title: 'Clinical syndromes', blocks: [
      { t: 'organs', title: 'Suppurative infections — the organism itself', items: [
        ['Pharyngitis', 'Sudden sore throat, fever, tender anterior cervical nodes, tonsillar exudate — and notably <b>no cough or coryza</b>, which is what distinguishes it from viral sore throat. The Centor criteria formalise this.'],
        ['Scarlet fever', 'Pharyngitis plus a superantigen-mediated rash: fine, rough "sandpaper" erythema sparing the perioral area, with a strawberry tongue, Pastia\'s lines in the skin folds, and desquamation as it resolves.'],
        ['Impetigo and erysipelas', 'Golden-crusted superficial skin infection; erysipelas is a sharply demarcated, raised, fiery red plaque, usually on the face or shin.'],
        ['Cellulitis and necrotising fasciitis', 'Necrotising fasciitis presents with <b>pain grossly out of proportion to the visible findings</b>, rapid progression over hours, and systemic toxicity. It is a surgical emergency — debridement, not antibiotics, is the treatment.'],
        ['Puerperal sepsis', 'Historically the great killer of women in childbirth, and the infection behind Semmelweis\'s handwashing work.'],
        ['Streptococcal toxic shock syndrome', 'Shock and multi-organ failure driven by superantigens, usually with a soft tissue focus. Mortality over 30%.']
      ]},
      { t: 'organs', title: 'Non-suppurative sequelae — the immune response', items: [
        ['Acute rheumatic fever', 'Two to four weeks after <b>pharyngitis only</b>, never after skin infection. Diagnosed by the Jones criteria. Major features: carditis, migratory polyarthritis of large joints, Sydenham chorea, erythema marginatum, subcutaneous nodules. Caused by antibodies against M protein cross-reacting with cardiac myosin and valve tissue.'],
        ['Rheumatic heart disease', 'The lasting damage — mitral stenosis above all, then aortic valve disease. Develops after repeated episodes and presents years later. <b>It remains a leading cause of cardiovascular death in young people in India and other low- and middle-income countries</b>, and secondary prophylaxis with monthly benzathine penicillin for years is what prevents it.'],
        ['Post-streptococcal glomerulonephritis', 'One to three weeks after <b>either</b> pharyngitis or skin infection. Cola-coloured urine, oedema, hypertension, low complement C3. Immune complex mediated. Usually resolves completely in children; antibiotic treatment of the original infection does not reliably prevent it.'],
        ['PANDAS', 'A proposed association with abrupt-onset obsessive-compulsive and tic disorders in children. Still contested.']
      ]}
    ]},
    { id: 'staining', title: 'Staining and diagnosis', blocks: [
      { t: 'protocol', name: 'gram' },
      { t: 'table', head: ['Test', 'Use', 'Note'], rows: [
        ['Throat swab culture on blood agar', 'The reference standard', 'Beta-haemolytic colonies, catalase negative, bacitracin susceptible. Takes 18–24 h.'],
        ['Rapid antigen detection test', 'Point of care, 5–10 minutes', 'Highly specific but only 70–90% sensitive — a negative in a child should be confirmed by culture.'],
        ['Anti-streptolysin O (ASO) titre', 'Retrospective evidence of recent infection', 'Rises 1–3 weeks after pharyngitis. Used in diagnosing rheumatic fever, not acute sore throat.'],
        ['Anti-DNase B', 'Retrospective, including after skin infection', 'More reliable than ASO following pyoderma.'],
        ['PCR', 'Rapid molecular detection', 'Increasingly replacing antigen testing.']
      ]},
      { t: 'note', tone: 'warn', text: 'Treating pharyngitis within nine days of onset prevents acute rheumatic fever — which is the entire reason sore throats are cultured and treated at all in high-burden settings. It does <i>not</i> reliably prevent glomerulonephritis.' }
    ]},
    { id: 'treatment', title: 'Treatment', blocks: [
      { t: 'ul', items: [
        '<b>Penicillin remains the drug of choice.</b> Not one penicillin-resistant isolate of <i>S. pyogenes</i> has ever been confirmed anywhere, which makes it close to unique among major pathogens.',
        'Pharyngitis: oral penicillin V or amoxicillin for 10 days, or a single intramuscular dose of benzathine penicillin where adherence is uncertain.',
        'Penicillin allergy: a macrolide or a first-generation cephalosporin. Macrolide resistance does occur and varies by region.',
        '<b>Severe invasive disease: add clindamycin.</b> It is not more active, but it shuts down ribosomal toxin synthesis, and it works on stationary-phase organisms where penicillin\'s cell-wall target is inactive — the so-called Eagle effect.',
        'Intravenous immunoglobulin is used in streptococcal toxic shock to neutralise circulating superantigen.',
        'Necrotising fasciitis: urgent and repeated surgical debridement. Antibiotics alone will not save the patient.',
        '<b>Secondary prophylaxis</b> after rheumatic fever: benzathine penicillin every 3–4 weeks for a minimum of 10 years or until age 21, and for life where there is established valve disease. This is the single most effective intervention against rheumatic heart disease.'
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Group A streptococcus vaccine development', 'https://www.who.int/teams/immunization-vaccines-and-biologicals/diseases/group-a-streptococcus'],
        ['CDC — Group A Streptococcal disease', 'https://www.cdc.gov/group-a-strep/'],
        ['WHO — Rheumatic fever and rheumatic heart disease', 'https://www.who.int/news-room/fact-sheets/detail/rheumatic-heart-disease'],
        ['Jones criteria, 2015 revision, Circulation', 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000000205']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Helicobacter pylori ───────────────────────────── */
{
  id: 'hpylori', name: 'Helicobacter pylori', organism: 'Helicobacter pylori', kind: 'bacterium',
  aka: ['h pylori', 'helicobacter', 'ulcer', 'gastritis', 'urease', 'urea breath test', 'marshall', 'warren', 'gastric cancer'],
  tagline: 'The bacterium that proved ulcers were infectious — by its discoverer drinking it.',
  hero: 'For a century, peptic ulcers were attributed to stress and acid. H. pylori colonises the stomachs of about half the world, causes almost all duodenal ulcers, and is a class I carcinogen — the only bacterium formally classified as one.',
  quick: [
    ['Pathogen', '<i>Helicobacter pylori</i>'],
    ['Gram', 'Negative, curved or spiral rod, 2–4 µm'],
    ['Motility', '2–6 sheathed polar flagella — corkscrew motility'],
    ['Urease', '<b>Strongly positive</b> — the basis of three diagnostic tests'],
    ['Oxidase / catalase', 'Both positive'],
    ['Growth', 'Microaerophilic, 5% O₂; 3–7 days'],
    ['Global prevalence', '≈43%, far higher in South Asia'],
    ['Attributable disease', '>90% of duodenal ulcers, ~75% of gastric ulcers'],
    ['Carcinogen class', 'IARC Group 1']
  ],
  model: {
    kind: 'bacillus', length: 2.9, radius: 0.46, shape: 'spiral', flagella: 4,
    colors: { wax: '#9fe0c8', wall: '#2f9e7c', membrane: '#67c7e8', cytoplasm: '#a8e6c8', dna: '#8b6cf0', ribo: '#ffd98a' },
    layers: [
      ['wall', 'Outer membrane and LPS', 'Gram-negative envelope. Its LPS mimics human Lewis blood group antigens, which blunts the immune response.'],
      ['membrane', 'Inner membrane', 'Houses the type IV secretion system encoded by the <i>cag</i> pathogenicity island.'],
      ['cytoplasm', 'Cytoplasm', 'Packed with urease — up to 10% of total cell protein, more than any other bacterium.'],
      ['ribo', 'Ribosomes', 'Target of clarithromycin, and the site of the 23S rRNA mutations that cause resistance to it.'],
      ['dna', 'Chromosome', 'About 1.7 Mb. Unusually variable between strains, and it recombines readily.'],
      ['flagella', 'Sheathed polar flagella', 'Drive the corkscrew motility that burrows through gastric mucus. The sheath hides the flagellin from immune recognition.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Discovery', blocks: [
      { t: 'timeline', items: [
        ['1982', 'Robin Warren, a pathologist, repeatedly sees curved bacteria in gastric biopsies. Barry Marshall, a trainee, cultures the organism after a plate is accidentally left over the Easter weekend — it needed the extra days.'],
        ['1984', 'Unable to infect animals and unable to get the hypothesis taken seriously, <b>Marshall drinks a culture himself</b>. He develops acute gastritis within days, documented by endoscopy and biopsy, and treats himself with antibiotics.'],
        ['1994', 'The IARC classifies <i>H. pylori</i> as a Group 1 carcinogen.'],
        ['2005', 'Marshall and Warren receive the Nobel Prize in Physiology or Medicine.'],
        ['Since', 'Eradication has transformed ulcer disease from a chronic relapsing condition requiring surgery into a curable infection.']
      ]},
      { t: 'note', tone: 'info', text: 'The story is worth knowing for what it says about evidence rather than for the drama. The bacteria had been seen in gastric biopsies for decades and dismissed as contaminants, because everyone knew the stomach was sterile. The organism was not hard to find; the prior belief was hard to dislodge.' }
    ]},
    { id: 'structure', title: 'How it survives the stomach', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'gram-curved' },
      { t: 'steps', items: [
        ['Urease', 'Hydrolyses urea into ammonia and carbon dioxide, surrounding the organism in a cloud of alkali that neutralises gastric acid. Urease is up to a tenth of the cell\'s total protein, and it is also what three separate diagnostic tests detect.'],
        ['Motility', 'Corkscrew swimming on sheathed polar flagella drives it through the viscous mucus layer to the epithelial surface, where the pH is near neutral.'],
        ['Adhesion', 'BabA binds Lewis b blood group antigens on gastric epithelium; SabA binds sialylated antigens on inflamed mucosa.'],
        ['CagA injection', 'Strains carrying the <i>cag</i> pathogenicity island use a type IV secretion system to inject CagA directly into the epithelial cell, where it is phosphorylated and disrupts cell signalling, polarity and proliferation. <b>CagA-positive strains carry the highest cancer risk.</b>'],
        ['VacA', 'Vacuolating cytotoxin — forms pores, induces apoptosis and suppresses local T cell responses. Its <i>s1m1</i> allele is the most virulent.'],
        ['Immune evasion', 'LPS mimicking human Lewis antigens, a sheathed flagellum hiding flagellin from TLR5, and active suppression of the T cell response — so the inflammation persists for decades without clearing the organism.']
      ]}
    ]},
    { id: 'clinical', title: 'Disease outcomes', blocks: [
      { t: 'p', text: 'Most infections cause nothing more than chronic gastritis that is never noticed. What determines the outcome is where in the stomach the inflammation is concentrated, and that depends on the strain, the host and the age at acquisition.' },
      { t: 'organs', items: [
        ['Chronic gastritis', 'Present in essentially everyone infected. Usually asymptomatic.'],
        ['Duodenal ulcer', 'Antral-predominant gastritis raises gastrin and therefore acid output. The duodenum undergoes gastric metaplasia, is colonised, and ulcerates. Over 90% of duodenal ulcers are <i>H. pylori</i> related, and eradication reduces the one-year recurrence rate from about 70% to under 10%.'],
        ['Gastric ulcer', 'Body-predominant gastritis with reduced acid. About three quarters are attributable.'],
        ['Gastric adenocarcinoma', 'The Correa cascade: chronic gastritis → atrophy → intestinal metaplasia → dysplasia → carcinoma, over decades. <i>H. pylori</i> is responsible for roughly three quarters of non-cardia gastric cancer worldwide.'],
        ['MALT lymphoma', 'A B-cell lymphoma driven by chronic antigenic stimulation. Remarkably, <b>about 70% of early-stage cases regress completely on antibiotic eradication alone</b> — a cancer cured with antibiotics.'],
        ['Extragastric', 'Unexplained iron-deficiency anaemia and immune thrombocytopenic purpura both have an established association, and testing is recommended in both.'],
        ['The other side', 'Colonisation is inversely associated with oesophageal adenocarcinoma, gastro-oesophageal reflux and possibly childhood asthma. Eradication is not recommended for everyone, and the relationship is not purely parasitic.']
      ]}
    ]},
    { id: 'staining', title: 'Staining and diagnosis', blocks: [
      { t: 'p', text: 'Diagnostic tests split into those needing endoscopy and those that do not. The urease activity of the organism is exploited by three of them.' },
      { t: 'protocol', name: 'gram' },
      { t: 'table', head: ['Test', 'Invasive?', 'How it works', 'Note'], rows: [
        ['<b>Urea breath test</b>', 'No', 'Swallow urea labelled with ¹³C or ¹⁴C; bacterial urease releases labelled CO₂, measured in the breath', 'Best non-invasive test for both diagnosis and confirming cure'],
        ['<b>Stool antigen test</b>', 'No', 'Monoclonal antibody detects bacterial antigen', 'Cheap, accurate, good in children'],
        ['<b>Serology</b>', 'No', 'IgG antibody', 'Stays positive after eradication, so it cannot confirm cure. Limited value.'],
        ['<b>Rapid urease test (CLO)</b>', 'Yes', 'Biopsy into urea medium with a pH indicator; urease turns it pink within minutes to hours', 'Fast and cheap at endoscopy'],
        ['<b>Histology</b>', 'Yes', 'Giemsa, Warthin–Starry silver, or immunohistochemistry on gastric biopsy', 'Also grades inflammation, atrophy and metaplasia'],
        ['<b>Culture</b>', 'Yes', 'Microaerophilic, 3–7 days', 'Reserved for susceptibility testing after repeated treatment failure'],
        ['<b>Molecular</b>', 'Yes', 'PCR with detection of 23S rRNA mutations', 'Gives clarithromycin resistance directly']
      ]},
      { t: 'note', tone: 'warn', text: 'Proton pump inhibitors, antibiotics and bismuth all suppress the organism and cause false negatives. Stop PPIs for <b>two weeks</b> and antibiotics and bismuth for <b>four weeks</b> before a breath test, stool antigen test, rapid urease test or culture. This is the single commonest reason a test comes back wrongly negative.' }
    ]},
    { id: 'treatment', title: 'Eradication', blocks: [
      { t: 'table', head: ['Regimen', 'Components', 'Duration', 'When'], rows: [
        ['<b>Bismuth quadruple</b>', 'PPI + bismuth + tetracycline + metronidazole', '14 days', 'First line in most of the world now, including where clarithromycin resistance exceeds 15%'],
        ['<b>Concomitant quadruple</b>', 'PPI + amoxicillin + clarithromycin + metronidazole', '14 days', 'Alternative first line'],
        ['<b>Clarithromycin triple</b>', 'PPI + amoxicillin + clarithromycin', '14 days', 'Only where local clarithromycin resistance is below 15% — increasingly rare'],
        ['<b>Levofloxacin triple</b>', 'PPI + amoxicillin + levofloxacin', '14 days', 'Rescue therapy; fluoroquinolone resistance is high in South Asia'],
        ['<b>High-dose dual</b>', 'High-dose PPI + amoxicillin', '14 days', 'Where resistance is widespread and amoxicillin remains active']
      ]},
      { t: 'ul', title: 'Practical points', items: [
        '<b>Always confirm eradication</b> at least four weeks after finishing treatment, with a urea breath test or stool antigen test — never serology.',
        'Eradication rates have fallen worldwide because of clarithromycin and metronidazole resistance. India has particularly high metronidazole resistance.',
        'Potassium-competitive acid blockers such as vonoprazan give more profound acid suppression than PPIs and improve eradication rates where available.',
        'Adherence matters enormously: these are four-drug, twice-daily, two-week regimens with real side effects, and incomplete courses drive resistance.',
        'Test and treat family members in high-prevalence settings, since reinfection within households is common.'
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['Maastricht VI / Florence consensus report', 'https://gut.bmj.com/content/71/9/1724'],
        ['WHO — bacterial priority pathogens list', 'https://www.who.int/publications/i/item/9789240093461'],
        ['IARC — Helicobacter pylori eradication as a strategy for gastric cancer prevention', 'https://publications.iarc.fr/'],
        ['CDC — Helicobacter pylori', 'https://www.cdc.gov/']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Candida ───────────────────────────── */
{
  id: 'candida', name: 'Candida', organism: 'Candida albicans and Candidozyma auris', kind: 'fungus',
  aka: ['candida', 'candidiasis', 'thrush', 'yeast', 'fungal', 'auris', 'albicans', 'germ tube', 'antifungal', 'echinocandin', 'koh'],
  tagline: 'A harmless member of your own flora, until the balance or the barrier fails.',
  hero: 'Candida lives in the mouth, gut and vagina of most healthy people. It causes disease only when something changes — antibiotics clear the competing bacteria, a catheter crosses the skin, or immunity fails. The exception is Candidozyma auris, which behaves like a hospital superbug rather than a commensal.',
  quick: [
    ['Organism', 'Yeast — a eukaryote, not a bacterium'],
    ['Main species', '<i>C. albicans</i>, <i>C. glabrata</i>, <i>C. parapsilosis</i>, <i>C. tropicalis</i>, <i>C. krusei</i>, <i>Candidozyma auris</i>'],
    ['Cell wall', 'Chitin, β-glucan and mannoproteins — <b>no peptidoglycan</b>'],
    ['Morphology', 'Budding yeast, pseudohyphae and true hyphae'],
    ['Germ tube test', '<i>C. albicans</i> positive in 2 h at 37 °C'],
    ['Candidaemia mortality', '30–50%'],
    ['Drug classes', 'Azoles, echinocandins, polyenes, flucytosine'],
    ['<i>C. auris</i>', 'Often multidrug-resistant; persists on surfaces for weeks']
  ],
  model: {
    kind: 'bacillus', length: 1.6, radius: 0.84, shape: 'yeast', pseudohypha: true,
    colors: { wax: '#e8d07a', wall: '#c08a3c', membrane: '#6fb4e0', cytoplasm: '#e0d4a8', dna: '#9b5fd0', ribo: '#ffd9a0' },
    layers: [
      ['wax', 'Mannoprotein outer layer', 'The outermost fibrillar layer; mediates adhesion and is what the immune system first sees.'],
      ['wall', 'β-glucan and chitin wall', 'The structural wall. <b>β-1,3-glucan synthesis is the target of the echinocandins</b> — and because human cells have no equivalent, those drugs are remarkably well tolerated.'],
      ['membrane', 'Ergosterol membrane', 'Ergosterol replaces cholesterol. Azoles block its synthesis; amphotericin B binds it directly and punches holes in the membrane.'],
      ['cytoplasm', 'Cytoplasm', 'A eukaryotic cell with mitochondria and a nucleus — which is exactly why antifungals are harder to find and more toxic than antibacterials.'],
      ['ribo', 'Ribosomes', '80S, like ours, so bacterial ribosome inhibitors do nothing.'],
      ['dna', 'Nucleus', 'A true membrane-bound nucleus with multiple linear chromosomes.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Why a fungus is different', blocks: [
      { t: 'p', text: 'Candida is a eukaryote. It has a nucleus, mitochondria, 80S ribosomes and a membrane built on sterols — all features it shares with human cells. That similarity is the central problem of antifungal therapy: there are far fewer targets that exist in the fungus and not in us, which is why the antifungal pharmacopoeia is small and some of it is genuinely toxic.' },
      { t: 'table', head: ['Feature', 'Bacterium', 'Fungus', 'Human'], rows: [
        ['Nucleus', 'No', 'Yes', 'Yes'],
        ['Cell wall', 'Peptidoglycan', '<b>Chitin, glucan, mannoprotein</b>', 'None'],
        ['Membrane sterol', 'None (mostly)', '<b>Ergosterol</b>', 'Cholesterol'],
        ['Ribosome', '70S', '80S', '80S'],
        ['Exploitable targets', 'Many', '<b>Few</b>', '—']
      ]},
      { t: 'table', head: ['Species', 'Notable feature', 'Resistance'], rows: [
        ['<i>C. albicans</i>', 'Commonest; forms germ tubes and true hyphae', 'Usually fluconazole-susceptible'],
        ['<i>C. glabrata</i>', 'No pseudohyphae; increasing in older patients', '<b>Intrinsically reduced azole susceptibility</b>; echinocandin resistance emerging'],
        ['<i>C. parapsilosis</i>', 'Grows in parenteral nutrition; adheres to plastic', 'Higher echinocandin MICs; strongly device-associated'],
        ['<i>C. tropicalis</i>', 'Common in haematological malignancy and in South Asia', 'Variable azole susceptibility'],
        ['<i>C. krusei</i>', '—', '<b>Intrinsically fluconazole-resistant</b>'],
        ['<b><i>Candidozyma auris</i></b>', 'Emerged independently on three continents around 2009', 'Frequently multidrug-resistant; some isolates resistant to all three classes']
      ]}
    ]},
    { id: 'structure', title: 'Morphology and virulence', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'koh-fungal' },
      { t: 'ul', items: [
        '<b>Dimorphism.</b> <i>C. albicans</i> switches between budding yeast and filamentous hyphal forms depending on temperature, pH, serum and CO₂. Yeast forms disseminate in the bloodstream; hyphae invade tissue. Mutants locked in either form are less virulent than the wild type, so it is the <i>switching</i> that matters.',
        '<b>Pseudohyphae</b> are chains of elongated budding cells constricted at the septa; <b>true hyphae</b> have parallel walls and no constriction. The distinction is visible on a KOH mount and is used in identification.',
        '<b>Adhesins</b> (the Als family, Hwp1) bind host epithelium and plastic surfaces.',
        '<b>Biofilm</b> on catheters, prosthetic valves and dentures, within which the organism is up to a thousand times less susceptible to antifungals. Device removal is usually essential.',
        '<b>Candidalysin</b>, a peptide toxin secreted by hyphae, damages epithelial membranes directly.',
        '<b>Secreted aspartyl proteases and phospholipases</b> degrade host barriers.',
        '<b>Phenotypic switching</b> between white and opaque colony forms alters virulence and mating behaviour.'
      ]}
    ]},
    { id: 'clinical', title: 'Clinical syndromes', blocks: [
      { t: 'organs', items: [
        ['Oropharyngeal candidiasis (thrush)', 'White curd-like plaques on the tongue and buccal mucosa that scrape off to leave a raw, sometimes bleeding base. In an adult with no obvious cause, <b>test for HIV</b> — it is an early marker of immunosuppression, as covered on the HIV profile.'],
        ['Oesophageal candidiasis', 'Painful swallowing with retrosternal discomfort. AIDS-defining, typically below a CD4 count of 150.'],
        ['Vulvovaginal candidiasis', 'Thick white discharge, itch and soreness. About three quarters of women have at least one episode. Precipitated by antibiotics, pregnancy, diabetes and oestrogen.'],
        ['Cutaneous and intertriginous', 'Moist red plaques with satellite lesions in skin folds; napkin dermatitis in infants; paronychia in people whose hands are wet all day.'],
        ['Candidaemia', 'Among the most common bloodstream infections in intensive care. Risk factors: central lines, broad-spectrum antibiotics, parenteral nutrition, abdominal surgery, neutropenia, dialysis. Mortality 30–50%.'],
        ['Disseminated and deep organ', 'Endophthalmitis — which is why <b>every candidaemia patient needs a dilated ophthalmological examination</b> — plus hepatosplenic candidiasis, endocarditis, meningitis and osteomyelitis.'],
        ['<i>Candidozyma auris</i>', 'Usually colonisation of skin and axillae rather than gut, with invasive disease in the critically ill. It survives on surfaces for weeks, resists common disinfectants, is often misidentified by older laboratory systems, and has caused sustained hospital outbreaks requiring full contact precautions.']
      ]}
    ]},
    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'Fungi are large enough to see easily, and most are identified first by direct microscopy. The two standard preparations are a KOH mount, which digests host material so the fungus stands out, and lactophenol cotton blue, which stains the chitin wall.' },
      { t: 'protocol', name: 'koh' },
      { t: 'protocol', name: 'lactophenol' },
      { t: 'protocol', name: 'gram' },
      { t: 'note', tone: 'info', text: '<i>Candida</i> is Gram-positive on a routine Gram film — large oval budding cells, four to six times the size of a coccus. That size difference is usually the first clue on a film from blood culture or pus, and it is a good reason not to dismiss anything on a Gram stain as "large Gram-positive cocci" without looking carefully.' }
    ]},
    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'Use', 'Note'], rows: [
        ['Direct microscopy — KOH or Gram', 'Immediate', 'Budding yeasts with pseudohyphae in a clinical specimen'],
        ['Sabouraud dextrose agar', 'Culture', 'Low pH and antibiotics suppress bacteria; creamy white colonies in 24–48 h'],
        ['<b>Germ tube test</b>', 'Rapid identification', 'Yeast in serum at 37 °C for 2 h. <i>C. albicans</i> produces a true germ tube with no constriction at the base — distinguishing it from the pseudohyphal constriction of other species.'],
        ['Chromogenic agar (CHROMagar)', 'Species separation', 'Different species give different colony colours; useful for detecting mixed cultures'],
        ['<b>MALDI-TOF</b>', 'Identification', 'Minutes from a colony, and <b>essential for <i>C. auris</i></b>, which older biochemical systems misidentify as <i>C. haemulonii</i> or <i>Rhodotorula</i>'],
        ['Blood culture', 'Candidaemia', 'Only about 50% sensitive — a negative does not exclude invasive candidiasis'],
        ['β-D-glucan assay', 'Adjunct for invasive disease', 'Sensitive but not specific; false positives with haemodialysis, albumin and some antibiotics'],
        ['Antifungal susceptibility testing', 'Guides therapy', 'Mandatory for <i>C. auris</i> and for any invasive isolate']
      ]}
    ]},
    { id: 'treatment', title: 'Antifungal treatment', blocks: [
      { t: 'table', head: ['Class', 'Target', 'Examples', 'Notes'], rows: [
        ['<b>Echinocandins</b>', 'β-1,3-glucan synthase in the cell wall', 'Caspofungin, micafungin, anidulafungin', '<b>First line for candidaemia.</b> Fungicidal, excellent safety, but poor CNS, eye and urine penetration'],
        ['<b>Azoles</b>', 'Lanosterol 14α-demethylase — blocks ergosterol synthesis', 'Fluconazole, voriconazole, posaconazole, isavuconazole', 'Fungistatic against Candida; step-down oral therapy. Many drug interactions through CYP enzymes'],
        ['<b>Polyenes</b>', 'Bind ergosterol directly and form membrane pores', 'Amphotericin B — liposomal preferred', 'Broadest spectrum and fungicidal, but nephrotoxic; the conventional formulation is markedly worse'],
        ['<b>Flucytosine</b>', 'Converted to 5-fluorouracil, disrupting nucleic acid synthesis', '5-FC', 'Never alone — resistance develops rapidly. Used in combination for severe or CNS disease'],
        ['<b>Topical</b>', 'Various', 'Nystatin, clotrimazole, miconazole', 'Mucocutaneous disease']
      ]},
      { t: 'ul', title: 'Principles', items: [
        '<b>Remove the line.</b> In candidaemia, removing the central venous catheter is as important as the antifungal.',
        'Start an echinocandin empirically for suspected candidaemia; step down to fluconazole once the species and susceptibility are known and the patient is stable.',
        'Treat candidaemia for <b>14 days after the first negative blood culture</b>, and repeat cultures until they are sterile.',
        'Dilated fundoscopy in every case, since endophthalmitis changes both the drug choice and the duration.',
        'Oral thrush: topical nystatin or oral fluconazole. Investigate the cause rather than only treating the episode.',
        '<i>C. auris</i>: isolate the patient, use contact precautions, clean with a sporicidal agent, screen contacts, and notify. It is a public health event, not just a clinical one.'
      ]},
      { t: 'note', tone: 'warn', text: 'Antifungal resistance is rising, and agricultural azole use is implicated for the moulds. For <i>Candida</i>, the pressures are hospital-based: fluconazole prophylaxis selects for <i>C. glabrata</i> and <i>C. krusei</i>, and echinocandin exposure selects <i>FKS</i> mutations. <i>C. auris</i> with resistance to all three classes has been reported.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — fungal priority pathogens list', 'https://www.who.int/publications/i/item/9789240060241'],
        ['CDC — Candida auris', 'https://www.cdc.gov/candida-auris/'],
        ['IDSA — clinical practice guideline for candidiasis', 'https://www.idsociety.org/practice-guideline/candidiasis/'],
        ['Mycology Online — identification atlas', 'https://mycology.adelaide.edu.au/']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Leishmania donovani ───────────────────────────── */
{
  id: 'leishmania', name: 'Visceral leishmaniasis', organism: 'Leishmania donovani', kind: 'parasite',
  aka: ['leishmania', 'kala azar', 'kala-azar', 'visceral leishmaniasis', 'sandfly', 'amastigote', 'ld body', 'black fever', 'bihar'],
  tagline: 'A parasite that hides inside the macrophage, and turns the spleen into a reservoir.',
  hero: 'Kala-azar means black fever, for the darkened skin it causes. Untreated it kills over 95% of those with symptoms. India has driven cases down dramatically through a targeted elimination programme — one of the clearest public health successes of the last two decades.',
  quick: [
    ['Pathogen', '<i>Leishmania donovani</i> — a kinetoplastid protozoan'],
    ['Vector', 'Female <i>Phlebotomus argentipes</i> sandfly'],
    ['Biting habit', 'Dusk and night; silent flight, short range'],
    ['Forms', 'Promastigote in the fly, amastigote in human macrophages'],
    ['Target cells', 'Macrophages of spleen, liver, bone marrow, lymph node'],
    ['Incubation', '2–6 months, occasionally years'],
    ['Untreated mortality', '>95% within two years'],
    ['Reservoir in South Asia', 'Humans only — which is what makes elimination feasible'],
    ['Distinctive organelle', 'The kinetoplast — a mass of mitochondrial DNA']
  ],
  model: {
    kind: 'parasite',
    colors: { rbc: '#b86a8e', ring: '#5ec4e0', merozoite: '#e8c04a', pigment: '#4a3b6b' },
    layers: [
      ['rbc', 'Host macrophage', 'The parasite\'s home. It survives inside the phagolysosome — the compartment designed to digest it.'],
      ['ring', 'Parasitophorous vacuole', 'The modified compartment the amastigote lives in, resisting acid and oxidative attack.'],
      ['merozoite', 'Amastigotes', 'Small round forms, 2–4 µm, packing the macrophage cytoplasm. On a stained smear these are the Leishman–Donovan bodies.'],
      ['pigment', 'Kinetoplast', 'A dense rod of concatenated mitochondrial DNA beside the nucleus. Seeing both together is what confirms the diagnosis.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and the life cycle', blocks: [
      { t: 'kv', items: [
        ['Order → Family', 'Trypanosomatida → <i>Trypanosomatidae</i>'],
        ['Genus → Species', '<i>Leishmania</i> → <i>L. donovani</i> (South Asia, East Africa), <i>L. infantum</i> (Mediterranean, Brazil)'],
        ['Relatives', '<i>Trypanosoma brucei</i> (sleeping sickness) and <i>T. cruzi</i> (Chagas disease) — all kinetoplastids'],
        ['Cutaneous species', '<i>L. major</i>, <i>L. tropica</i>, <i>L. braziliensis</i> — a different disease from the same genus'],
        ['Reservoir', 'In the Indian subcontinent, <b>humans only</b>. In East Africa and the Mediterranean, dogs and rodents also carry it.']
      ]},
      { t: 'steps', items: [
        ['Sandfly bite', 'A female <i>Phlebotomus argentipes</i> takes a blood meal and injects metacyclic promastigotes — slender, flagellated forms — along with saliva that suppresses local immunity.'],
        ['Phagocytosis', 'Promastigotes are engulfed by macrophages and neutrophils. This is not an accident; the parasite depends on being taken up.'],
        ['Survival inside the phagolysosome', 'Lipophosphoglycan and the surface protease gp63 inactivate complement and resist the oxidative burst. The parasite transforms into the small, round, non-flagellated <b>amastigote</b>.'],
        ['Multiplication', 'Amastigotes divide by binary fission until the macrophage ruptures, releasing them to infect further macrophages.'],
        ['Dissemination', 'Infected macrophages carry the parasite to spleen, liver, bone marrow and lymph nodes — the reticuloendothelial system. Hence <i>visceral</i>.'],
        ['Back to the fly', 'A sandfly biting an infected person takes up amastigotes, which transform back into promastigotes in the gut, multiply, and migrate to the mouthparts over about a week.']
      ]}
    ]},
    { id: 'structure', title: 'The two forms', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'giemsa-amastigote' },
      { t: 'table', head: ['Feature', 'Promastigote', 'Amastigote'], rows: [
        ['Where', 'Sandfly gut; culture medium', 'Human macrophage'],
        ['Shape', 'Elongated, 15–20 µm', 'Round or oval, 2–4 µm'],
        ['Flagellum', 'Long, free, anterior', 'Rudimentary, not visible by light microscopy'],
        ['Motility', 'Actively motile', 'Non-motile'],
        ['Multiplication', 'Binary fission in the gut', 'Binary fission inside the vacuole'],
        ['Seen on', 'NNN culture medium', '<b>Giemsa-stained splenic, marrow or node aspirate</b>']
      ]},
      { t: 'note', tone: 'info', text: 'The <b>kinetoplast</b> is the identifying feature. It is a single enormous mitochondrion containing a network of thousands of interlocked DNA circles, which stains as a small dark rod lying at right angles beside the nucleus. An amastigote without a visible kinetoplast could be anything; with one, it is a Leishman–Donovan body.' }
    ]},
    { id: 'clinical', title: 'Clinical features', blocks: [
      { t: 'organs', items: [
        ['Fever', 'Insidious onset, persisting for weeks to months. Classically twice-daily peaks, though this is often absent. The patient frequently remains surprisingly well early on, which delays presentation.'],
        ['Splenomegaly', 'Massive, firm, non-tender, progressing over months — often reaching the pelvis. Usually the most striking physical finding.'],
        ['Hepatomegaly', 'Present but typically less marked than the splenic enlargement.'],
        ['Pancytopenia', 'Anaemia, leucopenia and thrombocytopenia together, from marrow infiltration and hypersplenism. Leads to secondary infection and bleeding, which are the usual immediate causes of death.'],
        ['Hypergammaglobulinaemia', 'Massive polyclonal IgG with reversal of the albumin:globulin ratio — a non-specific B cell activation that provides no protection. The basis of the old aldehyde (formol-gel) test.'],
        ['Skin changes', 'Darkening of the skin of the face, hands, feet and abdomen — the "kala-azar" of the name.'],
        ['Wasting', 'Progressive weight loss and cachexia with a grossly distended abdomen.'],
        ['PKDL', 'Post-kala-azar dermal leishmaniasis: a hypopigmented macular, papular or nodular rash appearing months to years <i>after</i> apparently successful treatment, often starting around the mouth. Patients feel well — but their skin lesions are <b>full of parasites and are a major reservoir for ongoing transmission</b>, which is why PKDL detection and treatment is central to elimination.'],
        ['HIV co-infection', 'Atypical presentation, poor response to treatment and frequent relapse. An important and growing problem in East Africa and parts of Europe.']
      ]}
    ]},
    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'The diagnosis is made by seeing amastigotes inside macrophages on a Giemsa-stained aspirate. The site chosen is a trade-off between sensitivity and risk.' },
      { t: 'protocol', name: 'giemsa' },
      { t: 'table', head: ['Specimen', 'Sensitivity', 'Risk'], rows: [
        ['Splenic aspirate', '93–99%', 'Highest sensitivity, but risk of fatal haemorrhage. Requires normal clotting and platelets, and an experienced operator.'],
        ['Bone marrow aspirate', '53–86%', 'Safe and widely used; the usual choice in practice.'],
        ['Lymph node aspirate', '53–65%', 'Safe, lower yield.'],
        ['Buffy coat', 'Low', 'Useful mainly in HIV co-infection, where parasitaemia is higher.']
      ]},
      { t: 'note', tone: 'warn', text: 'On the smear, look for the <b>nucleus and kinetoplast together</b> inside a macrophage. Free amastigotes released from ruptured cells are easily confused with platelets, stain deposit or <i>Histoplasma</i>. <i>Histoplasma</i> is the classic mimic — it is a similar size and also intracellular, but it has no kinetoplast and it does stain with methenamine silver.' }
    ]},
    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'How it works', 'Note'], rows: [
        ['<b>rK39 rapid test</b>', 'Immunochromatographic strip detecting antibody to a recombinant kinesin antigen', 'The field diagnostic of the Indian elimination programme — 97% sensitive in South Asia, a drop of blood, 10 minutes. Less reliable in East Africa.'],
        ['Microscopy of aspirate', 'Giemsa stain', 'The confirmatory standard'],
        ['Direct agglutination test', 'Antibody detection', 'Used where rK39 performs poorly'],
        ['Culture on NNN medium', 'Promastigotes grow at 22–26 °C', 'Slow, for reference laboratories and species identification'],
        ['PCR', 'Kinetoplast DNA', 'Most sensitive; used in HIV co-infection, in PKDL and for monitoring'],
        ['Formol-gel (aldehyde) test', 'Serum gels on adding formalin, from massive IgG', 'Obsolete and non-specific — of historical interest only'],
        ['Full blood count and protein', 'Pancytopenia, reversed A:G ratio', 'Supportive, not diagnostic']
      ]},
      { t: 'note', tone: 'warn', text: 'rK39 detects antibody, which persists for years after cure. It therefore <b>cannot be used to diagnose relapse</b> or to confirm treatment success — a point that matters a great deal in a programme where relapse and PKDL drive ongoing transmission.' }
    ]},
    { id: 'treatment', title: 'Treatment and elimination', blocks: [
      { t: 'table', head: ['Drug', 'Route', 'Role'], rows: [
        ['<b>Liposomal amphotericin B</b>', 'Intravenous', '<b>First line in South Asia.</b> A single dose of 10 mg/kg achieves over 95% cure, which is what made programme-based treatment practical.'],
        ['Miltefosine', 'Oral, 28 days', 'The only oral drug. Teratogenic — contraception required for several months. Resistance and relapse are increasing.'],
        ['Paromomycin', 'Intramuscular, 21 days', 'Cheap; used in combination regimens.'],
        ['Pentavalent antimonials', 'Intravenous or intramuscular, 30 days', 'Sodium stibogluconate. <b>Resistance exceeds 60% in Bihar</b>, so it is no longer used there, though still effective in East Africa.'],
        ['Combination regimens', 'Various', 'Shorten treatment and protect against resistance — for example liposomal amphotericin B plus miltefosine.']
      ]},
      { t: 'ul', title: 'The elimination programme', items: [
        '<b>Target:</b> fewer than 1 case per 10,000 population at block level in India, Bangladesh and Nepal.',
        '<b>Why it can work here:</b> humans are the only reservoir in South Asia, there is one vector, and effective single-dose treatment exists. None of those are true in East Africa.',
        '<b>Indoor residual spraying</b> with synthetic pyrethroids against <i>P. argentipes</i>, which rests on indoor walls.',
        '<b>Active case detection</b> rather than waiting for patients to present, since early cases feel well.',
        '<b>PKDL detection and treatment</b>, because these patients are the human reservoir between outbreaks.',
        '<b>Result:</b> cases in India have fallen from tens of thousands a year in the early 2000s to a few hundred, and most endemic blocks have reached the elimination threshold. Bangladesh was validated as having eliminated it as a public health problem in 2023.'
      ]},
      { t: 'note', tone: 'warn', text: 'The last stretch is the hardest. As incidence falls, clinicians stop thinking of kala-azar, diagnosis is delayed, and each missed case seeds a new focus. Sustained surveillance after apparent elimination is what prevents resurgence — the same lesson as with every other disease that has been pushed to the margins rather than eradicated.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Leishmaniasis fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/leishmaniasis'],
        ['WHO — Control of the leishmaniases, technical report', 'https://www.who.int/publications/i/item/WHO-TRS-949'],
        ['National Center for Vector Borne Diseases Control, India — kala-azar', 'https://ncvbdc.mohfw.gov.in/'],
        ['CDC DPDx — Leishmaniasis', 'https://www.cdc.gov/dpdx/leishmaniasis/'],
        ['DNDi — visceral leishmaniasis programme', 'https://dndi.org/diseases/visceral-leishmaniasis/']
      ]}
    ]}
  ]
}

]);
