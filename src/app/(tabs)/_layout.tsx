import { Tabs } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs/types';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, Radii, Spacing } from '@/constants/theme';
import { Text } from '@/components/ui';

const tabIcons = {
  index: 'house.fill',
  bookings: 'calendar',
  teams: 'person.3.fill',
  chat: 'message.fill',
  profile: 'person.fill',
} as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={(props) => <FloatingTabBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="bookings" options={{ title: 'Bookings' }} />
      <Tabs.Screen name="teams" options={{ title: 'Teams' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const options = descriptors[route.key].options;
          const label = typeof options.title === 'string' ? options.title : route.name;
          const icon = tabIcons[route.name as keyof typeof tabIcons];

          return (
            <Pressable
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={({ pressed }) => [styles.tab, focused && styles.activeTab, pressed && styles.pressed]}>
              <SymbolView
                name={icon}
                size={20}
                tintColor={focused ? Colors.dark.primary : Colors.dark.textFaint}
              />
              <Text variant="data" tone={focused ? 'primary' : 'faint'}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    bottom: Spacing.lg,
    left: 0,
    paddingHorizontal: Spacing.lg,
    position: 'absolute',
    right: 0,
  },
  bar: {
    alignItems: 'center',
    backgroundColor: 'rgba(22, 34, 28, 0.92)',
    borderColor: Colors.dark.glassBorder,
    borderRadius: Radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    height: 68,
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.sm,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    gap: Spacing.xs,
    justifyContent: 'center',
    minHeight: 48,
  },
  activeTab: {
    backgroundColor: 'rgba(62, 226, 140, 0.1)',
    borderColor: 'rgba(62, 226, 140, 0.2)',
    borderRadius: Radii.md,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});
