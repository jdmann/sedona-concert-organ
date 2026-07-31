# The Sedona Concert Organ

A single-page site for the Sedona Conservatory's concert organ, built to feel like a
great cathedral: soaring vertical proportions, a stained-glass rose window, gothic
arches, gilded lettering, quarried-stone grain, and shafts of light falling through
the nave.

Inspired by <https://sedonaconservatory.org/concert-organ/>.

## Running it

No build step, no dependencies. Open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000
```

## Structure

```
index.html                  # the whole page
assets/css/cathedral.css    # design system + all sections
assets/js/cathedral.js      # façade generation, reveals, counters, drawer
```

## Design notes

- **Rose window** — hand-authored inline SVG. One petal and one lobe defined in
  `<defs>`, then rotated twelve times with `<use>`, so it stays sharp at any size and
  needs no JavaScript.
- **Organ façades** — generated in JS in the classic mitred arrangement (tallest pipes
  at the flanks and centre, stepping down into the flats). Decorative; the page reads
  fine without them.
- **Gothic arches** — the two-panel "diptych" for the historic organs uses pointed-arch
  SVG paths filled with stained-glass gradients and leaded with dark strokes.
- **Type** — system serif stacks only (Iowan Old Style / Palatino / Georgia), so there
  are no webfont requests and nothing external to load.
- **No external assets whatsoever.** No fonts, images, scripts, or CDNs. The stone
  grain is an inline SVG `feTurbulence` filter in a data URI.
- **Motion** — every animation is gated behind `prefers-reduced-motion`.
- **Accessibility** — skip link, visible focus rings, labelled landmarks, ARIA-wired
  mobile drawer with Escape-to-close, decorative SVG hidden from assistive tech.
- Also styled for print, and for narrow screens down to 320px.

## About the content

Figures and history follow information published by the Sedona Conservatory:
235 ranks and more than 12,700 pipes, a new five-manual console, and the two source
instruments — the Estey *Magnum Opus* 2981 (1931, Claremont/Pomona College) and the
Aeolian-Skinner Opus 230-A (1955, Oberlin College Conservatory of Music).

Published sources disagree slightly on the pipe count (12,700 vs. 12,800); the
conservative figure is used here.

The "Voices" section describes the tonal families common to any large organ rather
than this instrument's specification — the Conservatory publishes the stoplist
separately, and no per-rank details are invented here. Prose framing, the timeline
wording, and the patronage tiers are editorial. **Verify all figures with the
Conservatory before using this publicly.** This is an independent tribute page and is
not affiliated with the Sedona Conservatory.
