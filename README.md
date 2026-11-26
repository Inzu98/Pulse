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
- `illustration` is SVG text: `<svg viewBox="0 0 240 150">…</svg>`, line art only (path, circle, ellipse, rect, line, polyline, polygon), no text, no colors or styles (the app draws the lines in white). Include exactly one accent `<circle class="f" r="11" …/>`, drawn first so the lines sit on top of it.
- Stories are numbered automatically (01, 02, 03…) across the whole edition.
- Always set `art` too: it is the fallback if a photo fails to load.
- Only `https://` links and images are shown. If an image fails to load, the app shows the illustration instead.
- Never set `"sample": true` in a real edition.

## Illustration keys (`art`)

World: `globe` `ballot` `chartUp` `chartDown` `coin` `court` `scale` `shield` `rings` `flag` `megaphone` `city` `pin` `plane` `ship` `bolt` `drop` `leaf` `wave` `pulse` `rocket` `newspaper` `calendar` `eye` `play`
Gaming: `controller` `handheld` `headset` `trophy` `joystick` `pixel`
Reading: `book` `openbook` `bulb` `doc` `magazine`
Design: `bezier` `swatches` `grid` `brush` `frame` `cursor` `star` `camera`
AI: `nodes` `chip` `spark` `wand` `chat` `robot` `prompt` `orbit`

Unknown keys fall back to `newspaper`.

## Local preview

```
node tools/serve.js . 5310
```

Icons are drawn by `tools/make-icons.ps1`.
