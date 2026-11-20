import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import ScreenFooter from "@/components/layout/ScreenFooter";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import MediaUploader from "@/components/post/MediaUploader";
import TaskSelector from "@/components/post/TaskSelector";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import ScreenTitle from "@/components/ui/ScreenTitle";
import SectionHeader from "@/components/ui/SectionHeader";
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
  const [media, setMedia] = useState(null);
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
        ? media !== null && caption.trim().length > 0 && selectedTaskId !== null
        : caption.trim().length > 0 && selectedTaskId !== null,
    [caption, media, isPublic, selectedTaskId]
  );

  const pickMedia = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(t("We need access to your gallery so you can post pictures and videos!"));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 0.8
      // videoMaxDuration: 60
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setMedia({
        uri: asset.uri,
        type: asset.type || (asset.uri.endsWith(".mp4") || asset.uri.endsWith(".mov") ? "video" : "image"),
        duration: asset.duration || null
      });
    }
  }, [t]);

  const handlePost = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <ScreenWrapper scrollable={false} withPaddingBottom={false}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScreenTitle title={t("Create Post")} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <BaseCard style={styles.visibilityCard}>
            <View style={styles.visibilityText}>
              <AppText bold>{t("Share publicly")}</AppText>
              <AppText type="caption" style={styles.visibilityCaption}>
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
              <BaseCard style={styles.emptyTasksCard}>
                <AppText type="title">{t("No available tasks")}</AppText>
                <AppButton title={t("Do a task")} variant="outline" onPress={() => router.push("/tasks")} />
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
            <SectionHeader title={t("Upload photo or video")} />
            <MediaUploader isPublic={isPublic} media={media} setMedia={setMedia} pickMedia={pickMedia} />
          </View>
        </ScrollView>

        <ScreenFooter breakOut>
          <AppButton title={t("Post")} size="lg" onPress={handlePost} disabled={!isPostButtonEnabled} />
        </ScreenFooter>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    scrollContent: {
      paddingBottom: Spacing.md,
      gap: Spacing.lg
    },
    visibilityCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: Spacing.md
    },
    visibilityText: {
      flex: 1
    },
    visibilityCaption: {
      color: theme.muted,
      marginTop: Spacing.xs
    },
    emptyTasksCard: {
      alignItems: "center",
      gap: Spacing.md
    }
  });
