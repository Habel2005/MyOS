export type FSObject = Folder | File;

export interface FSBase {
  id: string;
  name: string;
  type: 'folder' | 'file';
  parentId: string | null;
}

export interface Folder extends FSBase {
  type: 'folder';
  children: FSObject[];
}

export interface File extends FSBase {
  type: 'file';
  appId: 'text-edit' | 'image-viewer' | 'projects' | 'browser';
  content?: string;
  url?: string;
}

const root: Folder = {
  id: 'root',
  name: 'Home',
  type: 'folder',
  parentId: null,
  children: [],
};

const documents: Folder = {
  id: 'documents',
  name: 'Documents',
  type: 'folder',
  parentId: 'root',
  children: [],
};

const projects: Folder = {
  id: 'projects',
  name: 'Projects',
  type: 'folder',
  parentId: 'root',
  children: [],
};

const pictures: Folder = {
  id: 'pictures',
  name: 'Pictures',
  type: 'folder',
  parentId: 'root',
  children: [],
};

const aboutMe: File = {
  id: 'about_me.txt',
  name: 'about_me.txt',
  type: 'file',
  appId: 'text-edit',
  parentId: 'documents',
  content: `Hello! I'm a passionate developer creating beautiful and functional web experiences.

This portfolio is a showcase of my skills in front-end development, UI/UX design, and creating interactive applications.

Skills:
- React & Next.js
- TypeScript
- Tailwind CSS
- Node.js
- UI/UX Design

Feel free to explore my projects and get in touch!
`,
};

const projectA: File = {
  id: 'project_a.proj',
  name: 'E-commerce Platform',
  type: 'file',
  appId: 'projects',
  parentId: 'projects',
  content: 'A full-stack e-commerce platform with a modern UI, product management, and a secure checkout process.',
  url: 'https://picsum.photos/seed/proj1/800/600',
};

const projectB: File = {
  id: 'project_b.proj',
  name: 'Task Management App',
  type: 'file',
  appId: 'projects',
  parentId: 'projects',
  content: 'A responsive task management application designed for team collaboration, featuring real-time updates.',
  url: 'https://picsum.photos/seed/proj2/800/600',
};

const projectC: File = {
    id: 'project_c.proj',
    name: 'Data Analytics Dashboard',
    type: 'file',
    appId: 'projects',
    parentId: 'projects',
    content: 'An interactive dashboard for visualizing complex data sets, built with D3.js and React.',
    url: 'https://picsum.photos/seed/proj3/800/600',
};

const profilePic: File = {
  id: 'profile.jpg',
  name: 'profile.jpg',
  type: 'file',
  appId: 'image-viewer',
  parentId: 'pictures',
  url: 'https://picsum.photos/seed/me/400/400',
};

const resume: File = {
  id: 'resume.link',
  name: 'resume.pdf',
  type: 'file',
  appId: 'browser',
  parentId: 'documents',
  url: 'https://example.com',
  content: 'Opens a link to my resume.'
}


documents.children.push(aboutMe, resume);
projects.children.push(projectA, projectB, projectC);
pictures.children.push(profilePic);
root.children.push(documents, projects, pictures);

const fsIndex: Record<string, FSObject> = {};

function buildIndex(object: FSObject) {
  fsIndex[object.id] = object;
  if (object.type === 'folder') {
    object.children.forEach(buildIndex);
  }
}

buildIndex(root);

export const fileSystem = {
  root,
  getById: (id: string) => fsIndex[id],
};
