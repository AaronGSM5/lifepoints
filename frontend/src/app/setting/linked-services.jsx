import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";

export default function LinkedServicesScreen() {
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
      // Hier würde der OAuth Flow starten
      setConnections((prev) => ({ ...prev, [id]: true }));
    }
  };

  const ServiceItem = ({ id, name, description, icon, isConnected }) => (
    <View style={styles.serviceCard}>
      <View style={styles.cardMain}>
        <View style={[styles.iconBox, { backgroundColor: isConnected ? "rgba(47, 196, 146, 0.1)" : "#f2f2f7" }]}>
          <Icon name={icon} size={28} color={isConnected ? MyTheme.primaryAccent : MyTheme.primaryAccent} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <AppText type="title">{name}</AppText>
            {isConnected && (
              <View style={styles.activeBadge}>
                <AppText bold style={styles.activeText}>
                  AKTIV
                </AppText>
              </View>
            )}
          </View>
          <AppText type="caption">{description}</AppText>
        </View>
      </View>

      <AppButton
        title={isConnected ? "Verwalten" : "Verbinden"}
        variant={isConnected ? "secondary" : "primary"}
        size="md"
        onPress={() => handleToggleService(id, name)}
        bgColor={!isConnected && MyTheme.primaryAccent}
      />
    </View>
  );

  return (
    <ScreenWrapper scrollable>
      <View style={styles.header}>
        <AppText type="h1">Verknüpfte Dienste</AppText>
        <AppText style={styles.subtitle}>
          Verbinde deine Lieblings-Apps, um LifePoints automatisch durch Aktivitäten zu sammeln.
        </AppText>
      </View>

      <View style={styles.section}>
        <AppText type="title" style={styles.sectionTitle}>
          Fitness & Gesundheit
        </AppText>
        <ServiceItem
          id="appleHealth"
          name="Apple Health"
          description="Schritte, Schlaf und Herzfrequenz"
          icon="heart"
          isConnected={connections.appleHealth}
        />
        <View style={{ height: Spacing.md }} />
        <ServiceItem
          id="strava"
          name="Strava"
          description="Lauf- und Radfahrdaten synchronisieren"
          icon="bicycle"
          isConnected={connections.strava}
        />
      </View>

      <View style={styles.section}>
        <AppText type="title" style={styles.sectionTitle}>
          Entertainment & Lifestyle
        </AppText>
        <ServiceItem
          id="spotify"
          name="Spotify"
          description="Focus-Playlists für Aufgaben nutzen"
          icon="spotify"
          isConnected={connections.spotify}
        />
      </View>

      <View style={styles.privacyNote}>
        <Icon name="lock" size={16} color={MyTheme.muted} />
        <AppText type="caption" style={styles.privacyText}>
          Deine Daten werden verschlüsselt übertragen. Du kannst den Zugriff jederzeit in den Einstellungen des
          jeweiligen Dienstes widerrufen.
        </AppText>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: Spacing.lg
  },
  subtitle: {
    marginTop: Spacing.xs,
    color: MyTheme.muted
  },
  section: {
    marginBottom: Spacing.md
  },
  sectionTitle: {
    marginBottom: Spacing.md
  },
  serviceCard: {
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: MyTheme.secondary,
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
  activeBadge: {
    backgroundColor: MyTheme.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs - 2,
    borderRadius: Spacing.borderRadius.sm,
    borderWidth: 1,
    borderColor: MyTheme.primaryAccent
  },
  activeText: {
    color: MyTheme.primaryAccent,
    fontSize: 10
  },
  privacyNote: {
    flexDirection: "row",
    backgroundColor: MyTheme.primary,
    padding: Spacing.md,
    borderRadius: Spacing.borderRadius.md,
    gap: Spacing.sm,
    marginBottom: Spacing.xl
  },
  privacyText: {
    flex: 1,
    color: MyTheme.muted,
    lineHeight: 16
  }
});
