import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Avatar, Header, ListRow, PitchBackground, Text } from '@/components/ui';
import { Spacing, useAppTheme } from '@/constants/theme';

export default function ScreenDrawerRoute() {
  const router = useRouter();
  const { colors, mode, toggleMode } = useAppTheme();

  return (
    <PitchBackground>
      <View style={[styles.overlay, { backgroundColor: colors.pageBackground }]}>
        <Header title="Menu" onBack={() => router.back()} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.profile}>
            <Avatar name="Rajan Thapa" size={56} />
            <View>
              <Text variant="screenTitle">Rajan Thapa</Text>
              <Text variant="meta">rajan@example.com</Text>
            </View>
          </View>
          <ListRow leading={<SymbolView name="bell" size={20} tintColor={colors.primary} />} subtitle="Manage alerts and reminders" title="Notifications settings" />
          <ListRow leading={<SymbolView name="wallet.pass" size={20} tintColor={colors.primary} />} subtitle="eSewa, Fonepay and wallet" title="Payment methods" />
          <ListRow
            leading={<SymbolView name={mode === 'dark' ? 'sun.max' : 'moon'} size={20} tintColor={colors.primary} />}
            onPress={toggleMode}
            subtitle={mode === 'dark' ? 'Switch to daylight pitch' : 'Switch to night pitch'}
            title="Theme"
            trailing={<Text variant="data" tone="primary">{mode === 'dark' ? 'DARK' : 'LIGHT'}</Text>}
          />
          <ListRow leading={<SymbolView name="questionmark.circle" size={20} tintColor={colors.primary} />} subtitle="Get help with Maidan" title="Help & support" />
        </ScrollView>
      </View>
    </PitchBackground>
  );
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: 'rgba(10,19,16,0.96)', flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm },
  content: { gap: Spacing.sm, paddingBottom: Spacing.xxl, paddingTop: Spacing.lg },
  profile: { alignItems: 'center', flexDirection: 'row', gap: Spacing.md, paddingBottom: Spacing.lg },
});
