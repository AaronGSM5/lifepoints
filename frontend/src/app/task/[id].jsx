import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { useStartTaskActivity } from "@/api/tasks/useStartTaskActivity";
import { useTasks } from "@/api/tasks/useTasks";
import { Icon } from "@/components/icons/Icon";
import DetailScreen from "@/components/layout/DetailScreen";
import AppBadge from "@/components/ui/AppBadge";
import AppButton from "@/components/ui/AppButton";
import AppImage from "@/components/ui/AppImage";
import AppText from "@/components/ui/AppText";
import HistoryCard from "@/components/ui/HistoryCard";
import LpPoints from "@/components/ui/LpPoints";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { formatHistoryDate } from "@/utils/dateHelpers";

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
    return <DetailScreen isLoading={isLoading} isNotFound={!isLoading} notFoundTitle={t("Task not found")} />;
  }

  return (
    <DetailScreen
      heroHeight={400}
      hero={
        <AppImage
          source={task.image}
          fallbackSource={require("@/../public/assets/appIcons/icon.png")}
          variant={"fill"}
        />
      }
      footerStyle={styles.footer}
      footer={
        <>
          <AppButton
            title={task.isLocked ? t("Level up to unlock") : t("Track now")}
            size="lg"
            disabled={task.isLocked}
            style={{ flex: 1 }}
            onPress={() => startTask(task._id)}
          />
          {!task.isLocked && (
            <AppButton
              variant="ghost"
              size="lg"
              icon={<Icon name={"checkmark"} size={28} color={MyTheme.primaryAccentText} />}
              accessibilityLabel={t("Complete task")}
            />
          )}
        </>
      }
    >
      <View style={styles.headerRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badges}>
          {task.category?.map((c) => (
            <AppBadge key={c} label={c} />
          ))}
        </ScrollView>

        {task.isLocked && (
          <AppBadge
            label={t("LOCKED")}
            textStyle={{ fontSize: 10, color: MyTheme.muted }}
            style={{ backgroundColor: MyTheme.glas }}
          />
        )}
      </View>

      <View>
        <AppText type="h1">{t(task.title)}</AppText>
        <LpPoints points={task.lifepoints} size="large" />
      </View>

      <View>
        <SectionHeader title={t("Description")} />
        <AppText type="body" style={{ color: MyTheme.muted, lineHeight: 22 }}>
          {t(task.description)}
        </AppText>
      </View>

      {mockSubSteps && mockSubSteps.length > 0 && (
        <View>
          <SectionHeader title={t("Process")} />

          {mockSubSteps.map((step, index) => {
            const isLast = index === mockSubSteps.length - 1 || step.isLast;
            const stepTitle = typeof step === "string" ? step : step.title;

            return (
              <View key={index} style={styles.stepRow}>
                <View style={styles.timelineGraphic}>
                  <View style={styles.stepDot} />
                  {!isLast && <View style={styles.dashedLine} />}
                </View>

                <View style={styles.stepContent}>
                  <AppText bold type="body">
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

      <View>
        <SectionHeader title={t("History")} />
        {taskTrackingHistory?.length > 0 ? (
          taskTrackingHistory.map((item) => (
            <HistoryCard
              key={item.id}
              title={t("Tracked")}
              subtitle={() => formatHistoryDate(item.time)}
              points={item.points}
              type="earn"
              pointsSuffix="LP"
              iconNode={<Icon name="checkmark" size={16} color={MyTheme.primaryAccentText} />}
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
          <AppText type="body" style={{ color: MyTheme.muted }}>
            {t("No entries yet.")}
          </AppText>
        )}
      </View>
    </DetailScreen>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    badges: {
      gap: Spacing.sm
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
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
