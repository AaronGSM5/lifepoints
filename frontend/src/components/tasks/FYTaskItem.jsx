import { ImageBackground, StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";
import AppButton from "../ui/AppButton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";

const FYTaskItem = ({ title, description, lp, badge, image }) => {
  return (
    <View style={styles.card}>
      {image ? (
        <ImageBackground source={image} style={styles.cardImage} resizeMode="cover">
          <View style={styles.badgeHot}>
            <AppText bold type="caption" style={{ color: MyTheme.text }}>
              {badge}
            </AppText>
          </View>
        </ImageBackground>
      ) : (
        <View style={[styles.cardImage, { backgroundColor: MyTheme.background }]}>
          <View style={styles.badgeHot}>
            <AppText bold type="caption" style={{ color: MyTheme.text }}>
              {badge}
            </AppText>
          </View>
        </View>
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardInfoRow}>
          <View>
            <AppText bold type="title">
              {title}
            </AppText>
            <AppText type="caption">{description}</AppText>
          </View>
          <AppText bold style={styles.lpText}>
            {lp}
          </AppText>
        </View>
        <AppButton title={"Activate"} bgColor={MyTheme.primaryAccent} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  cardImage: {
    height: 120,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: Spacing.sm
  },
  badgeHot: {
    backgroundColor: MyTheme.primaryAccent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.borderRadius.md
  },
  badgeNew: {
    backgroundColor: MyTheme.primaryAccent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.borderRadius.md
  },
  cardContent: {
    padding: Spacing.md
  },
  cardInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.lg
  },
  lpText: {
    color: MyTheme.primaryAccent
  }
});

export default FYTaskItem;
