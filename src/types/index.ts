import type { File } from '@/lib/fs';

export interface WindowInstance {
  id: string;
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  // For restoring from maximized state
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
  file?: File; // optional file to open
}

export interface WindowProps {
  window: WindowInstance;
  file?: File;
}

export interface OSContextType {
  windows: WindowInstance[];
  activeWindowId: string | null;
  theme: string;
  setTheme: (theme: string) => void;
  openApp: (appId: string, file?: File) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

export type { File };
