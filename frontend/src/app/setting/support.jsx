import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import AppInput from "@/components/ui/AppInput";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { useTranslation } from "react-i18next";

export default function SupportScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("settings");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "1", title: "Account", icon: "user", color: "#3b82f6" },
    { id: "2", title: "LifePoints", icon: "wallet", color: "#f59e0b" },
    { id: "3", title: "Tasks", icon: "tasks", color: "#10b981" },
    { id: "4", title: "Rewards", icon: "giftCat", color: "#ef4444" }
  ];

  const faq = [
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
  ];

  const handleContactSupport = (type) => {
    if (type === "email") {
      Linking.openURL("mailto:lifepoints.app.dev@gmail.com");
    }
  };

  return (
    <ScreenWrapper scrollable withPaddingTop={false}>
      <View style={styles.header}>
        <AppText type="h1">{t("How can we help?")}</AppText>
        <AppText style={styles.subtitle}>{t("Search our FAQs or contact us directly.")}</AppText>
        <View style={{ marginTop: Spacing.lg }}>
          <AppInput
            icon="search"
            placeholder={t("Describe the problem...")}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.contactRow}>
        <TouchableOpacity style={styles.contactCard} onPress={() => handleContactSupport("email")}>
          <View style={[styles.iconCircle, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
            <Icon name="mail" size={24} color="#3b82f6" />
          </View>
          <AppText bold>E-Mail</AppText>
          <AppText type="caption" style={{ textAlign: "center" }}>
            Antwort in 24h
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard}>
          <View style={[styles.iconCircle, { backgroundColor: "rgba(16, 185, 129, 0.1)" }]}>
            <Icon name="chat" size={24} color="#10b981" />
          </View>
          <AppText bold>Live-Chat</AppText>
          <AppText type="caption" style={{ textAlign: "center" }}>
            {t("Mon-Fri, 9 a.m.-6 p.m.")}
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <AppText type="title" style={styles.sectionTitle}>
          {t("Topics")}
        </AppText>
        <View style={styles.categoryGrid}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryItem}>
              <Icon name={cat.icon} size={28} color={cat.color} />
              <AppText bold style={{ marginTop: Spacing.xs }}>
                {t(cat.title)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <AppText type="title" style={styles.sectionTitle}>
          {t("FAQ")}
        </AppText>
        {faq.map((faq, index) => (
          <TouchableOpacity key={index} style={styles.faqItem}>
            <View style={{ flex: 1 }}>
              <AppText bold>{faq.q}</AppText>
            </View>
            <Icon name="right" size={18} color={MyTheme.muted} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statusBox}>
        <View style={styles.statusIndicator} />
        <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
          {t("All systems are operating normally")}
        </AppText>
      </View>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      paddingVertical: Spacing.md
    },
    subtitle: {
      color: theme.muted,
      marginTop: Spacing.xs
    },
    contactRow: {
      flexDirection: "row",
      gap: Spacing.md,
      marginBottom: Spacing.lg
    },
    contactCard: {
      flex: 1,
      backgroundColor: theme.primary,
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.md,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.secondary,
      gap: 4
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
    sectionTitle: {
      marginBottom: Spacing.md
    },
    categoryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.md
    },
    categoryItem: {
      width: "47%",
      backgroundColor: theme.primary,
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.md,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.secondary
    },
    faqItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.primary,
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.md,
      marginBottom: Spacing.sm,
      borderWidth: 1,
      borderColor: theme.secondary
    },
    statusBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
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
