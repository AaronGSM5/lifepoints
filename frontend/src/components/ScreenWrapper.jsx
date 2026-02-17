import { View, ScrollView, StyleSheet } from 'react-native';
// import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';

export default function ScreenWrapper({ children, scrollable = true, style }) {
  const Container = scrollable ? ScrollView : View;

  return (
    <Container 
      style={[styles.container, style]}
      // Falls es ein ScrollView ist, brauchen wir contentContainerStyle für das Padding
      contentContainerStyle={scrollable ? [styles.content, { flexGrow: 1 }] : undefined}
      keyboardShouldPersistTaps="handled"
    >
      {!scrollable ? (
        <View style={[styles.content, style]}>
          {children}
        </View>
      ) : (
        children
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: MyTheme.background,
  },
  content: {
    paddingHorizontal: Spacing.md, // 16px Rand links/rechts
    paddingTop: Spacing.md,        // 16px Luft zur Toolbar
    // paddingBottom: Spacing.xl,     // Viel Platz unten
  }
});