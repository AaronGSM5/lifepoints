import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "../icons/Icon";
import { MyTheme } from "@/constants/Colors";
import AppText from "../ui/AppText";
import { Spacing } from "@/constants/Spacing";

const JournalPreview = ({ activities }) => {
  const previewData = activities.slice(0, 3);
  return (
    <View style={styles.container}>
      {previewData.map((item) => {
        const isSpend = item.type === "spend";
        const lpColor = isSpend ? MyTheme.warning : MyTheme.primaryAccent;
        const prefix = isSpend ? "-" : "+";
        return (
          <View key={item.id} style={styles.activityItem}>
            <View style={styles.iconCircle}>
              <AppText>✨</AppText>
            </View>

            <View style={styles.textContainer}>
              <AppText type="body" bold>
                {item.title}
              </AppText>
              <AppText type="caption" style={{ fontSize: 12, marginTop: Spacing.xs }}>
                {item.time}
              </AppText>
            </View>

            <AppText type="body" bold style={{ color: lpColor }}>
              {prefix}
              {item.points} LP
            </AppText>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
    backgroundColor: MyTheme.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: MyTheme.secondary,
    borderRadius: Spacing.borderRadius.md
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: MyTheme.secondary,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    marginLeft: Spacing.md - 4
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs
  }
});

export default JournalPreview;
