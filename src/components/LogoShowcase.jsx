const logoIconsList = [
  {
    imgPath: "/img/logos/logo1.webp",
    name: "Logo 1"
  },
  {
    imgPath: "/img/logos/logo2.svg",
    name: "Logo 2"
  },
  {
    imgPath: "/img/logos/logo3.svg",
    name: "Logo 3"
  },
  {
    imgPath: "/img/logos/logo4.svg",
    name: "Logo 4"
  },
];

const LogoIcon = ({ icon }) => {
  return (
    // Apply marquee-item here if you need specific styling on each item
    <div className="marquee-item flex flex-none items-center justify-center">
      <img
        src={icon.imgPath}
        alt={`${icon.name} logo`}
        className="max-h-10 w-auto"
      />
    </div>
  );
};

const LogoShowcase = ({ t }) => (
  // This outermost div defines the 'bento' width for the entire section.
  // Make sure 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' matches your overall bento/container styling.
  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-silver-500">
        {t}
      </p>
    </div>

    {/* This div acts as the viewport for the marquee. */}
    {/* It needs overflow-hidden to clip the scrolling content and relative for absolute gradients. */}
    <div className="relative overflow-hidden">
      {/* Gradients are absolute to this overflow-hidden container */}
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

      {/* The marquee itself */}
      <div className="marquee h-24"> {/* Height defined here, or in CSS */}
        {/* The marquee-box contains all the logos for scrolling */}
        {/* Removed md:gap-12 gap-10 from here, as 'gap' is now handled by CSS on marquee-box */}
        <div className="marquee-box">
          {/* Duplicate content enough times to ensure seamless looping */}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`1-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`2-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`3-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`4-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`5-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`6-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`7-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`8-${index}`} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default LogoShowcase;