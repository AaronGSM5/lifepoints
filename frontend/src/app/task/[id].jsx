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
import AppBadge from "@/components/ui/AppBadge";
import AppButton from "@/components/ui/AppButton";
import AppImage from "@/components/ui/AppImage";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import AppText from "@/components/ui/AppText";
import BackButton from "@/components/ui/BackButton";
import HistoryCard from "@/components/ui/HistoryCard";
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <View style={styles.imageContainer}>
            <AppImage
              source={task.image}
              fallbackSource={require("@/../public/assets/appIcons/icon.png")}
              variant={"fill"}
            />

            <BackButton />

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
            <AppText type="h2" style={{ color: MyTheme.primaryAccent, marginBottom: Spacing.lg }}>
              {task.lifepoints} LP
            </AppText>

            <AppText type="title" style={{ marginBottom: Spacing.sm }}>
              {t("Description")}
            </AppText>
            <AppText type="body" style={{ color: MyTheme.muted, lineHeight: 22 }}>
              {t(task.description)}
            </AppText>

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

        <View style={styles.stickyFooter}>
          <AppButton
            variant="primary"
            title={task.isLocked ? t("Level up to unlock") : t("Track now")}
            size="lg"
            disabled={task.isLocked}
            style={task.isLocked ? { opacity: 0.8, flex: 1 } : { flex: 8 }}
            onPress={() => startTask(task._id)}
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
      // justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Spacing.md
    },
    stickyFooter: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: Spacing.lg,
      backgroundColor: theme.background,
      boxShadow: `0px -10px 20px rgba(0, 0, 0, 0.3)`,
      flexDirection: "row",
      elevation: 20
    },
    historySection: {
      marginTop: Spacing.xl
    }
  });
