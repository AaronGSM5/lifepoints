import { StyleSheet, View } from "react-native";
import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppButton from "../ui/AppButton";

const EmptyState = ({ activeCat, setActiveCat }) => {
  render(
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Icon name="search" size={32} color={MyTheme.muted} />
      </View>
      <AppText bold type="title" style={{ color: MyTheme.text, marginBottom: Spacing.xs }}>
        No Rewards Found
      </AppText>
      <AppText type="caption" style={{ textAlign: "center", color: MyTheme.muted }}>
        We don't have any deals for "{activeCat.charAt(0).toUpperCase() + activeCat.slice(1)}" right now.
      </AppText>
      <View style={{ marginTop: Spacing.sm }}>
        <AppButton variant="outline" title={"Reset filter"} size="sm" onPress={() => setActiveCat("all")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    width: "100%",
    paddingVertical: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm
  }
});

export default EmptyState;
