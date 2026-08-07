import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet } from "react-native";

import { useVideoPlayer, VideoView } from "expo-video";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const VIDEO_HEIGHT = SCREEN_HEIGHT * 0.75;

const FeedVideoContainer = memo(({ videoUrl, isReady, heartOpacity, heartScale, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const [isMuted, setIsMuted] = useState(true);

  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = true;
    p.muted = true;
  });

  useEffect(() => {
    if (isReady) {
      player.play();
    } else {
      player.pause();
    }
  }, [isReady, player]);

  useEffect(() => {
    player.muted = isMuted;
  }, [isMuted, player]);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <Pressable style={styles.videoContainer} onPress={onPress}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
      />
      <Animated.View
        style={[
          styles.bigHeartOverlay,
          {
            opacity: heartOpacity,
            transform: [{ scale: heartScale }],
            pointerEvents: "none"
          }
        ]}
      >
        <Icon name="heart" size={100} color="#FFFFFF" outline={false} />
      </Animated.View>
      <Pressable style={styles.muteButton} onPress={toggleMute}>
        <Icon name={isMuted ? "volumeMute" : "volumeHigh"} size={20} />
      </Pressable>
    </Pressable>
  );
});
FeedVideoContainer.displayName = "FeedVideoContainer";

const getStyles = () =>
  StyleSheet.create({
    videoContainer: {
      width: "100%",
      height: VIDEO_HEIGHT,
      backgroundColor: "#000",
      overflow: "hidden",
      flexDirection: "column"
    },
    video: {
      width: "100%",
      height: "100%"
    },
    bigHeartOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center"
    },
    muteButton: {
      position: "absolute",
      bottom: Spacing.md,
      right: Spacing.md,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: Spacing.xs,
      borderRadius: Spacing.borderRadius.full,
      zIndex: 20
    }
  });

export default FeedVideoContainer;
