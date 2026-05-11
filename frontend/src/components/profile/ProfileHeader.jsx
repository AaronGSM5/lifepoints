import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import AppBadge from "../ui/AppBadge";
import useStore from "@/store/useStore";
import LevelProgress from "../LevelProgress";
import { getXpThreshold } from "@/utils/xpHelpers";
import { getLeagueData } from "@/constants/Progression";
import { getFrameById } from "@/constants/Frames";

const ProfileHeader = ({ skeletonProps, isLoading }) => {
  const styles = getStyles();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const profile = useStore((state) => state.profile);
  const maxXP = getXpThreshold(profile.level);
  const leagueIndex = profile?.leagueIndex ?? 0;
  const rankIndex = profile?.rankIndex ?? 0;
  const league = getLeagueData(leagueIndex);
  const rankName = league.ranks[rankIndex] || "Unbekannt";

  const activeFrame = getFrameById(profile.activeFrame);

  const avatarSource = profile.avatar ? { uri: profile.avatar } : require("@/../public/assets/icon-profile.png");

  return (
    <View style={styles.profileHeader}>
      {isLoading ? (
        <View style={{ alignItems: "center" }}>
          <Skeleton {...skeletonProps} radius="round" width={100} height={100} />
          <View style={{ height: Spacing.lg }} />
          <Skeleton {...skeletonProps} width={80} height={14} />
          <View style={{ height: Spacing.sm }} />
          <Skeleton {...skeletonProps} width={180} height={24} />
          <View style={{ height: Spacing.sm }} />
          <Skeleton {...skeletonProps} width={120} height={14} />
          <View style={{ height: Spacing.xl }} />
          <Skeleton {...skeletonProps} width={160} height={14} />
        </View>
      ) : (
        <>
          <View style={styles.avatarContainer}>
            <View
              style={[
                styles.frameWrapper,
                activeFrame && {
                  borderColor: activeFrame.color,
                  borderWidth: activeFrame.borderWidth,
                  shadowColor: activeFrame.glow ? activeFrame.color : "transparent",
                  shadowOpacity: activeFrame.glow ? 0.8 : 0,
                  shadowRadius: 10
                }
              ]}
            >
              <Image source={avatarSource} style={styles.avatar} />
            </View>

            <AppBadge
              label={`LVL ${profile.level}`}
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
          <AppText type="caption">{profile.username}</AppText>
          <AppText type="h1">{profile.name}</AppText>
          <AppText type="caption" bold style={{ marginTop: Spacing.xs }}>
            {league.name} •{" "}
            <AppText bold type="caption" style={{ color: league.color }}>
              {rankName}
            </AppText>
          </AppText>
          <View style={{ height: Spacing.lg }}></View>
          <AppText type="title" style={{ color: MyTheme.text, opacity: 0.9 }}>
            {profile.description}
          </AppText>
        </>
      )}

      <LevelProgress
        currentXp={profile.profileXp}
        maxXp={maxXP}
        isLoading={isLoading}
        style={{ marginTop: Spacing.lg }}
      />

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
    frameWrapper: {
      width: 110, // Etwas größer als das Bild
      height: 110,
      borderRadius: 55,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent"
    },
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
      borderRadius: 50
    },
    actionButtons: {
      flexDirection: "row",
      gap: Spacing.md,
      marginTop: Spacing.lg
    }
  });

export default ProfileHeader;
