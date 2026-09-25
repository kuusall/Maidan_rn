import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TeamCard, Text } from '@/components/ui';
import { Colors, Radii, Spacing } from '@/constants/theme';

type MockTeam = {
  initials: string;
  name: string;
  teamRole: 'captain' | 'member';
  memberCount: number;
  booking?: string;
  accent: 'green' | 'blue' | 'amber';
};

const mockTeams: MockTeam[] = [
  {
    initials: 'BB',
    name: 'Baneshwor Blazers',
    teamRole: 'captain',
    memberCount: 7,
    booking: 'Baneshwor Turf · Today 8 PM',
    accent: 'green',
  },
  {
    initials: 'TF',
    name: 'Thamel FC',
    teamRole: 'member',
    memberCount: 6,
    accent: 'blue',
  },
  {
    initials: 'KU',
    name: 'Kickers United',
    teamRole: 'member',
    memberCount: 8,
    booking: 'Samakhusi Futsal · Sat 6 PM',
    accent: 'amber',
  },
];

export default function TeamsRoute() {
  const router = useRouter();

  return (
    <View style={styles.background}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {Array.from({ length: 12 }, (_, index) => (
          <View key={index} style={[styles.stripe, { left: index * 42 }]} />
        ))}
      </View>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title} variant="hero" uppercase>
              My teams
            </Text>
            <Pressable
              accessibilityLabel="Add team"
              accessibilityRole="button"
              onPress={() => router.push('/create-team')}
              style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
              <SymbolView name="plus" size={20} tintColor={Colors.light.primary} />
            </Pressable>
          </View>

          <View style={styles.list}>
            {mockTeams.map((team) => (
              <TeamCard
                key={team.name}
                {...team}
                onPress={() => router.push('/team-detail')}
              />
            ))}
          </View>

          <Pressable
            accessibilityLabel="Create new team"
            accessibilityRole="button"
            onPress={() => router.push('/create-team')}
            style={({ pressed }) => [styles.createButton, pressed && styles.pressed]}>
            <SymbolView name="person.badge.plus" size={20} tintColor={Colors.light.primaryStrong} />
            <Text style={styles.createText} variant="body">
              Create new team
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.light.pageBackground,
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  stripe: {
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
    bottom: 0,
    position: 'absolute',
    top: 0,
    width: 1,
  },
  content: {
    gap: Spacing.xl,
    paddingBottom: 112,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Spacing.sm,
  },
  title: {
    color: Colors.light.text,
    fontSize: 26,
    lineHeight: 30,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: Radii.lg,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  list: {
    gap: Spacing.md,
  },
  createButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
    borderColor: 'rgba(11, 92, 99, 0.18)',
    borderRadius: Radii.lg,
    borderStyle: 'dashed',
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: Spacing.lg,
  },
  createText: {
    color: Colors.light.primaryStrong,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
});
