import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import PasswordRulesModal from "@/components/auth/PasswordRulesModal";
import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import { useAppTheme } from "@/hooks/useAppTheme";

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

  const passwordRules = useMemo(
    () => [
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
    ],
    [t]
  );

  const ruleStatus = useMemo(() => {
    if (variant !== "new") return {};

    const status = {};
    passwordRules.forEach((rule) => {
      status[rule.name] = rule.validate(value);
    });
    return status;
  }, [value, variant, passwordRules]);

  const isValid = useMemo(() => {
    if (variant === "new") {
      return Object.values(ruleStatus).every(Boolean) && value.length > 0;
    } else if (variant === "repeat") {
      return value.length > 0 && value === compareTo;
    } else {
      return value.length > 0;
    }
  }, [value, variant, compareTo, ruleStatus]);

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [isValid, onValidationChange]);

  const allRulesPassed = variant === "new" ? Object.values(ruleStatus).every(Boolean) : true;
  let hasError = false;
  let errorMessage = null;

  if (variant === "new") {
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
                <Icon
                  name={isVisible ? "eyeClosed" : "eyeOpen"}
                  size={22}
                  color={MyTheme.isDark ? MyTheme.text : "gray"}
                />
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
