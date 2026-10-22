# kimnco

Production frontend codebase for a live company website built with **React** and **Vite**.  
This application is actively used in a real business environment and deployed for public access.

🔗 **Live demo:** https://kimnco.co.kr

🔗 **Technical Blog:** https://blog.minsung.dev/blog/company-website

---

## 🚀 Features

- Bilingual (Korean / English) routes under `/ko` and `/en` with react-i18next
- Portfolio page with an interactive Kakao Map (SDK loaded only on that page)
- Contact form via EmailJS with a honeypot field for spam bots
- Per-route static HTML shells (title, description, Open Graph, hreflang, JSON-LD) and `sitemap.xml`
  generated at build time, so link-preview scrapers that don't run JS (KakaoTalk, Naver) see correct meta tags
- Security headers and Content-Security-Policy via `public/_headers`

---

## 📦 Getting Started

### 1. Clone the repository

    git clone https://github.com/aestim/kimnco.git
    cd kimnco

### 2. Install dependencies

    npm install

### 3. Configure environment variables

Create `.env` (or use the committed `.env.production` values):

    VITE_KAKAO_MAP_API_KEY=...
    VITE_APP_EMAILJS_SERVICE_ID=...
    VITE_APP_EMAILJS_TEMPLATE_ID=...
    VITE_APP_EMAILJS_PUBLIC_KEY=...

These are client-side keys and end up in the public bundle. Restrict them to the site's domain
in the Kakao Developers console and the EmailJS dashboard.

### 4. Run the development server

    npm run dev

The app will be available at:

    http://localhost:5173

---

## 📜 Scripts

| Script            | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run dev`     | Start the Vite dev server                                                |
| `npm run build`   | Build to `dist/`, then run `scripts/generate-static-meta.mjs`            |
| `npm run lint`    | Run ESLint                                                               |
| `npm run preview` | Preview the production build locally                                     |

---

## 📁 Project Structure

    kimnco/
    ├─ public/                  # Static assets, _headers, _redirects, robots.txt
    ├─ scripts/
    │  └─ generate-static-meta.mjs   # Post-build per-route HTML shells + sitemap
    ├─ src/
    │  ├─ components/           # Pages (HomePage, Portfolio, Contact, Legal) and sections
    │  ├─ data/                 # Portfolio properties and featured projects
    │  ├─ locales/              # ko.json / en.json (UI copy and SEO meta)
    │  ├─ App.jsx               # Routes and the /:lang layout
    │  ├─ i18n.js
    │  └─ main.jsx
    ├─ index.html               # Contains the <!-- SEO:START/END --> block the build script fills
    └─ wrangler.jsonc           # Cloudflare Workers static assets config

---

## 🛠 Tech Stack

- React 19, React Router 7
- Vite
- Tailwind CSS
- i18next
- ESLint

---

## 🚀 Deployment

Deployed on **Cloudflare Workers (static assets)** through the Cloudflare dashboard's Git integration.
Pushing to `main` builds with `npm run build` and serves `dist/` using the settings in `wrangler.jsonc`:

- `html_handling: drop-trailing-slash` serves pages at `/ko/portfolio` (matching canonical URLs and the sitemap)
- `not_found_handling: single-page-application` falls back to `index.html` for client-side routes

---

## 📄 License

MIT License
