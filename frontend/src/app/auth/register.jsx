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
import { account } from "@/lib/appwrite";
import { ID } from "react-native-appwrite";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation("auth");
  const MyTheme = useAppTheme();

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [repeatPasswordInput, setRepeatPasswordInput] = useState("");
  const [passwordIsShown, setPasswordIsShown] = useState(true);
  const [isRuleOverlayVisible, setIsRuleOverlayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const maxLogoWidth = 330;
  const logoWidth = Math.min(screenWidth * 0.75, maxLogoWidth);
  const logoHeight = logoWidth / 3.75;

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      await account.create(ID.unique(), emailInput, passwordInput, nameInput);

      await account.createEmailPasswordSession(emailInput, passwordInput);

      router.replace("/home");
    } catch (error) {
      console.log("register error ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isNameValid = (name) => {
    return name.length >= 3;
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
    !nameInput ||
    !emailInput ||
    !isPasswordValid ||
    !isRepeatValid ||
    !isEmailValidFlag ||
    !isNameValidFlag ||
    isLoading;

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
            {isRuleOverlayVisible && (
              <PasswordRulesModal
                visible={isRuleOverlayVisible}
                onClose={() => setIsRuleOverlayVisible(false)}
                passwordRules={passwordRules}
                passwordRuleStatus={passwordRuleStatus}
              />
            )}

            <AppButton
              title={isLoading ? "Creating Account..." : "Register"}
              bgColor={MyTheme.primaryAccent}
              disabled={isSubmitDisabled}
              onPress={handleRegister} // Hooked up function
            />
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
