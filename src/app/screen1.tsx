import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { Button, Card, PitchBackground, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

export default function ScreenOneRoute() {
  const router = useRouter();

  return (
    <PitchBackground>
      <View style={styles.container}>
        <View style={styles.logo}>
          <SymbolView name="soccerball" size={48} tintColor={Colors.dark.primary} />
        </View>
        <Text variant="hero" tone="primary" uppercase>
          Maidan
        </Text>
        <Text style={styles.tagline} variant="body" tone="muted">
          Find your match. Book your ground. Build your squad.
        </Text>
        <Card variant="strong" style={styles.card}>
          <Text variant="screenTitle" uppercase>
            Play more. Together.
          </Text>
          <Text variant="body" tone="muted">
            Discover nearby pitches, meet players, and keep every booking in one place.
          </Text>
          <Button label="Get started" onPress={() => router.replace('/(tabs)')} size="large" />
        </Card>
      </View>
    </PitchBackground>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1, gap: Spacing.lg, justifyContent: 'center', padding: Spacing.xl },
  logo: { alignItems: 'center', backgroundColor: 'rgba(62,226,140,0.14)', borderColor: Colors.dark.glassBorder, borderRadius: 32, borderWidth: 1, height: 96, justifyContent: 'center', width: 96 },
  tagline: { maxWidth: 280, textAlign: 'center' },
  card: { gap: Spacing.md, width: '100%' },
});
