'use client';

import { useState, useEffect } from 'react';
import { useOS } from '@/context/os-provider';
import { cn } from '@/lib/utils';

export function BootScreen() {
  const { completeBoot } = useOS();
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading and then trigger fade out
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500); // Wait for the intro animation to finish

    return () => clearTimeout(timer);
  }, []);

  // When fade out animation starts, wait for it to finish then complete boot
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        completeBoot();
      }, 500); // Corresponds to CSS transition duration + a small buffer
      return () => clearTimeout(timer);
    }
  }, [isLoaded, completeBoot]);

  return (
    <div className={cn("loader", isLoaded && "hidden")}>
        <svg viewBox="0 0 400 160">
            <text x="50%" y="50%" dy=".32em" textAnchor="middle" className="text-body">
                Habel
            </text>
            <text x="50%" y="50%" dy=".32em" dx="1.5em" textAnchor="middle" className="text-dot">
                .
            </text>
        </svg>
    </div>
  );
}
