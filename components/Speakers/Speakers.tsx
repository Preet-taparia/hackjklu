"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../Header/Header";

const Speakers = () => {
  const [bgImage, setBgImage] = useState("/screenBlur.webp");
  const [showReel, setShowReel] = useState(false);

  useEffect(() => {
    const img = document.createElement("img");
    img.src = "/screen.webp";
    img.onload = () => setBgImage("/screen.webp");
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = () => {
      setTimeout(() => {
        setShowReel(true);
        if ((window as unknown as { instgrm?: { Embeds: { process: () => void } } }).instgrm) {
          (window as unknown as { instgrm: { Embeds: { process: () => void } } }).instgrm.Embeds.process();
        }
      }, 500);
    };
    document.body.appendChild(script);
  }, []);

  return (
    <section
      className="px-5 md:pt-10 relative bg-black/50 md:pb-10"
      id="speakers"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "left",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <h2 className="text-center my-5 sm:my-10 relative z-10">
        <Header text="Speakers" />
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:h-full auto-rows-[auto,1fr]">
        {/* Instagram Reel Section */}
        <div className="lg:col-span-5 rounded-lg flex items-center justify-center relative h-[550px] sm:h-[600px] md:h-[600px] lg:h-full">
          <div className="relative w-full h-full">
            <Image
              src="/speakers/ankur-warikoo.webp"
              alt="Ankur Warikoo"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white">
              <h3 className="text-lg font-bold">Ankur Warikoo</h3>
              <p>Content Creator</p>
              <a
                href="https://www.linkedin.com/in/warikoo/"
                className="text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Instagram reel overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 z-20 ${showReel ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="w-full h-full max-w-full overflow-hidden">
              <blockquote
                className="instagram-media w-full h-full"
                data-instgrm-permalink="https://www.instagram.com/p/DGQTeRSS7br/?utm_source=ig_embed&amp;utm_campaign=loading"
                data-instgrm-version="12"
              ></blockquote>
            </div>
          </div>
        </div>

        {/* Right side - Speakers */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-8 gap-4">
          {/* Main speaker */}
          <div className="md:col-span-8 rounded-lg overflow-hidden relative aspect-[4/3]">
            <Image
              src="/speakers/sandeep-jain.webp"
              alt="Sandeep Jain"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white">
              <h3 className="text-lg font-bold">Sandeep Jain</h3>
              <p>Founder & CEO at GeeksforGeeks</p>
              <a
                href="https://www.linkedin.com/in/sandeep-jain-"
                className="text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Other speakers */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-8 gap-4">
            <div className="rounded-lg overflow-hidden relative aspect-[4/3]">
              <Image
                src="/speakers/bhagirath-giri.webp"
                alt="Bhagirath Giri"
                fill
                className="object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white">
                <h3 className="text-lg font-bold">Bhagirath Giri</h3>
                <p>Managing Director, WsCube Career School</p>
                <a
                  href="https://www.linkedin.com/in/bhagirath-giri/"
                  className="text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden relative aspect-[4/3]">
              <Image
                src="/speakers/jaskaransingh.webp"
                alt="Jaskaran Singh"
                fill
                className="object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white">
                <h3 className="text-lg font-bold">Jaskaran Singh</h3>
                <p>ICPC World Finalist 2023 | SWE @Google</p>
                <a
                  href="https://www.linkedin.com/in/jaskaran-singh-8b8450200/"
                  className="text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Speakers;
