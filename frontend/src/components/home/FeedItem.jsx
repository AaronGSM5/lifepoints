import { View, StyleSheet, Image, Pressable, Animated as RNAnimated, Share, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "@/components/icons/Icon";
import { useRef, useState } from "react";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import useStore from "@/store/useStore";

export default function FeedItem({
  username,
  description,
  image,
  initialLikes = 120,
  id,
  onOpenComments,
  skeletonProps,
  isLoading
}) {
  const styles = getStyles();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [lastTap, setLastTap] = useState(0);
  const heartScale = useRef(new RNAnimated.Value(0)).current;
  const heartOpacity = useRef(new RNAnimated.Value(0)).current;
  const startLootGame = useStore((state) => state.startLootGame);
  // const hasChest = (id * 17) % 20 === 0;
  const hasChest = true;

  const navigateToProfile = () => {
    router.push(`/user/${username}`);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Schau dir diesen Beitrag von ${username} an: "${description}" \n\nlifepoints://profile`,
        title: `Beitrag von ${username}`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Erfolgreich geteilt mit spezifischer App (nur iOS)
          console.log("Geteilt mit:", result.activityType);
        } else {
          // Erfolgreich geteilt
          console.log("Erfolgreich geteilt");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Teilen abgebrochen");
      }
    } catch (error) {
      console.error("Fehler beim Teilen:", error.message);
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      if (!isLiked) {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }

      RNAnimated.sequence([
        RNAnimated.parallel([
          RNAnimated.spring(heartScale, { toValue: 1, friction: 3, useNativeDriver: true }),
          RNAnimated.timing(heartOpacity, { toValue: 1, duration: 100, useNativeDriver: true })
        ]),
        RNAnimated.delay(400), // Das Herz bleibt kurz sichtbar
        RNAnimated.timing(heartOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        RNAnimated.timing(heartScale, { toValue: 0, duration: 0, useNativeDriver: true })
      ]).start();
    } else {
      setLastTap(now);
    }
  };

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
      <View style={styles.header}>
        <Pressable onPress={navigateToProfile}>
          <View style={styles.headerUser}>
            <Animated.View style={styles.avatarPlaceholder} sharedTransitionTag={`avatar-${username}`}>
              <AppText type="title">{username ? username.charAt(0).toUpperCase() : "U"}</AppText>
            </Animated.View>
            <AppText bold style={styles.username}>
              {username}
            </AppText>
          </View>
        </Pressable>
        <Pressable hitSlop={15}>
          <Icon name={"dots"} size={20} color={MyTheme.muted} />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Pressable style={{ flex: 1 }} onPress={handleDoubleTap}>
          <Image source={image} style={styles.feedImage} resizeMode="cover" />
          <RNAnimated.View
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
          </RNAnimated.View>
        </Pressable>
      </View>
      <View style={styles.actionBar}>
        <View style={styles.actionLeft}>
          <Pressable hitSlop={10} onPress={handleLike}>
            <Icon outline={!isLiked} name="heart" color={isLiked ? "red" : undefined} />
          </Pressable>
          <Pressable hitSlop={10} onPress={() => onOpenComments(id)}>
            <Icon name="chat" />
          </Pressable>
          <Pressable hitSlop={10} onPress={handleShare}>
            <Icon name="forwardShare" />
          </Pressable>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.lg }}>
          {hasChest && (
            <TouchableOpacity hitSlop={10} style={styles.chestTrigger} onPress={() => startLootGame()}>
              <Icon name="lock" size={22} color={MyTheme.primaryAccent} />
            </TouchableOpacity>
          )}
          <Pressable hitSlop={10} onPress={handleSave}>
            <Icon outline={!isSaved} name="bookmark" />
          </Pressable>
        </View>
      </View>

      <View style={styles.footer}>
        <AppText bold style={styles.likesText}>
          {likesCount} {likesCount === 1 ? "Like" : "Likes"}
        </AppText>
        <AppText style={styles.descriptionText}>
          <Pressable onPress={navigateToProfile}>
            <AppText bold>{username} </AppText>
          </Pressable>
          {description}
        </AppText>

        <AppText type="caption" style={styles.timeAgo}>
          Vor 2 Stunden
        </AppText>
      </View>
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    card: {
      backgroundColor: MyTheme.primary,
      paddingBottom: Spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: MyTheme.separator
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm + 2
    },
    headerUser: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12
    },
    avatarPlaceholder: {
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: MyTheme.primaryAccent,
      justifyContent: "center",
      alignItems: "center"
    },
    username: {
      fontSize: 15
    },
    imageContainer: {
      width: "100%",
      aspectRatio: 4 / 5,
      backgroundColor: MyTheme.primary,
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
    actionBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      marginTop: 2
    },
    actionLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.lg
    },
    footer: {
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.md
    },
    likesText: {
      marginBottom: 4,
      fontSize: 14
    },
    descriptionText: {
      fontSize: 14,
      lineHeight: 20
    },
    timeAgo: {
      fontSize: 12,
      marginTop: Spacing.xs
    },
    skeletonContainer: {
      backgroundColor: MyTheme.primary,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: MyTheme.separator,
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
    chestTrigger: {
      marginRight: -4, // Zieht es etwas näher an das Bookmark für kompakte Optik
      shadowColor: MyTheme.primaryAccent,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 5 // Für Android
    }
  });
