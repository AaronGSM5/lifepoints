import { StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";
import { Icon } from "../icons/Icon";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";
import SectionHeader from "../ui/SectionHeader";

const LpChart = () => {
  const lp = 2450;
  return (
    <View>
      <SectionHeader
        title={`You earned ${lp} LP this week!`}
        rightIcon={<Icon name={"share"} />}
        onRightPress={() => console.log("shared")}
      />
      <View style={styles.chartCard}>
        <View style={styles.chartContainer}>
          {[45, 75, 60, 90, 55, 100, 35].map((h, i) => (
            <View key={i} style={styles.chartColumnWrapper}>
              <View style={[styles.chartBar, { height: `${h}%`, opacity: Math.max(0.25, h / 100) }]} />
              <AppText bold type="caption" style={styles.chartDay}>
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: MyTheme.primary,
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
    backgroundColor: MyTheme.primaryAccent,
    borderTopLeftRadius: Spacing.borderRadius.sm,
    borderTopRightRadius: Spacing.borderRadius.sm
  },
  chartDay: {
    fontSize: 9,
    marginTop: Spacing.sm
  }
});

export default LpChart;
