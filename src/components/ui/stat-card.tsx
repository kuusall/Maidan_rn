import { StyleSheet, View, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import { Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type StatCardProps = ViewProps & {
  label: string;
  value: string;
  icon?: ReactNode;
  tone?: 'default' | 'primary' | 'amber' | 'blue' | 'coral';
};

export function StatCard({ label, value, icon, tone = 'primary', style, ...props }: StatCardProps) {
  return (
    <Card {...props} style={[styles.card, style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text variant="data" tone="muted" uppercase>
        {label}
      </Text>
      <Text variant="screenTitle" tone={tone}>
        {value}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    gap: Spacing.sm,
  },
  icon: {
    alignItems: 'flex-start',
  },
});
