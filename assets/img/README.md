# Photographs

The site ships with no images. Every `<figure class="plate">` already points at its
intended filename; until that file exists, an engraved "Photograph wanted" panel shows
in its place. **Drop a correctly-named file into this folder and it appears** — no code
change, no rebuild.

## Wanted files

| File | Subject | Page |
|---|---|---|
| `estey-console.jpg` | The ornate 4-keyboard console of Estey Opus 2981 | `estey.html` |
| `estey-facade.jpg` | The instrument in Bridges Auditorium, Claremont | `estey.html` |
| `oberlin-console.jpg` | The console of Aeolian-Skinner Opus 230-A | `oberlin.html` |
| `oberlin-finney.jpg` | Opus 230-A in Finney Chapel, Oberlin | `oberlin.html` |
| `new-console-render.jpg` | Rendering of the new 5-keyboard console | `new-organ.html` |
| `organ-case-render.jpg` | Rendering of the organ case | `new-organ.html` |

## Specs

- **Aspect ratio** — plates are `4 / 3` (`.plate--tall` is `3 / 4`); images are
  `object-fit: cover`, so anything close crops gracefully.
- **Size** — 1600px on the long edge is plenty; these are never shown full-bleed.
- **Format** — `.jpg` as named above. To use `.webp` or `.avif`, change the `src` in the
  corresponding page.
- **Weight** — keep each under ~300 KB. The pages are otherwise asset-free and load
  instantly; don't undo that.

## Photographer credits

Each figure's `<figcaption>` carries the caption only. If a photograph needs a credit
line, add a `<cite>` inside its `figcaption` — the styling is already there.
