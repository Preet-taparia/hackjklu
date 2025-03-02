"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

interface CarouselImage {
  src: string;
  title?: string;
  description?: string;
  blurDataURL?: string;
}

interface CarouselProps {
  images: CarouselImage[];
  interval?: number;
  autoPlay?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  interval = 2000,
  autoPlay = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const startAutoPlay = useCallback(() => {
    if (autoPlay && images.length > 1) {
      slideIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
    }
  }, [autoPlay, images.length, interval]);

  const resetAutoPlay = useCallback(() => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    startAutoPlay();
  }, [startAutoPlay]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetAutoPlay();
  }, [images.length, resetAutoPlay]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    resetAutoPlay();
  }, [images.length, resetAutoPlay]);

  useEffect(() => {
    if (!isHovered) startAutoPlay();
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [startAutoPlay, isHovered]);

  return (
    <div
      className="relative w-full flex flex-col items-center space-y-5 mt-8 mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden w-full max-w-6xl mx-auto">
        <div
          className="flex transition-transform ease-in-out duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="min-w-full flex justify-center items-center relative"
            >
              <Image
                src={image.src}
                alt={`Carousel Image ${index + 1}`}
                className="rounded-xl object-cover"
                placeholder={image.blurDataURL ? "blur" : undefined}
                blurDataURL={image.blurDataURL || undefined}
                quality={100}
                width={1200}
                height={800}
              />

              {(image.title || image.description) && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-4 rounded-xl w-11/12 md:w-1/2 text-center">
                  {image.title && (
                    <h3 className="text-xl font-bold">{image.title}</h3>
                  )}
                  {image.description && <p className="mt-2">{image.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              aria-label="Previous Slide"
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900/50 text-neonGreen p-2 rounded-full z-10"
              onClick={prevSlide}
            >
              <MdOutlineNavigateBefore size={24} />
            </button>
            <button
              aria-label="Next Slide"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900/50 text-neonGreen p-2 rounded-full z-10"
              onClick={nextSlide}
            >
              <MdOutlineNavigateNext size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetAutoPlay();
                  }}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
