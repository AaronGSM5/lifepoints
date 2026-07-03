import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

import { Icon } from "../icons/Icon";

const TrophyPopup = () => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("trophies");
  const insets = useSafeAreaInsets();

  const popupQueue = useStore((state) => state.profile.popupQueue || []);
  const shiftPopupQueue = useStore((state) => state.shiftPopupQueue);

  const currentTrophyId = popupQueue[0];
  const trophy = currentTrophyId ? trophiesCatalog.find((t) => t.id === currentTrophyId) : null;

  useEffect(() => {
    if (currentTrophyId && trophy) {
      const timer = setTimeout(() => {
        shiftPopupQueue();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentTrophyId, shiftPopupQueue, trophy]);

  if (!currentTrophyId || !trophy) return null;

  return (
    <View
      style={[
        styles.popupContainer,
        {
          backgroundColor: MyTheme.primary,
          borderWidth: 1,
          borderColor: MyTheme.secondary,
          top: (insets?.top || 10) + Spacing.sm
        }
      ]}
    >
      <Icon name="trophy" size={24} color={MyTheme.gold} />
      <View style={styles.textContainer}>
        <AppText type="caption" bold>
          {t("Trophy Unlocked!")}
        </AppText>
        <AppText bold type="title">
          {t(trophy.title)}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 9999,
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: Spacing.borderRadius.lg,
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)"
  },
  textContainer: {
    marginLeft: Spacing.md
  }
});

export default TrophyPopup;
