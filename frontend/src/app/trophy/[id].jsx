import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Icon } from "@/components/icons/Icon";
import { mockTrophies } from "@/constants/MockData";

export default function TrophyScreen() {
  const { id } = useLocalSearchParams();
  const trophy = mockTrophies.find((t) => String(t.id) === String(id));

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconShowcase}>
          <View style={[styles.glowBackground]} />
          <View style={[styles.iconCircle]}>
            <Icon name={trophy.icon} size={60} color={"#fff"} />
          </View>
        </View>

        <AppText type="h1" bold style={{ textAlign: "center", marginBottom: Spacing.sm }}>
          {trophy.title}
        </AppText>

        <View style={styles.infoBox}>
          <AppText style={{ textAlign: "center", lineHeight: 24, color: MyTheme.text }}>{trophy.description}</AppText>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${(trophy.progress / trophy.goal) * 100}%`,
                  backgroundColor: MyTheme.primaryAccent
                }
              ]}
            />
          </View>
          <View style={styles.progressTextRow}>
            <AppText type="caption">{trophy.requirement}</AppText>
            <AppText type="caption" bold>
              {trophy.progress} / {trophy.goal}
            </AppText>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl * 2,
    alignItems: "center"
  },
  iconShowcase: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl
  },
  glowBackground: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
  infoBox: {
    backgroundColor: MyTheme.primary,
    padding: Spacing.md,
    borderRadius: Spacing.borderRadius.lg,
    marginTop: Spacing.xl,
    width: "100%"
  },
  progressSection: {
    width: "100%",
    marginTop: Spacing.xl
  },
  progressBarBg: {
    height: 12,
    backgroundColor: "#e5e7eb",
    borderRadius: Spacing.borderRadius.full,
    overflow: "hidden",
    marginBottom: Spacing.sm
  },
  progressBarFill: {
    height: "100%",
    borderRadius: Spacing.borderRadius.full
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
