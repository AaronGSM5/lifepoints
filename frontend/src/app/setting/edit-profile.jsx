import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";

import { useMyProfile } from "@/api/profile/useMyProfile";
import { useUpdateProfile } from "@/api/profile/useUpdateProfile";
import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

export default function EditProfileScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const router = useRouter();
  const { t } = useTranslation("settings");
  const isDarkMode = useStore((state) => state.isDarkMode);
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

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  const handleSave = () => {
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
    : profileData?.avatar
      ? { uri: profileData?.avatar }
      : require("@/../public/assets/icon-profile.png");

  const skBase = {
    colorMode: isDarkMode ? "dark" : "light",
    transition: { type: "timing", duration: 1500 }
  };

  return (
    <ScreenWrapper scrollable={false} withPaddingBottom={false}>
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
            title={isPending ? t("Saving...") : t("Save changes")}
            onPress={handleSave}
            disabled={!hasChanges || isPending || isLoading}
            variant="primary"
            bgColor={MyTheme.primaryAccent}
          />
        </View>
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
    },
    footer: {
      paddingVertical: Spacing.md,
      borderTopWidth: 2,
      borderTopColor: "rgba(0, 0, 0, 0.05)"
    }
  });
