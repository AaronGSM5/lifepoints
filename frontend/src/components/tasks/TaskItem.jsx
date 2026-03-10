import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "../icons/Icon";

const TaskItem = ({ title, lp, progress, status, icon, isActive, onPress }) => (
  <Pressable onPress={onPress}>
    <View style={styles.taskItem}>
      <View style={styles.taskItemTop}>
        <View style={styles.taskInfoMain}>
          <View style={styles.taskIconBox}>
            <Icon name={icon || "sun"} />
          </View>
          <View>
            <AppText bold>{title}</AppText>
            <View style={styles.taskMetaRow}>
              <AppText bold style={{ color: MyTheme.primaryAccent }}>
                {lp} LP
              </AppText>
              {status && (
                <>
                  <AppText style={styles.dot}>•</AppText>
                  <AppText style={styles.taskStatus}>{status}</AppText>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: progress }]} />
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: MyTheme.primary,
    padding: Spacing.md,
    borderRadius: Spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  taskItemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md
  },
  taskInfoMain: {
    flexDirection: "row",
    gap: Spacing.md
  },
  taskIconBox: {
    width: 40,
    height: 40,
    backgroundColor: MyTheme.secondary,
    borderRadius: Spacing.borderRadius.md,
    justifyContent: "center",
    alignItems: "center"
  },
  taskMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs
  },
  dot: {
    color: MyTheme.muted,
    marginHorizontal: Spacing.sm
  },
  taskStatus: {
    color: MyTheme.muted,
    fontSize: 12
  },
  toggle: {
    width: 40,
    height: 24,
    backgroundColor: "#334155",
    borderRadius: Spacing.borderRadius.full,
    padding: 2
  },
  toggleActive: {
    backgroundColor: MyTheme.primaryAccent
  },
  toggleCircle: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderRadius: Spacing.borderRadius.full
  },
  toggleCircleActive: {
    transform: [{ translateX: 16 }]
  },
  progressBg: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: Spacing.xs,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: MyTheme.primaryAccent
  }
});

export default TaskItem;
