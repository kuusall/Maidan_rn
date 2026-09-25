import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Badge, Card, FeatureScreen, Header, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

export default function NotificationRoute() {
  const router = useRouter();
  const notifications = [
    { title: 'Team invite received', body: 'Dipak invited you to join Baneshwor Blazers.', time: '2m ago', color: 'blue' as const },
    { title: 'Booking confirmed', body: 'Your Baneshwor Turf slot is confirmed for today.', time: '1h ago', color: 'turf' as const },
    { title: 'New challenge', body: 'Kickers United challenged your team.', time: 'Yesterday', color: 'coral' as const },
  ];

  return (
    <FeatureScreen>
      <Header title="Notifications" onBack={() => router.back()} right={<Badge label="3 new" variant="turf" />} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <Card key={notification.title} variant="strong" style={styles.card}>
            <View style={styles.icon}>
              <SymbolView name="bell" size={20} tintColor={Colors.dark.primary} />
            </View>
            <View style={styles.copy}>
              <View style={styles.top}>
                <Text variant="cardTitle">{notification.title}</Text>
                <Text variant="data" tone="muted">
                  {notification.time}
                </Text>
              </View>
              <Text variant="meta" tone="muted">
                {notification.body}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.md, paddingBottom: Spacing.xxl, paddingTop: Spacing.md },
  card: { alignItems: 'center', flexDirection: 'row', gap: Spacing.md },
  icon: { alignItems: 'center', backgroundColor: 'rgba(62,226,140,0.14)', borderRadius: Spacing.md, height: 42, justifyContent: 'center', width: 42 },
  copy: { flex: 1, gap: Spacing.xs },
  top: { alignItems: 'flex-start', flexDirection: 'row', gap: Spacing.sm, justifyContent: 'space-between' },
});
