import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';

const LanguageToggle = ({ className }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  const isKoreanActive = i18n.language.startsWith('ko');

  const handleLanguageChange = (lang) => {
    if (i18n.language.startsWith(lang)) return;
    i18n.changeLanguage(lang);
    // Stay on the same page: swap only the leading /:lang segment.
    navigate(pathname.replace(/^\/[^/]+/, `/${lang}`) + search + hash);
  };

  // Base styling for the text links
  const buttonBaseClasses = "text-sm font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 rounded";

  return (
    <div
      className={clsx("flex items-center space-x-2", className)}
      role="group"
      aria-label="Language selection"
    >
      {/* Korean Language Button */}
      <button
        onClick={() => handleLanguageChange('ko')}
        className={clsx(
          buttonBaseClasses,
          {
            'text-white font-semibold': isKoreanActive,
            'text-silver-400 hover:text-white': !isKoreanActive,
          }
        )}
      >
        한
      </button>

      {/* Separator */}
      <span className="text-silver-500">/</span>

      {/* English Language Button */}
      <button
        onClick={() => handleLanguageChange('en')}
        className={clsx(
          buttonBaseClasses,
          {
            'text-white font-semibold': !isKoreanActive,
            'text-silver-400 hover:text-white': isKoreanActive,
          }
        )}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;