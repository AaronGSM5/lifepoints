import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";

// eslint-disable-next-line import/no-unresolved
import { MaterialIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppBadge from "../ui/AppBadge";
import AppSkeleton from "../ui/AppSkeleton";
import BaseCard from "../ui/BaseCard";

const EMPTY_ARRAY = [];
const SKELETON_AVATARS = [0, 1, 2];

const RecommendedCommunity = memo(({ item, isLoading, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");

  if (isLoading) {
    return (
      <BaseCard style={styles.cardContainer}>
        <View style={styles.headerRow}>
          <AppSkeleton width={40} height={40} radius={Spacing.borderRadius.md} />
        </View>

        <View style={styles.contentArea}>
          <AppSkeleton width="70%" height={20} />
          <View style={styles.spacerSM} />
          <AppSkeleton height={14} />
          <View style={styles.spacerXS} />
          <AppSkeleton width="80%" height={14} />
        </View>

        <View style={styles.footerRow}>
          <View style={styles.socialProof}>
            <View style={styles.facepile}>
              {SKELETON_AVATARS.map((index) => (
                <View
                  key={`skeleton-avatar-${index}`}
                  style={[
                    styles.avatar,
                    styles.skeletonAvatar,
                    { zIndex: index === 1 ? 3 : index === 0 ? 2 : 1 },
                    index > 0 && { marginLeft: -10 }
                  ]}
                >
                  <AppSkeleton width={20} height={20} radius={10} />
                </View>
              ))}
            </View>

            <AppSkeleton width={80} height={12} />
          </View>
        </View>
      </BaseCard>
    );
  }

  const displayAvatars = item?.avatars ? item.avatars.slice(0, 3) : EMPTY_ARRAY;

  return (
    <BaseCard style={styles.cardContainer} onPress={onPress}>
      {/* Icon & Live Badge */}
      <View style={styles.headerRow}>
        <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
          <MaterialIcons name={item.icon} size={24} color={"#fff"} />
        </View>

        {item.isLive && <AppBadge label={"LIVE"} textStyle={styles.liveBadgeText} style={styles.liveBadgeStyle} />}
      </View>

      {/* Pitch (Name & Descr) */}
      <View style={styles.contentArea}>
        <AppText bold style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </AppText>
        <AppText type="caption" style={styles.description} numberOfLines={2}>
          {item.description}
        </AppText>
      </View>

      {/* Social Proof & CTA */}
      <View style={styles.footerRow}>
        <View style={styles.socialProof}>
          {/* Facepile */}
          {displayAvatars.length > 0 && (
            <View style={styles.facepile}>
              {displayAvatars.map((avatar, index) => (
                <Image
                  key={avatar.id || index}
                  source={{ uri: avatar.url }}
                  style={[
                    styles.avatar,
                    { zIndex: index === 1 ? 3 : index === 0 ? 2 : 1 },
                    index > 0 && styles.avatarOverlap,
                    avatar.isFriend && styles.friendAvatar
                  ]}
                />
              ))}
            </View>
          )}

          <AppText type="caption" style={styles.memberText}>
            {item.memberCount} {t("Members")}
          </AppText>
        </View>

        <View style={styles.actionIcon}>
          <Icon name="right" color={MyTheme.muted} />
        </View>
      </View>
    </BaseCard>
  );
});
RecommendedCommunity.displayName = "RecommendedCommunity";

const getStyles = (theme) =>
  StyleSheet.create({
    cardContainer: {
      width: 260,
      height: 196,
      padding: Spacing.md,
      paddingBottom: Spacing.md - 4,
      justifyContent: "space-between"
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start"
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center",
      justifyContent: "center"
    },
    liveBadgeStyle: {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      borderRadius: Spacing.borderRadius.sm,
      borderColor: "rgba(239, 68, 68, 0.2)"
    },
    liveBadgeText: {
      color: "#ef4444"
    },
    contentArea: {
      flex: 1,
      justifyContent: "center",
      marginTop: Spacing.sm + 2
    },
    spacerSM: {
      height: Spacing.sm
    },
    spacerXS: {
      height: Spacing.xs
    },
    cardTitle: {
      fontSize: 18,
      marginBottom: 4
    },
    description: {
      lineHeight: 20,
      height: 40
    },
    footerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: Spacing.sm,
      paddingTop: Spacing.sm,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.separator
    },
    socialProof: {
      flexDirection: "row",
      alignItems: "center"
    },
    facepile: {
      flexDirection: "row",
      marginRight: Spacing.sm + 2
    },
    avatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.primary
    },
    skeletonAvatar: {
      backgroundColor: "transparent"
    },
    avatarOverlap: {
      marginLeft: -10
    },
    friendAvatar: {
      borderColor: theme.primaryAccent
    },
    memberText: {
      opacity: 0.8
    },
    actionIcon: {
      justifyContent: "center",
      alignItems: "center"
    }
  });

export default RecommendedCommunity;
