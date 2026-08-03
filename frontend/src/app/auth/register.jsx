import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ID } from "react-native-appwrite";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import { useSyncUser } from "@/api/auth/useSync";
import { account } from "@/api/client/appwrite";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import PasswordInput from "@/components/auth/PasswordInput";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation("auth");
  const MyTheme = useAppTheme();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [repeatPasswordInput, setRepeatPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const syncUserMutation = useSyncUser();

  const handleRegister = useCallback(async () => {
    try {
      setIsLoading(true);

      await account.create(ID.unique(), emailInput, passwordInput, nameInput);

      await account.createEmailPasswordSession(emailInput, passwordInput);

      syncUserMutation.mutate(null, {
        onSuccess: (user) => {
          console.log("Registered and synced! Lifepoints:", user.totalLifepoints);
        }
      });

      router.replace("/auth/verify-email");
    } catch (error) {
      console.log("register error ", error);
    } finally {
      setIsLoading(false);
    }
  }, [emailInput, nameInput, passwordInput, router, syncUserMutation]);

  const isNameValid = useCallback(() => {
    return true;
  }, []);

  const isEmailValid = useCallback((email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }, []);

  const isNameValidFlag = isNameValid(nameInput);
  const isEmailValidFlag = isEmailValid(emailInput);

  const passwordsFilled = passwordInput && repeatPasswordInput;
  const passwordsMatch = passwordsFilled && passwordInput === repeatPasswordInput;

  const isSubmitDisabled = useMemo(
    () => !nameInput || !emailInput || !isPasswordValid || !passwordsMatch || !isEmailValidFlag || !isNameValidFlag,
    [nameInput, emailInput, isPasswordValid, passwordsMatch, isEmailValidFlag, isNameValidFlag]
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, pointerEvents: "box-none" }}>
        <ScreenWrapper scrollable withToolbar={false}>
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
              error={!isNameValidFlag && nameInput.length > 0 ? "Username is too short" : null}
            />
            <AppInput
              value={emailInput}
              onChangeText={setEmailInput}
              placeholder="E-Mail"
              bottomMargin={false}
              keyboardType="email-address"
              autoCapitalize="none"
              isValid={isEmailValidFlag && emailInput.length > 0}
              error={!isEmailValidFlag && emailInput.length > 0 ? "Invalid email address" : null}
            />
            <PasswordInput
              variant="new"
              value={passwordInput}
              onChangeText={setPasswordInput}
              onValidationChange={setIsPasswordValid}
              bottomMargin={false}
              showErrorMessage={false}
            />

            <PasswordInput
              variant="repeat"
              value={repeatPasswordInput}
              onChangeText={setRepeatPasswordInput}
              compareTo={passwordInput}
              bottomMargin={false}
              isValid={passwordsMatch}
              error={passwordsFilled && !passwordsMatch ? "Passwords do not match" : null}
            />

            <AppButton title={t("Register")} onPress={handleRegister} disabled={isSubmitDisabled} loading={isLoading} />
          </BaseCard>

          <AuthFooter text={t("Already have an account?")} linkText={t("Log in")} href="/auth/login" />
        </ScreenWrapper>
      </View>
    </KeyboardAvoidingView>
  );
}
