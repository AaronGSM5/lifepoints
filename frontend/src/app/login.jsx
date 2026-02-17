import { View, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import AppText from '@/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons"

export default function LoginScreen() {
  const insets = useSafeAreaInsets()
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordIsShown, setPasswordIsShown] = useState(true)
  const isLoginDisabled = !emailInput || !passwordInput
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, pointerEvents: 'box-none' }}>
      <LinearGradient colors={[ MyTheme.background, '#121212']} style={styles.background} />
      <ScreenWrapper>
        
        {/* Header */}
        <View style={styles.header}>
          <AppText type="h1">Welcome back</AppText>
          <AppText type="caption" style={styles.subtitle}>Log in to continue</AppText>
        </View>

        {/* Main */}
        <View style={styles.card}>
          <TextInput 
            value={emailInput}
            onChangeText={setEmailInput}
            placeholder='E-Mail'
            placeholderTextColor={MyTheme.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            style={[styles.emailContainer, { outlineStyle: 'none' }]}
            />

          <View style={styles.passwordContainer}>
            <TextInput
              value={passwordInput}
              onChangeText={setPasswordInput}
              placeholder="Password"
              placeholderTextColor={MyTheme.muted}
              underlineColorAndroid="transparent"
              secureTextEntry={passwordIsShown}
              style={[styles.passwordInput, { outlineStyle: 'none' }]}
            />
            <Pressable
              onPress={() => setPasswordIsShown(!passwordIsShown)}
              hitSlop={10}
            >
              <Ionicons name={ passwordIsShown ? 'eye-outline' : 'eye-off-outline'} size={18} color={MyTheme.text} />
            </Pressable>
          </View>

          <Pressable style={[styles.loginButton, {opacity: isLoginDisabled ? 0.5 : 1} ]} disabled={isLoginDisabled}>
            <AppText>Log in</AppText>
          </Pressable>
          <Pressable style={styles.forgotPassword}>
            <AppText type='caption' style={{ color: MyTheme.primaryAccent }}>Forgot password?</AppText>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <AppText type="caption">Don't have an account? <Link href="/register"><AppText type='caption' style={{ color: MyTheme.primaryAccent }}>Register</AppText></Link></AppText>
        </View>

      </ScreenWrapper>
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    marginVertical: Spacing.xl,
    alignItems: 'center'
  },
  subtitle: {
    marginTop: Spacing.sm,
    opacity: 0.7
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: Spacing.lg,
    borderRadius: Spacing.borderRadius.lg,
    marginHorizontal: Spacing.lg
  },
  emailContainer: {
    color: MyTheme.text,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    fontFamily: 'Inter-Bold',
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: Spacing.borderRadius.full,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: Spacing.borderRadius.full,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  passwordInput: {
    flex: 1,
    color: MyTheme.text,
    fontFamily: 'Inter-Bold',
    paddingVertical: Spacing.md,
  },
  loginButton: {
    backgroundColor: MyTheme.primaryAccent,
    padding: Spacing.md,
    borderRadius: Spacing.borderRadius.full,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: Spacing.md
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    marginBottom: Spacing.lg
  },
})