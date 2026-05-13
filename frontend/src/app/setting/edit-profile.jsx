import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppInput from "@/components/ui/AppInput";
import * as ImagePicker from "expo-image-picker";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import useStore from "@/store/useStore";
import { useProfile } from "@/hooks/useProfile";
import { useTranslation } from "react-i18next";
import ScreenTitle from "@/components/ui/ScreenTitle";

export default function EditProfileScreen() {
  const styles = getStyles();
  const router = useRouter();
  const { t } = useTranslation("settings");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const { profile } = useProfile();
  const updateProfile = useStore((state) => state.updateProfile);

  const initialData = {
    name: profile.name,
    username: profile.name.toLowerCase().replace(" ", ""),
    description: profile.description,
    avatar: profile.avatar
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateProfile(formData);
      setIsSaving(false);
      router.back();
    }, 1000);
  };

  const handleChangeAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(t("Permission needed"), t("We need access to your photos to change your profile picture."));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7
    });

    if (!result.canceled) {
      setFormData({ ...formData, avatar: result.assets[0].uri });
    }
  };

  const avatarSource = formData.avatar
    ? { uri: formData.avatar }
    : profile.avatar
      ? { uri: profile.avatar }
      : require("@/../public/assets/icon-profile.png");

  const skBase = {
    colorMode: isDarkMode ? "dark" : "light",
    transition: { type: "timing", duration: 1500 }
  };

  return (
    <ScreenWrapper scrollable={false} withPaddingBottom={false} withPaddingTop={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScreenTitle title={t("Edit Profile")} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            {isLoading ? (
              <Skeleton {...skBase} radius="round" width={120} height={120} />
            ) : (
              <TouchableOpacity onPress={handleChangeAvatar} style={styles.avatarContainer}>
                <Image source={avatarSource} style={styles.avatar} />
                <View style={styles.editBadge}>
                  <Icon name="camera" size={18} color="#fff" />
                </View>
              </TouchableOpacity>
            )}
            <AppText type="caption" style={styles.avatarHint}>
              {isLoading ? " " : t("Tap to change")}
            </AppText>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {isLoading ? (
              <>
                <View style={styles.inputSkeleton}>
                  <Skeleton {...skBase} width="100%" height={56} radius={Spacing.borderRadius.md} />
                </View>
                <View style={styles.inputSkeleton}>
                  <Skeleton {...skBase} width="100%" height={56} radius={Spacing.borderRadius.md} />
                </View>
                <View style={styles.inputSkeleton}>
                  <Skeleton {...skBase} width="100%" height={100} radius={Spacing.borderRadius.md} />
                </View>
              </>
            ) : (
              <>
                <AppInput
                  label={t("Name")}
                  placeholder={t("Your Name")}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  icon="profile"
                />
                <View style={{ height: Spacing.md }} />
                <AppInput
                  label={t("Username")}
                  placeholder={t("Username")}
                  value={formData.username}
                  onChangeText={(text) => setFormData({ ...formData, username: text })}
                  icon="at"
                  autoCapitalize="none"
                />
                <View style={{ height: Spacing.md }} />
                <AppInput
                  label={t("About me")}
                  placeholder={t("MyDescription")}
                  value={formData.description}
                  onChangeText={(text) => setFormData({ ...formData, description: text })}
                  multiline
                  numberOfLines={4}
                  style={{ textAlignVertical: "top" }}
                />
              </>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <AppButton
            title={isSaving ? t("Saving...") : t("Save changes")}
            onPress={handleSave}
            disabled={!hasChanges || isSaving || isLoading}
            variant="primary"
            bgColor={MyTheme.primaryAccent}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    scrollContent: {
      paddingBottom: Spacing.xl
    },
    avatarSection: {
      alignItems: "center",
      paddingVertical: Spacing.xl
    },
    avatarContainer: {
      position: "relative"
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: MyTheme.secondary
    },
    editBadge: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: MyTheme.primaryAccent,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: MyTheme.background
    },
    avatarHint: {
      marginTop: Spacing.sm,
      color: MyTheme.muted
    },
    formSection: {
      marginBottom: Spacing.xl
    },
    inputSkeleton: {
      marginBottom: Spacing.md
    },
    footer: {
      paddingVertical: Spacing.md,
      borderTopWidth: 2,
      borderTopColor: "rgba(0, 0, 0, 0.05)"
    }
  });
