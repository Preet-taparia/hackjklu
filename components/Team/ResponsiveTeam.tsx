"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CiMail } from "react-icons/ci";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import styles from "@/components/Team/Team.module.css";
import TeamCard from "./Team";

const ICON_SIZE = 28;
const MOBILE_BREAKPOINT = 640;

interface SocialLinks {
    gb?: string;
    email?: string;
    linkedin?: string;
    instagram?: string;
}

interface TeamCardProps {
    name: string;
    title?: string;
    socials: SocialLinks;
    imageSrc: string;
}

interface Props {
    teamData: TeamCardProps[];
}

export default function ResponsiveTeam({ teamData }: Props) {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    if (isMobile) {
        return (
            <div className="grid grid-cols-2 gap-2">
                {teamData.map((member) => (
                    <div
                        key={member.name}
                        className="flex flex-col items-center text-center mb-8 py-2 bg-black border-2 border-[#10e83c4c] rounded-lg"
                    >
                        <div className="relative h-36 w-36 md:h-40 md:w-40 overflow-hidden rounded-md shadow-lg">
                            <Image
                                src={`/team/${member.imageSrc}.webp`}
                                alt={member.name}
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-md"
                            />
                        </div>
                        <p className="font-bold text-base mt-4 md:text-[1.7rem]">
                            {member.name}
                        </p>
                        {member.title && (
                            <p className="mb-2 text-base text-[1rem] px-1">
                                <span className="text-white">{member.title}</span>
                            </p>
                        )}
                        <div className={styles.socials}>
                            {member.socials.gb && (
                                <a href={member.socials.gb} target="_blank" rel="noopener noreferrer">
                                    <FaGithub size={ICON_SIZE} />
                                </a>
                            )}
                            {member.socials.linkedin && (
                                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={ICON_SIZE} />
                                </a>
                            )}
                            {member.socials.email && (
                                <a href={`mailto:${member.socials.email}`} target="_blank" rel="noopener noreferrer">
                                    <CiMail size={ICON_SIZE} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <div className={styles.cardContainer}>
                {teamData.map((item, index) => (
                    <TeamCard
                        key={`${index}-team`}
                        name={item.name}
                        title={item.title}
                        imageSrc={`/team/${item.imageSrc}.webp`}
                        socials={item.socials}
                    />
                ))}
            </div>
        </>
    );
}
