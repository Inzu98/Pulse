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
- Each story gets one visual: a photo, an explainer illustration, or an icon. Use an icon when it already says what the story is about. When it doesn't, add an `illustration`.
- `illustration` is SVG text: `<svg viewBox="0 0 240 150">…</svg>`, line art only (path, circle, ellipse, rect, line, polyline, polygon), no text, no colors or styles (the app draws the lines in white). Include exactly one accent `<circle class="f" r="11" …/>`, drawn first so the lines sit on top of it. Show what happens in the story, e.g. a building, an arrow, a signed document.
- Stories are numbered automatically (01, 02, 03…) across the whole edition.
- Photos are optional. Leave `image` out when there's no good photo; the app then shows the `art` illustration, which is often the cleaner choice.
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
