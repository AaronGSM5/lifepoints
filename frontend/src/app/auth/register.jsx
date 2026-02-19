import { View, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform, Image, Dimensions } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import AppText from '@/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons"
import PasswordRulesModal from '@/components/layout/PasswordRulesModal';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets()
  const screenWidth = Dimensions.get('window').width;
  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [repeatPasswordInput, setRepeatPasswordInput] = useState('')
  const [passwordIsShown, setPasswordIsShown] = useState(true)
  const [isRuleOverlayVisible, setIsRuleOverlayVisible] = useState(false)

  const maxLogoWidth = 330;  // max 330 px breit
  const logoWidth = Math.min(screenWidth * 0.75, maxLogoWidth);
  const logoHeight = logoWidth / 3.75;

  const isNameValid = (name) => {
    // Some database check (maybe some rules)
    return true
  }
  const isNameValidFlag = isNameValid(nameInput)
  const nameBorderColor = nameInput
  ? isNameValidFlag
    ? MyTheme.primaryAccent
    : 'red'
  : 'transparent'

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  const isEmailValidFlag = isEmailValid(emailInput)
  const emailBorderColor = emailInput
  ? isEmailValidFlag
  ? MyTheme.primaryAccent
  : 'red'
  : 'transparent'
  
  const passwordsFilled = passwordInput && repeatPasswordInput
  const passwordsMatch = passwordsFilled && passwordInput === repeatPasswordInput
  let passwordBorderColor = 'transparent'
  let passwordCheckBorderColor = 'transparent'
  const passwordRules = [
    {
      name: 'lengthRule',
      validate: (pwInput) => pwInput.length >= 8,
      displayMessage: 'min. length of 8 characters'
    },
    {
      name: 'uppercaseRule',
      validate: (pwInput) => /[A-Z]/.test(pwInput),
      displayMessage: 'min. 1 uppercase letter'
    },
    {
      name: 'numberRule',
      validate: (pwInput) => /[0-9]/.test(pwInput),
      displayMessage: 'min. 1 number'
    },
    {
      name: 'specialCharRule',
      validate: (pwInput) => /[!@#$%^&*]/.test(pwInput),
      displayMessage: 'min. 1 special character'
    },
  ]
  const [passwordRuleStatus, setPasswordRuleStatus] = useState({
    lengthRule: false,
    uppercaseRule: false,
    numberRule: false,
    specialCharRule: false
  })
  const allRulesPassed = Object.values(passwordRuleStatus).every(status => status === true)
  const isLoginDisabled = !nameInput || !emailInput || !passwordsMatch || !allRulesPassed || !isEmailValidFlag || !isNameValidFlag

  if (passwordsFilled) {
    passwordCheckBorderColor = passwordsMatch ? MyTheme.primaryAccent : 'red'
  }
  if (passwordInput.length > 0) {
  passwordBorderColor = allRulesPassed ? 'transparent' : 'red'
  }

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
          <View style={styles.appIcon}>
            <Image
              source={require('@/../public/assets/adaptive-icon.png')}
              style={{ width: logoWidth, height: logoHeight }}
              resizeMode="contain"
            />
          </View>
          <Image
            source={require('@/../public/assets/lifepointsLogo.png')}
            style={{ width: 200 }}
            resizeMode="contain"
          />
          <AppText type='caption' style={styles.subtitle}>Register to continue</AppText>
        </View>

        {/* Main */}
        <View style={styles.card}>
          <TextInput 
            value={nameInput}
            onChangeText={setNameInput}
            placeholder='Username'
            placeholderTextColor={MyTheme.muted}
            underlineColorAndroid="transparent"
            style={[styles.textInput, { outlineStyle: 'none', borderWidth: 1, borderColor: nameBorderColor }]}
            />

          <TextInput 
            value={emailInput}
            onChangeText={setEmailInput}
            placeholder='E-Mail'
            placeholderTextColor={MyTheme.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            style={[styles.textInput, { outlineStyle: 'none', borderWidth: 1, borderColor: emailBorderColor }]}
            />

          <View style={[styles.passwordContainer, { borderWidth: 1, borderColor: passwordBorderColor }]}>
            <View style={{ flex: 1 }}>
              <TextInput
                value={passwordInput}
                onChangeText={(text) => {
                  setPasswordInput(text)
                  const newStatus = {}
                  passwordRules.forEach((rule) => {
                    newStatus[rule.name] = rule.validate(text)
                  })
                  setPasswordRuleStatus(newStatus)
                }}
                placeholder="Password"
                placeholderTextColor={MyTheme.muted}
                underlineColorAndroid="transparent"
                secureTextEntry={passwordIsShown}
                style={[styles.passwordInput, { outlineStyle: 'none' }]}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Pressable
                onPress={() => setPasswordIsShown(!passwordIsShown)}
                hitSlop={10}
                style={{ marginRight: 8 }}
              >
                <Ionicons name={ passwordIsShown ? 'eye-outline' : 'eye-off-outline'} size={22} color='white' />
              </Pressable>

              {passwordInput.length > 0 && (<Pressable
                onPress={() => setIsRuleOverlayVisible(true)}
                hitSlop={10}
              >
                <Ionicons name={ allRulesPassed ? 'checkmark-circle-outline' : 'information-circle-outline'} size={22} color={ allRulesPassed ? MyTheme.primaryAccent : 'red' } />
              </Pressable>
            )}
            </View>
          </View>

          <View style={[styles.passwordContainer, { borderWidth: 1, borderColor: passwordCheckBorderColor }]}>
            <View style={{ flex: 1 }}>
            <TextInput
              value={repeatPasswordInput}
              onChangeText={setRepeatPasswordInput}
              placeholder="Repeat Password"
              placeholderTextColor={MyTheme.muted}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              style={[styles.passwordInput, { outlineStyle: 'none' }]}
            />
            </View>
            <View>
              {passwordsFilled && !passwordsMatch ? (
                <Ionicons name='close-circle-outline' size={22} color='red' />
              ) : passwordsMatch ? (
                <Ionicons name='checkmark-circle-outline' size={22} color={MyTheme.primaryAccent} />
              ) : null}
            </View>
          </View>

          {/* Overlay */}
          {isRuleOverlayVisible && (
            <PasswordRulesModal visible={isRuleOverlayVisible} onClose={() => setIsRuleOverlayVisible(false)} passwordRules={passwordRules} passwordRuleStatus={passwordRuleStatus} />
          )}

          <Pressable style={[styles.loginButton, {opacity: isLoginDisabled ? 0.5 : 1} ]} disabled={isLoginDisabled}>
            <AppText>Register</AppText>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <AppText type="caption">Already have an account? <Link href="/auth/login"><AppText type='caption' style={{ color: MyTheme.primaryAccent }}>Log in</AppText></Link></AppText>
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
  appIcon: {
    marginTop: Spacing.lg
  },
  headerText: {
    marginTop: Spacing.xs
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: Spacing.lg,
    borderRadius: Spacing.borderRadius.lg,
    marginHorizontal: Spacing.lg
  },
  textInput: {
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
  }
})