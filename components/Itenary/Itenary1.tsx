"use client";

import React, { useState } from "react";
import itineraryData from "../../data/itinerary.json";
import Header from "../Header/Header";

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
  { label: "All", value: "all" },
  { label: "Mandatory", value: "mandatory" },
  { label: "Fun", value: "fun" },
  { label: "Food", value: "food" },
  { label: "Workshop", value: "workshop" },
  { label: "Mentoring", value: "mentoring" },
  { label: "Competition", value: "competition" },
];

const Itenary = () => {
  const { day1Events, day2Events, day3Events } = itineraryData as ItineraryData;
  const [activeFilter, setActiveFilter] = useState("all");

  const highlightClass = (tags: string[]) => {
    if (activeFilter === "all" || tags.includes(activeFilter)) {
      return "";
    } else {
      return "opacity-50";
    }
  };

  return (
    <section id="itinerary" className="pt-10 relative">
      <div className="mx-[2rem] my-[3rem] min-h-screen" id="itinerary-section">
        <div className="container mx-auto">
          <h2 className="text-center my-10">
            <Header text="Itinerary" />
          </h2>

          {/* Category Filters */}
          <div className="text-center my-4 flex flex-wrap justify-center gap-4">
            {filterCategories.map(({ label, value }) => (
              <button
                key={value}
                className={`px-4 py-2 rounded-lg mx-2 mt-1 ${
                  activeFilter === value
                    ? "bg-neonBlue text-white"
                    : "bg-transparent text-neonGreen border border-neonGreen"
                }`}
                onClick={() => setActiveFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Itinerary Sections */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="rounded-xl border-2 border-gray-500">
                <h2 className="rounded-t-xl border-b-2 border-gray-500 bg-gray-800 px-4 py-2 text-center text-lg font-semibold text-white">
                  Day 1
                </h2>
                <Timeline events={day1Events} highlightClass={highlightClass} />
              </div>
            </div>
            <div>
              <div className="rounded-xl border-2 border-gray-500">
                <h2 className="rounded-t-xl border-b-2 border-gray-500 bg-gray-800 px-4 py-2 text-center text-lg font-semibold text-white">
                  Day 2
                </h2>
                <Timeline events={day2Events} highlightClass={highlightClass} />
              </div>
            </div>
            <div>
              <div className="rounded-xl border-2 border-gray-500">
                <h2 className="rounded-t-xl border-b-2 border-gray-500 bg-gray-800 px-4 py-2 text-center text-lg font-semibold text-white">
                  Day 3
                </h2>
                <Timeline events={day3Events} highlightClass={highlightClass} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Timeline: React.FC<{
  events: TimelineEvent[];
  highlightClass: (tags: string[]) => string;
}> = ({ events, highlightClass }) => {
  return (
    <div className="relative ml-[3.5rem]">
      <div
        className="absolute left-0 h-full w-px bg-gray-700"
        style={{
          boxShadow:
            "0px 0px 2.783px 0px #FFF, 0px 0px 5.566px 0px #FFF, 0px 0px 19.481px 0px #FFF",
        }}
      ></div>
      <div className="flex flex-col items-start">
        {events.map((event, index) => (
          <div
            key={index}
            className={`my-2.5 flex items-start ${highlightClass(event.tags)}`}
          >
            <div className="absolute left-0 -translate-x-1/2 transform rounded-full bg-gray-700 px-3 py-2 text-sm font-semibold text-white">
              {event.time}
            </div>
            <div className="ml-[3rem] px-3 py-3 text-[0.9rem] text-gray-200">
              {event.event}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itenary;




