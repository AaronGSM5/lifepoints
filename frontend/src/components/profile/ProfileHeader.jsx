import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Share, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { getLeagueData } from "@/constants/Progression";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAvatarFrames } from "@/hooks/useAvatarFrames";
import useStore from "@/store/useStore";

import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";
import LevelProgress from "../LevelProgress";
import AppBadge from "../ui/AppBadge";
import Avatar from "../ui/Avatar";
import StatusBadge from "../ui/StatusBadge";

const ProfileHeader = memo(({ isLoading, isExternUser = true, sourceId, profileData }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("profile");
  const profile = profileData || {};
  const { getFrameById } = useAvatarFrames();
  const addFriend = useStore((state) => state.addFriend);
  const friendList = useStore((state) => state.profile?.friends);
  const isFriend = isExternUser ? friendList?.includes(profile.id) : false;
  const badgeToDisplay = isExternUser ? profile.badge : profile.activeStatusBadge;
  const leagueName = profile?.leagueName || "Unranked";
  const rankName = profile?.rankName || "Newbie";
  const league = getLeagueData(leagueName);
  const activeFrame = getFrameById(profile.activeFrame);

  const avatarSource = useMemo(
    () => (profile.avatar ? { uri: profile.avatar } : require("@/../public/assets/icon-profile.png")),
    [profile.avatar]
  );

  const transitionTag = sourceId ? `avatar-${profile.username}-${sourceId}` : `avatar-${profile.username}`;

  const frameStyles = useMemo(() => {
    if (!activeFrame) return null;
    return {
      borderColor: activeFrame.color,
      borderWidth: activeFrame.borderWidth,
      boxShadow: activeFrame.glow ? `0px 0px 10px ${activeFrame.color}` : "none"
    };
  }, [activeFrame]);

  const handlePrimaryAction = useCallback(() => {
    if (isExternUser) {
      addFriend(profile.id);
    } else {
      router.push("/setting/edit-profile");
    }
  }, [isExternUser, addFriend, profile.id]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: isExternUser
          ? t("Check out {{name}} on LifePoints!", { name: profile.name || profile.username })
          : t("I'm level {{level}} on LifePoints and collect points for good deeds. Join me!", {
              level: profile.level || 1
            })
      });
    } catch (error) {
      console.warn("Share failed:", error?.message);
    }
  }, [isExternUser, profile.level, profile.name, profile.username, t]);

  const AvatarWrapper = isExternUser ? Animated.View : View;
  const wrapperProps = isExternUser ? { sharedTransitionTag: transitionTag } : {};
  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <AvatarWrapper {...wrapperProps} style={[styles.frameWrapper, frameStyles]}>
          <Avatar source={avatarSource} size="big" />
        </AvatarWrapper>

        {/* Eigenes Profil: Level steht am XP-Balken, hier nur bei fremden Profilen */}
        {!isLoading && isExternUser && profile.level && (
          <AppBadge variant="primary" label={`LVL ${profile.level}`} style={styles.levelBadge} />
        )}
      </View>

      {isLoading ? (
        <ProfileHeaderSkeleton styles={styles} />
      ) : (
        <>
          <AppText type="caption">@{profile.username}</AppText>

          <View style={styles.nameRow}>
            <AppText type="h1">{profile.name}</AppText>
            {badgeToDisplay && <StatusBadge id={badgeToDisplay} size={28} style={styles.statusBadge} />}
          </View>

          <AppText type="caption" bold style={styles.leagueText}>
            {t(leagueName)} •{" "}
            <AppText bold type="caption" style={{ color: league?.color }}>
              {t(rankName)}
            </AppText>
          </AppText>

          {Boolean(profile.description) && (
            <AppText type="body" style={styles.descriptionText}>
              {profile.description}
            </AppText>
          )}

          {!isExternUser && (
            <LevelProgress
              currentXp={profile?.profileXp || 0}
              maxXp={profile?.maxXp}
              level={profile?.level}
              isLoading={isLoading}
              style={styles.levelProgress}
            />
          )}

          <View style={styles.actionButtons}>
            <AppButton
              title={isExternUser ? (isFriend ? t("Message") : t("Add Friend")) : t("Edit Profile")}
              icon={
                <Icon
                  name={isExternUser ? (isFriend ? "chat" : "add") : "pencil"}
                  size={16}
                  color={MyTheme.onPrimaryAccent}
                />
              }
              onPress={handlePrimaryAction}
            />
            <AppButton
              variant="secondary"
              title={isExternUser ? t("Share Profile") : t("Share Stats")}
              icon={<Icon name="share" size={16} color={MyTheme.text} />}
              onPress={handleShare}
            />
          </View>
        </>
      )}
    </View>
  );
});

ProfileHeader.displayName = "ProfileHeader";

const getStyles = (theme) =>
  StyleSheet.create({
    frameWrapper: {
      width: 110,
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
    actionButtons: {
      flexDirection: "row",
      gap: Spacing.md,
      marginTop: Spacing.lg
    },
    levelBadge: {
      position: "absolute",
      bottom: -Spacing.sm,
      alignSelf: "center",
      paddingVertical: 2,
      borderWidth: 2,
      borderColor: theme.background
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    statusBadge: {
      marginTop: Spacing.xs
    },
    leagueText: {
      marginTop: Spacing.xs
    },
    descriptionText: {
      color: theme.text,
      opacity: 0.9,
      marginTop: Spacing.lg,
      textAlign: "center"
    },
    levelProgress: {
      marginTop: Spacing.lg
    }
  });

export default ProfileHeader;
