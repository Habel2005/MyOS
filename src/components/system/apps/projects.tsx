'use client';
import Image from 'next/image';
import type { WindowProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fileSystem } from '@/lib/fs';

export default function Projects({ file }: WindowProps) {
  const projectFile = file || fileSystem.getById('project_a.proj');
  const projectFolder = fileSystem.getById('projects');

  if (projectFolder?.type !== 'folder') return <div>Projects not found</div>;

  const projects = projectFolder.children;
  
  return (
    <div className="flex flex-col h-full bg-background/70 backdrop-blur-sm">
      <ScrollArea className="flex-grow">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">My Work</h1>
          <div className="grid gap-8">
            {projects.map(p => (
              <Card key={p.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {p.type === 'file' && p.url && (
                  <div className="relative h-60 w-full">
                    <Image src={p.url} alt={p.name} layout="fill" objectFit="cover" data-ai-hint="project preview" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {p.type === 'file' && p.content}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
