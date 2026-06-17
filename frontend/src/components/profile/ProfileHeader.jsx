import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import AppBadge from "../ui/AppBadge";
import useStore from "@/store/useStore";
import LevelProgress from "../LevelProgress";
import { getXpThreshold } from "@/utils/xpHelpers";
import { getLeagueData } from "@/constants/Progression";
import { useAvatarFrames } from "@/hooks/useAvatarFrames";
import { useTranslation } from "react-i18next";
import StatusBadge from "../ui/StatusBadge";
import Animated from "react-native-reanimated";

const ProfileHeader = ({ skeletonProps, isLoading, isExternUser = true, sourceId, profileData }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("profile");
  const isDarkMode = useStore((state) => state.isDarkMode);
  const profile = isExternUser ? profileData : useStore((state) => state.profile);
  const { getFrameById } = useAvatarFrames();
  const activeStatusBadge = useStore((state) => state.profile.activeStatusBadge);
  const friendList = useStore((state) => state.profile.friends);
  const isFriend = friendList.includes(profile.id);
  const addFriend = useStore((state) => state.addFriend);
  const maxXP = getXpThreshold(profile.level);
  const leagueIndex = profile?.leagueIndex ?? 0;
  const rankIndex = profile?.rankIndex ?? 0;
  const league = getLeagueData(leagueIndex);
  const rankName = league.ranks[rankIndex] || "Unbekannt";
  const activeFrame = getFrameById(profile.activeFrame);

  const avatarSource = profile.avatar ? { uri: profile.avatar } : require("@/../public/assets/icon-profile.png");

  const transitionTag = sourceId ? `avatar-${profile.username}-${sourceId}` : `avatar-${profile.username}`;

  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        {isExternUser ? (
          <Animated.View
            sharedTransitionTag={transitionTag}
            style={[
              styles.frameWrapper,
              activeFrame && {
                borderColor: activeFrame.color,
                borderWidth: activeFrame.borderWidth,
                boxShadow: activeFrame.glow ? `0px 0px 10px ${activeFrame.color}` : "none"
              }
            ]}
          >
            <Image source={avatarSource} style={styles.avatar} />
          </Animated.View>
        ) : (
          <View
            style={[
              styles.frameWrapper,
              activeFrame && {
                borderColor: activeFrame.color,
                borderWidth: activeFrame.borderWidth,
                boxShadow: activeFrame.glow ? `0px 0px 10px ${activeFrame.color}` : "none"
              }
            ]}
          >
            <Image source={avatarSource} style={styles.avatar} />
          </View>
        )}
        {!isLoading && (
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
        )}
      </View>

      {isLoading ? (
        <View style={{ alignItems: "center" }}>
          <View style={{ height: Spacing.sm }} />
          <Skeleton {...skeletonProps} width={80} height={14} />
          <View style={{ height: Spacing.sm }} />
          <Skeleton {...skeletonProps} width={180} height={24} />
          <View style={{ height: Spacing.sm }} />
          <Skeleton {...skeletonProps} width={120} height={14} />
          <View style={{ height: Spacing.xl }} />
          <Skeleton {...skeletonProps} width={160} height={14} />

          <View style={styles.actionButtons}>
            <Skeleton {...skeletonProps} width={130} height={44} radius={Spacing.borderRadius.full} />
            <Skeleton {...skeletonProps} width={130} height={44} radius={Spacing.borderRadius.full} />
          </View>
        </View>
      ) : (
        <>
          <AppText type="caption">@{profile.username}</AppText>
          {activeStatusBadge || profile.badge ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
              <AppText type="h1">{profile.name}</AppText>
              <StatusBadge
                id={isExternUser ? profile.badge : activeStatusBadge}
                size={28}
                style={{ marginTop: Spacing.xs }}
              />
            </View>
          ) : (
            <AppText type="h1">{profile.name}</AppText>
          )}
          <AppText type="caption" bold style={{ marginTop: Spacing.xs }}>
            {t(league.name)} •{" "}
            <AppText bold type="caption" style={{ color: league.color }}>
              {t(rankName)}
            </AppText>
          </AppText>
          <View style={{ height: Spacing.lg }}></View>
          <AppText type="body" style={{ color: MyTheme.text, opacity: 0.9 }}>
            {profile.description}
          </AppText>

          {!isExternUser && (
            <LevelProgress
              currentXp={profile.profileXp}
              maxXp={maxXP}
              isLoading={isLoading}
              style={{ marginTop: Spacing.lg }}
            />
          )}

          <View style={styles.actionButtons}>
            <AppButton
              variant="primary"
              title={isExternUser ? (isFriend ? t("Message") : t("Add Friend")) : t("Edit Profile")}
              icon={
                isExternUser ? (
                  isFriend ? (
                    <Icon name="chat" size={16} color={MyTheme.background} />
                  ) : (
                    <Icon name="add" size={16} color={MyTheme.background} />
                  )
                ) : (
                  <Icon name="pencil" size={16} color={MyTheme.background} />
                )
              }
              bgColor={MyTheme.primaryAccent}
              onPress={() => (isExternUser ? addFriend(profile.id) : router.push("/setting/edit-profile"))}
              textStyle={{ color: MyTheme.background }}
            />
            <AppButton
              variant="primary"
              title={isExternUser ? t("Share Profile") : t("Share Stats")}
              icon={<Icon name="share" size={16} color={!isDarkMode ? MyTheme.background : MyTheme.text} />}
              bgColor={"#2a2a2acb"}
              textStyle={{ color: !isDarkMode ? MyTheme.background : MyTheme.text }}
            />
          </View>
        </>
      )}
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
