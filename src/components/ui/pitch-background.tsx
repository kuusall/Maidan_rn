import { StyleSheet, View, type ViewProps } from 'react-native';

import { useAppTheme } from '@/constants/theme';

export type PitchBackgroundProps = ViewProps & {
  lineSpacing?: number;
  lineOpacity?: number;
};

export function PitchBackground({
  lineSpacing = 24,
  lineOpacity = 0.045,
  children,
  style,
  ...props
}: PitchBackgroundProps) {
  const { colors } = useAppTheme();
  const lineCount = Math.ceil(420 / lineSpacing);

  return (
    <View {...props} style={[styles.container, { backgroundColor: colors.pageBackground }, style]}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {Array.from({ length: lineCount }, (_, index) => (
          <View
            key={index}
            style={[
              styles.line,
              {
                left: index * lineSpacing,
                backgroundColor: `rgba(62, 226, 140, ${lineOpacity})`,
              },
            ]}
          />
        ))}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  line: {
    bottom: 0,
    position: 'absolute',
    top: 0,
    width: 1,
  },
});
