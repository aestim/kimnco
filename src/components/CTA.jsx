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
          <h2
            className="mb-6 text-3xl font-bold leading-tight text-white md:text-5xl text-balance break-keep"
            dangerouslySetInnerHTML={{ __html: t("cta.title") }}
          />
          <p
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-silver-300 md:text-xl text-balance break-keep"
            dangerouslySetInnerHTML={{ __html: t("cta.text") }}
          />

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={`/${currentLang}/contact?intent=investment`}
              className="inline-flex items-center justify-center rounded-full bg-bronze-500 px-10 py-4 text-sm font-bold uppercase tracking-widest text-midnight-950 transition-all duration-300 hover:bg-bronze-400 hover:scale-105"
            >
              {t("cta.buttonInvestment")}
            </Link>
            <Link
              to={`/${currentLang}/contact?intent=ir`}
              className="inline-flex items-center justify-center rounded-full border border-bronze-500/40 bg-white/5 px-10 py-4 text-sm font-bold uppercase tracking-widest text-bronze-400 backdrop-blur-sm transition-all duration-300 hover:bg-bronze-500/10 hover:scale-105"
            >
              {t("cta.buttonIR")}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
