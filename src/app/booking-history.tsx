import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Badge, Card, FeatureScreen, Header, SegmentedControl, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';

const filters = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
] as const;

export default function BookingHistoryRoute() {
  const router = useRouter();
  const bookings = [
    { venue: 'Baneshwor Turf · Ground 2', time: 'Today · 6 to 7 PM', status: 'Upcoming', variant: 'turf' as const },
    { venue: 'Thamel Kickers · Ground 1', time: 'Sun · 4 to 5 PM', status: 'Completed', variant: 'neutral' as const },
  ];

  return (
    <FeatureScreen>
      <Header title="Booking history" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SegmentedControl options={filters} value="upcoming" onChange={() => undefined} />
        <View style={styles.list}>
          {bookings.map((booking) => (
            <Card key={booking.venue} variant="strong" style={styles.card}>
              <View style={styles.top}>
                <View style={styles.copy}>
                  <Text variant="cardTitle">{booking.venue}</Text>
                  <Text variant="meta" tone="muted">
                    {booking.time}
                  </Text>
                </View>
                <Badge label={booking.status} variant={booking.variant} />
              </View>
              <View style={styles.meta}>
                <SymbolView name="receipt" size={16} tintColor="#93A79C" />
                <Text variant="data" tone="muted">
                  Booking ID · MDN-24091
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.xl, paddingBottom: Spacing.xxl, paddingTop: Spacing.md },
  list: { gap: Spacing.md },
  card: { gap: Spacing.md },
  top: { alignItems: 'flex-start', flexDirection: 'row', gap: Spacing.md, justifyContent: 'space-between' },
  copy: { flex: 1, gap: Spacing.xs },
  meta: { alignItems: 'center', flexDirection: 'row', gap: Spacing.sm },
});
