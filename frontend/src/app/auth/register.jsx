import { View, StyleSheet, KeyboardAvoidingView, Platform, Image, Dimensions } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PasswordRulesModal from "@/components/auth/PasswordRulesModal";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [repeatPasswordInput, setRepeatPasswordInput] = useState("");
  const [passwordIsShown, setPasswordIsShown] = useState(true);
  const [isRuleOverlayVisible, setIsRuleOverlayVisible] = useState(false);

  const maxLogoWidth = 330; // max 330 px breit
  const logoWidth = Math.min(screenWidth * 0.75, maxLogoWidth);
  const logoHeight = logoWidth / 3.75;

  const isNameValid = (name) => {
    // Some database check (maybe some rules)
    return true;
  };
  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isNameValidFlag = isNameValid(nameInput);
  const isEmailValidFlag = isEmailValid(emailInput);

  const passwordsFilled = passwordInput && repeatPasswordInput;
  const passwordsMatch = passwordsFilled && passwordInput === repeatPasswordInput;
  const passwordRules = [
    {
      name: "lengthRule",
      validate: (pwInput) => pwInput.length >= 8,
      displayMessage: "min. length of 8 characters"
    },
    {
      name: "uppercaseRule",
      validate: (pwInput) => /[A-Z]/.test(pwInput),
      displayMessage: "min. 1 uppercase letter"
    },
    {
      name: "numberRule",
      validate: (pwInput) => /[0-9]/.test(pwInput),
      displayMessage: "min. 1 number"
    },
    {
      name: "specialCharRule",
      validate: (pwInput) => /[!@#$%^&*]/.test(pwInput),
      displayMessage: "min. 1 special character"
    }
  ];
  const [passwordRuleStatus, setPasswordRuleStatus] = useState({
    lengthRule: false,
    uppercaseRule: false,
    numberRule: false,
    specialCharRule: false
  });
  const allRulesPassed = Object.values(passwordRuleStatus).every((status) => status === true);
  const isSubmitDisabled =
    !nameInput || !emailInput || !passwordsMatch || !allRulesPassed || !isEmailValidFlag || !isNameValidFlag;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, pointerEvents: "box-none" }}>
        <ScreenWrapper scrollable>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.appIcon}>
              <Image
                source={require("@/../public/assets/adaptive-icon.png")}
                style={{ width: logoWidth, height: logoHeight }}
                resizeMode="contain"
              />
            </View>
            <Image
              source={require("@/../public/assets/lifepointsLogo.png")}
              style={{ width: 200 }}
              resizeMode="contain"
            />
            <AppText type="caption" style={styles.subtitle}>
              Register to continue
            </AppText>
          </View>

          {/* Main */}
          <View style={styles.card}>
            <AppInput
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Username"
              bottomMargin={false}
              isValid={isNameValidFlag && nameInput.length > 0}
              error={!isNameValidFlag && nameInput.length > 0 ? "Username is already taken.." : null}
            />
            <AppInput
              value={emailInput}
              onChangeText={setEmailInput}
              placeholder="E-Mail"
              bottomMargin={false}
              keyboardType="email-address"
              autoCapitalize="none"
              isValid={isEmailValidFlag && emailInput.length > 0}
              error={!isEmailValidFlag && emailInput.length > 0}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppInput
                value={passwordInput}
                onChangeText={(text) => {
                  setPasswordInput(text);
                  const newStatus = {};
                  passwordRules.forEach((rule) => {
                    newStatus[rule.name] = rule.validate(text);
                  });
                  setPasswordRuleStatus(newStatus);
                }}
                placeholder="Password"
                bottomMargin={false}
                secureTextEntry={passwordIsShown}
                isValid={allRulesPassed && passwordInput.length > 0}
                error={!allRulesPassed && passwordInput.length > 0}
                rightContent={
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AppButton
                      onPress={() => setPasswordIsShown(!passwordIsShown)}
                      size="sm"
                      variant="ghost"
                      icon={
                        <Ionicons name={passwordIsShown ? "eye-outline" : "eye-off-outline"} size={22} color="white" />
                      }
                      iconPosition="center"
                    />
                    {passwordInput.length > 0 && (
                      <AppButton
                        variant="ghost"
                        size="sm"
                        icon={
                          <Ionicons
                            name={allRulesPassed ? "checkmark-circle-outline" : "information-circle-outline"}
                            size={22}
                            color={allRulesPassed ? MyTheme.primaryAccent : "red"}
                          />
                        }
                        iconPosition="center"
                        onPress={() => setIsRuleOverlayVisible(true)}
                      />
                    )}
                  </View>
                }
              />
            </View>
            <AppInput
              value={repeatPasswordInput}
              onChangeText={setRepeatPasswordInput}
              placeholder="Repeat Password"
              secureTextEntry
              bottomMargin={false}
              isValid={passwordsMatch}
              error={passwordsFilled && !passwordsMatch}
            />

            {/* Overlay */}
            {isRuleOverlayVisible && (
              <PasswordRulesModal
                visible={isRuleOverlayVisible}
                onClose={() => setIsRuleOverlayVisible(false)}
                passwordRules={passwordRules}
                passwordRuleStatus={passwordRuleStatus}
              />
            )}
            <AppButton title={"Register"} bgColor={MyTheme.primaryAccent} disabled={isSubmitDisabled} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <AppText type="caption">
              Already have an account?{" "}
              <Link href="/auth/login">
                <AppText type="caption" style={{ color: MyTheme.primaryAccent }}>
                  Log in
                </AppText>
              </Link>
            </AppText>
          </View>
        </ScreenWrapper>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: Spacing.xl,
    alignItems: "center"
  },
  subtitle: {
    marginTop: Spacing.sm,
    opacity: 0.7
  },
  appIcon: {
    marginTop: Spacing.lg
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.borderRadius.lg,
    marginHorizontal: Spacing.lg,
    gap: Spacing.md
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    marginBottom: Spacing.lg
  }
});
