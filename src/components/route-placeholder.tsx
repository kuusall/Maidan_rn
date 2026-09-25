import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

type RoutePlaceholderProps = {
  title: string;
};

export function RoutePlaceholder({ title }: RoutePlaceholderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>MAIDAN</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>Screen foundation ready for implementation.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.xl,
    backgroundColor: Colors.dark.pageBackground,
  },
  eyebrow: {
    color: Colors.dark.primary,
    fontFamily: Fonts.data,
    fontSize: 11,
    letterSpacing: 2,
  },
  title: {
    color: Colors.dark.text,
    fontFamily: Fonts.display,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: Colors.dark.textMuted,
    fontFamily: Fonts.body,
    fontSize: 14,
  },
});
