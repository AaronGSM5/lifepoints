import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Share, StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import CloseButton from "@/components/ui/CloseButton";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";

const InviteFriendCard = ({ referralCode }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("profile");
  const isDismissed = useStore((state) => state.isInviteCardDismissed);
  const dismissInviteCard = useStore((state) => state.dismissInviteCard);

  const shareInvite = useCallback(async () => {
    try {
      const inviteUrl = `https://lifepoints.app/invite/${referralCode}`;
      await Share.share({
        message: t("Get the LifePoints app and we both receive a reward! Sign up here: {{url}}", { url: inviteUrl }),
        title: t("Invite friends to LifePoints")
      });
    } catch (error) {
      console.warn("Share failed:", error?.message);
    }
  }, [referralCode, t]);

  if (isDismissed) return null;

  return (
    <BaseCard style={styles.card}>
      <CloseButton style={styles.closeButton} onPress={dismissInviteCard} />
      <View style={styles.iconContainer}>
        <Icon name="giftCat" size={28} color={MyTheme.primaryAccent} />
      </View>

      <AppText type="title" style={styles.title}>
        {t("Invite friends & earn rewards")}
      </AppText>

      <AppText type="caption" style={styles.description}>
        {t(
          "Share your link. As soon as a friend signs up, you'll both instantly receive extra Lifepoints in your account!"
        )}
      </AppText>

      <AppButton variant={"outline"} title={t("Send invitation link")} onPress={shareInvite} />
    </BaseCard>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      marginTop: Spacing.lg,
      alignItems: "center"
    },
    iconContainer: {
      backgroundColor: addOpacity(theme.primaryAccent, 0.12),
      width: 56,
      height: 56,
      borderRadius: Spacing.borderRadius.full,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.sm
    },
    title: {
      marginBottom: Spacing.sm,
      textAlign: "center"
    },
    description: {
      textAlign: "center",
      marginBottom: Spacing.md
    },
    closeButton: {
      position: "absolute",
      top: Spacing.xs,
      right: Spacing.xs,
      padding: Spacing.sm,
      zIndex: 1
    }
  });

export default InviteFriendCard;
