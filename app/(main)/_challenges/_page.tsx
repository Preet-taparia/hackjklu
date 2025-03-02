"use client";

import Link from "next/link";
import Problems from "@/components/Problems/Problems";
import Header from "@/components/Header/Header";

export default function ChallengesPage() {
  return (
    <>
      <section className="px-10 relative pt-24">
        <h2 className="text-center">
          <Header text="Problem Statements" />

        {/* Button to navigate to /challenges/submit */}
        <div className="mt-10 flex justify-center">
          <Link href="/challenges/submit">
            <button
              className="px-4 py-2  text-white rounded-md h-12 font-medium bg-gradient-to-br from-[#0BFB00] to-[#1f54fb] text-lg"
            >
              Submit Challenge
            </button>
          </Link>
        </div>
        </h2>

        {/* Problems Component */}
        <Problems />
      </section>
    </>
  );
}
