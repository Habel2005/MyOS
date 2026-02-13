'use client';
import Image from 'next/image';
import { useOS } from '@/context/os-provider';
import { APPS } from '@/lib/apps';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Dock() {
  const { windows, openApp, focusWindow, minimizeWindow } = useOS();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleDockIconClick = (appId: string) => {
    const openWindow = windows.find(w => w.appId === appId && !w.minimized);
    const minimizedWindow = windows.find(w => w.appId === appId && w.minimized);

    if (openWindow) {
      focusWindow(openWindow.id);
    } else if (minimizedWindow) {
      minimizeWindow(minimizedWindow.id); // This will un-minimize
    }
    else {
      openApp(appId);
    }
  };

  if (!isMounted) {
    return null; // Avoid hydration mismatch on animations
  }

  return (
    <div className="flex justify-center items-end p-2 z-50">
      <div className="flex items-end h-20 p-2 space-x-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
        {APPS.map((app, index) => {
          const isRunning = windows.some(w => w.appId === app.id);
          const isMinimized = windows.some(w => w.appId === app.id && w.minimized);

          return (
            <TooltipProvider key={app.id} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => handleDockIconClick(app.id)}
                    className="flex flex-col items-center justify-center space-y-1 group cursor-pointer"
                  >
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center bg-black/20 transition-all duration-200 ease-in-out transform group-hover:-translate-y-2 group-hover:scale-110"
                      onAnimationEnd={(e) => {
                        const target = e.target as HTMLDivElement;
                        if(target.classList.contains('animate-dock-item-jump')){
                           target.classList.remove('animate-dock-item-jump');
                        }
                      }}
                      onClick={(e) => {
                        const target = e.target as HTMLDivElement;
                        if (!isRunning) {
                            target.classList.add('animate-dock-item-jump');
                        }
                      }}
                    >
                      {app.icon}
                    </div>
                    <div
                      className={cn(
                        'w-1.5 h-1.5 rounded-full bg-white/80 transition-opacity duration-300',
                        isRunning ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="mb-2">
                  <p>{app.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}
