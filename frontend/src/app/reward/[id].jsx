import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "@/components/icons/Icon";
import { rewardsCatalog } from "@/constants/RewardsCatalog";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "@/components/ui/BackButton";
import AppBadge from "@/components/ui/AppBadge";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";

export default function RewardDetailScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("shop");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const redeemReward = useStore((state) => state.redeemReward);
  const userLevel = useStore((state) => state.profile.level);

  const reward = rewardsCatalog.find((c) => String(c.id) === String(id));
  const isLocked = userLevel < reward.requiredLevel;

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
            <AppText type="h2" style={{ color: MyTheme.primaryAccent, marginBottom: Spacing.lg }}>
              {reward.points} LP
            </AppText>

            <AppText type="title" style={{ marginBottom: Spacing.sm }}>
              {t("Description")}
            </AppText>
            <AppText type="body" style={{ color: MyTheme.muted, lineHeight: 22 }}>
              {reward.description}
            </AppText>
          </View>
        </ScrollView>

        <View style={styles.stickyFooter}>
          <AppButton
            variant="primary"
            title={isLocked ? t("Locked") : t("Redeem Now")}
            size="lg"
            style={isLocked ? { opacity: 0.8 } : {}}
            onPress={() => {
              if (!isLocked) redeemReward(reward.id);
            }}
            bgColor={isLocked ? MyTheme.muted : MyTheme.primaryAccent}
          />
        </View>
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
    },
    stickyFooter: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: Spacing.lg,
      backgroundColor: theme.background,
      boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.3)",
      elevation: 20
    }
  });
