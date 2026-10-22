import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import "./i18n"

// The static SEO block in index.html (filled per route by
// scripts/generate-static-meta.mjs) is for crawlers that don't run JS.
// <Seo /> renders the live tags, so drop the static ones to avoid duplicates
// and stale tags after client-side navigation. JSON-LD stays: <Seo /> doesn't render it.
function removeStaticSeoTags() {
  let inBlock = false;
  for (const node of [...document.head.childNodes]) {
    if (node.nodeType === Node.COMMENT_NODE) {
      if (node.data.trim() === 'SEO:START') inBlock = true;
      if (node.data.trim() === 'SEO:END') return;
    } else if (inBlock && node.nodeName !== 'SCRIPT') {
      node.remove();
    }
  }
}
removeStaticSeoTags();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)