# Music of the Spheres · Ἁρμονία τοῦ Ὄντος

**A bilingual, offline-first Greek-native worldview laboratory organized and audited through EFMW.**

**Website (once GitHub Pages is enabled):** https://enuminous.github.io/Music-of-the-Spheres/  
**Repository:** https://github.com/enuminous/Music-of-the-Spheres

> **Research status (26 October 2026): EXPERIMENTAL RECONSTRUCTION.**
> Historical texts, modern formal modeling, and speculative extensions are separated. The Lean proofs show internal properties of explicitly chosen models; they do **not** prove Parmenides was physically right, that the cosmos obeys musical tuning, or that EFMW is empirically validated.

## Start

Open **[index.html](index.html)** directly in a modern browser. No server, frameworks, fonts, CDN, build tool, cookies, login, or network connection is needed. The desktop application supports **English / Ελληνικά** and includes:

- **Cosmos modeler:** choose a philosophical tradition, model the ordered heavens with concentric SVG paths, adjust a visual ordering parameter, pause motion, and inspect annotated relations. This is a *conceptual visualization*, not a physical gravitational simulation.
- **Harmonic canon:** compare the documented double, sesquialter and sesquitertian proportions; hear illustrative tones generated locally by Web Audio with a user action. Modern sound synthesis is explicitly outside the reconstructed mathematical language.
- **Native reasoning studio:** assemble propositions from unity, multitude, magnitude, proportion, harmony, appearance, and demonstration; attach premises and provisional statuses without assigning a mathematical state to non-being.
- **Traditions and disagreements:** compare Eleatic, Pythagorean, Platonic, Aristotelian, geometrical, harmonic, astronomical, and late-antique investigations without pretending they held one common doctrine.
- **Source atlas and epistemic ledger:** primary texts, later accounts, secondary scholarship, proposed continuations, unresolved physical claims.
- **Portable record:** export/import JSON; preferences and workbench state stored only in the local browser. Clear data from the app.

## The central distinction

**Nonexistence is not a state.** This project's *experimental native language* contains only admissible constructions and relations among what is. No null or numeric-zero object is added to that object-language. An inadmissible attempt is not an additional object in the world. The *external Lean 4 metalanguage* uses ordinary formal tools and its standard natural numbers; this is not a claim that Greek historical mathematicians used Lean or our modern foundational ontology.

This is a **chosen experimental constraint**, not an assertion that all ancient Greek mathematics lacked a placeholder: late Greek astronomy used placeholder marks in positional sexagesimal calculation.

## Repository — flat stack

All primary source and model files live at the root:

| File | Role |
| --- | --- |
| **index.html** | Fully standalone responsive bilingual desktop modeling app |
| **README.md** | This orientation and scientific boundaries |
| **README.el.md** | Greek orientation |
| **HARMONIC_COSMOS.md** | Complete historical scaffold, seven arts, worldview and native reasoning |
| **HISTORICAL_ATLAS.md** | Traditions, disagreements, primary sources, uncertainties |
| **EFMW_PROTOCOL.md** | Isolation protocol, provenance and falsifiability audit |
| **GreekFoundations.lean** | Unity separate from multitude; grammar of magnitude; proportionality relation |
| **GreekHarmonics.lean** | Illustrative positive string-length pairings and exact cross-product identities |
| **GreekCosmos.lean** | Research-claim statuses and source provenance types |
| **MusicOfTheSpheres.lean** | Root Lean import module |
| **lakefile.toml**, **lean-toolchain** | Minimal pinned Lean build without Mathlib dependency |
| **.github/workflows/lean.yml** | CI Lean compilation and regular kernel checking on pushes |
| **.github/workflows/pages.yml** | Static GitHub Pages deployment |
| **verify_site.mjs** and **.github/workflows/site.yml** | Standalone JavaScript syntax and link validation |

### Build and verify

Use elan and Lake with the pinned toolchain, then:

```bash
lake build
# Optional stronger export replay on Linux with a functioning Bubblewrap sandbox:
# lake check
```

The Lean formalization proves reflexivity, symmetry and transitivity properties for **defined proportionality relations**, plus concrete harmonic-pair arithmetic checks and audit-status facts. It does not formalize Euclid's entire *Elements* or the complete Greek mathematical corpus. There are **no `sorry`** placeholders in the supplied Lean files. The regular Lean compiler has checked these declarations in CI. An additional `lake check` export replay is optional and needs Bubblewrap with working user namespaces; the default GitHub runner blocks that sandbox, so it is not the CI gate. Do **not** disable the sandbox merely to manufacture a success status.

## Historical accuracy and coverage

This repository covers an **organized overview of the major surviving Greek mathematical traditions**, not every surviving Greek manuscript or every proof from antiquity. Its reconstruction preserves disciplinary and chronological disagreement:

- **Eleatics:** Parmenides, Zeno, Melissus; Being and motion.
- **Pythagorean traditions:** Philolaus, Archytas; proportionality and musical ordering.
- **Platonic and Aristotelian schools:** the *Timaeus*, causality, logic, substance and appearance.
- **Geometers:** Eudoxus, Theaetetus, Euclid, Archimedes, Apollonius; proportion and exhaustion.
- **Astronomers and mechanics:** Aristarchus, Eratosthenes, Hipparchus, Menelaus, Heron, Ptolemy; spherical geometry, optics, models and measurement.
- **Harmonic disagreement:** mathematical interval theorists versus Aristoxenus's emphasis on perception.
- **Late antiquity:** Diophantus, Pappus, Theon, Hypatia, Proclus, Eutocius.

**Crucial:** the user-selected counterfactual Greek-only model **excludes zero as a native entity**; that is a *modeling constraint* and must not be passed off as an unbroken factual historical consensus. Unity and number, discrete multitude and continuous magnitude are distinct concepts. Historical differences remain explicit.

## EFMW role, bounded

EFMW is the **external research organizer**: collection, argument dependency tracking, challenge generation and claims bookkeeping. The Monolithic Zoo methodology can audit circularity, unregistered changes, robustness and physical claims. Neither EFMW nor a formal syntax check supplies experimental proof of a universal harmonic law.

The experimental success criterion is not an aesthetic resemblance to music. It is an admissible, fully stated construction giving a novel independently checked mathematical consequence or a pre-registered physical prediction.

## Primary references and reading

- [Euclid, *Elements* VII, definitions](https://www.perseus.tufts.edu/hopper/text?doc=Euc.+7&fromdoc=Perseus%3Atext%3A1999.01.0086) — unity and number.
- [Euclid, *Elements* V](https://www.euclids-elements.org/elements/books/bookV/) — magnitudes and equimultiples.
- [Plato, *Timaeus*](https://www.perseus.tufts.edu/hopper/searchresults?q=Timaeus) — cosmological proportionality (philosophical cosmology, not an empirical derivation).
- [Aristotle, *On the Heavens* II](https://classics.mit.edu/Aristotle/heavens.2.ii.html) — critique of celestial sound.
- [Archimedes Palimpsest](https://archimedespalimpsest.org/) — manuscript history and analysis.
- [Lean 4 reference](https://lean-lang.org/doc/reference/latest/) — the external formal verification apparatus.

For expanded source distinctions read [HISTORICAL_ATLAS.md](HISTORICAL_ATLAS.md) and the model's status labels.

## Publishing the site

The Pages workflow uses **GitHub Actions** deployment. If the repository has not enabled Pages, the owner must select **Settings → Pages → Source: GitHub Actions** before the first deployment. Inspect [Actions](https://github.com/enuminous/Music-of-the-Spheres/actions) for evidence that publication actually succeeded; committed files alone do not establish a live Pages deployment.

### Attribution and limitations

An independent experimental research artifact, 2026. Historical reconstructions are explicitly labeled; citations are pointers for verification, not endorsements. Source manuscripts and translations should be checked for chronology and editorial disagreements. **No novel physical law has been established by the included model.**
