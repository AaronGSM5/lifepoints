import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import SectionHeader from "../ui/SectionHeader";

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const LpChart = memo(({ lp = 0, data = [] }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <View>
      <SectionHeader
        title={`You earned ${lp} LP this week!`}
        rightIcon={<Icon name={"share"} />}
        onRightPress={() => console.log("shared")}
      />
      <View style={styles.chartCard}>
        <View style={styles.chartContainer}>
          {data.map((h, i) => (
            <View key={i} style={styles.chartColumnWrapper}>
              <View style={[styles.chartBar, { height: `${h}%`, opacity: Math.max(0.25, h / 100) }]} />
              <AppText bold type="caption" style={styles.chartDay}>
                {WEEK_DAYS[i]}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
});
LpChart.displayName = "LpChart";

const getStyles = (theme) =>
  StyleSheet.create({
    chartCard: {
      backgroundColor: theme.primary,
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.lg,
      minHeight: 200
    },
    chartContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "space-between",
      marginTop: Spacing.md
    },
    chartColumnWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end"
    },
    chartBar: {
      width: "70%",
      backgroundColor: theme.primaryAccent,
      borderTopLeftRadius: Spacing.borderRadius.sm,
      borderTopRightRadius: Spacing.borderRadius.sm
    },
    chartDay: {
      fontSize: 9,
      marginTop: Spacing.sm
    }
  });

export default LpChart;
