import { Pressable, StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';

import { Colors, Radii, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type BottomNavigationItem<T extends string> = {
  label: string;
  value: T;
  icon: ReactNode;
};

export type BottomNavigationProps<T extends string> = {
  items: readonly BottomNavigationItem<T>[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel?: string;
};

export function BottomNavigation<T extends string>({
  items,
  value,
  onChange,
  accessibilityLabel = 'Bottom navigation',
}: BottomNavigationProps<T>) {
  return (
    <View accessibilityLabel={accessibilityLabel} accessibilityRole="tablist" style={styles.wrapper}>
      <View style={styles.bar}>
        {items.map((item) => {
          const selected = item.value === value;

          return (
            <Pressable
              accessibilityLabel={item.label}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              key={item.value}
              onPress={() => onChange(item.value)}
              style={({ pressed }) => [styles.item, selected && styles.selected, pressed && styles.pressed]}>
              {item.icon}
              <Text variant="data" tone={selected ? 'primary' : 'faint'}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    backgroundColor: 'rgba(22, 34, 28, 0.92)',
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    height: 68,
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.sm,
  },
  item: {
    alignItems: 'center',
    borderRadius: Radii.md,
    flex: 1,
    gap: Spacing.xs,
    justifyContent: 'center',
    minHeight: 48,
  },
  pressed: {
    opacity: 0.75,
  },
  selected: {
    backgroundColor: 'rgba(62, 226, 140, 0.1)',
    borderColor: 'rgba(62, 226, 140, 0.2)',
    borderWidth: 1,
  },
  wrapper: {
    paddingHorizontal: Spacing.lg,
  },
});
