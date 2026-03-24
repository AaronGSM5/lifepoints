import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";

const CommunityHeader = ({ community }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Holt die Maße der Notch/Statusbar

  // Fallback-Werte, falls noch keine Daten da sind
  const bannerImg =
    community?.banner || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop";
  const iconName = community?.icon || "groups";
  const iconColor = community?.iconColor || "#fff";
  const bgColor = community?.bgColor || MyTheme.primaryAccent;

  return (
    <View style={styles.headerContainer}>
      {/* 1. DAS BANNER (Edge-to-Edge) */}
      <Image source={{ uri: bannerImg }} style={styles.bannerImage} resizeMode="cover" />

      {/* Dunkler Overlay-Verlauf für das Banner (optional, macht es edler) */}
      <View style={styles.bannerOverlay} />

      {/* 2. DER BACK-BUTTON (Absolut positioniert, respektiert die Notch) */}
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButton,
          { top: insets.top + Spacing.sm }, // Schiebt ihn dynamisch unter die Statusbar!
          pressed && { opacity: 0.7 }
        ]}
      >
        <Feather name="chevron-left" size={24} color="#fff" />
      </Pressable>

      {/* 3. DAS ÜBERLAPPENDE ICON */}
      {/* Wir nutzen einen Container, der den negativen Margin nach oben zieht */}
      <View style={styles.avatarWrapper}>
        <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
          <MaterialIcons name={iconName} size={40} color={iconColor} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: Spacing.sm
  },
  bannerImage: {
    width: "100%",
    height: 180 // Feste Höhe für den perfekten Look
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)", // Verdunkelt das Bild leicht, damit weiße Buttons gut lesbar sind
    height: 180
  },
  backButton: {
    position: "absolute",
    left: Spacing.lg,
    // Ein runder, halbdurchlässiger Blur-Button wie im App Store
    backgroundColor: "rgba(0,0,0,0.4)",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10 // Muss immer ganz oben liegen
  },
  avatarWrapper: {
    paddingHorizontal: Spacing.lg,
    // DER TRICK: Zieht das Icon exakt zur Hälfte über das Banner
    marginTop: -40,
    zIndex: 5
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 24, // Leicht abgerundete Ecken (Squircle) sehen moderner aus als Kreise
    alignItems: "center",
    justifyContent: "center",
    // Ein dicker Rahmen in der Hintergrundfarbe deiner App trennt das Icon vom Banner
    borderWidth: 4,
    borderColor: "#0f172a" // WICHTIG: Ersetze das mit deiner ScreenWrapper/App Hintergrundfarbe!
  }
});

export default CommunityHeader;
