import { Timer } from '@/components/Timer/Timer';
import Image from 'next/image';

export default function LivePage() {
  return (
    <main className="min-h-screen w-full relative bg-black">
      <div className="fixed inset-0 bg-scrolling-pattern animate-bg-scroll"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent" />
      <div className="absolute top-4 left-4">
        <Image 
          src="/hackjklu-logo.webp" 
          alt="HackJKLU Logo" 
          width={60} 
          height={60} 
          className="hover:scale-105 transition-transform"
        />
      </div>
      <div className="relative z-10">
        <Timer />
      </div>
    </main>
  );
}