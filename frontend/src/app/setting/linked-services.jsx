import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ServiceItem from "@/components/settings/ServiceItem";
import SettingsSection from "@/components/settings/SettingsSection";
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

      <SettingsSection title={t("Fitness & Health")} card={false}>
        <ServiceItem
          id="appleHealth"
          name="Apple Health"
          description={t("Steps, Sleep, and Heart Rate")}
          icon="heart"
          isConnected={connections.appleHealth}
          onPress={() => handleToggleService("appleHealth", "Apple Health")}
        />
        <View style={styles.spacer} />
        <ServiceItem
          id="strava"
          name="Strava"
          description={t("Sync running and cycling data")}
          icon="bicycle"
          isConnected={connections.strava}
          onPress={() => handleToggleService("strava", "Strava")}
        />
      </SettingsSection>

      <SettingsSection title={t("Entertainment & Lifestyle")} card={false}>
        <ServiceItem
          id="spotify"
          name="Spotify"
          description={t("Use Focus Playlists for Tasks")}
          icon="spotify"
          isConnected={connections.spotify}
          onPress={() => handleToggleService("spotify", "Spotify")}
        />
      </SettingsSection>
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    spacer: {
      height: Spacing.md
    }
  });
