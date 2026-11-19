import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

import { useTasks } from "@/api/tasks/useTasks";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import SuggestTaskInput from "@/components/tasks/SuggestTaskInput";
import TaskItem from "@/components/tasks/TaskItem";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";
import { capitalize } from "@/utils/textHelpers";

import EmptyView from "../ui/EmptyView";

const CatalogTab = ({ scrollY, onOpenInstaTracking }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const router = useRouter();
  const { t } = useTranslation(["tasks", "common"]);
  const showInstaTrackingModal = useStore((state) => state.showInstaTrackingModal);
  const trackTask = useStore((state) => state.trackTask);
  const completeTask = useStore((state) => state.completeTask);
  const { data, isLoading, isError, refetch } = useTasks();

  const listData = useMemo(() => {
    if (isError) {
      return [{ id: "error_state", type: "error_state" }];
    }

    const tasks = data?.data || [];

    if (!isLoading && !tasks.length) {
      return [{ id: "empty_state", type: "empty_state" }];
    }
    const topElements = [{ id: "search_bar", type: "search_bar" }];
    const uniqueCategories = [
      ...new Set(
        tasks.flatMap((task) => {
          if (!task.category) return [];
          return Array.isArray(task.category) ? task.category : [task.category];
        })
      )
    ];

    const groupedCategories = uniqueCategories
      .map((categoryName) => {
        const categoryTasks = tasks.filter((task) => {
          if (!task.category) return false;
          return Array.isArray(task.category) ? task.category.includes(categoryName) : task.category === categoryName;
        });

        return {
          id: `cat_row_${categoryName}`,
          type: "category_row",
          title: capitalize(categoryName),
          data: categoryTasks
        };
      })
      .filter((cat) => cat.data.length > 0);

    return [...topElements, ...groupedCategories];
  }, [data?.data, isError, isLoading]);

  const renderHorizontalTaskItem = useCallback(
    ({ item }) => (
      <View style={styles.horizontalTaskContainer}>
        <TaskItem
          id={item._id}
          isLoading={isLoading}
          title={item.title}
          description={item.description}
          lp={item.lifepoints}
          progress={item.progress}
          status={item.limit}
          icon={item.icon}
          requiresInput={item.requiresInput}
          onTrack={() => trackTask(item._id)}
          onInstaTrack={() => {
            if (showInstaTrackingModal) {
              onOpenInstaTracking(item._id);
            } else {
              triggerHaptic();
              completeTask(item._id);
            }
          }}
          onNavigate={() => router.push(`task/${item._id}`)}
        />
      </View>
    ),
    [isLoading, showInstaTrackingModal, onOpenInstaTracking, trackTask, completeTask, router, styles]
  );

  const renderItem = useCallback(
    ({ item }) => {
      const topOffset = { marginTop: Spacing.md + 44 + Spacing.md };
      switch (item.type) {
        case "error_state":
          return (
            <View style={[styles.paddedContent, topOffset]}>
              <EmptyView
                icon="infoCircle"
                iconColor={MyTheme.warning}
                title={t("Could not load tasks")}
                description={t("Please check your internet connection and try again.")}
                actionTitle={t("Try again")}
                onAction={refetch}
              />
            </View>
          );
        case "empty_state":
          return (
            <View style={[styles.paddedContent, topOffset]}>
              <EmptyView
                icon="flower"
                iconColor={MyTheme.primaryAccent}
                title={t("No tasks available")}
                description={t(
                  "We are currently updating our challenges. But hey, you can shape LifePoints by suggesting a task."
                )}
                actionTitle={t("Refresh")}
                onAction={refetch}
              />
            </View>
          );
        case "search_bar":
          return (
            <View style={[styles.paddedContent, topOffset]}>
              <AppInput icon="search" placeholder={t("Search...")} blur />
            </View>
          );

        case "category_row":
          return (
            <View style={styles.categoryRow}>
              <SectionHeader title={item.title} isLoading={isLoading} style={styles.paddedContent} />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item.data}
                keyExtractor={(taskItem) => taskItem?._id.toString()}
                renderItem={renderHorizontalTaskItem}
                contentContainerStyle={styles.horizontalListPadding}
                snapToInterval={280 + Spacing.md}
                snapToAlignment="start"
                decelerationRate="fast"
              />
            </View>
          );
        default:
          return null;
      }
    },
    [isLoading, renderHorizontalTaskItem, t, styles, MyTheme, refetch]
  );

  const renderFooter = () => {
    if (isError) return null;
    return (
      <View style={[styles.paddedContent, { marginTop: Spacing.md }]}>
        <AppText type="title" style={{ textAlign: "center", marginBottom: Spacing.md }}>
          {t("Can't find what you're searching for?")}
        </AppText>
        <SuggestTaskInput />
      </View>
    );
  };

  return (
    <AnimatedScreenList
      scrollY={scrollY}
      data={listData}
      keyExtractor={(item) => item?.id.toString()}
      renderItem={renderItem}
      ListFooterComponent={!isLoading ? renderFooter : null}
      withTopPadding={false}
    />
  );
};

const getStyles = () =>
  StyleSheet.create({
    paddedContent: {
      paddingHorizontal: Spacing.md
    },
    categoryRow: {
      marginBottom: Spacing.lg
    },
    horizontalListPadding: {
      paddingHorizontal: Spacing.md
    },
    horizontalTaskContainer: {
      width: 280,
      marginRight: Spacing.md
    }
  });

export default CatalogTab;
