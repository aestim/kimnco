import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';

const Timeline = () => {
    const { t } = useTranslation();
    const contentRef = useRef(null);

    // Get decade keys (2020s, 2010s, etc.)
    const decadeKeys = ['2020s', '2010s', '2000s', '1990s'];
    const [activeDecade, setActiveDecade] = useState(decadeKeys[0]);

    // Get events for the active decade
    const activeEvents = useMemo(() => {
        const decadesData = t('timeline.decades', { returnObjects: true });
        if (!decadesData || typeof decadesData !== 'object') return [];
        return decadesData[activeDecade] || [];
    }, [t, activeDecade]);

    // Animate content change
    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current, 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [activeDecade]);

    return (
        <section className="w-full bg-midnight-950 text-silver-100 py-24 px-4 sm:px-6 lg:px-8 font-manrope">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <p className="text-bronze-500 font-bold uppercase tracking-[0.2em] mb-4 text-sm">{t('timeline.subtitle')}</p>
                <h1 className="text-4xl md:text-5xl font-zentry font-bold text-silver-100 mb-6">
                    {t('timeline.mainTitle')}
                </h1>
                <div className="w-24 h-1 bg-bronze-500 mx-auto rounded-full"></div>
            </div>

            {/* Decade Tabs */}
            <div className="max-w-4xl mx-auto mb-16">
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-slate-800 pb-4">
                    {decadeKeys.map((decade) => (
                        <button
                            key={decade}
                            onClick={() => setActiveDecade(decade)}
                            className={`pb-4 text-lg md:text-2xl font-playfair font-bold transition-all duration-300 relative ${
                                activeDecade === decade
                                    ? 'text-bronze-500'
                                    : 'text-slate-600 hover:text-silver-300'
                            }`}
                        >
                            {decade}
                            {/* Active Underline */}
                            <span className={`absolute bottom-[-1px] left-0 w-full h-1 bg-bronze-500 transform transition-transform duration-300 ${activeDecade === decade ? 'scale-x-100' : 'scale-x-0'}`}></span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Display Area */}
            <div ref={contentRef} className="max-w-5xl mx-auto min-h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {activeEvents.map((event, index) => (
                        <div 
                            key={`${event.date}-${index}`} 
                            className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden group hover:border-bronze-500/30 transition-colors duration-500 flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-bronze-400 font-bold text-3xl font-manrope">
                                    {event.date}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-silver-100 font-playfair mb-3 leading-tight group-hover:text-white transition-colors">
                                {event.title}
                            </h3>
                            
                            {event.details && (
                                <p className="text-silver-400 text-sm leading-relaxed mt-auto">
                                    {event.details}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;