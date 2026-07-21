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
import { account } from "@/api/client/appwrite";
import { ID } from "react-native-appwrite";
import PasswordRulesModal from "@/components/auth/PasswordRulesModal";
import { useRouter } from "expo-router";
import { useSyncUser } from "@/api/auth/useSync";

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation("auth");
  const MyTheme = useAppTheme();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [repeatPasswordInput, setRepeatPasswordInput] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRepeatValid, setIsRepeatValid] = useState(false);

  // const maxLogoWidth = 330;
  // const logoWidth = Math.min(screenWidth * 0.75, maxLogoWidth);
  // const logoHeight = logoWidth / 3.75;

  const syncUserMutation = useSyncUser();

  const handleRegister = async () => {
    try {
      await account.create(ID.unique(), emailInput, passwordInput, nameInput);

      await account.createEmailPasswordSession(emailInput, passwordInput);

      syncUserMutation.mutate(null, {
        onSuccess: (user) => {
          console.log("Registered and synced! Lifepoints:", user.totalLifepoints);
        }
      });

      router.replace("/home");
    } catch (error) {
      console.log("register error ", error);
    }
  };

  const isNameValid = () => {
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
    { name: "lengthRule", validate: (pwInput) => pwInput.length >= 8, displayMessage: "min. length of 8 characters" },
    { name: "uppercaseRule", validate: (pwInput) => /[A-Z]/.test(pwInput), displayMessage: "min. 1 uppercase letter" },
    { name: "numberRule", validate: (pwInput) => /[0-9]/.test(pwInput), displayMessage: "min. 1 number" },
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
            />

            <PasswordInput
              variant="repeat"
              value={repeatPasswordInput}
              onChangeText={setRepeatPasswordInput}
              compareTo={passwordInput}
              onValidationChange={setIsRepeatValid}
              bottomMargin={false}
              isValid={passwordsMatch}
              error={passwordsFilled && !passwordsMatch ? "Passwords do not match" : null}
            />

            {/* Overlay */}
            {/* {isRuleOverlayVisible && (
              <PasswordRulesModal
                visible={isRuleOverlayVisible}
                onClose={() => setIsRuleOverlayVisible(false)}
                passwordRules={passwordRules}
                passwordRuleStatus={passwordRuleStatus}
              />
            )} */}

            <AppButton
              title={t("Register")}
              textStyle={{ color: isSubmitDisabled && "white" }}
              bgColor={MyTheme.primaryAccent}
              onPress={handleRegister} // Hooked up function
            />
          </BaseCard>

          {/* Footer */}
          <AuthFooter text={t("Already have an account?")} linkText={t("Log in")} href="/auth/login" />
        </ScreenWrapper>
      </View>
    </KeyboardAvoidingView>
  );
}
