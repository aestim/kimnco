import { useState, useEffect, useRef } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { MdClose } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

import { properties, markerSources } from "../data/properties";

/* ───────────────────────── InfoWindow ───────────────────────── */
const InfoWindow = ({ property, onClose }) => {
  const { t } = useTranslation();
  if (!property) return null;

  const statusLabel = t(
    property.status === "inProgress"
      ? "portfolio.statusInProgress"
      : "portfolio.statusCompleted"
  );

  return (
    <div className="absolute bottom-4 left-4 z-20 w-[calc(100%-2rem)] max-w-xs animate-fade-in lg:bottom-auto lg:top-4 lg:w-72">
      <div className="relative rounded-2xl border border-white/10 bg-[#1c1c1e] p-5 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 transition-colors hover:text-white"
          aria-label="Close"
        >
          <MdClose size={18} />
        </button>

        <p className="mb-1.5 text-xs text-gray-500">
          {statusLabel} · {t(`portfolio.${property.filterTag || property.type}`)}
        </p>
        <h3 className="mb-1 break-keep text-base font-bold leading-snug text-white">
          {property.title}
        </h3>
        <p className="mb-4 text-xs text-gray-500">{property.location}</p>

        <div className="grid grid-cols-2 gap-y-3 border-t border-white/10 pt-3 text-sm">
          <div>
            <p className="mb-0.5 text-xs text-gray-500">{t("portfolio.scale")}</p>
            <p className="font-semibold text-yellow-400">{property.scale}</p>
          </div>
          <div>
            <p className="mb-0.5 text-xs text-gray-500">{t("portfolio.floors")}</p>
            <p className="font-semibold text-white">{property.floors}</p>
          </div>
          <div>
            <p className="mb-0.5 text-xs text-gray-500">
              {t(property.status === "inProgress" ? "portfolio.usage" : "portfolio.completion")}
            </p>
            <p className="font-semibold text-white">
              {property.status === "inProgress" ? property.usage : property.completionYear}
            </p>
          </div>
        </div>

        <a
          href={property.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
        >
          {t("portfolio.viewOnKakaoMap")}
          <FiExternalLink className="ml-1.5 shrink-0" size={12} />
        </a>
      </div>
    </div>
  );
};

/* ───────────────────────── ProjectCard ───────────────────────── */
const ProjectCard = ({ property, isSelected, onClick }) => {
  const { t } = useTranslation();
  const isInProgress = property.hasImage === false;

  const wrapperClass = clsx(
    "group flex size-full flex-col text-left transition-all duration-200 focus:outline-none",
    isInProgress
      ? clsx(
          "rounded-2xl border bg-[#1c1c1e] p-5 hover:bg-[#242428]",
          isSelected ? "border-bronze-400 shadow-lg shadow-bronze-500/10" : "border-white/8 hover:border-white/20"
        )
      : clsx(
          "overflow-hidden rounded-xl border bg-gray-900",
          isSelected ? "border-bronze-400 shadow-lg shadow-bronze-500/10" : "border-gray-700/50 hover:border-gray-600"
        )
  );

  if (isInProgress) {
    return (
      <button onClick={() => onClick(property)} className={wrapperClass}>
        <div className="mb-3">
          <span className="rounded-full bg-green-600/80 px-2.5 py-1 text-xs font-semibold text-white">{t("portfolio.statusInProgress")}</span>
        </div>
        <h3 className="mb-1 line-clamp-2 break-keep text-base font-bold leading-snug text-white">
          {property.title}
        </h3>
        <p className="mb-4 text-xs text-gray-500">{property.location}</p>
        <div className="mt-auto grid grid-cols-2 gap-y-3 border-t border-white/10 pt-3">
          <div>
            <p className="mb-0.5 text-xs text-gray-500">{t("portfolio.scale")}</p>
            <p className="text-sm font-semibold text-yellow-400">{property.scale}</p>
          </div>
          <div>
            <p className="mb-0.5 text-xs text-gray-500">{t("portfolio.floors")}</p>
            <p className="text-sm font-semibold text-white">{property.floors}</p>
          </div>
          <div>
            <p className="mb-0.5 text-xs text-gray-500">{t("portfolio.usage")}</p>
            <p className="text-sm font-semibold text-white">{property.usage}</p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button onClick={() => onClick(property)} className={wrapperClass}>
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-gray-800">
        <img
          src={property.image}
          alt={property.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <span className={clsx(
          "absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white",
          (property.filterTag || property.type) === "officetel" ? "bg-blue-600/80"
            : property.type === "living" ? "bg-red-600/80"
            : "bg-amber-500/80"
        )}>
          {t(`portfolio.${property.filterTag || property.type}`)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-3 line-clamp-2 flex-1 break-keep font-bold leading-snug text-white">
          {property.title}
        </h3>
        <div className="flex justify-between gap-2 text-sm">
          <div>
            <p className="mb-0.5 text-xs text-gray-500">{t("portfolio.completion")}</p>
            <p className="font-semibold text-white">{property.completionYear}</p>
          </div>
          <div className="text-right">
            <p className="mb-0.5 text-xs text-gray-500">{t("portfolio.scale")}</p>
            <p className="font-semibold text-yellow-400">{property.scale}</p>
          </div>
        </div>
      </div>
    </button>
  );
};

/* ───────────────────────── Portfolio Page ───────────────────────── */
const Portfolio = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const mapContainerRef = useRef(null);

  // Load the Kakao Maps SDK on demand (only this page needs it).
  const [kakaoLoading, kakaoError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ["services"],
  });

  const ALL_TYPES = ["living", "commercial", "officetel"];
  const initialType = searchParams.get("type");
  const [filters, setFilters] = useState(() =>
    initialType ? [initialType] : [...ALL_TYPES]
  );
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [map, setMap] = useState(null);
  const [overviewBounds, setOverviewBounds] = useState(null);

  // Stats
  const completedCount   = properties.filter((p) => p.status === "completed").length;
  const inProgressCount  = properties.filter((p) => p.status === "inProgress").length;
  const livingCount      = properties.filter((p) => (p.filterTag || p.type) === "living").length;
  const commercialCount  = properties.filter((p) => (p.filterTag || p.type) === "commercial").length;
  const officetelCount   = properties.filter((p) => (p.filterTag || p.type) === "officetel").length;

  const toggleFilter = (type) => {
    setSelectedProperty(null);
    if (type === "all") {
      setFilters(filters.length === ALL_TYPES.length ? [] : [...ALL_TYPES]);
      return;
    }
    setFilters((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    );
  };

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    if (map) {
      const center = new window.kakao.maps.LatLng(property.lat, property.lng);
      map.setLevel(5);
      map.panTo(center);
    }
  };

  const handleCardClick = (property) => {
    setSelectedProperty(property);
    if (map) {
      const center = new window.kakao.maps.LatLng(property.lat, property.lng);
      map.setLevel(5);
      map.panTo(center);
    }
    mapContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleCloseOverlay = () => {
    setSelectedProperty(null);
    if (map && overviewBounds) {
      map.setBounds(overviewBounds, 100, 100, 100, 100);
    }
  };

  const filteredMarkers = properties.filter((p) => filters.includes(p.filterTag || p.type));

  useEffect(() => {
    if (!map) return;
    setSelectedProperty(null);
    if (filteredMarkers.length === 0) return;

    const bounds = new window.kakao.maps.LatLngBounds();
    filteredMarkers.forEach((m) =>
      bounds.extend(new window.kakao.maps.LatLng(m.lat, m.lng))
    );
    map.setBounds(bounds, 100, 100, 100, 100);
    setOverviewBounds(bounds);
  }, [filters, map]);

  const filterButtons = [
    { id: "all",        label: t("portfolio.all", "All"),             activeClass: "bg-zinc-600" },
    { id: "living",     label: t("portfolio.living", "주택"),         activeClass: "bg-red-600" },
    { id: "commercial", label: t("portfolio.commercial", "상업시설"), activeClass: "bg-amber-500" },
    { id: "officetel",  label: t("portfolio.officetel", "오피스텔"),   activeClass: "bg-blue-600" },
  ];

  return (
    <section
      id="portfolio"
      className="flex min-h-screen flex-col items-center bg-black px-4 py-16 pt-24 text-gray-200 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto w-full max-w-7xl">

        {/* ── Header ── */}
        <div className="mb-8 text-center">
          <h1 className="special-font text-4xl font-bold text-gray-100 md:text-5xl">
            {t("portfolio.title", "포트폴리오")}
          </h1>
        </div>

        {/* ── Stats row ── */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {[
            { dot: "bg-bronze-400", label: t("portfolio.statusCompleted"),  value: `${completedCount}${t("portfolio.unitCases")}` },
            { dot: "bg-green-400",  label: t("portfolio.statusInProgress"), value: `${inProgressCount}${t("portfolio.unitCases")}` },
            { dot: "bg-red-400",    label: t("portfolio.living"),           value: `${livingCount}${t("portfolio.unitItems")}` },
            { dot: "bg-amber-400",  label: t("portfolio.commercial"),       value: `${commercialCount}${t("portfolio.unitItems")}` },
            { dot: "bg-blue-400",   label: t("portfolio.officetel"),        value: `${officetelCount}${t("portfolio.unitItems")}` },
          ].map(({ dot, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
            >
              <span className={clsx("size-2 shrink-0 rounded-full", dot)} />
              <span className="text-gray-400">{label}</span>
              <span className="font-bold text-white">{value}</span>
            </div>
          ))}
        </div>

        {/* ── Filter buttons ── */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {filterButtons.map((btn) => {
            const isActive =
              (btn.id === "all" && filters.length === ALL_TYPES.length) ||
              filters.includes(btn.id);
            return (
              <button
                key={btn.id}
                onClick={() => toggleFilter(btn.id)}
                className={clsx(
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105",
                  isActive
                    ? `${btn.activeClass} text-white shadow-lg`
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                )}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* ── Map ── */}
        <div
          ref={mapContainerRef}
          className="relative mb-10 overflow-hidden rounded-xl border border-gray-700 shadow-2xl"
        >
          {kakaoLoading || kakaoError ? (
            <div
              style={{ width: "100%", height: "65vh" }}
              className="flex items-center justify-center bg-gray-900 text-sm text-gray-500"
            >
              {kakaoError ? "Map unavailable" : "Loading map…"}
            </div>
          ) : (
            <Map
              center={{ lat: 37.2, lng: 127.0 }}
              style={{ width: "100%", height: "65vh" }}
              level={12}
              className="bg-gray-900"
              onCreate={setMap}
            >
              {filteredMarkers.map((property) => (
                <MapMarker
                  key={property.id}
                  position={{ lat: property.lat, lng: property.lng }}
                  onClick={() => handleMarkerClick(property)}
                  image={{
                    src:
                      property.status === "inProgress"
                        ? markerSources.inProgress
                        : markerSources[property.filterTag || property.type],
                    size: { width: 42, height: 52 },
                  }}
                  title={property.title}
                />
              ))}
            </Map>
          )}

          {/* 마커 범례 */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5 rounded-lg bg-black/60 px-3 py-2.5 text-xs text-gray-200 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-full bg-red-500" />{t("portfolio.living")}
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-full bg-amber-500" />{t("portfolio.commercial")}
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-full bg-blue-500" />{t("portfolio.officetel")}
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-full bg-green-500" />{t("portfolio.statusInProgress")}
            </div>
          </div>

          <InfoWindow property={selectedProperty} onClose={handleCloseOverlay} />
        </div>

        {/* ── Card grid ── */}
        {filteredMarkers.length > 0 && (() => {
          const completed   = filteredMarkers.filter(p => p.status === "completed");
          const inProgress  = filteredMarkers.filter(p => p.status === "inProgress");
          return (
            <>
              {completed.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {completed.map((property) => (
                    <ProjectCard
                      key={property.id}
                      property={property}
                      isSelected={selectedProperty?.id === property.id}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              )}
              {inProgress.length > 0 && (
                <div className={`mt-3 grid gap-3 ${inProgress.length === 1 ? "max-w-sm grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                  {inProgress.map((property) => (
                    <ProjectCard
                      key={property.id}
                      property={property}
                      isSelected={selectedProperty?.id === property.id}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              )}
            </>
          );
        })()}
      </div>
    </section>
  );
};

export default Portfolio;
