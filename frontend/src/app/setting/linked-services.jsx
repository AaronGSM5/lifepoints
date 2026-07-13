import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ServiceItem from "@/components/settings/ServiceItem";
import AppText from "@/components/ui/AppText";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function LinkedServicesScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("settings");
  const [connections, setConnections] = useState({
    appleHealth: true,
    strava: true,
    spotify: false
  });

  const handleToggleService = useCallback(
    (id, name) => {
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
    },
    [connections]
  );

  return (
    <ScreenWrapper scrollable>
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
          onPress={() => handleToggleService("appleHealth", "Apple Health")}
        />
        <View style={{ height: Spacing.md }} />
        <ServiceItem
          id="strava"
          name="Strava"
          description={t("Sync running and cycling data")}
          icon="bicycle"
          isConnected={connections.strava}
          onPress={() => handleToggleService("strava", "Strava")}
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
          onPress={() => handleToggleService("spotify", "Spotify")}
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
