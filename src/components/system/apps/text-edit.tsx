'use client';
import type { WindowProps } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function TextEdit({ file }: WindowProps) {
  return (
    <ScrollArea className="h-full w-full bg-card">
      <pre className="font-body text-sm p-4 whitespace-pre-wrap">
        {file?.content || 'This is a blank document.'}
      </pre>
    </ScrollArea>
  );
}
