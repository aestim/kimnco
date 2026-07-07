import { useWindowScroll } from "react-use";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import LanguageToggle from "./LanguageToggle";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const NavBar = ({ lang }) => {
  const { t } = useTranslation();
  const navItems = t("nav", { returnObjects: true });
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();

  const isHome =
    location.pathname === `/${lang}` || location.pathname === `/${lang}/`;

  useEffect(() => {
    const atTop = currentScrollY <= 10;
    setIsAtTop(atTop);

    if (isMobileMenuOpen) {
      setIsNavVisible(true);
      return;
    }

    if (atTop) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY, isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getNavHref = (item) => {
    if (item.type === "anchor") {
      return isHome ? `#${item.id}` : `/${lang}#${item.id}`;
    }
    return `/${lang}/${item.id}`;
  };

  const handleNavClick = (item, e) => {
    if (item.type === "anchor" && isHome) {
      e.preventDefault();
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const navLinkClass =
    "text-sm font-semibold uppercase tracking-wider text-silver-300 transition-colors hover:text-white";

  return (
    <>
      <div
        className={clsx(
          "fixed inset-x-0 top-0 z-50 p-3 transition-transform duration-300 ease-out sm:p-4",
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <header
          className={clsx(
            "relative h-16 w-full rounded-xl border transition-all duration-300",
            {
              "bg-midnight-900/90 backdrop-blur-xl shadow-lg border-white/10":
                !isAtTop || isMobileMenuOpen,
              "bg-transparent border-transparent":
                isAtTop && !isMobileMenuOpen,
            }
          )}
        >
          <nav className="flex size-full items-center justify-between px-4 sm:px-6">
            <Link
              to={`/${lang}`}
              className="flex shrink-0 items-center"
              onClick={handleLogoClick}
            >
              <img src="/img/logo.png" alt="Kim & Co" className="w-10" />
            </Link>

            <div className="hidden h-full items-center gap-6 lg:flex">
              {Array.isArray(navItems) &&
                navItems.map((item) => (
                  <a
                    key={item.id}
                    href={getNavHref(item)}
                    onClick={(e) => handleNavClick(item, e)}
                    className={navLinkClass}
                  >
                    {item.text}
                  </a>
                ))}
              <LanguageToggle className="ml-4" />
            </div>

            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="z-50 p-2 text-gray-200 transition-colors hover:text-white"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <AiOutlineClose size={28} />
                ) : (
                  <AiOutlineMenu size={28} />
                )}
              </button>
            </div>
          </nav>
        </header>
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-40 bg-midnight-950/95 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          {
            "visible opacity-100": isMobileMenuOpen,
            "invisible opacity-0": !isMobileMenuOpen,
          }
        )}
      >
        <div className="flex h-full flex-col items-center justify-center pt-16">
          <div className="flex flex-col items-center gap-6 text-center">
            {Array.isArray(navItems) &&
              navItems.map((item) => (
                <a
                  key={item.id}
                  href={getNavHref(item)}
                  onClick={(e) => handleNavClick(item, e)}
                  className="text-2xl font-semibold text-gray-200 transition-colors hover:text-white"
                >
                  {item.text}
                </a>
              ))}
          </div>
          <div className="mt-12">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
