# VA Portfolio Template

A single-page, responsive portfolio site for virtual assistants. Warm editorial style: serif type, sage and cream, arched portrait.

## Use it

Open `index.html` in a browser. No build step or install needed. (Fonts load from Google Fonts, so they need an internet connection. A system serif is used otherwise.)

## Make it yours: edit `js/content.js` only

| What | Where in `content.js` |
|---|---|
| Name, monogram, nav links | `brand`, `nav` |
| Hero text, role, intro, button | `hero` |
| Stats strip (hide with `stats: []`) | `hero.stats` |
| Portrait | replace `assets/profile.png` (transparent cutout, ~4:5), or change `hero.photo` |
| Case studies (click to open details) | `projects.items` |
| Testimonials | `testimonials.items` |
| Contact button, email, location, socials | `contact`, `footer` |
| Colors | `theme`: `"sage"`, `"blush"` or `"slate"` |

Tips
- Case-study cards show a drawn mock-up (`inbox`, `calendar` or `board`). To use a real screenshot, set `image: "assets/your-file.jpg"`.
- Keep first and last name short; the hero name is sized for ~8 letters per line.
- To add a theme, copy a `:root[data-theme="..."]` block in `css/styles.css` and change the colors.

## Files

```
index.html        page shell
css/styles.css    design tokens + styles
js/content.js     all editable content
js/app.js         renders the page from content.js
assets/           profile.png (transparent cutout), profile-square.png (spare)
```
