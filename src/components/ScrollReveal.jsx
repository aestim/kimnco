import { useInView } from "react-intersection-observer";
import clsx from "clsx";

const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={clsx(
        "transition-all duration-700 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
