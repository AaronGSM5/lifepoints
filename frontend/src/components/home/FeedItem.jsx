import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useFeedItem } from "@/hooks/useFeedItem";
import useStore from "@/store/useStore";

import FeedImageContainer from "./FeedImageContainer";
import FeedItemActionBar from "./FeedItemActionBar";
import FeedItemFooter from "./FeedItemFooter";
import FeedItemHeader from "./FeedItemHeader";
import FeedItemSkeleton from "./FeedItemSkeleton";
import FeedVideoContainer from "./FeedVideoContainer";
import { LootGameTrigger } from "./LootGameTrigger";
import Separator from "../ui/Separator";

const FeedItem = memo(
  ({
    type = "image",
    videoUrl,
    thumbnail,
    username,
    badge,
    avatar,
    description,
    image,
    initialLikes = 120,
    id,
    onOpenComments,
    onOpenOptions,
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

    if (isLoading) return <FeedItemSkeleton styles={styles} />;
    const mockTask = `Gehe 10.000 Schritte`;
    return (
      <>
        <View style={styles.card}>
          <FeedItemHeader
            id={id}
            username={username}
            avatar={avatar}
            badge={badge}
            taskName={mockTask}
            onPress={navigateToProfile}
            onOpenOptions={() => onOpenOptions(id, isOwner)}
            onTaskPress={() => router.push("task/dasIstNurEinPlatzhalter")}
          />

          {hasChest && <LootGameTrigger isReady={isReady} onPress={startLootGame} />}
          {type === "video" ? (
            <FeedVideoContainer
              id={id}
              videoUrl={videoUrl}
              thumbnail={thumbnail}
              isReady={isReady}
              heartOpacity={heartOpacity}
              heartScale={heartScale}
              onPress={handleDoubleTap}
            />
          ) : (
            <FeedImageContainer
              image={image}
              heartOpacity={heartOpacity}
              heartScale={heartScale}
              onPress={handleDoubleTap}
            />
          )}
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
    }
  });

export default FeedItem;
