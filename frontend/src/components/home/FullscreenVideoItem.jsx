import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, View } from "react-native";

import { useVideoPlayer, VideoView } from "expo-video";

import { Spacing } from "@/constants/Spacing";
import { useFeedItem } from "@/hooks/useFeedItem";
import useStore from "@/store/useStore";

import { Icon } from "../icons/Icon";
import AppIconButton from "../ui/AppIconButton";
import AppText from "../ui/AppText";
import Avatar from "../ui/Avatar";
import BackButton from "../ui/BackButton";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const FullscreenVideoItem = ({ item, isVisible, onOpenComments, onOpenOptions }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);
  const tapTimeout = useRef(null);

  const videoProgress = useStore((state) => state.videoProgress);
  const setVideoProgress = useStore((state) => state.setVideoProgress);
  const hasRestoredTime = useRef(false);

  const { isLiked, likesCount, heartScale, heartOpacity, handleLike, handleDoubleTap, handleShare } = useFeedItem({
    initialLikes: item.initialLikes || 120,
    username: item.username,
    description: item.description
  });

  const player = useVideoPlayer(item.videoUrl, (p) => {
    p.loop = true;
    p.muted = false;
    playerRef.current = p;
  });

  useEffect(() => {
    if (!player) return;

    const subscription = player.addListener("statusChange", (payload) => {
      if (payload.status === "readyToPlay" && !hasRestoredTime.current) {
        const savedTime = videoProgress[item.id] || 0;
        if (savedTime > 0) {
          player.currentTime = savedTime;
        }
        hasRestoredTime.current = true;
      }
    });

    return () => {
      subscription.remove();
    };
  }, [player, videoProgress, item.id]);

  useEffect(() => {
    const subscription = player.addListener("playingChange", (event) => {
      setIsPlaying(event.isPlaying);
    });
    return () => {
      subscription.remove();
    };
  }, [player]);

  useEffect(() => {
    if (playerRef.current) {
      if (isVisible) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
        setVideoProgress(item.id, playerRef.current.currentTime);
      }
    }
  }, [isVisible, item.id, setVideoProgress]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        setVideoProgress(item.id, playerRef.current.currentTime);
      }
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
      }
    };
  }, [item.id, setVideoProgress]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTogglePlayPause = useCallback(() => {
    if (playerRef.current) {
      if (playerRef.current.playing) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
  }, []);

  const handleContainerPress = useCallback(() => {
    const isDoubleTap = handleDoubleTap();

    if (isDoubleTap) {
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
        tapTimeout.current = null;
      }
    } else {
      if (!tapTimeout.current) {
        tapTimeout.current = setTimeout(() => {
          tapTimeout.current = null;
          handleTogglePlayPause();
        }, 300);
      }
    }
  }, [handleDoubleTap, handleTogglePlayPause]);

  return (
    <View style={styles.itemContainer}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
      />
      <Pressable style={styles.videoPressable} onPress={handleContainerPress} />
      <BackButton style={styles.backButton} />

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

      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.authorRow} pointerEvents="none">
          <Avatar source={item.avatar} />
          <View style={styles.postDetails}>
            <AppText bold>@{item.username}</AppText>
            <AppText type="caption" style={styles.description} numberOfLines={2}>
              {item.description}
            </AppText>
          </View>
        </View>

        <View style={styles.actionBar} pointerEvents="box-none">
          <View style={styles.actionButton}>
            <AppIconButton
              icon="heart"
              iconSize={28}
              color={isLiked ? "#FF3B30" : "#FFFFFF"}
              onPress={handleLike}
              outline={!isLiked}
            />
            <AppText bold style={styles.actionText}>
              {likesCount}
            </AppText>
          </View>

          <View style={styles.actionButton}>
            <AppIconButton
              icon="chat"
              iconSize={26}
              color={"#FFFFFF"}
              onPress={() => onOpenComments && onOpenComments(item.id)}
            />
            <AppText bold style={styles.actionText}>
              {item.commentsCount || 0}
            </AppText>
          </View>

          <View style={styles.actionButton}>
            <AppIconButton icon="share" iconSize={26} color="#FFFFFF" onPress={handleShare} />
          </View>

          <AppIconButton
            icon="menu"
            iconSize={26}
            color="#FFFFFF"
            onPress={() => onOpenOptions && onOpenOptions(item.id, item.isOwner)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#000",
    position: "relative"
  },
  videoPressable: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10
  },
  video: {
    width: "100%",
    height: "100%"
  },
  backButton: {
    position: "absolute",
    top: Spacing.md,
    left: Spacing.md,
    zIndex: 30
  },
  bigHeartOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 15
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: Spacing.lg,
    zIndex: 20
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginRight: Spacing.xl
  },
  postDetails: {
    flex: 1
  },
  description: {
    color: "#fff"
  },
  actionBar: {
    position: "absolute",
    right: Spacing.lg,
    bottom: Spacing.lg,
    alignItems: "center",
    gap: Spacing.md
  },
  actionButton: {
    alignItems: "center",
    marginBottom: Spacing.sm
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4
  }
});

export default FullscreenVideoItem;
