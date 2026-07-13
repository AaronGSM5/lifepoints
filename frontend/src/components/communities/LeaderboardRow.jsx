import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppText from "../ui/AppText";
import StatusBadge from "../ui/StatusBadge";

const getRankColor = (idx) => {
  switch (idx) {
    case 0:
      return "#FFD700"; // Gold
    case 1:
      return "#C0C0C0"; // Silber
    case 2:
      return "#CD7F32"; // Bronze
    default:
      return "#b8b8b8";
  }
};

const LeaderboardRow = memo(({ member, index, theme }) => {
  const styles = useMemo(() => getStyles(theme), [theme]);
  if (!member) return null;
  return (
    <View style={styles.memberRow}>
      <View style={styles.rankContainer}>
        <AppText bold style={{ color: getRankColor(index) }}>
          {index + 1}
        </AppText>
      </View>

      {member.badge ? (
        <View style={styles.memberNameContainer}>
          <AppText bold>{member.name}</AppText>
          <StatusBadge id={member.badge} size={16} />
        </View>
      ) : (
        <AppText bold style={styles.memberNameSolo}>
          {member.name}
        </AppText>
      )}

      <View style={styles.lpContainer}>
        <AppText bold style={styles.lpValue}>
          {member.lp}
        </AppText>
        <AppText bold type="caption" style={styles.lpLabel}>
          LP
        </AppText>
      </View>
    </View>
  );
});
LeaderboardRow.displayName = "LeaderboardRow";

const getStyles = (theme) =>
  StyleSheet.create({
    memberRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.md - Spacing.xs,
      paddingHorizontal: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.separator
    },
    rankContainer: {
      width: 30
    },
    memberNameContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs,
      flex: 1
    },
    memberNameSolo: {
      flex: 1
    },
    lpContainer: {
      flexDirection: "row",
      alignItems: "baseline"
    },
    lpValue: {
      color: theme.primaryAccent
    },
    lpLabel: {
      marginLeft: Spacing.xs,
      color: theme.primaryAccent
    }
  });

export default LeaderboardRow;
