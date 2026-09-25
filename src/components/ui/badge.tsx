import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Colors, Radii, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type BadgeVariant = 'turf' | 'amber' | 'coral' | 'blue' | 'neutral';

export type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  accessibilityLabel?: string;
};

export function Badge({ label, variant = 'turf', accessibilityLabel }: BadgeProps) {
  return (
    <View
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="text"
      style={[styles.base, badgeVariants[variant]]}>
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

const badgeVariants: Record<BadgeVariant, ViewStyle> = {
  turf: { backgroundColor: 'rgba(62, 226, 140, 0.16)', borderColor: 'rgba(62, 226, 140, 0.3)' },
  amber: { backgroundColor: 'rgba(255, 183, 74, 0.16)', borderColor: 'rgba(255, 183, 74, 0.3)' },
  coral: { backgroundColor: 'rgba(255, 107, 94, 0.16)', borderColor: 'rgba(255, 107, 94, 0.3)' },
  blue: { backgroundColor: 'rgba(91, 140, 255, 0.16)', borderColor: 'rgba(91, 140, 255, 0.3)' },
  neutral: { backgroundColor: Colors.dark.glass, borderColor: Colors.dark.glassBorder },
};
