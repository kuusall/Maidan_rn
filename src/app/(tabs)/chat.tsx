import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet } from 'react-native';

import { Avatar, FeatureScreen, Header, ListRow } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

export default function ChatRoute() {
  return (
    <FeatureScreen bottomInset={112}>
      <Header title="Chat" right={<SymbolView name="square.and.pencil" size={20} tintColor={Colors.dark.primary} />} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ListRow leading={<Avatar name="Baneshwor Blazers" size={46} />} subtitle="I’m in. Let’s book Baneshwor Turf." title="Baneshwor Blazers" trailing={<SymbolView name="chevron.right" size={18} tintColor={Colors.dark.textFaint} />} />
        <ListRow leading={<Avatar name="Kickers United" size={46} />} subtitle="Challenge accepted for Saturday." title="Kickers United" trailing={<SymbolView name="chevron.right" size={18} tintColor={Colors.dark.textFaint} />} />
        <ListRow leading={<Avatar name="Maidan community" size={46} />} subtitle="Welcome to the local football community." title="Maidan Community" trailing={<SymbolView name="chevron.right" size={18} tintColor={Colors.dark.textFaint} />} />
      </ScrollView>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.sm, paddingBottom: Spacing.xxl, paddingTop: Spacing.md },
});
