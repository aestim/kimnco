const SectionHeader = ({ eyebrow, title, description, align = "center" }) => {
  const isCenter = align === "center";

  return (
    <div className={`mb-14 md:mb-16 ${isCenter ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p className="text-bronze-500 font-bold uppercase tracking-[0.2em] mb-4 text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-zentry font-bold text-silver-100 mb-5 leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`text-silver-400 text-lg leading-relaxed break-keep ${
            isCenter ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
      <div
        className={`w-16 h-1 bg-bronze-500 rounded-full mt-6 ${
          isCenter ? "mx-auto" : ""
        }`}
      />
    </div>
  );
};

export default SectionHeader;
