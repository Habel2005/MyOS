'use client';
import { useState, useMemo } from 'react';
import { Folder, File as FileIcon, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import type { WindowProps } from '@/types';
import { useOS } from '@/context/os-provider';
import { fileSystem, type FSObject } from '@/lib/fs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

export default function Finder({ window: w, file }: WindowProps) {
  const { openApp } = useOS();
  const [history, setHistory] = useState<string[]>([file?.id || 'root']);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const currentFolderId = history[historyIndex];
  const currentFolder = useMemo(() => {
    const fsObject = fileSystem.getById(currentFolderId);
    return fsObject?.type === 'folder' ? fsObject : fileSystem.root;
  }, [currentFolderId]);

  const navigate = (folderId: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(folderId);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const goHome = () => navigate('root');

  const handleOpen = (item: FSObject) => {
    if (item.type === 'folder') {
      navigate(item.id);
    } else {
      openApp(item.appId, item);
    }
  };

  return (
    <div className="flex h-full bg-card">
      <aside className="w-48 bg-background/50 p-2 border-r flex flex-col">
        <div className="flex items-center gap-1 mb-2">
            <Button variant="ghost" size="icon" onClick={goBack} disabled={historyIndex === 0}><ArrowLeft/></Button>
            <Button variant="ghost" size="icon" onClick={goForward} disabled={historyIndex < history.length - 1}><ArrowRight/></Button>
            <Button variant="ghost" size="icon" onClick={goHome}><Home/></Button>
        </div>
        <h3 className="font-bold px-2 mb-2 text-sm">Favorites</h3>
        <ul>
          {(fileSystem.root.children.filter(c => c.type === 'folder') as FSObject[]).map(item => (
            <li key={item.id}>
              <button onClick={() => navigate(item.id)} className={`w-full text-left flex items-center gap-2 p-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground ${currentFolderId === item.id ? 'bg-accent/80' : ''}`}>
                <Folder className="w-4 h-4 text-primary" />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1">
        <div className="p-2 border-b text-sm font-medium text-muted-foreground">{currentFolder.name}</div>
        <ScrollArea className="h-[calc(100%-2.25rem)]">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 p-4">
            {currentFolder.children.map(item => (
              <div key={item.id} onDoubleClick={() => handleOpen(item)} className="flex flex-col items-center text-center gap-2 p-2 rounded-lg hover:bg-accent/50 cursor-pointer">
                {item.type === 'folder' ? <Folder className="w-12 h-12 text-primary" /> : <FileIcon className="w-12 h-12 text-muted-foreground" />}
                <span className="text-xs break-all">{item.name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
