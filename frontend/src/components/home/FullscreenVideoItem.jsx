import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import { useVideoPlayer, VideoView } from "expo-video";

import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";

import AppIconButton from "../ui/AppIconButton";
import AppText from "../ui/AppText";
import BackButton from "../ui/BackButton";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const FullscreenVideoItem = ({ item, isVisible, onOpenComments }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(item.initialLikes || 120);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);

  const videoProgress = useStore((state) => state.videoProgress);
  const setVideoProgress = useStore((state) => state.setVideoProgress);

  const hasRestoredTime = useRef(false);

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

  // const toggleMute = () => setIsMuted((prev) => !prev);

  const handleLike = () => {
    setIsLiked((prev) => {
      const next = !prev;
      setLikesCount((count) => (next ? count + 1 : count - 1));
      return next;
    });
  };

  return (
    <View style={styles.itemContainer}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
      />
      <Pressable style={styles.videoPressable} onPress={handleTogglePlayPause} />
      <BackButton style={styles.backButton} />

      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.bottomRow} pointerEvents="box-none">
          <View style={styles.captionContainer} pointerEvents="none">
            <AppText bold style={styles.username}>
              @{item.username}
            </AppText>
            <AppText style={styles.description} numberOfLines={2}>
              {item.description}
            </AppText>
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
              <AppIconButton icon="share" iconSize={26} color="#FFFFFF" onPress={() => {}} />
            </View>

            <View style={styles.actionButton}>
              <AppIconButton icon="menu" iconSize={26} color="#FFFFFF" onPress={() => {}} />
            </View>
          </View>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: Spacing.lg,
    zIndex: 20
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%"
  },
  captionContainer: {
    flex: 1
  },
  username: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4
  },
  description: {
    color: "#fff",
    fontSize: 14
  },
  actionBar: {
    alignItems: "center",
    justifyContent: "flex-end",
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
