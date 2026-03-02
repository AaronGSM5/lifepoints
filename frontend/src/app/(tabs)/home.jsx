import { StyleSheet, View, Image, Animated, FlatList } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { useCallback, useEffect, useRef, useState } from "react";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import { mockFeedItems } from "@/constants/MockData";
import FeedItem from "@/components/home/FeedItem";
import SuggestTaskInput from "@/components/tasks/SuggestTaskInput";
import LpChart from "@/components/home/LpChart";
import RecommendedTasks from "@/components/RecommendedTasks";

export default function HomeScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("Das ist ein provozierter Render-Crash!");
  }
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 1700,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [pulseAnim]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Loading simulation
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const renderHeader = () => (
    <>
      <View style={styles.heroSection}>
        <Image source={require("../../../public/assets/sportevent.png")} style={styles.heroImage} resizeMode="cover" />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AppText type="title">Active Tasks</AppText>
          <Animated.View style={[styles.pulseDot, { opacity: pulseAnim }]} />
        </View>

        <View style={styles.taskCardActive}>
          <View style={styles.taskIconContainer}>
            <Icon name="timer" size={20} color={MyTheme.primaryAccent} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText bold type="title">
              Morning Vitality
            </AppText>
          </View>
          <View style={styles.lpContainer}>
            <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
              1,500
            </AppText>
            <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
              LP
            </AppText>
          </View>
          <AppButton
            size="sm"
            icon={<Icon name="checkmark" size={20} />}
            iconPosition="center"
            bgColor={MyTheme.primaryAccent}
            onPress={() => setShouldCrash(true)}
          />
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <AppText type="title">Feed</AppText>
      </View>
    </>
  );

  return (
    <ScreenWrapper scrollable={false} withPaddingBottom={false}>
      <FlatList
        data={mockFeedItems}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        renderItem={({ item }) => <FeedItem {...item} />}
      />

      {/* <RecommendedTasks /> */}
      {/* <LpChart /> */}
      {/* <SuggestTaskInput /> */}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: Spacing.lg
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: Spacing.borderRadius.lg
  },
  section: {
    marginBottom: Spacing.lg
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md
  },
  pulseDot: {
    width: Spacing.xs + 2,
    height: Spacing.xs + 2,
    borderRadius: Spacing.borderRadius.full,
    backgroundColor: MyTheme.primaryAccent,
    marginLeft: Spacing.sm
  },
  taskCardActive: {
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.25)"
  },
  taskIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(16, 185, 129, 0.16)",
    borderRadius: Spacing.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md
  },
  lpContainer: {
    flexDirection: "row",
    gap: Spacing.xs,
    marginRight: Spacing.md
  },
  listContent: {
    marginBottom: Spacing.md
  }
});
