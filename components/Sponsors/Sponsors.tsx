"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import SponsorCard from "@/components/SponsorCard";
import sponsorsData from "@/data/sponsors.json";

import wscubeTech from "@/public/sponsors/WsCubeTech.webp";
import ention from "@/public/sponsors/ention.webp";

import gfg from "@/public/sponsors/geeksforgeeks.webp";
import devfolio from "@/public/sponsors/devfolio.webp";
import ethindia from "@/public/sponsors/ethindia.webp";
import devarmy from "@/public/sponsors/devarmy.webp";
import balsamiq from "@/public/sponsors/balsamiq.webp";
import gdg from "@/public/sponsors/gdg.webp";
import iitDelhi from "@/public/sponsors/iit_delhi.webp";
import iitKharagpur from "@/public/sponsors/iit_kharagpur.webp";
import iiitDelhi from "@/public/sponsors/iiit_delhi.webp";
import iitPatna from "@/public/sponsors/iit_patna.webp";
import devStation from "@/public/sponsors/dev-station.webp"


import Header from "../Header/Header";
import HeaderSmall from "../HeaderSmall/HeaderSmall";

// Map predefined sponsors with imported images
const imageMap: { [key: string]: StaticImageData } = {
  "Geeks For Geeks": gfg,
  "Devfolio": devfolio,
  "EthIndia": ethindia,
  "Balsamiq": balsamiq,
  "Devarmy": devarmy,
  "GDG": gdg,
  "IIT Delhi": iitDelhi,
  "IIT Kharagpur": iitKharagpur,
  "IIIT Delhi": iiitDelhi,
  "IIT Patna": iitPatna,
  "devStation": devStation,
};

// Map sponsors, handling both imported and JSON image paths
const mappedSponsors = sponsorsData.map((sponsor, index) => ({
  ...sponsor,
  sponsorimgsrc: sponsor.image
    ? sponsor.image // Use the path from JSON
    : imageMap[sponsor.sponsor], // Fallback to imported images
  index,
}));

const MajorSponsor: React.FC<{
  name: string;
  image: StaticImageData;
  bgColor: string;
  link: string;
  description: string;
  roundedSide: "left" | "right";
}> = ({ name, image, bgColor, link, description, roundedSide }) => {
  return (
    <a href={link} className="w-full xl:max-w-[95%] flex justify-center md:px-8 lg:px-0" target="_blank" rel="noopener noreferrer">
      <div className={`flex flex-col md:flex-row ${roundedSide === "left" ? "md:flex-row-reverse" : ""} min-h-[350px] md:max-h-[350px] w-full`}>
        <div className="w-full md:w-4/12">
          <Image className="w-full h-full object-contain rounded-t-[20px] md:rounded-none" src={image} alt={name} />
        </div>
        <div
          style={{ backgroundColor: bgColor }}
          className={`w-full md:w-8/12 flex flex-col justify-center items-start px-4 xl:px-8 py-8 md:p-[40px] gap-2 rounded-b-[20px] md:rounded-l-none md:rounded-r-none ${roundedSide === "right" ? "md:rounded-r-xl" : "md:rounded-l-xl"}`}
        >
          <p className="font-black w-full text-white text-center text-[2rem] xl:text-[4rem]">{name}</p>
          <p className="text-white font-medium text-[1rem] md:text-[1.125rem]">{description}</p>
        </div>
      </div>
    </a>
  );
};

const Sponsors: React.FC = () => {
  return (
    <section className="relative pb-20 pt-20" id="partners">
      <h2 className="text-center mb-5">
        <Header text="Partners" />
      </h2>

      {/* Gold Partner */}
      <div className="p-10 text-center">
        <HeaderSmall text="Gold Partner" />
        <div className="w-full flex mt-8 flex-col items-center gap-8 xl:gap-12">
          <MajorSponsor
            name="Ention"
            image={ention}
            bgColor="#DDC72D"
            link="/partners/ention"
            description="Ention is a leading innovator in digital solutions, empowering businesses with cutting-edge technology and advanced automation tools to optimize operations and drive growth."
            roundedSide="right"
          />
        </div>
      </div>

      {/* Pre Hackathon Sponsors */}
      <div className="p-10 text-center">
        <HeaderSmall text="Pre-Hackathon Partner" />
        <div className="w-full flex mt-8 flex-col items-center gap-8 xl:gap-12">
          <MajorSponsor
            name="WS CubeTech"
            image={wscubeTech}
            bgColor="#0834d8"
            link="/partners/ws-cube-tech"
            description="WsCube is a Hybrid Upskilling Edtech, develops and disseminates Tech-powered Career Acceleration Programs and Job Oriented Professional Courses curated for Aspirants of Bharat, readying them for Global workforce opportunities."
            roundedSide="left"
          />
        </div>
      </div>

      {/* All Sponsors */}
      <div className="p-10 text-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-[44px] md:px-8 lg:px-10">
          {mappedSponsors.map((sponsor) => (
            <SponsorCard key={sponsor.index} {...sponsor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
