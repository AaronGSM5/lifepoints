import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import AppBadge from "@/components/ui/AppBadge";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { triggerHaptic } from "@/utils/haptics";

export default function SubscriptionScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
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
    triggerHaptic("success");
    Alert.alert("Upgrade", `Der Kaufprozess für ${tierName} würde jetzt starten.`);
  };

  const handleRestore = () => {
    triggerHaptic();
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
        <FeatureItem text={t("Track impact")} />
        <FeatureItem text={t("Standard Rewards")} />
        <FeatureItem text={t("Standard Look")} />
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
        <FeatureItem text={t("Everything from Standard")} light />
        <FeatureItem text={t("Advanced Statistics")} light />
        <FeatureItem text={t("Ad-free")} light />
        <FeatureItem text={t("Custom Profile & Community Banners")} light />
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
        <FeatureItem text={t("Everything from LifePoints+")} light />
        <FeatureItem text={t("Mentor Status")} light />
        <FeatureItem text={t("Charity-Voting")} light />
        <FeatureItem text={t("Maximum Freedom")} light />
        <FeatureItem text={t("Smart Community Administration")} light />
        <FeatureItem text={t("Custom Themes")} light />
        <AppText type="caption">{t("... and many more benefits")}</AppText>
      </View>

      <AppButton
        title={t("Unlock Premium")}
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
        <AppText style={styles.subtitle}>{t("Unlock exclusive features and earn LifePoints even faster.")}</AppText>

        {isLoading ? (
          <View style={{ alignSelf: "center", marginTop: Spacing.lg }}>
            <Skeleton {...skBase} width={240} height={44} radius={22} />
          </View>
        ) : (
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, billingCycle === "monthly" && styles.toggleActive]}
              onPress={() => {
                triggerHaptic();
                setBillingCycle("monthly");
              }}
            >
              <AppText bold style={{ color: billingCycle === "monthly" ? MyTheme.background : MyTheme.text }}>
                {t("Monthly")}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, billingCycle === "yearly" && styles.toggleActive]}
              onPress={() => {
                triggerHaptic();
                setBillingCycle("yearly");
              }}
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
            <View style={[styles.card, styles.highlightCard, { backgroundColor: MyTheme.primary, boxShadow: "none" }]}>
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
              "Subscriptions renew automatically unless you cancel them at least 24 hours before the current period ends. You can manage your subscription at any time in the App Store or Play Store settings."
            )}
          </AppText>
        </View>
      )}
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      paddingVertical: Spacing.lg,
      alignItems: "center"
    },
    subtitle: {
      textAlign: "center",
      color: theme.muted,
      marginTop: Spacing.sm,
      paddingHorizontal: Spacing.lg
    },
    toggleContainer: {
      flexDirection: "row",
      backgroundColor: theme.primary,
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
      backgroundColor: theme.primary,
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: theme.secondary,
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
      color: theme.primaryAccent,
      marginBottom: Spacing.md
    },
    legalText: {
      textAlign: "center",
      color: theme.muted,
      fontSize: 11,
      lineHeight: 16
    }
  });
