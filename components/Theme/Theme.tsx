"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import themesData from '../../data/themes.json';
import Header from "../Header/Header";
// import styles from "./Themes.module.css";

interface CardData {
  image: string;
  title: string;
  description?: string;
}

type IntersectionObserverOptions = IntersectionObserverInit;

const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentRef = elementRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);


  return [elementRef, isIntersecting] as const;
};


const Card: React.FC<CardData & { delay?: number }> = React.memo(
  ({ image, title, description, delay = 0 }) => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [ref, isVisible] = useIntersectionObserver({
      threshold: 0.1,
      rootMargin: "150px",
    });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = ((y - centerY) / centerY) * -20;
      const rotateY = ((x - centerX) / centerX) * 20;

      setCoords({ x: rotateX, y: rotateY });
    }, []);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setCoords({ x: 0, y: 0 });
    };

    const cardStyle = {
      transform: isHovered
        ? `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) scale3d(1.05,1.05,1.05)`
        : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    };

    const backgroundStyle = {
      transform: isHovered
        ? `translateX(${coords.y * -2}px) translateY(${coords.x * 2}px)`
        : "translateX(0) translateY(0)",
      backgroundImage: `url(${image})`,
    };

    return (
      <div
        ref={ref}
        className={`relative w-full px-4 md:p-3 h-[180px] md:h-[240px] mx-2 cursor-pointer group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        style={{ transitionDelay: `${delay}ms` }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-full h-full rounded-xl border border-opacity-50 border-neonGreen bg-[#333] overflow-hidden transition-all duration-700 ease-out"
          style={cardStyle}
        >
          <div
            className="absolute inset-[-38px] bg-cover bg-center transition-all duration-700 ease-out opacity-50 group-hover:opacity-80"
            style={backgroundStyle}
          />
          <div
            className={`absolute bg-[rgba(0,0,0,0.6)] bottom-0 left-0 right-0 p-4 text-white transition-transform duration-700 ease-out ${isHovered ? "translate-y-0" : "translate-y-[40%]"
              }`}
          >
            <div className="relative z-1 max-h-full  overflow-auto">
              <h2 className="text-lg sm:text-xl font-bold mb-2 text-shadow-lg mt-0">
                {title}
              </h2>
              {isHovered && (
                <p className="text-md mt-2 opacity-100 duration-500 max-h-full overflow-auto">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

const Theme = () => {
  return (
    <section className="pt-10 relative" id="themes">
      <h2 className="text-center my-10">
        <Header text="Themes" />
      </h2>
      <div className="mt-16 mb-12">
        <div className="grid grid-cols-1 md:px-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {themesData.map((card, index) => (
            <Card key={index} {...card} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Theme