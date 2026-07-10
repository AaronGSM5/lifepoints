import React from "react";
import { useTranslation } from "react-i18next";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppIconPicker from "@/components/settings/AppIconPicker";
import ColorThemePicker from "@/components/settings/ColorThemePicker";
import ScreenTitle from "@/components/ui/ScreenTitle";
import ColorModePicker from "@/components/settings/ColorModePicker";

export default function AppearanceScreen() {
  const { t } = useTranslation("settings");

  return (
    <ScreenWrapper scrollable>
      <ScreenTitle title={t("Appearance")} subtitle={t("Customize the app's design to suit your preferences.")} />
      <ColorModePicker />
      <ColorThemePicker />
      <AppIconPicker />
    </ScreenWrapper>
  );
}