import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Avatar, Card, FeatureScreen, ListRow, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

export default function ProfileRoute() {
  const router = useRouter();

  return (
    <FeatureScreen bottomInset={112}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profile}>
          <Avatar name="Rajan Thapa" size={76} />
          <Text variant="hero" uppercase>
            Rajan Thapa
          </Text>
          <Text variant="meta">Footballer · Kathmandu</Text>
        </View>
        <Card variant="strong" style={styles.stats}>
          <View>
            <Text variant="screenTitle" tone="primary">12</Text>
            <Text variant="meta">Bookings</Text>
          </View>
          <View>
            <Text variant="screenTitle" tone="primary">3</Text>
            <Text variant="meta">Teams</Text>
          </View>
          <View>
            <Text variant="screenTitle" tone="primary">18</Text>
            <Text variant="meta">Matches</Text>
          </View>
        </Card>
        <ListRow leading={<SymbolView name="bell" size={20} tintColor={Colors.dark.primary} />} onPress={() => router.push('/notification')} title="Notifications" />
        <ListRow leading={<SymbolView name="wallet.pass" size={20} tintColor={Colors.dark.primary} />} onPress={() => router.push('/wallet')} title="Wallet" />
        <ListRow leading={<SymbolView name="gearshape" size={20} tintColor={Colors.dark.primary} />} onPress={() => router.push('/screen-drawer')} title="Settings" />
      </ScrollView>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.md, paddingBottom: Spacing.xxl, paddingTop: Spacing.xl },
  profile: { alignItems: 'center', gap: Spacing.sm, paddingBottom: Spacing.lg },
  stats: { flexDirection: 'row', justifyContent: 'space-around' },
});
