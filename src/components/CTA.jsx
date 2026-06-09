import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const CTA = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || "ko";

  return (
    <section className="relative w-full overflow-hidden section-padding bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-midnight-950 to-black" />
      <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-bronze-500/5 blur-[120px]" />

      <div className="section-container relative z-10 text-center">
        <ScrollReveal>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-white md:text-5xl text-balance break-keep">
            {t("cta.title")}
          </h2>

          <Link
            to={`/${currentLang}/contact`}
            className="inline-flex items-center justify-center rounded-full bg-bronze-500 px-10 py-4 text-sm font-bold uppercase tracking-widest text-midnight-950 transition-all duration-300 hover:bg-bronze-400 hover:scale-105"
          >
            {t("cta.button")}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
