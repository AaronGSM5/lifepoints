import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { useVideoPlayer, VideoView } from "expo-video";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppImage from "../ui/AppImage";
import AppText from "../ui/AppText";
import BaseCard from "../ui/BaseCard";

const MediaUploader = memo(({ isPublic, media, setMedia, pickMedia }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("post");

  const hasMedia = media && media.uri;
  const isVideo = hasMedia && media.type === "video";

  const player = useVideoPlayer(isVideo ? media.uri : null, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = true;
    playerInstance.play();
  });

  return (
    <BaseCard style={[styles.container, !hasMedia && styles.placeholder]} onPress={pickMedia} padding={0}>
      {hasMedia ? (
        isVideo ? (
          <VideoView player={player} style={styles.mediaElement} contentFit="cover" nativeControls={false} />
        ) : (
          <AppImage source={media.uri} variant={"fill"} />
        )
      ) : (
        <View style={styles.placeholderContent}>
          <Icon name="camera" size={32} color={MyTheme.muted} />
          <AppText style={{ color: MyTheme.muted, marginTop: Spacing.sm }}>
            {isPublic ? t("Upload photo or video (Required)") : t("Upload photo or video (Optional)")}
          </AppText>
        </View>
      )}

      {hasMedia && (
        <>
          {isVideo && (
            <View style={styles.videoBadge}>
              <Icon name="video" size={14} color="#fff" />
              <AppText style={styles.videoBadgeText}>Video</AppText>
            </View>
          )}
          <Icon name="trash" size={16} color="#fff" onPress={() => setMedia(null)} style={styles.removeBtn} />
        </>
      )}
    </BaseCard>
  );
});
MediaUploader.displayName = "MediaUploader";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      aspectRatio: 4 / 5,
      overflow: "hidden",
      marginBottom: Spacing.lg,
      position: "relative"
    },
    placeholder: {
      backgroundColor: theme.separator,
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.separator,
      borderStyle: "dashed"
    },
    placeholderContent: {
      alignItems: "center"
    },
    mediaElement: {
      width: "100%",
      height: "100%"
    },
    videoBadge: {
      position: "absolute",
      bottom: Spacing.sm,
      left: Spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs,
      backgroundColor: "rgba(0,0,0,0.6)",
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      borderRadius: Spacing.borderRadius.sm
    },
    videoBadgeText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600"
    },
    removeBtn: {
      position: "absolute",
      top: Spacing.sm,
      right: Spacing.sm,
      backgroundColor: "rgba(0,0,0,0.7)",
      padding: Spacing.sm,
      borderRadius: Spacing.borderRadius.full
    }
  });

export default MediaUploader;
