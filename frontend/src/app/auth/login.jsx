import { View, KeyboardAvoidingView, Platform } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";
import BaseCard from "@/components/ui/BaseCard";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const isLoginDisabled = !emailInput || !passwordInput;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, pointerEvents: "box-none" }}>
        <ScreenWrapper scrollable>
          <AuthHeader showImageLogo={true} subtitle={"Log in to continue"} />

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
            <AppButton title={"Log in"} disabled={isLoginDisabled} bgColor={MyTheme.primaryAccent} />
            <AppButton
              title={"Forgot password?"}
              variant="ghost"
              size="sm"
              textStyle={{ color: MyTheme.primaryAccent }}
            />
          </BaseCard>

          <AuthFooter text={"Don't have an account?"} linkText="Register" href="/auth/register" />
        </ScreenWrapper>
      </View>
    </KeyboardAvoidingView>
  );
}
