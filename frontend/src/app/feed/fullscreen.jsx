import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, View } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BackButton from "@/components/ui/BackButton";
import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 80
};

const FullscreenVideoItem = ({ item, isVisible }) => {
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef(null);

  const videoProgress = useStore((state) => state.videoProgress);
  const setVideoProgress = useStore((state) => state.setVideoProgress);

  const [initialTime] = useState(() => videoProgress[item.id] || 0);

  const hasSetTime = useRef(false);

  const player = useVideoPlayer(item.videoUrl, (p) => {
    p.loop = true;
    p.muted = false;
    playerRef.current = p;
  });

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        setVideoProgress(item.id, playerRef.current.currentTime);
      }
    };
  }, [item.id, setVideoProgress]);

  useEffect(() => {
    if (playerRef.current) {
      if (isVisible) {
        if (!hasSetTime.current && initialTime > 0) {
          playerRef.current.currentTime = initialTime;
          hasSetTime.current = true;
        }
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  }, [isVisible, initialTime]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <View style={styles.itemContainer}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
      />
      <BackButton style={styles.backButton} />

      <Pressable style={styles.muteButton} onPress={toggleMute}>
        <Icon name={isMuted ? "volumeMute" : "volumeHigh"} size={22} />
      </Pressable>

      <View style={styles.overlay}>
        <View style={styles.captionContainer}>
          <AppText style={styles.username}>@{item.username}</AppText>
          <AppText style={styles.description}>{item.description}</AppText>
        </View>
      </View>
    </View>
  );
};

export default function FullscreenFeedScreen() {
  const params = useLocalSearchParams();
  const targetPostId = params.postId;

  const feedItems = useStore((state) => state.feedItems || []);
  const videoPosts = feedItems.filter((item) => item.type === "video");

  const initialIndex = videoPosts.findIndex((item) => String(item.id) === String(targetPostId));
  const startIndex = initialIndex !== -1 ? initialIndex : 0;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => <FullscreenVideoItem item={item} isVisible={index === currentIndex} />,
    [currentIndex]
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index
    }),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={videoPosts}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={onViewableItemsChanged}
        initialScrollIndex={startIndex}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  itemContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#000",
    position: "relative"
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
  muteButton: {
    position: "absolute",
    bottom: 100,
    right: Spacing.md,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: Spacing.sm,
    borderRadius: 20,
    zIndex: 30
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: Spacing.lg,
    zIndex: 20,
    pointerEvents: "box-none"
  },
  captionContainer: {
    marginBottom: Spacing.xl
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4
  },
  description: {
    color: "#fff",
    fontSize: 14
  }
});
