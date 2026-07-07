import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { properties } from "../data/properties";
import { featuredProjects } from "../data/featuredProjects";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

const typeLabels = {
  living: "portfolio.living",
  commercial: "portfolio.commercial",
  resorts: "portfolio.resorts",
};

const PortfolioPreview = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || "ko";

  const featured = featuredProjects
    .map((fp) => {
      const property = properties.find((p) => p.id === fp.id);
      return property ? { ...fp, ...property } : null;
    })
    .filter(Boolean);

  return (
    <section id="projects" className="section-padding bg-black">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t("portfolioPreview.eyebrow")}
            title={t("portfolioPreview.title")}
            description={t("portfolioPreview.description")}
          />
        </ScrollReveal>

        <div className="space-y-6">
          {featured.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 80}>
              <article className="card-surface group overflow-hidden">
                <div className="grid md:grid-cols-12">
                  <div className="relative md:col-span-4 lg:col-span-3">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="aspect-[4/3] size-full object-cover transition-transform duration-500 group-hover:scale-105 md:aspect-auto md:min-h-[200px]"
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-bronze-300 backdrop-blur-sm">
                      {t(typeLabels[project.type])}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center p-6 md:col-span-8 md:p-8 lg:col-span-9">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <h3 className="break-keep text-xl font-bold text-white md:text-2xl">
                        {project.title}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          project.status === "inProgress"
                            ? "bg-blue-500/15 text-blue-300"
                            : "bg-bronze-500/15 text-bronze-400"
                        }`}
                      >
                        {t(
                          project.status === "inProgress"
                            ? "portfolioPreview.statusInProgress"
                            : "portfolioPreview.statusCompleted"
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-silver-500">
                          {t("portfolioPreview.completionYear")}
                        </p>
                        <p className="mt-1 text-lg font-bold text-white md:text-xl">
                          {project.completionYear}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-silver-500">
                          {t("portfolioPreview.scale")}
                        </p>
                        <p className="mt-1 text-lg font-bold text-white md:text-xl">
                          {project.scale}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-silver-500">
                          {t(`portfolioPreview.metrics.${project.returnLabelKey}`)}
                        </p>
                        <p className="mt-1 text-lg font-bold text-yellow-400 md:text-xl">
                          {project.returnRate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <Link
            to={`/${currentLang}/portfolio`}
            className="inline-flex items-center justify-center rounded-full border border-bronze-500/40 px-10 py-3.5 text-sm font-bold uppercase tracking-wider text-bronze-400 transition-colors hover:bg-bronze-500/10"
          >
            {t("portfolioPreview.cta")}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PortfolioPreview;
