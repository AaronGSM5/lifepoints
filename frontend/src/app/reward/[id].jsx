import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { useLocalSearchParams } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import DetailScreen from "@/components/layout/DetailScreen";
import AppBadge from "@/components/ui/AppBadge";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import LpPoints from "@/components/ui/LpPoints";
import SectionHeader from "@/components/ui/SectionHeader";
import { rewardsCatalog } from "@/constants/RewardsCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

export default function RewardDetailScreen() {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("shop");
  const { id } = useLocalSearchParams();
  const redeemReward = useStore((state) => state.redeemReward);
  const userLevel = useStore((state) => state.profile.level);

  const reward = useMemo(() => rewardsCatalog.find((c) => String(c.id) === String(id)), [id]);
  const isLocked = userLevel < (reward?.requiredLevel || 0);

  if (!reward) {
    return <DetailScreen isNotFound notFoundTitle={t("Reward not found")} />;
  }

  return (
    <DetailScreen
      hero={
        <Animated.Image
          source={{ uri: reward.image }}
          style={styles.image}
          sharedTransitionTag={`reward-image-${id}`}
        />
      }
      footer={
        <AppButton
          title={isLocked ? t("Locked") : t("Redeem Now")}
          size="lg"
          disabled={isLocked}
          onPress={() => redeemReward(reward.id)}
        />
      }
    >
      <View style={styles.headerRow}>
        <AppBadge
          label={reward.brand}
          iconNode={<Icon name={reward.icon} size={14} color={MyTheme.primaryAccentText} />}
        />

        {isLocked && (
          <AppBadge
            label={t("Locked")}
            textStyle={{ fontSize: 10, color: MyTheme.text }}
            style={{ backgroundColor: MyTheme.muted }}
          />
        )}
      </View>

      <View>
        <AppText type="h1">{t(reward.title)}</AppText>
        <LpPoints points={reward.points} size="large" />
      </View>

      <View>
        <SectionHeader title={t("Description")} />
        <AppText type="body" style={{ color: MyTheme.muted, lineHeight: 22 }}>
          {t(reward.description)}
        </AppText>
      </View>
    </DetailScreen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
