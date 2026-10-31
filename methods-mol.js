/* Methods, part 2: molecular biology, protein work and bioprocess. */
window.METHODS = (window.METHODS || []).concat([

{
  id: 'dnaprep', name: 'Nucleic acid extraction', kind: 'method', cat: 'Molecular biology',
  organism: 'Lysis, binding, washing, elution',
  aka: ['dna extraction', 'rna extraction', 'miniprep', 'spin column', 'phenol chloroform', 'trizol', 'a260', 'nanodrop', 'purification'],
  tagline: 'Four steps that have not changed in forty years, whatever the kit costs.',
  hero: 'Every extraction method does the same four things: break the cell open, stop the nucleases, separate nucleic acid from protein and lipid, and recover it in a buffer that will not inhibit whatever comes next. The kit chemistry varies; the logic does not.',
  quick: [
    ['Steps', 'Lyse → bind or partition → wash → elute'],
    ['Silica binding', 'Needs chaotropic salt — guanidinium thiocyanate'],
    ['Purity, DNA', 'A260/A280 ≈ 1.8'],
    ['Purity, RNA', 'A260/A280 ≈ 2.0'],
    ['Organic contamination', 'A260/A230 below 2.0 suggests guanidine or phenol carryover'],
    ['dsDNA', '1 A260 unit = 50 µg/mL'],
    ['RNA', '1 A260 unit = 40 µg/mL'],
    ['RNA rule', 'RNases are everywhere and need no cofactor — work cold, fast and gloved']
  ],
  sections: [
    { id: 'principle', title: 'The four steps', blocks: [
      { t: 'steps', items: [
        ['Lysis', 'Break the cell and inactivate nucleases in one move. Detergent (SDS, Triton) solubilises membranes; chaotropic salt denatures protein; proteinase K digests it; and for tough walls you add mechanical force — bead beating, or lysozyme for Gram-positives and lyticase for yeast. Mycobacteria need bead beating or boiling because of the mycolic acid layer.'],
        ['Separation', 'Silica columns: chaotropic salt strips the hydration shell from both silica and the DNA backbone, so nucleic acid adsorbs while protein flows through. Phenol–chloroform: protein partitions into the organic phase, nucleic acid stays in the aqueous. Magnetic beads: the same silica chemistry on a bead, so no centrifugation is needed and it automates easily.'],
        ['Washing', 'Ethanol-containing buffers remove salt and protein while nucleic acid stays bound. The final dry spin matters — residual ethanol inhibits PCR and ruins downstream enzymology.'],
        ['Elution', 'Low-salt buffer or nuclease-free water rehydrates the backbone and releases it. Warm elution buffer to 55–65 °C and let it sit on the membrane for a minute to raise the yield.']
      ]},
      { t: 'note', tone: 'warn', text: 'For RNA, everything changes. RNases are stable, need no metal cofactor, refold after boiling and are on every surface and fingertip. Use certified nuclease-free plastics, change gloves often, keep samples on ice, and lyse directly into a guanidinium reagent. <b>TRIzol and its equivalents work because they inactivate RNase in the same instant they lyse the cell</b> — there is no window during which intact RNA sits unprotected.' }
    ]},
    { id: 'methods', title: 'Choosing a method', blocks: [
      { t: 'table', head: ['Method', 'Principle', 'Best for', 'Drawbacks'], rows: [
        ['Silica spin column', 'Chaotropic binding to a glass fibre membrane', 'Routine DNA and RNA, small numbers of samples', 'Limited capacity; column overload lowers purity'],
        ['Magnetic beads', 'Silica-coated paramagnetic particles', 'Automation, 96-well work, variable volumes', 'Bead carryover inhibits PCR'],
        ['Phenol–chloroform + ethanol precipitation', 'Liquid–liquid partition', 'High molecular weight DNA, very large yields', 'Toxic, slow, phenol carryover'],
        ['CTAB', 'Cationic detergent precipitating polysaccharide', 'Plants, and bacteria with heavy capsules', 'Multi-step'],
        ['Alkaline lysis (miniprep)', 'NaOH/SDS denatures everything; neutralisation renatures only supercoiled plasmid', 'Plasmid DNA from <i>E. coli</i>', 'Chromosomal carryover if vortexed after NaOH'],
        ['Boiling / crude lysate', 'Heat lysis, no purification', 'Colony PCR screening', 'Inhibitors present; not for quantitation'],
        ['Chelex', 'Resin chelates divalent cations, protecting DNA on boiling', 'Forensic and low-volume samples', 'Single-stranded DNA only; not for restriction digest']
      ]},
      { t: 'note', tone: 'info', text: 'The <b>alkaline lysis miniprep</b> is worth understanding rather than just following. NaOH denatures chromosomal and plasmid DNA alike, but the covalently closed circular plasmid stays topologically interlinked. On neutralisation with potassium acetate the plasmid snaps back to its duplex form and stays soluble, while the vast chromosomal strands tangle irreversibly and precipitate with the SDS–protein complex. Vigorous vortexing after adding NaOH shears the chromosome into plasmid-sized fragments and ruins that selectivity — which is why every protocol says to invert gently.' }
    ]},
    { id: 'qc', title: 'Quality control', blocks: [
      { t: 'table', head: ['Measure', 'What it means', 'Target'], rows: [
        ['A260', 'Nucleic acid concentration', 'dsDNA: ×50 µg/mL · ssDNA: ×33 · RNA: ×40 · oligos: ×33'],
        ['A260/A280', 'Protein contamination — aromatic residues absorb at 280', 'DNA 1.8 · RNA 2.0. Low means protein or phenol.'],
        ['A260/A230', 'Organic and salt carryover — guanidine, phenol, EDTA absorb at 230', '2.0–2.2. Low is the commonest cause of downstream inhibition.'],
        ['Fluorometric assay (Qubit)', 'Dye binds dsDNA specifically, so free nucleotides and RNA are not counted', 'The honest number — use it for anything going into sequencing'],
        ['Gel or Bioanalyzer', 'Integrity, not just quantity', 'RNA integrity number (RIN) above 7 for expression work; above 8 for sequencing']
      ]},
      { t: 'note', tone: 'warn', text: 'Spectrophotometry cannot tell DNA from RNA from free nucleotides — they all absorb at 260 nm. A NanoDrop reading of 200 ng/µL on an RNA prep contaminated with genomic DNA is simply wrong, and the error carries straight through into your qPCR normalisation. For any quantitative application, measure with a <b>fluorometric dye</b> that binds only the species you care about.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['Addgene — molecular biology protocols', 'https://www.addgene.org/protocols/'],
        ['Cold Spring Harbor Protocols', 'https://cshprotocols.cshlp.org/'],
        ['Thermo Fisher — nucleic acid purity assessment', 'https://www.thermofisher.com/us/en/home/industrial/spectroscopy-elemental-isotope-analysis/molecular-spectroscopy/ultraviolet-visible-visible-spectrophotometry-uv-vis-vis/uv-vis-vis-information/assessing-nucleic-acid-purity.html']
      ]}
    ]}
  ]
},

{
  id: 'pcr', name: 'PCR and qPCR', kind: 'method', cat: 'Molecular biology',
  organism: 'Amplification, real-time detection, reverse transcription',
  aka: ['pcr', 'qpcr', 'rt-pcr', 'real time pcr', 'taq', 'primer', 'thermal cycler', 'ct value', 'cq', 'taqman', 'sybr', 'amplification', 'tm', 'annealing'],
  tagline: 'Doubling a chosen stretch of DNA, thirty times over.',
  hero: 'PCR turns a single target molecule into a billion copies in two hours, using nothing but two short primers, a heat-stable polymerase and a machine that changes temperature. Every molecular diagnostic on the pathogen profiles here — from HIV viral load to Xpert MTB/RIF — is a PCR underneath.',
  quick: [
    ['Invented', 'Kary Mullis, 1983. Nobel Prize 1993.'],
    ['Polymerase', '<i>Taq</i> from <i>Thermus aquaticus</i> — survives 95 °C'],
    ['Amplification', '2ⁿ, so 30 cycles ≈ 10⁹-fold'],
    ['Denaturation', '94–98 °C, 20–30 s'],
    ['Annealing', '50–65 °C, typically Tm − 5 °C, 20–30 s'],
    ['Extension', '72 °C, about 1 min per kb for <i>Taq</i>'],
    ['Cycles', '25–35. Beyond 40 you amplify artefact.'],
    ['qPCR efficiency', '90–110%, slope −3.32 is 100%']
  ],
  sections: [
    { id: 'reaction', title: 'The reaction and the cycle', blocks: [
      { t: 'table', head: ['Component', 'Typical final concentration', 'What it does'], rows: [
        ['Template DNA', '1 pg – 100 ng', 'Too much inhibits; too little loses sensitivity'],
        ['Forward and reverse primers', '0.1–0.5 µM each', 'Define the two ends of the product and give the polymerase a 3′-OH to extend'],
        ['dNTPs', '200 µM each', 'The building blocks. Imbalance raises the error rate.'],
        ['MgCl₂', '1.5–2.5 mM', 'Essential cofactor. Too low and nothing amplifies; too high and you get non-specific product.'],
        ['DNA polymerase', '1–2.5 U per 50 µL', '<i>Taq</i> for routine work; a proofreading enzyme (Pfu, Q5, Phusion) for cloning and sequencing'],
        ['Buffer', '1×', 'Maintains pH around 8.3–8.8 at the extension temperature']
      ]},
      { t: 'steps', items: [
        ['Initial denaturation', '95 °C for 2–5 minutes. Fully separates the template, and activates a hot-start polymerase if one is used.'],
        ['Denaturation', '94–98 °C for 20–30 seconds. The strands separate.'],
        ['Annealing', '50–65 °C for 20–30 seconds. Primers bind their complementary sequences. This is the specificity-determining step: too low and primers bind imperfect matches, too high and they do not bind at all.'],
        ['Extension', '72 °C for about 1 minute per kilobase. The polymerase synthesises the new strand from each primer\'s 3′ end.'],
        ['Repeat', 'Steps 2–4, for 25–35 cycles. Product accumulates exponentially until primers or nucleotides run low and the curve plateaus.'],
        ['Final extension', '72 °C for 5–10 minutes. Completes any partial products, and lets <i>Taq</i> add the terminal A overhang used in TA cloning.']
      ]},
      { t: 'note', tone: 'info', text: '<b>Hot-start</b> polymerases are blocked by an antibody or a chemical modification that only releases above 90 °C. Without one, the polymerase is active while you set up on the bench at room temperature, where primers bind loosely to anything — and it extends those mismatches into primer-dimers and non-specific products before the run even begins. For any sensitive assay, hot-start is not optional.' }
    ]},
    { id: 'primers', title: 'Primer design', blocks: [
      { t: 'ul', items: [
        '<b>Length 18–25 nucleotides.</b> Shorter loses specificity, longer anneals sluggishly.',
        '<b>GC content 40–60%</b>, distributed evenly rather than clustered at one end.',
        '<b>Melting temperatures within 5 °C of each other</b>, ideally 55–65 °C. Mismatched Tm means one primer anneals and the other does not.',
        '<b>A G or C at the 3′ end</b> — the GC clamp — because that terminal base pair anchors the extension point.',
        '<b>No 3′ complementarity</b> between primers, and none within a primer. Self-annealing 3′ ends produce primer-dimers that consume the reaction.',
        '<b>Avoid runs of four or more identical bases</b>, which cause slippage.',
        '<b>Check specificity</b> by BLAST against the target genome before ordering.',
        '<b>For qPCR,</b> aim for a product of 70–150 bp, and place the primers across an exon–exon junction so genomic DNA cannot amplify.'
      ]},
      { t: 'note', tone: 'info', text: 'For oligonucleotides under about 14 bases the Wallace rule is adequate: <b>Tm = 2(A+T) + 4(G+C)</b>. Above that it overestimates badly, and a nearest-neighbour calculation that accounts for stacking energies and salt concentration is needed. The calculators page on this site implements both, so you can see how far apart they are.' }
    ]},
    { id: 'variants', title: 'qPCR, RT-PCR and the rest', blocks: [
      { t: 'table', head: ['Variant', 'What it adds', 'Used for'], rows: [
        ['<b>qPCR (real-time)</b>', 'Fluorescence measured every cycle, so the product is quantified as it accumulates', 'Viral load, gene expression, pathogen detection'],
        ['<b>RT-PCR</b>', 'A reverse transcription step first, making cDNA from RNA', 'RNA viruses — SARS-CoV-2, influenza, dengue, HIV'],
        ['<b>RT-qPCR</b>', 'Both together', 'The standard clinical molecular assay'],
        ['<b>Nested PCR</b>', 'A second round with primers inside the first product', 'Very low copy number; high contamination risk'],
        ['<b>Multiplex PCR</b>', 'Several primer pairs in one tube', 'Respiratory and gastrointestinal panels'],
        ['<b>Digital PCR</b>', 'Reaction split into thousands of partitions, counted as positive or negative', 'Absolute quantification without a standard curve; rare variant detection'],
        ['<b>LAMP</b>', 'Isothermal — no thermal cycler, 60–65 °C throughout', 'Point of care, including Truenat for tuberculosis']
      ]},
      { t: 'ul', title: 'Reading a qPCR run', items: [
        '<b>Cq (or Ct)</b> is the cycle at which fluorescence crosses the threshold. It is inversely proportional to the log of starting template — a lower Cq means more target.',
        '<b>A difference of 1 Cq is roughly a twofold difference</b> in starting material, and 3.32 cycles is tenfold.',
        '<b>SYBR Green</b> binds any double-stranded DNA, so it is cheap but reports primer-dimers as signal. Always run a <b>melt curve</b>: a single sharp peak means one product.',
        '<b>TaqMan probes</b> carry a fluorophore and a quencher. The polymerase\'s 5′ exonuclease degrades the bound probe during extension, separating them. Specific, and multiplexable with different dyes.',
        '<b>Efficiency</b> comes from the slope of a standard curve: −3.32 is 100%. Acceptable is 90–110%, which is a slope between −3.1 and −3.6.',
        '<b>Relative quantification</b> uses the ΔΔCq method against a reference gene — and the reference gene must be shown to be stable under your conditions, not simply assumed.'
      ]},
      { t: 'note', tone: 'warn', text: '<b>Contamination is the defining risk of PCR.</b> A single previous amplicon aerosolised onto a pipette produces convincing false positives for months. The controls are physical: separate rooms or at minimum separate areas and dedicated equipment for reagent preparation, template addition and post-amplification analysis, with unidirectional workflow. Filter tips throughout. A no-template control on every run, and an extraction control to catch inhibition.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['MIQE guidelines — minimum information for qPCR experiments', 'https://academic.oup.com/clinchem/article/55/4/611/5631762'],
        ['NEB — PCR protocols and Tm calculator', 'https://international.neb.com/tools-and-resources/usage-guidelines/pcr-protocols'],
        ['Primer3 — primer design', 'https://primer3.ut.ee/'],
        ['NCBI Primer-BLAST', 'https://www.ncbi.nlm.nih.gov/tools/primer-blast/']
      ]}
    ]}
  ]
},

{
  id: 'gel', name: 'Gel electrophoresis', kind: 'method', cat: 'Molecular biology',
  organism: 'Agarose for nucleic acid, polyacrylamide for protein',
  aka: ['gel', 'electrophoresis', 'agarose', 'sds page', 'ladder', 'ethidium bromide', 'tae', 'tbe', 'loading dye', 'coomassie', 'western'],
  tagline: 'Separating molecules by pulling them through a mesh with an electric field.',
  hero: 'Nucleic acid carries a uniform negative charge per unit length, so in a gel it separates purely by size. Protein does not, which is why SDS is added to make it behave the same way. Both are the same idea: a sieve, a field, and a stain.',
  quick: [
    ['Direction', 'Toward the anode (+) — the phosphate backbone is negative'],
    ['Migration', 'Inversely proportional to log₁₀ of fragment size'],
    ['Agarose range', '0.7% for 1–20 kb · 1% for 0.5–10 kb · 2% for 0.1–2 kb'],
    ['Buffer', 'TAE for preparative work · TBE for sharper small fragments'],
    ['Voltage', '5–10 V per cm of electrode distance'],
    ['SDS-PAGE', 'Stacking gel pH 6.8, resolving gel pH 8.8'],
    ['Protein stain', 'Coomassie to ~50 ng; silver to ~1 ng']
  ],
  sections: [
    { id: 'agarose', title: 'Agarose gels for nucleic acid', blocks: [
      { t: 'protocol', def: {
        name: 'Agarose gel electrophoresis',
        badge: 'Nucleic acid',
        aka: 'The routine check on any PCR, digest or prep',
        use: 'Confirms that a product is the expected size, that a digest went to completion, and that a prep is intact rather than degraded.',
        reagents: [
          ['Agarose', '#e8e0cc', 'Purified polysaccharide from seaweed. Percentage sets the pore size.', '0.7–2% w/v in running buffer'],
          ['TAE or TBE buffer', '#9ac4d8', 'Carries the current and holds pH around 8, keeping DNA negatively charged.', 'TAE: better for fragments to be extracted. TBE: higher buffering, sharper small bands, but borate inhibits some enzymes.'],
          ['Loading dye', '#4f7fd4', 'Glycerol or Ficoll to sink the sample, plus tracking dyes.', 'Bromophenol blue runs with ~300 bp in 1% agarose; xylene cyanol with ~4 kb'],
          ['Stain', '#d8604a', 'Intercalating or groove-binding fluorescent dye.', 'Ethidium bromide (mutagenic), or SYBR Safe / GelRed as safer alternatives'],
          ['Size ladder', '#8fb48f', 'Fragments of known length run alongside.', '1 kb ladder for large products, 100 bp for small']
        ],
        steps: [
          ['Weigh agarose into running buffer and melt it in a microwave, swirling until completely clear with no lenses of undissolved gel.', '2–3 min', 'Undissolved agarose distorts bands. Loosen the cap — superheated buffer boils over violently.'],
          ['Cool to about 55 °C, add stain if casting it in, pour, and insert the comb.', '', 'Pour hotter than that and you warp the tray; cooler and it sets as you pour.'],
          ['Let it set.', '20–30 min', 'Properly set, or the wells tear when you remove the comb.'],
          ['Place in the tank, remove the comb, and submerge in running buffer to about 2–5 mm above the gel.', '', 'The same buffer as the gel was cast in. Mixing TAE and TBE gives a shifting field and smiling bands.'],
          ['Mix each sample with loading dye and load slowly into the wells. Load the ladder first.', '', 'Keep the pipette tip just above the well — pushing into the gel punches through the bottom.'],
          ['Run at 5–10 V/cm until the front dye has travelled two-thirds of the gel.', '30–60 min', 'Higher voltage is faster but heats the gel and smears the bands.'],
          ['Visualise on a transilluminator or gel documentation system.', '', 'Use a blue-light transilluminator where possible — UV nicks DNA you intend to clone, and blue light is safer for the user.']
        ],
        result: 'Discrete bands, each a population of molecules of one size. Compare against the ladder to size them. <b>Supercoiled plasmid runs faster than linear, which runs faster than open circular (nicked)</b> — so an uncut plasmid prep typically shows three bands and it is a common mistake to read them as a mixture of different plasmids.',
        mechanism: 'Agarose forms a hydrogel whose pore size falls as the percentage rises. DNA has one negative charge per phosphate, so charge-to-mass ratio is constant regardless of length and the electric force per unit mass is identical for every fragment. Separation comes entirely from sieving: longer molecules must reptate through the mesh and are retarded more. Mobility is therefore proportional to the negative log of molecular length, which is why a size ladder plots as a straight line on semi-log paper.',
        pitfalls: [
          'Wrong percentage, so the fragments of interest either run off the end or stay in a block at the top.',
          'Running buffer reused too many times — ion depletion causes slow migration and heating.',
          'Overloading, which gives fat smeared bands and can make two close fragments look like one.',
          'Bands "smiling" from overheating at too high a voltage.',
          'Degraded sample, visible as a low-molecular-weight smear rather than discrete bands.'
        ],
        safety: 'Ethidium bromide is a mutagen and an intercalating agent — double gloves, a dedicated work area and proper waste disposal. SYBR Safe and GelRed are substantially safer and usually adequate. UV transilluminators cause corneal and skin burns: use the shield and wear a face shield.'
      }}
    ]},
    { id: 'page', title: 'SDS-PAGE and Western blotting', blocks: [
      { t: 'p', text: 'Protein cannot be separated by size in its native state, because every protein has its own charge and its own folded shape. SDS solves both problems at once: it unfolds the protein and coats it at a roughly constant ratio of about 1.4 g SDS per gram of protein, so every polypeptide carries a similar negative charge per unit mass. What remains is a sieving separation by size, exactly as for DNA.' },
      { t: 'table', head: ['Element', 'Detail'], rows: [
        ['Sample buffer (Laemmli)', 'SDS to coat and denature, glycerol to sink the sample, bromophenol blue to track, Tris pH 6.8, and a reducing agent — β-mercaptoethanol or DTT — to break disulphide bonds. Heat at 95 °C for 5 minutes.'],
        ['Stacking gel, pH 6.8', 'Low percentage, large pores. The glycine/chloride ion front compresses all the sample into a razor-thin band before it enters the resolving gel — which is why bands are sharp despite a well several millimetres deep.'],
        ['Resolving gel, pH 8.8', 'Percentage chosen for the target: 7.5% for 50–200 kDa, 10% for 20–100 kDa, 12–15% for 10–50 kDa. Gradient gels cover a wide range at once.'],
        ['Reducing vs non-reducing', 'Without a reducing agent, disulphide-linked subunits stay together — which is how you demonstrate that a protein is a covalent multimer.'],
        ['Staining', 'Coomassie brilliant blue to about 50 ng per band; silver stain to about 1 ng but harder to quantify and incompatible with mass spectrometry unless modified.'],
        ['Markers', 'Pre-stained for transfer monitoring; unstained for accurate sizing.']
      ]},
      { t: 'steps', items: [
        ['Run the gel', 'Constant voltage, typically 100–200 V, until the dye front reaches the bottom.'],
        ['Transfer', 'Blot onto nitrocellulose or PVDF membrane, wet or semi-dry. PVDF must be pre-wetted in methanol. Check transfer by the pre-stained markers appearing on the membrane.'],
        ['Block', '5% non-fat milk or BSA in TBS-Tween for 1 hour. Milk is cheaper, but it contains phosphoproteins and must not be used when probing with a phospho-specific antibody.'],
        ['Primary antibody', 'Diluted in blocking buffer, 1 hour at room temperature or overnight at 4 °C. Wash three times in TBS-Tween.'],
        ['Secondary antibody', 'Enzyme-conjugated anti-species antibody, usually HRP, for 1 hour. Wash thoroughly — insufficient washing is the usual cause of a dirty blot.'],
        ['Detect', 'Enhanced chemiluminescence substrate, imaged on film or a digital imager. Fluorescent secondaries allow two targets at once and a wider linear range.'],
        ['Loading control', 'Re-probe for a housekeeping protein — GAPDH, β-actin, tubulin — or use total protein stain. Without one, a difference in band intensity means nothing.']
      ]},
      { t: 'note', tone: 'warn', text: 'A Western blot is only semi-quantitative, and chemiluminescent film saturates easily. Densitometry on a saturated band understates the difference between samples, sometimes dramatically. Validate the antibody — ideally against a knockout or knockdown — before treating any band as the protein you think it is.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['Addgene — agarose gel electrophoresis protocol', 'https://www.addgene.org/protocols/gel-electrophoresis/'],
        ['Bio-Rad — electrophoresis guide', 'https://www.bio-rad.com/en-us/applications-technologies/protein-electrophoresis-methods'],
        ['NEB — gel loading dye and ladder reference', 'https://www.neb.com/en/tools-and-resources/usage-guidelines/dna-markers-and-ladders']
      ]}
    ]}
  ]
},

{
  id: 'cloning', name: 'Molecular cloning', kind: 'method', cat: 'Molecular biology',
  organism: 'Restriction, ligation, transformation, screening',
  aka: ['cloning', 'restriction enzyme', 'ligation', 'transformation', 'plasmid', 'vector', 'competent cells', 'blue white', 'gibson', 'golden gate', 'insert'],
  tagline: 'Putting a chosen gene into a bacterium and making it stay there.',
  hero: 'Cloning is the foundational operation of biotechnology: cut DNA at defined positions, join a fragment into a vector, put that vector into a cell, and select the cells that took it. Every recombinant protein, every engineered strain and every gene therapy construct starts here.',
  quick: [
    ['Vector elements', 'Origin of replication, selectable marker, multiple cloning site, promoter'],
    ['Restriction enzymes', 'Type II — cut within palindromic recognition sites'],
    ['Ligase', 'T4 DNA ligase, requires ATP'],
    ['Vector:insert ratio', '1:3 molar, for sticky-end ligation'],
    ['Chemical transformation', 'CaCl₂, ice, heat shock 42 °C for 45 s'],
    ['Efficiency', '10⁶–10⁸ CFU per µg for chemical; 10⁹–10¹⁰ for electroporation'],
    ['Screening', 'Antibiotic selection, then blue-white, colony PCR, then sequencing']
  ],
  sections: [
    { id: 'tools', title: 'The toolkit', blocks: [
      { t: 'table', head: ['Component', 'Role', 'Notes'], rows: [
        ['<b>Restriction endonuclease</b>', 'Cuts double-stranded DNA at a specific recognition sequence', 'Type II enzymes recognise 4–8 bp palindromes. <i>Eco</i>RI leaves a 5′ AATT overhang; <i>Sma</i>I cuts blunt. Star activity — relaxed specificity — appears with too much enzyme, too much glycerol or the wrong buffer.'],
        ['<b>T4 DNA ligase</b>', 'Forms the phosphodiester bond between a 3′-OH and a 5′-phosphate', 'Needs ATP. Sticky ends ligate efficiently at 16 °C overnight; blunt ends need far more enzyme and are much less efficient.'],
        ['<b>Alkaline phosphatase</b>', 'Removes the vector\'s 5′ phosphates', 'Stops the vector re-circularising on itself without an insert. Must be fully inactivated before ligation.'],
        ['<b>Vector</b>', 'The replicon that carries the insert', 'Origin of replication sets copy number; a selectable marker (<i>bla</i>, <i>kan</i>) keeps it in the population; the multiple cloning site provides unique restriction sites.'],
        ['<b>Competent cells</b>', 'Bacteria made able to take up DNA', 'DH5α for cloning — <i>recA</i> and <i>endA</i> deficient for stability and clean minipreps. BL21(DE3) for expression.'],
        ['<b>Polymerase</b>', 'Amplifies the insert with added restriction sites or overlaps', 'Must be proofreading. <i>Taq</i>\'s error rate is unacceptable for a construct you will express.']
      ]},
      { t: 'note', tone: 'info', text: 'Restriction enzymes are a bacterial immune system. The restriction–modification pair cuts incoming foreign DNA while a methyltransferase protects the host\'s own sites by methylating them. That is also why <i>Dam</i> and <i>Dcm</i> methylation in <i>E. coli</i> blocks some enzymes — if a digest unexpectedly fails, methylation sensitivity is the first thing to check.' }
    ]},
    { id: 'workflow', title: 'The workflow', blocks: [
      { t: 'steps', items: [
        ['Design', 'Choose restriction sites present in the vector\'s cloning site and absent from your insert. Keep the reading frame if you are making a fusion. Add 6 extra bases outside each site — enzymes cut poorly at the very end of a fragment.'],
        ['Prepare the insert', 'Amplify with a proofreading polymerase using primers carrying the restriction sites, or excise it from another plasmid. Gel-purify.'],
        ['Digest', 'Cut vector and insert with the same two enzymes. Use two different enzymes wherever possible — directional cloning guarantees orientation and stops the vector self-ligating.'],
        ['Dephosphorylate the vector', 'Only if a single enzyme was used, or the ends are blunt. Heat-inactivate or column-purify afterwards.'],
        ['Ligate', 'Vector to insert at a 1:3 molar ratio. 16 °C overnight, or room temperature for 1 hour with a rapid ligase. Always set up a vector-only control — its colony count tells you your background.'],
        ['Transform', 'Add ligation mix to thawed competent cells, 30 minutes on ice, heat shock at 42 °C for 45 seconds, 2 minutes back on ice, then recover in SOC at 37 °C for 1 hour before plating on selective agar.'],
        ['Screen', 'Count colonies against the vector-only control. Pick candidates and screen by colony PCR or by restriction digest of minipreps.'],
        ['Verify by sequencing', 'Always. The insert, the junctions and the whole reading frame. A construct that has not been sequenced is not a construct.']
      ]},
      { t: 'note', tone: 'warn', text: 'The heat shock is not symbolic. Cells held in cold calcium chloride have a destabilised membrane with DNA adsorbed to the surface; the sudden shift to 42 °C creates a thermal imbalance that drives uptake, and returning to ice immediately afterwards is what lets the membrane reseal. Leaving cells at 42 °C for two minutes instead of forty-five seconds kills most of them, and is a common reason transformations fail.' }
    ]},
    { id: 'screening', title: 'Screening and modern alternatives', blocks: [
      { t: 'ul', title: 'Blue-white screening', items: [
        'The vector carries <i>lacZ</i>α, encoding the N-terminal fragment of β-galactosidase. The host supplies the rest — together they reconstitute a working enzyme, which is called α-complementation.',
        'The multiple cloning site sits inside <i>lacZ</i>α. An insert disrupts the reading frame, so no functional enzyme is made.',
        'On agar with IPTG (to induce) and X-gal (the chromogenic substrate), intact vector gives <b>blue</b> colonies and recombinants give <b>white</b> ones.',
        'Pale blue colonies are a real phenomenon — a small in-frame insert may leave partial activity. Confirm by PCR rather than by colour alone.'
      ]},
      { t: 'table', head: ['Modern method', 'How it works', 'Advantage'], rows: [
        ['<b>Gibson assembly</b>', 'Fragments share 20–40 bp overlaps. An exonuclease chews back 5′ ends, the complementary single strands anneal, polymerase fills and ligase seals — all in one tube at 50 °C for an hour.', 'Scarless, no restriction sites needed, several fragments at once'],
        ['<b>Golden Gate</b>', 'Type IIS enzymes such as <i>Bsa</i>I cut <i>outside</i> their recognition site, so the site is removed from the product and cannot re-cut. Digestion and ligation run together in one cycling reaction.', 'Scarless, highly modular, ideal for standardised part libraries'],
        ['<b>TA cloning</b>', '<i>Taq</i> leaves a single 3′ A overhang; the vector is supplied with a T overhang.', 'Fast and simple for direct PCR product cloning, but not directional'],
        ['<b>Gateway</b>', 'Site-specific recombination using bacteriophage λ <i>att</i> sites and recombinase enzymes.', 'Move one insert between many vectors without re-cloning'],
        ['<b>Site-directed mutagenesis</b>', 'Primers carrying the desired change amplify the whole plasmid; <i>Dpn</i>I then digests the methylated parental template only.', 'Point mutations, insertions and deletions in an existing construct']
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['Addgene — molecular cloning guide', 'https://www.addgene.org/mol-bio-reference/'],
        ['NEB — cloning and ligation protocols', 'https://www.neb.com/en/applications/cloning-and-synthetic-biology'],
        ['SnapGene — plasmid maps and cloning simulation', 'https://www.snapgene.com/']
      ]}
    ]}
  ]
},

{
  id: 'elisa', name: 'ELISA and immunoassay', kind: 'method', cat: 'Molecular biology',
  organism: 'Direct, indirect, sandwich, competitive',
  aka: ['elisa', 'immunoassay', 'antibody', 'antigen', 'sandwich elisa', 'tmb', 'standard curve', 'od450', 'serology', 'lateral flow'],
  tagline: 'Measuring one molecule in a complex mixture, using an antibody as the probe.',
  hero: 'ELISA is how most of the numbers on the pathogen profiles here are generated: HIV antigen/antibody screening, hepatitis B surface antigen, dengue NS1 and IgM, and the p24 readings in the culture simulation. The antibody supplies specificity; the enzyme supplies amplification.',
  quick: [
    ['Format', '96-well polystyrene plate'],
    ['Enzyme', 'Horseradish peroxidase, or alkaline phosphatase'],
    ['Substrate', 'TMB — blue, turns yellow when stopped with acid'],
    ['Read', '450 nm after stopping; 620 nm as reference'],
    ['Blocking', 'BSA, casein or non-fat milk'],
    ['Sensitivity', 'Picogram per mL for a good sandwich assay'],
    ['Curve fit', 'Four-parameter logistic, not linear regression']
  ],
  sections: [
    { id: 'formats', title: 'The four formats', blocks: [
      { t: 'organs', title: 'Which format you choose depends on what you are measuring and what reagents exist for it.', items: [
        ['Direct ELISA', 'Antigen is coated onto the plate; a single enzyme-labelled antibody binds it. Fast and with few cross-reactivity problems, but no amplification step and every antibody must be individually conjugated. Rarely the best choice.'],
        ['Indirect ELISA', 'Antigen coated; an unlabelled primary antibody binds; an enzyme-labelled anti-species secondary binds the primary. Several secondaries bind each primary, so the signal is amplified, and one secondary serves any primary from that species. <b>This is the format used for antibody detection in serology</b> — coat with viral antigen and test whether the patient has antibodies to it.'],
        ['Sandwich ELISA', 'A capture antibody is coated; the sample is added and the antigen is captured; a second detection antibody against a different epitope binds, and is itself detected. The most sensitive and specific format, because the analyte must be recognised twice. <b>This is how antigen is measured</b> — HBsAg, dengue NS1, HIV p24. It requires a matched antibody pair against non-overlapping epitopes.'],
        ['Competitive ELISA', 'Sample antigen competes with a labelled antigen for a limited amount of antibody. Signal is <b>inversely</b> proportional to concentration — more analyte means less colour. Used for small molecules with only one epitope, such as hormones and drugs, where a sandwich is impossible.']
      ]},
      { t: 'note', tone: 'info', text: 'Fourth-generation HIV tests combine two formats on one strip: an indirect assay for anti-HIV antibodies and a sandwich assay for p24 antigen. That is exactly why they shorten the window period — p24 appears days before antibodies do.' }
    ]},
    { id: 'protocol', title: 'Procedure', blocks: [
      { t: 'protocol', def: {
        name: 'Sandwich ELISA',
        badge: 'Quantitative',
        aka: 'The workhorse format for measuring an antigen',
        use: 'Antigen quantification in serum, plasma, culture supernatant or lysate.',
        reagents: [
          ['Capture antibody', '#5b7fc4', 'Coats the well and binds the analyte.', 'Usually monoclonal, 1–10 µg/mL in carbonate buffer pH 9.6'],
          ['Blocking buffer', '#c8c0b0', 'Occupies unbound plastic so nothing sticks non-specifically.', '1–5% BSA or casein in PBS'],
          ['Detection antibody', '#b06a9e', 'Binds a second, non-overlapping epitope.', 'Often biotinylated, then detected with streptavidin-HRP for extra amplification'],
          ['TMB substrate', '#3cb8c8', '3,3′,5,5′-tetramethylbenzidine. Oxidised by HRP to a blue product.', 'Light-sensitive; keep in the dark'],
          ['Stop solution', '#d8604a', 'Halts the enzyme and shifts the colour for reading.', '1–2 M sulphuric acid — blue turns yellow'],
          ['Wash buffer', '#9ac4d8', 'Removes everything unbound between steps.', 'PBS with 0.05% Tween-20']
        ],
        steps: [
          ['Coat the plate with capture antibody in carbonate buffer and incubate overnight at 4 °C.', '12–18 h', 'Adsorption to polystyrene is passive and hydrophobic — it needs time and the right pH.'],
          ['Wash three times, then block.', '1 h', 'Skipping or shortening the block is the usual cause of a high background across the whole plate.'],
          ['Wash. Add standards, controls and samples in duplicate. Incubate.', '1–2 h', 'Standards must be in the same matrix as the samples, or the curve will not apply to them.'],
          ['Wash three to five times. Add detection antibody.', '1 h', 'Washing is the step most often done badly. Residual liquid between steps carries signal forward.'],
          ['Wash. Add enzyme conjugate if the detection antibody was biotinylated.', '30 min', ''],
          ['Wash thoroughly. Add TMB and develop in the dark.', '10–30 min', 'Watch the highest standard — stop when it is strongly coloured but before it saturates.'],
          ['Add stop solution. Blue turns yellow.', '', 'Read within 30 minutes; the yellow product is not indefinitely stable.'],
          ['Read absorbance at 450 nm, with 570–620 nm as a reference to correct for plate imperfections.', '', '']
        ],
        result: 'A standard curve of absorbance against concentration, sigmoid on a log x-axis. <b>Fit with a four-parameter logistic model, not a straight line.</b> Interpolate samples only within the linear portion of the curve — anything above the top standard must be diluted and re-run, never extrapolated.',
        mechanism: 'Each capture antibody holds one analyte molecule; each bound detection antibody carries an enzyme that converts many substrate molecules per second. That catalytic turnover is the amplification: a few picograms of antigen become a visible colour change. Specificity comes from requiring two independent antibody recognition events on the same molecule.',
        pitfalls: [
          'Inadequate washing — the commonest cause of high background and poor reproducibility.',
          'Edge effects: outer wells evaporate and warm differently. Either avoid them or fill them with buffer.',
          'Hook effect: at very high analyte concentrations both antibodies bind separate molecules instead of sandwiching one, and the signal falls. A very high sample can read as low — dilute and re-run anything suspicious.',
          'Standards made in buffer when samples are in serum. Matrix effects shift the curve.',
          'Reading after the colour has drifted, or developing to saturation.'
        ]
      }}
    ]},
    { id: 'related', title: 'Related formats', blocks: [
      { t: 'table', head: ['Method', 'Principle', 'Where it is used'], rows: [
        ['Lateral flow (rapid test)', 'Capillary flow carries sample past immobilised antibody lines on nitrocellulose; gold or latex particles give a visible line', 'Malaria RDT, dengue NS1, COVID antigen, pregnancy tests'],
        ['Chemiluminescent immunoassay (CLIA)', 'Enzyme or acridinium label producing light rather than colour', 'Automated clinical analysers — wider dynamic range than ELISA'],
        ['Western blot', 'Antigens separated by size first, then probed', 'Confirmatory testing where band pattern matters'],
        ['Immunofluorescence', 'Fluorophore instead of enzyme, read on a microscope', 'Tissue and cell localisation'],
        ['Multiplex bead assay', 'Antibodies on spectrally distinct beads, read by flow cytometry', 'Dozens of cytokines from one small sample'],
        ['ELISpot', 'Captures cytokine as it is secreted by individual cells', 'IGRA for tuberculosis — T-SPOT.<i>TB</i>']
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['Abcam — ELISA guide and troubleshooting', 'https://www.abcam.com/en-us/technical-resources/guides/elisa-guide'],
        ['Thermo Fisher — ELISA technical handbook', 'https://www.thermofisher.com/us/en/home/life-science/protein-biology/protein-biology-learning-center/protein-biology-resource-library/pierce-protein-methods/overview-elisa.html'],
        ['WHO — prequalified in vitro diagnostics', 'https://extranet.who.int/prequal/vitro-diagnostics']
      ]}
    ]}
  ]
},

{
  id: 'sequencing', name: 'DNA sequencing', kind: 'method', cat: 'Molecular biology',
  organism: 'Sanger, Illumina, nanopore',
  aka: ['sequencing', 'sanger', 'ngs', 'illumina', 'nanopore', 'next generation', 'whole genome', '16s', 'read depth', 'coverage', 'library prep', 'wgs'],
  tagline: 'Reading the order of bases — one fragment at a time, or a billion at once.',
  hero: 'Sanger sequencing reads one fragment accurately to about a kilobase and is still the reference for verifying a construct. Next-generation sequencing reads hundreds of millions of short fragments in parallel, which is what made whole-genome surveillance of outbreaks possible — including the SARS-CoV-2 variant tracking on this site.',
  quick: [
    ['Sanger read length', '500–1,000 bp, >99.9% accurate'],
    ['Sanger principle', 'Chain termination by dideoxynucleotides'],
    ['Illumina read length', '50–300 bp, paired-end'],
    ['Illumina output', 'Up to billions of reads per run'],
    ['Nanopore reads', 'Tens to hundreds of kb; higher per-base error'],
    ['Bacterial WGS coverage', '30–50× typical'],
    ['Human WGS coverage', '30× for germline; 100×+ for somatic variants']
  ],
  sections: [
    { id: 'sanger', title: 'Sanger sequencing', blocks: [
      { t: 'p', text: 'A sequencing reaction is a PCR with one primer and a deliberate flaw: alongside the normal dNTPs it contains a small proportion of dideoxynucleotides, which lack the 3′-OH the polymerase needs to add the next base. Whenever one is incorporated, that strand stops. Across millions of molecules every possible termination point is represented, producing a nested set of fragments differing by one base.' },
      { t: 'steps', items: [
        ['Set up', 'Template, one primer, polymerase, dNTPs and the four ddNTPs — each labelled with a different fluorescent dye.'],
        ['Cycle', '25–35 rounds of linear amplification. Because there is one primer, product accumulates linearly rather than exponentially.'],
        ['Clean up', 'Remove unincorporated dye terminators, which otherwise swamp the start of the trace.'],
        ['Capillary electrophoresis', 'Fragments separate by size at single-base resolution through a polymer-filled capillary.'],
        ['Detect', 'A laser excites each dye as it passes the detector. The order of colours is the sequence.'],
        ['Read the chromatogram', 'Clean, evenly spaced peaks of one colour each. The first 20–40 bases and anything beyond about 900 are unreliable.']
      ]},
      { t: 'note', tone: 'info', text: 'Sanger remains the right tool for several jobs: verifying a cloned construct, resolving a single variant, and confirming an NGS finding. A heterozygous position shows as two overlapping peaks at one location — and a sudden run of double peaks part-way through an otherwise clean trace is the signature of a mixed template or an indel in one allele.' }
    ]},
    { id: 'ngs', title: 'Next-generation sequencing', blocks: [
      { t: 'steps', items: [
        ['Library preparation', 'Fragment the DNA mechanically or enzymatically, repair the ends, add an A overhang, and ligate adapters carrying the sequences needed for binding to the flow cell, priming and sample indexing. Size-select and quantify.'],
        ['Multiplexing', 'Each sample receives a unique index, so dozens or hundreds can be pooled and sequenced together, then separated computationally afterwards.'],
        ['Cluster generation', 'Fragments bind the flow cell surface and are amplified in place by bridge amplification, producing a clonal cluster of about a thousand identical copies — enough molecules for the signal to be detectable.'],
        ['Sequencing by synthesis', 'One fluorescently labelled, reversibly terminated nucleotide is added per cycle across the whole flow cell. The surface is imaged, the dye and terminator are cleaved, and the cycle repeats. Every cluster is read simultaneously.'],
        ['Paired-end reading', 'The fragment is read from both ends. The known distance between reads greatly improves alignment across repeats and detects structural variants.'],
        ['Bioinformatics', 'Quality control, adapter trimming, alignment to a reference or de novo assembly, variant calling, then interpretation.']
      ]},
      { t: 'table', head: ['Platform', 'Read length', 'Strength', 'Weakness'], rows: [
        ['Illumina', '50–300 bp', 'Very high accuracy and throughput, low cost per base', 'Short reads struggle with repeats and structural variants'],
        ['Oxford Nanopore', '10 kb – 1 Mb+', 'Long reads resolve repeats and whole genomes; portable, real-time; used in field outbreak work', 'Higher per-base error, though much improved'],
        ['PacBio HiFi', '10–25 kb', 'Long and highly accurate', 'Higher cost per sample'],
        ['Ion Torrent', '200–600 bp', 'Fast, no optics — detects pH change from proton release', 'Homopolymer errors']
      ]},
      { t: 'ul', title: 'Terms you need to use correctly', items: [
        '<b>Read depth / coverage</b> — how many times each base was independently read. 30× means 30 reads overlap each position on average.',
        '<b>Breadth of coverage</b> — what fraction of the target was covered at all. Both numbers are needed; high average depth can hide zero-coverage gaps.',
        '<b>Q score</b> — Phred quality. Q30 means a 1 in 1,000 chance that base is wrong. Q20 is 1 in 100.',
        '<b>De novo assembly</b> — building a genome with no reference, for a novel organism.',
        '<b>Amplicon sequencing</b> — sequencing a targeted PCR product, such as 16S rRNA for bacterial community profiling, or the SARS-CoV-2 ARTIC scheme for variant surveillance.',
        '<b>Metagenomics</b> — sequencing everything in a sample without culture, which is how unculturable organisms and novel pathogens are found.'
      ]},
      { t: 'note', tone: 'info', text: 'Nextstrain, linked throughout the virus profiles on this site, runs on exactly this: thousands of laboratories deposit genome sequences, which are aligned, placed on a phylogeny and dated. That is how a variant is recognised as new, how its spread is tracked across countries, and how vaccine strain selection decisions are now informed.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['Illumina — sequencing methods explorer', 'https://www.illumina.com/science/sequencing-method-explorer.html'],
        ['Nextstrain — real-time pathogen evolution', 'https://nextstrain.org/'],
        ['NCBI — GenBank and SRA', 'https://www.ncbi.nlm.nih.gov/'],
        ['ARTIC network — field sequencing protocols', 'https://artic.network/']
      ]}
    ]}
  ]
},

{
  id: 'expression', name: 'Recombinant protein expression', kind: 'method', cat: 'Bioprocess',
  organism: 'Host choice, induction, affinity purification',
  aka: ['expression', 'recombinant protein', 'bl21', 'pet', 'iptg', 'his tag', 'imac', 'ni-nta', 'inclusion bodies', 'chromatography', 'purification', 'cho'],
  tagline: 'Making a protein in an organism that never had the gene for it.',
  hero: 'Insulin, growth hormone, every monoclonal antibody and every recombinant vaccine antigen — including the hepatitis B vaccine described on this site — is made this way. The engineering problem is rarely getting expression at all; it is getting the protein folded, soluble and pure enough to use.',
  quick: [
    ['Workhorse host', '<i>E. coli</i> BL21(DE3)'],
    ['Common vector', 'pET series, T7 promoter'],
    ['Induction', 'IPTG, 0.1–1 mM'],
    ['Solubility trick', 'Induce at 16–20 °C overnight rather than 37 °C'],
    ['Common tag', 'Hexahistidine, purified by immobilised metal affinity'],
    ['Elution', 'Imidazole gradient, 20 → 250 mM'],
    ['Glycosylation', 'Needs a eukaryotic host — <i>E. coli</i> cannot do it']
  ],
  sections: [
    { id: 'hosts', title: 'Choosing a host', blocks: [
      { t: 'table', head: ['Host', 'Advantages', 'Limitations', 'Typical products'], rows: [
        ['<b><i>E. coli</i></b>', 'Fast, cheap, very high yields, enormous genetic toolkit', 'No glycosylation, limited disulphide formation in the cytoplasm, endotoxin must be removed, inclusion bodies common', 'Insulin, growth hormone, enzymes, research proteins'],
        ['<b>Yeast</b> (<i>Pichia</i>, <i>S. cerevisiae</i>)', 'Eukaryotic folding and secretion, glycosylates, grows to very high density, no endotoxin', 'Hyper-mannosylation differs from human glycans', 'Hepatitis B vaccine antigen, insulin, industrial enzymes'],
        ['<b>Insect cells</b> (baculovirus)', 'Complex folding, handles large proteins and multi-subunit assemblies', 'Slower, more costly, non-human glycosylation', 'Virus-like particle vaccines — HPV, influenza'],
        ['<b>Mammalian</b> (CHO, HEK293)', 'Human-like glycosylation and post-translational modification', 'Slow, expensive, demanding media and containment', 'Monoclonal antibodies, clotting factors, most modern biologics'],
        ['<b>Cell-free</b>', 'Hours not days, tolerates toxic products', 'Small scale, costly per mg', 'Screening, toxic or membrane proteins']
      ]},
      { t: 'note', tone: 'info', text: 'The host decision is usually made by one question: <b>does the protein need human-like glycosylation to work?</b> A monoclonal antibody does — effector function and half-life depend on the Fc glycan — so it must come from a mammalian line. An enzyme or a simple antigen generally does not, so it goes to <i>E. coli</i> or yeast at a fraction of the cost.' }
    ]},
    { id: 'expression', title: 'Expression in E. coli', blocks: [
      { t: 'steps', items: [
        ['Design the construct', 'Codon-optimise for the host. Add an affinity tag, with a protease cleavage site (TEV, thrombin) if the tag must come off. Decide N- or C-terminal based on which end is structurally tolerant.'],
        ['Transform BL21(DE3)', 'This strain carries the T7 RNA polymerase gene under <i>lac</i> control, and is deficient in the <i>lon</i> and <i>ompT</i> proteases that would otherwise degrade your product.'],
        ['Grow to mid-log', 'Inoculate from a fresh colony, grow at 37 °C to OD₆₀₀ 0.4–0.8. Induce too early or too late and yields drop sharply.'],
        ['Induce', 'Add IPTG. It is a non-hydrolysable lactose analogue, so it de-represses the <i>lac</i> operator without being consumed, giving sustained induction.'],
        ['Express', 'Either 3–4 hours at 37 °C for maximum mass, or overnight at 16–20 °C for maximum soluble fraction. Slower synthesis gives chaperones time to fold the protein.'],
        ['Harvest and lyse', 'Centrifuge, resuspend in lysis buffer, then sonicate, French press or use an enzymatic lysis reagent. Keep everything on ice and add protease inhibitors.'],
        ['Clarify', 'Centrifuge hard. Run a gel of both the soluble supernatant and the insoluble pellet — this single comparison tells you whether you have a solubility problem.']
      ]},
      { t: 'note', tone: 'warn', text: '<b>Inclusion bodies</b> are dense aggregates of misfolded protein, and they are the most common failure mode in <i>E. coli</i> expression. They are not always bad news — they are nearly pure product and resist proteolysis — but recovering activity requires solubilising in 6–8 M urea or guanidine and then refolding by slow dilution or dialysis, which is lossy and must be optimised for each protein. Prevention is usually better: lower the temperature, reduce the inducer, co-express chaperones, or use a solubility-enhancing fusion partner such as MBP or SUMO.' }
    ]},
    { id: 'purification', title: 'Purification', blocks: [
      { t: 'table', head: ['Stage', 'Technique', 'Separates by'], rows: [
        ['<b>Capture</b>', 'Immobilised metal affinity (IMAC) — Ni-NTA or Co resin', 'Histidine tag binding to chelated metal ions. Elute with an imidazole gradient, which competes for the same sites.'],
        ['', 'Protein A / Protein G', 'Fc region of antibodies — the capture step in essentially all monoclonal antibody manufacture'],
        ['', 'Other affinity tags', 'GST on glutathione resin; MBP on amylose; Strep-tag on Strep-Tactin'],
        ['<b>Intermediate</b>', 'Ion exchange (anion or cation)', 'Net surface charge, which depends on buffer pH relative to the protein\'s isoelectric point'],
        ['', 'Hydrophobic interaction', 'Surface hydrophobicity — binds at high salt, elutes as salt falls'],
        ['<b>Polishing</b>', 'Size exclusion chromatography', 'Hydrodynamic radius. Also separates monomer from aggregate, which is a critical quality attribute for any biologic.'],
        ['<b>Formulation</b>', 'Buffer exchange, concentration, sterile filtration', 'Final buffer, stabilisers, and 0.22 µm filtration']
      ]},
      { t: 'ul', title: 'Checks at each step', items: [
        'Keep a sample from every fraction and run them on one gel at the end. The purification table — total protein, activity, specific activity, yield, fold purification — is how you find where material was lost.',
        'A280 for concentration, using the extinction coefficient calculated from the sequence.',
        'SDS-PAGE under reducing and non-reducing conditions for purity and for covalent multimers.',
        'Size exclusion or dynamic light scattering for aggregation.',
        'Endotoxin testing by LAL assay for anything going near a cell culture or an animal — <i>E. coli</i> lipopolysaccharide is active at picogram levels.',
        'Mass spectrometry to confirm identity and intact mass.'
      ]}
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['Addgene — protein expression guide', 'https://www.addgene.org/protocols/'],
        ['Cytiva — protein purification handbooks', 'https://www.cytivalifesciences.com/en/us/support/handbooks'],
        ['EMBL protein expression and purification core facility protocols', 'https://www.embl.org/groups/protein-expression-purification/']
      ]}
    ]}
  ]
},

{
  id: 'crispr', name: 'CRISPR genome editing', kind: 'method', cat: 'Molecular biology',
  organism: 'Cas9, guide RNA, NHEJ and HDR',
  aka: ['crispr', 'cas9', 'gene editing', 'sgrna', 'guide rna', 'pam', 'knockout', 'knock-in', 'base editing', 'prime editing', 'genome engineering'],
  tagline: 'A bacterial immune system repurposed to cut any chosen sequence.',
  hero: 'CRISPR began as an observation about odd repeated sequences in bacterial genomes and turned out to be an adaptive immune system that stores fragments of past infections and uses them as search terms. Programming it with a synthetic guide made targeted editing a routine laboratory operation within a few years.',
  quick: [
    ['Origin', 'Bacterial and archaeal adaptive immunity against phage'],
    ['Nuclease', 'Cas9 from <i>Streptococcus pyogenes</i> — SpCas9'],
    ['Guide', 'Single guide RNA, 20 nt spacer'],
    ['PAM', '5′-NGG-3′, immediately 3′ of the target'],
    ['Cut site', 'Blunt, 3 bp upstream of the PAM'],
    ['Knockout repair', 'NHEJ — error-prone, gives indels and frameshifts'],
    ['Knock-in repair', 'HDR — precise, needs a donor template, S/G2 phase only'],
    ['Nobel Prize', 'Charpentier and Doudna, 2020']
  ],
  sections: [
    { id: 'mechanism', title: 'How it works', blocks: [
      { t: 'steps', items: [
        ['Targeting', 'The single guide RNA carries a 20-nucleotide spacer complementary to the target. It is a fusion of the natural crRNA and tracrRNA into one molecule — the simplification that made the system practical.'],
        ['PAM recognition', 'Cas9 first scans for a protospacer adjacent motif, NGG for SpCas9. Without a PAM it will not cut, however perfect the match. This is also how the bacterium avoids cutting its own CRISPR array, which lacks the PAM.'],
        ['Unwinding and base pairing', 'At a PAM, Cas9 locally unwinds the DNA and the guide attempts to pair. Full complementarity across the seed region — the 10–12 bases nearest the PAM — is what commits the enzyme.'],
        ['Cleavage', 'Two nuclease domains act together: HNH cuts the target strand, RuvC the non-target strand, producing a blunt double-strand break three base pairs upstream of the PAM.'],
        ['Repair by NHEJ', 'The dominant pathway, active in all cell cycle phases. It rejoins the ends but frequently inserts or deletes a few bases, causing a frameshift. This is how you make a <b>knockout</b>.'],
        ['Repair by HDR', 'If a donor template with homology arms is supplied, the cell can copy it in, giving a precise edit. HDR is only active in S and G2 phase and is far less efficient, which is why <b>knock-in is much harder than knockout</b>.']
      ]},
      { t: 'note', tone: 'info', text: 'The natural system has three stages: <b>adaptation</b>, where fragments of invading phage DNA are stored as spacers in the CRISPR array; <b>expression</b>, where the array is transcribed and processed into individual crRNAs; and <b>interference</b>, where a crRNA guides Cas to cut matching DNA on re-infection. It is a heritable, sequence-specific memory of past infection — in a bacterium.' }
    ]},
    { id: 'practice', title: 'Doing it', blocks: [
      { t: 'ul', title: 'Design', items: [
        'Pick a guide with a PAM close to the intended edit — HDR efficiency falls off sharply beyond about 10 bp from the cut.',
        'For a knockout, target an early constitutive exon, and prefer a functional domain so that any in-frame indel is still disruptive.',
        'Score candidate guides for predicted off-targets using a design tool; avoid guides with close matches elsewhere in the genome, particularly in the seed region.',
        'Check for common variants in the target sequence — a SNP under the guide abolishes cutting in some individuals.'
      ]},
      { t: 'table', head: ['Delivery', 'Form', 'Notes'], rows: [
        ['Plasmid', 'Cas9 and sgRNA expressed from DNA', 'Cheap, but sustained expression increases off-target cutting and risks genomic integration'],
        ['mRNA + sgRNA', 'Transient', 'No integration risk; expression is brief'],
        ['Ribonucleoprotein (RNP)', 'Pre-assembled Cas9 protein with sgRNA', '<b>Preferred for most work.</b> Acts immediately, degraded within hours, lowest off-target burden'],
        ['Lentivirus', 'Integrating viral vector', 'For stable lines and genome-wide screens'],
        ['AAV', 'Non-integrating viral vector', 'In vivo delivery; limited by small packaging capacity'],
        ['Lipid nanoparticle', 'mRNA encapsulated', 'The route used clinically for liver-targeted editing']
      ]},
      { t: 'ul', title: 'Confirming the edit', items: [
        '<b>T7 endonuclease I or Surveyor assay</b> — detects mismatches in reannealed PCR product, giving a quick estimate of editing efficiency.',
        '<b>Sanger sequencing with TIDE or ICE analysis</b> — deconvolutes the mixed trace from a pool into the spectrum of indels present.',
        '<b>Amplicon next-generation sequencing</b> — the quantitative standard, and the only way to measure low-frequency alleles properly.',
        '<b>Clonal isolation</b> — single-cell cloning then sequencing each clone, for a defined cell line.',
        '<b>Off-target assessment</b> — GUIDE-seq, CIRCLE-seq or whole-genome sequencing, required for anything therapeutic.'
      ]}
    ]},
    { id: 'beyond', title: 'Beyond cutting', blocks: [
      { t: 'table', head: ['Tool', 'What changed', 'What it does'], rows: [
        ['<b>Nickase (Cas9n)</b>', 'One nuclease domain inactivated', 'Cuts one strand. Paired nickases need two adjacent guides, which greatly raises specificity.'],
        ['<b>dCas9</b>', 'Both domains dead', 'Binds without cutting. Fused to activators (CRISPRa) or repressors (CRISPRi) to control gene expression, or to fluorophores for imaging.'],
        ['<b>Base editors</b>', 'dCas9 or nickase fused to a deaminase', 'Converts C→T or A→G at a precise position with no double-strand break and no donor template.'],
        ['<b>Prime editors</b>', 'Nickase fused to reverse transcriptase, with an extended guide carrying the edit', 'Writes small insertions, deletions and all twelve base substitutions without a double-strand break.'],
        ['<b>Cas12a (Cpf1)</b>', 'Different nuclease', 'T-rich PAM, staggered cut, processes its own guides — useful for multiplexing.'],
        ['<b>Cas13</b>', 'Targets RNA', 'Knockdown without touching the genome; the basis of the SHERLOCK diagnostic platform.']
      ]},
      { t: 'note', tone: 'warn', text: 'Editing somatic cells in a consenting patient and editing the human germline are entirely different questions. The first is now approved therapy — <b>exagamglogene autotemcel</b>, an ex vivo edit of a patient\'s own haematopoietic stem cells, was licensed in 2023 for sickle cell disease and beta thalassaemia. Heritable germline editing is prohibited in most jurisdictions and is the subject of a broad international moratorium following the 2018 case in China.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['Addgene — CRISPR guide and plasmid repository', 'https://www.addgene.org/crispr/guide/'],
        ['Broad Institute — CRISPR design resources', 'https://portals.broadinstitute.org/gppx/crispick/public'],
        ['WHO — human genome editing governance framework', 'https://www.who.int/publications/i/item/9789240030381'],
        ['Jinek et al. 2012, Science — the foundational paper', 'https://www.science.org/doi/10.1126/science.1225829']
      ]}
    ]}
  ]
},

{
  id: 'fermentation', name: 'Fermentation and bioprocess', kind: 'method', cat: 'Bioprocess',
  organism: 'Bioreactors, feeding strategies, downstream processing',
  aka: ['fermentation', 'bioreactor', 'fermenter', 'batch', 'fed batch', 'continuous', 'chemostat', 'downstream', 'upstream', 'scale up', 'kla', 'monod', 'gmp', 'usp', 'dsp'],
  tagline: 'Taking a flask that works and making it work in ten thousand litres.',
  hero: 'Industrial biotechnology is the business of keeping a very large population of cells in exactly the physiological state that makes the product. Nearly every problem in scale-up reduces to one of three things: oxygen transfer, heat removal, and mixing.',
  quick: [
    ['Upstream', 'Media, inoculum train, sterilisation, the bioreactor run'],
    ['Downstream', 'Harvest, capture, purification, polishing, formulation'],
    ['Standard vessel', 'Stirred tank reactor with Rushton impellers and baffles'],
    ['Controlled', 'Temperature, pH, dissolved oxygen, agitation, foam, feed rate'],
    ['Scale-up basis', 'Constant kLa or constant power per volume — not constant rpm'],
    ['Fed-batch', 'The dominant mode in industry'],
    ['Downstream cost', 'Typically 50–80% of total manufacturing cost']
  ],
  sections: [
    { id: 'modes', title: 'Operating modes', blocks: [
      { t: 'table', head: ['Mode', 'How it runs', 'Advantages', 'Drawbacks'], rows: [
        ['<b>Batch</b>', 'All nutrients present at the start; nothing added but gas, acid, base and antifoam', 'Simple, low contamination risk, easy to validate', 'Substrate inhibition early, starvation late; low final density'],
        ['<b>Fed-batch</b>', 'Concentrated feed added over the run; nothing removed until harvest', 'Avoids substrate inhibition and overflow metabolism; very high cell densities; <b>the industrial standard</b>', 'Volume increases; by-products accumulate; feed strategy needs development'],
        ['<b>Continuous (chemostat)</b>', 'Fresh medium in and culture out at equal rates', 'Steady state held indefinitely; high volumetric productivity; small vessel', 'Long runs risk contamination and strain drift; harder to validate for regulated products'],
        ['<b>Perfusion</b>', 'Medium exchanged while cells are retained by a filter or settler', 'Very high density; continuous harvest of a labile product', 'Complex cell retention hardware; demanding to operate'],
        ['<b>Solid state</b>', 'Growth on a moist solid substrate with no free water', 'Low water and energy use; traditional products', 'Hard to monitor, control and scale']
      ]},
      { t: 'note', tone: 'info', text: 'Fed-batch exists largely to defeat overflow metabolism. <i>E. coli</i> given plentiful glucose makes acetate even with ample oxygen, and acetate inhibits growth and product formation; <i>S. cerevisiae</i> does the same with ethanol, the Crabtree effect. Feeding glucose slowly keeps the cells just below the threshold where that switch happens, so carbon goes into biomass and product instead of waste.' }
    ]},
    { id: 'reactor', title: 'The bioreactor', blocks: [
      { t: 'table', head: ['Parameter', 'Why it matters', 'How it is controlled'], rows: [
        ['Temperature', 'Sets growth rate and enzyme activity; fermentation is strongly exothermic at scale', 'Jacket or internal coils. Heat removal becomes limiting as volume rises, because volume scales cubically while surface area scales squarely.'],
        ['pH', 'Shifts as ammonia, organic acids or CO₂ accumulate', 'Automatic addition of acid or base'],
        ['Dissolved oxygen', 'Usually the first limiting factor in aerobic culture — oxygen is barely soluble in water', 'Cascade control: raise agitation, then airflow, then oxygen enrichment, then head pressure'],
        ['Agitation', 'Mixes, breaks bubbles up to increase gas–liquid surface area, prevents gradients', 'Rushton turbines for gas dispersion in microbial culture; gentle marine or pitched-blade impellers for shear-sensitive mammalian cells'],
        ['Foam', 'Carries cells into the exhaust filter and blocks it', 'Antifoam addition on a conductivity probe, or a mechanical breaker. Antifoam lowers oxygen transfer, so it is used sparingly.'],
        ['Feed rate', 'Determines growth rate in fed-batch', 'Exponential or DO-stat feeding'],
        ['Off-gas', 'Oxygen uptake and CO₂ evolution show real-time metabolic state', 'Mass spectrometry or infrared analysis of the exhaust']
      ]},
      { t: 'ul', title: 'Scale-up — what to hold constant', items: [
        '<b>kLa, the volumetric oxygen transfer coefficient.</b> Usually the primary criterion for aerobic microbial processes, because oxygen supply is what limits them.',
        '<b>Power per unit volume (P/V).</b> A common practical proxy, typically 1–5 kW/m³ for microbial culture and far lower for mammalian.',
        '<b>Tip speed.</b> Critical for shear-sensitive mammalian cells and for any process with a fragile product.',
        '<b>Mixing time.</b> At large scale, mixing takes long enough that real gradients in pH, substrate and oxygen develop across the vessel — cells experience a changing environment as they circulate, which small-scale work never reproduces.',
        '<b>What you cannot hold constant is rpm.</b> Geometric similarity means the same rpm gives wildly different tip speed and power input at a different diameter. Scaling by rpm is the classic beginner error.'
      ]}
    ]},
    { id: 'downstream', title: 'Downstream processing', blocks: [
      { t: 'steps', items: [
        ['Harvest and clarification', 'Separate cells from medium: centrifugation, depth filtration or tangential flow filtration. Which phase you keep depends on whether the product is secreted or intracellular.'],
        ['Cell disruption', 'For an intracellular product: high-pressure homogenisation at scale, or bead milling. This releases host DNA and protein, so the downstream burden rises sharply — one of several reasons secretion is preferred where possible.'],
        ['Capture', 'A high-capacity, selective first chromatography step that concentrates the product and removes most contaminants. Protein A for antibodies; IMAC for tagged proteins.'],
        ['Intermediate purification', 'Ion exchange or hydrophobic interaction chromatography to remove host cell proteins, DNA and product variants.'],
        ['Polishing', 'Size exclusion or a second ion exchange, usually in flow-through mode, to remove aggregates and trace contaminants.'],
        ['Viral clearance', 'For mammalian-derived products: low pH inactivation and dedicated virus filtration, with validated log reduction.'],
        ['Formulation and fill', 'Buffer exchange by diafiltration, concentration, addition of stabilisers, sterile filtration at 0.22 µm, and aseptic filling.']
      ]},
      { t: 'ul', title: 'Quality — the language of regulated manufacture', items: [
        '<b>Critical quality attributes (CQAs)</b> — the properties that must be within limits for the product to be safe and effective: purity, aggregate level, glycan profile, potency, endotoxin, bioburden.',
        '<b>Critical process parameters (CPPs)</b> — the process settings that affect a CQA. These are what you control and what you validate.',
        '<b>Quality by design</b> — establishing a design space in which the process is known to deliver the required quality, rather than testing quality into the product afterwards.',
        '<b>GMP</b> — good manufacturing practice: documented procedures, trained staff, qualified equipment, full traceability, and batch records for everything.',
        '<b>Process validation</b> — demonstrating across consecutive batches that the process consistently delivers product meeting specification.'
      ]},
      { t: 'note', tone: 'warn', text: 'Downstream processing usually costs more than everything upstream combined, and the reason is yield compounding. A seven-step purification at 90% recovery per step returns 48% of what you started with. Removing a single step, or raising one step from 85% to 95%, often matters more to process economics than any further increase in titre.' }
    ]},
    { id: 'sources', title: 'Sources', blocks: [
      { t: 'links', items: [
        ['ICH Q8, Q9, Q10 — pharmaceutical development and quality', 'https://www.ich.org/page/quality-guidelines'],
        ['FDA — process validation guidance', 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/process-validation-general-principles-and-practices'],
        ['BioPhorum — biomanufacturing technology roadmaps', 'https://www.biophorum.com/'],
        ['WHO — biologicals and vaccine manufacturing standards', 'https://www.who.int/teams/health-product-policy-and-standards/standards-and-specifications/norms-and-standards']
      ]}
    ]}
  ]
}

]);
