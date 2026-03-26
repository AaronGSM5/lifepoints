import React from "react";
import { View, StyleSheet, SectionList } from "react-native";
import { mockSectionedActivities } from "@/constants/MockData";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ScreenTitle from "@/components/ui/ScreenTitle";
import HistoryCard from "@/components/ui/HistoryCard";

const JournalPage = () => {
  const renderItem = ({ item }) => (
    <HistoryCard
      title={item.title}
      subtitle={item.description}
      rightSubtitle={item.time}
      points={item.points}
      type={item.type}
      pointsSuffix="LP"
      iconNode={<AppText>✨</AppText>}
      iconContainerStyle={{ width: 46, height: 46, borderRadius: 23 }}
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <AppText type="body" bold style={{ color: MyTheme.muted }}>
        {title}
      </AppText>
    </View>
  );

  return (
    <ScreenWrapper style={styles.wrapper} withPaddingBottom={false} withPaddingTop={false}>
      <ScreenTitle title={"My Impact Journal"} />
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
    paddingBottom: Spacing.sm,
    backgroundColor: "transparent"
  }
});

export default JournalPage;
