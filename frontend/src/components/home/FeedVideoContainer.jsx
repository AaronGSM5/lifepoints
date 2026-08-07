import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Animated, Dimensions, Image, Pressable, StyleSheet } from "react-native";

import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const VIDEO_HEIGHT = SCREEN_HEIGHT * 0.75;

const FeedVideoContainer = memo(({ id, videoUrl, thumbnail, isReady, heartOpacity, heartScale, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = true;
    p.muted = true;
  });

  useEffect(() => {
    const subscription = player.addListener("playingChange", (event) => {
      setIsPlaying(event.isPlaying);
    });
    return () => {
      subscription.remove();
    };
  }, [player]);

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

  const showThumbnail = !isPlaying && thumbnail;

  return (
    <Pressable style={styles.videoContainer} onPress={onPress}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
      />

      {showThumbnail && <Image source={thumbnail} style={styles.thumbnail} resizeMode="cover" />}

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
      <Pressable
        style={styles.fullscreenButton}
        onPress={(e) => {
          e.stopPropagation();
          router.push({
            pathname: "/feed/fullscreen",
            params: { postId: id }
          });
        }}
      >
        <Icon name="expand" size={20} color="#FFFFFF" />
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
      position: "relative",
      overflow: "hidden"
    },
    video: {
      width: "100%",
      height: "100%"
    },
    thumbnail: {
      ...StyleSheet.absoluteFillObject,
      width: "100%",
      height: "100%",
      zIndex: 5
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
