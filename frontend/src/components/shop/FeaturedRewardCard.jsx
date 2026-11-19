import React, { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppBadge from "@/components/ui/AppBadge";
import AppButton from "@/components/ui/AppButton";
import AppModal from "@/components/ui/AppModal";
import AppSkeleton from "@/components/ui/AppSkeleton";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import LpPoints from "@/components/ui/LpPoints";
import { featuredRewards } from "@/constants/FeaturedRewards";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import { triggerHaptic } from "@/utils/haptics";

// Ruhige Premium-Karte (Gold-Akzent) statt Werbebanner; Einlösen nur nach Bestätigung mit Guthaben-Check
const FeaturedRewardCard = memo(({ isLoading }) => {
  const { t } = useTranslation("shop");
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const redeemReward = useStore((state) => state.redeemReward);
  const userLp = useStore((state) => state.profile.profileLp);
  const userLevel = useStore((state) => state.profile.level);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const selectedReward = featuredRewards?.[0];

  const handleOpenConfirm = useCallback(() => {
    setIsRedeemed(false);
    setIsConfirmVisible(true);
  }, []);
  const handleCloseConfirm = useCallback(() => setIsConfirmVisible(false), []);

  if (isLoading) {
    return <AppSkeleton height={180} radius={Spacing.borderRadius.lg} />;
  }

  if (!selectedReward) return null;

  const isDiscounted = !!selectedReward.discount;
  const currentPrice = isDiscounted ? selectedReward.discount.newPrice : selectedReward.price;
  const oldPrice = isDiscounted ? selectedReward.discount.oldPrice : null;
  const requiredLevel = selectedReward.requiredLevel || 0;
  const isLocked = userLevel < requiredLevel;
  const missingLp = Math.max(currentPrice - (userLp || 0), 0);
  const canRedeem = !isLocked && missingLp === 0;

  const handleConfirm = () => {
    redeemReward(selectedReward.id);
    triggerHaptic("success");
    setIsRedeemed(true);
  };

  return (
    <>
      <BaseCard style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.iconCircle}>
            <Icon name={selectedReward.icon} size={20} color={MyTheme.gold} />
          </View>
          <AppBadge variant="premium" label={t("BEST VALUE")} />
        </View>

        <View style={styles.textBlock}>
          <AppText type="h2">{t(selectedReward.title)}</AppText>
          <AppText type="caption">{t(selectedReward.description)}</AppText>
        </View>

        <View style={styles.footer}>
          <View>
            {isDiscounted && (
              <AppText type="caption" style={styles.oldPrice}>
                {oldPrice} LP
              </AppText>
            )}
            <LpPoints points={currentPrice} />
          </View>
          <AppButton title={t("Redeem")} onPress={handleOpenConfirm} />
        </View>
      </BaseCard>

      <AppModal visible={isConfirmVisible} onClose={handleCloseConfirm} contentStyle={styles.modal}>
        {isRedeemed ? (
          <>
            <Icon name="checkmarkCircle" size={40} color={MyTheme.primaryAccent} />
            <AppText type="title" style={styles.modalTitle}>
              {t("Redeemed!")}
            </AppText>
            <AppText type="caption" style={styles.modalText}>
              {t("You will find your reward in your journal.")}
            </AppText>
            <AppButton title={t("common:close")} onPress={handleCloseConfirm} fullWidth />
          </>
        ) : (
          <>
            <AppText type="title" style={styles.modalTitle}>
              {t("Redeem {{title}}?", { title: t(selectedReward.title) })}
            </AppText>
            <View style={styles.modalRow}>
              <AppText type="caption">{t("Price")}</AppText>
              <LpPoints points={currentPrice} size="xs" />
            </View>
            <View style={styles.modalRow}>
              <AppText type="caption">{t("Your balance")}</AppText>
              <LpPoints points={userLp || 0} size="xs" />
            </View>
            {isLocked && <AppBadge variant="premium" label={t("From level {{level}}", { level: requiredLevel })} />}
            {!isLocked && missingLp > 0 && (
              <AppText type="caption" style={styles.modalText}>
                {t("You need {{missing}} more LP.", { missing: missingLp })}
              </AppText>
            )}
            <View style={styles.modalActions}>
              <AppButton variant="ghost" title={t("common:cancel")} onPress={handleCloseConfirm} />
              <AppButton title={t("Redeem")} onPress={handleConfirm} disabled={!canRedeem} />
            </View>
          </>
        )}
      </AppModal>
    </>
  );
});
FeaturedRewardCard.displayName = "FeaturedRewardCard";

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      gap: Spacing.md,
      borderColor: addOpacity(theme.gold, 0.35)
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: addOpacity(theme.gold, 0.12),
      justifyContent: "center",
      alignItems: "center"
    },
    textBlock: {
      gap: Spacing.xs
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end"
    },
    oldPrice: {
      textDecorationLine: "line-through"
    },
    modal: {
      gap: Spacing.sm,
      backgroundColor: theme.primary,
      borderWidth: 1,
      borderColor: theme.separator
    },
    modalTitle: {
      textAlign: "center"
    },
    modalText: {
      textAlign: "center"
    },
    modalRow: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    modalActions: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: Spacing.sm
    }
  });

export default FeaturedRewardCard;
