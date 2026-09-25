import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ChatBubble, FeatureScreen, Header, IconButton, Input } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

export default function TeamChatRoute() {
  const router = useRouter();

  return (
    <FeatureScreen bottomInset={Spacing.lg}>
      <Header
        title="Team chat"
        subtitle="Baneshwor Blazers · 7 members"
        onBack={() => router.back()}
        right={<SymbolView name="person.3" size={18} tintColor={Colors.dark.primary} />}
      />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
          <ChatBubble message="Anyone free for a practice match tomorrow?" timestamp="6:42 PM" />
          <ChatBubble direction="outgoing" message="I’m in. Let’s book Baneshwor Turf." timestamp="6:45 PM" />
          <ChatBubble message="Perfect, I’ll check the available slots." timestamp="6:46 PM" />
          <ChatBubble direction="outgoing" message="Nice. See you all at 8." timestamp="6:47 PM" />
        </ScrollView>
        <Input
          accessibilityLabel="Message"
          placeholder="Write a message"
          trailing={<IconButton icon={<SymbolView name="arrow.up" size={18} tintColor={Colors.dark.primaryInk} />} label="Send message" size={34} variant="primary" />}
        />
      </View>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, gap: Spacing.md, paddingTop: Spacing.md },
  messages: { flexGrow: 1, justifyContent: 'flex-end', paddingBottom: Spacing.md },
});
