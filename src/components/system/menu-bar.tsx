'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Sun, Moon, Wifi, BatteryFull, FolderKanban } from 'lucide-react';
import { useOS } from '@/context/os-provider';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-sm font-sans px-3">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
}

export function MenuBar() {
  const { setTheme, theme } = useTheme();
  const { windows, focusWindow } = useOS();

  return (
    <div className="w-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold h-8 flex items-center justify-between px-2 z-50">
      <Menubar className="bg-transparent border-none p-0 h-auto">
        <MenubarMenu>
          <MenubarTrigger className="p-2 h-auto">
            <FolderKanban className="w-4 h-4 text-primary" />
          </MenubarTrigger>
        </MenubarMenu>
        <span className="font-bold text-sm px-2">Aether OS</span>
        <MenubarMenu>
          <MenubarTrigger className="p-2 h-auto">File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Close</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="p-2 h-auto">Edit</MenubarTrigger>
          <MenubarContent>
             <MenubarItem>Undo</MenubarItem>
             <MenubarItem>Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
         <MenubarMenu>
          <MenubarTrigger className="p-2 h-auto">Window</MenubarTrigger>
          <MenubarContent>
            {windows.map(w => (
              <MenubarItem key={w.id} onClick={() => focusWindow(w.id)}>
                {w.title}
              </MenubarItem>
            ))}
             {windows.length === 0 && <MenubarItem disabled>No open windows</MenubarItem>}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      
      <div className="flex items-center space-x-3">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="focus:outline-none">
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <Wifi className="w-4 h-4" />
        <BatteryFull className="w-4 h-4" />
        <Clock />
      </div>
    </div>
  );
}
