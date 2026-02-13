'use client';

import Image from 'next/image';
import type { WindowProps } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function About({ file }: WindowProps) {
  const profilePic = PlaceHolderImages.find((img) => img.id === 'profile');

  return (
    <div className="flex flex-col h-full bg-secondary/40 p-4">
      <Card className="w-full max-w-sm mx-auto my-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center text-center p-6">
          <Avatar className="w-24 h-24 mb-4">
            {profilePic && 
              <AvatarImage 
                src={profilePic.imageUrl} 
                alt="Profile Picture" 
                data-ai-hint={profilePic.imageHint}
              />
            }
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">Aether Plexus</h1>
          <p className="text-muted-foreground">Creative Web Architect</p>
        </CardHeader>
        <CardContent className="p-6 pt-0 text-center">
          <p className="text-sm text-foreground/80">
            {file?.content ||
              "I'm a passionate developer creating beautiful and functional web experiences. This portfolio is a showcase of my skills in front-end development, UI/UX design, and creating interactive applications."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
