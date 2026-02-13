'use client';
import Image from 'next/image';
import type { WindowProps } from '@/types';

export default function ImageViewer({ file }: WindowProps) {
  if (!file || !file.url) {
    return <div className="p-4 bg-black text-white">No image to display.</div>;
  }

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      <Image
        src={file.url}
        alt={file.name}
        fill
        className="object-contain"
        data-ai-hint="portfolio image"
      />
    </div>
  );
}
