import { MyTheme } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "../icons/Icon";

const RewardCard = ({ image, brand, title, points, icon, isLocked }) => {
  return (
    <View style={styles.gridCard}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        {/* Icon Overlay */}
        <View style={styles.cardIconBadge}>
          <Icon name={icon} size={14} color={MyTheme.text} />
        </View>
      </View>

      <View style={{ padding: Spacing.sm, gap: 2 }}>
        <AppText bold type="caption" style={styles.cardBrand}>
          {brand}
        </AppText>
        <AppText bold type="body" numberOfLines={2}>
          {title}
        </AppText>

        <View style={styles.cardFooter}>
          <AppText bold type="body" style={[{ fontSize: 14 }, isLocked && { color: MyTheme.muted }]}>
            {points} PTS
          </AppText>
          {isLocked ? (
            <View style={styles.lockedBadge}>
              <AppText bold type="caption" style={{ fontSize: 10 }}>
                Locked
              </AppText>
            </View>
          ) : (
            <TouchableOpacity style={styles.miniFab}>
              <Icon name="shopping" size={16} color={MyTheme.primaryAccent} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Locked Overlay */}
      {isLocked && <View style={styles.lockedOverlay} />}
    </View>
  );
};

export default RewardCard;

const styles = StyleSheet.create({
  gridCard: {
    flex: 1,
    maxWidth: "48%",
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  cardBrand: {
    color: MyTheme.primaryAccent,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  cardImageContainer: {
    height: 100,
    backgroundColor: "#333"
  },
  cardImage: {
    width: "100%",
    height: "100%"
  },
  cardIconBadge: {
    position: "absolute",
    bottom: Spacing.sm,
    right: Spacing.sm,
    width: 28,
    height: 28,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.sm
  },
  miniFab: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: MyTheme.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  lockedBadge: {
    backgroundColor: "#2A2A2A",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(18, 18, 18, 0.6)"
  }
});
