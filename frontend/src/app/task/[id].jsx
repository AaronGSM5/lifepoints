import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "@/components/icons/Icon";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { taskTrackingHistory } from "@/mocks/ActivityHistory";
import HistoryCard from "@/components/ui/HistoryCard";
import BackButton from "@/components/ui/BackButton";
import AppBadge from "@/components/ui/AppBadge";
import useStore from "@/store/useStore";

export default function TaskDetailScreen() {
  const styles = getStyles();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const trackTask = useStore((state) => state.trackTask);

  const task = tasksCatalog.find((t) => String(t.id) === String(id));

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

            <BackButton />

            <LinearGradient
              colors={["transparent", "rgba(18,18,18,0.6)", MyTheme.background]}
              style={styles.gradientOverlay}
            />
          </View>

          <View style={styles.content}>
            <View style={styles.headerRow}>
              <AppBadge iconNode={<Icon name={task.icon} size={20} color={MyTheme.primaryAccent} />} />

              {task.isLocked && (
                <AppBadge
                  label={"LOCKED"}
                  textStyle={{ fontSize: 10, color: MyTheme.muted }}
                  style={{ backgroundColor: "#2A2A2A" }}
                />
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

              {taskTrackingHistory.length > 0 ? (
                taskTrackingHistory.map((item) => (
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
            style={task.isLocked ? { opacity: 0.8, flex: 1 } : { flex: 8 }}
            onPress={() => trackTask(task.id)}
            bgColor={MyTheme.primaryAccent}
          />
          {task.isLocked === false && (
            <AppButton
              variant="ghost"
              icon={<Icon name={"checkmark"} size={28} color={MyTheme.primaryAccent} />}
              iconPosition="center"
              style={{ flex: 2 }}
            />
          )}
        </View>
      </View>
    </>
  );
}

const getStyles = () =>
  StyleSheet.create({
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
    stickyFooter: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: Spacing.lg,
      backgroundColor: MyTheme.background,
      boxShadow: `0px -10px 20px rgba(0, 0, 0, 0.3)`,
      flexDirection: "row",
      elevation: 20
    },
    historySection: {
      marginTop: Spacing.xl
    }
  });
