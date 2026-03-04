import { View, StyleSheet, Image, Pressable, Animated } from "react-native";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "@/components/icons/Icon";
import { useRef, useState } from "react";

export default function FeedItem({ username, description, image, initialLikes = 120 }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const [lastTap, setLastTap] = useState(0);

  // Animations-Werte für das Pop-up Herz
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
    const DOUBLE_PRESS_DELAY = 300; // Zeitfenster für den Doppeltipp (300ms ist Standard)

    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      // 1. Es war ein Doppeltipp! Premium Haptik auslösen

      // 2. Nur liken, wenn es nicht schon gelikt ist (wie bei Insta)
      if (!isLiked) {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }

      // 3. Die epische Herz-Animation starten
      Animated.sequence([
        Animated.parallel([
          Animated.spring(heartScale, { toValue: 1, friction: 3, useNativeDriver: true }),
          Animated.timing(heartOpacity, { toValue: 1, duration: 100, useNativeDriver: true })
        ]),
        Animated.delay(400), // Das Herz bleibt kurz sichtbar
        Animated.timing(heartOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(heartScale, { toValue: 0, duration: 0, useNativeDriver: true }) // Unsichtbar wieder klein machen
      ]).start();
    } else {
      // Es war nur ein einzelner Tipp, wir merken uns die Zeit
      setLastTap(now);
    }
  };

  return (
    <View style={styles.card}>
      {/* Header (User & Options) */}
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
        {/* Image (Vollbildbreite) */}
        <Pressable onPress={handleDoubleTap}>
          <Image source={image} style={styles.feedImage} resizeMode="cover" />
          {/* DAS POP-UP HERZ (Zentriert über dem Bild) */}
          <Animated.View
            style={[
              styles.bigHeartOverlay,
              {
                opacity: heartOpacity,
                transform: [{ scale: heartScale }]
              }
            ]}
            pointerEvents="none" // Wichtig: Klicks fallen durch das Herz hindurch
          >
            <Icon name="heart" size={100} color="#FFFFFF" outline={false} />
          </Animated.View>
        </Pressable>
      </View>
      {/* Action Bar (Like, Comment, Share, Bookmark) */}
      <View style={styles.actionBar}>
        <View style={styles.actionLeft}>
          <Pressable hitSlop={10} onPress={handleLike} style={styles.iconButton}>
            <Icon outline={!isLiked} name="heart" color={isLiked ? "red" : "white"} />
          </Pressable>
          <Pressable style={styles.iconButton}>
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

      {/* Footer */}
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
    borderBottomColor: MyTheme.seperator
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm
  },
  headerUser: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: Spacing.borderRadius.full,
    backgroundColor: MyTheme.primaryAccent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm
  },
  username: {
    fontSize: 14
  },
  imageContainer: {
    width: "100%",
    position: "relative"
  },
  feedImage: {
    width: "100%",
    height: "100%",
    aspectRatio: 4 / 5,
    backgroundColor: MyTheme.primary
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
