'use client';
import { useState } from 'react';
import type { WindowProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, ArrowLeft, ArrowRight, RotateCw, Home, ExternalLink } from 'lucide-react';

export default function Browser({ file }: WindowProps) {
  const initialUrl = file?.url || 'https://www.google.com/webhp?igu=1';
  const [url, setUrl] = useState(initialUrl);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigate = (newUrl: string, addHistory = true) => {
    setUrl(newUrl);
    if (addHistory) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      navigate(history[historyIndex - 1], false);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      navigate(history[historyIndex + 1], false);
    }
  };
  
  const reload = () => {
    const iframe = document.getElementById('browser-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };
  
  const goHome = () => {
    navigate('https://www.google.com/webhp?igu=1');
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center p-2 bg-background border-b gap-1">
        <Button variant="ghost" size="icon" onClick={goBack} disabled={historyIndex === 0}><ArrowLeft /></Button>
        <Button variant="ghost" size="icon" onClick={goForward} disabled={historyIndex === history.length - 1}><ArrowRight /></Button>
        <Button variant="ghost" size="icon" onClick={reload}><RotateCw /></Button>
        <Button variant="ghost" size="icon" onClick={goHome}><Home /></Button>
        <div className="relative flex-grow">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            onKeyDown={(e) => { if(e.key === 'Enter') navigate(url) }}
            className="pl-10"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={() => window.open(url, '_blank')}><ExternalLink /></Button>
      </div>
      <iframe
        id="browser-iframe"
        src={url}
        className="flex-grow w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title="Browser"
      />
    </div>
  );
}
