import { Pressable, StyleSheet, View } from 'react-native';
import type { PressableProps, ViewStyle } from 'react-native';

import { Colors, Radii, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type PaymentOptionProps = Omit<PressableProps, 'children'> & {
  title: string;
  description?: string;
  amount: string;
  selected?: boolean;
  incentive?: string;
};

export function PaymentOption({
  title,
  description,
  amount,
  selected = false,
  incentive,
  style,
  ...props
}: PaymentOptionProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.container,
        selected && styles.selected,
        pressed && styles.pressed,
        typeof style === 'function' ? style({ pressed, hovered: false }) : style,
      ]}>
      <View style={styles.copy}>
        <Text variant="cardTitle">{title}</Text>
        {description && <Text variant="meta">{description}</Text>}
        {incentive && (
          <Text variant="data" tone="primary" uppercase>
            {incentive}
          </Text>
        )}
      </View>
      <Text variant="screenTitle" tone={selected ? 'primary' : 'default'}>
        {amount}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.dark.glass,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  copy: {
    flex: 1,
    gap: Spacing.xs,
  },
  pressed: {
    opacity: 0.82,
  },
  selected: {
    backgroundColor: 'rgba(62, 226, 140, 0.12)',
    borderColor: Colors.dark.primary,
  } satisfies ViewStyle,
});
