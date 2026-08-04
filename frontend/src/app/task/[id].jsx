import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Stack } from "expo-router";

import { useStartTaskActivity } from "@/api/tasks/useStartTaskActivity";
import { useTasks } from "@/api/tasks/useTasks";
import { Icon } from "@/components/icons/Icon";
import ScreenFooter from "@/components/layout/ScreenFooter";
import AppBadge from "@/components/ui/AppBadge";
import AppButton from "@/components/ui/AppButton";
import AppImage from "@/components/ui/AppImage";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import AppText from "@/components/ui/AppText";
import BackButton from "@/components/ui/BackButton";
import HistoryCard from "@/components/ui/HistoryCard";
import LpPoints from "@/components/ui/LpPoints";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

const formatHistoryDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);

  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  return `${dateString} • ${timeString}`;
};

const mockSubSteps = [
  { title: "First things first", description: "This is first" },
  { title: "Losing is Winning", description: "Now this" },
  { title: "A la boneur", description: "Wow! You got this" },
  { title: "Pizza time", description: "MHhhhh Pizza..", isLast: true }
];

export default function TaskDetailScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const activities = useStore((state) => state.activities);
  const { data: tasks, isLoading } = useTasks();
  const { mutate: startTask } = useStartTaskActivity();
  const task = useMemo(() => {
    if (!tasks?.data) return null;
    return tasks?.data.find((t) => String(t._id) === String(id));
  }, [tasks?.data, id]);
  const taskTrackingHistory = useMemo(
    () => activities.filter((item) => String(item.taskId) === String(id)),
    [activities, id]
  );

  if (isLoading || !task) {
    return (
      <View style={styles.errorContainer}>
        {isLoading ? (
          <AppLoadingSpinner />
        ) : (
          <>
            <AppText type="h2">"Task nicht gefunden 😔</AppText>
            <AppButton title="Zurück" onPress={() => router.back()} style={{ marginTop: Spacing.md }} />
          </>
        )}
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: Spacing.xl }}
        >
          <View style={styles.imageContainer}>
            <AppImage
              source={task.image}
              fallbackSource={require("@/../public/assets/appIcons/icon.png")}
              variant={"fill"}
            />

            <BackButton withBackground style={{ position: "absolute", top: 20, left: Spacing.md }} />

            <LinearGradient
              colors={["transparent", "rgba(18,18,18,0.6)", MyTheme.background]}
              style={styles.gradientOverlay}
            />
          </View>

          <View style={styles.headerRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 8 }}>
              {task.category?.map((c) => (
                <AppBadge key={c} label={c} style={{ marginLeft: Spacing.sm }} />
              ))}
            </ScrollView>

            {task.isLocked && (
              <View style={{ flex: 2 }}>
                <AppBadge
                  label={t("LOCKED")}
                  textStyle={{ fontSize: 10, color: MyTheme.muted }}
                  style={{ backgroundColor: "#2A2A2A" }}
                />
              </View>
            )}
          </View>
          <View style={styles.paddedContent}>
            <AppText type="h1" style={{ marginBottom: Spacing.sm }}>
              {t(task.title)}
            </AppText>

            <LpPoints points={task.lifepoints} size="large" />
            <View style={styles.section}>
              <SectionHeader title={t("Description")} />
              <AppText type="body" style={{ color: MyTheme.muted, lineHeight: 22 }}>
                {t(task.description)}
              </AppText>
            </View>

            {mockSubSteps && mockSubSteps.length > 0 && (
              <View style={styles.section}>
                <SectionHeader title={t("Ablauf")} />

                {mockSubSteps.map((step, index) => {
                  const isLast = index === task.subSteps.length - 1 || step.isLast;
                  const stepTitle = typeof step === "string" ? step : step.title;

                  return (
                    <View key={index} style={styles.stepRow}>
                      <View style={styles.timelineGraphic}>
                        <View style={styles.stepDot} />
                        {!isLast && <View style={styles.dashedLine} />}
                      </View>

                      <View style={styles.stepContent}>
                        <AppText bold type="body" style={styles.stepTitle}>
                          {t(stepTitle)}
                        </AppText>
                        {step.description && (
                          <AppText type="caption" style={styles.stepDescription}>
                            {t(step.description)}
                          </AppText>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {taskTrackingHistory?.length > 0 ? (
              <View style={styles.historySection}>
                <AppText type="title" style={{ marginBottom: Spacing.md }}>
                  {t("History")}
                </AppText>

                {taskTrackingHistory.map((item) => (
                  <HistoryCard
                    key={item.id}
                    title={t("Tracked")}
                    subtitle={formatHistoryDate(item.time)}
                    points={item.points}
                    type="earn"
                    pointsSuffix="LP"
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
                ))}
              </View>
            ) : (
              <View>
                <AppText type="body" style={{ color: MyTheme.muted, marginTop: Spacing.lg }}>
                  {t("No entries yet.")}
                </AppText>
              </View>
            )}
          </View>
        </ScrollView>

        <ScreenFooter style={styles.footer}>
          <AppButton
            title={task.isLocked ? t("Level up to unlock") : t("Track now")}
            size="lg"
            disabled={task.isLocked}
            style={task.isLocked ? { flex: 1 } : { flex: 8 }}
            onPress={() => startTask(task._id)}
          />
          {task.isLocked === false && (
            <AppButton
              variant="ghost"
              icon={<Icon name={"checkmark"} size={28} color={MyTheme.primaryAccent} />}
              iconPosition="center"
              style={{ flex: 2 }}
            />
          )}
        </ScreenFooter>
      </View>
    </>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background
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
    paddedContent: {
      paddingHorizontal: Spacing.md
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.md
    },
    footer: {
      flexDirection: "row",
      gap: Spacing.sm
    },
    historySection: {
      marginTop: Spacing.xl
    },
    section: {
      marginBottom: Spacing.md
    },
    stepRow: {
      flexDirection: "row"
    },
    timelineGraphic: {
      alignItems: "center",
      width: 24,
      marginRight: Spacing.md
    },
    stepDot: {
      width: 12,
      height: 12,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.primaryAccent,
      zIndex: 2
    },
    dashedLine: {
      width: 0,
      flex: 1,
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: theme.muted,
      marginTop: Spacing.xs,
      marginBottom: Spacing.xs,
      borderRadius: 1
    },
    stepContent: {
      flex: 1,
      paddingBottom: Spacing.xl
    },
    stepDescription: {
      marginTop: Spacing.xs
    }
  });
