import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import type { ReactNode } from 'react';

import { Radii, Shadows, Spacing, useAppTheme } from '@/constants/theme';
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
  const { colors } = useAppTheme();
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
        {
          backgroundColor: variant === 'primary' ? colors.primary : variant === 'secondary' ? colors.glassElevated : 'transparent',
          borderColor: colors.glassBorder,
          borderWidth: variant === 'ghost' || variant === 'secondary' ? 1 : 0,
          ...Shadows.floating,
        },
        buttonSizes[size],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        typeof style === 'function' ? style({ pressed, hovered: false }) : style,
      ]}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.primaryInk : colors.primary} />
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

const buttonSizes: Record<ButtonSize, ViewStyle> = {
  small: { minHeight: 36, paddingHorizontal: Spacing.md },
  medium: { minHeight: 48, paddingHorizontal: Spacing.lg },
  large: { minHeight: 56, paddingHorizontal: Spacing.xl },
};
