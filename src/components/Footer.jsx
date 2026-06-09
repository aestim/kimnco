import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = ({ lang }) => {
  const { t } = useTranslation();
  const footerItems = t("footer.links", { returnObjects: true });

  const getPathForItem = (item) => {
    switch (item.id) {
      case "privacyPolicy":
        return `/${lang}/legal#privacy`;
      case "noEmail":
        return `/${lang}/legal#noemail`;
      case "contact":
        return `/${lang}/contact`;
      default:
        return `/${lang}`;
    }
  };

  return (
    <footer className="border-t border-white/10 bg-midnight-950 text-silver-400">
      <div className="section-container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-12">
          <div>
            <img src="/img/logo.png" alt="Kim & Co" className="mb-6 w-12" />
            <p className="mb-2 text-lg font-bold text-white">
              {t("footer.companyNameShort")}
            </p>
            <div className="space-y-1 text-sm leading-relaxed">
              <p>
                <span className="text-silver-300">{t("footer.businessNumber")}</span>{" "}
                214-87-43822
              </p>
              <p>
                <span className="text-silver-300">{t("footer.owner")}</span>{" "}
                {t("footer.ownerName")}
              </p>
              <p>
                <span className="text-silver-300">{t("footer.tel")}</span>{" "}
                {t("footer.telNo")}
              </p>
              <p>
                <span className="text-silver-300">{t("footer.fax")}</span>{" "}
                {t("footer.faxNo")}
              </p>
              <p className="break-keep">{t("footer.addressDetail")}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-silver-300">
              {t("footer.quickLinks")}
            </p>
            <ul className="space-y-2 text-right">
              {footerItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={getPathForItem(item)}
                    className="text-sm transition-colors hover:text-bronze-400"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-silver-500">
          <p>&copy; Kim &amp; Co {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
