import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

const CompanyIntro = () => {
  const { t } = useTranslation();
  const achievements = t("chairman.achievements", { returnObjects: true });
  const values = t("intro.values", { returnObjects: true });

  return (
    <section id="intro" className="section-padding bg-midnight-950">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t("intro.eyebrow")}
            title={t("intro.title")}
            description={t("intro.description")}
          />
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-6">
          <ScrollReveal className="text-center lg:col-span-5 lg:text-left">
            <p className="text-2xl font-bold text-white md:text-3xl">
              {t("chairman.name")}
            </p>
            <p className="mt-1 text-bronze-400">{t("chairman.role")}</p>
          </ScrollReveal>
          <div className="hidden lg:col-span-7 lg:block" aria-hidden="true" />

          <ScrollReveal className="mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0 lg:max-w-none">
            <div className="relative h-full">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-bronze-500/20 to-transparent blur-sm" />
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
                <img
                  src="/img/chairman.webp"
                  alt={t("chairman.name")}
                  className="aspect-[3/4] w-full -scale-x-100 object-cover object-top lg:aspect-auto lg:h-full lg:min-h-[480px]"
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-col justify-center gap-6 lg:col-span-7 lg:min-h-0 lg:self-stretch">
            <ScrollReveal delay={100}>
              <p className="break-keep text-lg leading-relaxed text-silver-300">
                {t("chairman.message")}
              </p>
            </ScrollReveal>

            <div className="space-y-3">
              {Array.isArray(achievements) &&
                achievements.map((achievement, index) => (
                  <ScrollReveal key={index} delay={150 + index * 60}>
                    <div className="card-surface flex items-start gap-4 p-5">
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-bronze-500/15 text-sm text-bronze-400">
                        ✦
                      </span>
                      <p className="break-keep leading-relaxed text-silver-100">
                        {achievement}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
            </div>
          </div>
        </div>

        {Array.isArray(values) && (
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 80}>
                <div className="card-surface h-full p-6 text-center md:p-8">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {value.title}
                  </h3>
                  <p className="break-keep text-sm leading-relaxed text-silver-400">
                    {value.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyIntro;
