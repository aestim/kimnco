import { useTranslation } from "react-i18next";
import LogoShowcase from "./LogoShowcase";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

const Partners = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-black pb-32">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t("partners.eyebrow")}
            title={t("partners.title")}
            align="center"
          />
        </ScrollReveal>
      </div>
      <LogoShowcase t={t("partners.subtitle")} />
    </section>
  );
};

export default Partners;
