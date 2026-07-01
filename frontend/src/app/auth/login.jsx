import { useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import PasswordInput from "@/components/auth/PasswordInput";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();
  const { t } = useTranslation("auth");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const isLoginDisabled = !emailInput || !passwordInput;

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
            <PasswordInput variant="login" value={passwordInput} onChangeText={setPasswordInput} bottomMargin={false} />
            <AppButton title={t("Log in")} disabled={isLoginDisabled} bgColor={MyTheme.primaryAccent} />
            <AppButton
              title={t("Forgot password?")}
              variant="ghost"
              size="sm"
              textStyle={{ color: MyTheme.primaryAccent }}
            />
          </BaseCard>

          <AuthFooter text={t("Don't have an account?")} linkText={t("Register")} href="/auth/register" />
        </ScreenWrapper>
      </View>
    </KeyboardAvoidingView>
  );
}
