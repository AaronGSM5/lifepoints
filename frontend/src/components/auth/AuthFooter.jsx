import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";

export default function AuthFooter({ text, linkText, href }) {
  const styles = getStyles();

  return (
    <View style={styles.footer}>
      <AppText type="caption">
        {text + " "}
        <Link href={href} asChild>
          <Pressable hitSlop={10}>
            <AppText type="caption" bold style={{ color: MyTheme.primaryAccent }}>
              {linkText}
            </AppText>
          </Pressable>
        </Link>
      </AppText>
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    footer: {
      marginTop: "auto",
      alignItems: "center",
      marginBottom: Spacing.lg
    }
  });
