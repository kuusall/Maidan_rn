import { colors, layout, radii, shadows, spacing, typography } from '@/constants/tokens';
import { createContext, createElement, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export const Colors = colors;
export const Fonts = typography.family;
export const Spacing = spacing;
export const Radii = radii;
export const Shadows = shadows;
export const Layout = layout;

export type ThemeColor = keyof (typeof colors)['dark'];
export type ThemeMode = keyof typeof colors;
export type AppColors = (typeof colors)[ThemeMode];

export type AppThemeContextValue = {
  mode: ThemeMode;
  colors: AppColors;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const value = useMemo(
    () => ({
      mode,
      colors: colors[mode],
      setMode,
      toggleMode: () => setMode((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  return createElement(AppThemeContext.Provider, { value }, children);
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }

  return context;
}
