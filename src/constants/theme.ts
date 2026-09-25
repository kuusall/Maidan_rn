import { colors, layout, radii, shadows, spacing, typography } from '@/constants/tokens';

export const Colors = colors;
export const Fonts = typography.family;
export const Spacing = spacing;
export const Radii = radii;
export const Shadows = shadows;
export const Layout = layout;

export type ThemeColor = keyof (typeof colors)['dark'];
