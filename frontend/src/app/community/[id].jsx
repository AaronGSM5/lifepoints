import React from "react";
import { StyleSheet, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import CommunityHeader from "@/components/communities/CommunityDetailsHeader";
import { useCommunities } from "@/hooks/useCommunities";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { recommended, myCommunities } = useCommunities();
  const community = recommended.find((c) => c.id === id) || myCommunities.find((c) => c.id === id);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWrapper scrollable withPaddingSides={false} style={{ paddingTop: insets.top }}>
        <CommunityHeader community={community} />

        <View style={styles.contentContainer}>
          {/* Title & Stats */}
          <View style={styles.titleSection}>
            <AppText type="h1" bold>
              {community?.title}
            </AppText>
            <AppText type="caption" style={styles.statsText}>
              {community?.members} Mitglieder • 42 Online
            </AppText>
          </View>

          {/* Action Button */}
          <AppButton title="Join Community" onPress={() => console.log("Joined!")} style={styles.joinButton} />

          {/* Live Section */}
          {community?.isLive && (
            <View style={styles.liveContainer}>
              <AppText bold style={{ color: "#ef4444" }}>
                🔴 LIVE NOW
              </AppText>
              <AppText type="caption">Morning Meditation with Sarah</AppText>
            </View>
          )}

          {/* About Section */}
          <View style={styles.section}>
            <AppText bold style={styles.sectionTitle}>
              About
            </AppText>
            <AppText style={styles.description}>{community?.desc}</AppText>
          </View>

          {/* Sneak Peek / Preview Bereich */}
          <View style={styles.section}>
            <AppText bold style={styles.sectionTitle}>
              Community Tasks
            </AppText>
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
    marginTop: 4,
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
