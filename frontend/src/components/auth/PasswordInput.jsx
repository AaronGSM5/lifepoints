import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation, View } from "react-native";

import PasswordRules from "@/components/auth/PasswordRules";
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
  bottomMargin = true,
  showErrorMessage = true
}) {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("auth");
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), []);
  const handleFocus = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(true);
  }, []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

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
    return passwordRules.reduce((acc, rule) => {
      acc[rule.name] = rule.validate(value);
      return acc;
    }, {});
  }, [value, variant, passwordRules]);

  const allRulesPassed = useMemo(() => Object.values(ruleStatus).every(Boolean), [ruleStatus]);

  const validation = useMemo(() => {
    let error = null;
    let isValid = value.length > 0;

    if (variant === "new" && value.length > 0) {
      if (!allRulesPassed) error = t("The password does not meet all the requirements.");
      isValid = allRulesPassed;
    } else if (variant === "repeat" && value.length > 0 && compareTo.length > 0) {
      if (value !== compareTo) error = t("The passwords don't match.");
      isValid = value === compareTo;
    }
    return { hasError: !!error, errorMessage: error, isValid };
  }, [value, variant, compareTo, allRulesPassed, t]);

  useEffect(() => {
    if (onValidationChange) onValidationChange(validation.isValid);
  }, [validation.isValid, onValidationChange]);

  return (
    <>
      <AppInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || (variant === "repeat" ? t("Repeat Password") : t("Password"))}
        bottomMargin={bottomMargin}
        secureTextEntry={!isVisible}
        isValid={!validation.hasError && value.length > 0}
        error={showErrorMessage ? validation.errorMessage : validation.hasError}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rightContent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppButton
              onPress={toggleVisibility}
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
            {variant === "new" && allRulesPassed && (
              <AppButton
                variant="ghost"
                size="sm"
                icon={<Icon name={"checkmarkCircle"} size={22} color={MyTheme.primaryAccent} />}
                iconPosition="center"
              />
            )}
          </View>
        }
      />

      {variant === "new" && isFocused && (
        <PasswordRules passwordRules={passwordRules} passwordRuleStatus={ruleStatus} />
      )}
    </>
  );
}
