"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock } from "react-icons/fa";
import Header from "../Header/Header";
import itineraryData from "../../data/itinerary.json";

interface TimelineEvent {
  time: string;
  event: string;
  tags: string[];
}

interface ItineraryData {
  day1Events: TimelineEvent[];
  day2Events: TimelineEvent[];
  day3Events: TimelineEvent[];
}

const filterCategories = [
  { label: "All", value: "all", color: "bg-indigo-500" },
  { label: "Mandatory", value: "mandatory", color: "bg-red-500" },
  { label: "Fun", value: "fun", color: "bg-green-500" },
  { label: "Competition", value: "competition", color: "bg-pink-500" },
  { label: "Mentoring", value: "mentoring", color: "bg-purple-500" },
  { label: "Session", value: "session", color: "bg-blue-500" }
];

const tagColorMap = {
  mandatory: "bg-red-100 text-red-800",
  fun: "bg-green-100 text-green-800",
  food: "bg-yellow-100 text-yellow-800",
  workshop: "bg-blue-100 text-blue-800",
  session: "bg-purple-100 text-purple-800",
  competition: "bg-pink-100 text-pink-800",
};

const Itinerary = () => {
  const { day1Events, day2Events, day3Events } = itineraryData as ItineraryData;
  const [activeFilter, setActiveFilter] = useState("all");
  const [dayFilters, setDayFilters] = useState({
    day1: "all",
    day2: "all",
    day3: "all"
  });

  const isEventVisible = (event: TimelineEvent, day: number) => {
    const dayFilter = dayFilters[`day${day}` as keyof typeof dayFilters];
    const globalFilter = activeFilter;

    // Check day-specific filter
    const matchesDayFilter =
      dayFilter === "all" ||
      event.tags.includes(dayFilter);

    // Check global filter
    const matchesGlobalFilter =
      globalFilter === "all" ||
      event.tags.includes(globalFilter);

    return matchesDayFilter && matchesGlobalFilter;
  };

  const renderTimeline = (events: TimelineEvent[], day: number) => {
    return (
      <div className="bg-gray-900/80 rounded-xl shadow-2xl overflow-hidden">
        <div className="relative p-5 md:p-8">
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-50"></div>

          <AnimatePresence>
            {events.map((event, index) => {
              const isVisible = isEventVisible(event, day);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isVisible ? 1 : 0.3,
                    x: 0,
                    scale: isVisible ? 1 : 0.95
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative mb-8 pl-14 md:pl-20 group ${!isVisible ? 'pointer-events-none' : ''}`}
                >
                  <div
                    className="absolute left-4 md:left-5 -translate-x-1/2 bg-gray-700 text-white 
                    rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center 
                    border-4 border-gray-800 group-hover:border-indigo-500 transition-all"
                  >
                    <FaClock className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-sm md:text-base font-bold absolute -bottom-8 whitespace-nowrap">
                      {event.time}
                    </span>
                  </div>

                  <div className="bg-gray-800 rounded-lg ml-2 p-4 md:p-5 shadow-lg group-hover:shadow-2xl transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start space-y-3 md:space-y-0">
                      <p className={`text-sm md:text-base flex-grow mr-2 ${!isVisible ? 'text-gray-500' : 'text-gray-100'}`}>
                        {event.event}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1 capitalize rounded-full text-xs md:text-sm font-medium
                              ${tagColorMap[tag as keyof typeof tagColorMap] ||
                              "bg-gray-200 text-gray-800"
                              } 
                              ${!isVisible ? 'opacity-50' : ''}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  const handleDayFilterChange = (day: number, filter: string) => {
    setDayFilters(prev => ({
      ...prev,
      [`day${day}`]: filter
    }));
  };

  const renderDayFilter = (day: number) => {
    const currentDayFilter = dayFilters[`day${day}` as keyof typeof dayFilters];

    return (
      <div className="flex flex-wrap justify-center gap-2 my-4 mx-2 md:hidden">
        {filterCategories.map(({ label, value, color }) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-full text-base font-medium transition-all duration-300
              ${currentDayFilter === value
                ? `${color} text-white`
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            onClick={() => handleDayFilterChange(day, value)}
          >
            {label}
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <section id="itinerary" className="pt-12 relative">
      <div
        className="mx-4 md:mx-[2rem] my-[3rem] min-h-screen"
        id="itinerary-section"
      >
        <div className="container mx-auto">
          <h2 className="text-center my-12">
            <Header text="Itinerary" />
          </h2>

          {/* Common filter categories - visible from medium screens */}
          <div className="text-center mb-14 hidden md:flex flex-wrap justify-center gap-3 md:gap-5">
            {filterCategories.map(({ label, value, color }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-base md:text-xl font-medium transition-all duration-300
                  ${activeFilter === value
                    ? `${color} text-white`
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                onClick={() => setActiveFilter(value)}
              >
                {label}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <div className="rounded-xl border-2 border-gray-500">
                <h2 className="rounded-t-xl border-b-2 border-gray-500 bg-gray-800 px-5 py-3 text-center text-xl font-semibold text-white">
                  Day 1
                </h2>
                {renderDayFilter(1)}
                {renderTimeline(day1Events, 1)}
              </div>
            </div>
            <div>
              <div className="rounded-xl border-2 border-gray-500">
                <h2 className="rounded-t-xl border-b-2 border-gray-500 bg-gray-800 px-5 py-3 text-center text-xl font-semibold text-white">
                  Day 2
                </h2>
                {renderDayFilter(2)}
                {renderTimeline(day2Events, 2)}
              </div>
            </div>
            <div>
              <div className="rounded-xl border-2 border-gray-500">
                <h2 className="rounded-t-xl border-b-2 border-gray-500 bg-gray-800 px-5 py-3 text-center text-xl font-semibold text-white">
                  Day 3
                </h2>
                {renderDayFilter(3)}
                {renderTimeline(day3Events, 3)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Itinerary;