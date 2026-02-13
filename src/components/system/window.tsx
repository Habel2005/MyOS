'use client';
import { useRef } from 'react';
import type { WindowInstance } from '@/types';
import { useOS } from '@/context/os-provider';
import { useDraggable } from '@/hooks/use-draggable';
import { cn } from '@/lib/utils';
import { X, Minus, Square } from 'lucide-react';
import { appsById } from '@/lib/apps';

interface WindowProps {
  children: React.ReactNode;
  window: WindowInstance;
}

export function Window({ children, window: win }: WindowProps) {
  const {
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useOS();

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  useDraggable(headerRef, windowRef, win.maximized);

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startSize = win.size;
    const startPosition = e.screenX;
    const isRightEdge = e.currentTarget.classList.contains('right');
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = isRightEdge 
        ? startSize.width + (moveEvent.screenX - startPosition)
        : startSize.width - (moveEvent.screenX - startPosition);
      
      if (newWidth > 300) {
        updateWindowSize(win.id, { width: newWidth, height: win.size.height });
      }
    };
    
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const app = appsById[win.appId];
  const isResizable = app.resizable !== false;

  return (
    <div
      ref={windowRef}
      className={cn(
        'absolute rounded-lg shadow-2xl bg-card border border-white/10 flex flex-col overflow-hidden animate-window-open',
        { 'transition-all duration-200': win.maximized },
        win.minimized ? 'opacity-0 pointer-events-none' : 'opacity-100',
        activeWindowId === win.id ? 'z-40' : 'z-30'
      )}
      style={{
        width: win.maximized ? '100%' : win.size.width,
        height: win.maximized ? '100%' : win.size.height,
        top: win.maximized ? 0 : win.position.y,
        left: win.maximized ? 0 : win.position.x,
        ...(win.maximized && {transform: 'none !important'}),
      }}
      onMouseDown={() => focusWindow(win.id)}
    >
      <div
        ref={headerRef}
        className="flex items-center h-8 bg-white/5 backdrop-blur-md text-white text-xs font-bold pl-2 pr-1 cursor-grab active:cursor-grabbing"
        onDoubleClick={() => isResizable && toggleMaximizeWindow(win.id)}
      >
        <div className="flex items-center gap-1.5">
          <button onClick={() => closeWindow(win.id)} className="w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center group">
             <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={() => minimizeWindow(win.id)} className="w-3.5 h-3.5 bg-yellow-500 rounded-full flex items-center justify-center group">
             <Minus className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100" />
          </button>
          <button disabled={!isResizable} onClick={() => isResizable && toggleMaximizeWindow(win.id)} className="w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center group disabled:bg-gray-500">
             <Square className="w-2 h-2 text-green-800 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="flex-1 text-center truncate pr-16">{win.title}</div>
      </div>
      <div className="flex-1 min-h-0 relative">
        {children}
        {isResizable && !win.maximized && (
          <>
            <div className="absolute -left-1 top-0 bottom-0 w-2 cursor-ew-resize" onMouseDown={handleResize} />
            <div className="absolute -right-1 top-0 bottom-0 w-2 cursor-ew-resize right" onMouseDown={handleResize} />
          </>
        )}
      </div>
    </div>
  );
}
