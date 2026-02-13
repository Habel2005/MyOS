'use client';
import { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import type { WindowInstance, OSContextType, File } from '@/types';
import { appsById } from '@/lib/apps';

const OSContext = createContext<OSContextType | undefined>(undefined);

type State = {
  windows: WindowInstance[];
  activeWindowId: string | null;
  nextZIndex: number;
  isBooted: boolean;
};

type Action =
  | { type: 'OPEN_APP'; payload: { appId: string; file?: File } }
  | { type: 'CLOSE_WINDOW'; payload: string }
  | { type: 'FOCUS_WINDOW'; payload: string }
  | { type: 'MINIMIZE_WINDOW'; payload: string }
  | { type: 'TOGGLE_MAXIMIZE_WINDOW'; payload: string }
  | { type: 'UPDATE_WINDOW_POSITION'; payload: { id: string; position: { x: number; y: number } } }
  | { type: 'UPDATE_WINDOW_SIZE'; payload: { id: string; size: { width: number; height: number } } }
  | { type: 'COMPLETE_BOOT' };

const initialState: State = {
  windows: [],
  activeWindowId: null,
  nextZIndex: 100,
  isBooted: false,
};

const osReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN_APP': {
      const { appId, file } = action.payload;
      const app = appsById[appId];
      if (!app) return state;

      const newWindow: WindowInstance = {
        id: `win-${Date.now()}`,
        appId,
        title: file?.name || app.title,
        position: { x: 50 + state.windows.length * 20, y: 50 + state.windows.length * 20 },
        size: app.defaultSize || { width: 640, height: 480 },
        minimized: false,
        maximized: false,
        zIndex: state.nextZIndex,
        file: file,
      };

      return {
        ...state,
        windows: [...state.windows, newWindow],
        activeWindowId: newWindow.id,
        nextZIndex: state.nextZIndex + 1,
      };
    }
    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter((win) => win.id !== action.payload),
      };
    case 'FOCUS_WINDOW': {
      if (action.payload === state.activeWindowId) return state;
      return {
        ...state,
        windows: state.windows.map((win) =>
          win.id === action.payload ? { ...win, zIndex: state.nextZIndex } : win
        ),
        activeWindowId: action.payload,
        nextZIndex: state.nextZIndex + 1,
      };
    }
    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((win) =>
          win.id === action.payload ? { ...win, minimized: !win.minimized } : win
        ),
        activeWindowId: null,
      };
    case 'TOGGLE_MAXIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((win) => {
          if (win.id === action.payload) {
            const isMaximized = !win.maximized;
            return {
              ...win,
              maximized: isMaximized,
              prevPosition: isMaximized ? win.position : win.prevPosition,
              prevSize: isMaximized ? win.size : win.prevSize,
              position: isMaximized ? { x: 0, y: 0 } : win.prevPosition || win.position,
              size: isMaximized ? { width: window.innerWidth, height: window.innerHeight - 32 - 88 } : win.prevSize || win.size,
            };
          }
          return win;
        }),
      };
    case 'UPDATE_WINDOW_POSITION':
        return {
          ...state,
          windows: state.windows.map((win) =>
            win.id === action.payload.id ? { ...win, position: action.payload.position } : win
          ),
        };
    case 'UPDATE_WINDOW_SIZE':
        return {
          ...state,
          windows: state.windows.map((win) =>
            win.id === action.payload.id ? { ...win, size: action.payload.size } : win
          ),
        };
    case 'COMPLETE_BOOT':
      return {
        ...state,
        isBooted: true,
      };
    default:
      return state;
  }
};

const OSProviderContent = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(osReducer, initialState);
  const { theme, setTheme } = useTheme();

  const openApp = useCallback((appId: string, file?: File) => dispatch({ type: 'OPEN_APP', payload: { appId, file } }), []);
  const closeWindow = useCallback((id: string) => dispatch({ type: 'CLOSE_WINDOW', payload: id }), []);
  const focusWindow = useCallback((id: string) => dispatch({ type: 'FOCUS_WINDOW', payload: id }), []);
  const minimizeWindow = useCallback((id: string) => dispatch({ type: 'MINIMIZE_WINDOW', payload: id }), []);
  const toggleMaximizeWindow = useCallback((id: string) => dispatch({ type: 'TOGGLE_MAXIMIZE_WINDOW', payload: id }), []);
  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => dispatch({ type: 'UPDATE_WINDOW_POSITION', payload: { id, position } }), []);
  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => dispatch({ type: 'UPDATE_WINDOW_SIZE', payload: { id, size } }), []);
  const completeBoot = useCallback(() => dispatch({ type: 'COMPLETE_BOOT' }), []);

  const value = {
    ...state,
    theme: theme || 'dark',
    setTheme,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updateWindowPosition,
    updateWindowSize,
    completeBoot,
  };

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}


export const OSProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <OSProviderContent>{children}</OSProviderContent>
    </NextThemesProvider>
  )
};

export const useOS = (): OSContextType => {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
