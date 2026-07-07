import React, { memo, useCallback, useMemo } from "react";
import { Animated, Image, Pressable, StyleSheet, View } from "react-native";

import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";

import { Icon } from "@/components/icons/Icon";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

import { LootGameTrigger } from "./LootGameTrigger";
import FeedItemHeader from "./FeedItemHeader";
import FeedItemActionBar from "./FeedItemActionBar";
import FeedItemFooter from "./FeedItemFooter";
import { useFeedItem } from "@/hooks/useFeedItem";

export default memo(function FeedItem({
  username,
  badge,
  avatar,
  description,
  image,
  initialLikes = 120,
  id,
  onOpenComments,
  onOpenOptions,
  skeletonProps,
  isLoading,
  isReady
}) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  const startLootGame = useStore((state) => state.startLootGame);
  const myUsername = useStore((state) => state.profile.username);
  const isOwner = username === myUsername;
  const hasChest = id % 2 === 0;
  const {
    isLiked,
    isSaved,
    likesCount,
    heartScale,
    heartOpacity,
    handleLike,
    handleSave,
    handleShare,
    handleDoubleTap
  } = useFeedItem({ initialLikes: initialLikes, username: username, description: description });

  const navigateToProfile = useCallback(() => {
    router.push({
      pathname: `/user/${username}`,
      params: { sourceId: id }
    });
  }, [username, id]);

  if (isLoading) {
    return (
      <View style={styles.skeletonContainer}>
        <View style={styles.skeletonHeader}>
          <Skeleton {...skeletonProps} radius="round" width={32} height={32} />
          <Skeleton {...skeletonProps} width={120} height={12} />
        </View>
        <Skeleton {...skeletonProps} width="100%" height={350} />
        <View style={styles.skeletonFooter}>
          <View style={{ flexDirection: "row", gap: Spacing.lg }}>
            <Skeleton {...skeletonProps} width={24} height={24} radius="round" />
            <Skeleton {...skeletonProps} width={24} height={24} radius="round" />
          </View>
          <Skeleton {...skeletonProps} width="80%" height={12} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <FeedItemHeader
        id={id}
        username={username}
        avatar={avatar}
        badge={badge}
        onPress={navigateToProfile}
        onOpenOptions={() => onOpenOptions(id, isOwner)}
      />
      <View style={styles.imageContainer}>
        <Pressable style={{ flex: 1 }} onPress={handleDoubleTap}>
          <Image source={image} style={styles.feedImage} resizeMode="cover" />
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
        </Pressable>
      </View>
      {hasChest && <LootGameTrigger isReady={isReady} onPress={() => startLootGame()} />}

      <FeedItemActionBar
        handleLike={handleLike}
        isLiked={isLiked}
        handleShare={handleShare}
        isSaved={isSaved}
        handleSave={handleSave}
        onOpenComments={() => onOpenComments(id)}
      />
      <FeedItemFooter
        likesCount={likesCount}
        username={username}
        description={description}
        onPress={navigateToProfile}
      />
    </View>
  );
});

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.primary,
      paddingBottom: Spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.separator
    },
    imageContainer: {
      width: "100%",
      aspectRatio: 4 / 5,
      backgroundColor: theme.primary,
      position: "relative",
      overflow: "hidden"
    },
    feedImage: {
      width: "100%",
      height: "100%"
    },
    bigHeartOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center"
    },
    skeletonContainer: {
      backgroundColor: theme.primary,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.separator,
      paddingBottom: Spacing.md
    },
    skeletonHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: Spacing.md,
      gap: Spacing.sm
    },
    skeletonFooter: {
      padding: Spacing.md,
      gap: Spacing.md
    },
    chestIcon: {
      width: 30,
      height: 30
    }
  });
