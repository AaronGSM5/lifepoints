import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Icon } from "@/components/icons/Icon";
import AppBadge from "@/components/ui/AppBadge";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const FeatureItem = ({ text, light, theme }) => (
  <View style={styles.featureItem}>
    <Icon name="checkmark" size={20} color={light ? "#fff" : theme.primaryAccent} />
    <AppText style={{ marginLeft: Spacing.sm, color: light ? "#fff" : theme.text, flex: 1 }}>{text}</AppText>
  </View>
);

export const StandardCard = () => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("settings");

  return (
    <View style={[styles.card, { backgroundColor: MyTheme.primary, borderColor: MyTheme.secondary }]}>
      <View style={styles.cardHeader}>
        <AppText type="h2">LifePoints Standard</AppText>
        <AppText type="title" style={{ marginTop: 4 }}>
          {t("Free")}
        </AppText>
      </View>
      <View style={styles.featureList}>
        <FeatureItem text={t("Track impact")} theme={MyTheme} />
        <FeatureItem text={t("Standard Rewards")} theme={MyTheme} />
        <FeatureItem text={t("Standard Look")} theme={MyTheme} />
      </View>
      <AppButton title={t("Current Plan")} variant="secondary" disabled style={{ marginTop: Spacing.md }} />
    </View>
  );
};

export const PlusCard = ({ billingCycle, onSubscribe }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("settings");

  return (
    <LinearGradient
      colors={["#10b981", "#059669"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, styles.highlightCard]}
    >
      <AppBadge
        label={t("MOST POPULAR")}
        textStyle={{ color: MyTheme.text, letterSpacing: 1 }}
        style={{
          position: "absolute",
          top: -12,
          alignSelf: "center",
          backgroundColor: MyTheme.primary,
          paddingHorizontal: Spacing.md,
          zIndex: 10
        }}
      />
      <View style={styles.cardHeader}>
        <AppText type="h2" style={{ color: "#fff" }}>
          LifePoints+
        </AppText>
        <View style={styles.priceRow}>
          <AppText type="h1" style={{ color: "#fff" }}>
            {billingCycle === "yearly" ? "€0.99" : "€1.99"}
          </AppText>
          <AppText style={{ color: "rgba(255,255,255,0.8)", marginLeft: 4 }}>/ {t("Month")}</AppText>
        </View>
        {billingCycle === "yearly" && (
          <AppText type="caption" style={{ color: "#fff", marginTop: 4 }}>
            {t("Billed annually")} (€11.88 / {t("Year")})
          </AppText>
        )}
      </View>
      <View style={styles.featureList}>
        <FeatureItem text={t("Everything from Standard")} light theme={MyTheme} />
        <FeatureItem text={t("Advanced Statistics")} light theme={MyTheme} />
        <FeatureItem text={t("Ad-free")} light theme={MyTheme} />
        <FeatureItem text={t("Custom Profile & Community Banners")} light theme={MyTheme} />
      </View>
      <AppButton
        title={t("Upgrade Now")}
        bgColor="#fff"
        textStyle={{ color: "#059669" }}
        onPress={() => onSubscribe("LifePoints+")}
        style={{ marginTop: Spacing.md }}
      />
    </LinearGradient>
  );
};

export const PremiumCard = ({ billingCycle, onSubscribe }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("settings");

  return (
    <LinearGradient
      colors={[MyTheme.primary, MyTheme.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, styles.premiumCard, { borderColor: MyTheme.gold, borderWidth: 1 }]}
    >
      <View style={styles.cardHeader}>
        <AppText type="h2">LifePoints Premium</AppText>
        <View style={styles.priceRow}>
          <AppText type="h1">{billingCycle === "yearly" ? "€4.99" : "€9.99"}</AppText>
          <AppText style={{ color: MyTheme.muted, marginLeft: 4 }}>/ {t("Month")}</AppText>
        </View>
        {billingCycle === "yearly" && (
          <AppText type="caption" style={{ color: MyTheme.muted, marginTop: 4 }}>
            {t("Billed annually")} (€59.88 / {t("Year")})
          </AppText>
        )}
      </View>
      <View style={styles.featureList}>
        <FeatureItem text={t("Everything from LifePoints+")} light theme={MyTheme} />
        <FeatureItem text={t("Mentor Status")} light theme={MyTheme} />
        <FeatureItem text={t("Charity-Voting")} light theme={MyTheme} />
        <FeatureItem text={t("Maximum Freedom")} light theme={MyTheme} />
        <FeatureItem text={t("Smart Community Administration")} light theme={MyTheme} />
        <FeatureItem text={t("Custom Themes")} light theme={MyTheme} />
        <AppText type="caption">{t("... and many more benefits")}</AppText>
      </View>
      <AppButton
        title={t("Unlock Premium")}
        variant="primary"
        textStyle={{ color: "#1A1A1A" }}
        bgColor={MyTheme.gold}
        borderStyle={{ borderColor: MyTheme.gold }}
        onPress={() => onSubscribe("LifePoints Premium")}
        style={{ marginTop: Spacing.md }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    position: "relative"
  },
  highlightCard: {
    borderWidth: 0,
    boxShadow: "0px 5px 15px rgba(47, 196, 146, 0.5)",
    elevation: 10
  },
  premiumCard: {
    borderWidth: 0,
    boxShadow: "0px 5px 15px rgba(255, 215, 0, 0.5)",
    elevation: 10
  },
  cardHeader: { marginBottom: Spacing.md },
  priceRow: { flexDirection: "row", alignItems: "baseline", marginTop: 4 },
  featureList: { gap: Spacing.sm, marginBottom: Spacing.md },
  featureItem: { flexDirection: "row", alignItems: "flex-start" }
});
