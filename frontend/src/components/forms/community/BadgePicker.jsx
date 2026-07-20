import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Pressable, StyleSheet, View } from "react-native";

import AppBadge from "@/components/ui/AppBadge";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function BadgePicker({ badges, selectedBadges, onToggleBadge }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");
  const [showAll, setShowAll] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const [heightAnim] = useState(() => new Animated.Value(30));

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

const getStyles = (theme) =>
  StyleSheet.create({
    label: {
      marginBottom: 8,
      opacity: 0.5,
      letterSpacing: 1,
      color: theme.text
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
