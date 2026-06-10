import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "@/components/ui/AppText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import useStore from "@/store/useStore";
import { Icon } from "../icons/Icon";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TrophyPopup = () => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("trophies");
  const insets = useSafeAreaInsets();

  const popupQueue = useStore((state) => state.profile.popupQueue || []);
  const shiftPopupQueue = useStore((state) => state.shiftPopupQueue);

  const currentTrophyId = popupQueue[0];
  const trophy = currentTrophyId ? trophiesCatalog.find((t) => t.id === currentTrophyId) : null;

  // Hier passiert die Magie ohne Animation-Library:
  useEffect(() => {
    if (currentTrophyId && trophy) {
      // Warte 3 Sekunden, dann entferne die Trophäe aus der Queue
      const timer = setTimeout(() => {
        shiftPopupQueue();
      }, 3000);

      // Cleanup: Falls die Komponente unmountet, Timer löschen
      return () => clearTimeout(timer);
    }
  }, [currentTrophyId, shiftPopupQueue]);

  if (!currentTrophyId || !trophy) return null;

  return (
    <View
      style={[
        styles.popupContainer,
        {
          backgroundColor: MyTheme.primary,
          top: (insets?.top || 20) + Spacing.sm
        }
      ]}
    >
      <Icon name="trophy" size={24} color={MyTheme.gold} />
      <View style={styles.textContainer}>
        <AppText bold>{t("Trophy Unlocked!")}</AppText>
        <AppText type="caption">{trophy.title}</AppText>
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
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  textContainer: { marginLeft: Spacing.md }
});

export default TrophyPopup;
