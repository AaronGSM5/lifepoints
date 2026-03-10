import { ScrollView, StyleSheet, View } from "react-native";
import AppText from "./ui/AppText";
import AppButton from "./ui/AppButton";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "./icons/Icon";
import { Spacing } from "@/constants/Spacing";
import { MaterialIcons } from "@expo/vector-icons";

const RecommendedTasks = () => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderRow}>
        <AppText type="title">Recommended Tasks</AppText>
        <AppButton variant="ghost" title={"See all"} size="sm" textStyle={{ color: MyTheme.primaryAccent }} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
        contentContainerStyle={styles.horizontalScrollContent}
      >
        {[
          { title: "Deep Breathing", lp: "500", icon: "self-improvement", color: "#3B82F6" },
          { title: "Fast Walk", lp: "750", icon: "directions-run", color: "#10B981" },
          { title: "Read 5 Pages", lp: "300", icon: "menu-book", color: "#F472B6" }
        ].map((item, index) => (
          <View key={index} style={styles.recomCard}>
            <MaterialIcons name={item.icon} size={28} color={item.color} style={styles.recomIcon} />
            <AppText type="title" style={styles.recomTitle}>
              {item.title}
            </AppText>
            <View style={styles.recomFooter}>
              <AppText type="title" style={styles.recomLP}>
                {item.lp}{" "}
                <AppText type="title" style={{ fontSize: 12, color: MyTheme.primaryAccent }}>
                  LP
                </AppText>
              </AppText>
              <AppButton
                size="sm"
                icon={<Icon name="add" size={18} color={MyTheme.primaryAccent} />}
                iconPosition="center"
                bgColor={"rgba(16, 185, 129, 0.1)"}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.lg
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md
  },
  horizontalScroll: {
    marginHorizontal: -Spacing.lg
  },
  horizontalScrollContent: {
    paddingHorizontal: Spacing.lg
  },
  recomCard: {
    width: 160,
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    marginRight: Spacing.md
  },
  recomIcon: {
    marginBottom: Spacing.sm
  },
  recomTitle: {
    fontSize: 14
  },
  recomFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.md
  },
  recomLP: {
    color: MyTheme.primaryAccent,
    fontSize: 15
  }
});

export default RecommendedTasks;
