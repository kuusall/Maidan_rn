import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Avatar, Badge, Card, FeatureScreen, Header, SegmentedControl, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

const filters = [
  { label: 'Recruitment', value: 'recruitment' },
  { label: 'Applied', value: 'applied' },
] as const;

export default function FindMatchRecruitmentRoute() {
  const router = useRouter();
  const posts = [
    { team: 'Baneshwor Blazers', need: 'Looking for a goalkeeper', time: 'Tomorrow 7 PM', distance: '0.8 km' },
    { team: 'Thamel FC', need: 'Need 2 midfielders', time: 'Sat 6 PM', distance: '1.4 km' },
  ];

  return (
    <FeatureScreen>
      <Header title="Find a squad" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SegmentedControl options={filters} value="recruitment" onChange={() => undefined} />
        <View style={styles.list}>
          {posts.map((post) => (
            <Card key={post.team} variant="strong" style={styles.card}>
              <View style={styles.top}>
                <View style={styles.identity}>
                  <Avatar name={post.team} size={44} />
                  <View style={styles.copy}>
                    <Text variant="cardTitle">{post.team}</Text>
                    <Text variant="meta" tone="muted">
                      {post.distance} away
                    </Text>
                  </View>
                </View>
                <Badge label="Recruiting" variant="turf" />
              </View>
              <Text variant="screenTitle" uppercase>
                {post.need}
              </Text>
              <View style={styles.meta}>
                <SymbolView name="clock" size={16} tintColor={Colors.dark.primary} />
                <Text variant="data" tone="muted">
                  {post.time}
                </Text>
              </View>
              <Pressable accessibilityRole="button" onPress={() => undefined} style={styles.apply}>
                <Text variant="data" tone="primary" uppercase>
                  Apply to join
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
  top: { alignItems: 'center', flexDirection: 'row', gap: Spacing.md, justifyContent: 'space-between' },
  identity: { alignItems: 'center', flex: 1, flexDirection: 'row', gap: Spacing.md },
  copy: { flex: 1, gap: Spacing.xs },
  meta: { alignItems: 'center', flexDirection: 'row', gap: Spacing.sm },
  apply: { alignItems: 'center', backgroundColor: Colors.dark.glass, borderColor: Colors.dark.glassBorder, borderRadius: 10, borderWidth: 1, minHeight: 40, justifyContent: 'center' },
});
