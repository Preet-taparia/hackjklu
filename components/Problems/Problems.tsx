"use client";

import React, { useState } from "react";
import challengesData from "../../data/challenges.json";

// import styles from './Problems.module.css';

interface Challenge {
  id: string;
  title: string;
  track: string[];
  description: string;
  sponsored?: string;
}


const Problems = () => {

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("All");

  const toggleDescription = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const sortedChallenges = [...challengesData].sort(
    (a: Challenge, b: Challenge) => {
      if (a.sponsored === "true" && b.sponsored !== "true") {
        return -1;
      } else if (a.sponsored !== "true" && b.sponsored === "true") {
        return 1;
      } else {
        return 0;
      }
    },
  );

  const filteredChallenges = sortedChallenges.filter((challenge: Challenge) => {
    if (selectedOption === "All") {
      return (
        challenge.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return (
        challenge.track.includes(selectedOption) &&
        (challenge.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          challenge.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  });

  return (
    <div className="mb-[1rem] min-h-screen text-white md:my-[3rem]">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mb-4 flex flex-col justify-center  md:flex-row md:items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID or Title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border-2 border-gray-600 bg-gray-800 px-4 py-2 text-[0.8rem] text-white focus:border-blue-300 focus:outline-none md:w-96 md:pr-10 md:text-base"
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 15l4.5 4.5"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 20l-4.5-4.5"
                ></path>
                <circle cx="10" cy="10" r="8" strokeWidth="2"></circle>
              </svg>
            </span>
          </div>

          <select
            className="my-5 rounded-md border-2 border-gray-600 bg-gray-800 px-4 py-2 text-[0.8rem] text-gray-400 focus:border-blue-300 focus:outline-none md:ml-4 md:text-base"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="All">All</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="GAME DEV/AR/VR">GAME DEV/AR/VR</option>
            <option value="IoT">IoT</option>
            <option value="Web 2">Web 2</option>
            <option value="Web 3">Web 3</option>
          </select>
        </div>
        {filteredChallenges.length === 0 && (
          <p className="text-center text-gray-400">
            Can&apos;t find any matches for the input search.
          </p>
        )}
        {filteredChallenges.map((challenge: Challenge) => (
          <div
            key={challenge.id}
            className={`relative md:mb-[3rem]`}
          >
            <div className="mt-[1rem] flex flex-row items-center md:mt-[3rem] ">
              <span className="text-shadow: 1px 3px 6px rgba(93, 213, 240, 0.4) text-[2.5rem] font-normal not-italic leading-[normal] tracking-[-0.54rem] text-[#ECECEC] md:text-[4.75rem]">
                {challenge.id}
              </span>
              <span
                className={`ml-[2rem] text-[0.8rem] font-normal not-italic leading-[normal] text-white md:text-2xl`}
              >
                {challenge.title}
              </span>
            </div>
            <div className="mb-[1.5rem] mt-2 flex space-x-2 md:space-x-4">
              {challenge.track.map((trackItem: string, index: number) => (
                <div key={index} className="items-center justify-center">
                  <div className="rounded-[0.25rem] bg-gradient-to-r from-[#1C4B79] to-[#5AD2ED] p-0.5">
                    <div className="back flex h-full w-full items-center justify-center rounded-[0.18rem] bg-black px-3 py-1">
                      <p className="text-[0.5rem] text-white md:text-[0.8rem]">
                        {trackItem}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex-grow"></div>
              {challenge.sponsored === "true" && (
                <div className="rounded-[0.25rem] bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-0.5">
                  <div className="back flex h-full w-full items-center justify-center rounded-[0.18rem] bg-black px-3 py-1">
                    <p className="text-[0.5rem] text-white md:text-[0.8rem]">
                      Bounty
                    </p>
                  </div>
                </div>
              )}
              <button
                className="rounded-md bg-[#0d2339] px-2 py-1 text-[0.5rem] text-white md:text-[0.8rem] md:text-base"
                onClick={() => toggleDescription(challenge.id)}
              >
                {expandedId === challenge.id ? "Hide" : "Show"}
              </button>
            </div>
            <div
              className="absolute h-0.5 w-full bg-gradient-to-r from-white via-white to-white opacity-30"
              style={{
                boxShadow:
                  "0px 0px 2.783px 0px #FFF, 0px 0px 5.566px 0px #FFF, 0px 0px 19.481px 0px #FFF",
              }}
            ></div>
            {expandedId === challenge.id && (
              <div
                className={`leading-loose antialiased mt-4 rounded-md border border-gray-800 bg-gray-900 p-6 text-sm text-gray-300 shadow-lg md:text-base`}
              >
                <p>{challenge.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  )
}

export default Problems