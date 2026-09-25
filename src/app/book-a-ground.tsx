import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, Card, FeatureScreen, Header, PaymentOption, SegmentedControl, Text } from '@/components/ui';
import { Colors, Radii, Spacing } from '@/constants/theme';

const dates = [
  { label: 'Today', value: 'today' },
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: 'Sat 21', value: 'sat' },
] as const;

const slots = ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];

export default function BookAGroundRoute() {
  const router = useRouter();

  return (
    <FeatureScreen>
      <Header title="Book a ground" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card variant="strong" style={styles.hero}>
          <View style={styles.pitch}>
            <View style={styles.pitchHalf} />
            <View style={styles.pitchBox} />
            <SymbolView name="soccerball" size={22} tintColor="#FFFFFF" />
          </View>
          <Text variant="screenTitle" uppercase>
            Baneshwor Turf
          </Text>
          <Text variant="meta">Ground 2 · 5-a-side · 0.8 km away</Text>
        </Card>

        <View style={styles.section}>
          <Text variant="screenTitle" uppercase>
            Choose date
          </Text>
          <SegmentedControl options={dates} value="today" onChange={() => undefined} />
        </View>

        <View style={styles.section}>
          <Text variant="screenTitle" uppercase>
            Available slots
          </Text>
          <View style={styles.slotGrid}>
            {slots.map((slot, index) => (
              <Card key={slot} variant={index === 1 ? 'strong' : 'glass'} style={styles.slot}>
                <Text variant="data" tone={index === 1 ? 'primary' : 'default'}>
                  {slot}
                </Text>
                <Text variant="meta" tone="muted">
                  Rs 1000
                </Text>
              </Card>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="screenTitle" uppercase>
            Payment
          </Text>
          <PaymentOption
            amount="Rs 100"
            description="Pay now to reserve your slot"
            incentive="Rs 20 cashback"
            selected
            title="Advance payment"
          />
          <PaymentOption amount="Rs 1000" description="Pay the full amount now" title="Full payment" />
        </View>

        <Button label="Continue to booking" onPress={() => router.push('/booking-ticket')} size="large" />
      </ScrollView>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.xl, paddingBottom: Spacing.xxl, paddingTop: Spacing.md },
  hero: { gap: Spacing.sm },
  pitch: {
    alignItems: 'center',
    backgroundColor: Colors.dark.primaryStrong,
    borderRadius: Radii.md,
    height: 150,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  pitchHalf: { backgroundColor: 'rgba(255,255,255,0.35)', height: 1, position: 'absolute', width: '100%' },
  pitchBox: { borderColor: 'rgba(255,255,255,0.35)', borderWidth: 1, height: 84, position: 'absolute', width: 120 },
  section: { gap: Spacing.md },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  slot: { flexBasis: '47%', flexGrow: 1, gap: Spacing.xs, minWidth: 120, padding: Spacing.md },
});
