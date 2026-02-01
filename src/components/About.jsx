import AnimatedTitle from "./AnimatedTitle";
import { useTranslation } from "react-i18next";
import Timeline from "./Timeline.jsx";

const About = () => {
  const { t } = useTranslation();

  return (
    <div id="about" className="w-full bg-black">
      {/* Hero Image Section */}
      <div className="relative h-[80vh] w-screen overflow-hidden">
        <img
          src="/img/about.png"
          alt="About Background"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay for better text readability and smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="mb-2">
            <p className="font-manrope text-sm md:text-lg uppercase tracking-[0.5em] text-blue-100 mb-2">
              {t("about.welcome")}
            </p>
            <h1 className="font-zentry text-[15vh] leading-[0.8] text-white mix-blend-overlay opacity-90">
              {t("about.discover")}
            </h1>
          </div>

          <div className="about-subtext font-manrope font-medium text-gray-200 mt-8 max-w-2xl text-lg md:text-xl leading-relaxed">
            {t("about.subtext")}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <Timeline />
    </div>
  );
};

export default About;
