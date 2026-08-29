# RTAI website

A static marketing site built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
No React, no CMS, no database, no server runtime required to host it, `npm run build` produces plain
HTML/CSS/JS in `dist/`.

## Run it, one step

**Windows:** double-click `start.bat`.
**macOS/Linux:** double-click `start.sh`, or run `./start.sh` in a terminal (`chmod +x start.sh` once first if needed).

Either one installs dependencies automatically on first run (only if `node_modules` doesn't exist yet),
starts the dev server, and opens your default browser to the site, no other commands needed. The only
prerequisite is [Node.js](https://nodejs.org) (LTS) being installed; if it isn't, the script tells you and
stops instead of failing with a confusing error.

Prefer the terminal? `npm run launch` does exactly the same thing, cross-platform.

There is no `requirements.txt` here because that's a Python convention, this is a Node.js/Astro project,
where `package.json` (dependency list) + `package-lock.json` (exact locked versions, already included)
is the equivalent. `npm install` reads those two files the same way `pip install -r requirements.txt`
reads a requirements file.

## Continuous integration

`.github/workflows/ci.yml` runs `npm run build` automatically on every push and every pull request to
`main`. If a change breaks the build, GitHub shows a red X on the PR before anyone merges it, this is
validation only, it doesn't deploy anything (Netlify/Vercel/Cloudflare Pages handle the actual deploy,
each on their own trigger). No setup needed on your end beyond having this file in the repo; GitHub picks
it up automatically.

## Is this harder to host than a classic static HTML project?

No, there's exactly one extra step, and after that step it's identical.

An old-school HTML/CSS/JS project is upload-and-done: the files you edit are the files a browser reads.
This project adds one step before that point: `npm run build` turns the `src/` folder into that same kind
of plain `dist/` folder, `.html`, `.css`, `.js`, nothing else, no server-side code, no database. Once
`dist/` exists, it is byte-for-byte as simple to host as an old static site:

- **Drag and drop, no git at all**, run `npm run build` locally, then drag the `dist` folder onto
  [Netlify Drop](https://app.netlify.com/drop) or Cloudflare Pages' manual upload. Live in seconds, no
  account setup beyond signing in.
- **Classic shared hosting (cPanel, FTP)**, run `npm run build`, then upload everything *inside* `dist/`
  into `public_html/` (or wherever your host's document root is) using FileZilla, cPanel's File Manager, or
  any FTP client, exactly the same motion as uploading an old static site, because at that point it is one.
- **Any Linux server**, see the `rsync` + nginx example earlier in this file.
- **Git-based (Netlify/Vercel/Cloudflare Pages)**, the recommended path from earlier in this file; the
  host runs the build step for you on every push, so you never manually touch `dist/` at all.

The only genuine difference from a classic HTML project: you can't edit a file on the live server directly
and see it change (there's a build step between source and output). Everything downstream of that build is
exactly as simple as it's always been.

Open `src/site.config.ts`. Company name, tagline, nav links, footer links, email, location, and social
links all live there. Every page and component reads from it, nothing is hardcoded per-page.

## Local development

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Opens a live-reloading preview at `http://localhost:4321`.

## Build

```bash
npm run build
```

Outputs a fully static site to `dist/`. Preview the production build locally with `npm run preview`.

## Deploy

### Option A, Git-based (recommended)

Push this repo to GitHub, then connect it to any of:

- **Vercel**, import the repo, it auto-detects Astro, zero config.
- **Netlify**, import the repo, build command `npm run build`, publish directory `dist`. Also enables
  the contact form on `/contact` with zero backend code (see below).
- **Cloudflare Pages**, same build command/publish directory as above.

Every push to `main` rebuilds and redeploys automatically, with a preview URL per pull request.

### Option B, Any plain Linux host, no Node.js required on the server

Node is only needed to *build* the site, not to *serve* it.

```bash
npm run build
rsync -avz dist/ user@yourserver:/var/www/RTAI/
```

Point nginx, Caddy, or Apache at that folder as a static site. Example minimal nginx block:

```nginx
server {
    listen 80;
    server_name example.com; 
    root /var/www/RTAI;
    index index.html;
    error_page 404 /404.html;
}
```

### Option C, Docker (portable, reproducible)

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

## Contact form

`src/pages/contact.astro` ships with a form pre-wired for **Netlify Forms** (`data-netlify="true"`) --
if you deploy on Netlify, submissions arrive with zero backend code, spam-filtered by default. If you
deploy elsewhere, swap the `<form>`'s attributes for a service like Formspree, or point it at your own
API endpoint; nothing else on the page needs to change.

## Project structure

```
start.bat               Windows one-click launcher
start.sh                 macOS/Linux one-click launcher
scripts/
  launch.mjs             installs deps if needed, starts dev server, opens browser
src/
  site.config.ts       single source of truth for brand text, nav, contact info
  layouts/
    BaseLayout.astro   head, fonts, nav, footer wrapper
  components/
    Nav.astro
    Footer.astro
    StatusTicker.astro live telemetry-style hero animation (respects prefers-reduced-motion)
  styles/
    global.css         Tailwind layers + design-token utility classes (.panel, .btn-primary, etc.)
  pages/
    index.astro
    product.astro
    industries.astro
    technology.astro
    case-studies.astro
    company.astro
    contact.astro
    careers.astro
public/
  favicon.svg
  robots.txt
```

## Design tokens

Defined in `tailwind.config.mjs`: an `ink` (graphite-navy) background scale, `paper` text scale, and
three accent colors, `amber` (attention/signature), `teal` (verified/healthy), `fault` (error states,
used sparingly). Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (data/status/labels),
loaded from Google Fonts in `BaseLayout.astro`.
