import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { PitchBackground } from '@/components/ui/pitch-background';

export type FeatureScreenProps = {
  children: React.ReactNode;
  bottomInset?: number;
};

export function FeatureScreen({ children, bottomInset = Spacing.xxl }: FeatureScreenProps) {
  return (
    <PitchBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <View style={[styles.content, { paddingBottom: bottomInset }]}>{children}</View>
      </SafeAreaView>
    </PitchBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
});
