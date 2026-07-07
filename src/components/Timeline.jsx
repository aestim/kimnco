import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

const Timeline = () => {
  const { t } = useTranslation();
  const highlights = t("timeline.highlights", { returnObjects: true });

  return (
    <section id="history" className="section-padding bg-midnight-950 font-manrope text-silver-100">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t("timeline.subtitle")}
            title={t("timeline.mainTitle")}
            description={t("timeline.briefDescription")}
          />
        </ScrollReveal>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute inset-y-2 left-[7px] w-px bg-bronze-500/30 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
            {Array.isArray(highlights) &&
              highlights.map((item, index) => (
                <ScrollReveal key={index} delay={index * 60}>
                  <div
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="hidden md:block md:w-1/2" />

                    <div className="absolute left-0 z-10 size-4 rounded-full border-2 border-bronze-500 bg-midnight-950 md:left-1/2 md:-translate-x-2" />

                    <div
                      className={`ml-8 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? "md:pl-10" : "md:pr-10 md:text-right"
                      }`}
                    >
                      <span className="text-2xl font-bold text-bronze-400">
                        {item.year}
                      </span>
                      <h3 className="mt-1 break-keep text-lg font-bold text-white">
                        {item.title}
                      </h3>
                      {item.detail && (
                        <p className="mt-1 break-keep text-sm text-silver-400">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
