import { SymbolView } from 'expo-symbols';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  BookingCard,
  Card,
  EmptyState,
  GroundCard,
  IconButton,
  Input,
  PitchBackground,
  Text,
} from '@/components/ui';
import { Colors, Radii, Shadows, Spacing } from '@/constants/theme';

type Ground = {
  name: string;
  distance: string;
  price: string;
};

type QuickAction = {
  label: string;
  icon: 'calendar' | 'person.2' | 'tshirt' | 'bolt';
};

const mockGrounds: Ground[] = [
  { name: 'Baneshwor Turf', distance: '0.8 km', price: 'Rs 1000/hr' },
  { name: 'Thamel Kickers', distance: '1.4 km', price: 'Rs 1200/hr' },
  { name: 'Kirtipur Arena', distance: '2.2 km', price: 'Rs 900/hr' },
];

const quickActions: QuickAction[] = [
  { label: 'Book slot', icon: 'calendar' },
  { label: 'Find squad', icon: 'person.2' },
  { label: 'Create team', icon: 'tshirt' },
  { label: 'Post challenge', icon: 'bolt' },
];

export default function HomeRoute() {
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState('');

  const visibleGrounds = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return mockGrounds;
    }

    return mockGrounds.filter((ground) =>
      `${ground.name} ${ground.distance} ${ground.price}`.toLowerCase().includes(query),
    );
  }, [search]);

  const groundWidth = Math.min(220, Math.max(196, width - Spacing.xl * 2 - Spacing.md));

  return (
    <PitchBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <IconButton
              icon={<SymbolView name="line.3.horizontal" size={20} tintColor={Colors.dark.text} />}
              label="Open menu"
            />
            <View style={styles.greeting}>
              <Text variant="meta" tone="muted">
                Good evening
              </Text>
              <Text numberOfLines={1} variant="screenTitle" uppercase>
                Rajan Thapa
              </Text>
            </View>
            <IconButton
              icon={<SymbolView name="qrcode" size={20} tintColor={Colors.dark.text} />}
              label="Scan QR code"
            />
          </View>

          <Input
            accessibilityLabel="Search grounds, area, venue"
            onChangeText={setSearch}
            placeholder="Search grounds, area, venue"
            value={search}
            shape="pill"
            leading={<SymbolView name="magnifyingglass" size={16} tintColor={Colors.dark.textMuted} />}
            trailing={<SymbolView name="location.fill" size={16} tintColor={Colors.dark.primary} />}
          />

          <View style={styles.section}>
            <Text variant="screenTitle" uppercase>
              Nearby grounds
            </Text>
            {visibleGrounds.length > 0 ? (
              <ScrollView
                contentContainerStyle={styles.groundsRow}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {visibleGrounds.map((ground) => (
                  <GroundCard
                    key={ground.name}
                    distance={ground.distance}
                    name={ground.name}
                    price={ground.price}
                    style={{ width: groundWidth }}
                  />
                ))}
              </ScrollView>
            ) : (
              <Card padded={false} variant="strong">
                <EmptyState
                  description="Try another venue, area, or distance."
                  icon={<SymbolView name="magnifyingglass" size={22} tintColor={Colors.dark.primary} />}
                  title="No grounds found"
                />
              </Card>
            )}
          </View>

          <BookingCard
            detail="Advance paid Rs 100"
            status="Upcoming"
            time="Today · 6 to 7 PM"
            trailing={
              <IconButton
                icon={<SymbolView name="qrcode" size={20} tintColor={Colors.dark.primary} />}
                label="Show booking QR code"
                size={36}
              />
            }
            venue="Baneshwor Turf — Ground 2"
          />

          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <Pressable
                accessibilityHint={`Open ${action.label}`}
                accessibilityLabel={action.label}
                accessibilityRole="button"
                key={action.label}
                style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}>
                <SymbolView name={action.icon} size={27} tintColor={Colors.dark.primary} />
              </Pressable>
            ))}
          </View>
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
    paddingBottom: 112,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greeting: {
    alignItems: 'center',
    flex: 1,
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  section: {
    gap: Spacing.sm,
  },
  groundsRow: {
    gap: Spacing.md,
    paddingRight: Spacing.lg,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  quickAction: {
    alignItems: 'center',
    backgroundColor: Colors.dark.glass,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    borderWidth: 1,
    flexBasis: '47%',
    flexGrow: 1,
    height: 80,
    justifyContent: 'center',
    minWidth: 0,
    ...Shadows.floating,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
