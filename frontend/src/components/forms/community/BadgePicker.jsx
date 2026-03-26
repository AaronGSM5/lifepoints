import React, { useRef, useState } from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";

export default function BadgePicker({ badges, selectedBadges, onToggleBadge }) {
  const [showAll, setShowAll] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const heightAnim = useRef(new Animated.Value(40)).current;

  const expand = () => {
    setShowAll(true);
    Animated.timing(heightAnim, {
      toValue: fullHeight > 40 ? fullHeight : 150,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  return (
    <View>
      <AppText type="caption" style={styles.label}>
        COMMUNITY-BADGES
      </AppText>

      <View
        style={[styles.badgeWrapper, styles.measureView]}
        onLayout={(event) => setFullHeight(event.nativeEvent.layout.height)}
      >
        {badges.map((badge, index) => (
          <View key={`measure-badge-${index}`} style={styles.badgeChip}>
            <AppText style={{ fontSize: 14 }}>{badge}</AppText>
          </View>
        ))}
      </View>

      <Animated.View style={[styles.animatedWrapper, { height: heightAnim }]}>
        <View style={styles.badgeWrapper}>
          {badges.map((badge, index) => (
            <Pressable
              key={`${badge}-${index}`}
              onPress={() => onToggleBadge(badge)}
              style={[styles.badgeChip, selectedBadges.includes(badge) && styles.selectedBadgeChip]}
            >
              <AppText style={[{ fontSize: 14 }, selectedBadges.includes(badge) && { color: "#000" }]}>{badge}</AppText>
            </Pressable>
          ))}
        </View>
      </Animated.View>

      {!showAll && fullHeight > 40 && (
        <View style={styles.expandContainer}>
          <Pressable onPress={expand} style={styles.moreButton}>
            <AppText type="caption" style={{ color: MyTheme.primaryAccent }} bold>
              see more
            </AppText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    opacity: 0.5,
    letterSpacing: 1
  },
  badgeWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8
  },
  badgeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)"
  },
  selectedBadgeChip: {
    backgroundColor: MyTheme.primaryAccent,
    borderColor: MyTheme.primaryAccent
  },
  animatedWrapper: {
    overflow: "hidden",
    width: "100%"
  },
  expandContainer: {
    alignItems: "center",
    marginTop: Spacing.sm
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    gap: 4,
    paddingVertical: 4
  },
  measureView: {
    position: "absolute",
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1
  }
});
