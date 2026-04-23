import React, { useCallback, useRef } from "react";
import { StyleSheet, View, Image, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import AppBadge from "../ui/AppBadge";
import useStore from "@/store/useStore";

const ProfileHeader = ({ profile, skeletonProps, isLoading }) => {
  const styles = getStyles();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const maxXP = 500 + profile.profileLevel * 300;
  const targetPercentage = (profile.profileXp / maxXP) * 100;

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
    <View style={styles.profileHeader}>
      {isLoading ? (
        <View style={{ alignItems: "center" }}>
          <Skeleton {...skeletonProps} radius="round" width={100} height={100} />
          <View style={{ height: Spacing.lg }} />
          <Skeleton {...skeletonProps} width={180} height={24} />
          <View style={{ height: Spacing.md }} />
          <Skeleton {...skeletonProps} width={120} height={14} />
        </View>
      ) : (
        <>
          <View style={styles.avatarContainer}>
            <Image source={require("@/../public/assets/icon-profile.png")} style={styles.avatar} />
            <AppBadge
              label={`LVL ${profile.profileLevel}`}
              style={{
                position: "absolute",
                bottom: -Spacing.sm,
                alignSelf: "center",
                backgroundColor: MyTheme.primaryAccent,
                paddingVertical: 2,
                borderWidth: 2,
                borderColor: MyTheme.background
              }}
              textStyle={{ color: MyTheme.text }}
            />
          </View>
          <AppText type="h1">{profile.profileName}</AppText>
          <AppText type="caption" bold style={{ marginTop: Spacing.xs }}>
            {profile.profileClass} •{" "}
            <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
              {profile.profileRank}
            </AppText>
          </AppText>
        </>
      )}

      <View style={styles.xpContainer}>
        <View style={styles.xpHeader}>
          <AppText bold type="caption" style={!isDarkMode && { color: MyTheme.text }}>
            XP PROGRESS
          </AppText>
          {isLoading ? (
            <Skeleton {...skeletonProps} width={60} height={12} />
          ) : (
            <AppText bold type="caption" style={{ color: MyTheme.text }}>
              {profile.profileXp} / {maxXP}
            </AppText>
          )}
        </View>

        <View
          style={[
            styles.progressBarBg,
            { backgroundColor: !isDarkMode ? MyTheme.background : "#333", borderWidth: !isDarkMode ? 0 : 1 }
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

      <View style={styles.actionButtons}>
        {isLoading ? (
          <>
            <Skeleton {...skeletonProps} width={130} height={44} radius={Spacing.borderRadius.full} />
            <Skeleton {...skeletonProps} width={130} height={44} radius={Spacing.borderRadius.full} />
          </>
        ) : (
          <>
            <AppButton
              variant="primary"
              title={"Edit Profile"}
              icon={<Icon name="pencil" size={16} color={MyTheme.background} />}
              bgColor={MyTheme.primaryAccent}
              onPress={() => router.push("/setting/edit-profile")}
              textStyle={{ color: MyTheme.background }}
            />
            <AppButton
              variant="primary"
              title={"Share Stats"}
              icon={<Icon name="share" size={16} color={!isDarkMode ? MyTheme.background : MyTheme.text} />}
              bgColor={"#2a2a2acb"}
              textStyle={{ color: !isDarkMode ? MyTheme.background : MyTheme.text }}
            />
          </>
        )}
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    profileHeader: {
      alignItems: "center",
      paddingTop: Spacing.lg
    },
    avatarContainer: {
      position: "relative",
      marginBottom: Spacing.md
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: MyTheme.secondary
    },
    xpContainer: {
      width: "100%",
      marginTop: Spacing.lg
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
    actionButtons: {
      flexDirection: "row",
      gap: Spacing.md,
      marginTop: Spacing.lg
    }
  });

export default ProfileHeader;
