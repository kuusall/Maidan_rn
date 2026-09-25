import { StyleSheet, View, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

import { Colors, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type TransactionRowProps = ViewProps & {
  title: string;
  subtitle?: string;
  amount: string;
  positive?: boolean;
  leading?: ReactNode;
};

export function TransactionRow({
  title,
  subtitle,
  amount,
  positive = false,
  leading,
  style,
  ...props
}: TransactionRowProps) {
  return (
    <View {...props} style={[styles.container, style]}>
      {leading && <View style={styles.leading}>{leading}</View>}
      <View style={styles.copy}>
        <Text variant="cardTitle">{title}</Text>
        {subtitle && <Text variant="meta">{subtitle}</Text>}
      </View>
      <Text variant="cardTitle" tone={positive ? 'primary' : 'default'}>
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: Colors.dark.glassBorder,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: Spacing.md,
    minHeight: 64,
    paddingVertical: Spacing.sm,
  },
  copy: {
    flex: 1,
    gap: Spacing.xs,
  },
  leading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
