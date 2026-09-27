import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AppThemeProvider, useAppTheme } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AppThemeProvider>
      <ThemedNavigation />
    </AppThemeProvider>
  );
}

function ThemedNavigation() {
  const { colors } = useAppTheme();
  const navigationTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colors.pageBackground,
      card: colors.surface,
      border: colors.glassBorder,
      text: colors.text,
      primary: colors.primary,
    },
  };

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.pageBackground },
        }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="screen-drawer" options={{ presentation: 'modal' }} />
        <Stack.Screen name="notification" />
        <Stack.Screen name="wallet" />
        <Stack.Screen name="create-team" />
        <Stack.Screen name="team-detail" />
        <Stack.Screen name="team-chat" />
        <Stack.Screen name="booking-ticket" />
        <Stack.Screen name="book-a-ground" />
        <Stack.Screen name="booking-history" />
        <Stack.Screen name="find-match-challenges" />
        <Stack.Screen name="find-match-recruitment" />
        <Stack.Screen name="my-team" />
        <Stack.Screen name="post" />
        <Stack.Screen name="screen1" />
      </Stack>
    </ThemeProvider>
  );
}
