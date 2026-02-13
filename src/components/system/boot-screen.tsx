'use client';

import { useState, useEffect } from 'react';
import { useOS } from '@/context/os-provider';
import { Progress } from '@/components/ui/progress';
import { AetherLogo } from './aether-logo';

export function BootScreen() {
  const { completeBoot } = useOS();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(completeBoot, 500); // Wait half a second before swapping UI
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [completeBoot]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center gap-6">
        <AetherLogo className="w-24 h-24 text-white" />
        <div className="w-64">
          <Progress value={progress} className="h-2 bg-gray-800" />
        </div>
        <p className="text-sm text-gray-400">Starting Aether OS...</p>
      </div>
    </div>
  );
}
