import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { StyleSheet, View } from "react-native";

const SlidePaginator = ({ data, currentIndex }) => {
  return (
    <View style={styles.dotContainer}>
      {data.map((_, index) => (
        <View key={index.toString()} style={[styles.dot, currentIndex === index && styles.activeDot]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Spacing.xl
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: MyTheme.muted,
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: MyTheme.primary,
    width: 20
  }
});

export default SlidePaginator;
