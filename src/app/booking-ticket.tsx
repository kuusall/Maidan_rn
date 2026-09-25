import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Badge, Button, FeatureScreen, Header, TicketCard, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

export default function BookingTicketRoute() {
  const router = useRouter();

  return (
    <FeatureScreen>
      <Header title="Booking ticket" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.status}>
          <Badge label="Confirmed" variant="turf" />
          <Text variant="meta" tone="muted">
            Show this pass at the venue
          </Text>
        </View>
        <TicketCard
          code="MDN-24091"
          metadata={[
            { label: 'Date', value: 'Today' },
            { label: 'Time', value: '6–7 PM' },
            { label: 'Ground', value: '2' },
          ]}
          qr={
            <View style={styles.qr}>
              <SymbolView name="qrcode" size={52} tintColor={Colors.dark.primaryInk} />
            </View>
          }
          subtitle="Baneshwor Turf · Kathmandu"
          title="Baneshwor Turf"
        />
        <Button label="Add to wallet" leftIcon={<SymbolView name="wallet.pass" size={18} tintColor={Colors.dark.primaryInk} />} onPress={() => undefined} />
      </ScrollView>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.xl, paddingBottom: Spacing.xxl, paddingTop: Spacing.md },
  status: { alignItems: 'center', gap: Spacing.sm },
  qr: { alignItems: 'center', backgroundColor: '#EAF6EF', borderRadius: Spacing.sm, justifyContent: 'center', padding: Spacing.sm },
});
