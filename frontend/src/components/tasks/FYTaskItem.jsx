import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import BaseCard from "@/components/ui/BaseCard";
import { Skeleton } from "moti/skeleton";
import AppBadge from "../ui/AppBadge";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";

const FYTaskItem = ({ id, title, description, lp, badge, image, isLoading }) => {
  const styles = getStyles();
  const { t } = useTranslation("tasks");
  const isDarkMode = useStore((state) => state.isDarkMode);
  const completeTask = useStore((state) => state.completeTask);
  if (isLoading) {
    return (
      <BaseCard style={styles.card} padding={0}>
        {/* Image */}
        <View style={[styles.cardImage, { padding: 0, overflow: "hidden" }]}>
          <Skeleton
            colorMode={isDarkMode ? "dark" : "light"}
            width="100%"
            height={"100%"}
            radius={0}
            transition={{ type: "timing", duration: 1500 }}
          />
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardInfoRow}>
            <View style={{ flex: 1, paddingRight: Spacing.sm }}>
              <View style={{ marginBottom: 4 }}>
                <Skeleton
                  colorMode={isDarkMode ? "dark" : "light"}
                  width="80%"
                  height={20}
                  transition={{ type: "timing", duration: 1500 }}
                />
              </View>
              <Skeleton
                colorMode={isDarkMode ? "dark" : "light"}
                width="80%"
                height={14}
                transition={{ type: "timing", duration: 1500 }}
              />
            </View>
            <Skeleton
              colorMode={isDarkMode ? "dark" : "light"}
              width={60}
              height={22}
              transition={{ type: "timing", duration: 1500 }}
            />
          </View>
          {/* Button */}
          <Skeleton
            colorMode={isDarkMode ? "dark" : "light"}
            width="100%"
            height={44}
            radius={Spacing.borderRadius.lg}
            transition={{ type: "timing", duration: 1500 }}
          />
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
};

const getStyles = () =>
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
      color: MyTheme.primaryAccent
    }
  });

export default FYTaskItem;
