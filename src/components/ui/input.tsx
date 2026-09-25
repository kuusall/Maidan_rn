import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { Fonts, Radii, Spacing, useAppTheme } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  shape?: 'default' | 'pill';
};

export function Input({
  label,
  error,
  leading,
  trailing,
  shape = 'default',
  accessibilityLabel,
  style,
  ...props
}: InputProps) {
  const { colors } = useAppTheme();
  const labelText = accessibilityLabel ?? label ?? props.placeholder;

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text variant="data" tone="muted" uppercase>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.field,
          { backgroundColor: colors.glass, borderColor: error ? colors.coral : colors.glassBorder },
          shape === 'pill' && styles.pill,
        ]}>
        {leading}
        <TextInput
          {...props}
          accessibilityLabel={labelText}
          accessibilityHint={error}
          placeholderTextColor={colors.textFaint}
          style={[styles.input, { color: colors.text }, style]}
        />
        {trailing}
      </View>
      {error && (
        <Text variant="meta" tone="coral">
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.sm,
  },
  field: {
    alignItems: 'center',
    borderRadius: Radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.sm,
    minHeight: 48,
    paddingHorizontal: Spacing.md,
  },
  fieldError: {
  },
  pill: {
    borderRadius: Radii.pill,
    minHeight: 48,
    paddingHorizontal: Spacing.lg,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    minHeight: 46,
    paddingVertical: Spacing.sm,
  },
});
