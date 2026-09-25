import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import type { ReactNode } from 'react';

import { Badge, type BadgeVariant } from '@/components/ui/badge';
import { Colors, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type TeamCardRole = 'captain' | 'member';

export type TeamCardProps = Omit<PressableProps, 'children'> & {
  initials: string;
  name: string;
  teamRole: TeamCardRole;
  memberCount: number;
  booking?: string;
  accent?: 'green' | 'blue' | 'amber';
  trailing?: ReactNode;
};

const roleLabels: Record<TeamCardRole, string> = {
  captain: 'Captain',
  member: 'Member',
};

const roleVariants: Record<TeamCardRole, BadgeVariant> = {
  captain: 'turf',
  member: 'blue',
};

const accentStyles = {
  green: { backgroundColor: '#C8F6D6', color: '#2B8B67' },
  blue: { backgroundColor: '#D7E3FC', color: '#3F6399' },
  amber: { backgroundColor: '#FDE7C7', color: '#9C5A20' },
} as const;

export function TeamCard({
  initials,
  name,
  teamRole,
  memberCount,
  booking,
  accent = 'green',
  trailing,
  style,
  ...props
}: TeamCardProps) {
  const avatarStyle = accentStyles[accent];

  return (
    <Pressable
      {...props}
      accessibilityLabel={props.accessibilityLabel ?? `Open ${name}`}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        typeof style === 'function' ? style({ pressed, hovered: false }) : style,
      ]}>
      <View style={styles.top}>
        <View style={styles.identity}>
          <View style={[styles.avatar, { backgroundColor: avatarStyle.backgroundColor }]}>
            <Text style={{ color: avatarStyle.color }} variant="cardTitle">
              {initials}
            </Text>
          </View>
          <View style={styles.copy}>
            <Text numberOfLines={2} style={styles.name} variant="cardTitle">
              {name}
            </Text>
            <Text variant="meta">
              {teamRole === 'captain' ? 'Captain' : 'Member'} · {memberCount} members
            </Text>
          </View>
        </View>
        {trailing ?? <Badge label={roleLabels[teamRole]} variant={roleVariants[teamRole]} />}
      </View>
      <View style={styles.booking}>
        <Text variant="meta" tone="primary">
          {booking ?? 'No upcoming booking'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.glass,
    borderColor: Colors.light.glassBorder,
    borderRadius: 22,
    borderWidth: 1,
    gap: Spacing.lg,
    padding: Spacing.lg,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  top: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  identity: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.md,
    minWidth: 0,
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 18,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  copy: {
    flex: 1,
    gap: Spacing.xs,
    minWidth: 0,
  },
  name: {
    color: Colors.light.text,
    fontSize: 17,
    lineHeight: 21,
  },
  booking: {
    flexDirection: 'row',
    paddingLeft: 68,
  },
});
