import { StyleSheet, View, type ViewProps } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Card } from '@/components/ui/card';
import { Colors, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type GroundCardProps = ViewProps & {
  name: string;
  distance?: string;
  price?: string;
  action?: React.ReactNode;
};

export function GroundCard({ name, distance, price, action, style, ...props }: GroundCardProps) {
  return (
    <Card {...props} padded={false} variant="strong" style={[styles.card, style]}>
      <View style={styles.pitch}>
        <View style={styles.pitchLine} />
        <View style={styles.pitchBox} />
        <SymbolView name="soccerball" size={18} tintColor="#FFFFFF" />
      </View>
      <View style={styles.details}>
        <View style={styles.copy}>
          <Text numberOfLines={1} variant="cardTitle">
            {name}
          </Text>
          {(distance || price) && (
            <Text variant="meta" tone="muted">
              {[distance, price].filter(Boolean).join(' · ')}
            </Text>
          )}
        </View>
        {action}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    width: 220,
  },
  copy: {
    flex: 1,
    gap: Spacing.xs,
  },
  details: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  pitch: {
    alignItems: 'center',
    backgroundColor: Colors.dark.primaryStrong,
    height: 104,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  pitchBox: {
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    height: 54,
    position: 'absolute',
    width: 76,
  },
  pitchLine: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    height: 1,
    position: 'absolute',
    width: '100%',
  },
});
