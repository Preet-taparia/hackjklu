"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface SponsorCardProps {
  index: number;
  sponsor: string;
  category: string;
  sponsorimgsrc: string;
  site: string;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ index, sponsor, category, sponsorimgsrc, site }) => {
  return (
    <motion.div className="card" initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1 } }} viewport={{ once: true }}>
      <a href={site} target="_blank" rel="noreferrer" key={index}>
        <div className="w-full text-white hover:scale-105 duration-300 border border-neonGreen rounded-[20px]">
          <div className="w-full h-[161px] flex items-center justify-center p-10">
            <Image src={sponsorimgsrc} width={200} height={150} alt={sponsor} className="rounded-t-[20px]" />
          </div>
          <div className="p-[22px] text-center bg-gray-800 rounded-b-[20px]">
            <p className="text-xl font-white">{sponsor}</p>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default SponsorCard;
