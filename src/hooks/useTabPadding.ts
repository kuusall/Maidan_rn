import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Hook to provide consistent padding for screens that sit behind
 * an absolute-positioned floating tab bar.
 */
export function useTabPadding() {
  const insets = useSafeAreaInsets();

  // FloatingTabBar height (68) + bottom inset + gap (Spacing.lg = 24 approx)
  const bottomPadding = 68 + insets.bottom + 24;

  return {
    bottomPadding,
    bottomMargin: bottomPadding,
  };
}
