"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaYoutube, FaHeart, FaArrowUp } from "react-icons/fa";
import { BiLogoInstagramAlt, BiLogoLinkedinSquare } from "react-icons/bi";
import { LinkPreview } from "@/components/ui/link-preview";

interface SocialMediaIconProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ Icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <Icon className="w-8 h-8 text-white transition-transform duration-300 ease-in-out hover:fill-neonGreen hover:scale-125" />
  </a>
);

const Footer: React.FC = () => {
  // Single state for dropdown with mode to distinguish between click and hover
  const [dropdownState, setDropdownState] = useState<{
    isOpen: boolean;
    mode: "click" | "hover" | "closed";
  }>({
    isOpen: false,
    mode: "closed",
  });

  const dropupRef = useRef<HTMLDivElement>(null);

  // Close dropup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropupRef.current && !dropupRef.current.contains(event.target as Node)) {
        setDropdownState({ isOpen: false, mode: "closed" });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle button click
  const handleButtonClick = () => {
    if (dropdownState.isOpen && dropdownState.mode === "click") {
      // If already open by click, close it
      setDropdownState({ isOpen: false, mode: "closed" });
    } else {
      // Otherwise open it in click mode (or switch from hover to click mode)
      setDropdownState({ isOpen: true, mode: "click" });
    }
  };

  // Handle mouse enter for dropdown container
  const handleMouseEnter = () => {
    // Open dropdown in hover mode only if not already open by click
    if (dropdownState.mode !== "click") {
      setDropdownState({ isOpen: true, mode: "hover" });
    }
  };

  // Handle mouse leave for dropdown container
  const handleMouseLeave = () => {
    // Close dropdown only if it was opened via hover
    if (dropdownState.mode === "hover") {
      setDropdownState({ isOpen: false, mode: "closed" });
    }
  };

  return (
    <footer className="bg-[#000000c6] mt-4 md:mt-8 text-white p-5 md:p-8 relative z-[10]">
      <div className="text-center text-lg md:text-xl font-bold italic py-6 md:py-10">
        <span className="text-white">
          &quot;It&apos;s not just about writing{" "}
        </span>
        <span className="text-neonGreen font-semibold">code</span>
        <span className="text-white">, it&apos;s about the </span>
        <span className="text-neonGreen font-semibold">experience</span>
        <span className="text-white">&quot;</span>
      </div>

      <hr className="border-[#808080] mb-6" />

      <div className="md:mx-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="w-full md:w-1/2 flex flex-col">
            <a
              href="https://devfolio.co/code-of-conduct"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4 className="text-lg font-normal tracking-wide text-neonGreen">
                Code of Conduct
              </h4>
            </a>

            <div className="mt-4 md:mr-12 mb-6">
              <h4 className="text-lg font-normal tracking-wide text-neonGreen">
                ADDRESS
              </h4>
              <p className="text-sm md:text-base mt-2">
                JK LAKSHMIPAT UNIVERSITY, P.O. 302 026, MAHAPURA RD, NEAR
                MAHINDRA SEZ, MAHAPURA, RAJASTHAN 302026
              </p>
            </div>

            <div>
              <h4 className="text-lg font-normal tracking-wide text-neonGreen">
                CONTACT INFO
              </h4>
              <p className="text-sm md:text-base mt-2">
                <strong>Email:</strong>
                <br />
                General queries:{" "}
                <a
                  href="mailto:hackjklu@jklu.edu.in"
                  className="text-white hover:text-neonGreen"
                >
                  hackjklu@jklu.edu.in
                </a>
                <br />
                Technical issues:{" "}
                <a
                  href="mailto:counciloftechnicalaffairs@jklu.edu.in"
                  className="text-white hover:text-neonGreen"
                >
                  counciloftechnicalaffairs@jklu.edu.in
                </a>
              </p>
              <p className="text-sm text-white md:text-base mt-4">
                <strong>Call Us:</strong>
                <br />
                Promotion & Outreach: +91 93511 87511
                <br />
                Registrations: +91 93133 08922
                <br />
                Hospitality: +91 98282 23577
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="overflow-hidden rounded-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.117070008914!2d75.64722912457951!3d26.836228513374916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4af4fe68f403%3A0x3bf05f95df22b8c4!2sJK%20Lakshmipat%20University!5e0!3m2!1sen!2sin!4v1695563431231!5m2!1sen!2sin"
                width="100%"
                height="250"
                className="w-full h-[15rem] md:h-[18rem] lg:h-[22rem] border-none rounded-md"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-3 text-center md:text-left">
        <div className="px-1 md:px-12 flex flex-col lg:flex-row gap-4 lg:gap-12 justify-center lg:justify-between items-center">
          <div className="flex gap-y-2 mt-2">
            <SocialMediaIcon
              href="https://www.instagram.com/hackjklu"
              Icon={BiLogoInstagramAlt}
            />
            <SocialMediaIcon
              href="https://www.youtube.com/@CouncilofTechnicalAffairs"
              Icon={FaYoutube}
            />
            <SocialMediaIcon
              href="https://www.linkedin.com/in/council-of-technical-affairs-jklu/"
              Icon={BiLogoLinkedinSquare}
            />
          </div>

          <p className="text-white text-sm md:text-base font-normal mt-2">
            © 2025 HackJKLU v4.0, All rights reserved
          </p>

          <div className="flex flex-wrap items-center justify-center">
            {/* Made with Love - Responsive version */}
            <div className="flex items-center whitespace-nowrap mt-2">
              <span className="text-white text-sm md:text-base font-normal">Made with</span>
              <FaHeart className="text-red-500 animate-pulse mx-1" />
              <span className="text-white text-sm md:text-base font-normal mr-2">by{" "}
                <LinkPreview url="https://preet-portfolio.vercel.app/" className="font-bold text-white">
                  Preet Taparia
                </LinkPreview>{" "}
                and
              </span>
            </div>

            {/* Team Button with Dropup - Improved behavior */}
            <div
              className="relative"
              ref={dropupRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center justify-center mt-2 gap-1 px-4 py-1.5 ${dropdownState.isOpen ? 'bg-[#222]' : 'bg-[#111]'} text-white text-xs md:text-sm font-semibold border border-neonGreen hover:text-white transition-all duration-300 shadow-md`}
                onClick={handleButtonClick}
                aria-expanded={dropdownState.isOpen}
                aria-haspopup="true"
              >
                Team <FaArrowUp className={`text-sm transition-transform duration-300 ${dropdownState.isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropup container with improved transitions */}
              <div
                className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-[#111] border border-neonGreen rounded overflow-hidden shadow-lg z-50 transition-all duration-300 origin-bottom
                  ${dropdownState.isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
                `}
                style={{
                  minWidth: '120px',
                  transformOrigin: 'bottom center',
                }}
              >
                {["Rakshika Sharma", "Labish", "Yash"].map((name, index) => (
                  <span
                    key={index}
                    className="text-neonGreen text-sm py-2 px-3 w-full text-center block hover:bg-[#222]"
                    style={{
                      textShadow: "0px 0px 5px rgba(57, 255, 20, 0.8)",
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;