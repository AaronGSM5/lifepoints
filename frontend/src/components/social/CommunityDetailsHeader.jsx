import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

// eslint-disable-next-line import/no-unresolved
import { MaterialIcons } from "@expo/vector-icons";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppImage from "../ui/AppImage";
import BackButton from "../ui/BackButton";

const DEFAULT_BANNER = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop";

const CommunityHeader = memo(({ community }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  const bannerImg = community?.banner || DEFAULT_BANNER;
  const iconName = community?.icon || "groups";
  const iconColor = community?.iconColor || "#fff";
  const bgColor = community?.bgColor || MyTheme.primaryAccent;

  return (
    <View style={styles.headerContainer}>
      <AppImage source={bannerImg} variant={"communityBanner"} />

      <BackButton />

      <View style={styles.avatarWrapper}>
        <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
          <MaterialIcons name={iconName} size={40} color={iconColor} />
        </View>
      </View>
    </View>
  );
});
CommunityHeader.displayName = "CommunityHeader";

const getStyles = (theme) =>
  StyleSheet.create({
    headerContainer: {
      marginBottom: Spacing.sm
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
      borderColor: theme.background
    }
  });

export default CommunityHeader;
