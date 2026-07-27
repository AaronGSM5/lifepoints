import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ImageUploader from "@/components/post/ImageUploader";
import TaskSelector from "@/components/post/TaskSelector";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Separator from "@/components/ui/Separator";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

export default function CreatePost() {
  const router = useRouter();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("post");
  const [isPublic, setIsPublic] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const activities = useStore((state) => state.activities);

  const availableTaskIds = useMemo(() => {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();

    const todayActivityIds = activities
      .filter((entry) => {
        const activityTime = new Date(entry.time).getTime();
        const timeDifference = now - activityTime;
        return timeDifference >= 0 && timeDifference <= oneDayInMs;
      })
      .map((entry) => entry.taskId);

    return [...new Set(todayActivityIds)];
  }, [activities]);

  const isPostButtonEnabled = useMemo(
    () =>
      isPublic
        ? image !== null && caption.trim().length > 0 && selectedTaskId !== null
        : caption.trim().length > 0 && selectedTaskId !== null,
    [caption, image, isPublic, selectedTaskId]
  );

  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(t("We need access to your gallery so you can post pictures!"));
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
  }, [t]);

  const handlePost = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <ScreenWrapper
      scrollable={false}
      withPaddingSides={false}
      withPaddingBottom={false}
      withPaddingTop={false}
      withToolbar={false}
    >
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.header}>
          <Icon name="back" color={MyTheme.text} onPress={() => router.back()} />
          <AppText style={styles.headerTitle} bold>
            {t("Create Post")}
          </AppText>
          <AppText
            bold
            style={[styles.postButton, isPostButtonEnabled && { color: MyTheme.primaryAccent }]}
            onPress={handlePost}
            disabled={!isPostButtonEnabled}
          >
            {t("Post")}
          </AppText>
        </View>
        <Separator />

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <BaseCard style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <AppText bold>{t("Share publicly")}</AppText>
              <AppText type="caption" style={{ color: MyTheme.muted, marginTop: Spacing.xs }}>
                {isPublic ? t("Visible to all users") : t("Only as progress for your friends")}
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
            <SectionHeader title={t("Select task")} />
            {availableTaskIds && availableTaskIds.length !== 0 ? (
              <TaskSelector
                taskIds={availableTaskIds}
                selectedTaskId={selectedTaskId}
                onSelectTask={setSelectedTaskId}
              />
            ) : (
              <BaseCard style={{ flexDirection: "column", alignItems: "center", gap: Spacing.md }}>
                <AppText type="title">{t("No available tasks")}</AppText>
                <AppButton title={t("Do a task")} variant="outline" size="md" onPress={() => router.push("/tasks")} />
              </BaseCard>
            )}
          </View>

          <View>
            <SectionHeader title={t("Description")} />
            <AppInput
              placeholder={t("What did you achieve today?")}
              multiline
              bottomMargin={false}
              value={caption}
              onChangeText={setCaption}
            />
          </View>

          <View>
            <SectionHeader title={t("Upload image")} />
            <ImageUploader isPublic={isPublic} image={image} setImage={setImage} pickImage={pickImage} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm
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
    inputContainer: {
      minHeight: 100
    },
    textInput: {
      fontSize: 16,
      lineHeight: 24,
      textAlignVertical: "top"
    }
  });
