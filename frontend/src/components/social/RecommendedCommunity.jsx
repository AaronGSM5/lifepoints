import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";

// eslint-disable-next-line import/no-unresolved
import { MaterialIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import RecommendedCommunitySkeleton from "./RecommendedCommunitySkeleton";
import { Icon } from "../icons/Icon";
import AppBadge from "../ui/AppBadge";
import BaseCard from "../ui/BaseCard";

const EMPTY_ARRAY = [];

const RecommendedCommunity = memo(({ item, isLoading, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");

  if (isLoading) return <RecommendedCommunitySkeleton styles={styles} />;

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
