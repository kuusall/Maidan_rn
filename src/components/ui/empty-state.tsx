import { StyleSheet, View, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

import { Colors, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type EmptyStateProps = ViewProps & {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({ title, description, icon, action, style, ...props }: EmptyStateProps) {
  return (
    <View {...props} style={[styles.container, style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text variant="screenTitle" uppercase>
        {title}
      </Text>
      {description && (
        <Text style={styles.description} variant="body" tone="muted">
          {description}
        </Text>
      )}
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.md,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  description: {
    maxWidth: 280,
    textAlign: 'center',
  },
  icon: {
    alignItems: 'center',
    backgroundColor: Colors.dark.glass,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Spacing.xl,
    borderWidth: 1,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
});
