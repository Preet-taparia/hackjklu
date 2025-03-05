"use client";

import React, { useState, useEffect } from "react";
import itinerary from "@/data/itinerary.json";
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

const images = Array.from({ length: 18 }, (_, i) => ({
  src: `/galleryHome/${i + 1}.webp`,
  name: `Image ${i + 1}`,
}));

export default function TimerPage() {
  const [time, setTime] = useState(36 * 60 * 60);
  const [notifications, setNotifications] = useState<
    { time: string; event: string }[]
  >([]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const dayWiseEvents = [
      ...itinerary.day1Events,
      ...itinerary.day2Events,
      ...itinerary.day3Events,
    ];
    setNotifications(dayWiseEvents.filter((event) => event.time >= currentTime));
  }, [time]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(secs).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="relative h-screen overflow-hidden flex flex-col">
      {/* Infinite Moving Cards for Background */}
      <div className="absolute w-full h-full flex flex-col">
        {Array.from({ length: 3 }).map((_, rowIdx) => (
          <div key={rowIdx} className="w-full h-1/2 flex-1">
            <InfiniteMovingCards
              items={images.slice(rowIdx * 6, (rowIdx + 1) * 6)}
              direction={rowIdx % 2 === 0 ? "left" : "right"}
              speed="slow"
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Timer & Notifications */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="bg-black/60 p-6 rounded-xl backdrop-blur-sm">
          <div className="flex gap-4 text-6xl font-bold text-white font-mono">
            {renderCard(hours, "Hours")}
            {renderCard(minutes, "Minutes")}
            {renderCard(seconds, "Seconds")}
          </div>
        </div>
        <div className="absolute top-5 right-5 text-right">
          {notifications.map((notification, index) => (
            <div key={index} className="bg-gray-700 text-white p-2 m-1 rounded">
              <strong>{notification.event}</strong> - {notification.time}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const renderCard = (value: string, label: string) => (
  <div className="flex flex-col items-center justify-center w-56 h-56 p-4 border-4 border-white">
    <div className="text-6xl text-white drop-shadow-[0_0_10px_#00FF00]">{value}</div>
    <div className="text-xl text-gray-300 mt-2 font-mono">{label}</div>
  </div>
);