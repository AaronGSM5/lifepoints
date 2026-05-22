import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import PasswordRulesModal from "@/components/auth/PasswordRulesModal";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTranslation } from "react-i18next";
import useStore from "@/store/useStore";

export default function PasswordInput({
  variant = "login", // Standardmäßig ein normales Login-Feld
  value,
  onChangeText,
  compareTo = "", // Wird nur für variant="repeat" gebraucht
  onValidationChange,
  placeholder,
  bottomMargin = true
}) {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("auth");
  const [isVisible, setIsVisible] = useState(false);
  const [isRuleOverlayVisible, setIsRuleOverlayVisible] = useState(false);
  const [ruleStatus, setRuleStatus] = useState({});
  const isDarkMode = useStore((state) => state.isDarkMode);

  const passwordRules = [
    {
      name: "lengthRule",
      validate: (pwInput) => pwInput.length >= 8,
      displayMessage: t("min. length of 8 characters")
    },
    {
      name: "uppercaseRule",
      validate: (pwInput) => /[A-Z]/.test(pwInput),
      displayMessage: t("min. 1 uppercase letter")
    },
    {
      name: "numberRule",
      validate: (pwInput) => /[0-9]/.test(pwInput),
      displayMessage: t("min. 1 number")
    },
    {
      name: "specialCharRule",
      validate: (pwInput) => /[!@#$%^&*]/.test(pwInput),
      displayMessage: t("min. 1 special character")
    }
  ];

  // Validierung je nach Variante
  useEffect(() => {
    let isValid = false;

    if (variant === "new") {
      const newStatus = {};
      passwordRules.forEach((rule) => {
        newStatus[rule.name] = rule.validate(value);
      });
      setRuleStatus(newStatus);
      isValid = Object.values(newStatus).every(Boolean) && value.length > 0;
    } else if (variant === "repeat") {
      isValid = value.length > 0 && value === compareTo;
    } else {
      isValid = value.length > 0;
    }

    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [value, compareTo, variant]);

  // UI-Status berechnen
  let hasError = false;
  let errorMessage = null;
  let allRulesPassed = false;

  if (variant === "new") {
    allRulesPassed = Object.values(ruleStatus).every(Boolean);
    hasError = !allRulesPassed && value.length > 0;
    errorMessage = hasError ? t("The password does not meet all the requirements.") : null;
  } else if (variant === "repeat") {
    hasError = value.length > 0 && compareTo.length > 0 && value !== compareTo;
    errorMessage = hasError ? t("The passwords don't match.") : null;
  }

  return (
    <>
      <AppInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || (variant === "repeat" ? t("Repeat Password") : t("Password"))}
        bottomMargin={bottomMargin}
        secureTextEntry={!isVisible}
        isValid={!hasError && value.length > 0}
        error={errorMessage}
        rightContent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppButton
              onPress={() => setIsVisible(!isVisible)}
              size="sm"
              variant="ghost"
              icon={
                <Icon name={isVisible ? "eyeClosed" : "eyeOpen"} size={22} color={isDarkMode ? MyTheme.text : "gray"} />
              }
              iconPosition="center"
            />
            {variant === "new" && value.length > 0 && (
              <AppButton
                variant="ghost"
                size="sm"
                icon={
                  <Icon
                    name={allRulesPassed ? "checkmarkCircle" : "infoCircle"}
                    size={22}
                    color={allRulesPassed ? MyTheme.primaryAccent : "red"}
                  />
                }
                iconPosition="center"
                onPress={() => setIsRuleOverlayVisible(true)}
              />
            )}
          </View>
        }
      />

      {variant === "new" && isRuleOverlayVisible && (
        <PasswordRulesModal
          visible={isRuleOverlayVisible}
          onClose={() => setIsRuleOverlayVisible(false)}
          passwordRules={passwordRules}
          passwordRuleStatus={ruleStatus}
        />
      )}
    </>
  );
}
