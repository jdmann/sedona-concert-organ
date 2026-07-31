# Photographs — sourcing and credits

The site ships with **no photographs**. Every `<figure class="plate">` already points
at its intended filename; until that file exists, an engraved "Photograph wanted"
legend shows in its place. **Drop a correctly-named file into this folder and it
appears automatically** — no code change, no rebuild.

The build environment for this site had no outbound network access to any image
host, so the photographs could not be fetched automatically. They must be obtained
and cleared for use by hand. Below is where each one lives.

## Wanted files

| File | Subject | Where to look |
|---|---|---|
| `estey-console.jpg` | The ornate four-keyboard console of Estey Opus 2981 | Organ Historical Society — [Estey's Largest Pipe Organ](https://organhistoricalsociety.org/estey/claremont.html); [Pipe Organ Database entry](https://pipeorgandatabase.org/stoplist/14515) |
| `estey-facade.jpg` | The instrument / façade in Bridges Auditorium, Claremont | [Pomona College — Bridges Auditorium](https://www.pomona.edu/administration/bridges-auditorium); OHS Estey archive; Claremont Colleges photo archive |
| `oberlin-console.jpg` | The console of Aeolian-Skinner Opus 230-A | [Pipe Organ Database — Opus 230-A](https://pipeorgandatabase.org/organ/22308); [OHS Aeolian-Skinner spec](https://organhistoricalsociety.org/aeolianskinner/Specs/Op00230a.html) |
| `oberlin-finney.jpg` | Opus 230-A in Finney Chapel, Oberlin | [Pipedreams — Oberlin Finney Chapel](https://www.pipedreams.org/profile/oberlin-finney-chapel-aeolian-skinner); Oberlin College archives |
| `new-console-render.jpg` | Design rendering of the new five-manual console | The Sedona Conservatory directly |
| `organ-case-render.jpg` | The organ case — the visible pipes across the stage | The Sedona Conservatory directly |

The Sedona Conservatory's own [concert organ page](https://sedonaconservatory.org/concert-organ/),
[Buy A Pipe page](https://sedonaconservatory.org/buyapipe/) and
[From Oberlin to Sedona](https://sedonaconservatory.org/from-oberlin-to-sedona/) carry
photographs of both instruments and are the most likely single source — and, being the
owner of the instruments, the right party to ask for permission.

## Before you publish any of these

**None of these images are public domain by default.** The Organ Historical Society,
the Pipe Organ Database, Pipedreams, Oberlin and Pomona all hold or administer rights
in their photography. Get written permission, then put the photographer's credit in
the `<cite>` inside each figure's `<figcaption>` — the markup is already there, reading
"Source and credit: see assets/img/README.md". Replace that string.

## Specs

- **Aspect ratio** — plates are `4 / 3` (`.plate--tall` is `3 / 4`); images are
  `object-fit: cover`, so anything close will crop gracefully.
- **Size** — 1600px on the long edge is plenty; these are never shown full-bleed.
- **Format** — `.jpg` as named above. To use `.webp` or `.avif`, change the `src` in
  the corresponding page.
- **Weight** — keep each under ~300 KB. The pages are otherwise asset-free and load
  instantly; don't undo that.
