"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface SponsorCardProps {
  index: number;
  sponsor: string;
  category: string;
  sponsorimgsrc: string | StaticImageData;
  site: string;
}

const SponsorCard: React.FC<SponsorCardProps> = ({
  index,
  sponsor,
  category,
  sponsorimgsrc,
  site,
}) => {
  const defaultBgColor = "#262626";
  const defaultTextColor = "#BBBBBB";
  
  const sponsorColor: {
    [key in SponsorCardProps["category"]]: {
      bgColor: string;
      textColor: string;
    };
  } = {
    "Gold Partner": {
      bgColor: "#4E3E1D",
      textColor: "#FFDC96",
    },
    "Silver Partner": {
      bgColor: "#3A3A3A",
      textColor: "#BBBBBB",
    },
    "Bronze Partner": {
      bgColor: "#463026",
      textColor: "#E49977",
    },
  };

  const bgColor = sponsorColor[category]?.bgColor ?? defaultBgColor;
  const textColor = sponsorColor[category]?.textColor ?? defaultTextColor;

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
      viewport={{ once: true }}
    >
      <a href={site} target="_blank" rel="noreferrer" key={index}>
        <div className="w-full text-white hover:scale-105 duration-300 border border-neonGreen rounded-[20px]">
          <div className="w-full h-[161px] xl:h-[186px] flex items-center justify-center overflow-hidden relative p-10">
            <Image
              src={sponsorimgsrc}
              fill
              className="rounded-t-[20px] outline-none"
              alt={sponsor}
              style={{ objectFit: "contain", padding: "20px" }}
            />
          </div>
          <div
            className="flex justify-between items-start p-[22px] rounded-b-[20px]"
            style={{ backgroundColor: bgColor }}
          >
            <div className="flex flex-col w-full text-center">
              <p className="sm:text-[28px] text-xl font-white">{sponsor}</p>
              <p
                className="sm:text-[18px] text-xl leading-9 font-bold"
                style={{ color: textColor }}
              >
                {category}
              </p>
            </div>

          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default SponsorCard;