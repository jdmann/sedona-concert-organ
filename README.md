# The Sedona Concert Organ

A site for the Sedona Conservatory's concert organ — built to educate about the project
and to raise money through the Buy-A-Pipe campaign. Styled as a great cathedral: soaring
vertical proportions, a stained-glass rose window, gothic arches, gilded lettering,
quarried-stone grain, and shafts of light falling through the nave.

Inspired by <https://sedonaconservatory.org/concert-organ/>.

## Running it

No build step, no dependencies. Serve the folder:

```sh
python3 -m http.server 8000
```

## Pages

| File | What it is |
|---|---|
| `index.html` | Overview — the instrument, the two landmarks, the film, tonal families |
| `estey.html` | The Claremont Estey, Opus 2981 (1931), with its timeline |
| `oberlin.html` | The Oberlin Skinner, Aeolian-Skinner Opus 230-A (1955), with its timeline |
| `new-organ.html` | The new instrument being built, with its forward timeline |
| `support.html` | Buy a Pipe, donor levels ($1,000–$150,000, 98 named pipe sets), contact |

```
assets/css/cathedral.css      # structure: layout, type, components — no colour
assets/css/theme-night.css    # palette: the original candlelit cathedral (default)
assets/css/theme-garnet.css   # palette: oxblood and garnet, copper-gold
assets/css/theme-sedona.css   # palette: sunlit sandstone, red rock, desert sky
assets/js/cathedral.js        # config, façades, modal, video, reveals, counters
assets/img/README.md          # photograph manifest
docs/source-text/             # plain-text copies of the live pages, for reference
```

## Themes

Colour lives entirely in the theme stylesheets; `cathedral.css` holds no colour at
all, only tokens. Swapping a theme is one `<link>`.

```html
<link rel="stylesheet" href="assets/css/cathedral.css">
<link rel="stylesheet" href="assets/css/theme-night.css" id="theme-css" data-default="night">
```

**Night** (default) — the original: candlelit stone, gold leaf, glass glowing out of
the dark.

**Garnet** — the cathedral at vespers. Deep reds rather than literal desert
colour: every surface is an oxblood or a garnet rather than a neutral, so nothing on
the page reads as grey. Gold is pulled toward copper so it belongs to the reds around
it. Shadows carry a red cast, so depth reads as recess in the same stone.

**Sedona** — a sunlit cathedral. Desert sky at the top of the hero falling through warm
sand to red rock at the floor; sandstone pages, clay contrast bands, bronze in place of
gold leaf, juniper and turquoise among the voice accents.

### Switching while testing

Append `?theme=garnet`, `?theme=sedona` or `?theme=night` to any URL. The choice is remembered in
`localStorage`, and the swap runs before paint so there is no flash. To lock the site
to one theme for launch, delete the inline `<script>` block and the `data-default`
attribute from the five pages.

### Adding a theme

Copy `theme-night.css`, rename, and change the values. Every token it defines is
consumed by `cathedral.css`, so nothing else needs touching. The tokens cover
surfaces, ink, gilding, glass, accents, shadow and light, the six atmosphere
gradients, and the instrument (keys, pipe metal). A theme file may also carry a short
tail of corrections — Sedona's re-points a few effects that were built to glow out of
darkness, such as switching the light shafts to `multiply`.

## Components

Every raised panel — `.card`, `.cell`, `.xlink`, `.tier`, `.name-op`, `.plate`,
`.level` — shares one interaction primitive rather than carrying its own hover rules,
which had drifted apart. The shared behaviour is:

- a **sprung lift** of `--lift` on a rebounding curve going up, and a plain curve
  coming back down, so it feels picked up rather than pushed;
- a **two-layer shadow** — a tight contact shadow plus a wide ambient one — swapping
  `--elev-1` for `--elev-3`;
- a **border bloom** to gild, faster than the lift so the edge leads;
- a **sheen**: a narrow diagonal band of gild parked off the left edge that crosses the
  face once over `--dur-slow`. It is a `::after` on a `translate3d`, so it composites on
  the GPU and never triggers layout.

**Buttons** carry the same vocabulary at a smaller amplitude — a 3px sprung lift,
`--elev-2`, and the same sheen, quieted on `.btn--ghost` since it fills rather than
glints.

Press states settle to `0`, keyboard focus gets the same lift as hover, and the whole
set is guarded by `@media (hover: hover)` so touch devices don't get stuck in a hover
state. Under `prefers-reduced-motion` the sheen is removed and the lift dropped.

**Shape.** `--radius-sm` (3px) on buttons and inputs, `--radius` (5px) on cards and
grids, `--radius-lg` (8px) on the film frame and contact dialog — enough to take the
machined edge off without making the cathedral look like a dashboard. Grid containers
that draw their dividers with a 1px gap also get `overflow: hidden`, so the cells clip
to the rounded corner.

`.level` rows are deliberately excluded from the lift: a list should not have each of
its rows jumping out of the stack, so they tint instead. On `support.html` every donor
level ships `open`.

Motion and elevation are tokens (`--dur-fast/base/slow`, `--e-spring`, `--e-exit`,
`--elev-1/2/3`) in `cathedral.css`; only the shadow *colour* comes from the theme.

`.voice` deliberately keeps its own treatment — it is a flat tile in a grid, so it
lights from within instead of lifting out of the page.

## Configuration

Both values live at the top of `assets/js/cathedral.js`.

```js
var CONTACT_EMAIL = 'info@SedonaConservatory.org';   // confirmed
var PIPE_UP_VIDEO = { provider: 'vimeo', id: '345343665' };
```

- **`CONTACT_EMAIL`** is `info@SedonaConservatory.org`, confirmed from the Conservatory's
  own pages. The contact modal and the support page also carry the published phone number,
  (928) 554-5431, and the office address.
- **`PIPE_UP_VIDEO`** is set to the *Pipe Up* film on Vimeo. The player is click-to-load,
  so nothing is requested from Vimeo until a visitor presses play; `support.html` also
  carries a plain link to the video for anyone without JavaScript. Setting `provider` to
  `'youtube'` switches the embed to `youtube-nocookie.com`. Leaving either field empty
  disables the play control rather than rendering a broken embed.

## Design notes

- **Rose window** — hand-authored inline SVG. One petal and one oculus defined in
  `<defs>`, rotated twelve times with `<use>`, so it stays sharp at any size and needs no
  JavaScript.
- **Organ façades** — generated in JS on a five-tower mitred profile (tallest pipes at the
  flanks and centre, stepping down into the flats). Decorative; the page reads fine
  without them.
- **The console** — five stacked keyboards drawn in pure CSS: naturals divided every 12px
  with the five sharps of each 84px octave laid over them in the correct 2–3 grouping.
- **Photographs** — every `<img>` already points at its intended file. If the file is
  absent, a plate shows an engraved "Photograph wanted" legend and the hero's photo layer
  removes itself entirely, falling back to the painted atmosphere. Each theme owns the
  hero's `--hero-scrim` and `--hero-photo-filter`, so the photograph is graded into that
  theme's light rather than sitting on top of it.
- **Video** — click-to-load. Nothing is requested from the video host until the visitor
  presses play, so the page sets no third-party cookies on arrival.
- **Contact modal** — native `<dialog>`, so focus trapping and Escape-to-close come from
  the browser. With no backend, the form composes the message in the visitor's own mail
  client and says so plainly rather than faking a send. To wire a real endpoint, replace
  the `form[data-mailto]` submit handler.
- **Type** — system serif stacks only (Iowan Old Style / Palatino / Georgia), so there are
  no webfont requests.
- **No external assets whatsoever.** No fonts, images, scripts, or CDNs. The stone grain
  is an inline SVG `feTurbulence` filter in a data URI.
- **Motion** — every animation is gated behind `prefers-reduced-motion`.
- **Accessibility** — skip link, visible focus rings, `aria-current` on the active nav
  item, ARIA-wired mobile drawer, decorative SVG hidden from assistive tech, and
  `scroll-margin-top` so anchor jumps clear the fixed masthead.
- Also styled for print, and for narrow screens down to 320px.

The shared chrome (masthead, drawer, contact modal, footer) is written into each page
rather than injected at runtime, so navigation works with JavaScript disabled. Editing it
means editing all five files.

## Copy

The site is written in the Conservatory's own words. `docs/source-text/` holds plain-text
copies of the live pages the wording came from — keep them in step if the live site
changes, and use them to check any edit.

Two things worth knowing if you edit further:

- **The Estey is not yet in Sedona.** The Aeolian-Skinner is; the Claremont instrument is
  being prepared for its transport to Arizona.
- **The American Classic began at Claremont.** The 1931 Estey was the first American
  concert hall organ to comprehensively employ the international design that became known
  by that name.

The pipe count is inconsistent across the live pages — `concert-organ` and the donation
page say 12,700, `buyapipe` says 12,800. This site uses **more than 12,700**, the figure
two of the three give. Worth reconciling on the live site.

Original writing, where the pages had no equivalent: the "Voices" explainer, the timeline
headings, the venue note, and all connective and navigational copy.

## What the site covers

- **The project** — c. 235 ranks, more than 12,700 pipes, a new 5-keyboard console with
  300 stops, and an organ case spanning the full width of the stage, its design inspired
  by the viewscapes of the Sedona region.
- **Buy-A-Pipe** — a Restorative Sponsorship, current goal 2,500 pipes at $100 each. Gold
  "Soloists"/"Partners" button (up to $100, or $20/$50/$75); red "Maestros" button (two or
  more pipes at $100 each, each with its own dedication).
- **Donor levels** — the full ladder, $1,000 to $150,000, with all 98 named pipe sets and
  their descriptions, from the Nachthorn to the Tuba Sonora and the organ case. The Tierce
  is shown sponsored.
- **The two instruments** — Estey Magnum Opus 2981 (1931) and Aeolian-Skinner Opus 230-A
  (1955), each with its own page and timeline, plus a page for the instrument they are
  becoming.
- **Contact** — info@SedonaConservatory.org, (928) 554-5431, 560 Concho Drive, Sedona, AZ
  86351. 501(c)(3); donations tax-deductible to the full extent of the law.

## Outstanding

**Photographs.** The site ships with none. `assets/img/README.md` names the eight files
the pages are already wired for — two of the church, six of the instruments — and drop-in
is the only step: the `<img>` elements already point at the intended filenames.

**The venue.** No new building will be constructed for the organ; it will be housed
inside an existing structure. The home page now carries a *Where it will stand* section
describing the church — twin bell towers under copper domes, a long nave, a rose window
above the sanctuary — and the hero is wired to take the exterior photograph as its
backdrop. The building is **not named anywhere on the site**, since it has not been
announced publicly; a fineprint line in that section marks the spot. Add the name there
and in the hero lede once it is public.
