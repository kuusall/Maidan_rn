import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, Radii, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type SegmentOption<T extends string> = {
  label: string;
  value: T;
};

export type SegmentedControlProps<T extends string> = {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: SegmentedControlProps<T>) {
  return (
    <View accessibilityLabel={accessibilityLabel} accessibilityRole="tablist" style={styles.container}>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [styles.option, selected && styles.selected, pressed && styles.pressed]}>
            <Text variant="data" tone={selected ? 'default' : 'muted'} uppercase>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.glass,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.xs,
    padding: Spacing.xs,
  },
  option: {
    alignItems: 'center',
    borderRadius: Radii.pill,
    flex: 1,
    justifyContent: 'center',
    minHeight: 36,
    paddingHorizontal: Spacing.md,
  },
  pressed: {
    opacity: 0.8,
  },
  selected: {
    backgroundColor: Colors.dark.primary,
  },
});
