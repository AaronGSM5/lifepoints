import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import AppBadge from "@/components/ui/AppBadge";
import { useTranslation } from "react-i18next";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { addOpacity } from "@/utils/addOpacity";

export default function LinkedServicesScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("settings");
  const [connections, setConnections] = useState({
    appleHealth: true,
    strava: true,
    spotify: false
  });

  const handleToggleService = (id, name) => {
    if (connections[id]) {
      Alert.alert(
        "Verbindung trennen",
        `Möchtest du die Verbindung zu ${name} wirklich aufheben? Deine Daten werden dann nicht mehr automatisch synchronisiert.`,
        [
          { text: "Abbrechen", style: "cancel" },
          {
            text: "Trennen",
            style: "destructive",
            onPress: () => setConnections((prev) => ({ ...prev, [id]: false }))
          }
        ]
      );
    } else {
      setConnections((prev) => ({ ...prev, [id]: true }));
    }
  };

  const ServiceItem = ({ id, name, description, icon, isConnected }) => (
    <View style={styles.serviceCard}>
      <View style={styles.cardMain}>
        <View style={[styles.iconBox, { backgroundColor: addOpacity(MyTheme.primaryAccent, 0.1) }]}>
          <Icon name={icon} size={28} color={MyTheme.primaryAccent} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <AppText type="title">{name}</AppText>
            {isConnected && (
              <AppBadge
                variant="outline"
                label={t("AKTIVE")}
                textStyle={{ color: MyTheme.primaryAccent, fontSize: 10 }}
                style={{
                  paddingVertical: Spacing.xs - 2,
                  borderColor: MyTheme.primaryAccent
                }}
              />
            )}
          </View>
          <AppText type="caption">{description}</AppText>
        </View>
      </View>

      <AppButton
        title={isConnected ? t("Manage") : t("Connect")}
        variant={isConnected ? "secondary" : "primary"}
        size="md"
        onPress={() => handleToggleService(id, name)}
        bgColor={!isConnected && MyTheme.primaryAccent}
      />
    </View>
  );

  return (
    <ScreenWrapper scrollable withPaddingTop={false}>
      <ScreenTitle
        title={t("Linked Services")}
        subtitle={t("Connect your favorite apps to automatically earn LifePoints through your activities.")}
      />

      <View style={styles.section}>
        <AppText type="title" style={styles.sectionTitle}>
          {t("Fitness & Health")}
        </AppText>
        <ServiceItem
          id="appleHealth"
          name="Apple Health"
          description={t("Steps, Sleep, and Heart Rate")}
          icon="heart"
          isConnected={connections.appleHealth}
        />
        <View style={{ height: Spacing.md }} />
        <ServiceItem
          id="strava"
          name="Strava"
          description={t("Sync running and cycling data")}
          icon="bicycle"
          isConnected={connections.strava}
        />
      </View>

      <View style={styles.section}>
        <AppText type="title" style={styles.sectionTitle}>
          {t("Entertainment & Lifestyle")}
        </AppText>
        <ServiceItem
          id="spotify"
          name="Spotify"
          description={t("Use Focus Playlists for Tasks")}
          icon="spotify"
          isConnected={connections.spotify}
        />
      </View>

      <View style={styles.privacyNote}>
        <Icon name="lock" size={16} color={MyTheme.muted} />
        <AppText type="caption" style={styles.privacyText}>
          {t(
            "Your data is transmitted in encrypted form. You can revoke access at any time in the settings for the respective service."
          )}
        </AppText>
      </View>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    section: {
      marginBottom: Spacing.md
    },
    sectionTitle: {
      marginBottom: Spacing.md
    },
    serviceCard: {
      backgroundColor: theme.primary,
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: theme.secondary,
      gap: Spacing.md
    },
    cardMain: {
      flexDirection: "row",
      alignItems: "center"
    },
    iconBox: {
      width: 54,
      height: 54,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.md
    },
    infoContainer: {
      flex: 1
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      marginBottom: 2
    },
    privacyNote: {
      flexDirection: "row",
      backgroundColor: theme.primary,
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.md,
      gap: Spacing.sm,
      marginBottom: Spacing.xl
    },
    privacyText: {
      flex: 1,
      color: theme.muted,
      lineHeight: 16
    }
  });
