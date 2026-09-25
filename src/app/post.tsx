import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet } from 'react-native';

import { Button, Card, FeatureScreen, Header, Input, SegmentedControl, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';

const postTypes = [
  { label: 'Recruitment', value: 'recruitment' },
  { label: 'Challenge', value: 'challenge' },
] as const;

export default function PostRoute() {
  const router = useRouter();

  return (
    <FeatureScreen>
      <Header title="Create a post" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SegmentedControl options={postTypes} value="recruitment" onChange={() => undefined} />
        <Card variant="strong" style={styles.form}>
          <Text variant="screenTitle" uppercase>
            Share with the community
          </Text>
          <Input leading={<SymbolView name="person.3" size={18} tintColor="#93A79C" />} placeholder="Team or post title" />
          <Input multiline placeholder="Tell players what you are looking for..." style={styles.textarea} />
          <Button label="Publish post" onPress={() => undefined} size="large" />
        </Card>
      </ScrollView>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.xl, paddingBottom: Spacing.xxl, paddingTop: Spacing.md },
  form: { gap: Spacing.lg },
  textarea: { minHeight: 120, textAlignVertical: 'top' },
});
