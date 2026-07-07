import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

const areas = [
  {
    key: "living",
    poster: "/img/portfolio/living-1.webp",
    propertyType: "living",
    reverse: false,
  },
  {
    key: "commercial",
    poster: "/img/portfolio/commercial-3.webp",
    propertyType: "commercial",
    reverse: true,
  },
  {
    key: "consulting",
    poster: "/img/poster2.webp",
    propertyType: null,
    reverse: false,
  },
];

const BusinessAreas = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || "ko";

  return (
    <section id="business" className="section-padding bg-black">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t("business.eyebrow")}
            title={t("business.title")}
            description={t("business.description")}
          />
        </ScrollReveal>

        <div className="space-y-20 md:space-y-28">
          {areas.map((area, index) => {
            const link = area.propertyType
              ? `/${currentLang}/portfolio?type=${area.propertyType}`
              : `/${currentLang}/portfolio`;

            return (
              <ScrollReveal key={area.key} delay={index * 80}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    area.reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/10">
                    <img
                      src={area.poster}
                      alt={t(`business.areas.${area.key}.title`)}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-bronze-500">
                      {t(`business.areas.${area.key}.label`)}
                    </p>
                    <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                      {t(`business.areas.${area.key}.title`)}
                    </h3>
                    <p className="mb-8 break-keep text-lg leading-relaxed text-silver-400">
                      {t(`business.areas.${area.key}.text`)}
                    </p>
                    <Link
                      to={link}
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-bronze-400 transition-colors hover:text-bronze-300"
                    >
                      {t("business.cta")}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessAreas;
