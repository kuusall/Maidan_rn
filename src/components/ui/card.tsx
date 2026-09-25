import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';

import { Radii, Shadows, Spacing, useAppTheme } from '@/constants/theme';

export type CardVariant = 'glass' | 'strong' | 'solid';

export type CardProps = ViewProps & {
  variant?: CardVariant;
  padded?: boolean;
};

export function Card({ variant = 'glass', padded = true, style, ...props }: CardProps) {
  const { colors } = useAppTheme();
  const variantStyle: ViewStyle =
    variant === 'glass'
      ? { backgroundColor: colors.glass }
      : variant === 'strong'
        ? { backgroundColor: colors.glassElevated, ...Shadows.floating }
        : { backgroundColor: colors.surface };

  return (
    <View
      accessibilityRole="summary"
      {...props}
      style={[styles.base, { borderColor: colors.glassBorder }, variantStyle, padded && styles.padded, style]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radii.lg,
    borderWidth: 1,
  },
  padded: {
    padding: Spacing.lg,
  },
});
