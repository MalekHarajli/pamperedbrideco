# The Pampered Bride

A single-page, **scroll-scrubbed film** site for **The Pampered Bride**
(@pamperedbrideco) — a luxury *day-of bridal attendant* service.

> A planner makes the wedding happen. We make certain the bride enjoys it.

The page barely moves — **scrolling scrubs a black-and-white film** of the
attendant pampering the bride through her whole day (helping her dress → the
veil → touch-ups, water & calm → the walk → the reception). Scroll down and it
plays forward; stop and the frame holds; scroll up and it rewinds. Editorial
text fades in over the film at milestones, and a closing spread (the two
bundles + inquire) settles up over the held final frame.

### How the scrub works
- The film is an **ordered sequence of preloaded frames** drawn to a `<canvas>`
  (`assets.js` → `TPB_ASSETS.frames`). Scroll progress 0→1 maps to the frame
  index, eased (lerp) and crossfaded so it's buttery.
- A canvas frame-sequence (not a raw `<video>`) is used **because iOS Safari
  stutters when you scrub `video.currentTime`** — compositing images has no
  decode/seek lag, so it scrubs perfectly on iPhone.
- A tall `.spacer` (≈600svh) creates the scroll range; everything visible is
  pinned. `prefers-reduced-motion` → the film holds one frame and the chapters
  become a normal scrolling stack.

## Run it
Static site — no build step, no backend.

```bash
python3 -m http.server 3000
# open http://localhost:3000
```

There's also a one-file build at `dist/pampered-bride.html` (everything inlined)
you can open directly or email to your phone. To deploy, drop the folder on
Netlify / Vercel / GitHub Pages. Run `./fetch-assets.sh` first to bake the film
frames into `/assets/frames` for fully-offline.

## Customise
- **Handle / Instagram:** search `@pamperedbrideco` in `index.html` (running
  head, closing inquire box, and the corner icon that appears at the bottom).
- **Palette:** the CSS variables at the top of `styles.css` `:root`. The site
  ships in warm black-and-white monochrome; swap the values back to cream/taupe
  (`--ivory:#f6f0e6; --taupe:#b8a78f; --umber:#6b5d4a; --ink:#4a4034;
  --gold:#a98c63`) to restore the warm look.
- **Copy:** plain HTML in `index.html` (each `.chapter`).
- **Bundles:** the two `<article class="pkg">` cards in the closing section.
  Pricing has been intentionally removed; the cards show name, tag, and what's
  included. Move the `pkg--signature` class / `Signature` ribbon to re-flag the
  recommended one.
- **The film:** replace the entries in `assets.js` `frames` (any count, in
  order) — the scrubber adapts. To use a real video, export it to a numbered
  JPG sequence and point the frames at them, e.g.
  `ffmpeg -i film.mp4 -vf fps=12 assets/frames/%02d.jpg`.

## File map
| File | Purpose |
|------|---------|
| `index.html` | Structure & copy (loader, canvas stage, pinned chapters) |
| `styles.css` | Design system, layout, animations, iOS/safe-area handling |
| `script.js` | Scroll-scrub engine, overlay fades, corner IG, email capture |
| `assets.js` | **The ordered film manifest** (local-first / CDN fallback) |
| `fetch-assets.sh` | Downloads the film frames into `/assets/frames` |

The email field is front-end only (no backend).
