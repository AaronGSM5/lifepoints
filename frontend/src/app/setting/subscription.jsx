import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";

export default function SubscriptionScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' | 'yearly'

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const skBase = {
    colorMode: "dark",
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
          Kostenlos
        </AppText>
      </View>
      <View style={styles.featureList}>
        <FeatureItem text="Grundlegende Task-Erstellung" />
        <FeatureItem text="Zugang zu 2 Communities" />
        <FeatureItem text="Standard-Rewards im Shop" />
      </View>
      <AppButton title="Aktueller Plan" variant="secondary" disabled style={{ marginTop: Spacing.md }} />
    </View>
  );

  const PlusCard = () => (
    <LinearGradient
      colors={["#10b981", "#059669"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, styles.highlightCard]}
    >
      <View style={styles.badgeContainer}>
        <AppText bold style={styles.badgeText}>
          AM BELIEBTESTEN
        </AppText>
      </View>

      <View style={styles.cardHeader}>
        <AppText type="h2" style={{ color: "#fff" }}>
          LifePoints+
        </AppText>
        <View style={styles.priceRow}>
          <AppText type="h1" style={{ color: "#fff" }}>
            {billingCycle === "yearly" ? "€4.99" : "€6.99"}
          </AppText>
          <AppText style={{ color: "rgba(255,255,255,0.8)", marginLeft: 4 }}>/ Monat</AppText>
        </View>
        {billingCycle === "yearly" && (
          <AppText type="caption" style={{ color: "#fff", marginTop: 4 }}>
            Jährlich abgerechnet (€59.88/Jahr)
          </AppText>
        )}
      </View>

      <View style={styles.featureList}>
        <FeatureItem text="Alles aus Standard" light />
        <FeatureItem text="Unbegrenzte Communities" light />
        <FeatureItem text="1.5x LifePoints Multiplikator" light />
        <FeatureItem text="Erweiterte Statistiken" light />
      </View>

      <AppButton
        title="Jetzt Upgraden"
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
          <AppText style={{ color: MyTheme.muted, marginLeft: 4 }}>/ Monat</AppText>
        </View>
        {billingCycle === "yearly" && (
          <AppText type="caption" style={{ color: MyTheme.muted, marginTop: 4 }}>
            Jährlich abgerechnet (€119.88/Jahr)
          </AppText>
        )}
      </View>

      <View style={styles.featureList}>
        <FeatureItem text="Alles aus LifePoints+" light />
        <FeatureItem text="Exklusive Premium-Rewards" light />
        <FeatureItem text="2x LifePoints Multiplikator" light />
        <FeatureItem text="Priority Support" light />
        <FeatureItem text="Keine Werbung" light />
      </View>

      <AppButton
        title="Premium sichern"
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
          Erreiche dein nächstes Level
        </AppText>
        <AppText style={styles.subtitle}>
          Schalte exklusive Funktionen frei und sammle LifePoints noch schneller.
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
                Monatlich
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, billingCycle === "yearly" && styles.toggleActive]}
              onPress={() => setBillingCycle("yearly")}
            >
              <AppText bold style={{ color: billingCycle === "yearly" ? MyTheme.background : MyTheme.text }}>
                Jährlich
              </AppText>
              <View style={styles.discountBadge}>
                <AppText bold style={{ fontSize: 10, color: MyTheme.text }}>
                  -20%
                </AppText>
              </View>
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
              <View style={styles.badgeContainer}>
                <Skeleton {...skBase} width={120} height={24} radius={12} />
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
                <Skeleton {...skBase} width="100%" height={48} radius={Spacing.borderRadius.full} />
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
              Käufe wiederherstellen
            </AppText>
          </TouchableOpacity>
          <AppText type="caption" style={styles.legalText}>
            Abonnements verlängern sich automatisch, sofern sie nicht mindestens 24 Stunden vor Ablauf des aktuellen
            Zeitraums gekündigt werden. Du kannst dein Abo jederzeit in den App Store / Play Store Einstellungen
            verwalten.
          </AppText>
        </View>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
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
  discountBadge: {
    backgroundColor: MyTheme.primaryAccent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8
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
  badgeContainer: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    backgroundColor: MyTheme.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10
  },
  badgeText: {
    color: MyTheme.text,
    fontSize: 12,
    letterSpacing: 1
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
