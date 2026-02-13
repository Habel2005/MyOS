'use client';
import { useRef, useEffect, useCallback } from 'react';

export function useDraggable(
  headerRef: React.RefObject<HTMLElement>,
  windowRef: React.RefObject<HTMLElement>,
  isMaximized: boolean
) {
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!windowRef.current) return;
    const dx = e.clientX - pos.current.cx;
    const dy = e.clientY - pos.current.cy;
    windowRef.current.style.left = `${pos.current.x + dx}px`;
    windowRef.current.style.top = `${pos.current.y + dy}px`;
  }, [windowRef]);

  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const onMouseDown = useCallback((e: MouseEvent) => {
    if (!windowRef.current || isMaximized) return;
    
    // Only drag with left mouse button
    if (e.button !== 0) return;

    pos.current = {
      cx: e.clientX,
      cy: e.clientY,
      x: windowRef.current.offsetLeft,
      y: windowRef.current.offsetTop,
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [isMaximized, windowRef, onMouseMove, onMouseUp]);

  useEffect(() => {
    const header = headerRef.current;
    if (header) {
      header.addEventListener('mousedown', onMouseDown);
      return () => {
        header.removeEventListener('mousedown', onMouseDown);
      };
    }
  }, [headerRef, onMouseDown]);
}
