import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';

export type HeaderProps = {
  title: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onBack?: () => void;
};

export function Header({ title, subtitle, left, right, onBack }: HeaderProps) {
  return (
    <View accessibilityRole="header" style={styles.container}>
      <View style={styles.side}>
        {onBack && <IconButton icon={<Text tone="primary">‹</Text>} label="Go back" onPress={onBack} />}
        {left}
      </View>
      <View style={styles.titleGroup}>
        <Text numberOfLines={1} variant="screenTitle" uppercase>
          {title}
        </Text>
        {subtitle && (
          <Text numberOfLines={1} variant="meta">
            {subtitle}
          </Text>
        )}
      </View>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.md,
    minHeight: 56,
  },
  side: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  titleGroup: {
    alignItems: 'center',
    flex: 2,
    gap: Spacing.xs,
  },
});
