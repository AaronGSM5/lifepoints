import React, { useState } from "react";
import { StyleSheet, View, LayoutAnimation, Platform, UIManager, TouchableOpacity } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import BaseCard from "@/components/ui/BaseCard";
import AppInput from "@/components/ui/AppInput";
import { Skeleton } from "moti/skeleton";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskItem = ({ title, lp, progress, status, icon, onTrack, onNavigate, isLoading, requiresInput }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return (
      <BaseCard style={styles.container}>
        <View style={styles.mainRow}>
          <View style={styles.iconContainer}>
            <Skeleton
              colorMode="dark"
              width="100%"
              height="100%"
              radius={Spacing.borderRadius.md}
              transition={{ type: "timing", duration: 1500 }}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={{ marginBottom: 8 }}>
              <Skeleton colorMode="dark" width="70%" height={16} transition={{ type: "timing", duration: 1500 }} />
            </View>
            <Skeleton colorMode="dark" width="40%" height={12} transition={{ type: "timing", duration: 1500 }} />
          </View>
        </View>
      </BaseCard>
    );
  }

  return (
    <BaseCard style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={toggleExpand} style={styles.mainRow}>
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
          <Icon name={isExpanded ? "down" : "right"} size={20} color={MyTheme.muted} />
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContainer}>
          {requiresInput && (
            <AppInput
              placeholder={`Anzahl ${requiresInput} eingeben...`}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
            />
          )}

          <View style={styles.actionRow}>
            <TouchableOpacity onPress={onNavigate} style={styles.detailBtn}>
              <AppText type="caption" style={{ color: MyTheme.muted }}>
                Details ansehen
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.trackBtn} onPress={() => onTrack(inputValue)}>
              <AppText type="body" bold>
                Tracken
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    overflow: "hidden"
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center"
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
  },
  expandedContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: MyTheme.secondary
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.sm
  },
  detailBtn: {
    paddingVertical: Spacing.sm
  },
  trackBtn: {
    backgroundColor: MyTheme.primaryAccent,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.borderRadius.sm
  }
});

export default TaskItem;
