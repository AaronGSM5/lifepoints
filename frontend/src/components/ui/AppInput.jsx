import React, { useState, forwardRef } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";

import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "../icons/Icon";

const AppInput = forwardRef(
  (
    {
      label,
      icon,
      error,
      isValid,
      style,
      containerStyle,
      inputStyle,
      rightIcon,
      onRightIconPress,
      rightContent,
      bottomMargin = true,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={[styles.wrapper, containerStyle, { marginBottom: bottomMargin ? Spacing.lg : 0 }]}>
        {/* Optionales Label über dem Input */}
        {label && (
          <AppText style={styles.label} bold>
            {label}
          </AppText>
        )}

        <View
          style={[
            styles.container,
            isFocused && styles.containerFocused,
            error && styles.containerError,
            isValid && !isFocused && { borderColor: MyTheme.primaryAccent },
            inputStyle
          ]}
        >
          {/* Linkes Icon (z.B. Search) */}
          {icon && (
            <Icon
              name={icon}
              size={20}
              color={isFocused ? MyTheme.primaryAccent : MyTheme.muted}
              style={styles.leftIcon}
            />
          )}

          <TextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={MyTheme.muted}
            selectionColor={MyTheme.primaryAccent}
            underlineColorAndroid="transparent"
            cursorColor={MyTheme.primaryAccent}
            // Web-Fix gegen den blauen Rahmen
            {...{ accessibilityRole: "text" }}
            {...props}
            onFocus={() => {
              setIsFocused(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={() => {
              setIsFocused(false);
              if (props.onBlur) props.onBlur(e);
            }}
          />

          {/* Rechtes Icon (z.B. Clear-Button oder Auge bei Passwort) */}
          {rightContent ? (
            rightContent
          ) : rightIcon ? (
            <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
              <Icon name={rightIcon} size={20} color="white" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Fehlermeldung */}
        {typeof error === "string" && <AppText style={styles.errorText}>{error}</AppText>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%"
  },
  label: {
    fontSize: 14,
    marginBottom: Spacing.xs,
    marginLeft: Spacing.xs
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: Spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    height: 54,
    paddingHorizontal: Spacing.md
  },
  containerFocused: {
    borderColor: MyTheme.primaryAccent,
    backgroundColor: "rgba(47, 196, 146, 0.08)"
  },
  containerError: {
    borderColor: "rgb(239, 68, 68)",
    backgroundColor: "rgba(239, 68, 68, 0.08)"
  },
  input: {
    flex: 1,
    color: MyTheme.text,
    fontSize: 16,
    height: "100%",
    // WICHTIG: Entfernt blauen Rahmen im Web
    ...{ outlineStyle: "none" }
  },
  leftIcon: {
    marginRight: Spacing.sm
  },
  rightIcon: {
    // backgroundColor: MyTheme.primaryAccent,
    width: 40,
    height: 40,
    borderRadius: Spacing.borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -Spacing.sm
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs
  }
});

export default AppInput;
