import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

import { Colors, Radii, Shadows } from '@/constants/theme';

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
        iconButtonVariants[variant],
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

const iconButtonVariants: Record<IconButtonVariant, ViewStyle> = {
  ghost: { backgroundColor: 'transparent', borderColor: Colors.dark.glassBorder, borderWidth: 1 },
  filled: {
    backgroundColor: Colors.dark.glassElevated,
    borderColor: Colors.dark.glassBorder,
    borderWidth: 1,
  },
  primary: { backgroundColor: Colors.dark.primary, ...Shadows.floating },
};
