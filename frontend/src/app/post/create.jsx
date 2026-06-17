import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import BaseCard from "@/components/ui/BaseCard";
import SectionHeader from "@/components/ui/SectionHeader";
import TaskSelector from "@/components/post/TaskSelector";
import useStore from "@/store/useStore";
import AppButton from "@/components/ui/AppButton";

export default function CreatePost() {
  const router = useRouter();
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const activeTaskIds = useStore((state) => state.activeTaskIds);
  const activities = useStore((state) => state.activities);

  const oneDayInMs = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const todayActivities = activities
    .filter((entry) => {
      const activityTime = new Date(entry.time).getTime();
      const timeDifference = now - activityTime;

      return timeDifference >= 0 && timeDifference <= oneDayInMs;
    })
    .map((entry) => {
      return entry.taskId;
    });

  const availableTaskIds = [...new Set([...activeTaskIds, ...todayActivities])];

  const isPostButtonEnabled = isPublic
    ? image !== null && caption.trim().length > 0 && selectedTaskId !== null
    : caption.trim().length > 0 && selectedTaskId !== null;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Wir brauchen Zugriff auf deine Galerie, damit du Bilder posten kannst!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    console.log("Post bereit zum Senden:", { isPublic, selectedTaskId, caption, image });
    router.back();
  };

  return (
    <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingBottom={false}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
            <Icon name="back" color={MyTheme.text} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle} bold>
            Beitrag erstellen
          </AppText>
          <TouchableOpacity
            onPress={handlePost}
            disabled={!isPostButtonEnabled}
            style={[styles.postButton, !isPostButtonEnabled && styles.postButtonDisabled]}
          >
            <AppText bold style={{ color: isPostButtonEnabled ? MyTheme.primaryAccent : MyTheme.muted }}>
              Posten
            </AppText>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <BaseCard style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <AppText bold>Öffentlich teilen</AppText>
              <AppText type="caption" style={{ color: MyTheme.muted, marginTop: Spacing.xs }}>
                {isPublic ? "Für alle Nutzer sichtbar" : "Nur als Fortschritt für deine Freunde"}
              </AppText>
            </View>
            <Switch
              value={isPublic}
              onValueChange={setIsPublic}
              trackColor={{ true: MyTheme.primaryAccent, false: MyTheme.muted }}
              thumbColor={MyTheme.text}
            />
          </BaseCard>

          <View>
            <SectionHeader title={"Task auswählen"} />
            {availableTaskIds && availableTaskIds.length !== 0 ? (
              <TaskSelector
                taskIds={availableTaskIds}
                selectedTaskId={selectedTaskId}
                onSelectTask={setSelectedTaskId}
              />
            ) : (
              <BaseCard style={{ flexDirection: "column", alignItems: "center", gap: Spacing.md }}>
                <AppText type="title">Keine verfügbaren Tasks</AppText>
                <AppButton title={"Task erledigen"} variant="outline" size="md" onPress={() => router.push("/tasks")} />
              </BaseCard>
            )}
          </View>

          <View>
            <SectionHeader title={"Beschreibung"} />
            <AppInput
              placeholder={"Was hast du heute erreicht?"}
              multiline
              bottomMargin={false}
              value={caption}
              onChangeText={setCaption}
            />
          </View>

          <View>
            <SectionHeader title={"Bild hochladen"} />
            <TouchableOpacity
              style={[styles.imageContainer, !image && styles.imagePlaceholder]}
              onPress={pickImage}
              activeOpacity={0.8}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <View style={styles.placeholderContent}>
                  <Icon name="camera" size={32} color={MyTheme.muted} />
                  <AppText style={{ color: MyTheme.muted, marginTop: Spacing.sm }}>
                    {isPublic ? "Bild hochladen (Pflicht)" : "Bild hochladen (Optional)"}
                  </AppText>
                </View>
              )}

              {image && (
                <TouchableOpacity style={styles.removeImageBtn} onPress={() => setImage(null)}>
                  <Icon name="trash" size={16} color="#fff" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.separator
    },
    headerTitle: {
      fontSize: 16
    },
    postButton: {
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs
    },
    postButtonDisabled: {
      opacity: 0.5
    },
    scrollContent: {
      padding: Spacing.md,
      gap: Spacing.md
    },
    imageContainer: {
      width: "100%",
      aspectRatio: 4 / 5,
      borderRadius: Spacing.borderRadius.lg,
      overflow: "hidden",
      marginBottom: Spacing.lg,
      position: "relative"
    },
    imagePlaceholder: {
      backgroundColor: theme.separator,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.separator,
      borderStyle: "dashed"
    },
    placeholderContent: {
      alignItems: "center"
    },
    previewImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover"
    },
    removeImageBtn: {
      position: "absolute",
      top: Spacing.sm,
      right: Spacing.sm,
      backgroundColor: "rgba(0,0,0,0.6)",
      padding: 8,
      borderRadius: 20
    },
    inputContainer: {
      minHeight: 100
    },
    textInput: {
      fontSize: 16,
      lineHeight: 24,
      textAlignVertical: "top"
    }
  });
