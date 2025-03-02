"use client";

import React from 'react';
import style from "./HeaderSmall.module.css";
import ScrambleHover from '../ui/ScrambleHover';
import { Press_Start_2P } from "next/font/google";

const press_start_2p = Press_Start_2P({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  preload: true,
});

type HeaderProps = {
  text: string;
};


const HeaderSmall = ({ text }: HeaderProps) => {
  return (
    <div className={style.heading}>
      <ScrambleHover
          text={text}
          scrambleSpeed={100}
          sequential={false}
          revealDirection="center"
          maxIterations={4}
          useOriginalCharsOnly={true}
          className={style.headingText + ` ${press_start_2p.className}`}
          // characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
        />
    </div>
  );
}

export default HeaderSmall;