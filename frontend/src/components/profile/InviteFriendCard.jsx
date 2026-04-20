import React from "react";
import { Share, StyleSheet, View } from "react-native";
import BaseCard from "../ui/BaseCard";
import AppText from "../ui/AppText";
import AppButton from "../ui/AppButton";
import { Spacing } from "@/constants/Spacing";

const InviteFriendCard = ({ referralCode }) => {
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

  return (
    <BaseCard style={styles.card}>
      <View style={styles.iconContainer}>
        <AppText style={{ fontSize: 28 }}>🎁</AppText>
      </View>

      <AppText type="title" style={{ marginBottom: 8 }}>
        Freunde einladen & kassieren
      </AppText>

      <AppText type="caption" style={styles.description}>
        Teile deinen Link. Sobald sich ein Freund anmeldet, bekommt ihr beide sofort extra Lifepoints auf euer Konto!
      </AppText>

      <AppButton title="Einladungslink senden" fullWidth onPress={shareInvite} />
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
  }
});

export default InviteFriendCard;
