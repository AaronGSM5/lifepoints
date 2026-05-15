import React, { useRef, useState } from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppBadge from "@/components/ui/AppBadge";
import { useTranslation } from "react-i18next";

export default function BadgePicker({ badges, selectedBadges, onToggleBadge }) {
  const styles = getStyles();
  const { t } = useTranslation("community");
  const [showAll, setShowAll] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const heightAnim = useRef(new Animated.Value(30)).current;

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
          <AppBadge key={`measure-badge-${index}`} label={t(badge)} variant="outline" />
        ))}
      </View>

      <Animated.View style={[styles.animatedWrapper, { height: heightAnim }]}>
        <View style={styles.badgeWrapper}>
          {badges.map((badge, index) => {
            const isSelected = selectedBadges.includes(badge);
            return (
              <AppBadge
                key={`${badge}-${index}`}
                label={t(badge)}
                variant={isSelected ? "primary" : "outline"}
                onPress={() => onToggleBadge(badge)}
              />
            );
          })}
        </View>
      </Animated.View>

      {!showAll && fullHeight > 40 && (
        <View style={styles.expandContainer}>
          <Pressable onPress={expand} style={styles.moreButton}>
            <AppText type="caption" style={{ color: MyTheme.primaryAccent }} bold>
              {t("see more")}
            </AppText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    label: {
      marginBottom: 8,
      opacity: 0.5,
      letterSpacing: 1,
      color: MyTheme.text
    },
    badgeWrapper: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 8
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
