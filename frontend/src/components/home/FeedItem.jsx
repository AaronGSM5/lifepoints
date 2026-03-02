import { View, StyleSheet, Image, Pressable } from "react-native";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "@/components/icons/Icon";
import { useState } from "react";

export default function FeedItem({ username, description, image }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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
        <Pressable>
          <Icon name={"dots"} size={20} />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        {/* Image (Vollbildbreite) */}
        <Image source={image} style={styles.feedImage} resizeMode="cover" />
      </View>
      {/* Action Bar (Like, Comment, Share, Bookmark) */}
      <View style={styles.actionBar}>
        <View style={styles.actionLeft}>
          <Pressable onPress={() => setIsLiked(!isLiked)} style={styles.iconButton}>
            <Icon outline={!isLiked} name="heart" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Icon name="chat" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Icon name="plane" />
          </Pressable>
        </View>
        <Pressable onPress={() => setIsSaved(!isSaved)} style={styles.iconButton}>
          <Icon outline={!isSaved} name="bookmark" />
        </Pressable>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <AppText bold style={styles.likesText}>
          {Math.floor(Math.random() * 500) + 50} Likes
        </AppText>

        <AppText style={styles.descriptionText}>{description}</AppText>

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
    paddingBottom: Spacing.md,
    borderRadius: Spacing.borderRadius.md
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: Spacing.sm,
    paddingRight: Spacing.md,
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
  feedImage: {
    width: "100%",
    height: "100%",
    aspectRatio: 4 / 5,
    backgroundColor: MyTheme.primary
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.xs
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md
  },
  footer: {
    paddingHorizontal: Spacing.md
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
