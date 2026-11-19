import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import BackButton from "@/components/ui/BackButton";
import { Spacing } from "@/constants/Spacing";

// Kopfzeile der Routine-Screens: Zurück | Titel | optionale Aktion rechts
const RoutineScreenHeader = memo(({ title, rightAction }) => (
  <View style={styles.header}>
    <BackButton />
    <AppText bold numberOfLines={1} style={styles.title}>
      {title}
    </AppText>
    <View style={styles.side}>{rightAction}</View>
  </View>
));
RoutineScreenHeader.displayName = "RoutineScreenHeader";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm
  },
  title: {
    flex: 1,
    fontSize: 16,
    textAlign: "center"
  },
  side: {
    minWidth: 40,
    alignItems: "flex-end"
  }
});

export default RoutineScreenHeader;
