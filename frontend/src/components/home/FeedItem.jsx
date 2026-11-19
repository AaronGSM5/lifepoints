import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

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
import BaseCard from "../ui/BaseCard";
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
    isReady,
    hasChest = false,
    taskName,
    taskLp
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
    const { t } = useTranslation("home");

    const startLootGame = useStore((state) => state.startLootGame);
    const myUsername = useStore((state) => state.profile?.username);
    const isOwner = useMemo(() => username === myUsername, [username, myUsername]);
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

    const handleOpenOptions = useCallback(() => {
      if (onOpenOptions) onOpenOptions(id, isOwner);
    }, [onOpenOptions, id, isOwner]);

    const handleOpenComments = useCallback(() => {
      if (onOpenComments) onOpenComments(id);
    }, [onOpenComments, id]);

    if (isLoading) return <FeedItemSkeleton />;
    return (
      <>
        <BaseCard variant="flat" padding={0} style={styles.card}>
          <FeedItemHeader
            id={id}
            username={username}
            avatar={avatar}
            badge={badge}
            taskName={taskName || t("Walk 10,000 steps")}
            taskLp={taskLp ?? 100}
            onPress={navigateToProfile}
            onOpenOptions={handleOpenOptions}
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
            onOpenComments={handleOpenComments}
          />
          <FeedItemFooter
            likesCount={likesCount}
            username={username}
            description={description}
            onPress={navigateToProfile}
          />
        </BaseCard>
        <Separator />
      </>
    );
  }
);
FeedItem.displayName = "FeedItem";

const getStyles = () =>
  StyleSheet.create({
    card: {
      paddingBottom: Spacing.sm
    }
  });

export default FeedItem;
