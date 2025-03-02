'use client';

import dynamic from 'next/dynamic';
import { Timer } from '@/components/Timer/Timer';

const HeaderSmallComponent = dynamic(() => import('@/components/HeaderSmall/HeaderSmall'), {
  ssr: false
});

export default function TimerPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeaderSmallComponent text="Timer" />
      <section className="container mx-auto px-4 py-12">
        <Timer />
      </section>
    </main>
  );
} 