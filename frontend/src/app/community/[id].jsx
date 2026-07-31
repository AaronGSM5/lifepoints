import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router, Stack, useLocalSearchParams } from "expo-router";

// import { apiRequest } from "@/api/client/api";
import { useCommunityDetail } from "@/api/communities/useCommunityDetail";
// import { useCommunities } from "@/api/communities/useCommunities";
import CommunityHeader from "@/components/communities/CommunityDetailsHeader";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data } = useCommunityDetail(id);
  const { t } = useTranslation("community");
  const myCommunities = useStore((state) => state.myCommunities);
  const joinCommunity = useStore((state) => state.joinCommunity);

  const handleJoinCommunity = useCallback(async () => {
    triggerHaptic("medium");
    // await apiRequest(`communities/${data._id}/join`, { method: "POST" })
    joinCommunity(data);
    router.push("/social");
  }, [data, joinCommunity]);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWrapper scrollable withPaddingSides={false} withPaddingTop={false} withToolbar={false}>
        <CommunityHeader community={data} />

        <View style={styles.contentContainer}>
          {/* Title & Stats */}
          <View style={styles.titleSection}>
            <AppText type="h1" bold>
              {data?.title}
            </AppText>
            <AppText type="caption" style={styles.statsText}>
              {data?.memberCount} {t("Members")} • {data?.onlineCount || 0} Online
            </AppText>
          </View>

          {/* Action Button */}
          {!myCommunities.some((c) => c?._id === data?._id) && (
            <AppButton title={t("Join Community")} style={styles.joinButton} onPress={handleJoinCommunity} />
          )}

          {/* Live Section */}
          {data?.isLive && (
            <View style={styles.liveContainer}>
              <AppText bold style={{ color: "#ef4444" }}>
                🔴 {t("LIVE NOW")}
              </AppText>
              <AppText type="caption">{data?.liveTitle || ""}</AppText>
            </View>
          )}

          {/* About Section */}
          <View style={styles.section}>
            <SectionHeader title={t("About")} />
            <AppText style={styles.description}>{data?.description}</AppText>
          </View>

          {/* Sneak Peek / Preview Bereich */}
          <View style={styles.section}>
            <SectionHeader title={t("Community Tasks")} />
            <AppText type="caption">{t("Preview of what's waiting for you.")}</AppText>
          </View>
        </View>
      </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md
  },
  titleSection: {
    marginBottom: Spacing.lg
  },
  statsText: {
    marginTop: Spacing.xs,
    opacity: 0.7
  },
  joinButton: {
    marginBottom: Spacing.xl
  },
  section: {
    marginTop: Spacing.xl
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: Spacing.sm
  },
  description: {
    lineHeight: 22,
    opacity: 0.8
  },
  liveContainer: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: Spacing.md,
    borderRadius: Spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    marginBottom: Spacing.lg
  }
});
