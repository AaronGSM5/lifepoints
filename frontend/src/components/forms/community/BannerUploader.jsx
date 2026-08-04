import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Icon } from "@/components/icons/Icon";
import AppImage from "@/components/ui/AppImage";
import AppText from "@/components/ui/AppText";
import CloseButton from "@/components/ui/CloseButton";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function BannerUploader({ bannerUri, onBannerSelect, onBannerClear }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");
  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(t("We need access to your photos in order to upload a banner."));
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8
    });
    if (!result.canceled) {
      onBannerSelect(result.assets[0].uri);
    }
  }, [onBannerSelect, t]);

  return (
    <View>
      <AppText type="caption" style={styles.label}>
        COMMUNITY-BANNER (OPTIONAL)
      </AppText>
      {bannerUri ? (
        <View style={styles.bannerImageWrapper}>
          <AppImage source={bannerUri} variant={"fill"} />
          <CloseButton withBackground onPress={onBannerClear} style={styles.clearImageIcon} />
        </View>
      ) : (
        <Pressable onPress={pickImage} style={styles.bannerPlaceholder}>
          <Icon name="camera" color={MyTheme.muted} />
          <AppText type="caption" style={styles.placeholderText}>
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
      marginBottom: Spacing.sm,
      opacity: 0.5,
      letterSpacing: 1,
      color: theme.text
    },
    bannerPlaceholder: {
      height: 150,
      borderRadius: Spacing.borderRadius.md,
      backgroundColor: theme.glas,
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: theme.separator,
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing.sm
    },
    bannerImageWrapper: {
      height: 150,
      borderRadius: Spacing.borderRadius.md,
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
      padding: Spacing.xs
    },
    placeholderText: {
      textAlign: "center",
      marginTop: Spacing.xs
    }
  });
