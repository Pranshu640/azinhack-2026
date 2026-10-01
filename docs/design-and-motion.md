# AZINHACK ’26 — design and motion

## Reference study

Reference: [KriticalHacks](https://kritical-hacks.vercel.app/), inspected on 1 October 2026 through TinyFish and the browser.

The reference is a sequence of full-screen scenes. At one observed scroll position, its section bounds remained at the top of the viewport while scroll progress changed the displayed composition. The hero uses layered artwork and large split typography; the next scene reveals a quote, image and calls to action. These observations informed the pinned scene progression. Its branding, content, photos and red visual language were not reused.

The supplied mood board informed the editorial typography, blue accents, black-and-white halftones, printed-paper texture, dotted grids, pixel marks and contrasting accent colours. The final direction is a digital build poster: large typography and a hand reaching for a spark, followed by deliberate changes in background and scale.

## Scene choreography

| Scene | Scroll behavior |
| --- | --- |
| Hero | Short pinned scene; artwork lifts and rotates, orbit counter-moves, title eases upward |
| About | Pinned manifesto; lines reveal in sequence, supporting text arrives later |
| Prizes | Pinned amount; numerals assemble, stamp rotates, explanatory copy enters |
| Challenge | Pinned brief; three simple build steps and the required TinyFish integration card arrive together |
| Journey | Pinned overview; three build phases arrive in sequence |
| Sponsors | Natural section; TinyFish title-sponsor card enters before Docker |
| TinyFish | Natural section with a staggered entrance |
| Gallery | Pinned horizontal track; scroll-driven movement and gentle snap between frames |
| FAQ / footer | Natural document scrolling |

GSAP ScrollTrigger uses scrubbed timelines, reversible animation and pin spacing. Lenis is connected to the GSAP ticker. Animations and listeners are disposed on cleanup. Navigation resolves pinned scene coordinates, so anchors land at readable content rather than inside a spacer.

Mobile widths and short windows use document scrolling and simpler entrances. Reduced-motion preferences disable the animation system. A manual pause option also disables smooth scrolling and pinning; the gallery then exposes native horizontal scrolling. The photo viewer is a native modal dialog with previous/next buttons, keyboard arrows and Escape close.

## Content decisions

Official public branding follows the supplied context: AZINHACK ’26. Confirmed facts include 21–22 October 2026, GGSIPU USAR East Delhi Campus, ₹1 lakh total prize pool, one Open Innovation track, TinyFish title sponsorship and mandatory TinyFish integration. A single Open Innovation track is explained in three build steps. Example project ideas are explicitly part of that same track.

The photos form a community archive. No photo year or event edition is asserted. The schedule is an untimed participant journey because the proposal has conflicting build and closing times. Registration links open the official organizer-supplied Unstop event page.

Technical references: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) and [Next.js installation](https://nextjs.org/docs/app/getting-started/installation). The installed Next.js documentation was also reviewed for static exports and Turbopack configuration.

## Palette update — 1 October 2026

The page base is very light blue (`#EFF5FF`) with cool blue secondary surfaces. HACK is electric blue (`#3D43FF`) in the hero, header and footer wordmarks. TinyFish references use its official homepage accent orange (`#FF6700`), verified against the hero highlight, CTA hover styles and [official stylesheet](https://www.tinyfish.ai/_next/static/chunks/3scxog8ys54tg.css). The sponsor section and integration badges use that orange; dark ink preserves legibility.

A local, tileable monochrome TV-static texture sits behind section content at 15% opacity. Its stepped background motion pauses with the site's motion control and stops under reduced-motion preferences. It does not intercept clicks or cover the content.

## Sponsor assets and accent refinement

TinyFish orange (`#FF6700`) replaces the previous lime accent throughout the stickers, ticker, prize stamp, active tabs, journey, light-surface gallery controls. Dark surfaces now use pale-white accents. Text on the blue manifesto stays pale for legibility. Neutral surfaces and supporting type use cool greys.

The dedicated Sponsors section features TinyFish as the title sponsor and Docker as a sponsor, using the original horizontal SVG logos from the supplied brand asset folders. TinyFish has the larger card and an orange tier label; Docker retains its official logo blue (`#2560FF`). The provided TinyFish brand guide also confirms Orange Burst as `#FF6700`. The logos preserve their proportions and have clear space around the artwork. Sponsor navigation and a link to TinyFish build resources are included.

## Student clarity and visual refinements

The track explains one Open Innovation competition, three steps from problem to demo, and a prominent mandatory TinyFish integration card. Primary TinyFish sponsor and account links use the exact owner-provided tracked sign-up URL stored in `event.tinyfishUrl`; the documentation link still points to documentation. The ₹1 lakh figure is explicitly described as the total prize pool.

The build-partner logo has a rounded, translucent white-glass panel. The header CTA, ticker, dark journey, terminal and footer use pale white in place of orange accents. The footer wordmark has separate name and year elements with reserved spacing. The FAQ precedes the gallery, with the chapter labels updated to match.
