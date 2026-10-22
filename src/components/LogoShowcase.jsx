const logoIconsList = [
  {
    imgPath: "/img/logos/logo1.webp",
    name: "ICONIX"
  },
  {
    imgPath: "/img/logos/logo2.svg",
    name: "We've"
  },
  {
    imgPath: "/img/logos/logo3.svg",
    name: "Xi"
  },
  {
    imgPath: "/img/logos/logo4.svg",
    name: "Blooming"
  },
];

// The marquee repeats the list to loop seamlessly; only the first copy is
// exposed to screen readers.
const MARQUEE_COPIES = 8;

const LogoIcon = ({ icon, isCopy }) => {
  return (
    <div
      className="marquee-item flex flex-none items-center justify-center"
      aria-hidden={isCopy || undefined}
    >
      <img
        src={icon.imgPath}
        alt={isCopy ? "" : icon.name}
        className="max-h-10 w-auto"
      />
    </div>
  );
};

const LogoShowcase = ({ t }) => (
  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-silver-500">
        {t}
      </p>
    </div>

    {/* Viewport for the marquee: clips the scrolling content, anchors the edge gradients. */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

      <div className="marquee h-24">
        {/* Gap between logos is set on .marquee-box in index.css */}
        <div className="marquee-box">
          {Array.from({ length: MARQUEE_COPIES }, (_, copy) =>
            logoIconsList.map((icon, index) => (
              <LogoIcon key={`${copy}-${index}`} icon={icon} isCopy={copy > 0} />
            ))
          )}
        </div>
      </div>
    </div>
  </div>
);

export default LogoShowcase;
