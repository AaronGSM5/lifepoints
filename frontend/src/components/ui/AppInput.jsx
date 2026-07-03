import React, { forwardRef, useState } from "react";
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { BlurView } from "expo-blur";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/addOpacity";

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
      blur = false,
      blurIntensity = 65,
      blurTint,
      isForm = false,
      ...props
    },
    ref
  ) => {
    const MyTheme = useAppTheme();
    const styles = getStyles(MyTheme);
    const isDarkMode = useStore((state) => state.isDarkMode);
    const [isFocused, setIsFocused] = useState(false);

    const isMultiline = props.multiline;

    const renderInputContent = () => (
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
          {...{ accessibilityRole: "text" }}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
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
      isFocused && { borderColor: MyTheme.primaryAccent, backgroundColor: addOpacity(MyTheme.primaryAccent, 0.08) },
      !isDarkMode &&
        isForm && { borderColor: MyTheme.primaryAccent, backgroundColor: addOpacity(MyTheme.primaryAccent, 0.08) },
      error && styles.containerError,
      isValid && !isFocused && { borderColor: MyTheme.primaryAccent },
      isMultiline && styles.containerMultiline,
      blur && { backgroundColor: "transparent" },
      inputStyle
    ];

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
            tint={isDarkMode ? "dark" : "light"}
            experimentalBlurMethod="dimezisBlurView"
            style={[{ overflow: "hidden" }, ...containerStyles]}
          >
            {renderInputContent()}
          </BlurView>
        ) : (
          <View style={containerStyles}>{renderInputContent()}</View>
        )}

        {typeof error === "string" && <AppText style={styles.errorText}>{error}</AppText>}
      </View>
    );
  }
);

AppInput.displayName = "AppInput";

const getStyles = (theme) => {
  return StyleSheet.create({
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
      borderColor: theme.inputBorder,
      height: 54,
      paddingHorizontal: Spacing.md
    },
    containerMultiline: {
      height: "auto",
      minHeight: 100,
      alignItems: "flex-start",
      paddingVertical: Spacing.xs
    },
    containerError: {
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.08)"
    },
    input: {
      flex: 1,
      color: theme.text,
      fontSize: 16,
      height: "100%",
      ...{ outlineStyle: "none" }
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
      color: "#ef4444",
      fontSize: 12,
      marginTop: Spacing.xs,
      marginLeft: Spacing.xs
    }
  });
};

export default AppInput;
