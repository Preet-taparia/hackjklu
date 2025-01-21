"use client";

import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points } from "three";
import React, { useEffect, useState, useRef } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Press_Start_2P } from "next/font/google";
import BreathingText from '../ui/BreathingText';

const press_start_2p = Press_Start_2P({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  preload: true,
});

const COLORS_TOP = [
  "rgba(151, 254, 113, 0.3)",  // lighter green with decreased intensity
  "rgba(31, 84, 251, 0.5)",    // lighter blue with decreased intensity
  "rgba(71, 222, 129, 0.5)",   // lighter green with decreased intensity
  "rgba(31, 84, 251, 0.3)"     // same lighter blue with decreased intensity
];


const RotatingStars = () => {
  const starsRef = useRef<Points>(null);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
      starsRef.current.rotation.x -= 0.0001;
    }
  });

  return <Stars ref={starsRef} radius={50} count={1000} factor={4} fade speed={1} />;
};

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2025-03-07T11:00:00").getTime();

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
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(100% 100% at 50% 0%, #020617 50%, ${color})`;

  useEffect(() => {
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
      style={{
        backgroundImage,
      }}
      className="relative mx-auto grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 sm:px-8 sm:py-20 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <CardContainer className="z-50 p-4">
          <CardBody className="relative group/card border-white/[0.2] flex flex-col gap-y-10 justify-center items-center w-auto rounded-xl p-6 sm:p-10">
            <CardItem translateZ="50" className={`text-4xl sm:text-6xl text-center font-bold text-white ${press_start_2p.className}`}>
              HackJKLU v4.0
            </CardItem>
            <CardItem translateZ="60" className="text-2xl sm:text-3xl text-center font-bold text-white">
              7 - 9 March 2025
            </CardItem>
            <CardItem translateZ="30" className="text-2xl sm:text-4xl mb-2 text-center font-bold overused-grotesk text-white">
              <div className="flex flex-col items-center justify-center text-white">
                <BreathingText
                  label="Ideate | Innovate | Inspire"
                  staggerDuration={0.1}
                  fromFontVariationSettings="'wght' 100, 'slnt' 0"
                  toFontVariationSettings="'wght' 800, 'slnt' -10"
                />
              </div>
            </CardItem>
            {/* Applying Devfolio Button Here */}
            <CardItem translateZ="60" className="w-full flex items-center justify-center">
              <div
                className="apply-button"
                data-hackathon-slug="YOUR-HACKATHON-SLUG"
                data-button-theme="light"
                style={{ height: "44px", width: "312px" }}
              ></div>
            </CardItem>
            <CardItem translateZ="50" className="w-full">
              <CountdownTimer />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <RotatingStars />
        </Canvas>
      </div>
    </motion.section>
  );
};

export default Hero;
