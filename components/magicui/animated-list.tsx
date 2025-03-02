"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import itineraryData from "@/data/itinerary.json";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full mb-4">
      {children}
    </motion.div>
  );
}

export function AnimatedList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {React.Children.map(children, (child, index) => (
        <AnimatedListItem key={index}>{child}</AnimatedListItem>
      ))}
    </AnimatePresence>
  );
}

export function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const now = new Date();
    const events = [
      ...itineraryData.day1Events,
      ...itineraryData.day2Events,
      ...itineraryData.day3Events
    ];

    const upcomingEvents = events.filter(event => {
      const eventTime = new Date();
      const [time, modifier] = event.time.split(' ');
      let [hours, minutes] = time.split(':');
      if (modifier === 'PM' && hours !== '12') {
        hours = (parseInt(hours, 10) + 12).toString();
      }
      if (modifier === 'AM' && hours === '12') {
        hours = '00';
      }
      eventTime.setHours(parseInt(hours));
      eventTime.setMinutes(parseInt(minutes));
      return eventTime > now && eventTime <= new Date(now.getTime() + 3600000);
    });

    setNotifications(upcomingEvents);
  }, []);

  const Notification = ({ name, description, time }: any) => {
    return (
      <figure
        className={cn(
          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
          // animation styles
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          // light styles
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          // dark styles
          "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
              <span className="text-sm sm:text-lg">{name}</span>
              <span className="mx-1">·</span>
              <span className="text-xs text-gray-500">{time}</span>
            </figcaption>
            <p className="text-sm font-normal dark:text-white/60">
              {description}
            </p>
          </div>
        </div>
      </figure>
    );
  };

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification key={idx} name={item.event} description={item.description} time={item.time} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
