// "use client";

// import React, { useState } from "react";
// import itineraryData from "../../data/itinerary.json";
// import Header from "../Header/Header";

// interface TimelineEvent {
//   time: string;
//   event: string;
//   tags: string[];
// }

// interface ItineraryData {
//   day1Events: TimelineEvent[];
//   day2Events: TimelineEvent[];
//   day3Events: TimelineEvent[];
// }

// const filterCategories = [
//   { label: "All", value: "all" },
//   { label: "Mandatory", value: "mandatory" },
//   { label: "Fun", value: "fun" },
//   { label: "Food", value: "food" },
//   { label: "Workshop", value: "workshop" },
//   { label: "Mentoring", value: "mentoring" },
//   { label: "Competition", value: "competition" },
// ];

// const Itenary = () => {
//   const { day1Events, day2Events, day3Events } = itineraryData as ItineraryData;
//   const [activeFilter, setActiveFilter] = useState("all");

//   const highlightClass = (tags: string[]) => {
//     if (activeFilter === "all" || tags.includes(activeFilter)) {
//       return "";
//     } else {
//       return "opacity-50";
//     }
//   };

//   return (
//     <section id="itinerary" className="pt-10 relative">
//       <div className="mx-[2rem] my-[3rem] min-h-screen" id="itinerary-section">
//         <div className="container mx-auto">
//           <h2 className="text-center my-10">
//             <Header text="Itinerary" />
//           </h2>

//           {/* Category Filters */}
//           <div className="text-center my-4 flex flex-wrap justify-center gap-4">
//             {filterCategories.map(({ label, value }) => (
//               <button
//                 key={value}
//                 className={`px-4 py-2 rounded-lg mx-2 mt-1 ${
//                   activeFilter === value
//                     ? "bg-neonBlue text-white"
//                     : "bg-transparent text-neonGreen border border-neonGreen"
//                 }`}
//                 onClick={() => setActiveFilter(value)}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>

//           {/* Itinerary Sections */}
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             <div>
//               <div className="rounded-xl border-2 border-gray-500">
//                 <h2 className="rounded-t-xl border-b-2 border-gray-500 bg-gray-800 px-4 py-2 text-center text-lg font-semibold text-white">
//                   Day 1
//                 </h2>
//                 <Timeline events={day1Events} highlightClass={highlightClass} />
//               </div>
//             </div>
//             <div>
//               <div className="rounded-xl border-2 border-gray-500">
//                 <h2 className="rounded-t-xl border-b-2 border-gray-500 bg-gray-800 px-4 py-2 text-center text-lg font-semibold text-white">
//                   Day 2
//                 </h2>
//                 <Timeline events={day2Events} highlightClass={highlightClass} />
//               </div>
//             </div>
//             <div>
//               <div className="rounded-xl border-2 border-gray-500">
//                 <h2 className="rounded-t-xl border-b-2 border-gray-500 bg-gray-800 px-4 py-2 text-center text-lg font-semibold text-white">
//                   Day 3
//                 </h2>
//                 <Timeline events={day3Events} highlightClass={highlightClass} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const Timeline: React.FC<{
//   events: TimelineEvent[];
//   highlightClass: (tags: string[]) => string;
// }> = ({ events, highlightClass }) => {
//   return (
//     <div className="relative ml-[3.5rem]">
//       <div
//         className="absolute left-0 h-full w-px bg-gray-700"
//         style={{
//           boxShadow:
//             "0px 0px 2.783px 0px #FFF, 0px 0px 5.566px 0px #FFF, 0px 0px 19.481px 0px #FFF",
//         }}
//       ></div>
//       <div className="flex flex-col items-start">
//         {events.map((event, index) => (
//           <div
//             key={index}
//             className={`my-2.5 flex items-start ${highlightClass(event.tags)}`}
//           >
//             <div className="absolute left-0 -translate-x-1/2 transform rounded-full bg-gray-700 px-3 py-2 text-sm font-semibold text-white">
//               {event.time}
//             </div>
//             <div className="ml-[3rem] px-3 py-3 text-[0.9rem] text-gray-200">
//               {event.event}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Itenary;





"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaFilter } from "react-icons/fa";
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
  { label: "Food", value: "food", color: "bg-yellow-500" },
  { label: "Workshop", value: "workshop", color: "bg-blue-500" },
  { label: "Mentoring", value: "mentoring", color: "bg-purple-500" },
  { label: "Competition", value: "competition", color: "bg-pink-500" },
];

const tagColorMap = {
  mandatory: "bg-red-100 text-red-800",
  fun: "bg-green-100 text-green-800",
  food: "bg-yellow-100 text-yellow-800",
  workshop: "bg-blue-100 text-blue-800",
  mentoring: "bg-purple-100 text-purple-800",
  competition: "bg-pink-100 text-pink-800",
};

const Itinerary = () => {
  const { day1Events, day2Events, day3Events } = itineraryData as ItineraryData;
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeDay, setActiveDay] = useState(1);
  const [dayFilters, setDayFilters] = useState({
    day1: "all",
    day2: "all",
    day3: "all"
  });

  const renderTimeline = (events: TimelineEvent[], day: number) => {
    const currentDayFilter = dayFilters[`day${day}` as keyof typeof dayFilters];
    const filteredEvents =
      currentDayFilter === "all"
        ? events
        : events.filter((event) => event.tags.includes(currentDayFilter));

    return (
      <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <div className="relative p-5 md:p-8">
          <div className="absolute left-8 md:left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-50"></div>

          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative mb-8 pl-14 md:pl-20 group"
              >
                <div
                  className="absolute left-0 -translate-x-1/2 bg-gray-700 text-white 
                  rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center 
                  border-4 border-gray-800 group-hover:border-indigo-500 transition-all"
                >
                  <FaClock className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-sm md:text-base font-bold absolute -bottom-10">
                    {event.time}
                  </span>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 md:p-5 shadow-lg group-hover:shadow-2xl transition-all">
                  <div className="flex flex-col md:flex-row justify-between items-start space-y-3 md:space-y-0">
                    <p className="text-gray-100 text-sm md:text-base flex-grow mr-2">
                      {event.event}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium
                            ${
                              tagColorMap[tag as keyof typeof tagColorMap] ||
                              "bg-gray-200 text-gray-800"
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
      <div className="flex flex-wrap justify-center gap-2 mb-4 md:hidden">
        {filterCategories.map(({ label, value, color }) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
              ${
                currentDayFilter === value
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
          <div className="text-center my-6 hidden md:flex flex-wrap justify-center gap-3 md:gap-5">
            {filterCategories.map(({ label, value, color }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300
                  ${
                    activeFilter === value
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