import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";

const OnboardingGuideItem = memo(({ quest, isClaimed }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("profile");
  const router = useRouter();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.questItem,
        quest.completed && styles.questItemCompleted,
        pressed && !quest.completed && { opacity: 0.7 }
      ]}
      onPress={() => {
        if (!quest.completed && quest.route) {
          router.push(quest.route);
        }
      }}
    >
      <View style={styles.questIconContainer}>
        <Icon
          name={quest.completed ? "checkmark" : quest.icon}
          color={quest.completed ? MyTheme.primaryAccent : "gray"}
        />
      </View>

      <View style={styles.questTextContainer}>
        <AppText type="body" style={[styles.questTitle, quest.completed && styles.textStrikeThrough]}>
          {t(quest.title)}
        </AppText>
        <AppText type="caption" bold style={[styles.rewardText, isClaimed && { color: MyTheme.muted }]}>
          {isClaimed ? t("Received LP") : `+${quest.reward} LP`}
        </AppText>
      </View>

      {!quest.completed && <Icon name="right" color={MyTheme.muted} size={20} />}
    </Pressable>
  );
});

OnboardingGuideItem.displayName = "OnboardingGuideItem";

const getStyles = (theme) =>
  StyleSheet.create({
    questItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.sm
    },
    questItemCompleted: {
      opacity: 0.8
    },
    questIconContainer: {
      width: 40,
      alignItems: "center"
    },
    questTextContainer: {
      flex: 1,
      marginLeft: Spacing.sm
    },
    questTitle: {
      fontSize: 16
    },
    textStrikeThrough: {
      textDecorationLine: "line-through",
      color: theme.muted
    },
    rewardText: {
      color: theme.primaryAccent
    }
  });

export default OnboardingGuideItem;
