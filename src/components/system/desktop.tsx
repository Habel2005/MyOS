'use client';
import { useOS } from '@/context/os-provider';
import { Window } from './window';
import { appsById } from '@/lib/apps';
import { fileSystem } from '@/lib/fs';
import { DesktopIcon } from './desktop-icon';

const desktopItems = fileSystem.root.children;

export function Desktop() {
  const { windows } = useOS();

  return (
    <div className="flex-grow w-full h-full relative overflow-hidden">
       <div className="absolute top-4 left-4 flex flex-col gap-4">
        {desktopItems.map((item) => (
          <DesktopIcon key={item.id} item={item} />
        ))}
      </div>
      {windows.map((win) => {
        const App = appsById[win.appId]?.component;
        if (!App) return null;

        return (
          <Window key={win.id} window={win}>
            <App window={win} file={win.file} />
          </Window>
        );
      })}
    </div>
  );
}
