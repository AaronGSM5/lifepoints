import React, { forwardRef, memo, useCallback, useMemo, useState } from "react";
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { BlurView } from "expo-blur";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

import { Icon } from "../icons/Icon";

const AppInput = memo(
  forwardRef(
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
        blur = false,
        blurIntensity = 65,
        blurTint,
        isForm = false,
        onFocus,
        onBlur,
        value,
        maxLength,
        showCharCount = false,
        ...props
      },
      ref
    ) => {
      const MyTheme = useAppTheme();
      const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
      const [isFocused, setIsFocused] = useState(false);
      const isDarkMode = MyTheme.isDark;

      const isMultiline = props.multiline;
      const currentLength = value?.length || 0;

      const handleFocus = useCallback(
        (e) => {
          setIsFocused(true);
          if (onFocus) onFocus(e);
        },
        [onFocus]
      );

      const handleBlur = useCallback(
        (e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        },
        [onBlur]
      );

      const inputContent = (
        <>
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
            style={[styles.input, isMultiline && styles.inputMultiline, style]}
            placeholderTextColor={MyTheme.muted}
            selectionColor={MyTheme.primaryAccent}
            underlineColorAndroid="transparent"
            cursorColor={MyTheme.primaryAccent}
            textAlignVertical={isMultiline ? "top" : "center"}
            accessibilityRole="text"
            value={value}
            maxLength={maxLength}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {rightContent ? (
            rightContent
          ) : rightIcon ? (
            <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
              <Icon name={rightIcon} size={20} />
            </TouchableOpacity>
          ) : null}
        </>
      );

      const containerStyles = [
        styles.container,
        isFocused && { borderColor: MyTheme.primaryAccent, backgroundColor: addOpacity(MyTheme.primaryAccent, 0.05) },
        !isDarkMode &&
          isForm && { borderColor: MyTheme.primaryAccent, backgroundColor: addOpacity(MyTheme.primaryAccent, 0.05) },
        error && styles.containerError,
        isValid && !isFocused && { borderColor: MyTheme.primaryAccent },
        isMultiline && styles.containerMultiline,
        blur && { backgroundColor: "transparent" },
        inputStyle
      ];

      const hasFooter = typeof error === "string" || (showCharCount && maxLength);

      return (
        <View style={[styles.wrapper, containerStyle, { marginBottom: bottomMargin ? Spacing.lg : 0 }]}>
          {label && (
            <AppText style={styles.label} bold>
              {label}
            </AppText>
          )}

          {blur ? (
            <BlurView
              intensity={Platform.OS === "android" ? 100 : blurIntensity}
              tint={blurTint || (isDarkMode ? "dark" : "light")}
              experimentalBlurMethod="dimezisBlurView"
              style={[{ overflow: "hidden" }, ...containerStyles]}
            >
              {inputContent}
            </BlurView>
          ) : (
            <View style={containerStyles}>{inputContent}</View>
          )}

          {hasFooter && (
            <View style={styles.footerContainer}>
              {typeof error === "string" ? <AppText style={styles.errorText}>{error}</AppText> : <View />}

              {showCharCount && maxLength && (
                <AppText style={[styles.charCount, currentLength >= maxLength && styles.charCountWarning]}>
                  {currentLength} / {maxLength}
                </AppText>
              )}
            </View>
          )}
        </View>
      );
    }
  )
);

AppInput.displayName = "AppInput";

const getStyles = (theme) =>
  StyleSheet.create({
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
      backgroundColor: theme.glas,
      borderRadius: Spacing.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.inputBorder,
      height: 54,
      paddingHorizontal: Spacing.md,
      boxShadow: "-2px 0px 5px rgba(0, 0, 0, 0.25)"
    },
    containerMultiline: {
      height: "auto",
      minHeight: 100,
      alignItems: "flex-start",
      paddingVertical: Spacing.xs
    },
    containerError: {
      borderColor: theme.warning,
      backgroundColor: addOpacity(theme.warning, 0.05)
    },
    input: {
      flex: 1,
      color: theme.text,
      fontSize: 16,
      height: "100%",
      ...Platform.select({ web: { outlineStyle: "none" } })
    },
    inputMultiline: {
      height: "auto",
      minHeight: 80,
      paddingTop: Spacing.sm,
      paddingBottom: Spacing.sm
    },
    leftIcon: {
      marginRight: Spacing.sm
    },
    rightIcon: {
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
      marginRight: -Spacing.sm
    },
    errorText: {
      color: theme.warning,
      fontSize: 12,
      marginTop: Spacing.xs,
      marginLeft: Spacing.xs
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: Spacing.xs,
      paddingHorizontal: Spacing.xs
    },
    charCount: {
      color: theme.muted,
      fontSize: 12,
      marginLeft: Spacing.sm
    },
    charCountWarning: {
      color: theme.warning,
      fontWeight: "bold"
    }
  });

export default AppInput;
