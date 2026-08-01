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
assets/css/cathedral.css    # design system + every component
assets/js/cathedral.js      # config, façades, modal, video, reveals, counters
assets/img/README.md        # photograph sourcing manifest — read before publishing
docs/source-text/           # the Conservatory's own text, the authority for all quotes
```

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

## Photographs

**The site ships with none.** Each `<figure class="plate">` already points at its intended
filename; until that file exists an engraved "Photograph wanted" legend shows instead.
Drop a correctly-named file into `assets/img/` and it appears — no code change.

`assets/img/README.md` lists every wanted file, where to find it, and the rights that
need clearing first. Read it before publishing any image.

## Design notes

- **Rose window** — hand-authored inline SVG. One petal and one oculus defined in
  `<defs>`, rotated twelve times with `<use>`, so it stays sharp at any size and needs no
  JavaScript.
- **Organ façades** — generated in JS on a five-tower mitred profile (tallest pipes at the
  flanks and centre, stepping down into the flats). Decorative; the page reads fine
  without them.
- **The console** — five stacked keyboards drawn in pure CSS: naturals divided every 12px
  with the five sharps of each 84px octave laid over them in the correct 2–3 grouping.
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

## Editorial policy: source wording first

Where the Conservatory (or, for the Estey, the Organ Historical Society) has published
words for something, **the site uses those words rather than a paraphrase.** Quoted
passages are set as `<blockquote class="said">` with a `<cite>` naming the source and
linking to the page it came from. Sections that carry quoted copy but aren't set as
blockquotes — the donation tiers, the naming grid, the new organ's component list —
carry a provenance line underneath instead.

Original writing is kept only where the sources have no equivalent: the "Voices"
explainer, the timelines' summary headings, the donor-tier framing, the venue note, and
all connective and navigational copy. That material is the site's own.

**As of 1 August 2026 the quoted copy is verified.** The site owner supplied HTML
exports of the three Conservatory pages; their plain-text extractions live in
`docs/source-text/` and are the authority for every quoted passage. The earlier warning
about search-reconstructed wording no longer applies.

Two things the verified text changed, which are worth knowing if you edit further:

- **The Estey is not yet in Sedona.** The Aeolian-Skinner is; the Claremont instrument is
  "currently being prepared for its transport to Arizona." Earlier drafts said both shared
  quarters.
- **The American Classic began at Claremont, not with Aeolian-Skinner.** The 1931 Estey was
  "the first American concert hall organ to comprehensively employ this international
  design," the concept that "eventually became known as 'The American Classic.'"

The Conservatory's own pages disagree on the pipe count — `concert-organ` and `donations`
say 12,700, `buyapipe` says 12,800. This site uses **more than 12,700**, the figure two of
the three give. See `docs/source-text/README.md`.

## Where the content came from

Figures and history follow information published by the Sedona Conservatory, the Organ
Historical Society, the Pipe Organ Database and Pipedreams:

- **The project** — c. 235 ranks, more than 12,700 pipes, a new five-manual console with
  300 stops, an organ case spanning the full width of the stage.
- **Buy-A-Pipe** — a Restorative Sponsorship, current goal 2,500 pipes at $100 each. Gold
  "Soloists"/"Partners" button (up to $100, or $20/$50/$75); red "Maestros" button (two or
  more pipes at $100 each, each with its own dedication).
- **Donor levels** — the full published ladder, $1,000 to $150,000, with all 98 named pipe
  sets and their descriptions, from Nachthorn to the Tuba Sonora and the organ case. The
  Tierce is marked sponsored, as the source does.
- **Contact** — info@SedonaConservatory.org, (928) 554-5431, 560 Concho Drive, Sedona, AZ
  86351. 501(c)(3); donations tax-deductible to the full extent of the law.
- **Estey Opus 2981** — built 1931 for Bridges Auditorium, the gift of Mr. and Mrs.
  Appleton Bridges in memory of their daughter Mabel Shaw Bridges (d. 1907);
  specification by Joseph W. Clokey and James B. Jamison; dedicatory recital 23 November
  1931 by Palmer Christian; donated to the Conservatory through its curator, Harris.
- **Aeolian-Skinner Opus 230-A** — installed in Finney Chapel 1955, incorporating pipework
  from the earlier E. M. Skinner; displaced in 1997 by a bequest for a French-styled
  organ; sold 1999 and moved to Goulding and Wood, Indianapolis; bought for Sedona in June
  2014; moved west by the Organ Clearing House in November 2015.

## What couldn't be sourced, and what to check

The build environment has **no outbound network access to any external host** — every
fetch is refused at the gateway, including `example.com`. The Conservatory's own text was
supplied as HTML exports instead. Remaining gaps:

- **No photographs could be downloaded.** See `assets/img/README.md`. This is now the
  only outstanding item.
- **Sources disagree on two details.** The pipe count is given as both 12,700 and 12,800
  — the conservative figure is used. The Skinner predecessor in Finney Chapel is dated
  both 1914 and 1915 — 1915 is used.
- **The prose is editorial.** Section framing, the "Voices" copy, and the narrative
  connective tissue are written for this site, not quoted. The "Voices" section
  deliberately describes tonal families common to *any* large organ rather than this
  instrument's specification; no per-rank details are invented, since the Conservatory
  publishes the stoplist separately.

The *Pipe Up* video id was supplied directly and is wired up.

## The venue

Earlier drafts described a purpose-built Festival Concert Hall, following the
Conservatory's published material. **That is no longer the plan** — no new building will
be constructed for the organ; it will be housed inside an existing structure, yet to be
announced. The "Precinct" section has been removed and every claim of a purpose-built
hall revised. Where the venue is referred to at all, the site now says only that the home
is in Sedona and will be announced. Update this once the building is public.

**Verify every figure with the Conservatory before this goes public.** This is an
independent tribute site and is not affiliated with the Sedona Conservatory.
