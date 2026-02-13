import { Desktop } from '@/components/system/desktop';
import { Dock } from '@/components/system/dock';
import { MenuBar } from '@/components/system/menu-bar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const wallpaper = PlaceHolderImages.find(img => img.id === 'wallpaper');

  return (
    <main 
      className="flex flex-col h-screen bg-background bg-cover bg-center" 
      style={{ backgroundImage: `url(${wallpaper?.imageUrl})` }}
    >
      <MenuBar />
      <Desktop />
      <Dock />
    </main>
  );
}
