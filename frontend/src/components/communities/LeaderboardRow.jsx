import { memo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppText from "../ui/AppText";
import StatusBadge from "../ui/StatusBadge";

const LeaderboardRow = memo(({ member, index, theme }) => {
  const getRankColor = (idx) => {
    switch (idx) {
      case 0:
        return "#FFD700"; // Gold
      case 1:
        return "#C0C0C0"; // Silber
      case 2:
        return "#CD7F32"; // Bronze
      default:
        return theme.muted;
    }
  };

  return (
    <View style={styles.memberRow}>
      <View style={{ width: 30 }}>
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
        <AppText bold style={{ flex: 1 }}>
          {member.name}
        </AppText>
      )}

      <View style={styles.lpContainer}>
        <AppText bold style={{ color: theme.primaryAccent }}>
          {member.lp}
        </AppText>
        <AppText bold type="caption" style={[styles.lpLabel, { color: theme.primaryAccent }]}>
          LP
        </AppText>
      </View>
    </View>
  );
});
LeaderboardRow.displayName = "LeaderboardRow";

const styles = StyleSheet.create({
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md - 4,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)"
  },
  memberNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    flex: 1
  },
  lpContainer: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  lpLabel: {
    marginLeft: 4
  }
});

export default LeaderboardRow;
