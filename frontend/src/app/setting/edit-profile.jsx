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
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { mockProfile } from "@/constants/MockData";

export default function EditProfileScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Originaldaten (kommen später aus dem Backend/Store)
  const initialData = {
    name: mockProfile.profileName,
    username: "@" + mockProfile.profileName.toLowerCase().replace(" ", ""),
    bio: "Ich liebe es, neue Habits aufzubauen. 🚀"
  };

  // State für die Eingabefelder
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    // Simuliere API-Ladezeit für die Profildaten
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Prüfen, ob der User etwas geändert hat
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  const handleSave = () => {
    setIsSaving(true);
    // Simuliere den API-Call zum Speichern
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert("Erfolg", "Dein Profil wurde aktualisiert.", [{ text: "OK", onPress: () => router.back() }]);
    }, 1200);
  };

  const handleChangeAvatar = () => {
    // Hier kommt später der ImagePicker rein
    Alert.alert("Profilbild", "Hier öffnet sich später die Galerie deines Handys.");
  };

  const skBase = {
    colorMode: "dark",
    transition: { type: "timing", duration: 1500 }
  };

  return (
    <ScreenWrapper scrollable={false} withPaddingBottom={false} withPaddingTop={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
                <Image source={require("@/../public/assets/icon-profile.png")} style={styles.avatar} />
                <View style={styles.editBadge}>
                  <Icon name="camera" size={18} color="#fff" />
                </View>
              </TouchableOpacity>
            )}
            <AppText type="caption" style={styles.avatarHint}>
              {isLoading ? " " : "Tippen zum Ändern"}
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
                  label="Anzeigename"
                  placeholder="Dein Name"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  icon="profile"
                />
                <View style={{ height: Spacing.md }} />
                <AppInput
                  label="Benutzername"
                  placeholder="@username"
                  value={formData.username}
                  onChangeText={(text) => setFormData({ ...formData, username: text })}
                  icon="at"
                  autoCapitalize="none"
                />
                <View style={{ height: Spacing.md }} />
                <AppInput
                  label="Über mich"
                  placeholder="Erzähl etwas über deine Ziele..."
                  value={formData.bio}
                  onChangeText={(text) => setFormData({ ...formData, bio: text })}
                  multiline
                  numberOfLines={4}
                  style={{ textAlignVertical: "top" }} // Wichtig für Android Multiline
                />
              </>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <AppButton
            title={isSaving ? "Speichere..." : "Änderungen speichern"}
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

const styles = StyleSheet.create({
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
