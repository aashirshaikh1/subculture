# Subculture

A microbiology and biotechnology study resource — 19 organism profiles, 15 laboratory
methods, 8 calculators, interactive 3D models, rendered micrographs and a virus culture
simulation.

Designed, written and built by **Aashir Shaikh**.

---

## Opening it

**Quickest:** open `local.html` in any browser. It works straight from disk.

**With a local server** (needed only if your browser is strict about `file://`):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/local.html
```

An internet connection is required on first load, for three.js and the Google Fonts
stylesheet. Everything else is generated in code — there are no image or data files.

`index.html` is the source that gets published to the Claude Artifact platform, which
supplies the `<!doctype>`, `<html>`, `<head>` and `<body>` wrapper itself. That is why
`index.html` starts with `<title>` instead. `local.html` is the same file with that
wrapper added. Regenerate it after editing `index.html`:

```bash
python3 build-local.py
```

---

## The files

| File | What it holds |
|---|---|
| `index.html` | Page shell, all CSS, top bar, search, footer, script tags |
| `app.js` | Router, the block renderer, search index, scroll spy, progress bar |
| `home.js` | Home page — hero, stats, outbreak watch, library tiles, about |
| `project.js` | Project write-up page |
| **Content** | |
| `data-core.js` | HIV, tuberculosis, COVID-19, influenza, hepatitis B |
| `data-more.js` | Dengue, malaria, cholera, typhoid |
| `data-virus2.js` | Rabies, hepatitis C, measles, Ebola, Nipah |
| `data-micro2.js` | *S. aureus*, *S. pyogenes*, *H. pylori*, Candida, Leishmania |
| `methods-micro.js` | Culture, susceptibility testing, biochemical ID, sterilisation, growth curve, biosafety |
| `methods-mol.js` | Nucleic acid extraction, PCR, gels, cloning, ELISA, sequencing, expression, CRISPR, fermentation |
| `stains.js` | 10 staining protocols — reagents, timed steps, mechanism, pitfalls |
| `outbreaks.js` | Outbreak watch entries, with the date each was checked |
| **Rendering** | |
| `models.js` | Parametric 3D organism models (three.js) |
| `micro.js` | Procedural micrographs (canvas 2D) — 21 scenes |
| `hero.js` | Hero backdrop: haemocytometer grid with drifting cells |
| `calc.js` | The 8 calculators |
| `game.js` | HIV culture simulation |

---

## How the content is structured

Every page — organism or method — is a plain object:

```js
{
  id: 'tb',
  name: 'Tuberculosis',
  organism: 'Mycobacterium tuberculosis',
  kind: 'bacterium',          // virus | bacterium | parasite | fungus | method
  aka: ['tb', 'koch bacillus', ...],   // search terms
  tagline: '...',
  hero: '...',
  quick: [['Label', 'Value'], ...],
  model: { ... },             // 3D model spec, optional
  sections: [
    { id: 'structure', title: 'Structure and genome', blocks: [ ... ] }
  ]
}
```

One generic renderer in `app.js` turns `blocks` into HTML. Adding an organism means
adding an object to a data file — no new page, no new markup.

### Block types

`p` · `ul` · `table` · `kv` · `steps` · `timeline` · `note` · `links` · `genome` ·
`organs` · `model` · `micro` · `protocol` · `chart` · `game`

A `protocol` block either names one from `stains.js` (`{t:'protocol', name:'gram'}`)
or defines one inline (`{t:'protocol', def:{...}}`).

---

## Adding things

**A new organism** — add an object to any `data-*.js` file. It appears in search,
in the chips and in all counts automatically.

**A new micrograph** — add a draw function and a registry entry in `micro.js`, then
reference it with `{t:'micro', kind:'your-key'}`.

**A new staining protocol** — add an entry to the `S` object in `stains.js`.

---

## Notes on the content

- The micrographs and 3D models are **generated in code**, not photographs. Each figure
  says so in its caption. They model the real optics of each modality — illumination
  falloff, depth of field, stain granularity, grain, scale bar — but they are
  simulations.
- The outbreak section is a **dated snapshot**, not a live feed. A published page cannot
  fetch other sites. Each card carries the date it was checked and a link to the source.
- Case numbers, resistance rates and breakpoints change yearly. Every statistic carries
  a note to check the current source before presenting it.
- This is a **study resource, not clinical guidance**, and it is not peer reviewed.

---

## Licence and reuse

The written content and code are Aashir Shaikh's own work. Cited sources (WHO, CDC,
EUCAST, CLSI and others) are linked, not reproduced. No third-party images are included,
which is why every figure is drawn rather than copied.
