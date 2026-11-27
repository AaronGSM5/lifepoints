import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router, Stack, useLocalSearchParams } from "expo-router";

// import { apiRequest } from "@/api/client/api";
import { useCommunityDetail } from "@/api/communities/useCommunityDetail";
// import { useCommunities } from "@/api/communities/useCommunities";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CommunityHeader from "@/components/social/CommunityDetailsHeader";
import AppButton from "@/components/ui/AppButton";
import AppSkeleton from "@/components/ui/AppSkeleton";
import AppText from "@/components/ui/AppText";
import BackButton from "@/components/ui/BackButton";
import EmptyView from "@/components/ui/EmptyView";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

const DESCRIPTION_SKELETON_LINES = ["100%", "100%", "60%"];

function CommunityDetailSkeleton() {
  return (
    <View testID="community-detail-skeleton">
      <AppSkeleton height={180} radius={0} />
      <BackButton withBackground style={styles.skeletonBack} />
      <View style={styles.skeletonAvatar}>
        <AppSkeleton width={80} height={80} radius={Spacing.borderRadius.lg} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleSection}>
          <AppSkeleton width="70%" height={32} />
          <View style={styles.skeletonLine}>
            <AppSkeleton width="45%" height={14} />
          </View>
        </View>
        <AppSkeleton height={48} radius={Spacing.borderRadius.full} />
        <View style={styles.section}>
          <AppSkeleton width="30%" height={22} />
          {DESCRIPTION_SKELETON_LINES.map((width, i) => (
            <View key={i} style={styles.skeletonLine}>
              <AppSkeleton width={width} height={14} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, refetch } = useCommunityDetail(id);
  const { t } = useTranslation("community");
  const myCommunities = useStore((state) => state.myCommunities);
  const joinCommunity = useStore((state) => state.joinCommunity);

  const handleJoinCommunity = useCallback(async () => {
    triggerHaptic("medium");
    // await apiRequest(`communities/${data._id}/join`, { method: "POST" })
    joinCommunity(data);
    router.push("/social");
  }, [data, joinCommunity]);

  const renderContent = () => {
    if (isLoading) return <CommunityDetailSkeleton />;

    if (isError || !data) {
      return (
        <View style={styles.stateContainer}>
          <BackButton withBackground />
          <View style={styles.stateContent}>
            <EmptyView
              icon={isError ? "infoCircle" : "search"}
              title={isError ? t("Could not load community") : t("Community not found")}
              description={isError ? t("Please check your internet connection and try again.") : undefined}
              actionTitle={isError ? t("Try again") : t("Go Back")}
              onAction={isError ? refetch : () => router.replace("/social")}
            />
          </View>
        </View>
      );
    }

    const isMember = myCommunities.some((c) => c?._id === data._id);
    const hasStats = data.memberCount != null;

    return (
      <>
        <CommunityHeader community={data} />

        <View style={styles.contentContainer}>
          {/* Title & Stats */}
          <View style={styles.titleSection}>
            <AppText type="h1" bold>
              {data.title}
            </AppText>
            {hasStats && (
              <AppText type="caption" style={styles.statsText}>
                {data.memberCount} {t("Members")} • {data.onlineCount || 0} Online
              </AppText>
            )}
          </View>

          {/* Action Button */}
          {!isMember && <AppButton title={t("Join Community")} style={styles.joinButton} onPress={handleJoinCommunity} />}

          {/* Live Section */}
          {data.isLive && (
            <View style={styles.liveContainer}>
              <AppText bold style={{ color: "#ef4444" }}>
                🔴 {t("LIVE NOW")}
              </AppText>
              <AppText type="caption">{data.liveTitle || ""}</AppText>
            </View>
          )}

          {/* About Section */}
          <View style={styles.section}>
            <SectionHeader title={t("About")} />
            <AppText style={[styles.description, !data.description && styles.placeholder]}>
              {data.description || t("This community has not added a description yet.")}
            </AppText>
          </View>

          {/* Sneak Peek / Preview Bereich */}
          <View style={styles.section}>
            <SectionHeader title={t("Community Tasks")} />
            <AppText type="caption">{t("Preview of what's waiting for you.")}</AppText>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWrapper variant="immersive">{renderContent()}</ScreenWrapper>
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
  placeholder: {
    fontStyle: "italic",
    opacity: 0.6
  },
  skeletonAvatar: {
    paddingHorizontal: Spacing.lg,
    marginTop: -40
  },
  stateContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: Spacing.md
  },
  stateContent: {
    flex: 1,
    justifyContent: "center"
  },
  skeletonBack: {
    position: "absolute",
    top: 20,
    left: Spacing.md
  },
  skeletonLine: {
    marginTop: Spacing.sm
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
