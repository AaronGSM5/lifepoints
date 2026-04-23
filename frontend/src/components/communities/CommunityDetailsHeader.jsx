import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";
import BackButton from "../ui/BackButton";

const CommunityHeader = ({ community }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = getStyles();

  const bannerImg =
    community?.banner || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop";
  const iconName = community?.icon || "groups";
  const iconColor = community?.iconColor || "#fff";
  const bgColor = community?.bgColor || MyTheme.primaryAccent;

  return (
    <View style={styles.headerContainer}>
      <Image source={{ uri: bannerImg }} style={styles.bannerImage} resizeMode="cover" />

      <View style={styles.bannerOverlay} />

      <BackButton />

      <View style={styles.avatarWrapper}>
        <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
          <MaterialIcons name={iconName} size={40} color={iconColor} />
        </View>
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    headerContainer: {
      marginBottom: Spacing.sm
    },
    bannerImage: {
      width: "100%",
      height: 180
    },
    bannerOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.25)",
      height: 180
    },
    backButton: {
      position: "absolute",
      left: Spacing.lg,
      backgroundColor: "rgba(0,0,0,0.35)",
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10
    },
    avatarWrapper: {
      paddingHorizontal: Spacing.lg,
      marginTop: -40,
      zIndex: 5
    },
    iconBox: {
      width: 80,
      height: 80,
      borderRadius: Spacing.borderRadius.lg,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 4,
      borderColor: MyTheme.background
    }
  });

export default CommunityHeader;
