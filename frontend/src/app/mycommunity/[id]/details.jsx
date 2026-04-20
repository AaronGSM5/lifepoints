import React from "react";
import { StyleSheet, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import CommunityHeader from "@/components/communities/CommunityDetailsHeader";
import { useCommunities } from "@/hooks/useCommunities";
import SectionHeader from "@/components/ui/SectionHeader";

export default function MyCommunityDetailScreen() {
  const { id } = useLocalSearchParams();
  const { recommended, myCommunities } = useCommunities();
  const community = recommended.find((c) => c.id === id) || myCommunities.find((c) => c.id === id);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWrapper scrollable withPaddingSides={false} withPaddingTop={false}>
        <CommunityHeader community={community} />

        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <AppText type="h1" bold>
              {community?.title}
            </AppText>
            <AppText type="caption" style={styles.statsText}>
              {community?.members} Mitglieder • {community?.onlineCount} Online
            </AppText>
          </View>

          <AppButton title="Join Community" onPress={() => console.log("Joined!")} style={styles.joinButton} />

          {community?.isLive && (
            <View style={styles.liveContainer}>
              <AppText bold style={{ color: "#ef4444" }}>
                LIVE NOW
              </AppText>
              <AppText type="caption">Morning Meditation with Sarah</AppText>
            </View>
          )}

          <View style={styles.section}>
            <SectionHeader title={"About"} />
            <AppText style={styles.description}>{community?.desc}</AppText>
          </View>

          <View style={styles.section}>
            <SectionHeader title={"Community Tasks"} />
            <AppText type="caption">Preview of what's waiting for you.</AppText>
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
    borderRadius: Spacing.borderRadius?.md || 8,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    marginBottom: Spacing.lg
  }
});
