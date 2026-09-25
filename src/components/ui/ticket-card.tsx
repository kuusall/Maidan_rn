import { StyleSheet, View, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import { Colors, Radii, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type TicketCardProps = ViewProps & {
  title: string;
  subtitle?: string;
  metadata?: readonly { label: string; value: string }[];
  code?: string;
  qr?: ReactNode;
};

export function TicketCard({ title, subtitle, metadata, code, qr, style, ...props }: TicketCardProps) {
  return (
    <Card {...props} padded={false} variant="strong" style={[styles.card, style]}>
      <View style={styles.content}>
        <View style={styles.copy}>
          <Text variant="screenTitle" uppercase>
            {title}
          </Text>
          {subtitle && <Text variant="meta">{subtitle}</Text>}
        </View>
        {qr && <View style={styles.qr}>{qr}</View>}
      </View>
      <View style={styles.divider} />
      <View style={styles.metadata}>
        {metadata?.map((item) => (
          <View key={item.label} style={styles.metaItem}>
            <Text variant="data" tone="muted" uppercase>
              {item.label}
            </Text>
            <Text variant="cardTitle">{item.value}</Text>
          </View>
        ))}
      </View>
      {code && (
        <Text variant="data" tone="primary">
          {code}
        </Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radii.lg,
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.lg,
    padding: Spacing.lg,
  },
  copy: {
    flex: 1,
    gap: Spacing.xs,
  },
  divider: {
    borderTopColor: Colors.dark.glassBorder,
    borderTopWidth: 1,
    borderStyle: 'dashed',
  },
  metaItem: {
    flex: 1,
    gap: Spacing.xs,
  },
  metadata: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  qr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
