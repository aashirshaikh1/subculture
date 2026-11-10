/* Profile data, part 2: dengue, malaria, cholera, typhoid fever. */
window.DISEASES = (window.DISEASES || []).concat([

/* ───────────────────────────── Dengue ───────────────────────────── */
{
  id: 'dengue',
  name: 'Dengue',
  organism: 'Dengue virus 1–4',
  kind: 'virus',
  aka: ['dengue', 'denv', 'breakbone fever', 'aedes', 'mosquito', 'flavivirus', 'dhf'],
  tagline: 'Four serotypes that each protect against themselves and endanger you against the others.',
  hero: 'Recovering from one dengue serotype gives lifelong immunity to that one — and raises the risk of severe disease from the next. Antibody-dependent enhancement is why dengue behaves unlike almost any other infection, and why its vaccines are so difficult.',
  quick: [
    ['Pathogen', '<i>Orthoflavivirus denguei</i>, serotypes DENV-1 to DENV-4'],
    ['Baltimore group', 'IV — (+)ssRNA'],
    ['Genome', '≈10.7 kb, one open reading frame, one polyprotein'],
    ['Envelope', 'Yes — smooth herringbone shell of 180 E proteins'],
    ['Diameter', '≈50 nm'],
    ['Vector', '<i>Aedes aegypti</i>, also <i>Aedes albopictus</i>'],
    ['Biting habit', 'Daytime, especially early morning and before dusk'],
    ['Incubation', '4–10 days'],
    ['Severe cases', 'About 1 in 20 of those who fall ill']
  ],
  model: {
    kind: 'virion', radius: 1.2,
    envelope: '#35a79c', spikes: { type: 'flat', count: 90, color: '#9fe6c8' },
    capsid: { shape: 'icosa', color: '#e2b23c' },
    genome: { color: '#e8657f', strands: 1 },
    layers: [
      ['envelope', 'Lipid envelope', 'Taken from the endoplasmic reticulum, not the plasma membrane.'],
      ['spikes', 'E protein shell', '180 envelope proteins lying flat in a smooth herringbone pattern — no projecting spikes. E is the main antibody target and the fusion machine.'],
      ['capsid', 'Capsid (C) protein', 'A small, highly basic protein wrapped around the RNA.'],
      ['genome', 'RNA genome', 'One 10.7 kb (+)ssRNA translated as a single polyprotein and then cut up.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and spread', blocks: [
      { t: 'kv', items: [
        ['Family → Genus', '<i>Flaviviridae</i> → <i>Orthoflavivirus</i>'],
        ['Serotypes', 'DENV-1, 2, 3, 4 — about 65–70% identical to one another, enough to cross-react but not to cross-protect'],
        ['Relatives', 'Zika, yellow fever, Japanese encephalitis, West Nile, tick-borne encephalitis'],
        ['Name origin', 'Probably from Swahili <i>ka-dinga pepo</i>; "breakbone fever" was coined by Benjamin Rush in 1789'],
        ['First isolated', 'DENV-1 and DENV-2 by Sabin and Hotta during the Second World War']
      ]},
      { t: 'p', text: 'Dengue has expanded faster than almost any other infectious disease over the past fifty years. Urbanisation, stored water, discarded containers, global shipping of used tyres, and warming that extends the vector\'s range have combined to put roughly half the world\'s population at risk. Reported cases passed 14 million in 2024, the highest year on record.' },
      { t: 'ul', title: 'The vector', items: [
        '<i>Aedes aegypti</i> breeds in clean standing water in and around homes — buckets, drums, flower pots, tyres, air-cooler trays, roof gutters.',
        'It bites during the day, so bed nets help far less than they do for malaria.',
        'It takes several small blood meals per gestational cycle, which lets a single infected mosquito infect several people.',
        'Flight range is short, usually under 200 m, so outbreaks are tightly clustered around breeding sites.',
        '<i>Aedes albopictus</i> (the Asian tiger mosquito) tolerates cooler climates and has carried dengue into Europe.'
      ]}
    ]},

    { id: 'structure', title: 'Structure and genome', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'tem-dengue' },
      { t: 'p', text: 'The mature dengue virion has no protruding spikes. Its 180 E proteins lie flat against the membrane in a smooth icosahedral herringbone. The particle is also temperature-sensitive: at 37 °C it "breathes", transiently exposing surfaces that are hidden at room temperature, which complicates antibody studies.' },
      { t: 'genome', label: 'Dengue genome, ≈10.7 kb — one polyprotein cut into 3 structural and 7 non-structural proteins', genes: [
        ['C', 0.04, 'Capsid'],
        ['prM/M', 0.07, 'Precursor membrane; cleavage by furin matures the particle'],
        ['E', 0.14, 'Envelope — receptor binding, fusion, main antibody target'],
        ['NS1', 0.1, 'Secreted into blood; the basis of early antigen testing and a driver of vascular leak'],
        ['NS2A/2B', 0.07, 'Membrane proteins; NS2B is the protease cofactor'],
        ['NS3', 0.17, 'Protease, helicase, NTPase'],
        ['NS4A/4B', 0.09, 'Membrane rearrangement; interferon antagonism'],
        ['NS5', 0.3, 'RNA polymerase + methyltransferase — the largest and most conserved protein'],
        ['UTRs', 0.02, 'Untranslated regions controlling replication']
      ]},
      { t: 'note', tone: 'info', text: 'NS1 is unusual: it is secreted in large amounts into the bloodstream during the first days of illness. That makes it an excellent early diagnostic target, and it also acts directly on endothelial glycocalyx to promote the plasma leak of severe dengue.' }
    ]},

    { id: 'lifecycle', title: 'Transmission cycle and replication', blocks: [
      { t: 'steps', items: [
        ['Mosquito takes an infected blood meal', 'The person must be viraemic — roughly from one day before symptoms to day 5 of fever.'],
        ['Extrinsic incubation', 'The virus replicates in the mosquito midgut, then spreads to the salivary glands over 8–12 days. Warmer temperatures shorten this, which is why outbreaks accelerate in hot weather.'],
        ['Bite and entry', 'Virus is injected into skin with saliva and infects dendritic cells (Langerhans cells), then macrophages and monocytes.'],
        ['Cell entry', 'E protein binds attachment factors (DC-SIGN, mannose receptor, heparan sulfate) and is taken up by endocytosis. Low endosomal pH triggers E to flip into its fusion form.'],
        ['Translation and replication', 'The genome is read as one polyprotein, cut by NS3/NS2B and host proteases. Replication happens in ER-derived vesicle packets.'],
        ['Assembly and maturation', 'Immature particles bud into the ER; furin cleaves prM in the Golgi to make them infectious.'],
        ['Viraemia', 'Virus floods the blood during the febrile phase, ready for the next mosquito.']
      ]},
      { t: 'note', tone: 'warn', text: '<b>Antibody-dependent enhancement.</b> Antibodies from a first infection bind a different serotype but fail to neutralise it. The antibody-coated virus is then taken up more efficiently through Fc receptors on monocytes and macrophages, giving a higher viral load and a stronger inflammatory response. This is why a second heterotypic infection carries the highest risk of severe dengue, and why infants of immune mothers have a risk peak as maternal antibody falls to sub-neutralising levels.' }
    ]},

    { id: 'clinical', title: 'Clinical phases', blocks: [
      { t: 'p', text: 'WHO classifies dengue as dengue without warning signs, dengue with warning signs, and severe dengue. What matters clinically is the phase: deterioration happens at defervescence, not at peak fever, which is exactly when an untrained observer thinks the patient is improving.' },
      { t: 'organs', title: 'The three phases', items: [
        ['Febrile phase (days 1–3)', 'Abrupt high fever, severe headache, retro-orbital pain, intense muscle and joint pain (hence "breakbone"), nausea, flushed face, and a transient macular rash. Tourniquet test may be positive.'],
        ['Critical phase (days 4–6, around defervescence)', 'Lasts 24–48 hours. Plasma leaks from capillaries. Haematocrit rises while platelets fall. This is when shock, effusions and ascites appear — in the minority of patients who progress.'],
        ['Recovery phase (days 7–10)', 'Leaked fluid is reabsorbed; haematocrit normalises. A confluent "isles of white in a sea of red" rash appears with intense itching. Fluid overload is the main danger here, so intravenous fluids must be reduced.']
      ]},
      { t: 'ul', title: 'Warning signs — admit the patient', items: [
        'Severe abdominal pain or tenderness',
        'Persistent vomiting',
        'Clinical fluid accumulation — ascites, pleural effusion',
        'Mucosal bleeding',
        'Lethargy or restlessness',
        'Liver enlargement over 2 cm',
        'Rising haematocrit with a rapid fall in platelets'
      ]},
      { t: 'ul', title: 'Severe dengue', items: [
        'Severe plasma leakage leading to shock (dengue shock syndrome) or fluid accumulation with respiratory distress',
        'Severe bleeding',
        'Severe organ involvement — AST/ALT ≥ 1000, impaired consciousness, myocarditis'
      ]}
    ]},

    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'There is no routine stain for dengue. Diagnosis is NS1 antigen, RT-PCR and serology. Microscopy still earns its place in two ways: the ordinary stained blood film, which shows the changes that drive clinical management, and immunohistochemistry on post-mortem tissue, which is how fatal cases are confirmed.' },
      { t: 'protocol', name: 'ift' },
      { t: 'protocol', name: 'he' },
      { t: 'note', tone: 'info', text: 'On a Leishman- or Giemsa-stained peripheral film in dengue you are looking for <b>thrombocytopenia</b>, <b>leucopenia</b> with a relative lymphocytosis, and <b>reactive (atypical) lymphocytes</b> \\u2014 large cells with abundant basophilic cytoplasm moulding around neighbouring red cells. Together with a rising haematocrit, these are the laboratory signature of the critical phase.' }
    ]},

    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'Window', 'Note'], rows: [
        ['NS1 antigen', 'Days 1–7, best days 1–3', 'Allows diagnosis during the febrile phase before antibodies appear. Sensitivity lower in secondary infection.'],
        ['RT-PCR', 'Days 1–5', 'Confirms infection and gives the serotype. The reference standard early on.'],
        ['IgM ELISA', 'From day 5 onward', 'Cross-reacts with other flaviviruses — a problem where Zika and JE also circulate.'],
        ['IgG ELISA, paired sera', 'Acute and convalescent', 'A high IgG early suggests secondary infection.'],
        ['Full blood count', 'Daily', 'The key monitoring test: falling platelets and rising haematocrit together signal the critical phase.'],
        ['Haematocrit', 'Serial', 'A rise of 20% or more above baseline indicates significant plasma leakage.'],
        ['Ultrasound', 'As needed', 'Gallbladder wall thickening, ascites and pleural fluid are early signs of leak.']
      ]},
      { t: 'note', tone: 'info', text: 'Platelet count alone is a poor guide. Haematocrit trend plus clinical state decides management; transfusing platelets for a number, without bleeding, is not recommended and can do harm.' }
    ]},

    { id: 'treatment', title: 'Treatment', blocks: [
      { t: 'p', text: 'There is no specific antiviral. Outcome depends almost entirely on how well fluid is managed through the critical phase, and careful fluid therapy brings case fatality below 0.1%.' },
      { t: 'ul', title: 'What to do', items: [
        'Oral rehydration for patients without warning signs; emphasise urine output as the measure of adequacy.',
        'Paracetamol for fever and pain.',
        'Isotonic crystalloid (Ringer\'s lactate or normal saline) for the critical phase, titrated carefully against haematocrit, pulse, blood pressure and urine output.',
        'Colloids for refractory shock.',
        'Blood transfusion for significant bleeding — not routine platelet transfusion.',
        'Reduce fluids promptly in the recovery phase to avoid overload and pulmonary oedema.'
      ]},
      { t: 'note', tone: 'warn', text: 'Avoid aspirin, ibuprofen and other NSAIDs, which worsen bleeding risk and gastric irritation. Avoid intramuscular injections. Avoid corticosteroids, which trials have not shown to help.' }
    ]},

    { id: 'prevention', title: 'Prevention and vaccines', blocks: [
      { t: 'table', head: ['Vaccine', 'Type', 'Status'], rows: [
        ['Dengvaxia (CYD-TDV)', 'Live attenuated chimeric yellow fever backbone', 'Only for people with confirmed prior dengue infection. In dengue-naive recipients it increases the risk of severe disease on first natural infection — the ADE problem made concrete.'],
        ['Qdenga (TAK-003)', 'Live attenuated, DENV-2 backbone', 'WHO-recommended for high-burden settings in children aged 6–16; no pre-vaccination screening required. Efficacy varies by serotype.'],
        ['TV003/TV005 (Butantan-DV)', 'Live attenuated tetravalent', 'Phase 3 results from Brazil are encouraging; not yet widely licensed.']
      ]},
      { t: 'ul', title: 'Vector control — still the mainstay', items: [
        'Remove standing water weekly: tyres, pots, drums, coolers, roof gutters, construction sites.',
        'Cover and seal water storage containers; screen overhead tanks.',
        'Larvicide (temephos, Bti) and, in outbreaks, targeted adult spraying — which only suppresses, never eliminates.',
        'Window screens, repellents (DEET, picaridin), long sleeves during daylight hours.',
        '<b><i>Wolbachia</i> releases.</b> Mosquitoes carrying this bacterium transmit dengue poorly. A randomised trial in Yogyakarta, Indonesia, showed a 77% reduction in dengue cases — currently the most promising tool available.',
        'Community engagement, since most breeding sites are inside private homes.'
      ]}
    ]},

    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Estimated infections', 'About 390 million a year, of which roughly 96 million are symptomatic'],
        ['Reported cases, 2024', 'Over 14 million — the highest ever recorded'],
        ['People at risk', 'About half the world\'s population, across more than 130 countries'],
        ['Case fatality', 'Under 0.1% with good fluid management; up to 20% in untreated shock'],
        ['India', 'Tens of thousands to over 200,000 reported cases a year, peaking after the monsoon; true numbers are far higher'],
        ['Expansion', 'Local transmission now documented in France, Italy, Spain, and the southern United States']
      ]}
    ]},

    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Dengue and severe dengue fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue'],
        ['WHO — Dengue guidelines for diagnosis, treatment, prevention and control', 'https://www.who.int/publications/i/item/9789241547871'],
        ['CDC — Dengue', 'https://www.cdc.gov/dengue/'],
        ['National Center for Vector Borne Diseases Control, India', 'https://ncvbdc.mohfw.gov.in/'],
        ['World Mosquito Program — Wolbachia method', 'https://www.worldmosquitoprogram.org/'],
        ['ViralZone — Flaviviridae', 'https://viralzone.expasy.org/24']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Malaria ───────────────────────────── */
{
  id: 'malaria',
  name: 'Malaria',
  organism: 'Plasmodium species',
  kind: 'parasite',
  aka: ['malaria', 'plasmodium', 'falciparum', 'vivax', 'anopheles', 'parasite', 'protozoa'],
  tagline: 'A protozoan with two hosts, several body plans, and a dormant liver stage that can restart the illness months later.',
  hero: 'Plasmodium is not a bacterium or a virus but a single-celled eukaryote, and it changes form at every step: sporozoite in the mosquito\'s saliva, schizont in the liver, ring and trophozoite in red cells, gametocyte waiting to be taken up again.',
  quick: [
    ['Pathogen', '<i>Plasmodium falciparum</i>, <i>vivax</i>, <i>ovale</i>, <i>malariae</i>, <i>knowlesi</i>'],
    ['Type', 'Protozoan parasite, phylum Apicomplexa'],
    ['Genome', '≈23 Mb, 14 chromosomes (<i>P. falciparum</i>)'],
    ['Vector', 'Female <i>Anopheles</i> mosquito — over 40 vector species'],
    ['Biting habit', 'Night-time, which is why bed nets work'],
    ['Incubation', '7–30 days; months to years for relapsing <i>vivax</i>'],
    ['Fever periodicity', '48 h (tertian) for <i>falciparum</i>, <i>vivax</i>, <i>ovale</i>; 72 h (quartan) for <i>malariae</i>'],
    ['Most dangerous species', '<i>P. falciparum</i> — causes nearly all deaths'],
    ['Global burden', 'About 263 million cases and 597,000 deaths a year']
  ],
  model: {
    kind: 'parasite',
    colors: { rbc: '#d2435a', ring: '#5ec4e0', merozoite: '#f2b134', pigment: '#4a3b6b' },
    layers: [
      ['rbc', 'Red blood cell', 'The parasite\'s factory. It digests haemoglobin and leaves haemozoin pigment behind.'],
      ['ring', 'Ring-stage trophozoite', 'The earliest intra-erythrocytic form, and what you actually see on a blood film.'],
      ['merozoite', 'Merozoites', 'Released when the schizont bursts. Each invades a fresh red cell, and the synchronised bursting causes the fever spikes.'],
      ['pigment', 'Haemozoin pigment', 'Crystallised haem. Chloroquine works by blocking its formation, leaving toxic free haem behind.']
    ]
  },
  sections: [
    { id: 'classification', title: 'The five species', blocks: [
      { t: 'table', head: ['Species', 'Distribution', 'Key features'], rows: [
        ['<i>P. falciparum</i>', 'Africa (>95% of deaths), Asia, South America', 'Invades red cells of all ages, so parasitaemia can be enormous. Causes sequestration in capillaries — hence cerebral malaria. No dormant liver stage.'],
        ['<i>P. vivax</i>', 'Asia, Latin America, Horn of Africa', 'Invades only young reticulocytes, so lower parasitaemia. Forms hypnozoites that relapse weeks to years later. Needs Duffy antigen, which is why it is rare in West Africa.'],
        ['<i>P. ovale</i>', 'West Africa, Pacific islands', 'Also forms hypnozoites. Mild, relapsing.'],
        ['<i>P. malariae</i>', 'Patchy worldwide', '72-hour fever cycle. Can persist at very low levels for decades; associated with nephrotic syndrome.'],
        ['<i>P. knowlesi</i>', 'Borneo, South-East Asia', 'A macaque parasite. 24-hour cycle, so parasitaemia rises fast and it can become severe quickly. Easily mistaken for <i>P. malariae</i> on microscopy.']
      ]},
      { t: 'kv', items: [
        ['Phylum → Class', 'Apicomplexa → Aconoidasida'],
        ['Order → Family', 'Haemosporida → <i>Plasmodiidae</i>'],
        ['Defining organelle', 'The apical complex, used to force entry into host cells'],
        ['Apicoplast', 'A relict non-photosynthetic plastid from an engulfed alga — a drug target absent from humans'],
        ['Name origin', 'Italian <i>mal\' aria</i>, "bad air" — the miasma theory preserved in the word']
      ]},
      { t: 'timeline', items: [
        ['1880', 'Alphonse Laveran sees parasites in the blood of a soldier in Algeria. Nobel Prize 1907.'],
        ['1897', 'Ronald Ross, working in Secunderabad, India, finds the parasite in <i>Anopheles</i> and proves mosquito transmission. Nobel Prize 1902.'],
        ['1898', 'Grassi and colleagues complete the human cycle in Italy.'],
        ['1934–46', 'Chloroquine synthesised and deployed.'],
        ['1955–69', 'WHO Global Malaria Eradication Programme — succeeds in Europe and North America, fails in Africa.'],
        ['1972', 'Tu Youyou isolates artemisinin from <i>Artemisia annua</i>, following a 4th-century Chinese text. Nobel Prize 2015.'],
        ['2021', 'WHO recommends RTS,S/AS01 — the first malaria vaccine, and the first for any human parasite.'],
        ['2023', 'R21/Matrix-M recommended, with higher efficacy and far greater manufacturing capacity.']
      ]}
    ]},

    { id: 'structure', title: 'Life cycle', blocks: [
      { t: 'model' },
      { t: 'steps', items: [
        ['Sporozoites injected', 'A female <i>Anopheles</i> takes a blood meal and injects 10–100 sporozoites with her saliva. They reach the liver within about 30 minutes.'],
        ['Liver (exo-erythrocytic) stage', 'Each sporozoite invades a hepatocyte and divides into tens of thousands of merozoites over 5–16 days. Silent — no symptoms yet.'],
        ['Hypnozoites (vivax and ovale only)', 'Some parasites instead become dormant forms that can reactivate weeks to years later. This is relapse, and it is why these species need a separate radical cure.'],
        ['Red cell invasion', 'Merozoites burst out, enter the blood and invade red cells using the apical complex. In <i>P. vivax</i> this requires the Duffy antigen.'],
        ['Erythrocytic cycle', 'Ring → trophozoite → schizont, digesting haemoglobin and leaving haemozoin pigment. The schizont ruptures, releasing 8–32 merozoites every 48 hours (or 72 for <i>malariae</i>). The synchronised rupture is what causes the paroxysms of fever.'],
        ['Gametocytes', 'A fraction of parasites differentiate into male and female sexual forms, which do nothing to the patient but are what a mosquito needs.'],
        ['In the mosquito', 'Gametocytes fuse to form a zygote, which becomes a motile ookinete, crosses the midgut wall and forms an oocyst. Thousands of sporozoites burst out and migrate to the salivary glands over 10–18 days — the only point where the parasite reproduces sexually.']
      ]},
      { t: 'note', tone: 'info', text: 'Each stage has its own drug sensitivity. Blood schizonticides treat the illness; primaquine and tafenoquine are the only drugs that kill hypnozoites; a single low dose of primaquine kills gametocytes and blocks transmission without curing the patient.' }
    ]},

    { id: 'pathogenesis', title: 'How it causes disease', blocks: [
      { t: 'ul', items: [
        '<b>Haemolysis.</b> Red cells rupture every cycle, causing anaemia, jaundice and dark urine. Uninfected cells are also cleared, which worsens the anaemia out of proportion to parasitaemia.',
        '<b>Cytokine release.</b> Schizont rupture spills glycosylphosphatidylinositol and haemozoin, triggering TNF-α and IL-1 — the rigors, fever and malaise.',
        '<b>Cytoadherence and sequestration.</b> <i>P. falciparum</i> displays PfEMP1 knobs that bind endothelial receptors (CD36, ICAM-1, EPCR) in deep capillaries. Infected cells stick there and avoid the spleen. This is unique to falciparum and underlies its severity.',
        '<b>Rosetting and microvascular obstruction.</b> Infected cells clump with uninfected ones, blocking flow in the brain, placenta and other organs.',
        '<b>Metabolic derangement.</b> Parasites consume glucose avidly, and the combination with lactate from anaerobic metabolism gives the hypoglycaemia and lactic acidosis that predict death.',
        '<b>Placental malaria.</b> Parasites expressing VAR2CSA bind chondroitin sulfate A in the placenta, causing maternal anaemia, low birth weight and stillbirth. First pregnancies are hit hardest.'
      ]},
      { t: 'note', tone: 'info', text: 'The genetics of resistance are a textbook case of balancing selection: sickle cell trait, thalassaemias, G6PD deficiency, Duffy negativity and haemoglobin C all persist in populations precisely because they blunt malaria, despite their own costs.' }
    ]},

    { id: 'clinical', title: 'Clinical features', blocks: [
      { t: 'p', text: 'The classic paroxysm has three stages: a cold stage with shaking rigors, a hot stage with high fever lasting hours, and a sweating stage as the temperature falls. In practice, and especially in falciparum, fever is often irregular and the textbook pattern never appears — so malaria must be excluded in anyone with fever and relevant exposure, whatever the pattern.' },
      { t: 'organs', title: 'Severe falciparum malaria — WHO criteria', items: [
        ['Cerebral malaria', 'Impaired consciousness or coma, seizures, retinal whitening and haemorrhages. Mortality 15–20% even with treatment; neurological sequelae in survivors.'],
        ['Severe anaemia', 'Haemoglobin under 5 g/dL in children, under 7 g/dL in adults. The commonest severe form in young African children.'],
        ['Respiratory distress / acidosis', 'Deep laboured breathing from metabolic acidosis; plasma lactate over 5 mmol/L. One of the strongest predictors of death.'],
        ['Hypoglycaemia', 'Blood glucose under 2.2 mmol/L. Caused by the parasite and worsened by quinine, which stimulates insulin release.'],
        ['Acute kidney injury', 'Creatinine over 265 µmol/L. "Blackwater fever" is massive intravascular haemolysis with haemoglobinuria.'],
        ['Pulmonary oedema / ARDS', 'More common in adults and in pregnancy; often appears after treatment has started.'],
        ['Shock and bleeding', 'Algid malaria, often with Gram-negative bacteraemia; disseminated intravascular coagulation.'],
        ['Hyperparasitaemia', 'Over 10% of red cells infected — an indication for parenteral treatment regardless of how well the patient looks.']
      ]}
    ]},

    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'Everything about malaria diagnosis still rests on one stain. Giemsa on a paired thick and thin film is the reference standard against which every rapid test is measured, and it remains the only routine method that gives both the species and the parasite density \\u2014 the two numbers that decide how a patient is treated.' },
      { t: 'protocol', name: 'giemsa' },
      { t: 'note', tone: 'info', text: '<b>Why two films.</b> The thick film concentrates roughly twenty times more blood into the same field and is unfixed, so the red cells lyse and only parasites and white cells remain \\u2014 it is for finding the parasite and counting it. The thin film is fixed and the cells stay intact, so the parasite is seen inside its red cell \\u2014 it is for identifying the species, judging red cell size and spotting Schüffner\'s dots. Reporting one without the other is incomplete.' }
    ]},

    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'micro', kind: 'giemsa' },
      { t: 'table', head: ['Test', 'How it works', 'Strengths and limits'], rows: [
        ['Giemsa-stained thick film', 'Lysed red cells concentrate parasites', 'The reference standard for detection. Sensitivity about 50 parasites/µL. Allows quantification.'],
        ['Giemsa-stained thin film', 'Cells preserved intact', 'Used to identify the species and to count percentage parasitaemia.'],
        ['Rapid diagnostic test (RDT)', 'Lateral flow for HRP2 (falciparum) or pLDH/aldolase (pan-species)', 'No microscope or power needed, result in 15–20 minutes. HRP2 stays positive for weeks after cure.'],
        ['PCR', 'Species-specific DNA', 'Most sensitive; used for mixed infections, low parasitaemia and surveillance.'],
        ['Serology', 'Past exposure', 'No role in diagnosing acute illness.']
      ]},
      { t: 'note', tone: 'warn', text: '<b>hrp2/hrp3 deletions.</b> Parasites that have deleted the HRP2 gene give a false-negative result on the most widely used RDTs. These are now common in parts of the Horn of Africa and South America, and WHO advises switching to non-HRP2 tests where prevalence crosses 5%. Always confirm a negative RDT with microscopy when suspicion is high.' }
    ]},

    { id: 'treatment', title: 'Treatment and drug resistance', blocks: [
      { t: 'table', head: ['Drug', 'Target / action', 'Used for'], rows: [
        ['Artemisinin derivatives (artesunate, artemether)', 'Activated by haem iron to generate free radicals; kills ring stages fastest of any drug', 'The backbone of all first-line treatment'],
        ['Lumefantrine, piperaquine, amodiaquine, mefloquine', 'Haem detoxification, longer half-life', 'Partner drugs in ACT, which clear residual parasites'],
        ['Chloroquine', 'Blocks haemozoin formation in the food vacuole', 'Still works for <i>P. vivax</i> in most regions; falciparum resistance is near universal'],
        ['Primaquine', 'Kills hypnozoites and gametocytes', 'Radical cure for vivax/ovale; single low dose blocks transmission'],
        ['Tafenoquine', 'Same, single dose', 'Radical cure — needs quantitative G6PD testing first'],
        ['Atovaquone–proguanil', 'Mitochondrial electron transport (cytochrome bc1)', 'Treatment and prophylaxis'],
        ['Doxycycline', 'Apicoplast protein synthesis', 'Prophylaxis; partner drug with quinine'],
        ['Intravenous artesunate', 'As above', 'All severe malaria — it replaced quinine after large trials showed a clear mortality benefit']
      ]},
      { t: 'ul', title: 'How it is prescribed', items: [
        '<b>Uncomplicated falciparum:</b> a 3-day artemisinin-based combination therapy (ACT), such as artemether–lumefantrine. Never artemisinin alone — monotherapy breeds resistance.',
        '<b>Severe malaria:</b> intravenous artesunate immediately, then a full ACT course once the patient can swallow.',
        '<b>Vivax or ovale:</b> chloroquine or ACT for the blood stage, <i>plus</i> primaquine or tafenoquine for 14 days or one dose to clear hypnozoites — after testing for G6PD deficiency.',
        '<b>Pregnancy:</b> ACT is now recommended in all trimesters; primaquine is contraindicated.'
      ]},
      { t: 'note', tone: 'warn', text: 'Partial artemisinin resistance, marked by mutations in the <i>kelch13</i> gene, emerged in the Greater Mekong around 2008 and has now been confirmed in Rwanda, Uganda, Eritrea and Ethiopia. It shows as delayed parasite clearance rather than outright failure, but combined with partner-drug resistance it threatens the only drug class that works reliably.' }
    ]},

    { id: 'prevention', title: 'Prevention', blocks: [
      { t: 'ul', items: [
        '<b>Insecticide-treated nets.</b> The single most effective tool, because <i>Anopheles</i> bites at night. New dual-ingredient nets (pyrethroid plus chlorfenapyr or a synergist) restore effectiveness where pyrethroid resistance has spread.',
        '<b>Indoor residual spraying.</b> Rotated insecticide classes to manage resistance.',
        '<b>Larval source management</b> where breeding sites are few, fixed and findable.',
        '<b>Seasonal malaria chemoprevention</b> for children in the Sahel during the transmission season.',
        '<b>Intermittent preventive treatment in pregnancy</b> with sulfadoxine–pyrimethamine.',
        '<b>Perennial chemoprevention</b> for infants in high-transmission areas.',
        '<b>Vaccines.</b> RTS,S/AS01 and R21/Matrix-M, both targeting the circumsporozoite protein. R21 showed roughly 75% efficacy against clinical malaria with seasonal dosing and can be made at far greater scale. Both are now rolling out across Africa.',
        '<b>Prompt diagnosis and treatment,</b> which is also prevention — it removes the reservoir a mosquito would pick up.',
        '<b>Travellers:</b> chemoprophylaxis with atovaquone–proguanil, doxycycline or mefloquine, plus repellent and nets.'
      ]},
      { t: 'note', tone: 'warn', text: 'Insecticide resistance is now widespread, and <i>Anopheles stephensi</i> — an urban, container-breeding vector originally from South Asia — has invaded the Horn of Africa, raising the prospect of malaria epidemics in large African cities that have historically been spared.' }
    ]},

    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Annual cases', 'About 263 million'],
        ['Annual deaths', 'About 597,000'],
        ['Who dies', 'About 76% of deaths are children under 5'],
        ['Region', 'The WHO African Region carries roughly 94% of cases and deaths'],
        ['Four countries', 'Nigeria, DR Congo, Niger and Tanzania account for about half of all deaths'],
        ['India', 'Around 2 million estimated cases; both <i>P. falciparum</i> and <i>P. vivax</i>, with vivax dominant in the north'],
        ['Certified malaria-free since 2015', 'Includes Sri Lanka, Maldives, China, El Salvador, Egypt, Cabo Verde and others'],
        ['Target', 'WHO Global Technical Strategy: 90% reduction in incidence and mortality by 2030']
      ]}
    ]},

    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — World Malaria Report', 'https://www.who.int/teams/global-malaria-programme/reports/world-malaria-report-2024'],
        ['WHO — Guidelines for malaria', 'https://www.who.int/publications/i/item/guidelines-for-malaria'],
        ['CDC — Malaria', 'https://www.cdc.gov/malaria/'],
        ['CDC DPDx — laboratory identification of parasites', 'https://www.cdc.gov/dpdx/malaria/'],
        ['PlasmoDB — Plasmodium genomics', 'https://plasmodb.org/'],
        ['National Center for Vector Borne Diseases Control, India', 'https://ncvbdc.mohfw.gov.in/']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Cholera ───────────────────────────── */
{
  id: 'cholera',
  name: 'Cholera',
  organism: 'Vibrio cholerae',
  kind: 'bacterium',
  aka: ['cholera', 'vibrio', 'rice water', 'ors', 'john snow', 'diarrhoea', 'diarrhea'],
  tagline: 'A comma-shaped bacterium whose single toxin can empty a litre of fluid an hour out of the gut.',
  hero: 'Vibrio cholerae does not invade. It sticks to the small intestine and releases one toxin that jams a cellular switch permanently on, reversing the flow of water across the gut wall. Everything about cholera — the volume, the speed, the treatment — follows from that one molecular event.',
  quick: [
    ['Pathogen', '<i>Vibrio cholerae</i> serogroups O1 and O139'],
    ['Shape', 'Curved Gram-negative rod, 1–3 µm — the "comma bacillus"'],
    ['Motility', 'Single polar flagellum — darting, shooting-star motility'],
    ['Genome', '≈4 Mb on two circular chromosomes'],
    ['Oxygen / oxidase', 'Facultative anaerobe; oxidase positive'],
    ['Habitat', 'Brackish water and estuaries, attached to copepods and chitin'],
    ['Incubation', '12 hours to 5 days'],
    ['Infectious dose', 'High — 10⁸ organisms in healthy stomachs, far lower with low gastric acid'],
    ['Untreated mortality', 'Up to 50%; under 1% with prompt rehydration']
  ],
  model: {
    kind: 'bacillus', length: 2.6, radius: 0.5, shape: 'comma', flagella: 1,
    colors: { wax: '#7fd4c1', wall: '#2f9e8f', membrane: '#67c7e8', cytoplasm: '#a8e6c8', dna: '#9b6cf0', ribo: '#ffd98a' },
    layers: [
      ['wall', 'Outer membrane + LPS', 'Gram-negative envelope. The O antigen defines serogroups O1 and O139.'],
      ['membrane', 'Inner membrane', 'Energy generation and secretion systems.'],
      ['cytoplasm', 'Cytoplasm', 'Where cholera toxin is made before being exported.'],
      ['ribo', 'Ribosomes', 'Target of doxycycline and azithromycin.'],
      ['dna', 'Two chromosomes', 'Chromosome 1 carries most essential genes; chromosome 2 began life as a megaplasmid.'],
      ['flagella', 'Polar flagellum', 'Drives the darting motility seen on a wet mount — a rapid bedside clue.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and history', blocks: [
      { t: 'kv', items: [
        ['Family → Genus', '<i>Vibrionaceae</i> → <i>Vibrio</i>'],
        ['Species', '<i>Vibrio cholerae</i> — over 200 serogroups, but only O1 and O139 cause epidemics'],
        ['O1 biotypes', 'Classical and El Tor. El Tor caused the ongoing seventh pandemic and survives longer in the environment.'],
        ['O1 serotypes', 'Ogawa, Inaba, and the rare Hikojima'],
        ['O139 Bengal', 'Emerged in 1992 in Chennai and Bengal; now uncommon.'],
        ['Other vibrios', '<i>V. parahaemolyticus</i> (seafood gastroenteritis), <i>V. vulnificus</i> (severe wound infection)']
      ]},
      { t: 'timeline', items: [
        ['Pre-1817', 'Cholera is endemic to the Ganges delta.'],
        ['1817', 'The first of seven pandemics spreads out of Bengal.'],
        ['1854', 'John Snow maps deaths around the Broad Street pump in Soho, London, and has the handle removed — the founding work of epidemiology, done 30 years before the organism was accepted.'],
        ['1854', 'Filippo Pacini describes the bacterium in Florence; his work is overlooked.'],
        ['1883', 'Robert Koch isolates it in Egypt and India and names it the "comma bacillus".'],
        ['1905', 'The El Tor biotype is isolated at the El Tor quarantine station in Sinai.'],
        ['1961', 'The seventh pandemic begins in Sulawesi and continues to this day.'],
        ['1960s–70s', 'Oral rehydration solution developed in Dhaka and Kolkata, and proved during the 1971 Bangladesh refugee crisis.'],
        ['2010', 'Cholera introduced to Haiti after the earthquake; over 800,000 cases.']
      ]},
      { t: 'note', tone: 'info', text: 'The Lancet called oral rehydration solution "potentially the most important medical advance of the twentieth century". It is sugar, salt and water in the right proportions, and it works because glucose-coupled sodium transport in the gut stays intact even when cholera toxin is running.' }
    ]},

    { id: 'structure', title: 'Structure and virulence factors', blocks: [
      { t: 'model' },
      { t: 'table', head: ['Factor', 'Gene / origin', 'What it does'], rows: [
        ['Cholera toxin (CT)', '<i>ctxAB</i>, carried by the CTXφ bacteriophage', 'An A-B₅ toxin. The five B subunits bind GM1 ganglioside on enterocytes; the A subunit enters and ADP-ribosylates the Gsα protein.'],
        ['Toxin co-regulated pilus (TCP)', '<i>tcpA</i>, on the VPI pathogenicity island', 'Required for colonisation — and it is also the receptor the CTXφ phage uses to infect the bacterium.'],
        ['Polar flagellum', '<i>fla</i> genes', 'Penetrates the mucus layer to reach the epithelium.'],
        ['Mucinase, haemagglutinin protease', 'Various', 'Clears mucus; later detaches bacteria for shedding.'],
        ['Accessory toxins (Zot, Ace)', 'CTXφ element', 'Loosen tight junctions; contribute to fluid loss.'],
        ['ToxR / ToxT regulon', 'Chromosome 1', 'Senses the gut environment and switches on CT and TCP together.'],
        ['Biofilm and chitin binding', 'Chromosome 2', 'Lets the organism persist on copepods and shellfish between outbreaks.']
      ]},
      { t: 'note', tone: 'warn', text: 'A non-toxigenic <i>V. cholerae</i> becomes an epidemic pathogen by acquiring two mobile elements: the VPI island encoding the pilus, then the CTXφ phage carrying the toxin — and the phage can only enter if the pilus is already there. Virulence here is literally horizontal gene transfer in sequence.' }
    ]},

    { id: 'pathogenesis', title: 'How the toxin works', blocks: [
      { t: 'steps', items: [
        ['Ingestion', 'Contaminated water or food. Most organisms are killed by stomach acid, so the infectious dose is high — unless the person takes antacids, has had gastric surgery, or the bacteria are protected inside food.'],
        ['Colonisation', 'Survivors swim through the mucus of the small intestine using the flagellum and anchor with the toxin co-regulated pilus. They never invade the cells or the bloodstream.'],
        ['Toxin binding', 'The B₅ ring binds GM1 ganglioside on the enterocyte surface; the complex is taken up and routed back to the endoplasmic reticulum.'],
        ['ADP-ribosylation', 'The A1 fragment transfers ADP-ribose onto the Gsα subunit, which locks it in its active, GTP-bound state. It can no longer switch itself off.'],
        ['Runaway cAMP', 'Adenylate cyclase runs continuously and cytoplasmic cAMP rises many-fold.'],
        ['Chloride secretion', 'Protein kinase A phosphorylates the CFTR channel, which pours chloride into the lumen. Sodium and water follow osmotically, and sodium absorption is simultaneously blocked.'],
        ['Massive isotonic loss', 'Up to 1 litre an hour in adults. The stool is isotonic with plasma, which is why the patient loses bicarbonate and potassium as well as salt and water.']
      ]},
      { t: 'note', tone: 'ok', text: 'The key clinical insight: the glucose–sodium co-transporter (SGLT1) is untouched by the toxin. Give glucose and sodium together in the right ratio, and water is dragged back across the gut wall even while the toxin is still working. That is the whole basis of oral rehydration.' }
    ]},

    { id: 'clinical', title: 'Clinical features', blocks: [
      { t: 'p', text: 'Most infections are mild or silent — roughly 1 in 10 infected people develops severe disease. When it is severe, it is dramatic: painless, effortless diarrhoea of enormous volume, with no fever and no blood or pus in the stool.' },
      { t: 'organs', items: [
        ['The stool', 'Rice-water stool: clear or pale grey with flecks of mucus, and a faint fishy odour. No blood, no pus, little smell of faeces — because it is essentially plasma ultrafiltrate, not inflamed bowel content.'],
        ['Dehydration', 'Sunken eyes, absent tears, dry mouth, loss of skin turgor with "washerwoman\'s hands", weak or absent radial pulse, hypotension, oliguria.'],
        ['Electrolyte loss', 'Hypokalaemia causing paralytic ileus and arrhythmia; metabolic acidosis from bicarbonate loss causing deep laboured breathing; hypoglycaemia in children.'],
        ['Shock', 'Can develop within 4–12 hours of the first loose stool. Death can follow within hours in adults and even faster in children.'],
        ['Complications', 'Acute kidney injury from prolonged hypovolaemia, and in pregnancy a high rate of fetal loss.'],
        ['Children', 'More likely to have fever, convulsions and altered consciousness than adults.']
      ]},
      { t: 'table', head: ['Dehydration', 'Signs', 'Fluid deficit', 'Plan'], rows: [
        ['None or mild', 'Thirsty, alert, normal pulse', '< 5% body weight', 'WHO Plan A — ORS at home'],
        ['Some (moderate)', 'Restless, irritable, sunken eyes, skin pinch goes back slowly', '5–10%', 'WHO Plan B — supervised ORS, 75 mL/kg over 4 hours'],
        ['Severe', 'Lethargic or unconscious, unable to drink, very slow skin pinch, weak or absent pulse', '> 10%', 'WHO Plan C — IV Ringer\'s lactate immediately, 100 mL/kg']
      ]}
    ]},

    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'Two bench procedures take minutes between them and give a presumptive diagnosis long before any culture grows: a Gram stain showing curved Gram-negative rods, and a hanging-drop preparation showing the darting motility that stops dead the moment O1 antiserum is added.' },
      { t: 'protocol', name: 'gram' },
      { t: 'note', tone: 'info', text: 'Neither finding is sufficient on its own \\u2014 other vibrios and <i>Campylobacter</i> can look similar \\u2014 but in the setting of an acute watery diarrhoea outbreak, a Gram stain of curved rods plus arrested darting motility in O1 antiserum is enough to act on. Treatment never waits for culture.' }
    ]},

    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'micro', kind: 'gram-vibrio' },
      { t: 'micro', kind: 'tcbs-plate' },
      { t: 'table', head: ['Test', 'Finding', 'Note'], rows: [
        ['Dark-field or wet mount microscopy', 'Darting, shooting-star motility, stopped by O1 antiserum', 'A rapid bedside clue where a microscope is available.'],
        ['Rapid dipstick (Crystal VC)', 'O1/O139 antigen', 'For outbreak detection, not individual diagnosis. Confirm positives by culture.'],
        ['TCBS agar', 'Large flat yellow colonies — the organism ferments sucrose', 'The selective medium of choice.'],
        ['Alkaline peptone water', 'Enrichment before plating', 'Exploits the organism\'s tolerance of pH 8.5–9, which kills competing flora.'],
        ['Serotyping with O1/O139 antisera', 'Confirms the epidemic serogroup', 'Also distinguishes Ogawa from Inaba.'],
        ['PCR for <i>ctxA</i> and <i>tcpA</i>', 'Toxigenic strain confirmation', 'Reference laboratories.'],
        ['Biochemical screen', 'Oxidase positive, string test positive, grows in 0% and 3% NaCl', 'Separates <i>V. cholerae</i> from other vibrios.']
      ]},
      { t: 'note', tone: 'warn', text: 'Do not wait for the laboratory. Cholera is treated on clinical suspicion the moment a patient presents with acute watery diarrhoea and dehydration. Confirmation matters for outbreak response, not for whether to start fluids.' }
    ]},

    { id: 'treatment', title: 'Treatment', blocks: [
      { t: 'p', text: 'Rehydration is the treatment. Antibiotics are an adjunct that shorten the illness and the duration of shedding; they do not replace fluids, and giving them without fluids will not save a patient in shock.' },
      { t: 'ul', title: 'Fluids', items: [
        '<b>Low-osmolarity ORS</b> — 75 mmol/L sodium, 75 mmol/L glucose, with potassium and citrate. Give it continuously, matched to ongoing stool losses.',
        '<b>Ringer\'s lactate</b> intravenously for severe dehydration; it is preferred over normal saline because it replaces the lost bicarbonate.',
        '<b>Replace ongoing losses</b> — weigh the stool or use a cholera cot with a hole and a calibrated bucket beneath.',
        '<b>Potassium and zinc.</b> Zinc for 10–14 days in children shortens the illness.',
        '<b>Keep feeding.</b> Continue breastfeeding and resume food as soon as vomiting stops.'
      ]},
      { t: 'table', head: ['Antibiotic', 'Use', 'Note'], rows: [
        ['Doxycycline, single 300 mg dose', 'Adults, including pregnancy, and children', 'First choice where the strain is susceptible.'],
        ['Azithromycin, single 1 g dose', 'Alternative first line', 'Preferred in many settings and in children.'],
        ['Ciprofloxacin', 'Alternative', 'Resistance is now widespread in several outbreak strains.'],
        ['Tetracycline, erythromycin', 'Older alternatives', 'Depends on local susceptibility data.']
      ]},
      { t: 'note', tone: 'warn', text: 'Antibiotics are reserved for patients with severe dehydration, not given to everyone. Multidrug resistance is already common in the current seventh-pandemic lineage, and mass prophylaxis accelerates it.' }
    ]},

    { id: 'prevention', title: 'Prevention and control', blocks: [
      { t: 'ul', title: 'Water, sanitation and hygiene — the permanent solution', items: [
        'Safe piped or treated drinking water; chlorination, boiling, filtration or solar disinfection where there is none.',
        'Safe excreta disposal and protection of water sources from faecal contamination.',
        'Handwashing with soap, and safe food handling — cook it, peel it, or leave it.',
        'Safe burial practices, since bodies remain highly infectious.',
        'Rapid case finding, cholera treatment centres, and treating patients close to where they live.'
      ]},
      { t: 'table', head: ['Oral vaccine', 'Type', 'Schedule and protection'], rows: [
        ['Euvichol-Plus / Euvichol-S', 'Killed whole-cell O1 and O139', 'Two doses; about 65% protection for 3 years. The mainstay of the global stockpile.'],
        ['Shanchol', 'Killed whole-cell', 'Similar; developed in India.'],
        ['Dukoral', 'Killed whole-cell plus recombinant B subunit', 'Also gives short-term protection against ETEC traveller\'s diarrhoea.'],
        ['Vaxchora', 'Live attenuated, single dose', 'For travellers from non-endemic countries.']
      ]},
      { t: 'note', tone: 'warn', text: 'The global oral cholera vaccine stockpile has been under severe strain since 2022, and the standard two-dose schedule has had to be cut to a single dose in many outbreaks to stretch supply. Vaccination buys time; it does not substitute for water and sanitation.' }
    ]},

    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Estimated cases', '1.3 to 4 million a year'],
        ['Estimated deaths', '21,000 to 143,000 a year'],
        ['Reported vs real', 'Reported figures are a small fraction of the true burden — many countries avoid reporting because of trade and travel consequences'],
        ['Current situation', 'A global upsurge since 2021, with more countries affected and higher case fatality than in the previous decade'],
        ['Drivers', 'Conflict, displacement, flooding and drought, and damaged water infrastructure'],
        ['Endemic regions', 'South Asia, sub-Saharan Africa, Haiti; outbreaks follow emergencies'],
        ['Blood group', 'Group O is associated with more severe disease, for reasons still being worked out'],
        ['Target', 'Ending Cholera: a global roadmap to 2030 — a 90% reduction in deaths']
      ]}
    ]},

    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Cholera fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/cholera'],
        ['WHO — Multi-country cholera external situation reports', 'https://www.who.int/emergencies/disease-outbreak-news'],
        ['CDC — Cholera', 'https://www.cdc.gov/cholera/'],
        ['Global Task Force on Cholera Control', 'https://www.gtfcc.org/'],
        ['UCLA — John Snow and the Broad Street pump', 'https://www.ph.ucla.edu/epi/snow.html'],
        ['icddr,b — oral rehydration research', 'https://www.icddrb.org/']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Typhoid ───────────────────────────── */
{
  id: 'typhoid',
  name: 'Typhoid fever',
  organism: 'Salmonella enterica serovar Typhi',
  kind: 'bacterium',
  aka: ['typhoid', 'salmonella', 'typhi', 'enteric fever', 'widal', 'paratyphoid', 'typhoid mary'],
  tagline: 'A Salmonella that gave up on animals, lives only in humans, and hides inside the cells meant to kill it.',
  hero: 'S. Typhi infects no other species. It crosses the gut wall, survives inside macrophages, and spreads through the bloodstream — so typhoid is a systemic illness with fever, not the diarrhoea most people expect from Salmonella.',
  quick: [
    ['Pathogen', '<i>Salmonella enterica</i> subsp. <i>enterica</i> serovar Typhi'],
    ['Shape', 'Gram-negative bacillus, 2–3 µm'],
    ['Motility', 'Motile — peritrichous flagella'],
    ['Genome', '≈4.8 Mb (strain CT18)'],
    ['Oxygen', 'Facultative anaerobe'],
    ['Reservoir', 'Humans only — no animal reservoir'],
    ['Incubation', '6–30 days, typically 8–14'],
    ['Infectious dose', '10³–10⁶ organisms'],
    ['Untreated mortality', '10–20%; under 1% treated']
  ],
  model: {
    kind: 'bacillus', length: 3.0, radius: 0.58, shape: 'rod', flagella: 6, capsule: true,
    colors: { wax: '#9fb8e8', wall: '#4f6fc4', membrane: '#67c7e8', cytoplasm: '#a8d8e8', dna: '#8b5cf0', ribo: '#ffd98a' },
    layers: [
      ['wax', 'Vi capsular polysaccharide', 'A capsule unique to <i>S.</i> Typhi. Hides the organism from complement and antibody, and is the basis of the modern conjugate vaccine.'],
      ['wall', 'Outer membrane + LPS (O antigen)', 'Endotoxin. Drives the fever and the systemic inflammatory response.'],
      ['membrane', 'Inner membrane', 'Houses the type III secretion systems.'],
      ['cytoplasm', 'Cytoplasm', 'Where typhoid toxin is assembled.'],
      ['ribo', 'Ribosomes', 'Target of azithromycin and chloramphenicol.'],
      ['dna', 'Chromosome + plasmids', 'Resistance in XDR strains is carried on an IncY plasmid.'],
      ['flagella', 'Peritrichous flagella (H antigen)', 'Flagella all round the cell. The H antigen is one of the three measured in the Widal test.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and history', blocks: [
      { t: 'kv', items: [
        ['Family → Genus', '<i>Enterobacteriaceae</i> → <i>Salmonella</i>'],
        ['Species → Subspecies', '<i>S. enterica</i> → subsp. <i>enterica</i>'],
        ['Serovar', 'Typhi — named by the Kauffman–White scheme from O, H and Vi antigens'],
        ['Antigenic formula', 'O9,12 : Hd : Vi'],
        ['Enteric fever also includes', '<i>S.</i> Paratyphi A, B and C — clinically similar, usually milder, and not covered by typhoid vaccines'],
        ['Non-typhoidal Salmonella', '<i>S.</i> Typhimurium, <i>S.</i> Enteritidis — animal reservoirs, cause gastroenteritis, and invasive disease in people with HIV or malaria']
      ]},
      { t: 'timeline', items: [
        ['1829', 'Pierre Louis separates typhoid from typhus on clinical and pathological grounds.'],
        ['1880', 'Karl Eberth sees the bacillus in Peyer\'s patches and the spleen.'],
        ['1884', 'Georg Gaffky cultures it.'],
        ['1896', 'Georges-Fernand Widal describes the agglutination test still bearing his name; Almroth Wright develops a killed whole-cell vaccine.'],
        ['1907', 'Mary Mallon, a New York cook, is identified as an asymptomatic chronic carrier and linked to several outbreaks.'],
        ['1948', 'Chloramphenicol becomes the first effective treatment.'],
        ['1970s–90s', 'Chloramphenicol resistance, then multidrug resistance, then fluoroquinolone resistance appear in sequence.'],
        ['2016', 'An extensively drug-resistant (XDR) H58 clone emerges in Sindh, Pakistan.'],
        ['2018', 'WHO prequalifies typhoid conjugate vaccine, usable from 6 months of age.']
      ]},
      { t: 'note', tone: 'info', text: 'Typhoid and typhus are different diseases with similar names. Typhus is caused by <i>Rickettsia</i> species and spread by lice, fleas and mites. The shared root is Greek <i>typhos</i>, "smoke" or "stupor", describing the clouded mental state both produce.' }
    ]},

    { id: 'structure', title: 'Structure and virulence factors', blocks: [
      { t: 'model' },
      { t: 'table', head: ['Factor', 'Location', 'Role'], rows: [
        ['Vi capsular antigen', '<i>viaB</i> locus on SPI-7', 'Blocks complement deposition and antibody recognition, and dampens the innate response. Present only in Typhi, Paratyphi C and a few others.'],
        ['SPI-1 type III secretion system', 'Pathogenicity island 1', 'Injects effectors that trigger the host cell to ruffle its membrane and engulf the bacterium.'],
        ['SPI-2 type III secretion system', 'Pathogenicity island 2', 'Lets the bacterium survive and multiply inside the macrophage vacuole.'],
        ['Typhoid toxin', 'Chromosome', 'An unusual A₂B₅ toxin combining a DNase and an ADP-ribosyltransferase. Linked to the malaise, stupor and some chronic effects.'],
        ['LPS O antigen', 'Outer membrane', 'Endotoxin; the O9,12 antigen used in serotyping and in the Widal test.'],
        ['Flagella (H:d antigen)', 'Surface', 'Motility and chemotaxis towards the intestinal epithelium.'],
        ['Acid tolerance response', 'Regulated genes', 'Survives gastric acid, which is why antacid use lowers the infectious dose.'],
        ['Bile tolerance and biofilm', 'Various', 'Allows persistence in the gallbladder, including on gallstones — the basis of chronic carriage.']
      ]}
    ]},

    { id: 'pathogenesis', title: 'How it causes disease', blocks: [
      { t: 'steps', items: [
        ['Ingestion and gastric survival', 'Contaminated water or food. The acid tolerance response gets some organisms through the stomach.'],
        ['Invasion of M cells', 'In the terminal ileum, SPI-1 effectors force entry through M cells overlying Peyer\'s patches — the gut\'s own lymphoid sampling stations.'],
        ['Survival inside macrophages', 'Engulfed by macrophages, the bacterium uses SPI-2 to build a protected vacuole and replicate inside it. The Vi capsule keeps the inflammatory response muted, so there is no diarrhoea at this stage.'],
        ['Primary bacteraemia', 'Infected macrophages carry it through lymphatics to the thoracic duct and bloodstream. Still asymptomatic — this is the incubation period.'],
        ['Reticuloendothelial multiplication', 'Replication in liver, spleen, bone marrow and lymph nodes over roughly 1–2 weeks.'],
        ['Secondary bacteraemia', 'A second, larger release into the blood. This is when fever and symptoms begin.'],
        ['Gallbladder seeding and gut re-entry', 'Bile carries organisms back into the intestine. They re-invade the already sensitised Peyer\'s patches, which become hyperplastic, then necrotic, then ulcerate — the source of week-3 bleeding and perforation.']
      ]},
      { t: 'note', tone: 'info', text: 'Note what is missing: typhoid does not cause significant diarrhoea early on, because the Vi capsule suppresses the inflammation that would produce it. Constipation is more common than diarrhoea in the first week, especially in adults. Expecting a diarrhoeal illness is the commonest reason typhoid is missed.' }
    ]},

    { id: 'clinical', title: 'Clinical course, week by week', blocks: [
      { t: 'organs', title: 'Untreated, typhoid follows a strikingly stereotyped four-week course', items: [
        ['Week 1', 'Stepladder fever — rising a little higher each day and not fully settling between times. Headache, malaise, dry cough, abdominal discomfort, constipation. Relative bradycardia (Faget sign): pulse lower than the fever should produce.'],
        ['Week 2', 'Sustained high fever, 39–40 °C. Rose spots: 2–4 mm blanching pink macules on the trunk, faint and easily missed on darker skin, lasting a few days. Hepatosplenomegaly. Abdominal distension. The toxic, apathetic "typhoid state".'],
        ['Week 3', 'The dangerous week. Peyer\'s patch ulcers reach their deepest point. Intestinal haemorrhage in up to 10%, perforation in 1–3% with peritonitis. Pea-soup diarrhoea may now appear. Delirium, coma vigil, and in severe cases muttering delirium and picking at bedclothes.'],
        ['Week 4', 'If the patient survives, fever gradually resolves. Weight loss and weakness persist for weeks. Relapse in 5–10% of untreated cases, and still a few percent after antibiotics.'],
        ['Chronic carriage', 'About 1–5% of patients shed the organism for over a year, usually from the gallbladder and often on gallstones. Carriers are well, and are the reservoir that keeps typhoid circulating. Women over 40 with gallbladder disease are the classic group.'],
        ['Other complications', 'Myocarditis, hepatitis, pneumonia, osteomyelitis (especially in sickle cell disease), meningitis, and typhoid encephalopathy.']
      ]}
    ]},

    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'The Gram stain confirms a Gram-negative bacillus and nothing more. <i>S.</i> Typhi cannot be told from <i>E. coli</i>, <i>Klebsiella</i> or any other enterobacterium by its appearance, so microscopy\'s role here is to tell the laboratory what it is growing, not to make the diagnosis.' },
      { t: 'protocol', name: 'gram' },
      { t: 'note', tone: 'info', text: 'The diagnosis is a blood culture, and the single most important variable is the <b>volume of blood taken</b>: the bacteraemia is low-grade, often under one organism per millilitre, so 10\\u201315 mL in adults matters far more than any refinement of technique downstream. Bone marrow culture is more sensitive still and stays positive after antibiotics have started.' }
    ]},

    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'micro', kind: 'gram-rod' },
      { t: 'table', head: ['Test', 'Sensitivity', 'Note'], rows: [
        ['Blood culture', '40–80%, highest in week 1', 'The practical reference standard. Take at least 10–15 mL in adults — the bacteraemia is low-grade, so volume matters more than anything else.'],
        ['Bone marrow culture', '80–95%', 'The most sensitive test, and stays positive even after antibiotics have started. Invasive, so reserved for difficult cases.'],
        ['Stool culture', '30–40%', 'Higher in weeks 3–4 and the main test for identifying chronic carriers.'],
        ['Urine culture', '≈ 25%', 'Low yield.'],
        ['Duodenal string test', 'Good', 'A swallowed capsule with a string recovers bile; useful for carriers.'],
        ['Widal test', 'Poor', 'Measures agglutinins to O and H antigens. Cross-reacts with other Salmonellae, malaria and dengue; a single titre is uninterpretable in endemic areas. Still widely used, and widely misread.'],
        ['Typhidot / IgM rapid tests', 'Moderate', 'Faster than culture but inconsistent in field evaluations.'],
        ['Full blood count', '—', 'Leukopenia or a normal white count with a fever is a useful clue; eosinopenia is characteristic. Anaemia and thrombocytopenia are common.']
      ]},
      { t: 'note', tone: 'warn', text: 'A positive Widal test alone does not diagnose typhoid, and a negative one does not exclude it. Where blood culture is available, use it. Where it is not, treat on clinical grounds and say explicitly that the diagnosis is presumptive.' }
    ]},

    { id: 'treatment', title: 'Treatment and resistance', blocks: [
      { t: 'table', head: ['Drug', 'Target', 'Current role'], rows: [
        ['Azithromycin', '50S ribosome', 'First line for uncomplicated typhoid in most of South Asia, including XDR strains. Oral.'],
        ['Ceftriaxone / cefixime', 'Cell wall (PBPs)', 'Severe or complicated disease. XDR strains are resistant to ceftriaxone.'],
        ['Fluoroquinolones (ciprofloxacin, ofloxacin)', 'DNA gyrase', 'Largely abandoned in South Asia because of widespread resistance; still useful elsewhere.'],
        ['Meropenem', 'Cell wall', 'Reserved for XDR typhoid and severe cases.'],
        ['Chloramphenicol, ampicillin, co-trimoxazole', 'Various', 'The original three. Resistance to all three together defines "MDR typhoid".'],
        ['Dexamethasone', 'Host inflammation', 'High dose for severe typhoid with delirium, stupor or shock — shown to cut mortality substantially.']
      ]},
      { t: 'ul', title: 'Resistance, in sequence', items: [
        '<b>MDR typhoid:</b> resistant to chloramphenicol, ampicillin and co-trimoxazole. Emerged in the 1990s.',
        '<b>Fluoroquinolone non-susceptibility:</b> now above 95% of isolates in parts of South Asia, driven by <i>gyrA</i> mutations.',
        '<b>XDR typhoid:</b> the H58 clone from Sindh, Pakistan, since 2016 — MDR plus fluoroquinolone and third-generation cephalosporin resistance. Azithromycin and carbapenems are what remain.',
        '<b>Azithromycin resistance</b> has now been reported in Bangladesh, Pakistan, India and Nepal. If it spreads, there is very little left.'
      ]},
      { t: 'ul', title: 'Supportive care', items: ['Fluids and nutrition', 'Fever control', 'Surgical review for suspected perforation — an acute abdomen in week 3 of a fever in an endemic area is perforation until proven otherwise', 'Treat identified chronic carriers with 4 weeks of ciprofloxacin or azithromycin; cholecystectomy if gallstones persist'] }
    ]},

    { id: 'prevention', title: 'Prevention', blocks: [
      { t: 'table', head: ['Vaccine', 'Type', 'Age and duration'], rows: [
        ['Typhoid conjugate vaccine (TCV) — Typbar-TCV, TyphiBEV', 'Vi polysaccharide conjugated to tetanus toxoid', 'From 6 months. Single dose, roughly 80–85% efficacy, protection for at least 4–5 years. WHO-recommended for routine use in endemic countries.'],
        ['Vi polysaccharide (Typhim Vi)', 'Unconjugated polysaccharide', 'From 2 years. About 55–70% efficacy, needs a booster every 3 years, and does not work in infants.'],
        ['Ty21a (Vivotif)', 'Live attenuated, oral', 'From 5 years. 3–4 capsules on alternate days. Avoid in immunocompromised people and during antibiotic use.']
      ]},
      { t: 'ul', title: 'The rest of prevention', items: [
        'Safe drinking water and chlorination — typhoid disappeared from Europe and North America through sanitation, not vaccines or antibiotics.',
        'Safe excreta disposal and protection of water sources.',
        'Food hygiene: handwashing, safe handling, avoiding food from unsafe water. Boil it, cook it, peel it, or leave it.',
        'Identify and treat chronic carriers, and exclude them from food handling until cleared.',
        'Travellers to endemic areas should be vaccinated.'
      ]},
      { t: 'note', tone: 'info', text: 'Pakistan introduced TCV into routine immunisation in 2019 in response to the XDR outbreak, and several countries have followed, with Gavi support. Conjugate vaccines work in infants, which polysaccharide vaccines never did — that is what makes routine programmes possible.' }
    ]},

    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Annual cases', 'About 9 million typhoid cases'],
        ['Annual deaths', 'Roughly 110,000'],
        ['Paratyphoid', 'An estimated further 3–5 million cases a year'],
        ['Highest burden', 'South Asia — India, Pakistan, Bangladesh, Nepal — then sub-Saharan Africa and South-East Asia'],
        ['Who is affected', 'Highest incidence in children and young adults, particularly ages 5–19'],
        ['Transmission', 'Faecal–oral, through contaminated water and food. Short-cycle (household) and long-cycle (water supply) routes'],
        ['Risk factors', 'Unsafe water, poor sanitation, urban crowding, flooding, street food, and antacid use'],
        ['Chronic carriers', '1–5% of cases — the reservoir that sustains endemic transmission']
      ]}
    ]},

    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Typhoid fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/typhoid'],
        ['WHO — Typhoid vaccines position paper', 'https://www.who.int/publications/i/item/WHO-WER9313'],
        ['CDC — Typhoid fever and paratyphoid fever', 'https://www.cdc.gov/typhoid-fever/'],
        ['Coalition against Typhoid / Take on Typhoid', 'https://www.coalitionagainsttyphoid.org/'],
        ['Global Typhoid Genomics Consortium', 'https://www.typhoidgenomics.org/'],
        ['Institute for Health Metrics and Evaluation — typhoid burden', 'https://www.healthdata.org/research-analysis/diseases-injuries-risks']
      ]}
    ]}
  ]
}

]);
