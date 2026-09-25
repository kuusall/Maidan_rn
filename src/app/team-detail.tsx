import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ActionTile,
  BookingCard,
  IconButton,
  PitchBackground,
  StatCard,
  TeamMemberRow,
  Text,
} from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

const members = [
  { name: 'Rajan Thapa', role: 'captain' as const },
  { name: 'Dipak Shrestha', role: 'member' as const },
  { name: 'Anil Basnet', role: 'dummy' as const },
];

export default function TeamDetailRoute() {
  const router = useRouter();

  return (
    <PitchBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <IconButton
              icon={<SymbolView name="chevron.left" size={20} tintColor={Colors.dark.text} />}
              label="Go back"
              onPress={() => router.back()}
              size={40}
            />
            <View style={styles.teamHeading}>
              <Text numberOfLines={1} variant="screenTitle" uppercase>
                Baneshwor Blazers
              </Text>
              <Text variant="meta">Captain · 7 members</Text>
            </View>
          </View>

          <View style={styles.metrics}>
            <StatCard
              icon={<SymbolView name="message" size={22} tintColor={Colors.dark.primary} />}
              label="12 unread"
              value="Chat"
            />
            <StatCard
              icon={<SymbolView name="calendar" size={22} tintColor={Colors.dark.primary} />}
              label="Next slot"
              value="8 PM"
            />
          </View>

          <View style={styles.section}>
            <Text variant="screenTitle" uppercase>
              Roster
            </Text>
            <View style={styles.list}>
              {members.map((member) => (
                <TeamMemberRow key={member.name} memberRole={member.role} name={member.name} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="screenTitle" uppercase>
              Captain actions
            </Text>
            <View style={styles.actionRow}>
              <ActionTile
                icon={<SymbolView name="person.badge.plus" size={24} tintColor={Colors.dark.primary} />}
                label="Post recruitment"
                onPress={() => undefined}
              />
              <ActionTile
                icon={<SymbolView name="bolt" size={24} tintColor={Colors.dark.primary} />}
                label="Post challenge"
                onPress={() => undefined}
              />
            </View>
          </View>

          <BookingCard
            detail="Today · 8 to 9 PM"
            status="Upcoming booking"
            time="Baneshwor Turf"
            venue="Next team slot"
          />
        </ScrollView>
      </SafeAreaView>
    </PitchBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    gap: Spacing.xl,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.md,
  },
  teamHeading: {
    flex: 1,
    gap: Spacing.xs,
  },
  metrics: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  section: {
    gap: Spacing.md,
  },
  list: {
    gap: Spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
});
