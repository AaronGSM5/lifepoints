import { memo, useEffect, useMemo, useState } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const AnimatedRule = memo(({ rule, isMet, theme, styles }) => {
  const [animValue] = useState(() => new Animated.Value(isMet ? 1 : 0));

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isMet ? 1 : 0,
      duration: 300,
      useNativeDriver: Platform.OS !== "web"
    }).start();
  }, [isMet, animValue]);

  const { scale, opacity } = useMemo(
    () => ({
      scale: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.85]
      }),
      opacity: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.4]
      })
    }),
    [animValue]
  );

  return (
    <View style={styles.ruleRow}>
      <Icon
        name={isMet ? "checkmark" : "close"}
        size={20}
        color={isMet ? theme.success : theme.warning}
        style={{ marginRight: Spacing.sm }}
      />
      <Animated.View style={[{ transform: [{ scale }], opacity, transformOrigin: "left center" }]}>
        <AppText type={"caption"} style={styles.displayText}>
          {rule.displayMessage}
        </AppText>
      </Animated.View>
    </View>
  );
});

const PasswordRules = memo(({ passwordRules, passwordRuleStatus }) => {
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
});

AnimatedRule.displayName = "AnimatedRule";
PasswordRules.displayName = "PasswordRules";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingTop: Spacing.xs,
      paddingBottom: Spacing.sm
    },
    ruleRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.xs
    },
    displayText: {
      color: theme.text
    }
  });

export default PasswordRules;
