// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Header from "../Header/Header";

// const Speakers = () => {
//   const [bgImage, setBgImage] = useState("/screenBlur.webp");
//   const [showReel, setShowReel] = useState(false);

//   useEffect(() => {
//     const img = document.createElement("img");
//     img.src = "/screen.webp";
//     img.onload = () => setBgImage("/screen.webp");
//   }, []);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.async = true;
//     script.src = "https://www.instagram.com/embed.js";
//     script.onload = () => {
//       setTimeout(() => {
//         setShowReel(true);
//         if ((window as unknown as { instgrm?: { Embeds: { process: () => void } } }).instgrm) {
//           (window as unknown as { instgrm: { Embeds: { process: () => void } } }).instgrm.Embeds.process();
//         }
//       }, 500);
//     };
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <section
//       className="px-5 md:pt-10 relative bg-black/50 md:pb-10"
//       id="speakers"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "left",
//         transition: "background-image 0.5s ease-in-out",
//       }}
//     >
//       <h2 className="text-center my-5 sm:my-10 relative z-10">
//         <Header text="Speakers" />
//       </h2>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:h-full auto-rows-[auto,1fr]">
//         {/* Instagram Reel Section */}
//         <div className="lg:col-span-5 rounded-lg flex items-center justify-center relative h-[550px] sm:h-[600px] md:h-[600px] lg:h-full">
//           <div className="relative w-full h-full">
//             <Image
//               src="/speakers/ankur-warikoo.webp"
//               alt="Ankur Warikoo"
//               fill
//               className="object-cover object-center"
//               priority
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white">
//               <h3 className="text-lg font-bold">Ankur Warikoo</h3>
//               <p>Content Creator</p>
//               <a
//                 href="https://www.linkedin.com/in/warikoo/"
//                 className="text-blue-400"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 LinkedIn
//               </a>
//             </div>
//           </div>

//           {/* Instagram reel overlay */}
//           <div
//             className={`absolute inset-0 transition-opacity duration-500 z-20 ${showReel ? "opacity-100" : "opacity-0"
//               }`}
//           >
//             <div className="w-full h-full max-w-full overflow-hidden">
//               <blockquote
//                 className="instagram-media w-full h-full"
//                 data-instgrm-permalink="https://www.instagram.com/p/DGQTeRSS7br/?utm_source=ig_embed&amp;utm_campaign=loading"
//                 data-instgrm-version="12"
//               ></blockquote>
//             </div>
//           </div>
//         </div>

//         {/* Right side - Speakers */}
//         {/* <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-8 gap-4">
//           <div className="md:col-span-8 rounded-lg overflow-hidden relative aspect-[4/3]">
//             <Image
//               src="/speakers/sandeep-jain.webp"
//               alt="Sandeep Jain"
//               fill
//               className="object-cover object-center"
//               priority
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white">
//               <h3 className="text-lg font-bold">Sandeep Jain</h3>
//               <p>Founder & CEO at GeeksforGeeks</p>
//               <a
//                 href="https://www.linkedin.com/in/sandeep-jain-"
//                 className="text-blue-400"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 LinkedIn
//               </a>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-8 gap-4">
//             <div className="rounded-lg overflow-hidden relative aspect-[4/3]">
//               <Image
//                 src="/speakers/bhagirath-giri.webp"
//                 alt="Bhagirath Giri"
//                 fill
//                 className="object-cover object-center"
//               />
//               <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white">
//                 <h3 className="text-lg font-bold">Bhagirath Giri</h3>
//                 <p>Managing Director, WsCube Career School</p>
//                 <a
//                   href="https://www.linkedin.com/in/bhagirath-giri/"
//                   className="text-blue-400"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   LinkedIn
//                 </a>
//               </div>
//             </div>

//             <div className="rounded-lg overflow-hidden relative aspect-[4/3]">
//               <Image
//                 src="/speakers/jaskaransingh.webp"
//                 alt="Jaskaran Singh"
//                 fill
//                 className="object-cover object-center"
//               />
//               <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white">
//                 <h3 className="text-lg font-bold">Jaskaran Singh</h3>
//                 <p>ICPC World Finalist 2023 | SWE @Google</p>
//                 <a
//                   href="https://www.linkedin.com/in/jaskaran-singh-8b8450200/"
//                   className="text-blue-400"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   LinkedIn
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div> */}
//         <div className="lg:col-span-7 grid grid-cols-1 gap-4">
//           <div className="rounded-lg overflow-hidden relative aspect-[4/3]">
//             <Image
//               src="/speakers/bhagirath-giri.webp"
//               alt="Bhagirath Giri"
//               fill
//               className="object-cover object-center"
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white">
//               <h3 className="text-lg font-bold">Bhagirath Giri</h3>
//               <p>Managing Director, WsCube Career School</p>
//               <a
//                 href="https://www.linkedin.com/in/bhagirath-giri/"
//                 className="text-blue-400"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 LinkedIn
//               </a>
//             </div>
//           </div>

//           <div className="rounded-lg overflow-hidden relative aspect-[4/3]">
//             <Image
//               src="/speakers/jaskaransingh.webp"
//               alt="Jaskaran Singh"
//               fill
//               className="object-cover object-center"
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white">
//               <h3 className="text-lg font-bold">Jaskaran Singh</h3>
//               <p>ICPC World Finalist 2023 | SWE @Google</p>
//               <a
//                 href="https://www.linkedin.com/in/jaskaran-singh-8b8450200/"
//                 className="text-blue-400"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 LinkedIn
//               </a>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Speakers;

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
      className="px-5 py-10 relative bg-black/50"
      id="speakers"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <h2 className="text-center mb-8 sm:mb-12 relative z-10">
        <Header text="Speakers" />
      </h2>

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Instagram Reel Section - Flexible height container */}
          <div className="lg:col-span-6 xl:col-span-5 rounded-lg overflow-hidden flex flex-col">
            <div className="relative aspect-[9/16] w-full h-auto sm:max-h-[70vh] lg:max-h-none">
              {/* Base image that shows before reel loads */}
              <div className="absolute inset-0">
                <Image
                  src="/speakers/ankur-warikoo.webp"
                  alt="Ankur Warikoo"
                  fill
                  className="object-cover object-center rounded-lg"
                  priority
                />
              </div>

              {/* Instagram reel overlay with proper container */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 z-20 ${
                  showReel ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-full h-full overflow-hidden">
                  <blockquote
                    className="instagram-media w-full h-full"
                    data-instgrm-permalink="https://www.instagram.com/p/DGQTeRSS7br/?utm_source=ig_embed&amp;utm_campaign=loading"
                    data-instgrm-version="12"
                    style={{
                      background: "#FFF",
                      borderRadius: "3px",
                      border: "1px solid #e1e1e1",
                      boxShadow: "none",
                      margin: "0",
                      padding: "0",
                      width: "100%",
                    }}
                  ></blockquote>
                </div>
              </div>

              {/* Speaker info - positioned at bottom */}
              <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4 text-white rounded-b-lg z-10">
                <h3 className="text-xl font-bold">Ankur Warikoo</h3>
                <p className="text-gray-300">Content Creator</p>
                <a
                  href="https://www.linkedin.com/in/warikoo/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Speaker Cards Section - Vertically stacked on all screen sizes */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6 lg:gap-8">
            {/* Speaker Card 1 */}
            <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] bg-black/20 backdrop-blur-sm">
              <div className="relative aspect-[16/9] sm:aspect-[3/2] md:aspect-[16/9] lg:aspect-[16/9]">
                <Image
                  src="/speakers/bhagirath-giri.webp"
                  alt="Bhagirath Giri"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-4 text-white bg-gradient-to-b from-black/70 to-black/90">
                <h3 className="text-xl font-bold mb-1">Bhagirath Giri</h3>
                <p className="text-gray-300 mb-2">Managing Director, WsCube Career School</p>
                <a
                  href="https://www.linkedin.com/in/bhagirath-giri/"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Connect on LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Speaker Card 2 */}
            <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] bg-black/20 backdrop-blur-sm">
              <div className="relative aspect-[16/9] sm:aspect-[3/2] md:aspect-[16/9] lg:aspect-[16/9]">
                <Image
                  src="/speakers/jaskaransingh.webp"
                  alt="Jaskaran Singh"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-4 text-white bg-gradient-to-b from-black/70 to-black/90">
                <h3 className="text-xl font-bold mb-1">Jaskaran Singh</h3>
                <p className="text-gray-300 mb-2">ICPC World Finalist 2023 | SWE @Google</p>
                <a
                  href="https://www.linkedin.com/in/jaskaran-singh-8b8450200/"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Connect on LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
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