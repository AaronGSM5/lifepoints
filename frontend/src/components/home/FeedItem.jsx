import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useFeedItem } from "@/hooks/useFeedItem";
import useStore from "@/store/useStore";

import FeedItemActionBar from "./FeedItemActionBar";
import FeedItemFooter from "./FeedItemFooter";
import FeedItemHeader from "./FeedItemHeader";
import FeedItemImageContainer from "./FeedItemImageContainer";
import { LootGameTrigger } from "./LootGameTrigger";
import Separator from "../ui/Separator";

const FeedItem = memo(
  ({
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
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

    const startLootGame = useStore((state) => state.startLootGame);
    const myUsername = useStore((state) => state.profile.username);
    const isOwner = useMemo(() => username === myUsername, [username, myUsername]);
    const hasChest = useMemo(() => id % 2 === 0, [id]);
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
        <>
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
          <Separator />
        </>
      );
    }

    return (
      <>
        <View style={styles.card}>
          <FeedItemHeader
            id={id}
            username={username}
            avatar={avatar}
            badge={badge}
            onPress={navigateToProfile}
            onOpenOptions={() => onOpenOptions(id, isOwner)}
          />

          {hasChest && <LootGameTrigger isReady={isReady} onPress={startLootGame} />}
          <FeedItemImageContainer
            image={image}
            heartOpacity={heartOpacity}
            heartScale={heartScale}
            onPress={handleDoubleTap}
          />
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
        <Separator />
      </>
    );
  }
);
FeedItem.displayName = "FeedItem";

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.primary,
      paddingBottom: Spacing.sm
    },
    skeletonContainer: {
      backgroundColor: theme.primary,
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
    }
  });

export default FeedItem;
