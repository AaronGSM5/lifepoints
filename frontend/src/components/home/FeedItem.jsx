import { View, StyleSheet, Image, Pressable, Animated } from "react-native";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "@/components/icons/Icon";
import { useRef, useState } from "react";

export default function FeedItem({ username, description, image, initialLikes = 120, id, onOpenComments }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const [lastTap, setLastTap] = useState(0);

  const heartScale = useRef(new Animated.Value(0)).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      if (!isLiked) {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }

      Animated.sequence([
        Animated.parallel([
          Animated.spring(heartScale, { toValue: 1, friction: 3, useNativeDriver: true }),
          Animated.timing(heartOpacity, { toValue: 1, duration: 100, useNativeDriver: true })
        ]),
        Animated.delay(400), // Das Herz bleibt kurz sichtbar
        Animated.timing(heartOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(heartScale, { toValue: 0, duration: 0, useNativeDriver: true })
      ]).start();
    } else {
      setLastTap(now);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerUser}>
          <View style={styles.avatarPlaceholder}>
            <AppText type="title">{username ? username.charAt(0).toUpperCase() : "U"}</AppText>
          </View>
          <AppText bold style={styles.username}>
            {username}
          </AppText>
        </View>
        <Pressable hitSlop={15}>
          <Icon name={"dots"} size={20} color={MyTheme.muted} />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Pressable onPress={handleDoubleTap}>
          <Image source={image} style={styles.feedImage} resizeMode="cover" />
          <Animated.View
            style={[
              styles.bigHeartOverlay,
              {
                opacity: heartOpacity,
                transform: [{ scale: heartScale }]
              }
            ]}
            pointerEvents="none"
          >
            <Icon name="heart" size={100} color="#FFFFFF" outline={false} />
          </Animated.View>
        </Pressable>
      </View>
      <View style={styles.actionBar}>
        <View style={styles.actionLeft}>
          <Pressable hitSlop={10} onPress={handleLike} style={styles.iconButton}>
            <Icon outline={!isLiked} name="heart" color={isLiked ? "red" : "white"} />
          </Pressable>
          <Pressable style={styles.iconButton} hitSlop={10} onPress={() => onOpenComments(id)}>
            <Icon name="chat" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Icon name="plane" />
          </Pressable>
        </View>
        <Pressable hitSlop={10} onPress={handleSave} style={styles.iconButton}>
          <Icon outline={!isSaved} name="bookmark" />
        </Pressable>
      </View>

      <View style={styles.footer}>
        <AppText bold style={styles.likesText}>
          {likesCount} {likesCount === 1 ? "Like" : "Likes"}
        </AppText>

        <AppText style={styles.descriptionText}>
          <AppText bold>{username} </AppText>
          {description}
        </AppText>

        <AppText type="caption" style={styles.timeAgo}>
          Vor 2 Stunden
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: MyTheme.primary,
    position: "relative"
  },
  feedImage: {
    width: "100%",
    aspectRatio: 4 / 5
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
  }
});
