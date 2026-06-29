import { View, StyleSheet, Pressable, KeyboardAvoidingView, Platform, Dimensions, Image, Alert } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";

// Import your Appwrite account instance
import { account } from "@/lib/appwrite";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";
import BaseCard from "@/components/ui/BaseCard";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();
  const { t } = useTranslation("auth");
  const router = useRouter(); // For navigation after successful login

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordIsShown, setPasswordIsShown] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const isLoginDisabled = !emailInput || !passwordInput || isLoading;

  // const maxLogoWidth = 330;
  // const logoWidth = Math.min(screenWidth * 0.75, maxLogoWidth);
  // const logoHeight = logoWidth / 3.75;

  // Appwrite Login Logic
  const handleLogin = async () => {
    if (!emailInput || !passwordInput) return;

    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(emailInput, passwordInput);

      router.replace("/");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, pointerEvents: "box-none" }}>
        <ScreenWrapper scrollable>
          <AuthHeader showImageLogo={true} subtitle={t("Log in to continue")} />

          <BaseCard
            style={{
              backgroundColor: MyTheme.glas,
              borderWidth: 0,
              marginHorizontal: Spacing.lg,
              paddingVertical: Spacing.xl,
              gap: Spacing.md
            }}
          >
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
            <AppButton
              title={isLoading ? "Logging in..." : "Log in"}
              disabled={isLoginDisabled}
              bgColor={MyTheme.primaryAccent}
              onPress={handleLogin} // Attach the logic here
            />
            <Pressable style={styles.forgotPassword}>
              <AppText type="caption" style={{ color: MyTheme.primaryAccent }}>
                Forgot password?
              </AppText>
            </Pressable>
          </BaseCard>

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
