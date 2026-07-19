# VESTRA — Editorial Fashion Store 

A front-end e-commerce mini-project: a clothing store home page and shopping bag, built with plain **HTML, CSS, and JavaScript** — no frameworks, no backend.

This is a redesign of a reference "Myntra Functional Clone" project. The **functionality is the same** (browse products, add to bag, see live totals, remove items, persist across reloads), but the **UI is completely original** — a dark, editorial "lookbook" theme instead of a typical e-commerce template.

## Live Demo
Open `index.html` in a browser — no build step, no dependencies.

## Features
- Product grid with price, discount %, and ratings
- Add to bag with a live count badge
- Dedicated bag page with per-item details
- Auto-calculated price summary (MRP, discount, convenience fee, total)
- Remove items with instant total recalculation
- Bag persists across refreshes via `localStorage`
- Fully responsive layout

## Tech
- **HTML** — semantic structure, JS-rendered content containers
- **CSS** — custom properties for theming, Flexbox + Grid layouts, no framework
- **JavaScript (vanilla)** — DOM manipulation, `localStorage`, array methods (`map`/`filter`/`find`/`forEach`)

## Project Structure
```
vestra/
├── index.html              # Home page (product grid)
├── pages/
│   └── bag.html             # Shopping bag page
├── css/
│   └── style.css            # Single stylesheet, shared by both pages
└── scripts/
    ├── data.js               # Product catalogue (data only)
    ├── main.js                # Home page logic + shared bag-icon logic
    └── bag.js                  # Bag page logic
```

## Design Notes
- No product photography — each item uses a CSS gradient "swatch" instead, keeping the look consistent as an art-directed lookbook rather than stock photos.
- Signature UI element: a hanging price tag on each product card, styled with CSS pseudo-elements (punched hole + dashed thread) to mimic a real retail tag.

## Run Locally
```bash
git clone <your-repo-url>
cd vestra
python3 -m http.server 5500
```

## License
Personal / educational project.
