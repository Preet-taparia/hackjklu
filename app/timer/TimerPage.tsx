"use client";

import React, { useState, useEffect } from 'react';
import itinerary from "@/data/itinerary.json";
import { AnimatedList } from "@/components/magicui/animated-list";

export default function TimerPage() {
  const [time, setTime] = useState(36 * 60 * 60); // 36 hours in seconds
  const [notifications, setNotifications] = useState<{ time: string; event: string }[]>([]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    const dayWiseEvents = [...itinerary.day1Events, ...itinerary.day2Events, ...itinerary.day3Events];
    const activeNotifications = dayWiseEvents.filter(event => event.time >= currentTime);
    setNotifications(activeNotifications);
  }, [time]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0')
    };
  };

  const { hours, minutes, seconds } = formatTime(time);

  const renderCard = (value: string, label: string) => (
    <div style={styles.timerCard}>
      <div style={styles.timerNumber}>{value}</div>
      <div style={styles.timerLabel}>{label}</div>
    </div>
  );

  // Array of background images from the public/judges directory
  const backgroundImages = [
    '/judges/aman.webp',
    '/judges/devendraparihar.webp', // Replace with your actual image names
    '/judges/harshadityagaur.webp', // Replace with your actual image names
    '/judges/nonitmittal.webp', // Replace with your actual image names
  ];

  // Number of rows to cover the entire page
  const numberOfRows = 6; // 6 rows, cycling images

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Background Images with Row-Based Animation */}
      {Array.from({ length: numberOfRows }).map((_, rowIndex) => {
        const direction = rowIndex % 2 === 0 ? 'right' : 'left'; // Alternate directions
        const topPosition = `${rowIndex * (100 / numberOfRows)}%`; // Evenly spaced rows
        const imageIndex = rowIndex % backgroundImages.length; // Cycle through images
        const image = backgroundImages[imageIndex]; // One image per row

        return (
          <div
            key={rowIndex}
            style={{
              position: 'absolute',
              width: '40vw', // Increased from 25vw to 40vw for bigger images
              height: `${100 / numberOfRows + 5}vh`, // Slightly taller rows (21.67vh instead of 16.67vh)
              backgroundImage: `url(${image})`,
              backgroundSize: 'contain', // Show full image
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              zIndex: -1,
              top: topPosition,
              left: direction === 'left' ? '100vw' : '-40vw', // Adjusted for wider images
              animation: `${direction === 'left' ? 'slideLeft' : 'slideRight'} 30s infinite linear`, // Faster: 40s -> 30s
              opacity: 0.7, // Optional: Adjust transparency
            }}
          />
        );
      })}

      {/* Timer and Notifications Content */}
      <div style={{ ...styles.timerContainer, position: 'relative', zIndex: 1 }}>
        <div style={styles.timerDisplay}>
          {renderCard(hours, "Hours")}
          {renderCard(minutes, "Minutes")}
          {renderCard(seconds, "Seconds")}
        </div>
        <div style={{ position: "absolute", top: "10px", right: "10px", textAlign: "right" }}>
          {notifications.map((notification, index) => (
            <div key={index} style={{ background: "#444", color: "#fff", padding: "10px", margin: "5px", borderRadius: "5px" }}>
              <strong>{notification.event}</strong> - {notification.time}
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS for smooth animations */}
      <style jsx>{`
        @keyframes slideRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100vw + 40vw)); // Adjusted for wider images
          }
        }
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100vw - 40vw)); // Adjusted for wider images
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  timerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for contrast
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  },
  timerTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  timerDisplay: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    width: '100%',
  },
  timerCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '200px',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '2px solid white',
    borderRadius: '10px',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    textShadow: 'none',
  },
  timerNumber: {
    textShadow: '0 0 3px #00ff00, 0 0 6px #00ff00, 0 0 9px #00ff00',
  },
  timerLabel: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#ccc',
    marginTop: '1rem',
    textShadow: 'none',
  },
};