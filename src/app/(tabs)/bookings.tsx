import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Badge, Card, FeatureScreen, Header, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

export default function BookingsRoute() {
  return (
    <FeatureScreen bottomInset={112}>
      <Header title="Bookings" right={<Badge label="2 upcoming" variant="turf" />} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {[
          { venue: 'Baneshwor Turf', ground: 'Ground 2', time: 'Today · 6 to 7 PM', status: 'Upcoming' },
          { venue: 'Thamel Kickers', ground: 'Ground 1', time: 'Sat · 4 to 5 PM', status: 'Upcoming' },
        ].map((booking) => (
          <Card key={booking.venue} variant="strong" style={styles.card}>
            <View style={styles.top}>
              <View style={styles.copy}>
                <Text variant="screenTitle" uppercase>
                  {booking.venue}
                </Text>
                <Text variant="meta" tone="muted">
                  {booking.ground} · {booking.time}
                </Text>
              </View>
              <Badge label={booking.status} variant="turf" />
            </View>
            <View style={styles.actions}>
              <Text variant="data" tone="primary">
                Rs 100 advance
              </Text>
              <SymbolView name="qrcode" size={22} tintColor={Colors.dark.primary} />
            </View>
          </Card>
        ))}
      </ScrollView>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.md, paddingBottom: Spacing.xxl, paddingTop: Spacing.md },
  card: { gap: Spacing.md },
  top: { alignItems: 'flex-start', flexDirection: 'row', gap: Spacing.md, justifyContent: 'space-between' },
  copy: { flex: 1, gap: Spacing.xs },
  actions: { alignItems: 'center', borderTopColor: Colors.dark.glassBorder, borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', justifyContent: 'space-between', paddingTop: Spacing.md },
});
