import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { Colors, Fonts, Radii, Spacing } from '@/constants/theme';
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
  const labelText = accessibilityLabel ?? label ?? props.placeholder;

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text variant="data" tone="muted" uppercase>
          {label}
        </Text>
      )}
      <View style={[styles.field, shape === 'pill' && styles.pill, error && styles.fieldError]}>
        {leading}
        <TextInput
          {...props}
          accessibilityLabel={labelText}
          accessibilityHint={error}
          placeholderTextColor={Colors.dark.textFaint}
          style={[styles.input, style]}
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
    backgroundColor: Colors.dark.glass,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.sm,
    minHeight: 48,
    paddingHorizontal: Spacing.md,
  },
  fieldError: {
    borderColor: Colors.dark.coral,
  },
  pill: {
    borderRadius: Radii.pill,
    minHeight: 48,
    paddingHorizontal: Spacing.lg,
  },
  input: {
    color: Colors.dark.text,
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    minHeight: 46,
    paddingVertical: Spacing.sm,
  },
});
