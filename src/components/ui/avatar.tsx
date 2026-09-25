import { StyleSheet, View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

import { useAppTheme } from '@/constants/theme';
import { Text } from '@/components/ui/text';

export type AvatarProps = {
  source?: ImageSource;
  name?: string;
  label?: string;
  size?: number;
};

export function Avatar({ source, name, label, size = 44 }: AvatarProps) {
  const { colors } = useAppTheme();
  const initials = name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View
      accessibilityLabel={label ?? (name ? `Avatar for ${name}` : 'Avatar')}
      accessibilityRole="image"
      style={[styles.base, { backgroundColor: colors.glassElevated, borderColor: colors.glassBorder, height: size, width: size, borderRadius: size / 2 }]}>
      {source ? (
        <Image contentFit="cover" source={source} style={styles.image} />
      ) : (
        <Text variant="cardTitle" tone="primary">
          {initials ?? '?'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
