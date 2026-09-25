import { StyleSheet, View, type ViewProps } from 'react-native';

import { Colors, Radii, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type ChatBubbleProps = ViewProps & {
  message: string;
  timestamp?: string;
  direction?: 'incoming' | 'outgoing';
};

export function ChatBubble({
  message,
  timestamp,
  direction = 'incoming',
  style,
  ...props
}: ChatBubbleProps) {
  const outgoing = direction === 'outgoing';

  return (
    <View {...props} style={[styles.wrapper, outgoing ? styles.outgoingWrapper : styles.incomingWrapper, style]}>
      <View style={[styles.bubble, outgoing ? styles.outgoing : styles.incoming]}>
        <Text>{message}</Text>
        {timestamp && (
          <Text variant="data" tone="muted">
            {timestamp}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: Radii.lg,
    gap: Spacing.xs,
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  incoming: {
    backgroundColor: Colors.dark.glassElevated,
    borderBottomLeftRadius: Radii.sm,
  },
  incomingWrapper: {
    alignItems: 'flex-start',
  },
  outgoing: {
    backgroundColor: 'rgba(62, 226, 140, 0.16)',
    borderBottomRightRadius: Radii.sm,
  },
  outgoingWrapper: {
    alignItems: 'flex-end',
  },
  wrapper: {
    flexDirection: 'row',
    marginVertical: Spacing.xs,
    width: '100%',
  },
});
