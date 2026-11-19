import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useRouter } from "expo-router";

import RoutineForm from "@/components/tasks/RoutineForm";
import useStore from "@/store/useStore";

export default function CreateRoutineScreen() {
  const { t } = useTranslation("tasks");
  const router = useRouter();
  const createRoutine = useStore((state) => state.createRoutine);

  const handleSubmit = useCallback(
    (data) => {
      createRoutine(data);
      router.back();
    },
    [createRoutine, router]
  );

  return <RoutineForm title={t("Create routine")} submitLabel={t("Create routine")} onSubmit={handleSubmit} />;
}
