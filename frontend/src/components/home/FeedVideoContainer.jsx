import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, Image, Pressable, StyleSheet } from "react-native";

import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

import { Icon } from "../icons/Icon";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const VIDEO_HEIGHT = SCREEN_HEIGHT * 0.75;
const FULLSCREEN_DELAY = 300;

const FeedVideoContainer = memo(({ id, videoUrl, thumbnail, isReady, heartOpacity, heartScale, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoProgress = useStore((state) => state.videoProgress);
  const setVideoProgress = useStore((state) => state.setVideoProgress);
  const savedTime = videoProgress[id] || 0;

  const playerRef = useRef(null);
  const tapTimeout = useRef(null);
  const hasRestoredTime = useRef(false);

  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = true;
    p.muted = true;
    playerRef.current = p;
  });

  useEffect(() => {
    if (!player) return;

    const subscription = player.addListener("statusChange", (payload) => {
      if (payload.status === "readyToPlay" && !hasRestoredTime.current) {
        if (savedTime > 0) {
          player.currentTime = savedTime;
        }
        hasRestoredTime.current = true;
      }
    });

    return () => {
      subscription.remove();
    };
  }, [player, savedTime]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        setVideoProgress(id, playerRef.current.currentTime);
      }
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
      }
    };
  }, [id, setVideoProgress]);

  useEffect(() => {
    if (playerRef.current) {
      const timeDiff = Math.abs(playerRef.current.currentTime - savedTime);
      if (timeDiff > 0.5) {
        playerRef.current.currentTime = savedTime;
      }
    }
  }, [savedTime]);

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

  const handleContainerPress = useCallback(
    (e) => {
      const isDoubleTap = onPress ? onPress(e) : false;

      if (isDoubleTap) {
        if (tapTimeout.current) {
          clearTimeout(tapTimeout.current);
          tapTimeout.current = null;
        }
      } else {
        if (!tapTimeout.current) {
          tapTimeout.current = setTimeout(() => {
            tapTimeout.current = null;
            if (playerRef.current) {
              setVideoProgress(id, playerRef.current.currentTime);
            }
            router.push({
              pathname: "/feed/fullscreen",
              params: { postId: id }
            });
          }, FULLSCREEN_DELAY);
        }
      }
    },
    [id, onPress, setVideoProgress]
  );

  const showThumbnail = !isPlaying && thumbnail;

  return (
    <Pressable style={styles.videoContainer} onPress={handleContainerPress}>
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
      alignItems: "center",
      zIndex: 10
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
