import { View, StyleSheet, Pressable, KeyboardAvoidingView, Platform, Dimensions, Image } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useState } from "react";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordIsShown, setPasswordIsShown] = useState(true);
  const isLoginDisabled = !emailInput || !passwordInput;

  const maxLogoWidth = 330; // max 330 px breit
  const logoWidth = Math.min(screenWidth * 0.75, maxLogoWidth);
  const logoHeight = logoWidth / 3.75;

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
            <AppText type="h1" style={styles.headerText}>
              Welcome back
            </AppText>
            <AppText type="caption" style={styles.subtitle}>
              Log in to continue
            </AppText>
          </View>

          {/* Main */}
          <View style={styles.card}>
            <AppInput
              value={emailInput}
              onChangeText={setEmailInput}
              placeholder="E-Mail"
              bottomMargin={false}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <AppInput
              value={passwordInput}
              onChangeText={setPasswordInput}
              placeholder="Password"
              secureTextEntry={passwordIsShown}
              bottomMargin={false}
              rightIcon={passwordIsShown ? "eyeOpen" : "eyeClosed"}
              onRightIconPress={() => setPasswordIsShown(!passwordIsShown)}
            />
            <AppButton title={"Log in"} disabled={isLoginDisabled} bgColor={MyTheme.primaryAccent} />
            <Pressable style={styles.forgotPassword}>
              <AppText type="caption" style={{ color: MyTheme.primaryAccent }}>
                Forgot password?
              </AppText>
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <AppText type="caption">
              Don't have an account?{" "}
              <Link href="auth/register">
                <AppText type="caption" style={{ color: MyTheme.primaryAccent }}>
                  Register
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
  appIcon: {
    marginTop: Spacing.lg
  },
  headerText: {
    marginTop: Spacing.xs
  },
  subtitle: {
    marginTop: Spacing.sm,
    opacity: 0.7
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.borderRadius.lg,
    marginHorizontal: Spacing.lg,
    gap: Spacing.md
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: Spacing.md
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    marginBottom: Spacing.lg
  }
});
