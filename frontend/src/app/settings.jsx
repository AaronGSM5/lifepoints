import { View, StyleSheet } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import AppText from '@/components/AppText';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenWrapper scrollable={true}>
        <LinearGradient colors={[ MyTheme.background, '#121212']} style={styles.background} />
        <View style={styles.header}>
          <AppText type="h1">Settings</AppText>
        </View>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  header: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg
  }
})