import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.dark.pageBackground,
    card: Colors.dark.surface,
    border: Colors.dark.glassBorder,
    text: Colors.dark.text,
    primary: Colors.dark.primary,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.dark.pageBackground },
        }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="screen-drawer" options={{ presentation: 'modal' }} />
        <Stack.Screen name="notification" />
        <Stack.Screen name="wallet" />
        <Stack.Screen name="team-detail" />
        <Stack.Screen name="team-chat" />
        <Stack.Screen name="booking-ticket" />
      </Stack>
    </ThemeProvider>
  );
}
