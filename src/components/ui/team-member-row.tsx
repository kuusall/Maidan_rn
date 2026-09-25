import { StyleSheet, View, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Badge, type BadgeVariant } from '@/components/ui/badge';
import { Colors, Radii, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type TeamMemberRole = 'captain' | 'member' | 'dummy' | 'invited';

export type TeamMemberRowProps = ViewProps & {
  name: string;
  memberRole: TeamMemberRole;
  trailing?: ReactNode;
};

const roleLabels: Record<TeamMemberRole, string> = {
  captain: 'Captain',
  member: 'Member',
  dummy: 'Dummy',
  invited: 'Invited',
};

const roleVariants: Record<TeamMemberRole, BadgeVariant> = {
  captain: 'turf',
  member: 'blue',
  dummy: 'amber',
  invited: 'blue',
};

export function TeamMemberRow({ name, memberRole, trailing, style, ...props }: TeamMemberRowProps) {
  return (
    <View {...props} style={[styles.container, style]}>
      <View style={styles.identity}>
        <Avatar name={name} size={40} />
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
      </View>
      {trailing ?? <Badge label={roleLabels[memberRole]} variant={roleVariants[memberRole]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.dark.glass,
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'space-between',
    minHeight: 62,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  identity: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.md,
    minWidth: 0,
  },
  name: {
    flex: 1,
  },
});
