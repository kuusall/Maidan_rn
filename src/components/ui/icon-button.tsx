import { Pressable, StyleSheet, type PressableProps } from 'react-native';
import type { ReactNode } from 'react';

import { Radii, Shadows, useAppTheme } from '@/constants/theme';

export type IconButtonVariant = 'ghost' | 'filled' | 'primary';

export type IconButtonProps = Omit<PressableProps, 'children'> & {
  icon: ReactNode;
  label: string;
  variant?: IconButtonVariant;
  size?: number;
};

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 44,
  disabled = false,
  style,
  ...props
}: IconButtonProps) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      {...props}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled ?? false }}
      disabled={disabled ?? false}
      hitSlop={8}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: variant === 'primary' ? colors.primary : variant === 'filled' ? colors.glassElevated : 'transparent',
          borderColor: colors.glassBorder,
          borderWidth: variant === 'ghost' || variant === 'filled' ? 1 : 0,
          ...(variant === 'primary' ? Shadows.floating : {}),
        },
        { height: size, width: size },
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        typeof style === 'function' ? style({ pressed, hovered: false }) : style,
      ]}>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: Radii.md,
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
});
