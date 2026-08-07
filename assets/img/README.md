# Photographs

The site ships with no images. Every `<figure class="plate">` already points at its
intended filename; until that file exists, an engraved "Photograph wanted" panel shows
in its place. **Drop a correctly-named file into this folder and it appears** — no code
change, no rebuild.

## Wanted files

| File | Subject | Page |
|---|---|---|
| `church-exterior.jpg` | The church at golden hour — twin towers, red rock behind | `index.html` hero |
| `church-interior.jpg` | The nave, looking toward the sanctuary | `index.html` |
| `estey-console.jpg` | The ornate 4-keyboard console of Estey Opus 2981 | `estey.html` |
| `estey-facade.jpg` | The instrument in Bridges Auditorium, Claremont | `estey.html` |
| `oberlin-console.jpg` | The console of Aeolian-Skinner Opus 230-A | `oberlin.html` |
| `oberlin-finney.jpg` | Opus 230-A in Finney Chapel, Oberlin | `oberlin.html` |
| `new-console-render.jpg` | Rendering of the new 5-keyboard console | `new-organ.html` |
| `organ-case-render.jpg` | Rendering of the organ case | `new-organ.html` |

## Specs

- **Aspect ratio** — plates are `4 / 3` (`.plate--tall` is `3 / 4`, `.plate--wide` is
  `16 / 9`); images are `object-fit: cover`, so anything close crops gracefully.
- **The hero** (`church-exterior.jpg`) is full-bleed behind the title, cropped to
  `center 58%` and covered by a theme-owned scrim. Landscape, 2400px wide, with the
  building off-centre and sky at the top works best. If the file is absent the layer
  removes itself and the hero falls back to the painted atmosphere.
- **Size** — 1600px on the long edge is plenty for the plates; only the hero is shown
  full-bleed and wants the wider 2400px.
- **Format** — `.jpg` as named above. To use `.webp` or `.avif`, change the `src` in the
  corresponding page.
- **Weight** — keep each under ~300 KB. The pages are otherwise asset-free and load
  instantly; don't undo that.

## Photographer credits

Each figure's `<figcaption>` carries the caption only. If a photograph needs a credit
line, add a `<cite>` inside its `figcaption` — the styling is already there.
