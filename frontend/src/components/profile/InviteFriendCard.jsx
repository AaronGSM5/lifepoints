import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Share, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";
import BaseCard from "../ui/BaseCard";
import CloseButton from "../ui/CloseButton";

const InviteFriendCard = ({ referralCode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation("profile");
  const shareInvite = async () => {
    try {
      const inviteUrl = `https://lifepoints.app/invite/${referralCode}`;

      await Share.share({
        message: `Hol dir die lifepoints App und wir beide bekommen eine fette Belohnung! Meld dich hier an: ${inviteUrl}`,
        title: "Lade Freunde zu lifepoints ein"
      });
    } catch (error) {
      console.log("Fehler beim Teilen:", error.message);
    }
  };

  if (!isVisible) return null;

  return (
    <BaseCard style={styles.card}>
      <CloseButton style={styles.closeButton} onPress={() => setIsVisible(false)} />
      <View style={styles.iconContainer}>
        <AppText style={{ fontSize: 28 }}>🎁</AppText>
      </View>

      <AppText type="title" style={{ marginBottom: 8 }}>
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

const styles = StyleSheet.create({
  card: {
    marginTop: Spacing.md,
    marginHorizontal: Spacing.md,
    alignItems: "center"
  },
  iconContainer: {
    backgroundColor: "rgba(76, 150, 160, 0.08)",
    width: 60,
    height: 60,
    borderRadius: Spacing.borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm
  },
  description: {
    textAlign: "center",
    marginBottom: Spacing.md,
    lineHeight: 20
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: Spacing.sm
  }
});

export default InviteFriendCard;
