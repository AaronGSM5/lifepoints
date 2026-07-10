import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { router, Stack, useLocalSearchParams } from "expo-router";

import CommunityHeader from "@/components/communities/CommunityDetailsHeader";
import LeaderboardRow from "@/components/communities/LeaderboardRow";
import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppBadge from "@/components/ui/AppBadge";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

const MOCK_MEMBERS = [
  { id: "1", name: "Sarah", badge: "badge_elite", lp: 2450 },
  { id: "2", name: "Lukas", badge: "badge_rookie", lp: 1820 },
  { id: "3", name: "Julia", badge: "badge_elite", lp: 2100 },
  { id: "4", name: "Marc", badge: "badge_rookie", lp: 950 },
  { id: "5", name: "Elena", badge: "badge_elite", lp: 1600 },
  { id: "6", name: "Tim", badge: "badge_rookie", lp: 1200 },
  { id: "7", name: "Svenja", badge: null, lp: 800 }
];

export default function MyCommunityDetailScreen() {
  const { id } = useLocalSearchParams();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");
  const myCommunities = useStore((state) => state.myCommunities);
  const leaveCommunity = useStore((state) => state.leaveCommunity);
  const [isExpanded, setIsExpanded] = useState(false);

  const community = useMemo(() => myCommunities.find((c) => c._id === id || c.id === id), [id, myCommunities]);

  const sortedMembers = useMemo(() => {
    return [...MOCK_MEMBERS].sort((a, b) => b.lp - a.lp);
  }, []);

  const displayedMembers = useMemo(
    () => (isExpanded ? sortedMembers : sortedMembers.slice(0, 5)),
    [isExpanded, sortedMembers]
  );

  const handleExpand = useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);

  const handleLeaveCommunity = useCallback(() => {
    triggerHaptic("medium");
    router.replace("/communities");
    leaveCommunity(id);
  }, [id, leaveCommunity]);

  if (!community) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <ScreenWrapper>
          <View style={styles.errorContainer}>
            <AppText bold type={"h2"}>
              {t("Community not found")}
            </AppText>
            <AppButton
              title={t("Go Back")}
              onPress={() => router.replace("/communities")}
              style={{ marginTop: Spacing.lg }}
            />
          </View>
        </ScreenWrapper>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWrapper scrollable withPaddingSides={false} withPaddingTop={false} withToolbar={false}>
        <CommunityHeader community={community} />

        <View style={styles.contentContainer}>
          <View style={{ marginBottom: Spacing.lg }}>
            <AppText type="h1">{community?.title}</AppText>
            <AppText type="caption" style={styles.statsText}>
              {community?.memberCount} {t("Members")} • {community?.onlineCount || 0} Online
            </AppText>
          </View>

          <View style={styles.badgeContainer}>
            {community?.badges?.map((badge, i) => (
              <AppBadge key={i} variant="glas" label={t(badge)} />
            ))}
          </View>

          {community?.isLive && (
            <View style={styles.liveContainer}>
              <AppText bold style={{ color: "#ef4444" }}>
                {t("LIVE NOW")}
              </AppText>
              <AppText type="caption">Morning Meditation with Sarah</AppText>
            </View>
          )}

          <View style={styles.section}>
            <SectionHeader title={t("About")} />
            <AppText style={styles.description}>{community?.description}</AppText>
          </View>

          <View style={styles.section}>
            <SectionHeader title={t("Community Tasks")} />
            <AppText type="caption">{t("Preview of what's waiting for you.")}</AppText>
          </View>

          <View style={styles.section}>
            <SectionHeader
              title={t("Leaderboard")}
              rightLabel={!isExpanded ? t("Show all") : t("Show less")}
              rightLabelColor={MyTheme.primaryAccent}
              onRightPress={handleExpand}
            />

            <BaseCard>
              {displayedMembers.map((member, index) => (
                <LeaderboardRow key={member.id} member={member} index={index} theme={MyTheme} />
              ))}
            </BaseCard>

            {!isExpanded && sortedMembers.length > 5 && (
              <TouchableOpacity style={styles.expandButton} onPress={() => setIsExpanded(true)}>
                <AppText bold style={styles.expandButtonText}>
                  {t("Show all the")} {sortedMembers.length} {t("Members")}
                </AppText>
                <Icon name="down" size={16} color={MyTheme.primaryAccent} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <AppButton title={t("Leave Community")} onPress={handleLeaveCommunity} />
      </ScreenWrapper>
    </>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    contentContainer: {
      paddingHorizontal: Spacing.lg,
      marginTop: Spacing.md,
      paddingBottom: 40
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    statsText: {
      marginTop: Spacing.xs,
      opacity: 0.7
    },
    section: {
      marginTop: Spacing.xl
    },
    description: {
      lineHeight: 22,
      opacity: 0.8
    },
    liveContainer: {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius?.md || 8,
      borderWidth: 1,
      borderColor: "rgba(239, 68, 68, 0.2)",
      marginBottom: Spacing.lg
    },
    badgeContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      columnGap: Spacing.xs,
      rowGap: Spacing.sm
    },
    expandButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: Spacing.md,
      gap: 4
    },
    expandButtonText: {
      color: theme.primaryAccent,
      fontSize: 14
    }
  });
