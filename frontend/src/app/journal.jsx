import React from "react";
import { View, StyleSheet, SectionList } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ScreenTitle from "@/components/ui/ScreenTitle";
import HistoryCard from "@/components/ui/HistoryCard";
import useStore from "@/store/useStore";

const JournalPage = () => {
  const styles = getStyles();
  const activities = useStore((state) => state.activities);
  const renderItem = ({ item }) => (
    <HistoryCard
      key={item.id}
      title={item.title}
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
        sections={activities || []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

const getStyles = () =>
  StyleSheet.create({
    wrapper: {
      flex: 1
    },
    sectionHeader: {
      paddingBottom: Spacing.sm,
      backgroundColor: "transparent"
    }
  });

export default JournalPage;
