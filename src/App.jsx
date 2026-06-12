import { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';

import NavBar from "./components/Navbar";
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';
import Seo from './components/Seo';
import NotFound from './components/NotFound';

// Lazy load page components
const HomePage = lazy(() => import('./components/HomePage')); // You'll need to create this file or move the HomePage component
const Portfolio = lazy(() => import('./components/Portfolio'));
const Contact = lazy(() => import('./components/Contact'));
const Legal = lazy(() => import('./components/Legal'));

// A list of your supported languages
const supportedLanguages = ['ko', 'en'];

// --- 1. Root Redirect Component ---
// Redirects from the root '/' to the default language 'ko'.
function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // This effect runs once on mount, navigating to the default language.
    navigate('/ko', { replace: true });
  }, [navigate]);

  return null; // This component renders nothing.
}


// --- 2. Language Layout Component (The Core Logic) ---
// This component acts as a gatekeeper for all language-specific routes.
function LanguageLayout() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // If the language in the URL is not supported, redirect to the default.
    if (!supportedLanguages.includes(lang)) {
      navigate('/ko', { replace: true });
      return; // Stop further execution in this effect.
    }

    // Keep <html lang> in sync for accessibility and SEO.
    document.documentElement.lang = lang;

    // If the URL language is different from the active language, change it.
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, navigate]);

  // We can render a loading spinner here while the language is changing
  // to prevent showing content in the wrong language.
  if (i18n.language !== lang) {
    return <Loading />;
  }

  // Derive the current page from the path for per-page SEO tags.
  const segment = pathname.split('/')[2] || '';
  const seoPage = ['portfolio', 'contact', 'legal'].includes(segment) ? segment : 'home';

  // If the language is set correctly, render the main layout and the child route.
  return (
    <>
      <Seo page={seoPage} lang={lang} />
      <ScrollToTop />
      <NavBar lang={lang} />
      {/* Outlet renders the matched child route (e.g., HomePage or PortfolioPage) */}
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer lang={lang} />
    </>
  );
}

// --- 3. Page Components ---
// These are now simple and focused only on their content.

// Note: HomePage definition removed from here as it should be in its own file for lazy loading to work effectively. 
// I will ensure src/components/HomePage.jsx exists.

// --- 4. Main App Component (Simplified Routing Structure) ---
function App() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <Routes>
        {/* Route 1: If user lands on the absolute root, redirect them. */}
        <Route path="/" element={<RootRedirect />} />
        {/* Route 2: The language-aware layout route. */}
        {/* All nested routes will have the /:lang/ prefix */}
        <Route path="/:lang" element={<LanguageLayout />}>
          {/* Child routes rendered by the Outlet in LanguageLayout */}
          <Route index element={<HomePage />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<Contact />} />
          {/* Add more pages here, e.g., <Route path="contact" element={<Contact />} /> */}
          <Route path="legal" element={<Legal />} />
          {/* Unknown paths under a valid language show a 404 page */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Catch-all for paths without a language prefix */}
        <Route path="*" element={<RootRedirect />} />

      </Routes>
    </main>
  );
}

export default App;