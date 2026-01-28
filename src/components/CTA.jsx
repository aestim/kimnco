import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CTA = () => {
    const { t } = useTranslation();
    const { lang } = useParams();
    const currentLang = lang || 'ko'; // Default fallback

    return (
        <section className="relative w-full py-32 bg-midnight-950 overflow-hidden">
            {/* Background Gradient/Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-midnight-950 to-black z-0"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-bronze-500/5 rounded-full blur-[120px] z-0"></div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <h2 
                    className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6 leading-tight text-balance"
                    dangerouslySetInnerHTML={{ __html: t('cta.title') }}
                />
                <p 
                    className="text-silver-300 text-lg md:text-xl font-manrope max-w-2xl mx-auto mb-10 leading-relaxed text-balance break-keep"
                    dangerouslySetInnerHTML={{ __html: t('cta.text') }}
                />
                
                <Link 
                    to={`/${currentLang}/contact`}
                    className="inline-flex items-center justify-center px-10 py-4 bg-[#ffffff] text-[#050505] hover:bg-[#d4af37] hover:text-[#ffffff] font-manrope font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-bronze-500/30 uppercase tracking-widest text-sm"
                >
                    {t('cta.button')}
                </Link>
            </div>
        </section>
    );
};

export default CTA;