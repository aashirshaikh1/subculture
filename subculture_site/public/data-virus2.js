/* Profile data, part 3: rabies, hepatitis C, measles, Ebola, Nipah. */
window.DISEASES = (window.DISEASES || []).concat([

/* ───────────────────────────── Rabies ───────────────────────────── */
{
  id: 'rabies', name: 'Rabies', organism: 'Lyssavirus rabies', kind: 'virus',
  aka: ['rabies', 'lyssavirus', 'rhabdovirus', 'hydrophobia', 'dog bite', 'negri', 'pep', 'post exposure'],
  tagline: 'A bullet-shaped virus that travels up a nerve, and is effectively one hundred per cent fatal once it arrives.',
  hero: 'Rabies is the most lethal infection known to medicine and one of the most completely preventable. The virus climbs the peripheral nerves slowly enough that a vaccine given after the bite still outruns it — which is why almost every death is a failure of access rather than of science.',
  quick: [
    ['Pathogen', '<i>Lyssavirus rabies</i>, family <i>Rhabdoviridae</i>'],
    ['Baltimore group', 'V — (−)ssRNA, non-segmented'],
    ['Genome', '≈12 kb, five genes: N–P–M–G–L'],
    ['Shape', 'Bullet, 180 × 75 nm, enveloped'],
    ['Receptor', 'Nicotinic acetylcholine receptor, NCAM, p75NTR'],
    ['Incubation', '1–3 months typically; one week to over a year'],
    ['Case fatality', 'Effectively 100% once symptoms begin'],
    ['Global deaths', '≈59,000 a year'],
    ['India', 'Roughly a third of global deaths; dogs cause over 95%']
  ],
  model: {
    kind: 'virion', radius: 1.1, body: 'bullet',
    envelope: '#7b4fd0', spikes: { type: 'knob', count: 42, color: '#f0a63c' },
    capsid: { shape: 'helix', color: '#38c8b0' },
    layers: [
      ['envelope', 'Lipid envelope', 'Gives the bullet its shape: cylindrical with one rounded and one flat end.'],
      ['spikes', 'G glycoprotein', 'The only surface protein. Binds the receptor, drives fusion, and is the sole target of neutralising antibody — so it is what every vaccine is built around.'],
      ['capsid', 'Helical ribonucleoprotein', 'N protein wound round the RNA in a tight helix, with P and L forming the polymerase. Visible as cross-striations on electron microscopy.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and discovery', blocks: [
      { t: 'kv', items: [
        ['Order → Family', 'Mononegavirales → <i>Rhabdoviridae</i>'],
        ['Genus → Species', '<i>Lyssavirus</i> → <i>Lyssavirus rabies</i> (RABV)'],
        ['Other lyssaviruses', 'Australian bat lyssavirus, European bat lyssavirus 1 and 2, Duvenhage, Mokola — all cause an identical clinical picture'],
        ['Reservoirs', 'Dogs dominate in Asia and Africa; in the Americas and Europe, bats, raccoons, foxes and skunks'],
        ['Name', 'Latin <i>rabere</i>, to rave. The Greek <i>lyssa</i> means frenzy.']
      ]},
      { t: 'timeline', items: [
        ['≈2300 BCE', 'The Eshnunna code in Mesopotamia fines the owner of a dog that bites and kills — the first written record of the disease.'],
        ['1804', 'Zinke transmits rabies experimentally with saliva, proving it is infectious.'],
        ['1885', 'Pasteur treats Joseph Meister, a nine-year-old mauled by a rabid dog, with attenuated spinal-cord vaccine. The boy lives.'],
        ['1903', 'Adelchi Negri describes the cytoplasmic inclusion bodies that bear his name.'],
        ['1960s–80s', 'Nerve-tissue vaccines are replaced by cell-culture vaccines, removing the risk of post-vaccinal encephalomyelitis.'],
        ['2018', 'WHO shortens the recommended intradermal schedules, cutting the cost of post-exposure treatment substantially.'],
        ['2030', 'Target date for the global elimination of dog-mediated human rabies deaths — "Zero by 30".']
      ]}
    ]},
    { id: 'structure', title: 'Structure and genome', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'tem-rabies' },
      { t: 'genome', label: 'Rabies genome, ≈12 kb — five genes read in a strict 3′ to 5′ order', genes: [
        ['N', 0.11, 'Nucleoprotein — coats the RNA; the target of the diagnostic fluorescent antibody test'],
        ['P', 0.08, 'Phosphoprotein — polymerase cofactor and interferon antagonist'],
        ['M', 0.06, 'Matrix — drives budding and gives the bullet its shape'],
        ['G', 0.14, 'Glycoprotein — receptor binding, fusion, and the only neutralising antibody target'],
        ['L', 0.61, 'Large protein — the RNA-dependent RNA polymerase']
      ]},
      { t: 'note', tone: 'info', text: 'Gene order is itself a control mechanism. The polymerase enters at the 3′ end and falls off progressively, so genes nearest that end are transcribed most. N protein, needed in the largest amount, comes first; L polymerase, needed in trace quantities, comes last. The gradient is built into the sequence.' }
    ]},
    { id: 'pathogenesis', title: 'How it causes disease', blocks: [
      { t: 'steps', items: [
        ['Inoculation', 'Virus in saliva enters through a bite, scratch or contamination of broken skin or mucous membrane. It may replicate locally in muscle for days to weeks — the reason post-exposure vaccination works at all.'],
        ['Nerve entry', 'G protein binds nicotinic acetylcholine receptors at the neuromuscular junction, and the virus enters the peripheral nerve ending.'],
        ['Retrograde transport', 'Carried up the axon by the dynein motor at roughly 50–100 mm per day. It is invisible to the immune system inside the nerve — no viraemia, no antibody response, no fever.'],
        ['Spinal cord and brain', 'Replication in the dorsal root ganglion, then the cord, then the brain. Paraesthesia or itching at the healed bite site is the first symptom and is effectively diagnostic.'],
        ['Centrifugal spread', 'From the brain, virus travels outward along nerves to the salivary glands, cornea, skin and other organs — which is what makes the host infectious and completes the transmission cycle.'],
        ['Death', 'Brainstem involvement causes autonomic instability, respiratory failure and cardiac arrest. Death comes within one to two weeks of symptom onset.']
      ]},
      { t: 'note', tone: 'warn', text: 'The incubation period depends heavily on where the bite is, because the virus has to travel the length of the nerve. Facial and neck bites can produce symptoms in under three weeks; a bite on the foot may take months. Bites to the head, neck and hands are therefore treated as the highest urgency.' }
    ]},
    { id: 'clinical', title: 'Clinical features', blocks: [
      { t: 'organs', items: [
        ['Prodrome, 2–10 days', 'Fever, malaise, headache, and — characteristically — pain, tingling or itching at the site of a bite that has long since healed. This symptom in anyone with an animal exposure history is rabies until proven otherwise.'],
        ['Furious rabies, about 80%', 'Episodes of agitation, confusion and hallucination alternating with lucid intervals. <b>Hydrophobia</b>: attempting to drink triggers violent, painful spasm of the pharynx and diaphragm, and eventually the sight or sound of water does the same. <b>Aerophobia</b>: a draught of air on the face provokes the identical spasm. Hypersalivation, sweating, fluctuating pupils and arrhythmia follow.'],
        ['Paralytic (dumb) rabies, about 20%', 'Ascending flaccid paralysis beginning in the bitten limb, with fever and sphincter involvement. Easily mistaken for Guillain–Barré syndrome, and frequently missed; the course is somewhat longer.'],
        ['Terminal phase', 'Coma, autonomic collapse, respiratory failure. Intensive care prolongs survival by days without changing the outcome.']
      ]},
      { t: 'note', tone: 'warn', text: 'Fewer than twenty survivors of symptomatic rabies have ever been documented, most with severe neurological sequelae. The induced-coma approach known as the Milwaukee protocol has failed in nearly every subsequent attempt and is no longer recommended. <b>Everything therefore rests on prevention after exposure, before symptoms begin.</b>' }
    ]},
    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'Rabies is one of the few viral infections with a classical histological hallmark. Negri bodies — eosinophilic cytoplasmic inclusions 2–10 µm across, found in Purkinje cells of the cerebellum and pyramidal cells of the hippocampus — are aggregates of viral nucleoprotein, and were the diagnostic test for most of the twentieth century. They are seen in only about 70% of cases, which is why they have been replaced.' },
      { t: 'protocol', name: 'ift' },
      { t: 'protocol', name: 'he' },
      { t: 'note', tone: 'info', text: 'The <b>direct fluorescent antibody test</b> on brain tissue is the reference standard, and it is simply immunofluorescence applied to a brain impression smear: an FITC-conjugated antibody against rabies nucleoprotein gives apple-green granular fluorescence within an hour. Seller\'s stain, a rapid methylene blue and basic fuchsin method, was the traditional way to demonstrate Negri bodies on an unfixed smear.' }
    ]},
    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'Sample', 'Note'], rows: [
        ['Direct fluorescent antibody (dFA)', 'Brain tissue — post-mortem', 'Reference standard. Brainstem and cerebellum. Results within hours.'],
        ['RT-PCR', 'Saliva, CSF, nuchal skin biopsy, brain', 'The best ante-mortem option. Saliva should be sampled repeatedly, as shedding is intermittent.'],
        ['Nuchal skin biopsy', 'Hairline at the nape, with follicles', 'dFA or PCR on the nerve fibres surrounding hair follicles. Ante-mortem and reasonably sensitive.'],
        ['Corneal impression smear', 'Cornea', 'Low sensitivity; a negative means nothing.'],
        ['Serology', 'Serum, CSF', 'Antibody appears late and only in unvaccinated patients. Antibody in CSF indicates infection rather than vaccination.'],
        ['Histology for Negri bodies', 'Brain', 'Specific when present, but absent in around 30% of confirmed cases.'],
        ['Mouse inoculation / cell culture', 'Brain, saliva', 'Isolation; slow and now largely superseded.']
      ]},
      { t: 'note', tone: 'warn', text: 'No test can exclude rabies in a living patient. A negative ante-mortem result never justifies withholding post-exposure prophylaxis, and prophylaxis is never delayed while waiting for a laboratory result.' }
    ]},
    { id: 'treatment', title: 'Post-exposure prophylaxis', blocks: [
      { t: 'p', text: 'There is no treatment for established rabies. What exists is prophylaxis, and it is close to completely effective when all three components are done properly and promptly.' },
      { t: 'table', head: ['Category', 'Type of contact', 'What to do'], rows: [
        ['<b>I</b>', 'Touching or feeding an animal; licks on intact skin', 'Wash the area. No prophylaxis needed.'],
        ['<b>II</b>', 'Nibbling of uncovered skin; minor scratches or abrasions without bleeding', 'Wound care plus <b>vaccine</b>.'],
        ['<b>III</b>', 'Single or multiple transdermal bites or scratches; licks on broken skin or mucosa; any contact with a bat', 'Wound care, <b>vaccine and rabies immunoglobulin</b> infiltrated into the wound.']
      ]},
      { t: 'steps', items: [
        ['Wash the wound immediately', 'Soap and running water for a full 15 minutes, then apply povidone-iodine or alcohol. This single step alone cuts risk substantially — the virus is fragile outside the body.'],
        ['Do not suture', 'Leave the wound open where possible. If closure is unavoidable, infiltrate immunoglobulin first and suture loosely.'],
        ['Give rabies immunoglobulin for category III', 'Infiltrate as much as anatomically possible <i>into and around the wound</i>; this is passive protection for the days before the vaccine response develops. Human RIG 20 IU/kg, equine RIG 40 IU/kg. Never into the same syringe or site as the vaccine.'],
        ['Start vaccine', 'Modern cell-culture vaccine — purified chick embryo cell or Vero cell. Intramuscular Essen regimen on days 0, 3, 7 and 14, or an intradermal regimen, which uses a fraction of the dose and is standard in India.'],
        ['Modify for the previously vaccinated', 'Two doses on days 0 and 3 only, and no immunoglobulin.'],
        ['Observe the animal where possible', 'A dog or cat that remains healthy for 10 days was not shedding virus at the time of the bite, and the course can be stopped.']
      ]},
      { t: 'note', tone: 'ok', text: '<b>There is no time limit on starting prophylaxis.</b> If a patient presents weeks or months after a bite and has not yet developed symptoms, the full course is still given. It is late, not useless.' }
    ]},
    { id: 'prevention', title: 'Prevention and control', blocks: [
      { t: 'ul', items: [
        '<b>Mass dog vaccination.</b> The only intervention that ends human rabies. Vaccinating 70% of the dog population interrupts transmission, and it is far cheaper than treating the resulting human exposures.',
        '<b>Pre-exposure prophylaxis</b> for veterinarians, laboratory workers, animal handlers, cavers, and children in highly endemic areas. Two doses, days 0 and 7.',
        '<b>Access to vaccine and immunoglobulin.</b> Immunoglobulin shortage is the main gap worldwide, and the reason monoclonal antibody replacements are being introduced.',
        '<b>Education.</b> Wound washing, prompt presentation, and not applying chillies, oil or herbal preparations to bite wounds — practices that remain common and that delay care.',
        '<b>Bat exposure.</b> Any direct bat contact, and any bat found in a room with a sleeping person or a child, is treated as category III.',
        '<b>In India:</b> the National Rabies Control Programme and the 2021 National Action Plan for dog-mediated rabies elimination by 2030, with free vaccine at government facilities.'
      ]}
    ]},
    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Annual deaths', 'About 59,000 worldwide'],
        ['India', 'Roughly 18,000–20,000 deaths a year — the largest national burden'],
        ['Source', 'Dogs cause over 95% of human cases globally'],
        ['Who dies', 'About 40% are children under 15'],
        ['Geography', '95% of deaths in Africa and Asia'],
        ['People receiving prophylaxis', 'More than 29 million a year'],
        ['Cost', 'Over US$8 billion annually, most of it borne by the poorest households'],
        ['Eliminated in', 'Western Europe, Japan, Canada, the United States (canine rabies), and much of Latin America']
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Rabies fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/rabies'],
        ['WHO — Expert consultation on rabies, third report', 'https://www.who.int/publications/i/item/WHO-TRS-1012'],
        ['CDC — Rabies', 'https://www.cdc.gov/rabies/'],
        ['National Centre for Disease Control, India — rabies', 'https://ncdc.mohfw.gov.in/'],
        ['Zero by 30 — the global strategic plan', 'https://www.who.int/publications/i/item/9789241513838']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Hepatitis C ───────────────────────────── */
{
  id: 'hcv', name: 'Hepatitis C', organism: 'Hepacivirus hominis', kind: 'virus',
  aka: ['hep c', 'hcv', 'hepatitis c', 'daa', 'sofosbuvir', 'cirrhosis', 'non-a non-b'],
  tagline: 'The chronic viral infection that went from incurable to curable in under a decade.',
  hero: 'Hepatitis C is the counter-example to HIV and hepatitis B. It has no vaccine and no latent reservoir — and because it never integrates into the host genome, suppressing replication for a few months clears it permanently. Direct-acting antivirals cure over 95% of patients in eight to twelve weeks.',
  quick: [
    ['Pathogen', '<i>Hepacivirus hominis</i>, family <i>Flaviviridae</i>'],
    ['Baltimore group', 'IV — (+)ssRNA'],
    ['Genome', '≈9.6 kb, one open reading frame'],
    ['Envelope', 'Yes — E1 and E2, circulating bound to host lipoproteins'],
    ['Genotypes', '8, with genotype 3 predominant in India'],
    ['Chronic after exposure', '75–85% — far higher than hepatitis B in adults'],
    ['Cure rate on DAAs', 'Over 95%'],
    ['Vaccine', 'None'],
    ['Global', '≈50 million chronic infections']
  ],
  model: {
    kind: 'virion', radius: 1.22,
    envelope: '#d2a03c', spikes: { type: 'knob', count: 26, color: '#e8d08a' },
    capsid: { shape: 'icosa', color: '#4f8fd0' },
    genome: { color: '#e05b7a', strands: 1 },
    layers: [
      ['envelope', 'Lipid envelope', 'Unusually, the particle circulates complexed with host lipoproteins as a "lipoviroparticle", which helps it hide from antibody.'],
      ['spikes', 'E1 / E2 glycoproteins', 'E2 binds CD81 and scavenger receptor B1. Its hypervariable region 1 mutates constantly, which is the central obstacle to a vaccine.'],
      ['capsid', 'Core protein', 'An icosahedral core around the genome; also interferes with host lipid metabolism, causing steatosis.'],
      ['genome', 'RNA genome', 'A single 9.6 kb (+)ssRNA translated as one polyprotein from an internal ribosome entry site.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and discovery', blocks: [
      { t: 'kv', items: [
        ['Family → Genus', '<i>Flaviviridae</i> → <i>Hepacivirus</i>'],
        ['Relatives', 'Dengue, Zika, yellow fever and Japanese encephalitis are in the same family but different genera'],
        ['Genotypes', '1 to 8, with numerous subtypes. Genotype 1 dominates in Europe and the Americas; <b>genotype 3 is the commonest in India</b> and is associated with more steatosis and faster fibrosis.'],
        ['Quasispecies', 'Within one patient the virus exists as a swarm of related variants, because the polymerase has no proofreading'],
        ['Discovery', 'Identified in 1989 by molecular cloning from chimpanzee plasma, having been known only as "non-A, non-B hepatitis"'],
        ['Nobel Prize', '2020 — Harvey Alter, Michael Houghton and Charles Rice']
      ]},
      { t: 'p', text: 'Hepatitis C was found without ever being seen. No one could grow it, and no one had a microscope image of it; the agent was identified by building a cDNA library from infected plasma and screening it with serum from a patient, so the first thing anyone knew about the virus was a fragment of its sequence. It remains the only major human pathogen discovered that way.' }
    ]},
    { id: 'structure', title: 'Structure and genome', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'tem-hcv' },
      { t: 'genome', label: 'HCV genome, ≈9.6 kb — one polyprotein, cleaved into ten proteins', genes: [
        ['5′ IRES', 0.03, 'Internal ribosome entry site — ribosomes bind directly, no cap needed'],
        ['Core', 0.06, 'Capsid protein; also drives hepatic steatosis'],
        ['E1 / E2', 0.17, 'Envelope glycoproteins; E2 carries the hypervariable region'],
        ['p7 / NS2', 0.08, 'Ion channel and protease involved in assembly'],
        ['NS3-4A', 0.21, 'Protease and helicase — target of the <i>-previr</i> drugs; also cleaves host antiviral signalling proteins'],
        ['NS4B', 0.07, 'Builds the membranous web where replication occurs'],
        ['NS5A', 0.15, 'Replication and assembly — target of the <i>-asvir</i> drugs'],
        ['NS5B', 0.2, 'RNA polymerase — target of sofosbuvir'],
        ['3′ UTR', 0.03, 'Replication signal']
      ]},
      { t: 'note', tone: 'info', text: 'The three drug targets map straight onto this diagram, and that is why combination therapy works so well: NS3/4A protease, NS5A, and the NS5B polymerase are hit together, so no single mutation rescues the virus. Sofosbuvir in particular targets the one site in NS5B that cannot mutate without crippling the polymerase, which is why resistance to it is rare.' }
    ]},
    { id: 'transmission', title: 'Transmission and natural history', blocks: [
      { t: 'table', head: ['Route', 'Relative importance', 'Notes'], rows: [
        ['Injecting drug use', 'Dominant in high-income countries', 'Prevalence in people who inject drugs often exceeds 50%'],
        ['Unsafe healthcare injections and reuse of equipment', '<b>Dominant in South Asia</b>', 'Historically the main driver in India, Pakistan and Egypt'],
        ['Transfusion before screening', 'Historical', 'Donor screening since the early 1990s has essentially eliminated this'],
        ['Haemodialysis', 'Ongoing', 'Outbreaks still occur where infection control lapses'],
        ['Mother to child', '≈5%', 'Higher with HIV co-infection. Not a reason to avoid breastfeeding.'],
        ['Sexual', 'Low', 'Significant mainly among men who have sex with men, particularly with HIV co-infection'],
        ['Tattooing, piercing, shared razors', 'Occasional', 'Where equipment is not sterilised']
      ]},
      { t: 'ul', title: 'What happens after infection', items: [
        'Acute infection is usually silent. Fewer than 25% develop jaundice, and most are never diagnosed at this stage.',
        '<b>15–25% clear the virus spontaneously</b>, more often women, younger people and those with a symptomatic acute illness.',
        '<b>75–85% become chronic</b> — the opposite of adult hepatitis B, where fewer than 5% do.',
        'Over 20 years, 15–30% of chronic cases develop cirrhosis. Alcohol, HIV co-infection, male sex, older age at infection and steatosis all accelerate this.',
        'Once cirrhosis is established, hepatocellular carcinoma develops at 1–4% per year. <b>That risk falls after cure but does not disappear</b>, so surveillance continues.',
        'Extrahepatic disease is common: mixed cryoglobulinaemia, membranoproliferative glomerulonephritis, porphyria cutanea tarda, lichen planus, and an increased risk of type 2 diabetes and lymphoma.'
      ]}
    ]},
    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'Hepatitis C is diagnosed serologically and molecularly; microscopy has no role in detecting it. Liver histology still matters for staging, and it has a recognisable pattern of its own.' },
      { t: 'protocol', name: 'he' },
      { t: 'note', tone: 'info', text: 'The histological signature of chronic hepatitis C is <b>dense lymphoid aggregates or true lymphoid follicles in the portal tracts</b>, together with bile duct damage and macrovesicular steatosis — the fat being particularly marked in genotype 3. Fibrosis is staged by METAVIR (F0 to F4) or Ishak. Biopsy has largely been replaced by transient elastography and by the APRI and FIB-4 scores, which need only routine blood results.' }
    ]},
    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'What it means', 'Use'], rows: [
        ['Anti-HCV antibody', 'Exposure at some point — past or present', 'Screening. Stays positive after cure, so it never proves current infection.'],
        ['HCV RNA (PCR)', 'Active infection', '<b>The confirmatory test.</b> A positive antibody with undetectable RNA means cleared or cured infection.'],
        ['HCV core antigen', 'Active infection', 'Cheaper alternative to PCR where molecular testing is unavailable.'],
        ['Genotype', 'Which of the 8 genotypes', 'No longer needed for most patients, since pangenotypic regimens cover all of them.'],
        ['FIB-4 / APRI', 'Fibrosis stage from routine bloods', 'Decides who needs specialist referral and cirrhosis surveillance.'],
        ['Transient elastography', 'Liver stiffness', 'Non-invasive fibrosis staging.'],
        ['SVR12', 'Undetectable RNA 12 weeks after treatment ends', '<b>This is the definition of cure.</b>']
      ]},
      { t: 'note', tone: 'warn', text: 'The antibody test alone is the commonest source of confusion. A patient told they are "hepatitis C positive" on antibody who has in fact cleared the virus can spend years believing they are infected. Always confirm with RNA, and always explain that antibody persists for life.' }
    ]},
    { id: 'treatment', title: 'Treatment — direct-acting antivirals', blocks: [
      { t: 'table', head: ['Class', 'Suffix', 'Target', 'Examples'], rows: [
        ['NS3/4A protease inhibitors', '<i>-previr</i>', 'Polyprotein cleavage', 'Glecaprevir, grazoprevir, voxilaprevir'],
        ['NS5A inhibitors', '<i>-asvir</i>', 'Replication complex assembly', 'Velpatasvir, pibrentasvir, daclatasvir, ledipasvir'],
        ['NS5B nucleotide polymerase inhibitors', '<i>-buvir</i>', 'RNA polymerase active site', 'Sofosbuvir'],
        ['NS5B non-nucleoside inhibitors', '<i>-buvir</i>', 'Polymerase allosteric sites', 'Dasabuvir']
      ]},
      { t: 'ul', title: 'How it is actually prescribed', items: [
        '<b>Sofosbuvir + velpatasvir</b> for 12 weeks, or <b>glecaprevir + pibrentasvir</b> for 8 weeks. Both are pangenotypic — they work against all eight genotypes, so genotyping is no longer routinely required.',
        'Cure rates exceed 95%, including in cirrhosis, and treatment is one or three tablets once daily with few side effects.',
        'Protease inhibitors are avoided in decompensated cirrhosis.',
        '<b>Screen for hepatitis B before starting.</b> HBV reactivation during DAA therapy has caused fatal hepatitis, and this is a boxed warning.',
        'Check for drug interactions — amiodarone with sofosbuvir can cause severe bradycardia; rifampicin and some anticonvulsants reduce DAA levels.',
        'Re-infection is possible after cure, because immunity is not protective. Harm reduction has to continue alongside treatment.'
      ]},
      { t: 'note', tone: 'ok', text: 'Why hepatitis C is curable and HIV and hepatitis B are not: HCV replicates entirely in the cytoplasm as RNA. It never integrates into host DNA and forms no latent reservoir, so once replication is suppressed for long enough that every infected hepatocyte turns over, the virus is gone for good. HIV leaves a provirus in the genome and HBV leaves cccDNA in the nucleus — neither can be removed by stopping replication.' }
    ]},
    { id: 'prevention', title: 'Prevention', blocks: [
      { t: 'ul', items: [
        '<b>No vaccine exists.</b> The hypervariable region of E2 mutates continuously, the virus circulates shielded by host lipoproteins, and natural infection does not confer protective immunity — three independent obstacles.',
        '<b>Harm reduction</b> — needle and syringe programmes and opioid agonist therapy, which together substantially cut incidence.',
        '<b>Safe injection practice and infection control</b>, the key intervention in South Asia.',
        '<b>Blood and organ donor screening</b> with nucleic acid testing.',
        '<b>Treatment as prevention</b> — curing people removes them from the transmissible pool, which is the basis of the elimination strategy.',
        '<b>Screening.</b> One-off testing of all adults is now recommended in many countries, since most infections are asymptomatic and undiagnosed.'
      ]},
      { t: 'note', tone: 'info', text: 'India\'s National Viral Hepatitis Control Programme provides free testing and free direct-acting antivirals through government facilities — one of the largest publicly funded hepatitis C treatment programmes anywhere, and the reason generic DAA pricing collapsed worldwide.' }
    ]},
    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Living with chronic HCV', 'About 50 million people'],
        ['New infections', 'About 1 million a year'],
        ['Annual deaths', 'About 242,000, mostly from cirrhosis and liver cancer'],
        ['Diagnosed', 'Around 36%'],
        ['Treated', 'About 20% of those diagnosed'],
        ['India', 'Roughly 5–6 million chronic infections; genotype 3 predominant'],
        ['Highest prevalence regions', 'Eastern Mediterranean and European regions'],
        ['WHO target', 'Elimination as a public health threat by 2030']
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Hepatitis C fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/hepatitis-c'],
        ['WHO — Guidelines on hepatitis C testing and treatment', 'https://www.who.int/publications/i/item/9789240052734'],
        ['CDC — Hepatitis C', 'https://www.cdc.gov/hepatitis-c/'],
        ['EASL recommendations on treatment of hepatitis C', 'https://easl.eu/publications/clinical-practice-guidelines/'],
        ['National Viral Hepatitis Control Programme, India', 'https://nvhcp.mohfw.gov.in/']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Measles ───────────────────────────── */
{
  id: 'measles', name: 'Measles', organism: 'Morbillivirus hominis', kind: 'virus',
  aka: ['measles', 'rubeola', 'morbillivirus', 'koplik', 'mmr', 'sspe', 'paramyxovirus', 'rash'],
  tagline: 'The most contagious human virus there is — and the one that erases your immune memory of everything else.',
  hero: 'Measles has a basic reproduction number of 12 to 18, so one case in a susceptible population infects a dozen or more. It also deletes much of the antibody repertoire the patient had already built, leaving them vulnerable to infections they were previously immune to for years afterwards.',
  quick: [
    ['Pathogen', '<i>Morbillivirus hominis</i>, family <i>Paramyxoviridae</i>'],
    ['Baltimore group', 'V — (−)ssRNA, non-segmented'],
    ['Genome', '≈15.9 kb, six genes'],
    ['R₀', '12–18 — the highest of any human virus'],
    ['Airborne survival', 'Up to 2 hours in a room after the patient has left'],
    ['Incubation', '10–14 days to rash'],
    ['Infectious period', '4 days before to 4 days after rash onset'],
    ['Herd immunity threshold', '≈95% — the highest of any vaccine-preventable disease'],
    ['Vaccine efficacy', '93% after one dose, 97% after two']
  ],
  model: {
    kind: 'virion', radius: 1.32,
    envelope: '#3f7fc4', spikes: { type: 'knob', count: 40, color: '#e8a63c' },
    spikes2: { type: 'club', count: 14, color: '#d05b8a' },
    capsid: { shape: 'coil', color: '#4fd0b4' },
    genome: { color: '#f0d060', strands: 1 },
    layers: [
      ['envelope', 'Lipid envelope', 'Pleomorphic, 100–300 nm. Fragile — measles is destroyed quickly by heat, light and disinfectants, which is why the vaccine needs a cold chain.'],
      ['spikes', 'H protein (haemagglutinin)', 'Binds the receptor. Unlike influenza, measles H has no neuraminidase activity.'],
      ['spikes2', 'F protein (fusion)', 'Fuses the viral and cell membranes at neutral pH — and fuses infected cells to each other, producing the giant multinucleated cells seen in tissue.'],
      ['capsid', 'Helical nucleocapsid', 'N protein coiled around the RNA with P and L — the herringbone structure seen on electron microscopy.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and receptors', blocks: [
      { t: 'kv', items: [
        ['Order → Family', 'Mononegavirales → <i>Paramyxoviridae</i>'],
        ['Genus → Species', '<i>Morbillivirus</i> → <i>Morbillivirus hominis</i>'],
        ['Relatives', 'Canine distemper virus, rinderpest (eradicated in 2011), peste des petits ruminants'],
        ['Genotypes', '24 described; only a few still circulate, and genotyping is used to trace transmission chains'],
        ['Serotype', '<b>Only one</b> — which is why the vaccine has never needed reformulating'],
        ['Rubella', 'An entirely different virus (a togavirus). "German measles" is unrelated despite the name.']
      ]},
      { t: 'table', head: ['Receptor', 'Where', 'What it explains'], rows: [
        ['<b>SLAM / CD150</b>', 'Activated T cells, B cells, dendritic cells, macrophages', 'The primary receptor. Measles is fundamentally an immune cell infection — which is the root of both the immunosuppression and the severity.'],
        ['<b>Nectin-4</b>', 'Basolateral surface of respiratory epithelium', 'How the virus gets <i>out</i>: infected immune cells deliver virus to the airway epithelium from beneath, and it is released into the airway. Explains the extreme transmissibility.'],
        ['<b>CD46</b>', 'All nucleated cells', 'Used by vaccine and laboratory-adapted strains, not by wild-type virus.']
      ]},
      { t: 'note', tone: 'warn', text: '<b>Immune amnesia.</b> Measles infects and destroys memory B and T lymphocytes, deleting between 11% and 73% of the patient\'s existing antibody repertoire. Immunity built up over a lifetime — to other pathogens and from other vaccines — is partially erased, and takes two to three years to rebuild. This is why measles mortality statistics understate its true cost: children die of other infections afterwards.' }
    ]},
    { id: 'structure', title: 'Structure and genome', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'tem-measles' },
      { t: 'genome', label: 'Measles genome, ≈15.9 kb — six genes, transcribed in a 3′ to 5′ gradient', genes: [
        ['N', 0.1, 'Nucleoprotein — coats the genome'],
        ['P / C / V', 0.1, 'Phosphoprotein plus two accessory proteins that block interferon signalling'],
        ['M', 0.07, 'Matrix — assembly and budding. Mutations here are central to SSPE.'],
        ['F', 0.12, 'Fusion protein — membrane fusion and syncytium formation'],
        ['H', 0.12, 'Haemagglutinin — receptor binding; the main neutralising antibody target'],
        ['L', 0.44, 'Large protein — the RNA polymerase'],
        ['UTRs', 0.05, 'Control regions']
      ]}
    ]},
    { id: 'clinical', title: 'Clinical features', blocks: [
      { t: 'organs', items: [
        ['Prodrome, days 1–4', 'High fever rising to 40 °C with the <b>three Cs</b> — cough, coryza and conjunctivitis — plus marked photophobia and malaise. The child looks and feels thoroughly unwell, which distinguishes measles from most other childhood rashes.'],
        ['Koplik spots', 'Tiny blue-white spots on a red base on the buccal mucosa opposite the molars, classically described as grains of salt on a red background. They appear 1–2 days before the rash and fade as it spreads. <b>Pathognomonic</b>, but easily missed and present in only a proportion of cases.'],
        ['The rash, day 4 onward', 'Erythematous maculopapular, beginning behind the ears and at the hairline, spreading downward over three days to the trunk and limbs. It becomes confluent on the face and upper body, blanches early and not later, and fades in the order it appeared, leaving a brownish staining and fine desquamation.'],
        ['Otitis media and pneumonia', 'The commonest complications. Pneumonia — either direct viral giant-cell pneumonia or secondary bacterial infection — causes most measles deaths.'],
        ['Diarrhoea and malnutrition', 'Common, and in undernourished children it sets off a cycle of worsening nutrition and further infection.'],
        ['Acute encephalitis', 'About 1 in 1,000 cases, within days of the rash. Post-infectious and immune-mediated; 15% die and a quarter of survivors have permanent sequelae.'],
        ['SSPE', 'Subacute sclerosing panencephalitis: 1 in 10,000 cases overall, but far higher — perhaps 1 in 600 — when infection occurs under one year of age. Appears 7–10 years later with personality change, myoclonic jerks and relentless neurological decline. Invariably fatal. Caused by a defective, M-protein-mutated virus persisting in the brain.'],
        ['In pregnancy', 'Miscarriage, prematurity and low birth weight. Measles in pregnancy is more severe for the mother than for most adults.']
      ]},
      { t: 'note', tone: 'info', text: 'Modified measles occurs in those with partial immunity — infants with residual maternal antibody, or people given immunoglobulin. The illness is milder, the prodrome shorter and the rash sparse, which makes it harder to recognise and easier to spread.' }
    ]},
    { id: 'staining', title: 'Staining and microscopy', blocks: [
      { t: 'p', text: 'Measles is diagnosed by IgM serology or PCR. Where histology is seen, the finding is distinctive: <b>Warthin–Finkeldey giant cells</b>, formed when the F protein fuses neighbouring cells into a multinucleated mass with up to a hundred nuclei. They appear in lymphoid tissue and in the lung, and they are the same fusion mechanism that produces syncytia in cell culture.' },
      { t: 'protocol', name: 'ift' },
      { t: 'protocol', name: 'he' }
    ]},
    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'Sample', 'Timing', 'Note'], rows: [
        ['Measles IgM ELISA', 'Serum', 'From day 3 of rash to 28 days', 'The standard confirmatory test. May be negative in the first 72 hours — repeat if clinically suspected.'],
        ['RT-PCR', 'Throat or nasopharyngeal swab, urine', 'Day 0–7 of rash', 'Most sensitive early, and provides the genotype for outbreak tracing.'],
        ['Paired IgG', 'Serum', 'Acute and convalescent', 'A fourfold rise confirms recent infection.'],
        ['Oral fluid IgM', 'Saliva', 'Days 1–6 of rash', 'Non-invasive; used in surveillance programmes.'],
        ['Viral culture', 'Vero/hSLAM cells', '—', 'Reference laboratories only.']
      ]},
      { t: 'note', tone: 'warn', text: 'In an elimination setting, a single case is a public health emergency. Notify immediately, isolate for four days after rash onset, identify susceptible contacts, and offer post-exposure vaccine within 72 hours or immunoglobulin within six days. Do not wait for laboratory confirmation to begin contact tracing.' }
    ]},
    { id: 'treatment', title: 'Treatment', blocks: [
      { t: 'ul', items: [
        'There is no specific antiviral. Care is supportive: fluids, antipyretics, and treating secondary bacterial infection when it appears.',
        '<b>Vitamin A.</b> Two doses 24 hours apart, repeated at 4–6 weeks if there are eye signs. This reduces measles mortality by about 50% in deficient populations, and WHO recommends it for all children with measles in any setting where deficiency is a possibility.',
        'Antibiotics only for proven or strongly suspected bacterial complications — not prophylactically.',
        'Ribavirin has been used in severe or immunocompromised cases without good evidence.',
        'Isolation: airborne precautions, negative-pressure room where available, for four days after rash onset — and for the whole illness in immunocompromised patients, who shed for far longer.'
      ]}
    ]},
    { id: 'prevention', title: 'Prevention', blocks: [
      { t: 'table', head: ['Measure', 'Detail'], rows: [
        ['Vaccine', 'Live attenuated, given as MR or MMR. Two doses: the first at 9–12 months, the second at 15–18 months or at school entry.'],
        ['Efficacy', '93% after one dose, 97% after two. Protection is lifelong for most recipients.'],
        ['Herd immunity', 'Requires about 95% two-dose coverage — the highest threshold of any vaccine-preventable disease, which is why measles is the first to return when coverage slips.'],
        ['Contraindications', 'Pregnancy, severe immunosuppression, anaphylaxis to a vaccine component. HIV infection is <i>not</i> a contraindication unless severely immunosuppressed.'],
        ['Post-exposure vaccine', 'Within 72 hours of exposure may prevent or attenuate disease.'],
        ['Immunoglobulin', 'Within 6 days for infants, pregnant women and the immunocompromised.']
      ]},
      { t: 'note', tone: 'warn', text: 'Measles is the sentinel of a failing immunisation programme. Because it needs 95% coverage and spreads so efficiently, it reappears before any other vaccine-preventable disease — so a measles outbreak is a warning that diphtheria, pertussis and polio are also at risk in that population.' }
    ]},
    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['Estimated deaths', 'About 107,500 a year, overwhelmingly children under five'],
        ['Cases', 'Over 10 million a year, with large recent increases'],
        ['Before vaccination', 'An estimated 2.6 million deaths a year'],
        ['Lives saved', 'Measles vaccination has prevented an estimated 60 million deaths since 2000'],
        ['Coverage', 'First dose about 83%, second dose about 74% globally — both well below the 95% threshold'],
        ['India', 'Measles–rubella elimination is a national goal; large campaign-based catch-up vaccination has sharply reduced incidence'],
        ['Why it resurges', 'Coverage disrupted by conflict, by the COVID-19 pandemic, and by vaccine hesitancy']
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Measles fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/measles'],
        ['CDC — Measles (rubeola)', 'https://www.cdc.gov/measles/'],
        ['WHO — Measles vaccines position paper', 'https://www.who.int/publications/i/item/WHO-WER9217'],
        ['Mina et al., Science 2019 — measles immune amnesia', 'https://www.science.org/doi/10.1126/science.aay6485'],
        ['Ministry of Health and Family Welfare, India — immunisation', 'https://www.mohfw.gov.in/']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Ebola ───────────────────────────── */
{
  id: 'ebola', name: 'Ebola disease', organism: 'Orthoebolavirus species', kind: 'virus',
  aka: ['ebola', 'filovirus', 'viral haemorrhagic fever', 'vhf', 'bundibugyo', 'zaire', 'marburg', 'bsl4'],
  tagline: 'A filamentous virus that kills by emptying the circulation, not by bleeding.',
  hero: 'Ebola is named for haemorrhage, but fewer than half of patients bleed. Most die of the same thing that kills in cholera — massive gastrointestinal fluid and electrolyte loss. That reframing, which came out of the 2014 West African epidemic, is why aggressive fluid resuscitation now matters more than any other intervention.',
  quick: [
    ['Pathogen', 'Six <i>Orthoebolavirus</i> species, family <i>Filoviridae</i>'],
    ['Baltimore group', 'V — (−)ssRNA, non-segmented'],
    ['Genome', '≈19 kb, seven genes'],
    ['Shape', 'Filamentous — 80 nm wide, up to 14,000 nm long, often hooked'],
    ['Reservoir', 'Fruit bats, strongly suspected'],
    ['Incubation', '2–21 days'],
    ['Case fatality', '25–90% depending on species and care'],
    ['Containment', 'BSL-4'],
    ['Transmission', 'Direct contact with body fluids — <b>not</b> airborne']
  ],
  model: {
    kind: 'virion', radius: 0.88, body: 'filament',
    envelope: '#c8502a', spikes: { type: 'club', count: 44, color: '#f0b04a' },
    layers: [
      ['envelope', 'Lipid envelope', 'Wrapped around a helical nucleocapsid, giving a thread that bends, loops and frequently forms a shepherd\'s crook at one end.'],
      ['spikes', 'GP glycoprotein', 'The only surface protein and the only neutralising antibody target. All three licensed monoclonals bind it — which is why they are species-specific.']
    ]
  },
  sections: [
    { id: 'classification', title: 'The six species', blocks: [
      { t: 'table', head: ['Species', 'Virus', 'Case fatality', 'Notes'], rows: [
        ['<i>Orthoebolavirus zairense</i>', 'Ebola virus (EBOV)', '≈70–90%, lower with care', 'Caused the 2014–16 West African epidemic and most outbreaks. <b>The only species with licensed vaccines and monoclonals.</b>'],
        ['<i>O. sudanense</i>', 'Sudan virus', '≈40–70%', 'No licensed vaccine or treatment.'],
        ['<i>O. bundibugyoense</i>', 'Bundibugyo virus', '≈25–50%', 'The species in the current multi-country outbreak. No licensed vaccine or treatment.'],
        ['<i>O. taiense</i>', 'Taï Forest virus', 'One non-fatal case', 'Côte d\'Ivoire, 1994.'],
        ['<i>O. restonense</i>', 'Reston virus', 'No human disease', 'Infects pigs and macaques; humans seroconvert without illness.'],
        ['<i>O. bombaliense</i>', 'Bombali virus', 'Unknown', 'Found in bats; no human cases yet.']
      ]},
      { t: 'note', tone: 'warn', text: 'The species matters enormously in practice. Ervebo, Inmazeb and Ebanga all target the Zaire species glycoprotein and <b>do not work against Sudan or Bundibugyo virus</b>. An outbreak of a non-Zaire species is therefore managed with supportive care alone while trial vaccines are deployed — which is the situation in the outbreak currently on the home page.' },
      { t: 'p', text: 'Marburg virus is the other filovirus genus, clinically almost indistinguishable, with outbreaks in Angola, Uganda, Equatorial Guinea, Tanzania and Rwanda.' }
    ]},
    { id: 'structure', title: 'Structure and genome', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'tem-ebola' },
      { t: 'genome', label: 'Ebola genome, ≈19 kb — seven genes, 3′ to 5′', genes: [
        ['NP', 0.12, 'Nucleoprotein'],
        ['VP35', 0.06, 'Polymerase cofactor and a potent <b>interferon antagonist</b>'],
        ['VP40', 0.06, 'Matrix — drives budding and determines the filamentous shape'],
        ['GP', 0.1, 'Glycoprotein. RNA editing produces both a membrane-bound GP and a secreted sGP decoy'],
        ['VP30', 0.05, 'Transcription activator'],
        ['VP24', 0.05, 'Blocks interferon signalling by trapping STAT1'],
        ['L', 0.56, 'RNA polymerase']
      ]},
      { t: 'note', tone: 'info', text: 'Two of the seven genes exist mainly to disable interferon — VP35 blocks its production, VP24 blocks the response to it. Filoviruses are unusually aggressive about this, which is why the innate response is paralysed while the virus replicates almost unopposed in the first days.' }
    ]},
    { id: 'pathogenesis', title: 'How it causes disease', blocks: [
      { t: 'steps', items: [
        ['Entry', 'Through broken skin or mucous membranes. The first cells infected are dendritic cells, monocytes and macrophages — the cells that should be organising the response.'],
        ['Immune paralysis', 'VP35 and VP24 shut down interferon. Infected dendritic cells fail to mature and cannot prime T cells, so adaptive immunity is crippled from the outset.'],
        ['Dissemination', 'Infected macrophages carry the virus to lymph nodes, liver and spleen. Almost every cell type except lymphocytes can be infected.'],
        ['Cytokine storm and lymphocyte loss', 'Massive release of TNF-α, IL-6 and nitric oxide. Lymphocytes are not infected but die in huge numbers by apoptosis — profound lymphopenia alongside high viral load.'],
        ['Endothelial and coagulation failure', 'Tissue factor released from infected macrophages triggers disseminated intravascular coagulation. The endothelium becomes leaky; fluid moves out of the vascular space.'],
        ['Gastrointestinal fluid loss', 'Profuse vomiting and watery diarrhoea, up to 5–10 litres a day. This, with the leak, is what causes the lethal hypovolaemia and electrolyte derangement.'],
        ['Shock and multi-organ failure', 'Death typically between day 6 and 16, from hypovolaemic and distributive shock with severe metabolic disturbance.']
      ]}
    ]},
    { id: 'clinical', title: 'Clinical features', blocks: [
      { t: 'organs', items: [
        ['Dry phase, days 1–3', 'Abrupt fever, intense fatigue, headache, myalgia and sore throat. Non-specific — indistinguishable from malaria or typhoid, which is exactly the diagnostic problem in endemic regions.'],
        ['Wet phase, days 3–10', 'Profuse vomiting and watery diarrhoea, abdominal pain, and rapid volume depletion. This is where patients deteriorate and where treatment is decided.'],
        ['Haemorrhage', 'In under half of patients: bleeding from gums, injection and venepuncture sites, melaena, conjunctival haemorrhage. Massive haemorrhage is uncommon and is <i>not</i> the usual cause of death.'],
        ['Metabolic derangement', 'Hypokalaemia, hyponatraemia, hypocalcaemia, acute kidney injury and severe metabolic acidosis. Arrhythmia from potassium loss is a significant and correctable cause of death.'],
        ['Neurological', 'Confusion, agitation, seizures and encephalopathy in late disease.'],
        ['Recovery and sequelae', 'Survivors frequently have arthralgia, uveitis that can blind, hearing loss, and persistent fatigue — "post-Ebola syndrome".'],
        ['Viral persistence', 'Virus persists in immune-privileged sites — semen for a year or more, the eye, and the central nervous system. Sexual transmission from survivors has restarted outbreaks, and survivors are counselled and tested accordingly.']
      ]}
    ]},
    { id: 'staining', title: 'Laboratory handling and microscopy', blocks: [
      { t: 'p', text: 'There is no bench stain for Ebola, and there should be no attempt to culture it outside a BSL-4 facility. Diagnostic specimens are handled in a glove box or sealed centrifuge system, inactivated at the point of collection, and tested by PCR. Electron microscopy of inactivated material shows the filamentous morphology that first identified the family in 1967.' },
      { t: 'protocol', name: 'negstain' },
      { t: 'note', tone: 'warn', text: 'Routine laboratory work on an Ebola specimen is itself a major hazard. Full personal protective equipment, no aerosol-generating procedures outside containment, point-of-care analysers rather than main laboratory instruments, and specimens double-bagged and transported under UN2814 category A rules. Several laboratory and healthcare workers have died in every large outbreak.' }
    ]},
    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'Window', 'Note'], rows: [
        ['RT-PCR', 'From about 3 days after symptom onset', 'The diagnostic standard. A negative test before day 3 does not exclude — repeat at 72 hours if the patient remains symptomatic.'],
        ['Rapid antigen test', 'Symptomatic phase', 'For triage in the field; lower sensitivity, always confirmed by PCR.'],
        ['Antigen-capture ELISA', 'Symptomatic phase', 'Reference laboratories.'],
        ['IgM and IgG', 'From around day 10', 'Retrospective confirmation and survivor studies.'],
        ['Virus isolation', '—', 'BSL-4 only.'],
        ['Malaria test', 'Always', 'Co-infection is common and malaria is far more likely in the same setting. Never omit it.']
      ]}
    ]},
    { id: 'treatment', title: 'Treatment', blocks: [
      { t: 'ul', title: 'Supportive care — the intervention that saves the most lives', items: [
        'Aggressive fluid resuscitation, oral and intravenous, matched to measured losses. Case fatality in the 2014–16 epidemic was roughly halved where this was done well.',
        'Correction of potassium, sodium, calcium and magnesium, guided by point-of-care biochemistry.',
        'Antiemetics and antidiarrhoeals, so that oral rehydration remains possible.',
        'Empirical antimalarials and broad-spectrum antibiotics, because co-infection is common and indistinguishable clinically.',
        'Nutrition, analgesia and psychological support.'
      ]},
      { t: 'table', head: ['Specific therapy', 'Target', 'Status'], rows: [
        ['<b>Inmazeb</b> (atoltivimab, maftivimab, odesivimab)', 'Three monoclonals against Zaire GP', 'Licensed; improved survival in the PALM trial'],
        ['<b>Ebanga</b> (ansuvimab)', 'Single monoclonal against Zaire GP', 'Licensed; comparable benefit'],
        ['Remdesivir', 'RdRp', 'Inferior to the monoclonals in the PALM trial; developed for Ebola before being repurposed for COVID-19'],
        ['ZMapp', 'Monoclonal cocktail', 'Superseded'],
        ['For Sudan and Bundibugyo', '—', '<b>No licensed specific therapy.</b> Candidate vaccines and therapeutics are deployed under trial protocols during outbreaks.']
      ]}
    ]},
    { id: 'prevention', title: 'Prevention and outbreak control', blocks: [
      { t: 'ul', items: [
        '<b>Ervebo (rVSV-ZEBOV)</b> — a single-dose live vector vaccine, highly effective against Zaire ebolavirus, deployed by <b>ring vaccination</b>: vaccinating the contacts of a case and the contacts of those contacts.',
        '<b>Zabdeno/Mvabea</b> — a two-dose Ad26 and MVA regimen for preventive use, not outbreak response.',
        '<b>Case finding and isolation</b> in dedicated treatment units with strict zoning.',
        '<b>Contact tracing</b> with 21 days of follow-up for every contact.',
        '<b>Safe and dignified burial.</b> Bodies are at their most infectious at death, and traditional washing practices drove a large share of transmission in West Africa. Burial teams work with, not against, community and religious leaders.',
        '<b>Infection prevention in health facilities</b>, where amplification has repeatedly occurred.',
        '<b>Survivor care and semen testing</b>, to prevent sexual transmission restarting the chain.',
        '<b>Community engagement.</b> The single biggest determinant of whether an outbreak is controlled. Where communities do not trust the response, cases are hidden and the chain is never broken.'
      ]}
    ]},
    { id: 'epidemiology', title: 'Epidemiology', blocks: [
      { t: 'kv', items: [
        ['First recognised', '1976, simultaneously in Nzara (Sudan) and Yambuku (DR Congo), near the Ebola River'],
        ['2014–16 West Africa', '28,600 cases and 11,325 deaths in Guinea, Liberia and Sierra Leone — larger than all previous outbreaks combined'],
        ['2018–20 DR Congo', '3,470 cases, 2,287 deaths; the first large outbreak with vaccine and monoclonals available'],
        ['Current', 'A multi-country Bundibugyo virus outbreak, declared a PHEIC — see the outbreak watch on the home page'],
        ['Spillover driver', 'Contact with bats or bushmeat, then amplification by close care-giving and healthcare exposure'],
        ['Why it stays regional', 'Transmission requires direct fluid contact and patients are only infectious once symptomatic, so it spreads fast in households and hospitals but poorly through casual travel']
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Ebola disease fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/ebola-virus-disease'],
        ['WHO — Disease Outbreak News', 'https://www.who.int/emergencies/disease-outbreak-news'],
        ['CDC — Ebola', 'https://www.cdc.gov/ebola/'],
        ['WHO — Optimized supportive care for Ebola virus disease', 'https://www.who.int/publications/i/item/9789241515894'],
        ['PALM trial, NEJM 2019 — randomised therapeutics trial', 'https://www.nejm.org/doi/full/10.1056/NEJMoa1910993']
      ]}
    ]}
  ]
},

/* ───────────────────────────── Nipah ───────────────────────────── */
{
  id: 'nipah', name: 'Nipah virus', organism: 'Henipavirus nipahense', kind: 'virus',
  aka: ['nipah', 'henipavirus', 'kerala', 'bat', 'date palm sap', 'encephalitis', 'hendra', 'pteropus'],
  tagline: 'A bat virus that reaches people through date palm sap, and kills up to three quarters of those it infects.',
  hero: 'Nipah has no vaccine and no licensed treatment, a case fatality between 40 and 75%, and documented person-to-person spread. It is on every priority pathogen list for exactly those reasons — and India has had repeated outbreaks, most of them in Kerala.',
  quick: [
    ['Pathogen', '<i>Henipavirus nipahense</i>, family <i>Paramyxoviridae</i>'],
    ['Baltimore group', 'V — (−)ssRNA, non-segmented'],
    ['Genome', '≈18.2 kb'],
    ['Reservoir', '<i>Pteropus</i> fruit bats — flying foxes'],
    ['Receptor', 'Ephrin-B2 and ephrin-B3'],
    ['Incubation', '4–14 days, occasionally up to 45'],
    ['Case fatality', '40–75%'],
    ['Containment', 'BSL-4'],
    ['Status', 'WHO priority pathogen; no licensed vaccine or treatment']
  ],
  model: {
    kind: 'virion', radius: 1.36,
    envelope: '#2f8f7c', spikes: { type: 'fringe', count: 46, color: '#e8c04a' },
    spikes2: { type: 'club', count: 12, color: '#d06a9c' },
    capsid: { shape: 'coil', color: '#6fb4e0' },
    genome: { color: '#f0a060', strands: 1 },
    layers: [
      ['envelope', 'Lipid envelope', 'Highly pleomorphic — spherical and filamentous forms from 40 to over 600 nm.'],
      ['spikes', 'G protein (attachment)', 'Binds ephrin-B2 and ephrin-B3. Those receptors sit on neurons and endothelium, which is precisely why Nipah causes encephalitis and vasculitis.'],
      ['spikes2', 'F protein (fusion)', 'Fuses at neutral pH and produces the multinucleated syncytia seen in infected endothelium.'],
      ['capsid', 'Helical nucleocapsid', 'N, P and L wound around the genome.']
    ]
  },
  sections: [
    { id: 'classification', title: 'Classification and emergence', blocks: [
      { t: 'kv', items: [
        ['Family → Genus', '<i>Paramyxoviridae</i> → <i>Henipavirus</i>'],
        ['Species', '<i>Henipavirus nipahense</i> (Nipah) and <i>H. hendraense</i> (Hendra, in Australian horses)'],
        ['Strains', 'Malaysian and Bangladesh/India lineages, which differ clinically'],
        ['Reservoir', '<i>Pteropus medius</i> in South Asia; <i>P. vampyrus</i> and <i>P. hypomelanus</i> in South-East Asia'],
        ['Named after', 'Sungai Nipah, the Malaysian village where the first outbreak was investigated']
      ]},
      { t: 'timeline', items: [
        ['1998–99', 'Malaysia and Singapore. Bats infected pigs, pigs infected farm and abattoir workers. 265 cases, 105 deaths, and over a million pigs culled.'],
        ['2001', 'Siliguri, West Bengal — 66 cases, 45 deaths. Largely nosocomial, and only confirmed as Nipah retrospectively.'],
        ['2001 onward', 'Near-annual outbreaks in Bangladesh, linked to drinking raw date palm sap in winter.'],
        ['2018', 'Kozhikode, Kerala. 18 of 19 patients died. Contained in weeks by rapid contact tracing — a widely studied response.'],
        ['2019, 2021, 2023, 2024', 'Further Kerala outbreaks, each detected faster than the last.'],
        ['Now', 'A WHO blueprint priority pathogen, with CEPI-funded vaccine candidates in clinical trials.']
      ]},
      { t: 'note', tone: 'info', text: 'The route of transmission differs by region, and it determines everything about control. In Malaysia it was <b>pigs</b> as an amplifying host. In Bangladesh and India it is <b>raw date palm sap</b>, collected overnight in pots that fruit bats drink from and urinate into, and then drunk fresh before fermentation. The seasonality of the sap harvest is the seasonality of the outbreaks.' }
    ]},
    { id: 'structure', title: 'Structure and receptors', blocks: [
      { t: 'model' },
      { t: 'micro', kind: 'tem-nipah' },
      { t: 'p', text: 'Nipah binds ephrin-B2 and ephrin-B3 — host proteins involved in nervous system development and blood vessel formation. They are exceptionally well conserved across mammals, which explains both the virus\'s very wide host range and its particular targets: ephrin-B2 is abundant on arterial endothelium and neurons, ephrin-B3 on brainstem neurons. Tropism follows the receptor, and the clinical picture follows the tropism.' },
      { t: 'note', tone: 'warn', text: 'Because ephrin-B2 is so conserved, Nipah infects pigs, horses, cats, dogs, goats and humans without needing to adapt. There is no species barrier to cross — which is why spillover does not require the chain of mutations that H5N1 would need.' }
    ]},
    { id: 'clinical', title: 'Clinical features', blocks: [
      { t: 'organs', items: [
        ['Early illness', 'Fever, headache, myalgia, sore throat, vomiting. Indistinguishable from many febrile illnesses for the first few days.'],
        ['Encephalitis', 'Drowsiness progressing to coma over 24–48 hours. <b>Segmental myoclonus</b>, areflexia, hypotonia, gaze palsies and dysautonomia are characteristic. Brainstem involvement carries the worst prognosis.'],
        ['Respiratory', 'Cough and acute respiratory distress, prominent in the Bangladesh and India strains and largely absent in the Malaysian outbreak. Respiratory involvement is what makes person-to-person spread possible.'],
        ['Imaging', 'MRI shows multiple small, discrete, high-signal lesions scattered through the cortex and subcortical white matter — a pattern considered strongly suggestive.'],
        ['Relapsed and late-onset encephalitis', 'Months to years after recovery, or after an initially asymptomatic infection, in up to 10% of survivors. Caused by virus persisting in the central nervous system.'],
        ['Sequelae', 'Persistent neurological deficits, personality change and cognitive impairment in a third or more of survivors.']
      ]},
      { t: 'note', tone: 'warn', text: 'Nosocomial transmission has driven several outbreaks, including Siliguri and Kozhikode. Healthcare workers caring for an undiagnosed encephalitis patient have repeatedly become cases themselves. In any cluster of encephalitis with respiratory features in an endemic area, barrier precautions come before the diagnosis is confirmed.' }
    ]},
    { id: 'staining', title: 'Laboratory handling', blocks: [
      { t: 'p', text: 'Nipah is a BSL-4 agent. Culture and animal work require maximum containment, and in India that means the National Institute of Virology in Pune. Diagnostic specimens are inactivated at collection and handled by PCR under BSL-2 practices with BSL-3 precautions.' },
      { t: 'protocol', name: 'ift' },
      { t: 'note', tone: 'info', text: 'The histological hallmark is a <b>systemic vasculitis with syncytial giant cells in the endothelium</b>, together with thrombosis and ischaemic necrosis in the brain. Immunohistochemistry on post-mortem tissue was how the Siliguri outbreak was eventually attributed to Nipah, years after it occurred.' }
    ]},
    { id: 'diagnosis', title: 'Laboratory diagnosis', blocks: [
      { t: 'table', head: ['Test', 'Sample', 'Note'], rows: [
        ['RT-PCR', 'Throat swab, CSF, urine, blood', 'The frontline test. Throat swab and urine remain positive longer than blood.'],
        ['IgM ELISA', 'Serum, CSF', 'Positive from about day 5–7; used where PCR has become negative.'],
        ['IgG ELISA', 'Serum', 'Retrospective confirmation and seroprevalence surveys.'],
        ['Immunohistochemistry', 'Post-mortem tissue', 'Confirms fatal cases where no ante-mortem sample exists.'],
        ['Virus isolation', 'Vero cells', 'BSL-4 only.']
      ]},
      { t: 'note', tone: 'warn', text: 'Test early and test repeatedly. A single negative PCR on blood early in illness does not exclude Nipah; throat swab, urine and CSF should all be sent, and repeated if suspicion remains. In Kerala, the speed of testing has been the decisive factor in each outbreak response.' }
    ]},
    { id: 'treatment', title: 'Treatment and prevention', blocks: [
      { t: 'ul', title: 'Treatment', items: [
        'Supportive and intensive care only. There is no licensed antiviral.',
        'Ribavirin was used in Malaysia with an apparent reduction in mortality in an uncontrolled comparison; the evidence is weak and it is not formally recommended.',
        '<b>m102.4</b>, a human monoclonal antibody against the G protein, has been given on compassionate grounds in Australia and India and is in clinical trials.',
        'Remdesivir protects non-human primates and has been used compassionately.',
        'Management of seizures, raised intracranial pressure and respiratory failure determines outcome in practice.'
      ]},
      { t: 'ul', title: 'Prevention', items: [
        '<b>Do not drink raw date palm sap.</b> Boiling it, or covering collection pots with bamboo skirts, prevents bat contamination — a cheap intervention with demonstrated effect.',
        'Avoid eating fruit that has been partly eaten or found on the ground in bat-roosting areas.',
        'Strict infection control around encephalitis patients: full PPE, isolation, and restricted visiting.',
        'Contact tracing with 21-day quarantine, which is what contained the 2018 Kerala outbreak.',
        'Surveillance of bat populations and of pig farms near bat roosts.',
        'Vaccines in development — a Hendra G protein subunit vaccine is already licensed for horses in Australia, and human candidates based on the same antigen are in trials.'
      ]},
      { t: 'note', tone: 'ok', text: 'Kerala\'s response to the 2018 outbreak is studied internationally: the index cluster was recognised by an alert clinician, samples reached Pune within days, over 2,000 contacts were traced, and transmission was stopped within a month. Each subsequent outbreak has been detected faster. It is the clearest demonstration that a pathogen with no vaccine and no treatment can still be contained by surveillance and basic infection control.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['WHO — Nipah virus fact sheet', 'https://www.who.int/news-room/fact-sheets/detail/nipah-virus'],
        ['WHO — R&D Blueprint priority diseases', 'https://www.who.int/activities/prioritizing-diseases-for-research-and-development-in-emergency-contexts'],
        ['CDC — Nipah virus', 'https://www.cdc.gov/nipah-virus/'],
        ['National Institute of Virology, Pune', 'https://www.niv.co.in/'],
        ['CEPI — Nipah vaccine programme', 'https://cepi.net/nipah']
      ]}
    ]}
  ]
}

]);
