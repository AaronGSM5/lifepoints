import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import BillingToggle from "@/components/settings/subscription/BillingToggle";
import SubscriptionCard from "@/components/settings/subscription/SubscriptionCard";
import SubscriptionSkeletons from "@/components/settings/subscription/SubscriptionSkeletons";
import AppText from "@/components/ui/AppText";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { SUBSCRIPTION_PLANS } from "@/constants/SubscriptionPlans";
import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";

const handleSubscribe = (tierName) => {
  triggerHaptic("success");
  Alert.alert("Upgrade", `Der Kaufprozess für ${tierName} würde jetzt starten.`);
};

const handleRestore = () => {
  triggerHaptic();
  Alert.alert("Wiederherstellen", "Suche nach früheren Käufen...");
};

export default function SubscriptionScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("settings");
  const [isLoading, setIsLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' | 'yearly'

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const skBase = useMemo(
    () => ({
      colorMode: MyTheme.isDark ? "dark" : "light",
      transition: { type: "timing", duration: 1500 }
    }),
    [MyTheme.isDark]
  );

  return (
    <ScreenWrapper scrollable>
      <View style={styles.header}>
        <ScreenTitle
          title={t("Reach the next level")}
          subtitle={t("Unlock exclusive features and earn LifePoints even faster.")}
          align="center"
        />

        {isLoading ? (
          <View style={styles.toggleContainer}>
            <Skeleton {...skBase} width={240} height={44} radius={22} />
          </View>
        ) : (
          <BillingToggle billingCycle={billingCycle} onChange={setBillingCycle} />
        )}
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <SubscriptionSkeletons billingCycle={billingCycle} />
        ) : (
          SUBSCRIPTION_PLANS.map((plan) => (
            <SubscriptionCard key={plan.id} plan={plan} billingCycle={billingCycle} onSubscribe={handleSubscribe} />
          ))
        )}
      </View>

      {!isLoading && (
        <View style={styles.footer}>
          <AppText bold style={styles.restoreText} onPress={handleRestore}>
            {t("Käufe wiederherstellen")}
          </AppText>
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
    toggleContainer: {
      alignSelf: "center",
      marginTop: Spacing.lg
    },
    cardsContainer: {
      paddingBottom: Spacing.xl,
      gap: Spacing.xl
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
