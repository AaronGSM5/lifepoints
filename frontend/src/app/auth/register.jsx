import { View, StyleSheet, KeyboardAvoidingView, Platform, Image, Dimensions } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useState } from "react";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import PasswordInput from "@/components/auth/PasswordInput";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [repeatPasswordInput, setRepeatPasswordInput] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRepeatValid, setIsRepeatValid] = useState(false);

  const maxLogoWidth = 330;
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

  const isSubmitDisabled =
    !nameInput || !emailInput || !isPasswordValid || !isRepeatValid || !isEmailValidFlag || !isNameValidFlag;

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
            <PasswordInput
              variant="new"
              value={passwordInput}
              onChangeText={setPasswordInput}
              onValidationChange={setIsPasswordValid}
              bottomMargin={false}
            />

            <PasswordInput
              variant="repeat"
              value={repeatPasswordInput}
              onChangeText={setRepeatPasswordInput}
              compareTo={passwordInput}
              onValidationChange={setIsRepeatValid}
              bottomMargin={false}
            />
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
