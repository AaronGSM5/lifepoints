import React from "react";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "@/components/icons/Icon";
import { mockTasks } from "@/constants/MockData";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mockTaskTrackingHistory } from "@/constants/MockData";
import HistoryCard from "@/components/ui/HistoryCard";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const task = mockTasks.find((t) => String(t.id) === String(id));

  if (!task) {
    return (
      <View style={styles.errorContainer}>
        <AppText type="h2">Task nicht gefunden 😔</AppText>
        <AppButton title="Zurück" onPress={() => router.back()} style={{ marginTop: Spacing.md }} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <View style={styles.imageContainer}>
            <Image
              source={task.image ? { uri: task.image } : require("@/../public/assets/icon.png")}
              style={styles.image}
            />

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Icon name="back" />
            </TouchableOpacity>

            <LinearGradient
              colors={["transparent", "rgba(18,18,18,0.6)", MyTheme.background]}
              style={styles.gradientOverlay}
            />
          </View>

          <View style={styles.content}>
            <View style={styles.headerRow}>
              <View style={styles.brandBadge}>
                <Icon name={task.icon} size={14} color={MyTheme.primaryAccent} />
              </View>

              {task.isLocked && (
                <View style={styles.lockedBadge}>
                  <AppText bold type="caption" style={{ fontSize: 10 }}>
                    LOCKED
                  </AppText>
                </View>
              )}
            </View>

            <AppText type="h1" style={{ marginBottom: Spacing.sm }}>
              {task.title}
            </AppText>
            <AppText type="h2" style={{ color: MyTheme.primaryAccent, marginBottom: Spacing.lg }}>
              {task.lp} PTS
            </AppText>

            <AppText type="title" style={{ marginBottom: Spacing.sm }}>
              Beschreibung
            </AppText>
            <AppText type="body" style={{ color: MyTheme.muted, lineHeight: 22 }}>
              {task.description}
            </AppText>

            <View style={styles.historySection}>
              <AppText type="title" style={{ marginBottom: Spacing.md }}>
                Verlauf
              </AppText>

              {mockTaskTrackingHistory.length > 0 ? (
                mockTaskTrackingHistory.map((item) => (
                  <HistoryCard
                    key={item.id}
                    title="Getrackt"
                    subtitle={item.date}
                    points={item.points}
                    type="earn"
                    pointsSuffix="PTS"
                    iconNode={<Icon name="checkmark" size={16} color={MyTheme.primaryAccent} />}
                    containerStyle={{
                      backgroundColor: MyTheme.glas,
                      borderColor: MyTheme.glas,
                      borderWidth: 1
                    }}
                    iconContainerStyle={{
                      backgroundColor: MyTheme.glas,
                      width: 32,
                      height: 32,
                      borderRadius: 16
                    }}
                  />
                ))
              ) : (
                <AppText type="body" style={{ color: MyTheme.muted, fontStyle: "italic" }}>
                  Noch keine Einträge vorhanden.
                </AppText>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.stickyFooter}>
          <AppButton
            variant="primary"
            title={task.isLocked ? "Level auf zum Freischalten" : "Jetzt tracken"}
            size="lg"
            disabled={task.isLocked}
            style={task.isLocked ? { opacity: 0.8 } : {}}
            onPress={() => alert("Task getrackt!")}
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
    height: 400,
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
    height: 100
  },
  backButton: {
    position: "absolute",
    top: 50,
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
    marginTop: -20
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20
  },
  historySection: {
    marginTop: Spacing.xl
  }
});
