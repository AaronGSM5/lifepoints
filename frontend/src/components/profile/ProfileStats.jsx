import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import SectionHeader from "../ui/SectionHeader";
import StatCard from "../ui/StatCard";

const ProfileStats = memo(({ stats = [], isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("profile");

  if (!isLoading && !stats?.length) return null;

  const displayStats = isLoading && !stats.length ? Array.from({ length: 4 }) : stats;
  return (
    <View style={styles.container}>
      <SectionHeader
        title={t("Your Stats")}
        icon={"statsChart"}
        iconColor={MyTheme.primaryAccent}
        isLoading={isLoading}
      />
      <View style={styles.statsWrapper}>
        {displayStats.map((entry, index) => (
          <StatCard
            key={entry?.id || `stat-${index}`}
            isLoading={isLoading}
            label={entry?.label ? t(entry?.label) : ""}
            value={index === 2 ? entry?.value.slice(3) : entry?.value}
            icon={entry?.icon}
            color={entry?.color}
            style={{ width: "47%" }}
          />
        ))}
      </View>
    </View>
  );
});

ProfileStats.displayName = "ProfileStats";

const getStyles = () =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.xl
    },
    statsWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.md
    }
  });

export default ProfileStats;
