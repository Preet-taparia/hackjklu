'use client';

import { useState, useEffect } from 'react';
import { CardContainer, CardItem } from '@/components/ui/3d-card';
import itineraryData from '@/data/itinerary.json';
import Header from '../Header/Header';
import { AnimatedListDemo } from '@/components/magicui/animated-list';

export const Timer = () => {
  const [time, setTime] = useState(36 * 3600); // Reset clock to 36 hours
  const [isRunning, setIsRunning] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<{ event: string; time: string } | null>(null);

  useEffect(() => {
    const updateCurrentEvent = () => {
      const now = new Date();
      const events = [
        ...itineraryData.day1Events,
        ...itineraryData.day2Events,
        ...itineraryData.day3Events
      ];

      const nextEvent = events.find(event => {
        const eventTime = new Date();
        const [hours, minutes] = event.time.split(':');
        const period = event.time.includes('PM') ? 12 : 0;
        eventTime.setHours(parseInt(hours) + period);
        eventTime.setMinutes(parseInt(minutes));
        return eventTime > now;
      });

      if (nextEvent) {
        setCurrentEvent(nextEvent);
        const eventTime = new Date();
        const [hours, minutes] = nextEvent.time.split(':');
        const period = nextEvent.time.includes('PM') ? 12 : 0;
        eventTime.setHours(parseInt(hours) + period);
        eventTime.setMinutes(parseInt(minutes));
        const diffSeconds = Math.floor((eventTime.getTime() - now.getTime()) / 1000);
        setTime(diffSeconds);
        setIsRunning(true);
      }
    };

    updateCurrentEvent();
    const interval = setInterval(updateCurrentEvent, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 36 * 3600; // Reset to 36 hours
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time]);

  useEffect(() => {
    if (time === 0 && currentEvent) {
      const audio = new Audio('/notification-sound.mp3');
      audio.play();
    }
  }, [time, currentEvent]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-5xl px-4">
        <CardContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardItem className="bg-transparent p-8 flex flex-col items-center justify-center border border-white/40 rounded-xl shadow-lg transform transition-transform hover:scale-105">
            <div className="text-8xl text-white mb-4 press-start-2p" style={{ textShadow: '0 0 5px #fff, 0 0 15px #00ff00' }}>
              {String(Math.floor((time % (24 * 3600)) / 3600)).padStart(2, '0')}
            </div>
            <div className="press-start-2p text-white text-lg opacity-90" style={{ textShadow: '0 0 3px #fff, 0 0 10px #00ff00' }}>Hours</div>
          </CardItem>
          <CardItem className="bg-transparent p-8 flex flex-col items-center justify-center border border-white/40 rounded-xl shadow-lg transform transition-transform hover:scale-105">
            <div className="text-8xl text-white mb-4 press-start-2p" style={{ textShadow: '0 0 5px #fff, 0 0 15px #00ff00' }}>
              {String(Math.floor((time % 3600) / 60)).padStart(2, '0')}
            </div>
            <div className="press-start-2p text-white text-lg opacity-90" style={{ textShadow: '0 0 3px #fff, 0 0 10px #00ff00' }}>Minutes</div>
          </CardItem>
          <CardItem className="bg-transparent p-8 flex flex-col items-center justify-center border border-white/40 rounded-xl shadow-lg transform transition-transform hover:scale-105">
            <div className="text-8xl text-white mb-4 press-start-2p" style={{ textShadow: '0 0 5px #fff, 0 0 15px #00ff00' }}>
              {String(time % 60).padStart(2, '0')}
            </div>
            <div className="press-start-2p text-white text-lg opacity-90" style={{ textShadow: '0 0 3px #fff, 0 0 10px #00ff00' }}>Seconds</div>
          </CardItem>
        </CardContainer>
      </div>
      <div className="w-full mt-8 text-center">
        <Header text="Upcoming Events" />
        <AnimatedListDemo className="mt-4" />
      </div>
    </div>
  );
};
