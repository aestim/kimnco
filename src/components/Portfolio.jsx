import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { MdClose } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

import { properties, markerSources } from "../data/properties";

/* ───────────────────────── InfoWindow ───────────────────────── */
const InfoWindow = ({ property, onClose }) => {
  if (!property) return null;

  const statusLabel = property.status === "inProgress" ? "진행 중" : "완료";

  return (
    <div className="absolute top-4 left-4 w-[calc(100%-2rem)] max-w-xs lg:w-72 z-20 animate-fade-in">
      <div className="relative bg-[#1c1c1e] text-white rounded-2xl shadow-2xl border border-white/10 p-5">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <MdClose size={18} />
        </button>

        <p className="text-xs text-gray-500 mb-1.5">
          {statusLabel} · {property.typeLabel}
        </p>
        <h3 className="font-bold text-base text-white leading-snug break-keep mb-1">
          {property.title}
        </h3>
        <p className="text-xs text-gray-500 mb-4">{property.location}</p>

        <div className="border-t border-white/10 pt-3 grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">규모</p>
            <p className="font-semibold text-yellow-400">{property.scale}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">층수</p>
            <p className="font-semibold text-white">{property.floors}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">
              {property.status === "inProgress" ? "용도" : "준공"}
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
          className="mt-4 inline-flex items-center justify-center w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg text-xs transition-colors"
        >
          카카오맵에서 보기
          <FiExternalLink className="ml-1.5 shrink-0" size={12} />
        </a>
      </div>
    </div>
  );
};

/* ───────────────────────── ProjectCard ───────────────────────── */
const ProjectCard = ({ property, isSelected, onClick }) => {
  const isInProgress = property.hasImage === false;

  const wrapperClass = clsx(
    "group w-full text-left transition-all duration-200 focus:outline-none",
    isInProgress
      ? clsx(
          "rounded-2xl p-5 border bg-[#1c1c1e] hover:bg-[#242428]",
          isSelected ? "border-bronze-400 shadow-lg shadow-bronze-500/10" : "border-white/8 hover:border-white/20"
        )
      : clsx(
          "rounded-xl overflow-hidden border bg-gray-900",
          isSelected ? "border-bronze-400 shadow-lg shadow-bronze-500/10" : "border-gray-700/50 hover:border-gray-600"
        )
  );

  if (isInProgress) {
    return (
      <button onClick={() => onClick(property)} className={wrapperClass}>
        <p className="text-xs text-gray-500 mb-2">진행 중 · {property.typeLabel}</p>
        <h3 className="text-base font-bold text-white leading-snug break-keep mb-1 line-clamp-2 min-h-[3rem]">
          {property.title}
        </h3>
        <p className="text-xs text-gray-500 mb-4">{property.location}</p>
        <div className="border-t border-white/10 pt-3 grid grid-cols-2 gap-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">규모</p>
            <p className="text-sm font-semibold text-yellow-400">{property.scale}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">층수</p>
            <p className="text-sm font-semibold text-white">{property.floors}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">용도</p>
            <p className="text-sm font-semibold text-white">{property.usage}</p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button onClick={() => onClick(property)} className={wrapperClass}>
      <div className="relative overflow-hidden bg-gray-800 aspect-[4/3]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <span className={clsx(
          "absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white",
          property.type === "living" ? "bg-red-600/80" : "bg-amber-600/80"
        )}>
          {property.typeLabel}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white leading-snug break-keep mb-3 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex justify-between gap-2 text-sm">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">준공</p>
            <p className="font-semibold text-white">{property.completionYear}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-0.5">규모</p>
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

  const initialType = searchParams.get("type");
  const [filters, setFilters] = useState(() =>
    initialType ? [initialType] : ["living", "commercial"]
  );
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [map, setMap] = useState(null);
  const [overviewBounds, setOverviewBounds] = useState(null);

  // Stats
  const completedCount  = properties.filter((p) => p.status === "completed").length;
  const inProgressCount = properties.filter((p) => p.status === "inProgress").length;
  const livingCount     = properties.filter((p) => p.type === "living").length;
  const commercialCount = properties.filter((p) => p.type === "commercial").length;

  const toggleFilter = (type) => {
    setSelectedProperty(null);
    if (type === "all") {
      setFilters(filters.length === 2 ? [] : ["living", "commercial"]);
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
      if (window.innerWidth < 1024) map.panBy(0, -150);
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

  const filteredMarkers = properties.filter((p) => filters.includes(p.type));

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
    { id: "all",        label: t("portfolio.all", "All"),             activeClass: "bg-gradient-to-r from-purple-600 to-blue-600" },
    { id: "living",     label: t("portfolio.living", "주택"),         activeClass: "bg-red-600" },
    { id: "commercial", label: t("portfolio.commercial", "상업시설"), activeClass: "bg-amber-600" },
  ];

  return (
    <section
      id="portfolio"
      className="flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 bg-black text-gray-200 min-h-screen pt-24"
    >
      <div className="container w-full max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold special-font text-gray-100">
            {t("portfolio.title", "포트폴리오")}
          </h1>
        </div>

        {/* ── Stats row ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {[
            { dot: "bg-bronze-400", label: "완료", value: `${completedCount}건` },
            { dot: "bg-green-400",  label: "진행중", value: `${inProgressCount}건` },
            { dot: "bg-red-400",    label: "주택",  value: `${livingCount}개` },
            { dot: "bg-amber-400",  label: "상업",  value: `${commercialCount}개` },
          ].map(({ dot, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm"
            >
              <span className={clsx("w-2 h-2 rounded-full shrink-0", dot)} />
              <span className="text-gray-400">{label}</span>
              <span className="text-white font-bold">{value}</span>
            </div>
          ))}
        </div>

        {/* ── Filter buttons ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {filterButtons.map((btn) => {
            const isActive =
              (btn.id === "all" && filters.length === 2) ||
              filters.includes(btn.id);
            return (
              <button
                key={btn.id}
                onClick={() => toggleFilter(btn.id)}
                className={clsx(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105",
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
          className="relative rounded-xl overflow-hidden border border-gray-700 shadow-2xl mb-10"
        >
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
                      : markerSources[property.type],
                  size: { width: 42, height: 52 },
                }}
                title={property.title}
              />
            ))}
          </Map>

          {/* 마커 범례 */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2.5 text-xs text-gray-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />주택
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />상업시설
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />진행중
            </div>
          </div>

          <InfoWindow property={selectedProperty} onClose={handleCloseOverlay} />
        </div>

        {/* ── Card grid ── */}
        {filteredMarkers.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMarkers.map((property) => (
              <ProjectCard
                key={property.id}
                property={property}
                isSelected={selectedProperty?.id === property.id}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
