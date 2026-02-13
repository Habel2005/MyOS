'use client';
import { Folder, File as FileIcon } from 'lucide-react';
import type { FSObject } from '@/lib/fs';
import { useOS } from '@/context/os-provider';

interface DesktopIconProps {
  item: FSObject;
}

export function DesktopIcon({ item }: DesktopIconProps) {
  const { openApp } = useOS();

  const handleDoubleClick = () => {
    if (item.type === 'folder') {
      openApp('finder', item);
    } else {
      openApp(item.appId, item);
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="flex flex-col items-center justify-center text-center gap-1 p-2 rounded-md hover:bg-white/10 w-24 h-24 cursor-pointer"
    >
      {item.type === 'folder' ? (
        <Folder className="w-12 h-12 text-primary drop-shadow-lg" />
      ) : (
        <FileIcon className="w-12 h-12 text-white drop-shadow-lg" />
      )}
      <span className="text-white text-xs font-medium truncate w-full drop-shadow-md">
        {item.name}
      </span>
    </div>
  );
}
