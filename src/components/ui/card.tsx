import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';

import { Colors, Radii, Shadows, Spacing } from '@/constants/theme';

export type CardVariant = 'glass' | 'strong' | 'solid';

export type CardProps = ViewProps & {
  variant?: CardVariant;
  padded?: boolean;
};

export function Card({ variant = 'glass', padded = true, style, ...props }: CardProps) {
  return (
    <View
      accessibilityRole="summary"
      {...props}
      style={[styles.base, cardVariants[variant], padded && styles.padded, style]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    borderWidth: 1,
  },
  padded: {
    padding: Spacing.lg,
  },
});

const cardVariants: Record<CardVariant, ViewStyle> = {
  glass: { backgroundColor: Colors.dark.glass },
  strong: { backgroundColor: Colors.dark.glassElevated, ...Shadows.floating },
  solid: { backgroundColor: Colors.dark.surface },
};
