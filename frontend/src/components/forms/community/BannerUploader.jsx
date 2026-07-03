import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function BannerUploader({ bannerUri, onBannerSelect, onBannerClear }) {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("community");
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(t("We need access to your photos in order to upload a banner."));
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1
    });
    if (!result.canceled) {
      onBannerSelect(result.assets[0].uri);
    }
  };

  return (
    <View>
      <AppText type="caption" style={styles.label}>
        COMMUNITY-BANNER (OPTIONAL)
      </AppText>
      {bannerUri ? (
        <View style={styles.bannerImageWrapper}>
          <Image source={{ uri: bannerUri }} style={styles.bannerImage} resizeMode="cover" />
          <Pressable onPress={onBannerClear} style={styles.clearImageIcon}>
            <Icon name="close" color="#fff" size={16} />
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={pickImage} style={styles.bannerPlaceholder}>
          <Icon name="camera" color={MyTheme.muted} />
          <AppText type="caption" style={{ textAlign: "center", marginTop: 4 }}>
            {t("Tap to select (16:9 recommended)")}
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    label: {
      marginBottom: 8,
      opacity: 0.5,
      letterSpacing: 1,
      color: theme.text
    },
    bannerPlaceholder: {
      height: 100,
      borderRadius: 16,
      backgroundColor: theme.glas,
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    },
    bannerImageWrapper: {
      height: 100,
      borderRadius: 16,
      overflow: "hidden",
      position: "relative"
    },
    bannerImage: {
      width: "100%",
      height: "100%"
    },
    clearImageIcon: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: "rgba(0,0,0,0.6)",
      padding: 6,
      borderRadius: 16
    }
  });
