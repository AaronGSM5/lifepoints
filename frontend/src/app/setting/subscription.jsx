import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppBadge from "@/components/ui/AppBadge";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";

export default function SubscriptionScreen() {
  const styles = getStyles();
  const { t } = useTranslation("settings");
  const isDarkMode = useStore((state) => state.isDarkMode);
  const [isLoading, setIsLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' | 'yearly'

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const skBase = {
    colorMode: isDarkMode ? "dark" : "light",
    transition: { type: "timing", duration: 1500 }
  };

  const handleSubscribe = (tierName) => {
    Alert.alert("Upgrade", `Der Kaufprozess für ${tierName} würde jetzt starten.`);
  };

  const handleRestore = () => {
    Alert.alert("Wiederherstellen", "Suche nach früheren Käufen...");
  };

  const StandardCard = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <AppText type="h2">LifePoints Standard</AppText>
        <AppText type="title" style={{ marginTop: 4 }}>
          {t("Free")}
        </AppText>
      </View>
      <View style={styles.featureList}>
        <FeatureItem text={t("Grundlegende Task-Erstellung")} />
        <FeatureItem text={t("Zugang zu 2 Communities")} />
        <FeatureItem text={t("Standard-Rewards im Shop")} />
      </View>
      <AppButton title={t("Current Plan")} variant="secondary" disabled style={{ marginTop: Spacing.md }} />
    </View>
  );

  const PlusCard = () => (
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
            {billingCycle === "yearly" ? "€4.99" : "€6.99"}
          </AppText>
          <AppText style={{ color: "rgba(255,255,255,0.8)", marginLeft: 4 }}>/ {t("Month")}</AppText>
        </View>
        {billingCycle === "yearly" && (
          <AppText type="caption" style={{ color: "#fff", marginTop: 4 }}>
            {t("Billed annually")} (€59.88 / {t("Year")})
          </AppText>
        )}
      </View>

      <View style={styles.featureList}>
        <FeatureItem text={t("Alles aus Standard")} light />
        <FeatureItem text={t("Unbegrenzte Communities")} light />
        <FeatureItem text={t("1.5x LifePoints Multiplikator")} light />
        <FeatureItem text={t("Erweiterte Statistiken")} light />
      </View>

      <AppButton
        title={t("Upgrade Now")}
        bgColor="#fff"
        textStyle={{ color: "#059669" }}
        onPress={() => handleSubscribe("LifePoints+")}
        style={{ marginTop: Spacing.md }}
      />
    </LinearGradient>
  );

  const PremiumCard = () => (
    <LinearGradient
      colors={[MyTheme.primary, MyTheme.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, styles.premiumCard, { borderColor: MyTheme.gold, borderWidth: 1 }]}
    >
      <View style={styles.cardHeader}>
        <AppText type="h2">LifePoints Premium</AppText>
        <View style={styles.priceRow}>
          <AppText type="h1">{billingCycle === "yearly" ? "€9.99" : "€12.99"}</AppText>
          <AppText style={{ color: MyTheme.muted, marginLeft: 4 }}>/ {t("Month")}</AppText>
        </View>
        {billingCycle === "yearly" && (
          <AppText type="caption" style={{ color: MyTheme.muted, marginTop: 4 }}>
            {t("Billed annually")} (€119.88 / {t("Year")})
          </AppText>
        )}
      </View>

      <View style={styles.featureList}>
        <FeatureItem text={t("Alles aus LifePoints+")} light />
        <FeatureItem text={t("Exklusive Premium-Rewards")} light />
        <FeatureItem text={t("2x LifePoints Multiplikator")} light />
        <FeatureItem text={t("Priority Support")} light />
        <FeatureItem text={t("Keine Werbung")} light />
      </View>

      <AppButton
        title={t("Get Premium")}
        variant="primary"
        textStyle={{ color: "#1A1A1A" }}
        bgColor={MyTheme.gold}
        borderStyle={{ borderColor: MyTheme.gold }}
        onPress={() => handleSubscribe("LifePoints Premium")}
        style={{ marginTop: Spacing.md }}
      />
    </LinearGradient>
  );

  const FeatureItem = ({ text, light }) => (
    <View style={styles.featureItem}>
      <Icon name="checkmark" size={20} color={light ? "#fff" : MyTheme.primaryAccent} />
      <AppText style={{ marginLeft: Spacing.sm, color: light ? "#fff" : MyTheme.text, flex: 1 }}>{text}</AppText>
    </View>
  );

  const SkeletonFeatureItem = () => (
    <View style={styles.featureItem}>
      <Skeleton {...skBase} width={20} height={20} radius={10} />
      <View style={{ marginLeft: Spacing.sm, flex: 1, justifyContent: "center" }}>
        <Skeleton {...skBase} width="80%" height={14} radius={4} />
      </View>
    </View>
  );

  return (
    <ScreenWrapper scrollable withPaddingTop={false}>
      <View style={styles.header}>
        <AppText type="h1" style={{ textAlign: "center" }}>
          {t("Reach the next level")}
        </AppText>
        <AppText style={styles.subtitle}>
          {t("Schalte exklusive Funktionen frei und sammle LifePoints noch schneller.")}
        </AppText>

        {isLoading ? (
          <View style={{ alignSelf: "center", marginTop: Spacing.lg }}>
            <Skeleton {...skBase} width={240} height={44} radius={22} />
          </View>
        ) : (
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, billingCycle === "monthly" && styles.toggleActive]}
              onPress={() => setBillingCycle("monthly")}
            >
              <AppText bold style={{ color: billingCycle === "monthly" ? MyTheme.background : MyTheme.text }}>
                {t("Monthly")}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, billingCycle === "yearly" && styles.toggleActive]}
              onPress={() => setBillingCycle("yearly")}
            >
              <AppText bold style={{ color: billingCycle === "yearly" ? MyTheme.background : MyTheme.text }}>
                {t("Yearly")}
              </AppText>
              <AppBadge
                variant="primary"
                label={"-20%"}
                textStyle={{ fontSize: 10, color: MyTheme.text }}
                style={{
                  paddingHorizontal: 6,
                  paddingVertical: 2
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <>
            {/* Skeleton: Standard Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Skeleton {...skBase} width={160} height={24} radius={4} />
                <View style={{ marginTop: 4 }}>
                  <Skeleton {...skBase} width={80} height={18} radius={4} />
                </View>
              </View>
              <View style={styles.featureList}>
                {[1, 2, 3].map((i) => (
                  <SkeletonFeatureItem key={i} />
                ))}
              </View>
              <View style={{ marginTop: Spacing.md }}>
                <Skeleton {...skBase} width="100%" height={48} radius={Spacing.borderRadius.full} />
              </View>
            </View>

            {/* Skeleton: Plus Card */}
            <View style={[styles.card, styles.highlightCard, { backgroundColor: MyTheme.primary, shadowOpacity: 0 }]}>
              <View
                style={{
                  position: "absolute",
                  top: -12,
                  alignSelf: "center",
                  zIndex: 10,
                  backgroundColor: MyTheme.primary,
                  borderRadius: Spacing.borderRadius?.full || 99,
                  overflow: "hidden"
                }}
              >
                <Skeleton {...skBase} width={130} height={24} />
              </View>

              <View style={styles.cardHeader}>
                <Skeleton {...skBase} width={140} height={24} radius={4} />
                <View style={[styles.priceRow, { marginTop: 4 }]}>
                  <Skeleton {...skBase} width={90} height={32} radius={4} />
                </View>
                {billingCycle === "yearly" && (
                  <View style={{ marginTop: 4 }}>
                    <Skeleton {...skBase} width={180} height={14} radius={4} />
                  </View>
                )}
              </View>

              <View style={styles.featureList}>
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonFeatureItem key={i} />
                ))}
              </View>

              <View style={{ marginTop: Spacing.md }}>
                <Skeleton {...skBase} width="100%" height={48} radius={Spacing.borderRadius?.full || 99} />
              </View>
            </View>

            {/* Skeleton: Premium Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Skeleton {...skBase} width={180} height={24} radius={4} />
                <View style={[styles.priceRow, { marginTop: 4 }]}>
                  <Skeleton {...skBase} width={110} height={32} radius={4} />
                </View>
                {billingCycle === "yearly" && (
                  <View style={{ marginTop: 4 }}>
                    <Skeleton {...skBase} width={180} height={14} radius={4} />
                  </View>
                )}
              </View>
              <View style={styles.featureList}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonFeatureItem key={i} />
                ))}
              </View>
              <View style={{ marginTop: Spacing.md }}>
                <Skeleton {...skBase} width="100%" height={48} radius={Spacing.borderRadius.full} />
              </View>
            </View>
          </>
        ) : (
          <>
            <StandardCard />
            <PlusCard />
            <PremiumCard />
          </>
        )}
      </View>

      {!isLoading && (
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleRestore}>
            <AppText bold style={styles.restoreText}>
              {t("Käufe wiederherstellen")}
            </AppText>
          </TouchableOpacity>
          <AppText type="caption" style={styles.legalText}>
            {t(
              "AboSubscriptions renew automatically unless you cancel them at least 24 hours before the current period ends. You can manage your subscription at any time in the App Store or Play Store settings."
            )}
          </AppText>
        </View>
      )}
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    header: {
      paddingVertical: Spacing.lg,
      alignItems: "center"
    },
    subtitle: {
      textAlign: "center",
      color: MyTheme.muted,
      marginTop: Spacing.sm,
      paddingHorizontal: Spacing.lg
    },
    toggleContainer: {
      flexDirection: "row",
      backgroundColor: MyTheme.primary,
      borderRadius: 22,
      marginTop: Spacing.lg,
      padding: 4,
      width: "80%",
      alignSelf: "center"
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 18,
      flexDirection: "row",
      justifyContent: "center",
      gap: 6
    },
    toggleActive: {
      backgroundColor: "#efeff4"
    },
    cardsContainer: {
      paddingBottom: Spacing.xl,
      gap: Spacing.xl
    },
    card: {
      backgroundColor: MyTheme.primary,
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: MyTheme.secondary,
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
    cardHeader: {
      marginBottom: Spacing.md
    },
    priceRow: {
      flexDirection: "row",
      alignItems: "baseline",
      marginTop: 4
    },
    featureList: {
      gap: Spacing.sm,
      marginBottom: Spacing.md
    },
    featureItem: {
      flexDirection: "row",
      alignItems: "flex-start"
    },
    footer: {
      alignItems: "center",
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.xxl,
      borderTopWidth: 1,
      borderTopColor: "#efeff4"
    },
    restoreText: {
      color: MyTheme.primaryAccent,
      marginBottom: Spacing.md
    },
    legalText: {
      textAlign: "center",
      color: MyTheme.muted,
      fontSize: 11,
      lineHeight: 16
    }
  });
