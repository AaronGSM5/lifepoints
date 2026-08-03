import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import ScreenFooter from "@/components/layout/ScreenFooter";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import BaseBottomSheet from "@/components/ui/BaseBottomSheet";
import LpPoints from "@/components/ui/LpPoints";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

export default function TaskCompletedScreen() {
  const router = useRouter();
  const MyTheme = useAppTheme();
  const { t } = useTranslation();

  const { title = t("Task Complete!"), points = "+50 LP", redirectUrl = "/(tabs)/tasks" } = useLocalSearchParams();

  const [isSheetVisible, setIsSheetVisible] = useState(true);

  const handleCloseIntent = () => {
    setIsSheetVisible(false);
  };

  const handleAnimationComplete = () => {
    router.replace(redirectUrl);
  };

  return (
    <BaseBottomSheet
      isVisible={isSheetVisible}
      onClose={handleCloseIntent}
      onAnimationComplete={handleAnimationComplete}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={[styles.iconWrapper, { backgroundColor: addOpacity(MyTheme.success, 0.15) }]}>
            <Icon name="checkmark" size={40} color={MyTheme.success} />
          </View>

          <AppText type="h1" style={styles.title}>
            {t("Task Complete!")}
          </AppText>

          <AppText type="title" style={styles.title}>
            {title}
          </AppText>
          {points && <LpPoints points={points} size="large" />}
        </View>
        <ScreenFooter>
          <AppButton title={t("Continue")} onPress={handleCloseIntent} />
        </ScreenFooter>
      </View>
    </BaseBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Spacing.md
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.sm
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.borderRadius.full,
    borderWidth: 1
  },
  badgeText: {
    fontSize: 14
  }
  // footer: {
  //   width: "100%",
  //   marginTop: Spacing.md
  // },
  // button: {
  //   width: "100%"
  // }
});
