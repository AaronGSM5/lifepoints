import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import AppBadge from "@/components/ui/AppBadge";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";

export default function BillingToggle({ billingCycle, onChange }) {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("settings");

  return (
    <View style={[styles.toggleContainer, { backgroundColor: MyTheme.primary }]}>
      <TouchableOpacity
        style={[styles.toggleButton, billingCycle === "monthly" && styles.toggleActive]}
        onPress={() => {
          triggerHaptic();
          onChange("monthly");
        }}
      >
        <AppText bold style={{ color: billingCycle === "monthly" ? MyTheme.background : MyTheme.text }}>
          {t("Monthly")}
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.toggleButton, billingCycle === "yearly" && styles.toggleActive]}
        onPress={() => {
          triggerHaptic();
          onChange("yearly");
        }}
      >
        <AppText bold style={{ color: billingCycle === "yearly" ? MyTheme.background : MyTheme.text }}>
          {t("Yearly")}
        </AppText>
        <AppBadge
          variant="primary"
          label={"-20%"}
          textStyle={{ fontSize: 10, color: MyTheme.text }}
          style={{ paddingHorizontal: 6, paddingVertical: 2 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 22,
    padding: 4,
    marginTop: Spacing.lg,
    width: "80%",
    alignSelf: "center"
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
  toggleActive: {
    backgroundColor: "#efeff4" // Ggf. dynamisch anpassen für Darkmode
  }
});
