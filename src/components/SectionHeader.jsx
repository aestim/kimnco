const SectionHeader = ({ eyebrow, title, description, align = "center" }) => {
  const isCenter = align === "center";

  return (
    <div className={`mb-14 md:mb-16 ${isCenter ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-bronze-500">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-5 font-zentry text-3xl font-bold leading-tight text-silver-100 md:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={`break-keep text-lg leading-relaxed text-silver-400 ${
            isCenter ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
      <div
        className={`mt-6 h-1 w-16 rounded-full bg-bronze-500 ${
          isCenter ? "mx-auto" : ""
        }`}
      />
    </div>
  );
};

export default SectionHeader;
