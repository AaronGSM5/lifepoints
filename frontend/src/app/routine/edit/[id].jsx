import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import RoutineForm from "@/components/tasks/RoutineForm";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";

export default function EditRoutineScreen() {
  const { t } = useTranslation("tasks");
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const routine = useStore((state) => state.routines.find((r) => r.id === id));
  const updateRoutine = useStore((state) => state.updateRoutine);
  const deleteRoutine = useStore((state) => state.deleteRoutine);

  const handleSubmit = useCallback(
    (data) => {
      updateRoutine(id, data);
      router.back();
    },
    [updateRoutine, id, router]
  );

  // Detailseite der gelöschten Routine überspringen und direkt zum Tasks-Tab zurück
  const handleDelete = useCallback(() => {
    router.dismissTo("/(tabs)/tasks");
    deleteRoutine(id);
  }, [deleteRoutine, id, router]);

  if (!routine) {
    return (
      <View style={styles.notFound}>
        <AppText type="h2">{t("Routine not found")}</AppText>
        <AppButton title={t("common:back")} onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <RoutineForm
      title={t("Edit routine")}
      submitLabel={t("common:save")}
      initialRoutine={routine}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  );
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md
  }
});
