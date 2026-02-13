import React from 'react';
import { Terminal, FileCode, User, FolderKanban, Globe, Image as ImageIcon, FileText } from 'lucide-react';
import Finder from '@/components/system/apps/finder';
import TerminalApp from '@/components/system/apps/terminal';
import About from '@/components/system/apps/about';
import Projects from '@/components/system/apps/projects';
import Browser from '@/components/system/apps/browser';
import ImageViewer from '@/components/system/apps/image-viewer';
import TextEdit from '@/components/system/apps/text-edit';

export interface App {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.FC<any>;
  defaultSize?: { width: number; height: number };
  resizable?: boolean;
}

export const APPS: App[] = [
  {
    id: 'finder',
    title: 'Finder',
    icon: <FileCode className="w-8 h-8" />,
    component: Finder,
    defaultSize: { width: 700, height: 500 },
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: <Terminal className="w-8 h-8" />,
    component: TerminalApp,
    defaultSize: { width: 600, height: 400 },
  },
  {
    id: 'about',
    title: 'About Me',
    icon: <User className="w-8 h-8" />,
    component: About,
    defaultSize: { width: 400, height: 500 },
    resizable: false,
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <FolderKanban className="w-8 h-8" />,
    component: Projects,
    defaultSize: { width: 800, height: 600 },
  },
  {
    id: 'browser',
    title: 'Browser',
    icon: <Globe className="w-8 h-8" />,
    component: Browser,
    defaultSize: { width: 900, height: 700 },
  },
  {
    id: 'image-viewer',
    title: 'Image Viewer',
    icon: <ImageIcon className="w-8 h-8" />,
    component: ImageViewer,
    defaultSize: { width: 800, height: 600 },
  },
  {
    id: 'text-edit',
    title: 'TextEdit',
    icon: <FileText className="w-8 h-8" />,
    component: TextEdit,
    defaultSize: { width: 600, height: 450 },
  },
];

export const appsById = APPS.reduce((acc, app) => {
  acc[app.id] = app;
  return acc;
}, {} as Record<string, App>);
