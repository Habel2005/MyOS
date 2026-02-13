'use client';

import { Desktop } from '@/components/system/desktop';
import { Dock } from '@/components/system/dock';
import { MenuBar } from '@/components/system/menu-bar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useOS } from '@/context/os-provider';
import { BootScreen } from '@/components/system/boot-screen';

export default function Home() {
  const { isBooted } = useOS();
  const wallpaper = PlaceHolderImages.find(img => img.id === 'wallpaper');

  if (!isBooted) {
    return <BootScreen />;
  }

  return (
    <main 
      className="flex flex-col h-screen bg-background bg-cover bg-center animate-fade-in" 
      style={{ backgroundImage: `url(${wallpaper?.imageUrl})` }}
    >
      <MenuBar />
      <Desktop />
      <Dock />
    </main>
  );
}
