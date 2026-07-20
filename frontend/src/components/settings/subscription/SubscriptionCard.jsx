import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Icon } from "@/components/icons/Icon";
import AppBadge from "@/components/ui/AppBadge";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { DarkTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const featureStyles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  text: {
    marginLeft: Spacing.sm,
    flex: 1
  }
});

const FeatureItem = memo(({ text, isLight, theme }) => (
  <View style={featureStyles.item}>
    <Icon name="checkmark" size={20} color={isLight ? DarkTheme.text : theme.primaryAccent} />
    <AppText style={[featureStyles.text, { color: isLight ? DarkTheme.text : theme.text }]}>{text}</AppText>
  </View>
));
FeatureItem.displayName = "FeatureItem";

const SubscriptionCard = memo(({ plan, billingCycle, onSubscribe }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("settings");

  const isPlus = plan.id === "plus";
  const isPremium = plan.id === "premium";
  const CardContainer = isPlus || isPremium ? LinearGradient : View;
  const containerProps =
    isPlus || isPremium
      ? {
          colors: isPlus ? ["#10b981", "#059669"] : [DarkTheme.primary, DarkTheme.background],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 }
        }
      : {};

  return (
    <CardContainer
      style={[styles.card, isPlus && styles.plusCard, isPremium && styles.premiumCard]}
      {...containerProps}
    >
      {isPlus && <AppBadge label={t("MOST POPULAR")} style={styles.badge} textStyle={{ color: MyTheme.text }} />}

      <View style={styles.cardHeader}>
        <AppText type="h2" style={(isPlus || isPremium) && { color: DarkTheme.text }}>
          {plan.title}
        </AppText>
        {!plan.isFree && (
          <View style={styles.priceRow}>
            <AppText type="h1" style={(isPlus || isPremium) && { color: DarkTheme.text }}>
              {billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly}
            </AppText>
            <AppText style={{ color: isPlus ? "rgba(255,255,255,0.8)" : DarkTheme.muted, marginLeft: Spacing.xs }}>
              / {t("Month")}
            </AppText>
          </View>
        )}
        {billingCycle === "yearly" && !plan.isFree && (
          <AppText type="caption" style={isPlus ? { color: "#fff" } : { color: DarkTheme.muted }}>
            {t("Billed annually")} ({plan.priceTotalYearly} / {t("Year")})
          </AppText>
        )}
      </View>

      <View style={styles.featureList}>
        {plan.features.map((f, i) => (
          <FeatureItem key={i} text={t(f)} isLight={isPlus} theme={MyTheme} />
        ))}
        {isPremium && (
          <AppText type="caption" style={isPremium && { color: DarkTheme.muted }}>
            {t("... and many more benefits")}
          </AppText>
        )}
      </View>

      <AppButton
        title={plan.isFree ? t("Current Plan") : isPremium ? t("Unlock Premium") : t("Upgrade Now")}
        variant={plan.isFree ? "secondary" : "primary"}
        disabled={plan.isFree}
        bgColor={isPremium ? MyTheme.gold : isPlus ? "#fff" : undefined}
        textStyle={isPremium ? { color: "#1A1A1A" } : isPlus ? { color: "#059669" } : undefined}
        onPress={() => onSubscribe(plan.title)}
        style={{ marginTop: Spacing.md }}
      />
    </CardContainer>
  );
});

SubscriptionCard.displayName = "SubscriptionCard";

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: theme.secondary,
      backgroundColor: theme.primary,
      position: "relative"
    },
    plusCard: {
      borderWidth: 0,
      boxShadow: "0px 5px 15px rgba(47, 196, 146, 0.5)"
    },
    premiumCard: {
      borderWidth: 1,
      borderColor: theme.gold,
      boxShadow: "0px 5px 15px rgba(255, 215, 0, 0.5)"
    },
    cardHeader: {
      marginBottom: Spacing.md
    },
    priceRow: {
      flexDirection: "row",
      alignItems: "baseline",
      marginTop: Spacing.xs
    },
    featureList: {
      gap: Spacing.sm,
      marginBottom: Spacing.md
    },
    badge: {
      position: "absolute",
      top: -12,
      alignSelf: "center",
      backgroundColor: theme.primary,
      paddingHorizontal: Spacing.md,
      zIndex: 10
    }
  });

export default SubscriptionCard;
