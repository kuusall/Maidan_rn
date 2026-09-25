import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ActionTile, BookingCard, FeatureScreen, Header, StatCard, TeamMemberRow, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';

export default function MyTeamRoute() {
  const router = useRouter();

  return (
    <FeatureScreen>
      <Header title="My team" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text variant="hero" tone="primary" uppercase>
            Baneshwor Blazers
          </Text>
          <Text variant="meta">Captain · 7 members</Text>
        </View>
        <View style={styles.metrics}>
          <StatCard icon={<SymbolView name="message" size={22} tintColor="#3EE28C" />} label="12 unread" value="Chat" />
          <StatCard icon={<SymbolView name="calendar" size={22} tintColor="#3EE28C" />} label="Next slot" value="8 PM" />
        </View>
        <View style={styles.section}>
          <Text variant="screenTitle" uppercase>
            Roster
          </Text>
          <TeamMemberRow memberRole="captain" name="Rajan Thapa" />
          <TeamMemberRow memberRole="member" name="Dipak Shrestha" />
          <TeamMemberRow memberRole="dummy" name="Anil Basnet" />
        </View>
        <View style={styles.actions}>
          <ActionTile icon={<SymbolView name="person.badge.plus" size={24} tintColor="#3EE28C" />} label="Post recruitment" onPress={() => router.push('/find-match-recruitment')} />
          <ActionTile icon={<SymbolView name="bolt" size={24} tintColor="#3EE28C" />} label="Post challenge" onPress={() => router.push('/find-match-challenges')} />
        </View>
        <BookingCard detail="Today · 8 to 9 PM" status="Upcoming booking" time="Baneshwor Turf" venue="Next team slot" />
      </ScrollView>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.xl, paddingBottom: Spacing.xxl, paddingTop: Spacing.md },
  hero: { gap: Spacing.xs },
  metrics: { flexDirection: 'row', gap: Spacing.sm },
  section: { gap: Spacing.sm },
  actions: { flexDirection: 'row', gap: Spacing.sm },
});
