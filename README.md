# KingVisual Studios

Static multi-page photography and video website, deployed on Vercel.

## Inquiry routes

All consultation buttons contain the real consultation URL directly in HTML:
https://kingvisualstudio.square.site

Service CTAs describe the inquiry, but do not preselect a service in the external form.
The destination currently supplies a consultation form. Do not add service-specific URL
parameters unless the booking provider supports and verifies them.

`/book` and `/book.html` redirect to that destination through `vercel.json`.
`book.html` also contains a meta redirect and visible fallback links for other hosts.
Existing wedding, event, portrait, video, and review URLs remain available.

## Validation

No installation or build is required.

```sh
python3 scripts/check_site.py
node --check assets/script.js
git diff --check
```

The static checker covers local destinations, asset references, fragment anchors,
booking URLs, desktop/mobile service navigation, orphan pages, and legacy booking redirects.
Browser QA should include a narrow viewport, menu open/close, keyboard Escape/focus return,
and a JavaScript-disabled load. Page content and consultation links remain usable without JavaScript.

## Content still required

- Portrait-session photographs approved for public display, with descriptive captions.
- Publicly shareable video URLs or video files, titles, and poster images for playable samples.
- Actual client testimonials with attribution, permission to publish, and source URLs where available.

The repository and its history did not supply these materials. Do not substitute unrelated
photos for portrait/video samples or publish unattributed draft quotes as client reviews.
The wedding and event pages use relevant images from the existing approved photo set.
Portrait/video pages explain the services without pretending to show a portfolio.
The review page states that published reviews are not yet available and offers a consultation path.

Before enabling a playable film, verify its public URL and provide controls, a descriptive
title, and captions where applicable. Before adding a testimonial, verify its wording and attribution.
Do not invent prices, delivery times, package inclusions, or availability.
