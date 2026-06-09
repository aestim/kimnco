import { useEffect } from "react";
import Hero from "./Hero";
import CompanyIntro from "./CompanyIntro";
import PortfolioPreview from "./PortfolioPreview";
import BusinessAreas from "./BusinessAreas";
import Partners from "./Partners";
import Timeline from "./Timeline";
import CTA from "./CTA";

const HomePage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 150);
    }
  }, []);

  return (
    <>
      <Hero />
      <CompanyIntro />
      <PortfolioPreview />
      <BusinessAreas />
      <Partners />
      <Timeline />
      <CTA />
    </>
  );
};

export default HomePage;
