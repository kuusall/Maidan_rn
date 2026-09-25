import { SymbolView } from 'expo-symbols';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Card, IconButton, Input, Text } from '@/components/ui';
import { Colors, Radii, Shadows, Spacing } from '@/constants/theme';

type Ground = {
  name: string;
  distance: string;
  price: string;
};

type HomeData = {
  grounds: Ground[];
};

type HomeStatus = 'loading' | 'success' | 'error';

const mockHomeData: HomeData = {
  grounds: [
    { name: 'Baneshwor Turf', distance: '0.8 km', price: 'Rs 1000/hr' },
    { name: 'Thamel Kickers', distance: '1.4 km', price: 'Rs 1200/hr' },
  ],
};

function loadMockHomeData(): Promise<HomeData> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockHomeData), 350);
  });
}

export default function HomeRoute() {
  const [status, setStatus] = useState<HomeStatus>('loading');
  const [homeData, setHomeData] = useState<HomeData>({ grounds: [] });
  const [search, setSearch] = useState('');

  const loadHome = () => {
    setStatus('loading');
    void loadMockHomeData()
      .then((data) => {
        setHomeData(data);
        setStatus('success');
      })
      .catch(() => {
        setStatus('error');
      });
  };

  useEffect(() => {
    void loadMockHomeData()
      .then((data) => {
        setHomeData(data);
        setStatus('success');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  const visibleGrounds = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return homeData.grounds;
    }

    return homeData.grounds.filter((ground) =>
      `${ground.name} ${ground.distance} ${ground.price}`.toLowerCase().includes(normalizedSearch),
    );
  }, [homeData.grounds, search]);

  if (status === 'loading') {
    return <HomeShell><LoadingState /></HomeShell>;
  }

  if (status === 'error') {
    return (
      <HomeShell>
        <StateCard
          description="We could not load your nearby grounds. Please try again."
          icon="exclamationmark.triangle"
          title="Something went wrong"
          action={<Button label="Try again" onPress={loadHome} size="small" />}
        />
      </HomeShell>
    );
  }

  return (
    <HomeShell>
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
            <Text variant="screenTitle" uppercase>
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
                <Card key={ground.name} variant="strong" padded={false} style={styles.groundCard}>
                  <View style={styles.pitchGraphic}>
                    <View style={styles.pitchBorder}>
                      <View style={styles.pitchHalfway} />
                      <View style={styles.pitchBox} />
                      <View style={styles.ball}>
                        <SymbolView name="soccerball" size={15} tintColor="#FFFFFF" />
                      </View>
                    </View>
                  </View>
                  <View style={styles.groundDetails}>
                    <Text numberOfLines={1} variant="cardTitle">
                      {ground.name}
                    </Text>
                    <View style={styles.metaRow}>
                      <Text variant="meta" tone="muted">
                        {ground.distance}
                      </Text>
                      <Text variant="meta" tone="muted">
                        {ground.price}
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
            </ScrollView>
          ) : (
            <StateCard
              compact
              description="Try another venue, area, or distance."
              icon="magnifyingglass"
              title="No grounds found"
            />
          )}
        </View>

        <Card variant="strong" style={styles.bookingCard}>
          <View style={styles.bookingTopRow}>
            <Badge label="Upcoming" variant="turf" />
            <Pressable accessibilityLabel="Show booking QR code" accessibilityRole="button">
              <SymbolView name="qrcode" size={20} tintColor={Colors.dark.primary} />
            </Pressable>
          </View>
          <Text variant="screenTitle" uppercase>
            Baneshwor Turf — Ground 2
          </Text>
          <View style={styles.bookingMeta}>
            <Text variant="meta" tone="muted">
              Today · 6 to 7 PM
            </Text>
            <Text variant="meta" tone="muted">
              Advance paid Rs 100
            </Text>
          </View>
        </Card>

        <View style={styles.quickActions}>
          {[
            { label: 'Book slot', icon: <SymbolView name="calendar" size={27} tintColor={Colors.dark.primary} /> },
            { label: 'Find squad', icon: <SymbolView name="person.2" size={27} tintColor={Colors.dark.primary} /> },
            { label: 'Create team', icon: <SymbolView name="tshirt" size={27} tintColor={Colors.dark.primary} /> },
            { label: 'Post challenge', icon: <SymbolView name="bolt" size={27} tintColor={Colors.dark.primary} /> },
          ].map(({ icon, label }) => (
            <Pressable
              key={label}
              accessibilityLabel={label}
              accessibilityRole="button"
              accessibilityHint={`Open ${label}`}
              style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}>
              {icon}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </HomeShell>
  );
}

function HomeShell({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <View pointerEvents="none" style={styles.pitchTexture}>
        {Array.from({ length: 18 }, (_, index) => (
          <View key={index} style={[styles.textureLine, { left: index * 24 }]} />
        ))}
      </View>
      {children}
    </SafeAreaView>
  );
}

function LoadingState() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.skeletonIcon} />
        <View style={styles.loadingGreeting}>
          <View style={styles.skeletonSmall} />
          <View style={styles.skeletonTitle} />
        </View>
        <View style={styles.skeletonIcon} />
      </View>
      <View style={styles.skeletonSearch} />
      <View style={styles.section}>
        <View style={styles.skeletonSectionTitle} />
        <View style={styles.groundsRow}>
          <View style={styles.skeletonGroundCard} />
          <View style={styles.skeletonGroundCard} />
        </View>
      </View>
      <View style={styles.skeletonBooking} />
      <View style={styles.quickActions}>
        {Array.from({ length: 4 }, (_, index) => (
          <View key={index} style={styles.skeletonQuickAction} />
        ))}
      </View>
    </ScrollView>
  );
}

function StateCard({
  action,
  compact = false,
  description,
  icon,
  title,
}: {
  action?: React.ReactNode;
  compact?: boolean;
  description: string;
  icon: 'exclamationmark.triangle' | 'magnifyingglass';
  title: string;
}) {
  return (
    <Card variant="strong" style={[styles.stateCard, compact && styles.compactStateCard]}>
      <SymbolView name={icon} size={compact ? 22 : 28} tintColor={Colors.dark.primary} />
      <Text variant="cardTitle">{title}</Text>
      <Text style={styles.stateDescription} variant="meta" tone="muted">
        {description}
      </Text>
      {action}
    </Card>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.dark.pageBackground,
    flex: 1,
  },
  pitchTexture: {
    ...StyleSheet.absoluteFill,
    opacity: 0.6,
  },
  textureLine: {
    backgroundColor: 'rgba(62, 226, 140, 0.035)',
    bottom: 0,
    position: 'absolute',
    top: 0,
    width: 1,
  },
  content: {
    gap: 20,
    paddingBottom: 104,
    paddingHorizontal: 20,
    paddingTop: Spacing.sm,
  },
  stateCard: {
    alignItems: 'center',
    gap: Spacing.md,
    justifyContent: 'center',
    minHeight: 190,
    paddingHorizontal: Spacing.xl,
  },
  compactStateCard: {
    minHeight: 120,
    paddingVertical: Spacing.lg,
  },
  stateDescription: {
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greeting: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  section: {
    gap: Spacing.sm,
  },
  groundsRow: {
    gap: 14,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  groundCard: {
    borderRadius: Radii.lg,
    overflow: 'hidden',
    width: 204,
    padding: 10,
  },
  pitchGraphic: {
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: Radii.md,
    borderWidth: 1,
    backgroundColor: '#153A2D',
    height: 96,
    padding: Spacing.sm,
  },
  pitchBorder: {
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: Radii.sm,
    borderWidth: 1,
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  pitchHalfway: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    bottom: 0,
    left: '50%',
    position: 'absolute',
    top: 0,
    width: 1,
  },
  pitchBox: {
    borderColor: 'rgba(255,255,255,0.3)',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    bottom: Spacing.sm,
    left: 0,
    position: 'absolute',
    top: Spacing.sm,
    width: 24,
  },
  ball: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#06271A',
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: Radii.pill,
    borderWidth: 1,
    height: 26,
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    width: 26,
  },
  groundDetails: {
    gap: Spacing.sm,
    paddingBottom: Spacing.xs,
    paddingHorizontal: Spacing.xs,
    paddingTop: 10,
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  bookingCard: {
    borderRadius: Radii.lg,
    gap: Spacing.md,
  },
  bookingTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingMeta: {
    gap: Spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    paddingTop: Spacing.xs,
  },
  quickAction: {
    alignItems: 'center',
    backgroundColor: Colors.dark.glass,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    borderWidth: 1,
    gap: Spacing.sm,
    height: 80,
    justifyContent: 'center',
    minWidth: 140,
    flexBasis: 140,
    flexGrow: 1,
    ...Shadows.floating,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  skeletonIcon: {
    backgroundColor: Colors.dark.glassElevated,
    borderRadius: Radii.md,
    height: 44,
    width: 44,
  },
  loadingGreeting: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  skeletonSmall: {
    backgroundColor: Colors.dark.glassElevated,
    borderRadius: Radii.sm,
    height: 12,
    width: 84,
  },
  skeletonTitle: {
    backgroundColor: Colors.dark.glassElevated,
    borderRadius: Radii.sm,
    height: 18,
    width: 132,
  },
  skeletonSearch: {
    backgroundColor: Colors.dark.glass,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.pill,
    borderWidth: 1,
    height: 48,
  },
  skeletonSectionTitle: {
    backgroundColor: Colors.dark.glassElevated,
    borderRadius: Radii.sm,
    height: 18,
    width: 132,
  },
  skeletonGroundCard: {
    backgroundColor: Colors.dark.glassElevated,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    height: 174,
    width: 204,
  },
  skeletonBooking: {
    backgroundColor: Colors.dark.glassElevated,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    height: 150,
  },
  skeletonQuickAction: {
    backgroundColor: Colors.dark.glass,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    flexBasis: 140,
    flexGrow: 1,
    height: 80,
  },
});
