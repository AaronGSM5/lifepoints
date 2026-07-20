import React, { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { Skeleton } from "moti/skeleton";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const LevelProgress = memo(({ currentXp = 0, maxXp = 1000, isLoading = false, skeletonProps = {}, style }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("profile");
  const [animatedWidth] = useState(() => new Animated.Value(0));

  const safeMaxXp = maxXp > 0 ? maxXp : 1;
  const targetPercentage = Math.min((currentXp / safeMaxXp) * 100, 100);

  const progressBarStyles = useMemo(
    () => ({
      backgroundColor: !MyTheme.isDark ? MyTheme.background : "#333",
      borderWidth: !MyTheme.isDark ? 0 : 1
    }),
    [MyTheme.isDark, MyTheme.background]
  );

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"]
  });

  useFocusEffect(
    useCallback(() => {
      if (isLoading) {
        animatedWidth.setValue(0);
        return;
      }

      animatedWidth.setValue(0);
      const animation = Animated.timing(animatedWidth, {
        toValue: targetPercentage,
        duration: 1800,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false
      });

      const timer = setTimeout(() => {
        animation.start();
      }, 150);

      return () => {
        animation.stop();
        clearTimeout(timer);
      };
    }, [targetPercentage, animatedWidth, isLoading])
  );

  return (
    <View style={[styles.xpContainer, style]}>
      <View style={styles.xpHeader}>
        <AppText bold type="caption" style={!MyTheme.isDark && styles.text}>
          {t("XP PROGRESS")}
        </AppText>
        {isLoading ? (
          <Skeleton {...skeletonProps} width={60} height={12} />
        ) : (
          <AppText bold type="caption" style={styles.text}>
            {currentXp} / {maxXp}
          </AppText>
        )}
      </View>

      <View style={[styles.progressBarBg, progressBarStyles]}>
        {isLoading ? (
          <Skeleton {...skeletonProps} width="100%" height={8} />
        ) : (
          <Animated.View style={[styles.progressBarFillContainer, { width: widthInterpolation }]}>
            <LinearGradient
              colors={[MyTheme.primaryAccent, "#335399"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
});
LevelProgress.displayName = "LevelProgress";

const getStyles = (theme) =>
  StyleSheet.create({
    xpContainer: {
      width: "100%"
    },
    xpHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: Spacing.sm
    },
    progressBarBg: {
      height: 8,
      borderRadius: Spacing.borderRadius.full,
      overflow: "hidden",
      borderColor: "#333"
    },
    progressBarFillContainer: {
      height: "100%",
      borderRadius: Spacing.borderRadius.full,
      overflow: "hidden"
    },
    text: {
      color: theme.text
    }
  });

export default LevelProgress;
