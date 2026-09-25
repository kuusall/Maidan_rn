import { ScrollView, StyleSheet, View, type ScrollViewProps, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Layout, Spacing } from '@/constants/theme';

export type ScreenProps = (ViewProps | ScrollViewProps) & {
  scroll?: boolean;
  padded?: boolean;
};

export function Screen({ scroll = false, padded = true, style, children, ...props }: ScreenProps) {
  const content = (
    <View style={[styles.content, padded && styles.padded, style]} {...(props as ViewProps)}>
      {children}
    </View>
  );

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      {scroll ? (
        <ScrollView
          {...(props as ScrollViewProps)}
          contentContainerStyle={[styles.scrollContent, padded && styles.padded, style]}>
          {children}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.dark.pageBackground,
    flex: 1,
  },
  content: {
    flex: 1,
    maxWidth: Layout.contentMaxWidth,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    maxWidth: Layout.contentMaxWidth,
    width: '100%',
  },
  padded: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
});
