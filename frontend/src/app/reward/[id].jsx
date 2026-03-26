import React from "react";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "@/components/icons/Icon";
import { mockRewards } from "@/constants/MockData";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "@/components/ui/BackButton";

export default function RewardDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const reward = mockRewards.find((c) => String(c.id) === String(id));

  if (!reward) {
    return (
      <View style={styles.errorContainer}>
        <AppText type="h2">Reward nicht gefunden 😔</AppText>
        <AppButton title="Zurück" onPress={() => router.back()} style={{ marginTop: Spacing.md }} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero-Image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: reward.image }} style={styles.image} />

            <BackButton />

            {/* Der Gradient sorgt dafür, dass das Bild sanft in den dunklen Hintergrund übergeht */}
            <LinearGradient
              colors={["transparent", "rgba(18,18,18,0.6)", MyTheme.background]}
              style={styles.gradientOverlay}
            />
          </View>

          {/* 2. Der Content-Bereich */}
          <View style={styles.content}>
            <View style={styles.headerRow}>
              <View style={styles.brandBadge}>
                <Icon name={reward.icon} size={14} color={MyTheme.primaryAccent} />
                <AppText bold type="caption" style={styles.brandText}>
                  {reward.brand}
                </AppText>
              </View>

              {reward.isLocked && (
                <View style={styles.lockedBadge}>
                  <AppText bold type="caption" style={{ fontSize: 10 }}>
                    LOCKED
                  </AppText>
                </View>
              )}
            </View>

            <AppText type="h1" style={{ marginBottom: Spacing.sm }}>
              {reward.title}
            </AppText>
            <AppText type="h2" style={{ color: MyTheme.primaryAccent, marginBottom: Spacing.lg }}>
              {reward.points} PTS
            </AppText>

            <AppText type="title" style={{ marginBottom: Spacing.sm }}>
              Beschreibung
            </AppText>
            <AppText type="body" style={{ color: MyTheme.muted, lineHeight: 22 }}>
              {reward.description}
            </AppText>
          </View>
        </ScrollView>

        <View style={styles.stickyFooter}>
          <AppButton
            variant="primary"
            title={reward.isLocked ? "Punkte sammeln zum Freischalten" : "Jetzt einlösen"}
            size="lg"
            disabled={reward.isLocked}
            style={reward.isLocked ? { opacity: 0.8 } : {}}
            onPress={() => alert("Reward eingelöst!")}
            bgColor={MyTheme.primaryAccent}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.background
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MyTheme.background
  },
  imageContainer: {
    width: "100%",
    height: 350,
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 130
  },
  backButton: {
    position: "absolute",
    top: 50, // Abstand für die Notch/Statusleiste auf dem Handy
    left: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    padding: Spacing.lg,
    marginTop: -20 // Zieht den Text leicht in den Gradienten hinein
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md
  },
  brandBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MyTheme.glas,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Spacing.borderRadius.full,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)"
  },
  brandText: {
    color: MyTheme.primaryAccent,
    marginLeft: Spacing.xs,
    letterSpacing: 1
  },
  lockedBadge: {
    backgroundColor: "#2A2A2A",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 4
  },
  stickyFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    backgroundColor: MyTheme.background,
    boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.3)",
    elevation: 20
  }
});
