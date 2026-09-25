import {
  StyleSheet,
  Text as NativeText,
  type TextStyle,
  type TextProps as NativeTextProps,
} from 'react-native';

import { Fonts, useAppTheme } from '@/constants/theme';

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
  const { colors } = useAppTheme();

  return (
    <NativeText
      accessibilityRole={props.accessibilityRole ?? 'text'}
      {...props}
      style={[
        styles.base,
        variantStyles[variant],
        { color: colors.text },
        toneStyles(tone, colors),
        uppercase && styles.uppercase,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
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
  meta: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  data: {
    fontFamily: Fonts.data,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    lineHeight: 16,
  },
};

const toneStyles = (tone: TextTone, colors: ReturnType<typeof useAppTheme>['colors']): TextStyle => ({
  color:
    tone === 'muted' ? colors.textMuted :
    tone === 'faint' ? colors.textFaint :
    tone === 'primary' ? colors.primary :
    tone === 'amber' ? colors.amber :
    tone === 'blue' ? colors.blue :
    tone === 'coral' ? colors.coral :
    colors.text,
});
