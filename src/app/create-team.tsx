import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ActionTile,
  Button,
  IconButton,
  Input,
  PitchBackground,
  TeamMemberRow,
  Text,
} from '@/components/ui';
import { Colors, Radii, Spacing } from '@/constants/theme';

const inviteCode = 'FUT-4X7B';

const mockRoster = [
  { name: 'Rajan Thapa', role: 'captain' as const },
  { name: 'Dipak Shrestha', role: 'invited' as const },
  { name: 'Bikash Khadka', role: 'invited' as const },
];

export default function CreateTeamRoute() {
  const router = useRouter();
  const [teamName, setTeamName] = useState('');

  return (
    <PitchBackground>
      <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={styles.safeArea}>
        <View style={styles.screen}>
          <View style={styles.header}>
            <IconButton
              icon={<SymbolView name="chevron.left" size={20} tintColor={Colors.dark.text} />}
              label="Go back"
              onPress={() => router.back()}
            />
            <Text variant="screenTitle" uppercase>
              Create your team
            </Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Input
              accessibilityLabel="Team name"
              leading={<SymbolView name="tshirt" size={20} tintColor={Colors.dark.textMuted} />}
              onChangeText={setTeamName}
              placeholder="Team name — e.g. Baneshwor B"
              value={teamName}
            />

            <View style={styles.section}>
              <Text variant="data" tone="muted" uppercase>
                Invite players
              </Text>
              <View style={styles.actionRow}>
                <ActionTile
                  icon={<SymbolView name="link" size={24} tintColor={Colors.dark.primary} />}
                  label="Share link"
                  onPress={() => undefined}
                />
                <ActionTile
                  icon={<SymbolView name="qrcode" size={24} tintColor={Colors.dark.primary} />}
                  label="QR code"
                  onPress={() => undefined}
                />
                <ActionTile
                  icon={<SymbolView name="person.crop.rectangle" size={24} tintColor={Colors.dark.primary} />}
                  label="Team code"
                  onPress={() => undefined}
                />
              </View>
              <View style={styles.codeCard}>
                <Text variant="meta" tone="muted">
                  Share this code to join
                </Text>
                <Text variant="hero" tone="primary">
                  {inviteCode}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text variant="data" tone="muted" uppercase>
                Roster ({mockRoster.length})
              </Text>
              <View style={styles.roster}>
                {mockRoster.map((member) => (
                  <TeamMemberRow key={member.name} memberRole={member.role} name={member.name} />
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              label="Create team"
              leftIcon={<SymbolView name="person.badge.plus" size={20} tintColor={Colors.dark.primaryInk} />}
              onPress={() => router.push('/team-detail')}
              size="large"
            />
            <View style={styles.homeIndicator} />
          </View>
        </View>
      </SafeAreaView>
    </PitchBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    gap: Spacing.xl,
    paddingBottom: 128,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  section: {
    gap: Spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  codeCard: {
    alignItems: 'center',
    backgroundColor: Colors.dark.glass,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    borderWidth: 1,
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  roster: {
    gap: Spacing.sm,
  },
  footer: {
    backgroundColor: 'rgba(9, 17, 13, 0.96)',
    borderTopColor: Colors.dark.glassBorder,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  homeIndicator: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderRadius: Radii.pill,
    height: 4,
    marginBottom: Spacing.xs,
    width: 128,
  },
});
