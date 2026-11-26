# Pulse

A personal news checkup, installed on the iPhone home screen from GitHub Pages.
The design lives in this repo permanently. Scheduled Claude routines only write small JSON files into `data/`, and the app redraws itself from them.

## Sections

| id | Name | Updates |
|---|---|---|
| `daily` | The Daily Briefing | Mon, Wed, Fri at 5:00 a.m. Bogotá |
| `reading` | The Monday Bookshelf | Mondays at 5:00 a.m. |
| `gaming` | The Tuesday Checkpoint | Tuesdays at 5:00 a.m. |
| `design` | The Thursday Crit | Thursdays at 5:00 a.m. |
| `ai` | The Friday Prompt | Fridays at 5:00 a.m. |

## How a routine publishes an edition

For section `<id>` and edition date `<YYYY-MM-DD>` (the run date in Bogotá time):

1. Write the edition to `data/<id>/<YYYY-MM-DD>.json`.
2. Copy the same content to `data/<id>/latest.json`.
3. In `data/<id>/index.json`, put the new date first in `editions` (newest first, keep at most 12, no duplicates).
4. Delete edition files that are no longer listed in `index.json`.
5. Commit only those files and push to `main`.

Never edit anything outside `data/<id>/`.

## Edition format

```json
{
  "section": "gaming",
  "edition": "2026-11-30",
  "brief": ["3 to 5 one-line takeaways. Wrap one or two key words in *asterisks* to set them in Gambetta italic."],
  "groups": [
    {
      "name": "Last week",
      "intro": "Optional one-line intro for the group.",
      "items": [
        {
          "title": "Headline, plain and specific",
          "summary": "One or two paragraphs (max two), separated by a blank line (\n\n). First: what happened, with names, numbers and dates. Second: background, why it matters to the reader and what to watch next.",
          "source": "Reuters",
          "date": "2026-11-28",
          "url": "https://… the article itself",
          "image": "https://… optional: a real photo from the article page (og:image), only when it adds something",
          "credit": "Photo: Reuters (required when image is set)",
          "art": "controller"
        }
      ]
    }
  ],
  "feature": {
    "kicker": "Explain it from the start",
    "title": "Optional explainer title",
    "steps": ["How it began", "Key turning points", "Where it stands", "What each side wants", "What to watch"],
    "url": "https://… neutral explainer",
    "source": "BBC",
    "art": "globe"
  },
  "recap": [ { "label": "Colombia", "line": "12 words or fewer.", "art": "ballot" } ]
}
```

- `feature` and `recap` are optional (the Daily Briefing uses both).
- The first item of each group is shown large; put the item with the best photo first.
- Add `"cover": true` to the one story the reader will care about most. It becomes the magazine cover of the section page (its photo, number and headline). Without it, the first story is used. The cover is always a photo, never an illustration: the cover story must have an `image` taken from that same article (its og:image), so it shows the actual story. If the story you'd pick has no usable photo, mark the best story that does.
- The cover photo is not repeated below; there the cover story shows its `illustration`, or its `art` icon.
- Each story gets one visual. Prefer a real photo. Try, in this order:
  1. The linked article's own photo (its `og:image`).
  2. The same story at another outlet that allows access: use that article's `og:image`, and set `url`, `source` and `date` to that article so the photo always matches the link.
  3. A free-license photo of the people or place in the story from Wikimedia Commons (the `upload.wikimedia.org` file URL; `credit`: "Photo: <author> / Wikimedia Commons, <license>"), or a public-domain government photo. Only when it clearly shows who or what the story is about.
  4. An `illustration`, only for something a photo can't show (a process, a comparison, a flow), and only as a literal scene a reader understands at a glance. Never abstract.
  5. Otherwise just the `art` icon.
- Only link to the original image URL. Never download, copy or re-upload images, and never take images from image-search results. Skip photos that are graphic, violent, or show private individuals.
- Check every image URL before you use it: `curl -s -o /dev/null -w '%{http_code} %{content_type}' '<image url>'` must print `200 image/...`. If the check fails, treat that photo as unavailable and go to the next option above.
- Never use images hosted on these sites: they block their photos from showing in the app's browser even when curl gets them: `videogameschronicle.com` (VGC), `gematsu.com`. You can still link and cite their articles; take that story's photo from another outlet, the publisher's or studio's own page, or a press kit. For gaming stories, prefer outlets whose photos are known to show: Kotaku, IGN, Eurogamer, The Verge, Polygon, GGRecon, Inven Global, Strafe, and official studio or platform blogs.
- Use sharp, large images. The longer side must be at least 800px (measure it, e.g. `curl -s '<url>' -o /tmp/i && python3 -c "from PIL import Image; print(Image.open('/tmp/i').size)"`; run `pip install pillow` first if needed; the temp file is only for measuring, never publish it). Prefer the biggest version a page offers (og:image is usually 1200px wide).
- Books: every book gets a `bookCover`: the real cover redrawn for the wide 16:10 frame, as if the book itself had that shape. Find the real cover (publisher page, Open Library, store page) and study it: download it to /tmp only to look at it and to sample its colors with PIL (never publish the file). Then write an SVG, `<svg viewBox='0 0 1600 1000'>…</svg>`, that keeps the cover's background color, palette, type hierarchy and key image (title, author, subtitle, badges), re-laid out to fill the wide frame. Allowed: rect, circle, ellipse, line, path, polyline, polygon, g, text, tspan; attributes for shapes, fill, stroke, opacity, transform and text (font-size, font-weight, font-style, letter-spacing, text-anchor). Fonts: only `Big Shoulders Display` (heavy condensed), `General Sans` (clean sans) or `Gambetta` (serif); pick the closest match. No images, links or styles. Keep text inside the frame. Also keep the real cover as `image` when it passes the size check, so it can serve as the section's magazine cover.
- If you run on a day that already has an edition, don't skip it: re-check that edition against these rules and fix any story whose photo breaks them.
- `illustration` is SVG text: `<svg viewBox="0 0 240 150">…</svg>`, line art only (path, circle, ellipse, rect, line, polyline, polygon), no text, no colors or styles (the app draws the lines in white). Include exactly one accent `<circle class="f" r="11" …/>`, drawn first so the lines sit on top of it.
- Stories are numbered automatically (01, 02, 03…) across the whole edition.
- Always set `art` too: it is the fallback if a photo fails to load.
- Only `https://` links and images are shown. If an image fails to load, the app shows the illustration instead.
- Never set `"sample": true` in a real edition.

## Icons (`art`)

The icon must show what the story is about, literally. Ask: would a reader guess the story from the icon alone? A Witcher game is a `sword`, not a `controller`; an AI sports commentator is a `mic`, not a `headset`; layoffs are `people`; servers shutting down is `server`. Don't pick an icon just because it belongs to the section. If no key fits, use the closest literal one or add an `illustration`.

| Key | Shows | Use for |
|---|---|---|
| `globe` | globe | world affairs, international deals |
| `ballot` | ballot box | elections, votes, referendums |
| `chartUp` / `chartDown` | rising / falling chart | growth, sales, prices up / down |
| `coin` | coin stack | money, budgets, earnings, prices |
| `court` | court building | courts, rulings, trials |
| `scale` | balance scale | law, justice, fairness, regulation |
| `shield` | shield with check | security, police, safety, protection |
| `rings` | linked rings | deals, alliances, mergers |
| `flag` | flag | nations, sovereignty, territory |
| `megaphone` | megaphone | announcements, protests, campaigns |
| `city` | buildings | cities, offices, studios, local news |
| `pin` | map pin | places, borders, travel |
| `plane` | plane | flights, air strikes, aviation |
| `ship` | ship | trade, tariffs, shipping, ports |
| `bolt` | lightning bolt | energy, power, sudden events |
| `drop` | water drop | water, oil, weather |
| `leaf` | leaf | climate, environment, nature |
| `wave` | waves | sea, audio, music |
| `pulse` | heartbeat | health, medicine |
| `rocket` | rocket | launches, space, startups |
| `newspaper` | newspaper | media, journalism |
| `calendar` | calendar with a checked date | events, dates, schedules, festivals |
| `eye` | eye | surveillance, privacy, viewing |
| `play` | video player | videos, trailers, showcases, streams |
| `doc` | document | reports, studies, papers, laws |
| `people` | group of people | jobs, layoffs, communities, users |
| `phone` | smartphone | mobile apps and games |
| `mic` | microphone | voice, commentary, podcasts, interviews |
| `server` | server rack | servers, shutdowns, cloud, outages |
| `tag` | price tag | prices, sales, discounts |
| `controller` | gamepad | console games in general |
| `handheld` | handheld console | Switch, Steam Deck, handhelds |
| `headset` | VR goggles | VR and AR |
| `headphones` | headphones | gaming audio, music |
| `trophy` | trophy | esports, awards, winners |
| `joystick` | arcade stick | retro and arcade games |
| `pixel` | pixel creature | retro, indie, pixel-art games |
| `sword` | sword | fantasy, RPG, action games |
| `book` / `openbook` | book | books, reading |
| `bulb` | light bulb | ideas, tips, learning |
| `magazine` | magazine | magazines, essays, issues |
| `bezier` | pen-tool curve | vector design, logos, type |
| `swatches` | color swatches | color, palettes, brand systems |
| `grid` | layout grid | layout, editorial, UI systems |
| `brush` | brush | illustration, painting, art |
| `frame` | framed picture | images, posters, galleries |
| `cursor` | selection arrow | design software, tools, UI |
| `star` | star | awards, standout work |
| `camera` | camera | photography |
| `nodes` | connected nodes | networks, AI models |
| `chip` | chip | hardware, chips, compute |
| `spark` | sparkle | generative AI features |
| `wand` | magic wand | AI tools that create or edit |
| `chat` | chat bubble | chatbots, assistants, messaging |
| `robot` | robot | agents, automation, robots |
| `prompt` | terminal | prompts, code, workflows |
| `orbit` | orbit | science, research, platforms |
| `brain` | tech brain | AI thinking, intelligence |

Unknown keys fall back to `newspaper`. Illustrations follow the same system as the icons: line art plus exactly one accent circle (`class="f"`, r 11) drawn first and placed on a meaningful point of the drawing.

## Local preview

```
node tools/serve.js . 5310
```

Icons are drawn by `tools/make-icons.ps1`.
