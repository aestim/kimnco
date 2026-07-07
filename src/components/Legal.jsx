import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";

// The component has been renamed to LegalPage for clarity, assuming you will rename the file.
const LegalPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Function to determine the active tab from the URL hash. Defaults to 'privacy'.
  const getTabFromHash = (hash) => {
    return hash === '#noemail' ? 'noemail' : 'privacy';
  };

  const [activeTab, setActiveTab] = useState(getTabFromHash(location.hash));

  // Effect to update the tab when the URL hash changes
  useEffect(() => {
    setActiveTab(getTabFromHash(location.hash));
  }, [location.hash]);

  // --- Reusable Sub-Components for Content ---

  // Enhanced helper component for rendering policy sections
  const PolicySection = ({ title, children }) => (
    <section className="mb-10 w-full">
      <h2 className="mb-6 border-l-4 border-blue-500 pl-4 text-2xl font-semibold text-gray-100">
        {title}
      </h2>
      <div className="space-y-4 pl-2 leading-relaxed text-gray-400">
        {children}
      </div>
    </section>
  );

  // Content for the Privacy Policy tab — rendered generically from locale data
  const PrivacyContent = () => {
    const sections = t('privacy.sections', { returnObjects: true });
    const officer = t('privacy.officer', { returnObjects: true });
    const remedies = t('privacy.remedies', { returnObjects: true });
    const change = t('privacy.change', { returnObjects: true });
    const tocItems = [
      ...sections.map((s) => s.title),
      officer.title,
      remedies.title,
      change.title,
    ];

    return (
      <div className="mt-12 text-left">
        <p className="mb-8">{t('privacy.intro_p1')}</p>

        {/* Table of Contents */}
        <div className="mb-12 rounded-lg border border-gray-700 bg-gray-900/50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-200">{t('privacy.contents_title')}</h3>
          <ol className="list-inside list-decimal space-y-2 text-gray-400">
            {tocItems.map((item, index) => (
              <li key={index}>{item.substring(item.indexOf(' ') + 1)}</li>
            ))}
          </ol>
        </div>

        {/* Numbered sections */}
        {sections.map((section, index) => (
          <PolicySection key={index} title={section.title}>
            {(section.body || []).map((p, i) => <p key={`b${i}`}>{p}</p>)}
            {section.list && (
              <ul className="list-inside list-disc space-y-1 pl-4">
                {section.list.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            )}
            {(section.body2 || []).map((p, i) => <p key={`b2${i}`}>{p}</p>)}
          </PolicySection>
        ))}

        {/* Privacy officer */}
        <PolicySection title={officer.title}>
          <p>{officer.p1}</p>
          <div className="mt-4 space-y-1 rounded-md bg-gray-900/50 p-4">
            {officer.rows.map((row, i) => <p key={i}>{row}</p>)}
            <p dangerouslySetInnerHTML={{ __html: officer.email_html }} />
          </div>
        </PolicySection>

        {/* Remedies */}
        <PolicySection title={remedies.title}>
          <p>{remedies.p1}</p>
          <ul className="mt-4 list-inside list-disc space-y-1 pl-4">
            {remedies.orgs_html.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </PolicySection>

        {/* Policy changes */}
        <PolicySection title={change.title}>
          <p>{change.p1}</p>
          <p className="text-sm text-gray-500">{change.effective}</p>
        </PolicySection>
      </div>
    );
  };

  // Content for the "Refusal of Unauthorized Email Collection" tab
  const NoEmailContent = () => (
    <div className="mt-12 text-center">
      <MdOutlineDoNotDisturbAlt className="mx-auto mb-6 text-6xl text-blue-400" />
      <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-8 text-left">
        <p className="leading-relaxed text-gray-300">{t('noemail.p1')}</p>
        <p className="mt-6 text-sm text-gray-500">{t('noemail.p2')}</p>
      </div>
    </div>
  );
  
  // --- Main Component Render ---
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl">
          <h1 className="special-font mb-8 pb-4 text-4xl font-bold text-gray-100 md:text-5xl">
            {activeTab === 'privacy' 
              ? t('footer.privacyPolicy') 
              : t('footer.noEmail')
            }
          </h1>

          {/* Tab Buttons */}
          <div className="flex space-x-2 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('privacy')}
              className={clsx("px-6 py-3 text-sm font-semibold transition-colors duration-200 md:text-base", {
                "border-b-2 border-blue-500 text-white": activeTab === 'privacy',
                "text-gray-500 hover:text-gray-300": activeTab !== 'privacy'
              })}
            >
              {t('footer.privacyPolicy')}
            </button>
            <button
              onClick={() => setActiveTab('noemail')}
              className={clsx("px-6 py-3 text-sm font-semibold transition-colors duration-200 md:text-base", {
                "border-b-2 border-blue-500 text-white": activeTab === 'noemail',
                "text-gray-500 hover:text-gray-300": activeTab !== 'noemail'
              })}
            >
              {t('footer.noEmail')}
            </button>
          </div>

          {/* Conditionally Rendered Content */}
          {activeTab === 'privacy' ? <PrivacyContent /> : <NoEmailContent />}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
