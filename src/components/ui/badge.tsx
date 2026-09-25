import { StyleSheet, View } from 'react-native';

import { Radii, Spacing, useAppTheme } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type BadgeVariant = 'turf' | 'amber' | 'coral' | 'blue' | 'neutral';

export type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  accessibilityLabel?: string;
};

export function Badge({ label, variant = 'turf', accessibilityLabel }: BadgeProps) {
  const { colors } = useAppTheme();
  const color =
    variant === 'neutral' ? colors.textMuted : variant === 'turf' ? colors.primary : colors[variant];
  const backgroundColor = variant === 'neutral' ? colors.glass : `${color}26`;

  return (
    <View
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="text"
      style={[styles.base, { backgroundColor, borderColor: `${color}4D` }]}>
      <Text variant="data" tone={variant === 'neutral' ? 'muted' : variant === 'turf' ? 'primary' : variant} uppercase>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
});
