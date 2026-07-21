import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Platform, View } from "react-native";

import { useRouter } from "expo-router";

import { useSyncUser } from "@/api/auth/useSync";
import { account } from "@/api/client/appwrite";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function LoginScreen() {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("auth");
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordIsShown, setPasswordIsShown] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const isLoginDisabled = useMemo(
    () => !emailInput || !passwordInput || isLoading,
    [emailInput, passwordInput, isLoading]
  );

  // const maxLogoWidth = 330;
  // const logoWidth = Math.min(screenWidth * 0.75, maxLogoWidth);
  // const logoHeight = logoWidth / 3.75;

  // Appwrite Login Logic

  const syncUserMutation = useSyncUser();

  const handleLogin = useCallback(async () => {
    if (!emailInput || !passwordInput) return;

    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(emailInput, passwordInput);

      syncUserMutation.mutate(null, {
        onSuccess: (user) => {
          console.log("Logged in and synced! Lifepoints:", user.totalLifepoints);
          // Navigate to dashboard here
        }
      });

      router.replace("/home");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [emailInput, passwordInput, syncUserMutation, router]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ flex: 1, pointerEvents: "box-none" }}>
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
            <AppButton
              title={t("Forgot password?")}
              variant="ghost"
              size="sm"
              textStyle={{ color: MyTheme.primaryAccent }}
            />
          </BaseCard>

          {/* Footer */}
          <AuthFooter text={t("Don't have an account?")} linkText={t("Register")} href="/auth/register" />
        </ScreenWrapper>
      </View>
    </KeyboardAvoidingView>
  );
}
