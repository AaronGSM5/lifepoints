import { View, KeyboardAvoidingView, Platform } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";
import BaseCard from "@/components/ui/BaseCard";
import { useTranslation } from "react-i18next";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation("auth");
  const MyTheme = useAppTheme();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [repeatPasswordInput, setRepeatPasswordInput] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRepeatValid, setIsRepeatValid] = useState(false);

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
          <AuthHeader showImageLogo={true} subtitle={t("Register to continue")} />

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
              value={nameInput}
              onChangeText={setNameInput}
              placeholder={t("Username")}
              bottomMargin={false}
              isValid={isNameValidFlag && nameInput.length > 0}
              error={!isNameValidFlag && nameInput.length > 0 ? t("Username is already taken..") : null}
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
            <AppButton
              title={t("Register")}
              textStyle={{ color: isSubmitDisabled && "white" }}
              bgColor={MyTheme.primaryAccent}
              disabled={isSubmitDisabled}
            />
          </BaseCard>

          <AuthFooter text={t("Already have an account?")} linkText={t("Log in")} href="/auth/login" />
        </ScreenWrapper>
      </View>
    </KeyboardAvoidingView>
  );
}
