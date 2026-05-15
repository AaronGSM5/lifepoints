import React, { useCallback, useRef } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";

const LevelProgress = ({ currentXp = 0, maxXp = 1000, isLoading = false, skeletonProps = {}, style }) => {
  const styles = getStyles();
  const { t } = useTranslation("profile");
  const isDarkMode = useStore((state) => state.isDarkMode);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const safeMaxXp = maxXp > 0 ? maxXp : 1;
  const targetPercentage = Math.min((currentXp / safeMaxXp) * 100, 100);

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
    }, [targetPercentage, isLoading])
  );

  return (
    <View style={[styles.xpContainer, style]}>
      <View style={styles.xpHeader}>
        <AppText bold type="caption" style={!isDarkMode && { color: MyTheme.text }}>
          {t("XP PROGRESS")}
        </AppText>
        {isLoading ? (
          <Skeleton {...skeletonProps} width={60} height={12} />
        ) : (
          <AppText bold type="caption" style={{ color: MyTheme.text }}>
            {currentXp} / {maxXp}
          </AppText>
        )}
      </View>

      <View
        style={[
          styles.progressBarBg,
          {
            backgroundColor: !isDarkMode ? MyTheme.background : "#333",
            borderWidth: !isDarkMode ? 0 : 1
          }
        ]}
      >
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
};

const getStyles = () =>
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
    }
  });

export default LevelProgress;
