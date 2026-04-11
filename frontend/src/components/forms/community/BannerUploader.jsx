import React from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import { MyTheme } from "@/constants/Colors";

export default function BannerUploader({ bannerUri, onBannerSelect, onBannerClear }) {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Wir brauchen Zugriff auf deine Fotos, um ein Banner hochzuladen.");
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
            Tippen zum Auswählen (16:9 empfohlen)
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    opacity: 0.5,
    letterSpacing: 1
  },
  bannerPlaceholder: {
    height: 100,
    borderRadius: 16,
    backgroundColor: MyTheme.glas,
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
