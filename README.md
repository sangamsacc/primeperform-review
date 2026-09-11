# Prime Perform Review

A fast, SEO-friendly, single-page affiliate website that reviews the Prime Perform male vitality supplement and routes qualified visitors to the official product page.

## Project

This is a **100% static** affiliate marketing site, built to run on GitHub Pages with no server, database, or build step. It presents the Prime Perform formula — active ingredients, manufacturing standards, guarantee, and buying considerations — using only verified information published by the manufacturer.

Commission links point to:

```
https://primeperformpro.com/welcome/#aff=sangamsth
```

All affiliate links are marked with `rel="nofollow sponsored"` and open in a new tab.

## Technology

- HTML5 (semantic markup, single H1, logical heading hierarchy)
- CSS3 (custom properties, responsive grid, `clamp()` type scaling, CSS-only animations)
- Vanilla JavaScript (header shrink, mobile menu, scroll reveal, FAQ accordion, sticky CTA)
- WebP images (lazy-loaded, with explicit width/height to reduce layout shift)
- JSON-LD structured data (`WebSite` + `Product`, no invented price/ratings)
- Google Fonts (Sora + Inter, loaded with `display=swap` and font fallbacks)

No frameworks, no build tools, no backend, no external services.

## Deployment (GitHub Pages)

1. Push this repository to GitHub.
2. In the repo settings go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch** and select the `main` branch (root folder).
4. The site will be published at:

```
https://sangamsacc.github.io/primeperform-review/
```

The canonical URLs in `index.html`, the legal pages, `robots.txt`, and `sitemap.xml` already use the `sangamsacc.github.io` domain. No placeholder replacement is needed before publishing. If you ever publish under a different GitHub account, update the `sangamsacc` domain in those files.

## Test locally

Open `index.html` directly in a browser, or run a local static server for the exact GitHub Pages behaviour:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000` and check the network tab for all assets resolving from relative paths.

## Structure

```
├── index.html
├── privacy-policy.html
├── terms-of-use.html
├── affiliate-disclosure.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
└── assets/
    ├── images/    (product, ingredient, badge and bonus webp assets)
    └── icons/     (SVG favicon)
```

## Content policy

This site deliberately avoids fabricated claims. No fake testimonials, reviews, ratings, prices, or before/after results are used. Information is limited to what the manufacturer publishes about Prime Perform, and a visible affiliate disclosure is included.