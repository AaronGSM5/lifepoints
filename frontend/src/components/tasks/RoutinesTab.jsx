import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import PublicRoutineCard from "@/components/tasks/PublicRoutineCard";
import RoutineCard from "@/components/tasks/RoutineCard";
import AppInput from "@/components/ui/AppInput";
import EmptyView from "@/components/ui/EmptyView";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { mockPublicRoutines } from "@/mocks/PublicRoutines";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import { triggerHaptic } from "@/utils/haptics";
import { isRoutineCompletedOn, isRoutineDueOn } from "@/utils/routineHelpers";

const PUBLIC_CARD_WIDTH = 260;

const RoutinesTab = ({ scrollY }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation(["tasks", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOtherVisible, setIsOtherVisible] = useState(true);

  const routines = useStore((state) => state.routines);
  const adoptPublicRoutine = useStore((state) => state.adoptPublicRoutine);

  const { dueRoutines, otherRoutines, doneTodayCount } = useMemo(() => {
    const today = new Date();
    const due = routines.filter((routine) => isRoutineDueOn(routine, today));
    return {
      dueRoutines: due,
      otherRoutines: routines.filter((routine) => !isRoutineDueOn(routine, today)),
      doneTodayCount: due.filter((routine) => isRoutineCompletedOn(routine, today)).length
    };
  }, [routines]);

  const adoptedIds = useMemo(
    () => new Set(routines.map((routine) => routine.source?.publicRoutineId).filter(Boolean)),
    [routines]
  );

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return mockPublicRoutines.filter(
      (routine) =>
        routine.title.toLowerCase().includes(trimmedQuery) ||
        routine.authorUsername.toLowerCase().includes(trimmedQuery) ||
        routine.category.toLowerCase().includes(trimmedQuery)
    );
  }, [isSearching, trimmedQuery]);

  const recommendedRoutines = useMemo(() => mockPublicRoutines.filter((routine) => routine.recommended), []);

  const listData = useMemo(() => {
    const items = [{ id: "search_bar", type: "search_bar" }];

    if (isSearching) {
      if (!searchResults.length) return [...items, { id: "search_empty", type: "search_empty" }];
      return [...items, ...searchResults.map((routine) => ({ id: routine.id, type: "search_result", routine }))];
    }

    items.push({ id: "due_header", type: "due_header" });
    if (!dueRoutines.length) {
      items.push({ id: "due_empty", type: "due_empty" });
    } else {
      dueRoutines.forEach((routine, i) =>
        items.push({ id: routine.id, type: "routine", routine, initialExpanded: i === 0 })
      );
    }

    if (otherRoutines.length) {
      items.push({ id: "other_header", type: "other_header" });
      if (isOtherVisible) {
        otherRoutines.forEach((routine) => items.push({ id: routine.id, type: "routine", routine }));
      }
    }

    items.push({ id: "recommended", type: "recommended" });
    return items;
  }, [isSearching, searchResults, dueRoutines, otherRoutines, isOtherVisible]);

  const handleCreate = useCallback(() => router.push("/routine/create"), []);

  const handleAdopt = useCallback(
    (publicRoutine) => {
      adoptPublicRoutine(publicRoutine);
      triggerHaptic("success");
    },
    [adoptPublicRoutine]
  );

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "search_bar":
          return (
            <View style={[styles.paddedContent, styles.topOffset]}>
              <AppInput
                icon="search"
                placeholder={t("Search routines")}
                value={searchQuery}
                onChangeText={setSearchQuery}
                blur
              />
            </View>
          );

        case "search_result":
          return (
            <View style={[styles.paddedContent, styles.itemSpacing]}>
              <PublicRoutineCard
                routine={item.routine}
                isAdopted={adoptedIds.has(item.routine.id)}
                onAdopt={() => handleAdopt(item.routine)}
              />
            </View>
          );

        case "search_empty":
          return (
            <View style={styles.paddedContent}>
              <EmptyView
                icon="search"
                title={t("No routines found")}
                description={t("Try another name or create your own routine.")}
                actionTitle={t("Create routine")}
                onAction={handleCreate}
              />
            </View>
          );

        case "due_header":
          return (
            <SectionHeader
              title={t("Due today {{done}}/{{total}}", { done: doneTodayCount, total: dueRoutines.length })}
              rightIcon={<Icon name="add" />}
              onRightPress={handleCreate}
              style={styles.paddedContent}
            />
          );

        case "due_empty":
          return (
            <View style={styles.paddedContent}>
              <EmptyView
                icon="calendar"
                iconColor={MyTheme.primaryAccent}
                iconBgColor={addOpacity(MyTheme.primaryAccent, 0.16)}
                iconSize={24}
                title={routines.length ? t("Nothing due today") : t("No routines yet")}
                description={
                  routines.length
                    ? t("Enjoy your free day, your streaks are safe.")
                    : t("Bundle your favourite tasks into a routine and build a streak.")
                }
                actionTitle={t("Create routine")}
                onAction={handleCreate}
              />
            </View>
          );

        case "routine":
          return (
            <View style={[styles.paddedContent, styles.itemSpacing]}>
              <RoutineCard routine={item.routine} initialExpanded={item.initialExpanded} />
            </View>
          );

        case "other_header":
          return (
            <SectionHeader
              title={t("Other routines")}
              rightIcon={<Icon name={isOtherVisible ? "down" : "right"} color={MyTheme.muted} />}
              onRightPress={() => setIsOtherVisible((prev) => !prev)}
              style={[styles.paddedContent, styles.sectionSpacing]}
              textStyle={{ color: MyTheme.muted }}
            />
          );

        case "recommended":
          return (
            <View style={styles.sectionSpacing}>
              <SectionHeader title={t("Recommended routines")} style={styles.paddedContent} />
              <FlatList
                horizontal
                data={recommendedRoutines}
                keyExtractor={(routine) => routine.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carousel}
                renderItem={({ item: routine }) => (
                  <PublicRoutineCard
                    routine={routine}
                    style={styles.carouselCard}
                    isAdopted={adoptedIds.has(routine.id)}
                    onAdopt={() => handleAdopt(routine)}
                  />
                )}
              />
            </View>
          );

        default:
          return null;
      }
    },
    [
      styles,
      t,
      searchQuery,
      adoptedIds,
      handleAdopt,
      handleCreate,
      doneTodayCount,
      dueRoutines.length,
      MyTheme,
      routines.length,
      isOtherVisible,
      recommendedRoutines
    ]
  );

  return (
    <View style={styles.container} testID="routines-tab">
      <AnimatedScreenList
        scrollY={scrollY}
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        withTopPadding={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    paddedContent: {
      paddingHorizontal: Spacing.md
    },
    topOffset: {
      marginTop: Spacing.md
    },
    itemSpacing: {
      marginBottom: Spacing.md
    },
    sectionSpacing: {
      marginTop: Spacing.sm
    },
    carousel: {
      paddingHorizontal: Spacing.md,
      gap: Spacing.md
    },
    carouselCard: {
      width: PUBLIC_CARD_WIDTH
    }
  });

export default RoutinesTab;
