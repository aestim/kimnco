import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const TimelineItem = ({ year, title, details, isLast }) => (
  <div className="relative pl-8 md:pl-12 py-6 group">
    {/* Timeline Line */}
    <div className={`absolute left-0 top-0 bottom-0 w-px bg-gray-800 group-hover:bg-gray-700 transition-colors duration-300 ${isLast ? 'h-1/2' : ''}`}></div>
    
    {/* Dot */}
    <div className="absolute left-[-4px] top-8 w-2.5 h-2.5 rounded-full bg-blue-500 border-4 border-black box-content group-hover:scale-125 group-hover:bg-blue-400 transition-transform duration-300"></div>

    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 opacity-0 translate-y-4 timeline-content">
      <span className="text-blue-400 font-bold text-xl min-w-[3rem] font-general">{year}</span>
      <div>
        <h3 className="text-white font-bold text-lg md:text-xl leading-snug mb-2 font-general">{title}</h3>
        {details && <p className="text-gray-400 text-sm md:text-base leading-relaxed font-robert-regular">{details}</p>}
      </div>
    </div>
  </div>
);

const DecadeSection = ({ decade, events }) => {
  const containerRef = useRef(null);
  const decadeTitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline items
      const items = containerRef.current.querySelectorAll('.timeline-content');
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });

      // Pin the decade title on desktop
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top+=100',
        end: 'bottom bottom-=100',
        pin: decadeTitleRef.current,
        pinSpacing: false,
        onEnter: () => gsap.to(decadeTitleRef.current, { color: '#ffffff', opacity: 1, duration: 0.3 }),
        onLeave: () => gsap.to(decadeTitleRef.current, { color: '#4b5563', opacity: 0.3, duration: 0.3 }),
        onEnterBack: () => gsap.to(decadeTitleRef.current, { color: '#ffffff', opacity: 1, duration: 0.3 }),
        onLeaveBack: () => gsap.to(decadeTitleRef.current, { color: '#4b5563', opacity: 0.3, duration: 0.3 }),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col md:flex-row mb-20 md:mb-32 relative">
      {/* Decade Header (Sticky on Desktop) */}
      <div className="md:w-1/4 flex-shrink-0 mb-8 md:mb-0 relative">
        <div ref={decadeTitleRef} className="md:absolute top-0 left-0">
          <h2 className="text-6xl md:text-8xl font-black text-gray-600 opacity-30 tracking-tighter font-zentry transition-colors duration-300">
            {decade}
          </h2>
        </div>
      </div>

      {/* Events List */}
      <div className="md:w-3/4 md:pl-10">
        {events.map((event, index) => (
          <TimelineItem 
            key={index} 
            year={event.date} 
            title={event.title} 
            details={event.details} 
            isLast={index === events.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

const Timeline = () => {
    const { t } = useTranslation();

    const timelineData = useMemo(() => {
        const decadesData = t('timeline.decades', { returnObjects: true });
        if (!decadesData || typeof decadesData !== 'object') return [];

        const decadeKeys = ['2020s', '2010s', '2000s', '1990s'];
        return decadeKeys.map(key => ({
            decade: key,
            events: Array.isArray(decadesData[key]) ? decadesData[key] : []
        }));
    }, [t]);

    if (!timelineData.length) return null;

    return (
        <div className="w-full bg-black text-white py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
             {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-20 text-center">
                <p className="text-blue-400 font-bold uppercase tracking-widest mb-4">Our Journey</p>
                <h1 className="text-4xl md:text-6xl font-zentry font-black">
                    {t('timeline.mainTitle')}
                </h1>
            </div>

            <div className="max-w-6xl mx-auto">
                {timelineData.map((data) => (
                    <DecadeSection key={data.decade} decade={data.decade} events={data.events} />
                ))}
            </div>

            {/* End Marker */}
            <div className="flex justify-center mt-12 opacity-50">
                <div className="w-px h-24 bg-gradient-to-b from-gray-800 to-transparent"></div>
            </div>
        </div>
    );
};

export default Timeline;