import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import MyCommunityCardSkeleton from "./MyCommunityCardSkeleton";
import { Icon } from "../icons/Icon";
import AppBadge from "../ui/AppBadge";
import BaseCard from "../ui/BaseCard";

const MyCommunityCard = memo(({ item, isLoading, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");

  if (isLoading) return <MyCommunityCardSkeleton styles={styles} />;

  return (
    <BaseCard style={styles.communityCard} onPress={onPress} accessibilityLabel={item.title}>
      <View style={styles.headerRow}>
        <View style={[styles.iconBox, { backgroundColor: item.color || item.bgColor || MyTheme.glas }]}>
          <Icon name={item.icon} />
          {item.hasUnread && <View style={styles.notificationDot} />}
        </View>

        {item.isLive && <AppBadge variant="hot" label={t("LIVE NOW")} />}
      </View>

      <View style={styles.bottomContent}>
        <AppText bold numberOfLines={1}>
          {item.title}
        </AppText>

        <View style={styles.statusRow}>
          {item.onlineCount > 0 ? (
            <>
              <View style={styles.onlineIndicator} />
              <AppText type="caption">
                <AppText type="caption" bold style={styles.onlineCountText}>
                  {item.onlineCount}
                </AppText>{" "}
                {t("online")}
              </AppText>
            </>
          ) : (
            <AppText type="caption">
              {item.members ?? item.memberCount ?? 0} {t("Members")}
            </AppText>
          )}
        </View>
      </View>
    </BaseCard>
  );
});
MyCommunityCard.displayName = "MyCommunityCard";

const getStyles = (theme) =>
  StyleSheet.create({
    communityCard: {
      height: 140,
      padding: Spacing.md,
      justifyContent: "space-between"
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start"
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    },
    notificationDot: {
      position: "absolute",
      top: -2,
      right: -2,
      width: 12,
      height: 12,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.warning,
      borderWidth: 2,
      borderColor: theme.primary
    },
    bottomContent: {
      gap: 4
    },
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4
    },
    onlineIndicator: {
      width: 6,
      height: 6,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.primaryAccent
    },
    skeletonBottomContainer: {
      flex: 1,
      justifyContent: "flex-end"
    },
    skeletonSpacer: {
      height: Spacing.xs
    },
    onlineCountText: {
      color: theme.primaryAccent
    }
  });

export default MyCommunityCard;
