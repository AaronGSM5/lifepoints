import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, View } from "react-native";

import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

import AppBadge from "../ui/AppBadge";
import AppSkeleton from "../ui/AppSkeleton";

const FYTaskItem = memo(({ id, title, description, lp, badge, image, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const completeTask = useStore((state) => state.completeTask);
  if (isLoading) {
    return (
      <BaseCard style={styles.card} padding={0}>
        {/* Image */}
        <View style={[styles.cardImage, { padding: 0, overflow: "hidden" }]}>
          <AppSkeleton height={"100%"} radius={0} />
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardInfoRow}>
            <View style={{ flex: 1, paddingRight: Spacing.sm }}>
              <View style={{ marginBottom: 4 }}>
                <AppSkeleton width="80%" height={20} />
              </View>
              <AppSkeleton width="80%" height={14} />
            </View>
            <AppSkeleton width={60} height={22} />
          </View>
          {/* Button */}
          <AppSkeleton height={44} radius={Spacing.borderRadius.lg} />
        </View>
      </BaseCard>
    );
  }

  const renderBadge = () => {
    if (!badge) return null;
    return (
      <AppBadge
        variant={"primary"}
        label={t(badge)}
        textStyle={{ color: MyTheme.text }}
        style={{ position: "absolute", right: Spacing.sm, top: Spacing.sm }}
      />
    );
  };

  return (
    <BaseCard style={styles.card} padding={0}>
      {image ? (
        <ImageBackground source={image} style={styles.cardImage} resizeMode="cover">
          {renderBadge()}
        </ImageBackground>
      ) : (
        <View style={[styles.cardImage, { backgroundColor: MyTheme.background }]}>{renderBadge()}</View>
      )}

      <View style={styles.cardContent}>
        <View style={styles.cardInfoRow}>
          <View style={{ flex: 1, paddingRight: Spacing.sm }}>
            <AppText bold type="title" numberOfLines={1}>
              {title}
            </AppText>
            <AppText type="caption" numberOfLines={1}>
              {description}
            </AppText>
          </View>

          <AppText bold style={styles.lpText}>
            {lp} LP
          </AppText>
        </View>

        <AppButton title={t("Activate")} bgColor={MyTheme.primaryAccent} onPress={() => completeTask(id)} />
      </View>
    </BaseCard>
  );
});
FYTaskItem.displayName = "FYTaskItem";

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      width: 280,
      height: 280
    },
    cardImage: {
      height: 120,
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      padding: Spacing.sm
    },
    cardContent: {
      flex: 1,
      padding: Spacing.md,
      justifyContent: "space-between"
    },
    cardInfoRow: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    lpText: {
      color: theme.primaryAccent
    }
  });

export default FYTaskItem;
