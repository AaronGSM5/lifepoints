import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import AppBadge from "@/components/ui/AppBadge";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

const ACTIVE_BG_COLORS = {
  light: "rgb(26, 34, 53)",
  dark: "rgb(233, 233, 233)"
};

const BillingToggle = memo(({ billingCycle, onChange }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const { t } = useTranslation("settings");
  const activeBackgroundColor = isDarkMode ? ACTIVE_BG_COLORS.dark : ACTIVE_BG_COLORS.light;
  const handlePress = useCallback(
    (cycle) => {
      triggerHaptic();
      onChange(cycle);
    },
    [onChange]
  );
  return (
    <View style={styles.toggleContainer}>
      {["monthly", "yearly"].map((cycle) => {
        const isActive = cycle === billingCycle;

        return (
          <TouchableOpacity
            key={cycle}
            style={[styles.toggleButton, isActive && { backgroundColor: activeBackgroundColor }]}
            onPress={() => handlePress(cycle)}
          >
            <AppText bold style={{ color: isActive ? MyTheme.background : MyTheme.text }}>
              {t(cycle === "monthly" ? "Monthly" : "Yearly")}
            </AppText>
            {cycle === "yearly" && (
              <AppBadge
                variant="primary"
                label={"-20%"}
                textStyle={{ fontSize: 10, color: MyTheme.text }}
                style={styles.badge}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

BillingToggle.displayName = "BillingToggle";

const getStyles = (theme) =>
  StyleSheet.create({
    toggleContainer: {
      flexDirection: "row",
      borderRadius: 22,
      padding: 4,
      marginTop: Spacing.lg,
      width: "80%",
      alignSelf: "center",
      backgroundColor: theme.primary
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 18,
      flexDirection: "row",
      justifyContent: "center",
      gap: 6
    },
    badge: {
      paddingHorizontal: 6,
      paddingVertical: 2
    }
  });

export default BillingToggle;
