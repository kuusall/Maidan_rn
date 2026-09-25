import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import type { ReactNode } from 'react';

import { Spacing, useAppTheme } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type ListRowProps = Omit<PressableProps, 'children'> & {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  emphasized?: boolean;
};

export function ListRow({
  title,
  subtitle,
  leading,
  trailing,
  emphasized = false,
  style,
  ...props
}: ListRowProps) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      {...props}
      accessibilityRole={props.onPress ? 'button' : undefined}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: emphasized ? colors.glass : 'transparent', borderBottomColor: colors.glassBorder },
        emphasized && styles.emphasized,
        pressed && props.onPress && styles.pressed,
        typeof style === 'function' ? style({ pressed, hovered: false }) : style,
      ]}>
      {leading && <View style={styles.leading}>{leading}</View>}
      <View style={styles.copy}>
        <Text variant="cardTitle">{title}</Text>
        {subtitle && <Text variant="meta">{subtitle}</Text>}
      </View>
      {trailing && <View style={styles.trailing}>{trailing}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: Spacing.md,
    minHeight: 64,
    paddingVertical: Spacing.sm,
  },
  copy: {
    flex: 1,
    gap: Spacing.xs,
  },
  emphasized: {
    borderRadius: Spacing.md,
    borderBottomWidth: 0,
    paddingHorizontal: Spacing.md,
  },
  leading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
  trailing: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
