import {
  StyleSheet,
  Text as NativeText,
  type TextStyle,
  type TextProps as NativeTextProps,
} from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

export type TextVariant = 'hero' | 'screenTitle' | 'cardTitle' | 'body' | 'meta' | 'data';
export type TextTone = 'default' | 'muted' | 'faint' | 'primary' | 'amber' | 'blue' | 'coral';

export type TextProps = NativeTextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  uppercase?: boolean;
};

export function Text({
  style,
  variant = 'body',
  tone = 'default',
  uppercase = false,
  ...props
}: TextProps) {
  return (
    <NativeText
      accessibilityRole={props.accessibilityRole ?? 'text'}
      {...props}
      style={[
        styles.base,
        variantStyles[variant],
        toneStyles[tone],
        uppercase && styles.uppercase,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: Colors.dark.text,
    fontFamily: Fonts.body,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});

const variantStyles: Record<TextVariant, TextStyle> = {
  hero: { fontFamily: Fonts.display, fontSize: 38, fontWeight: '700', lineHeight: 38 },
  screenTitle: { fontFamily: Fonts.display, fontSize: 17, fontWeight: '700', lineHeight: 18 },
  cardTitle: { fontFamily: Fonts.display, fontSize: 13.5, fontWeight: '600', lineHeight: 17 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 22 },
  meta: { color: Colors.dark.textMuted, fontSize: 12, fontWeight: '400', lineHeight: 16 },
  data: {
    fontFamily: Fonts.data,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    lineHeight: 16,
  },
};

const toneStyles: Record<TextTone, TextStyle> = {
  default: {},
  muted: { color: Colors.dark.textMuted },
  faint: { color: Colors.dark.textFaint },
  primary: { color: Colors.dark.primary },
  amber: { color: Colors.dark.amber },
  blue: { color: Colors.dark.blue },
  coral: { color: Colors.dark.coral },
};
