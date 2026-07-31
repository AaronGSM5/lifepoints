import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Stack } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import ScreenFooter from "@/components/layout/ScreenFooter";
import AppBadge from "@/components/ui/AppBadge";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import BackButton from "@/components/ui/BackButton";
import LpPoints from "@/components/ui/LpPoints";
import { rewardsCatalog } from "@/constants/RewardsCatalog";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

export default function RewardDetailScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("shop");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const redeemReward = useStore((state) => state.redeemReward);
  const userLevel = useStore((state) => state.profile.level);

  const reward = useMemo(() => rewardsCatalog.find((c) => String(c.id) === String(id)), [id]);
  const isLocked = useMemo(() => userLevel < reward.requiredLevel, [userLevel, reward.requiredLevel]);

  if (!reward) {
    return (
      <View style={styles.errorContainer}>
        <AppText type="h2">Reward nicht gefunden 😔</AppText>
        <AppButton title="Zurück" onPress={() => router.back()} style={{ marginTop: Spacing.md }} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Animated.Image
              source={{ uri: reward.image }}
              style={styles.image}
              sharedTransitionTag={`reward-image-${id}`}
            />

            <BackButton />

            <LinearGradient
              colors={["transparent", "rgba(18,18,18,0.6)", MyTheme.background]}
              style={styles.gradientOverlay}
            />
          </View>

          <View style={styles.content}>
            <View style={styles.headerRow}>
              <AppBadge
                label={reward.brand}
                iconNode={<Icon name={reward.icon} size={14} color={MyTheme.primaryAccent} />}
              />

              {isLocked && (
                <AppBadge
                  label={t("Locked")}
                  textStyle={{ fontSize: 10, color: MyTheme.text }}
                  style={{ backgroundColor: MyTheme.muted }}
                />
              )}
            </View>

            <AppText type="h1" style={{ marginBottom: Spacing.sm }}>
              {reward.title}
            </AppText>

            <LpPoints points={reward.points} size="large" />

            <AppText type="title" style={{ marginBottom: Spacing.sm }}>
              {t("Description")}
            </AppText>
            <AppText type="body" style={{ color: MyTheme.muted, lineHeight: 22 }}>
              {reward.description}
            </AppText>
          </View>
        </ScrollView>

        <ScreenFooter>
          <AppButton
            title={isLocked ? t("Locked") : t("Redeem Now")}
            size="lg"
            disabled={isLocked}
            onPress={() => redeemReward(reward.id)}
          />
        </ScreenFooter>
      </View>
    </>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background
    },
    imageContainer: {
      width: "100%",
      height: 350,
      position: "relative"
    },
    image: {
      width: "100%",
      height: "100%"
    },
    gradientOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 130
    },
    content: {
      padding: Spacing.lg,
      marginTop: -20
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Spacing.md
    }
  });
