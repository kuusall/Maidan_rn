import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import type { ReactNode } from 'react';

import { Colors, Radii, Shadows, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type ButtonVariant = 'primary' | 'ghost' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Button({
  label,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  accessibilityLabel,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...props}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        buttonVariants[variant],
        buttonSizes[size],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        typeof style === 'function' ? style({ pressed, hovered: false }) : style,
      ]}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.dark.primaryInk : Colors.dark.primary} />
      ) : (
        <View style={styles.content}>
          {leftIcon}
          <Text variant="data" tone={variant === 'primary' ? 'default' : 'primary'} uppercase>
            {label}
          </Text>
          {rightIcon}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radii.md,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});

const buttonVariants: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: Colors.dark.primary, ...Shadows.floating },
  ghost: { backgroundColor: 'transparent', borderColor: Colors.dark.glassBorder, borderWidth: 1 },
  secondary: {
    backgroundColor: Colors.dark.glassElevated,
    borderColor: Colors.dark.glassBorder,
    borderWidth: 1,
  },
};

const buttonSizes: Record<ButtonSize, ViewStyle> = {
  small: { minHeight: 36, paddingHorizontal: Spacing.md },
  medium: { minHeight: 48, paddingHorizontal: Spacing.lg },
  large: { minHeight: 56, paddingHorizontal: Spacing.xl },
};
