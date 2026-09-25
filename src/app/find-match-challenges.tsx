import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Badge, Card, FeatureScreen, Header, SegmentedControl, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

const filters = [
  { label: 'Challenges', value: 'challenges' },
  { label: 'Nearby', value: 'nearby' },
] as const;

export default function FindMatchChallengesRoute() {
  const router = useRouter();
  const challenges = [
    { team: 'Kickers United', time: 'Tomorrow · 9 PM', venue: 'Samakhusi Futsal', distance: '1.8 km' },
    { team: 'Lalitpur Lions', time: 'Sat · 7 PM', venue: 'United Futsal', distance: '3.2 km' },
  ];

  return (
    <FeatureScreen>
      <Header title="Find match" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SegmentedControl options={filters} value="challenges" onChange={() => undefined} />
        <View style={styles.list}>
          {challenges.map((challenge) => (
            <Card key={challenge.team} variant="strong" style={styles.card}>
              <View style={styles.top}>
                <View style={styles.copy}>
                  <Text variant="screenTitle" uppercase>
                    {challenge.team}
                  </Text>
                  <Text variant="meta" tone="muted">
                    {challenge.venue} · {challenge.distance}
                  </Text>
                </View>
                <Badge label="Open" variant="coral" />
              </View>
              <View style={styles.info}>
                <SymbolView name="calendar" size={16} tintColor={Colors.dark.primary} />
                <Text variant="data" tone="muted">
                  {challenge.time}
                </Text>
              </View>
              <Pressable accessibilityRole="button" onPress={() => undefined} style={styles.apply}>
                <Text variant="data" tone="primary" uppercase>
                  View challenge
                </Text>
              </Pressable>
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
  info: { alignItems: 'center', flexDirection: 'row', gap: Spacing.sm },
  apply: { alignItems: 'center', backgroundColor: Colors.dark.glass, borderColor: Colors.dark.glassBorder, borderRadius: 10, borderWidth: 1, minHeight: 40, justifyContent: 'center' },
});
