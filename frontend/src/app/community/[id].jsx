import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

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
  const { t } = useTranslation("community");
  // const { recommended = [], myCommunities = [] } = useCommunities();
  const recommended = [];
  const myCommunities = [];
  const joinCommunity = useStore((state) => state.joinCommunity);
  const community = recommended.find((c) => c.id === id) || myCommunities.find((c) => c.id === id);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWrapper scrollable withPaddingSides={false} withPaddingTop={false} withToolbar={false}>
        <CommunityHeader community={community} />

        <View style={styles.contentContainer}>
          {/* Title & Stats */}
          <View style={styles.titleSection}>
            <AppText type="h1" bold>
              {community?.title}
            </AppText>
            <AppText type="caption" style={styles.statsText}>
              {community?.members} {t("Members")} • {community?.onlineCount} Online
            </AppText>
          </View>

          {/* Action Button */}
          {!myCommunities.some((c) => c?.id === community.id) && (
            <AppButton
              title={t("Join Community")}
              style={styles.joinButton}
              onPress={() => {
                triggerHaptic("medium");
                joinCommunity(community);
              }}
            />
          )}

          {/* Live Section */}
          {community?.isLive && (
            <View style={styles.liveContainer}>
              <AppText bold style={{ color: "#ef4444" }}>
                🔴 {t("LIVE NOW")}
              </AppText>
              <AppText type="caption">{community?.liveTitle || ""}</AppText>
            </View>
          )}

          {/* About Section */}
          <View style={styles.section}>
            <SectionHeader title={t("About")} />
            <AppText style={styles.description}>{community?.desc}</AppText>
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
