import { useTranslation } from "react-i18next";

const SITE_URL = "https://kimnco.co.kr";
const OG_IMAGE = `${SITE_URL}/img/og-image.jpg`;
const LANGS = ["ko", "en"];

/**
 * Per-page SEO tags. Rendered with React 19's native head hoisting —
 * <title>/<meta>/<link> below are moved into <head> automatically.
 * (Static crawlers like KakaoTalk/Naver are covered separately by
 * scripts/generate-static-meta.mjs at build time.)
 */
const Seo = ({ page = "home", lang = "ko" }) => {
  const { t } = useTranslation();

  const title = t(`seo.${page}.title`);
  const description = t(`seo.${page}.description`);
  const path = page === "home" ? "" : `/${page}`;
  const url = `${SITE_URL}/${lang}${path}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {LANGS.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${SITE_URL}/${l}${path}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/ko${path}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kim&Co" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content={lang === "ko" ? "ko_KR" : "en_US"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </>
  );
};

export default Seo;
