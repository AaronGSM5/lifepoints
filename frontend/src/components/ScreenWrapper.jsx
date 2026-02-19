import { View, ScrollView } from 'react-native';
import { Spacing } from '@/constants/Spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScreenWrapper({ children, scrollable = true, withOffset = false, style }) {
  const insets = useSafeAreaInsets()
  const Container = scrollable ? ScrollView : View;

  const contentStyles = [
    { paddingHorizontal: Spacing.md, paddingTop: withOffset ? (insets.top + Spacing.md) : Spacing.md, paddingBottom: Math.max(insets.bottom, Spacing.md), },
    style
  ];

  return (
    <Container 
      style={{ flex: 1 }}
      contentContainerStyle={scrollable ? [contentStyles, { flexGrow: 1 }] : undefined}
      keyboardShouldPersistTaps="handled"
    >
      {!scrollable ? (
        <View style={[contentStyles]}>
          {children}
        </View>
      ) : (
        children
      )}
    </Container>
  );
}