"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Press_Start_2P } from "next/font/google";
import BreathingText from '../ui/BreathingText';

const press_start_2p = Press_Start_2P({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  preload: true,
});

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2025-03-07T10:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeRemaining({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0");
      const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0");
      const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  const renderCard = (value: string, label: string) => (
    <div className="flex flex-col items-center p-4 bg-transparent border-white border rounded-lg flex-1 aspect-w-1 aspect-h-1">
      <div className="text-3xl sm:text-5xl font-bold text-white">{value}</div>
      <div className="text-sm sm:text-lg font-semibold text-gray-300 mt-2">{label}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
      {renderCard(timeRemaining.days, "Days")}
      {renderCard(timeRemaining.hours, "Hours")}
      {renderCard(timeRemaining.minutes, "Minutes")}
      {renderCard(timeRemaining.seconds, "Seconds")}
    </div>
  );
};

const Hero = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apply.devfolio.co/v2/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <motion.section
      id="main"
      className="relative mx-auto grid min-h-screen place-content-center overflow-hidden px-4 py-24 sm:px-8 sm:py-20 text-gray-200 bg-[url('/hero.webp')] bg-center bg-cover"
    >
      <div className="relative z-10 flex flex-col items-center">
        <CardContainer className="z-50 p-4">
          <CardBody className="relative group/card border-white/[0.2] flex flex-col gap-y-7 sm:gap-y-10 justify-center items-center w-auto rounded-xl p-6 sm:p-10">
            <CardItem translateZ="50" className={`text-4xl sm:text-6xl text-center font-bold text-white ${press_start_2p.className}`}>
              <span style={{ color: "#1f54fb" }}>Hack</span>
              <span style={{ color: "#0bfb00" }}>JKLU</span> v4.0
            </CardItem>
            <CardItem
              translateZ="50"
              className={`text-base sm:text-2xl font-bold text-white flex items-center justify-center gap-2 ${press_start_2p.className}`}
            >
              <span>Co-powered by</span>
              <img src="/entionName.webp" width={200} className="inline-block w-[100px] sm:w-[200px] mb-2 sm:mb-4" />
            </CardItem>
            <CardItem translateZ="60" className="text-2xl sm:text-3xl text-center font-bold text-white">
              7 - 9 March 2025
            </CardItem>
            <CardItem translateZ="30" className="text-2xl sm:text-4xl mb-2 text-center font-bold overused-grotesk text-white not-italic">
              <div className="flex flex-col items-center justify-center text-white not-italic">
                <BreathingText
                  label="Ideate . Innovate . Inspire"
                  staggerDuration={0.1}
                  fromFontVariationSettings="'wght' 100"
                  toFontVariationSettings="'wght' 800"
                  className="not-italic !important"
                />
              </div>
            </CardItem>
            <CardItem translateZ="60" className="w-full flex items-center justify-center">
              <div
                className="apply-button relative min-h-[44px] w-full max-w-[312px] xs:w-[280px] sm:w-[312px]"
                data-hackathon-slug="hackjklu-v4"
                data-button-theme="dark-inverted"
              >
                {/* Fallback button while Devfolio loads */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-white text-black rounded-md"
                  style={{
                    // opacity: isDevfolioLoaded ? 0 : 1,
                    transition: 'opacity 0.3s'
                  }}
                >
                  Apply with Devfolio
                </div>
              </div>
            </CardItem>

            <CardItem translateZ="50" className="w-full">
              <CountdownTimer />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </motion.section>
  );
};

export default Hero;