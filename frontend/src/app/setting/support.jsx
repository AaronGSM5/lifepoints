import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Linking, StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import BaseCard from "@/components/ui/BaseCard";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { addOpacity } from "@/utils/addOpacity";
import SectionHeader from "@/components/ui/SectionHeader";

export default function SupportScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("settings");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => [
    { id: "1", title: "Account", icon: "user", color: "#3b82f6" },
    { id: "2", title: "LifePoints", icon: "wallet", color: "#f59e0b" },
    { id: "3", title: "Tasks", icon: "tasks", color: "#10b981" },
    { id: "4", title: "Rewards", icon: "giftCat", color: "#ef4444" }
  ], [])

  const faq = useMemo(() => [
    {
      q: t("Why haven't my LifePoints been credited?"),
      a: t("It may take up to 24 hours for the synchronization to complete...")
    },
    {
      q: t("How do I redeem a coupon?"),
      a: t("Go to your account page and select the “My Coupons” tab...")
    },
    {
      q: t("Can I transfer LifePoints to friends?"),
      a: t("This feature is currently still in development...")
    }
  ], [])

  const handleContactSupport = useCallback((type) => {
    if (type === "email") {
      Linking.openURL("mailto:lifepoints.app.dev@gmail.com");
    }
  }, [])

const contactRowData = useMemo(() => [
  {
    id: 1,
    title: "E-Mail",
    caption: "Response in 24h",
    color: "#3b82f6",
    iconName: "mail",
    onPress: () => handleContactSupport("email")
  },
  {
    id: 2,
    title: "Live-Chat",
    caption: "Mon-Fri, 9 a.m.-6 p.m.",
    color: "#10b981",
    iconName: "chat",
  }
], [])
  return (
    <ScreenWrapper scrollable>
        <ScreenTitle title={t("How can we help?")} subtitle={t("Search our FAQs or contact us directly.")} />
          <AppInput
            icon="search"
            placeholder={t("Describe the problem...")}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

      <View style={styles.contactRow}>
        {contactRowData.map((entry) => (
        <BaseCard key={entry.id} style={styles.contactCard} onPress={entry.onPress ?? undefined}>
          <View style={[styles.iconCircle, { backgroundColor: addOpacity(entry.color, 0.1) }]}>
            <Icon name={entry.iconName} color={entry.color} />
          </View>
          <AppText bold>{entry.title}</AppText>
          <AppText type="caption">{entry.caption}</AppText>
        </BaseCard>
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader title={t("Topics")} />
        <View style={styles.categoryGrid}>
          {categories.map((entry) => (
            <BaseCard key={entry.id} style={styles.categoryItem}>
              <Icon name={entry.icon} size={28} color={entry.color} />
              <AppText bold>
                {t(entry.title)}
              </AppText>
            </BaseCard>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title={t("FAQ")} />
        {faq.map((entry, index) => (
          <BaseCard key={index} style={styles.faqItem}>
            <View style={{ flex: 1 }}>
              <AppText bold>{entry.q}</AppText>
            </View>
            <Icon name="right" size={18} color={MyTheme.muted} />
          </BaseCard>
        ))}
      </View>

      <View style={styles.statusBox}>
        <View style={styles.statusIndicator} />
        <AppText bold type="caption" style={{ color: MyTheme.text }}>
          {t("All systems are operating normally")}
        </AppText>
      </View>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    subtitle: {
      color: theme.muted,
      marginTop: Spacing.xs
    },
    contactRow: {
      flexDirection: "row",
      gap: Spacing.md,
      marginVertical: Spacing.lg
    },
    contactCard: {
      flex: 1,
      alignItems: "center",
      gap: Spacing.xs
    },
    iconCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.xs
    },
    section: {
      marginBottom: Spacing.lg
    },
    categoryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.md
    },
    categoryItem: {
      width: "47%",
      alignItems: "center",
    },
    faqItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.sm,
    },
    statusBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: addOpacity(theme.primaryAccent, 0.5),
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.full,
      gap: Spacing.sm,
      marginBottom: Spacing.xl
    },
    statusIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#10b981"
    }
  });
