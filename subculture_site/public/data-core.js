/* Profile data, part 1: HIV, TB, COVID-19, influenza, hepatitis B.
   Every organism uses the same 12-part template so they can be compared side by side. */
window.DISEASES = (window.DISEASES || []).concat([

/* ───────────────────────────── HIV / AIDS ───────────────────────────── */
{
  id: 'hiv',
  name: 'HIV / AIDS',
  organism: 'Human immunodeficiency virus 1',
  kind: 'virus',
  aka: ['hiv', 'aids', 'human immunodeficiency virus', 'retrovirus', 'arv', 'art'],
  tagline: 'A retrovirus that writes itself into the chromosome of the very cell that should coordinate the attack against it.',
  hero: 'HIV infects CD4+ T helper cells, copies its RNA into DNA with reverse transcriptase, and integrates into the host genome. That integrated copy is why infection is lifelong and why treatment suppresses rather than cures.',
  quick: [
    ['Pathogen', 'HIV-1 and HIV-2 (genus <i>Lentivirus</i>)'],
    ['Baltimore group', 'VI — ssRNA with reverse transcriptase'],
    ['Genome', '2 copies of (+)ssRNA, ≈9.7 kb'],
    ['Envelope', 'Yes — lipid bilayer with gp120/gp41'],
    ['Diameter', '100–120 nm'],
    ['Primary target', 'CD4+ T cells, macrophages, dendritic cells'],
    ['Receptor', 'CD4 + co-receptor CCR5 or CXCR4'],
    ['Untreated course', '8–10 years to AIDS'],
    ['Case fatality', 'Near 100% untreated; near-normal lifespan on ART']
  ],
  model: {
    kind: 'virion', radius: 1.35,
    envelope: '#d6457f', spikes: { type: 'y', count: 16, color: '#f6a94a' },
    capsid: { shape: 'cone', color: '#7a5cf0' },
    matrix: '#ef7fae',
    genome: { color: '#2fd0b2', strands: 2 },
    layers: [
      ['envelope', 'Lipid envelope', 'Stolen from the host cell membrane as the virus buds out.'],
      ['spikes', 'gp120 / gp41 spikes', 'The trimeric spike. gp120 grips CD4, gp41 drives fusion.'],
      ['matrix', 'Matrix (p17)', 'A shell lining the envelope; directs assembly at the membrane.'],
      ['capsid', 'Capsid (p24)', 'Cone-shaped core. p24 is what 4th-generation antigen tests detect.'],
      ['genome', 'RNA genome + enzymes', 'Two identical (+)ssRNA strands with reverse transcriptase, integrase and protease.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and discovery', blocks: [
      { t: 'kv', items: [
        ['Realm → Family', 'Riboviria → <i>Retroviridae</i>'],
        ['Subfamily → Genus', '<i>Orthoretrovirinae</i> → <i>Lentivirus</i>'],
        ['Species', '<i>Human immunodeficiency virus 1</i> and <i>2</i>'],
        ['HIV-1 groups', 'M (pandemic), N, O, P — each a separate cross-species jump'],
        ['Group M subtypes', 'A–K plus circulating recombinant forms. Subtype C causes about half of global infections and predominates in India and southern Africa.'],
        ['HIV-2', 'Mostly West Africa. Lower viral loads, slower progression, intrinsically resistant to NNRTIs.']
      ]},
      { t: 'p', text: 'HIV-1 group M arose from SIVcpz in chimpanzees in south-eastern Cameroon, with molecular clock estimates placing the jump into humans around 1920. HIV-2 came separately from SIVsmm in sooty mangabeys.' },
      { t: 'timeline', items: [
        ['Jun 1981', 'The CDC reports Pneumocystis pneumonia in five previously healthy young men in Los Angeles — the first published description of AIDS.'],
        ['1982', 'The name AIDS is adopted, replacing earlier stigmatising labels.'],
        ['1983', 'Barré-Sinoussi and Montagnier at the Institut Pasteur isolate the virus; Gallo\'s group confirms it causes AIDS in 1984.'],
        ['1985', 'First antibody test licensed; blood supplies begin to be screened.'],
        ['1987', 'Zidovudine (AZT) approved — the first antiretroviral.'],
        ['1996', 'Combination therapy (HAART) transforms prognosis; viral load testing arrives.'],
        ['2008', 'Barré-Sinoussi and Montagnier share the Nobel Prize in Physiology or Medicine.'],
        ['2012', 'Oral PrEP approved for prevention.'],
        ['2016', 'The U=U evidence base is accepted: an undetectable viral load means the virus is not sexually transmitted.'],
        ['2021→', 'Long-acting injectable ART and lenacapavir, a first-in-class capsid inhibitor.']
      ]}
    ]},

    { id: 'structure', title: 'Structure and genome', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'tem-hiv' },
      { t: 'p', text: 'The virion is roughly spherical, 100–120 nm across, and takes its envelope from the host cell membrane during budding. About 7–14 functional spikes sit on a mature particle — strikingly few compared with influenza, which is part of why HIV is relatively hard to transmit per exposure.' },
      { t: 'table', head: ['Component', 'Protein', 'Job'], rows: [
        ['Surface spike', 'gp120 (SU)', 'Binds CD4, then the co-receptor. Heavily glycosylated — a "glycan shield" that hides it from antibodies.'],
        ['Transmembrane spike', 'gp41 (TM)', 'Springs open and pulls the two membranes together to fuse them.'],
        ['Matrix', 'p17 (MA)', 'Lines the envelope; targets assembly to the plasma membrane.'],
        ['Capsid', 'p24 (CA)', 'Builds the cone-shaped core. Target of lenacapavir and the basis of antigen testing.'],
        ['Nucleocapsid', 'p7 (NC)', 'Coats and protects the RNA.'],
        ['Reverse transcriptase', 'p66/p51 (RT)', 'Copies RNA into DNA. No proofreading — hence rapid mutation.'],
        ['Integrase', 'p31 (IN)', 'Cuts host DNA and splices the viral copy in.'],
        ['Protease', 'p10 (PR)', 'Cleaves the Gag and Gag-Pol polyproteins during maturation.']
      ]},
      { t: 'genome', label: 'HIV-1 genome, ≈9.7 kb — three structural genes plus six accessory genes, read in overlapping frames', genes: [
        ['gag', 0.16, 'MA, CA, NC — the structural core'],
        ['pol', 0.28, 'RT, IN, PR — the enzymes'],
        ['vif', 0.05, 'Degrades APOBEC3G, a host antiviral enzyme'],
        ['vpr', 0.04, 'Arrests the cell cycle; helps nuclear import'],
        ['tat', 0.05, 'Massively boosts transcription of the provirus'],
        ['rev', 0.05, 'Exports unspliced viral RNA from the nucleus'],
        ['vpu', 0.04, 'Counters tetherin; downregulates CD4'],
        ['env', 0.24, 'gp160 → gp120 + gp41'],
        ['nef', 0.09, 'Downregulates CD4 and MHC-I, evading killer T cells']
      ]},
      { t: 'note', tone: 'info', text: 'Reverse transcriptase makes roughly one error per genome copied. With about 10<sup>10</sup> virions produced a day in untreated infection, every single-point drug-resistance mutation is generated many times over each day. That arithmetic is the whole reason combination therapy exists.' }
    ]},

    { id: 'lifecycle', title: 'Replication cycle', blocks: [
      { t: 'steps', items: [
        ['Attachment', 'gp120 binds CD4. The spike rearranges, exposing a second site that binds CCR5 (most transmitted strains) or CXCR4 (often later in disease).'],
        ['Fusion', 'gp41 harpoons the cell membrane and folds back, dragging the two bilayers together. The core enters the cytoplasm.'],
        ['Reverse transcription', 'RT copies the RNA into double-stranded DNA inside the intact capsid, which travels along microtubules to the nucleus.'],
        ['Nuclear entry and integration', 'The capsid docks at a nuclear pore. Integrase inserts the viral DNA into host chromatin, preferring actively transcribed genes. It is now a provirus.'],
        ['Latency or transcription', 'The provirus may sit silent for years in resting memory CD4 cells — the reservoir that prevents cure. Or Tat drives high-level transcription.'],
        ['Translation and assembly', 'Gag and Gag-Pol polyproteins gather at the plasma membrane with two RNA copies and the Env spikes.'],
        ['Budding and maturation', 'The particle buds off, then protease cleaves the polyproteins and the core condenses into its cone. Only mature particles are infectious.']
      ]},
      { t: 'note', tone: 'warn', text: 'Steps 3, 4, 7 and 1 are exactly where the four main drug classes act. Map the cycle once and the pharmacology follows from it.' }
    ]},

    { id: 'transmission', title: 'Transmission', blocks: [
      { t: 'table', head: ['Route', 'Risk per exposure (untreated source)', 'Notes'], rows: [
        ['Receptive anal intercourse', '≈1.4%', 'Highest sexual risk; thin rectal mucosa.'],
        ['Receptive vaginal intercourse', '≈0.08%', 'Raised by ulcerative STIs and high viral load.'],
        ['Insertive intercourse', '0.04–0.11%', 'Medical male circumcision reduces risk by about 60%.'],
        ['Needle sharing', '≈0.6–0.8%', 'Prevented by needle and syringe programmes.'],
        ['Needlestick injury', '≈0.23%', 'PEP within 72 hours.'],
        ['Mother to child, no treatment', '15–45%', 'Falls below 1–2% with maternal ART and infant prophylaxis.'],
        ['Blood transfusion, unscreened', '>90%', 'Essentially eliminated by donor screening.']
      ]},
      { t: 'ul', title: 'Fluids that transmit', items: ['Blood', 'Semen and pre-seminal fluid', 'Vaginal and rectal fluids', 'Breast milk'] },
      { t: 'ul', title: 'Does not transmit', items: ['Saliva, tears, sweat or urine', 'Hugging, kissing, shaking hands', 'Sharing food, utensils, toilets or swimming pools', 'Mosquitoes — the virus does not replicate in insects'] },
      { t: 'note', tone: 'ok', text: '<b>U = U.</b> A person on effective treatment with a viral load under 200 copies/mL does not pass HIV on sexually. This is settled, replicated evidence from the PARTNER and Opposites Attract studies.' }
    ]},

    { id: 'pathogenesis', title: 'How it causes disease', blocks: [
      { t: 'p', text: 'HIV kills CD4 T cells faster than the body can replace them. Only a minority die from direct budding. Most are bystander cells in lymphoid tissue that abortively take up the virus; the incomplete DNA products trigger pyroptosis, an inflammatory form of cell death that recruits yet more cells to be infected. The result is a self-feeding fire in gut-associated lymphoid tissue, where most of the body\'s CD4 cells live and where up to 80% are lost within weeks of infection.' },
      { t: 'ul', title: 'Consequences that follow from that', items: [
        'Loss of the gut mucosal barrier lets bacterial products leak into the blood, driving chronic immune activation even on treatment.',
        'CD4 help collapses, so cytotoxic T cell and B cell responses degrade across the board.',
        'Below 200 CD4 cells/mm³ the opportunistic infections appear, each at its own fairly predictable threshold.'
      ]},
      { t: 'chart', kind: 'hiv-course' }
    ]},

    { id: 'clinical', title: 'Stages and clinical signs', blocks: [
      { t: 'table', head: ['Stage', 'Timing', 'What happens'], rows: [
        ['Acute (primary) infection', '2–4 weeks after exposure', 'Fever, sore throat, rash, lymphadenopathy, mouth ulcers — often mistaken for flu or glandular fever. Viral load peaks in the millions; the person is highly infectious. Antibody tests may still be negative.'],
        ['Clinical latency', 'Years 1–10', 'Few or no symptoms. The virus replicates continuously in lymphoid tissue and CD4 counts drift down by roughly 50–100 cells/mm³ per year.'],
        ['Symptomatic HIV', 'CD4 200–500', 'Shingles, oral candidiasis, oral hairy leukoplakia, seborrhoeic dermatitis, unexplained weight loss, persistent diarrhoea, recurrent bacterial pneumonia.'],
        ['AIDS', 'CD4 < 200 cells/mm³', 'Defined by the CD4 threshold or by an AIDS-defining illness, regardless of count.']
      ]},
      { t: 'organs', title: 'AIDS-defining illnesses by CD4 threshold', items: [
        ['< 250', 'Pulmonary tuberculosis (can occur at any count), disseminated histoplasmosis and coccidioidomycosis.'],
        ['< 200', '<i>Pneumocystis jirovecii</i> pneumonia — dry cough, breathlessness on exertion, normal-sounding chest. The classic AIDS-defining infection.'],
        ['< 150', 'Oesophageal candidiasis: painful swallowing with white plaques.'],
        ['< 100', 'Cerebral toxoplasmosis (ring-enhancing lesions), cryptococcal meningitis (raised intracranial pressure, India-ink positive CSF).'],
        ['< 50', 'CMV retinitis, progressive multifocal leukoencephalopathy, disseminated <i>Mycobacterium avium</i> complex, primary CNS lymphoma.'],
        ['Any count', 'Kaposi sarcoma (HHV-8 driven, purple plaques on skin, palate or viscera), cervical cancer, non-Hodgkin lymphoma, HIV wasting syndrome.']
      ]}
    ]},

    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'HIV is about 120 nm across, well below the roughly 200 nm limit of a light microscope, so no stain will ever show the virus itself on a slide. The laboratory stains one of two other things instead: the particle, by electron microscopy, or a viral protein, using a labelled antibody. In culture the infected cells give themselves away without any stain at all \\u2014 fused multinucleated syncytia are obvious under ordinary phase contrast.' },
      { t: 'protocol', name: 'negstain' },
      { t: 'protocol', name: 'ift' },
      { t: 'note', tone: 'info', text: '<b>In practice, none of this diagnoses HIV.</b> Diagnosis is serological and molecular: a fourth-generation antigen/antibody immunoassay, then a confirmatory differentiation assay, with PCR for acute infection and for infants. Microscopy belongs to research, to pathology, and to the culture work shown in the simulation at the foot of this page \\u2014 where p24 immunohistochemistry and syncytium counts are how an infected culture is read.' }
    ]},

    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'What it detects', 'Window period', 'Use'], rows: [
        ['4th-generation antigen/antibody immunoassay', 'p24 antigen + anti-HIV IgG/IgM', '18–45 days', 'First-line screening everywhere.'],
        ['Rapid test / self-test', 'Antibody (some also p24)', '23–90 days', 'Community testing. A reactive result always needs laboratory confirmation.'],
        ['Nucleic acid test (RNA PCR)', 'Viral RNA', '10–33 days', 'Suspected acute infection, infant diagnosis, blood donor screening.'],
        ['HIV-1/2 differentiation assay', 'Type-specific antibodies', '—', 'Confirms a reactive screen and separates HIV-1 from HIV-2.'],
        ['Viral load (quantitative RNA)', 'Copies/mL', '—', 'Monitoring treatment. Target: undetectable, under 50 copies/mL.'],
        ['CD4 count / percentage', 'Cells per mm³', '—', 'Immune status and opportunistic-infection risk.'],
        ['Genotypic resistance test', 'Mutations in RT, PR, IN', '—', 'Baseline and at treatment failure.']
      ]},
      { t: 'note', tone: 'info', text: 'Infants carry maternal antibody for up to 18 months, so antibody tests cannot diagnose them. Early infant diagnosis uses DNA or RNA PCR, with the first sample at 4–6 weeks of age. In India, testing is free at ICTC centres under the National AIDS Control Programme.' }
    ]},

    { id: 'treatment', title: 'Treatment and drug targets', blocks: [
      { t: 'table', head: ['Class', 'Step blocked', 'Examples'], rows: [
        ['NRTI — nucleoside RT inhibitors', 'Reverse transcription (chain termination)', 'Tenofovir (TDF/TAF), lamivudine, emtricitabine, abacavir, zidovudine'],
        ['NNRTI — non-nucleoside RT inhibitors', 'Reverse transcription (allosteric)', 'Efavirenz, rilpivirine, doravirine, nevirapine'],
        ['INSTI — integrase inhibitors', 'Strand transfer into host DNA', 'Dolutegravir, bictegravir, raltegravir, cabotegravir'],
        ['PI — protease inhibitors', 'Maturation', 'Darunavir, atazanavir, lopinavir — boosted with ritonavir or cobicistat'],
        ['Entry: CCR5 antagonist', 'Co-receptor binding', 'Maraviroc'],
        ['Entry: fusion inhibitor', 'gp41 folding', 'Enfuvirtide'],
        ['Entry: post-attachment', 'CD4 conformational change', 'Ibalizumab'],
        ['Capsid inhibitor', 'Capsid assembly and uncoating', 'Lenacapavir — dosed twice yearly']
      ]},
      { t: 'ul', title: 'How it is actually prescribed', items: [
        'First line worldwide, including India: tenofovir + lamivudine (or emtricitabine) + <b>dolutegravir</b> — the TLD single tablet, once daily.',
        'Long-acting injectable cabotegravir + rilpivirine every two months for people who prefer it and are already suppressed.',
        'Treatment starts the day of diagnosis, at any CD4 count. There is no longer a threshold to wait for.',
        'Goal: viral load undetectable within 3–6 months, then maintained for life. ART suppresses but does not clear the integrated provirus.'
      ]},
      { t: 'note', tone: 'warn', text: 'Starting ART when CD4 is very low can unmask a hidden infection as the immune system recovers — immune reconstitution inflammatory syndrome (IRIS). Screen for tuberculosis and cryptococcal antigen before starting.' }
    ]},

    { id: 'prevention', title: 'Prevention', blocks: [
      { t: 'ul', items: [
        '<b>Treatment as prevention.</b> Suppressive ART ends sexual transmission (U=U).',
        '<b>PrEP.</b> Daily oral tenofovir/emtricitabine, or injectable cabotegravir, or six-monthly lenacapavir, for people at substantial risk. Over 90% effective when taken as directed.',
        '<b>PEP.</b> A 28-day course started within 72 hours of exposure, and the sooner the better.',
        '<b>Preventing mother-to-child transmission.</b> Maternal ART, infant prophylaxis and safe infant feeding bring transmission below 2%.',
        '<b>Condoms</b> — roughly 80–90% effective against HIV with consistent use, and they also cover other STIs.',
        '<b>Voluntary medical male circumcision</b> — about 60% reduction in female-to-male transmission.',
        '<b>Harm reduction</b> — needle and syringe programmes and opioid agonist therapy.',
        '<b>Blood safety</b> — universal donor screening and sterile injection equipment.'
      ]},
      { t: 'note', tone: 'info', text: 'There is still no licensed vaccine. The glycan shield, the extreme sequence diversity, and the fact that integration happens within days all make HIV a far harder vaccine target than the other viruses on this site. Broadly neutralising antibodies given passively are the most promising current line of work.' }
    ]},

    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['People living with HIV', 'About 40 million worldwide'],
        ['New infections', 'Roughly 1.3 million a year — down about 60% from the 1995 peak'],
        ['AIDS-related deaths', 'Around 600,000–630,000 a year — down about two-thirds since 2004'],
        ['On treatment', 'About 31 million people, roughly 77% of those living with HIV'],
        ['Highest burden', 'Eastern and southern Africa, about half of all people living with HIV'],
        ['India', 'About 2.5 million people living with HIV; adult prevalence roughly 0.2%'],
        ['Target', 'UNAIDS 95-95-95 — 95% diagnosed, 95% of those on treatment, 95% of those suppressed']
      ]},
      { t: 'note', tone: 'warn', text: 'These figures move every year. Check the current UNAIDS Global AIDS Update and the NACO India HIV Estimates report before you present them.' }
    ]},

    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['UNAIDS — global data and estimates', 'https://www.unaids.org/en/resources/fact-sheet'],
        ['WHO — HIV fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/hiv-aids'],
        ['CDC — HIV basics', 'https://www.cdc.gov/hiv/'],
        ['NACO — National AIDS Control Organisation, India', 'https://naco.gov.in/'],
        ['ViralZone — HIV-1 molecular biology', 'https://viralzone.expasy.org/7'],
        ['HIV Drug Resistance Database, Stanford University', 'https://hivdb.stanford.edu/'],
        ['NIH Clinical Info — antiretroviral guidelines', 'https://clinicalinfo.hiv.gov/en/guidelines']
      ]}
    ]},

    { id: 'game', title: 'Lab game: grow HIV in cell culture', blocks: [ { t: 'game' } ] }
  ]
},

/* ───────────────────────────── Tuberculosis ───────────────────────────── */
{
  id: 'tb',
  name: 'Tuberculosis',
  organism: 'Mycobacterium tuberculosis',
  kind: 'bacterium',
  aka: ['tb', 'tuberculosis', 'mycobacterium', 'koch bacillus', 'phthisis', 'consumption', 'mtb'],
  tagline: 'A slow-growing bacillus wrapped in wax, which survives inside the macrophage sent to destroy it.',
  hero: 'M. tuberculosis divides once every 15–20 hours and hides inside the cells of the immune system. Both facts explain everything that follows: the months-long treatment, the strange staining, the latent infection carried by a quarter of humanity.',
  quick: [
    ['Pathogen', '<i>Mycobacterium tuberculosis</i> complex'],
    ['Shape', 'Slender straight or slightly curved rod, 2–4 µm × 0.3–0.6 µm'],
    ['Staining', 'Acid-fast — Ziehl–Neelsen, not Gram'],
    ['Genome', '4.41 Mb circular DNA, ≈4,000 genes (strain H37Rv)'],
    ['Oxygen', 'Obligate aerobe'],
    ['Doubling time', '15–20 hours'],
    ['Motility / spores', 'Non-motile, non-sporing'],
    ['Infectious dose', 'Possibly as few as 1–10 bacilli'],
    ['Global burden', 'About 10.8 million cases and 1.25 million deaths a year']
  ],
  model: {
    kind: 'bacillus', length: 3.1, radius: 0.62, shape: 'rod',
    colors: { wax: '#f2c14e', wall: '#e0714a', membrane: '#6fb6d8', cytoplasm: '#8fd4a8', dna: '#8b6cf0', ribo: '#ffd9a0' },
    layers: [
      ['wax', 'Mycolic acid layer', 'A thick waxy coat, up to 60% of the cell wall by weight. The reason for acid-fastness, slow growth and drug resistance.'],
      ['wall', 'Arabinogalactan–peptidoglycan', 'The structural wall. Target of ethambutol and isoniazid.'],
      ['membrane', 'Plasma membrane', 'Where energy generation sits — the target of bedaquiline.'],
      ['cytoplasm', 'Cytoplasm', 'Dense with enzymes for lipid metabolism.'],
      ['ribo', 'Ribosomes', 'Target of streptomycin and amikacin.'],
      ['dna', 'Circular chromosome', 'One 4.41 Mb chromosome. No plasmids in most clinical strains, so resistance arises by mutation, not transfer.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and discovery', blocks: [
      { t: 'kv', items: [
        ['Domain → Phylum', 'Bacteria → Actinomycetota'],
        ['Order → Family', 'Mycobacteriales → <i>Mycobacteriaceae</i>'],
        ['Species', '<i>Mycobacterium tuberculosis</i>'],
        ['MTB complex', 'Also <i>M. bovis</i>, <i>M. africanum</i>, <i>M. microti</i>, <i>M. canettii</i> — all cause tuberculosis'],
        ['Relatives of note', '<i>M. leprae</i> (leprosy), <i>M. avium</i> complex (disease in advanced HIV)'],
        ['Discovered', 'Robert Koch, announced 24 March 1882 — now World TB Day']
      ]},
      { t: 'p', text: 'Koch\'s announcement was also the moment he laid out the postulates that still define what it means to prove a microbe causes a disease. He received the Nobel Prize in 1905.' },
      { t: 'timeline', items: [
        ['Antiquity', 'Spinal TB in Egyptian mummies; Hippocrates describes phthisis as the commonest fatal disease of his time.'],
        ['1882', 'Koch identifies the bacillus.'],
        ['1895', 'Röntgen discovers X-rays, giving TB its imaging test.'],
        ['1921', 'BCG first given to a human infant, after 13 years of serial passage by Calmette and Guérin.'],
        ['1943–44', 'Waksman and Schatz isolate streptomycin — the first drug that works.'],
        ['1946–52', 'Para-aminosalicylic acid, then isoniazid. Combination therapy begins because streptomycin alone selects resistance.'],
        ['1960s', 'Rifampicin allows short-course treatment.'],
        ['1993', 'WHO declares TB a global emergency; DOTS strategy follows.'],
        ['2012', 'Bedaquiline approved — the first new TB drug class in over 40 years.'],
        ['2022', 'WHO recommends all-oral 6-month BPaLM for drug-resistant TB, replacing 18-month injectable regimens.']
      ]}
    ]},

    { id: 'structure', title: 'Structure and the cell wall', blocks: [
      { t: 'model' },
      { t: 'p', text: 'Almost everything distinctive about tuberculosis traces back to its cell wall. Outside the normal peptidoglycan sits a layer of arabinogalactan, and anchored to that a dense palisade of mycolic acids — long-chain fatty acids 60 to 90 carbons long. This waxy armour is nearly impermeable.' },
      { t: 'ul', title: 'What the wax causes', items: [
        '<b>Acid-fastness.</b> Dyes only enter with heat, and once in they resist decolourisation by acid-alcohol. Hence Ziehl–Neelsen instead of Gram staining.',
        '<b>Slow growth.</b> Nutrients cross the wall slowly. Colonies take 3–8 weeks to appear on solid media.',
        '<b>Intrinsic drug resistance.</b> Most antibiotics simply cannot get in, which is why TB has its own separate pharmacopoeia.',
        '<b>Survival in macrophages.</b> Cord factor (trehalose dimycolate) and other wall lipids block phagosome–lysosome fusion.',
        '<b>Environmental hardiness.</b> Resists drying and many disinfectants, but is killed quickly by UV light and sunlight — which is why ventilation matters so much.'
      ]},
      { t: 'table', head: ['Wall component', 'Role', 'Drug that targets it'], rows: [
        ['Mycolic acids', 'Waxy permeability barrier', 'Isoniazid (via InhA), ethionamide'],
        ['Arabinogalactan', 'Links wax to peptidoglycan', 'Ethambutol (via EmbB)'],
        ['Peptidoglycan', 'Structural mesh', 'Cycloserine, meropenem + clavulanate'],
        ['ATP synthase (membrane)', 'Energy generation', 'Bedaquiline'],
        ['Mycolic acid transport (MmpL3)', 'Exports mycolates', 'Delamanid, pretomanid (also via nitric oxide release)'],
        ['RNA polymerase', 'Transcription', 'Rifampicin (via rpoB)'],
        ['30S ribosome', 'Translation', 'Streptomycin, amikacin'],
        ['DNA gyrase', 'DNA supercoiling', 'Levofloxacin, moxifloxacin']
      ]}
    ]},

    { id: 'microscopy', title: 'Microscopy and culture', blocks: [
      { t: 'micro', kind: 'zn' },
      { t: 'table', head: ['Method', 'How it works', 'Detection limit / time'], rows: [
        ['Ziehl–Neelsen', 'Carbol fuchsin with heat, acid-alcohol decolourisation, methylene blue counterstain. Bacilli appear red on blue.', '≈10,000 bacilli/mL of sputum'],
        ['Auramine–rhodamine fluorescence', 'Bacilli fluoresce yellow-green against a dark field. Scanned at lower magnification, so it is faster and more sensitive.', '≈1,000 bacilli/mL — now the preferred smear method'],
        ['Löwenstein–Jensen (solid, egg-based)', 'Malachite green suppresses other bacteria. Rough, tough, buff colonies.', '3–8 weeks'],
        ['Middlebrook 7H10/7H11 (solid, agar)', 'Transparent, so growth can be read earlier under a microscope.', '2–4 weeks'],
        ['MGIT 960 (liquid)', 'Oxygen-quenched fluorescent sensor at the tube base lights up as bacilli consume oxygen.', '1–3 weeks — the current reference standard']
      ]},
      { t: 'protocol', name: 'zn' },
      { t: 'protocol', name: 'auramine' },
      { t: 'micro', kind: 'lj-plate' },
      { t: 'note', tone: 'info', text: 'Culture remains the reference standard and the only way to get full phenotypic drug susceptibility, but it is slow. Molecular tests have taken over for initial diagnosis precisely because a patient cannot wait six weeks to start treatment.' }
    ]},

    { id: 'pathogenesis', title: 'How it causes disease', blocks: [
      { t: 'steps', items: [
        ['Inhalation', 'Droplet nuclei under 5 µm — produced by coughing, singing or even talking — stay airborne for hours and reach the alveoli directly.'],
        ['Phagocytosis', 'Alveolar macrophages engulf the bacilli, as they are meant to.'],
        ['Survival inside the cell', 'The bacillus blocks fusion of the phagosome with the lysosome, so it is never digested. It multiplies inside the macrophage that swallowed it.'],
        ['Early spread', 'Infected macrophages carry bacilli to hilar lymph nodes, and some seed distant organs through the bloodstream. The lung lesion plus the draining node is the Ghon complex.'],
        ['Granuloma formation', 'After 2–8 weeks, T cell immunity arrives and walls the infection off: a core of infected macrophages, epithelioid and giant cells, surrounded by lymphocytes. The centre becomes caseous — cheese-like necrosis.'],
        ['Latent infection', 'In about 90% of people, the granuloma holds. The person is infected, has a positive skin or IGRA test, feels well and is not infectious.'],
        ['Reactivation', 'If immunity weakens, the granuloma liquefies and ruptures into an airway. Bacilli pour into the sputum and the person becomes infectious. Upper lobes are favoured — the highest oxygen tension.']
      ]},
      { t: 'ul', title: 'What raises the risk of reactivation', items: [
        'HIV — the single strongest factor, raising annual risk from roughly 0.1% to 5–10%.',
        'TNF-α inhibitors, long-term corticosteroids, other immunosuppression.',
        'Diabetes mellitus, roughly a threefold increase.',
        'Silicosis, chronic kidney disease, malnutrition, gastrectomy.',
        'Smoking, heavy alcohol use, crowded or poorly ventilated housing.',
        'Age extremes, and the first two years after infection.'
      ]}
    ]},

    { id: 'clinical', title: 'Clinical signs by site', blocks: [
      { t: 'organs', title: 'Pulmonary TB accounts for about 85% of cases. Extrapulmonary disease is more common in children and in people with HIV.', items: [
        ['Lungs', 'Cough for more than two weeks, sometimes with blood. Fever, drenching night sweats, weight loss, loss of appetite, fatigue. Upper-lobe cavitation on chest X-ray in reactivation disease.'],
        ['Pleura', 'Pleural effusion, usually unilateral, with pleuritic chest pain. Fluid is an exudate with lymphocyte predominance and raised adenosine deaminase.'],
        ['Lymph nodes', 'Scrofula: painless, firm, matted cervical nodes that may break down and discharge through the skin. The commonest extrapulmonary form.'],
        ['Spine', 'Pott disease: back pain, vertebral collapse and gibbus deformity, with a cold abscess that can track along the psoas. Risk of cord compression.'],
        ['Meninges', 'TB meningitis: subacute headache and fever over 1–3 weeks, confusion, cranial nerve palsies. CSF shows high protein, low glucose and lymphocytes. The most lethal form — treat on suspicion.'],
        ['Abdomen', 'Ascites, abdominal pain, ileocaecal thickening that mimics Crohn disease.'],
        ['Kidneys and urinary tract', 'Sterile pyuria — white cells in urine with no growth on routine culture is a classic clue.'],
        ['Miliary / disseminated', 'Blood-borne spread with innumerable 1–2 mm nodules through both lungs, like millet seeds. Seen in infants and in advanced immunosuppression.']
      ]}
    ]},

    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'What it shows', 'Turnaround', 'Note'], rows: [
        ['Xpert MTB/RIF Ultra (CBNAAT)', 'TB DNA plus rifampicin resistance', '< 2 hours', 'WHO-recommended initial test for everyone with presumed TB.'],
        ['Truenat MTB / MTB-Rif Dx', 'Same, on a battery-powered chip', '< 1 hour', 'Developed in India for peripheral labs.'],
        ['Sputum smear (ZN or fluorescence)', 'Acid-fast bacilli', 'Same day', 'Cheap and fast, but misses up to half of cases and cannot show resistance.'],
        ['Liquid culture + DST', 'Live organism, full susceptibility', '1–3 weeks + 1–2 weeks', 'Reference standard.'],
        ['Line probe assay (LPA)', 'Resistance to rifampicin, isoniazid, fluoroquinolones, injectables', '1–2 days', 'Used to build a regimen for drug-resistant TB.'],
        ['Chest radiograph', 'Cavitation, infiltrates, miliary pattern', 'Minutes', 'Sensitive but not specific; increasingly read with AI software for screening.'],
        ['Urine LF-LAM', 'Mycobacterial lipoarabinomannan', '25 minutes', 'Only useful in advanced HIV, where it performs better than sputum tests.'],
        ['Tuberculin skin test (Mantoux)', 'Delayed hypersensitivity', '48–72 hours', 'Shows infection, not disease. Falsely positive after BCG or with environmental mycobacteria.'],
        ['IGRA (QuantiFERON, T-SPOT)', 'Interferon-γ release to TB-specific antigens', '1 day', 'Also infection only, but unaffected by BCG.']
      ]},
      { t: 'note', tone: 'warn', text: 'Neither the skin test nor IGRA can distinguish latent infection from active disease, and both can be negative in severe disease. Never use them to rule out active tuberculosis.' }
    ]},

    { id: 'treatment', title: 'Treatment and drug resistance', blocks: [
      { t: 'table', head: ['Drug', 'Target', 'Resistance gene', 'Main toxicity'], rows: [
        ['Isoniazid (H)', 'Mycolic acid synthesis (InhA); needs activation by catalase-peroxidase', 'katG, inhA', 'Peripheral neuropathy — give pyridoxine; hepatitis'],
        ['Rifampicin (R)', 'DNA-dependent RNA polymerase', 'rpoB', 'Orange urine and tears, hepatitis, many drug interactions'],
        ['Pyrazinamide (Z)', 'Membrane energetics at acid pH; kills bacilli inside granulomas', 'pncA', 'Hepatitis, hyperuricaemia and joint pain'],
        ['Ethambutol (E)', 'Arabinosyl transferase (arabinogalactan)', 'embB', 'Optic neuritis — check colour vision'],
        ['Bedaquiline (Bdq)', 'ATP synthase', 'atpE, Rv0678', 'QT prolongation'],
        ['Pretomanid (Pa)', 'Mycolic acid synthesis and nitric oxide release', 'ddn, fbiA–C', 'Hepatotoxicity'],
        ['Linezolid (Lzd)', '50S ribosome', 'rrl, rplC', 'Myelosuppression, peripheral and optic neuropathy'],
        ['Moxifloxacin / levofloxacin', 'DNA gyrase', 'gyrA, gyrB', 'QT prolongation, tendinopathy']
      ]},
      { t: 'ul', title: 'Standard regimens', items: [
        '<b>Drug-sensitive TB:</b> 2 months of HRZE, then 4 months of HR. A 4-month rifapentine–moxifloxacin regimen is an approved alternative.',
        '<b>TB meningitis or bone disease:</b> extended to 9–12 months, with corticosteroids added for meningitis and pericarditis.',
        '<b>MDR-TB</b> (resistant to at least isoniazid and rifampicin): 6-month all-oral BPaLM — bedaquiline, pretomanid, linezolid and moxifloxacin.',
        '<b>Pre-XDR and XDR-TB:</b> individualised longer regimens guided by full susceptibility testing.',
        '<b>Latent TB infection:</b> 3 months of weekly isoniazid + rifapentine (3HP), or 3 months of daily isoniazid + rifampicin, or 6 months of isoniazid.'
      ]},
      { t: 'note', tone: 'warn', text: 'Resistance in TB is not acquired from other bacteria; there are no resistance plasmids. It arises by spontaneous chromosomal mutation and is then selected by inadequate treatment — too few drugs, poor quality drugs, or a course stopped early. Multi-drug regimens exist because the chance of one bacillus being resistant to four drugs at once is vanishingly small.' }
    ]},

    { id: 'prevention', title: 'Prevention and control', blocks: [
      { t: 'ul', items: [
        '<b>BCG vaccine.</b> A live attenuated <i>M. bovis</i> strain, given at birth in high-burden countries. It reliably prevents miliary TB and TB meningitis in young children. Protection against adult pulmonary TB is inconsistent, from 0 to 80% across trials.',
        '<b>Find and treat cases early.</b> Every month of delay means more transmission; an untreated infectious case infects roughly 10–15 people a year.',
        '<b>Contact investigation</b> and TB preventive treatment for household contacts and people living with HIV.',
        '<b>Airborne infection control:</b> ventilation, upper-room UV germicidal irradiation, negative-pressure rooms, N95 respirators for staff and surgical masks for patients.',
        '<b>Treat the drivers:</b> HIV care, diabetes control, nutrition support, and reducing crowding.',
        '<b>In India:</b> the National TB Elimination Programme provides free diagnosis and treatment, with nutritional support through the Ni-kshay Poshan Yojana.'
      ]},
      { t: 'note', tone: 'info', text: 'M72/AS01<sub>E</sub> is the most advanced new TB vaccine candidate, in phase 3 trials, after a phase 2b trial showed about 50% efficacy against progression to disease in adults with latent infection.' }
    ]},

    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Annual cases', 'About 10.8 million'],
        ['Annual deaths', 'About 1.25 million — again the single deadliest infectious disease worldwide'],
        ['Latent infection', 'Roughly a quarter of the world\'s population'],
        ['Lifetime risk of disease once infected', '5–10% — but 5–10% per year with untreated HIV'],
        ['Drug-resistant TB', 'About 400,000 cases of MDR/RR-TB a year; under half are diagnosed and treated'],
        ['Eight countries', 'Over two-thirds of cases: India, Indonesia, China, the Philippines, Pakistan, Nigeria, Bangladesh and DR Congo'],
        ['India', 'About 26–28% of global cases, the largest share of any country'],
        ['Treatment success', 'About 88% for drug-sensitive TB; around 68% for MDR-TB']
      ]},
      { t: 'note', tone: 'warn', text: 'Check the current WHO Global Tuberculosis Report and the India TB Report before quoting any of these. They are revised every year.' }
    ]},

    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Global Tuberculosis Report', 'https://www.who.int/teams/global-programme-on-tuberculosis-and-lung-health/tb-reports'],
        ['WHO — TB fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/tuberculosis'],
        ['CDC — Tuberculosis', 'https://www.cdc.gov/tb/'],
        ['Central TB Division, India — Ni-kshay and NTEP', 'https://tbcindia.gov.in/'],
        ['Mycobrowser — M. tuberculosis genome annotation', 'https://mycobrowser.epfl.ch/'],
        ['WHO catalogue of mutations conferring drug resistance', 'https://www.who.int/publications/i/item/9789240082410']
      ]}
    ]}
  ]
},

/* ───────────────────────────── COVID-19 ───────────────────────────── */
{
  id: 'covid',
  name: 'COVID-19',
  organism: 'SARS-CoV-2',
  kind: 'virus',
  aka: ['covid', 'covid-19', 'corona', 'coronavirus', 'sars-cov-2', 'sars', 'omicron'],
  tagline: 'A coronavirus with the largest RNA genome known, and a proofreading enzyme that lets it stay that big.',
  hero: 'SARS-CoV-2 enters through ACE2 on respiratory epithelium. Its 29.9 kb genome is nearly twice the size most RNA viruses can manage, held together by a proofreading exonuclease that also blunts some antiviral drugs.',
  quick: [
    ['Pathogen', '<i>Severe acute respiratory syndrome coronavirus 2</i>'],
    ['Baltimore group', 'IV — (+)ssRNA'],
    ['Genome', '≈29.9 kb — the largest of any RNA virus'],
    ['Envelope', 'Yes — with the crown of spikes that names the family'],
    ['Diameter', '80–120 nm'],
    ['Receptor', 'ACE2, primed by TMPRSS2 or furin'],
    ['Incubation', '2–14 days; about 3 days for Omicron lineages'],
    ['R₀', '≈2.9 ancestral; Omicron effective R far higher'],
    ['Infectious period', 'From ~2 days before symptoms to ~8 days after']
  ],
  model: {
    kind: 'virion', radius: 1.3,
    envelope: '#c84a52', spikes: { type: 'club', count: 44, color: '#f0803c' },
    capsid: { shape: 'coil', color: '#4aa3d8' },
    genome: { color: '#3fcf8e', strands: 1 },
    layers: [
      ['envelope', 'Lipid envelope', 'Derived from host membranes. Soap and alcohol destroy it, which is why hand hygiene works.'],
      ['spikes', 'Spike (S) trimers', 'The crown. S1 binds ACE2; S2 drives fusion. The target of every current vaccine.'],
      ['capsid', 'Nucleocapsid (N) protein', 'Wraps the RNA into a helical ribonucleoprotein. The antigen used in some rapid tests.'],
      ['genome', 'RNA genome', 'A single 29.9 kb (+)ssRNA, read directly as mRNA on entry.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and origin', blocks: [
      { t: 'kv', items: [
        ['Order → Family', 'Nidovirales → <i>Coronaviridae</i>'],
        ['Subfamily → Genus', '<i>Orthocoronavirinae</i> → <i>Betacoronavirus</i>'],
        ['Subgenus', '<i>Sarbecovirus</i> — shared with SARS-CoV-1'],
        ['Human coronaviruses', 'Seven: 229E, NL63, OC43, HKU1 (common colds), SARS-CoV-1, MERS-CoV, SARS-CoV-2'],
        ['Closest known relatives', 'Bat sarbecoviruses RaTG13 (≈96% identity) and BANAL-52 from Laos (≈96.8%)'],
        ['First detected', 'Wuhan, China, December 2019']
      ]},
      { t: 'p', text: 'The direct origin is still under investigation. Most virologists favour a spillover from an animal reservoir, likely bats via an intermediate host, with early cases clustering around the Huanan seafood market; a laboratory-related origin has also been proposed and investigated. No consensus has been reached, and you should present it as an open question rather than a settled one.' },
      { t: 'table', head: ['Variant', 'WHO label', 'Notable change'], rows: [
        ['B.1.1.7', 'Alpha (Dec 2020)', 'N501Y — the first clearly more transmissible variant.'],
        ['B.1.351', 'Beta', 'E484K — first significant antibody escape.'],
        ['P.1', 'Gamma', 'Reinfection wave in Manaus, Brazil.'],
        ['B.1.617.2', 'Delta', 'Higher viral loads and more severe disease.'],
        ['B.1.1.529', 'Omicron (Nov 2021)', 'Over 30 spike mutations; major immune escape; shifted to upper airway replication, reducing severity.'],
        ['JN.1 and descendants', 'Omicron descendants', 'Continued antigenic drift; the basis for recent vaccine updates.']
      ]}
    ]},

    { id: 'structure', title: 'Structure and genome', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'tem-corona' },
      { t: 'table', head: ['Protein', 'Role'], rows: [
        ['Spike (S)', 'Trimer. S1 subunit carries the receptor-binding domain that grips ACE2; S2 fuses the membranes. Cleaved by furin and TMPRSS2.'],
        ['Nucleocapsid (N)', 'Binds and packages the RNA; also suppresses host interferon. Abundant, so it is a good rapid-test antigen.'],
        ['Membrane (M)', 'The most abundant protein; shapes the particle.'],
        ['Envelope (E)', 'Small ion channel involved in assembly and release.'],
        ['nsp12 (RdRp)', 'The RNA polymerase. Target of remdesivir and molnupiravir.'],
        ['nsp5 (M<sup>pro</sup>/3CL<sup>pro</sup>)', 'Main protease. Target of nirmatrelvir.'],
        ['nsp14 (ExoN)', 'Proofreading exonuclease — unique among RNA viruses, and why a 30 kb genome is viable.']
      ]},
      { t: 'genome', label: 'SARS-CoV-2 genome, ≈29.9 kb — two-thirds of it is one replicase gene', genes: [
        ['ORF1a', 0.4, 'nsp1–11, including the main protease'],
        ['ORF1b', 0.27, 'nsp12–16: polymerase, helicase, proofreading exonuclease'],
        ['S', 0.13, 'Spike'],
        ['ORF3a', 0.03, 'Accessory, pro-apoptotic'],
        ['E', 0.01, 'Envelope'],
        ['M', 0.02, 'Membrane'],
        ['ORF6/7/8', 0.04, 'Accessory, interferon antagonists'],
        ['N', 0.04, 'Nucleocapsid'],
        ['3′UTR', 0.06, 'Untranslated region']
      ]},
      { t: 'note', tone: 'info', text: 'That proofreading enzyme is also why molnupiravir, which works by forcing mutations, is less potent than it would be against a virus without nsp14 — and why coronaviruses drift more slowly per site than influenza, even though they still change fast enough to need updated vaccines.' }
    ]},

    { id: 'lifecycle', title: 'Replication cycle', blocks: [
      { t: 'steps', items: [
        ['Attachment', 'The spike\'s receptor-binding domain hinges up and binds ACE2 on ciliated airway cells, type II pneumocytes, gut and endothelial cells.'],
        ['Priming and entry', 'Furin pre-cleaves spike during assembly; TMPRSS2 at the surface makes the second cut, allowing fusion straight at the plasma membrane. Without TMPRSS2 the virus enters by endosome instead — Omicron prefers this route, which favours the upper airway.'],
        ['Translation', 'The (+)RNA is read directly by host ribosomes into two huge polyproteins, which the viral proteases cut into 16 non-structural proteins.'],
        ['Replication organelles', 'Those proteins remodel the endoplasmic reticulum into double-membrane vesicles that hide viral RNA from cytoplasmic sensors.'],
        ['RNA synthesis', 'RdRp makes a full-length negative-sense template, then new genomes plus a nested set of subgenomic mRNAs for the structural proteins.'],
        ['Assembly', 'N wraps the genome; S, M and E are inserted into the ER–Golgi membrane; particles bud into that compartment.'],
        ['Release', 'Virions exit through lysosomal trafficking rather than the classical secretory pathway.']
      ]}
    ]},

    { id: 'transmission', title: 'Transmission', blocks: [
      { t: 'ul', items: [
        '<b>Airborne.</b> Inhalation of respiratory aerosols is the dominant route. Fine particles stay suspended and accumulate in poorly ventilated indoor spaces.',
        '<b>Droplets</b> at close range, and direct deposition on mucous membranes.',
        '<b>Fomites</b> are possible but contribute little in practice.',
        '<b>Presymptomatic spread</b> — a large share of transmission happens before symptoms begin, which is what made containment so difficult.',
        '<b>Superspreading.</b> Transmission is highly overdispersed: a minority of infections cause most onward cases, usually in crowded indoor settings.'
      ]},
      { t: 'kv', items: [
        ['Incubation', '2–14 days; median about 3 days for recent Omicron lineages'],
        ['Serial interval', '≈3–4 days (Omicron)'],
        ['Peak infectiousness', 'The day before to 2–3 days after symptom onset'],
        ['Secondary attack rate, household', 'Roughly 40–50% for Omicron in unvaccinated households']
      ]}
    ]},

    { id: 'pathogenesis', title: 'How it causes disease', blocks: [
      { t: 'p', text: 'Mild COVID-19 is an upper airway infection. Severe COVID-19 is largely an immune and vascular disease. Around day 7–10, in a minority of patients, the virus reaches type II pneumocytes in the alveoli and triggers diffuse alveolar damage, while a dysregulated inflammatory response and widespread microthrombosis impair gas exchange. That split explains why antivirals must be given early and immunomodulators late.' },
      { t: 'table', head: ['Phase', 'Days', 'Dominant process', 'What helps'], rows: [
        ['Early infection', '0–5', 'Viral replication in the upper airway', 'Antivirals — nirmatrelvir/ritonavir, remdesivir'],
        ['Pulmonary phase', '5–10', 'Lower airway involvement, hypoxia', 'Oxygen, dexamethasone, antivirals may still help'],
        ['Hyperinflammatory phase', '> 7–10', 'Cytokine response, thrombosis, ARDS', 'Dexamethasone, tocilizumab or baricitinib, anticoagulation, ventilatory support']
      ]},
      { t: 'ul', title: 'Risk factors for severe disease', items: ['Age — by far the strongest, with risk rising steeply over 65', 'Obesity, diabetes, chronic kidney, lung, liver or heart disease', 'Immunosuppression, including transplant and active cancer treatment', 'Pregnancy', 'Being unvaccinated and never previously infected'] }
    ]},

    { id: 'clinical', title: 'Clinical features', blocks: [
      { t: 'organs', items: [
        ['Respiratory', 'Fever, dry cough, sore throat, breathlessness. Hypoxia can be silent — oxygen saturation low while the patient feels reasonably well.'],
        ['Head and neck', 'Loss of smell and taste, prominent with earlier variants and less so with Omicron. Headache, hoarseness.'],
        ['Gastrointestinal', 'Nausea, vomiting, diarrhoea, abdominal pain — more common in children.'],
        ['Skin', 'Chilblain-like "COVID toes", urticaria, maculopapular rashes.'],
        ['Vascular', 'Venous thromboembolism, pulmonary embolism, stroke. Raised D-dimer predicts poor outcome.'],
        ['Children', 'Usually mild. Rarely, 2–6 weeks later, MIS-C: fever, rash, conjunctivitis, shock and coronary artery changes.'],
        ['Long COVID', 'Fatigue, breathlessness, brain fog, post-exertional malaise and autonomic symptoms persisting beyond 12 weeks. Affects roughly 5–10% of infections, less after vaccination.']
      ]}
    ]},

    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'SARS-CoV-2 is diagnosed by PCR, not by microscopy. Electron microscopy still matters for two reasons: it is how the virus was characterised within days of the first cases, and it remains the method that shows a coronavirus is a coronavirus when the agent is unknown. Immunofluorescence on respiratory epithelial cells is used in autopsy and research work to show which cells were actually infected.' },
      { t: 'protocol', name: 'negstain' },
      { t: 'protocol', name: 'ift' },
      { t: 'note', tone: 'info', text: 'A caution that came out of 2020: subcellular structures \\u2014 coated vesicles, multivesicular bodies, rough endoplasmic reticulum in cross-section \\u2014 were repeatedly misreported as coronavirus particles in published electron micrographs. A genuine virion has a defined diameter, an electron-dense ribonucleoprotein interior and a surface fringe of spikes, and it must be found outside the cell or inside a membrane-bound compartment.' }
    ]},

    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'Detects', 'Time', 'Note'], rows: [
        ['RT-PCR', 'Viral RNA (E, N, ORF1ab targets)', '1–6 hours', 'Reference standard. Can stay positive for weeks after recovery — a positive PCR is not proof of infectiousness.'],
        ['Rapid antigen test', 'N protein', '15 minutes', 'Good at high viral loads, so useful for "am I infectious today". Repeat after 48 hours if negative and symptomatic.'],
        ['RT-LAMP', 'Viral RNA, isothermal', '30 minutes', 'No thermal cycler needed.'],
        ['Whole genome sequencing', 'Lineage and mutations', 'Days', 'Variant surveillance, not patient care.'],
        ['Anti-N antibodies', 'Past infection', '—', 'Not raised by spike-only vaccines, so it distinguishes infection from vaccination.'],
        ['Anti-S antibodies', 'Infection or vaccination', '—', 'Does not reliably predict protection; no agreed correlate of protection exists.']
      ]},
      { t: 'note', tone: 'info', text: 'Cycle threshold (Ct) values roughly track viral load, but they depend on assay, sample quality and timing. They are not a standardised measure and should not be reported to patients as a severity score.' }
    ]},

    { id: 'treatment', title: 'Treatment and drug targets', blocks: [
      { t: 'table', head: ['Drug', 'Target', 'When', 'Caution'], rows: [
        ['Nirmatrelvir + ritonavir (Paxlovid)', 'Main protease (nsp5)', 'Within 5 days of onset, high-risk outpatients', 'Many drug interactions through ritonavir'],
        ['Remdesivir', 'RdRp (nsp12)', 'Early outpatient course or in hospital', 'Intravenous'],
        ['Molnupiravir', 'RdRp — lethal mutagenesis', 'Alternative when the others cannot be used', 'Lower efficacy; avoid in pregnancy'],
        ['Dexamethasone', 'Host inflammation', 'Only in patients needing oxygen', 'Harmful if given early without hypoxia'],
        ['Tocilizumab / baricitinib', 'IL-6 receptor / JAK', 'Rapidly progressing severe disease', 'Added to steroids'],
        ['Anticoagulation', 'Thrombosis', 'Per protocol in hospital', 'Dose depends on severity']
      ]},
      { t: 'note', tone: 'warn', text: 'Monoclonal antibodies against spike — casirivimab, sotrovimab, bebtelovimab and others — were effective against earlier variants and have lost activity against current ones. Treatment guidance changes with the circulating lineages; check the current NIH or WHO living guideline.' }
    ]},

    { id: 'prevention', title: 'Prevention', blocks: [
      { t: 'table', head: ['Vaccine platform', 'Examples', 'How it works'], rows: [
        ['mRNA', 'Comirnaty (Pfizer–BioNTech), Spikevax (Moderna)', 'Lipid nanoparticle delivers modified mRNA; your cells make spike protein.'],
        ['Viral vector', 'Covishield / Vaxzevria, Janssen, Sputnik V', 'A harmless adenovirus carries the spike gene.'],
        ['Protein subunit', 'Novavax, Corbevax', 'Purified spike protein with an adjuvant.'],
        ['Inactivated whole virus', 'Covaxin, Sinovac, Sinopharm', 'Killed virus; broader antigen set, generally lower neutralising titres.'],
        ['Intranasal', 'iNCOVACC (India)', 'Aims at mucosal immunity to reduce transmission.']
      ]},
      { t: 'ul', title: 'Non-pharmaceutical measures, ranked by how much they do', items: [
        'Ventilation and air filtration — the highest-value indoor intervention.',
        'Well-fitted respirators (N95/FFP2) for the wearer; surgical masks mainly limit what you emit.',
        'Staying home when symptomatic.',
        'Avoiding crowded, poorly ventilated indoor spaces during a wave.',
        'Hand hygiene — useful generally, but minor for an airborne virus.'
      ]},
      { t: 'note', tone: 'info', text: 'Vaccines now protect strongly against severe disease and death, and only briefly against infection, because the virus keeps drifting and mucosal immunity wanes. That is why boosters are targeted at older and clinically vulnerable people rather than everyone.' }
    ]},

    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Confirmed cases', 'Over 770 million reported — true infections are several times higher'],
        ['Reported deaths', 'About 7 million'],
        ['Excess mortality estimate', 'Roughly 18–28 million in 2020–21, far above reported deaths'],
        ['Infection fatality rate', 'Strongly age-dependent: under 0.01% in children, over 5% above age 80 before vaccination'],
        ['Current status', 'No longer a public health emergency of international concern (declared over in May 2023), but circulating year-round with periodic waves'],
        ['Surveillance', 'Now largely wastewater monitoring and sentinel hospital reporting rather than mass testing']
      ]}
    ]},

    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — COVID-19 dashboard and situation reports', 'https://data.who.int/dashboards/covid19'],
        ['CDC — COVID-19', 'https://www.cdc.gov/covid/'],
        ['Our World in Data — COVID-19 data explorer', 'https://ourworldindata.org/coronavirus'],
        ['Nextstrain — real-time SARS-CoV-2 phylogeny', 'https://nextstrain.org/ncov/gisaid/global'],
        ['NIH — COVID-19 treatment guidelines archive', 'https://www.covid19treatmentguidelines.nih.gov/'],
        ['ViralZone — SARS-CoV-2', 'https://viralzone.expasy.org/9056']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Influenza ───────────────────────────── */
{
  id: 'flu',
  name: 'Influenza',
  organism: 'Influenza A, B, C and D viruses',
  kind: 'virus',
  aka: ['flu', 'influenza', 'h1n1', 'h5n1', 'bird flu', 'swine flu', 'orthomyxovirus'],
  tagline: 'A segmented genome that lets two viruses swap whole genes in one cell — which is how pandemics begin.',
  hero: 'Influenza carries its genome in eight separate pieces. Small copying errors cause the annual drift that forces a new vaccine each year; wholesale swapping of segments between human and animal strains causes the sudden shifts that cause pandemics.',
  quick: [
    ['Pathogen', '<i>Alphainfluenzavirus</i> (A), <i>Betainfluenzavirus</i> (B), C and D'],
    ['Baltimore group', 'V — (−)ssRNA, segmented'],
    ['Genome', '8 segments, ≈13.5 kb total (A and B)'],
    ['Envelope', 'Yes — studded with HA and NA'],
    ['Diameter', '80–120 nm; filamentous forms in clinical isolates'],
    ['Receptor', 'Sialic acid — α2,6 in the human upper airway, α2,3 in birds and the human deep lung'],
    ['Incubation', '1–4 days'],
    ['R₀', '1.2–1.8 seasonal; ≈1.8 for 1918'],
    ['Unusual feature', 'Replicates in the nucleus, which is rare for an RNA virus']
  ],
  model: {
    kind: 'virion', radius: 1.3,
    envelope: '#4f7fd4', spikes: { type: 'club', count: 34, color: '#f2a93b' },
    spikes2: { type: 'knob', count: 12, color: '#e05b8a' },
    capsid: { shape: 'segments', color: '#8ad4e8' },
    genome: { color: '#35c6a8', strands: 8 },
    layers: [
      ['envelope', 'Lipid envelope + M1 matrix', 'M1 lines the inside and drives budding; M2 is a proton channel that lets the core uncoat.'],
      ['spikes', 'Haemagglutinin (HA)', 'About 80% of spikes. Binds sialic acid and drives fusion. Defines H1–H18.'],
      ['spikes2', 'Neuraminidase (NA)', 'Cleaves sialic acid so new virions can escape. Defines N1–N11 and is the target of oseltamivir.'],
      ['genome', '8 RNA segments', 'Each a separate ribonucleoprotein with its own polymerase complex. The basis of reassortment.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and naming', blocks: [
      { t: 'table', head: ['Type', 'Hosts', 'Behaviour'], rows: [
        ['Influenza A', 'Humans, birds, pigs, horses, bats, marine mammals', 'Subtyped by HA and NA. The only type that causes pandemics. Wild aquatic birds are the natural reservoir.'],
        ['Influenza B', 'Humans, seals', 'Two lineages, Victoria and Yamagata. Yamagata has not been detected since 2020 and has been dropped from vaccines.'],
        ['Influenza C', 'Humans, pigs', 'Mild respiratory illness, mostly in children. Seven genome segments, not eight.'],
        ['Influenza D', 'Cattle, pigs', 'No confirmed human disease.']
      ]},
      { t: 'kv', items: [
        ['Strain naming', 'Type / host if non-human / place of isolation / strain number / year (HxNy)'],
        ['Example', 'A/California/07/2009 (H1N1) — the 2009 pandemic strain'],
        ['Example', 'A/Goose/Guangdong/1/1996 (H5N1) — ancestor of current avian strains'],
        ['Subtypes in humans', 'Currently A(H1N1)pdm09 and A(H3N2), plus influenza B/Victoria'],
        ['Zoonotic strains of concern', 'H5N1 clade 2.3.4.4b, H5N6, H7N9, H9N2']
      ]},
      { t: 'timeline', items: [
        ['1918–19', '"Spanish" H1N1. Roughly 50 million deaths, with unusual mortality in healthy young adults.'],
        ['1933', 'Human influenza virus first isolated, by Smith, Andrewes and Laidlaw.'],
        ['1957–58', 'H2N2 "Asian flu" pandemic, from reassortment with an avian virus.'],
        ['1968', 'H3N2 "Hong Kong flu" pandemic. H3N2 still circulates.'],
        ['1977', 'H1N1 reappears — genetically frozen since the 1950s, probably a laboratory escape.'],
        ['1997', 'H5N1 infects humans in Hong Kong; 6 of 18 die.'],
        ['2009', 'H1N1pdm09 pandemic from a quadruple-reassortant swine virus.'],
        ['2021→', 'H5N1 clade 2.3.4.4b spreads worldwide in wild birds, then into poultry, mammals and US dairy cattle.']
      ]}
    ]},

    { id: 'structure', title: 'Structure and genome', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'tem-flu' },
      { t: 'p', text: 'HA and NA do opposite jobs with the same molecule. HA binds sialic acid to get in; NA cuts sialic acid to get out. Their activities have to stay balanced, which is one constraint on how far a new virus can drift.' },
      { t: 'table', head: ['Segment', 'Encodes', 'Function'], rows: [
        ['1 — PB2', 'Polymerase basic 2', 'Snatches the 5′ cap from host mRNA. The E627K mutation here is a key marker of mammalian adaptation.'],
        ['2 — PB1', 'Polymerase basic 1 (+ PB1-F2)', 'The catalytic polymerase subunit. PB1-F2 promotes cell death.'],
        ['3 — PA', 'Polymerase acidic', 'Endonuclease that cuts the stolen cap. Target of baloxavir.'],
        ['4 — HA', 'Haemagglutinin', 'Receptor binding and fusion. The main antibody target.'],
        ['5 — NP', 'Nucleoprotein', 'Coats the RNA; determines the type (A vs B).'],
        ['6 — NA', 'Neuraminidase', 'Releases progeny virions. Target of oseltamivir and zanamivir.'],
        ['7 — M', 'M1 matrix, M2 ion channel', 'M2 is the target of amantadine, now almost universally resistant.'],
        ['8 — NS', 'NS1, NEP', 'NS1 blocks the host interferon response.']
      ]},
      { t: 'note', tone: 'warn', text: '<b>Drift vs shift.</b> Antigenic <i>drift</i> is gradual point mutation in HA and NA, and it is why the vaccine is reformulated every year. Antigenic <i>shift</i> is the exchange of whole segments when two influenza A viruses infect the same cell — in a pig, a bird or a person. Shift can produce an HA the human population has never seen, and that is how a pandemic starts.' }
    ]},

    { id: 'lifecycle', title: 'Replication cycle', blocks: [
      { t: 'steps', items: [
        ['Attachment', 'HA binds sialic acid on respiratory epithelium. Human strains prefer α2,6 linkages in the upper airway; avian strains prefer α2,3, which in humans are deep in the lung — which is why H5N1 causes severe pneumonia but transmits poorly.'],
        ['Endocytosis and uncoating', 'The virus is taken into an endosome. Acidification opens the M2 proton channel, acidifying the core so M1 releases the ribonucleoproteins; low pH also springs HA open to fuse the membranes.'],
        ['Nuclear import', 'The eight ribonucleoproteins are imported into the nucleus — unusual for an RNA virus, and the reason influenza depends on host splicing.'],
        ['Cap-snatching', 'PB2 grabs the 5′ cap from a host mRNA and PA cuts it off; the stolen cap primes viral transcription.'],
        ['Replication and export', 'Full-length copies are made and new ribonucleoproteins are exported by NEP and M1.'],
        ['Assembly', 'A packaging signal on each segment ensures one copy of all eight is included — most particles fail, which is why influenza preparations have a high particle-to-infectivity ratio.'],
        ['Release', 'NA cleaves sialic acid from the cell surface and from the virion\'s own glycans, freeing progeny that would otherwise clump at the membrane.']
      ]}
    ]},

    { id: 'transmission', title: 'Transmission and seasonality', blocks: [
      { t: 'ul', items: [
        'Respiratory aerosols and droplets; contact with contaminated surfaces contributes less.',
        'Infectious from about one day before symptoms until 5–7 days after; longer in children and immunocompromised people.',
        'Temperate zones have sharp winter epidemics. Cold dry air stabilises the virion and impairs mucociliary clearance; indoor crowding and lower vitamin D also contribute.',
        'Tropical regions, including much of India, see year-round circulation with peaks around the monsoon.',
        'Children are the main amplifiers of community transmission; school closures measurably slow epidemics.'
      ]},
      { t: 'note', tone: 'warn', text: 'Avian H5N1 currently transmits from birds and infected mammals to humans, but not efficiently between humans. The mutations that would change that — particularly a switch to α2,6 receptor preference plus polymerase adaptation — are the single most watched question in pandemic preparedness.' }
    ]},

    { id: 'clinical', title: 'Clinical features and complications', blocks: [
      { t: 'p', text: 'Classic influenza starts abruptly. Patients can often name the hour their symptoms began, which distinguishes it from the gradual onset of a common cold.' },
      { t: 'organs', items: [
        ['Systemic', 'Sudden fever, severe myalgia, headache, profound fatigue. Fever usually lasts 3 days; fatigue can last two weeks.'],
        ['Respiratory', 'Dry cough, sore throat, nasal congestion. Cough is often the last symptom to go.'],
        ['Children', 'Higher fevers, vomiting and diarrhoea, otitis media, febrile convulsions.'],
        ['Primary viral pneumonia', 'Rapid progression to hypoxia and ARDS. Uncommon but highly lethal.'],
        ['Secondary bacterial pneumonia', 'Recovery, then worsening around day 5–7. Usually <i>Streptococcus pneumoniae</i>, <i>Staphylococcus aureus</i> or <i>Haemophilus influenzae</i>. This caused most 1918 deaths.'],
        ['Cardiac', 'Myocarditis, and a well-documented spike in heart attacks and strokes in the week after infection.'],
        ['Neurological', 'Encephalitis, Guillain–Barré syndrome, and Reye syndrome if aspirin is given to children — never give aspirin to a child with a viral illness.'],
        ['Pregnancy', 'Markedly increased risk of severe disease, especially in the third trimester.']
      ]}
    ]},

    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'Immunofluorescence on nasopharyngeal epithelial cells was the standard rapid influenza test for decades, and it still demonstrates the principle better than any molecular method: the chemistry cannot tell one respiratory virus from another, so the specificity has to come from an antibody. Negative-stain electron microscopy shows the pleomorphic particles and the dense spike fringe that distinguishes an orthomyxovirus.' },
      { t: 'protocol', name: 'negstain' },
      { t: 'protocol', name: 'ift' },
      { t: 'note', tone: 'info', text: 'Influenza\'s nucleoprotein shuttles, so the fluorescence pattern carries information: nuclear early in infection, cytoplasmic later. That is a direct consequence of influenza being one of the very few RNA viruses that replicates in the nucleus.' }
    ]},

    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'Detects', 'Time', 'Note'], rows: [
        ['RT-PCR', 'Viral RNA, with typing and subtyping', '1–6 hours', 'Reference standard; multiplex panels test for several respiratory viruses at once.'],
        ['Rapid molecular assay', 'Viral RNA', '15–30 minutes', 'Near-patient, good sensitivity.'],
        ['Rapid antigen test (RIDT)', 'NP antigen', '10–15 minutes', 'Fast but only 50–70% sensitive. A negative result in flu season does not rule it out.'],
        ['Viral culture (MDCK cells)', 'Live virus', '3–10 days', 'Needed for vaccine strain selection and antigenic characterisation.'],
        ['Haemagglutination inhibition', 'Antigenic relatedness', 'Days', 'How WHO decides whether a circulating strain has drifted from the vaccine.'],
        ['Sequencing', 'Genotype, resistance markers', 'Days', 'Surveillance through GISAID and Nextstrain.']
      ]}
    ]},

    { id: 'treatment', title: 'Treatment and drug targets', blocks: [
      { t: 'table', head: ['Drug', 'Target', 'Dose and timing', 'Note'], rows: [
        ['Oseltamivir', 'Neuraminidase', 'Oral, 5 days, start within 48 hours', 'The workhorse. Shortens illness by about a day; the case for benefit is stronger in high-risk and hospitalised patients.'],
        ['Zanamivir', 'Neuraminidase', 'Inhaled', 'Avoid in asthma and COPD.'],
        ['Peramivir', 'Neuraminidase', 'Single intravenous dose', 'For patients who cannot take oral drugs.'],
        ['Baloxavir marboxil', 'PA cap-snatching endonuclease', 'Single oral dose', 'Drops viral shedding faster than oseltamivir; resistance (PA I38T) can emerge during treatment.'],
        ['Amantadine / rimantadine', 'M2 ion channel', '—', 'No longer recommended. Resistance is near universal in circulating A strains.']
      ]},
      { t: 'ul', title: 'Supportive care', items: ['Fluids, rest, paracetamol or ibuprofen for fever', 'Oxygen and ventilatory support in severe disease', 'Antibiotics only for proven or strongly suspected bacterial superinfection', 'No aspirin in anyone under 18'] }
    ]},

    { id: 'prevention', title: 'Prevention and the annual vaccine', blocks: [
      { t: 'p', text: 'WHO convenes twice a year — February for the northern hemisphere, September for the southern — and chooses strains based on global surveillance. Manufacture takes about six months, so the choice is a forecast. When it matches, effectiveness is roughly 40–60%; when H3N2 drifts after the decision, or changes during egg-based manufacture, it can fall well below that.' },
      { t: 'table', head: ['Vaccine type', 'How it is made', 'Who it suits'], rows: [
        ['Inactivated, egg-based quadrivalent/trivalent', 'Grown in embryonated hens\' eggs, then killed and split', 'The standard vaccine worldwide'],
        ['Cell-culture inactivated', 'Grown in MDCK cells', 'Avoids egg-adaptation mutations and egg allergy'],
        ['Recombinant HA (Flublok)', 'HA protein made in insect cells', 'No egg, higher antigen dose'],
        ['High-dose / adjuvanted', 'Four times the antigen, or MF59 adjuvant', 'Adults 65 and over'],
        ['Live attenuated, intranasal', 'Cold-adapted virus', 'Children; not for immunocompromised people or pregnancy']
      ]},
      { t: 'ul', title: 'Other measures', items: [
        'Annual vaccination for everyone over 6 months, and especially for older adults, pregnant women, children under 5, health workers and people with chronic disease.',
        'Antiviral prophylaxis for outbreak control in care homes.',
        'Pneumococcal vaccination, which cuts the deadliest complication.',
        'Hand hygiene, respiratory etiquette, staying home when ill, and ventilation.',
        'Poultry biosecurity and culling for avian strains, plus surveillance in pigs — the classic "mixing vessel".'
      ]}
    ]},

    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Annual cases', 'About a billion worldwide, of which 3–5 million are severe'],
        ['Annual deaths', 'Roughly 290,000–650,000 respiratory deaths'],
        ['Attack rate', '5–10% of adults and 20–30% of children each season'],
        ['Highest mortality', 'Adults over 65, who account for most seasonal deaths'],
        ['Pandemics of the last century', '1918 H1N1, 1957 H2N2, 1968 H3N2, 2009 H1N1'],
        ['H5N1 human cases since 2003', 'Around 950 reported, with a case fatality around 50% — though mild cases are likely undercounted']
      ]}
    ]},

    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Influenza (seasonal) fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/influenza-(seasonal)'],
        ['WHO — Global Influenza Programme and FluNet', 'https://www.who.int/tools/flunet'],
        ['CDC — Influenza', 'https://www.cdc.gov/flu/'],
        ['Nextstrain — seasonal influenza phylogenies', 'https://nextstrain.org/flu'],
        ['ViralZone — Orthomyxoviridae', 'https://viralzone.expasy.org/6'],
        ['WOAH — avian influenza situation reports', 'https://www.woah.org/en/disease/avian-influenza/']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Hepatitis B ───────────────────────────── */
{
  id: 'hbv',
  name: 'Hepatitis B',
  organism: 'Hepatitis B virus',
  kind: 'virus',
  aka: ['hep b', 'hbv', 'hepatitis', 'hepatitis b', 'hbsag', 'jaundice', 'liver'],
  tagline: 'A DNA virus that replicates through RNA, and leaves a mini-chromosome in the nucleus that no current drug can remove.',
  hero: 'HBV is the smallest DNA virus infecting humans and the only one that uses reverse transcriptase. Its covalently closed circular DNA persists in the hepatocyte nucleus for life, which is why chronic infection can be suppressed but almost never cured.',
  quick: [
    ['Pathogen', '<i>Hepatitis B virus</i>, genus <i>Orthohepadnavirus</i>'],
    ['Baltimore group', 'VII — partially dsDNA with reverse transcription'],
    ['Genome', '3.2 kb partially double-stranded circular DNA — the smallest human DNA virus'],
    ['Envelope', 'Yes — carries HBsAg'],
    ['Diameter', '42 nm (Dane particle)'],
    ['Receptor', 'NTCP (sodium taurocholate co-transporting polypeptide)'],
    ['Incubation', '60–150 days, average about 90'],
    ['Environmental survival', 'At least 7 days on surfaces, still infectious'],
    ['Infectivity', 'Roughly 50–100 times more infectious than HIV per exposure']
  ],
  model: {
    kind: 'virion', radius: 1.2,
    envelope: '#e0a23c', spikes: { type: 'knob', count: 40, color: '#f4d58d' },
    capsid: { shape: 'icosa', color: '#b5508f' },
    genome: { color: '#4fb3e8', strands: 1, circular: true },
    layers: [
      ['envelope', 'Envelope with HBsAg', 'Surface antigen in three forms (L, M, S). Made in vast excess and shed as empty 22 nm spheres and filaments that soak up antibody.'],
      ['spikes', 'HBsAg projections', 'The antigen used both for diagnosis and as the vaccine.'],
      ['capsid', 'Nucleocapsid (HBcAg)', 'An icosahedral core of 120 dimers. Anti-HBc IgM marks recent infection.'],
      ['genome', 'Relaxed circular DNA + polymerase', 'Partially double-stranded: one complete negative strand and an incomplete positive strand, with the polymerase covalently attached.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and discovery', blocks: [
      { t: 'kv', items: [
        ['Family → Genus', '<i>Hepadnaviridae</i> → <i>Orthohepadnavirus</i>'],
        ['Species', '<i>Hepatitis B virus</i>'],
        ['Genotypes', 'A–J, with distinct geography. Genotype C is associated with later HBeAg seroconversion and higher liver cancer risk; genotypes A and D predominate in India.'],
        ['Related viruses', 'Woodchuck and duck hepatitis B viruses — the classic animal models.'],
        ['Unrelated despite the name', 'Hepatitis A (picornavirus), C (flavivirus), E (hepevirus). Hepatitis D is a defective satellite that needs HBsAg to assemble.']
      ]},
      { t: 'timeline', items: [
        ['1965', 'Baruch Blumberg identifies the "Australia antigen" in an Aboriginal Australian donor — later shown to be HBsAg. Nobel Prize 1976.'],
        ['1970', 'Dane visualises the complete virion by electron microscopy.'],
        ['1982', 'First hepatitis B vaccine — purified from the plasma of chronic carriers.'],
        ['1986', 'Recombinant yeast-derived vaccine replaces it; the first recombinant vaccine for any disease.'],
        ['1991', 'WHO recommends universal infant vaccination.'],
        ['2012', 'NTCP identified as the receptor, after 40 years of searching.'],
        ['2020', 'Bulevirtide, an entry inhibitor, approved in Europe for hepatitis D.']
      ]},
      { t: 'note', tone: 'info', text: 'The hepatitis B vaccine was the first vaccine shown to prevent a human cancer. Taiwan\'s universal infant programme cut childhood liver cancer by about 70% within two decades.' }
    ]},

    { id: 'structure', title: 'Structure and genome', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'tem-hbv' },
      { t: 'p', text: 'Blood from an infected person contains three kinds of particle: complete 42 nm Dane particles, plus a huge excess — up to 10,000-fold — of empty 22 nm spheres and filaments made only of surface antigen. Those decoys absorb neutralising antibody and are what the original plasma-derived vaccine was purified from.' },
      { t: 'genome', label: 'HBV genome, 3.2 kb — four overlapping reading frames on an extremely compact circle', genes: [
        ['preS1/preS2/S', 0.34, 'The three forms of surface antigen (L, M, S)'],
        ['preC/C', 0.22, 'Core antigen (HBcAg) and secreted e antigen (HBeAg)'],
        ['P (polymerase)', 0.3, 'Reverse transcriptase, RNase H and terminal protein — overlaps every other gene'],
        ['X', 0.14, 'HBx: transactivator, degrades the Smc5/6 restriction complex, strongly linked to carcinogenesis']
      ]},
      { t: 'note', tone: 'info', text: 'Every base of this genome is coding, and the polymerase gene overlaps all the others. A mutation that creates drug resistance in the polymerase therefore often changes the surface antigen too — sometimes producing a vaccine-escape variant at the same time.' }
    ]},

    { id: 'lifecycle', title: 'Replication cycle', blocks: [
      { t: 'steps', items: [
        ['Attachment', 'The preS1 domain of large HBsAg binds NTCP, a bile-salt transporter found almost only on hepatocytes. That restricted distribution is why HBV infects the liver and nothing else.'],
        ['Uncoating and nuclear delivery', 'The capsid travels to the nuclear pore and releases the relaxed circular DNA into the nucleus.'],
        ['cccDNA formation', 'Host enzymes repair the gap and remove the attached polymerase, producing covalently closed circular DNA — a stable mini-chromosome wrapped in histones.'],
        ['Transcription', 'Host RNA polymerase II transcribes cccDNA into several mRNAs, including a 3.5 kb pregenomic RNA.'],
        ['Encapsidation', 'Pregenomic RNA plus the viral polymerase is packaged inside a new core particle.'],
        ['Reverse transcription inside the capsid', 'The polymerase copies the RNA into DNA within the sealed core — the step shared with retroviruses, and the target of tenofovir and entecavir.'],
        ['Two fates', 'Some cores return to the nucleus to top up the cccDNA pool; others acquire an envelope and are secreted as new virions.']
      ]},
      { t: 'note', tone: 'warn', text: 'cccDNA is the reason a cure is so hard. Nucleoside analogues stop new DNA being made but do not touch the existing mini-chromosome, so the virus rebounds if treatment stops. HBV DNA fragments can also integrate into host chromosomes, which contributes to cancer and keeps HBsAg being produced even when replication is suppressed.' }
    ]},

    { id: 'transmission', title: 'Transmission', blocks: [
      { t: 'table', head: ['Route', 'Importance', 'Notes'], rows: [
        ['Perinatal (mother to child)', 'Dominant in Asia and Africa', 'Without prophylaxis, 70–90% of babies of HBeAg-positive mothers are infected — and about 90% of those become chronic carriers.'],
        ['Early childhood horizontal spread', 'Important in high-prevalence settings', 'Through cuts, scratches and shared household items.'],
        ['Sexual contact', 'Dominant in low-prevalence settings', 'Highly efficient; HBV is far more transmissible than HIV.'],
        ['Blood and injecting drug use', 'Ongoing', 'Shared needles, unsafe injections, unscreened transfusion.'],
        ['Healthcare and occupational', 'Significant', 'Needlestick risk roughly 6–30% from an HBeAg-positive source — hence vaccination of all health workers.'],
        ['Non-medical', 'Occasional', 'Unsterile tattooing, piercing, shared razors or toothbrushes.']
      ]},
      { t: 'note', tone: 'warn', text: 'Age at infection decides the outcome more than anything else. Infected as a newborn: about 90% become chronic. Infected between 1 and 5: 25–50%. Infected as an adult: under 5%. That single fact is why the birth dose of vaccine matters so much.' }
    ]},

    { id: 'clinical', title: 'Clinical course and serology', blocks: [
      { t: 'organs', title: 'Phases of chronic infection', items: [
        ['Acute hepatitis B', 'After 2–3 months: fatigue, anorexia, nausea, right upper quadrant pain, then jaundice with dark urine and pale stools. Under 1% develop fulminant hepatic failure. Most adults clear it.'],
        ['HBeAg-positive chronic infection', 'High viral load, normal ALT, minimal inflammation. Formerly called immune tolerance. Highly infectious.'],
        ['HBeAg-positive chronic hepatitis', 'Immune attack begins: ALT flares, active inflammation, fibrosis develops. May end in HBeAg seroconversion.'],
        ['HBeAg-negative chronic infection', 'Low viral load, normal ALT, inactive carrier state. Needs lifelong monitoring, not treatment.'],
        ['HBeAg-negative chronic hepatitis', 'Precore mutants replicate without making HBeAg. Fluctuating ALT and viral load, progressive fibrosis.'],
        ['Cirrhosis and liver cancer', 'About 20–30% of chronic carriers develop cirrhosis or hepatocellular carcinoma. HBV can cause liver cancer even without cirrhosis, through integration and HBx.'],
        ['Extrahepatic disease', 'Polyarteritis nodosa and membranous glomerulonephritis from immune complexes.']
      ]},
      { t: 'table', head: ['Marker', 'What it means'], rows: [
        ['HBsAg', 'Current infection. Positive beyond 6 months defines chronic infection.'],
        ['Anti-HBs', 'Immunity — from recovery or from vaccination. Protective above 10 mIU/mL.'],
        ['Anti-HBc IgM', 'Recent or acute infection. The only marker positive in the window period.'],
        ['Anti-HBc total', 'Past or present infection. Never produced by vaccination, so it separates the two.'],
        ['HBeAg', 'Active replication and high infectivity.'],
        ['Anti-HBe', 'Lower replication, usually after seroconversion.'],
        ['HBV DNA', 'Quantified viral load — guides treatment decisions.']
      ]},
      { t: 'note', tone: 'info', text: 'Read the panel as a set, not one line at a time. HBsAg+ with anti-HBc IgM+ is acute. HBsAg+ for over six months with anti-HBc IgG is chronic. Anti-HBs+ alone, with no anti-HBc, means vaccinated. Anti-HBs+ with anti-HBc+ means recovered from natural infection.' }
    ]},

    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'Hepatitis B is the one virus on this site with a classical histochemical stain of its own. Surface antigen accumulates in such quantity inside the hepatocyte that it can be demonstrated directly in a liver section, and it changes how the cell looks on a routine H&E. Serum, meanwhile, carries enough particles to be examined by negative-stain electron microscopy without any concentration step.' },
      { t: 'protocol', name: 'orcein' },
      { t: 'protocol', name: 'he' },
      { t: 'protocol', name: 'negstain' },
      { t: 'note', tone: 'info', text: '<b>Ground-glass hepatocytes</b> are the finding to recognise on the H&E: a pale, finely granular, uniformly eosinophilic cytoplasm with a clear halo separating it from the cell membrane. The appearance is caused by smooth endoplasmic reticulum distended with surface antigen, and it is strongly suggestive of chronic hepatitis B \\u2014 though drug effect and fibrinogen storage disease can mimic it, which is why orcein or immunohistochemistry is used to confirm.' }
    ]},

    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'Use'], rows: [
        ['HBsAg immunoassay or rapid test', 'First-line screening for infection.'],
        ['Full serological panel', 'Distinguishes acute, chronic, resolved and vaccinated.'],
        ['HBV DNA PCR (IU/mL)', 'Decides who needs treatment and monitors response.'],
        ['ALT and AST', 'Degree of liver inflammation.'],
        ['Transient elastography (FibroScan) or APRI/FIB-4', 'Non-invasive staging of fibrosis; APRI is used where elastography is unavailable.'],
        ['Hepatitis D serology', 'Test every HBsAg-positive patient at least once — HDV sharply worsens prognosis.'],
        ['Ultrasound + alpha-fetoprotein every 6 months', 'Liver cancer surveillance in cirrhosis and in other at-risk groups.'],
        ['HBV genotype and resistance testing', 'Occasionally, for treatment planning.']
      ]}
    ]},

    { id: 'treatment', title: 'Treatment', blocks: [
      { t: 'table', head: ['Drug', 'Target', 'Note'], rows: [
        ['Tenofovir disoproxil fumarate (TDF)', 'Viral reverse transcriptase', 'First line. Very high barrier to resistance. Monitor kidney function and bone density.'],
        ['Tenofovir alafenamide (TAF)', 'Same', 'Better renal and bone profile, higher cost.'],
        ['Entecavir', 'Same', 'First line. Avoid in patients with prior lamivudine resistance.'],
        ['Lamivudine, adefovir, telbivudine', 'Same', 'Largely abandoned — resistance develops in most patients over a few years.'],
        ['Pegylated interferon alfa-2a', 'Host immune modulation', 'A finite 48-week course with a chance of durable HBsAg loss, but poorly tolerated and contraindicated in decompensated cirrhosis.'],
        ['Bulevirtide', 'Blocks NTCP entry', 'For hepatitis D co-infection.']
      ]},
      { t: 'ul', title: 'Practical points', items: [
        'Not everyone with chronic HBV needs treatment. Decisions combine HBV DNA level, ALT, fibrosis stage, family history of liver cancer and age.',
        'Treatment is usually long-term or lifelong. Stopping can cause a severe flare, so it is never done casually.',
        'Everyone on immunosuppression or chemotherapy must be screened first — HBV reactivation under rituximab or steroids can be fatal.',
        'A functional cure, defined as sustained HBsAg loss off treatment, is achieved in only a few percent. Capsid assembly modulators and siRNA agents are in trials.'
      ]}
    ]},

    { id: 'prevention', title: 'Prevention', blocks: [
      { t: 'ul', items: [
        '<b>Vaccine.</b> Recombinant HBsAg produced in yeast. Three or four doses give over 95% protection, generally for life even as measured antibody falls.',
        '<b>Birth dose within 24 hours</b> — the single most important intervention worldwide, and the main target of WHO\'s elimination strategy.',
        '<b>Hepatitis B immunoglobulin (HBIG)</b> plus vaccine for babies of HBsAg-positive mothers and after needlestick exposure.',
        '<b>Antiviral in pregnancy.</b> Tenofovir in the third trimester when maternal HBV DNA is high, which cuts residual transmission further.',
        '<b>Blood safety</b> — screening of all donated blood for HBsAg and, increasingly, nucleic acid testing.',
        '<b>Safe injection practice,</b> sterile tattooing and piercing equipment, condoms, and not sharing razors or toothbrushes.',
        '<b>Vaccinate health workers</b> and check anti-HBs after the course.'
      ]},
      { t: 'note', tone: 'info', text: 'India added hepatitis B to its Universal Immunisation Programme nationally in 2011, with a birth dose. Coverage of that birth dose, rather than the full course, remains the main gap across Asia and Africa.' }
    ]},

    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Living with chronic HBV', 'About 254 million people'],
        ['Annual deaths', 'Roughly 1.1 million, mostly from cirrhosis and liver cancer'],
        ['New infections', 'About 1.2 million a year'],
        ['Diagnosed', 'Only around 13% — the largest diagnostic gap of any major infection'],
        ['On treatment', 'About 3% of those eligible'],
        ['Highest prevalence', 'Western Pacific and African regions'],
        ['India', 'Roughly 3% of the population, about 40 million people, mostly undiagnosed'],
        ['WHO target', 'Elimination as a public health threat by 2030 — a 90% cut in new infections and 65% cut in deaths']
      ]}
    ]},

    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Hepatitis B fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/hepatitis-b'],
        ['WHO — 2024 guidelines on chronic hepatitis B', 'https://www.who.int/publications/i/item/9789240090903'],
        ['CDC — Hepatitis B', 'https://www.cdc.gov/hepatitis-b/'],
        ['EASL clinical practice guidelines', 'https://easl.eu/publication/easl-clinical-practice-guidelines-management-of-hepatitis-b-virus/'],
        ['ViralZone — Hepadnaviridae', 'https://viralzone.expasy.org/9'],
        ['National Viral Hepatitis Control Programme, India', 'https://nvhcp.mohfw.gov.in/']
      ]}
    ]}
  ]
}

]);
