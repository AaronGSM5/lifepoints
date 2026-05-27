import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import BaseCard from "../ui/BaseCard";
import { Icon } from "../icons/Icon";
import AppBadge from "../ui/AppBadge";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";

const RecommendedCommunity = ({ item, isLoading, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("community");
  const isDarkMode = useStore((state) => state.isDarkMode);
  if (isLoading) {
    return (
      <BaseCard style={styles.cardContainer}>
        <View style={styles.headerRow}>
          <Skeleton colorMode={isDarkMode ? "dark" : "light"} width={40} height={40} radius={Spacing.borderRadius.md} />
        </View>

        <View style={styles.contentArea}>
          <Skeleton colorMode={isDarkMode ? "dark" : "light"} width="70%" height={20} />
          <View style={{ height: Spacing.xs }} />
          <Skeleton colorMode={isDarkMode ? "dark" : "light"} width="100%" height={14} />
          <View style={{ height: 4 }} />
          <Skeleton colorMode={isDarkMode ? "dark" : "light"} width="80%" height={14} />
        </View>

        <View style={styles.footerRow}>
          <View style={styles.socialProof}>
            <View style={styles.facepile}>
              {[0, 1, 2].map((index) => (
                <View
                  key={`skeleton-avatar-${index}`}
                  style={[
                    styles.avatar,
                    { backgroundColor: "transparent" },
                    { zIndex: index === 1 ? 3 : index === 0 ? 2 : 1 },
                    index > 0 && { marginLeft: -10 }
                  ]}
                >
                  <Skeleton colorMode={isDarkMode ? "dark" : "light"} width={20} height={20} radius={10} />
                </View>
              ))}
            </View>

            <Skeleton colorMode={isDarkMode ? "dark" : "light"} width={80} height={12} />
          </View>
        </View>
      </BaseCard>
    );
  }

  const displayAvatars = item?.avatars?.slice(0, 3) || [];

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <BaseCard style={[styles.cardContainer, pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }]}>
          {/* Icon & Live Badge */}
          <View style={styles.headerRow}>
            <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
              <MaterialIcons name={item.icon} size={24} color={"#fff"} />
            </View>

            {item.isLive && (
              <AppBadge
                label={"LIVE"}
                textStyle={{ color: "#ef4444" }}
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  borderRadius: Spacing.borderRadius.sm,
                  borderColor: "rgba(239, 68, 68, 0.2)"
                }}
              />
            )}
          </View>

          {/* Pitch (Name & Descr) */}
          <View style={styles.contentArea}>
            <AppText bold style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </AppText>
            <AppText type="caption" style={styles.description} numberOfLines={2}>
              {item.desc}
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
                        index > 0 && { marginLeft: -10 },
                        avatar.isFriend && { borderColor: MyTheme.primaryAccent }
                      ]}
                    />
                  ))}
                </View>
              )}

              <AppText type="caption" style={styles.memberText}>
                {item.members} {t("Members")}
              </AppText>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Icon name="right" color={MyTheme.muted} />
            </View>
          </View>
        </BaseCard>
      )}
    </Pressable>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    cardContainer: {
      width: 260,
      height: 196,
      marginRight: Spacing.md,
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
    contentArea: {
      flex: 1,
      justifyContent: "center",
      marginTop: Spacing.sm + 2
    },
    cardTitle: {
      fontSize: 18,
      marginBottom: 4
    },
    description: {
      lineHeight: 20
    },
    footerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: Spacing.sm,
      paddingTop: Spacing.sm,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: "rgba(255, 255, 255, 0.1)"
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
    memberText: {
      opacity: 0.8
    }
  });

export default RecommendedCommunity;
