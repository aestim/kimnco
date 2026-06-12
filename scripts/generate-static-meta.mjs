#!/usr/bin/env node
/**
 * Post-build: generate static HTML shells with correct per-route meta tags.
 *
 * Why: KakaoTalk, Naver and most link-preview scrapers do NOT execute
 * JavaScript, so meta tags rendered by React are invisible to them.
 * This script copies dist/index.html once per route and swaps the
 * <!-- SEO:START --> ... <!-- SEO:END --> block, so Vercel serves a
 * shell with the right title/description/OG tags before the SPA hydrates.
 *
 * Also emits dist/sitemap.xml.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SITE_URL = "https://kimnco.co.kr";
const OG_IMAGE = `${SITE_URL}/img/og-image.jpg`;
const LANGS = ["ko", "en"];
const PAGES = ["home", "portfolio", "contact", "legal"];

const locales = Object.fromEntries(
  LANGS.map((l) => [
    l,
    JSON.parse(readFileSync(join(ROOT, "src", "locales", `${l}.json`), "utf8")).seo,
  ])
);

const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

function seoBlock(lang, page) {
  const { title, description } = locales[lang][page];
  const path = page === "home" ? "" : `/${page}`;
  const url = `${SITE_URL}/${lang}${path}`;
  const alternates = LANGS.map(
    (l) =>
      `    <link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${path}" />`
  ).join("\n");
  return `<title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="${url}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/ko${path}" />
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Kim&amp;Co">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${OG_IMAGE}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="${lang === "ko" ? "ko_KR" : "en_US"}">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${JSON.stringify(ORG_JSONLD)}</script>`;
}

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kim&Co",
  alternateName: "주식회사 킴앤코",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  foundingDate: "1992",
  telephone: "+82-31-714-5567",
  email: "master@kimnco.co.kr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "46 Daehak-ro, Yeongtong-gu",
    addressLocality: "Suwon-si",
    addressRegion: "Gyeonggi-do",
    addressCountry: "KR",
  },
};

const template = readFileSync(join(DIST, "index.html"), "utf8");
const SEO_RE = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/;
if (!SEO_RE.test(template)) {
  console.error("SEO markers not found in dist/index.html — aborting.");
  process.exit(1);
}

let count = 0;
for (const lang of LANGS) {
  for (const page of PAGES) {
    const html = template.replace(
      SEO_RE,
      `<!-- SEO:START -->\n    ${seoBlock(lang, page)}\n    <!-- SEO:END -->`
    ).replace('<html lang="en">', `<html lang="${lang}">`);
    const outDir =
      page === "home" ? join(DIST, lang) : join(DIST, lang, page);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html);
    count++;
  }
}

// sitemap.xml
const urls = LANGS.flatMap((lang) =>
  PAGES.map((page) => {
    const path = page === "home" ? "" : `/${page}`;
    return `  <url><loc>${SITE_URL}/${lang}${path}</loc></url>`;
  })
).join("\n");
writeFileSync(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

console.log(`Generated ${count} static HTML shells + sitemap.xml`);
