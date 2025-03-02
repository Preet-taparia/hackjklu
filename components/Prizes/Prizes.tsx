"use client";

import React, { useEffect, useRef } from "react";
import Header from "../Header/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { GiTrophyCup } from "react-icons/gi";
import { HiTrophy } from "react-icons/hi2";

import bestBeginner from "@/public/prizesPage/best_beginner.webp";
import bestGirls from "@/public/prizesPage/best_girls.webp";

interface PrizeCardProps {
  amount: string | number;
  category: string;
  default_bg: string;
  hover_bg: string;
  isCenter?: boolean;
}

const prizeColors: {
  [key: string]: {
    borderColor: string;
    glowColor: string;
    defaultGlow: string;
    trophyColor?: string;
  };
} = {
  "1st prize": {
    borderColor: "rgba(255, 215, 0, 0.8)", // Gold
    glowColor: "rgba(255, 215, 0, 0.5)",
    defaultGlow: "rgba(255, 215, 0, 0.2)",
    trophyColor: "#FFD700"
  },
  "2nd prize": {
    borderColor: "rgba(192, 192, 192, 0.8)", // Silver
    glowColor: "rgba(192, 192, 192, 0.5)",
    defaultGlow: "rgba(192, 192, 192, 0.2)",
    trophyColor: "#C0C0C0"
  },
  "3rd prize": {
    borderColor: "rgba(205, 127, 50, 0.8)", // Bronze
    glowColor: "rgba(205, 127, 50, 0.5)",
    defaultGlow: "rgba(205, 127, 50, 0.2)",
    trophyColor: "#CD7F32"
  },
};


const PrizeCard: React.FC<PrizeCardProps> = ({
  amount,
  category,
  default_bg,
  hover_bg,
  isCenter,
}) => {

  const colors = prizeColors[category];

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
    >
      <div
        className={`flex flex-col justify-center items-center py-[64px] md:py-[52px]
        rounded-[8px] border-2 border-dashed ${isCenter ? "md:col-span-2" : ""}  `}
        style={{
          "--default-gradient": default_bg,
          "--hover-gradient": hover_bg,
          background: "var(--default-gradient)",
          borderColor: colors.borderColor,
          boxShadow: `0 0 10px 2px ${colors.defaultGlow}`,
          transition: "all 0.3s ease",
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--hover-gradient)";
          e.currentTarget.style.boxShadow = `0 0 20px 10px ${colors.glowColor}`;
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--default-gradient)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <div className="text-white flex flex-col justify-center items-center space-y-4">
          {category === "1st prize" ? (
            <GiTrophyCup className="text-6xl" style={{ color: colors.trophyColor }} />
          ) : (
            <HiTrophy className="text-6xl" style={{ color: colors.trophyColor }} />
          )}
          <p className="px-5 font-[500] text-[64px] leading-[72px] md:text-[88px] md:leading-[96px]">
            {amount}
          </p>
          <p className="text-[rgba(255,255,255,0.85)] font-[500] text-[20px] md:text-[24px]">
            {category}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Prize = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const confettiTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !confettiTriggered.current) {
          confettiTriggered.current = true;
          confetti({
            particleCount: 100,
            spread: 120,
            origin: { y: 0.6 },
            colors: ["#0000FF", "#008000"],
            shapes: ["circle", "square"],
          });
        }
      },
      { threshold: 0.5 }
    );

    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) observer.unobserve(currentSectionRef);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-5 sm:pt-10 relative bg-black/50" id="prizes">
      <h2 className="text-center my-10">
        <Header text="Prizes" />
      </h2>
      <div className="px-10 sm:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="order-2 lg:order-1">
            <PrizeCard
              amount="₹25K"
              category="2nd prize"
              default_bg="transparent"
              hover_bg="transparent"
            />
          </div>
          <div className="order-1 lg:order-2">
            <PrizeCard
              amount="₹50K"
              category="1st prize"
              default_bg="transparent"
              hover_bg="transparent"
              isCenter={true}
            />
          </div>
          <div className="order-3 lg:order-3">
            <PrizeCard
              amount="₹10K"
              category="3rd prize"
              default_bg="transparent"
              hover_bg="transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 mt-8">
          <div
            className="flex flex-col items-center gap-12 px-8 py-6 md:flex-row md:px-6 rounded-[8px] border-2 border-dashed border-white transition-all duration-300"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px 10px rgba(31, 84, 251, 0.5)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Image
              src={bestGirls}
              alt="Best Girls"
              className="w-[104px] h-[104px]"
            />
            <div className="w-full flex flex-col items-center gap-2">
              <p className="text-[#fff] text-[32px] font-normal text-center">
                Social Media Winners
              </p>
              <p className="text-[#C3C3C3] text-[20px] font-normal text-center">
                ₹ 15,000.00
              </p>
              <p className="text-[#C3C3C3] text-[20px] font-normal text-center">
                Social Media Winners consists of Linkedin, Instagram, Youtube Vlog
              </p>
              {/* <a
                href="/prizesPage/Documentation%20for%20Make-a-thon%20-%20HackJKLU%20v4.0.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[300px]"
              >
                <button className="text-[#C3C3C3] w-full p-3 rounded-lg border border-white text-[20px] font-normal text-center">
                  Documentation
                </button>
              </a> */}
            </div>
          </div>
          <div
            className="flex flex-col items-center gap-12 px-8 py-6 md:flex-row md:px-6 rounded-[8px] border-2 border-dashed border-white transition-all duration-300"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px 10px rgba(31, 84, 251, 0.5)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Image
              src={bestBeginner}
              alt="Best Beginner"
              className="w-[104px] h-[104px]"
            />
            <div className="w-full flex flex-col items-center gap-2">
              <p className="text-[#fff] text-[32px] font-normal text-center">
                Make-a-thon Winners
              </p>
              <p className="text-[#C3C3C3] text-[20px] font-normal text-center">
                ₹ 10,000.00
              </p>
              <p className="text-[#C3C3C3] text-[20px] font-normal text-center">
                Make-a-thon is a competition for school students
              </p>
              <a
                href="/prizesPage/Documentation%20for%20Make-a-thon%20-%20HackJKLU%20v4.0.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[300px]"
              >
                <button className="text-[#C3C3C3] w-full p-3 rounded-lg border border-white text-[20px] font-normal text-center">
                  View Rules
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prize;
