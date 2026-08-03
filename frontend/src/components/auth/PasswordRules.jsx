import { useEffect, useMemo, useState } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const AnimatedRule = ({ rule, isMet, theme, styles }) => {
  const [animValue] = useState(() => new Animated.Value(isMet ? 1 : 0));

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isMet ? 1 : 0,
      duration: 300,
      useNativeDriver: Platform.OS !== "web"
    }).start();
  }, [isMet, animValue]);

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.85]
  });

  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.4]
  });

  return (
    <Animated.View style={[styles.ruleRow, { transform: [{ scale }], opacity }]}>
      <Icon
        name={isMet ? "checkmark" : "close"}
        size={20}
        color={isMet ? theme.success : theme.warning}
        style={{ marginRight: Spacing.sm }}
      />
      <AppText type={"caption"} style={styles.displayText}>
        {rule.displayMessage}
      </AppText>
    </Animated.View>
  );
};

export default function PasswordRules({ passwordRules, passwordRuleStatus }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  return (
    <View style={styles.container}>
      {passwordRules.map((rule) => (
        <AnimatedRule
          key={rule.name}
          rule={rule}
          isMet={passwordRuleStatus[rule.name]}
          theme={MyTheme}
          styles={styles}
        />
      ))}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingTop: Spacing.xs,
      paddingBottom: Spacing.sm
    },
    ruleRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.xs,
      transformOrigin: "left center"
    },
    displayText: {
      color: theme.text
    }
  });
