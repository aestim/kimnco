import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

const Hero = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || "ko";
  const stats = t("hero.stats", { returnObjects: true });
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="relative min-h-dvh w-full overflow-hidden">
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        poster="/img/hero-poster.webp"
        loop
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-midnight-950" />

      <div className="relative z-10 flex min-h-dvh flex-col justify-center px-4 pb-32 pt-24 sm:px-8 lg:px-16">
        <div className="max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-bronze-400">
            {t("hero.eyebrow")}
          </p>
          <h1 className="font-zentry text-5xl font-bold leading-[0.95] text-white sm:text-7xl md:text-8xl">
            Kim &amp; Co
          </h1>
          <p
            className="mt-6 max-w-xl break-keep text-xl font-medium leading-relaxed text-silver-200 md:text-2xl"
            dangerouslySetInnerHTML={{ __html: t("hero.tagline") }}
          />
          <p className="mt-4 max-w-2xl break-keep text-base leading-relaxed text-silver-400 md:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to={`/${currentLang}/contact?intent=partnership`}
              className="inline-flex items-center justify-center rounded-full bg-bronze-500 px-10 py-4 text-sm font-bold uppercase tracking-wider text-midnight-950 transition-colors hover:bg-bronze-400"
            >
              {t("hero.ctaPartnership")}
            </Link>
            <Link
              to={`/${currentLang}/contact?intent=ir`}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-10 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white/60 hover:bg-white/10"
            >
              {t("hero.ctaIR")}
            </Link>
          </div>
        </div>

        {Array.isArray(stats) && (
          <div className="mt-16 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-bronze-400 md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 break-keep text-sm font-medium text-silver-200">
                  {stat.label}
                </p>
                {stat.sub && (
                  <p className="mt-0.5 break-keep text-xs text-silver-500">
                    {stat.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
