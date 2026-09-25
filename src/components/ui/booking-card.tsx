import { StyleSheet, View, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

import { Badge, type BadgeVariant } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Colors, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type BookingCardProps = ViewProps & {
  status: string;
  statusVariant?: BadgeVariant;
  venue: string;
  time: string;
  detail?: string;
  trailing?: ReactNode;
};

export function BookingCard({
  status,
  statusVariant = 'turf',
  venue,
  time,
  detail,
  trailing,
  style,
  ...props
}: BookingCardProps) {
  return (
    <Card {...props} variant="strong" style={style}>
      <View style={styles.top}>
        <Badge label={status} variant={statusVariant} />
        {trailing}
      </View>
      <Text variant="screenTitle" uppercase>
        {venue}
      </Text>
      <View style={styles.meta}>
        <Text variant="meta" tone="muted">
          {time}
        </Text>
        {detail && (
          <Text variant="meta" tone="muted">
            {detail}
          </Text>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  meta: {
    borderTopColor: Colors.dark.glassBorder,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
});
