import React from "react";
import { StyleSheet, View } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import BaseCard from "@/components/ui/BaseCard";
import { Skeleton } from "moti/skeleton";

const TaskItem = ({ title, lp, progress, status, icon, onPress, isLoading }) => {
  if (isLoading) {
    return (
      <BaseCard style={styles.container}>
        <View style={styles.iconContainer}>
          <Skeleton
            colorMode="dark"
            width={32}
            height={32}
            radius="round"
            transition={{ type: "timing", duration: 1500 }}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={{ marginBottom: 8 }}>
            <Skeleton colorMode="dark" width="70%" height={16} transition={{ type: "timing", duration: 1500 }} />
          </View>
          <Skeleton colorMode="dark" width="40%" height={12} transition={{ type: "timing", duration: 1500 }} />
        </View>
        <View style={styles.chevronContainer}>
          <Skeleton
            colorMode="dark"
            width={16}
            height={16}
            radius={4}
            transition={{ type: "timing", duration: 1500 }}
          />
        </View>
      </BaseCard>
    );
  }
  return (
    <BaseCard onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color={MyTheme.text} />
      </View>

      <View style={styles.textContainer}>
        <AppText type="body" bold style={styles.title} numberOfLines={1}>
          {title}
        </AppText>

        <View style={styles.metaRow}>
          <AppText type="caption" bold style={styles.lpText}>
            +{lp} LP
          </AppText>

          {status && (
            <>
              <AppText type="caption"> • </AppText>
              <AppText type="caption">{status}</AppText>
            </>
          )}
        </View>
      </View>

      <View style={styles.chevronContainer}>
        <Icon name="right" size={20} color={MyTheme.muted} />
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Spacing.borderRadius.md,
    backgroundColor: MyTheme.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md
  },
  textContainer: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    marginBottom: Spacing.xs
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  lpText: {
    color: MyTheme.primaryAccent
  },
  chevronContainer: {
    marginLeft: Spacing.sm
  }
});

export default TaskItem;
