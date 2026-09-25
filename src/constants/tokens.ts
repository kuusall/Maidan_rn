import { Platform } from 'react-native';

export const colors = {
  dark: {
    pageBackground: '#0A1310',
    surface: '#0D1712',
    surfaceElevated: '#141B18',
    surfaceMuted: '#0A100D',
    text: '#EAF6EF',
    textMuted: '#93A79C',
    textFaint: '#5E7268',
    primary: '#3EE28C',
    primaryStrong: '#1F9A5E',
    primaryInk: '#06170D',
    amber: '#FFB74A',
    blue: '#5B8CFF',
    coral: '#FF6B5E',
    glass: 'rgba(255, 255, 255, 0.06)',
    glassElevated: 'rgba(255, 255, 255, 0.10)',
    glassBorder: 'rgba(255, 255, 255, 0.14)',
    scrim: 'rgba(0, 0, 0, 0.7)',
  },
  light: {
    pageBackground: '#F1EDE1',
    surface: '#FFFDF2',
    surfaceElevated: '#DED8C9',
    surfaceMuted: '#F0EBDC',
    text: '#263E3B',
    textMuted: '#526C67',
    textFaint: '#78908A',
    primary: '#0B5C63',
    primaryStrong: '#083F45',
    primaryInk: '#FFFDF2',
    amber: '#A86112',
    blue: '#245A73',
    coral: '#B9473F',
    glass: 'rgba(255, 255, 255, 0.58)',
    glassElevated: 'rgba(255, 255, 255, 0.78)',
    glassBorder: 'rgba(11, 92, 99, 0.18)',
    scrim: 'rgba(23, 51, 50, 0.34)',
  },
} as const;

export type ThemeMode = keyof typeof colors;
export type AppColors = (typeof colors)[ThemeMode];

export const typography = {
  family: {
    display: 'Rajdhani',
    body: 'Manrope',
    data: 'Roboto Mono',
  },
  size: {
    hero: 38,
    screenTitle: 17,
    cardTitle: 13.5,
    body: 14,
    meta: 12,
    data: 11,
  },
  lineHeight: {
    hero: 38,
    screenTitle: 18,
    body: 22,
    meta: 16,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const shadows = {
  floating: {
    shadowColor: colors.dark.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;

export const layout = {
  contentMaxWidth: 800,
  tabBarHeight: 60,
  bottomInset: Platform.select({ ios: 50, android: 80, default: 0 }) ?? 0,
} as const;
