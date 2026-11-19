import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { addOpacity } from "@/utils/colorHelpers";
import { getRankColor } from "@/utils/rankHelpers";

import AppText from "../ui/AppText";
import Separator from "../ui/Separator";
import StatusBadge from "../ui/StatusBadge";

const LeaderboardRow = memo(({ member, index, theme }) => {
  const styles = useMemo(() => getStyles(theme), [theme]);
  if (!member) return null;
  return (
    <>
      <View style={[styles.memberRow, index % 2 === 1 && styles.alternateRow]}>
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
      <Separator />
    </>
  );
});
LeaderboardRow.displayName = "LeaderboardRow";

const getStyles = (theme) =>
  StyleSheet.create({
    memberRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.md - Spacing.xs,
      paddingHorizontal: Spacing.sm
    },
    // Abwechselnde Zeilen für bessere Lesbarkeit in Ranglisten
    alternateRow: {
      backgroundColor: addOpacity(theme.secondary, 0.35),
      borderRadius: Spacing.borderRadius.sm
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
