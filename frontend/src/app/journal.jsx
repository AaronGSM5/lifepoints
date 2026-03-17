import React from "react";
import { View, StyleSheet, SectionList } from "react-native";
import { Icon } from "@/components/icons/Icon";
import { mockSectionedActivities } from "@/constants/MockData";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";

const JournalPage = () => {
  const renderItem = ({ item }) => {
    const isSpend = item.type === "spend";
    const pointColor = isSpend ? "#666" : MyTheme.primaryAccent;
    const prefix = isSpend ? "-" : "+";

    return (
      <View style={styles.activityItem}>
        <View style={styles.iconCircle}>
          <AppText>✨</AppText>
        </View>

        <View style={styles.textContainer}>
          <AppText type="body" bold>
            {item.title}
          </AppText>
          <AppText type="caption" numberOfLines={1}>
            {item.description}
          </AppText>
        </View>

        <View style={styles.pointsContainer}>
          <AppText type="body" bold style={{ color: pointColor }}>
            {prefix}
            {item.points} LP
          </AppText>
          <AppText type="caption" style={{ fontSize: 12, marginTop: Spacing.xs }}>
            {item.time}
          </AppText>
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <AppText type="body" bold style={{ color: MyTheme.muted }}>
        {title}
      </AppText>
    </View>
  );

  return (
    <ScreenWrapper style={styles.wrapper} withPaddingBottom={false}>
      <SectionList
        sections={mockSectionedActivities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  sectionHeader: {
    paddingVertical: Spacing.md,
    backgroundColor: "transparent"
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MyTheme.primary,
    padding: Spacing.md,
    borderRadius: Spacing.borderRadius.md,
    marginBottom: Spacing.sm
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: Spacing.borderRadius.full,
    backgroundColor: MyTheme.secondary,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    marginLeft: Spacing.md - 4
  },
  pointsContainer: {
    alignItems: "flex-end"
  }
});

export default JournalPage;
