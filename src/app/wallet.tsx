import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, Card, FeatureScreen, Header, PaymentOption, Text, TransactionRow } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

export default function WalletRoute() {
  const router = useRouter();

  return (
    <FeatureScreen>
      <Header title="Wallet" onBack={() => router.back()} right={<SymbolView name="receipt" size={20} tintColor={Colors.dark.primary} />} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card variant="strong" style={styles.balance}>
          <Text variant="data" tone="muted" uppercase>
            Available balance
          </Text>
          <Text variant="hero" tone="primary">
            Rs 2,450
          </Text>
          <Text variant="meta">Ready for your next booking</Text>
        </Card>
        <View style={styles.section}>
          <Text variant="screenTitle" uppercase>
            Add money
          </Text>
          <PaymentOption amount="Rs 500" description="Top up with eSewa" title="eSewa" />
          <PaymentOption amount="Rs 1000" description="Top up with Fonepay" selected title="Fonepay" />
          <Button label="Continue" onPress={() => undefined} />
        </View>
        <View style={styles.section}>
          <Text variant="screenTitle" uppercase>
            Recent transactions
          </Text>
          <Card variant="glass" style={styles.transactions}>
            <TransactionRow amount="+ Rs 1,000" leading={<SymbolView name="arrow.down.circle" size={22} tintColor={Colors.dark.primary} />} positive subtitle="Today · Wallet top-up" title="Wallet top-up" />
            <TransactionRow amount="- Rs 100" leading={<SymbolView name="calendar" size={22} tintColor={Colors.dark.coral} />} subtitle="Today · Baneshwor Turf" title="Booking advance" />
            <TransactionRow amount="- Rs 450" leading={<SymbolView name="receipt" size={22} tintColor={Colors.dark.coral} />} subtitle="Yesterday · Full payment" title="Booking payment" />
          </Card>
        </View>
      </ScrollView>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.xl, paddingBottom: Spacing.xxl, paddingTop: Spacing.md },
  balance: { gap: Spacing.sm },
  section: { gap: Spacing.md },
  transactions: { paddingVertical: 0 },
});
