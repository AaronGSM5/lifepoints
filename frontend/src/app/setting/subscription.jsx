import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import BillingToggle from "@/components/settings/subscription/BillingToggle";
import { PlusCard, PremiumCard, StandardCard } from "@/components/settings/subscription/SubscriptionCards";
import SubscriptionSkeletons from "@/components/settings/subscription/SubscriptionSkeletons";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
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

  return (
    <ScreenWrapper scrollable>
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
          <BillingToggle billingCycle={billingCycle} onChange={setBillingCycle} />
        )}
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <SubscriptionSkeletons billingCycle={billingCycle} />
        ) : (
          <>
            <StandardCard />
            <PlusCard billingCycle={billingCycle} onSubscribe={handleSubscribe} />
            <PremiumCard billingCycle={billingCycle} onSubscribe={handleSubscribe} />
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
