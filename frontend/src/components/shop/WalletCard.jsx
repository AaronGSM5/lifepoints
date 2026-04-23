import React, { useCallback, useRef } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";

const WalletCard = ({ points, targetPoints, skeletonProps, isLoading }) => {
  const styles = getStyles();

  const animatedWalletProgress = useRef(new Animated.Value(0)).current;

  const targetPercentage = targetPoints ? (points / targetPoints) * 100 : 0;

  const walletWidth = animatedWalletProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"]
  });

  useFocusEffect(
    useCallback(() => {
      if (!isLoading) {
        animatedWalletProgress.setValue(0);
        Animated.timing(animatedWalletProgress, {
          toValue: targetPercentage,
          duration: 1500,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: false
        }).start();
      }
    }, [isLoading, targetPercentage])
  );

  if (isLoading) {
    return <Skeleton {...skeletonProps} width="100%" height={165} radius={Spacing.borderRadius.lg} />;
  }

  return (
    <LinearGradient colors={[MyTheme.background, "#121212"]} style={styles.walletCard}>
      <View style={styles.walletHeader}>
        <AppText bold type="caption" style={{ opacity: 0.9 }}>
          YOUR POINTS
        </AppText>
        <Icon name="wallet" size={22} color={MyTheme.primaryAccent} />
      </View>

      <View style={styles.pointsRow}>
        <AppText type="h1">{points.toLocaleString("de-DE")}</AppText>
        <AppText type="title" style={styles.pointsLabel}>
          LP
        </AppText>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBg}>
          <Animated.View
            style={[styles.progressBarFill, { width: walletWidth, backgroundColor: MyTheme.primaryAccent }]}
          />
        </View>
        <AppText type="caption">{targetPoints - points} pts until Gold Tier</AppText>
      </View>
    </LinearGradient>
  );
};

const getStyles = () =>
  StyleSheet.create({
    walletCard: {
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: MyTheme.secondary,
      marginVertical: Spacing.md
    },
    walletHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: Spacing.sm
    },
    pointsRow: {
      flexDirection: "row",
      alignItems: "baseline",
      marginBottom: Spacing.md
    },
    pointsLabel: {
      color: MyTheme.primaryAccent,
      marginLeft: Spacing.xs
    },
    progressBarContainer: {
      marginTop: Spacing.xs
    },
    progressBarBg: {
      height: 8,
      backgroundColor: "#333",
      borderRadius: Spacing.borderRadius.full,
      marginBottom: Spacing.xs,
      overflow: "hidden"
    },
    progressBarFill: {
      height: "100%",
      borderRadius: Spacing.borderRadius.full
    }
  });

export default WalletCard;
