import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Link } from "expo-router";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function AuthFooter({ text, linkText, href }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

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
