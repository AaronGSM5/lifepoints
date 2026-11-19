import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Spacing } from "@/constants/Spacing";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";

import TrophyCard from "../trophies/TrophyCard";
import AppSkeleton from "../ui/AppSkeleton";
import EmptyView from "../ui/EmptyView";
import SectionHeader from "../ui/SectionHeader";

const ProfileTrophies = memo(({ isLoading, trophies = [] }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("trophies");

  const mergedTrophies = useMemo(() => {
    return trophies
      .map((item) => ({
        ...item,
        meta: trophiesCatalog.find((entry) => entry.id === item.id)
      }))
      .filter((item) => item.meta);
  }, [trophies]);

  const handleSeeAll = useCallback(() => {
    router.push("/trophies");
  }, []);

  const isEmpty = !isLoading && !mergedTrophies.length;

  return (
    <View style={styles.container}>
      <SectionHeader
        title={t("Trophies")}
        icon={"trophy"}
        iconColor={MyTheme.gold}
        rightLabel={t("See all")}
        rightLabelColor={MyTheme.gold}
        onRightPress={handleSeeAll}
        isLoading={isLoading}
      />
      {isEmpty ? (
        <EmptyView
          icon="trophy"
          iconSize={24}
          iconColor={MyTheme.gold}
          title={t("No trophies yet")}
          description={t("Your first trophy is just one good deed away.")}
          actionTitle={t("See all")}
          onAction={handleSeeAll}
          containerStyle={styles.empty}
        />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <AppSkeleton key={`skel-trophy-${i}`} width={80} height={80} radius={Spacing.borderRadius.lg} />
              ))
            : mergedTrophies.map((item) => (
                <View key={`trophy-${item?.id}`} style={styles.cardWrapper}>
                  <TrophyCard
                    id={item.meta.id}
                    title={item.meta.title}
                    icon={item.meta.icon}
                    unlocked={item.unlocked}
                    justUnlocked={false}
                  />
                </View>
              ))}
        </ScrollView>
      )}
    </View>
  );
});

ProfileTrophies.displayName = "ProfileTrophies";

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg
  },
  empty: {
    minHeight: 0,
    paddingVertical: Spacing.md
  },
  scrollContent: {
    gap: Spacing.md
  },
  cardWrapper: {
    width: 80
  }
});

export default ProfileTrophies;
