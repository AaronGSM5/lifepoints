import { StyleSheet, View, ScrollView, Image, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppInput from "@/components/ui/AppInput";
import { useEffect, useRef, useState } from "react";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";

export default function HomeScreen() {
  const [suggestionInput, setSuggestionInput] = useState("");
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("Das ist ein provozierter Render-Crash!");
  }
  const handleSendSuggestion = () => {
    console.log("Mock Send");
  };
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 1700,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <ScreenWrapper scrollable>
      <View style={styles.heroSection}>
        <Image source={require("../../../public/assets/sportevent.png")} style={styles.heroImage} resizeMode="cover" />
      </View>

      {/* ACTIVE TASKS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AppText type="title">Active Tasks</AppText>
          <Animated.View style={[styles.pulseDot, { opacity: pulseAnim }]} />
        </View>

        <View style={styles.taskCardActive}>
          <View style={styles.taskIconContainer}>
            <Icon name="timer" size={20} color={MyTheme.primaryAccent} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText bold type="title">
              Morning Vitality
            </AppText>
          </View>
          <View style={styles.lpContainer}>
            <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
              1,500
            </AppText>
            <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
              LP
            </AppText>
          </View>
          <AppButton
            size="sm"
            icon={<Icon name="checkmark" size={20} />}
            iconPosition="center"
            bgColor={MyTheme.primaryAccent}
            onPress={() => setShouldCrash(true)}
          />
        </View>
      </View>

      {/* RECOMMENDED TASKS */}
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

      {/* PRODUCTIVITY CHART */}
      <View style={styles.section}>
        <AppText type="title" style={{ marginBottom: Spacing.md }}>
          You earned{" "}
          <AppText type="title" style={{ color: MyTheme.primaryAccent }}>
            2,450 LP
          </AppText>{" "}
          this week!
        </AppText>

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

      {/* SUGGESTION INPUT */}
      <View style={styles.suggestionBox}>
        <View style={styles.suggestionHeader}>
          <View style={styles.bulbIcon}>
            <Icon name="bulb" size={20} />
          </View>
          <View>
            <AppText type="title">Suggest a Task</AppText>
            <AppText type="caption">Earn LP if your idea gets added!</AppText>
          </View>
        </View>
        <AppInput
          bottomMargin={false}
          placeholder="I want to see a task for..."
          value={suggestionInput}
          onChangeText={setSuggestionInput}
          rightIcon="send"
          onRightIconPress={handleSendSuggestion}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: Spacing.lg
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: Spacing.borderRadius.lg
  },
  section: {
    marginBottom: Spacing.lg
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md
  },
  pulseDot: {
    width: Spacing.xs + 2,
    height: Spacing.xs + 2,
    borderRadius: Spacing.borderRadius.full,
    backgroundColor: MyTheme.primaryAccent,
    marginLeft: Spacing.sm
  },
  taskCardActive: {
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.25)"
  },
  taskIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(16, 185, 129, 0.16)",
    borderRadius: Spacing.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md
  },
  taskTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 16
  },
  lpContainer: {
    flexDirection: "row",
    gap: Spacing.xs,
    marginRight: Spacing.md
  },
  lpValue: {
    color: MyTheme.primaryAccent,
    fontFamily: "Inter-Bold",
    fontSize: 15
  },
  lpUnit: {
    color: MyTheme.primaryAccent,
    fontSize: 15,
    fontFamily: "Inter-Bold"
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
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: Spacing.borderRadius.full,
    justifyContent: "center",
    alignItems: "center"
  },
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
  },
  suggestionBox: {
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.lg
  },
  suggestionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md
  },
  bulbIcon: {
    width: 40,
    height: 40,
    backgroundColor: MyTheme.primaryAccent,
    borderRadius: Spacing.borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm
  }
});
