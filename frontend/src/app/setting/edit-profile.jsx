import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import { useMyProfile } from "@/api/profile/useMyProfile";
import { useUpdateProfile } from "@/api/profile/useUpdateProfile";
import { Icon } from "@/components/icons/Icon";
import ScreenFooter from "@/components/layout/ScreenFooter";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppImage from "@/components/ui/AppImage";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";

import EditProfileSkeleton from "./edit-profile-skeleton";

export default function EditProfileScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const router = useRouter();
  const { t } = useTranslation("settings");
  const { data: profileData, isLoading } = useMyProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  // const updateLocalStore = useStore((state) => state.updateProfile);

  const initialData = useMemo(
    () => ({
      name: profileData?.name || "",
      username: profileData?.username || "",
      description: profileData?.description || "",
      avatar: profileData?.avatar || null
    }),
    [profileData]
  );

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (profileData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(initialData);
    }
  }, [profileData, initialData]);

  const hasChanges = useMemo(() => JSON.stringify(formData) !== JSON.stringify(initialData), [formData, initialData]);

  const handleSave = useCallback(() => {
    triggerHaptic();
    updateProfile(formData, {
      onSuccess: () => {
        router.back();
      },
      onError: (err) => {
        Alert.alert(t("Error"), t("Failed to save profile."));
        console.error(err);
      }
    });
  }, [formData, t, router, updateProfile]);

  const handleChangeAvatar = useCallback(async () => {
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
  }, [formData, t]);

  const avatarSource = useMemo(
    () =>
      formData.avatar
        ? { uri: formData.avatar }
        : profileData?.avatar
          ? { uri: profileData?.avatar }
          : require("@/../public/assets/icon-profile.png"),
    [formData.avatar, profileData?.avatar]
  );

  return (
    <ScreenWrapper scrollable={false} withPaddingBottom={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScreenTitle title={t("Edit Profile")} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={handleChangeAvatar} style={styles.avatarContainer}>
              <AppImage
                source={avatarSource}
                variant={"avatarBig"}
                style={{ borderWidth: 1, borderColor: MyTheme.secondary }}
              />
              <View style={styles.editBadge}>
                <Icon name="camera" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
            <AppText type="caption" style={styles.avatarHint}>
              {!isLoading && t("Tap to change")}
            </AppText>
          </View>

          <View style={styles.formSection}>
            {isLoading ? (
              <EditProfileSkeleton styles={styles} />
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

        <ScreenFooter breakOut>
          <AppButton
            title={isPending ? t("Saving...") : t("Save changes")}
            size={"lg"}
            onPress={handleSave}
            disabled={!hasChanges || isPending || isLoading}
          />
        </ScreenFooter>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    scrollContent: {
      paddingBottom: Spacing.xl
    },
    avatarSection: {
      alignItems: "center",
      paddingBottom: Spacing.xl
    },
    avatarContainer: {
      position: "relative"
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: theme.secondary
    },
    editBadge: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: theme.primaryAccent,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: theme.background
    },
    avatarHint: {
      marginTop: Spacing.sm,
      color: theme.muted
    },
    formSection: {
      marginBottom: Spacing.xl
    },
    inputSkeleton: {
      marginBottom: Spacing.md
    }
  });
