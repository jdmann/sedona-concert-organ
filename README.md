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
| `index.html` | Overview — the instrument, the two landmarks, tonal families, the hall |
| `estey.html` | The Claremont Estey, Opus 2981 (1931), with its timeline |
| `oberlin.html` | The Oberlin Skinner, Aeolian-Skinner Opus 230-A (1955), with its timeline |
| `new-organ.html` | The new instrument being built, with its forward timeline |
| `support.html` | Buy a Pipe, donor tiers, sponsorship benefits, naming opportunities |

```
assets/css/cathedral.css    # design system + every component
assets/js/cathedral.js      # config, façades, modal, video, reveals, counters
assets/img/README.md        # photograph sourcing manifest — read before publishing
```

## Configuration

Both values live at the top of `assets/js/cathedral.js`.

```js
var CONTACT_EMAIL = 'info@sedonaconservatory.org';   // ← verify this address
var PIPE_UP_VIDEO = { provider: 'vimeo', id: '345343665' };
```

- **`CONTACT_EMAIL`** is still a *guess* and must be verified before launch. It's what
  the Contact modal composes to.
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

## Where the content came from

Figures and history follow information published by the Sedona Conservatory, the Organ
Historical Society, the Pipe Organ Database and Pipedreams:

- **The project** — c. 235 ranks, more than 12,700 pipes, a new five-manual console with
  300 stops, an organ case spanning the full width of the stage.
- **Buy-A-Pipe** — current goal of 2,500 pipes at $100 each; Soloists / Maestros /
  Partners tiers; sponsor names and their pipes inscribed within the case; preferred
  seating; reductions on SedCon logo items.
- **Naming** — Claremont Console, Oberlin Console, Full Conservatory Console, Organ Case,
  and the Great, Swell and Neo-Baroque divisions, plus donor-directed rights for
  significant gifts.
- **Estey Opus 2981** — built 1931 for Bridges Auditorium, the gift of Mr. and Mrs.
  Appleton Bridges in memory of their daughter Mabel Shaw Bridges (d. 1907);
  specification by Joseph W. Clokey and James B. Jamison; dedicatory recital 23 November
  1931 by Palmer Christian; donated to the Conservatory through its curator, Harris.
- **Aeolian-Skinner Opus 230-A** — installed in Finney Chapel 1955, incorporating pipework
  from the earlier E. M. Skinner; displaced in 1997 by a bequest for a French-styled
  organ; sold 1999 and moved to Goulding and Wood, Indianapolis; bought for Sedona in June
  2014; moved west by the Organ Clearing House in November 2015.

## What couldn't be sourced, and what to check

The build environment had **no outbound network access to any external host** — every
fetch of `sedonaconservatory.org`, the Organ Historical Society, the Pipe Organ Database
and Wikipedia was refused at the gateway. Everything above was reconstructed from search
results rather than read off the pages directly. Consequently:

- **No photographs could be downloaded.** See `assets/img/README.md`.
- **`CONTACT_EMAIL` is unverified.**

The *Pipe Up* video id was supplied by hand and is now wired up.
- **Sources disagree on two details.** The pipe count is given as both 12,700 and 12,800
  — the conservative figure is used. The Skinner predecessor in Finney Chapel is dated
  both 1914 and 1915 — 1915 is used.
- **The prose is editorial.** Section framing, the "Voices" copy, and the narrative
  connective tissue are written for this site, not quoted. The "Voices" section
  deliberately describes tonal families common to *any* large organ rather than this
  instrument's specification; no per-rank details are invented, since the Conservatory
  publishes the stoplist separately.

**Verify every figure with the Conservatory before this goes public.** This is an
independent tribute site and is not affiliated with the Sedona Conservatory.
