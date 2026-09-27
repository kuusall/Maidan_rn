import { SymbolView } from 'expo-symbols';
import { useMemo, useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Href, router } from 'expo-router';
import * as Haptics from 'expo-haptics';

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
import { useTabPadding } from '@/hooks/useTabPadding';

type Ground = {
  name: string;
  distance: string;
  price: string;
};

type QuickAction = {
  label: string;
  icon: 'calendar' | 'person.2' | 'tshirt' | 'bolt' | 'creditcard' | 'bell';
  route: Href;
};

const mockGrounds: Ground[] = [
  { name: 'Baneshwor Turf', distance: '0.8 km', price: 'Rs 1000/hr' },
  { name: 'Thamel Kickers', distance: '1.4 km', price: 'Rs 1200/hr' },
  { name: 'Kirtipur Arena', distance: '2.2 km', price: 'Rs 900/hr' },
  { name: 'Tribhuvan Ground', distance: '3.1 km', price: 'Rs 800/hr' },
  { name: 'Swayambhu Field', distance: '4.5 km', price: 'Rs 700/hr' },
];

const quickActions: QuickAction[] = [
  { label: 'Book slot', icon: 'calendar', route: '/book-a-ground' },
  { label: 'Find squad', icon: 'person.2', route: '/find-match-challenges' },
  { label: 'Create team', icon: 'tshirt', route: '/create-team' },
  { label: 'Post challenge', icon: 'bolt', route: '/post' },
  { label: 'My Wallet', icon: 'creditcard', route: '/wallet' },
  { label: 'Alerts', icon: 'bell', route: '/notification' },
];

export default function HomeRoute() {
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { bottomPadding } = useTabPadding();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const visibleGrounds = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    if (!query) {
      return mockGrounds;
    }

    return mockGrounds.filter((ground) =>
      `${ground.name} ${ground.distance} ${ground.price}`.toLowerCase().includes(query),
    );
  }, [debouncedSearch]);

  const groundWidth = Math.min(220, Math.max(196, width - Spacing.xl * 2 - Spacing.md));

  const handleActionPress = (route: Href) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route);
  };

  return (
    <PitchBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: bottomPadding }]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <IconButton
              icon={<SymbolView name="line.3.horizontal" size={20} tintColor={Colors.dark.text} />}
              label="Open menu"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push('/screen-drawer');
              }}
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
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push('/booking-ticket');
              }}
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

          <View style={styles.prioritySection}>
            <Text variant="screenTitle" uppercase style={styles.sectionTitle}>
              Upcoming Match
            </Text>
            <BookingCard
              detail="Advance paid Rs 100"
              status="Upcoming"
              time="Today · 6 to 7 PM"
              trailing={
                <IconButton
                  icon={<SymbolView name="qrcode" size={20} tintColor={Colors.dark.primary} />}
                  label="Show booking QR code"
                  size={36}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    router.push('/booking-ticket');
                  }}
                />
              }
              venue="Baneshwor Turf — Ground 2"
            />
          </View>

          <View style={styles.section}>
            <Text variant="screenTitle" uppercase style={styles.sectionTitle}>
              Nearby grounds
            </Text>
            {visibleGrounds.length > 0 ? (
              <ScrollView
                contentContainerStyle={styles.groundsRow}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {visibleGrounds.map((ground) => (
                  <Pressable
                    key={ground.name}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      router.push('/booking-ticket');
                    }}
                    style={{ width: groundWidth }}
                  >
                    <GroundCard
                      distance={ground.distance}
                      name={ground.name}
                      price={ground.price}
                      style={{ width: '100%' }}
                    />
                  </Pressable>
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

          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <Pressable
                accessibilityHint={`Open ${action.label}`}
                accessibilityLabel={action.label}
                accessibilityRole="button"
                key={action.label}
                onPress={() => handleActionPress(action.route)}
                style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}>
                <SymbolView name={action.icon} size={24} tintColor={Colors.dark.primary} />
                <Text variant="data" style={styles.actionLabel}>
                  {action.label}
                </Text>
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
  prioritySection: {
    gap: Spacing.sm,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.xs,
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
    height: 90,
    justifyContent: 'center',
    gap: Spacing.xs,
    minWidth: 0,
    ...Shadows.floating,
  },
  actionLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
