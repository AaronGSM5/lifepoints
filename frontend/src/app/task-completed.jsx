import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import BaseBottomSheet from "@/components/ui/BaseBottomSheet";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

export default function TaskCompletedScreen() {
  const router = useRouter();
  const MyTheme = useAppTheme();
  const { t } = useTranslation();

  const { title = t("Task Complete!"), points = "+50 LP", redirectUrl = "/(tabs)/tasks" } = useLocalSearchParams();

  const handleClose = () => {
    router.replace(redirectUrl);
  };

  return (
    <BaseBottomSheet isVisible onClose={handleClose} onAnimationComplete={handleClose}>
      <View style={styles.content}>
        <View style={[styles.iconWrapper, { backgroundColor: addOpacity(MyTheme.success, 0.15) }]}>
          <Icon name="checkmark" size={40} color={MyTheme.success} />
        </View>

        <AppText type="h2" style={styles.title}>
          {title}
        </AppText>

        {/* LifePoints Badge */}
        {points && (
          <View
            style={[
              styles.badge,
              { backgroundColor: addOpacity(MyTheme.primaryAccent, 0.15), borderColor: MyTheme.primaryAccent }
            ]}
          >
            <Icon name="checkmarkCircle" size={16} color={MyTheme.primaryAccent} style={{ marginRight: 6 }} />
            <AppText style={[styles.badgeText, { color: MyTheme.primaryAccent }]} bold>
              {points}
            </AppText>
          </View>
        )}
      </View>

      {/* Button unten */}
      <View style={styles.footer}>
        <AppButton title={t("Continue")} onPress={handleClose} style={styles.button} />
      </View>
    </BaseBottomSheet>
  );
}

const styles = StyleSheet.create({
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
  },
  footer: {
    width: "100%",
    marginTop: Spacing.md
  },
  button: {
    width: "100%"
  }
});
